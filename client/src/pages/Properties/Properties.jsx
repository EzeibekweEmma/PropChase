import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Services() {
    const [properties, setProperties] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [noMatch, setNoMatch] = useState(false);
    useEffect(() => {
        // getting properties from properties endpoint
        axios.get("/properties").then((response) => {
            setProperties(response.data);
        });
    }, []);
    // while fetching data display loading indicator
    if (properties.length < 1) {
        return <Loading />;
    }

    // filter properties based on search input -> title | address
    const filteredProperties = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filtered = properties.filter((property) => {
            return searchText === ""
                ? properties
                : property.title.toLowerCase().includes(searchText) ||
                      property.address.toLowerCase().includes(searchText);
        });
        setFiltered(filtered);
        filtered.length < 1 ? setNoMatch(true) : setNoMatch(false);
        setTimeout(() => {
            setNoMatch(false);
        }, 5000);
    };
    // disable enter key on search input
    const handleKeyPress = (e) => {
        if (e.key === "Enter") e.preventDefault();
    };

    const displayProperty = filtered.length > 0 ? filtered : properties;
    // This code sets up a page to display a list of properties, fetches the property data from an API endpoint, and renders the properties along with their details
    return (
        <main>
            <section className="flex justify-center text-tc">
                <section className="w-[80vw] min-h-[60vh]">
                    <form
                        className="border mt-2 border-tc rounded-full
                        shadow-md shadow-slate-400 overflow-hidden relative"
                    >
                        <input
                            type="search"
                            className="h-full w-full outline-none indent-11 py-2 placeholder:italic
                            focus:bg-slate-100 text-lg pr-5 text-gray-500"
                            placeholder="Search for Buildings, Houses or Locations here...!"
                            onChange={(e) => filteredProperties(e)}
                            onKeyPress={handleKeyPress}
                        />
                        <span className="h-5 w-5 absolute left-4 top-2.5">
                            <MagnifyingGlassIcon className="h-full w-full text-tc stroke-2" />
                        </span>
                    </form>
                    {noMatch && (
                        <p className="text-tc text-center mt-2 animate-bounce">
                            No match found!
                        </p>
                    )}
                    <section
                        className="grid gap-x-6 gap-y-8 grid-cols-1 xs:grid-cols-2
          sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-8"
                    >
                        {displayProperty.length > 0 &&
                            displayProperty.map((property) => {
                                return (
                                    <Link to={property._id} key={property._id}>
                                        <div className="mb-2">
                                            {property.photos?.[0] && (
                                                <img
                                                    className="rounded-3xl object-cover aspect-square"
                                                    src={property.photos?.[0]}
                                                    alt={property.title}
                                                />
                                            )}
                                        </div>
                                        <h3 className="text-sm font-medium leading-tight">
                                            {property.title}
                                        </h3>
                                        <h4 className="text-xs truncate text-ltc leading-tight">
                                            {property.address}
                                        </h4>
                                        <h4 className="text-sm font-medium mt-1">
                                            <span className="font-bold">
                                                ${property.price}
                                            </span>{" "}
                                            per night
                                        </h4>
                                    </Link>
                                );
                            })}
                    </section>
                </section>
            </section>
        </main>
    );
}
