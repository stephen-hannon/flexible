!function(e){function t(t){for(var n,i,l=t[0],o=t[1],u=t[2],h=0,d=[];h<l.length;h++)i=l[h],r[i]&&d.push(r[i][0]),r[i]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);for(c&&c(t);d.length;)d.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,l=1;l<a.length;l++){var o=a[l];0!==r[o]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},r={0:0},s=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=o;s.push([8,1]),a()}([,,,,,,function(e){e.exports={data:[[15159096e5,500],[151604094e4,485.03],[151619772e4,480.44],[15162243e5,474.2],[151639554e4,468.12],[151642512e4,464.33],[151650444e4,460.54],[151666266e4,458.95],[151674168e4,453.46],[151691394e4,446.57],[15169344e5,441.19],[15172746e5,438.41],[15175191e5,433.32],[151760094e4,430.37],[151803732e4,427.98],[151812336e4,422.04],[151814436e4,414.1],[151819824e4,409.45],[151824138e4,404.26],[151847562e4,397.67],[151847652e4,389.23],[151865238e4,381.55],[151884372e4,377.76],[151896954e4,375.37],[151906098e4,370.88],[151915956e4,365.39],[151933308e4,360.05],[151953336e4,354.96],[151974282e4,352.57],[151976424e4,346.57],[151993794e4,342.84],[152001204e4,334.2],[152037144e4,329.81],[152052282e4,321.73],[152143212e4,310.2],[152157456e4,304.21],[15216711e5,299.67],[15217491e5,293.99],[152175096e4,289.7],[152217936e4,286.5],[152228778e4,268.52],[152287854e4,264.58],[152295852e4,261.38],[15230322e5,254.84],[152313744e4,250.99],[1523229e6,248.6],[152330382e4,242.61],[152338692e4,239.96],[152338776e4,234.87],[152356296e4,231.67],[152363676e4,223.83],[152374938e4,215.95],[152375166e4,212.5],[1523928e6,204.11],[152399394e4,197.62],[152401806e4,190.64],[152418744e4,179.39],[152425044e4,176.44],[152427216e4,170.95],[152434518e4,163.16],[152443428e4,159.96],[152452056e4,154.99],[152459874e4,148.5],[152460078e4,147.21],[152476806e4,140.22],[152477904e4,134.73],[152477994e4,131.75],[152495688e4,116.77],[152495856e4,111.78],[15252072e5,104.7],[152521086e4,98.46],[152523516e4,96.47],[152536092e4,88.59],[152545494e4,86.4],[152553318e4,75.63],[15255348e5,73.48],[1525545e6,63.49],[15256182e5,53.74],[15256503e5,46.75],[152583006e4,45],[152587608e4,40.01],[152596662e4,21.02],[152600454e4,15.53],[152606142e4,.33],[15263703e5,0]]}},,function(e,t,a){a(12),e.exports=a(11)},,,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(3),r=a(5),s=a.n(r),i=a(2),l=a(0),o=a(7),u=a.n(o),c=function(e){return"".concat(e<0?"−":"","$").concat(Math.abs(e).toFixed(2))},h={addCurrency:function(e,t){return Math.round(100*e+100*t)/100},formatCurrency:c,formatCurrencyOutput:function(e){return"number"==typeof e?c(e):"$—"},formatDate:function(e){return u()(e).format("ddd, MMMM D, YYYY")},MS_PER_DAY:864e5,softSemesterLimit:6048e5},d=a(6);function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,s=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,s=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw s}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}i.b.add(l.a,l.b,l.c,l.d),i.a.watch();var p={};p.demoText=d.data,p.semesters=[{year:2019.2,name:"Fall 2019",start:new Date(2019,7,23).getTime(),end:new Date(2019,11,21).getTime()},{year:2019.1,name:"Spring 2019",start:new Date(2019,0,13).getTime(),end:new Date(2019,4,18).getTime()},{year:2018.2,name:"Fall 2018",start:new Date(2018,7,17).getTime(),end:new Date(2018,11,16).getTime()},{year:2018.1,name:"Spring 2018",start:new Date(2018,0,14).getTime(),end:new Date(2018,4,13).getTime()}],n.a.prototype.$utils=h;var w=new n.a({el:"#flexible",data:{currentIdealBalanceIndex:null,debugNow:null,quickBalance:null,now:Date.now(),parsedRawData:null,processedView:!1,rawData:"",rawDataComplete:!0,rawDataError:!1,remainingBalance:null,semesters:[{year:2019.2,name:"Fall 2019",start:new Date(2019,7,23).getTime(),end:new Date(2019,11,21).getTime()},{year:2019.1,name:"Spring 2019",start:new Date(2019,0,13).getTime(),end:new Date(2019,4,18).getTime()},{year:2018.2,name:"Fall 2018",start:new Date(2018,7,17).getTime(),end:new Date(2018,11,16).getTime()},{year:2018.1,name:"Spring 2018",start:new Date(2018,0,14).getTime(),end:new Date(2018,4,13).getTime()}],showMessages:{rawDataComplete:!1},startBalance:500,tabOption:"windows",tabOptions:{macos:"macOS",mobile:"Mobile",windows:"Windows"}},computed:{currentSemester:function(){return this.findSemester(this.getNow())},inSemester:function(){return this.now>this.semester.start-this.$utils.softSemesterLimit},rates:function(){if(!this.semester)return{past:null,future:null};var e=(Math.min(this.now,this.semester.end)-this.semester.start)/this.$utils.MS_PER_DAY,t=e/7,a=(this.semester.end-Math.max(this.now,this.semester.start))/this.$utils.MS_PER_DAY,n=a/7;return{past:{total:this.spentBalance,perDay:this.spentBalance/e,perWeek:this.spentBalance/t},future:{total:this.remainingBalance,perDay:this.remainingBalance/a,perWeek:this.remainingBalance/n}}},remainingBalanceIdeal:function(){return this.getIdealBalanceAtDate(this.now)},remainingBalanceRelative:function(){return this.remainingBalance-this.remainingBalanceIdeal},semester:function(){return this.findSemester(this.now)},spentBalance:function(){return this.$utils.addCurrency(this.startBalance,-this.remainingBalance)}},watch:{rawData:function(e){e&&(-1===e.indexOf("Flex Points")?this.rawDataError=!0:p.parseRawData(e),this.rawData=null)},quickBalance:function(){if(null!==this.quickBalance){this.rawDataComplete=!0,this.now=this.getNow(),this.remainingBalance=this.quickBalance;var e=[[this.semester.start,this.startBalance],[this.now,this.remainingBalance]];this.processedView=!0,this.makeChart(e),this.quickBalance=null}},startBalance:function(e,t){e!==t&&(this.processedView||(this.remainingBalance=this.remainingBalanceIdeal),this.makeChart())}},mounted:function(){var e=window.navigator.userAgent;/iPhone|iPad|iPod|Android/.test(e)?this.tabOption="mobile":-1!==e.indexOf("Mac")&&(this.tabOption="macos");var t=window.location.hash.match(/^#now=(\d{4})-(\d{2})-(\d{2})$/);if(null!==t){var a=m(t.map(function(e){return Number(e)}),4),n=a[1],r=a[2],s=a[3],i=new Date(n,r-1,s);this.debugNow=i.getTime(),this.now=this.debugNow,console.log("Setting debug date to",i)}this.remainingBalance=this.remainingBalanceIdeal,this.makeChart()},methods:{adjustIncompleteData:function(e){e=Number(e),this.rawDataComplete||isNaN(e)||(this.showMessages.rawDataComplete=!1,this.remainingBalance=e,this.adjustParsedRawData(e-this.parsedRawData[this.parsedRawData.length-1][1]),this.makeChart(this.parsedRawData))},adjustParsedRawData:function(e){e&&(this.parsedRawData=this.parsedRawData.map(function(t){return t[1]=this.$utils.addCurrency(t[1],e),t},this))},changeSemesterDate:function(e,t,a){var n=t*this.$utils.MS_PER_DAY;if("start"===e){if(this.semester.start+n<this.semester.end){if(a)return!0;this.semester.start+=n}}else if("end"===e&&this.semester.end+n>this.semester.start){if(a)return!0;this.semester.end+=n}if(a)return!1},ctrlOrCmd:function(){return"macos"===this.tabOption?"⌘ Cmd":"Ctrl"},findSemester:function(e){return this.semesters.reduce(function(t,a){return e<a.end+h.softSemesterLimit?a:t})},getIdealBalanceAtDate:function(e){e=Math.max(this.semester.start,Math.min(e,this.semester.end));var t=this.semester.end-this.semester.start;return(this.semester.end-e)/t*this.startBalance},getIdealBalanceData:function(){var e=[];this.currentIdealBalanceIndex=null;for(var t=this.semester.start;t<this.semester.end;t+=this.$utils.MS_PER_DAY)if(e.push([t,this.getIdealBalanceAtDate(t)]),this.now>=t&&this.now<t+this.$utils.MS_PER_DAY){var a=6e4*Math.floor(this.now/6e4);e.push({x:a,y:this.remainingBalanceIdeal,marker:{enabled:!0}}),this.currentIdealBalanceIndex=e.length-1}return e.push({x:this.semester.end,y:0,marker:{enabled:null===this.currentIdealBalanceIndex}}),null===this.currentIdealBalanceIndex&&(this.currentIdealBalanceIndex=e.length-1),e},getNow:function(){return this.debugNow||Date.now()},makeChart:function(e){var t=[[this.semester.start,this.startBalance],[this.semester.end,0]];this.inSemester&&t.splice(1,0,[this.now,this.remainingBalanceIdeal]);var a=[{name:"Ideal balance",color:"red",lineWidth:1,enableMouseTracking:!e,data:this.getIdealBalanceData()}];e&&(a.push({name:"Actual balance",color:"steelblue",step:null===this.quickBalance?"left":null,data:e,tooltip:{pointFormatter:function(){return'<span style="color:'.concat(this.color,'">●</span> ').concat(this.series.name,": <b>$").concat(this.y.toFixed(2),"</b><br/>")+'<span style="color:red">●</span> Ideal balance: <b>$'.concat(w.getIdealBalanceAtDate(this.x).toFixed(2),"</b><br/>")}}}),this.inSemester&&0!==this.remainingBalance&&a.push({name:"Projected balance",color:"steelblue",dashStyle:"shortdash",enableMouseTracking:!1,data:[[this.now,this.remainingBalance],[this.semester.end,0]]}));var n=this;return s.a.chart("chart",{chart:{type:"line",events:{load:function(){var e=this.series[0].data[n.currentIdealBalanceIndex];this.tooltip.refresh(e)}}},title:{text:void 0},xAxis:{crosshair:{snap:!1},labels:{format:"{value:%b %e}"},type:"datetime"},yAxis:{crosshair:{snap:!1},max:this.startBalance,title:{text:"Flex Points"},labels:{format:"${value}"}},plotOptions:{line:{marker:{enabled:!1}}},series:a,tooltip:{dateTimeLabelFormats:{day:"%a, %B %e",minute:"%a, %B %e, %l:%M %p"},valueDecimals:2,valuePrefix:"$"},time:{useUTC:!1}})},useDemo:function(){this.rawDataComplete=!0,this.startBalance=p.demoText[0][1],this.remainingBalance=p.demoText[p.demoText.length-1][1],this.now=p.demoText[p.demoText.length-1][0],this.processedView=!0,this.makeChart(p.demoText)}}});p.parseRawData=function(e){w.now=w.getNow();var t=e.split("\n").map(function(e){return e.split("\t")});w.parsedRawData=[];var a=0;w.rawDataComplete=!1;for(var n=0;n<t.length&&!w.rawDataComplete;n++){var r=t[n];if(r.length>=4&&"Flex Points"===r[0]){var s=r[1].replace(/\s/g," ").replace(/\B[AP]M/," $&"),i=Date.parse(s),l=r[3].match(/[-\u2013]/),o=r[3].match(/[\d.]+/),u=o?+o[0]:null;if(!isNaN(i)&&null!==u){l&&l.index<o.index&&(u=-u);var c=w.parsedRawData[0]?this.$utils.addCurrency(w.parsedRawData[0][1],-a):0;a=u,w.parsedRawData.unshift([i,c]),u===w.startBalance&&(w.rawDataComplete=!0)}}}0!==w.parsedRawData.length?(w.rawDataError=!1,w.rawDataComplete?w.adjustParsedRawData(w.startBalance-w.parsedRawData[0][1]):w.showMessages.rawDataComplete=!0,w.remainingBalance=w.parsedRawData[w.parsedRawData.length-1][1],w.now=w.parsedRawData[w.parsedRawData.length-1][0],0!==w.remainingBalance&&w.parsedRawData.push([w.now,w.remainingBalance]),w.processedView=!0,w.makeChart(w.parsedRawData)):w.rawDataError=!0}}]);
//# sourceMappingURL=main.js.map