import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "./Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation();
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`videos/search?q=${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);
  return (
    <Container>
      {videos.map((video) => {
        return <Card type="lg" key={video._id} video={video} />;
      })}
    </Container>
  );
};

export default Search;
