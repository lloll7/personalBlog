<template>
  <div class="messageArea-container">
    <DataFrom v-on="$listeners" />
    <div class="showMessage">
      <h1 class="titleContainer">{{ title }}{{ subTitle }}</h1>
      <!-- <p class="titleContainer">评论列表{{ subTitle }}</p> -->
      <DataList :list="list" />
      <div class="loading" v-loading="isListLoading"></div>
    </div>
  </div>
</template>

<script>
import DataFrom from "@/components/MessageArea/DataFrom";
import DataList from "@/components/MessageArea/DataList";
export default {
  components: {
    DataFrom,
    DataList,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSubmit(formData, callback) {
      this.$emit("submit", callback);
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.loading {
  position: relative;
  height: 100px;
}
.titleContainer {
  min-width: 220px;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
