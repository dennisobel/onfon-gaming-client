import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    query: "",
    connection_type: "",
    parsed:null,
    ip:""
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setConnectionType: (state, action) => {
      state.connection_type = action.payload;
    },
    setParsed: (state,action) => {
      console.log("setParsed",action.payload)
      state.parsed = action.payload;
    }, setIP: (state,action) => {
      state.ip = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setQuery,setConnectionType, setParsed, setIP } = homeSlice.actions;

export default homeSlice.reducer;
