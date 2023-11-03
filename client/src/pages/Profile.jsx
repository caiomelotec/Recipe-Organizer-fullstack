import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";

export const Profile = () => {
  let { userId } = useParams();
  const [err, setErr] = useState(null);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  // upload User IMG
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:4000/uploaduserprofileimg",
        formData
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Function to update the user's profile image
  const handleUploadImg = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      await axios.put(
        "http://localhost:4000/updateuserprofileimg", // Corrected the URL
        {
          img: file ? imgUrl : "",
        },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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

  // Handle errors
  if (!user && err) {
    return <h1>{err}</h1>;
  } else if (!user) {
    return <h1>Loarding...</h1>;
  }

  const userdata = user ? user : null;

  return (
    <div>
      <img
        src={`../upload/${userdata.img}`}
        alt=""
        className="user-profile-img"
      />
      {/*  */}
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label className="file" htmlFor="file" id="file">
        Foto auswählen
      </label>
      <button onClick={handleUploadImg}>Update IMG</button>
      {/*  */}

      <h1>{userdata.firstname + " " + userdata.lastname}</h1>
    </div>
  );
};
