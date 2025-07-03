import { supabase } from "../lib/supabase";

export async function GetCoords() {
   const {data, error} = await supabase
   .from("Coords")
   .select("*");
   
   if(error) {
    throw new Error(`Erro ao buscar coordenadas: ${error.message}`);
   }

   return data;
}