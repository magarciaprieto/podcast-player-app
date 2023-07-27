import React from 'react'
import { PodcastEpisodes, PodcastEpisodesType } from '../types'
import { getPodcastEpisodesDataNormalized } from '../utils'

const usePodcastDetailsFetch = (id: string) => {
  const [podcastDetails, setPodcastDetails] = React.useState<PodcastEpisodesType>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Get podcastDetails in localStorage, if there are any.
    const oneDayInMilliseconds = 24
    const storageKey = `${'podcastDetails'}-${id}`

    const storedPodcastsDetails = localStorage.getItem(storageKey)
    const lastFetchedDate = localStorage.getItem(`${storageKey}-lastFetchedDate`)

    if (storedPodcastsDetails && lastFetchedDate) {
      const parsedPodcasts: PodcastEpisodesType = JSON.parse(storedPodcastsDetails)
      // Check if there is 1 day diff.
      const currentTime = new Date().getTime()
      const lastFetchedTime = Number(lastFetchedDate)
      if ((currentTime - lastFetchedTime) < oneDayInMilliseconds) {
        setPodcastDetails(parsedPodcasts)
        return
      }
    }
    const fetchPodcastDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`)
        const data: PodcastEpisodes = await response.json()
        const newData = getPodcastEpisodesDataNormalized(data)
        // Save fetched data + current time on localStorage
        localStorage.setItem(storageKey, JSON.stringify(newData))
        localStorage.setItem(`${storageKey}-lastFetchedDate`, String(new Date().getTime()))

        setPodcastDetails(newData)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching podcasts:', error)
      }
    }

    fetchPodcastDetails()
  }, [id])

  return { podcastDetails, isFetching: loading }
}

export default usePodcastDetailsFetch
