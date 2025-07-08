"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";


import { GetCoords } from "@/app/actions/getCoords";
import { FichasList } from "../FichasList";

export default function OpenStreetMap() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<{ coords: [number, number][]; id: number }[]>([]);
  // Using undefined |
  const [coordID, setCoordID] = useState<undefined | number>(undefined)

  useEffect(() => {
    async function fetchData() {
      let coords = await GetCoords();
      const formattedCoords = coords.map((item) => (
        {
          coords: item.coords.map(([lng, lat]: [number, number]) => [lat, lng]) as [number, number][],
          id: item.id
        }
      ))

      setData(formattedCoords);
    }

    fetchData();
  }, []);


  return (
    <div className="w-full h-full  rounded-lg relative shadow-lg shadow-white/4">
      <MapContainer
        center={[-22.75734177542188, -47.74038494935669]}
        zoom={16}
        className="w-full h-full rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {data.map((item, index) => (
          <Polygon
            key={index}
            positions={item.coords}
            color="green"
            eventHandlers={{
              click: () => {
                setModalOpen(true);
                setCoordID(item.id);
              },
            }}
          />
        ))}

        {modalOpen && (
          <FichasList
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          coordID={coordID}
           />
        )}
      </MapContainer>
    </div>
  );
}
