import axios, { type CreateAxiosDefaults } from 'axios'

import { errorCatch } from './error'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4200/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true // задаем для серверных куков
}

const axiosClassic = axios.create(options) // для обычных запросов
const axiosWithAuth = axios.create(options) // для запросов требующих авторизацию

axiosWithAuth.interceptors.request.use(config => {
	const accesToken = getAccessToken()

	if (config?.headers && accesToken) {
		config.headers.Authorization = `Bearer ${accesToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true

			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeFromStorage()
				}
			}
		}
	}
)

export { axiosClassic, axiosWithAuth }
