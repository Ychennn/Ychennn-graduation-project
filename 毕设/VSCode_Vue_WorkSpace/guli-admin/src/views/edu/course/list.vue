<template>
  <div class="app-container">
    影片列表
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="影片名称" width="80" />

      <el-table-column label="发布状态" width="80">
        <template slot-scope="scope">{{ scope.row.status=='Draft'?'未发布':'已发布' }}</template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="集数" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="buyCount" label="购买数量" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑影片基本信息</el-button>
          </router-link>

          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑影片内容</el-button>
          </router-link>

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import courseApi from "@/api/edu/course";
export default {
  data() {
    return {
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      list: null,
      courseQuery: [], // 查询条件
      listLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
   removeDataById(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        courseApi.deleteCourseById(id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
           this.getList();
        });
      });
    },

    getList() {
      courseApi.getCourseList().then((res) => {
        this.list = res.data.list;
      });
    },
    resetData() {
      (this.courseQuery = {}), this.getList();
    },
  },
};
</script>