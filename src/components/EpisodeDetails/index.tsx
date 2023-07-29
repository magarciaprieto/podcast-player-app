import React from 'react'
import { PodcastEpisodeData } from '../../types'
import AudioPlayer from '../AudioPlayer'
import styles from './index.module.css'

interface EpisodeDetailsProps {
  episode: PodcastEpisodeData;
}
const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  return (
    <article className={styles.episodeContainer}>
      <div>
        <h2>
          {episode.trackName}
        </h2>
      </div>
      <div>
        <span>
          {episode.description}
        </span>
      </div>
      <div className={styles.audioPlayerContainer}>
        <AudioPlayer audioUrl={episode.episodeUrl} />
      </div>
    </article>
  )
}

export default EpisodeDetails
