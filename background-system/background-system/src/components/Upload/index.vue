<template>
  <div class="uploadContainer">
    <!-- 上传组件标题 -->
    <div class="block">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from "@/urlConfig.js";
export default {
  props: ["uploadTitle", "value"],
  computed: {
    imageUrl() {
      if (this.value) {
        // 拼接成正常图片链接
        // return server_URL + this.value;
        return this.value;
      }
    },
    headers() {
      return {
        // 从本地获取token添加到header里
        Authorization: "bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    // 图片上传成功后的回调
    handleAvatarSuccess(res) { 
      if (!res.code && res.data) {
        // 说明上传成功，服务器返回上传成功后的图片地址
        // v-model 语法糖本质是 :value="message" @input="onInput"
        // 父组件通过v-model传递value进来，所以这里也可以通过触发input事件重新传一次新的value值
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.block {
  font-weight: 500;
}
</style>
