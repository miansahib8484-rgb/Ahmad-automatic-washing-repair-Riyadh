/* =========================================================
   Ahmad Automatic Washing Repair — Site Script
   (Shared by the separate /en/ and /ar/ sites)
   ========================================================= */

/* ---- Business contact details ---- */
const SITE_CONTACT = {
  phone: "+966 55 939 1603",
  whatsapp: "+966 55 939 1603"
};

document.addEventListener("DOMContentLoaded", function () {
  wireContactLinks();
  initMobileNav();
  initFaqAccordion();
  initRevealAnimations();
  initActiveNav();
  initContactForm();
});

/* ---------------- Contact links ---------------- */
function wireContactLinks() {
  document.querySelectorAll("[data-call]").forEach(function (el) {
    el.setAttribute("href", "tel:+" + SITE_CONTACT.phone.replace(/[^0-9]/g, ""));
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.setAttribute("href", "https://wa.me/" + SITE_CONTACT.whatsapp.replace(/[^0-9]/g, ""));
  });
  document.querySelectorAll(".js-phone-text").forEach(function (el) {
    el.textContent = SITE_CONTACT.phone;
  });
  document.querySelectorAll(".js-whatsapp-text").forEach(function (el) {
    el.textContent = SITE_CONTACT.whatsapp;
  });
}

/* ---------------- Mobile navigation ---------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".mobile-panel");
  const closeBtn = document.querySelector(".close-panel");
  const backdrop = document.querySelector(".backdrop");
  if (!toggle || !panel) return;

  function open() {
    panel.classList.add("open");
    if (backdrop) backdrop.classList.add("show");
  }
  function close() {
    panel.classList.remove("open");
    if (backdrop) backdrop.classList.remove("show");
  }

  toggle.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);
  panel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", close);
  });
}

/* ---------------- FAQ accordion ---------------- */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      item.closest(".faq-list").querySelectorAll(".faq-item").forEach(function (el) {
        el.classList.remove("open");
      });
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* ---------------- Scroll reveal ---------------- */
function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { observer.observe(el); });
}

/* ---------------- Active nav link ---------------- */
function initActiveNav() {
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a, .mobile-panel a").forEach(function (a) {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href && current !== "" && href.indexOf(current) !== -1) {
      a.classList.add("active");
    }
  });
}

/* ---------------- Contact form ---------------- */
function initContactForm() {
  const form = document.querySelector("#repairForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const successBox = document.querySelector("#formSuccess");
    if (successBox) successBox.style.display = "block";
    form.reset();
  });
}
