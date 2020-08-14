<template>
  <div class="main wall full-screen">
    <el-row>
      <el-col :span="10" style="padding-right: 5px; height: 100%;">
        <div class="grid-content bg-purple">
          
          <div style="background: aliceblue; padding: 5px;box-shadow: 2px 2px 2px 0px #dddddd;">
            <p style="text-align: left; line-height: 30px;">墙顶竖向位移监测</p>
            <ul><li>工程名称：</li><li>清华大学综合实验楼</li></ul>
            <ul><li>监测单位：</li><li>北京方圆恒通勘测设计有限公司</li></ul>
            <ul><li>上次日期：</li><li>{{lastDay}}</li></ul>
            <ul><li>监测日期：</li><li>{{testDay}}</li></ul>
            <ul><li>天气：</li><li>晴</li></ul>
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
        <div class="bg-purple" style='magin:5px; height: 610px;'>
          <el-table :data="tableData"
            style="width: 100%; height: 100%;"
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
                    <div :class="parseFloat(scope.row.sum) >= numMax ? 'fail' : ''">{{scope.row.sum  + ',' + numMax}}</div>
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
            'QDZ01',
            'QDZ02',
            'QDZ03',
            'QDZ04',
            'QDZ05',
            'QDZ06',
            'QDZ07',
            'QDZ08',
            'QDZ09',
            'QDZ10',
            'QDZ11',
            'QDZ12',
            'QDZ13',
            'QDZ14',
            'QDZ15',
            'QDZ16',
            'QDZ17',
            'QDZ18',
            'QDZ19',
            'QDZ20',
            'QDZ21',
            'QDZ22',
            'QDZ23',
            'QDZ24',
            'QDZ25',
            'QDZ26'
        ],
        inital: [
            50.25525,
            50.60566,
            50.60322,
            50.72983,
            50.78556,
            50.81076,
            51.13449,
            51.18670,
            50.85435,
            50.85574,
            50.94941,
            50.65406,
            50.69822,
            50.11580,
            50.09062,
            50.07482,
            50.06424,
            50.06568,
            50.24124,
            50.23598,
            49.97901,
            50.08197,
            50.33923,
            50.34963,
            50.41264,
            50.43791
        ],
        last: [
            50.24685,
            50.59783,
            50.59507,
            50.72449,
            50.78116,
            50.80605,
            51.12823,
            51.18229,
            50.84911,
            50.85245,
            50.94392,
            50.64786,
            50.69341,
            50.11236,
            50.08571,
            50.07130,
            50.05949,
            50.05903,
            50.23596,
            50.23007,
            49.97216,
            50.07619,
            50.33312,
            50.34331,
            50.40796,
            50.43213
        ],
        curr: [
            50.24692,
            50.59788,
            50.59514,
            50.72442,
            50.78108,
            50.80599,
            51.12828,
            51.18224,
            50.84904,
            50.85242,
            50.94398,
            50.64792,
            50.69336,
            50.11232,
            50.08567,
            50.07128,
            50.05944,
            50.05911,
            50.23594,
            50.23012,
            49.97224,
            50.07623,
            50.33319,
            50.34335,
            50.40792,
            50.43217
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
          dot: 'QDZ',
          inital: 0,
          last: 0,
          curr: 0
        }
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
      },
      onNumChange(){},
      onMaxChange(){}
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