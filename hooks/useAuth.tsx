import { signup, login, isLoggedIn, logout } from '../pages/api/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

interface IAuth {
  user: any
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

interface Props {
  email: string
  password: string
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  const getUser = async () => {
    try {
      const { data } = await isLoggedIn()

      return data
    } catch (error) {}
  }
  useEffect(() => {
    const user = getUser()

    if (user) {
      setUser(user)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(true)
      router.push('/login')
    }

    setInitialLoading(false)
  }, [])

  const signUp = async ({ ...args }: Props) => {
    const { email, password } = args
    setLoading(true)
    await signup({ email, password })
      .then(({ data }) => {
        console.log(data)
        setUser(data)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async ({ ...args }: Props) => {
    const { email, password } = args
    setLoading(true)
    await login({ email, password })
      .then(({ data }) => {
        console.log(data)
        setUser(data)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }
  const logout = async () => {
    setLoading(true)
    logout()
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      loading,
      logout,
      error,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
