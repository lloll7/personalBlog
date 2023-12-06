<template>
<div class="test-container">
  <Layout>
     <template #left>
        <div class="left-container">
            我是左边内容
        </div>
    </template>
     <template>
        <div class="main-container">
            我是中间内容
        </div>
    </template>
     <template #right>
        <div class="right-container">
            我是右边内容
        </div>
    </template>
  </Layout>
</div>
</template>

<script>
import Layout from "./"
export default {
    components:{
        Layout,
    }
}
</script>

<style scoped lang="less">
.test-container{
    width: 60%;
    height: 600px;
}
.left-container{
    width: 250px;
    height: 100%;
    background-color: #bfa;
}
.main-container{
    width: 100%;
    height: 100%;
    background-color: pink;
}
.right-container{
    width: 250px;
    height: 100%;
    background-color: red;
}
</style>