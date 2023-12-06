<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />
    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>
    <!-- 文章头图 -->
    <Upload uploadTitle="文章头图" v-model="form.thumb" />
    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select v-model="form.select" placeholder="请选择文章分类">
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- 发布按钮 -->
    <div class="button">
      <el-button type="primary" @click="addAriticleHandle">{{
        btnContent
      }}</el-button>
    </div>
  </div>
</template>

<script>
// markdow编辑器的鼠标移入的文字描述改为中文（UI文档中有写）
import "@toast-ui/editor/dist/i18n/zh-cn";
import "@toast-ui/editor/dist/toastui-editor.css";
// Editor是以组件的形式引入，所以要引入一下
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType.js";
import { addBlog, editBlog, findOneBlog } from "@/api/blog.js";

export default {
  props: ["mode"],
  data() {
    return {
      form: {
        title: "", // 文章标题
        editorText: "", // 用户编辑的内容
        description: "", // 文章描述
        select: "", // 选择分类
        thumb: "", // 图片的地址（服务器上）
      },
      blogType: [], // 存放博客文章分类
      editorOptions: {
        language: "zh-CN",
      },
      btnContent: "发布文章",
    };
  },
  created() {
    // 最开始就先拿取文章分类的数据
    getBlogType().then((res) => {
      this.blogType = res.data;
    });
    // 如果是修改文章
    if (this.mode === "edit") {
      // 获取传递过来的id，根据id获取到这篇文章的内容回填到表单
      this.id = this.$route.params.id;
      findOneBlog(this.id).then((res) => {
        //   将内容回填至表单
        this.form = res.data; // form 和 服务器传递过来的obj的key-value集是一样的，所以可以直接赋值
        this.form.select =
          res.data.category === null ? "" : res.data.category.id;
        //  invoke是toastuiEditor这个UI库提供的API
        this.$refs.toastuiEditor.invoke("setHTML", res.data.htmlContent);
      });
      this.btnContent = "确认修改";
    }
  },
  components: {
    Editor,
    Upload,
  },
  methods: {
    addAriticleHandle() {
      // 获取表单内容，
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      console.log(html, "html");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      //   组装要提交给服务器的对象
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        // toc先传递一个空数组，之后在服务器中会根据markdown的内容生成toc的目录
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      //   提交对象组装好后，提交给服务器
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.mode === "add") {
          // 说明是新增文章
          addBlog(obj).then(() => {
            this.$message.success("文章添加成功");
            this.$router.push("/blogList"); // 跳转到文章列表
          });
        } else {
          // 否则是编辑文章
          editBlog({ id: this.id, data: obj }).then(() => {
            this.$message.success("文章添加成功");
            this.$router.push("/blogList"); // 跳转到文章列表
          });
        }
      } else {
        this.$message.error("请填写所有内容");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 500;
}
.button {
  margin-top: 15px;
}
</style>
