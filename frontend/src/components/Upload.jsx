import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../.firebase.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #0000007a;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background: transparent;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background: transparent;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.soft};
  border: none;
  color: ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [video, setVideo] = useState(undefined);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadfile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImagePercentage(Math.round(progress))
          : setVideoPercentage(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      },
      (err) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrls) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadUrls };
          });
        });
      }
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  useEffect(() => {
    video && uploadfile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    image && uploadfile(image, "imgUrl");
  }, [image]);

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new Video</Title>
        <Label>Video : </Label>
        {videoPercentage > 0 ? (
          "Uploading " + videoPercentage + " %"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description.."
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Input
          value={tags}
          onChange={(e) => handleTags(e)}
          type="text"
          placeholder="Enter the tags comma seperated."
        />
        <Label>Image : </Label>
        {imagePercentage > 0 ? (
          "Uploading " + imagePercentage + " %"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
