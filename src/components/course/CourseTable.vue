<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" ref="courseQueryHelper" :model="courseQueryHelper">
          <el-form-item label="课程类型">
            <el-select v-model="courseQueryHelper.qryCourseType" placeholder="课程类型" class="handle-select mr10">
              <el-option key="wxz" label="未选择" value=""></el-option>
              <el-option v-for="(courseType, index) in courseTypes" :key="index" :label="courseType.typeName" :value="courseType.typeId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程名称">
            <el-input v-model="courseQueryHelper.qryCourseName" placeholder="课程名称" class="handle-input mr10"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="data" border class="table">
        <el-table-column prop="courseNo" label="编号" align="center"></el-table-column>
        <el-table-column prop="courseName" label="名称" align="center"></el-table-column>
        <el-table-column prop="courseHours" label="课时" align="center"></el-table-column>
        <el-table-column prop="coursePoint" label="学分" align="center"></el-table-column>
        <el-table-column prop="courseType.typeName" label="类型" align="center"></el-table-column>
        <el-table-column prop="courseStatusName" label="状态" align="center"></el-table-column>
        <el-table-column prop="courseReqsName" label="选课要求" align="center"></el-table-column>
        <el-table-column prop="courseMemo" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="cur_page" :page-sizes="pageArr" :total="totalNum" :page-size="pageSize"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="formUpdate" :rules="rules2" :model="form" label-width="50px">
        <el-form-item label="编号" prop="courseNo">
          <el-input v-model="form.courseNo" :disabled="true"></el-input>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>

import {getOne, updateOne, getList, deleteOne} from '../../api/course/course'
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
    return {
      tableData: [],
      cur_page: 1,
      pageArr: [3, 5, 8, 10],
      multipleSelection: [],
      courseQueryHelper: {
        qryCourseName: '',
        qryCourseType: ''
      },
      del_list: [],
      editVisible: false,
      delVisible: false,
      form: {
        courseNo: '',
        courseName: '',
        courseHours: 0,
        coursePoint: 0,
        typeId: '',
        courseStatus: '',
        courseReqs: [],
        courseMemo: ''
      },
      courseTypes: [],
      totalNum: 0,
      pageSize: 3,
      idx: -1,
      rules2: {
        courseHours: [
          {validator: checkNum, trigger: 'blur'}
        ],
        coursePoint: [
          {validator: checkNum, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getData(1)
  },
  mounted () {
    this.getAllCourseType()
  },
  computed: {
    data () {
      return this.tableData
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData(val * 1)
    },
    handleSizeChange (valSize) {
      this.pageSize = valSize
      this.cur_page = 1
      this.getData(this.cur_page)
    },
    getData (pageNO) {
      getList(pageNO, this.pageSize, this.courseQueryHelper).then(res => {
        this.tableData = res.data.objs
        this.totalNum = res.data.total
      }).catch((data) => {
        return this.$message.error('获取列表异常！')
      })
    },
    search () {
      this.cur_page = 1
      this.getData(this.cur_page)
    },
    handleEdit (index) {
      this.idx = index
      const item = this.tableData[index]
      getOne(item.courseNo).then(res => {
        if (res.data != null) {
          this.form = res.data
          this.courseTypes = res.data.courseTypeList
          delete this.form.courseTypeList
          delete this.form.courseType
          delete this.form.courseStatusName
          delete this.form.courseReqsName
          delete this.form.reqs
          this.editVisible = true
        } else {
          return this.$message.error('获取表单失败！')
        }
      }).catch((data) => {
        return this.$message.error('获取表单失败！')
      })
    },
    handleDelete (index) {
      this.idx = index
      this.delVisible = true
    },
    // 保存编辑
    saveEdit () {
      this.$refs['formUpdate'].validate((valid) => {
        if (valid) {
          updateOne(this.form).then(res => {
            if (res.data == '1') {//eslint-disable-line
              this.getData(this.cur_page)
              this.editVisible = false
              this.$message.success(`修改第 ${this.idx + 1} 行成功`)
            } else {
              this.$message.error('修改不成功！')
            }
          }).catch((data) => {
            return this.$message.error('修改不成功！')
          })
        } else {
          return false
        }
      })
    },
    // 确定删除
    deleteRow () {
      const item = this.tableData[this.idx]
      deleteOne(item.courseNo).then(res => {
        if (res.data == '1') {//eslint-disable-line
          this.getData(this.cur_page)
          this.$message.success('删除成功')
          this.delVisible = false
        } else {
          this.$message.error('删除不成功！')
        }
      }).catch((data) => {
        this.$message.error('删除不成功！')
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

<style scoped>
  .handle-box{
    margin-bottom:20px;
  }

  .handle-select{
    width:120px;
  }

  .handle-input{
    width:300px;
    display:inline-block;
  }
  .del-dialog-cnt{
    font-size:16px;
    text-align:center
  }
  .table{
    width:100%;
    font-size:14px;
  }
  .red{
    color:#ff0000;
  }
  .mr10{
    margin-right:10px;
  }
</style>
