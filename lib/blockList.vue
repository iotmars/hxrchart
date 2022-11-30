<template>
  <div :class="cardUiParams.isbig==1?'hxr-floatMain':''">
    <div :class="['hxr-dcBody',cardUiParams.isbig==1?'hxr-cardMode-blockList-big':'hxr-cardMode-blockList']">
      <div class="hxr-cmHead"
           v-if="cardUiParams">
      <day-week-month-year v-if="cardUiParams.timeSelect == 3"
                             :dateRangeType="myDateRangeType"
                             @click-date="getDate"
                             :styleMode='cardUiParams.isbig'
                             :composeSetting='cardUiParams.dateRangeList' />
        <!--日周月风格趋势-->
        <week-month-year-trendV2 v-if="cardUiParams.timeSelect == 2"
                                 :dateRangeType="myDateRangeType"
                                 @click-date="getDate"
                                 :styleMode='cardUiParams.isbig'
                                 :composeSetting='cardUiParams.dateRangeList' />
      </div>
      <div class="hxr-cmBody">
        <common-block :mainData="blockList"
                      :config="cardUiParams.blockList.columnConfig"
                      :styleMode='cardUiParams' />
      </div>
    </div>
    <!-- <div class="hxr-dcFoot">
        数据更新时间{{ dataUpdateTime }}
      </div> -->
    <div class="hxr-dcLeg"
         v-if="cardUiParams&&cardUiParams.morePath">
      <common-more :cardConfig="cardUiParams"
                   :clickParams="interfaceParams" />
    </div>

  </div>

</template>
<script>
import weekMonthYearTrendV2 from '../common/weekMonthYearTrendV2.vue'
import dayWeekMonthYear from '../common/dayWeekMonthYear.vue'
import commonBlock from '../common/commonBlock.vue'
import { commonMethod } from '../api/common/common.js'
import commonMore from '../common/commonMore.vue'
export default {
  name: 'blockList',
  props: {
    cardCode: {
      type: String
    },
    pageCardId: {
      type: Number
    },
    interfaceInfo: {
      type: Object,
      require: true
    },

    cardUiParams: {
      type: Object,
      default: () => {
        let obj = {
          timeSelect: ''
        }
        return obj
      }
    },
    interfaceParams: {
      type: Object
    }
  },
  data () {
    return {
      blockList: {},
      dataUpdateTime: "",
      myinterfaceParams: {},
      myDateRangeType: ''
    }
  },
  components: {
    'week-month-year-trendV2': weekMonthYearTrendV2,
    'common-block': commonBlock,
    'day-week-month-year': dayWeekMonthYear,
    'common-more': commonMore
  },
  created () {
    this.myinterfaceParams = this.interfaceParams
    this.myDateRangeType = this.cardUiParams.dateRangeType
    this.getData()
  },
  methods: {
    getData () {
      let url = this.interfaceInfo.interfaceUrl
      let method = this.interfaceInfo.interfaceMethod
      this.myinterfaceParams.cardCode = this.cardCode
      this.myinterfaceParams.pageCardId = this.pageCardId
      commonMethod(url, method, this.myinterfaceParams).then(res => {
        if (res.code === 200) {
          this.blockList = res.data.records[0] || {}
          this.dataUpdateTime = res.dataUpdateTime
          this.$emit('getTime', res.dataUpdateTime)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getDate (data) {
      this.myinterfaceParams.dateRangeType = data.type
      this.myinterfaceParams.dateRange = data.val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.hxr-cardMode-blockList {
  .hxr-cmHead {
    padding-bottom: 12px;
  }
  .hxr-cmBody {
    padding-bottom: 20px;
  }

  .hxr-cmLeg {
    padding-bottom: 24px;
  }

  .hxr-cmFoot {
    padding-bottom: 12px;
  }
}

.hxr-cardMode-blockList-big {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  .hxr-cmHead{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .hxr-cmBody {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  @media screen and (max-width: 2000px) {
    
    .hxr-cmBody {
      top: 20px;
    }
  }
  @media screen and (min-width: 2000px) and (max-width: 3000px) {
    .hxr-cmBody {
      top: 30px;
    }
  }
  @media screen and (min-width: 3000px) {
    .hxr-cmBody {
      top: 40px;
    }
  }
}

</style>
