<template>
  <RightList :list="list" @select="handleSelect"/>
</template>

<script>
import RightList from "./RightList"
export default {
    components:{
        RightList,
    },
    data(){
        return{
            list:[
                {name:"a", isSelected:true, children:[
                    {name:"a-1",isSelected:false},
                    {name:"a-2",isSelected:false},
                    {name:"a-3",isSelected:false}
                ]},
                {name:"b", isSelected:false},
                {name:"c", isSelected:false},
                {name:"d", isSelected:false},
            ]
        }
    },
    methods: {
        handleSelect(item){
            console.log(item);
        }
    },
}
</script>

<style>

</style>