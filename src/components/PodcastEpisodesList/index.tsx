import React from 'react'
import { PodcastEpisodeData } from '../../types'
import { getEpisodeDuration, getReleaseDate } from '../../utils'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'

interface PodcastEpisodesListProps {
  count: number;
  episodes: PodcastEpisodeData[]
}

const tableHeader = ['Title', 'Date', 'Duration']

const PodcastEpisodesList = ({ count, episodes }: PodcastEpisodesListProps) => {
  const navigate = useNavigate()
  const handleMouseOverTrackTitle = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const fullText = event.currentTarget.innerText
    event.currentTarget.setAttribute('title', fullText)
  }

  const handleClickTrackTitle = (trackId: number) => {
    const currentPath = window.location.pathname
    navigate(`${currentPath}/episode/${trackId}`, { replace: false })
  }
  return (
    <div className={styles.countAndEpisodesContainer}>
      <div className={styles.episodesCount}>
        <h2> Episodes: {count} </h2>
      </div>
      <article className={styles.tableContainer}>
        <table>
          <thead className={styles.header}>
            <tr>
              {tableHeader.map((header) => <th align='left' colSpan={header === tableHeader[0] ? 5 : 1} key={header}> {header} </th>
              )}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {episodes.map((episode) => (
              <tr key={episode.trackId}>
                <td
                  colSpan={5} onMouseOver={handleMouseOverTrackTitle}
                  onMouseOut={(event) => event.currentTarget.removeAttribute('title')}
                  className={styles.trackName}
                  onClick={() => handleClickTrackTitle(episode.trackId)}
                >
                  {episode.trackName}
                </td>
                <td className={styles.releaseDate}> {getReleaseDate(episode.releaseDate)} </td>
                <td className={styles.episodeDuration}> {getEpisodeDuration(episode.trackTimeMillis)}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </article>
    </div>
  )
}

export default PodcastEpisodesList
