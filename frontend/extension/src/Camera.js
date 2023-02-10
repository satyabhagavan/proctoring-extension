import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

function Camera() {
  const [imageSrc, setimageSrc] = useState(null);
  const [photoInterval, setPhotoInterval] = React.useState();
  const testDetails = JSON.parse(localStorage.getItem("testDetails"));
  const BASE_URL = "http://localhost:5000";

  const videoConstraints = {
    facingMode: "user",
  };

  useEffect(() => {
    async function sendImg() {
      if (imageSrc) {
        try {
          const data = imageSrc
            .toString()
            .replace("data:image/jpeg;base64,", "");

          const res = await axios.post(BASE_URL + "/image/save", {
            img: data,
            email: testDetails.email,
            testCode: testDetails.testCode,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    sendImg();
  }, [imageSrc]);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc2 = webcamRef.current.getScreenshot();
    setimageSrc(imageSrc2);
  }, [webcamRef]);

  const min = 1;
  setInterval(capture, min * 10 * 1000);

  return (
    <>
      <div>Camera</div>
      <div className="container">
        <Webcam
          audio={false}
          height={300}
          width={500}
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />

        {/* uncomment this to check if  */}
        {/* <button onClick={capture}>Capture photo</button> */}

        {/* uncomment this to use this to see */}
        {/* <img src={imageSrc} alt="ss" /> */}
      </div>
    </>
  );
}

export default Camera;
