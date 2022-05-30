<template>
  <div class="main_div">
    <div class="header">
      <div class="header_text">章节数</div>
      <el-select v-model="chapterSelect" placeholder="请选择" @change="chapterChange">
    <el-option
      v-for="item in selectList"
      :key="item[1]"
      :label="item[1]"
      :value="item[0]">
    </el-option>
  </el-select>
  <el-select v-model="sectionSelect" placeholder="请选择" @change="sectionChange">
    <el-option
      v-for="(item,index) in sectionList"
      :key="index"
      :label="item"
      :value="index">
    </el-option>
  </el-select>
    </div>
    <div class="sub_div">
     <subject v-for="(item,index) in objNum" v-bind:key="index" :type="item" :getValue="getData"/>
     </div>
     <div class="addIcon" @click="centerDialogVisible = true">
    <i class="el-icon-circle-plus-outline"></i>
    </div>
    <div class="upload" @click="upload">
      <i class="el-icon-upload2"></i>
    </div>
    <el-dialog
  title="选择添加的题型"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
   <el-select v-model="selectValue" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="selectOk">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import subject from '../../components/subjectCom/subject.vue';
import videoMapper from '@/common/videoMapper';
import { getVideo, postRequest } from '../../utils/api';
export default {
  components: { subject },
    name: 'AdminTest',

    data() {
        return {
            objNum: [],
            centerDialogVisible: false,
            selectList: videoMapper,
            selectValue: "",
            sectionList: [],
            lessonList: [],
            options: [
              {
                value: 'select',
                label: '选择题',
              },
              {
                value: 'judge',
                label: '判断题'
              },
              {
                value: 'shortAns',
                label: '简答题'
              }
            ],
            chapterSelect: 1,
            sectionSelect: 0,
            allData: [],
        }
    },

   
    methods: {
      selectOk() {
        if(this.selectValue) {
          this.objNum.push(this.selectValue)
        }
        this.centerDialogVisible = false
      },
      getData(data) {
       this.allData.push(data)
       console.log(this.allData)
      },

      chapterChange(e) {
        this.chapterSelect = e;
        const list = [];
        let stand = 1;
       for(let i =0 ; i<this.lessonList.length;i++) {
         if(this.lessonList[i].chapter == e) {
           list.push(`第${stand}节`);
           stand++;
         }
       }
       this.sectionList = list;
      },
      sectionChange(e) {
        this.sectionSelect = e;
      },
       upload() {
        const chapter = this.chapterSelect;
        const section = this.sectionSelect + 1;
        let selectList = [];
        let judgeList = [];
        let shortAnswer = [];
        let selectId = 1;
        let judgeId = 1;
        let shortAnswerId = 1;
        if(this.allData.length !== 0) {
          for(let i=0; i<this.allData.length; i++) {
            if(this.allData[i].type === 'select') {
              const obj = {
                answer_A: this.allData[i].Ainput,
                answer_B: this.allData[i].Binput,
                answer_C: this.allData[i].Cinput,
                answer_D: this.allData[i].Dinput,
                chapter: chapter,
                section: section,
                question: this.allData[i].name,
                r_answer: this.allData[i].answer,
                select_id: selectId,
              };
              selectList.push(obj);
              selectId++;
            }else if(this.allData[i].type === 'judge') {
                var flag;
               if(this.allData[i].answer){
                 flag=1;
               }
               else{
                 flag=0;
               }
              const obj = {
                chapter: chapter,
                section: section,
                question: this.allData[i].name,
                r_answer: flag,
                judge_id: judgeId,
              };
              judgeList.push(obj);
              judgeId++;
            }else {
              const obj = {
                chapter: chapter,
                section: section,
                question: this.allData[i].name,
                answer: this.allData[i].answer,
                short_answer_id: shortAnswerId,
              };
              shortAnswer.push(obj);
              shortAnswerId++;
            }
            }
          }
      if(selectList.length){
          postRequest('/insertselect', selectList).then(res => {
            if(res){
           this.$message.success('选择题添加成功！');
           selectList=[];
          //  clearalldata(selectList.length,judgeList.length,shortAnswer.length);
            }
          })}
          if(judgeList.length){
              postRequest('/insertjudge', judgeList).then(res => {
                if(res){
             this.$message.success('判断题添加成功！');
             judgeList=[];
                }
          })
          }
          if(shortAnswer.length){
              postRequest('/insertshort', shortAnswer).then(res => {
                if(res){
            this.$message.success('简答题添加成功！');
            shortAnswer=[];
        
                }
          })
          }
   
          
        },
       
        // clearalldata(sl,jl,sal){
        //   console.log(sl,jl,sal)
        //     if(sl==0&&jl==0&&sal==0){
        //     this.allData=[];
        //   }
        //   console.log(this.allData)
        // }
      
    },

     mounted(){
      getVideo().then(res => {
        this.lessonList = res;
        const list = [];
        let stand = 1;
       for(let i =0 ; i<res.length;i++) {
         if(res[i].chapter == '1') {
           list.push(`第${stand}节`);
           stand++;
         }
       }
       this.sectionList = list;
      })
    },

}
</script>

<style scoped>

.main_div {
  position: relative;
  width: 100%;
  height: 100%;
}
.sub_div {
  display: flex;
  flex-wrap: wrap;
  
}
.header_text {
  font-weight: bold;
}
.header {
  height: 50px;
  width: calc(100% - 300px);
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.addIcon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #3498db;
  position: absolute;
  top: -15px;
  right: 100px;
}

.upload {
   width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #3498db;
  position: absolute;
  top: -15px;
  right: 0px;
}

.el-select {
  margin-left: 20px;
}
.el-icon-circle-plus-outline {
  font-size: 30px;
}
.el-icon-upload2 {
  font-size: 30px;
}

</style>