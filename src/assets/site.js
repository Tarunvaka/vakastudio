/* Vaka Studio home. No dependencies, no tracking, nothing moves on its own. */
(() => {
  // ---------- Nav: mark the current page, mobile menu ----------
  const here = location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".links a, .menu a:not(.btn)").forEach((a) => {
    const path = new URL(a.href, location.href).pathname.replace(/\/$/, "") || "/";
    if (a.origin === location.origin && path === here) a.setAttribute("aria-current", "page");
  });
  const nav = document.querySelector(".nav");
  const menuBtn = nav?.querySelector(".menu-btn");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn?.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav?.querySelectorAll(".menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav?.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });

  // ---------- Waitlist ----------
  const refKey = "vs-ref";
  try {
    const ref = new URLSearchParams(location.search).get("ref");
    if (ref && /^[a-z0-9_-]{1,32}$/i.test(ref)) sessionStorage.setItem(refKey, ref.toLowerCase());
  } catch (_) { /* storage blocked */ }
  const source = () => { try { return sessionStorage.getItem(refKey) || "direct"; } catch (_) { return "direct"; } };

  document.querySelectorAll("form.waitlist").forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const submit = form.querySelector('button[type="submit"]');
    const note = form.querySelector(".wl-note");
    const say = (msg, st) => { note.textContent = msg; note.dataset.state = st || ""; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!input.value.trim() || !input.checkValidity()) { say("Please enter a valid email address.", "error"); input.focus(); return; }
      submit.disabled = true; const text = submit.textContent; submit.textContent = "Joining…"; say("");
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ app: form.dataset.app, email: input.value.trim(), source: source(), website: form.querySelector(".hp input").value }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok) form.classList.add("done");
        else if (res.status === 429) say("Too many tries. Please wait a minute and try again.", "error");
        else say(data.error || "Something went wrong. Please try again.", "error");
      } catch (_) { say("We couldn’t reach the server. Check your connection and try again.", "error"); }
      finally { submit.disabled = false; submit.textContent = text; }
    });
  });

  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
})();
