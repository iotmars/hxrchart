# 存在问题
1.commonTable兼容vue2，原先vue2使用的过滤器vue3已取消，当前使用vue3特性表达式函数
2.dayWeekMonthYear及weekMonthYearTrendV2中的年日月对应值为前端写死
3.format数据格式化还存在规则问题
# 组件库
vue3环境组件库，依赖 sass echart axios，sass需要安装python
# 接口配置
单接口，配置要求
| 参数 | 备注 |
| interfaceInfo.interfaceMethod | 必传，请求方式 | 字符串 |
| interfaceInfo.interfaceUrl | 必传，请求地址 | 字符串 |
| interfaceParams | 必传，请求参数 | 对象 |
# webIframe 网页组件，用于嵌入网页
无接口
| 参数 | 备注 |
| cardUiParams.webIframe.iframeUrl | 必传，目标网页的url | 字符串 |
# abreastTable 并排表格组件，用于对比
单接口，返回数据结构
{
  code:200,
  data:{
    records:{
      /cardUiParams.abreastTable.leftField/:[
        {/cardUiParams.abreastTable.columnConfig[num].fieldName/:999}
      ],
      /cardUiParams.abreastTable.rightField/:[
        {/cardUiParams.abreastTable.columnConfig[num].fieldName/:999}
      ]
    }
  }
}
主题配置
| 参数 | 备注 |
| cardUiParams.abreastTable.leftName | 必传，左侧表格名 | 字符串 |
| cardUiParams.abreastTable.rightName | 必传，右侧表格名 | 字符串 |
| cardUiParams.abreastTable.leftField | 必传，左侧表格数据对应字段 | 字符串 |
| cardUiParams.abreastTable.rightField | 必传，右侧表格数据对应字段 | 字符串 |
| cardUiParams.abreastTable.columnConfig | 必传，设置初始化表格 | 数组 |
| cardUiParams.abreastTable.columnConfig[num].name | 必传，设置表格字段名 | 字符串 |
| cardUiParams.abreastTable.columnConfig[num].fieldName | 必传，设置取值字段 | 字符串 |
# tableList 表格组件，用于数据表格展示
单接口，返回数据结构
{
  code:200,
  data:{
    records:[
        {
         /cardUiParams.tableList.columnConfig[num].fieldName/:999
        },
    ]，
    /cardUiParams.totalColumn[num].fieldName/:999,
    /cardUiParams.tags[num].tagList/:[
      {
        /cardUiParams.tags[num].tagColumn.keyField/:"全部",
        /cardUiParams.tags[num].tagColumn.valueField/:"all"
      }
    ]
  }
}
请求配置
| 参数 | 备注 |
| interfaceParams.sort | 必传，数据倒叙正序 | 数字 | 1正序，0倒叙 |
| interfaceParams.queryNum | 必传，查询数量 | 数字 |
主题配置
| 参数 | 备注 |
| cardUiParams.isbig | 非必传，卡片大屏模式 | 数字 | 1大屏模式，0普通模式 |
| cardUiParams.isSort | 非必传，卡片倒叙正序排名 | 数字 | 1显示，0隐藏 |
| cardUiParams.timeSelect | 非必传，卡片日周月筛选 | 数字 |2日周月，3本周本日本月 |
| cardUiParams.dateRangeList | 非必传，自定义周期筛选 | 数组 |
| cardUiParams.dateRangeList[num].name | 必传，设置周期筛选名称 | 字符串 |
| cardUiParams.dateRangeList[num].type | 必传，设置周期筛选值 | 字符串 |
| cardUiParams.dateRangeList[num].interfaceParams.pageSize | 非必传，设置单个周期获取数据量 | 数字 |
| cardUiParams.totalColumn | 非必传，自定义统计文本 | 数组 |
| cardUiParams.totalColumn[num].name | 非必传，统计文本 | 字符串 |
| cardUiParams.totalColumn[num].fieldName | 必传，统计值字段 | 字符串 |
| cardUiParams.totalColumn[num].unit | 非必传，统计值单位 | 字符串 |
| cardUiParams.totalColumn[num].remark | 非必传，统计备注 | 字符串 |
| cardUiParams.tags | 非必传，自定义筛选标签 | 数组 |
| cardUiParams.tags[num].tagColumn | 必传，筛选标签传参 | 数组 |
| cardUiParams.tags[num].tagColumn.keyField | 必传，标签名称字段 | 字符串 |
| cardUiParams.tags[num].tagColumn.valueField | 必传，标签名对应传参 | 数组 |
| cardUiParams.tags[num].tagList | 必传，筛选标签数组来源 | 字符串 |
| cardUiParams.tableList.columnConfig | 必传，设置初始化表格 | 数组 |
| cardUiParams.tableList.columnConfig[num].name | 必传，设置表格字段名 | 字符串 |
| cardUiParams.tableList.columnConfig[num].fieldName | 必传，设置取值字段 | 字符串 |
| cardUiParams.tableList.columnConfig[num].width | 非必传，设置行宽 | 数字 |
| cardUiParams.tableList.columnConfig[num].sort | 非必传，设置排序 | 数字 | 2无顺序，1正序，0倒序 |
| cardUiParams.tableList.columnConfig[num].skin | 非必传，带颜色的正副值，值必须是字符串 | 数字 | 1开启，0关闭 |
| cardUiParams.tableList.columnConfig[num].nullReplace | 非必传，当值为null时替换 | 字符串 |
| cardUiParams.tableList.columnConfig[num].format | 非必传，数字格式化，模式见附 | 数字 |

