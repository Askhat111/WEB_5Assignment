//1
document.addEventListener('DOMContentLoaded', function() {
  const myForm = document.querySelector('form');
  if (myForm) {
    myForm.addEventListener('submit', function(e) {
      let valid = true;
      let errors = [];
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
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

  //2
  document.querySelectorAll('.accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
        content.style.maxHeight = null;
      } else {
        content.style.display = "block";
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  //3
  const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popupForm = document.getElementById('popupForm');
const subscribeForm = document.getElementById('subscribeForm');
openPopupBtn.onclick = function() {
  popupForm.style.display = 'flex';
};

closePopupBtn.onclick = function() {
  popupForm.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == popupForm) {
    popupForm.style.display = 'none';
  }
};

subscribeForm.addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Thank you for subscribing!');
  popupForm.style.display = 'none';
  subscribeForm.reset();
});


  if (subscribeForm && popupForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      popupForm.style.display = 'none';
      alert('Thank you for subscribing!');
    });
  }
});

