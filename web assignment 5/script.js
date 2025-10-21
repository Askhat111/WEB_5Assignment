document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.classList.toggle("show");
  });
});

function getGreeting() {
  const hour = new Date().getHours();
  let greeting;
  switch (true) {
    case hour < 12:
      greeting = "Good Morning!";
      break;
    case hour < 18:
      greeting = "Good Afternoon!";
      break;
    default:
      greeting = "Good Evening!";
  }
  document.getElementById("greeting").textContent =
    greeting + " Welcome to Café Asphalt-8!";
}
getGreeting();

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const message = document.getElementById("formMessage");
  message.textContent = "Sending...";

  setTimeout(() => {
    showMessage("Thank you! Your message was sent successfully.");
  }, 1000);
});

function showMessage(msg) {
  document.getElementById("formMessage").textContent = msg;
}

const translations = {
  en: {
    greeting: "Welcome to Café Asphalt-8",
    intro: "Your perfect stop for rich coffee, tasty pastries, and a cozy vibe.",
    service: "Our Specialties",
    espresso: "Strong and aromatic coffee for real enthusiasts.",
    croissant: "Freshly baked, buttery and soft pastries every morning.",
    desserts: "Sweet treats that pair perfectly with our signature drinks."
  },
  ru: {
    greeting: "Добро пожаловать в Café Asphalt-8",
    intro: "Ваше идеальное место для ароматного кофе и вкусной выпечки.",
    service: "Наши Специалитеты",
    espresso: "Крепкий и ароматный кофе для настоящих ценителей.",
    croissant: "Свежие, мягкие и сливочные круассаны каждое утро.",
    desserts: "Сладости, идеально сочетающиеся с нашими напитками."
  }
};

document.getElementById("language-select").addEventListener("change", function () {
  const lang = this.value;
  const t = translations[lang];
  document.getElementById("greeting").textContent = t.greeting;
  document.getElementById("intro-text").textContent = t.intro;
  document.getElementById("service-title").textContent = t.service;
  document.getElementById("espresso-desc").textContent = t.espresso;
  document.getElementById("croissant-desc").textContent = t.croissant;
  document.getElementById("desserts-desc").textContent = t.desserts;
});
