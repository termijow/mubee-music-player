import { useEffect, useState } from 'react';
import SpotifyPlayer from '@/components/SpotifyPlayer'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'next/router';

const PlayerPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Redirige a la página de autenticación si no hay token
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <h1>Mubee Music Player</h1>
      {token ? (
        <SpotifyPlayer token={token} />
      ) : (
        <p>Redirigiendo a la página de inicio...</p>
      )}
    </div>
  );
};

export default PlayerPage;
