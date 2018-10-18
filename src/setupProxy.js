const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/**/*', { target: 'http://localhost:9001' }));
  app.use(proxy('/img/**/*', { target: 'http://192.168.1.43:9001' }));
};