import React from 'react'
import { PodcastEpisodeData } from '../../types'
import DOMPurify from 'dompurify'
import AudioPlayer from '../AudioPlayer'
import styles from './index.module.css'

interface EpisodeDetailsProps {
  episode: PodcastEpisodeData;
}
const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  const sanitizedDescription = DOMPurify.sanitize(episode.description)

  return (
    <article className={styles.episodeContainer}>
      <div>
        <h2>
          {episode.trackName}
        </h2>
      </div>
      <div>
        <span dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>
      <div className={styles.audioPlayerContainer}>
        <AudioPlayer audioUrl={episode.episodeUrl} />
      </div>
    </article>
  )
}

export default EpisodeDetails
