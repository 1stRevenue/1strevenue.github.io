'use strict';
function f() {
  return function () {
  };
}
(function () {
  function c(e, t) {
    var n = Array.prototype.slice.call(arguments, 2);
    return function () {
      var o = n.concat(Array.prototype.slice.call(arguments, 0));
      e.apply(t, o);
    };
  }
  window.console || (window.console = {});
  var a = window.console;
  if (!a.log)
    if (window.log4javascript) {
      var b = log4javascript.getDefaultLogger();
      a.log = c(b.info, b), a.debug = c(b.debug, b), a.info = c(b.info, b), a.warn = c(b.warn, b), a.error = c(b.error, b);
    } else
      a.log = f();
  if (a.debug || (a.debug = a.log), a.info || (a.info = a.log), a.warn || (a.warn = a.log), a.error || (a.error = a.log), (null != window.__consoleShimTest__ || eval('/*@cc_on @_jscript_version <= 9@*/')) && (b = function (e) {
      var t, n, o;
      if (e = Array.prototype.slice.call(arguments, 0), o = e.shift(), n = e.length, n > 1 && !1 !== window.__consoleShimTest__)
        for ('string' != typeof e[0] && (e.unshift('%o'), n += 1), t = (t = e[0].match(/%[a-z]/g)) ? t.length + 1 : 1; n > t; t += 1)
          e[0] += ' %o';
      Function.apply.call(o, a, e);
    }, a.log = c(b, window, a.log), a.debug = c(b, window, a.debug), a.info = c(b, window, a.info), a.warn = c(b, window, a.warn), a.error = c(b, window, a.error)), a.assert || (a.assert = function () {
      var e = Array.prototype.slice.call(arguments, 0);
      e.shift() || (e[0] = 'Assertion failed: ' + e[0], a.error.apply(a, e));
    }), a.dir || (a.dir = a.log), a.dirxml || (a.dirxml = a.log), a.exception || (a.exception = a.error), !a.time || !a.timeEnd) {
    var g = {};
    a.time = function (e) {
      g[e] = new Date().getTime();
    }, a.timeEnd = function (e) {
      var t = g[e];
      t && (a.log(e + ': ' + (new Date().getTime() - t) + 'ms'), delete g[e]);
    };
  }
  a.table || (a.table = function (e, t) {
    var n, o, i, r, s;
    if (e && e instanceof Array && e.length) {
      if (!(t && t instanceof Array))
        for (n in t = [], e[0])
          e[0].hasOwnProperty(n) && t.push(n);
      for (n = 0, o = e.length; o > n; n += 1) {
        for (i = [], r = 0, s = t.length; s > r; r += 1)
          i.push(e[n][t[r]]);
        Function.apply.call(a.log, a, i);
      }
    }
  }), a.clear || (a.clear = f()), a.trace || (a.trace = f()), a.group || (a.group = f()), a.groupCollapsed || (a.groupCollapsed = f()), a.groupEnd || (a.groupEnd = f()), a.timeStamp || (a.timeStamp = f()), a.profile || (a.profile = f()), a.profileEnd || (a.profileEnd = f()), a.count || (a.count = f());
}(), Array.prototype.push || (Array.prototype.push = function () {
  for (var e = 0, t = arguments.length; t > e; e++)
    this[this.length] = arguments[e];
  return this.length;
}), Array.prototype.shift || (Array.prototype.shift = function () {
  if (this.length > 0) {
    for (var e = this[0], t = 0, n = this.length - 1; n > t; t++)
      this[t] = this[t + 1];
    return this.length = this.length - 1, e;
  }
}), Array.prototype.splice || (Array.prototype.splice = function (e, t) {
  var n = this.slice(e + t), o = this.slice(e, e + t);
  this.length = e;
  for (var i = [], r = 0, s = arguments.length; s > r; r++)
    i[r] = arguments[r];
  var a = i.length > 2 ? n = i.slice(2).concat(n) : n;
  for (r = 0, s = a.length; s > r; r++)
    this.push(a[r]);
  return o;
}));
var log4javascript = function () {
    function isUndefined(e) {
      return e === void 0;
    }
    function EventSupport() {
    }
    function Log4JavaScript() {
    }
    function toStr(e) {
      return e && e.toString ? '' + e : e + '';
    }
    function getExceptionMessage(e) {
      return e.message ? e.message : e.description ? e.description : toStr(e);
    }
    function getUrlFileName(e) {
      var t = Math.max(e.lastIndexOf('/'), e.lastIndexOf('\\'));
      return e.substr(t + 1);
    }
    function getExceptionStringRep(e) {
      if (e) {
        var t = 'Exception: ' + getExceptionMessage(e);
        try {
          e.lineNumber && (t += ' on line number ' + e.lineNumber), e.fileName && (t += ' in file ' + getUrlFileName(e.fileName));
        } catch (n) {
          logLog.warn('Unable to obtain file and line information for error');
        }
        return showStackTraces && e.stack && (t += newLine + 'Stack trace:' + newLine + e.stack), t;
      }
      return null;
    }
    function bool(e) {
      return Boolean(e);
    }
    function trim(e) {
      return e.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    function splitIntoLines(e) {
      var t = e.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      return t.split('\n');
    }
    function array_remove(e, t) {
      for (var n = -1, o = 0, i = e.length; i > o; o++)
        if (e[o] === t) {
          n = o;
          break;
        }
      return n >= 0 ? (e.splice(n, 1), !0) : !1;
    }
    function array_contains(e, t) {
      for (var n = 0, o = e.length; o > n; n++)
        if (e[n] == t)
          return !0;
      return !1;
    }
    function extractBooleanFromParam(e, t) {
      return isUndefined(e) ? t : bool(e);
    }
    function extractStringFromParam(e, t) {
      return isUndefined(e) ? t : e + '';
    }
    function extractIntFromParam(e, t) {
      if (isUndefined(e))
        return t;
      try {
        var n = parseInt(e, 10);
        return isNaN(n) ? t : n;
      } catch (o) {
        return logLog.warn('Invalid int param ' + e, o), t;
      }
    }
    function extractFunctionFromParam(e, t) {
      return 'function' == typeof e ? e : t;
    }
    function isError(e) {
      return e instanceof Error;
    }
    function getListenersPropertyName(e) {
      return '__log4javascript_listeners__' + e;
    }
    function addEvent(e, t, n, o, i) {
      if (i = i ? i : window, e.addEventListener)
        e.addEventListener(t, n, o);
      else if (e.attachEvent)
        e.attachEvent('on' + t, n);
      else {
        var r = getListenersPropertyName(t);
        e[r] || (e[r] = [], e['on' + t] = function (e) {
          e = getEvent(e, i);
          for (var n, o = getListenersPropertyName(t), r = this[o].concat([]); n = r.shift();)
            n.call(this, e);
        }), e[r].push(n);
      }
    }
    function removeEvent(e, t, n, o) {
      if (e.removeEventListener)
        e.removeEventListener(t, n, o);
      else if (e.detachEvent)
        e.detachEvent('on' + t, n);
      else {
        var i = getListenersPropertyName(t);
        e[i] && array_remove(e[i], n);
      }
    }
    function getEvent(e, t) {
      return t = t ? t : window, e ? e : t.event;
    }
    function stopEventPropagation(e) {
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble !== void 0 && (e.cancelBubble = !0), e.returnValue = !1;
    }
    function handleError(e, t) {
      logLog.error(e, t), log4javascript.dispatchEvent('error', {
        message: e,
        exception: t
      });
    }
    function Timer(e, t) {
      this.name = e, this.level = isUndefined(t) ? Level.INFO : t, this.start = new Date();
    }
    function Logger(e) {
      this.name = e, this.parent = null, this.children = [];
      var t = [], n = null, o = this.name === rootLoggerName, i = this.name === nullLoggerName, r = null, s = !1;
      this.addChild = function (e) {
        this.children.push(e), e.parent = this, e.invalidateAppenderCache();
      };
      var a = !0;
      this.getAdditivity = function () {
        return a;
      }, this.setAdditivity = function (e) {
        var t = a != e;
        a = e, t && this.invalidateAppenderCache();
      }, this.addAppender = function (e) {
        i ? handleError('Logger.addAppender: you may not add an appender to the null logger') : e instanceof log4javascript.Appender ? array_contains(t, e) || (t.push(e), e.setAddedToLogger(this), this.invalidateAppenderCache()) : handleError('Logger.addAppender: appender supplied (\'' + toStr(e) + '\') is not a subclass of Appender');
      }, this.removeAppender = function (e) {
        array_remove(t, e), e.setRemovedFromLogger(this), this.invalidateAppenderCache();
      }, this.removeAllAppenders = function () {
        var e = t.length;
        if (e > 0) {
          for (var n = 0; e > n; n++)
            t[n].setRemovedFromLogger(this);
          t.length = 0, this.invalidateAppenderCache();
        }
      }, this.getEffectiveAppenders = function () {
        if (null === r || s) {
          var e = o || !this.getAdditivity() ? [] : this.parent.getEffectiveAppenders();
          r = e.concat(t), s = !1;
        }
        return r;
      }, this.invalidateAppenderCache = function () {
        s = !0;
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].invalidateAppenderCache();
      }, this.log = function (e, t) {
        if (enabled && e.isGreaterOrEqual(this.getEffectiveLevel())) {
          var n, o = t.length - 1, i = t[o];
          t.length > 1 && isError(i) && (n = i, o--);
          for (var r = [], s = 0; o >= s; s++)
            r[s] = t[s];
          var a = new LoggingEvent(this, new Date(), e, r, n);
          this.callAppenders(a);
        }
      }, this.callAppenders = function (e) {
        for (var t = this.getEffectiveAppenders(), n = 0, o = t.length; o > n; n++)
          t[n].doAppend(e);
      }, this.setLevel = function (e) {
        o && null === e ? handleError('Logger.setLevel: you cannot set the level of the root logger to null') : e instanceof Level ? n = e : handleError('Logger.setLevel: level supplied to logger ' + this.name + ' is not an instance of log4javascript.Level');
      }, this.getLevel = function () {
        return n;
      }, this.getEffectiveLevel = function () {
        for (var e = this; null !== e; e = e.parent) {
          var t = e.getLevel();
          if (null !== t)
            return t;
        }
      }, this.group = function (e, t) {
        if (enabled)
          for (var n = this.getEffectiveAppenders(), o = 0, i = n.length; i > o; o++)
            n[o].group(e, t);
      }, this.groupEnd = function () {
        if (enabled)
          for (var e = this.getEffectiveAppenders(), t = 0, n = e.length; n > t; t++)
            e[t].groupEnd();
      };
      var l = {};
      this.time = function (e, t) {
        enabled && (isUndefined(e) ? handleError('Logger.time: a name for the timer must be supplied') : !t || t instanceof Level ? l[e] = new Timer(e, t) : handleError('Logger.time: level supplied to timer ' + e + ' is not an instance of log4javascript.Level'));
      }, this.timeEnd = function (e) {
        if (enabled)
          if (isUndefined(e))
            handleError('Logger.timeEnd: a name for the timer must be supplied');
          else if (l[e]) {
            var t = l[e], n = t.getElapsedTime();
            this.log(t.level, ['Timer ' + toStr(e) + ' completed in ' + n + 'ms']), delete l[e];
          } else
            logLog.warn('Logger.timeEnd: no timer found with name ' + e);
      }, this.assert = function (e) {
        if (enabled && !e) {
          for (var t = [], n = 1, o = arguments.length; o > n; n++)
            t.push(arguments[n]);
          t = t.length > 0 ? t : ['Assertion Failure'], t.push(newLine), t.push(e), this.log(Level.ERROR, t);
        }
      }, this.toString = function () {
        return 'Logger[' + this.name + ']';
      };
    }
    function SimpleLayout() {
      this.customFields = [];
    }
    function NullLayout() {
      this.customFields = [];
    }
    function XmlLayout(e) {
      this.combineMessages = extractBooleanFromParam(e, !0), this.customFields = [];
    }
    function escapeNewLines(e) {
      return e.replace(/\r\n|\r|\n/g, '\\r\\n');
    }
    function JsonLayout(e, t) {
      this.readable = extractBooleanFromParam(e, !1), this.combineMessages = extractBooleanFromParam(t, !0), this.batchHeader = this.readable ? '[' + newLine : '[', this.batchFooter = this.readable ? ']' + newLine : ']', this.batchSeparator = this.readable ? ',' + newLine : ',', this.setKeys(), this.colon = this.readable ? ': ' : ':', this.tab = this.readable ? '\t' : '', this.lineBreak = this.readable ? newLine : '', this.customFields = [];
    }
    function HttpPostDataLayout() {
      this.setKeys(), this.customFields = [], this.returnsPostData = !0;
    }
    function formatObjectExpansion(e, t, n) {
      function o(e, t, n) {
        function r(e) {
          for (var t = splitIntoLines(e), o = 1, i = t.length; i > o; o++)
            t[o] = n + t[o];
          return t.join(newLine);
        }
        var s, a, l, c, u, d, h;
        if (n || (n = ''), null === e)
          return 'null';
        if (e === void 0)
          return 'undefined';
        if ('string' == typeof e)
          return r(e);
        if ('object' == typeof e && array_contains(i, e)) {
          try {
            d = toStr(e);
          } catch (p) {
            d = 'Error formatting property. Details: ' + getExceptionStringRep(p);
          }
          return d + ' [already expanded]';
        }
        if (e instanceof Array && t > 0) {
          for (i.push(e), d = '[' + newLine, l = t - 1, c = n + '  ', u = [], s = 0, a = e.length; a > s; s++)
            try {
              h = o(e[s], l, c), u.push(c + h);
            } catch (p) {
              u.push(c + 'Error formatting array member. Details: ' + getExceptionStringRep(p));
            }
          return d += u.join(',' + newLine) + newLine + n + ']';
        }
        if ('[object Date]' == Object.prototype.toString.call(e))
          return '' + e;
        if ('object' == typeof e && t > 0) {
          i.push(e), d = '{' + newLine, l = t - 1, c = n + '  ', u = [];
          for (s in e)
            try {
              h = o(e[s], l, c), u.push(c + s + ': ' + h);
            } catch (p) {
              u.push(c + s + ': Error formatting property. Details: ' + getExceptionStringRep(p));
            }
          return d += u.join(',' + newLine) + newLine + n + '}';
        }
        return r(toStr(e));
      }
      var i = [];
      return o(e, t, n);
    }
    function PatternLayout(e) {
      this.pattern = e ? e : PatternLayout.DEFAULT_CONVERSION_PATTERN, this.customFields = [];
    }
    function isHttpRequestSuccessful(e) {
      return isUndefined(e.status) || 0 === e.status || e.status >= 200 && 300 > e.status;
    }
    function AjaxAppender(e) {
      function t(e) {
        return k ? (handleError('AjaxAppender: configuration option \'' + e + '\' may not be set after the appender has been initialized'), !1) : !0;
      }
      function n() {
        if (u && enabled) {
          E = !0;
          var e;
          if (h)
            S.length > 0 ? (e = S.shift(), a(i(e), n)) : (E = !1, d && r());
          else {
            for (; e = S.shift();)
              a(i(e));
            E = !1, d && r();
          }
        }
      }
      function o() {
        var e = !1;
        if (u && enabled) {
          for (var t, o = c.getLayout().allowBatching() ? p : 1, i = []; t = C.shift();)
            i.push(t), C.length >= o && (S.push(i), i = []);
          i.length > 0 && S.push(i), e = S.length > 0, h = !1, d = !1, n();
        }
        return e;
      }
      function i(e) {
        for (var t, n = [], o = ''; t = e.shift();) {
          var i = c.getLayout().format(t);
          c.getLayout().ignoresThrowable() && (i += t.getThrowableStrRep()), n.push(i);
        }
        return o = 1 == e.length ? n.join('') : c.getLayout().batchHeader + n.join(c.getLayout().batchSeparator) + c.getLayout().batchFooter, b == c.defaults.contentType && (o = c.getLayout().returnsPostData ? o : urlEncode(v) + '=' + urlEncode(o), o.length > 0 && (o += '&'), o += 'layout=' + urlEncode('' + c.getLayout())), o;
      }
      function r() {
        window.setTimeout(n, g);
      }
      function s() {
        var e = 'AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled';
        handleError(e), u = !1, m && m(e);
      }
      function a(t, n) {
        try {
          var o = getXmlHttp(s);
          if (u) {
            o.overrideMimeType && o.overrideMimeType(c.getLayout().getContentType()), o.onreadystatechange = function () {
              if (4 == o.readyState) {
                if (isHttpRequestSuccessful(o))
                  f && f(o), n && n(o);
                else {
                  var t = 'AjaxAppender.append: XMLHttpRequest request to URL ' + e + ' returned status code ' + o.status;
                  handleError(t), m && m(t);
                }
                o.onreadystatechange = emptyFunction, o = null;
              }
            }, o.open('POST', e, !0);
            try {
              for (var i, r = 0; i = T[r++];)
                o.setRequestHeader(i.name, i.value);
              o.setRequestHeader('Content-Type', b);
            } catch (a) {
              var l = 'AjaxAppender.append: your browser\'s XMLHttpRequest implementation does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled';
              return handleError(l), u = !1, m && m(l), void 0;
            }
            o.send(t);
          }
        } catch (d) {
          var h = 'AjaxAppender.append: error sending log message to ' + e;
          handleError(h, d), u = !1, m && m(h + '. Details: ' + getExceptionStringRep(d));
        }
      }
      function l() {
        if (k = !0, y) {
          var e = window.onbeforeunload;
          window.onbeforeunload = function () {
            return e && e(), o() ? 'Sending log messages' : void 0;
          };
        }
        d && r();
      }
      var c = this, u = !0;
      e || (handleError('AjaxAppender: URL must be specified in constructor'), u = !1);
      var d = this.defaults.timed, h = this.defaults.waitForResponse, p = this.defaults.batchSize, g = this.defaults.timerInterval, f = this.defaults.requestSuccessCallback, m = this.defaults.failCallback, v = this.defaults.postVarName, y = this.defaults.sendAllOnUnload, b = this.defaults.contentType, w = null, C = [], S = [], T = [], E = !1, k = !1;
      this.getSessionId = function () {
        return w;
      }, this.setSessionId = function (e) {
        w = extractStringFromParam(e, null), this.layout.setCustomField('sessionid', w);
      }, this.setLayout = function (e) {
        t('layout') && (this.layout = e, null !== w && this.setSessionId(w));
      }, this.isTimed = function () {
        return d;
      }, this.setTimed = function (e) {
        t('timed') && (d = bool(e));
      }, this.getTimerInterval = function () {
        return g;
      }, this.setTimerInterval = function (e) {
        t('timerInterval') && (g = extractIntFromParam(e, g));
      }, this.isWaitForResponse = function () {
        return h;
      }, this.setWaitForResponse = function (e) {
        t('waitForResponse') && (h = bool(e));
      }, this.getBatchSize = function () {
        return p;
      }, this.setBatchSize = function (e) {
        t('batchSize') && (p = extractIntFromParam(e, p));
      }, this.isSendAllOnUnload = function () {
        return y;
      }, this.setSendAllOnUnload = function (e) {
        t('sendAllOnUnload') && (y = extractBooleanFromParam(e, y));
      }, this.setRequestSuccessCallback = function (e) {
        f = extractFunctionFromParam(e, f);
      }, this.setFailCallback = function (e) {
        m = extractFunctionFromParam(e, m);
      }, this.getPostVarName = function () {
        return v;
      }, this.setPostVarName = function (e) {
        t('postVarName') && (v = extractStringFromParam(e, v));
      }, this.getHeaders = function () {
        return T;
      }, this.addHeader = function (e, t) {
        'content-type' == e.toLowerCase() ? b = t : T.push({
          name: e,
          value: t
        });
      }, this.sendAll = n, this.sendAllRemaining = o, this.append = function (e) {
        if (u) {
          k || l(), C.push(e);
          var t = this.getLayout().allowBatching() ? p : 1;
          if (C.length >= t) {
            for (var o, i = []; o = C.shift();)
              i.push(o);
            S.push(i), d || h && (!h || E) || n();
          }
        }
      };
    }
    EventSupport.prototype = {
      eventTypes: [],
      eventListeners: {},
      setEventTypes: function (e) {
        if (e instanceof Array) {
          this.eventTypes = e, this.eventListeners = {};
          for (var t = 0, n = this.eventTypes.length; n > t; t++)
            this.eventListeners[this.eventTypes[t]] = [];
        } else
          handleError('log4javascript.EventSupport [' + this + ']: setEventTypes: eventTypes parameter must be an Array');
      },
      addEventListener: function (e, t) {
        'function' == typeof t ? (array_contains(this.eventTypes, e) || handleError('log4javascript.EventSupport [' + this + ']: addEventListener: no event called \'' + e + '\''), this.eventListeners[e].push(t)) : handleError('log4javascript.EventSupport [' + this + ']: addEventListener: listener must be a function');
      },
      removeEventListener: function (e, t) {
        'function' == typeof t ? (array_contains(this.eventTypes, e) || handleError('log4javascript.EventSupport [' + this + ']: removeEventListener: no event called \'' + e + '\''), array_remove(this.eventListeners[e], t)) : handleError('log4javascript.EventSupport [' + this + ']: removeEventListener: listener must be a function');
      },
      dispatchEvent: function (e, t) {
        if (array_contains(this.eventTypes, e))
          for (var n = this.eventListeners[e], o = 0, i = n.length; i > o; o++)
            n[o](this, e, t);
        else
          handleError('log4javascript.EventSupport [' + this + ']: dispatchEvent: no event called \'' + e + '\'');
      }
    };
    var applicationStartDate = new Date(), uniqueId = 'log4javascript_' + applicationStartDate.getTime() + '_' + Math.floor(100000000 * Math.random()), emptyFunction = function () {
      }, newLine = '\r\n', pageLoaded = !1;
    Log4JavaScript.prototype = new EventSupport(), log4javascript = new Log4JavaScript(), log4javascript.version = '1.4.5', log4javascript.edition = 'log4javascript_production';
    var urlEncode = window.encodeURIComponent !== void 0 ? function (e) {
        return encodeURIComponent(e);
      } : function (e) {
        return escape(e).replace(/\+/g, '%2B').replace(/"/g, '%22').replace(/'/g, '%27').replace(/\//g, '%2F').replace(/=/g, '%3D');
      }, urlDecode = window.decodeURIComponent !== void 0 ? function (e) {
        return decodeURIComponent(e);
      } : function (e) {
        return unescape(e).replace(/%2B/g, '+').replace(/%22/g, '"').replace(/%27/g, '\'').replace(/%2F/g, '/').replace(/%3D/g, '=');
      };
    Function.prototype.apply || (Function.prototype.apply = function (obj, args) {
      var methodName = '__apply__';
      obj[methodName] !== void 0 && (methodName += (Math.random() + '').substr(2)), obj[methodName] = this;
      for (var argsStrings = [], i = 0, len = args.length; len > i; i++)
        argsStrings[i] = 'args[' + i + ']';
      var script = 'obj.' + methodName + '(' + argsStrings.join(',') + ')', returnValue = eval(script);
      return delete obj[methodName], returnValue;
    }), Function.prototype.call || (Function.prototype.call = function (e) {
      for (var t = [], n = 1, o = arguments.length; o > n; n++)
        t[n - 1] = arguments[n];
      return this.apply(e, t);
    });
    var logLog = {
        quietMode: !1,
        debugMessages: [],
        setQuietMode: function (e) {
          this.quietMode = bool(e);
        },
        numberOfErrors: 0,
        alertAllErrors: !1,
        setAlertAllErrors: function (e) {
          this.alertAllErrors = e;
        },
        debug: function (e) {
          this.debugMessages.push(e);
        },
        displayDebug: function () {
          alert(this.debugMessages.join(newLine));
        },
        warn: function () {
        },
        error: function (e, t) {
          if ((1 == ++this.numberOfErrors || this.alertAllErrors) && !this.quietMode) {
            var n = 'log4javascript error: ' + e;
            t && (n += newLine + newLine + 'Original error: ' + getExceptionStringRep(t)), alert(n);
          }
        }
      };
    log4javascript.logLog = logLog, log4javascript.setEventTypes([
      'load',
      'error'
    ]), log4javascript.handleError = handleError;
    var enabled = !('undefined' != typeof log4javascript_disabled && log4javascript_disabled);
    log4javascript.setEnabled = function (e) {
      enabled = bool(e);
    }, log4javascript.isEnabled = function () {
      return enabled;
    };
    var useTimeStampsInMilliseconds = !0;
    log4javascript.setTimeStampsInMilliseconds = function (e) {
      useTimeStampsInMilliseconds = bool(e);
    }, log4javascript.isTimeStampsInMilliseconds = function () {
      return useTimeStampsInMilliseconds;
    }, log4javascript.evalInScope = function (expr) {
      return eval(expr);
    };
    var showStackTraces = !1;
    log4javascript.setShowStackTraces = function (e) {
      showStackTraces = bool(e);
    };
    var Level = function (e, t) {
      this.level = e, this.name = t;
    };
    Level.prototype = {
      toString: function () {
        return this.name;
      },
      equals: function (e) {
        return this.level == e.level;
      },
      isGreaterOrEqual: function (e) {
        return this.level >= e.level;
      }
    }, Level.ALL = new Level(Number.MIN_VALUE, 'ALL'), Level.TRACE = new Level(10000, 'TRACE'), Level.DEBUG = new Level(20000, 'DEBUG'), Level.INFO = new Level(30000, 'INFO'), Level.WARN = new Level(40000, 'WARN'), Level.ERROR = new Level(50000, 'ERROR'), Level.FATAL = new Level(60000, 'FATAL'), Level.OFF = new Level(Number.MAX_VALUE, 'OFF'), log4javascript.Level = Level, Timer.prototype.getElapsedTime = function () {
      return new Date().getTime() - this.start.getTime();
    };
    var anonymousLoggerName = '[anonymous]', defaultLoggerName = '[default]', nullLoggerName = '[null]', rootLoggerName = 'root';
    Logger.prototype = {
      trace: function () {
        this.log(Level.TRACE, arguments);
      },
      debug: function () {
        this.log(Level.DEBUG, arguments);
      },
      info: function () {
        this.log(Level.INFO, arguments);
      },
      warn: function () {
        this.log(Level.WARN, arguments);
      },
      error: function () {
        this.log(Level.ERROR, arguments);
      },
      fatal: function () {
        this.log(Level.FATAL, arguments);
      },
      isEnabledFor: function (e) {
        return e.isGreaterOrEqual(this.getEffectiveLevel());
      },
      isTraceEnabled: function () {
        return this.isEnabledFor(Level.TRACE);
      },
      isDebugEnabled: function () {
        return this.isEnabledFor(Level.DEBUG);
      },
      isInfoEnabled: function () {
        return this.isEnabledFor(Level.INFO);
      },
      isWarnEnabled: function () {
        return this.isEnabledFor(Level.WARN);
      },
      isErrorEnabled: function () {
        return this.isEnabledFor(Level.ERROR);
      },
      isFatalEnabled: function () {
        return this.isEnabledFor(Level.FATAL);
      }
    }, Logger.prototype.trace.isEntryPoint = !0, Logger.prototype.debug.isEntryPoint = !0, Logger.prototype.info.isEntryPoint = !0, Logger.prototype.warn.isEntryPoint = !0, Logger.prototype.error.isEntryPoint = !0, Logger.prototype.fatal.isEntryPoint = !0;
    var loggers = {}, loggerNames = [], ROOT_LOGGER_DEFAULT_LEVEL = Level.DEBUG, rootLogger = new Logger(rootLoggerName);
    rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL), log4javascript.getRootLogger = function () {
      return rootLogger;
    }, log4javascript.getLogger = function (e) {
      if ('string' != typeof e && (e = anonymousLoggerName, logLog.warn('log4javascript.getLogger: non-string logger name ' + toStr(e) + ' supplied, returning anonymous logger')), e == rootLoggerName && handleError('log4javascript.getLogger: root logger may not be obtained by name'), !loggers[e]) {
        var t = new Logger(e);
        loggers[e] = t, loggerNames.push(e);
        var n, o = e.lastIndexOf('.');
        if (o > -1) {
          var i = e.substring(0, o);
          n = log4javascript.getLogger(i);
        } else
          n = rootLogger;
        n.addChild(t);
      }
      return loggers[e];
    };
    var defaultLogger = null;
    log4javascript.getDefaultLogger = function () {
      if (!defaultLogger) {
        defaultLogger = log4javascript.getLogger(defaultLoggerName);
        var e = new log4javascript.PopUpAppender();
        defaultLogger.addAppender(e);
      }
      return defaultLogger;
    };
    var nullLogger = null;
    log4javascript.getNullLogger = function () {
      return nullLogger || (nullLogger = new Logger(nullLoggerName), nullLogger.setLevel(Level.OFF)), nullLogger;
    }, log4javascript.resetConfiguration = function () {
      rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL), loggers = {};
    };
    var LoggingEvent = function (e, t, n, o, i) {
      this.logger = e, this.timeStamp = t, this.timeStampInMilliseconds = t.getTime(), this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1000), this.milliseconds = this.timeStamp.getMilliseconds(), this.level = n, this.messages = o, this.exception = i;
    };
    LoggingEvent.prototype = {
      getThrowableStrRep: function () {
        return this.exception ? getExceptionStringRep(this.exception) : '';
      },
      getCombinedMessages: function () {
        return 1 == this.messages.length ? this.messages[0] : this.messages.join(newLine);
      },
      toString: function () {
        return 'LoggingEvent[' + this.level + ']';
      }
    }, log4javascript.LoggingEvent = LoggingEvent;
    var Layout = function () {
    };
    Layout.prototype = {
      defaults: {
        loggerKey: 'logger',
        timeStampKey: 'timestamp',
        millisecondsKey: 'milliseconds',
        levelKey: 'level',
        messageKey: 'message',
        exceptionKey: 'exception',
        urlKey: 'url'
      },
      loggerKey: 'logger',
      timeStampKey: 'timestamp',
      millisecondsKey: 'milliseconds',
      levelKey: 'level',
      messageKey: 'message',
      exceptionKey: 'exception',
      urlKey: 'url',
      batchHeader: '',
      batchFooter: '',
      batchSeparator: '',
      returnsPostData: !1,
      overrideTimeStampsSetting: !1,
      useTimeStampsInMilliseconds: null,
      format: function () {
        handleError('Layout.format: layout supplied has no format() method');
      },
      ignoresThrowable: function () {
        handleError('Layout.ignoresThrowable: layout supplied has no ignoresThrowable() method');
      },
      getContentType: function () {
        return 'text/plain';
      },
      allowBatching: function () {
        return !0;
      },
      setTimeStampsInMilliseconds: function (e) {
        this.overrideTimeStampsSetting = !0, this.useTimeStampsInMilliseconds = bool(e);
      },
      isTimeStampsInMilliseconds: function () {
        return this.overrideTimeStampsSetting ? this.useTimeStampsInMilliseconds : useTimeStampsInMilliseconds;
      },
      getTimeStampValue: function (e) {
        return this.isTimeStampsInMilliseconds() ? e.timeStampInMilliseconds : e.timeStampInSeconds;
      },
      getDataValues: function (e, t) {
        var n = [
            [
              this.loggerKey,
              e.logger.name
            ],
            [
              this.timeStampKey,
              this.getTimeStampValue(e)
            ],
            [
              this.levelKey,
              e.level.name
            ],
            [
              this.urlKey,
              window.location.href
            ],
            [
              this.messageKey,
              t ? e.getCombinedMessages() : e.messages
            ]
          ];
        if (this.isTimeStampsInMilliseconds() || n.push([
            this.millisecondsKey,
            e.milliseconds
          ]), e.exception && n.push([
            this.exceptionKey,
            getExceptionStringRep(e.exception)
          ]), this.hasCustomFields())
          for (var o = 0, i = this.customFields.length; i > o; o++) {
            var r = this.customFields[o].value;
            'function' == typeof r && (r = r(this, e)), n.push([
              this.customFields[o].name,
              r
            ]);
          }
        return n;
      },
      setKeys: function (e, t, n, o, i, r, s) {
        this.loggerKey = extractStringFromParam(e, this.defaults.loggerKey), this.timeStampKey = extractStringFromParam(t, this.defaults.timeStampKey), this.levelKey = extractStringFromParam(n, this.defaults.levelKey), this.messageKey = extractStringFromParam(o, this.defaults.messageKey), this.exceptionKey = extractStringFromParam(i, this.defaults.exceptionKey), this.urlKey = extractStringFromParam(r, this.defaults.urlKey), this.millisecondsKey = extractStringFromParam(s, this.defaults.millisecondsKey);
      },
      setCustomField: function (e, t) {
        for (var n = !1, o = 0, i = this.customFields.length; i > o; o++)
          this.customFields[o].name === e && (this.customFields[o].value = t, n = !0);
        n || this.customFields.push({
          name: e,
          value: t
        });
      },
      hasCustomFields: function () {
        return this.customFields.length > 0;
      },
      toString: function () {
        handleError('Layout.toString: all layouts must override this method');
      }
    }, log4javascript.Layout = Layout;
    var Appender = function () {
    };
    Appender.prototype = new EventSupport(), Appender.prototype.layout = new PatternLayout(), Appender.prototype.threshold = Level.ALL, Appender.prototype.loggers = [], Appender.prototype.doAppend = function (e) {
      enabled && e.level.level >= this.threshold.level && this.append(e);
    }, Appender.prototype.append = function () {
    }, Appender.prototype.setLayout = function (e) {
      e instanceof Layout ? this.layout = e : handleError('Appender.setLayout: layout supplied to ' + ('' + this) + ' is not a subclass of Layout');
    }, Appender.prototype.getLayout = function () {
      return this.layout;
    }, Appender.prototype.setThreshold = function (e) {
      e instanceof Level ? this.threshold = e : handleError('Appender.setThreshold: threshold supplied to ' + ('' + this) + ' is not a subclass of Level');
    }, Appender.prototype.getThreshold = function () {
      return this.threshold;
    }, Appender.prototype.setAddedToLogger = function (e) {
      this.loggers.push(e);
    }, Appender.prototype.setRemovedFromLogger = function (e) {
      array_remove(this.loggers, e);
    }, Appender.prototype.group = emptyFunction, Appender.prototype.groupEnd = emptyFunction, Appender.prototype.toString = function () {
      handleError('Appender.toString: all appenders must override this method');
    }, log4javascript.Appender = Appender, SimpleLayout.prototype = new Layout(), SimpleLayout.prototype.format = function (e) {
      return e.level.name + ' - ' + e.getCombinedMessages();
    }, SimpleLayout.prototype.ignoresThrowable = function () {
      return !0;
    }, SimpleLayout.prototype.toString = function () {
      return 'SimpleLayout';
    }, log4javascript.SimpleLayout = SimpleLayout, NullLayout.prototype = new Layout(), NullLayout.prototype.format = function (e) {
      return e.messages;
    }, NullLayout.prototype.ignoresThrowable = function () {
      return !0;
    }, NullLayout.prototype.toString = function () {
      return 'NullLayout';
    }, log4javascript.NullLayout = NullLayout, XmlLayout.prototype = new Layout(), XmlLayout.prototype.isCombinedMessages = function () {
      return this.combineMessages;
    }, XmlLayout.prototype.getContentType = function () {
      return 'text/xml';
    }, XmlLayout.prototype.escapeCdata = function (e) {
      return e.replace(/\]\]>/, ']]>]]&gt;<![CDATA[');
    }, XmlLayout.prototype.format = function (e) {
      function t(e) {
        return e = 'string' == typeof e ? e : toStr(e), '<log4javascript:message><![CDATA[' + i.escapeCdata(e) + ']]></log4javascript:message>';
      }
      var n, o, i = this, r = '<log4javascript:event logger="' + e.logger.name + '" timestamp="' + this.getTimeStampValue(e) + '"';
      if (this.isTimeStampsInMilliseconds() || (r += ' milliseconds="' + e.milliseconds + '"'), r += ' level="' + e.level.name + '">' + newLine, this.combineMessages)
        r += t(e.getCombinedMessages());
      else {
        for (r += '<log4javascript:messages>' + newLine, n = 0, o = e.messages.length; o > n; n++)
          r += t(e.messages[n]) + newLine;
        r += '</log4javascript:messages>' + newLine;
      }
      if (this.hasCustomFields())
        for (n = 0, o = this.customFields.length; o > n; n++)
          r += '<log4javascript:customfield name="' + this.customFields[n].name + '"><![CDATA[' + ('' + this.customFields[n].value) + ']]></log4javascript:customfield>' + newLine;
      return e.exception && (r += '<log4javascript:exception><![CDATA[' + getExceptionStringRep(e.exception) + ']]></log4javascript:exception>' + newLine), r += '</log4javascript:event>' + newLine + newLine;
    }, XmlLayout.prototype.ignoresThrowable = function () {
      return !1;
    }, XmlLayout.prototype.toString = function () {
      return 'XmlLayout';
    }, log4javascript.XmlLayout = XmlLayout, JsonLayout.prototype = new Layout(), JsonLayout.prototype.isReadable = function () {
      return this.readable;
    }, JsonLayout.prototype.isCombinedMessages = function () {
      return this.combineMessages;
    }, JsonLayout.prototype.format = function (e) {
      function t(e, n, o) {
        var r, s = typeof e;
        if (e instanceof Date)
          r = e.getTime() + '';
        else if (o && e instanceof Array) {
          r = '[' + i.lineBreak;
          for (var a = 0, l = e.length; l > a; a++) {
            var c = n + i.tab;
            r += c + t(e[a], c, !1), e.length - 1 > a && (r += ','), r += i.lineBreak;
          }
          r += n + ']';
        } else
          r = 'number' !== s && 'boolean' !== s ? '"' + escapeNewLines(toStr(e).replace(/\"/g, '\\"')) + '"' : e;
        return r;
      }
      var n, o, i = this, r = this.getDataValues(e, this.combineMessages), s = '{' + this.lineBreak;
      for (n = 0, o = r.length - 1; o >= n; n++)
        s += this.tab + '"' + r[n][0] + '"' + this.colon + t(r[n][1], this.tab, !0), o > n && (s += ','), s += this.lineBreak;
      return s += '}' + this.lineBreak;
    }, JsonLayout.prototype.ignoresThrowable = function () {
      return !1;
    }, JsonLayout.prototype.toString = function () {
      return 'JsonLayout';
    }, JsonLayout.prototype.getContentType = function () {
      return 'application/json';
    }, log4javascript.JsonLayout = JsonLayout, HttpPostDataLayout.prototype = new Layout(), HttpPostDataLayout.prototype.allowBatching = function () {
      return !1;
    }, HttpPostDataLayout.prototype.format = function (e) {
      for (var t = this.getDataValues(e), n = [], o = 0, i = t.length; i > o; o++) {
        var r = t[o][1] instanceof Date ? t[o][1].getTime() + '' : t[o][1];
        n.push(urlEncode(t[o][0]) + '=' + urlEncode(r));
      }
      return n.join('&');
    }, HttpPostDataLayout.prototype.ignoresThrowable = function () {
      return !1;
    }, HttpPostDataLayout.prototype.toString = function () {
      return 'HttpPostDataLayout';
    }, log4javascript.HttpPostDataLayout = HttpPostDataLayout;
    var SimpleDateFormat;
    (function () {
      var e = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/, t = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ], n = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ], o = 0, i = 1, r = 2, s = 3, a = 4, l = 5, c = {
          G: o,
          y: s,
          M: a,
          w: r,
          W: r,
          D: r,
          d: r,
          F: r,
          E: i,
          a: o,
          H: r,
          k: r,
          K: r,
          h: r,
          m: r,
          s: r,
          S: r,
          Z: l
        }, u = 86400000, d = 7 * u, h = 1, p = function (e, t, n) {
          var o = new Date(e, t, n, 0, 0, 0);
          return o.setMilliseconds(0), o;
        };
      Date.prototype.getDifference = function (e) {
        return this.getTime() - e.getTime();
      }, Date.prototype.isBefore = function (e) {
        return this.getTime() < e.getTime();
      }, Date.prototype.getUTCTime = function () {
        return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
      }, Date.prototype.getTimeSince = function (e) {
        return this.getUTCTime() - e.getUTCTime();
      }, Date.prototype.getPreviousSunday = function () {
        var e = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12, 0, 0), t = new Date(e.getTime() - this.getDay() * u);
        return p(t.getFullYear(), t.getMonth(), t.getDate());
      }, Date.prototype.getWeekInYear = function (e) {
        isUndefined(this.minimalDaysInFirstWeek) && (e = h);
        var t = this.getPreviousSunday(), n = p(this.getFullYear(), 0, 1), o = t.isBefore(n) ? 0 : 1 + Math.floor(t.getTimeSince(n) / d), i = 7 - n.getDay(), r = o;
        return e > i && r--, r;
      }, Date.prototype.getWeekInMonth = function (e) {
        isUndefined(this.minimalDaysInFirstWeek) && (e = h);
        var t = this.getPreviousSunday(), n = p(this.getFullYear(), this.getMonth(), 1), o = t.isBefore(n) ? 0 : 1 + Math.floor(t.getTimeSince(n) / d), i = 7 - n.getDay(), r = o;
        return i >= e && r++, r;
      }, Date.prototype.getDayInYear = function () {
        var e = p(this.getFullYear(), 0, 1);
        return 1 + Math.floor(this.getTimeSince(e) / u);
      }, SimpleDateFormat = function (e) {
        this.formatString = e;
      }, SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function (e) {
        this.minimalDaysInFirstWeek = e;
      }, SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function () {
        return isUndefined(this.minimalDaysInFirstWeek) ? h : this.minimalDaysInFirstWeek;
      };
      var g = function (e, t) {
          for (; t > e.length;)
            e = '0' + e;
          return e;
        }, f = function (e, t, n) {
          return t >= 4 ? e : e.substr(0, Math.max(n, t));
        }, m = function (e, t) {
          var n = '' + e;
          return g(n, t);
        };
      SimpleDateFormat.prototype.format = function (u) {
        for (var d, h = '', p = this.formatString; d = e.exec(p);) {
          var v = d[1], y = d[2], b = d[3], w = d[4];
          if (v)
            h += '\'\'' == v ? '\'' : v.substring(1, v.length - 1);
          else if (b);
          else if (w)
            h += w;
          else if (y) {
            var C = y.charAt(0), S = y.length, T = '';
            switch (C) {
            case 'G':
              T = 'AD';
              break;
            case 'y':
              T = u.getFullYear();
              break;
            case 'M':
              T = u.getMonth();
              break;
            case 'w':
              T = u.getWeekInYear(this.getMinimalDaysInFirstWeek());
              break;
            case 'W':
              T = u.getWeekInMonth(this.getMinimalDaysInFirstWeek());
              break;
            case 'D':
              T = u.getDayInYear();
              break;
            case 'd':
              T = u.getDate();
              break;
            case 'F':
              T = 1 + Math.floor((u.getDate() - 1) / 7);
              break;
            case 'E':
              T = n[u.getDay()];
              break;
            case 'a':
              T = u.getHours() >= 12 ? 'PM' : 'AM';
              break;
            case 'H':
              T = u.getHours();
              break;
            case 'k':
              T = u.getHours() || 24;
              break;
            case 'K':
              T = u.getHours() % 12;
              break;
            case 'h':
              T = u.getHours() % 12 || 12;
              break;
            case 'm':
              T = u.getMinutes();
              break;
            case 's':
              T = u.getSeconds();
              break;
            case 'S':
              T = u.getMilliseconds();
              break;
            case 'Z':
              T = u.getTimezoneOffset();
            }
            switch (c[C]) {
            case o:
              h += f(T, S, 2);
              break;
            case i:
              h += f(T, S, 3);
              break;
            case r:
              h += m(T, S);
              break;
            case s:
              if (3 >= S) {
                var E = '' + T;
                h += E.substr(2, 2);
              } else
                h += m(T, S);
              break;
            case a:
              h += S >= 3 ? f(t[T], S, S) : m(T + 1, S);
              break;
            case l:
              var k = T > 0, I = k ? '-' : '+', R = Math.abs(T), A = '' + Math.floor(R / 60);
              A = g(A, 2);
              var x = '' + R % 60;
              x = g(x, 2), h += I + A + x;
            }
          }
          p = p.substr(d.index + d[0].length);
        }
        return h;
      };
    }(), log4javascript.SimpleDateFormat = SimpleDateFormat, PatternLayout.TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n', PatternLayout.DEFAULT_CONVERSION_PATTERN = '%m%n', PatternLayout.ISO8601_DATEFORMAT = 'yyyy-MM-dd HH:mm:ss,SSS', PatternLayout.DATETIME_DATEFORMAT = 'dd MMM yyyy HH:mm:ss,SSS', PatternLayout.ABSOLUTETIME_DATEFORMAT = 'HH:mm:ss,SSS', PatternLayout.prototype = new Layout(), PatternLayout.prototype.format = function (e) {
      for (var t, n = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/, o = '', i = this.pattern; t = n.exec(i);) {
        var r = t[0], s = t[1], a = t[2], l = t[3], c = t[5], u = t[6];
        if (u)
          o += '' + u;
        else {
          var d = '';
          switch (l) {
          case 'a':
          case 'm':
            var h = 0;
            c && (h = parseInt(c, 10), isNaN(h) && (handleError('PatternLayout.format: invalid specifier \'' + c + '\' for conversion character \'' + l + '\' - should be a number'), h = 0));
            for (var p = 'a' === l ? e.messages[0] : e.messages, g = 0, f = p.length; f > g; g++)
              g > 0 && ' ' !== d.charAt(d.length - 1) && (d += ' '), d += 0 === h ? p[g] : formatObjectExpansion(p[g], h);
            break;
          case 'c':
            var m = e.logger.name;
            if (c) {
              var v = parseInt(c, 10), y = e.logger.name.split('.');
              d = v >= y.length ? m : y.slice(y.length - v).join('.');
            } else
              d = m;
            break;
          case 'd':
            var b = PatternLayout.ISO8601_DATEFORMAT;
            c && (b = c, 'ISO8601' == b ? b = PatternLayout.ISO8601_DATEFORMAT : 'ABSOLUTE' == b ? b = PatternLayout.ABSOLUTETIME_DATEFORMAT : 'DATE' == b && (b = PatternLayout.DATETIME_DATEFORMAT)), d = new SimpleDateFormat(b).format(e.timeStamp);
            break;
          case 'f':
            if (this.hasCustomFields()) {
              var w = 0;
              c && (w = parseInt(c, 10), isNaN(w) ? handleError('PatternLayout.format: invalid specifier \'' + c + '\' for conversion character \'f\' - should be a number') : 0 === w ? handleError('PatternLayout.format: invalid specifier \'' + c + '\' for conversion character \'f\' - must be greater than zero') : w > this.customFields.length ? handleError('PatternLayout.format: invalid specifier \'' + c + '\' for conversion character \'f\' - there aren\'t that many custom fields') : w -= 1);
              var C = this.customFields[w].value;
              'function' == typeof C && (C = C(this, e)), d = C;
            }
            break;
          case 'n':
            d = newLine;
            break;
          case 'p':
            d = e.level.name;
            break;
          case 'r':
            d = '' + e.timeStamp.getDifference(applicationStartDate);
            break;
          case '%':
            d = '%';
            break;
          default:
            d = r;
          }
          var S;
          if (a) {
            S = parseInt(a.substr(1), 10);
            var T = d.length;
            T > S && (d = d.substring(T - S, T));
          }
          if (s)
            if ('-' == s.charAt(0))
              for (S = parseInt(s.substr(1), 10); S > d.length;)
                d += ' ';
            else
              for (S = parseInt(s, 10); S > d.length;)
                d = ' ' + d;
          o += d;
        }
        i = i.substr(t.index + t[0].length);
      }
      return o;
    }, PatternLayout.prototype.ignoresThrowable = function () {
      return !0;
    }, PatternLayout.prototype.toString = function () {
      return 'PatternLayout';
    }, log4javascript.PatternLayout = PatternLayout);
    var xmlHttpFactories = [
        function () {
          return new XMLHttpRequest();
        },
        function () {
          return new ActiveXObject('Msxml2.XMLHTTP');
        },
        function () {
          return new ActiveXObject('Microsoft.XMLHTTP');
        }
      ], getXmlHttp = function (e) {
        for (var t, n = null, o = 0, i = xmlHttpFactories.length; i > o; o++) {
          t = xmlHttpFactories[o];
          try {
            return n = t(), getXmlHttp = t, n;
          } catch (r) {
          }
        }
        e ? e() : handleError('getXmlHttp: unable to obtain XMLHttpRequest object');
      };
    if (AjaxAppender.prototype = new Appender(), AjaxAppender.prototype.defaults = {
        waitForResponse: !1,
        timed: !1,
        timerInterval: 1000,
        batchSize: 1,
        sendAllOnUnload: !1,
        requestSuccessCallback: null,
        failCallback: null,
        postVarName: 'data',
        contentType: 'application/x-www-form-urlencoded'
      }, AjaxAppender.prototype.layout = new HttpPostDataLayout(), AjaxAppender.prototype.toString = function () {
        return 'AjaxAppender';
      }, log4javascript.AjaxAppender = AjaxAppender, log4javascript.setDocumentReady = function () {
        pageLoaded = !0, log4javascript.dispatchEvent('load', {});
      }, window.addEventListener)
      window.addEventListener('load', log4javascript.setDocumentReady, !1);
    else if (window.attachEvent)
      window.attachEvent('onload', log4javascript.setDocumentReady);
    else {
      var oldOnload = window.onload;
      window.onload = 'function' != typeof window.onload ? log4javascript.setDocumentReady : function (e) {
        oldOnload && oldOnload(e), log4javascript.setDocumentReady();
      };
    }
    return window.log4javascript = log4javascript, log4javascript;
  }();