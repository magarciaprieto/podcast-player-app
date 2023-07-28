import React, { useState } from 'react'
import ListItem from '../ListItem'
import styles from './index.module.css'
import usePodcastsFetch from '../../hooks/usePodcastsFetch'
import Top100PodcastsIcon from '../Top100PodcastsIcon'

interface HomeProps {
  onLoading: (value: boolean) => void;
}

const Home = ({ onLoading }: HomeProps) => {
  const { podcasts, isFetching } = usePodcastsFetch()
  const [searchQuery, setSearchQuery] = useState('')

  React.useEffect(() => {
    onLoading(isFetching)
  }, [isFetching, onLoading])

  const filteredPodcasts = React.useMemo(() => {
    if (!searchQuery) {
      return podcasts
    }

    const searchTerm = searchQuery.toLowerCase()
    return podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(searchTerm) ||
        podcast.author.toLowerCase().includes(searchTerm)
    )
  }, [podcasts, searchQuery])

  return (
    <div>
      <div className={styles.searchContainer}>
        <Top100PodcastsIcon />
        <input
          className={styles.filter}
          type='text'
          placeholder='Filter podcasts...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.listContainer}>
        {filteredPodcasts.map((podcast, idx) => (
          <ListItem key={idx} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default Home
