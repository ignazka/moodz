import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOODZ_API,
  withCredentials: true,
})
