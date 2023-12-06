<template>
  <ul class="commentList">
    <li v-for="item in list" :key="item.id" class="commentItem">
      <Avatar :url="item.avatar" :size="44" />
      <div class="Info">
        <p class="userName">{{ item.nickname }}</p>
        <p class="comment">
          {{ item.content }}
        </p>
        <p class="date">{{ formatDate(item.createDate, true) }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";
export default {
  name: "Dataist",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Avatar,
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
.commentItem {
  position: relative;
  display: flex;
  min-width: 500px;
  border-bottom: 1px @gray solid;
  margin-bottom: 10px;
}
.Info {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  p {
    height: 20%;
    margin-bottom: 15px;
  }
  .userName {
    color: @success;
  }
  .comment {
    font-size: 13px;
  }
  .date {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 13px;
    color: @gray;
  }
}
</style>
