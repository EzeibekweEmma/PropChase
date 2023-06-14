export default function Services() {
  return (
    <main>
      <section className="flex justify-center text-tc">
        <section className="w-[80vw] min-h-startingH">
          <section
            className="grid grid-cols-3 border mt-2 border-tc
          rounded-full py-2 divide-x-2 divide-tc text-center
          shadow-md shadow-slate-400 items-center"
          >
            <div className="">Anywhere</div>
            <div>Any week</div>
            <div className="flex justify-center space-x-2 items-center">
              <span>Add guests</span>
              <button className="bg-tc text-white p-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </section>
          <section className=""></section>
        </section>
      </section>
    </main>
  );
}
