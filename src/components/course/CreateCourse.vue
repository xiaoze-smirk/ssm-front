<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>新增课程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :rules="rules2" :model="form" label-width="80px">
          <el-form-item label="编号" prop="courseNo">
            <el-input v-model="form.courseNo"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="courseName">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课时" prop="courseHours">
            <el-input v-model.number="form.courseHours"></el-input>
          </el-form-item>
          <el-form-item label="学分" prop="coursePoint">
            <el-input v-model.number="form.coursePoint"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="typeId">
            <el-select v-model.number="form.typeId" placeholder="课程类型" class="handle-select mr10">
              <el-option v-for="(courseType, index) in courseTypes" :key="index" :label="courseType.typeName" :value="courseType.typeId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="courseStatus">
            <el-radio-group v-model="form.courseStatus">
              <el-radio label="O">开放公选</el-radio>
              <el-radio label="Z">暂不开放</el-radio>
              <el-radio label="C">停止授课</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选课要求" prop="courseReqs">
            <el-checkbox-group v-model="form.courseReqs">
              <el-checkbox label="a">大三以上</el-checkbox>
              <el-checkbox label="b">平均成绩80分</el-checkbox>
              <el-checkbox label="c">党员</el-checkbox>
              <el-checkbox label="d">未拖欠学费</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" prop="courseMemo">
            <el-input type="textarea" rows="5" v-model="form.courseMemo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import {getOne, createOne} from '../../api/course/course'
import {getAll} from '../../api/courseType/courseType'

export default {
  data () {
    let checkNum = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    let checkCourseNo = (rule, value, callback) => {
      const val = value.trim()
      if (!val) {
        callback(new Error('请填写编号！'))
      }
      getOne(value).then(res => {
        if (res.data) {
          callback(new Error('已存在该编号，请更改！'))
        } else {
          callback()
        }
      }).catch((data) => {
        callback(new Error('获取表单失败！'))
      })
    }
    return {
      form: {
        courseNo: '',
        courseName: '',
        courseHours: '',
        coursePoint: '',
        typeId: '',
        courseStatus: '',
        courseReqs: [],
        courseMemo: ''
      },
      courseTypes: [],
      rules2: {
        courseNo: [
          {validator: checkCourseNo, trigger: 'blur'}
        ],
        courseHours: [
          {validator: checkNum, trigger: 'blur'}
        ],
        coursePoint: [
          {validator: checkNum, trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getAllCourseType()
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createOne(this.form).then(res => {
            if (res.data == '1') {//eslint-disable-line
              this.$refs[formName].resetFields()
              this.$message.success(`新增课程成功`)
            } else {
              this.$message.error('新增失败！')
            }
          }).catch((data) => {
            return this.$message.error('新增失败！')
          })
        } else {
          return false
        }
      })
    },
    getAllCourseType () {
      getAll().then(res => {
        if (res.data) {
          this.courseTypes = res.data
        }
      }).catch((data) => {
        this.$message.error('获取失败！')
      })
    }
  }
}
</script>
