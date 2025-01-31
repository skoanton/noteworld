module.exports = {
    packagerConfig: {
        icon: './public/icon',
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'Note-World',
                authors: 'skoanton',
                description: 'Fully encrypted notes',
                setupIcon: './public/icon.ico',
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['win32'],
            config:{
                options: {
                    icon: './public/icon.ico',
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
