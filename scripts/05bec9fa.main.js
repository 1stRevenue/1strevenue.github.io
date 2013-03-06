'use strict';
function round(e, t) {
  if (e = parseFloat(e), isNaN(e))
    return e;
  t || (t = 0);
  var o = Math.pow(10, t);
  return Math.floor(e * o + (10 * e * o % 10 >= 5 ? 1 : 0)) / o;
}
var FirstRevenueApp = angular.module('FirstRevenueApp', [
    'ngResource',
    'bootstrap',
    '$strap.directives'
  ]).config([
    '$routeProvider',
    function (e) {
      console.log('app.config'), console.log('app.config call $routeProvider $routeProvider=', e), e.when('/', {
        templateUrl: 'views/routes/Repo.html',
        controller: 'RepoController'
      }).when('/entry', {
        templateUrl: 'views/routes/Entry.html',
        controller: 'EntryController'
      }).when('/home', {
        templateUrl: 'views/routes/Home.html',
        controller: 'HomeTabsController'
      }).when('/repo', {
        templateUrl: 'views/routes/Repo.html',
        controller: 'RepoController'
      }).when('/canvas', {
        templateUrl: 'views/routes/Canvas.html',
        controller: 'CanvasController'
      }).when('/canvas/new', {
        templateUrl: 'views/routes/NewModel.html',
        controller: 'NewModelController'
      }).when('/canvas/:orgId/:repoId/:modelId', {
        templateUrl: 'views/routes/Canvas.html',
        controller: 'CanvasController'
      }).otherwise({ redirectTo: '/' });
    }
  ]).run([
    '$rootScope',
    '$location',
    'User',
    function (e, t, o) {
      e.$on('$routeChangeStart', function (e, i, n) {
        console.log('app.run $routeChangeStart current=', n, 'next=', i, 'User=', o), o.authenticated || 'EntryController' === i.controller || (console.log('app.run redirecting to /entry'), i.redirectTo = null, t.path('/entry'));
      });
    }
  ]);
'function' != typeof JSON.decycle && (JSON.decycle = function decycle(e) {
  var t = [], o = [];
  return function i(e, n) {
    var s, r, l;
    switch (typeof e) {
    case 'object':
      if (!e)
        return null;
      for (s = 0; t.length > s; s += 1)
        if (t[s] === e)
          return { $ref: o[s] };
      if (t.push(e), o.push(n), '[object Array]' === Object.prototype.toString.apply(e))
        for (l = [], s = 0; e.length > s; s += 1)
          l[s] = i(e[s], n + '[' + s + ']');
      else {
        l = {};
        for (r in e)
          Object.prototype.hasOwnProperty.call(e, r) && (l[r] = i(e[r], n + '[' + JSON.stringify(r) + ']'));
      }
      return l;
    case 'number':
    case 'string':
    case 'boolean':
      return e;
    }
  }(e, '$');
}), 'function' != typeof JSON.retrocycle && (JSON.retrocycle = function retrocycle($) {
  var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;
  return function rez(value) {
    var i, item, name, path;
    if (value && 'object' == typeof value)
      if ('[object Array]' === Object.prototype.toString.apply(value))
        for (i = 0; value.length > i; i += 1)
          item = value[i], item && 'object' == typeof item && (path = item.$ref, 'string' == typeof path && px.test(path) ? value[i] = eval(path) : rez(item));
      else
        for (name in value)
          'object' == typeof value[name] && (item = value[name], item && (path = item.$ref, 'string' == typeof path && px.test(path) ? value[name] = eval(path) : rez(item)));
  }($), $;
});
var resizeCanvasFont = function () {
  var e = $(window).height() - 80, t = $(window).width(), o = e / 3, i = t / 5, n = Math.min(Math.max(5, Math.min(o, i) / 20), 15);
  $('html').css('font-size', n + 'px'), console.log('resizeCanvasFont size=', n);
};
$(document).ready(function () {
  $(window).resize(resizeCanvasFont), resizeCanvasFont(), window.navigator.standalone;
}), FirstRevenueApp.controller('AdminController', [
  '$scope',
  'Contacts',
  'Hooks',
  function (e, t, o) {
    _.extend(e, {
      contacts: t.contacts,
      hooks: o,
      loadContacts: function (e) {
        'google' === e && t.loadContacts('google');
      },
      loadHooks: function () {
        this.hooks.loadHooks(e);
      },
      loadHooksForApp: function (t, o) {
        this.hooks.loadHooksForApp(e, t, o);
      }
    });
  }
]), FirstRevenueApp.controller('AdminRepoController', [
  '$scope',
  function (e) {
    e.orgRepo = e.repo.repo;
  }
]), FirstRevenueApp.controller('AngularController', [
  '$scope',
  function (e) {
    angular.extend(e, {
      q: FirstRevenueApp._invokeQueue,
      objType: function (e) {
        return typeof e;
      },
      testValue: function (e) {
        return 'value' === e;
      }
    });
  }
]), FirstRevenueApp.controller('CanvasController', [
  '$scope',
  '$route',
  '$location',
  'Modal',
  'Zoom',
  'Rainbow',
  function (e, t, o, i, n, s) {
    console.log('Canvas route invoked db=', e.db, '$route=', t), angular.extend(e, {
      modal: i,
      zoom: n,
      rainbow: s
    }), e.layout.setView('canvas'), e.layout.guide.wide = !1, e.menu.visible = [
      'home',
      'repo',
      'canvas'
    ], e.menu.selected = 'canvas', !e.db.models;
    var r = t.current.params.orgId, l = t.current.params.repoId, a = t.current.params.modelId;
    if (r && l && a ? (e.canvas.orgId = r, e.canvas.repoId = l, e.canvas.modelId = a) : (r = e.canvas.orgId, l = e.canvas.repoId, a = e.canvas.modelId), r && l && a && 0 !== a && (e.canvas.model = e.db.orgs[r].repos[l].models[a]), !e.canvas.model, e.layout.tooltips = !0, e.canvas.model) {
      e.menu.title = e.canvas.model.name;
      var c = e.firebase.getModelPath(e.canvas.model);
      c !== e.canvas.lastModelPath && (e.canvas.model.blocks = e.canvas.model.blocks || {}, e.canvas.loaded || (console.log('CanvasController firebase.loadCanvas modelId=', a), e.firebase.loadCanvas(r, l, a), e.canvas.lastModelPath = c)), e.canvas.blocks = e.canvas.model.blocks;
    }
  }
]), FirstRevenueApp.controller('ContactController', [
  '$scope',
  'Layout',
  function (e, t) {
    console.log('--- Contact controller'), angular.extend(e, {
      layout: t,
      contactEditorActive: !1,
      contactProvider: '',
      members: [],
      showContacts: function (o) {
        console.log('showContacts provider=', o), t.show('contact'), '1stRevenue' === o && (this.contactEditorActive = !0, this.contactProvider = '1st Revenue', this.members = _.pick(e.db.members, _.difference(_.keys(e.db.members), _.keys(e.canvas.model.members))));
      },
      contactCount: function () {
        var e = 0;
        return _.each(this.members, function (t) {
          t.invite && e++;
        }), e;
      },
      memberCount: function () {
        return _.size(this.members);
      },
      removeSelections: function () {
        _.each(this.members, function (e) {
          e.invite = !1;
        });
      },
      plural: function (e) {
        return 1 === e ? '' : 's';
      },
      addUsers: function () {
        var e = [];
        _.each(this.members, function (t) {
          t.invite && e.push(t.id);
        }), this.members = [], this.contactEditorActive = !1, this.contactProvider = '', t.hide('contact');
      }
    });
  }
]), FirstRevenueApp.controller('EntryController', [
  '$scope',
  '$location',
  '$timeout',
  'Auth',
  'Modal',
  function (e, t, o, i, n) {
    console.log('Entry route invoked Modal=', n, 'Auth=', i), angular.extend(e, {}), e.layout.setView('welcome'), e.layout.guide.wide = !0, e.modal = n, e.auth = i, e.logonTabName = 'persona', e.menu.title = 'Welcome to the 1st Revenue', e.menu.selected = 'logon', e.menu.visible = [
      'home',
      'logon'
    ], e.user.account = null, o(function () {
    }), e.processAuth = function () {
      e.showError = !1;
      var o = i.passwordLogon(e.user, e.password);
      o.then(function (o) {
        console.log('EntryController.logon processAuth promise then reason=', o);
        var i = '/repo';
        e.redirectPath && (i = e.redirectPath), t.path(i);
      }, function (t) {
        console.log('EntryController.logon processAuth promise error reason=', t), e.showError = !0, e.errorMsg = 'Invalid logon. The username and pass for the example app is user/pass';
      });
    }, e.logon = function () {
      console.log('EntryController.logon'), e.modal.logon = !0;
    };
  }
]), FirstRevenueApp.controller('FooterController', [
  '$scope',
  'Modal',
  'Popup',
  'Zoom',
  'Model',
  function (e, t, o, i, n) {
    angular.extend(e, {
      modal: t,
      popup: o,
      model: n,
      filteredModelId: null,
      members: null,
      filterMembers: function () {
        var t = [], o = 0, i = this.canvas.model.members;
        for (var n in i) {
          var s = e.db.users[i[n]];
          if (t.push({
              type: s.provider,
              name: s.name,
              image: s.image
            }), ++o >= 10)
            break;
        }
        return this.filteredModelId = this.canvas.modelId, console.log('filterMembers footerMembers=', t), t;
      },
      getMembers: function () {
        return this.canvas.modelId !== this.filteredModelId && (this.members = null), this.members = this.members || this.filterMembers(), this.members;
      }
    });
  }
]), FirstRevenueApp.controller('HeaderController', [
  '$scope',
  'Modal',
  'Popup',
  'Zoom',
  'Model',
  'Env',
  'Info',
  function (e, t, o, i, n, s, r) {
    _.extend(e, {
      modal: t,
      popup: o,
      zoom: i,
      model: n,
      env: s,
      info: r,
      logoff: function () {
        e.modal.logoff = !0, e.user.authenticated = !1, e.user.account = null, e.db.users = {};
      }
    });
  }
]), FirstRevenueApp.controller('HomeController', [
  '$scope',
  function (e) {
    console.log('---- Home Controller'), e.menu.title = '1st Revenue', e.menu.selected = 'home', e.menu.visible = [
      'home',
      'repo'
    ], e.canvas.model && e.menu.visible.push('canvas'), console.log('Home route invoked');
  }
]), FirstRevenueApp.controller('HomeTabsController', [
  '$scope',
  function (e) {
    console.log('---- HomeTabsController'), e.menu.selected = 'home', e.menu.visible = [
      'home',
      'repo'
    ], e.canvas.model && e.menu.visible.push('canvas'), angular.extend(e, {
      homeTabName: 'welcome',
      adminTitle: function () {
        return e.user.adminRole ? 'Administration' : '';
      },
      monitoringTitle: function () {
        return e.user.adminRole ? 'Monitoring' : '';
      },
      webFormsTitle: function () {
        return e.user.adminRole ? 'Podio Web Forms' : '';
      }
    });
  }
]), FirstRevenueApp.controller('MasterController', [
  '$scope',
  '$location',
  'Layout',
  'Menu',
  'Notif',
  'Firebase',
  'Database',
  'User',
  'Canvas',
  function (e, t, o, i, n, s, r, l, a) {
    console.log('MasterController'), angular.extend(e, {
      layout: o,
      menu: i,
      notif: n,
      firebase: s,
      db: r,
      canvas: a,
      user: l,
      ribbon: {
        peerCount: function () {
          return 0;
        }
      }
    }), e.layout.reset(), e.user.authenticated = !1, e.menu.title = '1st Revenue', e.menu.visible = [
      'home',
      'repo'
    ], e.canvas.loaded && e.menu.visible.push('canvas'), e.firebase.init(), console.log('MasterController Firebase init() done'), e.notif.add({ text: '1st Revenue started' }), mixpanel.track('App launch'), e.$on('event:auth-loginRequired', function () {
      e.user.authenticated = !1, t.url('/');
    }), e.$on('event:auth-loginConfirmed', function () {
      e.user.authenticated = !0;
    });
  }
]), FirstRevenueApp.controller('MembersController', [
  '$scope',
  'MemberCatalog',
  function (e, t) {
    _.extend(e, { catalog: t }), e.catalog.sort = e.catalog.sort || 'name';
  }
]), FirstRevenueApp.controller('ModalController', [
  '$scope',
  '$location',
  'Modal',
  'StickerEditor',
  function (e, t, o, i) {
    console.log('---- ModalController'), _.extend(e, {
      modal: o,
      editor: i,
      logoff: function () {
        this.modal.logoff = !1, e.user.authenticated = !1, e.user.authFailed = !0, e.firebase.rootRef.unauth(), t.url('/');
      },
      deleteCookie: function (e) {
        document.cookie = e + '="";-1; path=/';
      },
      discardStickerChanges: function () {
        this.modal.dis = !1, this.editor.discardChanges(), this.editor.sticker = null, e.layout.editor.sticker = !1, e.layout.tooltips = !0;
      },
      keepStickerChanges: function () {
        this.modal.dis = !1, e.layout.tooltips = !0;
      },
      deleteSticker: function () {
        console.log('Modal.deleteSticker'), e.firebase.deleteSticker(this.modal.sticker), this.modal.sticker = null, e.layout.editor.sticker = !1, this.modal.del = !1, e.layout.tooltips = !0;
      },
      leaveSticker: function () {
        this.modal.del = !1, e.layout.tooltips = !0;
      }
    });
  }
]), FirstRevenueApp.controller('ModelEditorController', [
  '$scope',
  'ModelEditor',
  'StickerEditor',
  'Info',
  'Modal',
  function (e, t, o, i, n) {
    console.log('---- ModelEditorController');
    var s = t, r = o;
    angular.extend(e, {
      editor: t,
      confirmCloseEditor: function () {
        this.confirmDiscardChanges();
      },
      confirmDiscardChanges: function () {
        s.wasModelModified() ? (n.dis = !0, e.layout.tooltips = !1) : (s.discardEmptySticker(), i.hide('sticker'));
      },
      discardModelChanges: function () {
        n.dis = !1, e.layout.tooltips = !0, s.discardChanges(), s.sticker = null, i.hide('sticker');
      },
      keepModelChanges: function () {
        n.dis = !1, e.layout.tooltips = !0;
      },
      createModel: function () {
        r.matchTitle() ? (n.dup = !0, e.layout.tooltips = !1) : (r.sticker.id = 0, r.saveSticker());
      },
      saveModel: function () {
        r.saveSticker();
      },
      isCancelButtonDisabled: function () {
        return !r.wasStickerModified();
      },
      isCloseButtonDisabled: function () {
        return r.wasStickerModified();
      },
      isNewButtonDisabled: function () {
        return !this.isStickerNew() && this.matchTitle(r.sticker);
      },
      isSaveButtonDisabled: function () {
        return !r.wasStickerModified();
      }
    }), e.$watch(i.view.model, function (t) {
      t && null === e.editor.model;
    });
  }
]), FirstRevenueApp.controller('ModelsController', [
  '$scope',
  'ModelCatalog',
  'Zoom',
  function (e, t, o) {
    console.log('Models route invoked'), angular.extend(e, {
      catalog: t,
      zoom: o
    }), e.menu.title = '1st Revenue Repository', e.menu.selected = 'repo', e.menu.visible = [
      'home',
      'repo'
    ], e.canvas.model && e.menu.visible.push('canvas'), e.catalog.sort = e.catalog.sort || 'time', e.catalog.tag = e.catalog.tag || '*';
  }
]), FirstRevenueApp.controller('MonitorController', [
  '$scope',
  'Monitor',
  function (e, t) {
    angular.extend(e, {
      monitor: t,
      getRateStats: function () {
        t.getRateStats(function () {
          e.$root.$apply();
        });
      },
      timeStamp: function (e) {
        var t = '';
        return isNaN(parseInt(e, 10)) || (t = new Date(60000 * e).toISOString()), t;
      }
    });
  }
]), FirstRevenueApp.controller('NewModelController', [
  '$scope',
  '$location',
  'TModel',
  function (e, t, o) {
    e.layout.peer.wide = !0, e.menu.visible = [
      'home',
      'repo',
      'create'
    ], e.menu.title = 'Create Model', e.menu.selected = 'create', console.log('---- NewModelController'), console.log('Canvas New Model route invoked'), angular.extend(e, {
      model: {
        repo: null,
        name: null,
        icon: null,
        descr: null,
        pitch: null
      },
      repoList: [],
      fpFile: null,
      nameError: !1,
      create: function () {
        if (console.log('NewModelController create name=', e.model.name, 'descr=', e.model.descr, 'pitch=', e.model.pitch), '' === e.model.name)
          e.nameError = !0;
        else {
          e.nameError = !1, e.model.descr && '' === e.model.descr.trim() && (e.model.descr = null), e.model.pitch && '' === e.model.pitch.trim() && (e.model.pitch = null);
          var t = e.db.orgs[e.model.repo.org].repos[e.model.repo.repo], i = new o(t, 0, e.model);
          console.log('NewModelController Firebase.createModel model=', i), e.firebase.createModel(i), this.showModels();
        }
      },
      getRepos: function () {
        this.repoList = [];
        for (var t in e.db.orgs)
          for (var o in e.db.orgs[t].repos)
            this.repoList.push({
              org: t,
              repo: o
            });
        return this.model.repo = this.repoList[0], this.repoList;
      },
      cancel: function () {
        e.fpFile && (console.log('NewModelController cancel removing fpFile=', e.fpFile), filepicker.remove(e.fpFile)), this.showModels();
      },
      showModels: function () {
        e.fpFile = null, t.path('/repo');
      },
      pitchWordCount: function () {
        var t = e.model.pitch ? e.model.pitch : '';
        return '' === t ? 0 : t.split(/\s+/).length;
      },
      pitchRed: function () {
        var e = this.pitchWordCount(), t = Math.min(100, e), o = Math.round(255 * t / 100);
        return o;
      },
      pitchGreen: function () {
        var e = this.pitchWordCount(), t = Math.min(100, e), o = 160 - Math.round(160 * t / 100);
        return o;
      },
      addUser: function () {
      },
      attachIcon: function () {
        this.fpicker();
      },
      replaceIcon: function () {
        this.removeIcon(), this.fpicker();
      },
      removeIcon: function () {
        filepicker.remove(e.fpFile), e.fpFile = null, e.model.icon = null;
      },
      fpicker: function () {
        return filepicker.setKey('ARtFoYGQjQGzQlEpvkSr7z'), e.model.icon, filepicker.pickAndStore({ maxSize: 1048576 }, { location: 'S3' }, function (t) {
          console.log('filepicker', t), e.fpFile = t, e.model.icon = t[0].url, e.$apply();
        }, function (e) {
          console.log('filepicker error', '' + e);
        }), !1;
      }
    }), e.repoList = e.getRepos();
  }
]), FirstRevenueApp.controller('NotifController', [
  '$scope',
  function (e) {
    console.log('--- NotifController $scope=', e);
  }
]), FirstRevenueApp.controller('PrefController', [
  '$scope',
  'Rainbow',
  function (e, t) {
    e.menu.title = '1st Revenue Preferences', console.log('Preferences route invoked'), e.brighten = t.brightenFull;
  }
]), FirstRevenueApp.controller('RepoController', [
  '$scope',
  'ModelCatalog',
  'RrrrRrrr',
  function (e, t, o) {
    console.log('---- RepoController'), angular.extend(e, {
      catalog: t,
      modelTabName: 'models',
      rrrrImageLink: o.getImageLink()
    }), e.layout.setView('my'), e.layout.guide.wide = !0;
  }
]), FirstRevenueApp.controller('RibbonController', [
  '$scope',
  function (e) {
    console.log('--- Ribbon controller loaded'), angular.extend(e, { ribbon: e.layout.guide });
  }
]), FirstRevenueApp.controller('StickerController', [
  '$scope',
  'StickerEditor',
  'Modal',
  function (e, t, o) {
    console.log('---- StickerController'), angular.extend(e, {
      modal: o,
      editor: t,
      titleOfDeleteButton: function () {
        return this.isDeleteAllowed() ? 'Delete sticker' : 'Not allowed to delete this sticker';
      },
      openDeleteStickerDialog: function () {
        this.modal.openDeleteStickerDialog(e.sticker);
      },
      isDeleteAllowed: function () {
        return this.modal.isDeleteAllowed(e.sticker);
      }
    });
  }
]), FirstRevenueApp.controller('StickerEditorController', [
  '$scope',
  'StickerEditor',
  'Info',
  'Modal',
  function (e, t, o, i) {
    console.log('---- StickerEditorController');
    var n = e.editor = t;
    e.$watch('Info.view.sticker', function (e) {
      e && n.focusTitle();
    }), angular.extend(e, {
      modal: i,
      confirmCloseEditor: function () {
        this.confirmDiscardChanges();
      },
      confirmDiscardChanges: function () {
        n.wasStickerModified() ? (i.sticker = n.sticker, i.dis = !0, e.layout.tooltips = !1) : (n.discardEmptySticker(), e.layout.show('canvas'));
      },
      confirmDeleteSticker: function () {
        this.modal.openDeleteStickerDialog(n.sticker), e.layout.tooltips = !1;
      },
      createSticker: function () {
        n.matchTitle() ? (i.dup = !0, e.layout.tooltips = !1) : (n.sticker.id = 0, n.saveSticker());
      },
      saveSticker: function () {
        n.saveSticker();
      },
      isColorChosen: function (e) {
        return n.sticker && n.sticker.color && n.sticker.color.text.toLowerCase() === e;
      },
      isCancelButtonDisabled: function () {
        return !n.wasStickerModified();
      },
      isCloseButtonDisabled: function () {
        return n.wasStickerModified();
      },
      isDeleteButtonHidden: function () {
        return this.isStickerNew();
      },
      isDeleteButtonDisabled: function () {
        var e = _.include(n.sticker.rights, 'delete');
        return !n.checkModelRights('delete') || !e;
      },
      isNewButtonDisabled: function () {
        return !this.isStickerNew() && this.matchTitle(n.sticker);
      },
      isSaveButtonDisabled: function () {
        return !n.wasStickerModified();
      },
      isStickerNew: function () {
        return !n.sticker || 0 === n.sticker.id;
      }
    });
  }
]), FirstRevenueApp.controller('ModelTagController', [
  '$scope',
  'TagCatalog',
  function (e, t) {
    console.log('---- ModelTagController'), _.extend(e, { catalog: t });
  }
]), angular.module('angularBootstrap.modal', []).directive('bootstrapModal', [
  '$rootScope',
  function (e) {
    var t, o, i, n, s = {
        backdrop: !0,
        escapeExit: !0,
        effect: null,
        effectTime: '250'
      };
    return n = function (n, r, l) {
      var a = {}, c = angular.extend(s, l);
      c.effectTime = parseInt(c.effectTime, 10), t = function (e) {
        27 === e.which && i();
      }, o = function (o, s) {
        var d, u = jQuery('.modal', r);
        s = angular.extend(c, s || {}), a = {
          effect: s.effect,
          time: s.effectTime
        }, void 0 !== n.onOpen && null !== n.onOpen && e.$apply(function () {
          n.onOpen(l.id);
        }), (s.backdrop === !0 || 'true' === s.backdrop) && (document.getElementById('modal-backdrop') || jQuery('body').append('<div id="modal-backdrop" class="modal-backdrop"></div>'), jQuery('#modal-backdrop').css({ display: 'block' }).bind('click', i)), (s.escapeExit === !0 || 'true' === s.escapeExit) && jQuery('body').bind('keyup', t), jQuery('body').addClass('modal-open'), jQuery('.modal-close', u).bind('click', i), 'fade' === a.effect ? u.fadeIn(a.time) : 'slide' === a.effect ? (d = u.css('top'), u.css({
          top: '-30%',
          display: 'block'
        }).animate({ top: d }, a.time)) : u.css({ display: 'block' });
      }, i = function () {
        var o, s = jQuery('.modal', r);
        void 0 !== n.onClose && null !== n.onClose && e.$apply(function () {
          n.onClose(l.id);
        }), 'fade' === a.effect ? s.fadeOut(a.time, function () {
          s.css({ display: 'none' });
        }) : 'slide' === a.effect ? (o = s.css('top'), s.animate({ top: '-30%' }, a.time, function () {
          s.css({
            display: 'none',
            top: o
          });
        })) : s.css({ display: 'none' }), jQuery('#modal-backdrop').unbind('click', i).css({ display: 'none' }), jQuery('body').unbind('keyup', t).removeClass('modal-open');
      }, r.bind('modalOpen', o).bind('modalClose', i);
    }, {
      link: n,
      restrict: 'E',
      scope: {
        id: 'attribute',
        onOpen: 'evaluate',
        onClose: 'evaluate'
      },
      template: '<div class="modal hide"><div ng-transclude></div></div>',
      transclude: !0
    };
  }
]).factory('bootstrapModal', function () {
  return {
    show: function (e, t) {
      jQuery('#' + e).trigger('modalOpen', [t]);
    },
    hide: function (e) {
      jQuery('#' + e).trigger('modalClose');
    }
  };
}), FirstRevenueApp.directive('contenteditable', function () {
  return {
    require: 'ngModel',
    link: function (e, t, o, i) {
      t.bind('blur keyup', function () {
        e.$apply(function () {
          i.$setViewValue(t.html());
        });
      }), i.$render = function () {
        t.html(i.$viewValue);
      };
    }
  };
}), FirstRevenueApp.directive('firstRevenueButtons', [
  'Canvas',
  'StickerEditor',
  function (e, t) {
    return console.log('first-revenue-buttons'), function (o, i) {
      i.on('click.first-revenue-buttons', '.tooltip-button button', function (i) {
        var n = $(this).offsetParent(), s = n.attr('data-pane'), r = n.attr('data-block'), l = n.attr('data-sticker');
        console.log('first-revenue-buttons pane=', s, 'blockId=', r, 'stickerId=', l), i.stopPropagation();
        var a = e.model.blocks;
        $('.pulsate').removeClass('pulsate'), _.each(a, function (e) {
          e.stickers[0] && delete e.stickers[0];
        });
        var c = a[r], d = c.stickers[l], u = $(this).attr('title');
        if ('Delete' === u)
          window.confirm('Delete sticker ' + l + '\n' + d.title + '?');
        else if ('Edit' === u) {
          $('.st-grad').qtip('hide');
          var h = $('.st-grad[data-id=' + l + ']');
          h.addClass('pulsate'), t.showSticker(e.model, c, l), console.log('first-revenue-buttons sticker=', d);
        }
        o.$root.$apply();
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueDrag', [
  'Canvas',
  'Firebase',
  function (e, t) {
    return function (e, o) {
      var i = {
          opop: null,
          op: null,
          st: null,
          stl: 0,
          stt: 0,
          cl: 0,
          ct: 0,
          touchHandled: !1,
          touchMoved: !1,
          clicked: function (e) {
            var t = $(e.target);
            if (!t.hasClass('btn') && !t.offsetParent().hasClass('btn')) {
              var o = i.op.offset(), n = i.st.offset();
              return i.stl = n.left - o.left, i.stt = n.top - o.top, i.cl = e.pageX - o.left, i.ct = e.pageY - o.top, i.opop.bind('mousemove', i.dragged), $(window).bind('mouseup', i.dropped), e.preventDefault(), !1;
            }
          },
          dragged: function (t) {
            e.$root.draggingActive = !0, e.layout.tooltips = !1, i.opop.addClass('drag-area'), i.st.addClass('st-dragged'), i.st.removeClass('st-show-buttons'), i.st.trigger('dragActive');
            var o = i.op.offset(), n = t.pageX - o.left, s = t.pageY - o.top, r = i.stl + (n - i.cl), l = i.stt + (s - i.ct);
            return r = Math.max(0, r), l = Math.max(0, l), r = Math.min(i.opop.width() - i.st.width(), r), l = Math.min(i.op.height(), l), i.st.css({
              position: 'absolute',
              left: r,
              top: l
            }), !1;
          },
          dropped: function () {
            return e.$root.draggingActive = !1, e.layout.tooltips = !0, i.opop.removeClass('drag-area'), i.st.removeClass('st-dragged'), i.opop.unbind('mousemove', i.dragged), $(window).unbind('mouseup', i.dropped), (!i.touchHandled || i.touchMoved) && i.savePosition(), !1;
          },
          savePosition: function () {
            var o = i.st.offset(), n = i.st.width(), s = i.opop.width() - n, r = i.op.height(), l = 0 === s ? 0 : 100 * (o.left - i.opop.offset().left) / s, a = 0 === r ? 0 : 100 * (o.top - i.op.offset().top) / r, c = Math.max(0, Math.min(Math.round(100 * l) / 100, 100)), d = Math.max(0, Math.min(Math.round(100 * a) / 100, 100));
            console.log('first-revenue-drag xPerc=', c, 'yPerc=', d, 'sticker=', e.sticker), i.st.css({
              position: 'absolute',
              top: d + '%',
              left: c + '%'
            }), e.sticker.position = {
              absolute: !0,
              x: c,
              y: d
            }, e.$root.st_drag = {
              stt: d + '%',
              stl: c + '%'
            }, e.$root.$apply(), t.saveStickerPosition(e.sticker);
          },
          touchStart: function (e) {
            i.touchHandled || (i.touchHandled = !0, i.touchMoved = !1, i.simulateMouseEvent(e, 'mousedown'));
          },
          touchMove: function (e) {
            i.touchHandled && (i.touchMoved = !0, i.simulateMouseEvent(e, 'mousemove'));
          },
          touchEnd: function (e) {
            i.touchHandled && (i.simulateMouseEvent(e, 'mouseup'), i.touchMoved || i.simulateMouseEvent(e, 'click'), i.touchHandled = !1);
          },
          simulateMouseEvent: function (e, t) {
            e.preventDefault();
            var o = e.originalEvent.changedTouches[0], n = document.createEvent('MouseEvents');
            if ('click' === t)
              i.simulateEvent(n, t, o), e.target.dispatchEvent(n);
            else if ('mousedown' === t) {
              i.simulateEvent(n, t, o), i.clicked(n);
              var s = document.createEvent('MouseEvents');
              i.simulateEvent(s, 'mousemove', o), i.dragged(s);
            } else
              'mousemove' === t ? (i.simulateEvent(n, t, o), i.dragged(n)) : 'mouseup' === t && (i.simulateEvent(n, t, o), i.dropped(n));
          },
          simulateEvent: function (e, t, o) {
            return e.initMouseEvent(t, !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null);
          }
        }, n = function (e) {
          var t = e.offsetParent(), o = t;
          t.hasClass('pane') ? t = t.find('.pane-sticker') : o = t.offsetParent(), i.opop = o, i.op = t, i.st = e, e.mousedown(i.clicked), 'ontouchend' in document && (e.bind('touchstart', i.touchStart), e.bind('touchmove', i.touchMove), e.bind('touchend', i.touchEnd));
        };
      n(o);
    };
  }
]), FirstRevenueApp.directive('firstRevenueEdit', [
  'Canvas',
  'StickerEditor',
  function (e, t) {
    return console.log('first-revenue-edit'), function (o, i, n) {
      var s = function (n, s) {
        n.stopPropagation(), console.log('dir/editor ----------- first-revenue-edit scope=', o, 'linkElement=', i, '$this=', s), $('.st-grad').qtip('hide');
        var r = e.model, l = 0, a = s;
        $('.pulsate').removeClass('pulsate'), _.each(r.blocks, function (e) {
          e.stickers[0] && delete e.stickers[0];
        }), s.hasClass('pane') || (a = s.offsetParent().offsetParent(), l = s.attr('data-id'), s.addClass('pulsate'));
        var c = a.attr('data-id'), d = r.blocks[c];
        console.log('dir/editor $this=', s, 'pane=', a, 'blockId=', c, 'block=', d, 'stickerId=', l), t.showSticker(r, c, l), console.log('dir/editor first-revenue-edit editor.sticker=', t.sticker), o.$root.$apply();
      };
      i.on('dblclick.st-edit', function (t) {
        var o = $(this), i = n.firstRevenueEdit;
        e.singleBlock && 'XXC' !== i || s(t, o);
      }), i.on('click.st-edit', '.pane-button', function (t) {
        var o = $(this).offsetParent(), i = n.firstRevenueEdit;
        e.singleBlock && 'XXC' !== i || s(t, o);
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueOpenTip', [
  '$window',
  function (e) {
    var t = function (t) {
        var o = t.currentTarget, i = $(o).offset(), n = i.left + o.clientWidth / 2, s = i.top + o.clientHeight / 2;
        return {
          hp: n,
          vp: s,
          ww: e.innerWidth,
          wh: e.innerHeight,
          ww2: e.innerWidth / 2,
          wh2: e.innerHeight / 2,
          cx: t.clientX,
          cy: t.clientY,
          ox: t.offsetX,
          oy: t.offsetY,
          t: o,
          tl: i.left,
          tt: i.top,
          cw: o.clientWidth,
          ch: o.clientHeight,
          cw2: o.clientWidth / 2,
          ch2: o.clientHeight / 2,
          left: e.innerWidth / 2 > n,
          top: e.innerHeight / 2 > s
        };
      }, o = function (e) {
        return e.offsetX || (e.offsetX = e.pageX - $(e.target).offset().left, e.offsetY = e.pageY - $(e.target).offset().top), e;
      }, i = function (e, t) {
        new Opentip(this, $(e).find('.st-pop').html(), {
          tipJoint: (t.top ? 'top' : 'bottom') + ' ' + (t.left ? 'left' : 'right'),
          stem: !0
        });
      }, n = function (e, t) {
        console.log('qtipAdjust exposeButtons');
        var o = $(e).find('.btn-edit-sticker'), i = $(e).find('.btn-delete-sticker');
        $(e).on('mouseleave', function () {
          $(e).removeClass('st-show-buttons'), o.removeClass('btn-edit-bottom'), o.removeClass('btn-edit-top'), o.removeClass('btn-edit-right'), o.removeClass('btn-edit-left'), i.removeClass('btn-delete-bottom'), i.removeClass('btn-delete-top'), i.removeClass('btn-delete-right'), i.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(e).addClass('st-show-buttons'), t.top ? (o.removeClass('btn-edit-bottom'), o.addClass('btn-edit-top'), i.removeClass('btn-delete-bottom'), i.addClass('btn-delete-top')) : (o.removeClass('btn-edit-top'), o.addClass('btn-edit-bottom'), i.removeClass('btn-delete-top'), i.addClass('btn-delete-bottom')), t.left ? (o.removeClass('btn-edit-right'), o.addClass('btn-edit-left'), i.removeClass('btn-delete-right'), i.addClass('btn-delete-left')) : (o.removeClass('btn-edit-left'), o.addClass('btn-edit-right'), i.removeClass('btn-delete-left'), i.addClass('btn-delete-right'));
      };
    return function (e, s, r) {
      s.on('mouseenter.open-tips click.open-tips', '.st-grad', function (l) {
        var a = r.firstRevenueOpenTip;
        if (e.layout.tooltips) {
          console.log('first-revenue-open-tip linkElement=', s, 'this=', this, 'label=', a, 'event=', l);
          var c = o(l), d = t(c), u = $.trim($(this).find('.st-pop').text());
          console.log('tooltips stickerText=[' + u + '], quadrant=', d), u.length > 0 && i(this, d, c), n(this, d), e.hovering = !0, e.$root.$apply();
        }
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueQTip', [
  '$window',
  function (e) {
    var t = function (t) {
        var o = t.currentTarget, i = $(o).offset(), n = i.left + o.clientWidth / 2, s = i.top + o.clientHeight / 2;
        return {
          hp: n,
          vp: s,
          ww: e.innerWidth,
          wh: e.innerHeight,
          ww2: e.innerWidth / 2,
          wh2: e.innerHeight / 2,
          cx: t.clientX,
          cy: t.clientY,
          ox: t.offsetX,
          oy: t.offsetY,
          t: o,
          tl: i.left,
          tt: i.top,
          cw: o.clientWidth,
          ch: o.clientHeight,
          cw2: o.clientWidth / 2,
          ch2: o.clientHeight / 2,
          left: e.innerWidth / 2 > n,
          top: e.innerHeight / 2 > s
        };
      }, o = function (e) {
        return e.offsetX || (e.offsetX = e.pageX - $(e.target).offset().left, e.offsetY = e.pageY - $(e.target).offset().top), e;
      }, i = function (e, t) {
        console.log('qtipAdjust exposeButtons');
        var o = $(e).find('.btn-edit-sticker'), i = $(e).find('.btn-delete-sticker');
        $(e).on('mouseleave', function () {
          $(e).removeClass('st-show-buttons'), o.removeClass('btn-edit-bottom'), o.removeClass('btn-edit-top'), o.removeClass('btn-edit-right'), o.removeClass('btn-edit-left'), i.removeClass('btn-delete-bottom'), i.removeClass('btn-delete-top'), i.removeClass('btn-delete-right'), i.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(e).addClass('st-show-buttons'), t.top ? (o.removeClass('btn-edit-bottom'), o.addClass('btn-edit-top'), i.removeClass('btn-delete-bottom'), i.addClass('btn-delete-top')) : (o.removeClass('btn-edit-top'), o.addClass('btn-edit-bottom'), i.removeClass('btn-delete-top'), i.addClass('btn-delete-bottom')), t.left ? (o.removeClass('btn-edit-right'), o.addClass('btn-edit-left'), i.removeClass('btn-delete-right'), i.addClass('btn-delete-left')) : (o.removeClass('btn-edit-left'), o.addClass('btn-edit-right'), i.removeClass('btn-delete-left'), i.addClass('btn-delete-right'));
      };
    return function (e, n, s) {
      n.on('mouseenter.q-tips click.q-tips', '.st-grad', function (r) {
        var l = s.firstRevenueQTip;
        if (e.layout.tooltips) {
          console.log('first-revenue-q-tip linkElement=', n, 'this=', this, 'label=', l, 'event=', r);
          var a = o(r), c = t(a), d = $.trim($(this).find('.st-pop').text());
          console.log('tooltips stickerText=[' + d + '], quadrant=', c), d.length > 0, i(this, c), e.hovering = !0, e.$root.$apply();
        }
      });
    };
  }
]), FirstRevenueApp.directive('openTip', [
  '$window',
  function (e) {
    console.log('open-tip');
    var t = function (t) {
        var o = $(t), i = o.offset(), n = i.left + t.context.clientWidth / 2, s = i.top + t.context.clientHeight / 2, r = e.innerWidth / 2 > n, l = e.innerHeight / 2 > s;
        return console.log('open-tip calcJoint linkElement=', t, 'target=', o, 'context=', t.context, 'clientWidth=', o.clientWidth, 'clientHeight=', o.clientHeight, 'tOffset=', i, 'horizPos=', n, 'vertPos=', s, 'left=', r, 'top=', l), {
          top: l,
          left: r
        };
      }, o = function (e) {
        return (e.top ? 'top' : 'bottom') + ' ' + (e.left ? 'left' : 'right');
      }, i = function (e) {
        var i = $(e).find('.st-pop').css('background-color');
        console.log('open-tip MO bg=', i);
        var n = t(e), s = {
            tipJoint: o(n),
            background: i,
            borderWidth: 0,
            stem: !0,
            delay: 1,
            showOn: 'mouseover'
          };
        return new Opentip(e, 'Mouseover' + e.find('.st-pop').html(), s);
      }, n = function (e) {
        var i = $(e).find('.st-pop').css('background-color');
        console.log('open-tip Creation bg=', i);
        var n = t(e), s = {
            tipJoint: o(n),
            background: i,
            borderWidth: 0,
            stem: !0,
            delay: 1,
            showOn: 'creation'
          };
        return new Opentip(e, 'Creation' + e.find('.st-pop').html(), s);
      }, s = function (e) {
        var i = $(e).find('.st-pop').css('background-color');
        console.log('open-tip Click bg=', i);
        var n = t(e), s = [
            (n.left ? -1 : 1) * $(e).width() / 2,
            (n.top ? -1 : 1) * $(e).height() / 2
          ], r = {
            tipJoint: o(n),
            background: i,
            borderWidth: 0,
            stem: !0,
            delay: 0,
            showOn: 'click',
            offset: s,
            target: !0
          };
        return new Opentip(e, 'Click at x/y: ' + s[0] + '/' + s[1] + e.find('.st-pop').html(), r);
      };
    return function (e, t) {
      t.on('mouseenter.open-tips', function () {
        var e = $(t).data();
        console.log('openTip linkElement.on', 'data=', e);
        var o = e.opentips, s = null;
        for (var r in o) {
          var l = o[r];
          'mouseover' === l.options.showOn && (s = l);
        }
        if (!s) {
          s = i(t), console.log('openTip linkElement.on show mouseover tooltip', 'tmo=', s);
          var a = n(t);
          console.log('openTip linkElement.on show creation tooltip', 'tcr=', a), a.show();
        }
      }), t.on('click.open-tips', function () {
        var e = $(t).data();
        console.log('openTip linkElement.on', 'data=', e);
        var o = e.opentips, i = null;
        for (var n in o) {
          var r = o[n];
          'click' === r.options.showOn && (i = r);
        }
        i || (i = s(t), console.log('openTip linkElement.on show click tooltip', 'tcl=', i), i.show());
      });
    };
  }
]), FirstRevenueApp.directive('uiModal', [
  '$timeout',
  function (e) {
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (t, o, i, n) {
        o.addClass('modal hide'), t.$watch(i.ngModel, function (e) {
          o.modal(e && 'show' || 'hide');
        }), o.on('show.ui', function () {
          e(function () {
            n.$setViewValue(!0);
          });
        }), o.on('hide.ui', function () {
          e(function () {
            n.$setViewValue(!1);
          });
        });
      }
    };
  }
]), FirstRevenueApp.factory('Auth', [
  '$rootScope',
  '$location',
  '$resource',
  '$q',
  '$log',
  'Firebase',
  'User',
  function (e, t, o, i, n, s, r) {
    return n.log('Auth service launched'), {
      deferred: null,
      signupPasswordAuth: function () {
        n.log('Auth.signupPasswordAuth email=', r.email, 'password=', r.password), s.authClient.createUser(r.email, r.password, function (e, t) {
          n.log('Auth.signupPasswordAuth email=', r.email, 'password=', r.password), e ? n.log('Auth.signupPasswordAuth error=', e) : (n.log('Auth.signupPasswordAuth success user id=', t.id, 'email', t.email), s.authClient.login('password', {
            email: t.email,
            password: t.password,
            rememberMe: !0
          }));
        });
      },
      launchPasswordAuth: function () {
        n.log('Auth.launchPasswordAuth email=', r.email, 'password=', r.password), s.authClient.login('password', {
          email: r.email,
          password: r.password,
          rememberMe: !0
        });
      },
      launchFacebookAuth: function () {
        n.log('Auth.launchFacebookAuth'), s.authClient.login('facebook', {
          rememberMe: !0,
          scope: 'email'
        });
      },
      launchTwitterAuth: function () {
        n.log('Auth.launchTwitterAuth'), s.authClient.login('twitter', { rememberMe: !0 });
      },
      launchPersonaAuth: function () {
        n.log('Auth.launchPersonaAuth'), s.authClient.login('persona', { rememberMe: !0 });
      },
      launchGithubAuth: function () {
        n.log('Auth.launchGithubAuth'), s.authClient.login('github', {
          rememberMe: !0,
          scope: 'user:email'
        });
      },
      launchGooglePlusAuth: function () {
        this.launchSinglyAuth('gplus');
      },
      launchGoogleAuth: function () {
        this.launchSinglyAuth('google');
      },
      launchGMailPlusAuth: function () {
        this.launchSinglyAuth('gmail');
      },
      launchLinkedInAuth: function () {
        this.launchSinglyAuth('linkedin');
      },
      launchSinglyAuth: function (e) {
        var t = this;
        n.log('Auth.launchSinglyAuth');
        var i = window.location.origin + window.location.pathname + 'views/';
        WinChan.open({
          url: i + 'SinglyLaunch.html',
          relay_url: i + 'WinChanRelay.html',
          window_features: 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375',
          params: {
            client_id: '1489271c59bddce134af04384333e0a2',
            redirect_uri: i + 'SinglyRedirect.html',
            service: e,
            response_type: 'token'
          }
        }, function (e, i) {
          if (console.log('app/scripts/services/Auth.js', 'launchSinglyAuth', 'error=', e, 'response=', i), e)
            console.log('app/scripts/services/Auth.js', 'launchSinglyAuth', 'error=', e);
          else {
            console.log('app/scripts/services/Auth.js', 'launchSinglyAuth', 'response=', i);
            var n = t.decodeJWT(i.firebase);
            console.log('app/scripts/services/Auth.js', 'launchSinglyAuth', 'singlyFirebase=', n);
            var r = 'https://api.singly.com/profile?access_token=:token', l = o(r);
            l.get({ token: i.access_token }, function (e) {
              console.log('app/scripts/services/Auth.js', 'launchSinglyAuth', 'Profile.get p=', e), s.rootRef.auth(i.firebase, function (t, o) {
                if (t)
                  console.log('Singly Login Failed!', t);
                else {
                  console.log('Singly Login Succeeded! account=', o);
                  var i = {
                      provider: 'singly',
                      id: o.auth.account,
                      expires: o.expires
                    };
                  e.name && (i.name = e.name), e.url && (i.url = e.url), e.handle && (i.handle = e.handle), e.thumbnail_url && (i.thumbnail_url = e.thumbnail_url), e.services && (i.services = e.services), s.generalAuth(null, i);
                }
              });
            });
          }
        });
      },
      decodeJWT: function (e) {
        console.log('app/scripts/services/Auth.js', 'decodeJWT token=', e);
        var t = e.split('.');
        if (3 !== t.length)
          throw Error('Not enough or too many segments');
        var o = t[0], i = t[1], n = t[2];
        console.log('app/scripts/services/Auth.js', 'decodeJWT', 'headerSeg=', o, 'payloadSeg=', i, 'signatureSeg=', n);
        var s = this.base64urldecode(o), r = this.base64urldecode(i), l = this.base64urldecode(n);
        return console.log('app/scripts/services/Auth.js', 'decodeJWT', 'header=', s, 'payload=', r, 'signature=', l), s + '\n' + r + '\n' + l;
      },
      base64urldecode: function (e) {
        var t = e;
        switch (t = t.replace(/-/g, '+'), t = t.replace(/_/g, '/'), t.length % 4) {
        case 0:
          break;
        case 2:
          t += '==';
          break;
        case 3:
          t += '=';
          break;
        default:
          throw new InputException('Illegal base64url string!');
        }
        return window.atob(t);
      },
      launchGoogleAuthOld: function () {
        n.log('Auth.launchGoogleAuth'), window.FirstRevenue.Auth = this, window.open('http://localhost:7081/auth/google', 'auth', 'width=400,height=200,left=0,top=100');
      },
      launchGoogleOAuth: function () {
        n.log('Auth.launchGoogleOAuth'), window.FirstRevenue.Auth = this, window.open('http://localhost:7081/auth/google2', 'auth', 'width=400,height=200,left=0,top=100');
      },
      launchLinkedinAuthOld: function () {
        n.log('Auth.launchLinkedinAuth'), window.FirstRevenue.Auth = this, window.open('http://localhost:7081/auth/linkedin', 'auth', 'width=400,height=200,left=0,top=100');
      },
      launchPodioAuth: function () {
        n.log('Auth.launchPodioAuth'), window.FirstRevenue.Auth = this, window.open('http://localhost:7081/auth/podio', 'auth', 'width=400,height=200,left=0,top=100');
      },
      changePassword: function () {
        n.log('Auth.changePassword', 'email=', r.email, 'oldPassword=', r.password, 'newPassword=', r.newPassword), s.authClient.changePassword(r.email, r.password, r.newPassword, function (e, t) {
          n.log('Auth.changePassword done error=', e, 'success=', t), e ? n.log('Auth.changePassword error=', e) : n.log('Auth.changePassword success=', t);
        });
      },
      logoff: function () {
        n.log('Auth logoff');
        var t = i.defer();
        return e.$apply(function (e) {
          e.authenticated = !1, t.resolve('Success');
        }), t.promise;
      }
    };
  }
]), FirstRevenueApp.factory('Canvas', [
  '$rootScope',
  'Menu',
  function (e, t) {
    return {
      view: 'free',
      loaded: !1,
      modelId: 0,
      lastModelId: 0,
      model: null,
      singleBlock: null,
      showBlockInitials: !1,
      reset: function () {
        this.loaded = !1, this.model = null, this.singleBlock = null;
      },
      setView: function (e) {
        this.view = e;
      },
      toggleView: function () {
        this.view = 'free' === this.view ? 'grid' : 'free';
      },
      peerCount: function () {
        return _.size(this.model.members);
      },
      getStyle: function () {
        return 'st-list-style4';
      },
      getLogoStyle: function () {
        var e = $('.model-logotype'), t = -Math.round(e.width() / 2), o = -Math.round(e.height() / 2);
        return {
          'margin-left': t,
          'margin-top': o
        };
      },
      getGridClass: function () {
        return 'grid' === this.view ? 'pane-grid' : 'list' === this.view ? 'pane-list' : '';
      },
      getAbs: function (e) {
        return 'free' === this.view && e && e.position && e.position.absolute || !1;
      },
      getPosition: function (e) {
        return this.getAbs(e) ? 'left: ' + e.position.x + '%; top: ' + e.position.y + '%;' : '';
      },
      switchBlock: function (e) {
        console.log('switchBlock pane=', e, 'this.model.blocks=', this.model.blocks), this.singleBlock = _.find(this.model.blocks, function (t) {
          return console.log('switchBlock findingBlock b=', t), t.paneClass === e.icon;
        });
      },
      loadBlocks: function (e, o) {
        console.log('js/srv/canvas Canvas.loadBlocks model=', e), this.modelId !== this.lastModelId && (t.title = e.name, 1 > _.size(e.blocks) && (console.log('Canvas.loadBlocks modelId=', this.modelId), o(this.modelId), this.lastModelId = this.modelId), this.blocks = e.blocks, this.model = e, this.loaded = !0);
      },
      getBackgroundImageURL: function () {
        return 'images/DemoCanvasModelIcon.png';
      }
    };
  }
]), console.log('repo.FirstRevenueApp=', FirstRevenueApp), FirstRevenueApp.factory('Database', [
  'Canvas',
  'TOrg',
  'TRepo',
  'TModel',
  'TSticker',
  'TAccount',
  function (e, t, o, i, n, s) {
    return {
      orgs: {},
      repo: null,
      path: null,
      models: {},
      modelsLoaded: !1,
      members: {},
      users: {},
      tagCloud: null,
      modelLoadStartTime: null,
      modelScope: {},
      reset: function () {
        console.log('script/services/Database.reset'), this.repo = null, this.models = {}, this.modelsLoaded = !1, this.members = {}, this.users = {}, this.tagCloud = null, e.reset();
      },
      addUser: function (e) {
        console.log('script/services/Database.addUser userKey=', e), this.users[e] || (this.users[e] = {
          account: null,
          online: !1
        });
      },
      addUserAccount: function (e) {
        if (console.log('script/services/Database.addUserAccount account=', e), e) {
          var t = e.provider + '-' + e.id;
          this.users[t].account || (this.users[t].account = new s(e));
        }
      },
      monitorPresence: function (e, t) {
        if (console.log('script/services/Database.monitorPresence', 'user=', e, 'value=', t), e) {
          var o = e.provider + '-' + e.id;
          this.users[o] && (this.users[o].online = !!t);
        }
      },
      addOrg: function (e) {
        console.log('script/services/Database.addOrg orgId=', e);
        var o = this.orgs;
        return o[e] || (o[e] = new t(e)), o[e];
      },
      addRepo: function (e) {
        console.log('script/services/Database.addRepo orgs=', this.orgs, 'repoPath=', e);
        var t = this.orgs[e.orgId];
        t.repos[e.repoId] || (t.repos[e.repoId] = new o(t, e.repoId));
        var i = t.repos[e.repoId];
        return this.repo = i, this.models = i.models, this.modelsLoaded = !0, i;
      },
      addModel: function (e) {
        console.log('scripts/services/Database.addModel orgs=', this.orgs, 'modelPath=', e);
        var t = e.orgId, o = e.repoId, n = e.modelId;
        this.orgs && this.orgs[t] || this.addOrg(t), this.orgs[t].repos[o] || this.addRepo(e);
        var s = this.orgs[t].repos[o], r = s.models[n] = s.models[n] || new i(s, n);
        return r.scope = this.modelScope['/' + t + '/' + o + '/' + n], r;
      },
      updateModel: function (e, t) {
        console.log('script/services/Database.updateModel this=', this, 'fieldPath=', e, 'fieldVal=', t);
        var o = this.addModel(e);
        o[e.fieldId] = t;
      },
      updateModelUsers: function (e, t) {
        console.log('script/services/Database.updateModelUsers this=', this, 'modelPath=', e, 'usersVal=', t);
        var o = this.addModel(e);
        o.members = o.members || [];
        for (var i in t) {
          console.log('script/services/Database.updateModelUsers user in userVal=', i), o.members.push(i);
          var n = this.members[i];
          n || (n = this.members[i] = { models: [o] }), n.models.push(o), console.log('script/services/Database.updateModelUsers member=', n, 'this.members=', this.members);
        }
      },
      refreshSticker: function (e) {
        console.log('script/services/Database.refreshSticker st=', e, 'this=', this);
        var t = this.orgs[e.orgId].repos[e.repoId].models[e.modelId], o = t.blocks[e.value.block].stickers;
        o[e.id] ? o[e.id].update(e.value) : o[e.id] = new n(t, e.id, e.value);
      },
      deleteSticker: function (e) {
        console.log('script/services/Database.deleteSticker st=', e);
        var t = this.orgs[e.orgId].repos[e.repoId].models[e.modelId];
        delete t.blocks[e.value.block].stickers[e.id];
      },
      setRepo: function (e) {
        this.repo = e;
      },
      setModels: function (e, t) {
        this.models = e, this.modelsLoaded = !0;
        var o = this;
        _.each(e, function (e) {
          o.addModelToCanvas(e, t);
        });
      },
      addModelToCanvas: function (t, o) {
        console.log('script/services/Database.addModelToCanvas model=', t, 'Canvas=', e), e.loaded || e.modelId !== t.id || (console.log('js/srv/repo.addModelToCanvas loadBlocks model.id=', t.id), e.loadBlocks(t, o));
      },
      addModelLabel: function (e, t) {
        this.models[e].label = {
          name: t.name,
          descr: t.descr,
          pitch: t.pitch,
          icon: t.icon,
          link: t.link
        };
      },
      modelCount: function () {
        return this.models ? _.size(this.models) : '';
      },
      peerCount: function () {
        return _.size(this.users);
      },
      addBlocks: function (e, t) {
        angular.extend(this.models[e].blocks, t);
      },
      emptyBlock: function (e, t) {
        this.models[e].blocks[t].stickers = {};
      },
      addMembers: function (e, t) {
        var o = this.models[e];
        this.members = this.members || {}, o.members = t;
        var i = this;
        _.each(t, function (t) {
          var n = i.members[t.id];
          n || (n = i.members[t.id] = t), n.models = n.models || {}, n.models[e] = o;
        });
      },
      addTags: function (e, t) {
        var o = this.models[e];
        this.tagCloud = this.tagCloud || {}, o.tags = t;
        var i = this;
        _.each(t, function (e) {
          i.tagCloud[e.text] ? i.tagCloud[e.text] += 1 : i.tagCloud[e.text] = 1;
        });
      },
      addTagged: function (e, t, o) {
        var i = this.models[e];
        i.tagged = i.tagged || {}, i.tagged[t] = o;
      }
    };
  }
]), FirstRevenueApp.factory('Env', [function () {
    return { version: null };
  }]), FirstRevenueApp.factory('Firebase', [
  '$rootScope',
  '$timeout',
  '$location',
  'FirebaseEvents',
  'Notif',
  'Database',
  'User',
  function (e, t, o, i, n, s, r) {
    return {
      nowRemote: null,
      rootRef: null,
      authClient: null,
      fbe: i,
      connected: !1,
      connStatus: 'Offline',
      db: s,
      init: function () {
        this.rootRef = new Firebase('https://1st-revenue-test.firebaseio.com/'), Firebase.enableLogging(!0), console.log('firebase.init this.rootRef=', this.rootRef), this.fbe.init(this, this.rootRef), r.authFailed || (this.authClient = new FirebaseAuthClient(this.rootRef, this.generalAuth));
      },
      setAdmin: function (e) {
        r.adminRole = e;
      },
      loadCanvas: function (e, t, o) {
        var i = this.rootRef.child('orgs').child(e).child('repos').child(t).child('models').child(o);
        this.fbe.openModel(i);
      },
      generalAuth: function (e, s) {
        console.log('Firebase generalAuth error=', e, 'account=', s), e ? (console.log('Firebase generalAuth Firebase returned an error=', e), r.authenticated = !1, r.authFailed = !0, r.errorCode = e.code, n.add({ text: 'Authentication error: ' + e.code }), t(function () {
          o.url('/');
        })) : s ? (console.log('Firebase generalAuth Firebase auth success account=', s), r.authenticated = !0, r.provider = s.provider, r.id = s.id, r.key = r.provider + '-' + r.id, r.email = s.email, r.account = s, !r.account.name && r.account.email && (r.account.name = r.account.email.split('@')[0]), 'twitter' === r.provider ? r.image = r.account.profile_image_url : 'facebook' === r.provider ? r.image = 'http://graph.facebook.com/' + r.account.username + '/picture' : 'github' === r.provider ? r.image = r.account.avatar_url : 'persona' === r.provider ? r.image = 'http://www.gravatar.com/avatar/' + r.account.hash : 'password' === r.provider ? (r.account.hash = CryptoJS.MD5(r.account.email).toString(CryptoJS.enc.Hex), r.image = 'http://www.gravatar.com/avatar/' + r.account.hash) : r.image = 'singly' === r.provider ? r.account.thumbnail_url : null, i.userTracking(s), i.connTracking(), r.authFailed = !1, o.url('/repo')) : (console.log('Firebase generalAuth Firebase auth returned null account=', s, '$location=', o), r.authenticated = !1, r.authFailed = !0, t(function () {
          o.url('/');
        }));
      },
      log: function (e) {
        var t = new Date(), o = t.getUTCFullYear(), i = t.getUTCMonth(), n = t.getUTCDate(), s = t.getUTCHours(), l = this.rootRef.child('log').child(o).child(i).child(n).child(s);
        e.time = t.getTime(), e.timeISO = t.toISOString(), e.user = r.provider + '-' + r.id, l.push(e);
      },
      createModel: function (e) {
        var t = this, o = this.getRepoPath(e);
        console.log('Firebase.createModel repoPath=', o, 'model=', e);
        var i = this.rootRef.child(o + '/models'), n = i.push(), s = {
            name: e.name,
            icon: e.icon,
            descr: e.descr,
            pitch: e.pitch,
            users: {}
          }, l = r.provider + '-' + r.id;
        s.users[l] = !0, console.log('Firebase.createModel modelUpdate=', s), n.set(s, function (i, r) {
          if (console.log('Firebase.createModel model created repoPath=', o, 'modelUpdate=', s, 'model=', e, 'error=', i, 'dummy=', r), e.saved = !i, t.log({
              op: i ? 'createModel-error' : 'createModel',
              error: i,
              path: o + '/models/' + n.name(),
              model: s
            }), !i) {
            var a = t.rootRef.child('users').child(l).child('models');
            a.push();
            var c = '/' + e.orgId + '/' + e.repoId + '/' + n.name();
            a.set(c, function (e, t) {
              console.log('Firebase.createModel model reference stored to user', 'error=', e, 'dummy=', t);
            });
          }
        });
      },
      saveSticker: function (e) {
        var t = this, o = this.getStickerPath(e);
        console.log('Firebase.saveSticker stPath=', o, 'st=', e);
        var i = this.rootRef.child(o);
        e.notes = e.notes || '';
        var n = {
            title: e.title,
            notes: e.notes,
            color: e.color.name
          };
        e.position && (e.position.x && (n.x = e.position.x), e.position.y && (n.y = e.position.y)), i.update(n, function (i, s) {
          console.log('Firebase.saveSticker sticker saved stPath=', o, 'stUpdate=', n, 'st=', e, 'error=', i, 'dummy=', s), e.saved = !i, t.log({
            op: 'saveSticker',
            path: o,
            sticker: n
          });
        });
      },
      createSticker: function (e) {
        var t = this, o = this.getModelPath(e);
        console.log('Firebase.createSticker modelPath=', o, 'st=', e);
        var i = this.rootRef.child(o + '/stickers'), n = i.push();
        e.notes = e.notes || '';
        var s = {
            title: e.title,
            notes: e.notes,
            block: e.block,
            color: e.color.name
          };
        e.position && (e.position.x && (s.x = e.position.x), e.position.y && (s.y = e.position.y)), console.log('Firebase.createSticker sticker before set modelPath=', o, 'stUpdate=', s), n.set(s, function (i, r) {
          console.log('Firebase.createSticker sticker created modelPath=', o, 'stUpdate=', s, 'st=', e, 'error=', i, 'dummy=', r), e.saved = !i, t.log({
            op: 'saveSticker',
            path: o + '/stickers/' + n.name(),
            sticker: s
          });
        });
      },
      getStickerPath: function (e) {
        return '/orgs/' + e.orgId + '/repos/' + e.repoId + '/models/' + e.modelId + '/stickers/' + e.id;
      },
      getModelPath: function (e) {
        return '/orgs/' + e.orgId + '/repos/' + e.repoId + '/models/' + e.modelId;
      },
      getRepoPath: function (e) {
        return '/orgs/' + e.orgId + '/repos/' + e.repoId;
      },
      getOrgPath: function (e) {
        return '/orgs/' + e.id;
      },
      deleteSticker: function (e) {
        var t = this, o = this.getStickerPath(e), i = this.rootRef.child(o);
        i.remove(function (i, n) {
          i ? console.log('Firebase deleteSticker Sticker could not be deleted id=', e.id) : console.log('Firebase deleteSticker Sticker deleted id=', e.id, 'dummy=', n), t.log({
            op: 'deleteSticker',
            path: o
          });
        });
      },
      saveStickerPosition: function (e) {
        var t = this, o = this.getStickerPath(e), i = this.rootRef.child(o), n = {
            x: e.position.x,
            y: e.position.y
          };
        i.update(n, function (i, s) {
          console.log('Firebase.saveStickerPosition sticker saved stPath=', o, 'stUpdate=', n, 'sticker=', e, 'error=', i, 'dummy=', s), t.log({
            op: 'saveStickerPosition',
            path: o,
            sticker: n
          });
        });
      }
    };
  }
]), FirstRevenueApp.factory('FullScreen', [
  '$window',
  'Notif',
  function (e, t) {
    return {
      fullScreenActive: !1,
      isFullScreen: function () {
        return e.navigator.standalone;
      },
      toggle: function () {
        if (this.fullScreenActive = !this.fullScreenActive, this.fullScreenActive) {
          var e = $('.first-revenue').get(0);
          e.requestFullScreen ? e.requestFullScreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen(), t.add({ text: 'Full screen mode entered' });
        } else
          t.add({ text: 'Full screen mode closed' });
      }
    };
  }
]), FirstRevenueApp.factory('Info', [function () {
    return {
      view: {
        model: !1,
        sticker: !1,
        user: !1,
        contact: !1,
        status: '',
        wide: !0,
        show: function (e) {
          this.status = e;
        },
        current: function (e) {
          return this.status === e;
        },
        toggle: function () {
          this.wide = !this.wide;
        }
      },
      contactProvider: null,
      stickerModified: !1,
      reset: function () {
        this.view.model = this.view.sticker = this.view.user = this.view.contact = !1, this.stickerId = null;
      },
      show: function (e) {
        this.view[e] || this.toggle(e);
      },
      hide: function (e) {
        this.view[e] && this.toggle(e);
      },
      toggle: function (e) {
        'model' === e || 'sticker' === e ? (this.view[e] = !this.view[e], this.view[e] && (this.view.user = !1, this.view.contact = !1)) : ('user' === e || 'contact' === e) && (this.view[e] = !this.view[e], this.view.contact && (this.view.user = !0), this.view.user ? (this.view.model = !1, this.view.sticker = !1) : this.view.contact = !1), this.view.sticker || $('.pulsate').removeClass('pulsate');
      },
      infoMode: function () {
        return this.view.model || this.view.sticker || this.view.user || this.view.contact;
      },
      stickerButtonBlue: function () {
        return this.view.sticker && !this.stickerModified;
      },
      stickerButtonRed: function () {
        return this.view.sticker && this.stickerModified;
      },
      stickerIconWhite: function () {
        return this.view.sticker;
      },
      stickerIconRed: function () {
        return !this.view.sticker && this.stickerModified;
      }
    };
  }]), FirstRevenueApp.factory('Layout', [
  '$window',
  'Database',
  'Popup',
  'Zoom',
  'FullScreen',
  'Menu',
  function (e, t, o, i, n, s) {
    return {
      title: '',
      colorValue: 100,
      view: '',
      setView: function (e) {
        this.view = e;
      },
      isView: function (e) {
        return this.view === e;
      },
      tooltips: !0,
      profile: !0,
      guide: { wide: !0 },
      peer: { wide: !0 },
      editor: {
        model: !1,
        sticker: !1,
        contact: !1,
        user: !1
      },
      reset: function () {
        t.reset(), o.reset(), i.reset(), this.view = '', this.guide.wide = !0, this.peer.wide = !1;
      },
      isFullScreen: function () {
        return e.navigator.standalone;
      },
      showButtons: function () {
        return 'canvas' === s.selected;
      }
    };
  }
]), FirstRevenueApp.factory('MemberCatalog', [
  'Database',
  function (e) {
    return {
      sort: null,
      getMembers: function () {
        return e.users;
      },
      getTitle: function (e) {
        return e.title ? e.title[0] : '';
      },
      getFullTitle: function (e) {
        var t = '';
        if (e.title)
          for (var o in e.title)
            t += e.title[o] + '\n';
        return t;
      },
      modelCount: function (e) {
        return e.models ? _.size(e.models) : 0;
      },
      highlightModels: function (e) {
        console.log('highlightModels member=', e, 'event=', event), $(event.target).parent().children().css('color', 'darkred');
      }
    };
  }
]), FirstRevenueApp.value('Menu', {
  title: '1st Revenue',
  selected: 'home',
  visible: [
    'home',
    'logon'
  ],
  def: {
    home: {
      label: 'Home',
      route: 'home',
      icon: 'home'
    },
    logon: {
      label: 'Logon',
      route: 'logon',
      icon: 'user'
    },
    admin: {
      label: 'Admin',
      route: 'admin',
      icon: 'wrench'
    },
    repo: {
      label: 'Repo',
      route: 'repo',
      icon: 'list'
    },
    canvas: {
      label: 'Canvas',
      route: 'canvas',
      icon: 'th-large'
    },
    create: {
      label: 'Create',
      route: 'canvas/new',
      icon: 'edit'
    }
  },
  toggle: function (e) {
    this[e] = !this[e];
  }
}), FirstRevenueApp.factory('Modal', [function () {
    return {
      logon: !1,
      logoff: !1,
      dup: !1,
      dis: !1,
      del: !1,
      delNoRights: !1,
      sticker: null,
      openDeleteStickerDialog: function (e) {
        this.sticker = e, this.isDeleteAllowed(this.sticker) ? this.del = !0 : this.delNoRights = !0;
      },
      isDeleteAllowed: function () {
        return !0;
      }
    };
  }]), FirstRevenueApp.factory('Model', [function () {
    return {
      modelId: null,
      model: null
    };
  }]), FirstRevenueApp.factory('ModelCatalog', [
  'Database',
  'TagCatalog',
  function (e, t) {
    var o = e;
    return {
      sort: 'time',
      tag: '*',
      ascending: !0,
      backInTime: !0,
      refreshModels: function () {
      },
      getModels: function (e) {
        var t = {};
        for (var i in o.orgs) {
          var n = o.orgs[i];
          for (var s in n.repos) {
            var r = n.repos[s];
            for (var l in r.models) {
              var a = r.models[l];
              ('all' === e || ('my' === e || 'recent' === e) && 'private' === a.scope || 'public' === e && 'public' === a.scope) && (t['/' + i + '/' + s + '/' + l] = a);
            }
          }
        }
        return this.sortModelList(t);
      },
      sortModelList: function (e) {
        var t = e;
        return 'name' === this.sort && (t = _.sortBy(e, function (e) {
          return e.name;
        }), this.ascending || t.reverse()), 'time' === this.sort && (t = _.sortBy(e, function (e) {
          return e.id;
        }), this.backInTime && t.reverse()), t;
      },
      nameSortOrder: function () {
        return this.ascending ? 'a-z' : 'z-a';
      },
      timeSortIconSuffix: function () {
        return (this.backInTime ? '-back' : '') + ('time' === this.sort ? '-white' : '');
      },
      getMemberCount: function (e) {
        return e.members ? _.size(e.members) : 0;
      },
      highlightMembers: function (e) {
        console.log('highlightMembers model=', e, 'event=', event), $(event.target).parent().children().css('color', 'darkred');
      },
      getAllTags: function () {
        var t = [];
        _.each(e.models, function (e) {
          console.log('getAllTags model loop model.id=', e.id), _.each(e.tags, function (e) {
            console.log('getAllTags tag loop tag.text=', e.text), t.push({
              text: e.text,
              type: 'info',
              count: 1
            });
          });
        });
        var o = t;
        return console.log('getAllTags allTags=', o), o;
      },
      sortModels: function (e) {
        'name' === this.sort ? 'name' === e ? this.ascending = !this.ascending : (this.sort = e, this.ascending = !0) : 'time' === this.sort && ('time' === e ? this.backInTime = !this.backInTime : (this.sort = e, this.backInTime = !0));
      },
      labelColor: function (e) {
        return e === this.tag ? 'label-success' : 'label-info';
      },
      filterMatch: function (e) {
        var o = t.tag, i = !1;
        if (o)
          if ('*' === o)
            i = !0;
          else {
            var n = _.find(e, function (e) {
                return e.text === o;
              });
            i = !!n;
          }
        else
          i = 0 === e.length;
        return i;
      }
    };
  }
]), FirstRevenueApp.factory('Monitor', [function () {
    return {
      rateStats: null,
      globalStats: null,
      getRateStats: function (e) {
        var t = this;
        now.getRateStats(function (o) {
          console.log('Monitor.getRateStats=', o), t.rateStats = o, e();
        }), now.getGlobalStats(function (o) {
          console.log('Monitor.getGlobalStats=', o), t.globalStats = o, e();
        });
      }
    };
  }]), console.log('notif.modServices=', FirstRevenueApp), FirstRevenueApp.factory('Notif', [
  'Popup',
  function (e) {
    return {
      list: {},
      next: 0,
      show: !1,
      add: function (e) {
        console.log('realtime addNotif', e), e.seq = this.next, e.time = new Date(), e.type || (e.type = 'info'), this.list[this.next++] = e;
      },
      remove: function (e) {
        console.log('Notif.delete index=', e, 'item=', this.list[e]), delete this.list[e], console.log('Notif.delete deleted notif=', this.list);
      },
      count: function () {
        return _.size(this.list);
      },
      get: function (e) {
        return this.list[e];
      },
      getList: function () {
        return this.list;
      },
      clear: function () {
        this.list = {}, this.next = 0, e.notif = !1;
      }
    };
  }
]), FirstRevenueApp.value('Popup', {
  slider: !1,
  version: !1,
  zoom: !1,
  license: !1,
  member: !1,
  palette: !1,
  notif: !1,
  reset: function () {
    this.slider = this.version = this.zoom = this.license = this.member = this.palette = this.notif = !1;
  },
  toggle: function (e) {
    this[e] = !this[e];
  }
}), FirstRevenueApp.factory('RGB', [function () {
    return {
      hsvObject: function (e, t, o) {
        this.h = e, this.s = t, this.v = o, this.validate = function () {
          0 >= this.h && (this.h = 0), 0 >= this.s && (this.s = 0), 0 >= this.v && (this.v = 0), this.h > 360 && (this.h = 360), this.s > 100 && (this.s = 100), this.v > 100 && (this.v = 100);
        };
      },
      rgbObject: function (e, t, o) {
        this.r = e, this.g = t, this.b = o, this.validate = function () {
          0 >= this.r && (this.r = 0), 0 >= this.g && (this.g = 0), 0 >= this.b && (this.b = 0), this.r > 255 && (this.r = 255), this.g > 255 && (this.g = 255), this.b > 255 && (this.b = 255);
        };
      },
      hexify: function (e) {
        var t = '0123456789ABCDEF', o = e % 16, i = (e - o) / 16, n = t.charAt(i) + t.charAt(o);
        return n;
      },
      decimalize: function (e) {
        var t = '0123456789ABCDEF';
        return 16 * t.indexOf(e.charAt(0).toUpperCase()) + t.indexOf(e.charAt(1).toUpperCase());
      },
      hex2rgb: function (e, t) {
        t.r = this.decimalize(e.substring(1, 3)), t.g = this.decimalize(e.substring(3, 5)), t.b = this.decimalize(e.substring(5, 7));
      },
      rgb2hex: function (e) {
        return '#' + this.hexify(e.r) + this.hexify(e.g) + this.hexify(e.b);
      },
      rgb2hsv: function (e, t) {
        var o = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(o, i, n), r = Math.max(o, i, n), l = r - s;
        if (t.v = r, 0 === l)
          t.h = 0, t.s = 0;
        else {
          t.s = l / r;
          var a = ((r - o) / 6 + l / 2) / l, c = ((r - i) / 6 + l / 2) / l, d = ((r - n) / 6 + l / 2) / l;
          o === r ? t.h = d - c : i === r ? t.h = 1 / 3 + a - d : n === r && (t.h = 2 / 3 + c - a), 0 > t.h && (t.h += 1), t.h > 1 && (t.h -= 1);
        }
        t.h *= 360, t.s *= 100, t.v *= 100;
      },
      hsv2rgb: function (e, t) {
        var o = e.h / 360, i = e.s / 100, n = e.v / 100;
        if (0 === i)
          t.r = 255 * n, t.g = 255 * n, t.b = 255 * n;
        else {
          var s, r, l, a = 6 * o, c = Math.floor(a), d = n * (1 - i), u = n * (1 - i * (a - c)), h = n * (1 - i * (1 - (a - c)));
          0 === c ? (s = n, r = h, l = d) : 1 === c ? (s = u, r = n, l = d) : 2 === c ? (s = d, r = n, l = h) : 3 === c ? (s = d, r = u, l = n) : 4 === c ? (s = h, r = d, l = n) : (s = n, r = d, l = u), t.r = 255 * s, t.g = 255 * r, t.b = 255 * l;
        }
      }
    };
  }]), FirstRevenueApp.factory('Rainbow', [
  'Canvas',
  'RGB',
  function (e, t) {
    return {
      canvas: e,
      rgb: t,
      colorMap: {
        red: {
          id: 1,
          text: 'Red',
          code: 'F7D1D0'
        },
        yellow: {
          id: 2,
          text: 'Yellow',
          code: 'F7F0C5'
        },
        gray: {
          id: 3,
          text: 'Gray',
          code: 'EFEFEF'
        },
        blue: {
          id: 4,
          text: 'Blue',
          code: 'D2E4EB'
        },
        magenta: {
          id: 5,
          text: 'Magenta',
          code: 'E1D8ED'
        },
        salmon: {
          id: 6,
          text: 'Salmon',
          code: 'FFD5C2'
        },
        cyan: {
          id: 7,
          text: 'Cyan',
          code: 'D1F3EC'
        },
        neutral: {
          id: 8,
          text: 'Neutral',
          code: 'FFFFFF'
        },
        green: {
          id: 9,
          text: 'Green',
          code: 'DCEBD8'
        }
      },
      getColorMap: function () {
        return this.colorMap;
      },
      getColor: function (e) {
        var t = this.colorMap[e];
        return t || this.colorMap.neutral;
      },
      colorList: function () {
        var e = $.map(this.colorMap, function (e, t) {
            return 'neutral' === t ? null : t;
          });
        return e;
      },
      colorCodeList: function () {
        var e = $.map(this.colorMap, function (e, t) {
            var o = e;
            return o.name = t, 'neutral' === t ? null : o;
          });
        return e;
      },
      brighten: function (e) {
        return e = e || 'FF0000', this.brightenFull(e);
      },
      brightenFull: function (e, t, o) {
        var i = new this.rgb.rgbObject(0, 0, 0), n = new this.rgb.hsvObject(0, 0, 0);
        return this.rgb.hex2rgb('#' + e, i), this.rgb.rgb2hsv(i, n), 0 === n.s ? 100 > n.v && (n.v = o ? o : 80) : (n.s = t ? t : 50, n.v = o ? o : 100), this.rgb.hsv2rgb(n, i), this.rgb.rgb2hex(i).substring(1);
      },
      opaqueField: function (e) {
        var t = new this.rgb.rgbObject(0, 0, 0), o = new this.rgb.hsvObject(0, 0, 0);
        return e || (e = 'EFEFEF'), this.rgb.hex2rgb('#' + e, t), this.rgb.rgb2hsv(t, o), 100 > o.v ? o.v = 100 : o.s = 0 === o.s ? 0 : Math.max(0, o.s - 10), this.rgb.hsv2rgb(o, t), this.rgb.rgb2hex(t).substring(1);
      }
    };
  }
]), FirstRevenueApp.factory('RrrrRrrr', [function () {
    return {
      getImageLink: function () {
        var e = Math.floor(Math.random() * this.rrrrrrrrImages.length);
        return this.imageLinkPrefix + this.rrrrrrrrImages[e] + this.imageLinkSuffix;
      },
      imageLinkPrefix: 'http://24.media.tumblr.com/tumblr_m',
      imageLinkSuffix: '1rt0g8wo1_500.gif',
      rrrrrrrrImages: [
        'euuwtJ9nV',
        'dvka3G41p',
        'dj1obEOlh',
        'd65evMYkd',
        'cnh5cn9C1',
        'ccire33IK',
        'bxp00m7C0',
        'bpvhrbHPo',
        'bd83rnrYp',
        'b7s2s3EV3',
        'b0f8a4pgB',
        'ankvxXfq3',
        'aami4M0HW',
        '9x0hbDvcs',
        '9rnf2HAO9',
        '9k651ina7',
        '9er5rZyEg',
        '91f14NyEA',
        '91etz18X0',
        '8ogrxZX77',
        '8ogo21KEv',
        '8h55wLclu',
        '8bjmzW8bc',
        '84a7mPsXs',
        '7yo1n6Rfq',
        '7rcy6WHk8',
        '7khbxGWM8',
        '7egxdQaZ1',
        '78mc8Yldh',
        '71lryYOAM',
        '6wfa4Cp85',
        '6omiiIOmH',
        '6j60b07bX',
        '6bj3lYuJI',
        '6682mxtuF',
        '5ypkjdWsh',
        '5sxx323Rm',
        '5ldoe1E2b',
        '5g2nqAeU8',
        '58gra1RRz',
        '52o9pcvrd',
        '4w7mn4fxb',
        '4qg8knCAj',
        '4j0e4jRq4',
        '47h6bViV8',
        '47h3k3RZW',
        '3xsjeuvbO',
        '34rmyHRsK',
        '3n2nqGWe7',
        '3efuq0DT4',
        '3efroqt6b',
        '34rjhIzwL',
        '33a7fTeZ3',
        '2xt4ciY73',
        '2s55mYp1q',
        '2mos9dUK7',
        '2gxxmlC3S',
        '2b3fzb5HQ',
        '27hm76FGR',
        '244o3I4Fv',
        '20202MWiD',
        '1wjlbI0Zw',
        '1uj03PKyA',
        '1uht5a12i'
      ]
    };
  }]), FirstRevenueApp.factory('TagCatalog', [
  'Database',
  function (e) {
    return {
      tag: '*',
      getTagCloud: function () {
        return e.tagCloud;
      },
      tagFilter: function (e) {
        this.tag = e;
      },
      labelColor: function (e) {
        var t = this.colorClass(e);
        return t ? 'label-' + t : '';
      },
      badgeColor: function (e) {
        var t = this.colorClass(e);
        return t ? 'badge-' + t : '';
      },
      colorClass: function (e) {
        return e && '*' !== e ? e === this.tag ? 'success' : 'info' : e === this.tag ? 'success' : '';
      },
      getModelCount: function () {
        return e.models ? _.size(e.models) : 0;
      },
      getTaggedCount: function () {
        return this.getModelCount() - this.getUntaggedCount();
      },
      getUntaggedCount: function () {
        var t = 0;
        return _.each(e.models, function (e) {
          e.tags && 0 !== e.tags.length || ++t;
        }), t;
      }
    };
  }
]), FirstRevenueApp.factory('User', [
  '$log',
  function (e) {
    return e.log('User service launched'), {
      key: null,
      account: null,
      authenticated: !1,
      authFailed: !1,
      provider: null,
      username: null,
      password: null,
      token: null,
      profile: null,
      adminRole: !1,
      isMyself: function (e) {
        return e === this.key;
      }
    };
  }
]), FirstRevenueApp.factory('Zoom', [
  'Popup',
  'Canvas',
  function (e, t) {
    return {
      choice: 0,
      singleBlock: !1,
      levels: {
        0: {
          label: 'full',
          title: 'Full canvas'
        },
        1: {
          label: 'customer',
          title: 'Product market fit'
        },
        2: {
          label: 'revenue',
          title: 'Customer facing side'
        },
        3: {
          label: 'cost',
          title: 'Cost'
        },
        4: {
          label: 'single',
          title: 'Single block'
        },
        5: {
          label: 'equal',
          title: 'Equal area'
        }
      },
      reset: function () {
        this.choice = 0, this.singleBlock = !1;
      },
      zoom: function (o) {
        console.log('Zoom choice=', o);
        var i = $('.first-revenue').find('.views');
        for (var n in this.levels)
          i.removeClass('canvas-' + this.levels[n].label);
        i.addClass('canvas-' + this.levels[o].label), 4 === o ? (this.block = this.block || _.find(t.model.blocks, function (e) {
          return 'VP' === e.paneClass;
        }), this.singleBlock = t.singleBlock = this.block) : this.singleBlock = t.singleBlock = null, this.choice = o, e.zoom = !1;
      }
    };
  }
]), FirstRevenueApp.factory('Contacts', [function () {
    return {
      contacts: {},
      loadContacts: function (e) {
        var t = this;
        now.loadContacts(e, function (o) {
          t.contacts[e] = o;
        });
      }
    };
  }]), FirstRevenueApp.factory('Hooks', [
  'Notif',
  function (e) {
    return {
      matrix: null,
      spaceList: {},
      spaceNames: {},
      markedHooks: {},
      checkMarked: function (e) {
        return 'marked' === this.markedHooks[e];
      },
      checkDeleted: function (e) {
        return 'deleted' === this.markedHooks[e];
      },
      countMarked: function () {
        var e = 0;
        return _.each(this.markedHooks, function (t) {
          'marked' === t && e++;
        }), e;
      },
      removeMarked: function () {
        var e = this;
        console.log('Hooks removeMarked started'), _.each(this.markedHooks, function (t, o) {
          'marked' === t && (console.log('Removing hook ', o), e.markedHooks[o] = 'deleted');
        }), console.log('Hooks removeMarked finished');
      },
      markHook: function (e) {
        'normal' === this.markedHooks[e] ? this.markedHooks[e] = 'marked' : 'marked' === this.markedHooks[e] && (this.markedHooks[e] = 'normal'), console.log('Hooks markHook hookId=', e, 'value=', this.markedHooks[e]);
      },
      loadHooksForApp: function (e, t, o) {
        var i = this;
        now.loadHookDataForApp(t, o, function (n, s) {
          console.log('hooks loadHooks callback spaceId=', t, 'appId=', o, 'hookList=', s);
          var r = {};
          _.each(s, function (e) {
            var t = r[e.url] = r[e.url] || {};
            t.type = t.type || {}, t.type[e.type] = e, t.name = e.created_via.name, t.date = e.created_on, i.markedHooks[e.hook_id] = 'normal';
          }), i.spaceList[t][o].hooks = r, e.$root.$apply();
        });
      },
      loadHooks: function (t) {
        var o = this;
        now.loadHookData(function (i, n, s, r) {
          if (i) {
            var l = {
                type: 'error',
                text: 'Error: ' + i.error_description
              };
            e.add(l);
          } else {
            console.log('hooks loadHooks callback spaceId=', n, 'spaceName=', s, 'appList=', r);
            var a = {};
            _.each(r, function (e) {
              a[e.app_id] = e;
            }), o.spaceList[n] = a, o.spaceNames[n] = s;
          }
          t.$root.$apply();
        });
      }
    };
  }
]), FirstRevenueApp.factory('ContactEditor', [
  'Editor',
  function (e) {
    return console.log('ContactEditor Editor=', e), {};
  }
]), FirstRevenueApp.factory('ModelEditor', [
  'Canvas',
  function (e) {
    return {
      model: null,
      shadow: {
        name: null,
        icon: null,
        descr: null,
        pitch: null
      },
      matchModelDescr: function (t) {
        var o = e.model.label;
        if (o) {
          var i = _.find(t.fields, function (e) {
              return 'Notes' === e.label;
            });
          if (i) {
            var n = i.values[0].value;
            return n === t.notes;
          }
          return '' === t.notes;
        }
        return !0;
      }
    };
  }
]), FirstRevenueApp.factory('StickerEditor', [
  '$window',
  '$log',
  'Layout',
  'Firebase',
  'Rainbow',
  'TSticker',
  function (e, t, o, i, n, s) {
    return {
      active: !1,
      block: null,
      sticker: null,
      rainbow: n,
      firebase: i,
      showSticker: function (e, t, i) {
        console.log('StickerEditor showSticker model=', e, ' blockId=', t, 'stickerId=', i);
        var n = this;
        this.active = !0, this.block = e.blocks[t], 0 === i ? (this.sticker = new s(e, 0, { block: t }), this.block.stickers[0] = this.sticker) : this.sticker = this.block.stickers[i], o.editor.sticker = !0, setTimeout(function () {
          n.focusTitle();
        }, 0);
      },
      saveSticker: function () {
        console.log('StickerEditor saveSticker');
        var e = this.sticker;
        this.wasStickerModified() && (console.log('StickerEditor saving modified sticker', 'id=', e.id, 'sticker=', e), 0 === e.id ? (this.firebase.createSticker(e), delete this.block.stickers[0]) : this.firebase.saveSticker(e)), this.preserveModifications(e), this.active = !1, this.sticker = null, o.editor.sticker = !1;
      },
      preserveModifications: function (e) {
        e.shadow.title = e.title, e.shadow.notes = e.notes, e.shadow.color = e.color.id;
      },
      discardEmptySticker: function () {
        this.sticker && 0 === this.sticker.id && !this.wasStickerModified() && (delete this.block.stickers[0], this.sticker = null);
      },
      discardChanges: function () {
        console.log('StickerEditor discardChanges');
        var e = this.sticker;
        if (this.sticker)
          if (0 === this.sticker.id)
            delete this.block.stickers[0], this.sticker = null;
          else if (this.wasStickerModified()) {
            console.log('StickerEditor discarding modified sticker changes', 'id=', e.id, 'sticker=', e), e.title = e.shadow.title || '', e.notes = e.shadow.notes || '';
            var t = n.getColor(e.shadow.color);
            e.color = {
              id: t.id,
              code: t.code,
              text: t.text
            }, console.log('StickerEditor after discarding changes', 'id=', e.id, 'sticker=', e);
          }
        this.active = !1;
      },
      setColor: function (e) {
        var t = this.sticker, o = this.rainbow.getColor(e);
        o && (t.color = {
          id: o.id,
          name: e,
          code: o.code,
          text: o.text
        });
      },
      checkModelRights: function (e) {
        return console.log('StickerEditor checkModelRights rightName=', e), !0;
      },
      matchTitle: function () {
        var e = this.sticker;
        return e && e.shadow ? e.shadow.title === e.title : !0;
      },
      matchNotes: function () {
        var e = this.sticker;
        return e && e.shadow ? e.shadow.notes === e.notes : !0;
      },
      matchColor: function () {
        var e = this.sticker;
        return e && e.shadow && e.color ? e.shadow.color === e.color.name : !0;
      },
      wasStickerModified: function () {
        var e = !(this.matchTitle() && this.matchNotes() && this.matchColor());
        return e;
      },
      focusTitle: function () {
        var e = $('.field-title').get(0);
        this.placeCaretAtEnd(e);
      },
      placeCaretAtEnd: function (t) {
        if (t.focus(), void 0 !== e.getSelection && void 0 !== e.document.createRange) {
          var o = e.document.createRange();
          o.selectNodeContents(t), o.collapse(!1);
          var i = e.getSelection();
          i.removeAllRanges(), i.addRange(o);
        } else if (void 0 !== e.document.body.createTextRange) {
          var n = e.document.body.createTextRange();
          n.moveToElementText(t), n.collapse(!1), n.select();
        }
      }
    };
  }
]), FirstRevenueApp.factory('UserEditor', [
  'Editor',
  function (e) {
    return console.log('UserEditor Editor=', e), {};
  }
]), FirstRevenueApp.factory('FirebaseEvents', [
  '$timeout',
  'Database',
  function (e, t) {
    var o = 'scripts/services/firebase/events/FirebaseEvents', i = {
        fb: null,
        rootRef: null,
        presenceRef: null,
        db: t,
        userId: null,
        account: null,
        init: function (e, t) {
          console.log(o, 'init', 'fb=', e, 'rootRef=', t, 'db=', i.db), i.fb = e, i.rootRef = t;
        },
        connTracking: function () {
          var e = i.rootRef.child('.info/connected');
          e.on('value', function (t) {
            i.fb.connected = t.val(), i.fb.connStatus = i.fb.connected ? 'Connected' : 'Offline', i.fb.connected && i.presenceRef && i.presenceRef.set(!0), console.log('firebase.init connRef .info/connected connRef=', e, 'snap=', t, 'fb.connected=', i.fb.connected, 'fb.connStatus=', i.fb.connStatus);
          });
        },
        userTracking: function (e) {
          i.account = e, i.userId = e.provider + '-' + e.id, i.presenceRef = i.rootRef.child('presence').child(i.userId), i.presenceRef.onDisconnect().set(!1), i.presenceRef.set(!0);
          var t = i.rootRef.child('users').child(i.userId);
          t.once('value', i.myselfValue);
          var o = i.rootRef.child('admins').child(i.userId);
          o.on('value', i.adminValue);
        },
        myselfValue: function (e) {
          if (console.log('myselfValue snap.val()=', e.val()), i.account.stored && e.val())
            angular.extend(i.account, e.val().account);
          else if (i.account.updateInProgress)
            console.log('myselfValue updateInProgress for account=', i.account);
          else {
            console.log('myselfValue setting account=', i.account), delete i.account.firebaseAuthToken, i.account.updateInProgress = !0, e.ref().child('account').set(i.account), i.fb.log({
              op: 'setMyself',
              path: '/users/' + i.userId + '/account',
              account: i.account
            }), i.account.updateInProgress = !1, i.account.stored = !0;
            var t = e.ref().child('models');
            t.on('value', i.privateTree);
            var o = i.rootRef.child('public');
            o.on('value', i.publicTree);
          }
        },
        adminValue: function (e) {
          var t = e.val();
          console.log('adminValue av=', t), null !== t && (console.log('adminValue user has admin privileges'), i.fb.setAdmin(!0), i.fb.log({
            op: 'adminConnected',
            path: '/admins/' + i.userId,
            value: t
          }));
        },
        privateTree: function (e) {
          i.loadModelTree('private', e);
        },
        publicTree: function (e) {
          i.loadModelTree('public', e);
        },
        loadModelTree: function (t, n) {
          var s = n.val();
          console.log(o, 'publicTree publicFlag=', t, 'tree=', s), e(function () {
            i.db.modelsLoaded = !0;
          });
          for (var r in s) {
            console.log(o, 'loadModelTree key=', r, 'tree[key]=', s[r]);
            var l = s[r];
            if ('/' === l[0]) {
              var a = l.split('/'), c = a[1], d = a[2], u = a[3];
              if (console.log(o, 'loadModelTree org=', c, 'repo=', d, 'model=', u), c && d && u) {
                var h = i.rootRef.child('orgs').child(c).child('repos').child(d).child('models').child(u);
                console.log(o, 'loadModelTree', 'fbe.db.modelScope=', i.db.modelScope, 'pathStr=', l, 'modelRef=', h), i.db.modelScope[l] || (console.log(o, 'loadModelTree on model props'), h.child('name').on('value', i.modelFieldValue), h.child('group').on('value', i.modelFieldValue), h.child('icon').on('value', i.modelFieldValue), h.child('descr').on('value', i.modelFieldValue), h.child('pitch').on('value', i.modelFieldValue), h.child('group').on('value', i.modelFieldValue), h.child('users').on('value', i.modelUsers), i.db.modelScope[l] = t);
              }
            }
          }
        },
        modelFieldValue: function (t) {
          console.log(o, 'modelFieldValue', 'modelFieldSnap.name()=', t.name());
          var n = t.val();
          if (n) {
            var s = t.ref(), r = i.getModelPath(s.parent());
            r.fieldId = t.name(), e(function () {
              i.db.updateModel.call(i.db, r, n);
            }, 0);
          }
        },
        modelUsers: function (t) {
          var n = t.val();
          console.log(o, 'modelUsers', 'users=', n);
          var s = t.ref().parent(), r = i.getModelPath(s);
          t.forEach(function (e) {
            i.db.addUser.call(i.db, e.name()), i.rootRef.child('users').child(e.name()).child('account').on('value', i.modelAccountValue), i.rootRef.child('presence').child(e.name()).on('value', i.presenceValue);
          }), e(function () {
            i.db.updateModelUsers.call(i.db, r, n);
          }, 0);
        },
        getModelPath: function (e) {
          var t = e.parent().parent(), o = t.parent().parent();
          return {
            orgId: o.name(),
            repoId: t.name(),
            modelId: e.name()
          };
        },
        getModelPathKey: function (e) {
          var t = i.getModelPath(e);
          return '/' + t.orgId + '/' + t.repoId + '/' + t.modelId;
        },
        modelAccountValue: function (t) {
          console.log(o, 'modelAccountValue', 'accountSnap.val(()=', t.val()), e(function () {
            i.db.addUserAccount.call(i.db, t.val());
          }, 0);
        },
        presenceValue: function (t) {
          e(function () {
            i.db.monitorPresence.call(i.db, t.name(), t.val());
          }, 0);
        },
        openModel: function (e) {
          console.log(o, 'openModel', 'modelRef.name()=', e.name());
          var t = e.child('stickers');
          t.on('child_added', i.stAdded), t.on('child_removed', i.stRemoved);
        },
        stAdded: function (e) {
          console.log(o, 'stAdded', 'stSnap.name()=', e.name()), e.ref().on('value', i.stValue);
        },
        stRemoved: function (e) {
          console.log(o, 'stRemoved', 'oldStSnap=', e), i.db.deleteSticker.call(i.db, i.getStPath(e)), e.ref().off('value', i.stValue);
        },
        stValue: function (e) {
          console.log(o, 'stValue', 'stSnap.name()=', e.name()), e.val() && i.db.refreshSticker.call(i.db, i.getStPath(e));
        },
        getStPath: function (e) {
          var t = e.ref(), o = t.parent().parent(), n = i.getModelPath(o);
          return n.id = t.name(), n.value = e.val(), n;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('TAccount', [function () {
    var e = function (e) {
      this.provider = e.provider, this.id = e.id, this.name = e.name || e.email, 'twitter' === e.provider ? this.image = e.profile_image_url : 'facebook' === e.provider ? this.image = '//graph.facebook.com/' + e.username + '/picture' : 'github' === e.provider ? this.image = e.avatar_url : 'persona' === e.provider ? this.image = '//www.gravatar.com/avatar/' + e.hash : 'password' === e.provider && (this.image = '//www.gravatar.com/avatar/' + CryptoJS.MD5(e.email).toString(CryptoJS.enc.Hex));
    };
    return e;
  }]), FirstRevenueApp.factory('TModel', [function () {
    var e = [
        {
          id: 'KP',
          iconId: 106,
          initials: 'KP',
          name: 'Key Partnerships'
        },
        {
          id: 'KA',
          iconId: 51,
          initials: 'KA',
          name: 'Key Activities'
        },
        {
          id: 'KR',
          iconId: 82,
          initials: 'KR',
          name: 'Key Resources'
        },
        {
          id: 'VP',
          iconId: 89,
          initials: 'VP',
          name: 'Value Propositions'
        },
        {
          id: 'CR',
          iconId: 83,
          initials: 'CR',
          name: 'Customer Relationships'
        },
        {
          id: 'CH',
          iconId: 261,
          initials: 'CH',
          name: 'Channels'
        },
        {
          id: 'CS',
          iconId: 175,
          initials: 'CS',
          name: 'Customer Segments'
        },
        {
          id: 'CX',
          iconId: 165,
          initials: 'C$',
          name: 'Cost Structure'
        },
        {
          id: 'RX',
          iconId: 200,
          initials: 'R$',
          name: 'Revenue Streams'
        }
      ], t = function (e, t, o) {
        this.orgId = e.orgId, this.repoId = e.id, this.id = t, o && (this.name = o.name, this.icon = o.icon, this.descr = o.descr, this.pitch = o.pitch), this.createBlocks(), console.log('scripts/services/obj/TModel.constructor this=', this);
      };
    return t.prototype.createBlocks = function () {
      var t = this, o = t.id;
      t.blocks = {};
      for (var i in e) {
        var n = e[i];
        t.blocks[n.id] = t.blocks[n.id] || {
          paneClass: n.id,
          id: n.id,
          bmId: o,
          name: n.name,
          iconId: n.iconId,
          initials: n.initials,
          stickers: {}
        };
      }
      console.log('scripts/services/obj/TModel.createBlocks model=', t);
    }, t;
  }]), FirstRevenueApp.factory('TOrg', [function () {
    var e = function (e, t) {
      this.id = e, t && (this.name = t.name, this.descr = t.descr), this.repos = {};
    };
    return e.prototype.xxxx = function () {
    }, e;
  }]), FirstRevenueApp.factory('TRepo', [function () {
    var e = function (e, t, o) {
      this.orgId = e.id, this.id = t, o && (this.name = o.name, this.descr = o.descr), this.models = {};
    };
    return e.prototype.xxxx = function () {
    }, e;
  }]), FirstRevenueApp.factory('TSticker', [
  'Rainbow',
  function (e) {
    var t = function (e, t, o) {
      console.log('scripts/services/obj/TSticker constructor this=', this, 'model=', e, 'id=', t, 'sticker=', o), this.orgId = e.orgId, this.repoId = e.repoId, this.modelId = e.id, this.id = t, this.setFields(this, o);
    };
    return t.prototype.setFields = function (t, o) {
      t.title = o.title, t.notes = o.notes, t.block = o.block, o.color = o.color || 'yellow';
      var i = e.getColor(o.color);
      t.color = {
        id: i.id,
        name: o.color,
        code: i.code,
        text: i.text
      }, o.x || o.y ? t.position = {
        absolute: !0,
        x: o.x,
        y: o.y
      } : t.position && delete t.position, t.shadow = {
        title: o.title,
        notes: o.notes,
        color: o.color
      };
    }, t.prototype.update = function (e) {
      console.log('scripts/services/obj/TSticker update this=', this, 'sticker=', e), this.setFields(this, e);
    }, t;
  }
]);