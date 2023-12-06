<template>
  <ul class="Menu-container UL">
    <li v-for="item in FunctionsMap" :key="item.link" class="LI">
      <router-link
        :exact="item.exact"
        :to="{ name: item.name }"
        active-class="selected"
      >
        <Icon :type="item.icon" class="icon" />
        <span>{{ item.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      FunctionsMap: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, // 不精确匹配路径
        },
        {
          name: "About",
          title: "关于我",
          icon: "info",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
* {
  padding: 0;
  box-sizing: border-box;
}
.Menu-container {
  list-style: none;
  padding: 0;
  width: inherit;
  background-color: @dark;
  font-size: 14px;
}
li {
  height: 45px;
  line-height: 45px;
  padding: 0;
}
a {
  display: block;
  width: 100%;
  height: 100%;
  padding-left: 20%;
  &:hover {
    color: #fff;
  }
}
.selected {
  background-color: rgb(77, 77, 77);
}
</style>
