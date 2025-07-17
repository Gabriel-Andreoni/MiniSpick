"use client";

import { useState, useEffect } from "react";
import { ably } from "../utils/ably";
import { useUser } from "@clerk/nextjs";


export default function Chat() {
  const [messages, setMessages] = useState<{user: string, message: string}[]>([]);
  const [msg, setMsg] = useState("");
  const {user} = useUser();

  useEffect(() => {
    const channel = ably.channels.get("chat");

    channel.subscribe("message", (message) => {
      setMessages((prev) => [...prev, message.data]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  function sendMessage() {
    const messageData = {
        user: user?.fullName || user?.username || user?.emailAddresses[0]?.emailAddress,
        message: msg,
    }
    ably.channels.get("chat").publish("message", messageData);
    setMsg("");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[700px] h-[400px] p-2 flex flex-col bg-white/10">
        <div className="w-full h-full flex flex-col gap-2 mb-auto ">
          <>
            {messages.map((m, i) => (
              <p className="p-2 bg-white/10 text-white" key={i}>
                <strong className="text-[#3ECF8E]">{m.user}: </strong>
                {m.message}
              </p>
            ))}
          </>
        </div>
        <div className="w-full flex justify-evenly">
          <input
            value={msg}
            type="text"
            className="w-11/12 p-2 border border-[#3ECF8E] text-white outline-none"
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="1/12 p-2 bg-[#3ECF8E] text-[#121212] cursor-pointer"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
