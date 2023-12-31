import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PodcastEpisode from './components/PodcastEpisode'
import Podcast from './components/Podcast'
import PodcastsList from './components/PodcastsList'

const App = (): React.JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false)
  return (
    <Routes>
      <Route path='/' element={<Layout isLoading={loading} />}>
        <Route index element={<PodcastsList onLoading={setLoading} />} />
        <Route path='/podcast/:id' element={<Podcast onLoading={setLoading} />} />
        <Route path='/podcast/:id/episode/:episodeId' element={<PodcastEpisode />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}

export default App
