import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      router.push('/player');
    } else {
      console.error('No se pudo obtener el token de acceso.');
    }
  }, [router]);

  return <h1>Verificando autenticación...</h1>;
};

export default Callback;
