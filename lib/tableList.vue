<template>
  <div :class="cardUiParams.isbig==1?'hxr-floatMain':''">
    <div :class="['hxr-dcBody',baseStructure.parent.name]">
      <div class="hxr-cmHead"
           v-if="cardUiParams">
        <div class="hxr-cmhEx"
             v-if="cardUiParams.isSort==1">
          <div :class=" myInterfaceParams.sort==1?'hxr-cmheLeft-a':'hxr-cmheLeft' "
               @click="changSort">前{{myInterfaceParams.queryNum}}</div>
          <div :class=" myInterfaceParams.sort==1?'hxr-cmheRight':'hxr-cmheRight-a' "
               @click="changSort">倒{{myInterfaceParams.queryNum}}</div>
        </div>
        <day-week-month-year v-if="cardUiParams.timeSelect === 3"
                             :dateRangeType="myDateRangeType"
                             @click-date="getDate"
                             :styleMode='cardUiParams.isbig'
                             :composeSetting='cardUiParams.dateRangeList' />
        <!--日周月风格趋势-->
        <week-month-year-trendV2 v-if="cardUiParams.timeSelect === 2"
                                 :dateRangeType="myDateRangeType"
                                 @click-date="getDate"
                                 :styleMode='cardUiParams.isbig'
                                 :composeSetting='cardUiParams.dateRangeList' />
      </div>
      <div v-if="baseStructure.supplement.name"
           :class="baseStructure.supplement.name"
           :style="{top:baseStructure.supplement.top,height:baseStructure.supplement.height}">
        {{cardUiParams.totalColumn[0].name+exData[cardUiParams.totalColumn[0].fieldName]+cardUiParams.totalColumn[0].unit}}<span>{{cardUiParams.totalColumn[0].remark}}</span>
      </div>
      <div v-if="baseStructure.search.name"
           :class="baseStructure.search.name"
           :style="{top:baseStructure.search.top,height:baseStructure.search.height}">
        <div ref="typeBlock"
             v-if="cardUiParams.tags">
          <div class="hxr-typeBlock"
               v-for="(x,index) in tabList"
               :key="index">
            <div v-for="(item,idx) in x"
                 :class="idx==tabIndex[index]?'hxr-tbCell cur':'hxr-tbCell'"
                 :key="idx"
                 @click="changeTab(index,x,idx,item)">{{item[cardUiParams.tags[index].tagColumn.keyField]}}</div>
          </div>
        </div>
      </div>
      <div class="hxr-cmBody"
           :style="{top:baseStructure.body.top}">
        <common-table @change-sort="changeSort"
                      :needTotal="total"
                      :tableData="data"
                      :tdConfig="columnConfig"
                      :cardUiParams="cardUiParams"
                      :styleMode='{isBig:cardUiParams.isbig,scroll:1}' />
      </div>
    </div>
    <div class="hxr-dcLeg"
         v-if="cardUiParams&&cardUiParams.morePath">
      <common-more :cardConfig="cardUiParams"
                   :clickParams="interfaceParams" />
    </div>
  </div>

</template>
<script>
import dayWeekMonthYear from '../common/dayWeekMonthYear.vue'
import weekMonthYearTrendV2 from '../common/weekMonthYearTrendV2.vue'
import commonTable from '../common/commonTable.vue'
import { commonMethod } from '../api/common/common.js'
import commonMore from '../common/commonMore.vue'
export default {
  name: 'tableList',
  props: {
    cardCode: {
      type: String
    },
    pageCardId: {
      type: Number
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
    interfaceInfo: {
      type: Object,
      require: true
    },
    interfaceParams: {
      type: Object
    }
  },
  data () {
    return {
      exData: {},
      data: [],
      total: [],
      dataUpdateTime: '',
      sortField: '',
      sort: '',
      dateRangeType: 0,
      dateRange: '',
      myInterfaceParams: {},
      myDateRangeType: '',
      baseStructure: {
        parent: {
          name: "",
          height: ""
        },
        supplement: {
          name: "",
          top: "",
          height: ""
        },
        search: {
          name: "",
          top: "",
          height: ""
        },
        body: {
          name: "",
          top: "",
        }
      },
      tabList: [],
      tabIndex: [],
      columnConfig:[]
    }
  },
  components: {
    'common-table': commonTable,
    'day-week-month-year': dayWeekMonthYear,
    'week-month-year-trendV2': weekMonthYearTrendV2,
    'common-more': commonMore
  },
  created () {
    this.columnConfig =  this.cardUiParams.tableList.columnConfig
    this.initStructure()
  },
  mounted () {
    this.myInterfaceParams = this.interfaceParams
    this.myDateRangeType = this.cardUiParams.dateRangeType
    this.getData()
  },
  methods: {
    initStructure () {
      if (this.cardUiParams.isbig == 1) {
        //大屏模式
        this.baseStructure.parent.name = "hxr-cardMode-tableList-big"
        if (this.cardUiParams.totalColumn) {
          //需要文本补充
          this.baseStructure.supplement.name = "hxr-cmNeck-big"
        } else {
          //不需要文本补充
          this.baseStructure.supplement.name = ""
        }
        if (this.cardUiParams.tags) {
          //需要搜索标签
          this.baseStructure.search.name = "hxr-cmSearch-big"
        } else {
          //不需要搜索标签
          this.baseStructure.search.name = ""
        }
      } else {
        //手机模式
        this.baseStructure.parent = "hxr-cardMode-tableList"
        if (this.cardUiParams.totalColumn) {
          //需要文本补充
          this.baseStructure.supplement.name = "hxr-cmNeck"
        } else {
          //不需要文本补充
          this.baseStructure.supplement.name = ""
        }

      }
    },
    adaptStyle () {
      var baseSupplementTop = 0
      var baseSupplementHeight = 0
      var baseSearchTop = 0
      var baseSearchHeight = 0
      var baseBodyTop = 0
      var baseBlank = 30
      
      if (this.cardUiParams.isbig == 1) {
        //大屏模式
        if (this.cardUiParams.totalColumn) {
          //需要文本补充
          baseSupplementHeight = 25
          baseSupplementTop = baseBlank
          baseBodyTop = baseBlank + baseSupplementHeight
          if (this.cardUiParams.tags) {
            // 需要文本补充和搜索
            baseSearchHeight = this.$refs.typeBlock.offsetHeight;
            baseSearchTop = baseSupplementTop + baseSupplementHeight
            baseBodyTop = baseSearchTop + baseSearchHeight
          }
        } else {
          //不需要文本补充
          baseBodyTop = baseBlank
          if (this.cardUiParams.tags) {
            // 需要文本补充和搜索
            baseSearchHeight = this.$refs.typeBlock.offsetHeight;
            baseSearchTop = baseBlank
            baseBodyTop = baseSearchTop + baseSearchHeight
           
          }
        }
        let screenWidth = window.screen.width
        var bt
        if (screenWidth < 2000) {
          bt = 0
        } else if (screenWidth >= 2000 && screenWidth <= 3000) {
          bt = 10
        }
        else if (screenWidth > 3000) {
          bt = 20
        } else {
          console.log("屏幕自适应异常：" + screenWidth)
          bt = 0
        }
        
        if (this.cardUiParams.totalColumn) {
          if (this.cardUiParams.tags) {
            this.baseStructure.supplement.top = (baseSupplementTop + bt) + 'px'
            this.baseStructure.supplement.height = (baseSupplementHeight + bt) + 'px'
            this.baseStructure.search.top = (baseSearchTop + 2 * bt) + 'px'
            this.baseStructure.search.height = (baseSearchHeight) + 'px'
            this.baseStructure.body.top = (baseBodyTop + 2 * bt) + 'px'
          } else {
            this.baseStructure.supplement.top = (baseSupplementTop + bt) + 'px'
            this.baseStructure.supplement.height = (baseSupplementHeight + bt) + 'px'
            this.baseStructure.body.top = (baseBodyTop + 2 * bt) + 'px'
          }
        } else {
          if (this.cardUiParams.tags) {
            this.baseStructure.search.top = (baseSearchTop + bt) + 'px'
            this.baseStructure.search.height = (baseSearchHeight) + 'px'
            this.baseStructure.body.top = (baseBodyTop +  bt) + 'px'
          } else {
            this.baseStructure.body.top = (baseBodyTop + bt) + 'px'
          }
        }
      }
    },
    getData () {
      this.total = []
      let url = this.interfaceInfo.interfaceUrl
      let method = this.interfaceInfo.interfaceMethod
      this.myInterfaceParams.cardCode = this.cardCode
      this.myInterfaceParams.pageCardId = this.pageCardId
      commonMethod(url, method, this.myInterfaceParams).then(res => {
        if (res.code === 200) {
          this.exData = res.data
          this.data = res.data.records
          console.log(this.data)
          if (res.data.total) {
            this.total.push(res.data.total)
          }
          this.dataUpdateTime = res.dataUpdateTime

          if (this.cardUiParams.tags) {
            var arr = []
            for (let i = 0; i < this.cardUiParams.tags.length; i++) {
              if (res.data[this.cardUiParams.tags[i].tagList]) {
                arr.push(res.data[this.cardUiParams.tags[i].tagList])
              }
            }
            if (this.tabIndex.length == 0) {
              for (let i = 0; i < this.cardUiParams.tags.length; i++) {
                if (res.data[this.cardUiParams.tags[i].tagList]) {
                  this.tabIndex.push(0)
                }
              }
            }
            this.tabList = arr
          }
          this.$nextTick(() => {
            this.adaptStyle()
          })
          this.$emit('getTime', res.dataUpdateTime)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    changeSort (data) {
      this.myInterfaceParams.sortField = data.sortField
      this.myInterfaceParams.sort = data.sort
      this.getData()
    },
    getDate (data) {
      this.myInterfaceParams.dateRangeType = data.type
      this.myInterfaceParams.dateRange = data.val
      this.getData()
    },
    changSort () {
      if (this.myInterfaceParams.sort == 1) {
        this.myInterfaceParams.sort = 0
      } else {
        this.myInterfaceParams.sort = 1
      }
      this.getData()
    },
    changeTab (index, x, idx, item) {
      this.tabIndex[index] = idx
      for (let i = 0; i < this.cardUiParams.tags[index].tagColumn.valueField.length; i++) {
        this.myInterfaceParams[this.cardUiParams.tags[index].tagColumn.valueField[i]] = item[this.cardUiParams.tags[index].tagColumn.valueField[i]]
      }
      console.log(this.myInterfaceParams)
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.hxr-cardMode-tableList {
  .hxr-cmHead {
    display: flex;
  }
  .hxr-cmhEx {
    display: flex;
    align-items: center;
    margin-right: 5px;
    .hxr-cmheLeft-a,
    .hxr-cmheLeft {
      border-right: 1px solid #000;
      margin-right: 5px;
      padding-right: 5px;
    }
    .hxr-cmheLeft-a {
      color: #4178f5;
    }
    .hxr-cmheRight-a {
      color: #4178f5;
    }
  }
  .hxr-cmNeck {
    padding-bottom: 12px;
  }
  .hxr-cmBody {
    padding-bottom: 10px;
  }
}

.hxr-cardMode-tableList-big {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  color: #fff;
  .hxr-cmHead {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    .hxr-cmhEx {
      display: flex;
      display: -webkit-flex;
      .hxr-cmheLeft {
        color: #fff;
      }
      .hxr-cmheRight {
        border-right: 1px solid #00ffff;
        color: #fff;
      }
      .hxr-cmheLeft-a {
        color: #00ffff;
      }
      .hxr-cmheRight-a {
        border-right: 1px solid #00ffff;
        color: #00ffff;
      }
    }
  }
  .hxr-cmNeck-big {
    position: absolute;
    left: 0px;
    right: 0px;
    display: flex;
    display: -webkit-flex;
  }
  .hxr-cmSearch-big {
    position: absolute;
    left: 0px;
    right: 0px;
    display: flex;
    display: -webkit-flex;
  }
  .hxr-cmBody {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  @media screen and (max-width: 2000px) {
    .hxr-cmHead {
      .hxr-cmhEx {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        padding-right: 10px;
        div {
          padding-right: 5px;
        }
      }
    }
    .hxr-cmNeck-big {
      font-size: 12px;
      span {
        padding-left: 5px;
        font-size: 10px;
      }
    }
  }
  @media screen and (min-width: 2000px) and (max-width: 3000px) {
    .hxr-cmHead {
      .hxr-cmhEx {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        padding-right: 10px;
        div {
          padding-right: 5px;
        }
      }
    }
    .hxr-cmNeck-big {
      font-size: 12px;
      span {
        padding-left: 5px;
        font-size: 10px;
      }
    }
  }
  @media screen and (min-width: 3000px) {
    .hxr-cmHead {
      .hxr-cmhEx {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        padding-right: 10px;
        div {
          padding-right: 8px;
        }
      }
    }
    .hxr-cmNeck-big {
      font-size: 18px;
      span {
        padding-left: 10px;
        font-size: 12px;
      }
    }
  }
}
.hxr-typeBlock {
  display: flex;
  flex-wrap: wrap;
}
.hxr-tbCell {
  padding: 3px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  &.cur {
    background: #5a89fa;
    color: #fff;
    border: none;
  }
}
</style>
