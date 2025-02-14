import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    loginReducers: (state, action) => {
      // auth actions
      state.user = action.payload;
      return;
    },
  },
});

export const { loginReducers } = userSlice.actions;
export default userSlice.reducer;
