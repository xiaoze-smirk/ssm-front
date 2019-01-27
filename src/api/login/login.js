import axios from 'axios'
import {API_URL} from '../api'

const qs = require('qs')

const LOGIN_BY_ACCOUNT = API_URL + '/security/login'

export const login = (account, password) => {
  return axios.post(LOGIN_BY_ACCOUNT, qs.stringify({userNo: account, userPwd: password}))
}
