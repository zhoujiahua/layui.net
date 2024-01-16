/** The Web UI Theme-v2.3.2 */;layui.define("view",function(e){function t(e){var a=e.attr("lay-id"),t=e.attr("lay-attr"),e=e.index();location.hash=a!==r.entry&&t||"/",P.tabsBodyChange(e)}var c=layui.jquery,s=layui.laytpl,a=layui.table,i=layui.element,l=layui.util,n=layui.upload,r=(layui.form,layui.setter),o=layui.view,u=layui.device(),d=c(window),m=c(document),y=c("body"),h=c("#"+r.container),f="layui-show",p="layui-this",b="layui-disabled",v="#LAY_app_body",g="LAY_app_flexible",x="layadmin-side-spread-sm",C="layadmin-tabsbody-item",k="layui-icon-shrink-right",F="layui-icon-spread-left",z="layadmin-side-shrink",P={v:"2.3.2",mode:"spa",req:o.req,exit:o.exit,escape:l.escape,on:function(e,a){return layui.onevent.call(this,r.MOD_NAME,e,a)},popup:o.popup,popupRight:function(e){return P.popup.index=layer.open(c.extend({type:1,id:"LAY_adminPopupR",anim:-1,title:!1,closeBtn:!1,offset:"r",shade:.1,shadeClose:!0,skin:"layui-anim layui-anim-rl layui-layer-adminRight",area:"300px"},e))},sendAuthCode:function(i){function l(e){var a=c(i.elem);--n<0?(a.removeClass(b).html("\u83b7\u53d6\u9a8c\u8bc1\u7801"),n=i.seconds,clearInterval(t)):a.addClass(b).html(n+"\u79d2\u540e\u91cd\u83b7"),e||(t=setInterval(function(){l(!0)},1e3))}var t,n=(i=c.extend({seconds:60,elemPhone:"#LAY_phone",elemVercode:"#LAY_vercode"},i)).seconds;y.off("click",i.elem).on("click",i.elem,function(){i.elemPhone=c(i.elemPhone),i.elemVercode=c(i.elemVercode);var a,e=i.elemPhone,t=e.val();if(n===i.seconds&&!c(this).hasClass(b)){if(!/^1\d{10}$/.test(t))return e.focus(),layer.msg("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7");"object"==typeof i.ajax&&(a=i.ajax.success,delete i.ajax.success),P.req(c.extend(!0,{url:"/auth/code",type:"get",data:{phone:t},success:function(e){layer.msg("\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\u81f3\u4f60\u7684\u624b\u673a\uff0c\u8bf7\u6ce8\u610f\u67e5\u6536",{icon:1,shade:0}),i.elemVercode.focus(),l(),a&&a(e)}},i.ajax))}})},screen:function(){var e=d.width();return 1200<e?3:992<e?2:768<e?1:0},sideFlexible:function(e){var a=h,t=c("#"+g),i=P.screen();"spread"===e?(t.removeClass(F).addClass(k),i<2?a.addClass(x):a.removeClass(x),a.removeClass(z)):(t.removeClass(k).addClass(F),i<2?a.removeClass(z):a.addClass(z),a.removeClass(x)),layui.event.call(this,r.MOD_NAME,"side({*})",{status:e})},resizeTable:function(e){function a(){t.tabsBody(P.tabsPage.index).find(".layui-table-view").each(function(){var e=c(this).attr("lay-id");layui.table.resize(e)})}var t=this;layui.table&&(e?setTimeout(a,e):a())},theme:function(e){r.theme;var t=layui.data(r.tableName),a="LAY_layadmin_theme",i=document.getElementById(a),l=document.createElement("style");if(e.CLEAR)return c(i).remove(),layui.data(r.tableName,{key:"theme",remove:!0});var n=s([".layui-side-menu,",".layui-layer-admin .layui-layer-title,",".layadmin-side-shrink .layui-side-menu .layui-nav>.layui-nav-item>.layui-nav-child","{background-color:{{d.color.main}} !important;}",".layadmin-pagetabs .layui-tab-title li:after,",".layadmin-pagetabs .layui-tab-title li.layui-this:after,",".layui-nav-tree .layui-this,",".layui-nav-tree .layui-this>a,",".layui-nav-tree .layui-nav-child dd.layui-this,",".layui-nav-tree .layui-nav-child dd.layui-this a,",".layui-nav-tree .layui-nav-bar","{background-color:{{d.color.selected}} !important;}",".layui-layout-admin .layui-logo{background-color:{{d.color.logo || d.color.main}} !important;}",".layadmin-pagetabs .layui-tab-title li:hover,",".layadmin-pagetabs .layui-tab-title li.layui-this","{color: {{d.color.selected}} !important;}","{{# if(d.color.header){ }}",".layui-layout-admin .layui-header{background-color:{{ d.color.header }};}",".layui-layout-admin .layui-header a,",".layui-layout-admin .layui-header a cite{color: #f8f8f8;}",".layui-layout-admin .layui-header a:hover{color: #fff;}",".layui-layout-admin .layui-header .layui-nav .layui-nav-more{border-top-color: #fbfbfb;}",".layui-layout-admin .layui-header .layui-nav .layui-nav-mored{border-color: transparent; border-bottom-color: #fbfbfb;}",".layui-layout-admin .layui-header .layui-nav .layui-this:after, .layui-layout-admin .layui-header .layui-nav-bar{background-color: #fff; background-color: rgba(255,255,255,.5);}",".layadmin-pagetabs .layui-tab-title li:after{display: none;}","{{# } }}"].join("")).render(e=c.extend({},t.theme,e));"styleSheet"in l?(l.setAttribute("type","text/css"),l.styleSheet.cssText=n):l.innerHTML=n,l.id=a,i&&y[0].removeChild(i),y[0].appendChild(l),e.color&&y.attr("layadmin-themealias",e.color.alias),t.theme=t.theme||{},layui.each(e,function(e,a){t.theme[e]=a}),layui.data(r.tableName,{key:"theme",value:t.theme})},initTheme:function(e){var a=r.theme;a.color[e=e||0]&&(a.color[e].index=e,P.theme({color:a.color[e]}))},tabsPage:{},tabsHeader:function(e){return c("#LAY_app_tabsheader").children("li").eq(e||0)},tabsBody:function(e){return c(v).find("."+C).eq(e||0)},tabsBodyChange:function(e){P.tabsHeader(e).attr("lay-attr",layui.router().href),P.tabsBody(e).addClass(f).siblings().removeClass(f),A.rollPage("auto",e)},resize:function(e){var a=layui.router().path.join("-");P.resizeFn[a]&&(d.off("resize",P.resizeFn[a]),delete P.resizeFn[a]),"off"!==e&&(e(),P.resizeFn[a]=e,d.on("resize",P.resizeFn[a]))},resizeFn:{},runResize:function(){var e=layui.router().path.join("-");P.resizeFn[e]&&P.resizeFn[e]()},delResize:function(){this.resize("off")},closeThisTabs:function(){P.tabsPage.index&&c(T).eq(P.tabsPage.index).find(".layui-tab-close").trigger("click")},fullScreen:function(){var e=document.documentElement,a=e.requestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;void 0!==a&&a&&a.call(e)},exitScreen:function(){document.documentElement;document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()},correctRouter:function(e){return(e=/^\//.test(e)?e:"/"+e).replace(/^(\/+)/,"/").replace(new RegExp("/"+r.entry+"$"),"/")}},A=P.events={flexible:function(e){e=e.find("#"+g).hasClass(F);P.sideFlexible(e?"spread":null),P.resizeTable(350)},refresh:function(){P.render()},serach:function(t){t.off("keypress").on("keypress",function(e){var a;this.value.replace(/\s/g,"")&&13===e.keyCode&&(e=t.attr("lay-action"),a=t.attr("lay-text")||"\u641c\u7d22",e+=this.value,a=a+' <span style="color: #FF5722;">'+P.escape(this.value)+"</span>",location.hash=P.correctRouter(e),A.serach.keys||(A.serach.keys={}),A.serach.keys[P.tabsPage.index]=this.value,this.value===A.serach.keys[P.tabsPage.index]&&A.refresh(t),this.value="")})},message:function(e){e.find(".layui-badge-dot").remove()},theme:function(){P.popupRight({id:"LAY_adminPopupTheme",success:function(){o(this.id).render("system/theme")}})},note:function(e){var a=P.screen()<2,t=layui.data(r.tableName).note;A.note.index=P.popup({title:"\u4fbf\u7b7e",shade:0,offset:["41px",a?null:e.offset().left-250+"px"],anim:-1,id:"LAY_adminNote",skin:"layadmin-note layui-anim layui-anim-upbit",content:'<textarea placeholder="\u5185\u5bb9"></textarea>',resize:!1,success:function(e,a){e.find("textarea").val(void 0===t?"\u4fbf\u7b7e\u4e2d\u7684\u5185\u5bb9\u4f1a\u5b58\u50a8\u5728\u672c\u5730\uff0c\u8fd9\u6837\u5373\u4fbf\u4f60\u5173\u6389\u4e86\u6d4f\u89c8\u5668\uff0c\u5728\u4e0b\u6b21\u6253\u5f00\u65f6\uff0c\u4f9d\u7136\u4f1a\u8bfb\u53d6\u5230\u4e0a\u4e00\u6b21\u7684\u8bb0\u5f55\u3002\u662f\u4e2a\u975e\u5e38\u5c0f\u5de7\u5b9e\u7528\u7684\u672c\u5730\u5907\u5fd8\u5f55":t).focus().on("keyup",function(){layui.data(r.tableName,{key:"note",value:this.value})})}})},fullscreen:function(e,a){function t(e){e?n.addClass(l).removeClass(i):n.addClass(i).removeClass(l)}var i="layui-icon-screen-full",l="layui-icon-screen-restore",n=e.children("i"),e=n.hasClass(i);if(a)return t(a.status);t(e),e?P.fullScreen():P.exitScreen()},about:function(){P.popupRight({id:"LAY_adminPopupAbout",success:function(){o(this.id).render("system/about")}})},more:function(){P.popupRight({id:"LAY_adminPopupMore",success:function(){o(this.id).render("system/more")}})},back:function(){history.back()},setTheme:function(e){var a=e.data("index");e.siblings(".layui-this").data("index");e.hasClass(p)||(e.addClass(p).siblings(".layui-this").removeClass(p),P.initTheme(a),o("LAY_adminPopupTheme").render("system/theme"))},rollPage:function(e,a){var t,i=c("#LAY_app_tabsheader"),l=i.children("li"),n=(i.prop("scrollWidth"),i.outerWidth()),s=parseFloat(i.css("left"));if("left"===e)!s&&s<=0||(t=-s-n,l.each(function(e,a){a=c(a).position().left;if(t<=a)return i.css("left",-a),!1}));else if("auto"===e){var r,e=l.eq(a);if(e[0]){if((a=e.position().left)<-s)return void i.css("left",-a);a+e.outerWidth()>=n-s&&(r=a+e.outerWidth()-(n-s),l.each(function(e,a){a=c(a).position().left;if(0<a+s&&r<a-s)return i.css("left",-a),!1}))}}else l.each(function(e,a){var a=c(a),t=a.position().left;if(t+a.outerWidth()>=n-s)return i.css("left",-t),!1})},leftPage:function(){A.rollPage("left")},rightPage:function(){A.rollPage()},closeThisTabs:function(){P.closeThisTabs()},closeOtherTabs:function(e){var t="LAY-system-pagetabs-remove";"all"===e?(c(T+":gt(0)").remove(),c(v).find("."+C+":gt(0)").remove()):(c(T).each(function(e,a){e&&e!=P.tabsPage.index&&(c(a).addClass(t),P.tabsBody(e).addClass(t))}),c("."+t).remove())},closeAllTabs:function(){A.closeOtherTabs("all"),location.hash=""},shade:function(){P.sideFlexible()}},T=(y.addClass("layui-layout-body"),P.screen()<1&&delete r.pageTabs,r.pageTabs||h.addClass("layadmin-tabspage-none"),u.ie&&u.ie<10&&o.error("IE"+u.ie+"\u4e0b\u8bbf\u95ee\u53ef\u80fd\u4e0d\u4f73\uff0c\u63a8\u8350\u4f7f\u7528\uff1aChrome / Firefox / Edge \u7b49\u9ad8\u7ea7\u6d4f\u89c8\u5668",{offset:"auto",id:"LAY_errorIE"}),(l=layui.data(r.tableName)).theme?P.theme(l.theme):r.theme&&P.initTheme(r.theme.initColorIndex),P.on("hash(side)",function(e){function s(e){return{list:e.children(".layui-nav-child"),name:e.data("name"),jump:e.data("jump")}}var r,o=e.path,a=c("#LAY-system-side-menu"),u="layui-nav-itemed";a.find("."+p).removeClass(p),P.screen()<2&&P.sideFlexible(),a=a.children("li"),r=P.correctRouter(e.href),a.each(function(e,a){var a=c(a),n=s(a),t=n.list.children("dd"),e=o[0]==n.name||0===e&&!o[0]||n.jump&&r==P.correctRouter(n.jump);if(t.each(function(e,a){var a=c(a),i=s(a),t=i.list.children("dd"),l=o[0]==n.name&&o[1]==i.name||i.jump&&r==P.correctRouter(i.jump);if(t.each(function(e,a){var a=c(a),t=s(a);if(o[0]==n.name&&o[1]==i.name&&o[2]==t.name||t.jump&&r==P.correctRouter(t.jump))return t=t.list[0]?u:p,a.addClass(t).siblings().removeClass(t),!1}),l)return t=i.list[0]?u:p,a.addClass(t).siblings().removeClass(t),!1}),e)return t=n.list[0]?u:p,a.addClass(t).siblings().removeClass(t),!1})}),i.on("nav(layadmin-system-side-menu)",function(e){e.siblings(".layui-nav-child")[0]&&h.hasClass(z)&&(P.sideFlexible("spread"),layer.close(e.data("index"))),P.tabsPage.type="nav"}),i.on("nav(layadmin-pagetabs-nav)",function(e){e=e.parent();e.removeClass(p),e.parent().removeClass(f)}),"#LAY_app_tabsheader>li"),R=(y.on("click",T,function(){var e=c(this),a=e.index();if(P.tabsPage.type="tab",P.tabsPage.index=a,"iframe"===e.attr("lay-attr"))return P.tabsBodyChange(a);t(e),P.runResize(),P.resizeTable()}),i.on("tabDelete(layadmin-layout-tabs)",function(e){var a=c(T+".layui-this");e.index&&P.tabsBody(e.index).remove(),t(a),P.delResize()}),y.on("click","*[lay-href]",function(){var e=c(this),a=e.attr("lay-href"),t=layui.router();P.tabsPage.elem=e,location.hash=P.correctRouter(a),r.refreshCurrPage&&P.correctRouter(a)===t.href&&P.events.refresh()}),y.on("click","*[layadmin-event]",function(){var e=c(this),a=e.attr("layadmin-event");A[a]&&A[a].call(this,e)}),y.on("mouseenter","*[lay-tips]",function(){var t,e,a,i=c(this);i.parent().hasClass("layui-nav-item")&&!h.hasClass(z)||(a=i.attr("lay-tips"),t=i.attr("lay-offset"),e=i.attr("lay-direction"),a=layer.tips(a,this,{tips:e||1,time:-1,success:function(e,a){t&&e.css("margin-left",t+"px")}}),i.data("index",a))}).on("mouseleave","*[lay-tips]",function(){layer.close(c(this).data("index"))}),layui.data.resizeSystem=function(){layer.closeAll("tips"),R.lock||setTimeout(function(){P.sideFlexible(P.screen()<2?"":"spread"),delete R.lock},100),R.lock=!0});d.on("resize",layui.data.resizeSystem),m.on("fullscreenchange",function(){A.fullscreen(c('[layadmin-event="fullscreen"]'),{status:document.fullscreenElement})}),(u=r.request).tokenName&&((l={})[u.tokenName]=layui.data(r.tableName)[u.tokenName]||"",a.set({headers:l,where:l}),n.set({headers:l,data:l})),e("admin",P)});