import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { slateEditor } from '@payloadcms/richtext-slate' // editor-import
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Trainings from './collections/Trainings'
import Registrations from './collections/Registrations'
import Media from './collections/Media'
import { viteBundler } from '@payloadcms/bundler-vite'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: viteBundler(), // bundler-config
  },
  editor: slateEditor({}), // editor-config
  collections: [Users, Trainings, Registrations, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
})
