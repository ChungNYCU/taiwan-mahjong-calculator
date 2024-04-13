import Image from "next/image";
import MahjongSelector from "@/components/MahjongSelector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <MahjongSelector></MahjongSelector>
      </div>
    </main>
  );
}
