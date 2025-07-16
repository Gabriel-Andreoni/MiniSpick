import { GetApontamentos } from "@/app/actions/getApontamentos";
import { ApontamentosProps } from "@/app/types/Apontamentos";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";

import CloseIcon from "./img/close-icon.png";

type ApontamentosModalProp = {
  modalApontamentos: boolean;
  setModalApontamentos: Dispatch<SetStateAction<boolean>>;
};

export function Apontamentos({
  modalApontamentos,
  setModalApontamentos,
}: ApontamentosModalProp) {
  const [apontamentos, setApontamentos] = useState<ApontamentosProps[]>([]);
  const [apontamentoAbertoID, setApontamentoAbertoID] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function getApontamentos() {
      const data = await GetApontamentos();
      setApontamentos(data);
    }

    getApontamentos();
  }, []);

  function FormartarData({ dataRAW }: { dataRAW: string }) {
    if (typeof dataRAW !== "string" || !dataRAW.trim())
      return <span>Data não disponível</span>;

    const data = new Date(dataRAW);

    if (isNaN(data.getTime())) return <span>Data Inválida</span>;

    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");

    const formattedData = `${data.toLocaleDateString("pt-BR")} ${horas}${
      horas.length > 10 ? "hr" : "hrs"
    } : ${minutos}min`;

    return <span>{formattedData}</span>;
  }

  return (
    <ul
      className={`w-full h-full pt-20 flex flex-col relative overflow-hidden ${
        apontamentoAbertoID ? "overflow-y-scroll" : ""
      }`}
    >
      <Image
        onClick={() => setModalApontamentos((prevState) => !prevState)}
        className={`${modalApontamentos ? "visible" : "hidden"} ${
          apontamentoAbertoID ? "hidden" : ""
        } w-10 h-10 absolute top-4 right-4 cursor-pointer`}
        src={CloseIcon}
        alt="ícone de fechar"
      />
      {apontamentos.map((apontamento) => {
        const isAberto = apontamento.id === apontamentoAbertoID;

        return (
          <li
            onClick={() =>
              setApontamentoAbertoID(isAberto ? null : apontamento.id)
            }
            className={`${isAberto ? "h-auto pt-20 bg-white/20" : ""}
        bg-white/10 p-6 flex flex-col gap-4 text-white cursor-pointer
        transition-all hover:bg-white/20 relative`}
            key={apontamento.id}
          >
            <Image
              className={`${
                isAberto ? "w-10 h-10 visible absolute top-4 right-4" : "hidden"
              }`}
              src={CloseIcon}
              alt="ícone de fechar"
            />

            <FormartarData dataRAW={apontamento.created_at} />

            {isAberto && (
              <>
                <div className="w-full flex flex-col">
                  <span>Porcentagem de Canas Perdidas</span>
                  <h2>{apontamento.porcentagemCanas}%</h2>
                </div>

                <div className="w-full flex flex-col">
                  <span>Canas Colhidas</span>
                  <h2>{apontamento.canas_colhidas}</h2>
                </div>

                <div className="w-full flex flex-col">
                  <span>Canas Perdidas</span>
                  <h2>{apontamento.canas_perdidas}</h2>
                </div>

                <div className="w-full flex flex-col">
                  <span>Avaliador</span>
                  <h2>{apontamento.avaliador}</h2>
                </div>

                <div className="w-full flex flex-col">
                  <span>Turno</span>
                  <h2>{apontamento.turno}</h2>
                </div>

                <div className="w-full flex flex-col">
                  <span>Talhão</span>
                  <h2>{apontamento.coords_id}</h2>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
