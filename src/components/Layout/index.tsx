import { Outlet, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import Loading from '../Loading'

interface LayoutProps {
  isLoading: boolean;
}

const Layout = ({ isLoading }: LayoutProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <h1 className={styles.title} onClick={handleClick}>Podcaster</h1>
          {isLoading && <Loading />}
        </div>
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
