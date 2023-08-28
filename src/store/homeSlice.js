import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    query: "",
    connection_type: "",
    parsed:null
  },
  reducers: {
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
export const { setQuery,setConnectionType, setParsed } = homeSlice.actions;

export default homeSlice.reducer;
