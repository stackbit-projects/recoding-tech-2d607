import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure, defaultDocumentNode} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Tech Policy Press',
  projectId: '3tzzh18d',
  dataset: 'production',
  // document: {
  //   productionUrl: async (prev, context) => {
  //     const {getClient, dataset, document} = context
  //     const client = getClient({apiVersion: '2019-01-29'})
  //     if (document._type === 'post') {
  //       const slug = await client.fetch(`*[_id == $postId].slug.current`, {
  //         postId: document._id,
  //       })
  //       const params = new URLSearchParams()
  //       params.set('preview', 'true')
  //       // params.set('dataset', dataset)

  //       return `localhost:3000/${slug}`
  //     }
  //     return prev
  //   },
  // },
  plugins: [
    // deskTool({structure: structure, defaultDocumentNode: defaultDocumentNodeResolver}),
    deskTool({structure, defaultDocumentNode}),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
