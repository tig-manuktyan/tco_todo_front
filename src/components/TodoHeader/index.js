import React, { useState } from "react";
import { Box } from "@mui/material";
import AddTaskModal from "components/AddTaskModal";
import InputSearch from "components/InputSearch";

const TodoHeader = () => {

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={1}
      sx={{
        backgroundColor: "rgb(0 0 0 / 71%)",
        padding: "5px 10px",
        borderRadius: 2,
      }}
    >
      <InputSearch />
      <AddTaskModal />
    </Box>
  );
};

export default TodoHeader;
