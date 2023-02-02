import { TextField } from "@mui/material";
import React from "react";

const InputSearch = () => {
  return (
    <TextField
      size="small"
      placeholder="Search"
      fullWidth
      inputProps={{
        style: { color: "white" },
      }}
    />
  );
};

export default InputSearch;
