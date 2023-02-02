import React from "react";
import { Box } from "@mui/system";
import bgImage from "assets/images/bg-sign-in-cover.e5dabb486682cd2b2bf1.jpeg";
import TodoItem from "components/TodoItem";
import { Card, Skeleton, Typography } from "@mui/material";
import TodoHeader from "components/TodoHeader";
import { useQuery } from "react-query";
import { getTodos } from "http/userAPI";

const Home = () => {
  const { isLoading, data: todos } = useQuery("todos", () => getTodos());
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={"100vh"}
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card sx={{ padding: 5, width: "60%", background: "transparent" }}>
        <TodoHeader />
        <Box height={"300px"} mt={2} sx={{ overflowY: "scroll" }}>
          {isLoading ? (
            [1, 2, 3, 4].map((item) => (
              <Skeleton variant="text" sx={{ fontSize: "4.5rem" }} />
            ))
          ) : todos.list.length == 0 ? (
            <Box
              height={"100%"}
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography color="white">No Data</Typography>
            </Box>
          ) : (
            todos.list.map((item, index) => (
              <TodoItem
                title={item.title}
                date={item.date}
                key={index}
                taskID={item._id}
              />
            ))
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default Home;
