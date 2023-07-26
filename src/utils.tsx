import { PodcastListType, PodcastEpisodes, PodcastEpisodesType, PodcastEpisodesDetails, PodcastEpisodeData, PodcastsFetchedData } from './types'

export const getPodcastsListNormalizedData = (data: PodcastsFetchedData): PodcastListType[] => {
  return data.feed.entry.map((item) => {
    return {
      title: item.title.label,
      image: item['im:image'][2].label,
      author: item['im:artist'].label,
      id: item.id.attributes['im:id']
    }
  })
}

export const getPodcastEpisodesDataNormalized = (data: PodcastEpisodes): PodcastEpisodesType => {
  const [details, ...episodes] = data.results
  return {
    count: data.resultCount - 1,
    details: details as PodcastEpisodesDetails,
    episodes: episodes as PodcastEpisodeData[]
  }
}
