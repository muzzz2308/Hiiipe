export default function Loader() {
  return (
    <div className="bg-[#181818] h-screen w-screen flex justify-center items-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-white mt-4">Loading...</h2>
        <p className="text-zinc-400">Your adventure is about to begin</p>
      </div>
    </div>
  );
}
