type StatisticsProps = {
  canasColhidas: string;
  canasPerdidas: string;
  metrosColhidos: string;
  avaliador: string;
  turno: string
};

export function Statistics({
  canasColhidas,
  canasPerdidas,
  metrosColhidos,
  avaliador,
  turno
}: StatisticsProps) {
  const canasCalc =
    (Number(canasColhidas) + Number(canasPerdidas)) /
    parseFloat(metrosColhidos);

  return (
    <div className="w-6/12 h-full p-12 bg-white/10">
      <div className="w-full">
        <span className="text-white text-xl">Porcentagem de Canas Peridas</span>
        <h1 className="font-bold text-white text-8xl">
          {Number.isNaN(canasCalc) ? "0" : canasCalc.toFixed(2) + "%"}
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
