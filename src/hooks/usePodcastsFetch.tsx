import React from 'react'
import { PodcastType } from '../types'

interface Podcast {
  'im:name': { label: string };
  'im:image': { label: string; attributes: { height: string } }[];
  summary: { label: string };
  'im:price': { label: string; attributes: { amount: string; currency: string } };
  'im:contentType': { attributes: { term: string; label: string } };
  rights: { label: string };
  title: { label: string };
  link: { attributes: { rel: string; type: string; href: string } };
  id: { label: string; attributes: { 'im:id': string } };
  'im:artist': { label: string; attributes: { href: string } };
  category: {
    attributes: { 'im:id': string; term: string; scheme: string; label: string };
  };
  'im:releaseDate': { label: string; attributes: { label: string } };
}

interface PodcastListData {
  feed: {
    author: { name: { label: string }; uri: { label: string } };
    entry: Podcast[];
  };
}

const usePodcastsFetch = () => {
  const [podcasts, setPodcasts] = React.useState<PodcastType[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Get podcasts in localStorage, if there are any.
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
    const storageKey = 'podcastList'

    const storedPodcasts = localStorage.getItem(storageKey)
    const lastFetchedDate = localStorage.getItem(`${storageKey}-lastFetchedDate`)

    if (storedPodcasts && lastFetchedDate) {
      const parsedPodcasts: PodcastType[] = JSON.parse(storedPodcasts)
      // Check if there is 1 day diff.
      const currentTime = new Date().getTime()
      const lastFetchedTime = Number(lastFetchedDate)
      if ((currentTime - lastFetchedTime) < oneDayInMilliseconds) {
        setPodcasts(parsedPodcasts)
        return
      }
    }
    const fetchPodcasts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        const data: PodcastListData = await response.json()
        const newData = data.feed.entry.map((item) => {
          return {
            title: item.title.label,
            image: item['im:image'][2].label,
            author: item['im:artist'].label,
            id: item.id.attributes['im:id']
          }
        })
        localStorage.setItem(storageKey, JSON.stringify(newData))
        localStorage.setItem(`${storageKey}-lastFetchedDate`, String(new Date().getTime()))

        setPodcasts(newData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching podcasts:', error)
      }
    }

    fetchPodcasts()
  }, [])

  return { podcasts, isFetching: loading }
}

export default usePodcastsFetch
