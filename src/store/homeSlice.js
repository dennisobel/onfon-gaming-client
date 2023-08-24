import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    query: "",
    connection_type: "",
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setConnectionType: (state, action) => {
      state.connection_type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, setQuery,setConnectionType } = homeSlice.actions;

export default homeSlice.reducer;
