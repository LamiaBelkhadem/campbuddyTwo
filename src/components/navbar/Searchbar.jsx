import { Autocomplete, Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const getRecommandations = async (client, searchQuery) => {
  const res = await client
    .get("/recommend?query=" + encodeURI(searchQuery))
    .then((resp) => resp.data);

  let normalizedResults = [];

  // Iterate over each model in the results array
  res.results.forEach((modelResult) => {
    // Extract model type and results
    const { model, results, points } = modelResult;

    // Normalize results by adding the model type to each result
    const normalizedResultsArray = results.map((result) => ({
      ...result,
      type: model, // Add the model type to each result
      points,
    }));

    // Add normalized results to the overall object
    normalizedResults = normalizedResults.concat(normalizedResultsArray);
  });

  return normalizedResults;
};

const createViewLink = (option) => {
  switch (option.type) {
    case "Lobby":
      return `/app/lobby/view/${option._id}`;
    case "User":
      return `/app/profiles/${option._id}`;
    case "Campsite":
      return `/app/campsites/${option._id}`;
  }
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = React.useState(false);
  const { axios } = useAxios();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations", searchQuery],
    queryFn: () => getRecommandations(axios, searchQuery),
    enabled: Boolean(searchQuery),
    initialData: [],
  });

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      sx={{
        marginRight: 12,
        backgroundColor: "white",
        height: 40,
        borderRadius: 40,
        width: 300,
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => (option ? option.name : "")}
      inputValue={searchQuery}
      onInputChange={(_, newValue) => {
        setSearchQuery(newValue);
      }}
      options={recommendations.length != 0 ? recommendations : []}
      loading={isLoading}
      onChange={(_, newValue) => {
        console.log(newValue, "navigating", createViewLink(newValue));
        navigate(createViewLink(newValue));
      }}
      groupBy={(option) => option.type}
      renderOption={(props, option, _, ownerState) => (
        <Box
          sx={{
            borderRadius: "8px",
          }}
          {...props}
        >
          {ownerState.getOptionLabel(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
