import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reviewsSlice from '../reducers/ReviewsSlice';
import userSlice from '../reducers/UserSlice';
import commentsSlice from '../reducers/CommentsSlice';

const rootReducer = combineReducers({
	reviewsSlice,
	userSlice,
	commentsSlice,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];