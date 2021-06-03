module.exports = {
    publicPath: '/',
    runtimeCompiler: true,
    devServer: {
      hot: true,
      disableHostCheck: true,
    },
    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        skipWaiting: true
      }
    },
    chainWebpack: config => {
      config.module
        .rule('mjs$')
        .test(/\.mjs$/)
        .include
        .add(/node_modules/)
        .end()
        .type('javascript/auto');
    },
    configureWebpack: {
      resolve: {
        extensions: ['*', '.mjs', '.js', '.vue', '.json']
      }
    },
    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
  }
  