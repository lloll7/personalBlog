<template>
  <ul class="RightListContainer">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelected }">
        {{ item.name }}
      </span>
      <span
        v-if="item.aside"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: item.isSelected }"
        >{{ item.aside }}</span
      >
      <!-- 显示当前选中组件 -->
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    // [name:"xxx", isSelected:true, children:[{name:"yyy", isSelector:false}]]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelected) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
ul {
  list-style: none;
  padding: 0;
  .RightListContainer {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    color: @dark;
    font-size: 14px;
    padding: 0;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  color: @gray;
  margin-left: 1em;
}
</style>
