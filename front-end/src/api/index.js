import axios from 'axios'
const API_URL = 'https://teczkazdrowia.pl'

export class API {
  constructor () {
    this.url = API_URL
  }
  isTokenValid (token) {
    return axios.get(`${this.url}/api/verify`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(response => {
      return true
    }).catch(() => {
      return false
    })
  }
  loginWithUsernameAndPassword (credentials) {
    return axios.get(`${this.url}/api/auth?login=${credentials.login}&password=${credentials.password}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        return response
      } else { return false }
    }).catch(() => { return false })
  }
}

export const api = new API()
