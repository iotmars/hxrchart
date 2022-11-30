import webIframe from "./lib/webIframe"
import abreastTable from "./lib/abreastTable"
import tableList from "./lib/tableList"
import blockList from "./lib/blockList"
webIframe.install = v => v.component(webIframe.name,webIframe)
abreastTable.install = v => v.component(abreastTable.name,abreastTable)
tableList.install = v => v.component(tableList.name,tableList)
blockList.install = v => v.component(blockList.name,blockList)
export {webIframe,abreastTable,tableList,blockList};
