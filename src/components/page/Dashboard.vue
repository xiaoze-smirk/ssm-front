<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt="">
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">登录时间：<span>{{time | dateString}}</span></div>
          <div class="user-info-list">登录地点：<span>北京市</span></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

Vue.filter('dateString', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
export default {
  name: 'dashboard',
  data () {
    return {
      name: JSON.parse(sessionStorage.getItem('user')).userName,
      time: new Date()
    }
  },
  computed: {
    role () {
      return this.name === 'admin' ? '超级管理员' : '普通用户'
    }
  }
}

</script>

<style scoped>

  .mgb20{
    position:fixed;
    left:50%;
  }

  .user-info{
    display:flex;
    align-items:center;
    padding-bottom:20px;
    border-bottom:2px solid #ccc;
    margin-bottom:20px;
  }

  .user-avator{
    width:120px;
    height:120px;
    border-radius:50%;
  }

  .user-info-cont{
    padding-left:50px;
    flex:1;
    font-size:14px;
    color:#999;
  }

  .user-info-cont div:first-child{
    font-size:30px;
    color:#222;
  }

  .user-info-list{
    font-size:14px;
    color:#999;
    line-height:25px;
  }

  .user-info-list span{
    margin-left:70px;
  }

</style>
