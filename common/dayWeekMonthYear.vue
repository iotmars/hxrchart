<template>
  <div>
    <div v-if="composeSetting.length>0"
         :class="styleMode==1?'hxr-btnGroup-big':'hxr-btnGroup'">
      <div v-for="item in composeSetting"
           :key="item.index"
           :class="['hxr-btn',index==item.type?'active':'']"
           @click="changeDate(item.type,item)">{{item.name}}</div>
    </div>
    <div v-else
         :class="styleMode==1?'hxr-btnGroup-big':'hxr-btnGroup'">
      <div :class="['hxr-btn',index==3?'active':'']"
           @click="changeDate(3)">昨日</div>
      <div :class="['hxr-btn',index==4?'active':'']"
           @click="changeDate(4)">上周</div>
      <div :class="['hxr-btn',index==2?'active':'']"
           @click="changeDate(2)">本周</div>
      <!-- <div :class="['hxr-btn',index==5?'active':'']"
           @click="changeDate(5)">上月</div> -->
      <div :class="['hxr-btn',index==1?'active':'']"
           @click="changeDate(1)">本月</div>
      <!-- <div :class="['hxr-btn',index==6?'active':'']"
           @click="changeDate(6)">上年</div> -->
      <div :class="['hxr-btn',index==0?'active':'']"
           @click="changeDate(0)">本年</div>
    </div>
  </div>

</template>
<script>
import { getCurrentWeek, getLastWeek, getYesterday } from '../utils/index.js'
export default {
  name: 'dayWeekMonthYear',
  props: {
    dateRangeType: {
      type: Number,
      default: 2
    },
    styleMode: {
      type: Number,
      default: 0
    },
    composeSetting: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      index: 2
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.index = this.dateRangeType
    })
  },
  methods: {
    changeDate (ind,t) {
      let pageSize= null
      if (t &&t.interfaceParams) {
        pageSize = t.interfaceParams.pageSize
      }
      this.index = ind
      let val = ''
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      if (ind == 0) { // 年
        val = year
      } else if (ind == 1) { // 本月
        val = year + '-' + month
      } else if (ind == 2) { // 本周
        val = getCurrentWeek(date)
      } else if (ind == 3) { // 昨日
        val = getYesterday(date)
      } else if (ind == 4) { // 上周
        val = getLastWeek(date)
        ind = 2
      } else if (ind == 5) { // 上月
        ind = 1
        let _month = date.getMonth()
        if (date.getMonth() == 0) {
          year = year - 1
          _month = 12
        }
        val = year + '-' + (_month < 10 ? '0' + _month : _month)
      } else if (ind == 6) { // 上年
        val = year - 1
        ind = 0
      }
      this.$emit('click-date', { type: ind, val: val ,pageSize:pageSiz} )
    }
  }
}
</script>

<style lang="scss" scoped>
.hxr-btnGroup {
  border-radius: 2px;
  display: inline-flex;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #999999;
  border: 1px solid #999999;
  .hxr-btn {
    flex: 1;
    border-right: 1px solid #999999;
    height: 21px;
    line-height: 21px;
    position: relative;
    z-index: 1;
    font-size: 12px;
    padding: 0 2px;
    min-width: 30px;
    &.active {
      color: #ffffff;
      background: #4178f5;
    }
    &:last-child {
      border: none;
      &::after {
        border-radius: 0 2px 2px 0;
        left: 0;
      }
    }
  }
}
.hxr-btnGroup-big {
  border-radius: 2px;
  display: inline-flex;
  text-align: center;
  color: #fff;
  .hxr-btn {
    flex: 1;
    position: relative;
    z-index: 1;
    padding: 0 2px;
    &.active {
      color: #00ffff;
    }
    &:last-child {
      border: none;
      &::after {
        border-radius: 0 2px 2px 0;
        left: 0;
      }
    }
  }
}
@media screen and (max-width: 2000px) {
  .hxr-btnGroup-big {
    height: 20px;
    line-height: 20px;
    .hxr-btn {
      height: 21px;
      line-height: 21px;
      font-size: 12px;
    }
  }
}
@media screen and (min-width: 2000px) and (max-width: 3000px) {
  .hxr-btnGroup-big {
    height: 20px;
    line-height: 20px;
    .hxr-btn {
      height: 21px;
      line-height: 21px;
      font-size: 12px;
    }
  }
}
@media screen and (min-width: 3000px) {
  .hxr-btnGroup-big {
    height: 29px;
    line-height: 29px;
    .hxr-btn {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
    }
  }
}
</style>
