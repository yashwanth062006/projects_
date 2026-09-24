import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('fg_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// ---------- Authentication ----------

export async function register(name, email, password) {
  const { data } = await client.post('/auth/register', {
    name,
    email,
    password,
  })

  return data
}

export async function login(email, password) {
  const { data } = await client.post('/auth/login', {
    email,
    password,
  })

  // Save login token
  localStorage.setItem('fg_token', data.token)

  // Save logged-in user details
  localStorage.setItem('fg_user', JSON.stringify(data.user))

  return data
}

export function logout() {
  localStorage.removeItem('fg_token')
  localStorage.removeItem('fg_user')
}

// ---------- Fraud Detection ----------

export async function scoreTransaction(txn) {
  const { data } = await client.post('/score', txn)
  return data
}

// ---------- Transactions ----------

export async function getTransactions() {
  const { data } = await client.get('/transactions')
  return data
}

// ---------- Dashboard Stats ----------

export async function getStats() {
  const { data } = await client.get('/stats')
  return data
}

// ---------- 24 Hour Trend ----------

export async function getTrend() {
  const { data } = await client.get('/stats/trend')
  return data
}

export default client