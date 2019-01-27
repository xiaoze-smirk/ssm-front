<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 课程类型管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="data" border class="table">
        <el-table-column prop="typeId" label="编号" align="center"></el-table-column>
        <el-table-column prop="typeName" label="名称" align="center"></el-table-column>
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
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="编号">
          <el-input v-model="form.typeId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.typeName"></el-input>
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
import {updateOne, getList, deleteOne} from '../../api/courseType/courseType'

export default {
  name: 'basetable',
  data () {
    return {
      tableData: [],
      cur_page: 1,
      pageArr: [3, 5, 8, 10],
      editVisible: false,
      delVisible: false,
      form: {
        typeId: 1,
        typeName: ''
      },
      totalNum: 0,
      pageSize: 3,
      idx: -1
    }
  },
  created () {
    this.getData(1)
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
      getList(pageNO, this.pageSize).then(res => {
        this.tableData = res.data.objs
        this.totalNum = res.data.total
      }).catch((data) => {
        return this.$message.error('获取列表异常！')
      })
    },
    handleEdit (index) {
      this.idx = index
      const item = this.tableData[index]
      this.form = {
        typeId: item.typeId,
        typeName: item.typeName
      }
      this.editVisible = true
    },
    handleDelete (index) {
      this.idx = index
      this.delVisible = true
    },
    // 保存编辑
    saveEdit () {
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
    },
    // 确定删除
    deleteRow () {
      const item = this.tableData[this.idx]
      deleteOne(item.typeId).then(res => {
        if (res.data == '1') {//eslint-disable-line
          this.getData(this.cur_page)
          this.$message.success('删除成功')
          this.delVisible = false
        } else {
          this.$message.error('删除不成功！')
        }
      }).catch((data) => {
        return this.$message.error('删除不成功！')
      })
    }
  }
}

</script>

<style scoped>
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
</style>
