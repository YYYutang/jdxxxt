<template>
  <div class="main_div">
    <div class="header">
      <div class="header_text">章节数</div>
      <el-select v-model="chapterSelect" placeholder="请选择">
    <el-option
      v-for="item in selectList"
      :key="item[1]"
      :label="item[1]"
      :value="item[0]">
    </el-option>
  </el-select>
  <el-select v-model="sectionSelect" placeholder="请选择">
    <el-option
      v-for="item in selectList"
      :key="item[1]"
      :label="item[1]"
      :value="item[0]">
    </el-option>
  </el-select>
    </div>
    <div class="sub_div">
     <subject v-for="(item,index) in objNum" v-bind:key="index" :type="item" :getValue="getData"/>
     </div>
     <div class="addIcon" @click="centerDialogVisible = true">
    <i class="el-icon-circle-plus-outline"></i>
    </div>
    <div class="upload">
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
export default {
  components: { subject },
    name: 'AdminTest',

    data() {
        return {
            objNum: [],
            centerDialogVisible: false,
            selectList: videoMapper,
            selectValue: "",
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
            sectionSelect: '',
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
      }
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