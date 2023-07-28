import { PodcastEpisodeData } from '../../types'
import AudioPlayer from '../AudioPlayer'
import styles from './index.module.css'

interface EpisodeDetailsProps {
  episode: PodcastEpisodeData;
}
const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  return (
    <article className={styles.episodeContainer}>
      <h2>
        {episode.trackName}
      </h2>
      <span>

        {episode.description}
      </span>
      <span />

      <AudioPlayer audioUrl={episode.episodeUrl} />
    </article>
  )
}

export default EpisodeDetails
