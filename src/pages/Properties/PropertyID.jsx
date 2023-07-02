import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowsPointingInIcon, MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import BookingCard from "./BookingCard";
import PhotoCard from "./PhotoCard";
import PropertyDetails from "./PropertyDetails";

export default function PropertyID() {
  // Extract the id parameter from the URL using useParams()
  const { id } = useParams();
  // Define state variables using useState()
  const [property, setProperty] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  // Use useEffect() to fetch property data when the id changes
  useEffect(() => {
    if (!id) return;
    axios.get(`/property/${id}`).then((response) => setProperty(response.data));
  }, [id]);
  // If showAllPhotos is true, render the section with all photos
  if (showAllPhotos) {
    return (
      <section className="flex justify-center text-tc">
        <section className="w-[80vw] min-h-startingH">
          <div className="flex justify-center">
            <div className="mb-10">
              <h1 className="text-2xl font-semibold mb-5 mt-10">
                Photos of {property.title}
              </h1>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="sticky top-20 flex items-center bg-lbgc px-2 py-1 
               rounded-md text-xs font-medium shadow-md shadow-tc m-3
               space-x-1 border-tc border"
              >
                <ArrowsPointingInIcon className="h-4 w-4" />
                <span>Show less photos</span>
              </button>
              <div className="space-y-3 md:w-[40rem]">
                {property.photos.map((photo) => {
                  return (
                    <img
                      className="h-[30rem] w-full object-cover"
                      key={photo}
                      src={`http://127.0.0.1:3000/uploads/${photo}`}
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

  // Render the main section with property details
  return (
    <main>
      <section className="flex my-10 text-tc justify-center">
        <section className="flex justify-center w-[80vw] lg:w-[64rem] min-h-startingH">
          {/* render property if it exists */}
          {property && (
            <section>
              <div>
                <h1 className="text-2xl font-semibold">{property.title}</h1>
                <a
                  className="flex items-center space-x-1 text-xs font-medium underline"
                  target="_blank"
                  href={`https://maps.google.com/?q=${property.address}`}
                  rel="noreferrer"
                >
                  <MapPinIcon className="h-4 w-4" />
                  <span>{property.address}</span>
                </a>
              </div>

              <PhotoCard
                property={property}
                showAllPhotos={showAllPhotos}
                setShowAllPhotos={setShowAllPhotos}
              />

              <section className="grid gap-10 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <PropertyDetails property={property} />
                <BookingCard property={property} />
              </section>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
