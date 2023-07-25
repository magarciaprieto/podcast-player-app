/* eslint-disable quotes */
import styles from './index.module.css'

const ListItem = () => {
  return (
    <div className={styles.container}>
      <div className={styles.rectangle}>
        <div className={styles.empty} />
        <div className={styles.text}>
          <div className={styles.title}>Song Exploder</div>
          <div className={styles.author}>Author: NPR</div>
        </div>

        <div className={styles.circle}>
          <img className={styles.image} src='https://miro.medium.com/v2/resize:fit:720/format:webp/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg' alt='' />
        </div>
      </div>
    </div>
  )
}

export default ListItem
