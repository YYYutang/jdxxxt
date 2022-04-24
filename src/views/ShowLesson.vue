<template>
  <div class="main-div">
    <el-col :span="12">
      <h5>目录</h5>
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <tree-list :list="lessonList"></tree-list>

      </el-menu>
    </el-col>
    <div class="content">

      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="视频" name="video">
          <div class="title">{{ videoTitle }}</div>
         <video width="620" height="380" controls class="video-div">
        <source src="../assets/testVideo/● index.tsx - cy-used-trading-platform - Visual Studio Code 2022-04-06 16-10-07.mp4" type="video/mp4">
        </video>
        <div class="video-text">
            <p>本章简介</p>
        </div>
        </el-tab-pane>
        <el-tab-pane label="小节ppt" name="ppt">小节ppt</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import TreeList from "../components/TreeList.vue";
export default {
  components: { TreeList },
  name: "ShowLesson",
  data() {
    return {
      videoTitle: '',
      activeName: "video",
      lessonList: [
        {
          name: "第一章",
          page: ["冯诺依曼结构", "计算机导论基础"],
        },
        {
          name: "第二章",
          page: ["计算机结构", "二进制计算"],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      const stand = index.split('-');
      const targetName = this.lessonList[stand[0]-1].name;
      const targetCotent = this.lessonList[stand[0]-1].page[stand[1]-1];
      this.videoTitle = `${targetName}: ${targetCotent}`;
    },
    handleClick(tab, event) {
      console.log(tab)
    },
  },

  mounted() {
    this.videoTitle = `${this.lessonList[0].name}: ${this.lessonList[0].page[0]}`
  }
};
</script>
<style>
body {
  background-color: #ecf0f1;
}

.main-div {
  display: flex;
  width: 100%;
}
.el-col {
  width: 300px;
  margin-top: 50px;
}

.title {
  margin: 10px 0 0 40px;
  font-weight: bold;
}
.content {
  width: calc(100% - 300px);
  min-width: 800px;
  margin-left: 40px;
  background-color: #fff;
  margin-top: 50px;
  margin-right: 100px;
}
.el-tabs__nav-scroll {
  margin-left: 20px;
}

.video-div {
  margin-left: calc(50% - 310px );
  margin-top: 50px;
}

.video-text {
  width: 500px;
  margin: 0 auto;
  
  
}
.video-text>p {
  margin-left: -100px;
  margin-top: 50px;
}


</style>
