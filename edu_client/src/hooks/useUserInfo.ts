import { useFusionAuth } from '@fusionauth/react-sdk'

export interface NormalizedUserInfo {
  first_name: string
  last_name: string
  email: string
  avatar: string
  fullName: string
}

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80'

export const useUserInfo = (): {
  user: NormalizedUserInfo
  // Expose raw FusionAuth userInfo in case callers need extra fields
  rawUserInfo: ReturnType<typeof useFusionAuth>['userInfo']
  startLogout: ReturnType<typeof useFusionAuth>['startLogout']
} => {
  const { userInfo, startLogout } = useFusionAuth()

  const first_name = userInfo?.given_name ?? ''
  const last_name = userInfo?.family_name ?? ''
  const email = userInfo?.email ?? ''
  const avatar = userInfo?.picture ?? DEFAULT_AVATAR

  const fullName =
    userInfo?.name ||
    [first_name, last_name].filter(Boolean).join(' ') ||
    email ||
    'User'

  return {
    user: {
      first_name,
      last_name,
      email,
      avatar,
      fullName,
    },
    rawUserInfo: userInfo,
    startLogout,
  }
}


