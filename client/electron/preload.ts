import { contextBridge } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

interface Config {
    API_URL: string;
}

// Hämta API-nyckeln från systemets miljövariabler
let apiKey: string | undefined = process.env.NGROK_API_KEY;

if (!apiKey) {
    const configPath = path.join(__dirname, 'config.json');

    if (fs.existsSync(configPath)) {
        try {
            const config: Config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            apiKey = config.API_URL;
        } catch (error) {
            console.error('Could not read config.json:', error);
        }
    }
}
contextBridge.exposeInMainWorld('env', {
    NGROK_API_KEY: apiKey ?? '',
});
