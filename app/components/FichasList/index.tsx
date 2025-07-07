import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";
import CloseIcon from "./img/close-icon.png";
import CanaIcon from "./img/cana-icon.png";

import "./FichasList.css";
import { Ficha } from "../Ficha";

type FichaListProps = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  coordID: undefined | number;
};

export function FichasList({ modalOpen, setModalOpen, coordID }: FichaListProps) {
  const [fichaOpen, setFichaOpen] = useState<boolean>(false);
  return (
    <div
      className={`w-[700px] h-[400px] bg-[#121212] rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${modalOpen ? "open" : ""
        } z-[99999] relative`}
    >
      <div className="w-full h-full p-4 flex justify-start relative">
        <Image
          onClick={() => setModalOpen(false)}
          className="absolute top-3 right-3 cursor-pointer"
          src={CloseIcon}
          alt="ícone de fechar"
          width={30}
        />

        <div
          className="w-36 h-28 mt-8 flex flex-col justify-center items-center gap-4 rounded-lg bg-white/10 cursor-pointer"
          onClick={() => {
            setFichaOpen((prevState) => !prevState);
          }}
        >
          <Image
            src={CanaIcon}
            alt="ícone de uma cana de açucar"
            width={48}
            height={48}
          />
          <h4 className="font-bold text-white">Cana de Açucar</h4>
        </div>
      </div>

      {fichaOpen && (
        <Ficha
          setFichaOpen={setFichaOpen}
          coordID={coordID}
        />
      )
      }
    </div>
  );
}
