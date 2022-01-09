export interface State {
    loadingStatus: loadingStatus,
    isLoggedIn: boolean,
    userName: string
}

export enum loadingStatus {
    beforeLoading,
    onLoading,
    afterLoading,
}

