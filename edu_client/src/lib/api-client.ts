import axios from "axios"
import { loaderStore } from "@/stores/genericStores"
import { getFusionAuthToken, clearFusionAuthData } from "./fusionauth-utils"

const axiosInstance = axios.create({
  baseURL:
    `${import.meta.env.VITE_DJANGO_API_URL || "http://localhost:8000"}` +
    `/${import.meta.env.VITE_API_VERSION || "api/v1"}`,
  headers: { "Content-Type": "application/json" },
})

// Track ongoing requests (so we only hide loader when all are done)
let activeRequests = 0

axiosInstance.interceptors.request.use(async (config) => {
  // ✅ Show loader globally on first request
  if (activeRequests === 0) loaderStore.show("Please wait...")
  activeRequests++

  // Get FusionAuth access token
  const accessToken = getFusionAuthToken()
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--
    if (activeRequests === 0) loaderStore.hide()
    return response
  },
  async (error) => {
    activeRequests--
    if (activeRequests === 0) loaderStore.hide()

    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear FusionAuth data and redirect to login
      clearFusionAuthData()
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
