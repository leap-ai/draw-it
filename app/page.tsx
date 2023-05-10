// import Canvas from "./components/Canvas";

import Canvas from "./components/Canvas";

export default function Home() {
  const apiUrl = "/api/remix";

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center py-16 gap-4 px-4">
      <h1 className="text-black text-xl">Draw It</h1>

      <Canvas width={500} height={500} apiUrl={apiUrl} />
    </div>
  );
}
