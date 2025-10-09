import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice.jsx";
import connectionReduucer from "./connectionSlice.js";
import requestReducer from "./requestSlice.jsx";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReduucer,
    request: requestReducer,
  },
});

export default appStore;
