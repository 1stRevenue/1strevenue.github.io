'use strict';
function AngularFire(e, t, o) {
  this._q = e, this._parse = t, this._initial = !0, this._remoteValue = !1, this._fRef = 'string' == typeof o ? new Firebase(o) : o;
}
angular.module('firebase', []).value('Firebase', Firebase), angular.module('firebase').factory('angularFire', [
  '$q',
  '$parse',
  function (e, t) {
    return function (o, n, i, r) {
      var s = new AngularFire(e, t, o);
      return s.associate(n, i, r);
    };
  }
]), AngularFire.prototype = {
  disassociate: function () {
    this.unregister(), this._fRef.off('value');
  },
  associate: function (e, t, o) {
    var n = this;
    void 0 == o && (o = []);
    var i = this._q.defer(), r = i.promise;
    return this._fRef.on('value', function (r) {
      var s = !1;
      if (i && (s = i, i = !1), n._remoteValue = o, r && void 0 != r.val()) {
        var a = r.val();
        if (typeof a != typeof o)
          return n._log('Error: type mismatch'), void 0;
        var l = Object.prototype.toString;
        if (l.call(o) != l.call(a))
          return n._log('Error: type mismatch'), void 0;
        if (n._remoteValue = angular.copy(a), angular.equals(a, n._parse(t)(e)))
          return;
      }
      n._safeApply(e, n._resolve.bind(n, e, t, s, n._remoteValue));
    }, function () {
    }), r;
  },
  _log: function (e) {
    console && console.log && console.log(e);
  },
  _resolve: function (e, t, o, n) {
    var i = this;
    if (this._parse(t).assign(e, angular.copy(n)), this._remoteValue = angular.copy(n), o) {
      var r = {
          ref: i._fRef,
          name: t,
          value: n,
          off: function () {
            i.disassociate();
          }
        };
      o.resolve(r), this._watch(e, t);
    }
  },
  _watch: function (e, t) {
    var o = this;
    o.unregister = e.$watch(t, function () {
      if (o._initial)
        return o._initial = !1, void 0;
      var n = o._parse(t)(e) || null;
      n = n && JSON.parse(angular.toJson(n)), angular.equals(n, o._remoteValue) || o._fRef.ref().set(n);
    }, !0);
  },
  _safeApply: function (e, t) {
    var o = e.$root.$$phase;
    '$apply' == o || '$digest' == o ? t() : e.$apply(t);
  }
}, angular.module('firebase').factory('angularFireCollection', [
  '$timeout',
  function (e) {
    function t(e, t) {
      this.$ref = e.ref(), this.$id = e.name(), this.$index = t, angular.extend(this, e.val());
    }
    return function (o, n) {
      function i(e) {
        return e ? p[e] + 1 : 0;
      }
      function r(e, t) {
        p[t.$id] = e, d.splice(e, 0, t);
      }
      function s(e) {
        var t = p[e];
        d.splice(t, 1), p[e] = void 0;
      }
      function a(e, t) {
        d[e] = t;
      }
      function l(e, t, o) {
        d.splice(e, 1), d.splice(t, 0, o), c(e, t);
      }
      function c(e, t) {
        var o = d.length;
        t = t || o, t > o && (t = o);
        for (var n = e; t > n; n++) {
          var i = d[n];
          i.$index = p[i.$id] = n;
        }
      }
      var u, d = [], p = {};
      return u = 'string' == typeof o ? new Firebase(o) : o, n && 'function' == typeof n && u.once('value', n), u.on('child_added', function (o, n) {
        e(function () {
          var e = i(n);
          r(e, new t(o, e)), c(e);
        });
      }), u.on('child_removed', function (t) {
        e(function () {
          var e = t.name(), o = p[e];
          s(e), c(o);
        });
      }), u.on('child_changed', function (o, n) {
        e(function () {
          var e = p[o.name()], r = i(n), s = new t(o, e);
          a(e, s), r !== e && l(e, r, s);
        });
      }), u.on('child_moved', function (t, o) {
        e(function () {
          var e = p[t.name()], n = i(o), r = d[e];
          l(e, n, r);
        });
      }), d.add = function (e, t) {
        t ? u.ref().push(e, t) : u.ref().push(e);
      }, d.remove = function (e) {
        var t = angular.isString(e) ? d[p[e]] : e;
        t.$ref.remove();
      }, d.update = function (e) {
        var t = angular.isString(e) ? d[p[e]] : e, o = {};
        angular.forEach(t, function (e, t) {
          0 !== t.indexOf('$') && (o[t] = e);
        }), t.$ref.set(o);
      }, d;
    };
  }
]);