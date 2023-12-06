<template>
  <div class="about-container" v-loading="loading || !srcLoading">
    <iframe
      v-if="src"
      class="about-content"
      :src="src"
      frameborder="0"
      @load="srcLoading = true"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      srcLoading: false,
    };
  },
  computed: mapState("about", {
    src: "data",
    loading: "loading",
  }),
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.about-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
