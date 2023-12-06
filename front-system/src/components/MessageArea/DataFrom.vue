<template>
  <!-- prevent阻止事件默认行为 -->
  <form
    id="data-form-container"
    @submit.prevent="handleSubmit"
    class="userInput"
  >
    <div class="userName">
      <input
        type="text"
        placeholder="用户昵称"
        v-model="formatData.userName"
        class="userNameInput"
        @input="checkLength"
      />
      <p
        class="length nameLength"
        :class="{ error: isNameMax == true }"
        ref="nickNameLength"
      >
        {{ formatData.userName.length }} / {{ maxNameLength }}
      </p>
    </div>
    <span class="errorMessage">{{ error.errorNickname }}</span>
    <div class="textArea">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="formatData.contentArea"
        placeholder="输入内容"
        class="inputArea"
        @change="checkLength"
      ></textarea>
      <p
        class="length areaLength"
        :class="{ error: isContentMax == true }"
        ref="textAreaLength"
      >
        {{ formatData.contentArea.length }} / {{ maxContentLength }}
      </p>
    </div>
    <span class="errorMessage">{{ error.errorComment }}</span>
    <input
      type="submit"
      :disabled="isSubmiting"
      @click="
        submitUserInfo({
          nickname: formatData.userName,
          content: formatData.contentArea,
        })
      "
      class="subBtn"
    />
  </form>
</template>

<script>
export default {
  name: "DataFrom",
  data() {
    return {
      formatData: {
        userName: "",
        contentArea: "",
      },
      maxNameLength: 10,
      isNameMax: false,
      maxContentLength: 100,
      isContentMax: false,
      error: {
        errorNickname: "",
        errorComment: "",
      },
      isSubmiting: false,
    };
  },
  methods: {
    submitUserInfo(info) {
      console.log(info, "info");
      let isErrorName = 0;
      let isErrorComment = 0;
      if (info.nickname === "") {
        this.error.errorNickname = "请输入用户名";
        isErrorName = 1;
      } else if (info.nickname.length > 10) {
        this.error.errorNickname = "用户名过长";
        isErrorName = 1;
      } else {
        this.error.errorNickname = "";
        isErrorName = 0;
      }
      if (info.content === "") {
        this.error.errorComment = "请输入评论";
        isErrorComment = 1;
      } else if (info.content.length > 100) {
        this.error.errorComment = "评论长度超过限制";
        isErrorComment = 1;
      } else {
        this.error.errorComment = "";
        isErrorComment = 0;
      }
      if (!isErrorName && !isErrorComment) {
        this.isSubmiting = true; // 正在提交， 防止重复点击
        console.log("进入", this.formatData);
        this.$emit("submit", info, (successMessage) => {
          this.$showMessage({
            content: successMessage,
            type: "success",
            duration: 1000,
            callback: () => {
              this.isSubmiting = false;
              this.formatData.userName = "";
              this.formatData.contentArea = "";
            },
          });
        }); // 让父组件来处理事件
      }
    },
    checkLength() {
      this.formatData.userName.length > 10 &&
      this.formatData.userName.length != 0
        ? (this.isNameMax = true)
        : (this.isNameMax = false);
      this.formatData.contentArea.length > 10 &&
      this.formatData.contentArea.length != 0
        ? (this.isContentMax = true)
        : (this.isContentMax = false);
      if (!this.isNameMax) {
        this.error.errorNickname = "";
      }
      if (!this.isContentMax) {
        this.error.errorComment = "";
      }
    },
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
.length {
  font-size: 15px;
  color: @gray;
}
.nameLength {
  line-height: 40px;
  padding-right: 10px;
}
.userNameInput {
  border: 0;
  outline: 0;
  padding-left: 10px;
}
.userName {
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 40px;
  border: 1px black dashed;
}
.error {
  color: red;
}
.errorMessage {
  display: block;
  height: 25px;
  line-height: 25px;
  margin-left: 5px;
  color: @danger;
}
.textArea {
  display: block;
  position: relative;
  width: 100%;
  border: 1px black dashed;
}
.inputArea {
  border: 0;
  outline: 0;
  padding: 10px;
  height: 100px;
  resize: none;
}
.areaLength {
  position: absolute;
  right: 0;
  bottom: 0;
}
.subBtn {
  width: 80px;
  height: 25px;
  font-size: 10px;
  border: 0;
  color: white;
  background-color: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>
