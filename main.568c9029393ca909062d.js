!function(t){function e(e){for(var n,s,o=e[0],l=e[1],c=e[2],h=0,d=[];h<o.length;h++)s=o[h],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);for(u&&u(e);d.length;)d.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={0:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;i.push([0,1]),a()}({0:function(t,e,a){a("e6Wu"),t.exports=a("WQPq")},"43pR":function(t,e,a){"use strict";var n=a("Nnty");a.n(n).a},G2hz:function(t,e,a){},Nnty:function(t,e,a){},SKxd:function(t,e,a){},WQPq:function(t,e,a){},b81r:function(t,e,a){"use strict";var n=a("SKxd");a.n(n).a},e6Wu:function(t,e,a){"use strict";a.r(e);var n=a("oCYn"),r=a("6n/F"),i=a.n(r),s=a("7O5W"),o=a("8tEE"),l=a("wHSu"),c=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card",class:{"card-wide":this.wide}},[e("div",{staticClass:"card-content"},[this._t("default")],2)])};c._withStripped=!0;var u={props:{wide:Boolean}},h=(a("nMAr"),a("KHd+")),d=Object(h.a)(u,c,[],!1,null,"54cdc180",null);d.options.__file="src/components/Card.vue";var p=d.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"collapsible-container",class:{"collapsible-collapsed":t.collapsed}},[a("button",{staticClass:"collapsible-header",attrs:{title:"Click to "+(t.collapsed?"expand":"collapse")+" section"},on:{click:function(e){return t.$emit("toggle",!t.collapsed)}}},[t._v("\n\t\t"+t._s(t.header)+"\n\t\t"),t._m(0)]),t._v(" "),a("transition",{attrs:{name:"slide"}},[t.collapsed?t._e():a("div",{staticClass:"collapsible-content"},[t._t("default")],2)])],1)};f._withStripped=!0;var m={model:{prop:"collapsed",event:"toggle"},props:{collapsed:Boolean,header:String}},v=(a("43pR"),Object(h.a)(m,f,[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"collapsible-header-icon"},[e("i",{staticClass:"fas fa-chevron-up"})])}],!1,null,"02f7cdec",null));v.options.__file="src/components/Collapsible.vue";var w=v.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[t._v("\n\t$ "),a("input",t._b({directives:[{name:"model",rawName:"v-model.lazy.number",value:t._value,expression:"_value",modifiers:{lazy:!0,number:!0}}],staticClass:"appearance-textfield hide-steppers",attrs:{type:"number",required:""},domProps:{value:t._value},on:{change:function(e){t._value=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}},"input",t.$attrs,!1))])};g._withStripped=!0;var b={inheritAttrs:!1,model:{prop:"value",event:"submit"},props:{value:{validator:function(t){return!isNaN(parseFloat(t))}}},data:function(){return{_value:null}},watch:{value:{immediate:!0,handler:function(t){this._value=t}}},methods:{onSubmit:function(t){var e=t.target;this.$emit("submit",this._value),this._value=null,e&&e[0]&&e[0].blur&&e[0].blur()}}},y=Object(h.a)(b,g,[],!1,null,null,null);y.options.__file="src/components/Input.vue";var D=y.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-message",class:t.type&&"form-"+t.type},[a("button",{staticClass:"float-right icon-button",attrs:{title:"Close message"},on:{click:function(e){return t.$emit("close")}}},[a("i",{staticClass:"fas fa-times",attrs:{title:"Close message"}})]),t._v(" "),t._t("default")],2)};B._withStripped=!0;var C={props:{type:String}},x=(a("b81r"),Object(h.a)(C,B,[],!1,null,"61d2d687",null));x.options.__file="src/components/Message.vue";var _=x.exports,S=a("Wgwc"),k=a.n(S),O=function(t){return"".concat(t<0?"−":"","$").concat(Math.abs(t).toFixed(2))};function I(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=[],n=!0,r=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!e||a.length!==e);n=!0);}catch(t){r=!0,i=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return a}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var M=function(t,e){return Math.round(100*t+100*e)/100},A=function(t,e){return e?t.map(function(t){var a=I(t,2),n=a[0],r=a[1];return[n,M(r,e)]}):t},N=function(t,e){return k()("Spring"===e?new Date(t,0,15):new Date(t,7,25)).day(0)},j=function(t,e){return k()("Spring"===e?new Date(t,4,7):new Date(t,11,15)).day(6)},E=function(t){var e,a=k()(t),n=a.get("year"),r=j(n,"Fall"),i=j(n,"Spring");return r.add(12096e5,"ms").isBefore(a)?(n++,e="Spring"):e=i.add(12096e5,"ms").isBefore(a)?"Fall":"Spring",{year:n+("Spring"===e?.1:.2),name:"".concat(e," ").concat(n),start:N(n,e).valueOf(),end:j(n,e).valueOf()}},P=function(t,e){var a=t/864e5;return{total:e,perDay:t>0?e/a||0:null,perWeek:t>0?e/(a/7)||0:null}},T=function(t,e,a,n,r){var i=(t-e)/(a-e);return Math.max(0,Math.min(i,1))*(r-n)+n},$=function(t,e,a,n){return t!==e?function(t,e){var a=[],n=k()(t),r=n.startOf("day").add(1,"day");for(n.isSame(r)||(a.push(t),n=r);n.isBefore(e);)a.push(n.valueOf()),n=n.add(1,"day");return a.push(e),a}(t,e).map(function(r){return[r,T(r,t,e,a,n)]}):[[t,a],[e,n]]};function R(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=[],n=!0,r=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!e||a.length!==e);n=!0);}catch(t){r=!0,i=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return a}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var W=function(t){var e=R(t.split("\t"),4),a=e[0],n=e[1],r=e[2],i=e[3];if(void 0===i||"Flex Points"!==a)return null;var s=n.replace(/\s/g," ").replace(/\B[AP]M/," $&"),o=Date.parse(s),l=i.match(/[\d.]+/);if(isNaN(o)||!l)return null;var c=i.match(/[-\u2013]/),u=+l[0];return c&&c.index<l.index&&(u=-u),{date:o,amountChange:u,details:r}},V=a("kh7J");function F(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function q(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=[],n=!0,r=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!e||a.length!==e);n=!0);}catch(t){r=!0,i=t}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}return a}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}s.b.add(o.a,l.a,l.b,l.i,l.j,l.c,l.k,l.h,l.g,l.d,l.e,l.f),s.a.watch(),n.a.config.productionTip=!1,n.a.component("app-card",p),n.a.component("app-collapsible",w),n.a.component("app-input",D),n.a.component("app-message",_),new n.a({el:"#flexible",filters:{currency:O,currencySafe:function(t){return"number"!=typeof t||isNaN(t)?"$—":O(t)},date:function(t){return k()(t).format("ddd, MMMM D, YYYY")}},data:{chartData:null,collapseInstructions:!1,currentIdealBalanceIndex:null,debugNow:null,loaderShow:!0,manualDates:{start:null,end:null},now:Date.now(),platformGuess:"windows",processedView:null,rawData:"",rawDataComplete:!0,rawDataError:!1,remainingBalance:null,showMessages:{rawDataComplete:!1},startBalance:500,tabOption:null,tabOptions:{macos:"macOS",mobile:"Mobile",windows:"Windows"}},computed:{ctrlOrCmd:function(){return"macos"===this.tabOption?"⌘ Cmd":"Ctrl"},inSemester:function(){return this.now>this.semester.start-12096e5},inSemesterCurrent:function(){return this.getNow()>this.semesterCurrent.start-12096e5},quickData:function(){return $(Math.min(this.semester.start,this.now),this.now,this.startBalance,this.remainingBalance)},rates:function(){return{past:P(this.semester&&Math.min(this.now,this.semester.end)-this.semester.start,this.spentBalance),future:P(this.semester&&this.semester.end-Math.max(this.now,this.semester.start),this.remainingBalanceSafe)}},remainingBalanceIdeal:function(){return this.getIdealBalanceAtDate(this.now)},remainingBalanceIdealCurrent:function(){return this.getIdealBalanceAtDate(this.getNow(),this.semesterCurrent)},remainingBalanceRelative:function(){return this.remainingBalanceSafe-this.remainingBalanceIdeal},remainingBalanceSafe:function(){return null==this.remainingBalance?this.remainingBalanceIdeal:this.remainingBalance},semester:function(){return this.findSemesterAdjusted(this.now)},semesterCurrent:function(){var t=E(this.getNow());return t.year===this.semester.year?this.semester:t},spentBalance:function(){return M(this.startBalance,-this.remainingBalanceSafe)}},watch:{now:function(){this.manualDates={start:null,end:null}},rawData:function(t){t&&(-1===t.indexOf("Flex Points")?this.rawDataError=!0:this.parseRawData(t),this.rawData=null)},startBalance:function(){this.makeChart()}},mounted:function(){Math.max(document.documentElement.clientWidth,window.innerWidth||0)<728&&(this.collapseInstructions=!0);var t=window.navigator.userAgent;/iPhone|iPad|iPod|Android/.test(t)?this.platformGuess="mobile":-1!==t.indexOf("Mac")&&(this.platformGuess="macos"),this.tabOption=this.platformGuess;var e=window.location.hash.match(/^#now=(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2})?$/);if(null!==e){var a=q(e,3),n=a[1],r=a[2],i=new Date("".concat(n).concat(r||"T00:00:00"));this.debugNow=i.getTime(),this.now=this.debugNow,console.log("Setting debug date to",i)}this.loaderShow=!1,this.makeChart()},methods:{adjustIncompleteData:function(t){t=Number(t),"parse"!==this.processedView||this.rawDataComplete||isNaN(t)||(this.showMessages.rawDataComplete=!1,this.remainingBalance=t,this.chartData=A(this.chartData,t-this.chartData[this.chartData.length-1][1]),this.makeChart())},changeSemesterDate:function(t,e,a){var n=864e5*e;if("start"===t){if(this.semester.start+n<this.semester.end){if(a)return!0;this.manualDates.start+=n}}else if("end"===t&&this.semester.end+n>this.semester.start){if(a)return!0;this.manualDates.end+=n}if(a)return!1;this.makeChart()},findSemesterAdjusted:function(t){var e=E(t);return this.manualDates.start&&(e.start+=this.manualDates.start),this.manualDates.end&&(e.end+=this.manualDates.end),e},getIdealBalanceAtDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.semester;return T(t,e.start,e.end,this.startBalance,0)},getNow:function(){return this.debugNow||Date.now()},makeChart:function(){var t="quick"===this.processedView?this.quickData:this.chartData,e="parse"!==this.processedView||this.rawDataComplete?[]:$(this.semester.start,t[0][0],this.startBalance,t[0][1]),a=$(this.now,Math.max(this.semester.end,this.now),this.remainingBalance,0),n=t?[].concat(F(e),F(t),F(a)).map(function(t){var e=q(t,1)[0];return[e,this.getIdealBalanceAtDate(e)]},this):$(this.semester.start,this.semester.end,this.startBalance,0),r=n.findIndex(function(t){return q(t,1)[0]>=this.now},this);-1===r&&(r=n.length),n.splice(r,0,{x:this.now,y:this.remainingBalanceIdeal,marker:{enabled:!0}});var s=[{name:"Ideal balance",colorIndex:1,data:n,id:"ideal"}];return t&&s.push({name:"Estimated balance",colorIndex:0,className:"line-dash",data:e,id:"estimated",linkedTo:"actual"},{name:"Actual balance",colorIndex:0,step:"quick"!==this.processedView?"left":null,data:t,id:"actual"},{name:"Projected balance",colorIndex:0,className:"line-dash",data:a,id:"projected",linkedTo:":previous"}),i.a.chart("chart",{chart:{type:"line",styledMode:!0,spacingLeft:0,spacingRight:0,events:{load:"demo"!==this.processedView?function(){var t=this.get("ideal").data[r],e=this.get("actual")&&this.get("actual").data[r];this.tooltip.refresh(e?[t,e]:[t])}:void 0}},plotOptions:{line:{marker:{enabled:!1}}},series:s,time:{useUTC:!1},title:{text:246.01===this.remainingBalance?"My name is Jean Valjean":void 0},tooltip:{split:!0,valueDecimals:2,valuePrefix:"$",xDateFormat:"%a, %B %e, %Y, %l:%M %p"},xAxis:{crosshair:{snap:!1},labels:{format:"{value:%b %e}"},type:"datetime"},yAxis:{crosshair:{snap:!1},max:this.startBalance,title:{text:"Flex Points"},labels:{format:"${value}"}}})},parseRawData:function(t){this.now=this.getNow();var e=function(t,e){for(var a,n=t.split("\n"),r=[],i=!1,s=!1,o=0,l=0;l<n.length&&!i;l++){var c=W(n[l]);if(null!==c){var u=c.date,h=c.amountChange,d=c.details;"GUI Location"===d&&0===r.length&&(s=!0);var p=r[0]?M(r[0][1],-o):0;o=h,r.unshift([u,p]),h===e?i=!0:"PatronImport Location"===d&&h>=110&&(i=!0,a=h)}}return{parsedRawData:r,rawDataComplete:i,rawDataCompleteEnd:s,newStartBalance:a}}(t,this.startBalance),a=e.parsedRawData,n=e.rawDataComplete,r=e.rawDataCompleteEnd,i=e.newStartBalance;if(this.chartData=a,this.rawDataComplete=n,0!==this.chartData.length){var s;this.scrollToResults(),this.rawDataError=!1,void 0!==i&&(this.startBalance=i),r||(this.rawDataComplete?this.chartData=A(this.chartData,this.startBalance-this.chartData[0][1]):this.showMessages.rawDataComplete=!0);var o=q(this.chartData[this.chartData.length-1],2);s=o[0],this.remainingBalance=o[1],E(s).year!==this.semester.year?this.now=s:this.chartData.push([this.now,this.remainingBalance]),this.processedView="parse",this.makeChart()}else this.rawDataError=!0},scrollToResults:function(){this.$nextTick(function(){document.getElementById("results").scrollIntoView()})},useDemo:function(){this.scrollToResults(),this.rawDataComplete=!0,this.chartData=V,this.startBalance=V[0][1];var t=q(V[V.length-1],2);this.now=t[0],this.remainingBalance=t[1],this.processedView="demo",this.makeChart()},useQuick:function(t){this.scrollToResults(),this.now=this.getNow(),this.rawDataComplete=!0,this.remainingBalance=t,this.processedView="quick",this.makeChart()}}}),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./service-worker.js").catch(function(t){console.log("Unable to register service worker:",t)})})},kh7J:function(t){t.exports=JSON.parse("[[1515909600000,500],[1516040940000,485.03],[1516197720000,480.44],[1516224300000,474.2],[1516395540000,468.12],[1516425120000,464.33],[1516504440000,460.54],[1516662660000,458.95],[1516741680000,453.46],[1516913940000,446.57],[1516934400000,441.19],[1517274600000,438.41],[1517519100000,433.32],[1517600940000,430.37],[1518037320000,427.98],[1518123360000,422.04],[1518144360000,414.1],[1518198240000,409.45],[1518241380000,404.26],[1518475620000,397.67],[1518476520000,389.23],[1518652380000,381.55],[1518843720000,377.76],[1518969540000,375.37],[1519060980000,370.88],[1519159560000,365.39],[1519333080000,360.05],[1519533360000,354.96],[1519742820000,352.57],[1519764240000,346.57],[1519937940000,342.84],[1520012040000,334.2],[1520371440000,329.81],[1520522820000,321.73],[1521432120000,310.2],[1521574560000,304.21],[1521671100000,299.67],[1521749100000,293.99],[1521750960000,289.7],[1522179360000,286.5],[1522287780000,268.52],[1522878540000,264.58],[1522958520000,261.38],[1523032200000,254.84],[1523137440000,250.99],[1523229000000,248.6],[1523303820000,242.61],[1523386920000,239.96],[1523387760000,234.87],[1523562960000,231.67],[1523636760000,223.83],[1523749380000,215.95],[1523751660000,212.5],[1523928000000,204.11],[1523993940000,197.62],[1524018060000,190.64],[1524187440000,179.39],[1524250440000,176.44],[1524272160000,170.95],[1524345180000,163.16],[1524434280000,159.96],[1524520560000,154.99],[1524598740000,148.5],[1524600780000,147.21],[1524768060000,140.22],[1524779040000,134.73],[1524779940000,131.75],[1524956880000,116.77],[1524958560000,111.78],[1525207200000,104.7],[1525210860000,98.46],[1525235160000,96.47],[1525360920000,88.59],[1525454940000,86.4],[1525533180000,75.63],[1525534800000,73.48],[1525545000000,63.49],[1525618200000,53.74],[1525650300000,46.75],[1525830060000,45],[1525876080000,40.01],[1525966620000,21.02],[1526004540000,15.53],[1526061420000,0.33],[1526370300000,0]]")},nMAr:function(t,e,a){"use strict";var n=a("G2hz");a.n(n).a}});
//# sourceMappingURL=main.568c9029393ca909062d.js.map