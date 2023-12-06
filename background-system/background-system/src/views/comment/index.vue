<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      :data="data"
      v-loading="listLoading"
      element-loading-text="加载数据中..."
      border
      fit
      highlight-current-row
    >
      <!-- 序号 -->
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <!-- 头像 -->
      <el-table-column align="center" label="头像" width="100">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="scope.row.avatar"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 昵称 -->
      <el-table-column align="center" label="昵称" width="150">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <!-- 评论文章 -->
      <el-table-column align="center" label="评论文章" width="150">
        <template slot-scope="scope">
          {{ scope.row.blog.title }}
        </template>
      </el-table-column>

      <!-- 评论内容 -->
      <el-table-column align="center" label="评论内容" width="320">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <!-- 评论日期 -->
      <el-table-column align="center" label="评论日期" width="350">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      style="margin: 30px 20px 0"
      background
      :page-size="eachPage"
      :page-sizes="[4, 8, 12]"
      layout="prev, pager, next, total, ->,  sizes, jumper"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getComment, addComment, delComment } from "@/api/comment.js";
import { formatDate } from "@/utils/tools.js";
import { server_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [],
      listLoading: false,
      eachPage: 4, // 每一页显示的条数
      currentPage: 1, // 当前的页码数
      totalPage: 0, // 总页数
      count: 0, // 数据的总条数
      pagerCurrentPage: 1, // 分页栏的当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getComment(this.currentPage, this.eachPage).then(({ data }) => {
        this.listLoading = false;
        this.data = data.rows;
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        for (let item of this.data) {
          item.createDate = formatDate(item.createDate);
          // item.avatar2 = server_URL + item.avatar;
        }
        // 下面的if在删除文章时，可以会触发，例如：删除最后一页的最后一条数据时
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 删除评论
    delHandle({ id }) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delComment(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页相关事件(elementUI分页组件自带事件)
    // 改变每页显示的条数时触发
    sizeChangeHandle(pagerNumber) {
      this.eachPage = parseInt(pagerNumber);
      this.currentPage = 1;
      this.pagerCurrentPage = 1; // 将分页组件重新回到第一页
      this.fetchData();
    },
    // 点击上一页时触发
    prevClickHandle() {
      // currentPage改变时会触发currentChangeHandle事件
      this.currentPage -= 1;
    },
    // 点击下一页时触发
    nextClickHandle() {
      this.currentPage += 1;
    },
    // 当currentPage改变时触发
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
  },
};
</script>

<style></style>
