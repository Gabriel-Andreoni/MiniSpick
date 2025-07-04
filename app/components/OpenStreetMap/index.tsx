"use client";

import { useState, useEffect, use } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";


import { GetCoords } from "@/app/actions/getCoords";
import { FichasList } from "../FichasList";

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

        {modalOpen && <FichasList modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </MapContainer>
    </div>
  );
}
