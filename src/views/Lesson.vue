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
        <tree-list :list="lessonList" > </tree-list>
  
      </el-menu>
    </el-col>
    <div class="v_content">

      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="视频" name="video" ref="videoDiv">
          <div class="v_title">{{ videoTitle }}</div>
         <video  class="video-div" width="620" height="380" ref="video" :src="currentUrl" id="video" controls="controls">
          <!-- <source :src="currentUrl" type="video/mp4"> -->
        </video>

        </el-tab-pane>
        <el-tab-pane label="章节检测" name="test">章节检测</el-tab-pane>
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
      user: JSON.parse(window.sessionStorage.getItem('user')),
      videoTitle: '',
      activeName: "video",
      lessonList: [
      ],
      currentUrl:'',
      currentChapter:'',
      currentSection:'',
    };
  },
  methods: {

    //   getVidDur(){
    //        var videoTime = this.$refs.video;
    //        if(videoTime.currentTime/videoTime.duration*100>=80){
    //          console.log('yes');
    //        }

    // },
    
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      this.flag=0;
      const stand = index.split('-');
      const targetName = this.lessonList[stand[0]-1].name;
      const targetCotent = this.lessonList[stand[0]-1].page[stand[1]-1].name;
      this.currentUrl = `http://localhost:8081/${this.lessonList[stand[0]-1].page[stand[1]-1].url}`;
      const url = `http://localhost:8081/${this.lessonList[stand[0]-1].page[stand[1]-1].url}`;
      this.currentChapter=this.lessonList[stand[0]-1].page[stand[1]-1].chapter;
      this.currentSection=this.lessonList[stand[0]-1].page[stand[1]-1].section;
 
      this.$refs.video.url = url;
      this.$nextTick(() => {
        this.$refs.video.load();
      })
      this.videoTitle = `${targetName}:${targetCotent}`;
      this.flag=0;
    },
    handleClick(tab, event) {
      console.log(tab)
    },
  },

  
  mounted() {
     var video =document.getElementById("video");
     var that=this;
    //使用事件监听方式捕捉事件
    video.addEventListener("timeupdate",function () {
        var timeDisplay;
        var duration;
        //用秒数来显示当前播放进度
        timeDisplay = Math.floor(video.currentTime);
        duration = Math.floor(video.duration);
          if(timeDisplay/duration*100>=90){
              if(!that.flag){
                const params={uid:that.user.id,l_chapter:that.currentChapter,l_section:that.currentSection}
                console.log(params);
                that.flag=1;
                that.postRequest('/adduserlearn',params).then(resp=>{
                  if(resp){
                   console.log('添加成功');
                   that.lessonList[that.currentChapter-1].page[that.currentSection-1].islearned = 1;
                    }
                  }
                 
                )
              }
      }}, false );

    getVideo().then(res => {
        this.postRequest('/getuserlearn',that.user.id).then(resp=>{

        const newList = [];
      for(let i=0;i<videoMapper.length;i++) {
        const obj = {};
        obj.page= [];
        for(let j=0;j<res.length;j++) {
          if(res[j].chapter == videoMapper[i][0]) {
            const pageObj = {};
            for(let k=0;k<resp.length;k++){
            if(resp[k].l_chapter==res[j].chapter&&resp[k].l_section==res[j].section){
              pageObj.islearned=1;
              break;
            }
            }
            if(!pageObj.islearned) {
              pageObj.islearned = 0;
            }
            pageObj.chapter=res[j].chapter;
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
      this.currentChapter=`${newList[0].page[0].chapter}`
      this.currentSection=`${newList[0].page[0].section}`
     this.$refs.video.url = url;
      
    })
    //   const newList = [];
    //   for(let i=0;i<videoMapper.length;i++) {
    //     const obj = {};
    //     obj.page= [];
    //     for(let j=0;j<res.length;j++) {
    //       if(res[j].chapter == videoMapper[i][0]) {
    //         const pageObj = {};
    //         pageObj.chapter=res[j].chapter;
    //         pageObj.name = res[j].title;
    //         pageObj.url = res[j].url;
    //         pageObj.section = res[j].section;
    //         obj.page.push(pageObj);
    //       }
    //     }
    //     obj.name = videoMapper[i][1];
    //     newList.push(obj);
    //   }
    //  this.lessonList = newList;
    //  this.videoTitle = `${newList[0].name}: ${newList[0].page[0].name}`
    //  const url = `http://localhost:8081/${newList[0].page[0].url}`;
    //  this.currentUrl = url;
    //   this.currentChapter=`${newList[0].page[0].chapter}`
    //   this.currentSection=`${newList[0].page[0].section}`
    //  this.$refs.video.url = url;
      
    // })
    })

  }
};
</script>
<style>
html {
  height: 100%;
}
body {
  background-color: #ecf0f1;
  height: 100%;
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