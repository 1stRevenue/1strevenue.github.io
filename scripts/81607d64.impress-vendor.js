'use strict';
function AngularFire(e, t, n) {
  this._q = e, this._parse = t, this._initial = !0, this._remoteValue = !1, this._fRef = 'string' == typeof n ? new Firebase(n) : n;
}
angular.module('firebase', []).value('Firebase', Firebase), angular.module('firebase').factory('angularFire', [
  '$q',
  '$parse',
  function (e, t) {
    return function (n, o, i, r) {
      var s = new AngularFire(e, t, n);
      return s.associate(o, i, r);
    };
  }
]), AngularFire.prototype = {
  disassociate: function () {
    this.unregister(), this._fRef.off('value');
  },
  associate: function (e, t, n) {
    var o = this;
    void 0 == n && (n = []);
    var i = this._q.defer(), r = i.promise;
    return this._fRef.on('value', function (r) {
      var s = !1;
      if (i && (s = i, i = !1), o._remoteValue = n, r && void 0 != r.val()) {
        var a = r.val();
        if (typeof a != typeof n)
          return o._log('Error: type mismatch'), void 0;
        var l = Object.prototype.toString;
        if (l.call(n) != l.call(a))
          return o._log('Error: type mismatch'), void 0;
        if (o._remoteValue = angular.copy(a), angular.equals(a, o._parse(t)(e)))
          return;
      }
      o._safeApply(e, o._resolve.bind(o, e, t, s, o._remoteValue));
    }, function () {
    }), r;
  },
  _log: function (e) {
    console && console.log && console.log(e);
  },
  _resolve: function (e, t, n, o) {
    var i = this;
    if (this._parse(t).assign(e, angular.copy(o)), this._remoteValue = angular.copy(o), n) {
      var r = {
          ref: i._fRef,
          name: t,
          value: o,
          off: function () {
            i.disassociate();
          }
        };
      n.resolve(r), this._watch(e, t);
    }
  },
  _watch: function (e, t) {
    var n = this;
    n.unregister = e.$watch(t, function () {
      if (n._initial)
        return n._initial = !1, void 0;
      var o = n._parse(t)(e) || null;
      o = o && JSON.parse(angular.toJson(o)), angular.equals(o, n._remoteValue) || n._fRef.ref().set(o);
    }, !0);
  },
  _safeApply: function (e, t) {
    var n = e.$root.$$phase;
    '$apply' == n || '$digest' == n ? t() : e.$apply(t);
  }
}, angular.module('firebase').factory('angularFireCollection', [
  '$timeout',
  function (e) {
    function t(e, t) {
      this.$ref = e.ref(), this.$id = e.name(), this.$index = t, angular.extend(this, e.val());
    }
    return function (n, o) {
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
      function l(e, t, n) {
        d.splice(e, 1), d.splice(t, 0, n), c(e, t);
      }
      function c(e, t) {
        var n = d.length;
        t = t || n, t > n && (t = n);
        for (var o = e; t > o; o++) {
          var i = d[o];
          i.$index = p[i.$id] = o;
        }
      }
      var u, d = [], p = {};
      return u = 'string' == typeof n ? new Firebase(n) : n, o && 'function' == typeof o && u.once('value', o), u.on('child_added', function (n, o) {
        e(function () {
          var e = i(o);
          r(e, new t(n, e)), c(e);
        });
      }), u.on('child_removed', function (t) {
        e(function () {
          var e = t.name(), n = p[e];
          s(e), c(n);
        });
      }), u.on('child_changed', function (n, o) {
        e(function () {
          var e = p[n.name()], r = i(o), s = new t(n, e);
          a(e, s), r !== e && l(e, r, s);
        });
      }), u.on('child_moved', function (t, n) {
        e(function () {
          var e = p[t.name()], o = i(n), r = d[e];
          l(e, o, r);
        });
      }), d.add = function (e, t) {
        t ? u.ref().push(e, t) : u.ref().push(e);
      }, d.remove = function (e) {
        var t = angular.isString(e) ? d[p[e]] : e;
        t.$ref.remove();
      }, d.update = function (e) {
        var t = angular.isString(e) ? d[p[e]] : e, n = {};
        angular.forEach(t, function (e, t) {
          0 !== t.indexOf('$') && (n[t] = e);
        }), t.$ref.set(n);
      }, d;
    };
  }
]);