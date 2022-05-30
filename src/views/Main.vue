<template>
  <div class="main">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '10px' }" class="card_main">
          <img src="../assets/cover.webp" class="image" />
          <div class="header_text">
          <p class="title">计算机科学导论</p>
          <p class="teacher">授课老师：战老师、张老师、钟老师</p>
          <el-button type="primary" round @click="study">开始学习</el-button>
          </div>
        </el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程介绍" name="first" :style="{ lineHeight: '30px' }">{{ intro }}</el-tab-pane>
          <el-tab-pane label="考试大纲" name="second">
            <el-table :data="tableData" border class="table">
              <el-table-column fixed prop="num" label="序号" width="110">
              </el-table-column>
              <el-table-column
                prop="module_content"
                label="模块内容"
                width="280"
              >
              </el-table-column>
              <el-table-column
                prop="knowledge_point"
                label="知识点"
                width="483"
              >
              </el-table-column>
              <el-table-column prop="test" label="测试形式" width="150">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="参考资料" name="third">
             <div>
            <el-divider>课程用书</el-divider>
            <el-row>
              <el-col :span="10">
                <el-card :body-style="{ padding: '0px',  }">
                  <img src="../assets/jd.jpg" class="image" />
                  <div class="card-content">
                  <p>计算机科学导论（第四版）</p>
                  <p>作者：瞿中等</p>
                  <p>出版社：清华大学出版社</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-divider>参考书</el-divider>
          <div>
            <el-row >
              <el-col
                :span="10"
               
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/jd1.png" class="image1" />
                  <div class="card-content">
                   <p>先进计算机体系结构与并行处理</p>
                  <p>作者：Hesham El-Rewini</p>
                  <p>出版社：电子工业出版社</p>
                  </div>
                </el-card>
              </el-col>
              <el-col
                :span="10"
                :offset="3"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/jd2.png" class="image2" />
                  <div class="card-content">
                  <p>网络空间安全</p>
                  <p>作者：魏亮；魏薇</p>
                  <p>出版社：电子工业出版社</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          </el-tab-pane>
        
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { tableDatatemp} from '../common/tableData.js'
import {intro} from'../common/introData'
export default {
  data() {
    return {
      activeName: "first",
      intro:intro,
      tableData:tableDatatemp
      
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    study(){
      this.$router.replace('/lesson')
    }
  },
};
</script>

<style>
.main {
  white-space: pre-wrap;
  min-width: 1023px;
  width: 70%;
  margin: 0 auto;
  font-family: "PingFang SC";
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.card_main {
  width: calc(100% + 100px);;
  margin-left: -50px;
}

.el-card__body {
  display: flex;
}
.header_text {
  margin-left: 50px;
  
}

.header_text > .title {
  margin-left: calc(50% - 130px);
}
.header_text > button {
    margin-top: 15px;
    margin-left: calc(50% - 52px);
  }
.title {
  font-family: 微软雅黑;
  font-size: 40px;
  display: block;
  align-content: center;
  position: relative;
}
.teacher {
  font-family: 微软雅黑;
  font-size: 20px;
}

.image {
  width: 40%;
  display: block;
}
.image1 {
  width: 40%;
  display: block;
  float: left;
}
.image2 {
  width: 38%;
  display: block;
  float: left;
}
.table {
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.card-content> p {
  margin-top: -6px
}
.card-content>p:first-child {
  font-size: 20px;
  font-weight: bold;
}
</style>