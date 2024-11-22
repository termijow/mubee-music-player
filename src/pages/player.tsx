import React from 'react';
import SpotifyPlayer from '../components/SpotifyPlayer';

const PlayerPage: React.FC = () => {
  const playSpecificTrack = async () => {
    const token = localStorage.getItem('spotify_token');
    const trackUri = 'spotify:track:12VjaTNEaCfDlvW1XPZTQ9'; // URI de la canción específica

    if (!token) {
      alert('Error: No se encontró un token válido. Por favor, autentícate nuevamente.');
      return;
    }

    try {
      // Verificar dispositivos activos
      const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const devicesData = await devicesResponse.json();

      if (!devicesData.devices || devicesData.devices.length === 0) {
        throw new Error('No hay dispositivos activos para reproducir música. Abre Spotify en un dispositivo.');
      }

      // Intentar reproducir la canción
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error al reproducir la canción');
      }

      console.log('Reproduciendo canción:', trackUri);
    } catch (err: any) {
      console.error('Error al intentar reproducir la canción:', err.message);
      alert(err.message);
    }
  };

  return <SpotifyPlayer onPlayTrack={playSpecificTrack} />;
};

export default PlayerPage;
