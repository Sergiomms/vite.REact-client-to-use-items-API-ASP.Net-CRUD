import { configureStore } from "@reduxjs/toolkit";
import { itemsReducer } from "./modules/items/reducer";

export const store = configureStore({
  reducer: {
    item: itemsReducer,
  },
})