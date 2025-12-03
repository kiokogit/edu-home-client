/**
 * Function to get FusionAuth access token synchronously from storage
 * This is useful for axios interceptors that can't use hooks
 */
export const getFusionAuthToken = (): string | null => {
  // FusionAuth React SDK stores tokens in localStorage
  // The key structure may vary, check your FusionAuth configuration
  try {
    // Try to get from common FusionAuth storage keys
    const authData = localStorage.getItem('fusionauth.user')
    if (authData) {
      const parsed = JSON.parse(authData)
      return parsed.token || parsed.access_token || null
    }
    
    // Alternative: Check if token is stored directly
    const token = localStorage.getItem('fusionauth.token')
    if (token) {
      return token
    }
  } catch (error) {
    console.error('Error getting FusionAuth token:', error)
  }
  return null
}

/**
 * Function to clear FusionAuth data from storage
 */
export const clearFusionAuthData = () => {
  // Clear all FusionAuth related localStorage keys
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('fusionauth')) {
      localStorage.removeItem(key)
    }
  })
}
