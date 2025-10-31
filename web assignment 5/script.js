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
          document.body.innerHTML = document.body.innerHTML.replace(/Кафе|Галерея|Услуги/g, match => {
            if (match === "Кафе") return "Café";
            if (match === "Галерея") return "Gallery";
            if (match === "Услуги") return "Services";
          });
          break;
        case "ru":
          document.body.innerHTML = document.body.innerHTML.replace(/Café|Gallery|Services/g, match => {
            if (match === "Café") return "Кафе";
            if (match === "Gallery") return "Галерея";
            if (match === "Services") return "Услуги";
          });
          break;
      }
    });
  }

  const counters = document.querySelectorAll(".counter");
  const speed = 200; 
  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = value / speed;
      if (current < value) {
        counter.innerText = Math.ceil(current + increment);
        requestAnimationFrame(animate);
      } else {
        counter.innerText = value + "+";
      }
    };
    animate();
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.trim();
      const faqItems = document.querySelectorAll(".accordion-content");
      
      faqItems.forEach(item => {
        const text = item.textContent;
        if (keyword.length > 0) {
          const regex = new RegExp(`(${keyword})`, "gi");
          item.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
        } else {
          item.innerHTML = text;
        }
      });
    });
  }
});


