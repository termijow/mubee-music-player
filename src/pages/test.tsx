import { useState } from 'react';
import TestSpotifyConnection from '../components/TestSpotifyConnection';

const TestPage = () => {
  const [token, setToken] = useState<string>(''); // Aquí se define setToken

  return (
    <div>
      <TestSpotifyConnection token={token} setToken={setToken} />
    </div>
  );
};

export default TestPage;
