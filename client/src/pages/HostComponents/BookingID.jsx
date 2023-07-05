import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

export default function BookingID() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios.get("/bookings").then((response) => {
        const booking = response.data.find(({ _id }) => _id === id);
        if (booking) {
          setDetails(booking);
        }
      });
    }
  }, [id, user]);

  // if the user is not logged in navigate to the login page
  if (!user) return <Navigate to="/login" />;

  return (
    <main>
      <section className="flex justify-center">
        <section className=" w-[80vw] min-h-[48vh] my-5">
          {details && <div>BookingID {id}</div>}
        </section>
      </section>
    </main>
  );
}
