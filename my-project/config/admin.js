module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '68c459a9d831fbf8afae87c790380e4b'),
  },
});
