import axios from 'axios'
import {API_URL} from '../api'

const qs = require('qs')

const CREATE_COURSE_TYPE = API_URL + '/courseType/create'
const GET_COURSE_TYPE_LIST = API_URL + '/courseType/list'
const GET_ONE_COURSE_TYPE = API_URL + '/courseType/getCourseType'
const GET_ALL_COURSE_TYPE = API_URL + '/courseType/getAllCourseType'
const DELETE_COURSE_TYPE = API_URL + '/courseType/delete'
const UPDATE_COURSE_TYPE = API_URL + '/courseType/update'

export const createOne = (courseType) => {
  return axios.post(CREATE_COURSE_TYPE, qs.stringify(courseType))
}

export const getList = (pageNo, pageSize) => {
  return axios.get(GET_COURSE_TYPE_LIST, {params: {pageNo: pageNo, pageSize: pageSize}})
}

export const getOne = (typeId) => {
  return axios.get(GET_ONE_COURSE_TYPE + `/${typeId}`)
}

export const getAll = () => {
  return axios.get(GET_ALL_COURSE_TYPE)
}

export const deleteOne = (typeId) => {
  return axios.get(DELETE_COURSE_TYPE + `/${typeId}`)
}

export const updateOne = (courseType) => {
  return axios.post(UPDATE_COURSE_TYPE, qs.stringify(courseType))
}
