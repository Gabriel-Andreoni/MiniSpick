import { CreateFicha } from "@/app/actions/createFicha";
import { Select } from "../Select";
import { Statistics } from "../Statistics";
import { useState } from "react";

type FichaProps = {
  coordID: undefined | number;
};

export function FichaForm({ coordID }: FichaProps) {
    const [canasPerdidas, setCanasPerdidas] = useState<string>('');
    const [canasColhidas, setCanasColhidas] = useState<string>('');
    const [metrosColhidos, setMetrosColhidos] = useState<string>('');
    const [avaliador, setAvaliador] = useState<string>('');
    const [turno, setTurno] = useState<string>('');
  return (
    <div className="w-full flex">
      <form
        className="w-6/12 h-full flex flex-wrap justify-center items-center gap-2 p-4 bg-white/10"
        action={async (formData: FormData) => {
          formData.append("coord_id", JSON.stringify(coordID));

          await CreateFicha(formData);
        }}
      >
        <div className="w-2/5 flex flex-col gap-2">
          <label htmlFor="qnt-cana" className="font-bold text-[#3ECF8E]">
            Qnt Canas Colhidas
          </label>
          <input
            className="w-full p-4 border border-[#3ECF8E] rounded-lg text-white font-bold outline-none"
            id="qnt-cana"
            name="qnt-cana"
            onChange={(e) => setCanasColhidas(e.target.value)}
          />
        </div>

        <div className="w-2/5 flex flex-col gap-2">
          <label htmlFor="canas-perdidas" className="font-bold text-[#3ECF8E]">
            Qnt Canas Perdidas
          </label>
          <input
            className="w-full p-4 border border-[#3ECF8E] rounded-lg text-white font-bold outline-none"
            id="canas-perdidas"
            name="canas-perdidas"
            onChange={(e) => setCanasPerdidas(e.target.value)}
          />
        </div>

        <div className="w-2/5 flex flex-col gap-2">
          <label htmlFor="metros-colhidos" className="font-bold text-[#3ECF8E]">
            Metros Colhidos
          </label>
          <input
            className="w-full p-4 border border-[#3ECF8E] rounded-lg text-white font-bold outline-none"
            id="metros-colhidos"
            name="metros-colhidos"
            onChange={(e) => setMetrosColhidos(e.target.value)}
          />
        </div>

        <div className="w-2/5 flex flex-col gap-2">
          <label htmlFor="qualidade-solo" className="font-bold text-[#3ECF8E]">
            Qualidade Solo
          </label>
          <Select />
        </div>

        <div className="w-2/5 flex flex-col gap-2">
          <label htmlFor="avaliador" className="font-bold text-[#3ECF8E]">
            Avalidor
          </label>
          <input
            className="w-full p-4 border border-[#3ECF8E] rounded-lg text-white font-bold outline-none"
            id="avaliador"
            name="avaliador"
            onChange={(e) => setAvaliador(e.target.value)}
          />
        </div>

        <div className="w-2/5 flex flex-col gap-2">
          <label htmlFor="turno" className="font-bold text-[#3ECF8E]">
            Turno
          </label>
          <input
            className="w-full p-4 border border-[#3ECF8E] rounded-lg text-white font-bold outline-none"
            id="turno"
            name="turno"
            onChange={(e) => setTurno(e.target.value)}
          />
        </div>

        <button className="w-[350px] mt-4 p-4 border border-[#3ECF8E] text-white rounded-lg cursor-pointer bg-[#3ecf8e1a] transition-all hover:bg-[#3ecf8e34]">
          Salvar
        </button>
      </form>

      <Statistics
        canasColhidas={canasColhidas}
        canasPerdidas={canasPerdidas}
        metrosColhidos={metrosColhidos}
        avaliador={avaliador}
        turno={turno}
      />
    </div>
  );
}
