"use server"

import { supabase } from "../lib/supabase";
import {auth} from '@clerk/nextjs/server';

export async function GetApontamentos() {
    const {userId} = await auth();
    const {data, error} = await supabase
    .from("Ficha")
    .select("*")
    .eq("userID", userId)

    if(error) {
        throw new Error(error.message)
    }

    return data;
}