import React from 'react'
import { useParams } from 'react-router-dom'
import usePodcastDetailsFetch from '../../hooks/usePodcastDetailsFetch'
import PodcastDetails from '../PodcastDetails'
import { PodcastEpisodesDetails } from '../../types'
import styles from './index.module.css'
import PodcastEpisodesList from '../PodcastEpisodesList'

interface PodcastProps {
  onLoading: (value: boolean) => void
}

const Podcast = ({ onLoading }: PodcastProps) => {
  const { id } = useParams()
  const { podcastDetails, isFetching } = usePodcastDetailsFetch(id as string)

  React.useEffect(() => {
    onLoading(isFetching)
  }, [isFetching, onLoading])

  return (
    <section>
      {podcastDetails &&
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <PodcastDetails
              podcastId={id as string}
              details={podcastDetails?.details as PodcastEpisodesDetails}
            />
          </div>
          <div className={styles.episodesListContainer}>
            <PodcastEpisodesList
              count={podcastDetails?.count}
              episodes={podcastDetails?.episodes}
            />
          </div>
        </div>}
    </section>
  )
}

export default Podcast
