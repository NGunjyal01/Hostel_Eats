const BASE_URL = process.env.REACT_APP_BASE_URL

//Auth Endpoints
export const endpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
}

// Owner Endpoints 
export const ownerEndpoints = {
    CREATE_CANTEEN_API: BASE_URL + "/addCanteen",
    GET_ALL_CANTEEN_API: BASE_URL + "/getAllCanteen",
    GET_CANTEEN_DETAILS_API: BASE_URL + "/getCanteenDetails",
    EDIT_CANTEEN_API: BASE_URL + "/editCanteen",
    CREATE_ITEM_API: BASE_URL + "/addItem",
    EDIT_ITEM_API: BASE_URL + "/editItem",
    DELETE_ITEM_API: BASE_URL + "/deleleIem",
    DELETE_CANTEEN_API: BASE_URL + "/deleteCanteen" 
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}