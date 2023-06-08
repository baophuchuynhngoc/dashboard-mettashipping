"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      buttons: {
        populate: true,
      },
      feature: {
        populate: {
          fields: ["title", "description", "showLink", "newTab", "url", "text"],
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          icon: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          backgroundImage: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          }
        },
      },
      imgBackground : {
        fields:["url", "alternativeText", "caption", "width", "height"],
      },
      icon : {
        fields:["url", "alternativeText", "caption", "width", "height"],
      },
      paragraph : {
        populate: {
          fields:["description"],
        }
      },
      testimonials: {
        populate: {
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          fields:["location","star"],
          icon: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          }
        },
      },
      plans: {
        populate: ["product_features"],
      },
      submitButton: {
        populate: true,
      },
    },
  },
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

    await next();
  };
};
