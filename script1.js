document.addEventListener("DOMContentLoaded", function () {
 
  const myForm = document.querySelector("form");
  if (myForm) {
    myForm.addEventListener("submit", function (e) {
      let valid = true;
      let errors = [];
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      if (!name || !email || !message) return;

      if (!name.value) {
        valid = false;
        errors.push("Name is required.");
      }
      if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        valid = false;
        errors.push("Enter a valid email address.");
      }
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

  document.querySelectorAll(".accordion-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const isOpen = content.style.display === "block";
      content.style.display = isOpen ? "none" : "block";
      content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
    });
  });

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

  document.querySelectorAll(".read-more-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const extraContent = button.previousElementSibling;
      const isVisible = extraContent.style.display === "block";
      extraContent.style.display = isVisible ? "none" : "block";
      button.textContent = isVisible ? "Read More" : "Show Less";
    });
  });

  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("night-theme");
      const sound = new Audio("sound/click.mp3");
      sound.play();
    });
  }

  const allStars = document.querySelectorAll(".star");
  if (allStars.length > 0) {
    allStars.forEach((star) => {
      star.addEventListener("click", () => {
        const sound = new Audio("sound/click.mp3");
        sound.play();
      });
    });
  }
});

//(Assignment 7)
$(document).ready(function () {
  //1
  $("#searchInput").on("keyup", function () {
    const query = $(this).val().toLowerCase();
    $(".card-title").filter(function () {
      $(this)
        .closest(".card")
        .toggle($(this).text().toLowerCase().includes(query));
    });
  });

  //2
$("#searchInput").on("input", function () {
  const query = $(this).val().toLowerCase();
  $(".card-title").each(function () {
    const card = $(this).closest(".col-lg-4, .col-md-6, .card");
    const title = $(this).text().toLowerCase();

    card.toggle(title.includes(query));
  });
});

const suggestions = [
  "Espresso Perfection",
  "Fresh Pastries",
  "Our Community",
  "Our Journey with Coffee",
  "Seasonal Specials",
  "Barista Spotlight"
];

$("#searchInput").on("focus input", function () {
  const query = $(this).val().toLowerCase();
  const filtered = query
    ? suggestions.filter(title => title.toLowerCase().includes(query))
    : suggestions;
  let html = "";
  filtered.forEach(
    title => html += `<div class='suggestion-item p-2 border-bottom'>${title}</div>`
  );
  if (filtered.length > 0) {
    $("#suggestions").html(html).show();
  } else {
    $("#suggestions").hide();
  }
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

  //3
  $("#highlightBtn").click(function () {
    const keyword = $("#searchInput").val().trim();
    if (!keyword) return;
    const regex = new RegExp(`(${keyword})`, "gi");
    $(".card-text, .accordion-content").each(function () {
      const text = $(this).text();
      const highlighted = text.replace(
        regex,
        `<span class='highlight'>$1</span>`
      );
      $(this).html(highlighted);
    });
  });

  //6
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

  //7
  function showNotification(message) {
    const $notif = $('<div class="toast-notification"></div>')
      .text(message)
      .appendTo("body");
    $notif.fadeIn().delay(3000).fadeOut(() => $notif.remove());
  }
  $("#notifyBtn").click(() =>
    showNotification("Welcome back to Asphalt‑8 Cafe Blog!")
  );

  //9
  function lazyLoadImages() {
    $("img[data-src]").each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() + 100
      ) {
        $(this).attr("src", $(this).data("src")).removeAttr("data-src");
      }
    });
  }
  lazyLoadImages();
  $(window).on("scroll", lazyLoadImages);
});
