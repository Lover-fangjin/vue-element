<template>
  <div class="main surface full-screen">
    <el-row>
      <el-col :span="10" style="padding-right: 5px; height: 100%;">
        <div class="grid-content bg-purple">
          
          <div style="background: aliceblue; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
            <p style="text-align: left; line-height: 30px;">地表竖向位移监测</p>
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
                  'DB1-1',
                  'DB1-2',
                  'DB1-3',
                  'DB1-4',
                  'DB2-1',
                  'DB2-2',
                  'DB2-3',
                  'DB2-4',
                  'DB3-1',
                  'DB3-2',
                  'DB3-3',
                  'DB4-1',
                  'DB4-2',
                  'DB4-3',
                  'DB4-4',
                  'DB4-5',
                  'DB5-1',
                  'DB5-2',
                  'DB5-3',
                  'DB5-4',
                  'DB6-1',
                  'DB6-2',
                  'DB6-3',
                  'DB6-4',
                  'DB6-5'
                ],
                inital: [
                  51.75263,
                  51.68372,
                  51.82640,
                  52.77891,
                  51.93997,
                  51.88015,
                  51.82325,
                  51.74425,
                  51.10599,
                  51.11556,
                  51.17033,
                  50.11375,
                  50.26044,
                  50.35679,
                  50.46737,
                  50.45535,
                  49.71263,
                  50.13448,
                  50.23684,
                  50.07343,
                  50.17460,
                  50.15418,
                  50.13871,
                  50.12388,
                  50.09593
                ],
                last: [
                  51.74974,
                  51.67897,
                  51.82294,
                  52.77625,
                  51.93555,
                  51.87547,
                  51.81886,
                  51.73883,
                  51.10178,
                  51.11151,
                  51.16682,
                  50.11436,
                  50.25934,
                  50.35581,
                  50.46733,
                  50.45107,
                  49.71178,
                  50.13284,
                  50.23665,
                  50.07336,
                  50.17046,
                  50.15178,
                  50.13513,
                  50.12054,
                  50.09053
                ],
                curr: [
                  51.74978,
                  51.67904,
                  51.82291,
                  52.77629,
                  51.93559,
                  51.87552,
                  51.81889,
                  51.73887,
                  51.10174,
                  51.11157,
                  51.16685,
                  50.11439,
                  50.25938,
                  50.35585,
                  50.46739,
                  50.45111,
                  49.71173,
                  50.13288,
                  50.23672,
                  50.07343,
                  50.17051,
                  50.15185,
                  50.13518,
                  50.12057,
                  50.09058
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
                    dot: 'DB',
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