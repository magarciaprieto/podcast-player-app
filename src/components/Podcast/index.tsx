import { useParams } from 'react-router-dom'
import usePodcastDetailsFetch from '../../hooks/usePodcastDetailsFetch'

const Podcast = () => {
  const { id } = useParams()
  const { podcastDetails, isFetching } = usePodcastDetailsFetch(id as string)
  console.log(podcastDetails, isFetching)
  return (
    <div>Podcast</div>
  )
}

export default Podcast
