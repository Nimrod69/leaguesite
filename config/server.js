var http = require('http');
var config = require('./config');

module.exports = function(app) {
  var port = normalizePort(config.port || process.env.PORT || '4999');
  app.disable('etag');
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) return val; // named pipe
    if (port >= 0) return port; // port number
    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') throw error;

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Site is listening on', bind, 'with pid', process.pid);
  }
};
