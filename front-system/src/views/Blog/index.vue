<template>
  <Layout>
    <template #default>
        <BlogList />
    </template>
    <template #right>
        <BlogCgory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList";
import BlogCgory from "./components/BlogCgory";
export default {
  components:{
    Layout,
    BlogList,
    BlogCgory,
  },
}
</script>

<style>

</style>