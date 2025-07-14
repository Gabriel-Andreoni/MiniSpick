import { supabase } from "../lib/supabase";

export async function GetApontamentos() {
    const {data, error} = await supabase
    .from("Ficha")
    .select("*")

    if(error) {
        throw new Error(error.message)
    }

    return data;
}