import localProjects from '../data/projects.json'
import { isSanityConfigured, client } from './sanity'

export async function getProjects() {
  if (isSanityConfigured && client) {
    try {
  const query = '*[_type == "project"] | order(publishedAt desc){"slug": slug.current, title, short, technologies, thumbnail, description, details}'
      // @ts-ignore
      const data = await client.fetch(query)
      return data
    } catch (e) {
      console.error('Sanity fetch failed, falling back to local JSON', e)
      return localProjects
    }
  }
  return localProjects
}
