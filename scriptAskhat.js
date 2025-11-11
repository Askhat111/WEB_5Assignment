document.addEventListener("DOMContentLoaded", function () {
  
  //Theme functionality
  if (localStorage.getItem("theme") === "night") {
    document.body.classList.add("night-theme");
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isNight = document.body.classList.toggle("night-theme");
      localStorage.setItem("theme", isNight ? "night" : "day");
      themeToggle.textContent = isNight ? "☀️" : "🌙";
    });

    themeToggle.textContent = document.body.classList.contains("night-theme")
      ? "☀️"
      : "🌙";
  }

  //Contact form validation
  const myForm = document.getElementById("contactForm");
  if (myForm) {
    myForm.addEventListener("submit", function (e) {
      let valid = true;
      let errors = [];
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");

      //Name validation
      if (!name.value.trim()) {
        valid = false;
        errors.push("Name is required.");
      }

      //Email validation
      if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        valid = false;
        errors.push("Enter a valid email address.");
      }
      
      //Phone validation (if provided)
      if (phone && phone.value) {
        const digitsOnly = phone.value.replace(/\D/g, '');
        if (digitsOnly.length !== 11) {
          valid = false;
          errors.push("Phone must be 11 digits (e.g., +7 777 123 4567)");
        }
      }
      
      //Message validation
      if (!message.value) {
        valid = false;
        errors.push("Message cannot be empty.");
      }
      
      if (!valid) {
        e.preventDefault();
        alert(errors.join("\n"));
      }
    });
  }

  //Phone number formatting
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value && !e.target.value.startsWith('+7')) {
        e.target.value = '+7 ' + value.substring(0, 10);
      }
    });
  }

  //Accordion functionality
  document.querySelectorAll(".accordion-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isOpen = content.style.display === "block";
      content.style.display = isOpen ? "none" : "block";
    });
  });

  //Popup functionality
  const openPopupBtn = document.getElementById("openPopup");
  const closePopupBtn = document.getElementById("closePopup");
  const popupForm = document.getElementById("popupForm");
  const subscribeForm = document.getElementById("subscribeForm");

  if (openPopupBtn && popupForm) {
    openPopupBtn.onclick = () => (popupForm.style.display = "flex");
  }

  if (closePopupBtn && popupForm) {
    closePopupBtn.onclick = () => (popupForm.style.display = "none");
  }

  if (subscribeForm && popupForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing!");
      popupForm.style.display = "none";
      subscribeForm.reset();
    });
  }

  //Star rating functionality
  document.querySelectorAll(".blog-card").forEach((card) => {
    const stars = card.querySelectorAll(".star");
    let currentRating = 0;

    stars.forEach((star, idx) => {
      star.style.cursor = "pointer";
      star.addEventListener("click", () => {
        currentRating = idx + 1;
        stars.forEach((s, i) => {
          s.style.color = i < currentRating ? "#8d6748" : "#ddd";
        });

        const text = card.querySelector(".rating-text");
        if (text) text.textContent = `Your rating: ${currentRating} / 5`;

        card.classList.add("highlight");
        setTimeout(() => card.classList.remove("highlight"), 500);
      });
    });
  });

  //Read more/less functionality
  document.querySelectorAll(".read-more-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const extraContent = button.previousElementSibling;
      const isVisible = extraContent.style.display === "block";
      extraContent.style.display = isVisible ? "none" : "block";
      button.textContent = isVisible ? "Read More" : "Show Less";
    });
  });
});

//jQuery functionality
$(document).ready(function () {
  const suggestions = [
    "Espresso Perfection",
    "Fresh Pastries",
    "Our Community",
    "Our Journey with Coffee",
    "Seasonal Specials",
    "Barista Spotlight"
  ];

  $("#searchInput").on("keyup input focus", function () {
    const query = $(this).val().toLowerCase();
 
    if (query) {
      const searches = JSON.parse(localStorage.getItem('searches') || '[]');
      if (!searches.includes(query)) {
        searches.push(query);
        localStorage.setItem('searches', JSON.stringify(searches));
      }
      localStorage.setItem('lastSearch', query);
    }

    let filtered = query ? suggestions.filter(title => title.toLowerCase().includes(query)) : suggestions;
    let html = "";
    filtered.forEach(title => {
      html += `<div class='suggestion-item p-2 border-bottom'>${title}</div>`;
    });
    
    if (filtered.length > 0) {
      $("#suggestions").html(html).show();
    } else {
      $("#suggestions").hide();
    }

    $(".card-title").filter(function () {
      $(this).closest(".card").toggle($(this).text().toLowerCase().includes(query));
    });
  });

  $(document).on("mousedown", ".suggestion-item", function () {
    $("#searchInput").val($(this).text());
    $("#suggestions").hide();
    $("#searchInput").trigger("input");
  });

  $(document).on("mousedown", function (e) {
    if (!$(e.target).is("#searchInput, .suggestion-item")) {
      $("#suggestions").hide();
    }
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    const $btn = $(this).find("button[type=submit]");
    $btn.prop("disabled", true).html(
      '<span class="spinner-border spinner-border-sm"></span> Please wait...'
    );
    setTimeout(() => {
      $btn.prop("disabled", false).text("Send Message");
      alert("Message sent successfully!");
      $(this).trigger("reset");
    }, 2000);
  });

  function showNotification(message) {
    const $notif = $('<div class="toast-notification"></div>')
      .text(message)
      .appendTo("body");
    $notif.fadeIn().delay(3000).fadeOut(() => $notif.remove());
  }
  
  $("#notifyBtn").click(() =>
    showNotification("Welcome back to Asphalt‑8 Cafe Blog!")
  );
});

