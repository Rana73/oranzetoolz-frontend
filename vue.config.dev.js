module.exports = {
  publicPath: process.env.APP_BASE_PATH,
  outputDir: process.env.APP_OUTPUTDIR ,
  lintOnSave: false,

  devServer: {
    host: "localhost",
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
