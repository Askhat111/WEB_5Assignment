//day/hight
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem("theme") === "night") {
    document.body.classList.add("night-theme");
  } else {
    document.body.classList.remove("night-theme");
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const body = document.body;
      if (body.classList.contains("night-theme")) {
        body.classList.remove("night-theme");
        localStorage.setItem("theme", "day");
      } else {
        body.classList.add("night-theme");
        localStorage.setItem("theme", "night");
      }
      const sound = new Audio("sound/click.mp3");
      sound.play();
    });
  }

  // date
  const datetimeDiv = document.getElementById('datetime');
  function updateDateTime() {
    if (datetimeDiv) {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      const formattedDate = now.toLocaleString('en-US', options);
      datetimeDiv.textContent = formattedDate;
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // carousel
  const track = document.querySelector('.carousel-track');
  if(track){
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let idx = 0;   
    function updateSlide() {
      track.style.transform = `translateX(-${idx * 100}%)`;
    }
    if(nextBtn && prevBtn){
      nextBtn.addEventListener('click', () => {
        idx = (idx + 1) % slides.length;
        updateSlide();
      });
      prevBtn.addEventListener('click', () => {
        idx = (idx - 1 + slides.length) % slides.length;
        updateSlide();
      });
    }
    updateSlide();
  }

  // change bg
  let colorBtn = document.getElementById('colorBtn');
  let colorIndex = 0;
  const bgcolors = ['#fdf6f0', '#f5e9da', '#ffe4c4', '#e8c1a0', '#d4af7a', '#795785', '#e3a978', '#c3346d'];
  if(colorBtn) {
    colorBtn.onclick = function() {
      colorIndex = (colorIndex + 1) % bgcolors.length;
      let mainBlock = document.querySelector('.main');
      if (mainBlock) {
        mainBlock.style.background = bgcolors[colorIndex];
      }
    };
  }

  // Show time
  const button = document.getElementById('show-time-btn');
  const output = document.getElementById('time-output');
  if(button && output) {
    button.addEventListener('click', function() {
      const now = new Date().toLocaleTimeString();
      output.textContent = 'Current time ' + now;
    });
  }

  // sidebar
  const sidebarItems = document.querySelectorAll('.sidebar ul li');
  let sidebarIndex = 0;
  if(sidebarItems.length > 0){
    sidebarItems[sidebarIndex].classList.add('active');
    document.addEventListener('keydown', function(e) {
      sidebarItems[sidebarIndex].classList.remove('active');
      if (e.key === 'ArrowDown') {
        sidebarIndex = (sidebarIndex + 1) % sidebarItems.length;
      } else if (e.key === 'ArrowUp') {
        sidebarIndex = (sidebarIndex - 1 + sidebarItems.length) % sidebarItems.length;
      } else if (e.key === 'Enter') {
        const link = sidebarItems[sidebarIndex].querySelector('a');
        if(link) {
          window.location.href = link.href;
        }
      }
      sidebarItems[sidebarIndex].classList.add('active');
    });
  }
});


$(document).ready(function() {
  // copy
  $(".copy-btn").on("click", function() {
    var text = $(this).siblings(".code-text").text();
    var $tooltip = $(this).siblings(".copied-tooltip");
    navigator.clipboard.writeText(text).then(function() {
      $tooltip.show();
      $(".copy-btn").text("✔");
      setTimeout(function() {
        $tooltip.hide();
        $(".copy-btn").text("Copy");
      }, 1200);
    });
  });

  // scroll bar
  $(window).on("scroll", function() {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height() - $(window).height();
    var scrollPercent = (scrollTop / docHeight) * 100;
    $("#scroll-progress").css("width", scrollPercent + "%");
  });
});
