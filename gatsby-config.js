module.exports = {
  siteMetadata: {
    title: `ion-cheat-sheet`,
    description: `An Ionic Framework v4 Cheat Sheet`,
    author: `@anagstef`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ion-cheat-sheet`,
        short_name: `ion-cheat-sheet`,
        start_url: `/`,
        background_color: `#4d8dff`,
        theme_color: `#4d8dff`,
        display: `minimal-ui`,
        icon: `src/images/ionic-icon.png`, // This path is relative to the root of the site.
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`
  ],
}
