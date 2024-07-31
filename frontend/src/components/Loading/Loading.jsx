

export const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center relative space-x-52">
    <div className="loading relative w-28 flex top-4">
      <span className="loading-span1 inline-block w-7 h-7 bg-black rounded-full absolute bottom-0"></span>
      <span className="loading-span2 inline-block w-7 h-7 bg-black rounded-full absolute bottom-0 left-10"></span>
      <span className="loading-span3 inline-block w-7 h-7 bg-black rounded-full absolute bottom-0 left-20"></span>
    </div>
    </div>
  );
};