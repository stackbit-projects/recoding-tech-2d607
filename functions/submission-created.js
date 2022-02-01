const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2021-03-25",
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: false,
});

exports.handler = async function (event, context, callback) {
  const { payload } = JSON.parse(event.body);

  const isContactForm = payload.data.formId === "contact-form";

  // Build the document JSON and submit it to SANITY
  if (isContactForm) {
    const contact = {
      _type: "contact_submission", // must match the name of the contact document type on the Sanity schema
      name: payload.data.name,
      email: payload.data.email,
      message: payload.data.message,
    };

    const result = await client
      .create(contact)
      .catch((err) => console.log(err));
      }

  callback(null, {
    statusCode: 200,
  });
};
