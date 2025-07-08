import Image from "next/image";

import CloseIcon from "./img/close-icon.png";
import { Dispatch, SetStateAction } from "react";
import { FichaForm } from "../FichaForm";
import { Statistics } from "../Statistics";

type FichaProps = {
  setFichaOpen: Dispatch<SetStateAction<boolean>>;
  coordID: undefined | number;
};

export function Ficha({ setFichaOpen, coordID }: FichaProps) {
  return (
    <div className="w-[900px] h-[600px] bg-[#121212] flex rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-white/10">
      <Image
        src={CloseIcon}
        className="absolute top-3 right-3"
        width={30}
        alt="Ícone de fechar"
        onClick={() => setFichaOpen(false)}
      />

      <FichaForm coordID={coordID} />
      <Statistics />
    </div>
  );
}
