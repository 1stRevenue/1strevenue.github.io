'use strict';
function f() {
  return function () {
  };
}
!function () {
  function c(a, b) {
    var c = Array.prototype.slice.call(arguments, 2);
    return function () {
      var d = c.concat(Array.prototype.slice.call(arguments, 0));
      a.apply(b, d);
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
  if (a.debug || (a.debug = a.log), a.info || (a.info = a.log), a.warn || (a.warn = a.log), a.error || (a.error = a.log), (null != window.__consoleShimTest__ || eval('/*@cc_on @_jscript_version <= 9@*/')) && (b = function (b) {
      var c, d, e;
      if (b = Array.prototype.slice.call(arguments, 0), e = b.shift(), d = b.length, d > 1 && !1 !== window.__consoleShimTest__)
        for ('string' != typeof b[0] && (b.unshift('%o'), d += 1), c = (c = b[0].match(/%[a-z]/g)) ? c.length + 1 : 1; d > c; c += 1)
          b[0] += ' %o';
      Function.apply.call(e, a, b);
    }, a.log = c(b, window, a.log), a.debug = c(b, window, a.debug), a.info = c(b, window, a.info), a.warn = c(b, window, a.warn), a.error = c(b, window, a.error)), a.assert || (a.assert = function () {
      var b = Array.prototype.slice.call(arguments, 0);
      b.shift() || (b[0] = 'Assertion failed: ' + b[0], a.error.apply(a, b));
    }), a.dir || (a.dir = a.log), a.dirxml || (a.dirxml = a.log), a.exception || (a.exception = a.error), !a.time || !a.timeEnd) {
    var g = {};
    a.time = function (a) {
      g[a] = new Date().getTime();
    }, a.timeEnd = function (b) {
      var c = g[b];
      c && (a.log(b + ': ' + (new Date().getTime() - c) + 'ms'), delete g[b]);
    };
  }
  a.table || (a.table = function (b, c) {
    var d, e, f, g, h;
    if (b && b instanceof Array && b.length) {
      if (!(c && c instanceof Array))
        for (d in c = [], b[0])
          b[0].hasOwnProperty(d) && c.push(d);
      for (d = 0, e = b.length; e > d; d += 1) {
        for (f = [], g = 0, h = c.length; h > g; g += 1)
          f.push(b[d][c[g]]);
        Function.apply.call(a.log, a, f);
      }
    }
  }), a.clear || (a.clear = f()), a.trace || (a.trace = f()), a.group || (a.group = f()), a.groupCollapsed || (a.groupCollapsed = f()), a.groupEnd || (a.groupEnd = f()), a.timeStamp || (a.timeStamp = f()), a.profile || (a.profile = f()), a.profileEnd || (a.profileEnd = f()), a.count || (a.count = f());
}(), Array.prototype.push || (Array.prototype.push = function () {
  for (var a = 0, b = arguments.length; b > a; a++)
    this[this.length] = arguments[a];
  return this.length;
}), Array.prototype.shift || (Array.prototype.shift = function () {
  if (this.length > 0) {
    for (var a = this[0], b = 0, c = this.length - 1; c > b; b++)
      this[b] = this[b + 1];
    return this.length = this.length - 1, a;
  }
}), Array.prototype.splice || (Array.prototype.splice = function (a, b) {
  var c = this.slice(a + b), d = this.slice(a, a + b);
  this.length = a;
  for (var e = [], f = 0, g = arguments.length; g > f; f++)
    e[f] = arguments[f];
  var h = e.length > 2 ? c = e.slice(2).concat(c) : c;
  for (f = 0, g = h.length; g > f; f++)
    this.push(h[f]);
  return d;
});
var log4javascript = function () {
    function isUndefined(a) {
      return 'undefined' == typeof a;
    }
    function EventSupport() {
    }
    function Log4JavaScript() {
    }
    function toStr(a) {
      return a && a.toString ? a.toString() : String(a);
    }
    function getExceptionMessage(a) {
      return a.message ? a.message : a.description ? a.description : toStr(a);
    }
    function getUrlFileName(a) {
      var b = Math.max(a.lastIndexOf('/'), a.lastIndexOf('\\'));
      return a.substr(b + 1);
    }
    function getExceptionStringRep(a) {
      if (a) {
        var b = 'Exception: ' + getExceptionMessage(a);
        try {
          a.lineNumber && (b += ' on line number ' + a.lineNumber), a.fileName && (b += ' in file ' + getUrlFileName(a.fileName));
        } catch (c) {
          logLog.warn('Unable to obtain file and line information for error');
        }
        return showStackTraces && a.stack && (b += newLine + 'Stack trace:' + newLine + a.stack), b;
      }
      return null;
    }
    function bool(a) {
      return Boolean(a);
    }
    function trim(a) {
      return a.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    function splitIntoLines(a) {
      var b = a.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      return b.split('\n');
    }
    function array_remove(a, b) {
      for (var c = -1, d = 0, e = a.length; e > d; d++)
        if (a[d] === b) {
          c = d;
          break;
        }
      return c >= 0 ? (a.splice(c, 1), !0) : !1;
    }
    function array_contains(a, b) {
      for (var c = 0, d = a.length; d > c; c++)
        if (a[c] == b)
          return !0;
      return !1;
    }
    function extractBooleanFromParam(a, b) {
      return isUndefined(a) ? b : bool(a);
    }
    function extractStringFromParam(a, b) {
      return isUndefined(a) ? b : String(a);
    }
    function extractIntFromParam(a, b) {
      if (isUndefined(a))
        return b;
      try {
        var c = parseInt(a, 10);
        return isNaN(c) ? b : c;
      } catch (d) {
        return logLog.warn('Invalid int param ' + a, d), b;
      }
    }
    function extractFunctionFromParam(a, b) {
      return 'function' == typeof a ? a : b;
    }
    function isError(a) {
      return a instanceof Error;
    }
    function getListenersPropertyName(a) {
      return '__log4javascript_listeners__' + a;
    }
    function addEvent(a, b, c, d, e) {
      if (e = e ? e : window, a.addEventListener)
        a.addEventListener(b, c, d);
      else if (a.attachEvent)
        a.attachEvent('on' + b, c);
      else {
        var f = getListenersPropertyName(b);
        a[f] || (a[f] = [], a['on' + b] = function (a) {
          a = getEvent(a, e);
          for (var c, d = getListenersPropertyName(b), f = this[d].concat([]); c = f.shift();)
            c.call(this, a);
        }), a[f].push(c);
      }
    }
    function removeEvent(a, b, c, d) {
      if (a.removeEventListener)
        a.removeEventListener(b, c, d);
      else if (a.detachEvent)
        a.detachEvent('on' + b, c);
      else {
        var e = getListenersPropertyName(b);
        a[e] && array_remove(a[e], c);
      }
    }
    function getEvent(a, b) {
      return b = b ? b : window, a ? a : b.event;
    }
    function stopEventPropagation(a) {
      a.stopPropagation ? a.stopPropagation() : 'undefined' != typeof a.cancelBubble && (a.cancelBubble = !0), a.returnValue = !1;
    }
    function handleError(a, b) {
      logLog.error(a, b), log4javascript.dispatchEvent('error', {
        message: a,
        exception: b
      });
    }
    function Timer(a, b) {
      this.name = a, this.level = isUndefined(b) ? Level.INFO : b, this.start = new Date();
    }
    function Logger(a) {
      this.name = a, this.parent = null, this.children = [];
      var b = [], c = null, d = this.name === rootLoggerName, e = this.name === nullLoggerName, f = null, g = !1;
      this.addChild = function (a) {
        this.children.push(a), a.parent = this, a.invalidateAppenderCache();
      };
      var h = !0;
      this.getAdditivity = function () {
        return h;
      }, this.setAdditivity = function (a) {
        var b = h != a;
        h = a, b && this.invalidateAppenderCache();
      }, this.addAppender = function (a) {
        e ? handleError('Logger.addAppender: you may not add an appender to the null logger') : a instanceof log4javascript.Appender ? array_contains(b, a) || (b.push(a), a.setAddedToLogger(this), this.invalidateAppenderCache()) : handleError('Logger.addAppender: appender supplied (\'' + toStr(a) + '\') is not a subclass of Appender');
      }, this.removeAppender = function (a) {
        array_remove(b, a), a.setRemovedFromLogger(this), this.invalidateAppenderCache();
      }, this.removeAllAppenders = function () {
        var a = b.length;
        if (a > 0) {
          for (var c = 0; a > c; c++)
            b[c].setRemovedFromLogger(this);
          b.length = 0, this.invalidateAppenderCache();
        }
      }, this.getEffectiveAppenders = function () {
        if (null === f || g) {
          var a = d || !this.getAdditivity() ? [] : this.parent.getEffectiveAppenders();
          f = a.concat(b), g = !1;
        }
        return f;
      }, this.invalidateAppenderCache = function () {
        g = !0;
        for (var a = 0, b = this.children.length; b > a; a++)
          this.children[a].invalidateAppenderCache();
      }, this.log = function (a, b) {
        if (enabled && a.isGreaterOrEqual(this.getEffectiveLevel())) {
          var c, d = b.length - 1, e = b[d];
          b.length > 1 && isError(e) && (c = e, d--);
          for (var f = [], g = 0; d >= g; g++)
            f[g] = b[g];
          var h = new LoggingEvent(this, new Date(), a, f, c);
          this.callAppenders(h);
        }
      }, this.callAppenders = function (a) {
        for (var b = this.getEffectiveAppenders(), c = 0, d = b.length; d > c; c++)
          b[c].doAppend(a);
      }, this.setLevel = function (a) {
        d && null === a ? handleError('Logger.setLevel: you cannot set the level of the root logger to null') : a instanceof Level ? c = a : handleError('Logger.setLevel: level supplied to logger ' + this.name + ' is not an instance of log4javascript.Level');
      }, this.getLevel = function () {
        return c;
      }, this.getEffectiveLevel = function () {
        for (var a = this; null !== a; a = a.parent) {
          var b = a.getLevel();
          if (null !== b)
            return b;
        }
      }, this.group = function (a, b) {
        if (enabled)
          for (var c = this.getEffectiveAppenders(), d = 0, e = c.length; e > d; d++)
            c[d].group(a, b);
      }, this.groupEnd = function () {
        if (enabled)
          for (var a = this.getEffectiveAppenders(), b = 0, c = a.length; c > b; b++)
            a[b].groupEnd();
      };
      var i = {};
      this.time = function (a, b) {
        enabled && (isUndefined(a) ? handleError('Logger.time: a name for the timer must be supplied') : !b || b instanceof Level ? i[a] = new Timer(a, b) : handleError('Logger.time: level supplied to timer ' + a + ' is not an instance of log4javascript.Level'));
      }, this.timeEnd = function (a) {
        if (enabled)
          if (isUndefined(a))
            handleError('Logger.timeEnd: a name for the timer must be supplied');
          else if (i[a]) {
            var b = i[a], c = b.getElapsedTime();
            this.log(b.level, ['Timer ' + toStr(a) + ' completed in ' + c + 'ms']), delete i[a];
          } else
            logLog.warn('Logger.timeEnd: no timer found with name ' + a);
      }, this.assert = function (a) {
        if (enabled && !a) {
          for (var b = [], c = 1, d = arguments.length; d > c; c++)
            b.push(arguments[c]);
          b = b.length > 0 ? b : ['Assertion Failure'], b.push(newLine), b.push(a), this.log(Level.ERROR, b);
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
    function XmlLayout(a) {
      this.combineMessages = extractBooleanFromParam(a, !0), this.customFields = [];
    }
    function escapeNewLines(a) {
      return a.replace(/\r\n|\r|\n/g, '\\r\\n');
    }
    function JsonLayout(a, b) {
      this.readable = extractBooleanFromParam(a, !1), this.combineMessages = extractBooleanFromParam(b, !0), this.batchHeader = this.readable ? '[' + newLine : '[', this.batchFooter = this.readable ? ']' + newLine : ']', this.batchSeparator = this.readable ? ',' + newLine : ',', this.setKeys(), this.colon = this.readable ? ': ' : ':', this.tab = this.readable ? '\t' : '', this.lineBreak = this.readable ? newLine : '', this.customFields = [];
    }
    function HttpPostDataLayout() {
      this.setKeys(), this.customFields = [], this.returnsPostData = !0;
    }
    function formatObjectExpansion(a, b, c) {
      function d(a, b, c) {
        function f(a) {
          for (var b = splitIntoLines(a), d = 1, e = b.length; e > d; d++)
            b[d] = c + b[d];
          return b.join(newLine);
        }
        var g, h, i, j, k, l, m;
        if (c || (c = ''), null === a)
          return 'null';
        if ('undefined' == typeof a)
          return 'undefined';
        if ('string' == typeof a)
          return f(a);
        if ('object' == typeof a && array_contains(e, a)) {
          try {
            l = toStr(a);
          } catch (n) {
            l = 'Error formatting property. Details: ' + getExceptionStringRep(n);
          }
          return l + ' [already expanded]';
        }
        if (a instanceof Array && b > 0) {
          for (e.push(a), l = '[' + newLine, i = b - 1, j = c + '  ', k = [], g = 0, h = a.length; h > g; g++)
            try {
              m = d(a[g], i, j), k.push(j + m);
            } catch (n) {
              k.push(j + 'Error formatting array member. Details: ' + getExceptionStringRep(n));
            }
          return l += k.join(',' + newLine) + newLine + c + ']';
        }
        if ('[object Date]' == Object.prototype.toString.call(a))
          return a.toString();
        if ('object' == typeof a && b > 0) {
          e.push(a), l = '{' + newLine, i = b - 1, j = c + '  ', k = [];
          for (g in a)
            try {
              m = d(a[g], i, j), k.push(j + g + ': ' + m);
            } catch (n) {
              k.push(j + g + ': Error formatting property. Details: ' + getExceptionStringRep(n));
            }
          return l += k.join(',' + newLine) + newLine + c + '}';
        }
        return f(toStr(a));
      }
      var e = [];
      return d(a, b, c);
    }
    function PatternLayout(a) {
      this.pattern = a ? a : PatternLayout.DEFAULT_CONVERSION_PATTERN, this.customFields = [];
    }
    function isHttpRequestSuccessful(a) {
      return isUndefined(a.status) || 0 === a.status || a.status >= 200 && a.status < 300;
    }
    function AjaxAppender(a) {
      function b(a) {
        return z ? (handleError('AjaxAppender: configuration option \'' + a + '\' may not be set after the appender has been initialized'), !1) : !0;
      }
      function c() {
        if (k && enabled) {
          y = !0;
          var a;
          if (m)
            w.length > 0 ? (a = w.shift(), h(e(a), c)) : (y = !1, l && f());
          else {
            for (; a = w.shift();)
              h(e(a));
            y = !1, l && f();
          }
        }
      }
      function d() {
        var a = !1;
        if (k && enabled) {
          for (var b, d = j.getLayout().allowBatching() ? n : 1, e = []; b = v.shift();)
            e.push(b), v.length >= d && (w.push(e), e = []);
          e.length > 0 && w.push(e), a = w.length > 0, m = !1, l = !1, c();
        }
        return a;
      }
      function e(a) {
        for (var b, c = [], d = ''; b = a.shift();) {
          var e = j.getLayout().format(b);
          j.getLayout().ignoresThrowable() && (e += b.getThrowableStrRep()), c.push(e);
        }
        return d = 1 == a.length ? c.join('') : j.getLayout().batchHeader + c.join(j.getLayout().batchSeparator) + j.getLayout().batchFooter, t == j.defaults.contentType && (d = j.getLayout().returnsPostData ? d : urlEncode(r) + '=' + urlEncode(d), d.length > 0 && (d += '&'), d += 'layout=' + urlEncode(j.getLayout().toString())), d;
      }
      function f() {
        window.setTimeout(c, o);
      }
      function g() {
        var a = 'AjaxAppender: could not create XMLHttpRequest object. AjaxAppender disabled';
        handleError(a), k = !1, q && q(a);
      }
      function h(b, c) {
        try {
          var d = getXmlHttp(g);
          if (k) {
            d.overrideMimeType && d.overrideMimeType(j.getLayout().getContentType()), d.onreadystatechange = function () {
              if (4 == d.readyState) {
                if (isHttpRequestSuccessful(d))
                  p && p(d), c && c(d);
                else {
                  var b = 'AjaxAppender.append: XMLHttpRequest request to URL ' + a + ' returned status code ' + d.status;
                  handleError(b), q && q(b);
                }
                d.onreadystatechange = emptyFunction, d = null;
              }
            }, d.open('POST', a, !0);
            try {
              for (var e, f = 0; e = x[f++];)
                d.setRequestHeader(e.name, e.value);
              d.setRequestHeader('Content-Type', t);
            } catch (h) {
              var i = 'AjaxAppender.append: your browser\'s XMLHttpRequest implementation does not support setRequestHeader, therefore cannot post data. AjaxAppender disabled';
              return handleError(i), k = !1, q && q(i), void 0;
            }
            d.send(b);
          }
        } catch (l) {
          var m = 'AjaxAppender.append: error sending log message to ' + a;
          handleError(m, l), k = !1, q && q(m + '. Details: ' + getExceptionStringRep(l));
        }
      }
      function i() {
        if (z = !0, s) {
          var a = window.onbeforeunload;
          window.onbeforeunload = function () {
            return a && a(), d() ? 'Sending log messages' : void 0;
          };
        }
        l && f();
      }
      var j = this, k = !0;
      a || (handleError('AjaxAppender: URL must be specified in constructor'), k = !1);
      var l = this.defaults.timed, m = this.defaults.waitForResponse, n = this.defaults.batchSize, o = this.defaults.timerInterval, p = this.defaults.requestSuccessCallback, q = this.defaults.failCallback, r = this.defaults.postVarName, s = this.defaults.sendAllOnUnload, t = this.defaults.contentType, u = null, v = [], w = [], x = [], y = !1, z = !1;
      this.getSessionId = function () {
        return u;
      }, this.setSessionId = function (a) {
        u = extractStringFromParam(a, null), this.layout.setCustomField('sessionid', u);
      }, this.setLayout = function (a) {
        b('layout') && (this.layout = a, null !== u && this.setSessionId(u));
      }, this.isTimed = function () {
        return l;
      }, this.setTimed = function (a) {
        b('timed') && (l = bool(a));
      }, this.getTimerInterval = function () {
        return o;
      }, this.setTimerInterval = function (a) {
        b('timerInterval') && (o = extractIntFromParam(a, o));
      }, this.isWaitForResponse = function () {
        return m;
      }, this.setWaitForResponse = function (a) {
        b('waitForResponse') && (m = bool(a));
      }, this.getBatchSize = function () {
        return n;
      }, this.setBatchSize = function (a) {
        b('batchSize') && (n = extractIntFromParam(a, n));
      }, this.isSendAllOnUnload = function () {
        return s;
      }, this.setSendAllOnUnload = function (a) {
        b('sendAllOnUnload') && (s = extractBooleanFromParam(a, s));
      }, this.setRequestSuccessCallback = function (a) {
        p = extractFunctionFromParam(a, p);
      }, this.setFailCallback = function (a) {
        q = extractFunctionFromParam(a, q);
      }, this.getPostVarName = function () {
        return r;
      }, this.setPostVarName = function (a) {
        b('postVarName') && (r = extractStringFromParam(a, r));
      }, this.getHeaders = function () {
        return x;
      }, this.addHeader = function (a, b) {
        'content-type' == a.toLowerCase() ? t = b : x.push({
          name: a,
          value: b
        });
      }, this.sendAll = c, this.sendAllRemaining = d, this.append = function (a) {
        if (k) {
          z || i(), v.push(a);
          var b = this.getLayout().allowBatching() ? n : 1;
          if (v.length >= b) {
            for (var d, e = []; d = v.shift();)
              e.push(d);
            w.push(e), l || m && (!m || y) || c();
          }
        }
      };
    }
    EventSupport.prototype = {
      eventTypes: [],
      eventListeners: {},
      setEventTypes: function (a) {
        if (a instanceof Array) {
          this.eventTypes = a, this.eventListeners = {};
          for (var b = 0, c = this.eventTypes.length; c > b; b++)
            this.eventListeners[this.eventTypes[b]] = [];
        } else
          handleError('log4javascript.EventSupport [' + this + ']: setEventTypes: eventTypes parameter must be an Array');
      },
      addEventListener: function (a, b) {
        'function' == typeof b ? (array_contains(this.eventTypes, a) || handleError('log4javascript.EventSupport [' + this + ']: addEventListener: no event called \'' + a + '\''), this.eventListeners[a].push(b)) : handleError('log4javascript.EventSupport [' + this + ']: addEventListener: listener must be a function');
      },
      removeEventListener: function (a, b) {
        'function' == typeof b ? (array_contains(this.eventTypes, a) || handleError('log4javascript.EventSupport [' + this + ']: removeEventListener: no event called \'' + a + '\''), array_remove(this.eventListeners[a], b)) : handleError('log4javascript.EventSupport [' + this + ']: removeEventListener: listener must be a function');
      },
      dispatchEvent: function (a, b) {
        if (array_contains(this.eventTypes, a))
          for (var c = this.eventListeners[a], d = 0, e = c.length; e > d; d++)
            c[d](this, a, b);
        else
          handleError('log4javascript.EventSupport [' + this + ']: dispatchEvent: no event called \'' + a + '\'');
      }
    };
    var applicationStartDate = new Date(), uniqueId = 'log4javascript_' + applicationStartDate.getTime() + '_' + Math.floor(100000000 * Math.random()), emptyFunction = function () {
      }, newLine = '\r\n', pageLoaded = !1;
    Log4JavaScript.prototype = new EventSupport(), log4javascript = new Log4JavaScript(), log4javascript.version = '1.4.5', log4javascript.edition = 'log4javascript_production';
    var urlEncode = 'undefined' != typeof window.encodeURIComponent ? function (a) {
        return encodeURIComponent(a);
      } : function (a) {
        return escape(a).replace(/\+/g, '%2B').replace(/"/g, '%22').replace(/'/g, '%27').replace(/\//g, '%2F').replace(/=/g, '%3D');
      }, urlDecode = 'undefined' != typeof window.decodeURIComponent ? function (a) {
        return decodeURIComponent(a);
      } : function (a) {
        return unescape(a).replace(/%2B/g, '+').replace(/%22/g, '"').replace(/%27/g, '\'').replace(/%2F/g, '/').replace(/%3D/g, '=');
      };
    Function.prototype.apply || (Function.prototype.apply = function (obj, args) {
      var methodName = '__apply__';
      'undefined' != typeof obj[methodName] && (methodName += String(Math.random()).substr(2)), obj[methodName] = this;
      for (var argsStrings = [], i = 0, len = args.length; len > i; i++)
        argsStrings[i] = 'args[' + i + ']';
      var script = 'obj.' + methodName + '(' + argsStrings.join(',') + ')', returnValue = eval(script);
      return delete obj[methodName], returnValue;
    }), Function.prototype.call || (Function.prototype.call = function (a) {
      for (var b = [], c = 1, d = arguments.length; d > c; c++)
        b[c - 1] = arguments[c];
      return this.apply(a, b);
    });
    var logLog = {
        quietMode: !1,
        debugMessages: [],
        setQuietMode: function (a) {
          this.quietMode = bool(a);
        },
        numberOfErrors: 0,
        alertAllErrors: !1,
        setAlertAllErrors: function (a) {
          this.alertAllErrors = a;
        },
        debug: function (a) {
          this.debugMessages.push(a);
        },
        displayDebug: function () {
          alert(this.debugMessages.join(newLine));
        },
        warn: function () {
        },
        error: function (a, b) {
          if ((1 == ++this.numberOfErrors || this.alertAllErrors) && !this.quietMode) {
            var c = 'log4javascript error: ' + a;
            b && (c += newLine + newLine + 'Original error: ' + getExceptionStringRep(b)), alert(c);
          }
        }
      };
    log4javascript.logLog = logLog, log4javascript.setEventTypes([
      'load',
      'error'
    ]), log4javascript.handleError = handleError;
    var enabled = !('undefined' != typeof log4javascript_disabled && log4javascript_disabled);
    log4javascript.setEnabled = function (a) {
      enabled = bool(a);
    }, log4javascript.isEnabled = function () {
      return enabled;
    };
    var useTimeStampsInMilliseconds = !0;
    log4javascript.setTimeStampsInMilliseconds = function (a) {
      useTimeStampsInMilliseconds = bool(a);
    }, log4javascript.isTimeStampsInMilliseconds = function () {
      return useTimeStampsInMilliseconds;
    }, log4javascript.evalInScope = function (expr) {
      return eval(expr);
    };
    var showStackTraces = !1;
    log4javascript.setShowStackTraces = function (a) {
      showStackTraces = bool(a);
    };
    var Level = function (a, b) {
      this.level = a, this.name = b;
    };
    Level.prototype = {
      toString: function () {
        return this.name;
      },
      equals: function (a) {
        return this.level == a.level;
      },
      isGreaterOrEqual: function (a) {
        return this.level >= a.level;
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
      isEnabledFor: function (a) {
        return a.isGreaterOrEqual(this.getEffectiveLevel());
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
    }, log4javascript.getLogger = function (a) {
      if ('string' != typeof a && (a = anonymousLoggerName, logLog.warn('log4javascript.getLogger: non-string logger name ' + toStr(a) + ' supplied, returning anonymous logger')), a == rootLoggerName && handleError('log4javascript.getLogger: root logger may not be obtained by name'), !loggers[a]) {
        var b = new Logger(a);
        loggers[a] = b, loggerNames.push(a);
        var c, d = a.lastIndexOf('.');
        if (d > -1) {
          var e = a.substring(0, d);
          c = log4javascript.getLogger(e);
        } else
          c = rootLogger;
        c.addChild(b);
      }
      return loggers[a];
    };
    var defaultLogger = null;
    log4javascript.getDefaultLogger = function () {
      if (!defaultLogger) {
        defaultLogger = log4javascript.getLogger(defaultLoggerName);
        var a = new log4javascript.PopUpAppender();
        defaultLogger.addAppender(a);
      }
      return defaultLogger;
    };
    var nullLogger = null;
    log4javascript.getNullLogger = function () {
      return nullLogger || (nullLogger = new Logger(nullLoggerName), nullLogger.setLevel(Level.OFF)), nullLogger;
    }, log4javascript.resetConfiguration = function () {
      rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL), loggers = {};
    };
    var LoggingEvent = function (a, b, c, d, e) {
      this.logger = a, this.timeStamp = b, this.timeStampInMilliseconds = b.getTime(), this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1000), this.milliseconds = this.timeStamp.getMilliseconds(), this.level = c, this.messages = d, this.exception = e;
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
      setTimeStampsInMilliseconds: function (a) {
        this.overrideTimeStampsSetting = !0, this.useTimeStampsInMilliseconds = bool(a);
      },
      isTimeStampsInMilliseconds: function () {
        return this.overrideTimeStampsSetting ? this.useTimeStampsInMilliseconds : useTimeStampsInMilliseconds;
      },
      getTimeStampValue: function (a) {
        return this.isTimeStampsInMilliseconds() ? a.timeStampInMilliseconds : a.timeStampInSeconds;
      },
      getDataValues: function (a, b) {
        var c = [
            [
              this.loggerKey,
              a.logger.name
            ],
            [
              this.timeStampKey,
              this.getTimeStampValue(a)
            ],
            [
              this.levelKey,
              a.level.name
            ],
            [
              this.urlKey,
              window.location.href
            ],
            [
              this.messageKey,
              b ? a.getCombinedMessages() : a.messages
            ]
          ];
        if (this.isTimeStampsInMilliseconds() || c.push([
            this.millisecondsKey,
            a.milliseconds
          ]), a.exception && c.push([
            this.exceptionKey,
            getExceptionStringRep(a.exception)
          ]), this.hasCustomFields())
          for (var d = 0, e = this.customFields.length; e > d; d++) {
            var f = this.customFields[d].value;
            'function' == typeof f && (f = f(this, a)), c.push([
              this.customFields[d].name,
              f
            ]);
          }
        return c;
      },
      setKeys: function (a, b, c, d, e, f, g) {
        this.loggerKey = extractStringFromParam(a, this.defaults.loggerKey), this.timeStampKey = extractStringFromParam(b, this.defaults.timeStampKey), this.levelKey = extractStringFromParam(c, this.defaults.levelKey), this.messageKey = extractStringFromParam(d, this.defaults.messageKey), this.exceptionKey = extractStringFromParam(e, this.defaults.exceptionKey), this.urlKey = extractStringFromParam(f, this.defaults.urlKey), this.millisecondsKey = extractStringFromParam(g, this.defaults.millisecondsKey);
      },
      setCustomField: function (a, b) {
        for (var c = !1, d = 0, e = this.customFields.length; e > d; d++)
          this.customFields[d].name === a && (this.customFields[d].value = b, c = !0);
        c || this.customFields.push({
          name: a,
          value: b
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
    Appender.prototype = new EventSupport(), Appender.prototype.layout = new PatternLayout(), Appender.prototype.threshold = Level.ALL, Appender.prototype.loggers = [], Appender.prototype.doAppend = function (a) {
      enabled && a.level.level >= this.threshold.level && this.append(a);
    }, Appender.prototype.append = function () {
    }, Appender.prototype.setLayout = function (a) {
      a instanceof Layout ? this.layout = a : handleError('Appender.setLayout: layout supplied to ' + this.toString() + ' is not a subclass of Layout');
    }, Appender.prototype.getLayout = function () {
      return this.layout;
    }, Appender.prototype.setThreshold = function (a) {
      a instanceof Level ? this.threshold = a : handleError('Appender.setThreshold: threshold supplied to ' + this.toString() + ' is not a subclass of Level');
    }, Appender.prototype.getThreshold = function () {
      return this.threshold;
    }, Appender.prototype.setAddedToLogger = function (a) {
      this.loggers.push(a);
    }, Appender.prototype.setRemovedFromLogger = function (a) {
      array_remove(this.loggers, a);
    }, Appender.prototype.group = emptyFunction, Appender.prototype.groupEnd = emptyFunction, Appender.prototype.toString = function () {
      handleError('Appender.toString: all appenders must override this method');
    }, log4javascript.Appender = Appender, SimpleLayout.prototype = new Layout(), SimpleLayout.prototype.format = function (a) {
      return a.level.name + ' - ' + a.getCombinedMessages();
    }, SimpleLayout.prototype.ignoresThrowable = function () {
      return !0;
    }, SimpleLayout.prototype.toString = function () {
      return 'SimpleLayout';
    }, log4javascript.SimpleLayout = SimpleLayout, NullLayout.prototype = new Layout(), NullLayout.prototype.format = function (a) {
      return a.messages;
    }, NullLayout.prototype.ignoresThrowable = function () {
      return !0;
    }, NullLayout.prototype.toString = function () {
      return 'NullLayout';
    }, log4javascript.NullLayout = NullLayout, XmlLayout.prototype = new Layout(), XmlLayout.prototype.isCombinedMessages = function () {
      return this.combineMessages;
    }, XmlLayout.prototype.getContentType = function () {
      return 'text/xml';
    }, XmlLayout.prototype.escapeCdata = function (a) {
      return a.replace(/\]\]>/, ']]>]]&gt;<![CDATA[');
    }, XmlLayout.prototype.format = function (a) {
      function b(a) {
        return a = 'string' == typeof a ? a : toStr(a), '<log4javascript:message><![CDATA[' + e.escapeCdata(a) + ']]></log4javascript:message>';
      }
      var c, d, e = this, f = '<log4javascript:event logger="' + a.logger.name + '" timestamp="' + this.getTimeStampValue(a) + '"';
      if (this.isTimeStampsInMilliseconds() || (f += ' milliseconds="' + a.milliseconds + '"'), f += ' level="' + a.level.name + '">' + newLine, this.combineMessages)
        f += b(a.getCombinedMessages());
      else {
        for (f += '<log4javascript:messages>' + newLine, c = 0, d = a.messages.length; d > c; c++)
          f += b(a.messages[c]) + newLine;
        f += '</log4javascript:messages>' + newLine;
      }
      if (this.hasCustomFields())
        for (c = 0, d = this.customFields.length; d > c; c++)
          f += '<log4javascript:customfield name="' + this.customFields[c].name + '"><![CDATA[' + this.customFields[c].value.toString() + ']]></log4javascript:customfield>' + newLine;
      return a.exception && (f += '<log4javascript:exception><![CDATA[' + getExceptionStringRep(a.exception) + ']]></log4javascript:exception>' + newLine), f += '</log4javascript:event>' + newLine + newLine;
    }, XmlLayout.prototype.ignoresThrowable = function () {
      return !1;
    }, XmlLayout.prototype.toString = function () {
      return 'XmlLayout';
    }, log4javascript.XmlLayout = XmlLayout, JsonLayout.prototype = new Layout(), JsonLayout.prototype.isReadable = function () {
      return this.readable;
    }, JsonLayout.prototype.isCombinedMessages = function () {
      return this.combineMessages;
    }, JsonLayout.prototype.format = function (a) {
      function b(a, c, d) {
        var f, g = typeof a;
        if (a instanceof Date)
          f = String(a.getTime());
        else if (d && a instanceof Array) {
          f = '[' + e.lineBreak;
          for (var h = 0, i = a.length; i > h; h++) {
            var j = c + e.tab;
            f += j + b(a[h], j, !1), h < a.length - 1 && (f += ','), f += e.lineBreak;
          }
          f += c + ']';
        } else
          f = 'number' !== g && 'boolean' !== g ? '"' + escapeNewLines(toStr(a).replace(/\"/g, '\\"')) + '"' : a;
        return f;
      }
      var c, d, e = this, f = this.getDataValues(a, this.combineMessages), g = '{' + this.lineBreak;
      for (c = 0, d = f.length - 1; d >= c; c++)
        g += this.tab + '"' + f[c][0] + '"' + this.colon + b(f[c][1], this.tab, !0), d > c && (g += ','), g += this.lineBreak;
      return g += '}' + this.lineBreak;
    }, JsonLayout.prototype.ignoresThrowable = function () {
      return !1;
    }, JsonLayout.prototype.toString = function () {
      return 'JsonLayout';
    }, JsonLayout.prototype.getContentType = function () {
      return 'application/json';
    }, log4javascript.JsonLayout = JsonLayout, HttpPostDataLayout.prototype = new Layout(), HttpPostDataLayout.prototype.allowBatching = function () {
      return !1;
    }, HttpPostDataLayout.prototype.format = function (a) {
      for (var b = this.getDataValues(a), c = [], d = 0, e = b.length; e > d; d++) {
        var f = b[d][1] instanceof Date ? String(b[d][1].getTime()) : b[d][1];
        c.push(urlEncode(b[d][0]) + '=' + urlEncode(f));
      }
      return c.join('&');
    }, HttpPostDataLayout.prototype.ignoresThrowable = function () {
      return !1;
    }, HttpPostDataLayout.prototype.toString = function () {
      return 'HttpPostDataLayout';
    }, log4javascript.HttpPostDataLayout = HttpPostDataLayout;
    var SimpleDateFormat;
    !function () {
      var a = /('[^']*')|(G+|y+|M+|w+|W+|D+|d+|F+|E+|a+|H+|k+|K+|h+|m+|s+|S+|Z+)|([a-zA-Z]+)|([^a-zA-Z']+)/, b = [
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
        ], c = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ], d = 0, e = 1, f = 2, g = 3, h = 4, i = 5, j = {
          G: d,
          y: g,
          M: h,
          w: f,
          W: f,
          D: f,
          d: f,
          F: f,
          E: e,
          a: d,
          H: f,
          k: f,
          K: f,
          h: f,
          m: f,
          s: f,
          S: f,
          Z: i
        }, k = 86400000, l = 7 * k, m = 1, n = function (a, b, c) {
          var d = new Date(a, b, c, 0, 0, 0);
          return d.setMilliseconds(0), d;
        };
      Date.prototype.getDifference = function (a) {
        return this.getTime() - a.getTime();
      }, Date.prototype.isBefore = function (a) {
        return this.getTime() < a.getTime();
      }, Date.prototype.getUTCTime = function () {
        return Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
      }, Date.prototype.getTimeSince = function (a) {
        return this.getUTCTime() - a.getUTCTime();
      }, Date.prototype.getPreviousSunday = function () {
        var a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 12, 0, 0), b = new Date(a.getTime() - this.getDay() * k);
        return n(b.getFullYear(), b.getMonth(), b.getDate());
      }, Date.prototype.getWeekInYear = function (a) {
        isUndefined(this.minimalDaysInFirstWeek) && (a = m);
        var b = this.getPreviousSunday(), c = n(this.getFullYear(), 0, 1), d = b.isBefore(c) ? 0 : 1 + Math.floor(b.getTimeSince(c) / l), e = 7 - c.getDay(), f = d;
        return a > e && f--, f;
      }, Date.prototype.getWeekInMonth = function (a) {
        isUndefined(this.minimalDaysInFirstWeek) && (a = m);
        var b = this.getPreviousSunday(), c = n(this.getFullYear(), this.getMonth(), 1), d = b.isBefore(c) ? 0 : 1 + Math.floor(b.getTimeSince(c) / l), e = 7 - c.getDay(), f = d;
        return e >= a && f++, f;
      }, Date.prototype.getDayInYear = function () {
        var a = n(this.getFullYear(), 0, 1);
        return 1 + Math.floor(this.getTimeSince(a) / k);
      }, SimpleDateFormat = function (a) {
        this.formatString = a;
      }, SimpleDateFormat.prototype.setMinimalDaysInFirstWeek = function (a) {
        this.minimalDaysInFirstWeek = a;
      }, SimpleDateFormat.prototype.getMinimalDaysInFirstWeek = function () {
        return isUndefined(this.minimalDaysInFirstWeek) ? m : this.minimalDaysInFirstWeek;
      };
      var o = function (a, b) {
          for (; a.length < b;)
            a = '0' + a;
          return a;
        }, p = function (a, b, c) {
          return b >= 4 ? a : a.substr(0, Math.max(c, b));
        }, q = function (a, b) {
          var c = '' + a;
          return o(c, b);
        };
      SimpleDateFormat.prototype.format = function (k) {
        for (var l, m = '', n = this.formatString; l = a.exec(n);) {
          var r = l[1], s = l[2], t = l[3], u = l[4];
          if (r)
            m += '\'\'' == r ? '\'' : r.substring(1, r.length - 1);
          else if (t);
          else if (u)
            m += u;
          else if (s) {
            var v = s.charAt(0), w = s.length, x = '';
            switch (v) {
            case 'G':
              x = 'AD';
              break;
            case 'y':
              x = k.getFullYear();
              break;
            case 'M':
              x = k.getMonth();
              break;
            case 'w':
              x = k.getWeekInYear(this.getMinimalDaysInFirstWeek());
              break;
            case 'W':
              x = k.getWeekInMonth(this.getMinimalDaysInFirstWeek());
              break;
            case 'D':
              x = k.getDayInYear();
              break;
            case 'd':
              x = k.getDate();
              break;
            case 'F':
              x = 1 + Math.floor((k.getDate() - 1) / 7);
              break;
            case 'E':
              x = c[k.getDay()];
              break;
            case 'a':
              x = k.getHours() >= 12 ? 'PM' : 'AM';
              break;
            case 'H':
              x = k.getHours();
              break;
            case 'k':
              x = k.getHours() || 24;
              break;
            case 'K':
              x = k.getHours() % 12;
              break;
            case 'h':
              x = k.getHours() % 12 || 12;
              break;
            case 'm':
              x = k.getMinutes();
              break;
            case 's':
              x = k.getSeconds();
              break;
            case 'S':
              x = k.getMilliseconds();
              break;
            case 'Z':
              x = k.getTimezoneOffset();
            }
            switch (j[v]) {
            case d:
              m += p(x, w, 2);
              break;
            case e:
              m += p(x, w, 3);
              break;
            case f:
              m += q(x, w);
              break;
            case g:
              if (3 >= w) {
                var y = '' + x;
                m += y.substr(2, 2);
              } else
                m += q(x, w);
              break;
            case h:
              m += w >= 3 ? p(b[x], w, w) : q(x + 1, w);
              break;
            case i:
              var z = x > 0, A = z ? '-' : '+', B = Math.abs(x), C = '' + Math.floor(B / 60);
              C = o(C, 2);
              var D = '' + B % 60;
              D = o(D, 2), m += A + C + D;
            }
          }
          n = n.substr(l.index + l[0].length);
        }
        return m;
      };
    }(), log4javascript.SimpleDateFormat = SimpleDateFormat, PatternLayout.TTCC_CONVERSION_PATTERN = '%r %p %c - %m%n', PatternLayout.DEFAULT_CONVERSION_PATTERN = '%m%n', PatternLayout.ISO8601_DATEFORMAT = 'yyyy-MM-dd HH:mm:ss,SSS', PatternLayout.DATETIME_DATEFORMAT = 'dd MMM yyyy HH:mm:ss,SSS', PatternLayout.ABSOLUTETIME_DATEFORMAT = 'HH:mm:ss,SSS', PatternLayout.prototype = new Layout(), PatternLayout.prototype.format = function (a) {
      for (var b, c = /%(-?[0-9]+)?(\.?[0-9]+)?([acdfmMnpr%])(\{([^\}]+)\})?|([^%]+)/, d = '', e = this.pattern; b = c.exec(e);) {
        var f = b[0], g = b[1], h = b[2], i = b[3], j = b[5], k = b[6];
        if (k)
          d += '' + k;
        else {
          var l = '';
          switch (i) {
          case 'a':
          case 'm':
            var m = 0;
            j && (m = parseInt(j, 10), isNaN(m) && (handleError('PatternLayout.format: invalid specifier \'' + j + '\' for conversion character \'' + i + '\' - should be a number'), m = 0));
            for (var n = 'a' === i ? a.messages[0] : a.messages, o = 0, p = n.length; p > o; o++)
              o > 0 && ' ' !== l.charAt(l.length - 1) && (l += ' '), l += 0 === m ? n[o] : formatObjectExpansion(n[o], m);
            break;
          case 'c':
            var q = a.logger.name;
            if (j) {
              var r = parseInt(j, 10), s = a.logger.name.split('.');
              l = r >= s.length ? q : s.slice(s.length - r).join('.');
            } else
              l = q;
            break;
          case 'd':
            var t = PatternLayout.ISO8601_DATEFORMAT;
            j && (t = j, 'ISO8601' == t ? t = PatternLayout.ISO8601_DATEFORMAT : 'ABSOLUTE' == t ? t = PatternLayout.ABSOLUTETIME_DATEFORMAT : 'DATE' == t && (t = PatternLayout.DATETIME_DATEFORMAT)), l = new SimpleDateFormat(t).format(a.timeStamp);
            break;
          case 'f':
            if (this.hasCustomFields()) {
              var u = 0;
              j && (u = parseInt(j, 10), isNaN(u) ? handleError('PatternLayout.format: invalid specifier \'' + j + '\' for conversion character \'f\' - should be a number') : 0 === u ? handleError('PatternLayout.format: invalid specifier \'' + j + '\' for conversion character \'f\' - must be greater than zero') : u > this.customFields.length ? handleError('PatternLayout.format: invalid specifier \'' + j + '\' for conversion character \'f\' - there aren\'t that many custom fields') : u -= 1);
              var v = this.customFields[u].value;
              'function' == typeof v && (v = v(this, a)), l = v;
            }
            break;
          case 'n':
            l = newLine;
            break;
          case 'p':
            l = a.level.name;
            break;
          case 'r':
            l = '' + a.timeStamp.getDifference(applicationStartDate);
            break;
          case '%':
            l = '%';
            break;
          default:
            l = f;
          }
          var w;
          if (h) {
            w = parseInt(h.substr(1), 10);
            var x = l.length;
            x > w && (l = l.substring(x - w, x));
          }
          if (g)
            if ('-' == g.charAt(0))
              for (w = parseInt(g.substr(1), 10); l.length < w;)
                l += ' ';
            else
              for (w = parseInt(g, 10); l.length < w;)
                l = ' ' + l;
          d += l;
        }
        e = e.substr(b.index + b[0].length);
      }
      return d;
    }, PatternLayout.prototype.ignoresThrowable = function () {
      return !0;
    }, PatternLayout.prototype.toString = function () {
      return 'PatternLayout';
    }, log4javascript.PatternLayout = PatternLayout;
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
      ], getXmlHttp = function (a) {
        for (var b, c = null, d = 0, e = xmlHttpFactories.length; e > d; d++) {
          b = xmlHttpFactories[d];
          try {
            return c = b(), getXmlHttp = b, c;
          } catch (f) {
          }
        }
        a ? a() : handleError('getXmlHttp: unable to obtain XMLHttpRequest object');
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
      window.onload = 'function' != typeof window.onload ? log4javascript.setDocumentReady : function (a) {
        oldOnload && oldOnload(a), log4javascript.setDocumentReady();
      };
    }
    return window.log4javascript = log4javascript, log4javascript;
  }();