import { PodcastListData, PodcastType } from './types'

export const getNormalizedData = (data: PodcastListData): PodcastType[] => {
  return data.feed.entry.map((item) => {
    return {
      title: item.title.label,
      image: item['im:image'][2].label,
      author: item['im:artist'].label,
      id: item.id.attributes['im:id']
    }
  })
}
