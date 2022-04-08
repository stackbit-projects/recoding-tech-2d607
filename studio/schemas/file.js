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
  ],
};
