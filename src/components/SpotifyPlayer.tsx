import React, { useState } from 'react';

interface SpotifyPlayerProps {
  onPlayTrack: () => Promise<void>;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ onPlayTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    try {
      await onPlayTrack();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error al reproducir la canción:', error);
    }
  };

  return (
    <div className="spotify-player">
      <h1>Spotify Player</h1>
      <button 
        className={`play-button ${isPlaying ? 'playing' : ''}`} 
        onClick={handlePlay}
      >
        {isPlaying ? 'Reproduciendo...' : 'Reproducir canción'}
      </button>
      <style jsx>{`
        .spotify-player {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: var(--color-background);
          color: var(--color-heading);
        }
        .play-button {
          padding: 12px 24px;
          background-color: var(--vt-c-indigo);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .play-button:hover {
          background-color: var(--vt-c-black-mute);
        }
        .play-button.playing {
          background-color: var(--vt-c-black-soft);
        }
      `}</style>
    </div>
  );
};

export default SpotifyPlayer;
