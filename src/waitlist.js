// The design's waitlist form: posts the email to /api/waitlist, then shows the design's "You're on the list" card.
const source = () => {
  try {
    const ref = new URLSearchParams(location.search).get("ref");
    if (ref && /^[a-z0-9_-]{1,32}$/i.test(ref)) sessionStorage.setItem("vs-ref", ref.toLowerCase());
    return sessionStorage.getItem("vs-ref") || "direct";
  } catch { return "direct"; }
};

export async function joinWaitlist(e, component, app = "lastmark") {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const fail = (msg) => { input.setCustomValidity(msg); input.reportValidity(); input.addEventListener("input", () => input.setCustomValidity(""), { once: true }); };
  if (!input.value.trim() || !input.checkValidity()) { fail("Please enter a valid email address."); return; }
  button.disabled = true;
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ app, email: input.value.trim(), source: source(), website: "" }),
    });
    if (res.ok) { component.setState({ joined: true }); return; }
    const data = await res.json().catch(() => ({}));
    fail(res.status === 429 ? "Too many tries. Please wait a minute and try again." : data.error || "Something went wrong. Please try again.");
  } catch {
    fail("We couldn’t reach the server. Check your connection and try again.");
  } finally {
    button.disabled = false;
  }
}
