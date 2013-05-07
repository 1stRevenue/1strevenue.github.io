'use strict';
function f() {
  return function () {
  };
}
(function () {
  function c(e, t) {
    var o = Array.prototype.slice.call(arguments, 2);
    return function () {
      var n = o.concat(Array.prototype.slice.call(arguments, 0));
      e.apply(t, n);
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
      var t, o, n;
      if (e = Array.prototype.slice.call(arguments, 0), n = e.shift(), o = e.length, o > 1 && !1 !== window.__consoleShimTest__)
        for ('string' != typeof e[0] && (e.unshift('%o'), o += 1), t = (t = e[0].match(/%[a-z]/g)) ? t.length + 1 : 1; o > t; t += 1)
          e[0] += ' %o';
      Function.apply.call(n, a, e);
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
    var o, n, i, r, s;
    if (e && e instanceof Array && e.length) {
      if (!(t && t instanceof Array))
        for (o in t = [], e[0])
          e[0].hasOwnProperty(o) && t.push(o);
      for (o = 0, n = e.length; n > o; o += 1) {
        for (i = [], r = 0, s = t.length; s > r; r += 1)
          i.push(e[o][t[r]]);
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
    for (var e = this[0], t = 0, o = this.length - 1; o > t; t++)
      this[t] = this[t + 1];
    return this.length = this.length - 1, e;
  }
}), Array.prototype.splice || (Array.prototype.splice = function (e, t) {
  var o = this.slice(e + t), n = this.slice(e, e + t);
  this.length = e;
  for (var i = [], r = 0, s = arguments.length; s > r; r++)
    i[r] = arguments[r];
  var a = i.length > 2 ? o = i.slice(2).concat(o) : o;
  for (r = 0, s = a.length; s > r; r++)
    this.push(a[r]);
  return n;
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
        } catch (o) {
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
      for (var o = -1, n = 0, i = e.length; i > n; n++)
        if (e[n] === t) {
          o = n;
          break;
        }
      return o >= 0 ? (e.splice(o, 1), !0) : !1;
    }
    function array_contains(e, t) {
      for (var o = 0, n = e.length; n > o; o++)
        if (e[o] == t)
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
        var o = parseInt(e, 10);
        return isNaN(o) ? t : o;
      } catch (n) {
        return logLog.warn('Invalid int param ' + e, n), t;
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
    function addEvent(e, t, o, n, i) {
      if (i = i ? i : window, e.addEventListener)
        e.addEventListener(t, o, n);
      else if (e.attachEvent)
        e.attachEvent('on' + t, o);
      else {
        var r = getListenersPropertyName(t);
        e[r] || (e[r] = [], e['on' + t] = function (e) {
          e = getEvent(e, i);
          for (var o, n = getListenersPropertyName(t), r = this[n].concat([]); o = r.shift();)
            o.call(this, e);
        }), e[r].push(o);
      }
    }
    function removeEvent(e, t, o, n) {
      if (e.removeEventListener)
        e.removeEventListener(t, o, n);
      else if (e.detachEvent)
        e.detachEvent('on' + t, o);
      else {
        var i = getListenersPropertyName(t);
        e[i] && array_remove(e[i], o);
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
      var t = [], o = null, n = this.name === rootLoggerName, i = this.name === nullLoggerName, r = null, s = !1;
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
          for (var o = 0; e > o; o++)
            t[o].setRemovedFromLogger(this);
          t.length = 0, this.invalidateAppenderCache();
        }
      }, this.getEffectiveAppenders = function () {
        if (null === r || s) {
          var e = n || !this.getAdditivity() ? [] : this.parent.getEffectiveAppenders();
          r = e.concat(t), s = !1;
        }
        return r;
      }, this.invalidateAppenderCache = function () {
        s = !0;
        for (var e = 0, t = this.children.length; t > e; e++)
          this.children[e].invalidateAppenderCache();
      }, this.log = function (e, t) {
        if (enabled && e.isGreaterOrEqual(this.getEffectiveLevel())) {
          var o, n = t.length - 1, i = t[n];
          t.length > 1 && isError(i) && (o = i, n--);
          for (var r = [], s = 0; n >= s; s++)
            r[s] = t[s];
          var a = new LoggingEvent(this, new Date(), e, r, o);
          this.callAppenders(a);
        }
      }, this.callAppenders = function (e) {
        for (var t = this.getEffectiveAppenders(), o = 0, n = t.length; n > o; o++)
          t[o].doAppend(e);
      }, this.setLevel = function (e) {
        n && null === e ? handleError('Logger.setLevel: you cannot set the level of the root logger to null') : e instanceof Level ? o = e : handleError('Logger.setLevel: level supplied to logger ' + this.name + ' is not an instance of log4javascript.Level');
      }, this.getLevel = function () {
        return o;
      }, this.getEffectiveLevel = function () {
        for (var e = this; null !== e; e = e.parent) {
          var t = e.getLevel();
          if (null !== t)
            return t;
        }
      }, this.group = function (e, t) {
        if (enabled)
          for (var o = this.getEffectiveAppenders(), n = 0, i = o.length; i > n; n++)
            o[n].group(e, t);
      }, this.groupEnd = function () {
        if (enabled)
          for (var e = this.getEffectiveAppenders(), t = 0, o = e.length; o > t; t++)
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
            var t = l[e], o = t.getElapsedTime();
            this.log(t.level, ['Timer ' + toStr(e) + ' completed in ' + o + 'ms']), delete l[e];
          } else
            logLog.warn('Logger.timeEnd: no timer found with name ' + e);
      }, this.assert = function (e) {
        if (enabled && !e) {
          for (var t = [], o = 1, n = arguments.length; n > o; o++)
            t.push(arguments[o]);
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
    function formatObjectExpansion(e, t, o) {
      function n(e, t, o) {
        function r(e) {
          for (var t = splitIntoLines(e), n = 1, i = t.length; i > n; n++)
            t[n] = o + t[n];
          return t.join(newLine);
        }
        var s, a, l, c, u, d, p;
        if (o || (o = ''), null === e)
          return 'null';
        if (e === void 0)
          return 'undefined';
        if ('string' == typeof e)
          return r(e);
        if ('object' == typeof e && array_contains(i, e)) {
          try {
            d = toStr(e);
          } catch (f) {
            d = 'Error formatting property. Details: ' + getExceptionStringRep(f);
          }
          return d + ' [already expanded]';
        }
        if (e instanceof Array && t > 0) {
          for (i.push(e), d = '[' + newLine, l = t - 1, c = o + '  ', u = [], s = 0, a = e.length; a > s; s++)
            try {
              p = n(e[s], l, c), u.push(c + p);
            } catch (f) {
              u.push(c + 'Error formatting array member. Details: ' + getExceptionStringRep(f));
            }
          return d += u.join(',' + newLine) + newLine + o + ']';
        }
        if ('[object Date]' == Object.prototype.toString.call(e))
          return '' + e;
        if ('object' == typeof e && t > 0) {
          i.push(e), d = '{' + newLine, l = t - 1, c = o + '  ', u = [];
          for (s in e)
            try {
              p = n(e[s], l, c), u.push(c + s + ': ' + p);
            } catch (f) {
              u.push(c + s + ': Error formatting property. Details: ' + getExceptionStringRep(f));
            }
          return d += u.join(',' + newLine) + newLine + o + '}';
        }
        return r(toStr(e));
      }
      var i = [];
      return n(e, t, o);
    }
    function PatternLayout(e) {
      this.pattern = e ? e : PatternLayout.DEFAULT_CONVERSION_PATTERN, this.customFields = [];
    }
    function isHttpRequestSuccessful(e) {
      return isUndefined(e.status) || 0 === e.status || e.status >= 200 && 300 > e.status;
    }
    function AjaxAppender(e) {
      function t(e) {
        return x ? (handleError('AjaxAppender: configuration option \'' + e + '\' may not be set after the appender has been initialized'), !1) : !0;
      }
      function o() {
        if (u && enabled) {
          R = !0;
          var e;
          if (p)
            S.length > 0 ? (e = S.shift(), a(i(e), o)) : (R = !1, d && r());
          else {
            for (; e = S.shift();)
              a(i(e));
            R = !1, d && r();
          }
        }
      }
      function n() {
        var e = !1;
        if (u && enabled) {
          for (var t, n = c.getLayout().allowBatching() ? f : 1, i = []; t = C.shift();)
            i.push(t), C.length >= n && (S.push(i), i = []);
          i.length > 0 && S.push(i), e = S.length > 0, p = !1, d = !1, o();
        }
        return e;
      }
      function i(e) {
        for (var t, o = [], n = ''; t = e.shift();) {
          var i = c.getLayout().format(t);
          c.getLayout().ignoresThrowable() && (i += t.getThrowableStrRep()), o.push(i);
        }
        return n = 1 == e.length ? o.join('') : c.getLayout().batchHeader + o.join(c.getLayout().batchSeparator) + c.getLayout().batchFooter, y == c.defaults.contentType && (n = c.getLayout().returnsPostData ? n : urlEncode(m) + '=' + urlEncode(n), n.length > 0 && (n += '&'), n += 'layout=' + urlEncode('' + c.getLayout())), n;
      }
      function r() {
        window.setTimeout(o, h);
      }
      function s() {
        var e = 'AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled';
        handleError(e), u = !1, v && v(e);
      }
      function a(t, o) {
        try {
          var n = getXmlHttp(s);
          if (u) {
            n.overrideMimeType && n.overrideMimeType(c.getLayout().getContentType()), n.onreadystatechange = function () {
              if (4 == n.readyState) {
                if (isHttpRequestSuccessful(n))
                  g && g(n), o && o(n);
                else {
                  var t = 'AjaxAppender.append: XMLHttpRequest request to URL ' + e + ' returned status code ' + n.status;
                  handleError(t), v && v(t);
                }
                n.onreadystatechange = emptyFunction, n = null;
              }
            }, n.open('POST', e, !0);
            try {
              for (var i, r = 0; i = k[r++];)
                n.setRequestHeader(i.name, i.value);
              n.setRequestHeader('Content-Type', y);
            } catch (a) {
              var l = 'AjaxAppender.append: your browser\'s XMLHttpRequest implementation does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled';
              return handleError(l), u = !1, v && v(l), void 0;
            }
            n.send(t);
          }
        } catch (d) {
          var p = 'AjaxAppender.append: error sending log message to ' + e;
          handleError(p, d), u = !1, v && v(p + '. Details: ' + getExceptionStringRep(d));
        }
      }
      function l() {
        if (x = !0, b) {
          var e = window.onbeforeunload;
          window.onbeforeunload = function () {
            return e && e(), n() ? 'Sending log messages' : void 0;
          };
        }
        d && r();
      }
      var c = this, u = !0;
      e || (handleError('AjaxAppender: URL must be specified in constructor'), u = !1);
      var d = this.defaults.timed, p = this.defaults.waitForResponse, f = this.defaults.batchSize, h = this.defaults.timerInterval, g = this.defaults.requestSuccessCallback, v = this.defaults.failCallback, m = this.defaults.postVarName, b = this.defaults.sendAllOnUnload, y = this.defaults.contentType, w = null, C = [], S = [], k = [], R = !1, x = !1;
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
        return h;
      }, this.setTimerInterval = function (e) {
        t('timerInterval') && (h = extractIntFromParam(e, h));
      }, this.isWaitForResponse = function () {
        return p;
      }, this.setWaitForResponse = function (e) {
        t('waitForResponse') && (p = bool(e));
      }, this.getBatchSize = function () {
        return f;
      }, this.setBatchSize = function (e) {
        t('batchSize') && (f = extractIntFromParam(e, f));
      }, this.isSendAllOnUnload = function () {
        return b;
      }, this.setSendAllOnUnload = function (e) {
        t('sendAllOnUnload') && (b = extractBooleanFromParam(e, b));
      }, this.setRequestSuccessCallback = function (e) {
        g = extractFunctionFromParam(e, g);
      }, this.setFailCallback = function (e) {
        v = extractFunctionFromParam(e, v);
      }, this.getPostVarName = function () {
        return m;
      }, this.setPostVarName = function (e) {
        t('postVarName') && (m = extractStringFromParam(e, m));
      }, this.getHeaders = function () {
        return k;
      }, this.addHeader = function (e, t) {
        'content-type' == e.toLowerCase() ? y = t : k.push({
          name: e,
          value: t
        });
      }, this.sendAll = o, this.sendAllRemaining = n, this.append = function (e) {
        if (u) {
          x || l(), C.push(e);
          var t = this.getLayout().allowBatching() ? f : 1;
          if (C.length >= t) {
            for (var n, i = []; n = C.shift();)
              i.push(n);
            S.push(i), d || p && (!p || R) || o();
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
          for (var t = 0, o = this.eventTypes.length; o > t; t++)
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
          for (var o = this.eventListeners[e], n = 0, i = o.length; i > n; n++)
            o[n](this, e, t);
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
      for (var t = [], o = 1, n = arguments.length; n > o; o++)
        t[o - 1] = arguments[o];
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
            var o = 'log4javascript error: ' + e;
            t && (o += newLine + newLine + 'Original error: ' + getExceptionStringRep(t)), alert(o);
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
        var o, n = e.lastIndexOf('.');
        if (n > -1) {
          var i = e.substring(0, n);
          o = log4javascript.getLogger(i);
        } else
          o = rootLogger;
        o.addChild(t);
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
    var LoggingEvent = function (e, t, o, n, i) {
      this.logger = e, this.timeStamp = t, this.timeStampInMilliseconds = t.getTime(), this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1000), this.milliseconds = this.timeStamp.getMilliseconds(), this.level = o, this.messages = n, this.exception = i;
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
        var o = [
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
        if (this.isTimeStampsInMilliseconds() || o.push([
            this.millisecondsKey,
            e.milliseconds
          ]), e.exception && o.push([
            this.exceptionKey,
            getExceptionStringRep(e.exception)
          ]), this.hasCustomFields())
          for (var n = 0, i = this.customFields.length; i > n; n++) {
            var r = this.customFields[n].value;
            'function' == typeof r && (r = r(this, e)), o.push([
              this.customFields[n].name,
              r
            ]);
          }
        return o;
      },
      setKeys: function (e, t, o, n, i, r, s) {
        this.loggerKey = extractStringFromParam(e, this.defaults.loggerKey), this.timeStampKey = extractStringFromParam(t, this.defaults.timeStampKey), this.levelKey = extractStringFromParam(o, this.defaults.levelKey), this.messageKey = extractStringFromParam(n, this.defaults.messageKey), this.exceptionKey = extractStringFromParam(i, this.defaults.exceptionKey), this.urlKey = extractStringFromParam(r, this.defaults.urlKey), this.millisecondsKey = extractStringFromParam(s, this.defaults.millisecondsKey);
      },
      setCustomField: function (e, t) {
        for (var o = !1, n = 0, i = this.customFields.length; i > n; n++)
          this.customFields[n].name === e && (this.customFields[n].value = t, o = !0);
        o || this.customFields.push({
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
      var o, n, i = this, r = '<log4javascript:event logger="' + e.logger.name + '" timestamp="' + this.getTimeStampValue(e) + '"';
      if (this.isTimeStampsInMilliseconds() || (r += ' milliseconds="' + e.milliseconds + '"'), r += ' level="' + e.level.name + '">' + newLine, this.combineMessages)
        r += t(e.getCombinedMessages());
      else {
        for (r += '<log4javascript:messages>' + newLine, o = 0, n = e.messages.length; n > o; o++)
          r += t(e.messages[o]) + newLine;
        r += '</log4javascript:messages>' + newLine;
      }
      if (this.hasCustomFields())
        for (o = 0, n = this.customFields.length; n > o; o++)
          r += '<log4javascript:customfield name="' + this.customFields[o].name + '"><![CDATA[' + ('' + this.customFields[o].value) + ']]></log4javascript:customfield>' + newLine;
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
      function t(e, o, n) {
        var r, s = typeof e;
        if (e instanceof Date)
          r = e.getTime() + '';
        else if (n && e instanceof Array) {
          r = '[' + i.lineBreak;
          for (var a = 0, l = e.length; l > a; a++) {
            var c = o + i.tab;
            r += c + t(e[a], c, !1), e.length - 1 > a && (r += ','), r += i.lineBreak;
          }
          r += o + ']';
        } else
          r = 'number' !== s && 'boolean' !== s ? '"' + escapeNewLines(toStr(e).replace(/\"/g, '\\"')) + '"' : e;
        return r;
      }
      var o, n, i = this, r = this.getDataValues(e, this.combineMessages), s = '{' + this.lineBreak;
      for (o = 0, n = r.length - 1; n >= o; o++)
        s += this.tab + '"' + r[o][0] + '"' + this.colon + t(r[o][1], this.tab, !0), n > o && (s += ','), s += this.lineBreak;
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
      for (var t = this.getDataValues(e), o = [], n = 0, i = t.length; i > n; n++) {
        var r = t[n][1] instanceof Date ? t[n][1].getTime() + '' : t[n][1];
        o.push(urlEncode(t[n][0]) + '=' + urlEncode(r));
      }
      return o.join('&');
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
        ], o = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ], n = 0, i = 1, r = 2, s = 3, a = 4, l = 5, c = {
          G: n,
          y: s,
          M: a,
          w: r,
          W: r,
          D: r,
          d: r,
          F: r,
          E: i,
          a: n,
          H: r,
          k: r,
          K: r,
          h: r,
          m: r,
          s: r,
          S: r,
          Z: l
        }, u = 86400000, d = 7 * u, p = 1, f = function (e, t, o) {
          var n = new Date(e, t, o, 0, 0, 0);
          return n.setMilliseconds(0), n;
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
        return f(t.getFullYear(), t.getMonth(), t.getDate());
      }, Date.prototype.getWeekInYear = function (e) {
        isUndefined(this.minimalDaysInFirstWeek) && (e = p);
        var t = this.getPreviousSunday(), o = f(this.getFullYear(), 0, 1), n = t.isBefore(o) ? 0 : 1 + Math.floor(t.getTimeSince(o) / d), i = 7 - o.getDay(), r = n;
        return e > i && r--, r;
      }, Date.prototype.getWeekInMonth = function (e) {
        isUndefined(this.minimalDaysInFirstWeek) && (e = p);
        var t = this.getPreviousSunday(), o = f(this.getFullYear(), this.getMonth(), 1), n = t.isBefore(o) ? 0 : 1 + Math.floor(t.getTimeSince(o) / d), i = 7 - o.getDay(), r = n;
        return i >= e && r++, r;
      }, Date.prototype.getDayInYear = function () {
        var e = f(this.getFullYear(), 0, 1);
        return 1 + Math.floor(this.getTimeSince(e) / u);
      }, SimpleDateFormat = function (e) {
        this.formatString = e;
      }, SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function (e) {
        this.minimalDaysInFirstWeek = e;
      }, SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function () {
        return isUndefined(this.minimalDaysInFirstWeek) ? p : this.minimalDaysInFirstWeek;
      };
      var h = function (e, t) {
          for (; t > e.length;)
            e = '0' + e;
          return e;
        }, g = function (e, t, o) {
          return t >= 4 ? e : e.substr(0, Math.max(o, t));
        }, v = function (e, t) {
          var o = '' + e;
          return h(o, t);
        };
      SimpleDateFormat.prototype.format = function (u) {
        for (var d, p = '', f = this.formatString; d = e.exec(f);) {
          var m = d[1], b = d[2], y = d[3], w = d[4];
          if (m)
            p += '\'\'' == m ? '\'' : m.substring(1, m.length - 1);
          else if (y);
          else if (w)
            p += w;
          else if (b) {
            var C = b.charAt(0), S = b.length, k = '';
            switch (C) {
            case 'G':
              k = 'AD';
              break;
            case 'y':
              k = u.getFullYear();
              break;
            case 'M':
              k = u.getMonth();
              break;
            case 'w':
              k = u.getWeekInYear(this.getMinimalDaysInFirstWeek());
              break;
            case 'W':
              k = u.getWeekInMonth(this.getMinimalDaysInFirstWeek());
              break;
            case 'D':
              k = u.getDayInYear();
              break;
            case 'd':
              k = u.getDate();
              break;
            case 'F':
              k = 1 + Math.floor((u.getDate() - 1) / 7);
              break;
            case 'E':
              k = o[u.getDay()];
              break;
            case 'a':
              k = u.getHours() >= 12 ? 'PM' : 'AM';
              break;
            case 'H':
              k = u.getHours();
              break;
            case 'k':
              k = u.getHours() || 24;
              break;
            case 'K':
              k = u.getHours() % 12;
              break;
            case 'h':
              k = u.getHours() % 12 || 12;
              break;
            case 'm':
              k = u.getMinutes();
              break;
            case 's':
              k = u.getSeconds();
              break;
            case 'S':
              k = u.getMilliseconds();
              break;
            case 'Z':
              k = u.getTimezoneOffset();
            }
            switch (c[C]) {
            case n:
              p += g(k, S, 2);
              break;
            case i:
              p += g(k, S, 3);
              break;
            case r:
              p += v(k, S);
              break;
            case s:
              if (3 >= S) {
                var R = '' + k;
                p += R.substr(2, 2);
              } else
                p += v(k, S);
              break;
            case a:
              p += S >= 3 ? g(t[k], S, S) : v(k + 1, S);
              break;
            case l:
              var x = k > 0, I = x ? '-' : '+', T = Math.abs(k), A = '' + Math.floor(T / 60);
              A = h(A, 2);
              var M = '' + T % 60;
              M = h(M, 2), p += I + A + M;
            }
          }
          f = f.substr(d.index + d[0].length);
        }
        return p;
      };
    }(), log4javascript.SimpleDateFormat = SimpleDateFormat, PatternLayout.TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n', PatternLayout.DEFAULT_CONVERSION_PATTERN = '%m%n', PatternLayout.ISO8601_DATEFORMAT = 'yyyy-MM-dd HH:mm:ss,SSS', PatternLayout.DATETIME_DATEFORMAT = 'dd MMM yyyy HH:mm:ss,SSS', PatternLayout.ABSOLUTETIME_DATEFORMAT = 'HH:mm:ss,SSS', PatternLayout.prototype = new Layout(), PatternLayout.prototype.format = function (e) {
      for (var t, o = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/, n = '', i = this.pattern; t = o.exec(i);) {
        var r = t[0], s = t[1], a = t[2], l = t[3], c = t[5], u = t[6];
        if (u)
          n += '' + u;
        else {
          var d = '';
          switch (l) {
          case 'a':
          case 'm':
            var p = 0;
            c && (p = parseInt(c, 10), isNaN(p) && (handleError('PatternLayout.format: invalid specifier \'' + c + '\' for conversion character \'' + l + '\' - should be a number'), p = 0));
            for (var f = 'a' === l ? e.messages[0] : e.messages, h = 0, g = f.length; g > h; h++)
              h > 0 && ' ' !== d.charAt(d.length - 1) && (d += ' '), d += 0 === p ? f[h] : formatObjectExpansion(f[h], p);
            break;
          case 'c':
            var v = e.logger.name;
            if (c) {
              var m = parseInt(c, 10), b = e.logger.name.split('.');
              d = m >= b.length ? v : b.slice(b.length - m).join('.');
            } else
              d = v;
            break;
          case 'd':
            var y = PatternLayout.ISO8601_DATEFORMAT;
            c && (y = c, 'ISO8601' == y ? y = PatternLayout.ISO8601_DATEFORMAT : 'ABSOLUTE' == y ? y = PatternLayout.ABSOLUTETIME_DATEFORMAT : 'DATE' == y && (y = PatternLayout.DATETIME_DATEFORMAT)), d = new SimpleDateFormat(y).format(e.timeStamp);
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
            var k = d.length;
            k > S && (d = d.substring(k - S, k));
          }
          if (s)
            if ('-' == s.charAt(0))
              for (S = parseInt(s.substr(1), 10); S > d.length;)
                d += ' ';
            else
              for (S = parseInt(s, 10); S > d.length;)
                d = ' ' + d;
          n += d;
        }
        i = i.substr(t.index + t[0].length);
      }
      return n;
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
        for (var t, o = null, n = 0, i = xmlHttpFactories.length; i > n; n++) {
          t = xmlHttpFactories[n];
          try {
            return o = t(), getXmlHttp = t, o;
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