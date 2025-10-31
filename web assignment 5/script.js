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

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(() => {
          formMessage.textContent = "Message sent successfully!";
          form.reset();
        })
        .catch(() => {
          formMessage.textContent = "Error sending message. Try again later.";
        });
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
