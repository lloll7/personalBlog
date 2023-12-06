<template>
  <ul class="Contact-container UL">
    <li class="LI">
      <a target="_blank" :href="data.github">
        <Icon type="github" class="icon" />
        {{ data.githubName }}
      </a>
    </li>
    <li class="LI">
      <a :href="`mailto:${data.mail}`">
        <Icon type="mail" class="icon" />
        {{ data.mail }}
      </a>
    </li>
    <!-- <li class="LI">
      <a :href="`mailto:${data.homeMail}`">
        <Icon type="mail" class="icon" />
        {{ data.homeMail }}
      </a>
    </li> -->
    <li class="codeLi LI">
      <div class="code-outer">
        <a
          :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
          class="code"
        >
          <img :src="data.qqQrCode" alt="" />
        </a>
        <span class="code-bot"></span>
      </div>
      <a href="">
        <Icon type="qq" class="icon" />
        {{ data.qq }}
      </a>
    </li>
    <li class="codeLi LI">
      <div class="code-outer">
        <a href="" class="code">
          <img :src="data.weixinQrCode" alt="" />
        </a>
        <span class="code-bot"></span>
      </div>
      <a href="">
        <Icon type="weixin" class="icon" />
        {{ data.weixin }}
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      gitHub: "lloll7",
      emailAbroad: "Linzylloll@outlook.com",
      emailHome: "2565527275@qq.com",
      qq: "2565527275",
      weChat: "鉴常明",
    };
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
li:hover {
  background-color: rgb(77, 77, 77);
}
.Contact-container {
  list-style: none;
  padding: 0;
  width: inherit;
  background-color: rgba(255, 255, 255, 0);
  font-size: 14px;
}
.qq {
  position: relative;
}
.code-outer {
  position: absolute;
  height: 140px;
  overflow: hidden;
  top: -130px;
  transform: scaleY(0);
  transform-origin: bottom center;
  transition: all 0.3s;
  text-align: center;
}
.code {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: white;
}
.code img {
  display: block;
  width: 100px;
}
.code-bot {
  position: absolute;
  border: 5px solid white;
  bottom: 16px;
  transform: translateX(-50%) rotate(45deg);
}
.codeLi:hover .code-outer {
  transform: scaleY(1);
}
</style>
