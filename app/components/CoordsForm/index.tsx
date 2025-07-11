import { createCoords } from "@/app/actions/createCoords";

export function CoordsForm() {
    return (
        <div className="w-5/5 h-11/12 mt-12 rounded-lg">
            <form
            action={async (formData:FormData) => {
                await createCoords(formData);
            }}
            className="h-full p-4 flex flex-col gap-2">
                <label
                htmlFor="coord"
                className="text-[#3ECF8E] font-bold"
                >Coordenadas do Talhão</label>
                <textarea
                className="w-full h-full p-4 border border-[#3ECF8E] rounded-lg resize-none outline-none text-white"
                id="coord"
                name="coords"
                ></textarea>
                <button className="w-full py-2 border border-[#3ECF8E] text-white rounded-lg cursor-pointer bg-[#3ecf8e1a] transition-all hover:bg-[#3ecf8e34]">Montar Talhão</button>
            </form>
        </div>
    )
}