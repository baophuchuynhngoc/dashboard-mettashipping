module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS',["jP8pb1lYsAhnmURarewxhA==","34xnLMYHY5jiU7ONTstTqQ=="]),
  },
  url: env('STRAPI_URL'),
});
