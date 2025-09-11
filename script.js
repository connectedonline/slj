const apps = [
  { name: "Notes", icon: "notes.png", path: "notes.html" },
  { name: "about", icon: "about.png", path: "about.html" },
  { name: "help", icon: "help.png", path: "help.html" },
  { name: "Race Game", icon: "game.png", path: "Game.html" },
  { name: "Terminal", icon: "terminal.png", path: "terminal.html" },
  { name: "Texter", icon: "texter.png", path: "texter.html" },
  { name: "Pelckmans Portaal", icon: "pelckmans.png", path: "pelckmans.html" },
  { name: "Scoodle", icon: "scoodle.png", path: "scoodle.html" },
  { name: "Google", icon: "google.png", path: "google.html" },
  { name: "Smartschool", icon: "smartschool.png", path: "smartschool.html" },
  { name: "Enable SLJ Pro", icon: "9520875.png", path: "pro.html" }
];

// ✅ Popup-venster zoals een OS
function openFile(path) {
  try {
    const appName = path.replace(/[^a-zA-Z0-9]/g, "_") + "_" + Date.now();
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes`;

    const appWindow = window.open(path, appName, features);

    if (appWindow) {
      appWindow.focus();
    } else {
      alert("Pop-ups zijn geblokkeerd. Sta pop-ups toe voor een betere ervaring.");
    }
  } catch (error) {
    console.error("Fout bij openen van app:", error);
  }
}

function loadApps() {
  const desktop = document.getElementById('desktop-icons');
  const menu = document.getElementById('menu-content');
  desktop.innerHTML = '';
  menu.innerHTML = '';

  let topOffset = 20;
  let leftOffset = 20;

  apps.forEach((app, index) => {
    const icon = document.createElement('div');
    icon.className = 'app-icon';
    icon.draggable = true;
    icon.style.top = `${topOffset}px`;
    icon.style.left = `${leftOffset}px`;
    icon.innerHTML = `
      <img src="${app.icon}" alt="${app.name}">
      <span>${app.name}</span>
    `;
    icon.onclick = () => openFile(app.path);
    desktop.appendChild(icon);

    topOffset += 100;
    if (topOffset > window.innerHeight - 100) {
      topOffset = 20;
      leftOffset += 100;
    }

    const btn = document.createElement('button');
    btn.textContent = app.name;
    btn.onclick = () => openFile(app.path);
    menu.appendChild(btn);
  });
}

window.onload = loadApps;



