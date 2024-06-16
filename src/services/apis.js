const BASE_URL = process.env.REACT_APP_BASE_URL

//Auth Endpoints
export const endpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
}

// Customer Emdpoints
export const customerEndpoints = {
    SEARCH_ITEM_API: BASE_URL + "/customer/searchItem",
    SEARCH_ITEM_BY_CANTEEN_API: BASE_URL + "/customer/searchItemByCanteen",
    SET_CART_ITEMS_API: BASE_URL + "/customer/setCartItems",
    GET_CART_ITEMS_API: BASE_URL + "/customer/getCartItems",
    GET_ORDER_HISTROY_API: BASE_URL + "/customer/getOrderHistory",
    GET_FAVOURITE_ITEMS_API: BASE_URL + "/customer/getFavouriteItems",
    GET_CANTEEN_PAGE_DETAILS_API: BASE_URL + "/customer/getCanteenDetails"
}

// Owner Endpoints 
export const ownerEndpoints = {
    CREATE_CANTEEN_API: BASE_URL + "/owner/addCanteen",
    GET_ALL_CANTEEN_API: BASE_URL + "/owner/getAllCanteen",
    GET_CANTEEN_DETAILS_API: BASE_URL + "/owner/getCanteenDetails",
    EDIT_CANTEEN_API: BASE_URL + "/owner/editCanteen",
    CREATE_ITEM_API: BASE_URL + "/owner/addItem",
    EDIT_ITEM_API: BASE_URL + "/owner/editItem",
    DELETE_ITEM_API: BASE_URL + "/owner/deleteItem",
    DELETE_CANTEEN_API: BASE_URL + "/owner/deleteCanteen" 
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    UPDATE_EMAIL_API: BASE_URL + "/profile/updateEmail",
    UPDATE_PASSWORD_API: BASE_URL + "/profile/updatePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// Payment Endpoints
export const paymentEndpoints = {
    ORDER_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    ORDER_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const GET_POPULAR_DISHES_API = BASE_URL + "/getPopularDishes";