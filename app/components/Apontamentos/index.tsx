import { GetApontamentos } from "@/app/actions/getApontamentos";
import { useEffect, useState } from "react";

type ApontamentosProps = {
  id: number;
  created_at: string;
  avaliador: string;
  canas_colhidas: string;
  canas_perdidas: string;
  metros_colhidos: number;
  porcentagemCanas: number;
  qualidade_solo: string;
  turno: string;
  coords_id: number;
};

export function Apontamentos() {
  const [apontamentos, setApontamentos] = useState<ApontamentosProps[]>([]);

  useEffect(() => {
    async function getApontamentos() {
      const data = await GetApontamentos();
      setApontamentos(data);
    }

    getApontamentos();
  }, []);

  function FormartarData({ dataRAW }: { dataRAW: string }) {
    console.log("dataRAW recebida", dataRAW);

    if (typeof dataRAW !== "string" || !dataRAW.trim())
      return <span>Data não disponível</span>;

    const data = new Date(dataRAW);

    if (isNaN(data.getTime())) return <span>Data Inválida</span>;

    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");

    const formattedData = `${data.toLocaleDateString(
      "pt-BR"
    )} ${horas}${horas.length > 10 ? 'hr' : 'hrs'} : ${minutos}min`;

    return <span>{formattedData}</span>;
  }

  return (
    <ul className="w-full">
      {apontamentos.map((apontamento, index) => {
        return (
          <li
          className="bg-white/10 p-6 text-white cursor-pointer transition-all hover:bg-white/20"
          key={index}>
            <FormartarData dataRAW={apontamento.created_at} />
          </li>
        );
      })}
    </ul>
  );
}
