import Image from 'next/image'
import AudioPlayer from "./audio-player";

export default function Home() {
  return (
    <main className="min-h-screen p-24 container">
      <p className="text-9xl font-bold">Silence</p>
      <div>
        <div className="text-xl ml-2">Occasionally broken up by ..</div>
        <AudioPlayer className="asdf" />
      </div>
    </main>
  );
}
