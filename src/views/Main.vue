<template>
  <div class="main">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '10px' }" class="card_main">
          <img src="../assets/cover.webp" class="image" />
          <div class="header_text">
          <p class="title">计算机科学导论</p>
          <p class="teacher">授课老师：战德臣、张丽杰、靳玉萍、聂兰顺</p>
          <el-button type="primary" round @click="study">开始学习</el-button>
          </div>
        </el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程介绍" name="first">{{ intro }}</el-tab-pane>
          <el-tab-pane label="考试大纲" name="second">
            <el-table :data="tableData" border class="table">
              <el-table-column fixed prop="num" label="序号" width="110">
              </el-table-column>
              <el-table-column
                prop="module_content"
                label="模块内容"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="knowledge_point"
                label="知识点"
                width="340"
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
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/jd.jpg" class="image" />
                  <p>教材名称：计算机科学导论（第四版）</p>
                  <p>作者：瞿中等</p>
                  <p>出版社：清华大学出版社</p>
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
                   <p>先进计算机体系结构与并行处理</p>
                  <p>作者：Hesham El-Rewini</p>
                  <p>出版社：电子工业出版社</p>
                </el-card>
              </el-col>
              <el-col
                :span="10"
                :offset="3"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img src="../assets/jd2.png" class="image2" />
                  <p>网络空间安全</p>
                  <p>作者：魏亮；魏薇</p>
                  <p>出版社：电子工业出版社</p>
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
export default {
  data() {
    return {
      activeName: "first",
      intro:
        "计算机专业导论是你进入大学学习计算机科学与技术学科的第一门课程，既是计算机专业的入门课程，又是计算机专业学习的指南。本课程将以新视角新思维，使你初步认识和了解计算机科学与技术学科，了解计算机科学与技术学科的基本思维、问题求解框架及典型的方法论，初步了解计算机科学与技术学科的研究对象及科学技术体系，初步了解计算机科学与技术学科的知识结构及能力培养思路，进而理解本科生计算机专业能力培养与课程设置思想、核心课程的定位及作用，提高后续课程的学习兴趣。\n\n有人说，“计算机专业就是学习各种‘计算机语言’，学习如何编写程序”，本课程试图纠正这种观念，引导你站在一定的高度看这些问题，给你建立一个清晰完整的“计算机世界观”，使你站得高看得远，看得远看得真。 也有人急于学习各种计算机知识，怎么这个我也不知道，那个我也不知道？有些知识不知道没有关系(想知道，通过百度、维基百科一搜就可以)，但关键的计算思维你不能不知道，本课程将为你介绍存在于计算机学科中的经典的伟大的计算思维，使你深刻理解计算机中的程序是如何运行的，机器为什么能够执行你编写的程序？这些思维对你将来“真正的会编程序”将起到基石的作用。当前，计算机专业的毕业生是最抢手的高薪人才(据美国权威机构统计2008-2018期间计算学科人才是最抢手的人才)，但学习计算机专业的我们为何却没有感觉得到呢？那是因为你只学会用一门语言书写程序，而没有对学科和专业有深入的理解，对专业的课程体系没有理解，那么哪些课程是最重要的课程呢，面对如此众多的课程，我该如何学习呢，本课程将回答你的这些疑问！\n\n本课程将以“机器自动计算==>机器难于计算==>计算与社会/自然的融合”为脉络，引导你建立“计算机世界观”，引导你理解和了解计算机专业究竟是做什么的。在有了一定的基础和认识后，为你介绍计算机科学与技术学科的研究方向和研究范畴。再进一步通过典型课程系列的介绍，为你指明如何培养自己计算机专业知识的路径。\n\n你可以将本课程比作计算机类课程的“论语”：论语的重要性大家都知道，“半部论语治天下”，本课程的重要性不言而喻；论语是古人从小学习的，学习时理解有一定的难度，本课程也类似，因为对初学者而言将出现大量的概念和术语，但这是学习计算机专业必须跨过的一道门槛。只要你有耐心，只要你坚持听完课程的视频，你就能跨过这道门槛，你也一定能跨过这道门槛。",
      tableData: [
        {
          num: "1",
          module_content: "计算机科学基础及热点领域",
          knowledge_point: "1.计算机发展历程；2.计算机科学课程体系的主要内容。",
          test: "期末卷面测试",
        },
        {
          num: "2",
          module_content: "计算机数据表示 ",
          knowledge_point:
            "1.数制转换；2.数的反码、原码、补码；3.ASCII字符编码; ",
          test: "期末卷面测试",
        },
        {
          num: "3",
          module_content: "计算机硬件系统及结构",
          knowledge_point:
            "1.图灵模型基本思想；2.冯.诺依曼模型特点及组成；3.计算机系统主要技术指标定义及性能评价：字长、时钟周期、运算速度、内存容量、I/O速率；4. 计算机硬件系统组成5.分层的存储体系及组织结构；6. I/O系统的组成；7. I/O接口的定义、功能；",
          test: "期末卷面测试",
        },
        {
          num: "4",
          module_content: "计算机系统软件",
          knowledge_point:
            "1.计算机软件系统组成2.操作系统概念、分类、功能；3.主流操作系统及特点",
          test: "在线测试和期末卷面测试",
        },
        {
          num: "5",
          module_content: "计算机硬件系统及结构",
          knowledge_point:
            "1.图灵模型基本思想；2.冯.诺依曼模型特点及组成；3.计算机系统主要技术指标定义及性能评价：字长、时钟周期、运算速度、内存容量、I/O速率；4. 计算机硬件系统组成5.分层的存储体系及组织结构；6. I/O系统的组成；7. I/O接口的定义、功能；",
          test: "期末卷面测试",
        },
        {
          num: "6",
          module_content: "数据结构及算法基础",
          knowledge_point:
            "1.算法的概念；2.算法的特性；3.递归、迭代、穷举、贪婪算法的基本思想及适用场景；4.算法描述工具；5.算法的评价指标中时间复杂度与空间复杂度的定义；6.线性表（包括栈、队列）、树、图等典型数据结构的定义、运算；7. 顺序查找、二分查找算法的基本思想；8. 直接插入排序和冒泡排序的基本思想；",
          test: "期末卷面测试",
        },
        {
          num: "7",
          module_content: "计算机网络基础",
          knowledge_point:
            "1．信号、信道、调制解调基本概念；2.不同类型数据通信方式及特点；3.计算机网络的资源子网与通信子网及组成；4.常用的有线和无线网络传输媒体；5.计算机网络中链路与通路的概念；6.计算机网络基本的拓扑结构及特点；7. OSI模型体系结构；8. 网络互连常用设备；9.TCP/IP体系结构；10.IP地址结构及编码方案；11.互联网提供的主要服务；",
          test: "在线测试和期末卷面测试",
        },
      ],
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
  min-width: 800px;
  width: 70%;
  margin: 0 auto;
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
.header_text > button {
    margin-top: 15px
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
</style>