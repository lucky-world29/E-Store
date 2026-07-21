import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../Auth/authSlice";
import categoryReducer from "../Category/categorySlice";
import productReducer from "../Product/productSlice";
import cartReducer from "../Cart/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
    },
});