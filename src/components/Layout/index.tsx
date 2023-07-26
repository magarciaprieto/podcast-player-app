import { Outlet } from 'react-router-dom'
import styles from './index.module.css'

const Layout = () => {
  return (
    <div className={styles.container}>
      <header>
        <div>
          <h1 className={styles.title}> Podcaster</h1>
          <div className={styles.line} /> {/* This div creates the line */}

        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
