module.exports = {
    apps: [
      {
        name: 'strapi',
        script: 'yarn',
        args: 'start',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };