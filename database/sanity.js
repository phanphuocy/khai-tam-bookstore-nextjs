// client.js
import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.SANITY, // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
});
