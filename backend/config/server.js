module.exports = ({ env }) => ({
  host: env('HOST'),
  port: 1337,
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('STRAPI_URL'),
  proxy: true
});
