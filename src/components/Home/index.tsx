/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ListItem from '../ListItem'
import { PodcastType } from '../../types'
import styles from './index.module.css'

const Home = () => {
  const [podcasts, setPodcasts] = React.useState<PodcastType[]>([])

  React.useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        const data = await response.json()
        const newData = data.feed.entry.map((item: any) => {
          return {
            title: item.title.label,
            image: item['im:image'][2].label,
            author: item['im:artist'].label,
            id: item.id.attributes['im:id']
          }
        })
        setPodcasts(newData)
      } catch (error) {
        console.error('Error fetching podcasts:', error)
      }
    }

    fetchPodcasts()
  }, [])

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
