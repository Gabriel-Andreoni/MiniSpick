"use client";

import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import { createCoords } from "@/app/actions/createCoords";

import CloseIcon from "./img/close-icon.png";

type CoordsFormProps = {
    setCoordsFormOpen: Dispatch<SetStateAction<boolean>>
}

export function CoordsForm({setCoordsFormOpen}:CoordsFormProps) {
  return (
    <div className="w-5/5 h-11/12 mt-12 rounded-lg">
      <form
        action={async (formData: FormData) => {
          await createCoords(formData);
        }}
        className="h-full p-4 flex flex-col gap-2 realtive"
      >
        <Image
        onClick={() => setCoordsFormOpen((prevState) => !prevState)}
        className="w-10 h-10 absolute top-4 right-4 cursor-pointer"
        src={CloseIcon} alt="ícone de fechar" />

        <label htmlFor="coord" className="text-[#3ECF8E] font-bold">
          Coordenadas do Talhão
        </label>
        <textarea
          className="w-full h-full p-4 border border-[#3ECF8E] rounded-lg resize-none outline-none text-white"
          id="coord"
          name="coords"
        ></textarea>
        <button className="w-full py-2 border border-[#3ECF8E] text-white rounded-lg cursor-pointer bg-[#3ecf8e1a] transition-all hover:bg-[#3ecf8e34]">
          Montar Talhão
        </button>
      </form>
    </div>
  );
}
