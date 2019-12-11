import { UserDetailsContextType } from '../types'
import { LoginResponse } from '../generated/auth-graphql';

/**
 * Store the JWT token in localstorage
 * @param token the token received from the authentication header
 */
export const storeLocalStorageToken = (token: string) => {
	localStorage.setItem('Authorization', token)
}

/**
 * Get the the jwt from localstorage
 * if any. It might be expired
 */
export const getLocalStorageToken = (): string|null => {
	return localStorage.getItem('Authorization') || null;
}

/**
 * Remove the the jwt from localstorage
 * if any.
 */
export const deleteLocalStorageToken = (): void => {
	return localStorage.removeItem('Authorization');
}

/**
 * Store the user information in local context and call the function to store the received token
 * @param param0 user and token answered by the auth server
 * @param currentUser context data on the user
 */
export const handleLoginUser = ({ user, token }: LoginResponse, currentUser: UserDetailsContextType) => {
	token && storeLocalStorageToken(token);
	user && currentUser.setUserDetailsContextState((prevState) => {
		return {
			...prevState,
			id: user.id,
			username: user.username
		}
	})
}

export const logout = (setUserDetailsContextState: UserDetailsContextType['setUserDetailsContextState']) => {
	deleteLocalStorageToken();
	setUserDetailsContextState((prevState) => {
		return {
			...prevState,
			id: null,
			username: null
		}
	})
}