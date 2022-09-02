import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ''),
    },
}

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/*.md`,
    fields: {
        title: { type: 'string', required: true },
        publishedAt: { type: 'string', required: true },
        tags: { type: 'string' },
        image: { type: 'string' },
    },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Post],
})