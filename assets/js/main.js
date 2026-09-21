// Personal website configuration.
// Replace only these two values with your real public contact details.
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";
const LINKEDIN_URL = "YOUR_LINKEDIN_URL";

document.querySelectorAll(".nav").forEach(nav => {
  const toggle = nav.querySelector(".menu-toggle");
  const links = nav.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
});

const form = document.getElementById("contactForm");
if (form) {
  const status = document.getElementById("formStatus");
  const fields = ["name", "email", "message"];

  function errorFor(name, message) {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = message || "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    fields.forEach(name => errorFor(name, ""));

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    let valid = true;

    if (name.length < 2) { errorFor("name", "Please enter at least 2 characters."); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorFor("email", "Please enter a valid email address."); valid = false; }
    if (message.length < 10) { errorFor("message", "Please enter at least 10 characters."); valid = false; }

    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      return;
    }

    if (CONTACT_EMAIL === "YOUR_EMAIL@example.com") {
      status.textContent = "Form validated successfully. Add your real email in assets/js/main.js to enable email submission.";
      return;
    }

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email client…";
  });
}
