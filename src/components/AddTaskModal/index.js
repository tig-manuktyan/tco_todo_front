import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "http/userAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation((formData) => createTodo(formData), {
    onSuccess: (response) => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      setErrorMessage(error);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const dateValue = e.target.date.value;
    const formData = { title };

    if (dateValue) {
      formData.date = dateValue;
    }

    mutate(formData);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <AddCircleRounded sx={{ color: "white" }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={submitHandler}>
          <Box mb={2}>
            <TextField
              type={"text"}
              label="Title"
              id="title"
              variant="outlined"
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="date"
              id="date"
              fullWidth
              error={errorMessage}
              helperText={errorMessage && errorMessage.response?.data?.error}
            />
          </Box>
          <Box display="flex" justifyContent={'flex-end'}>
            <Button type="submit" variant="outlined">
              Add Task
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;
