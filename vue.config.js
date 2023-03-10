module.exports = {
  lintOnSave: false,

  devServer: {
    host: "localhost",
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
