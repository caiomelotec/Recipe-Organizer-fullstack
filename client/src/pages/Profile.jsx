import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
  let { userId } = useParams();
  const [err, setErr] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/usersbyid/${userId}`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        setErr(err.response.data);
        console.log(err.response.data);
      }
    };
    if (userId) {
      fetchUserById();
    }
  }, [userId]);

  // handle errors
  if (!user && err) {
    return <h1>{err}</h1>;
  } else if (!user) {
    return <h1>Loarding...</h1>;
  }

  const userdata = user ? user : null;

  return (
    <div>
      <h1>{userdata.firstname}</h1>
    </div>
  );
};
