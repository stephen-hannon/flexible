!function(e){function t(t){for(var n,s,o=t[0],l=t[1],u=t[2],h=0,d=[];h<o.length;h++)s=o[h],r[s]&&d.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(c&&c(t);d.length;)d.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=a[0]))}return e}var n={},r={0:0},i=[];function s(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=n,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=l;i.push([11,1]),a()}([,,,function(e){e.exports=[[15159096e5,500],[151604094e4,485.03],[151619772e4,480.44],[15162243e5,474.2],[151639554e4,468.12],[151642512e4,464.33],[151650444e4,460.54],[151666266e4,458.95],[151674168e4,453.46],[151691394e4,446.57],[15169344e5,441.19],[15172746e5,438.41],[15175191e5,433.32],[151760094e4,430.37],[151803732e4,427.98],[151812336e4,422.04],[151814436e4,414.1],[151819824e4,409.45],[151824138e4,404.26],[151847562e4,397.67],[151847652e4,389.23],[151865238e4,381.55],[151884372e4,377.76],[151896954e4,375.37],[151906098e4,370.88],[151915956e4,365.39],[151933308e4,360.05],[151953336e4,354.96],[151974282e4,352.57],[151976424e4,346.57],[151993794e4,342.84],[152001204e4,334.2],[152037144e4,329.81],[152052282e4,321.73],[152143212e4,310.2],[152157456e4,304.21],[15216711e5,299.67],[15217491e5,293.99],[152175096e4,289.7],[152217936e4,286.5],[152228778e4,268.52],[152287854e4,264.58],[152295852e4,261.38],[15230322e5,254.84],[152313744e4,250.99],[1523229e6,248.6],[152330382e4,242.61],[152338692e4,239.96],[152338776e4,234.87],[152356296e4,231.67],[152363676e4,223.83],[152374938e4,215.95],[152375166e4,212.5],[1523928e6,204.11],[152399394e4,197.62],[152401806e4,190.64],[152418744e4,179.39],[152425044e4,176.44],[152427216e4,170.95],[152434518e4,163.16],[152443428e4,159.96],[152452056e4,154.99],[152459874e4,148.5],[152460078e4,147.21],[152476806e4,140.22],[152477904e4,134.73],[152477994e4,131.75],[152495688e4,116.77],[152495856e4,111.78],[15252072e5,104.7],[152521086e4,98.46],[152523516e4,96.47],[152536092e4,88.59],[152545494e4,86.4],[152553318e4,75.63],[15255348e5,73.48],[1525545e6,63.49],[15256182e5,53.74],[15256503e5,46.75],[152583006e4,45],[152587608e4,40.01],[152596662e4,21.02],[152600454e4,15.53],[152606142e4,.33],[15263703e5,0]]},,function(e,t,a){},,,,,,function(e,t,a){a(16),e.exports=a(15)},,,function(e,t,a){"use strict";var n=a(5);a.n(n).a},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(9),i=a.n(r),s=a(7),o=a(10),l=a(0),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e._v("\n\t$"),a("input",e._b({directives:[{name:"model",rawName:"v-model.lazy.number",value:e._value,expression:"_value",modifiers:{lazy:!0,number:!0}}],staticClass:"appearance-textfield hide-steppers",attrs:{type:"number",required:""},domProps:{value:e._value},on:{change:function(t){e._value=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}},"input",e.$attrs,!1))])};u._withStripped=!0;var c={inheritAttrs:!1,model:{prop:"value",event:"submit"},props:{value:{validator:function(e){return!isNaN(parseFloat(e))}}},data:function(){return{_value:null}},watch:{value:{immediate:!0,handler:function(e){this._value=e}}},methods:{onSubmit:function(e){var t=e.target;this.$emit("submit",this._value),this._value=null,t&&t[0]&&t[0].blur&&t[0].blur()}}},h=a(6),d=Object(h.a)(c,u,[],!1,null,null,null);d.options.__file="src/components/Input.vue";var m=d.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-message",class:e.type&&"form-"+e.type},[a("button",{staticClass:"float-right icon-button",attrs:{title:"Close message"},on:{click:function(t){return e.$emit("close")}}},[a("i",{staticClass:"fas fa-times",attrs:{title:"Close message"}})]),e._v(" "),e._t("default")],2)};f._withStripped=!0;var p={props:{type:String}},w=(a(14),Object(h.a)(p,f,[],!1,null,"61d2d687",null));w.options.__file="src/components/Message.vue";var v=w.exports,g=a(1),b=a.n(g),y=function(e){return"".concat(e<0?"−":"","$").concat(Math.abs(e).toFixed(2))};function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var B=function(e,t){return Math.round(100*e+100*t)/100},x=function(e,t){return t?e.map(function(e){var a=D(e,2),n=a[0],r=a[1];return[n,B(r,t)]}):e},C=function(e,t){return b()("Spring"===t?new Date(e,0,15):new Date(e,7,25)).day(0)},S=function(e,t){return b()("Spring"===t?new Date(e,4,7):new Date(e,11,15)).day(6)},_=function(e){var t,a=b()(e),n=a.get("year"),r=S(n,"Fall"),i=S(n,"Spring");return r.add(12096e5,"ms").isBefore(a)?(n++,t="Spring"):t=i.add(12096e5,"ms").isBefore(a)?"Fall":"Spring",{year:n+("Spring"===t?.1:.2),name:"".concat(t," ").concat(n),start:C(n,t).valueOf(),end:S(n,t).valueOf()}},M=function(e,t){var a=e/864e5;return{total:t,perDay:e>0?t/a||0:null,perWeek:e>0?t/(a/7)||0:null}},I=function(e,t,a,n,r){var i=(e-t)/(a-t);return Math.max(0,Math.min(i,1))*(r-n)+n},O=function(e,t,a,n){return e!==t?function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:864e5,n=[],r=e,i=a-e%a;for(i&&(n.push(e),r+=i);r<t;)n.push(r),r+=a;return n.push(t),n}(e,t).map(function(r){return[r,I(r,e,t,a,n)]}):[[e,a],[t,n]]};function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var N=function(e){var t=A(e.split("\t"),4),a=t[0],n=t[1],r=t[2],i=t[3];if(void 0===i||"Flex Points"!==a)return null;var s=n.replace(/\s/g," ").replace(/\B[AP]M/," $&"),o=Date.parse(s),l=i.match(/[\d.]+/);if(isNaN(o)||!l)return null;var u=i.match(/[-\u2013]/),c=+l[0];return u&&u.index<l.index&&(c=-c),{date:o,amountChange:c,details:r}},k=a(3);function j(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}s.b.add(o.a,l.a,l.b,l.e,l.f,l.c,l.g,l.d),s.a.watch(),n.a.config.productionTip=!1,n.a.component("app-input",m),n.a.component("app-message",v),new n.a({el:"#flexible",filters:{currency:y,currencySafe:function(e){return"number"!=typeof e||isNaN(e)?"$—":y(e)},date:function(e){return b()(e).format("ddd, MMMM D, YYYY")}},data:{chartData:null,currentIdealBalanceIndex:null,debugNow:null,manualDates:{start:null,end:null},now:Date.now(),processedView:null,rawData:"",rawDataComplete:!0,rawDataError:!1,remainingBalance:null,showMessages:{rawDataComplete:!1},startBalance:500,tabOption:"windows",tabOptions:{macos:"macOS",mobile:"Mobile",windows:"Windows"}},computed:{inSemester:function(){return this.now>this.semester.start-12096e5},inSemesterCurrent:function(){return this.getNow()>this.semesterCurrent.start-12096e5},quickData:function(){return O(Math.min(this.semester.start,this.now),this.now,this.startBalance,this.remainingBalance)},rates:function(){return{past:M(this.semester&&Math.min(this.now,this.semester.end)-this.semester.start,this.spentBalance),future:M(this.semester&&this.semester.end-Math.max(this.now,this.semester.start),this.remainingBalanceSafe)}},remainingBalanceIdeal:function(){return this.getIdealBalanceAtDate(this.now)},remainingBalanceIdealCurrent:function(){return this.getIdealBalanceAtDate(this.getNow(),this.semesterCurrent)},remainingBalanceRelative:function(){return this.remainingBalanceSafe-this.remainingBalanceIdeal},remainingBalanceSafe:function(){return null==this.remainingBalance?this.remainingBalanceIdeal:this.remainingBalance},semester:function(){return this.findSemesterAdjusted(this.now)},semesterCurrent:function(){var e=_(this.getNow());return e.year===this.semester.year?this.semester:e},spentBalance:function(){return B(this.startBalance,-this.remainingBalanceSafe)}},watch:{now:function(){this.manualDates={start:null,end:null}},rawData:function(e){e&&(-1===e.indexOf("Flex Points")?this.rawDataError=!0:this.parseRawData(e),this.rawData=null)},startBalance:function(){this.makeChart()}},mounted:function(){var e=window.navigator.userAgent;/iPhone|iPad|iPod|Android/.test(e)?this.tabOption="mobile":-1!==e.indexOf("Mac")&&(this.tabOption="macos");var t=window.location.hash.match(/^#now=(\d{4})-(\d{2})-(\d{2})$/);if(null!==t){var a=P(t.map(function(e){return Number(e)}),4),n=a[1],r=a[2],i=a[3],s=new Date(n,r-1,i);this.debugNow=s.getTime(),this.now=this.debugNow,console.log("Setting debug date to",s)}this.makeChart()},methods:{adjustIncompleteData:function(e){e=Number(e),"parse"!==this.processedView||this.rawDataComplete||isNaN(e)||(this.showMessages.rawDataComplete=!1,this.remainingBalance=e,this.chartData=x(this.chartData,e-this.chartData[this.chartData.length-1][1]),this.makeChart())},changeSemesterDate:function(e,t,a){var n=864e5*t;if("start"===e){if(this.semester.start+n<this.semester.end){if(a)return!0;this.manualDates.start+=n}}else if("end"===e&&this.semester.end+n>this.semester.start){if(a)return!0;this.manualDates.end+=n}if(a)return!1;this.makeChart()},ctrlOrCmd:function(){return"macos"===this.tabOption?"⌘ Cmd":"Ctrl"},findSemesterAdjusted:function(e){var t=_(e);return this.manualDates.start&&(t.start+=this.manualDates.start),this.manualDates.end&&(t.end+=this.manualDates.end),t},getIdealBalanceAtDate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.semester;return I(e,t.start,t.end,this.startBalance,0)},getNow:function(){return this.debugNow||Date.now()},makeChart:function(){var e="quick"===this.processedView?this.quickData:this.chartData,t="parse"!==this.processedView||this.rawDataComplete?[]:O(this.semester.start,e[0][0],this.startBalance,e[0][1]),a=O(this.now,Math.max(this.semester.end,this.now),this.remainingBalance,0),n=e?[].concat(j(t),j(e),j(a)).map(function(e){var t=P(e,1)[0];return[t,this.getIdealBalanceAtDate(t)]},this):O(this.semester.start,this.semester.end,this.startBalance,0),r=n.findIndex(function(e){return e[0]>=this.now},this);-1===r&&(r=n.length);var s=6e4*Math.floor(this.now/6e4);n.splice(r,0,{x:s,y:this.remainingBalanceIdeal,marker:{enabled:!0}});var o=[{name:"Ideal balance",colorIndex:1,data:n,id:"ideal"}];return e&&o.push({name:"Estimated balance",colorIndex:0,className:"line-dash",data:t,id:"estimated",linkedTo:"actual"},{name:"Actual balance",colorIndex:0,step:"quick"!==this.processedView?"left":null,data:e,id:"actual"},{name:"Projected balance",colorIndex:0,className:"line-dash",data:a,id:"projected",linkedTo:":previous"}),i.a.chart("chart",{chart:{type:"line",styledMode:!0,events:{load:"demo"!==this.processedView?function(){var e=this.get("ideal").data[r],t=this.get("actual")&&this.get("actual").data[r];this.tooltip.refresh(t?[e,t]:[e])}:void 0}},title:{text:void 0},xAxis:{crosshair:{snap:!1},labels:{format:"{value:%b %e}"},type:"datetime"},yAxis:{crosshair:{snap:!1},max:this.startBalance,title:{text:"Flex Points"},labels:{format:"${value}"}},plotOptions:{line:{marker:{enabled:!1}}},series:o,tooltip:{split:!0,dateTimeLabelFormats:{day:"%a, %B %e, %Y",minute:"%a, %B %e, %Y, %l:%M %p"},valueDecimals:2,valuePrefix:"$"},time:{useUTC:!1}})},parseRawData:function(e){this.now=this.getNow();var t=function(e,t){for(var a,n=e.split("\n"),r=[],i=!1,s=!1,o=0,l=0;l<n.length&&!i;l++){var u=N(n[l]);if(null!==u){var c=u.date,h=u.amountChange,d=u.details;"GUI Location"===d&&0===r.length&&(s=!0);var m=r[0]?B(r[0][1],-o):0;o=h,r.unshift([c,m]),h===t?i=!0:"PatronImport Location"===d&&h>=110&&(i=!0,a=h)}}return{parsedRawData:r,rawDataComplete:i,rawDataCompleteEnd:s,newStartBalance:a}}(e,this.startBalance),a=t.parsedRawData,n=t.rawDataComplete,r=t.rawDataCompleteEnd,i=t.newStartBalance;if(this.chartData=a,this.rawDataComplete=n,0!==this.chartData.length){var s;this.rawDataError=!1,void 0!==i&&(this.startBalance=i),r||(this.rawDataComplete?this.chartData=x(this.chartData,this.startBalance-this.chartData[0][1]):this.showMessages.rawDataComplete=!0);var o=P(this.chartData[this.chartData.length-1],2);s=o[0],this.remainingBalance=o[1],_(s).year!==this.semester.year?this.now=s:this.chartData.push([this.now,this.remainingBalance]),this.processedView="parse",this.makeChart()}else this.rawDataError=!0},useDemo:function(){this.rawDataComplete=!0,this.chartData=k,this.startBalance=k[0][1];var e=P(k[k.length-1],2);this.now=e[0],this.remainingBalance=e[1],this.processedView="demo",this.makeChart()},useQuick:function(e){this.now=this.getNow(),this.rawDataComplete=!0,this.remainingBalance=e,this.processedView="quick",this.makeChart()}}})}]);
//# sourceMappingURL=main.js.map