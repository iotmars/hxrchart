<template>
  <div :class="['hxr-allLook',styleMode.isbig==1?'hxr-allLook-big':'hxr-allLook-wx']">
    <div :class="['hxr-alCell',styleMode.rowNumber?'hxr-alCell-mode'+styleMode.rowNumber:'hxr-alCell-mode1']"
         v-for="(item,index) in flashData"
         :key="index">
      <div class="hxr-alcTop">{{ item.name }}</div>
      <div class="hxr-alcBottom"
           v-if="styleMode.isbig==1">
        <div v-if="!isNaN(mainData[item.fieldName])">

          <dv-digital-flop :config="item.config"
                           :style="{'width':'100%','height':flopHeight+'px'}"
                           :key="key" />
        </div>
        <div v-else
             :style="{'width':'100%','height':flopHeight+'px','lineHeight':flopHeight+'px','fontSize':textStyle.fontSize+'px','color':'#00ffff'}">
          {{mainData[item.fieldName]|changeMode(item.format,item.nullReplace) }}
        </div>

      </div>
      <div v-else
           class="hxr-alcBottom">{{ mainData[item.fieldName]|changeMode(item.format,item.nullReplace)}}<span v-if="item.unit">{{ mainData[item.fieldName] ? item.unit : '' }}</span></div>
      <div class="hxr-compare"
           v-if="item.row&&item.row.length>0">
        <span v-for="(i,ind) in item.row"
              :key="ind">
          {{i.name}}:
          <span v-if="mainData[i.fieldName]">
            <span v-if="(mainData[i.fieldName].toString()).substring(0,1)=='+'"
                  style="color:#ff4500">
              {{ mainData[i.fieldName]}}
            </span>
            <span v-else-if="(mainData[i.fieldName].toString()).substring(0,1)=='-'"
                  style="color:#8ce78d">
              {{ mainData[i.fieldName]}}
            </span>
            <span v-else>
              {{ mainData[i.fieldName]}}
            </span>
          </span>
          <br>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { numberReplace } from '../../utils/index.js'
export default {
  name: 'commonBlock',
  filters: {
    changeMode (item, format, nullReplace) {
      return numberReplace(nullReplace, item, format)
    }
  },
  props: {
    mainData: {
      type: Object,
      required: true,
      default: () => { }
    },
    config: {
      type: Array,
      required: true,
      default: () => []
    },
    styleMode: {
      type: Object,
      default: () => {
        isbig: 0
      }
    },
  },
  data () {
    return {
      flashData: [],
      flopHeight: 36,
      key: 0,
      textStyle: {
        fill: '#00ffff',
        fontSize: 36
      }
    }
  },
  watch: {
    mainData (n, o) {
      if (this.styleMode.isbig == 1) {
        if (n) {
          this.key++
          this.$nextTick(function () {
            // 加载
            var lsarr = []
            this.config.forEach((ele, index) => {
              var lscell = JSON.parse(JSON.stringify(ele))
              if (!isNaN(n[ele.fieldName])) {
                lscell.config = this.flopSetting(lscell, Number(n[ele.fieldName]))
              }

              lsarr.push(lscell)
            })
            this.flashData = lsarr
          })

        }
      }
    }
  },
  created () {
    let lsarr = []
    if (this.styleMode.isbig == 1) {
      let screenWidth = window.screen.width
      if (screenWidth < 2000) {
        this.textStyle.fontSize = 20
        this.flopHeight = 20
      } else if (screenWidth >= 2000 && screenWidth <= 3000) {
        this.textStyle.fontSize = 36
        this.flopHeight = 36
      }
      else if (screenWidth > 3000) {
        this.textStyle.fontSize = 52
        this.flopHeight = 52
      } else {
        console.log("屏幕自适应异常：" + screenWidth)
      }
      this.config.forEach((ele, index) => {
        let lscell = JSON.parse(JSON.stringify(ele))
        lscell.config = this.flopSetting(lscell, 0)
        lsarr.push(lscell)
      })
    } else {
      this.config.forEach((ele, index) => {
        let lscell = JSON.parse(JSON.stringify(ele))
        lsarr.push(lscell)
      })
    }
    this.flashData = lsarr
  },

  methods: {
    flopSetting (c, v) {
      var len = 0
      if (v.toString().split('.')[1]){
       len = v.toString().split('.')[1].length;
      }
      let config = {
        number: [v],
        toFixed: len,
        formatter: function (value) {
          return numberReplace(c.nullReplace, value, c.format)
        },
        style: this.textStyle
      }
      if (c.unit) {
        config.content = '{nt}' + c.unit
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
.hxr-allLook {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  .hxr-alCell {
    flex: 1;
    font-weight: 400;
    padding-bottom: 15px;
    text-align: center;
  }
}
.hxr-allLook-wx {
  .hxr-alCell {
    min-width: 33%;
    max-width: 33%;
    color: #333;
    &:nth-last-child(3) {
      padding-bottom: 5px;
    }
    &:nth-last-child(2) {
      padding-bottom: 5px;
    }
    &:nth-last-child(1) {
      padding-bottom: 5px;
    }
    .hxr-alcTop {
      color: #999;
      font-size: 14px;
    }

    .hxr-alcBottom {
      padding-top: 10px;
      font-size: 18px;
      line-height: 20px;
      span {
        font-size: 17px;
      }
    }
    .hxr-compare {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.hxr-allLook-big {
  .hxr-alCell {
    .hxr-alcTop {
      color: #fff;
      font-size: 14px;
    }
    .hxr-alcBottom {
      padding-top: 10px;
    }
    .hxr-compare {
      margin-top: 5px;
    }
  }
  .hxr-alCell-mode1 {
    min-width: 33%;
    max-width: 33%;
    &:nth-last-child(3) {
      padding-bottom: 5px;
    }
    &:nth-last-child(2) {
      padding-bottom: 5px;
    }
    &:nth-last-child(1) {
      padding-bottom: 5px;
    }
  }
  .hxr-alCell-mode4 {
    min-width: 25%;
    max-width: 25%;
    &:nth-last-child(4) {
      padding-bottom: 5px;
    }
    &:nth-last-child(3) {
      padding-bottom: 5px;
    }
    &:nth-last-child(2) {
      padding-bottom: 5px;
    }
    &:nth-last-child(1) {
      padding-bottom: 5px;
    }
  }
  .hxr-alCell-mode5 {
    min-width: 20%;
    max-width: 20%;
    &:nth-last-child(5) {
      padding-bottom: 5px;
    }
    &:nth-last-child(4) {
      padding-bottom: 5px;
    }
    &:nth-last-child(3) {
      padding-bottom: 5px;
    }
    &:nth-last-child(2) {
      padding-bottom: 5px;
    }
    &:nth-last-child(1) {
      padding-bottom: 5px;
    }
  }
}

@media screen and (max-width: 2000px) {
  .hxr-allLook-big {
    .hxr-alCell {
      padding-bottom: 10px;
      .hxr-alcTop {
        font-size: 12px;
      }
      .hxr-alcBottom {
        padding-top: 5px;
      }
      .hxr-compare {
        font-size: 10px;
      }
    }
  }
}
@media screen and (min-width: 2000px) and (max-width: 3000px) {
  .hxr-allLook-big {
    .hxr-alCell {
      padding-bottom: 20px;
      .hxr-alcTop {
        height: 25px;
        line-height: 25px;
        font-size: 14px;
      }
      .hxr-alcBottom {
        padding-top: 10px;
      }
      .hxr-compare {
        font-size: 12px;
      }
    }
  }
}
@media screen and (min-width: 3000px) {
  .hxr-allLook-big {
    .hxr-alCell {
      padding-bottom: 35px;
      .hxr-alcTop {
        height: 40px;
        line-height: 40px;
        font-size: 22px;
      }
      .hxr-alcBottom {
        padding-top: 15px;
      }
      .hxr-compare {
        font-size: 18px;
      }
    }
  }
}
</style>
