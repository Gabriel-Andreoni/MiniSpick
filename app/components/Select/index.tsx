export function Select() {
  return (
    <select
      name="qualidade-solo"
      className="p-4 border border-[#3ECF8E] rounded-lg text-white font-bold"
    >
      <option value="Ótimo" className="text-slate-950">
        Ótimo
      </option>
      <option value="Bom" className="text-slate-950">
        Bom
      </option>
      <option value="Ruim" className="text-slate-950">
        Ruim
      </option>
      <option value="Péssimo" className="text-slate-950">
        Péssimo
      </option>
    </select>
  );
}
