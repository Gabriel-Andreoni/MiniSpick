'use client';

import dynamic from 'next/dynamic';

// Importa o mapa apenas no client
const Mapa = dynamic(() => import('@/app/components/OpenStreetMap'), {
  ssr: false,
});

export default function MapClientWrapper() {
  return <Mapa />
}