import { useEffect, useState } from "react";
import Perks from "./Perks";
import CheckInAndOut from "./CheckInAndOut";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import UploadPhotos from "./UploadPhotos";
import { Navigate, useParams } from "react-router-dom";

export default function AddNewProperty() {
  // State variables
  const { id } = useParams(); // to edit property
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    maxGuests: 1,
    checkIn: "",
    checkOut: "",
  });
  const [formPerks, setFormPerks] = useState({
    alarm: false,
    entrance: false,
    tv: false,
    parking: false,
    pets: false,
    wifi: false,
  });
  const [addedphoto, setAddedPhoto] = useState([]);
  const [photoLink, setPhotoLink] = useState([]);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get("/property/" + id).then((response) => {
      const { data } = response;
      setFormData(data);
      setFormPerks(data.perks);
      setAddedPhoto(data.photos);
    });
  }, [id]);

  const handleChange = (event) => {
    // Event handler for form inputs
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // Update the formPerks state for checkboxes
      setFormPerks((prevFormPerks) => {
        return {
          ...prevFormPerks,
          [name]: checked,
        };
      });
    } else {
      // Update the formData state for other input types
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
    }
  };

  //  Event handler for adding phones my links
  async function addPhotoLink() {
    if (photoLink.length !== 0) {
      try {
        const { data: photoName } = await axios.post("/uploadByLink", {
          link: photoLink,
        });
        setAddedPhoto((prevAddedPhoto) => {
          return [...prevAddedPhoto, photoName];
        });
      } catch (error) {
        console.error("Error uploading photo:", error);
        error.response && error.response.data && error.response.data.message
          ? // Displaying an error message to the user
            alert(error.response.data.message)
          : alert("An error occurred");
      }
      setPhotoLink([]);
    } else alert("Please insert a link");
  }

  //  Event handler for adding phones from device
  function uploadFromDevice(event) {
    // Get the selected files from the event
    const files = event.target.files;
    // Create a new FormData object to store the files
    const data = new FormData();

    // Loop through each file and append it to the FormData object
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    // Make a POST request to the "/uploadFromDevice" endpoint using axios
    axios
      .post("/uploadFromDevice", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        // Extract the photoNames data from the response
        const { data: photoNames } = response;
        // Update the addedPhoto state by appending the new photoNames
        setAddedPhoto((prevAddedPhoto) => {
          return [...prevAddedPhoto, ...photoNames];
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error uploading photos:", error);
        alert(error.response.data.message);
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addedphoto.length === 0) {
      // checking if user upload a photo
      return alert(`A minimum of one photo is needed!`);
    }

    const formsData = { ...formData, formPerks, addedphoto };
    if (id) {
      // update property
      try {
        await axios.put("/upateProperty", { id, ...formsData });
        // Displaying a success message to the user
        alert(`Property update was successfull!`);

        setRedirect("/host/property");
      } catch (error) {
        console.error("Error logging user:", error);
        error.response && error.response.data && error.response.data.message
          ? // Displaying an error message to the user
            alert(error.response.data.message)
          : alert("An error occurred");
      }
    } else {
      // Create new property
      try {
        await axios.post("/newProperty", { formsData });
        // Displaying a success message to the user
        alert(`New Property added successfully!`);

        setRedirect("/host/property");
      } catch (error) {
        console.error("Error logging user:", error);
        error.response && error.response.data && error.response.data.message
          ? // Displaying an error message to the user
            alert(error.response.data.message)
          : alert("An error occurred");
      }
    }
  };

  const headerText = (title, desc) => {
    // Helper function to render the header text
    return (
      <>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-ltc text-sm">{desc}</p>
      </>
    );
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <section className="flex justify-center">
      <section className="w-[80vw] my-10">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            {/* Title */}
            <label className="text-sm">
              {headerText(
                "Title",
                "Title for your property should be short and catchy as in advertisement."
              )}
              <input
                className="min-w-full rounded-xl bg-slate-100 py-1 px-3
                focus:outline-none placeholder:italic focus:shadow-md"
                type="text"
                onChange={handleChange}
                name="title"
                value={formData.title}
                required
                placeholder="Title for example: My Lovely house"
              />
            </label>

            {/* Address */}
            <label className="text-sm">
              {headerText("Address", "Address to this property.")}
              <input
                className="min-w-full rounded-xl bg-slate-100 py-1 px-3
                focus:outline-none placeholder:italic focus:shadow-md"
                type="text"
                onChange={handleChange}
                name="address"
                value={formData.address}
                required
                placeholder="Address"
              />
            </label>

            {/* Uploadphotos */}
            <UploadPhotos
              headerText={headerText}
              setPhotoLink={setPhotoLink}
              uploadFromDevice={uploadFromDevice}
              addPhotoLink={addPhotoLink}
              setAddedPhoto={setAddedPhoto}
              addedphoto={addedphoto}
              photoLink={photoLink}
            />

            {/* Description */}
            <label className="text-sm">
              {headerText("Description", "Description to this property.")}
              <textarea
                className="min-w-full rounded-xl bg-slate-100 py-1 px-3
                focus:outline-none placeholder:italic focus:shadow-md h-32"
                type="text"
                onChange={handleChange}
                name="description"
                value={formData.description}
                required
                placeholder="Description"
              />
            </label>

            {/* Perks */}
            <Perks
              headerText={headerText}
              formPerks={formPerks}
              handleChange={handleChange}
            />

            {/* Extra Info */}
            <label className="text-sm">
              {headerText("Extra Info", "More info to this property.")}
              <textarea
                className="min-w-full rounded-xl bg-slate-100 py-1 px-3
                focus:outline-none placeholder:italic focus:shadow-md h-32"
                type="text"
                onChange={handleChange}
                name="extraInfo"
                value={formData.extraInfo}
                required
                placeholder="Property rules, etc..."
              />
            </label>

            {/* Check In and Check Out Time */}
            <CheckInAndOut
              headerText={headerText}
              formData={formData}
              handleChange={handleChange}
            />

            {/* Submit Button */}
            <button
              className="flex justify-center items-center space-x-1 bg-tc 
              text-bgc p-2 hover:bg-opacity-80 rounded-full min-w-full"
            >
              <PlusIcon strokeWidth={2} className="w-5 h-5" />
              <span>Add Property</span>
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
