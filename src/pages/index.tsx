import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;
  const scopes = process.env.NEXT_PUBLIC_SPOTIFY_SCOPES!;

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}`;

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get('access_token');
    if (token) {
      setAccessToken(token);
      localStorage.setItem('access_token', token);
      router.push('/player');
    } else {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) setAccessToken(storedToken);
    }
  }, [router]);

  const handleConnect = () => {
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Mubee Music Player</h1>
      <button onClick={handleConnect}>Conectar con Spotify</button>
      {accessToken && <p>Conectado a Spotify</p>}
    </div>
  );
};

export default Home;
