import React from 'react'
import { PodcastListType, PodcastsFetchedData } from '../types'
import { getPodcastsListNormalizedData } from '../utils'

const usePodcastsFetch = () => {
  const [podcasts, setPodcasts] = React.useState<PodcastListType[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Get podcasts in localStorage, if there are any.
    const oneDayInMilliseconds = 24
    const storageKey = 'podcastList'

    const storedPodcasts = localStorage.getItem(storageKey)
    const lastFetchedDate = localStorage.getItem(`${storageKey}-lastFetchedDate`)

    if (storedPodcasts && lastFetchedDate) {
      const parsedPodcasts: PodcastListType[] = JSON.parse(storedPodcasts)
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
        const data: PodcastsFetchedData = await response.json()
        console.log(data)
        const newData = getPodcastsListNormalizedData(data)
        // Save fetched data + current time on localStorage
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
