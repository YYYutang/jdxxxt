<template>

<div class="portalDiv">
   

    <div class="navDiv">
        <p>计算机导论学习系统后台管理</p>
    <el-menu
      default-active="student"
      class="el-menu-vertical-demo"
      @select="handleSelect"
     >
      <el-menu-item index="student">注册学生信息</el-menu-item>
      <el-menu-item index="adminTest">章节测试</el-menu-item>
    </el-menu>


  
</div>
    <div class="portal-middle">
        <div class="portal-header">  <p> {{user.name}} 欢迎您 </p></div>
    <div class="portal-content">
        <router-view/>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'Portal',
    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem('user')),
        }
    },

    methods: {
        handleSelect(index) {
            this.$router.push(`/${index}`);
        }
    }
    
}
</script>

<style>

.portalDiv {
    width: 100%;
    display: flex;
}


.navDiv {
    width: 250px;
    background-color: #fff;
}

.navDiv>p {
    color: black;
    font-weight: bold;
    margin-left: 30px;
}

.portal-middle {
    width: calc(100% - 40px - 300px);
}
.portal-header {
    height: 50px;
    display: flex;
    justify-content: flex-end;
    color: black;
}

.portal-content {
    margin-left: 40px;
    background-color: #fff;
    min-height: 640px;
    padding: 30px 30px;
}
</style>