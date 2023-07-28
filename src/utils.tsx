import { PodcastListType, PodcastEpisodes, PodcastEpisodesType, PodcastEpisodesDetails, PodcastEpisodeData, PodcastsFetchedData } from './types'
import { DateTime, Duration } from 'luxon'
export const getPodcastsListNormalizedData = (data: PodcastsFetchedData): PodcastListType[] => {
  return data.feed.entry.map((item) => {
    return {
      title: item.title.label.substring(0, item.title.label.indexOf(' - ')),
      image: item['im:image'][2].label,
      author: item['im:artist'].label,
      id: item.id.attributes['im:id'],
      summary: item.summary.label
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

export const getEpisodeDuration = (timeInMiliseconds: number) => {
  const duration = Duration.fromMillis(timeInMiliseconds)
  const formattedTime = duration.toFormat('mm:ss')
  return formattedTime
}

export const getReleaseDate = (isoDate: string) => {
  const date = DateTime.fromISO(isoDate)
  const formattedDate = date.toFormat('d/M/yyyy')
  return formattedDate
}
