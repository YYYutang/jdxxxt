<template>
  <div class="main-div">
    <el-col :span="12" class="v_col">
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
    <div class="v_content">

      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="视频" name="video" ref="videoDiv">
          <div class="v_title">{{ videoTitle }}</div>
         <video controls class="video-div" width="620" height="380" ref="video" :src="currentUrl">
           <!-- <source :src="currentUrl" type="video/mp4"> -->
        </video>
        

        </el-tab-pane>
        <el-tab-pane label="本章ppt" name="ppt">本章ppt</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import TreeList from "../components/TreeList.vue";
import { getVideo } from '../utils/api';
import videoMapper from '@/common/videoMapper';
export default {
  components: { TreeList },
  name: "ShowLesson",
  data() {
    return {
      videoTitle: '',
      activeName: "video",
      lessonList: [
        // {
        //   name: "第一章",
        //   page: [{name:"冯诺依曼结构", url: ''}, {name:"计算机导论基础", url:''}],
        // },
        // {
        //   name: "第二章",
        //   page: [{name:"计算机结构", url:''}, {name:"二进制计算", url: ''}],
        // },
      ],
      currentUrl:'',
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
      const targetCotent = this.lessonList[stand[0]-1].page[stand[1]-1].name;
      this.currentUrl = `http://localhost:8081/${this.lessonList[stand[0]-1].page[stand[1]-1].url}`;
      const url = `http://localhost:8081/${this.lessonList[stand[0]-1].page[stand[1]-1].url}`;
      console.log(url)
      this.$refs.video.url = url;
      this.$nextTick(() => {
        this.$refs.video.load();
      })
      this.videoTitle = `${targetName}:${targetCotent}`;
      
    },
    handleClick(tab, event) {
      console.log(tab)
    },
  },

  
  mounted() {
    getVideo().then(res => {
      const newList = [];
      for(let i=0;i<videoMapper.length;i++) {
        const obj = {};
        obj.page= [];
        for(let j=0;j<res.length;j++) {
          if(res[j].chapter == videoMapper[i][0]) {
            const pageObj = {};
            pageObj.name = res[j].title;
            pageObj.url = res[j].url;
            pageObj.section = res[j].section;
            obj.page.push(pageObj);
          }
        }
        obj.name = videoMapper[i][1];
        newList.push(obj);
      }
     this.lessonList = newList;
     this.videoTitle = `${newList[0].name}: ${newList[0].page[0].name}`
     const url = `http://localhost:8081/${newList[0].page[0].url}`;
     this.currentUrl = url;
    //  this.player.src(url);
    this.$refs.video.url = url;
    // this.$nextTick(() => {
    //   this.$refs.video.load();
    // })
    })
    // const vi = document.createElement('video');
    // vi.width = '620px';
    // vi.height = '380px';
    // vi.url = url;
    // console.log(this.$refs.videoDiv.$el)
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
  height: 600px;
}

.el-tabs--border-card {
  height: 100%;
}
.v_col {
  width: 300px;
  overflow-y: scroll;
}
.v_title {
  margin: 10px 0 0 40px;
  font-weight: bold;
}
.v_content {
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