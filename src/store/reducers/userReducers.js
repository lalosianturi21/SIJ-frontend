import { createSlice } from "@reduxjs/toolkit"

const userIntitialState = { userInfo: null };

const userSlice = createSlice({
    name: "user",
    initialState: userIntitialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        resetUserInfor(state, action) {
            state.userInfo = null
        },
    },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };