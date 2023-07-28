import React from 'react'
import ListItem from '../ListItem'
import styles from './index.module.css'
import usePodcastsFetch from '../../hooks/usePodcastsFetch'

interface HomeProps {
  onLoading: (value: boolean) => void
}
const Home = ({ onLoading }: HomeProps) => {
  const { podcasts, isFetching } = usePodcastsFetch()

  React.useEffect(() => {
    onLoading(isFetching)
  }, [isFetching, onLoading])

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
