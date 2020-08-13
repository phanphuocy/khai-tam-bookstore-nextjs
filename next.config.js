const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        /* config for next-optimized-images */
        optimizeImagesInDev: true,
        //   mozjpeg,
      },
    ],
  ],
  { target: "serverless" },
  withBundleAnalyzer({})
);
