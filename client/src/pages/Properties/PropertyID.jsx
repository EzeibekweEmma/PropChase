import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import BookingCard from "./BookingCard";
import PhotoCard from "../../components/PhotoCard";
import PropertyDetails from "./PropertyDetails";
import AllPhotos from "../../components/AllPhotos";

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
  // If showAllPhotos is true, render the AllPhotos component
  if (showAllPhotos) {
    return <AllPhotos data={property} setShowAllPhotos={setShowAllPhotos} />;
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
                  className="flex items-center space-x-1 w-fit text-xs font-medium underline"
                  target="_blank"
                  href={`https://maps.google.com/?q=${property.address}`}
                  rel="noreferrer"
                >
                  <MapPinIcon className="h-4 w-4" />
                  <span>{property.address}</span>
                </a>
              </div>
              {/* Group of photos preview*/}
              <PhotoCard
                data={property}
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
