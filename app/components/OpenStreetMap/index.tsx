"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import Image from "next/image";

import './OpenStreetMap.css';
import CloseIcon from './img/close-icon.png';

export default function OpenStreetMap() {
  function HandleClick() {
    useMapEvent("contextmenu", () => {
      setModalOpen((prevState) => !prevState);
    });

    return null;
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[-22.75734177542188, -47.74038494935669]}
        zoom={16}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HandleClick />
      </MapContainer>

      {modalOpen && (
        <div className={`w-[800px] h-[400px] bg-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${modalOpen ? 'fade-in-scale' : ''} z-[99999]`}>
            <div className="w-full p-1 relative">
                <Image
                onClick={() => setModalOpen((prevState) => !prevState)}
                className="absolute top-2 right-2 cursor-pointer"
                src={CloseIcon}
                alt="ícone de fechar" 
                width={30} />
            </div>
        </div>
      )}
    </div>
  );
}
