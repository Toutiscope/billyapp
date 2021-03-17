"use strict";

import { app, protocol, BrowserWindow, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    mainWindow.loadURL("app://./index.html");
  }

  const applicationMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(applicationMenu);
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function createAddWindow() {
  const addWindow = new BrowserWindow({
    height: 600,
    modal: true,
    parent: mainWindow,
    title: "Paramètres",
    width: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  addWindow.loadURL("http://localhost:8080/Parametres");
}

const mainMenuTemplate = [
  {
    label: "Fichier",
    submenu: [
      {
        label: "Quitter",
        accelerator: "CommandOrControl+Q",
        click() {
          app.quit();
        },
      },
      {
        role: "reload",
      },
    ],
  },
  {
    label: "Paramètres",
    submenu: [
      {
        label: "Modifier paramètres",
        click() {
          createAddWindow();
        },
      },
    ],
  },
  {
    label: "Précédent",
    click() {
      mainWindow.webContents.goBack();
    },
  },
  {
    label: "Accueil",
    click() {
      mainWindow.webContents.goToIndex(0);
    },
  },
];

// Fix display menuItem pb on Mac
if (process.platform === "darwin") {
  mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "DevTools",

    accelerator: "CommandOrControl+I",
    click(item, focusedWindow) {
      focusedWindow.toggleDevTools();
    },
  });
}
