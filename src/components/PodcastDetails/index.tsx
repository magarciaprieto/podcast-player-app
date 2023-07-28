import { PodcastEpisodesDetails, PodcastListType } from '../../types'
import styles from './index.module.css'

interface PodcastDetailsProps {
  podcastId: string;
  details: PodcastEpisodesDetails
}
const PodcastDetails = ({ details, podcastId }: PodcastDetailsProps) => {
  const { artistName, artworkUrl600 } = details
  const podcast: PodcastListType = (JSON.parse(localStorage.getItem('podcastList') as string) as PodcastListType[]).find((item) => item.id === podcastId) as PodcastListType

  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={artworkUrl600} alt='' />
      </div>
      <div className={styles.titleAndArtistContainer}>
        <span className={styles.title}>{podcast.title}</span>
        <span className={styles.artist}>by {artistName}</span>
      </div>
      <div className={styles.summaryContainer}>
        <span className={styles.description}>Description:</span>
        <span className={styles.summary}>{podcast.summary}</span>
      </div>
    </article>
  )
}

export default PodcastDetails
