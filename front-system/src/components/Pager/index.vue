<template>
  <!-- 只有总页数大于1时才显示 -->
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disable: current === 1 }">|&lt;&lt;</a>
    <a @click="handleClick(current - 1)" :class="{ disable: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in number"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disable: current === pageNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pageNumber)"
      :class="{ disable: current === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      // 当前页码
      type: Number,
      default: 1,
    },
    total: {
      // 总数据量
      type: Number,
      default: 0,
    },
    limit: {
      // 每页的数据容量
      type: Number,
      default: 10,
    },
    visibleNumber: {
      // 可见页码数
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 得到显示的最小页码
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min <= 1) {
        min = 1;
      } else if (min > this.pageNumber - (this.visibleNumber - 1)) {
        min = this.pageNumber - (this.visibleNumber - 1);
      }
      console.log(min);
      return min;
    },
    // 得到显示的最大页码
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      console.log(max);
      return max;
    },
    // 获取可见页码数组，便于遍历模板
    number() {
      let num = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        num.push(i);
      }
      return num;
    },
  },
  methods: {
    // 子组件为了修改prop参数，向父组件抛出事件（子组件没有权利直接修改父组件传来的prop参数）
    handleClick(newPage) {
      // 对newpage进行检查
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      this.$emit("pageChange", newPage); // 抛出事件
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  a {
    margin: 0 6px;
    color: @primary;
    cursor: pointer;
    &.disable {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
