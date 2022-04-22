import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import LogoutIcon from '@mui/icons-material/Logout'

const Home: NextPage = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  if (!user) {
    router.push('/login')
  }
  const handleClick = () => {
    logout()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        {user && user.email}
        <LogoutIcon onClick={handleClick} className="cursor-pointer" />
      </header>
      <main></main>
    </div>
  )
}

export default Home
