import React, { useState } from "react";
import * as moment from "moment";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "http/userAPI";
import MDModal from "components/UI/MDModal";

const TodoItem = ({ title, date = "", taskID }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation((formData) => deleteTodo(formData), {
    onSuccess: (response) => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"space-between"}
      mb={3}
      mx={1}
      sx={{
        background: "rgb(0 0 0 / 71%)",
        borderRadius: 2,
        padding: "5px 10px",
      }}
    >
      <Box>
        <Typography color={"white"}>{title}</Typography>
        <Typography color={"white"} fontSize="small">
          {moment(date).format("HH:mm, DD/MM/YYYY")}
        </Typography>
      </Box>
      <DeleteOutline
        color="error"
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
      />
      <MDModal
        open={open}
        handleClose={handleClose}
        title={"Are you sure you want to remove"}
      >
        <Box
          mt={3}
          gap={2}
          display={"flex"}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={() => {
            mutate({ taskID })
            handleClose()
            }} variant="outlined">
            Delete
          </Button>
        </Box>
      </MDModal>
    </Box>
  );
};

export default TodoItem;
