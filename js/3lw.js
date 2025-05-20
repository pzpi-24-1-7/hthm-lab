// 1. Create a function that outputs text with different font sizes.
function applyFontSize(text, size) {
  const output = document.getElementById("string-to-resize");
  output.textContent = text;
  output.style.fontSize = `${size}px`;
}

function handleForm1(event) {
  event.preventDefault();
  const text = document.getElementById("text").value;
  const size = document.getElementById("size1").value;
  applyFontSize(text, size);
}
// 2. Move image every second using style.top and style.left

function moveImage() {
  const img = document.getElementById("moving-img");
  document.getElementById("move-image").disabled = true;
  img.style.position = "absolute";

  setInterval(() => {
    const x = Math.floor(Math.random() * (window.innerWidth - 50));
    const y = Math.floor(Math.random() * (window.innerHeight - 50));
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
  }, 1000);
}

// 3. Find all <p> and change font size to 15px using getElementsByTagName and setAttribute
function resizeParagraphs(size) {
  const allParagraphs = document.getElementsByTagName("p");
  for (let p of allParagraphs) {
    p.setAttribute("style", `font-size: ${size}px`);
  }
}

function handleForm2(event) {
  event.preventDefault();
  const size = document.getElementById("size2").value;
  resizeParagraphs(size);
}

// 4. Text clock using setInterval
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// 5. Gradual wipe effect using timer
function wipeContent() {
  const wipeContent = document.getElementById("wipe-effect");
  let opacity = 1;

  const wipeTimer = setInterval(() => {
    opacity -= 0.05;
    if (opacity <= 0) {
      clearInterval(wipeTimer);
      wipeContent.style.display = "none";
    } else {
      wipeContent.style.opacity = opacity;
    }
  }, 200);
}

//Block 2
// 3. Change color of a square using a list of colors
function changeSquareColor(color) {
  const square = document.getElementById("color-square");
  square.style.backgroundColor = color;
}

// 4. Show mouse coordinates and key code
document.addEventListener("mousemove", function (e) {
  const info = document.getElementById("info");
  info.textContent = `Mouse: (${e.clientX}, ${e.clientY})`;
});

document.addEventListener("keydown", function (e) {
  const info = document.getElementById("info");
  info.textContent += ` | Key: ${e.key}`;
});

// 5. Font size buttons + cookies
function setFontSize(size) {
  const text = document.getElementById("resizable-text");
  text.style.fontSize = `${size}px`;
  document.cookie = `fontSize=${size}; max-age=31536000`; // 1 year
}
//fontSize=18; theme=dark; adHiddenUntil=2025-05-20T09:00:00
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

let currentFontSize = parseInt(getCookie("fontSize")) || 16;
setFontSize(currentFontSize);

function increaseFont() {
  currentFontSize += 2;
  setFontSize(currentFontSize);
}
function decreaseFont() {
  currentFontSize = Math.max(6, currentFontSize - 2);
  setFontSize(currentFontSize);
}

// 10. Ban HTML viewing (partial)
document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && e.key === "u") ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    e.key === "F12"
  ) {
    e.preventDefault();
    alert("View source is disabled");
  }
});

document.addEventListener("mousedown", function (e) {
  if (e.button === 2) {
    e.preventDefault();
    alert("View source is disabled");
  }
});
// fast right click

// Block 3
// 1. Ad banner slide in from the west, hide for a day
function showAdIfNotHidden() {
  const hiddenUntilStr = localStorage.getItem("adHiddenUntil");
  const now = new Date();

  if (!hiddenUntilStr || now > new Date(hiddenUntilStr)) {
    const ad = document.getElementById("ad-banner");
    ad.classList.remove("visually-hidden");
  }
}

function removeAd() {
  const ad = document.getElementById("ad-banner");
  ad.classList.add("visually-hidden");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  localStorage.setItem("adHiddenUntil", tomorrow.toISOString());
}

showAdIfNotHidden();

// 6. Disable text selection and copying
const protectedText = document.getElementById("protected-text");

// ban selection
protectedText.style.userSelect = "none";

// ban copying
protectedText.addEventListener("copy", function (e) {
  e.preventDefault();
  alert("Copying is disabled!");
});
