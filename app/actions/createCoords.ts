"use server";

import { supabase } from "../lib/supabase";

export async function createCoords(formData: FormData) {
    const coords = formData.get('coords');

    if(typeof coords !== 'string') {
        throw new Error('Coordenadas inválidas.');
    }

    const {error} = await supabase
        .from('Coords')
        .insert([
            {coords: JSON.parse(coords)}
        ]);

    
    if(error) {
        throw new Error(`Erro ao criar coordenadas: ${error.message}`);
    }
}