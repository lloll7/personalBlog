<template>
  <div class="BlogList" v-loading="isLoading" ref="mainContainer">
    <ul>
      <li class="item" v-for="item in data.rows" :key="item.id">
        <div class="item-img" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                // 给动态路由信息赋值
                id: item.id,
              },
            }"
          >
            <img
              v-lazy="item.thumb"
              :alt="item.title"
              :title="item.title"
              class="AImg"
            />
          </RouterLink>
        </div>
        <div class="item-content">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                // 给动态路由信息赋值
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="tip">
            <p>日期: {{ formatDate(item.createDate) }}</p>
            <p>浏览: {{ item.scanNumber }}</p>
            <p>评论{{ item.commentNumber }}</p>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  // 给动态路由信息赋值
                  // categoryId: item.category.id,
                  categoryId: item.id,
                },
              }"
            >
              <!-- <p>{{ item.category.name }}</p> -->
              <p>{{ item.name }}</p>
            </RouterLink>
          </div>
          <p class="brief">{{ item.description }}</p>
        </div>
      </li>
    </ul>
    <!-- 无数据页面 -->
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页组件 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";
import { server_URL } from "@/urlConfig.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
  },
  methods: {
    formatDate,
    async fetchData() {
      const resp = await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
      // for (let i of resp.rows) {
      //   i.thumb = server_URL + i.thumb;
      // }
      return resp;
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 跳转到当前的分类id，当前的页容量，newPage的页码
      if (this.routeInfo.categoryId === -1) {
        // 当前没有分类
        // this.$router.push 可以实现无刷新跳转
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            // 给动态路由信息赋值
            categoryId: this.$route.categoryId,
          },
        });
      }
    },
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      // 获取文章分类
      const categoryId = this.$route.params.categoryId || -1;
      // 获取文章页码数
      const page = +this.$route.query.page || 1;
      // 获取文章页容量
      const limit = +this.$route.query.limit || 10;

      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  watch: {
    // 观察this.$route的值是否变化,只要变化则调用该方法
    async $route() {
      this.isLoading = true;
      // 滚动高度为0
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
* {
  margin: 0;
  padding: 0;
  // box-sizing: border-box;
}
.BlogList {
  height: 100%;
  width: auto;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth; // 滚动条平滑滚动
}
ul {
  padding: 20px 0;
  height: auto;
}
.item {
  display: flex;
  height: auto;
  width: 80%;
  padding: 15px 0;
  margin-left: 30px;
  border-bottom: 1px solid @gray;
}
.item-content .tip {
  display: flex;
  height: 10px;
  font-size: 12px;
  align-content: center;
  margin-bottom: 30px;
  p {
    margin-right: 10px;
  }
}
.item-content h2 {
  color: @dark;
  margin-top: 5px;
}
.AImg {
  height: 150px;
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
}
.brief {
  font-size: 14px;
  color: @dark;
}
</style>
