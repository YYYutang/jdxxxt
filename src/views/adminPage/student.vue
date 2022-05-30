<template>
  <div>
    <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">feng</el-descriptions-item>
    <el-descriptions-item label="班级">2</el-descriptions-item>
    <el-descriptions-item label="年级">19级</el-descriptions-item>
</el-descriptions>
      <p>学习进度：</p>
      <el-progress :percentage="30"></el-progress>
      <br>
       <el-descriptions title="">
    <el-descriptions-item label="用户名">lx</el-descriptions-item>
    <el-descriptions-item label="班级">1</el-descriptions-item>
    <el-descriptions-item label="年级">18级</el-descriptions-item>
</el-descriptions>
      <p>学习进度：</p>
      <el-progress :percentage="70"></el-progress>
  </div>
</template>

<script>
export default {
    name: 'Student',
       methods: {

    }
    
}

</script>

<style>

</style>