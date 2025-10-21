document.addEventListener('DOMContentLoaded', function() {
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
});


document.addEventListener('DOMContentLoaded', function() {
  let btn = document.getElementById('colorBtn');
  let colorIndex = 0;
  const bgcolors = ['#fdf6f0', '#f5e9da', '#ffe4c4', '#e8c1a0', '#d4af7a', '#795785', '#e3a978', '#c3346d'];

  if(btn) {
    btn.onclick = function() {
      colorIndex = (colorIndex + 1) % bgcolors.length;
      let mainBlock = document.querySelector('.main');
      if (mainBlock) {
        mainBlock.style.background = bgcolors[colorIndex];
      }
    };
  }
});


document.addEventListener('DOMContentLoaded', function() {
  function updateDateTime() {
    const now = new Date();
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const formattedDate = now.toLocaleString('en-US', options);
    document.getElementById('datetime').textContent = formattedDate;
  }

  updateDateTime();
  setInterval(updateDateTime, 60000);
});


const button = document.getElementById('show-time-btn');
const output = document.getElementById('time-output');

button.addEventListener('click', function() {
  const now = new Date().toLocaleTimeString();
  output.textContent = 'Current time ' + now;
});



document.addEventListener('DOMContentLoaded', function() {
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

//6-th assignment
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



