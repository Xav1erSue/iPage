import {loadingStatus, State} from "@/store/interface";

const mutations = {
    SAVE_USERNAME(state: State, userName: string): void {
        state.userName = userName;
    },
    CHANGE_LOGIN_STATUS(state: State, status: boolean): void {
        state.isLoggedIn = status;
    },
    CHANGE_LOADING_STATUS(state: State, status: loadingStatus): void {
        state.loadingStatus = status;
    }
}
export default mutations
