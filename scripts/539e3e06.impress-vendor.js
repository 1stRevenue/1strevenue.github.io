'use strict';
function AngularFire(a, b, c) {
  this._q = a, this._parse = b, this._initial = !0, this._remoteValue = !1, this._fRef = 'string' == typeof c ? new Firebase(c) : c;
}
angular.module('firebase', []).value('Firebase', Firebase), angular.module('firebase').factory('angularFire', [
  '$q',
  '$parse',
  function (a, b) {
    return function (c, d, e, f) {
      var g = new AngularFire(a, b, c);
      return g.associate(d, e, f);
    };
  }
]), AngularFire.prototype = {
  disassociate: function () {
    this.unregister(), this._fRef.off('value');
  },
  associate: function (a, b, c) {
    var d = this;
    void 0 == c && (c = []);
    var e = this._q.defer(), f = e.promise;
    return this._fRef.on('value', function (f) {
      var g = !1;
      if (e && (g = e, e = !1), d._remoteValue = c, f && void 0 != f.val()) {
        var h = f.val();
        if (typeof h != typeof c)
          return d._log('Error: type mismatch'), void 0;
        var i = Object.prototype.toString;
        if (i.call(c) != i.call(h))
          return d._log('Error: type mismatch'), void 0;
        if (d._remoteValue = angular.copy(h), angular.equals(h, d._parse(b)(a)))
          return;
      }
      d._safeApply(a, d._resolve.bind(d, a, b, g, d._remoteValue));
    }, function () {
    }), f;
  },
  _log: function (a) {
    console && console.log && console.log(a);
  },
  _resolve: function (a, b, c, d) {
    var e = this;
    if (this._parse(b).assign(a, angular.copy(d)), this._remoteValue = angular.copy(d), c) {
      var f = {
          ref: e._fRef,
          name: b,
          value: d,
          off: function () {
            e.disassociate();
          }
        };
      c.resolve(f), this._watch(a, b);
    }
  },
  _watch: function (a, b) {
    var c = this;
    c.unregister = a.$watch(b, function () {
      if (c._initial)
        return c._initial = !1, void 0;
      var d = c._parse(b)(a) || null;
      d = d && JSON.parse(angular.toJson(d)), angular.equals(d, c._remoteValue) || c._fRef.ref().set(d);
    }, !0);
  },
  _safeApply: function (a, b) {
    var c = a.$root.$$phase;
    '$apply' == c || '$digest' == c ? b() : a.$apply(b);
  }
}, angular.module('firebase').factory('angularFireCollection', [
  '$timeout',
  function (a) {
    function b(a, b) {
      this.$ref = a.ref(), this.$id = a.name(), this.$index = b, angular.extend(this, a.val());
    }
    return function (c, d) {
      function e(a) {
        return a ? m[a] + 1 : 0;
      }
      function f(a, b) {
        m[b.$id] = a, l.splice(a, 0, b);
      }
      function g(a) {
        var b = m[a];
        l.splice(b, 1), m[a] = void 0;
      }
      function h(a, b) {
        l[a] = b;
      }
      function i(a, b, c) {
        l.splice(a, 1), l.splice(b, 0, c), j(a, b);
      }
      function j(a, b) {
        var c = l.length;
        b = b || c, b > c && (b = c);
        for (var d = a; b > d; d++) {
          var e = l[d];
          e.$index = m[e.$id] = d;
        }
      }
      var k, l = [], m = {};
      return k = 'string' == typeof c ? new Firebase(c) : c, d && 'function' == typeof d && k.once('value', d), k.on('child_added', function (c, d) {
        a(function () {
          var a = e(d);
          f(a, new b(c, a)), j(a);
        });
      }), k.on('child_removed', function (b) {
        a(function () {
          var a = b.name(), c = m[a];
          g(a), j(c);
        });
      }), k.on('child_changed', function (c, d) {
        a(function () {
          var a = m[c.name()], f = e(d), g = new b(c, a);
          h(a, g), f !== a && i(a, f, g);
        });
      }), k.on('child_moved', function (b, c) {
        a(function () {
          var a = m[b.name()], d = e(c), f = l[a];
          i(a, d, f);
        });
      }), l.add = function (a, b) {
        b ? k.ref().push(a, b) : k.ref().push(a);
      }, l.remove = function (a) {
        var b = angular.isString(a) ? l[m[a]] : a;
        b.$ref.remove();
      }, l.update = function (a) {
        var b = angular.isString(a) ? l[m[a]] : a, c = {};
        angular.forEach(b, function (a, b) {
          0 !== b.indexOf('$') && (c[b] = a);
        }), b.$ref.set(c);
      }, l;
    };
  }
]);