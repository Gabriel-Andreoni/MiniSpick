"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, use, useContext, useState } from "react";

type FichaContextType = {
  canasColhidas?: string;
  setCanasColhidas?: (v: string) => void;
  canasPerdidas?: string;
  setCanasPerdidas?: (v: string) => void;
  metrosColhidos?: string;
  setMetrosColhidos?: (v: string) => void;
  avaliador?: string;
  setAvaliador?: (v: string) => void;
  turno?: string;
  setTurno?: (v: string) => void;
  porcentagemCanas?: number;
  setPorcentagemCanas: (v: number) => void;
  coordID: undefined | number;
  setCoordID: (v: undefined | number) => void;
  userID: string | null | undefined;
};

const FichaContext = createContext({} as FichaContextType);

export function FichaProvider({ children }: { children: React.ReactNode }) {
  const {userId} = useAuth();
  const [canasColhidas, setCanasColhidas] = useState("");
  const [canasPerdidas, setCanasPerdidas] = useState("");
  const [metrosColhidos, setMetrosColhidos] = useState("");
  const [avaliador, setAvaliador] = useState("");
  const [turno, setTurno] = useState("");
  const [porcentagemCanas, setPorcentagemCanas] = useState<number>(0);
  const [coordID, setCoordID] = useState<undefined | number>();
  const [userID, setUserID] = useState<string | null | undefined>(userId)

  return (
    <FichaContext.Provider
      value={{
        canasColhidas,
        setCanasColhidas,
        canasPerdidas,
        setCanasPerdidas,
        metrosColhidos,
        setMetrosColhidos,
        avaliador,
        setAvaliador,
        turno,
        setTurno,
        porcentagemCanas,
        setPorcentagemCanas,
        coordID,
        setCoordID,
        userID,
      }}
    >
      {children}
    </FichaContext.Provider>
  );
}

export const useFicha = () => useContext(FichaContext)