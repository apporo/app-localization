var path = require('path');

module.exports = {
  plugins: {
    appLocalization: {
      i18n: {
      	directory: path.join(__dirname, '../locales'),
      	queryParameter: 'lang',
      	defaultLocale: 'vi'
      }
    }
  }
};
