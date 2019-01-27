import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: {title: '自述文件'},
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: {title: '系统首页'}
        },
        {
          path: '/course-type-table',
          component: resolve => require(['../components/courseType/CourseTypeTable.vue'], resolve),
          meta: {title: '课程类型管理'}
        },
        {
          path: '/create-course-type',
          component: resolve => require(['../components/courseType/CreateCourseType.vue'], resolve),
          meta: {title: '新增课程类型'}
        },
        {
          path: '/course-table',
          component: resolve => require(['../components/course/CourseTable.vue'], resolve),
          meta: {title: '课程管理'}
        },
        {
          path: '/create-course',
          component: resolve => require(['../components/course/CreateCourse.vue'], resolve),
          meta: {title: '新增课程'}
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/login/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
