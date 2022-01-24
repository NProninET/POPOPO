import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";
import { pink, red, blue, teal, cyan, yellow, magenta } from "@mui/material/colors";

const palette = {
  red: {
    main: red[500],
  },
  blue: {
    main: blue[500],
  },
  pink: {
    main: pink[100],
  },
  teal: {
    main: teal[600],
  },
  cyan: {
    main: cyan[500],
  },
  yellow: {
    main: yellow[400],
  },
};
const theme = createTheme({
  palette
});

export default function BasicSelect({ onChange }) {
  const changeColor = (e) => {
    onChange(e.target.style.backgroundColor);
  };
  const menuItems = Object.keys(palette).map( i => (
    <MenuItem
    sx={{ width: 50, height: 20 }}
    value={theme.palette.red.main}
    style={{backgroundColor: palette[i].main}}
    />
  ))

  return (

    <Box sx={{ width: 30, height: 50 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onClick={changeColor}
          defaultValue=''
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
}
