module.exports = {
  siteMetadata: {
    title: 'ion-cheat-sheet',
    description: 'An Ionic Framework Cheat Sheet',
    author: '@anagstef',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-135029208-3',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ion-cheat-sheet',
        short_name: 'ion-cheat-sheet',
        start_url: '/',
        background_color: '#4d8dff',
        theme_color: '#4d8dff',
        display: 'minimal-ui',
        icon: 'src/images/ionic-icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
};
