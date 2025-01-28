import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { autoUpdater } from 'electron-updater';
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
        autoHideMenuBar: true,
    });

    mainWindow.loadURL(BASE_URL); // Eller byggda filer
    mainWindow.setMenu(null);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (!isDev) {
        autoUpdater.checkForUpdatesAndNotify();
    }

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


autoUpdater.on('update-available', () => {
    console.log('En ny uppdatering finns tillgänglig!');
});

autoUpdater.on('update-not-available', () => {
    console.log('Ingen uppdatering tillgänglig.');
});

autoUpdater.on('error', (err) => {
    console.error('Fel vid uppdatering:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
    console.log(`Nedladdning: ${progressObj.percent.toFixed(2)}%`);
});

autoUpdater.on('update-downloaded', () => {
    console.log('Uppdatering nedladdad. Startar om...');
    autoUpdater.quitAndInstall();
});