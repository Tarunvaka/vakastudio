/* Runs before paint: apply the saved theme so the page never flashes the wrong one. */
try { const t = localStorage.getItem("vs-theme"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; } catch (_) { /* storage blocked: follow the system */ }
