import { useState } from 'react';
import TestSpotifyConnection from '../components/TestSpotifyConnection';

const TestPage = () => {
  const [token, setToken] = useState<string>(''); // Aquí se define setToken

  return (
    <div>
      <h1>Prueba de Conexión con Spotify</h1>
      <TestSpotifyConnection token={token} setToken={setToken} />
    </div>
  );
};

export default TestPage;
