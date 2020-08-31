module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    manifestOptions: {
      name: 'GamesDB',
      short_name: 'GamesDB',
      theme_color: '#424242',
      background_color: '#424242',
      display: 'standalone',
      icons: [
        {
          src: 'img/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'img/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    iconPaths: {
      favicon16: 'img/icons/favicon.ico',
      favicon32: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
  },
};
