<template>
  <div>
    <div v-if="composeSetting.length>0"
         :class="styleMode==1?'hxr-btnGroup-big':'hxr-btnGroup'">
      <div v-for="item in composeSetting"
           :key="item.index"
           :class="['hxr-btn',index==item.type?'active':'']"
           @click="changeDate(item.type)">{{item.name}}</div>
    </div>
    <div v-else
         :class="styleMode==1?'hxr-btnGroup-big':'hxr-btnGroup'">
      <div :class="['hxr-btn',index==3?'active':'']"
           @click="changeDate(3)">日</div>
      <div :class="['hxr-btn',index==2?'active':'']"
           @click="changeDate(2)">周</div>
      <div :class="['hxr-btn',index==1?'active':'']"
           @click="changeDate(1)">月</div>
    </div>
  </div>

</template>
<script>
import { getCurrentWeek } from '../utils/index.js'
export default {
  name: 'weekMonthYearTrendV2',
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
    changeDate (ind) {
      this.index = ind
      let val = ''
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      const day = date.getDate()
      month = month < 10 ? '0' + month : month
      if (ind == 0) { // 年
        val = year
      } else if (ind == 1) { // 月
        val = year
      } else if (ind == 2) { // 本周
        val = getCurrentWeek(date)
      } else if (ind == 3) { // 日
        val = year + '-' + month + '-' + (day < 10 ? ('0' + day) : day)
      }
      this.$emit('click-date', { type: ind, date: ind, val: val })
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
