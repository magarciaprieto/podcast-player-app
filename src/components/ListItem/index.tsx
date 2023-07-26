import { useNavigate } from 'react-router-dom'
import { PodcastType } from '../../types'
import styles from './index.module.css'

interface ListItemProps {
  podcast: PodcastType
}
const ListItem = ({ podcast }: ListItemProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`podcast/${podcast.id}`)
  }
  return (
    <article className={styles.container} onClick={handleClick}>
      <div className={styles.rectangle}>
        <div className={styles.empty} />
        <div className={styles.text}>
          <div className={styles.title}>{podcast.title}</div>
          <div className={styles.author}>Author: {podcast.author}</div>
        </div>
      </div>
      <div className={styles.circle}>
        <img className={styles.image} src={podcast.image} alt='' />
      </div>
    </article>
  )
}

export default ListItem
