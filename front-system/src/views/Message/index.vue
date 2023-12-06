<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import * as msgApi from "@/api/message";
import mainScroll from "@/mixins/mainScroll.js";
import { server_URL } from "@/urlConfig.js";
export default {
  components: { MessageArea },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
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
    async fetchData() {
      const resp = await msgApi.getMessage(this.page, this.limit);
      // for (const iterator of resp.rows) {
      //   iterator.avatar = server_URL + iterator.avatar;
      // }
      return resp;
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
      this.data.total += 1;
    },
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.messageArea-container {
  width: 700px;
  margin: 0 auto;
}
</style>
