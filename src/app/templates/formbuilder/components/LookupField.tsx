import React, { useState, useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface Film {
  title: string;
  year: number;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const LookupField = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/players")
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);

  console.log(data);
  return (
    <Stack spacing={1}>
      <Autocomplete
        id="data"
        getOptionLabel={(data: any) => `${data.first_name} ${data.last_name}`}
        options={data}
        isOptionEqualToValue={(option, value) =>
          option.first_name === value.first_name
        }
        noOptionsText={"No Data"}
        renderOption={(props, data) => (
          <Box component="li" {...props} key={data.id}>
            {data.first_name} {data.last_name}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
};

export default LookupField;
