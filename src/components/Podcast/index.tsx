import { useParams } from 'react-router-dom'
import usePodcastDetailsFetch from '../../hooks/usePodcastDetailsFetch'
import PodcastDetails from '../PodcastDetails'
import { PodcastEpisodesDetails } from '../../types'
import Loading from '../Loading'

const Podcast = () => {
  const { id } = useParams()
  const { podcastDetails, isFetching } = usePodcastDetailsFetch(id as string)

  if (isFetching) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      {podcastDetails &&
        <PodcastDetails podcastId={id as string} details={podcastDetails?.details as PodcastEpisodesDetails} />}
    </div>
  )
}

export default Podcast
