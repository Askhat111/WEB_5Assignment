document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("show");
    });
  });

  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      const lang = languageSelect.value;
      switch (lang) {
        case "en":
          document.getElementById("greeting").textContent = "Welcome to Café Asphalt-8";
          document.getElementById("intro-text").textContent = "Your perfect stop for rich coffee, tasty pastries, and a cozy vibe.";
          document.getElementById("service-title").textContent = "Our Specialties";
          document.getElementById("espresso-desc").textContent = "Strong and aromatic coffee for real enthusiasts.";
          document.getElementById("croissant-desc").textContent = "Freshly baked, buttery and soft pastries every morning.";
          document.getElementById("desserts-desc").textContent = "Sweet treats that pair perfectly with our signature drinks.";
          break;

        case "ru":
          document.getElementById("greeting").textContent = "Добро пожаловать в Кафе Asphalt-8";
          document.getElementById("intro-text").textContent = "Ваш идеальный выбор для ароматного кофе, вкусной выпечки и уютной атмосферы.";
          document.getElementById("service-title").textContent = "Наши Специальные Предложения";
          document.getElementById("espresso-desc").textContent = "Крепкий и ароматный кофе для настоящих ценителей.";
          document.getElementById("croissant-desc").textContent = "Свежие, масляные и мягкие круассаны каждое утро.";
          document.getElementById("desserts-desc").textContent = "Сладости, идеально сочетающиеся с нашими фирменными напитками.";
          break;
      }
    });
  }

const form = document.querySelector(".contact form");
const formMessage = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formMessage.innerHTML = `
      <div id="progressContainer" style="
        width: 100%; 
        background: #ddd; 
        border-radius: 6px; 
        overflow: hidden;
        margin-top: 10px;">
        <div id="progressBar" style="
          width: 0%;
          height: 16px;
          background: #8d6748;
          transition: width 2s;"></div>
      </div>
      <p style="color: #6e4b33; font-weight: bold;">Your message is sending...</p>
    `;

    const progressBar = document.getElementById("progressBar");

    setTimeout(() => { progressBar.style.width = "100%"; }, 100);

    setTimeout(() => {
      formMessage.innerHTML = "<p style='color: green; font-weight: bold;'>Message sent successfully!</p>";
      form.reset();
    }, 2500);
  });
}


  const counters = document.querySelectorAll(".counter");
  const speed = 100; 
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.textContent;
      const inc = target / speed;
      if (count < target) {
        counter.textContent = Math.ceil(count + inc);
        setTimeout(updateCount, 30);
      } else {
        counter.textContent = target;
      }
    };
    updateCount();
  });

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.trim();
      const contents = document.querySelectorAll(".accordion-content");

      contents.forEach(content => {
        const text = content.textContent;
        if (keyword.length > 0) {
          const regex = new RegExp(`(${keyword})`, "gi");
          content.innerHTML = text.replace(regex, "<mark>$1</mark>");
        } else {
          content.innerHTML = text; 
        }
      });
    });
  }
});

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
