<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>新增课程类型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form :model="form" label-width="80px">
          <el-form-item label="表单名称">
            <el-input v-model="form.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import {createOne} from '../../api/courseType/courseType'

export default {
  data () {
    return {
      form: {
        typeName: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const name = this.form.typeName.trim()
      if (name) {
        createOne(this.form).then(res => {
          console.log(this.form + '和' + this.form.typeName)
          if (res.data == '1') {//eslint-disable-line
            this.$message.success('提交成功！')
            this.form.typeName = ''
          } else {
            this.$message.error('提交失败！')
          }
        })
      }
    }
  }
}
</script>
