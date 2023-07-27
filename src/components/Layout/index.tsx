import { Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.css'

const Layout = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.line}>
          <h1 className={styles.title} onClick={handleClick}>Podcaster</h1>
        </div>
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
