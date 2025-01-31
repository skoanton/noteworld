import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { updateElectronApp, UpdateSourceType } from 'update-electron-app';

import log from 'electron-log/main';

// Optional, initialize the logger for any renderer process
log.initialize();
let mainWindow: BrowserWindow | null;
const isDev = !app.isPackaged;

const BASE_URL = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../index.html')}`;

if (BASE_URL === undefined) {
    throw new Error('BASE_URL must be provided');
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'icon.ico')
    });

    mainWindow.loadURL(BASE_URL); // Eller byggda filer
    mainWindow.setMenu(null);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (!isDev) {
        updateElectronApp({
            updateSource: {
                type: UpdateSourceType.ElectronPublicUpdateService,
                repo: 'skoanton/noteworld'
            },
            logger: log,
        })
    }

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});