import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `DocuRequest`,
    siteUrl: `https://docurequest.hackhive.xyz`,
    description: `A professional document request portal`,
  },
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss"],
};

export default config;
