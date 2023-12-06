<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
import { server_URL } from "@/urlConfig.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 如果目前正在加载更多评论
        return;
      }
      const range = 100; // 定义一个可接受的范围，在此范围内都算滚动到底部
      const dec = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      const resp = await getComments(
        this.$route.params.id,
        this.page,
        this.limit
      );
      // for (const iterator of resp.rows) {
      //   iterator.avatar = server_URL + iterator.avatar;
      // }
      console.log(resp, "resp");
      return resp;
    },
    // 加载下一页评论
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多评论了
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: String(this.$route.params.id),
        ...formData,
      });
      console.log(formData, "formdata");
      console.log(this.$route.params.id, "id");
      console.log(resp, "提交resp");
      this.data.rows.unshift(resp);
      this.data.total += 1;
      callback("评论成功"); // 告诉后代组件，我这边处理完了，你继续
    },
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin-top: 50px;
}
</style>
