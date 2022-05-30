<template>
    <div>
     <el-submenu v-for="(item, index) in list" v-bind:key = "item.name" v-bind:index="(index+1).toString()">
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
       
        <el-menu-item v-for="(content, indey) in item.page" v-bind:key = "content.name" v-bind:index="`${index+1}-${indey+1}`"> {{ content.name }} <i class=el-icon-check v-if="content.islearned"></i> </el-menu-item>
    
      </el-submenu>
      
          <!-- <tree-list v-if="item.children" :list="item.children"></tree-list> -->
      
    </div>
</template>

<script>
export default {
    name: 'TreeList',
    props:{
        list: Array,
    },
    

}
</script>

<style>
</style>