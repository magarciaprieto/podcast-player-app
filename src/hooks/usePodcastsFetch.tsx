import React from 'react'
import { PodcastListType, PodcastsFetchedData } from '../types'
import { getPodcastsDataURL, getPodcastsListNormalizedData } from '../utils'
import { PODCASTS_LIST_API_ENDPOINT } from '../shared/constants'

const usePodcastsFetch = () => {
  const [podcasts, setPodcasts] = React.useState<PodcastListType[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Get podcasts in localStorage, if there are any.
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
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

        const directURL = PODCASTS_LIST_API_ENDPOINT
        const directResponse = await fetch(directURL)

        if (!directResponse.ok) {
          throw new Error('Failed to fetch podcasts list')
        }

        const data: PodcastsFetchedData = await directResponse.json()
        const newData = getPodcastsListNormalizedData(data)

        localStorage.setItem(storageKey, JSON.stringify(newData))
        localStorage.setItem(`${storageKey}-lastFetchedDate`, String(new Date().getTime()))

        setPodcasts(newData)
        setLoading(false)
      } catch (error) {
        // Direct fetch failed, try using the fallback URL
        try {
          const allOriginsURL = getPodcastsDataURL()
          const fallbackResponse = await fetch(allOriginsURL)

          if (!fallbackResponse.ok) {
            throw new Error('Failed to fetch Podcasts from the fallback URL')
          }

          const data = await fallbackResponse.json()
          const parsedData: PodcastsFetchedData = JSON.parse(data.contents)
          const newData = getPodcastsListNormalizedData(parsedData)

          localStorage.setItem(storageKey, JSON.stringify(newData))
          localStorage.setItem(`${storageKey}-lastFetchedDate`, String(new Date().getTime()))

          setPodcasts(newData)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error('Error fetching podcasts:', error)
        }
      }
    }
    fetchPodcasts()
  }, [])

  return { podcasts, isFetching: loading }
}

export default usePodcastsFetch
