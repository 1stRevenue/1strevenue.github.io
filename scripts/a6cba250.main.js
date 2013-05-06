'use strict';
function round(e, t) {
  if (e = parseFloat(e), isNaN(e))
    return e;
  t || (t = 0);
  var o = Math.pow(10, t);
  return Math.floor(e * o + (10 * e * o % 10 >= 5 ? 1 : 0)) / o;
}
var resizeCanvasFont = function () {
  var e = $(window).height() - 40, t = $(window).width() - 80, o = e / 3, n = t / 5, i = Math.min(Math.max(5, Math.min(o, n) / 20), 15);
  $('html').css('font-size', i + 'px'), console.log('resizeCanvasFont size=', i);
};
$(document).ready(function () {
  $(window).resize(resizeCanvasFont), resizeCanvasFont(), window.navigator.standalone;
});
var FirstRevenueApp = angular.module('FirstRevenueApp', [
    'ngResource',
    'bootstrap',
    '$strap.directives',
    'firebase',
    'ngGrid'
  ]).config([
    '$httpProvider',
    '$routeProvider',
    '$rootScopeProvider',
    function (e, t) {
      t.when('/', {
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
      }).when('/canvas/:modelId', {
        templateUrl: 'views/routes/Canvas.html',
        controller: 'CanvasController'
      }).when('/people', {
        templateUrl: 'views/routes/People.html',
        controller: 'PeopleController'
      }).when('/invite/:inviteId', {
        templateUrl: 'views/routes/Invite.html',
        controller: 'InviteController'
      }).otherwise({ redirectTo: '/' });
    }
  ]).run([
    '$rootScope',
    '$location',
    '$q',
    'User',
    'RrrrRrrr',
    function (e, t, o, n, i) {
      console.log('app.run set up $routeChangeStart $on event watcher'), e.deferredLaunch = o.defer(), e.$on('$routeChangeStart', function (t, o, r) {
        i.launching = !1, console.log('app.run $routeChangeStart current=', r, 'next=', o, 'User=', n), !n.authenticated && o.$route.controller && 'InviteController' !== o.$route.controller && 'EntryController' !== o.$route.controller && (o.$route.resolve = o.$route.resolve || {}, o.$route.resolve.Launch = o.$route.resolve.Launch = function () {
          return e.deferredLaunch.promise;
        });
      });
    }
  ]);
FirstRevenueApp.controller('AdminController', [
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
  function (e, t, o, n, i, r) {
    var s = 'CanvasController';
    console.log(s, 'route invoked db=', e.db, '$route=', t);
    var l = t.current.params.modelId, a = {
        KP: {
          iconId: 106,
          initials: 'KP',
          name: 'Key Partnerships'
        },
        KA: {
          iconId: 51,
          initials: 'KA',
          name: 'Key Activities'
        },
        KR: {
          iconId: 82,
          initials: 'KR',
          name: 'Key Resources'
        },
        VP: {
          iconId: 89,
          initials: 'VP',
          name: 'Value Propositions'
        },
        CR: {
          iconId: 83,
          initials: 'CR',
          name: 'Customer Relationships'
        },
        CH: {
          iconId: 261,
          initials: 'CH',
          name: 'Channels'
        },
        CS: {
          iconId: 175,
          initials: 'CS',
          name: 'Customer Segments'
        },
        CX: {
          iconId: 165,
          initials: 'C$',
          name: 'Cost Structure'
        },
        RX: {
          iconId: 200,
          initials: 'R$',
          name: 'Revenue Streams'
        }
      };
    angular.extend(e, {
      modal: n,
      zoom: i,
      rainbow: r,
      blocks: null,
      stickers: null,
      getBlocks: function () {
        return a;
      },
      getStickers: function (t) {
        var o = {}, n = e.canvas.modelId;
        return _.each(e.af.models[n].stickers, function (e, n) {
          e.block === t && (o[n] = e);
        }), o;
      },
      getSticker: function (t) {
        return e.af.models[l].stickers[t];
      }
    }), e.layout.tooltips = !0, e.layout.setView('canvas'), e.layout.guide.wide = !1, e.menu.selected = 'canvas', e.canvas.modelId = l, e.canvas.model = e.me.af.models[l] || null, e.canvas.model && (e.menu.title = e.canvas.model.fields ? e.canvas.model.fields.name : null, l !== e.canvas.lastModelId && (e.canvas.loaded || (console.log(s, 'firebase.loadCanvas modelId=', l), e.canvas.lastModelId = l)));
  }
]), FirstRevenueApp.controller('ContactController', [
  '$scope',
  '$timeout',
  'Social',
  'Myself',
  function (e, t, o, n) {
    var i = 'ContactController';
    console.log(i, 'Entered');
    var r = n;
    angular.extend(e, {
      service: null,
      account: null,
      contactProvider: null,
      accountId: null,
      timeStamp: null,
      social: o,
      init: function (t) {
        e.service = t, e.account = _.find(r.af.user.accounts, function (e) {
          return e.profile.service === t;
        });
      },
      saveContacts: function () {
      },
      setAccount: function (t) {
        e.accountId = t;
      },
      getAccounts: function () {
        return r.getAccounts();
      },
      getPartners: function () {
        var e = {};
        return _.each(r.af.user.accounts, function (t) {
          t.contacts && _.each(t.contacts.partners, function (o, n) {
            o.service = t.profile.service, e[n] = o;
          });
        }), e;
      },
      getPartnerCount: function () {
        return _.size(e.getPartners());
      },
      getFavoriteCount: function () {
        return _.size(_.where(e.getPartners(), { favorite: !0 }));
      },
      isPartner: function (e) {
        return !!e.partner;
      },
      isFavorite: function (e) {
        return e.partner && e.partner.favorite;
      },
      toggleFavorite: function (t) {
        if (console.log(i, 'toggleFavorite contact=', t), !t.partner) {
          var o = e.me.af.user.accounts[t.profileKey].contacts;
          o.partners || (o.partners = {}), o.partners[t.serviceId] || (o.partners[t.serviceId] = {
            name: t.name,
            image: t.image
          }), t.partner = o.partners[t.serviceId];
        }
        t.partner.favorite = !t.partner.favorite, console.log(i, 'toggleFavorite contact.partner=', t.partner);
      },
      getSocialPartners: function (t) {
        console.log(i, 'getSocialPartners service=', t);
        var o = {}, n = e.account;
        return console.log(i, 'getSocialPartners account=', n), e.account.contacts && _.each(e.account.contacts.partners, function (e, t) {
          o[t] = {
            provider: n.profile.provider,
            service: n.profile.service,
            name: e.name,
            image: e.image,
            id: t,
            partner: e
          };
        }), console.log(i, 'getSocialPartners contacts=', o), o;
      },
      getContacts: function (t) {
        return console.log(i, 'getContacts service=', t), o.loaded[t] ? o.contacts[t] : e.getSocialPartners(t);
      },
      getSocialPartnerIds: function (t) {
        console.log(i, 'getSocialPartnerIds service=', t);
        var o = [], n = e.account;
        return console.log(i, 'getSocialPartnerIds account=', n), e.account.contacts && _.each(e.account.contacts.partners, function (e, t) {
          o.push(t);
        }), console.log(i, 'getSocialPartners contactIds=', o), o;
      },
      getContactIds: function (t) {
        return console.log(i, 'getContactIds service=', t), o.loaded[t] ? o.contacts[t] : e.getSocialPartnerIds(t);
      },
      getSocialContacts: function (e) {
        console.log(i, 'getSocialContacts service=', e);
        var t = _.find(r.user.accounts, function (t) {
            return console.log(i, 'getSocialContacts account=', t), t.profile.service === e;
          });
        return console.log(i, 'getSocialContacts found account=', t), t.allContacts;
      },
      getContactCount: function (e) {
        var t = r.findAccount(e).contacts;
        return t && t.total || 0;
      },
      getRefreshTime: function (e) {
        var t = r.findAccount(e).contacts, o = t && t.refreshed;
        return o ? '' + new Date(o) : null;
      },
      getRefreshLatency: function (o) {
        var n = r.findAccount(o).contacts, i = n && n.refreshed || 0, s = '';
        if (i) {
          t(function () {
            e.timeStamp = Date.now();
          }, 1000);
          var l = Math.round((Date.now() - i) / 1000);
          1 > l ? s = 'just now' : 60 > l ? s = l + ' second' + e.numberEnding(l) + ' ago' : 3600 > l ? (l = Math.round(l / 60), s = l + ' minute' + e.numberEnding(l) + ' ago') : 86400 > l ? (l = Math.round(l / 60 / 60), s = l + ' hour' + e.numberEnding(l) + ' ago') : (l = Math.round(l / 60 / 60 / 24), s = l + ' day' + e.numberEnding(l) + ' ago');
        } else
          s = 'never';
        return s;
      },
      numberEnding: function (e) {
        return 1 === e ? '' : 's';
      },
      hasBeenInvited: function (e) {
        return !!e.inviteSent;
      },
      hasNoInvitation: function (e) {
        return !e.inviteSent && !e.account;
      },
      invite: function (t, n) {
        console.log(i, 'invite key=', t, 'partner=', n);
        var s = r.userRef.child('invites').push();
        s.set({
          service: n.service,
          id: t
        }), n.invite = s.name();
        var l = {
            service: n.service,
            id: t,
            status: 'created',
            creator: r.userId
          }, a = r.rootRef.child('invites').child(n.invite);
        a.set(l, function (t) {
          e.inviteCallback(t, n, 'created');
        }), o.invite(n, function (t) {
          t && (console.log(i, 'invite sent partner=', n), a.update({ status: 'sent' }, function (t) {
            e.inviteCallback(t, n, 'sent');
          }));
        });
      },
      inviteCallback: function (e, t, o) {
        e ? (console.log(i, 'invite global status cannot be set to', o, 'error=', e), t.inviteFailed = !0) : (console.log(i, 'invite global status set to', o), 'created' === o && (t.inviteCreated = !0), 'sent' === o && (t.inviteSent = !0));
      },
      isUser: function (e) {
        return !!e.account;
      }
    }), e.layout.guide.wide = !0, e.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('FooterController', [
  '$scope',
  'Modal',
  'Popup',
  'Zoom',
  'Model',
  function (e, t, o, n, i) {
    angular.extend(e, {
      modal: t,
      popup: o,
      model: i,
      filteredModelId: null,
      members: null,
      filterMembers: function () {
        var t = [], o = 0, n = this.canvas.model.members;
        for (var i in n) {
          var r = e.db.users[n[i]];
          if (t.push({
              type: r.provider,
              name: r.name,
              image: r.image
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
  function (e, t, o, n, i, r, s) {
    _.extend(e, {
      modal: t,
      popup: o,
      zoom: n,
      model: i,
      env: r,
      info: s,
      logoff: function () {
        e.modal.logoff = !0;
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
]), FirstRevenueApp.controller('InviteController', [
  '$scope',
  '$timeout',
  '$route',
  'Firebase',
  'Invite',
  function (e, t, o, n, i) {
    var r = 'InviteController';
    angular.extend(e, {
      invite: i,
      inviteId: null,
      service: null,
      openAuthServiceOnly: function () {
        e.inviteId = o.current.params.inviteId, console.log(r, 'openAuth $scope=', e, 'inviteId=', e.inviteId), n.rootRef.child('invites').child(e.inviteId).child('service').once('value', function (o) {
          t(function () {
            e.service = o.val(), console.log(r, 'service=', e.service);
          });
        }, function (e) {
          console.log('Invite error=', e);
        });
      },
      openAuth: function () {
        var s = e.inviteId = o.current.params.inviteId;
        console.log(r, 'openAuth $scope=', e, 'inviteId=', s), i.inviteRef = n.rootRef.child('invites').child(s), i.inviteRef.once('value', function (o) {
          var n = o.val();
          console.log(r, 'openAuth inviteValue=', n), t(function () {
            i.setInvite(s, n), e.service = n ? n.service : null, console.log(r, 'invite value=', n);
          });
        }, function (e) {
          console.log('Invite error=', e);
        });
      }
    }), e.openAuth();
  }
]), FirstRevenueApp.controller('EntryController', [
  '$scope',
  '$location',
  '$timeout',
  'Auth',
  'Modal',
  'SignUp',
  function (e, t, o, n, i, r) {
    var s = 'EntryController';
    console.log(s, 'Entry route invoked Modal=', i, 'Auth=', n), angular.extend(e, {
      modal: i,
      auth: n,
      logonTabName: 'persona',
      signUp: r,
      personaFound: null !== navigator.id,
      logon: function () {
        console.log(s, 'logon'), e.modal.logon = !0;
      },
      providerList: function () {
        var e = [];
        return angular.forEach(r.providers, function (t, o) {
          e.push(angular.extend(t, { provider: o }));
        }), e;
      }
    }), e.layout.setView('welcome'), e.layout.guide.wide = !0, e.menu.title = 'Welcome to the 1st Revenue', e.menu.selected = 'logon', e.menu.visible = [
      'home',
      'logon'
    ];
  }
]), FirstRevenueApp.controller('MasterController', [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
  'angularFire',
  'Layout',
  'Menu',
  'Notif',
  'Firebase',
  'Database',
  'User',
  'Canvas',
  'Myself',
  'Favicon',
  'RrrrRrrr',
  function (e, t, o, n, i, r, s, l, a, c, u, d, f, p, h) {
    var g = 'MasterController';
    console.log(g, 'launched'), angular.extend(e, {
      layout: r,
      menu: s,
      notif: l,
      firebase: a,
      db: c,
      canvas: d,
      me: f,
      af: {
        user: {},
        models: {},
        peers: {},
        invites: {}
      },
      user: u,
      favicon: p,
      ribbon: {
        peerCount: function () {
          return 0;
        }
      },
      rrrr: h,
      rrrrImageLink: h.getImageLink(),
      logoff: function () {
        e.user.logoff(), e.me.logoff();
      },
      afCallback: function (t, o) {
        return console.log(g, 'afCallback name=', o), i(t, e, o, {});
      }
    }), f.init(t.path(), e.af, e.afCallback), e.layout.reset(), e.user.authenticated = !1, e.menu.title = '1st Revenue', e.firebase.init(), console.log('MasterController Firebase init() done', '$location.hash=', t.hash(), '$location.path=', t.path(), '$routeParams=', n);
    var v = '/invite/';
    t.path().substring(0, v.length) === v ? (e.firebase.retrieveSession(), console.log('MasterController Firebase retrieveSession() done $location.path()=', t.path())) : (e.firebase.resumeSession(), console.log('MasterController Firebase resumeSession() done $location.path()=', t.path())), e.notif.add({ text: '1st Revenue started' }), analytics.track('App launch');
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
  function (e, t, o, n) {
    var i = 'ModalController';
    console.log(i, 'Launched'), _.extend(e, {
      modal: o,
      editor: n,
      logoff: function () {
        this.modal.logoff = !1, e.user.authenticated = !1, e.user.authFailed = !0, e.firebase.rootRef.unauth(), FirebaseAuthClient.prototype.clearSession(), e.user.logoff(), e.me.logoff(), t.url('/entry');
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
        console.log(i, 'deleteSticker'), delete e.me.af.models[e.canvas.modelId].stickers[this.modal.stickerId], this.modal.stickerId = null, this.modal.sticker = null, e.layout.editor.sticker = !1, this.modal.del = !1, e.layout.tooltips = !0;
      },
      leaveSticker: function () {
        this.modal.del = !1, e.layout.tooltips = !0;
      },
      sendInvite: function () {
        console.log(i, 'sendInvite contact=', this.modal.contact);
      }
    });
  }
]), FirstRevenueApp.controller('ModelController', [
  '$scope',
  '$location',
  'TModel',
  function (e, t, o) {
    var n = 'ModelController';
    console.log(n, 'started'), e.menu.visible = [
      'home',
      'repo',
      'create'
    ], e.menu.modelTitle = e.menu.title, e.menu.selected = 'create';
    var i = {
        repo: null,
        fields: {
          name: null,
          icon: null,
          descr: null,
          pitch: null
        },
        users: {}
      }, r = e.canvas.model || angular.copy(i);
    angular.extend(e, {
      repoList: [],
      fpFile: null,
      model: r,
      userPanel: !1,
      nameError: !1,
      save: function () {
        if (console.log(n, 'save name=', e.model.fields.name, 'descr=', r.fields.descr, 'pitch=', e.model.fields.pitch), '' === e.model.fields.name)
          e.nameError = !0;
        else {
          e.nameError = !1, e.model.fields.descr && '' === e.model.fields.descr.trim() && (e.model.fields.descr = null), e.model.fields.pitch && '' === e.model.fields.pitch.trim() && (e.model.fields.pitch = null);
          var t = {
              orgId: null,
              id: null
            }, i = new o(t, 0, e.model);
          console.log(n, 'Firebase.createModel newModel=', i), e.firebase.createModel(i), this.showModels();
        }
      },
      getRepos: function () {
        var t = this.repoList = [];
        return _.each(e.db.orgs, function (e, o) {
          _.each(e.repos, function (e, n) {
            t.push({
              org: o,
              repo: n
            });
          });
        }), this.model.repo = t[0], t;
      },
      cancel: function () {
        e.fpFile && (console.log(n, 'cancel removing fpFile=', e.fpFile), filepicker.remove(e.fpFile)), this.showModels(), e.modal.model = !1;
      },
      showModels: function () {
        e.fpFile = null, t.path('/repo');
      },
      pitchWordCount: function () {
        var t = e.model.fields.pitch ? e.model.fields.pitch : '';
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
        filepicker.remove(e.fpFile), e.fpFile = null, e.model.fields.icon = null;
      },
      fpicker: function () {
        return filepicker.setKey('AX9K9qRo5ToaVAz4GjVLAz'), filepicker.pickAndStore({ maxSize: 1048576 }, { location: 'S3' }, function (t) {
          console.log(n, 'filepicker', t), e.fpFile = t, e.model.fields.icon = t[0].url, e.$apply();
        }, function (e) {
          console.log(n, 'filepicker error', '' + e);
        }), !1;
      }
    }), e.repoList = e.getRepos();
  }
]), FirstRevenueApp.controller('ModelEditorController', [
  '$scope',
  'ModelEditor',
  'StickerEditor',
  'Info',
  'Modal',
  function (e, t, o, n, i) {
    console.log('---- ModelEditorController');
    var r = t, s = o;
    angular.extend(e, {
      editor: t,
      confirmCloseEditor: function () {
        this.confirmDiscardChanges();
      },
      confirmDiscardChanges: function () {
        r.wasModelModified() ? (i.dis = !0, e.layout.tooltips = !1) : (r.discardEmptySticker(), n.hide('sticker'));
      },
      discardModelChanges: function () {
        i.dis = !1, e.layout.tooltips = !0, r.discardChanges(), r.sticker = null, n.hide('sticker');
      },
      keepModelChanges: function () {
        i.dis = !1, e.layout.tooltips = !0;
      },
      createModel: function () {
        s.matchTitle() ? (i.dup = !0, e.layout.tooltips = !1) : (s.sticker.id = 0, s.saveSticker());
      },
      saveModel: function () {
        s.saveSticker();
      },
      isCancelButtonDisabled: function () {
        return !s.wasStickerModified();
      },
      isCloseButtonDisabled: function () {
        return s.wasStickerModified();
      },
      isNewButtonDisabled: function () {
        return !this.isStickerNew() && this.matchTitle(s.sticker);
      },
      isSaveButtonDisabled: function () {
        return !s.wasStickerModified();
      }
    }), e.$watch(n.view.model, function (t) {
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
      zoom: o,
      isPublic: function (t) {
        return !!e.me.af.public.models[t];
      },
      getModel: function (t) {
        return e.me.af.models[t];
      }
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
    ], e.menu.title = 'Create Model', e.menu.selected = 'create', console.log('---- NewModelController'), console.log('Canvas New Model route invoked');
    var n = e.me.currentModel = {
        repo: null,
        fields: {
          name: null,
          icon: null,
          descr: null,
          pitch: null
        },
        users: {}
      };
    angular.extend(e, {
      repoList: [],
      fpFile: null,
      model: n,
      nameError: !1,
      create: function () {
        if (console.log('NewModelController create name=', e.model.fields.name, 'descr=', n.fields.descr, 'pitch=', e.model.fields.pitch), '' === e.model.fields.name)
          e.nameError = !0;
        else {
          e.nameError = !1, e.model.fields.descr && '' === e.model.fields.descr.trim() && (e.model.fields.descr = null), e.model.fields.pitch && '' === e.model.fields.pitch.trim() && (e.model.fields.pitch = null);
          var t = {
              orgId: null,
              id: null
            }, i = new o(t, 0, e.model);
          console.log('NewModelController Firebase.createModel newModel=', i), e.firebase.createModel(i), this.showModels();
        }
      },
      getRepos: function () {
        var t = this.repoList = [];
        return _.each(e.db.orgs, function (e, o) {
          _.each(e.repos, function (e, n) {
            t.push({
              org: o,
              repo: n
            });
          });
        }), this.model.repo = t[0], t;
      },
      cancel: function () {
        e.fpFile && (console.log('NewModelController cancel removing fpFile=', e.fpFile), filepicker.remove(e.fpFile)), this.showModels();
      },
      showModels: function () {
        e.fpFile = null, t.path('/repo');
      },
      pitchWordCount: function () {
        var t = e.model.fields.pitch ? e.model.fields.pitch : '';
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
        filepicker.remove(e.fpFile), e.fpFile = null, e.model.fields.icon = null;
      },
      fpicker: function () {
        return filepicker.setKey('ARtFoYGQjQGzQlEpvkSr7z'), filepicker.pickAndStore({ maxSize: 1048576 }, { location: 'S3' }, function (t) {
          console.log('filepicker', t), e.fpFile = t, e.model.fields.icon = t[0].url, e.$apply();
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
]), FirstRevenueApp.controller('PeopleController', [
  '$scope',
  'Social',
  'Myself',
  function (e, t, o) {
    console.log('---- PeopleController');
    var n = o;
    angular.extend(e, {
      contactProvider: null,
      accountId: null,
      saveContacts: function () {
      },
      setAccount: function (t) {
        e.accountId = t;
      },
      getAccounts: function () {
        return n.getAccounts();
      },
      getContacts: function () {
        return n.getContacts(e.accountId);
      }
    }), e.layout.setView('partners'), e.layout.guide.wide = !0, e.layout.peer.wide = !1;
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
  'Modal',
  'RrrrRrrr',
  function (e, t, o, n) {
    console.log('---- RepoController'), angular.extend(e, {
      catalog: t,
      modal: o,
      modelTabName: 'models',
      rrrrImageLink: n.getImageLink()
    }), e.layout.setView('my'), e.layout.guide.wide = !0, e.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('RibbonController', [
  '$scope',
  '$location',
  function (e, t) {
    console.log('--- Ribbon controller loaded'), angular.extend(e, {
      ribbon: e.layout.guide,
      routeTo: function (e) {
        t.path('/' + e);
      }
    });
  }
]), FirstRevenueApp.controller('SignUpController', [
  '$scope',
  '$location',
  '$route',
  '$timeout',
  'Firebase',
  'SignUp',
  'User',
  'Invite',
  function (e, t, o, n, i, r, s, l) {
    var a = 'SignUpController';
    console.log('SignUpController invoked SignUp=', r), angular.extend(e, {
      signUp: r,
      service: null,
      providerList: function () {
        var e = [];
        return angular.forEach(r.providers, function (t, o) {
          var n = _.contains(s.getCredentialKeys(), o);
          e.push(angular.extend(t, {
            provider: o,
            attached: n
          }));
        }), e;
      },
      getProv: function (e) {
        return r.providers[s.credentials[e].profile.service];
      },
      openAuth: function () {
        console.log(a, 'openAuth direct call'), l.acceptInvite(e.service);
      },
      initInvite: function () {
        var t = o.current.params.inviteId;
        t && (console.log(a, 'openAuth $scope=', e, 'inviteId=', t), i.rootRef.child('invites').child(t).child('service').once('value', function (t) {
          n(function () {
            e.service = t.val(), console.log(a, 'service=', e.service);
          });
        }, function (e) {
          console.log('Invite error=', e);
        }));
      }
    }), e.initInvite(), r.init(), e.menu.title = 'Sign in to the 1st Revenue';
  }
]), FirstRevenueApp.controller('SocialController', [
  '$scope',
  '$timeout',
  'Social',
  'Myself',
  function (e, t, o, n) {
    var i = 'SocialController';
    console.log(i, 'Entered');
    var r = n;
    angular.extend(e, {
      service: null,
      account: null,
      accountId: null,
      contactProvider: null,
      timeStamp: null,
      social: o,
      init: function (t) {
        e.service = t, e.account = _.find(r.af.user.accounts, function (e) {
          return e.profile.service === t;
        });
      },
      saveContacts: function () {
      },
      setAccount: function (t) {
        e.accountId = t;
      },
      isPartner: function (e) {
        return !!e.partner;
      },
      isFavorite: function (e) {
        return e.partner && e.partner.favorite;
      },
      toggleFavorite: function (t) {
        if (console.log(i, 'toggleFavorite contact=', t), !t.partner) {
          var o = e.me.af.user.accounts[t.profileKey].contacts;
          o.partners || (o.partners = {}), o.partners[t.id] || (o.partners[t.id] = {
            name: t.name,
            image: t.image
          }), t.partner = o.partners[t.id];
        }
        t.partner.favorite = !t.partner.favorite, console.log(i, 'toggleFavorite contact.partner=', t.partner);
      },
      getSocialPartners: function (e) {
        console.log(i, 'getSocialPartners service=', e);
        var t = {}, o = _.find(r.af.user.accounts, function (t) {
            return t.profile.service === e;
          });
        return console.log(i, 'getSocialPartners account=', o), _.each(o.contacts.partners, function (e, n) {
          t[n] = {
            provider: o.profile.provider,
            service: o.profile.service,
            name: e.name,
            image: e.image,
            id: n,
            partner: e
          };
        }), console.log(i, 'getSocialPartners contacts=', t), t;
      },
      getContacts: function (t) {
        return console.log(i, 'getContacts service=', t), o.loaded[t] ? o.contacts[t] : e.getSocialPartners(t);
      },
      getSocialContacts: function (e) {
        console.log(i, 'getSocialContacts service=', e);
        var t = _.find(r.user.accounts, function (t) {
            return console.log(i, 'getSocialContacts account=', t), t.profile.service === e;
          });
        return console.log(i, 'getSocialContacts found account=', t), t.allContacts;
      },
      getContactCount: function (e) {
        return r.findAccount(e).contacts.total;
      },
      getRefreshTime: function (e) {
        var t = r.findAccount(e).contacts.refreshed;
        return t ? '' + new Date(t) : null;
      },
      getRefreshLatency: function (o) {
        var n = r.findAccount(o).contacts.refreshed;
        t(function () {
          e.timeStamp = Date.now();
        }, 1000);
        var i = Math.round((e.timeStamp - n) / 1000), s = '';
        return 1 > i ? s = 'just now' : 60 > i ? s = i + ' second' + e.numberEnding(i) + ' ago' : 3600 > i ? (i = Math.round(i / 60), s = i + ' minute' + e.numberEnding(i) + ' ago') : 86400 > i ? (i = Math.round(i / 60 / 60), s = i + ' hour' + e.numberEnding(i) + ' ago') : (i = Math.round(i / 60 / 60 / 24), s = i + ' day' + e.numberEnding(i) + ' ago'), s;
      },
      numberEnding: function (e) {
        return 1 === e ? '' : 's';
      },
      hasBeenInvited: function (e) {
        return !!e.inviteSent;
      },
      hasNoInvitation: function (e) {
        return !e.inviteSent && !e.account;
      },
      invite: function (t, n) {
        console.log(i, 'invite key=', t, 'partner=', n);
        var s = r.userRef.child('invites').push();
        s.set({
          service: n.service,
          id: t
        }), n.invite = s.name();
        var l = {
            service: n.service,
            id: t,
            status: 'created',
            creator: r.userId
          }, a = r.rootRef.child('invites').child(n.invite);
        a.set(l, function (t) {
          e.inviteCallback(t, n, 'created');
        }), o.invite(n, function (t) {
          t && (console.log(i, 'invite sent partner=', n), a.update({ status: 'sent' }, function (t) {
            e.inviteCallback(t, n, 'sent');
          }));
        });
      },
      inviteCallback: function (e, t, o) {
        e ? (console.log(i, 'invite global status cannot be set to', o, 'error=', e), t.inviteFailed = !0) : (console.log(i, 'invite global status set to', o), 'created' === o && (t.inviteCreated = !0), 'sent' === o && (t.inviteSent = !0));
      },
      isUser: function (e) {
        return !!e.account;
      }
    }), e.layout.guide.wide = !0, e.layout.peer.wide = !1;
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
        var t = e.canvas.model.stickers[e.stickerId];
        this.modal.openDeleteStickerDialog(e.stickerId, t);
      },
      isDeleteAllowed: function () {
        return this.modal.isDeleteAllowed(e.stickerId);
      }
    });
  }
]), FirstRevenueApp.controller('StickerEditorController', [
  '$scope',
  'StickerEditor',
  'Info',
  'Modal',
  function (e, t, o, n) {
    console.log('---- StickerEditorController');
    var i = e.editor = t;
    e.$watch('Info.view.sticker', function (e) {
      e && i.focusTitle();
    }), angular.extend(e, {
      modal: n,
      confirmCloseEditor: function () {
        e.layout.editor.sticker = !1;
      },
      confirmDeleteSticker: function () {
        this.modal.openDeleteStickerDialog(i.stickerId, i.sticker), e.layout.tooltips = !1;
      },
      createSticker: function () {
        i.matchTitle() ? (n.dup = !0, e.layout.tooltips = !1) : (i.sticker.id = 0, i.saveSticker());
      },
      saveSticker: function () {
        i.saveSticker();
      },
      isColorChosen: function (e) {
        return i.sticker && i.sticker.color && i.sticker.color.toLowerCase() === e;
      },
      isCancelButtonDisabled: function () {
        return !i.wasStickerModified();
      },
      isCloseButtonDisabled: function () {
        return i.wasStickerModified();
      },
      isDeleteButtonHidden: function () {
        return this.isStickerNew();
      },
      isDeleteButtonDisabled: function () {
        return !1;
      },
      isNewButtonDisabled: function () {
        return !this.isStickerNew() && this.matchTitle(i.sticker);
      },
      isSaveButtonDisabled: function () {
        return !i.wasStickerModified();
      },
      isStickerNew: function () {
        return !i.sticker || 0 === i.sticker.id;
      },
      getBlock: function () {
        return e.getBlocks()[i.sticker.block];
      }
    });
  }
]), FirstRevenueApp.controller('ModelTagController', [
  '$scope',
  'TagCatalog',
  function (e, t) {
    console.log('---- ModelTagController'), _.extend(e, { catalog: t });
  }
]), FirstRevenueApp.controller('UserController', [
  '$scope',
  'Myself',
  'Social',
  function (e, t, o) {
    var n = 'UserController';
    console.log(n, 'started');
    var i = t;
    e.menu.visible = [
      'home',
      'repo',
      'create'
    ], e.menu.modelTitle = e.menu.title, e.menu.selected = 'create';
    var r = e.canvas.model, s = e.canvas.modelId;
    angular.extend(e, {
      model: r,
      favorites: {},
      favoriteCount: 0,
      peers: {},
      peerAccounts: {},
      invites: {},
      inviteRecords: {},
      getFavorites: function () {
        return e.favorites = {}, _.each(i.af.user.accounts, function (t) {
          t.contacts && _.each(t.contacts.partners, function (o, i) {
            if (o.favorite) {
              var r = t.contacts.service + '-' + i;
              e.peerAccounts[r] || e.inviteRecords[r] ? console.log(n, 'getFavorites favorite already selected peerKey=', r) : e.favorites[r] = o;
            }
          });
        }), console.log(n, 'getFavorites favorites=', e.favorites), e.favoriteCount = _.size(e.favorites), e.favorites;
      },
      getPeers: function () {
        return e.peers = {}, e.peerAccounts = {}, _.each(r.users, function (t, o) {
          var n = e.peers[o] = i.af.peers[o];
          e.peerAccounts[n.service + '-' + n.serviceId] = o;
        }), console.log(n, 'getPeers peers=', e.peers), e.peers;
      },
      getInvites: function () {
        return e.invites = {}, console.log(n, 'getInvites model.invites=', r.invites), _.each(r.invites, function (t, o) {
          console.log(n, 'getInvites inviteId=', o);
          var r = i.af.invites[o];
          if (r) {
            var s = e.getPartner(r);
            if (console.log(n, 'getInvites found partner=', s), s) {
              var l = r.service + '-' + r.id;
              e.inviteRecords[l] = o, e.invites[o] = s;
            }
          }
        }), console.log(n, 'getInvites invites=', e.invites), e.invites;
      },
      getPartner: function (e) {
        console.log(n, 'getPartner inviteRec=', e);
        var t = null;
        return _.find(i.af.user.accounts, function (o) {
          return console.log(n, 'getPartner find accounts account=', o), o.contacts && _.find(o.contacts.partners, function (o, i) {
            return console.log(n, 'getPartner find partners partner=', o), o.service === e.service && i === e.id ? (t = o, console.log(n, 'getPartner find partners found partner=', o), !0) : void 0;
          }), t ? (console.log(n, 'getPartner find partners found partnerRec=', t), !0) : void 0;
        }), t;
      },
      addPeer: function (t, o) {
        console.log(n, 'addPeer key=', t, 'favorite=', o);
        var r = o.userId;
        if (r)
          e.af.models[s].users[r] = !0;
        else {
          var l = {
              creator: i.userId,
              service: o.service,
              id: t.split('-')[1],
              status: 'created'
            }, a = i.rootRef.child('invites').push(), c = a.name();
          a.set(l, function (t) {
            if (console.log(n, 'addPeer invite set completed error=', t), t)
              console.log(n, 'addPeer invite set error=', t);
            else {
              var o = 'af.invites[\'' + c + '\']';
              console.log(n, 'addPeer invite set inviteKey=', o);
              var r = i.rootRef.child('invites').child(c), a = i.afCallback && i.afCallback(r, o);
              a && a.then(function (e) {
                console.log(n, 'addPeer invitePromise resolved afInvite=', e), 'accepted' === e.status && console.log(n, 'afPeer invitePromise accepted afInvite=', e);
              });
            }
            e.af.models[s].invites = e.af.models[s].invites || {}, e.af.models[s].invites[c] = !0, e.invites[c] = l;
          });
        }
      },
      removePeer: function (t, o) {
        console.log(n, 'removePeer key=', t, 'peer=', o);
        var r = o.service + '-' + o.serviceId;
        t !== i.userId && (delete e.peerAccounts[r], delete e.peers[t], delete e.af.models[s].users[t], delete e.canvas.model.users[t]);
      },
      removeInvite: function (t, o) {
        console.log(n, 'removeInvite inviteId=', t, 'invite=', o), _.each(e.inviteRecords, function (o, n) {
          o === t && delete e.inviteRecords[n];
        }), delete e.af.models[s].invites[t], delete e.invites[t], i.af.invites[t] = null;
      },
      sendInvite: function (t, r) {
        o.me = i;
        var s = null;
        _.each(e.inviteRecords, function (e, o) {
          e === t && (s = o.split('-')[1]);
        });
        var l = i.af.invites[t];
        l.model, e.isInviteAllowed(t) && (s && o.invite({
          service: r.service,
          serviceId: s,
          invite: t
        }, function (e) {
          i.af.invites[t].status = 'sent', console.log(n, 'sendInvite callback response=', e, 'status=', l.status);
        }), i.af.invites[t].status = 'submitted', console.log(n, 'sendInvite status=', l.status));
      },
      isInviteAllowed: function (e) {
        return 'created' === i.af.invites[e].status;
      },
      wasInviteSent: function (e) {
        return 'sent' === i.af.invites[e].status;
      }
    }), e.getPeers(), e.getInvites(), e.getFavorites();
  }
]), FirstRevenueApp.directive('uiModal', [
  '$timeout',
  function (e) {
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (t, o, n, i) {
        o.addClass('modal hide'), t.$watch(n.ngModel, function (e) {
          o.modal(e && 'show' || 'hide');
        }), o.on('show.ui', function () {
          e(function () {
            i.$setViewValue(!0);
          });
        }), o.on('hide.ui', function () {
          e(function () {
            i.$setViewValue(!1);
          });
        });
      }
    };
  }
]), FirstRevenueApp.directive('contenteditable', function () {
  return {
    require: 'ngModel',
    link: function (e, t, o, n) {
      t.bind('blur keyup', function () {
        e.$apply(function () {
          n.$setViewValue(t.html());
        });
      }), n.$render = function () {
        t.html(n.$viewValue);
      };
    }
  };
}), FirstRevenueApp.directive('firstRevenueButtons', [
  'Canvas',
  'StickerEditor',
  function (e, t) {
    return console.log('first-revenue-buttons'), function (o, n) {
      n.on('click.first-revenue-buttons', '.st-grad button', function (n) {
        var i = $(this).offsetParent(), r = i.attr('data-pane'), s = i.attr('data-block'), l = i.attr('data-sticker');
        console.log('first-revenue-buttons pane=', r, 'blockId=', s, 'stickerId=', l), n.stopPropagation();
        var a = e.model.blocks;
        $('.pulsate').removeClass('pulsate'), _.each(a, function (e) {
          e.stickers[0] && delete e.stickers[0];
        });
        var c = a[s], u = c.stickers[l], d = $(this).attr('title');
        if ('Delete' === d)
          window.confirm('Delete sticker ' + l + '\n' + u.title + '?');
        else if ('Edit' === d) {
          for (var f = 0; Opentip.tips > f; f++)
            Opentip.tips[f].hide();
          var p = $('.st-grad[data-id=' + l + ']');
          p.addClass('pulsate'), t.showSticker(e.model, c, l), console.log('first-revenue-buttons sticker=', u);
        }
        o.$root.$apply();
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueDrag', [function () {
    return function (e, t) {
      var o = {
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
              var n = o.op.offset(), i = o.st.offset();
              return o.stl = i.left - n.left, o.stt = i.top - n.top, o.cl = e.pageX - n.left, o.ct = e.pageY - n.top, o.opop.bind('mousemove', o.dragged), $(window).bind('mouseup', o.dropped), e.preventDefault(), !1;
            }
          },
          dragged: function (t) {
            e.$root.draggingActive = !0, e.layout.tooltips = !1, o.opop.addClass('drag-area'), o.st.addClass('st-dragged'), o.st.removeClass('st-show-buttons'), o.st.trigger('dragActive');
            var n = o.op.offset(), i = t.pageX - n.left, r = t.pageY - n.top, s = o.stl + (i - o.cl), l = o.stt + (r - o.ct);
            return s = Math.max(0, s), l = Math.max(0, l), s = Math.min(o.opop.width() - o.st.width(), s), l = Math.min(o.op.height(), l), o.st.css({
              position: 'absolute',
              left: s,
              top: l
            }), !1;
          },
          dropped: function () {
            return e.$root.draggingActive = !1, e.layout.tooltips = !0, o.opop.removeClass('drag-area'), o.st.removeClass('st-dragged'), o.opop.unbind('mousemove', o.dragged), $(window).unbind('mouseup', o.dropped), (!o.touchHandled || o.touchMoved) && o.savePosition(), !1;
          },
          savePosition: function () {
            var t = o.st.offset(), n = o.st.width(), i = o.opop.width() - n, r = o.op.height(), s = 0 === i ? 0 : 100 * (t.left - o.opop.offset().left) / i, l = 0 === r ? 0 : 100 * (t.top - o.op.offset().top) / r, a = Math.max(0, Math.min(Math.round(100 * s) / 100, 100)), c = Math.max(0, Math.min(Math.round(100 * l) / 100, 100));
            console.log('first-revenue-drag xPerc=', a, 'yPerc=', c, 'sticker=', e.sticker), o.st.css({
              position: 'absolute',
              top: c + '%',
              left: a + '%'
            });
            var u = e.getSticker(e.stickerId);
            u.x = a, u.y = c, e.$apply();
          },
          touchStart: function (e) {
            o.touchHandled || (o.touchHandled = !0, o.touchMoved = !1, o.simulateMouseEvent(e, 'mousedown'));
          },
          touchMove: function (e) {
            o.touchHandled && (o.touchMoved = !0, o.simulateMouseEvent(e, 'mousemove'));
          },
          touchEnd: function (e) {
            o.touchHandled && (o.simulateMouseEvent(e, 'mouseup'), o.touchMoved || o.simulateMouseEvent(e, 'click'), o.touchHandled = !1);
          },
          simulateMouseEvent: function (e, t) {
            e.preventDefault();
            var n = e.originalEvent.changedTouches[0], i = document.createEvent('MouseEvents');
            if ('click' === t)
              o.simulateEvent(i, t, n), e.target.dispatchEvent(i);
            else if ('mousedown' === t) {
              o.simulateEvent(i, t, n), o.clicked(i);
              var r = document.createEvent('MouseEvents');
              o.simulateEvent(r, 'mousemove', n), o.dragged(r);
            } else
              'mousemove' === t ? (o.simulateEvent(i, t, n), o.dragged(i)) : 'mouseup' === t && (o.simulateEvent(i, t, n), o.dropped(i));
          },
          simulateEvent: function (e, t, o) {
            return e.initMouseEvent(t, !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null);
          }
        }, n = function (e) {
          var t = e.offsetParent(), n = t;
          t.hasClass('pane') ? t = t.find('.pane-sticker') : n = t.offsetParent(), o.opop = n, o.op = t, o.st = e, e.mousedown(o.clicked), 'ontouchend' in document && (e.bind('touchstart', o.touchStart), e.bind('touchmove', o.touchMove), e.bind('touchend', o.touchEnd));
        };
      n(t);
    };
  }]), FirstRevenueApp.directive('firstRevenueEdit', [
  'Canvas',
  'StickerEditor',
  function (e, t) {
    var o = 'firstRevenueEdit';
    return console.log(o, 'loaded'), function (n, i, r) {
      var s = function (r, s) {
        r.stopPropagation(), console.log(o, 'scope=', n, 'linkElement=', i, '$this=', s);
        var l = e.model, a = 0, c = s;
        if ($('.pulsate').removeClass('pulsate'), s.hasClass('pane')) {
          var u = n.canvas.modelId, d = n.me.rootRef.child('models').child(u);
          a = d.child('stickers').push().name(), console.log(o, 'create sticker stickerId=', a), n.af.models[u].stickers = n.af.models[u].stickers || {}, n.af.models[u].stickers[a] = {
            title: '',
            notes: '',
            color: 'yellow',
            block: c.attr('data-id')
          };
        } else
          c = s.offsetParent().offsetParent(), a = s.attr('data-id'), console.log(o, 'existing sticker stickerId=', a), s.addClass('pulsate');
        var f = c.attr('data-id');
        t.showSticker(l, f, a), console.log(o, 'editor.sticker=', t.sticker), n.$apply();
      };
      i.on('dblclick.st-edit', function (t) {
        var o = $(this), n = r.firstRevenueEdit;
        e.singleBlock && 'XXC' !== n || s(t, o);
      }), i.on('click.st-edit', '.pane-button', function (t) {
        var o = $(this).offsetParent(), n = r.firstRevenueEdit;
        e.singleBlock && 'XXC' !== n || s(t, o);
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueOpenTip', [
  '$window',
  function (e) {
    var t = function (t) {
        var o = t.currentTarget, n = $(o).offset(), i = n.left + o.clientWidth / 2, r = n.top + o.clientHeight / 2;
        return {
          hp: i,
          vp: r,
          ww: e.innerWidth,
          wh: e.innerHeight,
          ww2: e.innerWidth / 2,
          wh2: e.innerHeight / 2,
          cx: t.clientX,
          cy: t.clientY,
          ox: t.offsetX,
          oy: t.offsetY,
          t: o,
          tl: n.left,
          tt: n.top,
          cw: o.clientWidth,
          ch: o.clientHeight,
          cw2: o.clientWidth / 2,
          ch2: o.clientHeight / 2,
          left: e.innerWidth / 2 > i,
          top: e.innerHeight / 2 > r
        };
      }, o = function (e) {
        return e.offsetX || (e.offsetX = e.pageX - $(e.target).offset().left, e.offsetY = e.pageY - $(e.target).offset().top), e;
      }, n = function (e, t) {
        new Opentip(this, $(e).find('.st-pop').html(), {
          tipJoint: (t.top ? 'top' : 'bottom') + ' ' + (t.left ? 'left' : 'right'),
          stem: !0
        });
      }, i = function (e, t) {
        console.log('qtipAdjust exposeButtons');
        var o = $(e).find('.btn-edit-sticker'), n = $(e).find('.btn-delete-sticker');
        $(e).on('mouseleave', function () {
          $(e).removeClass('st-show-buttons'), o.removeClass('btn-edit-bottom'), o.removeClass('btn-edit-top'), o.removeClass('btn-edit-right'), o.removeClass('btn-edit-left'), n.removeClass('btn-delete-bottom'), n.removeClass('btn-delete-top'), n.removeClass('btn-delete-right'), n.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(e).addClass('st-show-buttons'), t.top ? (o.removeClass('btn-edit-bottom'), o.addClass('btn-edit-top'), n.removeClass('btn-delete-bottom'), n.addClass('btn-delete-top')) : (o.removeClass('btn-edit-top'), o.addClass('btn-edit-bottom'), n.removeClass('btn-delete-top'), n.addClass('btn-delete-bottom')), t.left ? (o.removeClass('btn-edit-right'), o.addClass('btn-edit-left'), n.removeClass('btn-delete-right'), n.addClass('btn-delete-left')) : (o.removeClass('btn-edit-left'), o.addClass('btn-edit-right'), n.removeClass('btn-delete-left'), n.addClass('btn-delete-right'));
      };
    return function (e, r, s) {
      r.on('mouseenter.open-tips click.open-tips', '.st-grad', function (l) {
        var a = s.firstRevenueOpenTip;
        if (e.layout.tooltips) {
          console.log('first-revenue-open-tip linkElement=', r, 'this=', this, 'label=', a, 'event=', l);
          var c = o(l), u = t(c), d = $.trim($(this).find('.st-pop').text());
          console.log('tooltips stickerText=[' + d + '], quadrant=', u), d.length > 0 && n(this, u, c), i(this, u), e.hovering = !0, e.$root.$apply();
        }
      });
    };
  }
]), FirstRevenueApp.directive('openTip', [
  '$window',
  '$timeout',
  'Rainbow',
  function (e, t, o) {
    var n = function (t) {
        var o = $(t), n = o.offset(), i = n.left + t.context.clientWidth / 2, r = n.top + t.context.clientHeight / 2, s = e.innerWidth / 2 > i, l = e.innerHeight / 2 > r;
        return {
          top: l,
          left: s
        };
      }, i = function (e) {
        return (e.top ? 'top' : 'bottom') + ' ' + (e.left ? 'left' : 'right');
      }, r = function (e, t, o) {
        var r = n(e), s = [
            (r.left ? -1 : 1) * $(e).width() / 2,
            (r.top ? -1 : 1) * $(e).height() / 2
          ], l = {
            tipJoint: i(r),
            background: t,
            borderWidth: 0,
            stem: !0,
            delay: 'click' === o ? 0 : 1,
            offset: s,
            group: '1R',
            cache: !1,
            showOn: o,
            target: !0,
            hideTriggers: [
              'closeButton',
              'tip',
              'target',
              'trigger'
            ]
          };
        return new Opentip(e, e.find('.st-pop').html(), l);
      }, s = function (e, t) {
        var o = $(e).find('.btn-edit-sticker'), n = $(e).find('.btn-delete-sticker');
        $(e).on('mouseleave', function () {
          $(e).removeClass('st-show-buttons'), o.removeClass('btn-edit-bottom'), o.removeClass('btn-edit-top'), o.removeClass('btn-edit-right'), o.removeClass('btn-edit-left'), n.removeClass('btn-delete-bottom'), n.removeClass('btn-delete-top'), n.removeClass('btn-delete-right'), n.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(e).addClass('st-show-buttons'), t.top ? (o.removeClass('btn-edit-bottom'), o.addClass('btn-edit-top'), n.removeClass('btn-delete-bottom'), n.addClass('btn-delete-top')) : (o.removeClass('btn-edit-top'), o.addClass('btn-edit-bottom'), n.removeClass('btn-delete-top'), n.addClass('btn-delete-bottom')), t.left ? (o.removeClass('btn-edit-right'), o.addClass('btn-edit-left'), n.removeClass('btn-delete-right'), n.addClass('btn-delete-left')) : (o.removeClass('btn-edit-left'), o.addClass('btn-edit-right'), n.removeClass('btn-delete-left'), n.addClass('btn-delete-right'));
      }, l = function (e, t, i, l) {
        t.on(i + '.open-tips', function () {
          var i = $(t).data();
          console.log('openTip linkElement.on', 'data=', i);
          var a = i.opentips, c = o.opaqueField(e.sticker.color), u = null;
          for (var d in a) {
            var f = a[d];
            f.setContent(t.find('.st-pop').html()), f.options.background = c, f.redraw = !0, f.options.showOn === l && (u = f);
          }
          u || (u = r(t, c, l), u.prepareToShow()), s(this, n(t));
        });
      };
    return function (e, t) {
      l(e, t, 'mouseenter', 'mouseover'), l(e, t, 'click', 'click');
    };
  }
]), FirstRevenueApp.factory('Auth', [
  '$rootScope',
  '$location',
  '$resource',
  '$q',
  'Firebase',
  'User',
  'Singly',
  function (e, t, o, n, i, r, s) {
    var l = 'Auth';
    return console.log(l, 'service launched'), {
      deferred: null,
      rememberMe: !0,
      launchLogon: function (e, t) {
        switch (console.log('Auth.launchLogon method=', e, 'provider=', t), r.error = null, e) {
        case 'simple':
          var o = { rememberMe: this.rememberMe };
          switch (t) {
          case 'password':
            o.email = r.email, o.password = r.password;
            break;
          case 'facebook':
            o.scope = 'email';
            break;
          case 'github':
            o.scope = 'user:email';
            break;
          default:
          }
          i.authClient.login(t, o);
          break;
        case 'singly':
          this.launchSinglyAuth(t);
          break;
        default:
          console.log('Auth.launchLogon unknown method=', e);
        }
      },
      signupPasswordAuth: function () {
        console.log('Auth.signupPasswordAuth email=', r.email, 'password=', r.password), i.authClient.createUser(r.email, r.password, function (e, t) {
          console.log('Auth.signupPasswordAuth email=', r.email, 'password=', r.password), e ? console.log('Auth.signupPasswordAuth error=', e) : (console.log('Auth.signupPasswordAuth success user id=', t.id, 'email', t.email), i.authClient.login('password', {
            email: t.email,
            password: t.password,
            rememberMe: !0
          }));
        });
      },
      launchPasswordAuth: function () {
        console.log('Auth.launchPasswordAuth email=', r.email, 'password=', r.password), i.authClient.login('password', {
          email: r.email,
          password: r.password,
          rememberMe: !0
        });
      },
      launchFacebookAuth: function () {
        console.log('Auth.launchFacebookAuth'), i.authClient.login('facebook', {
          rememberMe: !0,
          scope: 'email'
        });
      },
      launchTwitterAuth: function () {
        console.log('Auth.launchTwitterAuth'), i.authClient.login('twitter', { rememberMe: !0 });
      },
      launchPersonaAuth: function () {
        console.log('Auth.launchPersonaAuth'), i.authClient.login('persona', { rememberMe: !0 });
      },
      launchGithubAuth: function () {
        console.log('Auth.launchGithubAuth'), i.authClient.login('github', {
          rememberMe: !0,
          scope: 'user:email'
        });
      },
      launchSinglyAuth: function (e, t) {
        console.log('Auth.launchSinglyAuth service=', e), s.launchAuth(e, i.rootRef, t || i.generalAuth);
      },
      changePassword: function () {
        console.log('Auth.changePassword', 'email=', r.email, 'oldPassword=', r.password, 'newPassword=', r.newPassword), i.authClient.changePassword(r.email, r.password, r.newPassword, function (e, t) {
          console.log('Auth.changePassword done error=', e, 'success=', t), e ? console.log('Auth.changePassword error=', e) : console.log('Auth.changePassword success=', t);
        });
      }
    };
  }
]), FirstRevenueApp.factory('Database', [
  'Canvas',
  'TOrg',
  'TRepo',
  'TModel',
  'TSticker',
  function (e, t, o, n, i) {
    var r = 'Database';
    console.log(r, 'service launched');
    var s = {
        orgs: {},
        repo: null,
        path: null,
        models: {},
        modelsLoaded: !1,
        mm: null,
        members: {},
        users: {},
        tagCloud: null,
        modelLoadStartTime: null,
        modelScope: {},
        init: function (e) {
          s.mm = e;
        },
        reset: function () {
          console.log(r, 'reset'), this.repo = null, this.models = {}, this.modelsLoaded = !1, this.members = {}, this.users = {}, this.tagCloud = null, e.reset();
        },
        addUser: function (e) {
          console.log(r, 'addUser userId=', e), this.users[e] || (this.users[e] = {
            profile: null,
            online: !1
          });
        },
        addUserProfile: function (e, t) {
          console.log(r, 'addUserProfile userId=', e, 'profile=', t), t && (this.users[e] = this.users[e] || { online: !1 }, this.users[e].profile || (this.users[e].profile = t));
        },
        monitorPresence: function (e, t) {
          console.log('scripts/services/Database.monitorPresence', 'userId=', e, 'value=', t), this.users[e] && (this.users[e].online = !!t);
        },
        addOrg: function (e) {
          console.log('scripts/services/Database.addOrg orgId=', e);
          var o = this.orgs;
          return o[e] || (o[e] = new t(e)), o[e];
        },
        addRepo: function (e) {
          console.log('scripts/services/Database.addRepo orgs=', this.orgs, 'repoPath=', e);
          var t = this.orgs[e.orgId];
          t.repos[e.repoId] || (t.repos[e.repoId] = new o(t, e.repoId));
          var n = t.repos[e.repoId];
          return this.repo = n, this.models = n.models, this.modelsLoaded = !0, n;
        },
        addModel: function (e) {
          console.log('scripts/services/Database.addModel orgs=', this.orgs, 'modelPath=', e);
          var t = e.orgId, o = e.repoId, i = e.modelId;
          this.orgs && this.orgs[t] || this.addOrg(t), this.orgs[t].repos[o] || this.addRepo(e);
          var r = this.orgs[t].repos[o], s = r.models[i] = r.models[i] || new n(r, i);
          return s.scope = this.modelScope['/' + t + '/' + o + '/' + i], s;
        },
        updateModel: function (e, t) {
          console.log(r, 'updateModel this=', this, 'modelPath=', e, 'fieldVal=', t);
          var o = this.addModel(e);
          o.fields = o.fields || {}, o.fields[e.fieldId] = t;
        },
        updateModelUsers: function (e, t) {
          console.log(r, 'updateModelUsers this=', this, 'modelId=', e, 'usersVal=', t);
          var o = s.mm.models[e];
          o.members = o.members || [], _.each(t, function (e, t) {
            console.log(r, 'updateModelUsers userVal memberId=', t), o.members.push(t);
            var n = s.members[t];
            n || (n = s.members[t] = { models: [o] }), n.models.push(o), console.log(r, 'updateModelUsers member=', n, 'db.members=', s.members);
          });
        },
        refreshSticker: function (e) {
          console.log(r, 'refreshSticker st=', e, 'this=', this);
          var t = s.mm.models[e.modelId];
          t.stickers[e.id] = e.value;
          var o = t.blocks[e.value.block].stickers;
          o[e.id] ? o[e.id].update(e.value) : o[e.id] = new i(t, e.id, e.value);
        },
        deleteSticker: function (e) {
          console.log(r, 'deleteSticker st=', e);
          var t = s.mm.models[e.modelId];
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
          console.log('scripts/services/Database.addModelToCanvas model=', t, 'Canvas=', e), e.loaded || e.modelId !== t.id || (console.log('scripts/services/Database.addModelToCanvas loadBlocks model.id=', t.id), e.loadBlocks(t, o));
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
          var n = this;
          _.each(t, function (t) {
            var i = n.members[t.id];
            i || (i = n.members[t.id] = t), i.models = i.models || {}, i.models[e] = o;
          });
        },
        addTags: function (e, t) {
          var o = this.models[e];
          this.tagCloud = this.tagCloud || {}, o.tags = t;
          var n = this;
          _.each(t, function (e) {
            n.tagCloud[e.text] ? n.tagCloud[e.text] += 1 : n.tagCloud[e.text] = 1;
          });
        },
        addTagged: function (e, t, o) {
          var n = this.models[e];
          n.tagged = n.tagged || {}, n.tagged[t] = o;
        }
      };
    return s;
  }
]), FirstRevenueApp.factory('Canvas', [
  '$rootScope',
  'Menu',
  function (e, t) {
    var o = 'Canvas';
    console.log(o, 'service launched');
    var n = {
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
          n.view = e;
        },
        toggleView: function () {
          n.view = 'free' === n.view ? 'grid' : 'free';
        },
        peerCount: function () {
          return _.size(n.model.users);
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
          return 'free' === n.view && e && e.x && e.y || !1;
        },
        getPosition: function (e) {
          if (n.getAbs(e)) {
            var t = 'left: ' + e.x + '%; top: ' + e.y + '%;';
            return t;
          }
          return '';
        },
        switchBlock: function (e) {
          console.log(o, 'switchBlock pane=', e, 'this.model.blocks=', n.model.blocks), n.singleBlock = _.find(n.model.blocks, function (t) {
            return console.log(o, 'switchBlock findingBlock b=', t), t.paneClass === e.icon;
          });
        },
        loadBlocks: function (e, i) {
          console.log(o, 'loadBlocks model=', e), n.modelId !== n.lastModelId && (t.title = e.name, 1 > _.size(e.blocks) && (console.log(o, 'loadBlocks modelId=', n.modelId), i(n.modelId), n.lastModelId = n.modelId), n.blocks = e.blocks, n.model = e, n.loaded = !0);
        },
        getBackgroundImageURL: function () {
          return 'images/DemoCanvasModelIcon.png';
        }
      };
    return n;
  }
]), FirstRevenueApp.factory('Env', [function () {
    return { version: null };
  }]), FirstRevenueApp.factory('Favicon', [function () {
    var e = {
        persona: 'login.persona.org',
        gplus: 'plus.google.com',
        gcontacts: 'google.com'
      };
    return {
      getUrl: function (t) {
        var o = e[t];
        return o = o || t + '.com', '//' + o + '/favicon.ico';
      }
    };
  }]), FirstRevenueApp.factory('Firebase', [
  '$rootScope',
  '$timeout',
  '$location',
  'FirebaseEvents',
  'Myself',
  'Layout',
  'Notif',
  'Database',
  'User',
  function (e, t, o, n, i, r, s, l, a) {
    var c = 'Firebase';
    console.log(c, 'service launched');
    var u = {
        endpoint: CONFIG_1ST_REVENUE.firebaseEndpoint,
        nowRemote: null,
        rootRef: null,
        authClient: null,
        fbe: n,
        user: a,
        connected: !1,
        connStatus: 'Offline',
        db: l,
        init: function () {
          u.rootRef = new Firebase(u.endpoint), Firebase.enableLogging(!0), console.log(c, 'init fb.rootRef=', u.rootRef), u.fbe.init(u, u.rootRef);
        },
        retrieveSession: function () {
          a.authFailed || (u.authClient = new FirebaseAuthClient(u.rootRef, u.verifySession));
        },
        resumeSession: function () {
          a.authFailed || (u.authClient = new FirebaseAuthClient(u.rootRef, u.generalAuth));
        },
        verifySession: function (e, t) {
          console.log(c, 'verifySession error=', e, 'fbUser=', t);
          var n = !1;
          e ? console.log(c, 'verifySession Firebase returned an error=', e) : t ? (console.log(c, 'verifySession Firebase auth success fbUser=', t, 'sessionKey=', t.sessionKey), n = !0) : console.log(c, 'verifySession Firebase auth returned null fbUser=', t, '$location=', o), n && a.setLastUser(t), i.processInvite(n);
        },
        clearSession: function () {
          FirebaseAuthClient.prototype.clearSession();
        },
        setAdmin: function (e) {
          a.adminRole = e;
        },
        loadCanvasORM: function (e, t, o) {
          var n = u.rootRef.child('orgs').child(e).child('repos').child(t).child('models').child(o);
          i.openModel(n);
        },
        loadCanvas: function (e) {
          var t = u.rootRef.child('models').child(e);
          i.openModel(t);
        },
        generalAuth: function (e, t) {
          if (console.log(c, 'generalAuth error=', e, 'fbUser=', t), a.clearLastUser(), e)
            console.log(c, 'generalAuth Firebase returned an error=', e), u.authFailed(e);
          else if (t) {
            if (console.log(c, 'generalAuth Firebase auth success fbUser=', t, 'sessionKey=', t.sessionKey), a.setLastUser(t), t.sessionKey)
              FirebaseAuthClient.prototype.saveSession(t.firebaseAuthToken, t), delete t.sessionKey;
            else {
              var n = FirebaseAuthClient.prototype.readCookie('firebaseSessionKey');
              console.log(c, 'sessionKey from cookie firebaseSessionKey=', n), t.firebaseSessionKey = n;
            }
            var i = u.rootRef.child('usermap'), r = i.child(t.provider).child(t.id);
            r.once('value', function (e) {
              console.log(c, 'generalAuth', 'mapUserRef once value=', e.val()), u.checkUserMap(e.val(), t, r);
            });
          } else
            console.log(c, 'generalAuth Firebase auth returned null fbUser=', t, '$location=', o), u.authFailed();
        },
        checkUserMap: function (e, t, o) {
          if (e) {
            var n = u.rootRef.child('users').child(e);
            n.once('value', function (n) {
              var i = n.val();
              console.log(c, 'checkUserMap', 'userRef once urValue=', i), i ? (console.log(c, 'checkUserMap', 'userRef urValue=', i), a.retrieveUserRecord(i), u.openSession(e, t)) : (console.log(c, 'checkUserMap', 'Remove orphan from user map: fbUser=', t), o.remove(function () {
                console.log(c, 'checkUserMap', 'Orphan removed from user map: fbUser=', t), u.authFailed({
                  code: 'USER_UNKNOWN',
                  message: 'User ' + t.name + ' (' + t.provider + '-' + t.id + ') not found in Firebase'
                });
              }));
            });
          } else
            console.log(c, 'checkUserMap', 'No record in user map for fbUser=', t, 'firebaseSessionKey=', t.firebaseSessionKey), u.clearSession(), console.log(c, 'checkUserMap', 'Firebase session cleared'), u.authFailed({
              code: 'USER_UNKNOWN',
              message: 'User ' + (t.name ? t.name : '') + ' (' + t.provider + '-' + t.id + ') not found in Firebase'
            });
        },
        authFailed: function (e) {
          console.log(c, 'authFailed error=', e), a.authError(e), t(function () {
            o.url('/entry');
          });
        },
        openSession: function (t, o, n) {
          console.log(c, 'openSession userId=', t, 'fbUser=', o), a.confirmUser(t), i.wakeup(u.rootRef, t, n), console.log(c, 'openSession resolving launch promise'), e.deferredLaunch.resolve(), analytics.identify(t, {
            id: o.id,
            provider: o.provider,
            name: o.name
          });
        },
        log: function (e) {
          var t = new Date(), o = t.getUTCFullYear(), n = t.getUTCMonth(), i = t.getUTCDate(), r = t.getUTCHours(), s = u.rootRef.child('log').child(o).child(n).child(i).child(r);
          e.time = t.getTime(), e.timeISO = t.toISOString(), e.user = a.provider + '-' + a.id, s.push(e);
        },
        createModel: function (e) {
          console.log(c, 'createModel model=', e);
          var t = u.rootRef.child('models'), o = t.push(), n = o.name(), i = {
              fields: angular.copy(e.fields),
              users: {}
            };
          _.each(u.db.users, function (e, t) {
            e.selected && (i.users[t] = !0);
          }), i.users[a.userId] = !0, console.log(c, 'createModel modelUpdate=', i), o.set(i, function (t, o) {
            if (console.log(c, 'createModel model created', 'modelUpdate=', i, 'model=', e, 'error=', t, 'dummy=', o), e.saved = !t, u.log({
                op: t ? 'createModel-error' : 'createModel',
                error: t,
                path: '/models/' + n,
                model: i
              }), !t) {
              var r = u.rootRef.child('users').child(a.userId).child('models').child(n);
              r.set(!0, function (e, t) {
                console.log(c, 'createModel model reference stored to user', 'error=', e, 'dummy=', t);
              });
            }
          });
        },
        saveSticker: function (e) {
          var t = u.getStickerPath(e);
          console.log(c, 'saveSticker stPath=', t, 'st=', e);
          var o = u.rootRef.child(t);
          e.notes = e.notes || '';
          var n = {
              title: e.title,
              notes: e.notes,
              color: e.color.name
            };
          e.position && (e.position.x && (n.x = e.position.x), e.position.y && (n.y = e.position.y)), o.update(n, function (o, i) {
            console.log(c, 'saveSticker sticker saved stPath=', t, 'stUpdate=', n, 'st=', e, 'error=', o, 'dummy=', i), e.saved = !o, u.log({
              op: 'saveSticker',
              path: t,
              sticker: n
            });
          });
        },
        createSticker: function (e) {
          var t = u.getModelPath(e);
          console.log(c, 'createSticker modelPath=', t, 'st=', e);
          var o = u.rootRef.child(t + '/stickers'), n = o.push();
          e.notes = e.notes || '';
          var i = {
              title: e.title,
              notes: e.notes,
              block: e.block,
              color: e.color.name
            };
          e.position && (e.position.x && (i.x = e.position.x), e.position.y && (i.y = e.position.y)), console.log(c, 'createSticker sticker before set modelPath=', t, 'stUpdate=', i), n.set(i, function (o, r) {
            console.log(c, 'createSticker sticker created modelPath=', t, 'stUpdate=', i, 'st=', e, 'error=', o, 'dummy=', r), e.saved = !o, u.log({
              op: 'saveSticker',
              path: t + '/stickers/' + n.name(),
              sticker: i
            });
          });
        },
        getStickerPath: function (e) {
          return '/models/' + e.modelId + '/stickers/' + e.id;
        },
        getModelPath: function (e) {
          return '/models/' + e.modelId;
        },
        getRepoPath: function (e) {
          return '/orgs/' + e.orgId + '/repos/' + e.repoId;
        },
        getOrgPath: function (e) {
          return '/orgs/' + e.id;
        }
      };
    return u;
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
  }]), FirstRevenueApp.factory('Invite', [
  '$timeout',
  '$resource',
  '$location',
  '$q',
  'Firebase',
  'Auth',
  'User',
  function (e, t, o, n, i, r, s) {
    var l = 'Invite';
    console.log(l, 'Service launched');
    var a = [
        'facebook',
        'twitter',
        'github'
      ], c = [
        'linkedin',
        'google',
        'gplus',
        'gmail',
        'gcontacts'
      ], u = {
        deferred: null,
        fb: i,
        primaryToken: null,
        providers: {
          gplus: {
            seq: 7,
            icon: 'google-plus',
            title: 'Google+',
            method: 'singly',
            option: 'gplus'
          },
          gcontacts: {
            seq: 9,
            icon: 'google-plus',
            title: 'Google contacts',
            method: 'singly',
            option: 'gcontacts'
          },
          linkedin: {
            seq: 2,
            icon: 'linkedin',
            title: 'LinkedIn',
            method: 'singly',
            option: 'linkedin'
          },
          facebook: {
            seq: 1,
            icon: 'facebook',
            title: 'Facebook',
            method: 'simple',
            scope: 'email'
          }
        },
        userId: null,
        userRecord: s.record,
        res: t,
        inviteId: null,
        inviteValue: null,
        setInvite: function (e, t) {
          u.inviteId = e, u.inviteValue = t;
        },
        ignoreInvite: function () {
          i.generalAuth(null, s.getLastUser());
        },
        abandonSession: function () {
          i.authClient.clearSession(), i.rootRef.unauth();
        },
        acceptInvite: function (e) {
          console.log(l, 'acceptInvite', 'service=', e), u.abandonSession(), u.authenticateInvite(e).then(u.inviteAuthenticated).then(u.inviteAuthorized).then(u.inviteExisting).then(u.userFetched).then(u.processInvite).then(u.doneInvite).then(u.createNewUser).then(u.saveSession).then(u.inviteModel).then(u.attachModelToUser).then(u.finishInvite, u.inviteFailed);
        },
        rejectResolve: function (t, o, n, i) {
          if (t) {
            var r = i || t;
            console.log(l, 'rejectResolve', 'rejecting error=', r), o.reject(r);
          } else
            'function' == typeof n ? (console.log(l, 'rejectResolve', 'calling success'), n()) : (console.log(l, 'rejectResolve', 'resolving success=', n), e(function () {
              o.resolve(n);
            }));
        },
        authenticateInvite: function (e) {
          var t = n.defer();
          if (_.contains(a, e)) {
            var o = u.providers[e].scope, i = { rememberMe: !0 };
            o && (i.scope = o), console.log(l, 'authenticateInvite', 'Firebase service scope=', o, 'options=', i), u.fb.authClient.launchAuthWindow(e, i, function (e, o, n) {
              u.rejectResolve(e, t, function () {
                n.firebaseAuthToken = o, u.cbInvite(t, n);
              });
            });
          } else
            _.contains(c, e) && (console.log(l, 'authenticateInvite', 'Singly service'), console.log(l, 'authenticateInvite', '$timeout call Auth.launchSinglyAuth'), r.launchSinglyAuth(e, function (e, o) {
              u.rejectResolve(e, t, function () {
                u.cbInvite(t, o);
              });
            }));
          return t.promise;
        },
        cbInvite: function (t, o) {
          console.log(l, 'cbInvite', 'Invite=', u, 'user=', o), o ? (console.log(l, 'cbInvite', 'resolving ivUser=', o), e(function () {
            t.resolve(o);
          })) : (console.log(l, 'cbInvite', 'null user'), s.authFailed = !0, t.reject('Authentication failed'));
        },
        inviteAuthenticated: function (e) {
          var t = n.defer();
          s.authFailed = !0;
          var o = u.inviteValue.status;
          switch (o) {
          case 'created':
            t.reject('App error. This invite was not activated yet.');
            break;
          case 'sent':
            u.inviteMatch(e) ? s.authFailed = !1 : t.reject('The invite was addressed to another user.');
            break;
          case 'accepted':
            u.inviteMatch(e) ? (console.log(l, 'inviteAuthenticated', 'invite already accepted by yourself'), s.authFailed = !1) : t.reject('The invite was already accepted, it was addressed to another user.');
            break;
          default:
            t.reject('App error. Unknown invite status=', o);
          }
          return s.authFailed || (console.log(l, 'inviteAuthenticated', 'sessionKey=', e.sessionKey), e.firebaseSessionKey = e.sessionKey || null, u.fb.rootRef.auth(e.firebaseAuthToken, function (o) {
            u.rejectResolve(o, t, e);
          })), t.promise;
        },
        inviteAuthorized: function (t) {
          var o = n.defer();
          console.log(l, 'inviteAuthorized', 'ivUser=', t);
          var i = u.fb.rootRef.child('usermap'), r = i.child(t.provider).child(t.id);
          return r.once('value', function (n) {
            console.log(l, 'inviteAuthorized', 'mapUserRef once value=', n.val()), t.mapValue = n.val(), e(function () {
              o.resolve(t);
            });
          }), o.promise;
        },
        inviteMatch: function (e) {
          var t = u.inviteValue, o = e;
          return 'singly' === o.provider ? o.service === t.service && o.services[o.service].id === t.id : o.provider === t.service && o.id === t.id;
        },
        inviteExisting: function (e) {
          var t = n.defer();
          if (console.log(l, 'inviteExisting', 'value=', e.mapValue, 'ivUser=', e), e.value) {
            console.log(l, 'inviteExisting', 'found usermap for user', e.provider + '/' + e.id, 'value=', e.mapValue);
            var o = u.fb.rootRef.child('users').child(e.mapValue);
            o.once('value', function (o) {
              var n = o.val();
              console.log(l, 'inviteExisting', 'userRecordRef once value userRecord=', n), e.record = n, t.resolve(e);
            }, function (e) {
              console.log(l, 'inviteExisting', 'userRecordRef once value error=', e), t.reject(e);
            });
          } else
            t.resolve(e);
          return t.promise;
        },
        userFetched: function (t) {
          console.log(l, 'userFetched', 'ivUser=', t);
          var o = n.defer(), i = t.record;
          return i ? (u.inviteRef.update({
            status: 'accepted',
            profile: i.profile
          }, function (e) {
            e ? o.reject(e) : console.log(l, 'userFetched invite profile stored');
          }), e(function () {
            s.retrieveUserRecord(i);
          })) : u.createInvitedUser(o, t), o.promise;
        },
        createInvitedUser: function (e, t) {
          if (console.log(l, 'createInvitedUser', 'ivUser=', t), t) {
            var o = s.storeInviteCredentials(t);
            u.mapRef = u.fb.rootRef.child('usermap'), u.accRef = u.fb.rootRef.child('users'), u.recRef = u.accRef.push(), u.userId = u.recRef.name(), u.fbUser = t, e.resolve(o);
          }
        },
        processInvite: function (e) {
          var t = n.defer();
          console.log(l, 'doneInvite cred=', e), u.primaryToken = e.token;
          var o = e.profile;
          s.storeAccount(o, e);
          var i = u.mapRef.child(o.provider).child(o.id);
          return console.log(l, 'processInvite', 'profile.provider=', o.provider, 'profile.id=', o.id), u.fb.rootRef.auth(e.token, function (o) {
            o ? (console.log(l, 'processInvite', 'user map set auth failed error=', o), t.reject(o)) : i && (console.log(l, 'processInvite', 'setUserMap mapUserRef found, userId=', u.userId), i.set(u.userId, function (o) {
              u.rejectResolve(o, t, e);
            }));
          }), t.promise;
        },
        doneInvite: function (e) {
          var t = n.defer();
          console.log(l, 'doneInvite cred=', e), u.primaryToken = e.token;
          var o = e.profile;
          return s.storeAccount(o, e), u.primaryToken && u.fb.rootRef.auth(u.primaryToken, function (o) {
            console.log(l, 'createNewUser user account set error=', o, 'cred=', e), u.rejectResolve(o, t, e);
          }), t.promise;
        },
        createNewUser: function (e) {
          var t = n.defer();
          return s.record.inviteId = u.inviteId, u.recRef.set(s.record, function (o) {
            console.log(l, 'createNewUser user account set error=', o, 'cred=', e), u.rejectResolve(o, t, e);
          }), t.promise;
        },
        saveSession: function (e) {
          var t = n.defer();
          u.inviteRef.update({
            status: 'accepted',
            userId: u.userId,
            profile: e.profile
          }, function (e) {
            console.log(l, 'saveSession invite profile stored error=', e), t.reject(e);
          }), console.log(l, 'saveSession user account record created');
          var o = s.record.primary, i = s.record.accounts[o].authentic;
          if ('singly' === i.provider)
            console.log(l, 'saveSession provider singly authUser=', i);
          else if (console.log(l, 'saveSession openSession authUser=', i), u.fb.authClient.saveSession(u.primaryToken, i), s.authenticated = !0, u.inviteValue.modelId) {
            var r = u.fb.rootRef.child('models').child(u.inviteValue.modelId);
            t.resolve(r);
          } else
            t.resolve(null);
          return t.promise;
        },
        inviteModel: function (e) {
          var t = n.defer();
          return e ? e.child('users').child(u.userId).set(!0, function (o) {
            u.rejectResolve(o, t, e.name());
          }) : t.resolve(null), t.promise;
        },
        attachModelToUser: function (e) {
          var t = n.defer();
          return console.log(l, 'attachModelToUser modelId=', e), e ? u.recRef.child('models').child(e).set(!0, function (o) {
            u.rejectResolve(o, t, e);
          }) : t.resolve(), t.promise;
        },
        finishInvite: function (e) {
          console.log(l, 'finishInvite'), u.completed = !0, u.modelId = e, i.openSession(u.userId, u.fbUser, e);
        },
        inviteFailed: function (t) {
          console.log(l, 'inviteFailed error=', t), e(function () {
            u.error = t;
          });
        }
      };
    return u;
  }
]), FirstRevenueApp.factory('JWT', [function () {
    var e = 'JWT';
    return console.log(e, 'service launched'), {
      decodeJWT: function (t) {
        console.log(e, 'decodeJWT token=', t);
        var o = t.split('.');
        if (3 !== o.length)
          throw Error('Not enough or too many segments');
        var n = o[0], i = o[1], r = o[2];
        console.log(e, 'decodeJWT', 'headerSeg=', n, 'payloadSeg=', i, 'signatureSeg=', r);
        var s = this.base64urldecode(n), l = this.base64urldecode(i), a = this.base64urldecode(r);
        return console.log(e, 'decodeJWT', 'header=', s, 'payload=', l, 'signature=', a), s + '\n' + l + '\n' + a;
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
      displayToken: function (t) {
        var o = t.split('.');
        console.log(e, 'displayToken tokenParts=', atob(o[0]), atob(o[1]), o[2]);
      }
    };
  }]), FirstRevenueApp.factory('Layout', [
  '$window',
  'Database',
  'Popup',
  'Zoom',
  'FullScreen',
  'Menu',
  function (e, t, o, n, i, r) {
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
        t.reset(), o.reset(), n.reset(), this.view = '', this.guide.wide = !0, this.peer.wide = !1;
      },
      isFullScreen: function () {
        return e.navigator.standalone;
      },
      showButtons: function () {
        return 'canvas' === r.selected;
      }
    };
  }
]), FirstRevenueApp.factory('MasterScope', [function () {
    return {
      masterScope: null,
      setMasterScope: function (e) {
        this.masterScope = e;
      },
      getMasterScope: function () {
        return this.masterScope;
      }
    };
  }]), FirstRevenueApp.factory('MemberCatalog', [
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
    var e = {
        logon: !1,
        logoff: !1,
        dup: !1,
        dis: !1,
        del: !1,
        delNoRights: !1,
        model: !1,
        users: !1,
        stickerId: null,
        sticker: null,
        contact: null,
        openDeleteStickerDialog: function (t, o) {
          e.stickerId = t, e.sticker = o, e.isDeleteAllowed(t) ? e.del = !0 : e.delNoRights = !0;
        },
        isDeleteAllowed: function () {
          return !0;
        }
      };
    return e;
  }]), FirstRevenueApp.factory('ModelCatalog', [
  'Database',
  'TagCatalog',
  'Myself',
  function (e, t, o) {
    var n = 'ModelCatalog', i = {
        sort: 'time',
        tag: '*',
        ascending: !0,
        backInTime: !0,
        refreshModels: function () {
        },
        isPublic: function (e) {
          return !!(o.af.public && o.af.public.models && o.af.public.models[e]);
        },
        getModelsNew3: function (e) {
          var t = {};
          return _.each(o.af.models, function (o, n) {
            var r = i.isPublic(n);
            ('all' === e || 'public' === e && r || 'my' === e && !r) && (o.id = n, t[n] = o);
          }), this.sortModelList(t);
        },
        getModels: function (e) {
          var t = [];
          return _.each(o.af.user.models, function (n, r) {
            var s = o.af.models[r];
            if (s) {
              var l = i.isPublic(r);
              ('all' === e || 'public' === e && l || 'my' === e && !l) && t.push(r);
            } else
              o.af.models[r] = o.af.models[r] || {}, o.loadModel(r, !1), t.push(r);
          }), this.sortModelIdList(t);
        },
        sortModelIdList: function (e) {
          var t = e;
          return 'name' === this.sort && (t = _.sortBy(e, function (e) {
            return o.af.models[e].fields.name;
          }), this.ascending || t.reverse()), 'time' === this.sort && (t = _.sortBy(e, function (e) {
            return e;
          }), this.backInTime && t.reverse()), t;
        },
        sortModelList: function (e) {
          var t = e;
          return 'name' === this.sort && (t = _.sortBy(e, function (e) {
            return e.fields.name;
          }), this.ascending || t.reverse()), 'time' === this.sort && (t = _.sortBy(e, function (e) {
            return e.label;
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
          console.log(n, 'highlightMembers model=', e, 'event=', event), $(event.target).parent().children().css('color', 'darkred');
        },
        getAllTags: function () {
          var t = [];
          _.each(e.models, function (e) {
            console.log(n, 'getAllTags model loop model.id=', e.id), _.each(e.tags, function (e) {
              console.log(n, 'getAllTags tag loop tag.text=', e.text), t.push({
                text: e.text,
                type: 'info',
                count: 1
              });
            });
          });
          var o = t;
          return console.log(n, 'getAllTags allTags=', o), o;
        },
        sortModels: function (e) {
          'name' === this.sort ? 'name' === e ? this.ascending = !this.ascending : (this.sort = e, this.ascending = !0) : 'time' === this.sort && ('time' === e ? this.backInTime = !this.backInTime : (this.sort = e, this.backInTime = !0));
        },
        labelColor: function (e) {
          return e === this.tag ? 'label-success' : 'label-info';
        },
        filterMatch: function (e) {
          var o = t.tag, n = !1;
          if (o)
            if ('*' === o)
              n = !0;
            else {
              var i = _.find(e, function (e) {
                  return e.text === o;
                });
              n = !!i;
            }
          else
            n = 0 === e.length;
          return n;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('Model', [function () {
    return {
      modelId: null,
      model: null
    };
  }]), FirstRevenueApp.factory('Monitor', [function () {
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
    var t = 'Notif';
    return console.log(t, 'service launched'), {
      list: {},
      next: 0,
      show: !1,
      add: function (e) {
        console.log(t, 'add', e), e.seq = this.next, e.time = new Date(), e.type || (e.type = 'info'), this.list[this.next++] = e;
      },
      remove: function (e) {
        console.log(t, 'remove index=', e, 'item=', this.list[e]), delete this.list[e], console.log(t, 'remove deleted notif=', this.list);
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
  uservoice: !1,
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
        var t = '0123456789ABCDEF', o = e % 16, n = (e - o) / 16, i = t.charAt(n) + t.charAt(o);
        return i;
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
        var o = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(o, n, i), s = Math.max(o, n, i), l = s - r;
        if (t.v = s, 0 === l)
          t.h = 0, t.s = 0;
        else {
          t.s = l / s;
          var a = ((s - o) / 6 + l / 2) / l, c = ((s - n) / 6 + l / 2) / l, u = ((s - i) / 6 + l / 2) / l;
          o === s ? t.h = u - c : n === s ? t.h = 1 / 3 + a - u : i === s && (t.h = 2 / 3 + c - a), 0 > t.h && (t.h += 1), t.h > 1 && (t.h -= 1);
        }
        t.h *= 360, t.s *= 100, t.v *= 100;
      },
      hsv2rgb: function (e, t) {
        var o = e.h / 360, n = e.s / 100, i = e.v / 100;
        if (0 === n)
          t.r = 255 * i, t.g = 255 * i, t.b = 255 * i;
        else {
          var r, s, l, a = 6 * o, c = Math.floor(a), u = i * (1 - n), d = i * (1 - n * (a - c)), f = i * (1 - n * (1 - (a - c)));
          0 === c ? (r = i, s = f, l = u) : 1 === c ? (r = d, s = i, l = u) : 2 === c ? (r = u, s = i, l = f) : 3 === c ? (r = u, s = d, l = i) : 4 === c ? (r = f, s = u, l = i) : (r = i, s = u, l = d), t.r = 255 * r, t.g = 255 * s, t.b = 255 * l;
        }
      }
    };
  }]), FirstRevenueApp.factory('Rainbow', [
  'Canvas',
  'RGB',
  function (e, t) {
    var o = '0123456789abcdef', n = {
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
      };
    return {
      canvas: e,
      rgb: t,
      colorMap: n,
      getColorMap: function () {
        return this.colorMap;
      },
      getColor: function (e) {
        var t = this.colorMap[e];
        return t || this.colorMap.neutral;
      },
      colorList: function () {
        return $.map(this.colorMap, function (e, t) {
          return 'neutral' === t ? null : t;
        });
      },
      colorCodeList: function () {
        return $.map(this.colorMap, function (e, t) {
          return e.name = t, 'neutral' === t ? null : e;
        });
      },
      brightenHex: function (e) {
        return e = e || 'FF0000', this.brightenFull(e);
      },
      brighten: function (e) {
        var t = this.colorMap[e].code;
        return this.brightenFull(t);
      },
      brightenFull: function (e, t, o) {
        var n = new this.rgb.rgbObject(0, 0, 0), i = new this.rgb.hsvObject(0, 0, 0);
        return this.rgb.hex2rgb('#' + e, n), this.rgb.rgb2hsv(n, i), 0 === i.s ? 100 > i.v && (i.v = o ? o : 80) : (i.s = t ? t : 50, i.v = o ? o : 100), this.rgb.hsv2rgb(i, n), this.rgb.rgb2hex(n).substring(1);
      },
      opaqueField: function (e) {
        var t = this.colorMap[e].code;
        return this.opaqueFieldHex(t);
      },
      brightenFieldCSS: function (e) {
        return this.brightenFull(this.rgb2hex(e), 100, 100);
      },
      opaqueFieldCSS: function (e) {
        var t = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), o = new this.rgb.hsvObject(0, 0, 0), n = new this.rgb.rgbObject(t[1], t[2], t[3]);
        return this.makeOpaque(n, o);
      },
      opaqueFieldHex: function (e) {
        var t = new this.rgb.rgbObject(0, 0, 0), o = new this.rgb.hsvObject(0, 0, 0);
        return e || (e = 'EFEFEF'), this.rgb.hex2rgb('#' + e, t), this.makeOpaque(t, o);
      },
      makeOpaque: function (e, t) {
        return this.rgb.rgb2hsv(e, t), 100 > t.v ? t.v = 100 : t.s = 0 === t.s ? 0 : Math.max(0, t.s - 10), this.rgb.hsv2rgb(t, e), this.rgb.rgb2hex(e).substring(1);
      },
      rgb2hex: function (e) {
        return e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), this.hex(e[1]) + this.hex(e[2]) + this.hex(e[3]);
      },
      hex: function (e) {
        return isNaN(e) ? '00' : o[(e - e % 16) / 16] + o[e % 16];
      }
    };
  }
]), FirstRevenueApp.factory('RrrrRrrr', [function () {
    return {
      launching: !0,
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
  }]), FirstRevenueApp.factory('SignUp', [
  '$timeout',
  '$resource',
  '$location',
  'Firebase',
  'Auth',
  'User',
  '$q',
  function (e, t, o, n, i, r, s) {
    var l = 'SignUpPromises';
    console.log(l, 'Service launched');
    var a = [
        'facebook',
        'twitter',
        'github'
      ], c = [
        'linkedin',
        'google',
        'gplus',
        'gmail',
        'gcontacts'
      ], u = {
        deferred: null,
        fb: n,
        fbAuthClient: null,
        providers: {
          gplus: {
            seq: 7,
            icon: 'google-plus',
            title: 'Google+',
            method: 'singly',
            option: 'gplus'
          },
          gcontacts: {
            seq: 9,
            icon: 'google-plus',
            title: 'Google contacts',
            method: 'singly',
            option: 'gcontacts'
          },
          linkedin: {
            seq: 2,
            icon: 'linkedin',
            title: 'LinkedIn',
            method: 'singly',
            option: 'linkedin'
          },
          facebook: {
            seq: 1,
            icon: 'facebook',
            title: 'Facebook',
            method: 'simple',
            scope: 'email'
          }
        },
        userId: null,
        userRecord: r.record,
        res: t,
        init: function () {
          console.log(l, 'init'), u.fb.clearSession(), u.fbAuthClient = new FirebaseAuthClient(u.fb.rootRef, u.cbVerify);
          var e = r.getLastUser();
          e && (console.log(l, 'init attaching the last user firebaseSessionKey=', e.firebaseSessionKey), u.cbVerify(null, e));
        },
        attach: function (e, t, o) {
          console.log(l, 'attach service=', e);
          var n = r.credentials[e];
          if (n && n.detached)
            console.log(l, 'attach re-attach service=', e), n.detached = !1;
          else if (r.isSameUser(e))
            console.log(l, 'attach same user found for service=', e), u.cbVerify(null, r.getLastUser());
          else if ('persona' === e)
            u.personaLogin();
          else if ('password' === e)
            u.sendAuthRequest('/auth/firebase', {
              email: t,
              password: o
            });
          else if (_.contains(a, e)) {
            var s = u.providers[e].scope, d = { rememberMe: !0 };
            s && (d.scope = s), u.fbAuthClient.launchAuthWindow(e, d, u.cbVerify3);
          } else
            _.contains(c, e) && i.launchSinglyAuth(e, u.cbVerify);
        },
        personaLogin: function () {
          var e = u.handlePersonaResponse;
          console.log(l, 'personaLogin'), navigator.id.watch({
            onlogin: function (t) {
              console.log(l, 'personaLogin onlogin assertion=', t), e(t);
            },
            onlogout: function () {
              console.log(l, 'personaLogin onlogout');
            }
          }), navigator.id.request({
            oncancel: function () {
              console.log(l, 'personaLogin oncancel'), e(null);
            }
          });
        },
        handlePersonaResponse: function (e) {
          console.log(l, 'handlePersonaResponse authResponse=', e), null === e ? u.cbVerify(u.fbAuthClient.formatError({
            code: 'UNKNOWN_ERROR',
            message: 'User denied authentication request or an error occurred.'
          })) : u.sendAuthRequest('/auth/persona/authenticate', { assertion: e });
        },
        sendAuthRequest: function (e, t) {
          console.log(l, 'sendAuthRequest url=', e, 'json=', t), u.fbAuthClient.jsonp(e, t, function (e, t) {
            if (console.log(l, 'sendAuthRequest jsonp callback error=', e, 'response=', t), e || !t.token)
              u.cbVerify(u.fbAuthClient.formatError(e));
            else {
              var o = t.user;
              o.firebaseAuthToken = o.firebaseAuthToken || t.token, u.cbVerify(null, o);
            }
          });
        },
        cbVerify3: function (e, t, o) {
          o.firebaseAuthToken = t, u.cbVerify(e, o);
        },
        cbVerify: function (e, t) {
          console.log(l, 'cbVerify', 'SignUp=', u, ' error=', e, 'user=', t), e ? (console.log(l, 'cbVerify', 'launchError=', e), r.authFailed = !0) : t ? (console.log(l, 'cbVerify', 'sessionKey=', t.sessionKey), t.sessionKey ? t.firebaseSessionKey = t.sessionKey || null : t.sessionKey = t.firebaseSessionKey || null, u.fb.rootRef.auth(t.firebaseAuthToken, function (e) {
            if (e)
              console.log(l, 'cbVerify', 'authError=', e);
            else {
              console.log(l, 'cbVerify', 'user.provider=', t.provider);
              var o = u.fb.rootRef.child('usermap'), n = o.child(t.provider).child(t.id);
              n.once('value', function (e) {
                console.log(l, 'cbVerify', 'mapUserRef once value=', e.val()), u.checkExisting(e.val(), t);
              });
            }
          })) : (console.log(l, 'cbVerify', 'null user'), r.authFailed = !0);
        },
        checkExisting: function (t, o) {
          if (console.log(l, 'checkExisting', 'value=', t, 'fbUser=', o), t) {
            console.log(l, 'checkExisting', 'found usermap for user', o.provider + '/' + o.id, 'value=', t);
            var n = u.fb.rootRef.child('users').child(t);
            n.once('value', function (t) {
              var n = t.val();
              console.log(l, 'checkExisting', 'userRecordRef once value userRecord=', n), n ? e(function () {
                r.retrieveUserRecord(n, o);
              }) : r.buildServiceCredentials(o);
            }, function (e) {
              console.log(l, 'checkExisting', 'userRecordRef once value error=', e);
            });
          } else
            console.log(l, 'checkExisting', 'value null - build credentials'), r.buildServiceCredentials(o);
        },
        doneCred: function () {
          console.log(l, 'doneCred primaryToken=', u.primaryToken), u.primaryToken && u.fb.rootRef.auth(u.primaryToken, function (t) {
            t ? console.log(l, 'doneCred', 'user account set auth failed error=', t) : u.recRef.set(r.record, function (t) {
              e(function () {
                if (t)
                  console.log(l, 'doneCred user account set error=', t);
                else {
                  console.log(l, 'doneCred user account record created');
                  var e = r.record.primary, o = r.record.accounts[e].authentic;
                  'singly' === o.provider ? console.log(l, 'doneCred provider singly authUser=', o) : (console.log(l, 'doneCred openSession authUser=', o), o.sessionKey = o.firebaseSessionKey, u.fbAuthClient.saveSession(u.primaryToken, o), r.authenticated = !0), u.fb.openSession(u.recRef.name(), o);
                }
              });
            });
          });
        },
        signUp: function () {
          u.mapRef = u.fb.rootRef.child('usermap'), u.accRef = u.fb.rootRef.child('users'), u.recRef = u.accRef.push(), u.userId = u.recRef.name(), u.loadCred(r.firstCred).then(u.recurseCred);
        },
        loadCred: function (e) {
          console.log(l, 'loadCred', 'cred=', e);
          var t = s.defer();
          return u.processCred(e, t), t.promise;
        },
        recurseCred: function (e) {
          console.log(l, 'recurseCred', 'cred=', e), e ? u.loadCred(e).then(u.recurseCred) : u.doneCred();
        },
        processCred: function (t, o) {
          console.log(l, 'processCred', 'cred=', t, 'deferred=', o);
          var n = t.profile;
          u.primaryToken || (u.primaryToken = t.token), r.storeAccount(n, t), console.log(l, 'processCred', 'profile.provider=', n.provider, 'profile.id=', n.id);
          var i = u.mapRef.child(n.provider).child(n.id);
          u.fb.rootRef.auth(t.token, function (n) {
            n ? 'EXPIRED_TOKEN' === n.code ? console.log(l, 'processCred error=', n, 'Processing expired token') : (console.log(l, 'processCred', 'user map set auth failed error=', n), e(function () {
              o.reject(n);
            })) : i && (console.log(l, 'processCred', 'setUserMap mapUserRef found, userId=', u.userId), i.set(u.userId, function (n) {
              n ? (console.log(l, 'processCred user map set error=', n), e(function () {
                o.reject(n);
              })) : (console.log(l, 'processCred user map record created, cred.next=', t.next), e(function () {
                o.resolve(t.next);
              }));
            }));
          });
        }
      };
    return u;
  }
]), FirstRevenueApp.factory('Singly', [
  '$resource',
  'JWT',
  function (e, t) {
    var o = 'Singly';
    console.log(o, 'service launched');
    var n = 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375', i = 'https://api.singly.com/services/:service/:endpoint?limit=:limit&access_token=:token', r = 'https://api.singly.com/profile?access_token=:token', s = {
        gmail: 'contacts',
        gcontacts: 'contacts',
        google: 'self',
        gplus: 'people',
        linkedin: 'connections',
        facebook: 'friends',
        twitter: 'friends',
        github: 'following',
        yammer: 'users',
        meetup: 'groups'
      }, l = {
        clientId: CONFIG_1ST_REVENUE.singlyClientId,
        accessToken: null,
        data: null,
        logoff: function () {
          l.accessToken = null;
        },
        launchAuth: function (e, i, r) {
          console.log(o, 'launchAuth service=', e);
          var a = window.location.origin || window.location.protocol + '//' + window.location.host, c = a + window.location.pathname + 'views/', u = {
              client_id: l.clientId,
              redirect_uri: c + 'SinglyRedirect.html',
              service: e,
              response_type: 'token'
            };
          l.accessToken && (u.access_token = l.accessToken), 'linkedin' === e ? u.scope = 'r_basicprofile r_emailaddress r_network w_messages' : 'gplus' === e && (u.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'), console.log(o, 'Opening WinChan params=', u), WinChan.open({
            url: c + 'SinglyLaunch.html',
            relay_url: c + 'WinChanRelay.html',
            window_features: n,
            params: u
          }, function (n, a) {
            if (console.log(o, 'launchSinglyAuth', 'error=', n, 'response=', a), n)
              console.log(o, 'launchSinglyAuth', 'error=', n);
            else {
              console.log(o, 'launchSinglyAuth', 'response=', a), l.accessToken = a.access_token;
              var c = t.decodeJWT(a.firebase);
              console.log(o, 'launchSinglyAuth', 'singlyFirebase=', c), l.getProfile(a.access_token, function (t) {
                console.log(o, 'launchSinglyAuth', 'Profile.get p=', t), i.auth(a.firebase, function (n, i) {
                  n ? console.log(o, 'Login Failed!', n) : (console.log(o, 'Login Succeeded! account=', i), l.processProfile(e, a, t, i, r));
                });
              }), l.getData(e, a.access_token, s[e], function (e) {
                console.log(o, 'launchAuth data=', e), _.each(e, function (e) {
                  console.log(o, 'launchAuth getData element=', e);
                });
              }, function (e) {
                console.log(o, 'launchAuth getData error=', e);
              });
            }
          });
        },
        getProfile: function (t, n) {
          console.log(o, 'getProfile token=', t);
          var i = e(r, { token: t });
          console.log(o, 'getProfile profileURL=', r), i.get(n, l.requestError);
        },
        processProfile: function (e, t, n, i, r) {
          var s = CryptoJS.MD5(t.firebase).toString(CryptoJS.enc.Hex), l = {
              provider: 'singly',
              token: t.access_token,
              firebaseAuthToken: t.firebase,
              sessionKey: s,
              id: i.auth.account,
              service: e,
              expires: i.expires,
              name: n.name || null,
              email: n.email || null,
              url: n.url || null,
              handle: n.handle || null,
              thumbnail_url: n.thumbnail_url || null,
              services: n.services || null
            };
          console.log(o, 'processProfile acc=', l), r(null, l);
        },
        getData: function (t, n, r, s) {
          console.log(o, 'getData service=', t, 'token=', n, 'endpoint=', r);
          var a = s || l.processData, c = e(i, {
              service: t,
              token: n,
              endpoint: r,
              limit: 20
            });
          l.data = c.query(a, l.requestError);
        },
        processData: function () {
          _.each(l.data, l.processElement);
        },
        processElement: function (e) {
          console.log(o, 'processElement element=', e);
        },
        requestError: function (e) {
          console.log(o, 'requestError error=', e);
        }
      };
    return l;
  }
]), FirstRevenueApp.factory('TagCatalog', [
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
  '$timeout',
  'Notif',
  'TProfile',
  'Singly',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'GPlus',
  'GContacts',
  function (e, t, o, n, i, r, s, l, a) {
    var c = 'User';
    console.log(c, 'service launched');
    var u = {
        gmail: 'contacts',
        gcontacts: 'contacts',
        google: 'self',
        gplus: 'activities',
        linkedin: 'connections',
        facebook: 'friends',
        twitter: 'friends',
        github: 'following',
        yammer: 'users',
        meetup: 'groups'
      }, d = {
        primary: null,
        profile: {},
        accounts: {},
        models: {},
        contacts: {}
      }, f = {
        userId: null,
        account: null,
        record: _.clone(d),
        data: null,
        credentials: {},
        firstCred: null,
        lastCred: null,
        lastUser: null,
        authenticated: !1,
        authFailed: !1,
        error: null,
        isMyself: function (e) {
          return e === f.userId;
        },
        setPrimary: function (e) {
          f.record.primary = e.profile.key;
        },
        isPrimary: function (e) {
          return f.record.primary === e.profile.key;
        },
        clearLastUser: function () {
          f.lastUser = null;
        },
        getLastUser: function () {
          return f.lastUser;
        },
        setLastUser: function (e) {
          f.lastUser = e;
        },
        isSameUser: function (e) {
          var t = f.lastUser ? new o(f.lastUser) : null;
          return t && t.service === e;
        },
        logoff: function () {
          console.log(c, 'logoff'), f.userId = null, f.account = null, f.record = _.clone(d), f.credentials = {}, f.firstCred = null, f.lastCred = null, f.authenticated = !1, n.logoff();
        },
        authError: function (e) {
          console.log(c, 'authError error=', e), f.authenticated = !1, f.authFailed = !0, e && e.code && (f.error = e, t.add({ text: 'Authentication error: ' + e.code }));
        },
        detach: function (e) {
          console.log(c, 'detach key=', e);
          var t = f.credentials[e];
          t && (t.detached = !0);
        },
        confirmUser: function (e) {
          console.log(c, 'confirmUser'), f.userId = e, f.authenticated = !0, f.authFailed = !1;
        },
        buildServiceCredentials: function (t) {
          if (t.provider) {
            console.log(c, 'buildServiceCredentials', 'user added to credentials');
            var n = new o(t);
            e(function () {
              f.storeCredential(n.service, {
                token: t.firebaseAuthToken,
                authentic: t,
                profile: n
              });
            });
          }
        },
        retrieveUserRecord: function (e, t) {
          console.log(c, 'retrieveUserRecord', 'urValue=', e, 'fbUser=', t);
          var o = e;
          o.primary = o.profile.provider + '-' + o.profile.id, _.each(o.accounts, function (e) {
            f.storeCredential(e.profile.service, e, t);
          });
        },
        storeInviteCredentials: function (e) {
          console.log(c, 'storeInviteCredentials', 'user added to credentials');
          var t = new o(e), n = t.service, i = {
              token: e.firebaseAuthToken,
              authentic: e,
              profile: t
            }, r = {
              token: i.authentic.firebaseAuthToken,
              authentic: i.authentic,
              profile: i.profile,
              next: null,
              detached: !1
            };
          return f.credentials[n] = r, f.enhanceProfile(i.profile), r;
        },
        storeCredential: function (e, t, o) {
          if (console.log(c, 'storeCredential', 'service=', e, 'account=', t), !f.credentials[e]) {
            var n = o || t.authentic, i = {
                token: n.firebaseAuthToken,
                authentic: n,
                profile: t.profile,
                next: null,
                detached: !1
              };
            f.credentials[e] = i, f.lastCred && (f.lastCred.next = i), f.firstCred = f.firstCred || i, f.lastCred = i, f.enhanceProfile(t.profile);
          }
        },
        enhanceProfile: function (e) {
          _.defaults(f.record.profile, e), f.record.primary = f.record.primary || e.key, f.record.profile.ready = !0;
        },
        storeAccount: function (e, t) {
          var o = e.account ? 'singly-' + e.account : e.provider + '-' + e.id;
          f.record.primary || (f.record.primary = o, f.record.profile = e), console.log(c, 'storeAccount', 'cred=', t, 'profile=', e), f.record.accounts[o] = {
            active: !0,
            profile: e,
            authentic: t.authentic
          };
        },
        getCredentials: function () {
          var e = {};
          return _.each(f.credentials, function (t, o) {
            t.detached || (e[o] = t);
          }), e;
        },
        getCredentialKeys: function () {
          return _.keys(f.getCredentials());
        },
        loadContacts: function (e) {
          console.log(c, 'loadContacts accounts=', e.accounts), _.each(e.accounts, f.fetchAccount);
        },
        fetchAccount: function (e) {
          console.log(c, 'fetchAccount account=', e);
          var t = e.authentic.accessToken;
          if ('singly' === e.profile.provider) {
            var o = e.profile.service, d = e.authentic.token, p = u[o] || 'self', h = e.authentic.expires, g = new Date().getTime() / 1000;
            console.log(c, 'fetchAccount getContacts service=', o, 'token=', d, 'expires=', h, 'currentTime=', g), h > g ? 'linkedin' === o ? s.getFriends(f, e, d) : 'gplus' === o ? l.getPeople(f, e, d) : 'gcontacts' === o ? a.getContacts(f, e, d) : n.getData(o, d, p) : console.log(c, 'fetchAccount singly expired, service=', o);
          } else
            'facebook' === e.profile.provider ? i.getFriends(f, e, t) : 'twitter' === e.profile.provider && r.getFriends(f, e, t);
        }
      };
    return f;
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
        var n = $('.first-revenue').find('.views');
        for (var i in this.levels)
          n.removeClass('canvas-' + this.levels[i].label);
        n.addClass('canvas-' + this.levels[o].label), 4 === o ? (this.block = this.block || _.find(t.model.blocks, function (e) {
          return 'VP' === e.paneClass;
        }), this.singleBlock = t.singleBlock = this.block) : this.singleBlock = t.singleBlock = null, this.choice = o, e.zoom = !1;
      }
    };
  }
]), FirstRevenueApp.factory('TOrg', [function () {
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
  }]), FirstRevenueApp.factory('TModel', [function () {
    var e = 'TModel', t = [
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
      ], o = function (t, o, n) {
        this.orgId = t.orgId, this.repoId = t.id, this.id = o, n && (this.fields = angular.copy(n.fields)), this.createBlocks(), console.log(e, 'constructor this=', this);
      };
    return o.prototype.createBlocks = function () {
      var o = this, n = o.id;
      o.blocks = {};
      for (var i in t) {
        var r = t[i];
        o.blocks[r.id] = o.blocks[r.id] || {
          paneClass: r.id,
          id: r.id,
          bmId: n,
          name: r.name,
          iconId: r.iconId,
          initials: r.initials,
          stickers: {}
        };
      }
      console.log(e, 'createBlocks model=', o);
    }, o;
  }]), FirstRevenueApp.factory('TSticker', [function () {
    var e = function (e, t, o) {
      console.log('scripts/services/obj/TSticker constructor this=', this, 'model=', e, 'id=', t, 'sticker=', o), this.orgId = e.orgId, this.repoId = e.repoId, this.modelId = e.id, this.id = t, this.setFields(this, o);
    };
    return e.prototype.setFields = function (e, t) {
      e.title = t.title, e.notes = t.notes, e.block = t.block, t.color = t.color || 'yellow', e.color = t.color, t.x || t.y ? e.position = {
        absolute: !0,
        x: t.x,
        y: t.y
      } : e.position && delete e.position, e.shadow = {
        title: t.title,
        notes: t.notes,
        color: t.color
      };
    }, e.prototype.update = function (e) {
      console.log('scripts/services/obj/TSticker update this=', this, 'sticker=', e), this.setFields(this, e);
    }, e;
  }]), FirstRevenueApp.factory('TProfile', [function () {
    var e = function (e) {
      var t = _.extend(this, {
          provider: e.provider || (e.account ? 'singly' : null),
          service: e.service || e.provider,
          id: e.id || e.account,
          serviceId: e.services ? e.services[e.service].id : e.id,
          email: e.email || null,
          name: e.name || (e.email ? e.email.split('@')[0] : null),
          hash: e.hash || (e.email ? CryptoJS.MD5(e.email).toString(CryptoJS.enc.Hex) : null)
        });
      switch (t.key = t.provider + '-' + t.id, e.provider) {
      case 'facebook':
        t.image = '//graph.facebook.com/' + e.username + '/picture';
        break;
      case 'twitter':
        t.image = e.profile_image_url;
        break;
      case 'github':
        t.image = e.avatar_url;
        break;
      case 'persona':
        t.image = '//www.gravatar.com/avatar/' + t.hash;
        break;
      case 'password':
        t.image = '//www.gravatar.com/avatar/' + t.hash;
        break;
      case 'singly':
        t.image = e.thumbnail_url;
        break;
      default:
        t.image = null;
      }
      t.image = t.image || null, console.log('TProfile fbUser=', e, 'profile=', t);
    };
    return e;
  }]), FirstRevenueApp.factory('FirebaseEvents', [
  '$timeout',
  'Database',
  'TProfile',
  function (e, t, o) {
    var n = 'scripts/services/firebase/FirebaseEvents', i = {
        fb: null,
        rootRef: null,
        presenceRef: null,
        db: t,
        userId: null,
        init: function (e, t) {
          console.log(n, 'init', 'fb=', e, 'rootRef=', t, 'db=', i.db), i.fb = e, i.rootRef = t;
        },
        connTracking: function () {
          var e = i.rootRef.child('.info/connected');
          e.on('value', function (t) {
            i.fb.connected = t.val(), i.fb.connStatus = i.fb.connected ? 'Connected' : 'Offline', i.fb.connected && i.presenceRef && i.presenceRef.set(!0), console.log(n, 'connTracking connRef .info/connected connRef=', e, 'snap=', t, 'fb.connected=', i.fb.connected, 'fb.connStatus=', i.fb.connStatus);
          });
        },
        userTracking: function (e, t) {
          console.log(n, 'userTracking userId=', e, 'fbUser=', t), i.userId = e;
          var r = t.provider + '-' + t.id;
          i.presenceRef = i.rootRef.child('presence').child(e), i.presenceRef.onDisconnect().set(!1), i.presenceRef.set(!0);
          var s = i.rootRef.child('users').child(e), l = s.child('accounts').child(r);
          l.set({
            active: !0,
            authentic: t,
            profile: new o(t)
          }, function (e) {
            e && console.log(n, 'userTracking account set error=', e);
          }), s.once('value', i.myselfValue, i.myselfError);
          var a = i.rootRef.child('admins').child(e);
          a.on('value', i.adminValue, i.adminError);
        },
        myselfValue: function (e) {
          console.log(n, 'myselfValue snap.val()=', e.val()), i.fb.log({
            op: 'setMyself',
            path: '/users/' + i.userId
          }), e.ref().child('accounts').on('value', i.userAccountValue), e.ref().child('models').on('value', i.privateTree), i.rootRef.child('public').on('value', i.publicTree);
        },
        myselfError: function (e) {
          console.log(n, 'myselfError error=', e);
        },
        adminValue: function (e) {
          var t = e.val();
          console.log(n, 'adminValue av=', t), null !== t && (console.log(n, 'adminValue user has admin privileges'), i.fb.setAdmin(!0), i.fb.log({
            op: 'adminConnected',
            path: '/admins/' + i.userId,
            value: t
          }));
        },
        adminError: function (e) {
          console.log(n, 'adminError error=', e);
        },
        userAccountValue: function (e) {
          console.log(n, 'userAccountValue'), _.each(e.val(), function (e) {
            console.log(n, 'userAccountValue account=', e), i.fb.user.record.accounts[e.profile.key] = e;
          });
        },
        privateTree: function (e) {
          i.loadModelTree('private', e);
        },
        publicTree: function (e) {
          i.loadModelTree('public', e);
        },
        loadModelTree: function (t, o) {
          var r = o.val();
          console.log(n, 'loadModelTree publicFlag=', t, 'tree=', r), e(function () {
            i.db.modelsLoaded = !0;
          }), _.each(r, function (e, o) {
            if (console.log(n, 'loadModelTree key=', o, 'pathStr=', e), '/' === e[0]) {
              var r = e.split('/'), s = r[1], l = r[2], a = r[3];
              if (console.log(n, 'loadModelTree org=', s, 'repo=', l, 'model=', a), s && l && a) {
                var c = i.rootRef.child('orgs').child(s).child('repos').child(l).child('models').child(a);
                console.log(n, 'loadModelTree', 'fbe.db.modelScope=', i.db.modelScope, 'pathStr=', e, 'modelRef=', c), i.db.modelScope[e] || (console.log(n, 'loadModelTree on model props'), c.child('fields').on('value', i.modelFields), c.child('users').on('value', i.modelUsers), i.db.modelScope[e] = t);
              }
            }
          });
        },
        modelFields: function (e) {
          e.forEach(function (e) {
            i.modelFieldValue(e);
          });
        },
        modelOldFieldValue: function (e) {
          console.log(n, 'modelOldFieldValue', 'modelFieldSnap.name()=', e.name());
          var t = e.val();
          if (t) {
            var o = e.ref(), r = i.getModelPath(o.parent());
            r.fieldId = e.name();
            var s = o.parent().child('fields').child(r.fieldId);
            s.set(t), o.remove();
          }
        },
        modelFieldValue: function (t) {
          console.log(n, 'modelFieldValue', 'modelFieldSnap.name()=', t.name());
          var o = t.val();
          if (o) {
            var r = t.ref(), s = i.getModelPath(r.parent().parent());
            s.fieldId = t.name(), e(function () {
              i.db.updateModel.call(i.db, s, o);
            }, 0);
          }
        },
        modelProfileValue: function (t) {
          var o = t.ref().parent().name();
          console.log(n, 'modelProfileValue', 'userId=', o, 'profileSnap.val(()=', t.val()), e(function () {
            i.db.addUserProfile.call(i.db, o, t.val());
          }, 0);
        },
        presenceValue: function (t) {
          e(function () {
            i.db.monitorPresence.call(i.db, t.name(), t.val());
          }, 0);
        },
        openModel: function (e) {
          console.log(n, 'openModel', 'modelRef.name()=', e.name());
          var t = e.child('stickers');
          t.on('child_added', i.stAdded), t.on('child_removed', i.stRemoved);
        },
        stAdded: function (e) {
          console.log(n, 'stAdded', 'stSnap.name()=', e.name()), e.ref().on('value', i.stValue);
        },
        stRemoved: function (e) {
          console.log(n, 'stRemoved', 'oldStSnap=', e), i.db.deleteSticker.call(i.db, i.getStPath(e)), e.ref().off('value', i.stValue);
        },
        stValue: function (e) {
          console.log(n, 'stValue', 'stSnap.name()=', e.name()), e.val() && i.db.refreshSticker.call(i.db, i.getStPath(e));
        },
        getStPath: function (e) {
          var t = e.ref(), o = t.parent().parent(), n = i.getModelPath(o);
          return n.id = t.name(), n.value = e.val(), n;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('Sync', [
  '$location',
  'angularFire',
  'SyncModels',
  function (e, t, o) {
    var n = 'services/Sync', i = o, r = {
        rootRef: null,
        userId: null,
        modelsLoaded: !1,
        originalPath: null,
        masterScope: null,
        setMasterScope: function (t) {
          r.masterScope = t, r.originalPath = r.originalPath || e.path();
        },
        syncUser: function (e, o) {
          r.rootRef = e, r.userId = o, r.userRef = e.child('users').child(o), i.init(e, r.masterScope);
          var n = '' + r.userRef;
          r.masterScope.myself = t(n, r.masterScope, 'myself'), r.masterScope.myself.then(r.userDataLoaded, r.userDataFailed), r.connTracking(e, o);
        },
        userDataLoaded: function (t) {
          console.log(n, 'userDataLoaded myself=', t), i.collectModels(r.userRef.child('models')), i.collectModels(r.rootRef.child('public')), r.modelsLoaded = !0, e.path(r.originalPath || '/repo');
        },
        userDataFailed: function (t) {
          console.log(n, 'userDataFailed error=', t), e.path('/entry');
        },
        connTracking: function (e, t) {
          var o = r.rootRef.child('presence').child(t), i = r.rootRef.child('.info/connected');
          o.onDisconnect().set(!1), i.on('value', function (e) {
            r.connected = e.val(), r.connected && o.set(!0), console.log(n, 'connTracking connRef .info/connected connRef=', i, 'sync.connected=', r.connected, 'sync.connStatus=', r.connStatus());
          });
        },
        connStatus: function () {
          return r.connected ? 'Connected' : 'Offline';
        },
        modelCount: function () {
          return _.size(r.masterScope.models);
        },
        getModelData: function (e, t) {
          return r.masterScope[e + (t ? '_' + t : '')];
        }
      };
    return r;
  }
]), FirstRevenueApp.factory('SyncModels', [
  'angularFire',
  function (e) {
    var t = 'services/SyncModels', o = {
        rootRef: null,
        masterScope: null,
        init: function (e, t) {
          o.rootRef = e, o.masterScope = t;
        },
        collectModels: function (e) {
          e.on('child_added', o.modelAdded), e.on('child_changed', o.modelChanged), e.on('child_removed', o.modelRemoved);
        },
        modelAdded: function (e) {
          var t = e.val();
          'public' === e.ref().parent().name() ? o.loadPublicModels(t) : o.loadModel(t, !1);
        },
        loadPublicModels: function (e) {
          if (console.log(t, 'loadPublicModels modelPathStr=', e), '/' === e[0]) {
            var n = e.split('/'), i = n[1], r = n[2], s = n[3];
            s ? o.loadModel(e, !0) : r ? o.loadPublicRepo(i, r) : i && o.loadPublicOrg(i);
          }
        },
        loadPublicOrg: function (e) {
          var t = o.rootRef.child('orgs').child(e).child('repos');
          t.on('child_added', o.publicRepoAdded);
        },
        publicRepoAdded: function (e) {
          var t = e.name(), n = e.ref(), i = n.parent().parent().name();
          o.loadPublicRepo(i, t);
        },
        loadPublicRepo: function (e, t) {
          var n = o.rootRef.child('orgs').child(e).child('repos').child(t).child('models');
          n.on('child_added', o.publicModelAdded);
        },
        publicModelAdded: function (e) {
          var t = e.name(), n = e.ref(), i = n.parent().parent(), r = i.parent().parent(), s = i.name(), l = r.name(), a = '/' + l + '/' + s + '/' + t;
          o.loadSingleModel(a, n, !0);
        },
        loadModel: function (e, n) {
          console.log(t, 'loadModel modelPath=', e);
          var i = e.split('/'), r = i[1], s = i[2], l = i[3];
          if (console.log(t, 'loadModel org=', r, 'repo=', s, 'model=', l), r && s && l) {
            var a = o.rootRef.child('orgs').child(r).child('repos').child(s).child('models').child(l);
            o.loadSingleModel(e, a, n);
          }
        },
        loadSingleModel: function (e, n, i) {
          var r = e.replace(/[\/\s]/g, '_');
          o.masterScope.models[r] ? console.log(t, 'loadSingleModel ignored duplicate model at path=', e) : (o.observeBranch(n, r, 'fields', i), o.observeBranch(n, r, 'users', i), o.observeBranch(n, r, 'invites', i));
        },
        observeBranch: function (n, i, r, s) {
          var l = '' + n.child(r), a = i + '_' + r;
          o.masterScope.models[i] = o.masterScope.models[i] || {
            'public': s,
            label: n.name()
          };
          var c = e(l, o.masterScope, a);
          c.then(function (e) {
            console.log(t, 'observeBranch loaded for part=', r, 'data=', e), o.masterScope.models[i][r] = a;
          });
        },
        modelChanged: function (e) {
          console.log(t, 'modelChanged modelPath=', e.val());
        },
        modelRemoved: function (e) {
          console.log(t, 'modelRemoved modelPath=', e.val());
        }
      };
    return o;
  }
]), FirstRevenueApp.factory('Myself', [
  '$location',
  '$timeout',
  '$route',
  'MyModels',
  'MyContacts',
  'MyInvites',
  'ModelStickers',
  'Social',
  function (e, t, o, n, i, r, s, l) {
    var a = 'Myself';
    console.log(a, 'service launched');
    var c = n, u = i, d = r, f = {
        rootRef: null,
        userRef: null,
        publicRef: null,
        userId: null,
        user: null,
        af: null,
        afCallback: null,
        social: l,
        models: c.models,
        partners: u.partners,
        invites: d.invites,
        modelsLoaded: !1,
        currentModel: null,
        sessionFound: !1,
        originalPath: null,
        blocks: [
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
        ],
        init: function (e, t, o) {
          console.log(a, 'init'), f.originalPath = e, f.af = t, f.afCallback = o;
        },
        wakeup: function (e, t, o) {
          console.log(a, 'wakeup'), f.rootRef = e, f.userId = t, f.userRef = e.child('users').child(t), f.publicRef = e.child('public'), c.init(e, f.userRef, f.af, f.afCallback), u.init(e, f.userRef), d.init(e, f.userRef), f.afCallback && (f.userRef.off('value'), f.publicRef.off('value'), f.afCallback(f.userRef, 'af.user').then(f.collectUserData), f.afCallback(f.publicRef, 'af.public').then(f.collectPublicData)), f.connTracking(e, t), f.selectedModelId = o || null;
        },
        collectUserData: function (e) {
          console.log(a, 'wakeup userPromise resolved afUser=', e), _.each(f.af.user.models, function (e, t) {
            f.loadModel(t, !1);
          }), f.navigateInitialView(), u.collectPartners(f.userRef);
        },
        collectPublicData: function (e) {
          console.log(a, 'wakeup publicPromise resolved afPublic=', e), _.each(f.af.public.models, function (e, t) {
            f.loadModel(t, !0);
          });
        },
        loadModel: function (e, t) {
          c.loadModel(e, t);
        },
        logoff: function () {
          console.log(a, 'logoff'), f.userRef.off('value'), d.logoff(), u.logoff(), c.logoff(), f.userRef = null, f.userId = null, f.af.user = {};
        },
        processInvite: function (e) {
          console.log(a, 'processInvite'), f.sessionFound = e, t(function () {
            console.log(a, 'processInvite $timeout calls $route.reload()'), o.reload();
          });
        },
        openModel: function (e) {
          console.log(a, 'openModel', 'modelRef.name()=', e.name());
        },
        myDataValue: function (e) {
          f.user = e.val(), console.log(a, 'myDataValue me.user=', f.user), c.collectModels(f.userRef), c.collectModels(f.rootRef.child('public')), u.collectPartners(f.userRef), f.navigateInitialView();
        },
        navigateInitialView: function () {
          t(function () {
            f.modelsLoaded = !0, e.path(f.selectedModelId ? '/canvas/' + f.selectedModelId : '/repo');
          });
        },
        dataCancel: function (o) {
          console.log(a, 'dataCancel error=', o), t(function () {
            e.path('/entry');
          });
        },
        connTracking: function (e, o) {
          var n = e.child('presence').child(o), i = e.child('.info/connected');
          i.on('value', function (e) {
            f.connected = e.val(), f.connected && t(function () {
              n.set(!0), n.onDisconnect().remove();
            }), console.log(a, 'connTracking connRef .info/connected connRef=', i, 'me.connected=', f.connected, 'me.connStatus=', f.connStatus());
          });
        },
        connStatus: function () {
          return f.connected ? 'Connected' : 'Offline';
        },
        modelCount: function () {
          return _.size(f.af.user.models);
        },
        saveAllContacts: function () {
          console.log(a, 'saveAllContacts'), _.each(f.user.accounts, function (e) {
            u.saveContacts(e);
          });
        },
        getAccounts: function () {
          return u.getAccounts();
        },
        getContacts: function (e) {
          return console.log(a, 'getContacts accountId=', e), u.getContacts(e);
        },
        getSocialContacts: function (e) {
          return console.log(a, 'getContacts accountId=', e), u.getContacts(e);
        },
        toggleContact: function (e) {
          var t = f.getContactKey(e);
          f.currentModel.users[t] ? delete f.currentModel.users[t] : f.currentModel.users[t] = e;
        },
        wasContactSelected: function (e) {
          return console.log(a, 'wasContactSelected contact=', e), f.currentModel ? !!f.currentModel.users[f.getContactKey(e)] : {};
        },
        getContactKey: function (e) {
          return e.service + '-' + e.id;
        },
        inviteUsers: function () {
        },
        peerCount: function () {
          return _.size(f.getContacts());
        },
        saveContacts: function (e) {
          console.log(a, 'saveContacts account=', e, 'total=', e.contacts.total, 'refreshed=', e.contacts.refreshed, 'date=', new Date(e.contacts.refreshed).toUTCString());
          var t = e.profile.key, o = f.userRef.child('accounts').child(t).child('contacts');
          o.set(e.contacts);
        },
        findAccount: function (e) {
          return _.find(f.af.user.accounts, function (t) {
            return t.profile.service === e;
          });
        }
      };
    return f;
  }
]), FirstRevenueApp.factory('MyModels', [
  '$timeout',
  'ModelUsers',
  'Database',
  function (e, t, o) {
    var n = 'services/MyModels', i = {
        rootRef: null,
        userRef: null,
        af: null,
        afCallback: null,
        mu: t,
        db: o,
        models: {},
        init: function (e, t, o, r) {
          console.log(n, 'init'), i.rootRef = e, i.userRef = t, i.af = o, i.afCallback = r, i.mu.init(e), i.db.init(i);
        },
        logoff: function () {
          console.log(n, 'logoff');
          var e = i.rootRef.child('models');
          e.off('child_added'), e.off('child_changed'), e.off('child_removed'), _.each(i.models, function (t) {
            var o = e.child(t.id);
            o.child('fields').off('value'), o.child('users').off('value'), o.child('invites').off('value');
          }), i.af.models = {}, i.af.invites = {}, i.af.peers = {};
        },
        loadModel: function (e, t) {
          console.log(n, 'loadModel modelId=', e, 'publicFlag=', t);
          var o = i.rootRef.child('models').child(e), r = 'af.models[\'' + e + '\']';
          console.log(n, 'loadModel modelKey=', r);
          var s = i.afCallback && i.afCallback(o, r);
          s && s.then(i.loadModelData);
        },
        loadModelData: function (e) {
          console.log(n, 'loadModel modelPromise resolved afModel=', e), _.each(e.users, i.processModelUsers), _.each(e.invites, i.processModelInvites);
        },
        processModelUsers: function (e, t) {
          if (i.af.peers[t])
            console.log(n, 'loadModel processModelUsers peer already loaded key=', t);
          else {
            var o = 'af.peers[\'' + t + '\']', r = i.rootRef.child('users').child(t).child('profile'), s = i.afCallback && i.afCallback(r, o);
            s && s.then(function (e) {
              console.log(n, 'loadModel processModelUsers resolved afPeer=', e);
            });
          }
        },
        processModelInvites: function (e, t) {
          if (i.af.invites[t])
            console.log(n, 'loadModel processModelInvites invite already loaded key=', t);
          else {
            var o = 'af.invites[\'' + t + '\']', r = i.rootRef.child('invites').child(t), s = i.afCallback && i.afCallback(r, o);
            s && s.then(function (e) {
              console.log(n, 'loadModel processModelInvites resolved afInvite=', e), 'accepted' === e.status && console.log(n, 'loadModel processModelInvites accepted afInvite=', e);
            });
          }
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('MyContacts', [
  '$timeout',
  function (e) {
    var t = 'MyContacts', o = {
        rootRef: null,
        userRef: null,
        accounts: {},
        partners: {},
        init: function (e, n) {
          console.log(t, 'init'), o.rootRef = e, o.userRef = n;
        },
        logoff: function () {
          console.log(t, 'logoff');
          var e = o.userRef.child('accounts');
          e.off('child_added'), e.off('child_removed'), _.each(o.accounts, function (t, o) {
            var n = e.child(o).child('contacts').child('partners');
            n.off('child_added'), n.off('child_changed'), n.off('child_removed');
          });
        },
        collectPartners: function (e) {
          console.log(t, 'collectPartners');
          var n = e.child('accounts');
          n.on('child_added', o.accountAdded, o.partnerCancel), n.on('child_removed', o.accountRemoved, o.partnerCancel);
        },
        accountAdded: function (e) {
          o.accountId = e.name(), console.log(t, 'accountAdded accountId=', o.accountId), o.accounts[o.accountId] = angular.extend(e.val(), { allContacts: {} }), o.partners[o.accountId] = {};
          var n = e.ref().child('contacts').child('partners');
          n.on('child_added', o.partnerAdded, o.partnerCancel), n.on('child_changed', o.partnerAdded, o.partnerCancel), n.on('child_removed', o.partnerRemoved, o.partnerCancel);
        },
        partnerCancel: function (e) {
          console.log(t, 'partnerCancel error=', e);
        },
        partnerAdded: function (n) {
          var i = n.ref(), r = n.val();
          if (console.log(t, 'partnerAdded partner=', r), 'object' == typeof r) {
            var s = i.name(), l = i.parent().parent().parent().name(), a = n.child('name').val(), c = n.child('image').val();
            console.log(t, 'partnerAdded for accountId=', l, 'partnerId=', s, 'name=', a, 'image=', c), e(function () {
              var e = o.accounts[l], t = angular.extend({}, r, {
                  id: s,
                  service: e.profile.service,
                  provider: e.profile.provider,
                  selected: !1
                });
              'private' !== t.id && (o.partners[l][s] = t);
            });
          }
        },
        accountRemoved: function (n) {
          console.log(t, 'accountRemoved account=', n.val()), o.accountId = n.name(), e(function () {
            delete o.accounts[o.accountId];
          });
        },
        partnerRemoved: function (n) {
          console.log(t, 'partnerRemoved contact=', n.val());
          var i = n.ref(), r = i.name(), s = i.parent().parent().parent().name();
          e(function () {
            delete o.partners[s][r];
          });
        },
        getAccounts: function () {
          return console.log(t, 'getAccounts'), o.accounts;
        },
        getContacts: function (e) {
          if (console.log(t, 'getContacts accountId=', e, 'partners=', o.partners), e)
            return o.partners[e];
          var n = {};
          return _.each(o.accounts, function (e, t) {
            _.each(o.partners[t], function (e) {
              n[e.service + '-' + e.id] = e;
            });
          }), n;
        }
      };
    return o;
  }
]), FirstRevenueApp.factory('MyInvites', [
  '$timeout',
  function (e) {
    var t = 'services/MyInvites', o = {
        rootRef: null,
        userRef: null,
        invites: {},
        init: function (e, n) {
          console.log(t, 'init'), o.rootRef = e, o.userRef = n;
        },
        logoff: function () {
          console.log(t, 'logoff');
          var e = o.userRef.child('invites');
          e.off('child_added'), e.off('child_removed'), _.each(o.invites, function (e, t) {
            var n = o.rootRef.child('invites').child(t);
            n.off('value');
          });
        },
        collectInvites: function (e) {
          var t = e.child('invites');
          t.on('child_added', o.inviteAdded, o.inviteCancel), t.on('child_removed', o.inviteRemoved, o.inviteCancel);
        },
        inviteAdded: function (e) {
          o.inviteId = e.name(), o.invites[o.inviteId] = e.val();
          var t = o.rootRef.child('invites').child(o.inviteId);
          t.on('value', o.inviteModified, o.inviteCancel);
        },
        inviteModified: function (e) {
          var n = e.val();
          console.log(t, 'inviteModified invite=', n), o.invites[n.name()].status = n.status, console.log(t, 'inviteModified status=', n.status), 'accepted' === n.status && console.log(t, 'inviteModified accepted');
        },
        inviteCancel: function (e) {
          console.log(t, 'inviteCancel error=', e);
        },
        inviteRemoved: function (n) {
          console.log(t, 'inviteRemoved account=', n.val()), o.inviteId = n.name();
          var i = o.rootRef.child('invites').child(o.inviteId);
          i.off('value'), e(function () {
            delete o.invites[o.inviteId];
          });
        },
        getInvites: function () {
          return o.invites;
        }
      };
    return o;
  }
]), FirstRevenueApp.factory('ModelUsers', [
  '$timeout',
  'Database',
  function (e, t) {
    var o = 'services/ModelUsers', n = {
        rootRef: null,
        db: t,
        init: function (e) {
          n.rootRef = e;
        },
        logoff: function () {
        },
        loadModelUsers: function (t) {
          t.forEach(function (e) {
            var t = e.name();
            console.log(o, 'loadModelUsers memberUserId=', t), n.rootRef.child('users').child(t).child('profile').on('value', n.modelProfileValue, function () {
              e.ref().remove(n.orphanMemberRemoved);
            }), n.rootRef.child('presence').child(t).on('value', n.presenceValue);
          }), e(function () {
            n.db.updateModelUsers.call(n.db, t.ref().parent().name(), t.val());
          }, 0);
        },
        orphanMemberRemoved: function (e) {
          console.log(o, 'orphanMemberRemoved error=', e);
        },
        modelProfileValue: function (t) {
          var i = t.ref().parent().name();
          console.log(o, 'modelProfileValue', 'userId=', i, 'profileSnap.val(()=', t.val()), e(function () {
            n.db.addUserProfile.call(n.db, i, t.val());
          }, 0);
        },
        presenceValue: function (t) {
          e(function () {
            n.db.monitorPresence.call(n.db, t.name(), t.val());
          }, 0);
        },
        getModelPath: function (e) {
          return { modelId: e.name() };
        },
        getModelPathKey: function (e) {
          var t = n.getModelPath(e);
          return '/' + t.orgId + '/' + t.repoId + '/' + t.modelId;
        }
      };
    return n;
  }
]), FirstRevenueApp.factory('ModelStickers', [
  '$timeout',
  'Database',
  function (e, t) {
    var o = 'services/ModelStickers', n = {
        db: t,
        loadStickers: function (e) {
          console.log(o, 'loadStickers', 'modelRef.name()=', e.name());
          var t = e.child('stickers');
          t.on('child_added', n.stAdded), t.on('child_removed', n.stRemoved);
        },
        stAdded: function (e) {
          console.log(o, 'stAdded', 'stSnap.name()=', e.name()), e.ref().on('value', n.stValue);
        },
        stRemoved: function (e) {
          console.log(o, 'stRemoved', 'oldStSnap=', e), n.db.deleteSticker.call(n.db, n.getStPath(e)), e.ref().off('value', n.stValue);
        },
        stValue: function (e) {
          console.log(o, 'stValue', 'stSnap.name()=', e.name()), e.val() && n.db.refreshSticker.call(n.db, n.getStPath(e));
        },
        getStPath: function (e) {
          var t = e.ref(), o = t.parent().parent(), i = n.getModelPath(o);
          return i.id = t.name(), i.value = e.val(), i;
        },
        getModelPath: function (e) {
          return { modelId: e.name() };
        }
      };
    return n;
  }
]), FirstRevenueApp.factory('StickerEditor', [
  '$window',
  '$log',
  'Layout',
  'Firebase',
  'Rainbow',
  function (e, t, o, n, i) {
    return {
      active: !1,
      block: null,
      stickerId: null,
      sticker: null,
      rainbow: i,
      firebase: n,
      showSticker: function (e, t, n) {
        console.log('StickerEditor showSticker model=', e, 'blockId=', t, 'stickerId=', n);
        var i = this;
        this.active = !0, 0 === n ? this.sticker = {
          title: '',
          notes: '',
          block: t,
          color: 'yellow'
        } : (this.stickerId = n, this.sticker = e.stickers[n]), o.editor.sticker = !0, setTimeout(function () {
          i.focusTitle();
        }, 0);
      },
      setColor: function (e) {
        this.sticker.color = e;
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
        return !(this.matchTitle() && this.matchNotes() && this.matchColor());
      },
      focusTitle: function () {
        var e = $('.field-title').get(0);
        e && this.placeCaretAtEnd(e);
      },
      placeCaretAtEnd: function (t) {
        if (t.focus(), void 0 !== e.getSelection && void 0 !== e.document.createRange) {
          var o = e.document.createRange();
          o.selectNodeContents(t), o.collapse(!1);
          var n = e.getSelection();
          n.removeAllRanges(), n.addRange(o);
        } else if (void 0 !== e.document.body.createTextRange) {
          var i = e.document.body.createTextRange();
          i.moveToElementText(t), i.collapse(!1), i.select();
        }
      }
    };
  }
]), FirstRevenueApp.factory('UserEditor', [
  'Editor',
  function (e) {
    return console.log('UserEditor Editor=', e), {};
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
          var n = _.find(t.fields, function (e) {
              return 'Notes' === e.label;
            });
          if (n) {
            var i = n.values[0].value;
            return i === t.notes;
          }
          return '' === t.notes;
        }
        return !0;
      }
    };
  }
]), FirstRevenueApp.factory('ContactEditor', [
  'Editor',
  function (e) {
    return console.log('ContactEditor Editor=', e), {};
  }
]), FirstRevenueApp.factory('Social', [
  '$timeout',
  'Singly',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'GPlus',
  'GContacts',
  function (e, t, o, n, i, r, s) {
    var l = 'Social';
    console.log(l, 'service launched');
    var a = {
        gmail: 'contacts',
        gcontacts: 'contacts',
        google: 'self',
        gplus: 'activities',
        linkedin: 'connections',
        facebook: 'friends',
        twitter: 'friends',
        github: 'following',
        yammer: 'users',
        meetup: 'groups'
      }, c = {
        partners: {},
        refreshed: 0,
        total: 0
      }, u = {
        me: null,
        account: null,
        selectedItems: [],
        loaded: {},
        contacts: {},
        fetchAccount: function (e, t) {
          u.me = e;
          var o = u.findAccount(t);
          u.fetchSocialAccount(o);
        },
        fetchSocialAccount: function (e) {
          console.log(l, 'fetchAccount account=', e), e.contacts = e.contacts || c;
          var d = e.authentic.accessToken;
          if ('singly' === e.profile.provider) {
            var f = e.profile.service, p = e.authentic.token, h = a[f] || 'self', g = e.authentic.expires, v = new Date().getTime() / 1000;
            console.log(l, 'fetchAccount getContacts service=', f, 'token=', p, 'expires=', g, 'currentTime=', v), 'linkedin' === f ? i.getFriends(u.me, e, p) : 'gplus' === f ? r.getPeople(u.me, e, p) : 'gcontacts' === f ? s.getContacts(u.me, e, p) : h ? t.getData(f, p, h) : console.log(l, 'Unknown Singly service, endpoint not found');
          } else
            'facebook' === e.profile.provider ? o.getFriends(u.me, e, d) : 'twitter' === e.profile.provider && n.getFriends(u.me, e, d);
        },
        invite: function (e, t) {
          switch (e.service) {
          case 'facebook':
            o.sendMessage(e, t);
            break;
          case 'linkedin':
            var n = u.findAccount(e.service);
            i.sendMessage(e, n.authentic.token, t);
          }
        },
        findAccount: function (e) {
          return _.find(u.me.af.user.accounts, function (t) {
            return t.profile.service === e;
          });
        }
      };
    return u;
  }
]), FirstRevenueApp.factory('Facebook', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = 'Facebook', n = 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375', i = {
        100000846188241: 'Dalia',
        555252129: 'Terje',
        100000518746672: 'Edmundas'
      }, r = '100000518746672', s = '456109224430372', l = 'https://graph.facebook.com/me/friends?fields=name,username,picture,email&access_token=:token', a = {
        me: null,
        account: null,
        afAccount: null,
        total: 0,
        friends: null,
        sendMessage: function (e, l) {
          console.log('Facebook sendMessage contact=', e);
          var a = window.location.origin || window.location.protocol + '//' + window.location.host, c = a + window.location.pathname + 'views/', u = c + 'FacebookRedirect.html', d = c + 'FacebookInvitation.html', f = !!i[e.serviceId], p = f ? e.serviceId : r, h = {
              app_id: s,
              redirect_uri: u,
              display: 'page',
              to: p,
              link: d + '?invite=' + e.invite
            };
          WinChan.open({
            url: c + 'FacebookLaunch.html',
            relay_url: c + 'WinChanRelay.html',
            window_features: n,
            params: h
          }, function (e, n) {
            t(function () {
              console.log(o, 'sendMessage', 'error=', e, 'response=', n), e ? console.log(o, 'sendMessage', 'error=', e) : (console.log(o, 'sendMessage', 'response=', n), n.success ? l(null, !0) : l(null, !1));
            });
          });
        },
        getFriends: function (t, o, n) {
          a.me = t, a.account = o, a.afAccount = t.af.user.accounts[o.profile.key], console.log('Facebook getFriends token=', n);
          var i = e(l, { token: n });
          a.friends = i.get(a.processFriends, a.queryError);
        },
        processFriends: function (e) {
          console.log('Facebook processFriends friends=', e), a.me.social.contacts.facebook = a.me.social.contacts.facebook || {}, t(function () {
            a.total = 0, a.afAccount.contacts = a.afAccount.contacts || { refreshed: Date.now() }, _.each(e.data, a.processFriend), a.afAccount.contacts.refreshed = Date.now(), a.afAccount.contacts.total = a.total, a.me.social.loaded.facebook = !0;
          });
        },
        processFriend: function (e) {
          console.log('Facebook processFriend friend=', e), console.log('Facebook processFriend profile.key=', a.account.profile.key, 'afAccount=', a.afAccount);
          var t = a.afAccount.contacts.partners, o = a.me.social.contacts.facebook[e.id] = {
              profileKey: a.account.profile.key,
              provider: 'facebook',
              service: 'facebook',
              id: e.id,
              serviceId: e.id,
              name: e.name,
              username: e.username,
              image: e.picture.data.url || null
            };
          t && t[e.id] && (o.partner = t[e.id]), console.log('Facebook processFriend c=', o), a.total += 1;
        },
        queryError: function (e) {
          console.log('Facebook queryError error=', e);
        }
      };
    return a;
  }
]), FirstRevenueApp.factory('GContacts', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = 'https://api.singly.com/proxy/gcontacts/contacts/default/full?access_token=:token&max-results=1000&alt=json', n = 'https://api.singly.com/proxy/gcontacts/groups/default/base?access_token=:token&max-results=1000&alt=json', i = 'http://schemas.google.com/contacts/2008/rel#edit-photo', r = {
        user: null,
        account: null,
        contacts: null,
        groups: null,
        token: null,
        getContacts: function (t, i, s, l) {
          r.user = t, r.account = i, r.token = s, console.log('GContacts getContacts token=', s);
          var a = e(o, { token: s }), c = l || r.processContacts;
          r.contacts = a.get(c, r.requestError);
          var u = e(n, { token: s });
          r.groups = u.get(r.processGroups, r.requestError);
        },
        processContacts: function (e) {
          console.log('GContacts processContacts contacts=', e), r.account.friends = e, t(function () {
            r.account.contacts.total = 0, _.each(e.feed.entry, r.processContact), r.account.contacts.refreshed = Date.now();
          });
        },
        processContact: function (e) {
          console.log('GContacts processContact contact=', e);
          var t = e.gd$email, o = e.id.$t.split('/')[8];
          if (o) {
            var n = {
                profileKey: r.account.profile.key,
                service: 'gcontacts',
                id: o,
                serviceId: o,
                name: e.title.$t,
                email: '',
                org: '',
                image: '',
                phone: ''
              };
            r.user.gridContacts.push(n), r.account.contacts.total += 1, t && (n.email = t[0].address, _.each(t, function (e) {
              'true' === e.primary && (n.email = e.address);
            })), e.gd$organization && (n.org = e.gd$organization[0].gd$orgName.$t), e.link[0].gd$etag && _.each(e.link, function (e) {
              e.gd$etag && 'image/*' === e.type && e.rel === i && (n.image = e.href);
            }), e.gd$phoneNumber && _.each(e.gd$phoneNumber, function (e) {
              'true' === e.primary && (n.phone = e.$t);
            }), console.log('GContacts processContact c=', n);
          }
        },
        processGroups: function (e) {
          console.log('GContacts processGroups groups=', e);
        },
        requestError: function (e) {
          console.log('GContacts requestError error=', e);
        }
      };
    return r;
  }
]), FirstRevenueApp.factory('GPlus', [
  '$resource',
  '$http',
  '$timeout',
  function (e, t, o) {
    var n = 'https://api.singly.com/profiles/gplus?auth=true&access_token=:token', i = 'https://www.googleapis.com/plus/v1/people/me', r = 'https://www.googleapis.com/plus/v1/people/me/people/visible', s = 'AIzaSyCK1R0dAHePEk8BPn932dDAE6COB_oNBPc', l = {
        user: null,
        account: null,
        people: null,
        token: null,
        getPeople: function (t, o, i) {
          l.user = t, l.account = o, l.token = i;
          var r = e(n, { token: i });
          l.profile = r.get(l.processProfile, l.requestError);
        },
        processProfile: function (e) {
          console.log('GPlus processProfile profile=', e), t({
            method: 'GET',
            url: i,
            params: { key: s },
            headers: { Authorization: 'Bearer ' + e.auth.accessToken }
          }).success(l.processGPlusProfile).error(l.requestError), l.bearerToken = e.auth.accessToken, l.sendPeopleRequest();
        },
        sendPeopleRequest: function (e) {
          t({
            method: 'GET',
            url: r,
            params: {
              key: s,
              pageToken: e || null
            },
            headers: { Authorization: 'Bearer ' + l.bearerToken }
          }).success(l.processGPlusPeople).error(l.requestError);
        },
        processGPlusProfile: function (e) {
          console.log('GPlus processGPlusProfile gprofile=', e);
        },
        processGPlusPeople: function (e) {
          console.log('GPlus processGPlusPeople people=', e), o(function () {
            l.account.contacts.total = 0, _.each(e.items, l.processPerson), e.nextPageToken && l.sendPeopleRequest(e.nextPageToken), l.account.contacts.refreshed = Date.now();
          });
        },
        processPerson: function (e) {
          console.log('GPlus processPerson person=', e);
          var t = {
              profileKey: l.account.profile.key,
              service: 'gplus',
              type: e.objectType,
              name: e.displayName,
              image: e.image.url,
              id: e.id,
              serviceId: e.id
            };
          l.user.gridContacts.push(t), l.account.contacts.total += 1, console.log('GPlus processPerson c=', t);
        },
        requestError: function (e) {
          console.log('GPlus requestError error=', e);
        }
      };
    return l;
  }
]), FirstRevenueApp.factory('LinkedIn', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = {
        qptylQNe7G: 'Edmundas',
        Q6nBa_Bne3: 'Terje',
        '8iFZEGMoTs': 'Vaidotas',
        vucFlC0LUt: 'API Tester',
        TjG_va1VAw: 'Revenue Maestro'
      }, n = 'qptylQNe7G', i = 'https://api.singly.com/proxy/linkedin/people/~/connections?format=json&access_token=:token&scope=r_network', r = 'https://api.singly.com/proxy/linkedin/people/~/mailbox?format=json&access_token=:token&scope=w_messages', s = {
        me: null,
        account: null,
        afAccount: null,
        total: 0,
        friends: null,
        token: null,
        msg: null,
        sendMessage: function (t, i, l) {
          s.token = i, console.log('LinkedIn sendMessage token=', i);
          var a = window.location.origin || window.location.protocol + '//' + window.location.host, c = a + window.location.pathname + '#invite/', u = e(r, { token: i }), d = !!o[t.serviceId], f = d ? t.serviceId : n, p = new u({
              recipients: { values: [{ person: { _path: '/people/' + f } }] },
              subject: 'Join 1stRevenue.com',
              body: 'Join 1stRevenue.com and collaborate with us on business modeling. Use your LinkedIn account to sign to the application. The original sender of the invitation will be notified when you log on to the 1st Revenue. Create your account at ' + c + t.invite
            }), h = l || s.processMessage;
          p.$save(h, s.requestError);
        },
        processMessage: function (e) {
          console.log('LinkedIn processMessage msgResponse=', e);
        },
        getFriends: function (t, o, n, r) {
          s.me = t, s.account = o, s.afAccount = t.af.user.accounts[o.profile.key], s.token = n, console.log('LinkedIn getFriends token=', n);
          var l = e(i, { token: n }), a = r || s.processFriends;
          s.friends = l.get(a, s.requestError);
        },
        processFriends: function (e) {
          console.log('LinkedIn processFriends friends=', e), s.me.social.contacts.linkedin = s.me.social.contacts.linkedin || {}, t(function () {
            s.total = 0, s.afAccount.contacts = s.afAccount.contacts || { refreshed: Date.now() }, _.each(e.values, s.processFriend), s.afAccount.contacts.refreshed = Date.now(), s.afAccount.contacts.total = s.total, s.me.social.loaded.linkedin = !0;
          });
        },
        processFriend: function (e) {
          if (console.log('LinkedIn processFriend friend=', e), 'private' !== e.id) {
            var t = s.afAccount.contacts.partners, o = s.me.social.contacts.linkedin[e.id] = {
                profileKey: s.account.profile.key,
                provider: 'singly',
                service: 'linkedin',
                id: s.account.profile.id,
                serviceId: e.id,
                name: e.firstName + ' ' + e.lastName,
                username: null,
                image: e.pictureUrl || null
              };
            t && t[e.id] && (o.partner = t[e.id]), console.log('LinkedIn processFriend c=', o), s.total += 1;
          }
        },
        processProfile: function (e) {
          console.log('LinkedIn processProfile profile=', e);
        },
        requestError: function (e) {
          console.log('LinkedIn requestError error=', e);
        }
      };
    return s;
  }
]), FirstRevenueApp.factory('Twitter', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = 'https://api.twitter.com/1.1/friends/list.json', n = {
        friends: null,
        getFriends: function (t) {
          console.log('Twitter getFriends token=', t);
          var i = e(o, { token: t });
          n.friends = i.get(n.processFriends, n.queryError);
        },
        processFriends: function (e) {
          console.log('Twitter processFriends friends=', e), t(function () {
            _.each(n.friends.data, n.processFriend);
          });
        },
        processFriend: function (e) {
          console.log('Twitter processFriend friend=', e);
        },
        queryError: function (e) {
          console.log('Twitter queryError error=', e);
        }
      };
    return n;
  }
]);