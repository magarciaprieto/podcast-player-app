import { useParams } from 'react-router-dom'
import usePodcastDetailsFetch from '../../hooks/usePodcastDetailsFetch'
import PodcastDetails from '../PodcastDetails'
import { PodcastEpisodesDetails } from '../../types'
import styles from './index.module.css'
import Loading from '../Loading'
import PodcastEpisodesList from '../PodcastEpisodesList'

const Podcast = () => {
  const { id } = useParams()
  const { podcastDetails, isFetching } = usePodcastDetailsFetch(id as string)

  if (isFetching) {
    return (
      <Loading />
    )
  }
  return (
    <section>
      {podcastDetails &&
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <PodcastDetails podcastId={id as string} details={podcastDetails?.details as PodcastEpisodesDetails} />
          </div>

          <div className={styles.episodesListContainer}>
            <PodcastEpisodesList count={podcastDetails?.count} episodes={podcastDetails?.episodes} />
          </div>
        </div>}
    </section>
  )
}

export default Podcast
