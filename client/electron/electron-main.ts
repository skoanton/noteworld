import { app, BrowserWindow } from 'electron';
import * as path from 'path';
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
        },
    });

    mainWindow.loadURL(BASE_URL); // Eller byggda filer

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
