"use strict";

/**
 * `page-populate-middleware` middleware
 */

const mediaFields = ["url", "alternativeText", "caption", "width", "height"];

const mediaWithFields = () => ({
  fields: mediaFields,
});

const populate = {
  contentSections: {
    populate: {
      __component: "*",
      files: "*",
      file: "*",
      media: "*",

      // Buttons & text
      button: {
        fields: ["text", "url", "type", "newTab"],
      },
      buttons: {
        populate: true,
      },
      submitButton: {
        populate: true,
      },
      richText: {
        populate: {
          fields: ["body"],
        },
      },

      // Media (unified)
      picture: mediaWithFields(),
      blogs: {
        populate: {
          media: mediaWithFields(),
        },
      },
      testimonials: {
        populate: {
          picture: mediaWithFields(),
        },
      },
      feature: {
        populate: {
          fields: [
            "title",
            "description",
            "showLink",
            "newTab",
            "url",
            "text",
          ],
          media: mediaWithFields(),
        },
      },
      plans: {
        populate: ["product_features"],
      },
    },
  },
  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: {
      shareImage: true,
    },
  },
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    await next();
  };
};
