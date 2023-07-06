module.exports = ({ env }) => ({
  host: env('HOST'),
  port: process.env.PORT,
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('STRAPI_URL'),
  proxy: true
});
