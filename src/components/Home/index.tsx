import ListItem from '../ListItem'
import styles from './index.module.css'
import usePodcastsFetch from '../../hooks/usePodcastsFetch'
import Loading from '../Loading'

const Home = () => {
  const { podcasts, isFetching } = usePodcastsFetch()

  if (isFetching) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      <div className={styles.listContainer}>
        {podcasts.map((podcast, idx) => (
          <ListItem key={idx} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default Home
