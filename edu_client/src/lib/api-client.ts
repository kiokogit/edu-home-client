import axios from "axios"
import { loaderStore } from "@/stores/genericStores"
import { supabase } from "@/supabase_client"
import { API_BASE_URL } from "./settings"


const axiosInstance = axios.create({
  baseURL:
    `${API_BASE_URL || "http://localhost:8001"}`,
  headers: { "Content-Type": "application/json" },
})

// Track ongoing requests (so we only hide loader when all are done)
let activeRequests = 0

axiosInstance.interceptors.request.use(async (config) => {
  // ✅ Show loader globally on first request
  if (activeRequests === 0) loaderStore.show("Please wait...")
  activeRequests++

  // Get access token
  const accessToken = (await supabase.auth.getSession())?.data?.session?.access_token
  
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
      // Clear data and redirect to login
      await supabase.auth.signOut()
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
