import { Gradient } from './Gradient.js';
import emailjs from '@emailjs/browser';

// Create your instance and initialize gradient
const gradient = new Gradient();
gradient.initGradient('#gradient-canvas');

console.log("📦 EmailJS Footer Module Loaded");

emailjs.init("370L51zbVIWlXoWwH"); // Replace with your EmailJS Public Key
console.log("✅ EmailJS initialized");

export function setupFooter() {
  console.log("📥 Setting up footer form event listener");

  // Select the existing form by its class (as in your HTML)
  const form = document.querySelector('.footer-form');

  if (!form) {
    console.error("❌ Footer form not found in DOM");
    return;
  }

  console.log("✅ Footer form found. Attaching event listener");

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userEmail = form.user_email.value;
    console.log(`📧 Email entered: ${userEmail}`);

    const emailParams = {
      user_email: userEmail,
      to_email: "aking@nafcofab.com"
    };

    console.log("📨 Sending email with params:", emailParams);

    emailjs.send("service_63k92zx", "template_881q9gl", emailParams)
      .then(() => {
        console.log("✅ Email sent successfully");
        alert("Thanks! We'll be in touch soon.");
        form.reset();
      })
      .catch((err) => {
        console.error("❌ Failed to send email:", err);
        alert("Something went wrong. Please try again later.");
      });
  });
}
