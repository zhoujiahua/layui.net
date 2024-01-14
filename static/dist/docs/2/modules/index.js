layui.define("all", function (e) {
  var r = layui.$, s = layui.laytpl, o = layui.layer, l = layui.carousel, d = layui.device(), u = r(window);
  e("cors", function (e) {
    var i = e.home, c = function (e) {
      var o = [];
      return (e = r.extend({}, e)).elem = r(e.elem), layui.each(e.data, function (e, i) {
        1 == i.sort && (i.sort = parseInt(10 * Math.random()) + 1)
      }), e.data = layui.sort(e.data, "sort", !0), (e.elem[0] || e.done) && (layui.each(e.data, function (e, i) {
        var t = i.content || i.title, a = i.className ? ' class="' + i.className + '"' : "",
          n = i.style ? ' style="' + i.style + '"' : "", s = i.ad || "";
        i.url && (t = '<a href="' + i.url + '" target="_blank" id="' + i.key + '" class="ws-sponsor-link"' + n + ">" + t + "</a>"), o.push("<div" + a + n + ">" + t + (s = s && '<div class="ws-sponsor-label"><cite>' + s + "</cite></div>") + "</div>")
      }), "function" == typeof e.done ? e.done(o) : e.elem.html(o.join(""))), e
    }, t = {
      headerNotice: function (t) {
        var e, a = r(".ws-notice");
        !d.mobile && a[0] && (t = t || [], t = layui.sort(t, "sort", !0), e = ["{{# if(d.length > 0){ }}", '<div class="layui-carousel" id="layui-spm-event-parter" lay-filter="ws-top-carousel">', "<div carousel-item>", "{{# layui.each(d, function(index, v){ ", 'var nt = v.ad ? "nt" : "";', 'var style = v.style || "";', 'var target = v.url.indexOf("//layui.dev") === -1 ? "_blank" : "_self";', "}}", "<div>", '<a href="{{= v.url }}" target="{{= target }}" class="{{ nt }} nt-{{ v.key }}" style="{{= style }}" data-tips="{{ v.tips }}">', "{{- v.title }} ", '{{# if(v.hot){ }}<span class="layui-badge-dot" style="margin-top: -5px;"></span>{{# } }}', "</a>", "<style>", "{{# if(v.ad){ }}", '.ws-notice a.nt-{{ v.key }}:after{content:"{{ v.ad }}"}', "{{# } }}", "</style>", "</div>", "{{# }); }}", "</div>", "</div>", "{{# } }}"].join(""), s(e).render(t, function (e) {
          var i = ".ws-notice .layui-carousel";
          a.html(e), l.render({
            elem: i,
            width: "100%",
            height: "100%",
            arrow: "none",
            indicator: "none",
            anim: "fade",
            interval: 5e3
          }), n(t[0], r(i).children("div").children("div").eq(0).find("a")), l.on("change(ws-top-carousel)", function (e) {
            n(t[e.index], e.item.find("a"))
          })
        }))
      }, popupNotive: function (e) {
        var i = (e = (e = e || [])[0] || {}).content;
        !i || local.popup_notice && (new Date).getTime() - local.popup_notice < (e.tipsInterval || 2592e5) || setTimeout(function () {
          o.open({
            type: 1,
            title: e.title || "\u516c\u544a",
            area: d.mobile ? ["90%", "90%"] : ["800px", "520px"],
            shade: !1,
            id: "LAY_Notice",
            skin: "ws-popup-notice",
            resize: !1,
            content: i,
            success: function (e, i) {
              e.find("a").on("click", function () {
                o.close(i)
              })
            },
            end: function () {
              layui.data("layui", {key: "popup_notice", value: (new Date).getTime()})
            }
          })
        }, 500)
      }, indexShowcase: function (e) {
        c({elem: ".ws-index-showcase", data: e})
      }, docsShowcase: function (e) {
        c({
          elem: ".ws-docs-showcase", data: e, done: function (e) {
            e = e.join("");
            this.elem[0] ? this.elem.html(e) : r("#WS-text>blockquote:eq(0)").after('<div class="ws-docs-showcase">' + e + "</div>")
          }
        })
      }, bannerShowcase: function (e) {
        c({elem: ".ws-banner-showcase", data: e})
      }, tocSponsor: function (e) {
        var i, t, a, n, s, o = r(".ws-dir-ul"), l = c({
          elem: ".ws-sponsor", data: e, done: function (e) {
            this.elem.html('<div class="ws-sponsor-wrapper">' + e.join("") + "</div>")
          }
        }).elem;
        l[0] && (e = l.parent(), t = "ws-sponsor-full", a = r(['<div class="' + (i = "ws-sponsor-show") + '">', '<i class="layui-icon layui-icon-up"></i>', "</div>"].join("")), n = e.height() + e.offset().top - u.scrollTop() > u.height(), s = function (e) {
          o.css({"max-height": e ? "" : u.height() - 124 - (l.height() || 0)})
        }, n) && (e.children("." + i)[0] || l.append(a), a.on("click", function () {
          var e = r(this);
          e.data("sponsor-show") ? (l.removeClass(t + " layui-anim layer-anim-slide-up"), e.removeData("sponsor-show"), e.children(".layui-icon").attr("class", "layui-icon layui-icon-up"), s(!0), l.css({top: ""})) : (l.addClass(t + " layui-anim layer-anim-slide-up"), e.data("sponsor-show", !0), e.children(".layui-icon").attr("class", "layui-icon layui-icon-down"), s(), l.height() >= u.height() - 92 && l.css({top: "92px"}))
        }))
      }
    }, n = function (e, a) {
      var i, t, n = layui.data("layui");
      e = e || {}, d.mobile || (n = n[i = "notice_topnav_" + e.key] && (new Date).getTime() - n[i] < (e.tipsInterval || 18e5), e.tips || o.close(o.tipsIndex), !n && e.tips && (t = o.tipsIndex = o.tips(['<a href="' + e.url + '" target="_blank" style="display: block; line-height: 30px; padding: 10px; text-align: center; font-size: 14px; background-image: linear-gradient(to right,#8510FF,#D025C2,#FF8B2D,#FF0036); color: #fff; ' + (e.tipsCss || "") + '">', e.desc || "", "</a>"].join(""), a, {
        tips: e.tipsStyle ? new Function("return " + e.tipsStyle)() : [3, "#9F17E9"],
        skin: "layui-hide-xs",
        maxWidth: 320,
        time: 0,
        anim: 5,
        tipeMore: !0,
        success: function (e, i) {
          e.find(".layui-layer-content").css({padding: 0}), e.find("a").on("click", function () {
            a.trigger("click")
          });
          var t = e.find(".layui-layer-TipsG");
          "5px" !== t.css("left") && t.hide(), "none" === a.parent().css("display") && (e.css({
            left: "50%",
            top: "80px",
            "margin-left": -e.width() / 2
          }), t.hide())
        }
      }), a.on("click", function () {
        layui.data("layui", {key: i, value: (new Date).getTime()}), o.close(t)
      })))
    };
    return {
      render: function () {
        r.ajax({
          type: "get", url: e.url, dataType: "jsonp", success: function (e) {
            layui.each(e, function (e, i) {
              t[e] && t[e](i)
            })
          }, complete: function () {
            i.showcase = !0
          }
        })
      }
    }
  })
});
layui.define("all", function (e) {
  var g = layui.$, y = g(window), k = g(document), S = {};
  e("tochash", function (e) {
    var t, i, s, a, o, n, l, r, c, h, d, u, f, p, m, v, w = e.home, T = e.CONST;
    t = g(".ws-content"), h = t.find("[lay-toc]"), i = g('<div class="ws-side">'), s = g('<div class="ws-side-fixed">'), a = g('<div class="ws-dir">'), o = g('<ul class="ws-dir-ul">'), h.each(function (e, s) {
      var a = g(this), n = lay.options(this, "lay-toc"), t = g("<li>");
      n.anchor = !("anchor" in n) || n.anchor, t.html(function () {
        var e = n.title || a.contents().eq(0).text() || "", t = n.id || s.id || s.name, t = n.href || "#" + t,
          i = n.hot ? ' <span class="layui-badge-dot"></span>' : "";
        return n.anchor ? '<a href="' + t + '"' + (n.target ? ' target="' + n.target + '"' : "") + ">" + e + i + "</a>" : e
      }), t.attr({level: n.level}), n.bold && t.addClass("ws-bold"), o.append(t)
    }), o.find("li>a").on("click", function (e) {
      var t = g(this);
      this.target || (w.addThisClass(t.parent()), y.width() < 992 && g(".ws-shade").trigger("click"))
    }), a.append(o), s.append(a), h = g('<div class="ws-sponsor"></div>'), s.append(h), (a = t.children(".ws-side"))[0] && a.remove(), i.append(s), t.prepend(i), w.a || e.forbid.r(!0), l = location.hash, r = g(".ws-dir"), c = lay.elem("a", {href: l}), h = g(document.getElementById(l.replace(/^#/, "") || null)), d = function (e, t) {
      var i = r.find('[href="' + e + '"]');
      (i = i[0] ? i : r.find('[href="' + t + '"]'))[0] && w.addThisClass(i.parent()), e || r.find("." + T.CLASS_THIS).removeClass(T.CLASS_THIS)
    }, function H() {
      var e = function () {
        S.initHash && (d(l), c.click(), u())
      };
      return clearTimeout(S.initHashTimer), S.initHashTimer = setTimeout(e, 300), S.initHashTimer = setTimeout(e, 600), S.initHashTimer = setTimeout(e, 900), H
    }(S.initHash = l && h[0]), u = function () {
      clearTimeout(S.initHashTimer), delete S.scrollHashLocked, delete S.initHash
    }, g("a").on("click", function () {
      u()
    }), S.initHash && (S.scrollHashLocked = !0), f = g("[lay-toc]:not(.layui-hide),.ws-anchor"), p = function () {
      var e, o = 0 < (o = y.scrollTop()) ? o + 90 : o;
      history.replaceState && (f.each(function (e, t) {
        var i = this.id || this.name, s = g(this), e = f.eq(e + 1), a = f.eq(0), n = s.offset().top,
          s = s.attr("lay-pid");
        return n < o && (!e[0] || o < e.offset().top) ? (n = "#" + i, e = "#" + s, history.replaceState({}, "", location.pathname + n), d(n, e), !1) : o < a.offset().top ? (history.replaceState({}, "", location.pathname), d(null), !1) : void 0
      }), e = o, m[0]) && (document.documentElement.scrollHeight - e - y.height() < m.outerHeight() ? m.hasClass(v) || m.find(".ws-sponsor-show").trigger("click") : m.hasClass(v) && m.find(".ws-sponsor-show").trigger("click"))
    }, m = g(".ws-sponsor"), v = "ws-sponsor-full", S.hasEvent || (f[0] && y.on("scroll", function (e) {
      S.scrollHashLocked || (clearTimeout(n), n = setTimeout(p, 32))
    }), k.on("click", ".ws-dir a[href]", function () {
      u(), S.scrollHashLocked = !0, setTimeout(function () {
        delete S.scrollHashLocked
      }, 300)
    }), S.hasEvent = !0)
  })
});
layui.define("all", function (e) {
  var m = layui.$, i = layui.device(), v = m(window), o = m(document), s = m("body"), f = {}, h = "WS_PLAY_MOVE_DICT";
  e("play", function (r) {
    var a, e = (r = m.extend({minWidth: 320, minHeight: 100}, r)).home, t = (r.CONST, m(r.elem)),
      l = t.find(".ws-play-code"), d = t.find(".ws-play-view"), u = t.find(".ws-play-preview"),
      n = t.find(".ws-play-split"), c = {
        editor: function (i) {
          i = m.extend({language: "html"}, i);
          var o = m(i.elem), r = o.children(".ws-play-init"), e = function () {
            var n = monaco.editor.create(o[0], {
              value: i.value || r.children("textarea").val(),
              language: i.language,
              automaticLayout: !0,
              scrollBeyondLastLine: !1,
              tabSize: 2,
              minimap: {enabled: !1},
              renderLineHighlightOnlyWhenFocus: !0,
              wordWrap: "on"
            }), t = function e() {
              return clearTimeout(i.timer), i.timer = setTimeout(function () {
                var e = n.getValue(), t = document.createElement("iframe");
                t.setAttribute("frameborder", "0"), t.setAttribute("allowtransparency", "true"), t.srcdoc = e, u.html(t), t.onload = function () {
                  t.contentWindow.document.body.style = "margin: 0; padding: 16px;"
                }
              }, 600), e
            }();
            "dark" === layui.data("layui").themeMode && n.updateOptions({theme: "vs-dark"}), n.onDidChangeModelContent(function (e) {
              t(), "function" == typeof i.onInput && i.onInput(n.getValue())
            }), n.onKeyDown(function (e) {
              if (e.ctrlKey && 49 === e.keyCode) return t(), e.preventDefault(), !1
            }), r.remove()
          };
          if (!o[0]) return c;
          var t = "https://cdn.staticfile.org/monaco-editor/0.41.0/min/vs";
          window.monaco ? e() : m.getScript(t + "/loader.min.js", function () {
            require.config({paths: {vs: t}}), require(["vs/editor/editor.main"], e)
          })
        }
      };
    return e.a || r.forbid.r(!0), t[0] && (i.ie ? layer.alert("\u8be5\u9875\u9762\u4e0d\u652f\u6301 IE", function () {
      location.href = "/"
    }) : (a = {}, n.on("mousedown", function (e) {
      var t = m(this), n = l.outerWidth(), i = l.outerWidth(), o = a.vert = 8 < t.width();
      o || (e.preventDefault(), f.moveElem.show().css("cursor", o ? "row-resize" : "col-resize"), a.offset = [e.clientX, e.clientY], a.ruleWidth = parseFloat(n), a.ruleHeight = parseFloat(i), t.data(h, a), f.eventMoveElem = t)
    }), f.docEvent || o.on("mousemove", function (e) {
      var t, n, i, o;
      f.eventMoveElem && (o = (n = (t = f.eventMoveElem.data(h) || {}).vert ? v.height() : v.width()) - (i = t.vert ? r.minHeight : r.minWidth), e.preventDefault(), e = t.vert ? t.ruleHeight + e.clientY - t.offset[1] : t.ruleWidth + e.clientX - t.offset[0], l.css(t.vert ? "height" : "width", (e = (e = o < (e = e < i ? i : e) ? o : e) / n * 100) + "%"), d.css(t.vert ? "height" : "width", 100 - e + "%"))
    }).on("mouseup", function (e) {
      var t;
      f.eventMoveElem && (t = f.eventMoveElem, a = {}, f.moveElem.hide(), t.removeData(h), delete f.eventMoveElem)
    }), f.docEvent = !0, e = f.moveElem = m('<div class="ws-move-elem" id="WS-move"></div>'), m("#WS-move")[0] || s.append(e))), c
  })
});
self !== parent && (location.href = "about:blank"), layui.define(["all", "cors", "tochash", "play"], function (e) {
  var o = layui.$, l = layui.lay, a = (layui.element, layui.layer), i = layui.form, n = layui.util,
    r = (layui.laytpl, layui.device()), s = layui.url(), u = o(window), c = (o(document), o("html"), o("body")),
    t = (o("html,body"), r.ie && r.ie < 8 && a.alert("Layui \u6700\u4f4e\u652f\u6301 IE8\uff0c\u800c\u60a8\u5f53\u524d\u4f7f\u7528\u7684\u662f\u53e4\u8001\u7684 IE" + r.ie + "\uff0c\u4f53\u9a8c\u5c06\u4f1a\u4e0d\u4f73\uff01"), function (i, l, e) {
      return layui.each(l, function (e, t) {
        i.push(String.fromCharCode.apply(null, l[e]))
      }), e ? i.join("") : i
    }), d = t(["v"], [[105, 46, 100, 101], [121, 117], [47, 47, 108, 97]]).reverse().join(""), h = {
      l: u[0][t(["on"], [[99, 97, 116, 105], [108, 111]]).reverse().join("")],
      h: t(["h"], [[114, 101, 102]], !0),
      a: t(["ab"], [[111, 117, 116, 58]], !0),
      r: function (e) {
        var t = this.h;
        this.l[t] = e ? this.a : d
      }
    };
  try {
    var y = new RegExp("^(" + document.getElementById("WS-ID").value + ")$")
  } catch (S) {
    y = new RegExp("^abc$");
    h.r(!0)
  }
  var m = [];
  if (layui.each(location.hostname.split(""), function (e, t) {
    m.push(t.charCodeAt())
  }), m = m.join(""), !y.test(m)) return h.r(), e("global", h);
  e.a = !0;
  var p, f, v, w = {CLASS_THIS: "layui-this"}, g = function (i) {
    var e, t = {
        staticfile: {
          css: "//cdn.staticfile.org/layui/" + (i = o.extend({
            v: layui.v,
            cdn: "unpkg",
            note: !0,
            code: ""
          }, i)).v + "/css/layui.css", js: "//cdn.staticfile.org/layui/" + i.v + "/layui.js"
        },
        unpkg: {
          css: "//unpkg.com/layui@" + i.v + "/dist/css/layui.css",
          js: "//unpkg.com/layui@" + i.v + "/dist/layui.js"
        }
      }[i.cdn],
      l = (a = [], i.note && a.push("  \n\x3c!-- \u8bf7\u52ff\u5728\u9879\u76ee\u6b63\u5f0f\u73af\u5883\u4e2d\u5f15\u7528\u8be5 layui.js \u5730\u5740 --\x3e"), a.push('<script src="' + t.js + '"><\/script>'), l = {"\x3c!-- import layui --\x3e": a.join("\n")}, layui.each(l, function (e, t) {
        i.code = String(i.code).replace(e, t)
      }), i.codeReplace ? "" : a.join("\n")), a = i.className || {};
    return i.iframe ? content : ["<!DOCTYPE html>", "<html>", "<head>", '  <meta charset="utf-8">', '  <meta name="viewport" content="width=device-width, initial-scale=1">', "  <title>Demo</title>", (e = [], i.note && e.push("  \x3c!-- \u8bf7\u52ff\u5728\u9879\u76ee\u6b63\u5f0f\u73af\u5883\u4e2d\u5f15\u7528\u8be5 layui.css \u5730\u5740 --\x3e"), e.push('  <link href="' + t.css + '" rel="stylesheet">'), i.style && e.push(["  <style>", i.style.map(function (e) {
      return "\n    " + e
    }).join(""), "\n  </style>"].join("")), e.join("\n")), "</head>", "<body" + (a.body ? ' class="' + a.body + '"' : "") + ">", i.code, l, "</body>\n</html>"].join("\n")
  }, b = (layui.code({
    elem: ".layui-code", obverse: !0, lang: "html", codeParse: function (e) {
      return !this.allowParse && "iframe" === this.preview || !this.preview ? e : g({code: e, codeReplace: !0})
    }, addTools: [{
      className: "edit", title: ["\u5728 stackblitz \u4e2d\u7f16\u8f91"], event: function (e) {
        var t, i;
        window.StackBlitzSDK && StackBlitzSDK.openProject({
          title: "Layui Example",
          description: "",
          template: "html",
          files: {
            "index.html": (t = e.rawCode, i = function (e) {
              return e.replace(/('\/static\/json)/g, "'https://unpkg.com/outeres@0.1.3/json")
            }, "iframe" === e.options.preview ? i(t) : g({
              code: ["", i(t), ""].join("\n"),
              codeReplace: !0,
              className: {body: "layui-padding-3"}
            }))
          }
        }, {newWindow: !0, openFile: ["index.html"]})
      }
    }]
  }), o.getScript("https://unpkg.com/@stackblitz/sdk@1/bundles/sdk.umd.js"), {
    getBrowser: function () {
      var e = navigator.userAgent.toLocaleLowerCase(), t = function (e, t) {
        var i, l = navigator.mimeTypes;
        for (i in l) if (l[i][e] && -1 !== l[i][e].indexOf(t)) return !0
      };
      return e.match(/chrome/) ? t("type", "360") || t("type", "sogou") ? void 0 : e.match(/edg\//) ? "edge" : "chrome" : e.match(/firefox/) ? "firefox" : void 0
    },
    host: {
      layuion: ["com", "layuion", "dev"].reverse().join("."),
      sentcss: ["com", "sentcss", "cors"].reverse().join(".")
    },
    curl: function (e) {
      return (layui.cache.curl || "https://" + this.host.sentcss) + (e || "/")
    },
    a: y.test(m)
  }), k = layui.data("layui"), x = b.host;
  if (a.ready(function () {
    if (k.version) {
      var i, e = function (e) {
        return e.replace(/(-.+)/, "").split(".").reverse()
      }, t = e(k.version), l = e(layui.v);
      if (/(-.+)/.test(k.version) && layui.data("layui", {key: "version", remove: !0}), /(-.+)/.test(layui.v)) return;
      if (layui.each(t, function (e, t) {
        parseInt(l[e]) > parseInt(t) ? i = !0 : parseInt(l[e]) < parseInt(t) && (i = !1)
      }), !i) return;
      a.open({
        type: 1,
        title: "\u66f4\u65b0\u63d0\u793a",
        closeBtn: !1,
        area: "300px",
        shade: !1,
        offset: "10px",
        id: "LAY_updateNotice",
        btn: ["\u66f4\u65b0\u65e5\u5fd7", "\u6211\u77e5\u9053\u4e86"],
        btnAlign: "c",
        moveType: 1,
        content: ['<div class="layui-text">', 'Layui \u5df2\u53d1\u5e03\u65b0\u7248\u672c\uff1a<strong style="padding-right: 11px;">v' + layui.v + "</strong> \ud83d\ude80", "</div>"].join(""),
        skin: "layui-layer-notice",
        yes: function (e) {
          a.close(e), setTimeout(function () {
            location.href = "/docs/2/versions.html"
          }, 500)
        },
        end: function () {
          layui.data("layui", {key: "version", value: layui.v})
        }
      })
    }
    layui.data("layui", {key: "version", value: layui.v})
  }), x = [{
    title: "\u70ed\u95e8\u7ec4\u4ef6",
    list: [{title: "\u8868\u5355 Form", url: "form/"}, {
      title: "\u8868\u683c Table",
      url: "table/"
    }, {title: "\u5f39\u5c42 Layer \ud83d\udd25", url: "layer/"}]
  }, {
    title: "\u5e03\u5c40",
    list: [{title: "\u6846\u4f53\u5e03\u5c40 Layout", url: "layout/"}, {
      title: "\u6805\u683c\u5e03\u5c40 Grid",
      url: "layout/grid.html"
    }]
  }, {
    title: "\u901a\u7528",
    list: [{title: "\u989c\u8272 Color", url: "color/"}, {
      title: "\u6309\u94ae Button",
      url: "button/"
    }, {title: "\u56fe\u6807 Icon", url: "icon/"}, {title: "\u52a8\u753b Anim", url: "anim/"}]
  }, {
    title: "\u8868\u5355",
    list: [{title: "\u8868\u5355\u7ec4\u4ef6 Form", url: "form/"}, {
      title: "\u8f93\u5165\u6846 Input",
      url: "form/input.html"
    }, {
      title: "\u6570\u5b57\u8f93\u5165\u6846 Number",
      url: "form/input.html#affix-number"
    }, {title: "\u591a\u884c\u8f93\u5165\u6846 Textarea", url: "form/input.html"}, {
      title: "\u9009\u62e9\u6846 Select",
      url: "form/select.html"
    }, {title: "\u590d\u9009\u6846 Checkbox", url: "form/checkbox.html"}, {
      title: "\u5f00\u5173 Switch",
      url: "form/checkbox.html#switch"
    }, {title: "\u5355\u9009\u6846 Radio", url: "form/radio.html"}]
  }, {
    title: "\u5c55\u793a",
    list: [{title: "\u8868\u683c Table", url: "table/"}, {
      title: "\u5206\u9875 Laypage",
      url: "laypage/"
    }, {title: "\u6811\u5f62\u8868\u683c TreeTable", url: "treeTable/"}, {
      title: "\u5bfc\u822a\u83dc\u5355 Nav",
      url: "nav/"
    }, {title: "\u57fa\u7840\u83dc\u5355 Menu", url: "menu/"}, {
      title: "\u9009\u9879\u5361 Tab",
      url: "tab/"
    }, {title: "\u5fbd\u7ae0 Badge", url: "badge/"}, {
      title: "\u5f15\u7528 Blockquote",
      url: "auxiliar/#blockquote"
    }, {title: "\u5b57\u6bb5\u96c6 Fieldset", url: "auxiliar/#fieldset"}, {
      title: "\u6c34\u5e73\u7ebf hr",
      url: "auxiliar/#hr"
    }, {title: "\u516c\u5171\u7c7b Class", url: "class/"}, {
      title: "\u9762\u677f Panel",
      url: "panel/"
    }, {title: "\u5361\u7247\u9762\u677f Card", url: "panel/#card"}, {
      title: "\u6298\u53e0\u9762\u677f Collapse",
      url: "panel/#collapse"
    }, {title: "\u8fdb\u5ea6\u6761 Progress", url: "progress/"}, {
      title: "\u65f6\u95f4\u7ebf Timeline",
      url: "timeline/"
    }, {title: "\u56fa\u5b9a\u6761 Fixbar", url: "fixbar/"}, {
      title: "\u6811\u7ec4\u4ef6 Tree",
      url: "tree/"
    }, {title: "\u8f6e\u64ad Carousel", url: "carousel/"}, {
      title: "\u6d41\u52a0\u8f7d Flow",
      url: "flow/"
    }, {title: "\u4ee3\u7801\u9884\u89c8 Code", url: "code/"}]
  }, {
    title: "\u4ea4\u4e92",
    list: [{title: "\u5f39\u51fa\u5c42 Layer", url: "layer/"}, {
      title: "\u65e5\u671f\u4e0e\u65f6\u95f4 Laydate",
      url: "laydate/"
    }, {title: "\u4e0a\u4f20 Upload", url: "upload/"}, {
      title: "\u4e0b\u62c9\u83dc\u5355 Dropdown",
      url: "dropdown/"
    }, {
      title: "\u989c\u8272\u9009\u62e9\u5668 Colorpicker",
      url: "colorpicker/"
    }, {title: "\u7a7f\u68ad\u6846 Transfer", url: "transfer/"}, {
      title: "\u6ed1\u5757 Slider",
      url: "slider/"
    }, {title: "\u8bc4\u5206 Rate", url: "rate/"}]
  }, {
    title: "\u5176\u4ed6",
    list: [{title: "\u6a21\u677f\u5f15\u64ce Laytpl", url: "laytpl/"}, {
      title: "\u5de5\u5177\u6a21\u5757 Util",
      url: "util/"
    }]
  }, {
    title: "\u4e3b\u9898",
    list: [{title: "LayIM", url: "https://" + x.layuion + "/themes/layim/"}, {
      title: "layuiAdmin",
      url: "https://" + x.layuion + "/themes/layuiAdmin/"
    }]
  }], x = o(['<select lay-search lay-filter="component">', (p = ['<option value="">\u641c\u7d22</option>'], layui.each(x, function (e, t) {
    var i = ['<optgroup label="' + t.title + '">'];
    layui.each(t.list, function (e, t) {
      i.push('<option value="' + t.url + '">' + t.title + "</option>")
    }), i.push("</optgroup>"), p.push(i)
  }), p.join("")), '</select><i class="layui-icon layui-icon-search"></i>'].join("")), o(".ws-search").html(x), i.render("select", "LAY-ws-header-component"), i.on("select(component)", function (e) {
    var t = e.value;
    /^(http)/.test(t) ? (n.openWin({url: t, target: "_blank"}), e.elem.value = "") : location.href = "/docs/2/" + t
  }), d !== t([], [[47, 47, 108, 97, 121, 117, 105, 46, 100, 101, 118]], !0) && (d = t(["ab"], [[111, 117, 116, 58]], !0), h.l[h.h] = d, delete b.a, delete e.a), f = function (e) {
    var t = o("#layuicss-theme-dark");
    o("#ID-header-theme-mode");
    e ? r.ie || (t[0] || layui.link(layui.cache.res + "css/layui-theme-dark.css?v=" + layui.cache.version, null, "theme-dark"), layui.data("layui", {
      key: "themeMode",
      value: "dark"
    }), i.val("header-theme", {"theme-mode": !0})) : (t.remove(), layui.data("layui", {key: "themeMode", remove: !0}))
  }, x = "dark" === layui.data("layui").themeMode, f(x), i.on("switch(header-theme-mode)", function (e) {
    var t = e.elem.checked;
    if (f(e.elem.checked), t) {
      if (r.ie) return a.msg("IE \u4e0d\u652f\u6301\u4e3b\u9898\u6a21\u5f0f\u5207\u6362<br>\u8bf7\u5728 Chrome \u7b49\u73b0\u4ee3\u6d4f\u89c8\u5668\u4e2d\u4f7f\u7528");
      this.INDEX = a.msg("\u5df2\u8bbe\u7f6e\u6df1\u8272\u6a21\u5f0f<br>\u5982\u9700\u6700\u4f73\u6548\u679c\uff0c\u5efa\u8bae\u5207\u6362\u660e\u4eae\u6a21\u5f0f", {
        offset: "24px",
        time: 5e3,
        anim: "slideDown",
        isOutAnim: !1
      })
    } else a.close(this.INDEX);
    window.monaco && monaco.editor.setTheme(t ? "vs-dark" : "vs")
  }), !e.a) return h.r(), e("global", h);
  if (y.test(m) ? layui.cors({
    url: b.curl("/get/showcase/"),
    home: b
  }).render() : delete e.a, b.addThisClass = function (e, t) {
    e.addClass(t = t || w.CLASS_THIS).siblings().removeClass(t)
  }, t = o(".ws-menu .layui-menu-body-title"), o(".ws-demo-nav dd"), v = s.pathname.join("/"), o(".layui-header .layui-nav-item").each(function () {
    var e = o(this), t = s.pathname.concat(), i = e.data("dir");
    if ("v2" === t[0] && t.splice(0, 1), t[0] && (t[0] === i && !/^@/.test(t[1]) || [t[0], t[1]].join("/") === i)) return e.addClass(w.CLASS_THIS), !1
  }), t.each(function () {
    var e = o(this);
    if (e.children("a").attr("href") === "/" + v) return e.parent().addClass("layui-menu-item-checked2"), !1
  }), layui.tochash({home: b, CONST: w, forbid: h}), c.on("click", "*[lay-layer]", function () {
    var e = o(this), t = l.options(this, {attr: "lay-layer"});
    r.mobile || (t.maxWidth = 500), a.open(o.extend({
      type: 1,
      id: t.id,
      title: t.title || e.text(),
      shadeClose: !0
    }, t, {content: ['<div style="' + (t.style || "padding: 16px;") + '">', o(t.content || e.next()).html(), "</div>"].join("")}))
  }), c.on("mouseenter", "*[lay-tips]", function () {
    var e = o(this), i = l.options(this, {attr: "lay-tips"}), t = a.tips(i.content, this, {
      tips: i.direction || 1, time: -1, success: function (e, t) {
        e.css("margin", i.margin)
      }
    });
    e.data("index", t)
  }).on("mouseleave", "*[lay-tips]", function () {
    a.close(o(this).data("index"))
  }), !e.a) return e("global", h);
  o(".ws-showv").html(layui.v);
  var j, C = o("#getStars");
  C[0] && o.get("https://api.github.com/repos/layui/layui", function (e) {
    C.html(e.stargazers_count)
  }, "json"), u.on("scroll resize", function () {
    var e = o(".layui-table-tips");
    e[0] && e.remove(), o(".layui-layer")[0] && a.closeAll("tips")
  }), o(".ws-header-more").on("click", function () {
    c.addClass(j = "ws-nav-show ws-shade-show")
  }), o(".ws-menu-bar").on("click", function () {
    c.addClass(j = "ws-menu-show ws-shade-show")
  }), o(".ws-shade").on("click", function () {
    c.removeClass(j), j = null
  }), n.fixbar({
    bars: (x = [], o(".ws-side")[0] && x.push({type: "dir", icon: "layui-icon-more-vertical"}), x),
    on: {
      click: function (e) {
        var t = u.width();
        "dir" === e && (t < 992 ? (o(".ws-shade").trigger("click"), j = "ws-side-show ws-shade-show", c.addClass(j)) : a.msg("\u5f53\u524d\u6a21\u5f0f\u4e0d\u53ef\u7528"))
      }
    }
  }), layui.play({home: b, CONST: w, forbid: h, elem: ".ws-play"}).editor({
    elem: ".ws-monaco-editor",
    value: layui.sessionData("layui").play2,
    onInput: function (e) {
      layui.sessionData("layui", {key: "play2", value: e})
    }
  }), n.toVisibleArea({
    scrollElem: o(".ws-menu").eq(0),
    thisElem: o(".ws-menu .layui-menu").find("li.layui-menu-item-checked2")
  }), e("index", b)
});
