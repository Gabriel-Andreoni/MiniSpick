"use client";

import { useState, useEffect, use } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import Image from "next/image";

import './OpenStreetMap.css';
import CloseIcon from './img/close-icon.png';
import { GetCoords } from "@/app/actions/getCoords";

export default function OpenStreetMap() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<[number, number][][]>([]);

  useEffect(() => {
    async function fetchData() {
      let coords = await GetCoords();
      const formattedCoords = coords.map((item) => item.coords.map(([lng, lat]: [number, number]) => [lat, lng]) as [number, number][]);
      setData(formattedCoords);

      console.log(data);
    }

    fetchData();
  }, []);


  return (
    <div className="w-8/12 h-8/12  rounded-lg relative shadow-lg shadow-white/4">
      <MapContainer
        center={[-22.75734177542188, -47.74038494935669]}
        zoom={16}
        className="w-full h-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((coords, index) => (
          <Polygon
          key={index}
          positions={coords}
          color="green"
          eventHandlers={{
          click: () => setModalOpen((prevState) => !prevState),
          }}
           />
        ))}

        {modalOpen && (
          <div className={`w-[600px] h-[400px] bg-[#121212] rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${modalOpen ? 'open' : ''} z-[99999]`}>
            <div className="w-full p-1 relative">
              <Image
                onClick={() => setModalOpen((prevState) => !prevState)}
                className="absolute top-3 right-3 cursor-pointer"
                src={CloseIcon}
                alt="ícone de fechar"
                width={30} />
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  );
}
