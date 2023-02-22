import { 
    configureStore, 
    combineReducers 
} from "@reduxjs/toolkit";
import instagramSlice from "./reducers/user/instagramSlice";

const rootReducer = combineReducers({
  posts: instagramSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
