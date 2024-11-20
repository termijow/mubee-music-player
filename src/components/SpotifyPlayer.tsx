import { useEffect, useState } from 'react';

interface SpotifyPlayerProps {
  token: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ token }) => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  useEffect(() => {
    let player: Spotify.SpotifyPlayer | null = null;

    const loadSpotifySDK = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (!window.Spotify) {
          console.error('Spotify SDK no está disponible');
          return;
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
          player = new window.Spotify.Player({
            name: 'Mubee Music Player',
            getOAuthToken: (cb: (token: string) => void) => cb(token),
            volume: 0.5,
          });

          // Eventos del reproductor
          player.addListener('ready', ({ device_id }) => {
            console.log('Reproductor listo con Device ID', device_id);
            setDeviceId(device_id); // Guardar el device ID
          });

          player.addListener('initialization_error', ({ message }) => {
            console.error('Error de inicialización:', message);
          });

          player.addListener('authentication_error', ({ message }) => {
            console.error('Error de autenticación:', message);
          });

          player.addListener('playback_error', ({ message }) => {
            console.error('Error de reproducción:', message);
          });

          player.connect().then((success: boolean) => {
            if (success) {
              console.log('Conectado al reproductor de Spotify');
            } else {
              console.error('No se pudo conectar al reproductor de Spotify');
            }
          });
        };
      };

      script.onerror = () => {
        console.error('Error al cargar el SDK de Spotify');
      };
    };

    loadSpotifySDK();

    // Limpieza del efecto
    return () => {
      if (player) {
        player.disconnect();
      }
      const script = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
      if (script) {
        script.remove();
      }
    };
  }, [token]);

  const playTrack = async (trackUri: string) => {
    if (!deviceId) {
      console.error('El device ID no está disponible');
      return;
    }

    if (!token) {
      console.error('No se proporcionó el token');
      return;
    }

    try {
      console.log('Token:', token); // Verifica que el token es válido
      console.log('Device ID:', deviceId); // Verifica que el device ID es válido
      console.log('Track URI:', trackUri); // Verifica que la URI es correcta

      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar la reproducción');
      }

      setCurrentTrack(trackUri); // Guardar la URI de la canción actual
      console.log('Pista en reproducción:', trackUri);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Mubee Music Player</h2>
      <p>Device ID: {deviceId || 'No disponible'}</p>

      <button
        onClick={() =>
          playTrack('spotify:track:12VjaTNEaCfDlvW1XPZTQ9') // Cambia por la URI de una canción válida
        }
        disabled={!deviceId}
      >
        Reproducir Canción
      </button>

      {currentTrack && <p>Reproduciendo: {currentTrack}</p>}
    </div>
  );
};

export default SpotifyPlayer;
