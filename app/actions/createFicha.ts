"use server"

import { supabase } from "../lib/supabase";

export async function CreateFicha(formData: FormData) {
    const qnt_canas = formData.get('qnt-cana')
    const canas_perdidas = formData.get('canas-perdidas')
    const metros_colhidos = formData.get('metros-colhidos')
    const qualidade_solo = formData.get('qualidade-solo')
    const avaliador = formData.get("avaliador")
    const turno = formData.get("turno")
    const coords_id = formData.get("coord_id")
    const porcentagemCanas = parseFloat((formData.get("porcentagemCanas")?.toString() || "0").replace(',', '.'))
    
    if(typeof metros_colhidos !== 'string') {
        throw new Error("Campo não pode ser vazio")
    }

    const {error} = await supabase
    .from("Ficha")
    .insert([
        {
            canas_colhidas: qnt_canas,
            canas_perdidas: canas_perdidas,
            metros_colhidos: parseFloat(metros_colhidos.replace(',', '.')),
            qualidade_solo: qualidade_solo,
            avaliador: avaliador,
            turno: turno,
            coords_id: coords_id,
            porcentagemCanas: porcentagemCanas
        }
    ])
    .select()

    if(error) {
        throw new Error(`Erro ao criar a ficha: ${error.message}`)
    }
}