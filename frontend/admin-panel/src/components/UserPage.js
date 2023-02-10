import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import axios from "axios";

function UserPage() {
  const { id, email } = useParams();

  const baseFolder = "/storage";

  let userFolder = baseFolder;
  userFolder = userFolder + `/${id}/${email}`;
  console.log(userFolder);
  const [images, setImages] = React.useState([]);
  const [imagesLinks, setImagesLinks] = React.useState([]);

  console.log(images);
  React.useEffect(() => {
    axios
      .get(BASE_URL + `/tests/${id}/user/${email}`)
      .then((res) => {
        console.log(res.data);
        setImages(res.data.listOfFiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, email]);

  React.useEffect(() => {
    setImagesLinks(images.map((img) => userFolder + `/${img}`));
  }, [images]);

  console.log(imagesLinks);

  return (
    <>
      <div className="user_images">
        <p>{id}</p>
        <p>{email}</p>
        {imagesLinks.map((each, ind) => {
          return <img src={each} alt={ind} />;
        })}
      </div>
    </>
  );
}

export default UserPage;
