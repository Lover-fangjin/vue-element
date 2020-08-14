<template>
  <div class="main surface full-screen">
    <el-row style=" background: #fff;">
      <el-col :span="10" style="height: 100%;">
        <div class="grid-content bg-purple">
          
          <div style="background: aliceblue; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
            <p style="text-align: left; line-height: 30px;">周边建筑物竖向位移监测</p>
            <ul><li>工程名称：</li><li>清华大学综合实验楼</li></ul>
            <ul><li>监测单位：</li><li>北京方圆恒通勘测设计有限公司</li></ul>
            <ul><li>工况：</li><li>底板施工</li></ul>
            <ul><li>上次日期：</li><li>{{lastDay}}</li></ul>
            <ul><li>监测日期：</li><li>{{testDay}}</li></ul>
            <ul><li>天气：</li><li>晴</li></ul>
            <ul><li>当日监测的简要分析及判断性结论：</li><li>稳定</li></ul>
          </div>

          <div style="margin-top: 5px; background: aliceblue; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
            <el-alert style="box-shadow: 0px 0px 2px 0px #dddddd;"
              title="每个监测项，都有一个报警值，超过这个数值，行记录背景显示红色！"
              type="warning">
            </el-alert>
            <p style="text-align: left; margin: 10px 0">墙顶竖向位移阈值</p>
            <ul style="margin-bottom: 10px;"><li>累计变化量（mm）：</li><li><el-input-number size="mini" v-model="numMax" @change="updateTabelData" :step="1"></el-input-number></li></ul>
            <ul style="margin-bottom: 10px;"><li>变化速率（mm/d）：</li><li><el-input-number size="mini" v-model="changeMax" @change="updateTabelData" :step="1"></el-input-number></li></ul>
          </div>

          <div style="margin-top: 5px; background: aliceblue; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
            <el-row>
              <el-col :span="20">
                <el-row style="padding-bottom:10px;">
                  <el-col :span="6"> 点号 </el-col>
                  <el-col :span="6"> 初始测试值 </el-col>
                  <el-col :span="6"> 上次测试值 </el-col>
                  <el-col :span="6"> 本次测试值 </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input style="width: 80%;" size="mini" v-model="rate.dot"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input size="mini" v-model="rate.inital"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input size="mini" v-model="rate.last"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input size="mini" v-model="rate.curr"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4" style="padding: 5px;">
                <el-button type="success"  size="small" style="width: 100%; height: 52px; padding: 5px;" @click="add">增加</el-button>
              </el-col> 
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="bg-purple" style='magin:5px;'>
          <el-table :data="tableData"
            style="width: 100%"
            height="492"
            :default-sort = "{prop: 'dot', order: 'descending'}"> <!-- ascending -->
            <el-table-column
              fixed sortable
              prop="dot"
              label="点号">
            </el-table-column>
            <el-table-column
              prop="inital"
              label="初始测试值 (m)">
            </el-table-column>
            <el-table-column
              prop="last"
              label="上次测试值 (m)">
            </el-table-column>
            <el-table-column
              prop="curr"
              label="本次测试值 (m)">
            </el-table-column>
            <el-table-column
              prop="single"
              label="单次变化（mm）">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="累计变化量（mm）">
                <template slot-scope="scope">
                  <div :class="parseFloat(scope.row.sum) >= numMax ? 'fail' : ''">{{scope.row.sum}}</div>
                </template>
            </el-table-column>
            <el-table-column
              prop="change"
              label="本次变化速率（mm/d）">
                <template slot-scope="scope">
                  <div :class="parseFloat(scope.row.change) >= changeMax ? 'fail' : ''">{{scope.row.change}}</div>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    
    <el-row style=";margin-top: 5px !important; background: #fff;">
      <el-col :span="10" style="height: 100%;">
        <div style="background: aliceblue; margin: 5px; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
          <p style="text-align: left; line-height: 30px;">周边建筑物倾斜监测</p>
          <ul><li>工程名称：</li><li>清华大学综合实验楼</li></ul>
          <ul><li>监测单位：</li><li>北京方圆恒通勘测设计有限公司</li></ul>
          <ul><li>监测日期：</li><li>{{testDay}}</li></ul>
          <ul><li>天气：</li><li>晴</li></ul>
          <ul><li>工况：</li><li>底板施工</li></ul>
          <ul><li>当日监测的简要分析及判断性结论：</li><li>稳定</li></ul>
        </div>
      </el-col>
      <el-col :span="14" style="height: 100%;">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { accSub } from '../../util/math.js'
  export default {
    data() {
      return {
        dot: [
          'JZW01',
          'JZW02',
          'JZW03',
          'JZW04',
          'JZW05',
          'JZW06',
          'JZW07',
          'JZW08',
          'JZW09',
          'JZW10',
          'JZW11',
          'JZW12',
          'JZW13',
          'JZW14',
          'JZW15',
          'JZW16',
          'JZW17',
          'JZW18',
          'JZW19',
          'JZW20',
          'JZW21',
          'JZW22',
          'JZW23',
          'JZW24',
          'JZW25',
          'JZW26',
          'JZW27',
          'JZW28',
          'JZW29',
          'JZW30',
          'JZW31',
          'JZW32',
          'JZW33'
        ],
        inital: [
          50.46702,
          51.14421,
          51.31048,
          51.25744,
          51.00973,
          50.97895,
          51.60315,
          51.63535,
          51.60817,
          51.49542,
          51.41051,
          51.72120,
          51.48846,
          51.45673,
          51.38265,
          51.41673,
          51.37526,
          50.72803,
          50.69171,
          50.72436,
          50.79983,
          50.40120,
          50.44705,
          50.55040,
          50.29092,
          50.15908,
          50.20517,
          50.67109,
          50.37428,
          50.63272,
          51.30607,
          51.19916,
          51.25812
        ],
        last: [
          50.46582,
          51.14311,
          51.30923,
          51.25874,
          51.00933,
          50.97821,
          51.60237,
          51.63504,
          51.60696,
          51.49445,
          51.40948,
          51.72001,
          51.48782,
          51.45543,
          51.38167,
          51.41586,
          51.37407,
          50.72676,
          50.69031,
          50.72342,
          50.79947,
          50.40044,
          50.44676,
          50.55013,
          50.29106,
          50.15751,
          50.20397,
          50.66986,
          50.37324,
          50.63135,
          51.30482,
          51.19871,
          51.25732
        ],
        curr: [
          50.46587,
          51.14317,
          51.30926,
          51.25876,
          51.00937,
          50.97828,
          51.60239,
          51.63503,
          51.60702,
          51.49449,
          51.40952,
          51.72008,
          51.48788,
          51.45545,
          51.38173,
          51.41596,
          51.37411,
          50.72682,
          50.69035,
          50.72338,
          50.79945,
          50.40049,
          50.44678,
          50.55017,
          50.29111,
          50.15748,
          50.20395,
          50.66992,
          50.37328,
          50.63140,
          51.30487,
          51.19875,
          51.25737,
          50.15748,
          50.20395,
          50.66992,
          50.37328,
          50.63140,
          51.30487,
          51.19875,
          51.25737
        ],
        single: [],
        sum: [],
        change: [],
        lastDay: '2020-4-9',
        testDay: '2020-4-10',
        
        tableData: [],
        numMax: 10,
        changeMax: 1,

        rate: {
          dot: 'JZW',
          inital: 0,
          last: 0,
          curr: 0
        },
        changeRate: [],
        depthMin: 23,
        lastMin: 0,
        currentMin: 0,
      }
    },
    mounted () {
      let me = this;
      me.updateTabelData();
    },
    methods: {
      add() {
        let me = this;
        let { dot, inital, last, curr } = me.rate;
        me.dot.push(dot);
        me.inital.push(inital);
        me.last.push(last);
        me.curr.push(curr);
        this.updateTabelData();
      },
      updateTabelData(){
        let me = this;
        me.tableData = [];
        me.single = [];
        me.sum = [];
        me.change = [];
        let  difValue = (new Date(me.testDay) - new Date(me.lastDay)) / (1000 * 60 * 60 * 24);
        me.dot.map((d, i) => {
          let _single = (accSub(me.curr[i], me.last[i]) * 1000).toFixed(2);
          let _sum = (accSub(me.curr[i], me.inital[i]) * 1000).toFixed(2);
          let _chamge = _single / difValue;
          me.single.push(_single)
          me.sum.push(_sum)
          me.change.push(_chamge)

          let obj = {
            dot: d,
            inital:  me.inital[i],
            last: me.last[i],
            curr: me.curr[i],
            single: _single,
            sum: _sum,
            change: _chamge,
          }
          me.tableData.push(obj);
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
.surface{
  // background: #fff;
  min-height: 650px;

  .grid-content {
    padding: 5px;
    min-height: 493px;
    overflow: auto;
    background: #ffffff;

    .el-input {
      width: 80%;
    }
  }

  .el-row {
    margin-bottom: 20px;
    // height: 100%;
    margin: 0 !important;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .fail{
    background: red;
    color: #fff;
  }
}

</style>