import MemeAudioPlayer from "./audio-player";

export default function Home() {
  return (
    <main className="container min-h-screen p-24">
      <p className="text-9xl font-bold">Silence</p>
      <div>
        <div className="ml-2 text-xl">Occasionally broken up by ..</div>
        <MemeAudioPlayer />
      </div>
    </main>
  );
}
