import { useNavigate } from 'react-router-dom'
import { PodcastEpisodesDetails, PodcastListType } from '../../types'
import styles from './index.module.css'

interface PodcastDetailsProps {
  enableRouting?: boolean;
  podcastId: string;
  details: PodcastEpisodesDetails
}
const PodcastDetails = ({ enableRouting = false, details, podcastId }: PodcastDetailsProps) => {
  const { artistName, artworkUrl600 } = details
  const podcast: PodcastListType = (JSON.parse(localStorage.getItem('podcastList') as string) as PodcastListType[]).find((item) => item.id === podcastId) as PodcastListType

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/podcast/${podcastId}`, { replace: true })
  }
  return (
    <article className={styles.container}>
      <div className={styles.imageContainer}>
        <img onClick={enableRouting ? handleClick : undefined} className={`${styles.image} ${enableRouting ? styles.pointer : ''}`} src={artworkUrl600} alt='' />
      </div>
      <div className={styles.titleAndArtistContainer}>
        <span onClick={enableRouting ? handleClick : undefined} className={`${styles.title} ${enableRouting ? styles.pointer : ''}`}>{podcast.title}</span>
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
