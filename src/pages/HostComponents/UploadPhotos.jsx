/* eslint-disable react/prop-types */
import {
  PlusCircleIcon,
  CloudArrowUpIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as FilledStar } from "@heroicons/react/24/solid";

export default function UploadPhotos({
  headerText,
  uploadFromDevice,
  addPhotoLink,
  addedphoto,
  setPhotoLink,
  photoLink,
  setAddedPhoto,
}) {
  // set main photo to be first
  const MainPhoto = (link) => {
    setAddedPhoto([link, ...addedphoto.filter((photo) => photo !== link)]);
  };

  // delete button function
  const trashPhoto = (link) => {
    setAddedPhoto(addedphoto.filter((photo) => photo !== link));
  };

  // Display the photos
  const displayPhoto = addedphoto.map((link) => {
    return (
      <div key={link} className="relative">
        <img
          src={"http://127.0.0.1:3000/uploads/" + link}
          alt={link}
          className="h-20 w-20 sm:h-32 sm:w-32 object-cover rounded-xl"
        />
        <span onClick={() => MainPhoto(link)}>
          {link === addedphoto[0] ? (
            <FilledStar
              className="h-7 w-7 stroke-2 absolute left-1 bottom-1 bg-tc 
              text-green-500 p-1 rounded-lg cursor-pointer bg-opacity-50"
            />
          ) : (
            <StarIcon
              className="h-7 w-7 stroke-2 absolute left-1 bottom-1 bg-tc text-bgc
          p-1 rounded-lg hover:bg-green-500 cursor-pointer bg-opacity-50"
            />
          )}
        </span>
        <TrashIcon
          onClick={() => trashPhoto(link)}
          className="h-7 w-7 stroke-2 absolute right-1 bottom-1 bg-tc text-bgc
          p-1 rounded-lg hover:bg-red-500 cursor-pointer bg-opacity-50"
        />
      </div>
    );
  });

  return (
    <>
      {/* Photos Upload my links */}
      <label className="text-sm relative block">
        {headerText("Photos", "Photos of the property.")}
        <input
          className="min-w-full rounded-xl bg-slate-100 py-1 pl-3 pr-9
                focus:outline-none placeholder:italic focus:shadow-md"
          type="text"
          name="photoLink"
          value={photoLink}
          placeholder="Add photo using links... format: jpg"
          onChange={(event) => setPhotoLink(event.target.value)}
        />
        <span
          className="absolute inset-y-[3.85rem] right-0 flex pr-2
              items-center hover:cursor-pointer"
          onClick={addPhotoLink}
        >
          <PlusCircleIcon className="stroke-2 h-5 w-5" />
        </span>
      </label>

      {/* Display the photos */}
      <div className="flex gap-2 flex-wrap">
        {addedphoto.length !== 0 ? displayPhoto : "No photos uploaded!"}
      </div>

      {/* Photos Upload from device*/}
      <label className="text-sm">
        <input
          type="file"
          onChange={uploadFromDevice}
          name="photoLink"
          multiple
          accept="image/jpeg, image/png"
          hidden
        />
        <span
          className="inset-y-0 left-0 flex justify-center border-2 h-40
              items-center hover:cursor-pointer hover:bg-lbgc border-dashed"
        >
          <CloudArrowUpIcon className="stroke-1 h-10 w-10" />
          <span className="font-semibold">Upload From Device</span>
        </span>
      </label>
    </>
  );
}
