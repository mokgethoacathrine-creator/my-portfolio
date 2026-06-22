const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll("#site-nav a")];
const themeButton = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
}

const updateThemeButton = () => {
    const isDark = document.body.classList.contains("dark-mode");
    themeButton.setAttribute("aria-pressed", isDark);
    themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
};

updateThemeButton();

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    updateThemeButton();
});

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, { rootMargin: "-35% 0px -60% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        document.querySelectorAll(".certificate").forEach((certificate) => {
            certificate.classList.toggle("hidden", filter !== "all" && certificate.dataset.category !== filter);
        });
    });
});
