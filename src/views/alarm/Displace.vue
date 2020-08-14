<template>
  <div class="main displace full-screen">
    <el-row>
      <el-col :span="12" style="padding-right: 5px;">
        <div class="grid-content bg-purple">
          <div style="text-align: left; margin-bottom: 5px; padding: 5px; box-shadow: 2px 2px 2px 0px #dddddd; background: aliceblue;">
            <span style="padding-right: 5px; font-weight: 700;">监测孔号</span>
            <el-select v-model="hole" placeholder="请选择" size="mini" @change="onChange">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.hole"
                :value="item.hole">
              </el-option>
            </el-select>
            <span style="padding-left: 20px; font-weight: 700;">累计最大值：<span style="color: blue;">{{max}}</span></span>
          </div>
          <div style="background: aliceblue; padding: 5px; box-shadow: 2px 2px 2px 0px #dddddd;">
            <p style="text-align: left; line-height: 30px;">{{displace.title}}</p>
            <ul><li>工程名称：</li><li>{{displace.name}}</li></ul>
            <ul><li>仪器型号：</li><li>{{displace.type}}</li></ul>
            <ul><li>监测单位：</li><li>{{displace.unit}}</li></ul>
            <ul><li>监测日期：</li><li>{{displace.date}}</li></ul>
            <ul><li>天气：</li><li>{{displace.weather}}</li></ul>
          </div>
          <div style="margin-top: 5px; background: aliceblue; padding: 5px; box-shadow: 2px 2px 2px 0px #dddddd;">
            <el-row>
              <el-col :span="20">
                <el-row style="padding-bottom:10px;">
                  <el-col :span="8"> <span>深度（m）</span></el-col>
                  <el-col :span="8"> 上次累计变化量 </el-col>
                  <el-col :span="8"> 本次累计变化量 </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-input-number size="mini" :min="depthMin" v-model="rate.depth" :step="0.5"></el-input-number>
                  </el-col>
                  <el-col :span="8">
                    <el-input-number size="mini" :min="lastMin" v-model="rate.last" :step="0.1"></el-input-number>
                  </el-col>
                  <el-col :span="8">
                    <el-input-number size="mini" :min="currentMin" v-model="rate.current" :step="0.1"></el-input-number>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4" style="padding: 5px;">
                <el-button type="success"  size="small" style="width: 100%; height: 52px; padding: 5px;" @click="add">增加</el-button>
              </el-col> 
            </el-row>
          </div>
          <!-- <div style=" margin-top:30px; margin-right: 20px;  float: right; text-align: right;">
            <ul style="margin-left: 20px;"><li>速率最大值：——</li><li style="padding-left: 30px;">累计最大值：<span style="color: blue;">{{max}}</span></li></ul>
          </div> -->
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bg-purple">
          <el-table :data="tableData" style="width: 100%" height="400" :default-sort = "{prop: 'depth', order: 'descending'}">
            <el-table-column
              fixed sortable
              prop="depth"
              label="深度（m）">
            </el-table-column>
            <el-table-column
              prop="last"
              label="上次累计变化量">
            </el-table-column>
            <el-table-column
              prop="current"
              label="本次累计变化量">
            </el-table-column>
            <el-table-column
              prop="rate"
              label="变化速率">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div class="main-bottom">
      <div class="charts full-screen" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { singleLineCharts } from '../../util/chart.js';
import { accSub } from '../../util/math.js'
export default {
  name: "displace",

  props: {
    msg: String
  },
  data() {
    return {
      max: 0,
      tableData: [],
      rate: {
        depth: 23,
        last: 0,
        current: 0
      },
      changeRate: [],
      depthMin: 23,
      lastMin: 0,
      currentMin: 0,
      displace: {},
      hole: '',
      options: []
    }
  },
  mounted () {
    let me = this;
    me.chart = echarts.init(me.$refs.charts);
    //根据窗口的大小变动图表
    window.addEventListener("resize", () => {
      me.chart.resize();
    });

    me.$api.getDisplaceList().then(res => {
      if(res.code === 200){
        // console.log('res: ', res.result)
        me.options = res.result;
        me.displace = me.options[0];
        me.hole = me.displace.hole;
        me.depthMin = me.displace.depth[me.displace.depth.length - 1];
        me.updateChart();
      }
    })

  },
  methods: {
    add() {
      let me = this;
      me.displace.depth.push(me.rate.depth);
      me.displace.last.push(me.rate.last);
      me.displace.current.push(me.rate.current);
      me.updateChart();
    },
    updateChart() {
      let me = this;
      me.tableData = [];
      me.displace.depth.map((item, i) => {
        let _rate = accSub(me.displace.current[i], me.displace.last[i]);
        me.changeRate.push(_rate);
        let obj = {
          depth: item,
          last: me.displace.last[i],
          current: me.displace.current[i],
          rate:_rate,
        }
        me.tableData.push(obj);
      })
      me.max = Math.abs(Math.min(...me.displace.current)) > Math.abs(Math.max(...me.displace.current)) ? Math.abs(Math.min(...me.displace.current)) : Math.max(...me.displace.current)
      
      let data = {
        title: '深层水平位移曲线',
        xAxis: me.displace.depth,
        current: me.displace.current,
        last: me.displace.last,
        rate: me.changeRate
      }
      singleLineCharts(me.chart, data);
    },
    onChange(value) {
      console.log('selected: ', value);
      let me = this;
      let _options = me.options.filter(item => { return item.hole === value});
      me.displace = _options[0];
      me.hole = me.displace.hole;
      me.depthMin = me.displace.depth[me.displace.depth.length - 1];
      me.updateChart();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" type="text/scss" scoped>
.displace{
  .bg-purple {
    background: #ffffff;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .main-bottom {
    width: 100%;
    height:315px;
    margin-top: 5px;

    .charts {
      background: #ffffff;
    }
  }

  .grid-content {
    min-width: 480px;
    min-height: 390px;
    padding: 5px;
    overflow: auto;
  }

  .el-row {
    // margin-bottom: 20px;
    // height: 60%;
    margin: 0 !important;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col-left {
    border-radius: 4px;
    border-right: 1px solid rgb(153, 153, 153);
  }

  .el-col {
    // padding: 5px !important;
    border-radius: 0px !important;
    height: 100%;
  }
}
</style>
