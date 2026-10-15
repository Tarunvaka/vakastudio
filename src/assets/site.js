/* Vaka Studio home. No dependencies, no tracking, nothing moves on its own. */
(() => {
  const root = document.documentElement;

  // ---------- Theme toggle (follows the system until the visitor picks one) ----------
  const btn = document.querySelector(".theme");
  const current = () => root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const label = () => btn && btn.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  label();
  btn?.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("vs-theme", next); } catch (_) { /* not saved, still switches */ }
    label();
  });

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
