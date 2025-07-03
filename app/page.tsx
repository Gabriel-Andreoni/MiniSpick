import { CoordsForm } from "./components/CoordsForm";
import MapClientWrapper from "./components/MapClientWrapper";
import { Statistics } from "./components/Statistics";

export default function Home() {
  return <div className="w-full h-screen p-8 flex justify-center items-center gap-2">
    <Statistics />
    <MapClientWrapper />
    <CoordsForm />
  </div>;
}
