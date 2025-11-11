document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("show");
    });
  });


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

    const savedKeyword = localStorage.getItem("faqSearch") || "";
    searchInput.value = savedKeyword;
    if (savedKeyword) performSearch(savedKeyword);

    searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.trim();
      performSearch(keyword);

      localStorage.setItem("faqSearch", keyword);
    });

    function performSearch(keyword) {
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
    }
  }

  if (localStorage.getItem("theme") === "night") {
    document.body.classList.add("night-theme");
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isNight = document.body.classList.toggle("night-theme");
      localStorage.setItem("theme", isNight ? "night" : "day");
      themeToggle.textContent = isNight ? "☀️" : "🌙";

      try {
        const sound = new Audio("sound/click.mp3");
        sound.play();
      } catch (e) {
        console.warn("Sound not found");
      }
    });

    themeToggle.textContent = document.body.classList.contains("night-theme")
      ? "☀️"
      : "🌙";
  }
});

