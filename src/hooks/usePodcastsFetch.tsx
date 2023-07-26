import React from 'react'
import { PodcastListData, PodcastType } from '../types'
import { getNormalizedData } from '../utils'

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
        const newData = getNormalizedData(data)
        console.log(data)
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
