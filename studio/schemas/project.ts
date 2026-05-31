export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'short', title: 'Short description', type: 'text' },
    { name: 'technologies', title: 'Technologies', type: 'array', of: [{ type: 'string' }] },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'details', title: 'Details', type: 'object', fields: [
      { name: 'problem', title: 'Problem', type: 'text' },
      { name: 'solution', title: 'Solution', type: 'text' },
      { name: 'impact', title: 'Impact', type: 'text' }
    ]}
  ]
}
