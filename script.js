document.addEventListener('DOMContentLoaded', function() {
  //Authentication
  function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  function findUser(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(u => u.email === email && u.password === password);
  }

  function showProfile(user) {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
  }

  function hideProfile() {
    document.getElementById('signupSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('profileSection').style.display = 'none';
  }

  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  if (signupForm) {
    signupForm.onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(u => u.email === email)) {
        alert('This email is already registered!');
        return;
      }
      const user = { name, email, password };
      saveUser(user);
      alert('Sign up successful! You can now log in.');
      signupForm.reset();
    };
  }

  if (loginForm) {
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const user = findUser(email, password);
      if (user) {
        showProfile(user);
      } else {
        alert('Invalid credentials or user not found.');
      }
      loginForm.reset();
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = function() {
      hideProfile();
    };
  }

  //Day/Night Theme
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

  //Carousel
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
//api
document.getElementById('searchMovieBtn').addEventListener('click', () => {
  const title = document.getElementById('movieTitle').value;
  const apiKey = '51c55888'; 
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.Response === "True") {
        document.getElementById('movieResult').innerHTML = `
          <h3>${data.Title} (${data.Year})</h3>
          <img src="${data.Poster}" alt="${data.Title}" style="max-width:200px;">
          <p>${data.Plot}</p>
        `;
      } else {
        document.getElementById('movieResult').textContent = 'Фильм не найден';
      }
    })
    .catch(() => {
      document.getElementById('movieResult').textContent = 'Ошибка при запросе';
    });
});


//  Scroll Bar
  $(function() {
    $(window).on("scroll", function() {
      var scrollTop = $(window).scrollTop();
      var docHeight = $(document).height() - $(window).height();
      var scrollPercent = (scrollTop / docHeight) * 100;
      $("#scroll-progress").css("width", scrollPercent + "%");
    });
  });

}); 
