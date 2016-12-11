exports.client = {
  host: process.env.EXPERTS_CLIENT_URL || 'localhost',
  port: process.env.EXPERTS_CLIENT_PORT || 3000,
};

exports.server = {
  host: process.env.EXPERTS_SERVER_URL || 'localhost',
  port: process.env.EXPERTS_SERVER_PORT || 8080,
};
