// import {SEOPane} from 'sanity-plugin-seo-pane'
import DocumentsPane from 'sanity-plugin-documents-pane'

const paneTitle = (schemaType) => {
  let title
  switch (schemaType) {
    case 'author':
      title = 'Articles by this author'
      break
    case 'topic':
      title = 'Documents referencing this topic'
      break
    case 'post':
      title = 'Documents referencing this article'
    default:
      title = 'Documents referencing this item'
  }
  return title
}

export const structure = async (S, context) => {
  return S.list()
    .title('Tech Policy Press')
    .items([
      ...S.documentTypeListItems(),
      S.listItem()
        .title('Featured topics')
        .child(
          S.documentList()
            .title(`Featured topics`)
            .schemaType('topic')
            .filter(`_type == "topic" && stackbit_model_type == 'page'`),
        ),
    ])
}

export const defaultDocumentNode = (S, {schemaType}) => {
  // Conditionally return a different configuration based on the schema type

  return S.document().views([
    S.view.form(),
    S.view
      .component(DocumentsPane)
      .options({
        query: `*[!(_id in path("drafts.**")) && references($id)]`,
        params: {id: `_id`},
      })
      .title(paneTitle(schemaType)),
  ])
}

// return S.document().views([S.view.form(), S.view.component(JsonView).title('JSON')])

// export const structure = (S) =>
//   S.document()
//     .schemaType('post')
//     .views([
//       S.view
//         .component(SEOPane)
//         .options({
//           // Retrieve the keywords and synonyms at the given dot-notated strings
//           // keywords: `seo.keywords`,
//           // synonyms: `seo.synonyms`,
//           url: (doc) => resolveProductionUrl(doc),

//           // Alternatively, specify functions (may be async) to extract values
//           // keywords: doc => doc.seo?.keywords,
//           // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
//           // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
//         })
//         .title('SEO'),
//     ])
