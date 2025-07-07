export function Select() {
  return (
    <select
      name="qualidade-solo"
      className="p-4 border border-[#3ECF8E] rounded-lg text-white font-bold"
    >
      <option value="Ótimo" className="text-slate-950 font-bold">
        Ótimo
      </option>
      <option value="Bom" className="text-slate-950 font-bold">
        Bom
      </option>
      <option value="Ruim" className="text-slate-950 font-bold">
        Ruim
      </option>
      <option value="Péssimo" className="text-slate-950 font-bold">
        Péssimo
      </option>
    </select>
  );
}
