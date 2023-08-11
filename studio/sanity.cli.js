import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineCliConfig({
  api: {
    projectId: '3tzzh18d',
    dataset: 'tpp-development',
  },
  // per https://github.com/sanity-io/sanity-plugin-seo-pane
  // "Compatibility with Sanity Studio v3 running on Vite"
  vite: (prev) => ({
    ...prev,
    plugins: [...prev.plugins, nodePolyfills({util: true})],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})
