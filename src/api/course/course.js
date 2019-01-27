import axios from 'axios'
import {API_URL} from '../api'

const qs = require('qs')

const CREATE_COURSE = API_URL + '/course/create'
const GET_COURSE_LIST = API_URL + '/course/list'
const GET_ONE_COURSE = API_URL + '/course/getCourse'
const DELETE_COURSE = API_URL + '/course/delete'
const UPDATE_COURSE = API_URL + '/course/update'

export const createOne = (course) => {
  return axios.post(CREATE_COURSE, qs.stringify(course))
}

export const getList = (pageNo, pageSize, courseQueryHelper) => {
  return axios.get(GET_COURSE_LIST, {params: {pageNo: pageNo, pageSize: pageSize, qryCourseName: courseQueryHelper.qryCourseName, qryCourseType: courseQueryHelper.qryCourseType}})
}

export const getOne = (courseNo) => {
  return axios.get(GET_ONE_COURSE + `/${courseNo}`)
}

export const deleteOne = (courseNo) => {
  return axios.get(DELETE_COURSE + `/${courseNo}`)
}

export const updateOne = (course) => {
  return axios.post(UPDATE_COURSE, qs.stringify(course))
}
