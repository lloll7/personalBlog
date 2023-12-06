<template>
  <div class="app-container">
    <div class="text">关于我</div>
    <el-input v-model="input" :disabled="disabled" class="input"> </el-input>
    <el-button type="primary" @click="clickHandle">{{
      disabled ? "编辑" : "完成 "
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, editAbout } from "@/api/about.js";
export default {
  data() {
    return {
      disabled: true,
      input: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then((res) => {
        this.input = res.data;
      });
    },
    clickHandle() {
      this.disabled = !this.disabled;
      if (this.disabled === true) {
        if (this.input) {
          editAbout({ url: this.input }).then((res) => {
            console.log(res, "res");
            this.$message.success("修改成功");
          });
        } else {
          this.$message.warning("输入框不能为空");
          this.fetchData();
        }
      }
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 20px;
  margin-bottom: 10px;
}
.input {
  margin-bottom: 10px;
}
</style>
