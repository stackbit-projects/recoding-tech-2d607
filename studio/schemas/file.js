import { tryGetFile } from "@sanity/asset-utils";

export default {
  type: "document",
  name: "uploadedFile",
  title: "File uploads",
  preview: {
    select: {
      title: "title",
    },
  },
  fields: [
    {
      name: "title",
      title: "Title",
      description: "File title",
      type: "string",
    },
    {
      name: "theFile",
      title: "Upload file",
      type: "file",
    },
    {
      name: "generateUrl",
      title: "Generate URL",
      description: "Click generate to get link the file",
      type: "slug",
      options: {
        // this source takes all data that is currently in this document and pass it as argument
        // then tryGetFile() - getting file from sanity with all atributes like url, original name etc
        source: ({ theFile }) => {
          if (!theFile) return "Missing PDF File";
          const { asset } = tryGetFile(theFile?.asset?._ref, {
            dataset: process.env.SANITY_STUDIO_API_DATASET,
            projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
          });
          return asset?.url;
        },
        // this slugify prevent from changing "/" to "-" it keeps the original link and prevent from slugifying
        slugify: (link) => link,
      },
      validation: (Rule) => [Rule.required()],
    },
  ],
};
