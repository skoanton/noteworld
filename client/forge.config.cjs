const { set } = require('lodash');
const path = require('path');

module.exports = {
    packagerConfig: {
        icon: './public/icons/win/icon',
        asar: true,
        ignore: [
            /\.env$/,                  // Ignore .env file
            /\.env\.example$/,         // Ignore .env.example
            /config\.example\.json$/,  // Ignore config.example.json
            /README\.md$/,             // Ignore README.md
            /build/,                    // Ignore build folder
            /public/,                   // Ignore public folder
            /\.gitignore$/,            // Ignore .gitignore file
            /components\.json$/,      // Ignore components.json
            /eslint\.config\.js$/,     // Ignorera ESLint-konfiguration
            /postcss\.config\.js$/,    // Ignorera PostCSS-konfiguration
            /tailwind\.config\.js$/,   // Ignorera Tailwind-konfiguration
            /tsconfig\..*\.json$/,     // Ignorera alla TypeScript-konfigurationer
            /vite\.config\.ts$/,       // Ignorera Vite-konfiguration
            /config\.json$/,           // Ignorera config.json
        ],

    },
    rebuildConfig: {    
    },
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'Note-World',
                authors: 'skoanton',
                description: 'Fully encrypted notes',
                setupIcon: './public/icons/win/icon.ico',
                setupExe: 'Note-World.exe',
                noMsi: true,
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['win32'],
            config:{
                options: {
                    icon: './public/icons/win/icon.ico',
                }
            }
        },
        {
            name: '@electron-forge/maker-deb',
            platforms: ['linux'],
        },
        {
            name: '@electron-forge/maker-rpm',
            platforms: ['linux'],
        },
    ],
    hooks: {
        async beforeBuild() {
            const outDir = path.resolve(__dirname, 'out');
            if (fs.existsSync(outDir)) {
                fs.rmSync(outDir, { recursive: true, force: true });
                console.log('Old files in the out directory have been removed.');
            }
        },

    },
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'skoanton',
                    name: 'noteworld',
                },
                prerelease: false,
                draft: true,
            },
        },
    ],
};
