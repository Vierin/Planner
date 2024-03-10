import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken } from '@/services/auth-token.service'

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
