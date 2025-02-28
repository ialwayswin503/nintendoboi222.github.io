document.addEventListener("DOMContentLoaded", () => {
  // thos is the array to hold them
  var splashTexts = [
    "Welcome to the site!",
    "Enjoy your stay!",
    "Have a great day!",
    "Check out our latest updates!",
    "Thanks for visiting!"
  ];

  
  function displaySplashText() {
    const splashElement = document.querySelector(".splash-text");
    if (splashElement) {
      const randomIndex = Math.floor(Math.random() * splashTexts.length);
      splashElement.textContent = splashTexts[randomIndex];
    }
  }

  // and this calls it
  displaySplashText();
});
