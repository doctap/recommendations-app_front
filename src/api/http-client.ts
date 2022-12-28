import { AxiosResponse } from "axios";
import { reviewsSlice } from "../redux/reducers/ReviewsSlice";
import { IUserData } from "../redux/reducers/UserSlice";
import { AppDispatch } from "../redux/store/store";
import { API_CONFIG } from "./axiosConfig/axiosConfig";
import { ILike, IUser, IRequestSlice, IResponseRegister, IReview, IRate } from "./data-contracts/data-contracts";

const SERVER_URI = process.env.REACT_APP_SERVER_URI;

export const fetchReviews = (slice: IRequestSlice) => async (dispatch: AppDispatch) => {
	try {
		dispatch(reviewsSlice.actions.reviewsFetching());
		const res = await API_CONFIG.post<IRequestSlice, AxiosResponse<IReview[]>>(`${SERVER_URI}/reviews`, slice);
		dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
	} catch (e: any) {
		dispatch(reviewsSlice.actions.reviewsFetchingError(e.message))
	}
}

export const fetchProtectedReviews = (body: IUser & IUserData & IRequestSlice) => async (dispatch: AppDispatch) => {
	try {
		dispatch(reviewsSlice.actions.reviewsFetching());
		const res = await API_CONFIG.post<IRequestSlice, AxiosResponse<IReview[]>>(
			`${SERVER_URI}/protectedReviews`, body, { headers: { Authorization: `Bearer ${body.token}` } }
		);
		dispatch(reviewsSlice.actions.reviewsFetchingSuccess(res.data));
	} catch (e: any) {
		dispatch(reviewsSlice.actions.reviewsFetchingError(e.message))
	}
}

export async function registerUser(body: IUser, token: string) {
	try {
		const res = await API_CONFIG.post<IUser, AxiosResponse<IResponseRegister>>(
			`${SERVER_URI}/registerUser`,
			{ sub: body.sub, given_name: body.given_name, family_name: body.family_name },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (e) {
		throw e
	}
}

export async function likeReview(body: ILike, token: string) {
	try {
		const res = await API_CONFIG.post<ILike>(
			`${SERVER_URI}/likeReview`,
			body,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (e) {
		throw e
	}
}

export async function giveRating(body: IRate, token: string) {
	try {
		const res = await API_CONFIG.post<IRate>(
			`${SERVER_URI}/giveRating`,
			body,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (e) {
		throw e
	}
}

export async function createReview(body: FormData) {
	try {
		const res = await API_CONFIG.post(
			`${SERVER_URI}/createReview`,
			body,
			{ headers: { "Content-type": "multipart/form-data" } }
		);
		return res.data;
	} catch (e) {
		throw e
	}
}

export async function getProtectedMessage(token: string) {
	let data = { message: '' }
	try {
		const response = await fetch(`${SERVER_URI}/1111`, {
			headers: {
				// добавляем заголовок авторизации с токеном
				Authorization: `Bearer ${token}`
			}
		})
		if (!response.ok) throw response
		data = await response.json()
	} catch (e) {
		throw e
	} finally {
		return data.message
	}
}



// likeReview({ isLike: true, reviewsId: 2 }, localStorage.getItem("reviewApp-token") ?? '')
// .then(r => console.log(r))
// .catch(e => loginWithRedirect())//разобраться с возможными ошибками