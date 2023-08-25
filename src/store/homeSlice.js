import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    query: "",
    connection_type: "",
    parsed:{}
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
    setParsed: (state,action) => {
      state.parsed = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, setQuery,setConnectionType, setParsed } = homeSlice.actions;

export default homeSlice.reducer;
