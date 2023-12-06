<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail v-if="data" :blog="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogToc v-if="data" :toc="data.toc" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogToc from "./components/BlogToc";
import BlogComment from "./components/BlogComment";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils";
export default {
  mixins: [fetchData(), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    BlogToc,
    BlogComment,
  },
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      if (!resp) {
        // 文章不存在,进入404页面
        this.$router.push("/404");
        return;
      }
      // 当文章详情加载出来后，把路由标题改为文章标题
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
