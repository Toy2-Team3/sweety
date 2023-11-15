import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const UserCard = () => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6">멋쟁이공룡 (30, 여)</Typography>
        <Typography variant="subtitle2">
          안녕하세요. 저는 멋쟁이공룡입니다. 앞으로 잘 지내봐요 :)
        </Typography>
        <Typography variant="body2">독서, 게임, 영화...</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
            <Typography variant="body2">📍 서울</Typography>
            <Typography variant="body2">💼 회사원</Typography>
            <Typography variant="body2">🧩 INFP</Typography>
          </Box>
          <Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
            <Typography variant="body2">🍺 가끔 마셔요</Typography>
            <Typography variant="body2">📏 166cm</Typography>
            <Typography variant="body2">🚬 안 해요</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
