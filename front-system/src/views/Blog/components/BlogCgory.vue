<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategories } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    // 获取当前分类id，用来决定例表中哪个分类为激活状态
    categoryId() {
      return this.$route.params.categoryId || -1;
    },
    list() {
      // 获取文章总数
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data, // children
      ];
      // 为每一个数组元素中添加isSelected属性
      const resultArr = result.map((item) => ({
        ...item,
        isSelected: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
      }));
      return resultArr;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
  },
  methods: {
    // 获取所有分类数据数组，用于决定列表中的内容信息
    async fetchData() {
      const resp = await getBlogCategories();
      console.log(resp);
      return resp;
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      // 跳转到当前的分类id，当前的页容量，newPage的页码
      if (item.id === -1) {
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
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
