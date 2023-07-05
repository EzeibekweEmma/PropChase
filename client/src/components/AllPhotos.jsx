/* eslint-disable react/prop-types */
import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";

export default function AllPhotos({ data, setShowAllPhotos }) {
  // The component takes in two props: `data` and `setShowAllPhotos`
  return (
    <section className="flex justify-center text-tc">
      <section className="w-[80vw] min-h-startingH">
        <div className="flex justify-center">
          <div className="mb-10">
            {/* Displays the title of the photo section */}
            <h1 className="text-2xl font-semibold mb-5 mt-10">
              Photos of {data.title}
            </h1>
            {/* Button to show less photos */}
            <button
              onClick={() => setShowAllPhotos(false)}
              className="sticky top-20 flex items-center bg-lbgc px-2 py-1 
               rounded-md text-xs font-medium shadow-md shadow-tc m-3
               space-x-1 border-tc border"
            >
              <ArrowsPointingInIcon className="h-4 w-4" />
              <span>Show less photos</span>
            </button>
            {/* Container for displaying the photos */}
            <div className="space-y-3 md:w-[40rem]">
              {data.photos.map((photo) => {
                return (
                  <img
                    className="h-[30rem] w-full object-cover"
                    key={photo}
                    src={photo}
                    alt={photo}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
