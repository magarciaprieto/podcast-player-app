import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'

interface AudioPlayerProps {
  audioUrl: string;
}

interface PlayerState {
  isPlaying: boolean;
  showVolumeControl: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    showVolumeControl: false,
    volume: 1,
    currentTime: 0,
    duration: 0
  })

  const { isPlaying, showVolumeControl, volume, currentTime, duration } = playerState

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlayerState((prevState) => ({
        ...prevState,
        currentTime: audioRef.current?.currentTime as number
      }))
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setPlayerState((prevState) => ({
        ...prevState,
        duration: audioRef.current?.duration as number
      }))
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlayerState((prevState) => ({
        ...prevState,
        isPlaying: !prevState.isPlaying
      }))
    }
  }

  const handleVolumeIconClick = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      showVolumeControl: !prevState.showVolumeControl
    }))
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setPlayerState((prevState) => ({
      ...prevState,
      volume: newVolume
    }))
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return

    const progressBar = progressRef.current
    const progressBarWidth = progressBar.clientWidth
    const clickX = event.clientX - progressBar.getBoundingClientRect().left
    const seekPercentage = clickX / progressBarWidth
    const seekTime = duration * seekPercentage

    setPlayerState((prevState) => ({
      ...prevState,
      currentTime: seekTime
    }))

    audioRef.current.currentTime = seekTime
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  console.log(audioUrl)
  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} src={audioUrl} autoPlay={false} />

      <button className={styles.playButton} onClick={togglePlay}>
        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </button>

      <button className={styles.volumeIconButton} onClick={handleVolumeIconClick}>
        <FontAwesomeIcon icon={showVolumeControl ? faVolumeMute : faVolumeUp} />
      </button>

      {showVolumeControl && (
        <input
          className={styles.volumeControl}
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={volume}
          onChange={handleVolumeChange}
        />
      )}

      <div className={styles.progressBar} onClick={handleSeek} ref={progressRef}>
        <div className={styles.progress} style={{ width: `${(currentTime / duration) * 100}%` }} />
      </div>

      <span className={styles.reverseDuration}>{formatTime(duration - currentTime)}</span>
    </div>
  )
}

export default AudioPlayer
