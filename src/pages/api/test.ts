// pages/api/test.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      // Hacemos una petición a la API de Spotify para obtener información del usuario
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }

      const userData = await response.json();

      res.status(200).json({ user: userData });
    } catch (error) {
      res.status(401).json({ error: 'No autorizado o token inválido' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
