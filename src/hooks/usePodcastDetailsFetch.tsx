import React from 'react'
import { PodcastEpisodes, PodcastEpisodesType } from '../types'
import { getPodcastEpisodesDataNormalized, getPodcastEpisodesDataURL } from '../utils'

const usePodcastDetailsFetch = (id: string) => {
  const [podcastDetails, setPodcastDetails] = React.useState<PodcastEpisodesType>()
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Get podcastDetails in localStorage, if there are any.
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
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

    const fetchPodcastEpisodesData = async () => {
      try {
        setLoading(true)

        const directURL = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
        const directResponse = await fetch(directURL)

        if (!directResponse.ok) {
          throw new Error('Failed to fetch podcast details')
        }

        const data: PodcastEpisodes = await directResponse.json()
        const newData = getPodcastEpisodesDataNormalized(data)

        localStorage.setItem(storageKey, JSON.stringify(newData))
        localStorage.setItem(`${storageKey}-lastFetchedDate`, String(new Date().getTime()))

        setPodcastDetails(newData)
        setLoading(false)
      } catch (error) {
        try {
          const allOriginsURL = getPodcastEpisodesDataURL(id)
          const fallbackResponse = await fetch(allOriginsURL)

          if (!fallbackResponse.ok) {
            throw new Error('Failed to fetch podcast details from the fallback URL')
          }

          const data = await fallbackResponse.json()
          const parsedData: PodcastEpisodes = JSON.parse(data.contents)
          const newData = getPodcastEpisodesDataNormalized(parsedData)

          localStorage.setItem(storageKey, JSON.stringify(newData))
          localStorage.setItem(`${storageKey}-lastFetchedDate`, String(new Date().getTime()))

          setPodcastDetails(newData)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error('Error fetching podcasts:', error)
        }
      }
    }

    fetchPodcastEpisodesData()
  }, [id])

  return { podcastDetails, isFetching: loading }
}

export default usePodcastDetailsFetch
