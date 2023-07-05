/* eslint-disable react/prop-types */
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

export default function PhotoCard({ data, setShowAllPhotos }) {
  return (
    <div
      className="relative flex gap-0.5 justify-center mt-6 mb-10 rounded-2xl
              overflow-hidden max-h-[29.5rem]"
    >
      {/* Main Photo */}
      <div className="w-full xs:w-4/6 sm:w-1/2">
        <img
          className="object-cover aspect-square"
          src={data.photos[0]}
          alt={data.photos[0]}
        />
      </div>
      {/* Secondary Photos (Hidden on smaller screens) */}
      <div className="w-1/3 sm:w-1/4 hidden xs:block space-y-0.5">
        <img
          className="object-cover aspect-square"
          src={data.photos[1]}
          alt={data.photos[1]}
        />
        <img
          className="object-cover aspect-square"
          src={data.photos[2]}
          alt={data.photos[2]}
        />
      </div>
      <div className="w-1/4 hidden sm:block space-y-0.5">
        <img
          className="object-cover aspect-square"
          src={data.photos[3]}
          alt={data.photos[3]}
        />
        <img
          className="object-cover aspect-square"
          src={data.photos[4]}
          alt={data.photos[4]}
        />
      </div>
      {/* Button to Show More Photos */}
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute flex items-center bg-lbgc bottom-5 px-2 py-1 
               right-5 rounded-md text-xs font-medium
               space-x-1 border-tc border shadow-md shadow-tc"
      >
        <ArrowsPointingOutIcon className="h-4 w-4" />
        <span>Show more photos</span>
      </button>
    </div>
  );
}
