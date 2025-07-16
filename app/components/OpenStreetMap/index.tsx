"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import { GetCoords } from "@/app/actions/getCoords";
import { FichasList } from "../FichasList";
import { useFicha } from "@/app/context/FichaContext";
import { UserButton } from "@clerk/nextjs";

function getPolygonCenter(coords: [number, number][]): [number, number] {
  const latSum = coords.reduce((sum, [lat]) => sum + lat, 0);
  const lngSum = coords.reduce((sum, [, lng]) => sum + lng, 0);
  return [latSum / coords.length, lngSum / coords.length];
}

function CentralizeMap({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default function OpenStreetMap() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<
    { coords: [number, number][]; id: number }[]
  >([]);
  const [selectFazenda, setSelectFazenda] = useState<boolean>(false);
  const [fazenda, setFazenda] = useState<[number, number]>([
    -22.75734177542188, -47.74038494935669,
  ]);
  const { setCoordID } = useFicha();

  useEffect(() => {
    async function fetchData() {
      let coords = await GetCoords();
      const formattedCoords = coords.map((item) => ({
        coords: item.coords.map(([lng, lat]: [number, number]) => [
          lat,
          lng,
        ]) as [number, number][],
        id: item.id,
      }));

      setData(formattedCoords);
    }

    fetchData();
  }, []);

  return (
    <div className="w-full h-full  rounded-lg relative shadow-lg shadow-white/4">
      <div className="absolute top-4 right-30 z-[99999]">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "50px",
                height: "50px",
              },
            },
          }}
        />
      </div>
      <div
        onMouseEnter={() => setSelectFazenda((prevState) => !prevState)}
        onMouseLeave={() => setSelectFazenda((prevState) => !prevState)}
        className={`w-30 h-fit p-2 bg-[#121212] flex flex-col items-center gap-2 absolute bottom-12 left-4 z-9999 transition-all hover:w-60 overflow-hidden`}
      >
        <span
          className={`w-full p-2 text-center cursor-pointer  ${
            selectFazenda ? "w-full text-left" : ""
          } bg-white/10 text-white`}
          onClick={() => setFazenda([-22.75734177542188, -47.74038494935669])}
        >
          {selectFazenda ? "1 - Fazenda Nova Suiça" : "1"}
        </span>
        <span
          className={`w-full p-2 text-center cursor-pointer ${
            selectFazenda ? "w-full text-left" : ""
          } bg-white/10 text-white`}
          onClick={() => setFazenda([-22.804889, -48.106679])}
        >
          {selectFazenda ? "2 - Fazenda Anhembi" : "2"}
        </span>
      </div>
      <MapContainer
        center={fazenda}
        zoom={16}
        className="w-full h-full rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CentralizeMap center={fazenda} />

        {data.map((item) => {
          const center = getPolygonCenter(item.coords);

          return (
            <div key={item.id}>
              <Polygon
                key={item.id}
                positions={item.coords}
                color="green"
                eventHandlers={{
                  click: () => {
                    setModalOpen(true);
                    setCoordID(item.id);
                  },
                }}
              />

              <Marker
                position={center}
                icon={L.divIcon({
                  className: "font-bold text-xl",
                  html: `<div>${item.id}</div>`,
                  iconSize: [15, 15],
                  iconAnchor: [15, 15],
                })}
              />
            </div>
          );
        })}

        {modalOpen && (
          <FichasList modalOpen={modalOpen} setModalOpen={setModalOpen} />
        )}
      </MapContainer>

      <div className="absolute w-fit h-fit bg-red-500"></div>
    </div>
  );
}
