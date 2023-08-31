import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Tech Policy Press',

  projectId: '3tzzh18d',
  dataset: 'tpp-development',

  plugins: [deskTool(structure), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
