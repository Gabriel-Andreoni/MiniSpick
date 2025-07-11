import { useFicha } from "@/app/context/FichaContext";
import { useEffect } from "react";

type StatisticsProps = {
  canasColhidas: string;
  canasPerdidas: string;
  metrosColhidos: string;
  avaliador: string;
  turno: string;
};

export function Statistics({
  canasColhidas,
  canasPerdidas,
  metrosColhidos,
  avaliador,
  turno,
}: StatisticsProps) {
  const { setPorcentagemCanas, porcentagemCanas } = useFicha();

  useEffect(() => {
    const colhidas = Number(canasColhidas);
    const perdidas = Number(canasPerdidas);
    const metros = Number(metrosColhidos);

    if(!isNaN(colhidas) && !isNaN(perdidas) && metros > 0) {
      const resultado = ((colhidas + perdidas) / metros) * 100;
      setPorcentagemCanas?.(Number(resultado.toFixed(2)));
    }
  },[canasColhidas, canasPerdidas, metrosColhidos, setPorcentagemCanas]);

  return (
    <div className="w-6/12 h-full p-12 bg-white/10">
      <div className="w-full">
        <span className="text-white text-xl">Porcentagem de Canas Peridas</span>
        <h1 className="font-bold text-white text-8xl">
          {porcentagemCanas + '%'}
        </h1>
      </div>
      <div className="w-full mt-12 flex gap-4 flex-wrap">
        <div>
          <span className="text-white text-xl">Canas Colhidas</span>
          <h1 className="font-bold text-white text-3xl">{canasColhidas}</h1>
        </div>

        <div>
          <span className="text-white text-xl">Canas Peridas</span>
          <h1 className="font-bold text-white text-3xl">{canasPerdidas}</h1>
        </div>

        <div className="w-full">
          <span className="text-white text-xl">Avaliador</span>
          <h1 className="font-bold text-white text-3xl">{avaliador}</h1>
        </div>
        <div className="w-full">
          <span className="text-white text-xl">Turno</span>
          <h1 className="font-bold text-white text-3xl">{turno}</h1>
        </div>
      </div>
    </div>
  );
}
