import { userActions } from "../reducers/userReducers";

export const logout = () => (dispatch) => {
    dispatch(userActions.resetUserInfor());
    localStorage.removeItem("account")
}