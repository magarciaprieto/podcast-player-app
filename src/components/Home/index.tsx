/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItem from '../ListItem'
import styles from './index.module.css'
import usePodcastsFetch from '../../hooks/usePodcastsFetch'

const Home = () => {
  const { podcasts, isFetching } = usePodcastsFetch()

  if (isFetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'end', width: '100vw' }}>Loading</div>
    )
  }
  return (
    <div>
      <h1>Top 100 Podcasts</h1>
      <div className={styles.listContainer}>
        {podcasts.map((podcast, idx) => (
          <ListItem key={idx} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default Home
