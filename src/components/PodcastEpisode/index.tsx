import { useParams } from 'react-router-dom'
import { PodcastEpisodeData, PodcastEpisodesDetails, PodcastEpisodesType } from '../../types'
import styles from './index.module.css'
import PodcastDetails from '../PodcastDetails'
import EpisodeDetails from '../EpisodeDetails'

const PodcastEpisode = () => {
  const { id, episodeId } = useParams()
  const podcast = (JSON.parse(localStorage.getItem(`podcastDetails-${id}`) as string) as PodcastEpisodesType)
  const episode = (JSON.parse(localStorage.getItem(`podcastDetails-${id}`) as string) as PodcastEpisodesType).episodes.find((item) => item.trackId === parseInt(episodeId as string))

  return (
    <section>
      {episode &&
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <PodcastDetails
              enableRouting
              podcastId={id as string}
              details={podcast?.details as PodcastEpisodesDetails}
            />
          </div>

          <div className={styles.episodeContainer}>
            <EpisodeDetails
              episode={episode as PodcastEpisodeData}
            />
          </div>

        </div>}
    </section>
  )
}

export default PodcastEpisode
