import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { current_user } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${videoId}`);
      // console.log(res.data);
      setComments(res.data);
    };
    fetchComments();
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <Avatar src={current_user.img} alt='user image' />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </Container>
  );
};

export default Comments;
