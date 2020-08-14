<template>
  <div class="main wall full-screen">
    <el-row>
      <el-col :span="10" style="padding-right: 5px; height: 100%;">
        <div class="grid-content bg-purple">

          <div style="background: aliceblue; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
            <p style="text-align: left; line-height: 30px;">墙顶水平位移监测</p>
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
            height="610"
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
  </div>
</template>

<script>
  import { accSub } from '../../util/math.js'

  export default {
    data() {
      return {
        dot: [
          'QD01',
          'QD02',
          'QD03',
          'QD04',
          'QD05',
          'QD06',
          'QD07',
          'QD08',
          'QD09',
          'QD10',
          'QD11',
          'QD12',
          'QD13',
          'QD14',
          'QD15',
          'QD16',
          'QD17',
          'QD18',
          'QD19',
          'QD20',
          'QD21',
          'QD22',
          'QD23',
          'QD24',
          'QD25',
          'QD26'
        ],
        inital: [],
        last: [
          6.55,
          2.56,
          4.57,
          2.36,
          4.21,
          3.76,
          4.17,
          -0.16,
          3.84,
          3.56,
          1.47,
          1.12,
          1.07,
          5.33,
          4.56,
          4.37,
          5.75,
          7.88,
          7.12,
          3.04,
          7.53,
          8.77,
          7.66,
          6.97,
          6.11,
          5.42
        ],
        curr: [
          6.49,
          2.63,
          4.50,
          2.39,
          4.17,
          3.79,
          4.13,
          -0.22,
          3.79,
          3.59,
          1.51,
          1.17,
          1.11,
          5.40,
          4.52,
          4.32,
          5.71,
          7.85,
          7.08,
          3.08,
          7.48,
          8.74,
          7.62,
          6.94,
          6.16,
          5.47
        ],
        single: [],
        sum: [],
        change: [],
        lastDay: '2020-4-9',
        testDay: '2020-4-10',
        
        tableData: [],
        numMax: 20,
        changeMax: 2,

        rate: {
          dot: 'QD',
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
          me.inital[i] = 0.00;
          let _single = (accSub(me.curr[i], me.last[i]) * 1).toFixed(2);
          let _sum = (accSub(me.curr[i], me.inital[i]) * 1).toFixed(2);
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
.wall{
  // background: #fff;
  min-height: 650px;

  .grid-content {
    padding: 5px;
    height: 600px;
    overflow: auto;
    background: #ffffff;

    .el-input {
      width: 80%;
    }
  }

  .el-row {
    margin-bottom: 20px;
    height: 100%;
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