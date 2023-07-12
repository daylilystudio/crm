import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  // testing machine
  baseURL: '/api/ibms',
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
