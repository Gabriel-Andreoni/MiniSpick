
import MapClientWrapper from "./components/MapClientWrapper";
import { Menu } from "./components/Menu";


export default function Home() {
  return <div className="w-full h-screen p-2 flex justify-center items-center gap-2 relative overflow-hidden">
    <MapClientWrapper />
    <Menu />
  </div>;
}
