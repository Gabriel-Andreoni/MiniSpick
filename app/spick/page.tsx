"use client";

import { useAuth } from "@clerk/nextjs";
import MapClientWrapper from "../components/MapClientWrapper";
import { Menu } from "../components/Menu";
import { redirect } from "next/navigation";


export default function Spick() {
  const {userId} = useAuth();

  if(!userId) {
    redirect('/');
  }

  return (
    <div className="w-full h-screen p-2 flex justify-center items-center gap-2 relative overflow-hidden">
      <MapClientWrapper />
      <Menu />
    </div>
  );
}
