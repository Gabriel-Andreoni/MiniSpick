"use client";

import { useState } from "react";

import Image from "next/image";

import BackIcon from './img/back.png';
import NextIcon from './img/next.png';
import { CoordsForm } from "../CoordsForm";



export function Menu() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <div className={`w-4/12 h-screen ${menuOpen ? 'translate-x-0' : 'translate-x-10/12'} bg-[#121212] absolute top-0 right-0 z-[999999] transition-all`}>
            {menuOpen ? (
                <>
                    <Image
                        src={NextIcon}
                        alt="Voltar"
                        className="w-10 h-10 absolute top-4 left-4 cursor-pointer"
                        onClick={() => setMenuOpen((prevState) => !prevState)}
                    />

                    <CoordsForm />
                </>


            ) : (
                <Image
                    src={BackIcon}
                    alt="Voltar"
                    className="w-10 h-10 absolute top-4 left-4 cursor-pointer"
                    onClick={() => setMenuOpen((prevState) => !prevState)}
                />
            )}


        </div>
    )
}