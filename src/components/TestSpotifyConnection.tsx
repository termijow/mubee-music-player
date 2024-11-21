import { useState } from 'react';

interface TestSpotifyConnectionProps {
  token: string;
  setToken: (token: string) => void;
}

const TestSpotifyConnection: React.FC<TestSpotifyConnectionProps> = ({ token, setToken }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleTestConnection = async () => {
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Conexión exitosa');
        setUser(data.user); // Guardamos la información del usuario
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
      <h1>Verificar Conexión con Spotify</h1>
      <input
        type="text"
        placeholder="Introduce tu token de Spotify"
        value={token}
        onChange={(e) => setToken(e.target.value)} // Cambié aquí para usar setToken
      />
      <button onClick={handleTestConnection}>Verificar conexión</button>

      {status && (
        <p className="status-message" style={{ color: status.includes('Error') ? 'red' : 'green' }}>
          {status}
        </p>
      )}
      {user && (
        <div className="user-details">
          <h2>Detalles del Usuario:</h2>
          <p><strong>Nombre:</strong> {user.display_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default TestSpotifyConnection;
