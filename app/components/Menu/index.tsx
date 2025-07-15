"use client";

import { useState } from "react";

import Image from "next/image";

import BackIcon from "./img/back.png";
import NextIcon from "./img/next.png";

import { CoordsForm } from "../CoordsForm";
import { Apontamentos } from "../Apontamentos";

export function Menu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [coordsFormOpen, setCoordsFormOpen] = useState<boolean>(false);
  const [apontamentos, setApontamentos] = useState<boolean>(false);
  return (
    <div
      className={`w-4/12 h-screen flex flex-col justify-center items-center gap-2 ${
        menuOpen ? "translate-x-0" : "translate-x-10/12"
      } bg-[#121212] absolute top-0 right-0 z-[999999] transition-all`}
    >
      {menuOpen ? (
        <>
          <Image
            src={NextIcon}
            alt="Voltar"
            className="w-10 h-10 absolute top-4 left-4 cursor-pointer z-9999"
            onClick={() => setMenuOpen((prevState) => !prevState)}
          />

          {coordsFormOpen ? (
            <CoordsForm setCoordsFormOpen={setCoordsFormOpen} />
          ) : apontamentos ? (
            <Apontamentos modalApontamentos={apontamentos} setModalApontamentos={setApontamentos}/>
          ) : (
            <>
              <div
                onClick={() => setCoordsFormOpen((prevState) => !prevState)}
                className={`w-full p-4 bg-white/10 text-white text-center cursor-pointer transition-all hover:bg-white/20 ${
                  coordsFormOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                Criar Talhão
              </div>
              <div
                onClick={() => setApontamentos((prevState) => !prevState)}
                className={`w-full p-4 bg-white/10 text-white text-center cursor-pointer transition-all hover:bg-white/20 ${
                  apontamentos ? "opacity-0" : "opacity-100"
                }`}
              >
                Apontamentos
              </div>
            </>
          )}
        </>
      ) : (
        <Image
          src={BackIcon}
          alt="Voltar"
          className="w-10 h-10 absolute top-4 left-4 cursor-pointer"
          onClick={() => setMenuOpen((prevState) => !prevState)}
        />
      )}
    </div>
  );
}
