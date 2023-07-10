import LoadingIcon from "../assets/LoadingIcon";
export default function Loading() {
  // while fetching data display loading indicator
  return (
    <section className="flex justify-center items-center text-ltc min-h-[60vh]">
      <div className="max-w-sm">
        <LoadingIcon size={250} />
        <h2 className="text-center text-5xl font-medium italic animate-pulse">
          Loading...
        </h2>
      </div>
    </section>
  );
}
