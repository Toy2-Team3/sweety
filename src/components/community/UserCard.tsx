import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import styled from "styled-components";
import { CommonData } from "../../constants/constant";

interface UserCardProps {
  item: CommonData;
}

const UserCard: React.FC<UserCardProps> = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="180"
        image={item.profileUrl}
        alt="Paella dish"
      />
      <CardContent sx={{ display: "grid", rowGap: 0.5 }}>
        <Typography variant="h6">{item.nickName} (30, 여)</Typography>
        <Typography variant="subtitle2">{item.introduction}</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Box
            sx={{
              display: "grid",
              rowGap: 0.3,
              gridTemplateRows: "repeat(3, 1fr)",
            }}
          >
            <Typography variant="body2">📍 {item.region}</Typography>
            <Typography variant="body2">💼 {item.job}</Typography>
            <Typography variant="body2">📏 {item.tall}cm</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              rowGap: 0.3,
              gridTemplateRows: "repeat(3, 1fr)",
            }}
          >
            <Typography variant="body2">🧩 {item.mbti}</Typography>
            <Typography variant="body2">🍺 가끔 마셔요</Typography>
            <Typography variant="body2">🚬 안 해요</Typography>
          </Box>
        </Box>
        <Box>
          {item.interested?.map((value) => {
            return <Tag>{value}</Tag>;
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;

const Tag = styled.span`
  display: inline-block;
  border-radius: 6px;
  margin: 0.3rem;
  padding: 0.3rem;
  background-color: ${(props) => props.theme.color.darkGray};
  font-size: 0.8rem;
  color: ${(props) => props.theme.color.black};
`;
