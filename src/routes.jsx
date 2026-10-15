// Every page of vakastudio.com. `file` is where the prerendered HTML lands in dist/.
import HomePage from "./design/HomePage.jsx";
import LastMarkPage from "./design/LastMarkPage.jsx";
import SupportPage from "./design/SupportPage.jsx";
import PrivacyPage from "./design/PrivacyPage.jsx";
import StudioPage from "./design/StudioPage.jsx";
import NotFoundPage from "./design/NotFoundPage.jsx";

export const routes = [
  { id: "home", path: "/", file: "index.html", Page: HomePage,
    title: "Vaka Studio · Small apps for everyday life",
    desc: "Vaka Studio makes calm, simple iPhone apps that do one thing well. Meet LastMark: count the days since anything." },
  { id: "lastmark", path: "/lastmark", file: "lastmark.html", Page: LastMarkPage,
    title: "LastMark · Count the days since anything",
    desc: "LastMark counts the days since you last did something, and resets to today with one tap. No account, no tracking. Coming soon to iPhone." },
  { id: "support", path: "/lastmark/support", file: "lastmark/support.html", Page: SupportPage,
    title: "LastMark Support · Vaka Studio",
    desc: "Help with LastMark: resetting items, Undo, past dates, widgets and more. Contact support@vakastudio.com." },
  { id: "privacy", path: "/lastmark/privacy", file: "lastmark/privacy.html", Page: PrivacyPage,
    title: "LastMark Privacy Policy · Vaka Studio",
    desc: "LastMark collects no data. Everything you add stays on your iPhone. This policy also covers the vakastudio.com waitlist." },
  { id: "studio", path: "/studio", file: "studio.html", Page: StudioPage,
    title: "Studio · Vaka Studio",
    desc: "Vaka Studio is a small, independent studio making calm iPhone apps that do one thing well." },
  { id: "404", path: "/404", file: "404.html", Page: NotFoundPage, noindex: true,
    title: "Page not found · Vaka Studio", desc: "This page doesn’t exist." },
];

export const byId = Object.fromEntries(routes.map((r) => [r.id, r]));
