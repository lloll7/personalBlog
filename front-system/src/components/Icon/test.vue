<template>
  <div>
    <div v-for="t in types" :key="t">
        <Icon :type = "t"/>
    </div>
  </div>
</template>

<script>
import Icon,{types} from "./";
export default {
    components:{
        Icon,
    },
    data(){
        return {
            types
        }
    }
}
</script>

<style>
    p{
        width: 20px;
        height: 20px;
    }
</style>