'use strict';
function round(a, b) {
  if (a = parseFloat(a), isNaN(a))
    return a;
  b || (b = 0);
  var c = Math.pow(10, b);
  return Math.floor(a * c + (10 * a * c % 10 >= 5 ? 1 : 0)) / c;
}
var resizeCanvasFont = function () {
  var a = $(window).height() - 40, b = $(window).width() - 80, c = a / 3, d = b / 5, e = Math.min(Math.max(5, Math.min(c, d) / 20), 15);
  $('html').css('font-size', e + 'px'), console.log('resizeCanvasFont size=', e);
};
$(document).ready(function () {
  $(window).resize(resizeCanvasFont), resizeCanvasFont(), window.navigator.standalone;
});
var FirstRevenueApp = angular.module('FirstRevenueApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'bootstrap',
    '$strap.directives',
    'firebase'
  ]).config([
    '$httpProvider',
    '$routeProvider',
    '$rootScopeProvider',
    function (a, b) {
      delete a.defaults.headers.common['X-Requested-With'], b.when('/', {
        templateUrl: 'views/routes/Home.html',
        controller: 'HomeController'
      }).when('/entry', {
        templateUrl: 'views/routes/Entry.html',
        controller: 'EntryController'
      }).when('/home', {
        templateUrl: 'views/routes/Home.html',
        controller: 'HomeController'
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
      }).when('/admin', {
        templateUrl: 'views/routes/Admin.html',
        controller: 'AdminController'
      }).otherwise({ redirectTo: '/' });
    }
  ]).run([
    '$rootScope',
    '$location',
    '$q',
    'Myself',
    'RrrrRrrr',
    function (a, b, c, d, e) {
      console.log('app.run set up $routeChangeStart $on event watcher'), a.deferredLaunch = c.defer(), a.$on('$routeChangeStart', function (b, c, f) {
        e.launching = !1, console.log('app.run $routeChangeStart current=', f, 'next=', c, 'Myself=', d), !d.authenticated && c.$$route.controller && 'InviteController' !== c.$$route.controller && 'EntryController' !== c.$$route.controller && (c.$$route.resolve = c.$$route.resolve || {}, c.$$route.resolve.Launch = function () {
          return a.deferredLaunch.promise;
        });
      });
    }
  ]);
FirstRevenueApp.controller('AdminController', [
  '$scope',
  function (a) {
    var b = 'AdminController';
    console.log(b, 'launched'), _.extend(a, {
      admin: a.me.sync.admin,
      getOnlineUsers: function () {
      },
      getAdminUserIds: function () {
        return [];
      },
      getISODate: function (a) {
        return new Date(Math.abs(a)).toISOString();
      }
    }), a.layout.guide.wide = !0, a.admin.enabled = !0, a.$on('$destroy', function () {
      a.admin.enabled = !1;
    }), a.layout.setView('summary'), a.menu.setTitle('Administer ' + a.appName);
  }
]), FirstRevenueApp.controller('AdminRepoController', [
  '$scope',
  function (a) {
    a.orgRepo = a.repo.repo;
  }
]), FirstRevenueApp.controller('AngularController', [
  '$scope',
  function (a) {
    angular.extend(a, {
      q: FirstRevenueApp._invokeQueue,
      objType: function (a) {
        return typeof a;
      },
      testValue: function (a) {
        return 'value' === a;
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
  function (a, b, c, d, e, f) {
    var g = 'CanvasController';
    console.log(g, 'route invoked $route=', b);
    var h = b.current.params.modelId, i = {
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
      }, j = [
        !0,
        'edit',
        'full'
      ], k = ['full'];
    angular.extend(a, {
      modal: d,
      zoom: e,
      rainbow: f,
      blocks: null,
      stickers: null,
      getBlocks: function () {
        return i;
      },
      getStickers: function (b) {
        var c = {}, d = a.canvas.modelId, e = a.me.sync.models[d];
        return e && e.stickers && _.each(a.me.sync.models[d].stickers, function (a, d) {
          a.block === b && (c[d] = a);
        }), c;
      },
      getSticker: function (b) {
        return a.me.sync.models[h].stickers[b];
      },
      isPublicModel: function () {
        return a.sync.public.models && !!a.sync.public.models[h];
      },
      getModelPermission: function () {
        return a.sync.user.models ? a.sync.user.models[h] : null;
      },
      isMyModel: function () {
        return !!a.getModelPermission();
      },
      isModelEditable: function () {
        return _.contains(j, a.getModelPermission());
      },
      isModelFullAccess: function () {
        return _.contains(k, a.getModelPermission());
      }
    }), a.layout.tooltips = !0, a.layout.setView('canvas'), a.layout.guide.wide = !1, a.layout.qrCode = !1, a.canvas.setModel(h, a.me.sync.models[h]);
  }
]), FirstRevenueApp.controller('CommentController', [
  '$scope',
  function (a) {
    var b = 'CommentController';
    console.log(b, 'started'), angular.extend(a, {
      comment: {
        id: null,
        sort: '-updated'
      },
      getComments: function () {
        return _.sortBy(a.canvas.model.comments, function (a) {
          return -a.updated;
        });
      },
      openComment: function () {
        a.comment.id = a.me.userRef.push().name(), a.canvas.model.comments = a.canvas.model.comments || {}, a.canvas.model.comments[a.comment.id] = {
          id: a.comment.id,
          author: a.me.userId,
          updated: Date.now(),
          text: ''
        };
      },
      closeComment: function () {
        var b = a.canvas.model.comments[a.comment.id];
        b.updated = Date.now(), b.created || (b.created = b.updated), a.comment.id = null;
      },
      modifyComment: function (b) {
        a.comment.id = b.id;
      },
      getDateUpdated: function (b) {
        return b.updated ? a.getLatency(new Date(b.updated), Date.now()) : null;
      },
      getDateCreated: function (b) {
        return b.created ? a.getLatency(new Date(b.created), Date.now()) : null;
      },
      getCommentLatency: function (b) {
        return b ? a.getLatency(new Date(b), Date.now()) : null;
      },
      getRefreshLatency: function (b) {
        return a.timeStamp = Date.now(), b ? a.getLatency(b, a.timeStamp) : '';
      }
    });
  }
]), FirstRevenueApp.controller('ContactController', [
  '$scope',
  '$timeout',
  'Social',
  'Myself',
  function (a, b, c, d) {
    var e = 'ContactController';
    console.log(e, 'Entered');
    var f = d;
    angular.extend(a, {
      service: null,
      account: null,
      contactProvider: null,
      accountId: null,
      timeStamp: null,
      social: c,
      init: function (b) {
        a.service = b, a.account = _.find(f.sync.user.accounts, function (a) {
          return a.profile.service === b;
        });
      },
      saveContacts: function () {
      },
      setAccount: function (b) {
        a.accountId = b;
      },
      getAccounts: function () {
        return f.getAccounts();
      },
      getPartners: function () {
        var a = {};
        return _.each(f.sync.user.accounts, function (b) {
          b.contacts && _.each(b.contacts.partners, function (c, d) {
            c.service = b.profile.service, a[d] = c;
          });
        }), a;
      },
      getPartnerCount: function () {
        return _.size(a.getPartners());
      },
      getFavoriteCount: function () {
        return _.size(_.where(a.getPartners(), { favorite: !0 }));
      },
      isPartner: function (a) {
        return !!a.partner;
      },
      isFavorite: function (a) {
        return a.partner && a.partner.favorite;
      },
      toggleFavorite: function (b) {
        if (console.log(e, 'toggleFavorite contact=', b), !b.partner) {
          var c = a.me.sync.user.accounts[b.profileKey].contacts;
          c.partners || (c.partners = {}), c.partners[b.serviceId] || (c.partners[b.serviceId] = {
            name: b.name,
            image: b.image
          }), b.partner = c.partners[b.serviceId];
        }
        b.partner.favorite = !b.partner.favorite, console.log(e, 'toggleFavorite contact.partner=', b.partner);
      },
      getSocialPartners: function (b) {
        console.log(e, 'getSocialPartners service=', b);
        var c = {}, d = a.account;
        return console.log(e, 'getSocialPartners account=', d), a.account && a.account.contacts && _.each(a.account.contacts.partners, function (a, b) {
          c[b] = {
            provider: d.profile.provider,
            service: d.profile.service,
            name: a.name,
            image: a.image,
            id: b,
            partner: a
          };
        }), console.log(e, 'getSocialPartners contacts=', c), c;
      },
      getContacts: function (b) {
        return console.log(e, 'getContacts service=', b), c.loaded[b] ? c.contacts[b] : a.getSocialPartners(b);
      },
      getSocialPartnerIds: function (b) {
        return console.log(e, 'getSocialPartnerIds service=', b), a.account.contacts ? _.keys(a.account.contacts.partners) : [];
      },
      getContactIds: function (b) {
        return console.log(e, 'getContactIds service=', b), c.loaded[b] ? c.contacts[b] : a.getSocialPartnerIds(b);
      },
      getSocialContacts: function (a) {
        console.log(e, 'getSocialContacts service=', a);
        var b = _.find(f.user.accounts, function (b) {
            return console.log(e, 'getSocialContacts account=', b), b.profile.service === a;
          });
        return console.log(e, 'getSocialContacts found account=', b), b.allContacts;
      },
      getContactCount: function (a) {
        var b = f.findAccount(a).contacts;
        return b && b.total || 0;
      },
      getRefreshTime: function (a) {
        var b = f.findAccount(a).contacts, c = b && b.refreshed;
        return c ? new Date(c).toString() : null;
      },
      getRefreshLatency: function (c) {
        var d = f.findAccount(c).contacts, e = d && d.refreshed || 0, g = '';
        if (e) {
          b(function () {
            a.timeStamp = Date.now();
          }, 1000);
          var h = Math.round((Date.now() - e) / 1000);
          1 > h ? g = 'just now' : 60 > h ? g = h + ' second' + a.numberEnding(h) + ' ago' : 3600 > h ? (h = Math.round(h / 60), g = h + ' minute' + a.numberEnding(h) + ' ago') : 86400 > h ? (h = Math.round(h / 60 / 60), g = h + ' hour' + a.numberEnding(h) + ' ago') : (h = Math.round(h / 60 / 60 / 24), g = h + ' day' + a.numberEnding(h) + ' ago');
        } else
          g = 'never';
        return g;
      },
      numberEnding: function (a) {
        return 1 === a ? '' : 's';
      },
      hasBeenInvited: function (a) {
        return !!a.inviteSent;
      },
      hasNoInvitation: function (a) {
        return !a.inviteSent && !a.account;
      },
      invite: function (a, b) {
        c.createInvite(a, b);
      },
      isUser: function (a) {
        return !!a.account;
      }
    }), a.layout.guide.wide = !0, a.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('EntryController', [
  '$scope',
  '$location',
  '$timeout',
  'Auth',
  'Modal',
  'Register',
  function (a, b, c, d, e, f) {
    var g = 'EntryController';
    console.log(g, 'Entry route invoked Modal=', e, 'Auth=', d), angular.extend(a, {
      modal: e,
      auth: d,
      logonTabName: 'persona',
      register: f,
      personaFound: null !== navigator.id,
      logon: function () {
        console.log(g, 'logon'), a.modal.logon = !0;
      },
      providerList: function () {
        var a = [];
        return angular.forEach(f.providers, function (b, c) {
          a.push(angular.extend(b, { provider: c }));
        }), a;
      }
    }), a.auth.accepted = !1, a.layout.setView('welcome'), a.layout.guide.wide = !0, a.menu.setTitle('Welcome to the ' + a.appName), a.menu.selected = 'logon', a.menu.visible = [
      'home',
      'logon'
    ];
  }
]), FirstRevenueApp.controller('HeaderController', [
  '$scope',
  '$location',
  'Modal',
  'Zoom',
  'Model',
  'Info',
  function (a, b, c, d, e, f) {
    _.extend(a, {
      modal: c,
      zoom: d,
      model: e,
      info: f,
      admin: function () {
        a.me.sync.admin.status && (a.me.sync.collectAdminData(a.me.rootRef), b.path('/admin'));
      },
      modifyAccount: function () {
        a.modal.logoff = !0;
      },
      preferences: function () {
        a.modal.logoff = !0;
      },
      logoff: function () {
        a.modal.logoff = !0;
      }
    });
  }
]), FirstRevenueApp.controller('HomeController', [
  '$scope',
  'ModelCatalog',
  function (a, b) {
    var c = 'HomeController';
    console.log(c, 'route invoked'), _.extend(a, {
      catalog: b,
      getActiveAccounts: function () {
        var b = [];
        return _.each(a.firebase.providers, function (c, d) {
          var e = _.find(a.sync.user.accounts, function (a) {
              return a.profile.service === d;
            });
          e && b.push(e);
        }), b;
      },
      getUnusedProviders: function () {
        var b = [];
        return _.each(a.firebase.providers, function (c, d) {
          var e = _.find(a.sync.user.accounts, function (a) {
              return a.profile.service === d;
            });
          e || b.push(c);
        }), b;
      }
    }), a.layout.guide.wide = !0, a.layout.peer.wide = !1, a.menu.setTitle(a.appName + ' Dashboard'), a.menu.selected = 'home', a.menu.visible = [
      'home',
      'repo'
    ];
  }
]), FirstRevenueApp.controller('HomeTabsController', [
  '$scope',
  function (a) {
    console.log('---- HomeTabsController'), a.menu.selected = 'home', a.menu.visible = [
      'home',
      'repo'
    ], a.canvas.model && a.menu.visible.push('canvas'), angular.extend(a, {
      homeTabName: 'welcome',
      adminTitle: function () {
        return a.user.adminRole ? 'Administration' : '';
      },
      monitoringTitle: function () {
        return a.user.adminRole ? 'Monitoring' : '';
      },
      webFormsTitle: function () {
        return a.user.adminRole ? 'Podio Web Forms' : '';
      }
    });
  }
]), FirstRevenueApp.controller('ImpressController', [
  '$scope',
  '$route',
  function (a, b) {
    var c = 'ImpressController';
    console.log(c, 'invoked');
    var d = {
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
    angular.extend(a, {
      modelId: null,
      getBlocks: function () {
        return d;
      },
      getStickers: function (b) {
        var c = {}, d = a.im.model;
        return d && d.stickers && _.each(a.im.model.stickers, function (a, d) {
          a.block === b && (c[d] = a);
        }), c;
      }
    }), a.modelId = b.current.params.modelId, console.log(c, '$route=', b, 'modelId=', a.modelId), a.modelId && a.im.loadModel(a.modelId);
  }
]), FirstRevenueApp.controller('InviteController', [
  '$scope',
  '$location',
  '$timeout',
  '$route',
  '$q',
  'Firebase',
  'Invite',
  function (a, b, c, d, e, f, g) {
    var h = 'InviteController', i = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    angular.extend(a, {
      invite: g,
      inviteId: null,
      service: null,
      loaded: !1,
      creator: null,
      openAuth: function () {
        var b = a.inviteId = d.current.params.inviteId, i = e.defer();
        console.log(h, 'openAuth $scope=', a, 'inviteId=', b), g.inviteRef = f.rootRef.child('invites').child(b), g.inviteRef.once('value', function (b) {
          var d = b.val();
          console.log(h, 'openAuth inviteValue=', d), c(function () {
            a.invite.loaded = !0, a.me.sessionFound && (a.me.mp.wasCurrentUserInvited(d) ? (d.current = !0, i.resolve(d)) : i.resolve(d)), i.resolve(d), a.service = d ? d.service : null, a.me.sessionFound && a.loadCreator(d), console.log(h, 'invite value=', d);
          });
        }, function (a) {
          console.log('Invite error=', a), i.reject(a);
        }), g.setInvite(b, i.promise);
      },
      loadCreator: function (a) {
        g.creatorRef = f.rootRef.child('users').child(a.creator).child('profile'), g.creatorRef.once('value', function (a) {
          c(function () {
            g.creator = a.val();
          });
        });
      },
      extractTimeStamp: function (a) {
        for (var b = a.substr(0, 8), c = 0, d = 0; 8 > d; d++)
          c = 64 * c + i.indexOf(b.charAt(d));
        return c;
      },
      getInviteDate: function (b) {
        return new Date(a.extractTimeStamp(b)).toLocaleString();
      },
      signIn: function () {
        b.path('/entry');
      }
    }), a.invite.loaded = !1, a.invite.creator = null, a.openAuth();
  }
]), FirstRevenueApp.controller('MasterController', [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
  'AppName',
  'Sync',
  'Layout',
  'Popup',
  'Menu',
  'Notif',
  'Firebase',
  'Canvas',
  'Myself',
  'Favicon',
  'RrrrRrrr',
  function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 'MasterController';
    console.log(p, 'launched'), a.$root._ = window._, angular.extend(a, {
      appName: e,
      layout: g,
      popup: h,
      menu: i,
      notif: j,
      firebase: k,
      canvas: l,
      me: m,
      sync: f,
      favicon: n,
      ribbon: {
        peerCount: function () {
          return 0;
        }
      },
      rrrr: o,
      rrrrImageLink: o.getImageLink(),
      logoff: function () {
        a.user.logoff(), a.me.logoff();
      },
      getLatency: function (a, b) {
        var c = Math.round((b - a) / 1000), d = '';
        return 1 > c ? d = 'just now' : 60 > c ? d = c + 's ago' : 3600 > c ? (c = Math.round(c / 60), d = c + ' min ago') : 86400 > c ? (c = Math.round(c / 60 / 60), d = c + 'h ago') : (c = Math.round(c / 60 / 60 / 24), d = new Date(+a).toISOString().substr(0, 10)), d;
      },
      numberEnding: function (a) {
        return 1 === a ? '' : 's';
      }
    }), a.layout.reset(), a.me.authenticated = !1, a.menu.setTitle(e), k.init(), f.init(a), m.init(b.path());
    var q = '/invite/';
    b.path().substring(0, q.length) === q ? (a.firebase.retrieveSession(), console.log(p, 'Firebase retrieveSession() done $location.path()=', b.path())) : (a.firebase.resumeSession(), console.log(p, 'Firebase resumeSession() done $location.path()=', b.path())), a.notif.add({ text: e + ' started' }), analytics.track('App launch');
  }
]), FirstRevenueApp.controller('MembersController', [
  '$scope',
  'MemberCatalog',
  function (a, b) {
    _.extend(a, { catalog: b }), a.catalog.sort = a.catalog.sort || 'name';
  }
]), FirstRevenueApp.controller('ModalController', [
  '$scope',
  '$location',
  'Modal',
  'StickerEditor',
  function (a, b, c, d) {
    var e = 'ModalController';
    console.log(e, 'Launched'), _.extend(a, {
      modal: c,
      editor: d,
      modelName: null,
      logoff: function () {
        this.modal.logoff = !1, a.me.authenticated = !1, a.me.authFailed = !0, a.firebase.rootRef.unauth(), FirebaseSimpleLogin.prototype.clearSession(), a.me.logoff(), b.url('/entry');
      },
      deleteCookie: function (a) {
        document.cookie = a + '="";-1; path=/';
      },
      discardStickerChanges: function () {
        this.modal.dis = !1, this.editor.discardChanges(), this.editor.sticker = null, a.layout.editor.sticker = !1, a.layout.tooltips = !0;
      },
      keepStickerChanges: function () {
        this.modal.dis = !1, a.layout.tooltips = !0;
      },
      deleteSticker: function () {
        console.log(e, 'deleteSticker'), delete a.me.sync.models[a.canvas.modelId].stickers[this.modal.stickerId], this.modal.stickerId = null, this.modal.sticker = null, a.layout.editor.sticker = !1, this.modal.del = !1, a.layout.tooltips = !0;
      },
      leaveSticker: function () {
        this.modal.del = !1, a.layout.tooltips = !0;
      }
    });
  }
]), FirstRevenueApp.controller('ModelController', [
  '$scope',
  '$location',
  '$timeout',
  'Social',
  'FilePicker',
  function (a, b, c, d, e) {
    var f = 'ModelController';
    console.log(f, 'started');
    var g = {
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        gplus: 'Google+',
        gmail: 'Gmail'
      }, h = window.location.origin || window.location.protocol + '//' + window.location.host, i = h + window.location.pathname + '#/invite/', j = h + window.location.pathname + 'views/GooglePlusInvitation.html';
    angular.extend(a, {
      social: d,
      fp: e,
      googleClientId: CONFIG_1ST_REVENUE.googleClientId,
      callToActionURL: i,
      contentURL: j,
      repoList: [],
      newModelName: '',
      model: {
        editorTab: 0,
        commentId: null,
        commentSort: '-updated'
      },
      tah: {
        empty: !0,
        userTypeAhead: '',
        selectedDatum: null,
        dataset: null,
        social: {},
        partners: {}
      },
      selectedUsers: {},
      nameError: !1,
      emptyDataset: {
        name: 'empty',
        count: 0,
        template: a.template,
        header: '<div class="tt-header">No users found</div>',
        local: []
      },
      picks: {
        invites: !0,
        users: !0,
        groups: !0,
        partners: !0,
        social: !0
      },
      businessCard: null,
      sectionHelp: {
        invites: !1,
        users: !1,
        groups: !1,
        partners: !1,
        social: !1
      },
      getComments: function () {
        return _.sortBy(a.canvas.model.comments, function (a) {
          return -a.updated;
        });
      },
      openComment: function () {
        a.model.commentId = a.me.userRef.push().name(), a.canvas.model.comments = a.canvas.model.comments || {}, a.canvas.model.comments[a.model.commentId] = {
          id: a.model.commentId,
          author: a.me.userId,
          updated: Date.now(),
          text: ''
        };
      },
      closeComment: function () {
        var b = a.canvas.model.comments[a.model.commentId];
        b.updated = Date.now(), b.created || (b.created = b.updated), a.model.commentId = null;
      },
      modifyComment: function (b) {
        a.model.commentId = b.id;
      },
      getDateUpdated: function (b) {
        return b.updated ? a.getLatency(new Date(b.updated), Date.now()) : null;
      },
      getDateCreated: function (b) {
        return b.created ? a.getLatency(new Date(b.created), Date.now()) : null;
      },
      getCommentLatency: function (b) {
        return b ? a.getLatency(new Date(b), Date.now()) : null;
      },
      resetSearch: function () {
        a.tah.userTypeAhead = '', a.tah.selectedDatum = null;
      },
      massInviteAllowed: function () {
        return !1;
      },
      tahSubmit: function () {
        console.log(f, 'tahSubmit tah.userTypeAhead=', a.tah.userTypeAhead), d.addModelInvite(a.canvas, a.tah.selectedDatum), a.resetSearch();
      },
      deletePeer: function (b) {
        console.log(f, 'deletePeer userId=', b);
        var c = a.canvas.modelId;
        delete a.sync.models[c].users[b], console.log(f, 'deletePeer deleted model user userId=', b), _.find(a.sync.models[c].invites, function (d, e) {
          return a.sync.invites[e].userId === b ? (delete a.sync.models[c].invites[e], console.log(f, 'deletePeer deleted model invite inviteId=', e), !0) : void 0;
        });
      },
      deleteInvite: function (b) {
        console.log(f, 'deleteInvite inviteId=', b);
        var c = a.canvas.modelId;
        delete a.sync.models[c].invites[b], delete a.sync.invites[b].models[c], delete a.sync.user.invites[b];
      },
      getRefreshLatency: function (b) {
        return a.timeStamp = Date.now(), b ? a.getLatency(b, a.timeStamp) : '';
      },
      getRepos: function () {
        var a = this.repoList = [];
        return a;
      },
      deleteModelRef: function () {
        console.log(f, 'model delete remove model ref from user modelId=', a.canvas.modelId), delete a.sync.user.models[a.canvas.modelId], console.log(f, 'model delete set model to null modelId=', a.canvas.modelId), a.sync.models[a.canvas.modelId] = null, console.log(f, 'model delete done models[id]=', a.sync.models[a.canvas.modelId]), a.modal.model = !1, b.path('/repo');
      },
      finish: function () {
        a.layout.setView('canvas');
      },
      manageUsers: function () {
        a.layout.setView('users');
      },
      showModels: function () {
        a.fpFile = null, b.path('/repo');
      },
      pitchWordCount: function () {
        var b = a.canvas.model.fields.pitch ? a.canvas.model.fields.pitch : '';
        return '' === b ? 0 : b.split(/\s+/).length;
      },
      pitchRed: function () {
        var a = this.pitchWordCount(), b = Math.min(100, a);
        return Math.round(255 * b / 100);
      },
      pitchGreen: function () {
        var a = this.pitchWordCount(), b = Math.min(100, a);
        return 160 - Math.round(160 * b / 100);
      },
      addUser: function () {
      },
      getUserTypeahead: function () {
        var b = [];
        return _.each(a.sync.user.accounts, function (a) {
          a.contacts && _.each(a.contacts.partners, function (c, d) {
            var e = {
                provider: a.profile.provider,
                service: a.profile.service,
                serviceId: d,
                name: c.name,
                value: c.name,
                tokens: c.name.split(' '),
                image: c.image
              };
            b.push(e);
          });
        }), b;
      },
      header: function (a) {
        return console.log(f, 'header data=', a), '<div class="tt-header">' + a.name + ' partners (' + a.count + ')</div';
      },
      template: function (a) {
        return '<img src="' + (a.image ? a.image : 'images/bbf82395.light_avatar_small.png') + '" />' + '<div class="tt-name">' + a.name + '</div>' + '<div class="tt-user-id">' + a.serviceId + '</div>';
      },
      preparePartnerMarks: function () {
        _.each(a.sync.user.accounts, function (b) {
          a.tah.partners[b.profile.service] = !0;
        });
      },
      createDataset: function (b, c, d) {
        var e = g[d.profile.service] || 'Unknown', h = {
            name: d.profile.service + '-' + b,
            count: d.contacts.total,
            service: d.profile.service,
            serviceTitle: e,
            template: a.template,
            header: '<div class="tt-header">' + e + ' ' + b + ' (' + _.size(c) + ')</div>',
            local: c
          };
        return console.log(f, 'createDataset ' + b + ' dataset=', h), h;
      },
      buildDatasetItem: function (a) {
        return function (b, c) {
          var d = b.name.split(' ');
          d.push('*');
          var e = {
              account: a,
              provider: a.profile.provider,
              service: a.profile.service,
              serviceId: c,
              name: b.name,
              value: b.name,
              tokens: d,
              image: b.image
            };
          return console.log(f, 'buildDatasets partners partnerData=', b, 'key=', c, 'partner=', e), e;
        };
      },
      buildDatasets: function () {
        console.log(f, 'buildDatasets');
        var b = [];
        _.each(a.sync.user.accounts, function (c) {
          if (console.log(f, 'buildDatasets account=', c), a.social.loaded[c.profile.service] && a.tah.social[c.profile.service]) {
            var d = _.map(a.social.contacts[c.profile.service], a.buildDatasetItem(c));
            b.push(a.createDataset('friends', d, c));
          }
        }), a.tah.empty = 0 === _.size(b), a.tah.empty && b.push(a.emptyDataset), c(function () {
          console.log(f, 'buildDatasets tah.dataset=', b), a.tah.dataset = b;
        });
      },
      loadAccount: function (b) {
        a.social.fetchAccount(a.me, b.profile.service), a.tah.social[b.profile.service] = !0, a.picks[b.profile.service] = !0;
      },
      refreshAccount: function (b) {
        a.social.fetchAccount(a.me, b.profile.service);
      },
      getPartners: function () {
        return _.toArray(a.sync.user.partners);
      },
      canManageModel: function () {
        var b = a.me.userId, c = a.canvas.modelId, d = a.sync.models[c], e = 'full' === d.users[b], f = d.owner === b;
        return f || e;
      },
      showUserRemoveButton: function (b) {
        var c = a.me.userId, d = b === c;
        return !d && a.canManageModel();
      },
      showInviteRemoveButton: function (b) {
        var c = a.me.userId, d = a.sync.invites[b], e = d.creator === c;
        return e || a.canManageModel();
      },
      prefixFilter: function (b) {
        for (var c = a.tah.userTypeAhead.toLowerCase(), d = c.length, e = b.name.toLowerCase().split(' '), f = 0; f < e.length; f++)
          if (e[f].slice(0, d) === c)
            return !0;
        return !1;
      },
      pickGroup: function (b) {
        a.picks[b] = !a.picks[b];
      },
      isPickVisible: function (b) {
        return !!a.picks[b];
      },
      partnersLoaded: function () {
        return !(_.isEmpty(a.sync.user.groups) && _.isEmpty(a.sync.user.partners) && a.tah.empty);
      },
      wasInvited: function (b) {
        var c, d;
        return d = _.find(a.sync.models[a.canvas.modelId].users, function (c, d) {
          var e = a.sync.peers[d];
          return b.service === e.service && b.serviceId === e.serviceId;
        }), _.isUndefined(d) && (c = _.find(a.sync.models[a.canvas.modelId].invites, function (c, d) {
          var e = a.sync.invites[d];
          return e && !e.userId && b.service === e.service && b.serviceId === e.serviceId;
        })), !(_.isUndefined(d) && _.isUndefined(c));
      },
      countInvites: function () {
        var b = a.sync.models[a.canvas.modelId];
        return b ? _.reduce(b.invites, a.injectInviteCount, 0) : 0;
      },
      injectInviteCount: function (b, c, d) {
        var e = a.sync.invites && a.sync.invites[d];
        return b + (e && 'accepted' !== e.status ? 1 : 0);
      },
      showSelectButton: function (b) {
        var c = a.sync.models[a.canvas.modelId], d = a.me.userId;
        return !a.wasInvited(b) && (c.owner === d || 'full' === c.users[d]);
      },
      showInviteCard: function (b) {
        var c = a.sync.invites && a.sync.invites[b];
        a.showBusinessCard('invite', c, b);
      },
      showUserCard: function (b) {
        var c = a.sync.peers[b];
        a.showBusinessCard('user', c, b);
      },
      showBusinessCard: function (b, c, d) {
        console.log(f, 'showBusinessCard type=', b, 'user=', c, 'id=', d);
        var e = c.image;
        switch ('facebook' === c.service ? e = 'https://graph.facebook.com/' + c.serviceId + '/picture?type=large' : 'gplus' === c.service && (e = e.slice(0, -2) + '200'), a.businessCard = {
            type: b,
            name: c.name,
            image: e,
            email: c.email,
            serviceTitle: g[c.service],
            serviceId: c.serviceId,
            description: c.description,
            work: c.work
          }, b) {
        case 'invite':
          a.businessCard.inviteId = d;
          break;
        case 'user':
          a.businessCard.userId = d;
        }
      },
      hideBusinessCard: function () {
        console.log(f, 'hideBusinessCard'), a.businessCard = null;
      },
      toggleHelp: function (b) {
        a.sectionHelp[b] = !a.sectionHelp[b];
      },
      showHelp: function (b) {
        return !!a.sectionHelp[b];
      },
      getDefaultPermission: function (a) {
        return console.log(f, 'getDefaultPermission', 'businessCard=', a), 'none';
      },
      getModelPermission: function (b) {
        console.log(f, 'getModelPermission', 'businessCard=', b);
        var c = a.sync.models[a.canvas.modelId];
        return b.userId ? c.users[b.userId] : b.inviteId ? c.invites[b.inviteId] : 'none';
      },
      getDefaultPopoverContent: function (a) {
        var b = '             <div class="btn-group" data-toggle="buttons">               <label class="btn btn-info">                 <input type="radio" name="options" id="default-none">None               </label>               <label class="btn btn-success">                 <input type="radio" name="options" id="default-view">View               </label>               <label class="btn btn-warning">                 <input type="radio" name="options" id="default-edit">Edit               </label>               <label class="btn btn-danger">                 <input type="radio" name="options" id="default-full">Full               </label>             </div>';
        return console.log(f, 'getDefaultPopoverContent', 'businessCard=', a), b;
      }
    }), a.menu.selected = 'canvas', a.social.me = a.me, a.preparePartnerMarks(), a.buildDatasets(), a.$watch('sync.user.accounts', a.buildDatasets, !0), a.$watch('social.contacts', a.buildDatasets, !0);
  }
]), FirstRevenueApp.controller('ModelsController', [
  '$scope',
  'ModelCatalog',
  'Zoom',
  function (a, b, c) {
    var d = 'ModelsController';
    console.log(d, 'invoked'), angular.extend(a, {
      catalog: b,
      zoom: c
    }), a.menu.setTitle(a.appName + ' Repository'), a.menu.selected = 'repo', a.menu.visible = [
      'home',
      'repo'
    ], a.canvas.model && a.menu.visible.push('canvas'), a.catalog.sort = a.catalog.sort || 'time', a.catalog.tag = a.catalog.tag || '*';
  }
]), FirstRevenueApp.controller('MonitorController', [
  '$scope',
  'Monitor',
  function (a, b) {
    angular.extend(a, {
      monitor: b,
      getRateStats: function () {
        b.getRateStats(function () {
          a.$root.$apply();
        });
      },
      timeStamp: function (a) {
        var b = '';
        return isNaN(parseInt(a, 10)) || (b = new Date(60000 * a).toISOString()), b;
      }
    });
  }
]), FirstRevenueApp.controller('NewModelController', [
  '$scope',
  '$location',
  function (a, b) {
    var c = 'NewModelController';
    a.layout.peer.wide = !1, a.menu.setTitle('Create Model'), a.menu.selected = 'create', console.log(c, 'launched'), angular.extend(a, {
      newModel: {},
      nameError: !1,
      createModel: function (d) {
        console.log(c, 'createModel name=', d), '' === d ? a.nameError = !0 : (a.nameError = !1, a.menu.setTitle(d), console.log(c, 'calling Firebase.createModel newModelName=', d), a.newModel.id = a.firebase.createModel(d, function () {
          console.log(c, 'model create callback newModelId=', a.newModel.id), a.canvas.modelId = a.newModel.id, a.canvas.model = a.sync.models[a.newModel.id], b.path('/canvas/' + a.newModel.id);
        }));
      },
      cancel: function () {
        a.layout.setView(a.layout.lastRepoView);
      }
    });
  }
]), FirstRevenueApp.controller('NotifController', [
  '$scope',
  function (a) {
    console.log('--- NotifController $scope=', a);
  }
]), FirstRevenueApp.controller('PeopleController', [
  '$scope',
  'Social',
  'Myself',
  function (a, b, c) {
    console.log('---- PeopleController');
    var d = c;
    angular.extend(a, {
      contactProvider: null,
      accountId: null,
      saveContacts: function () {
      },
      setAccount: function (b) {
        a.accountId = b;
      },
      getAccounts: function () {
        return d.getAccounts();
      },
      getContacts: function () {
        return d.getContacts(a.accountId);
      }
    }), a.layout.setView('partners'), a.layout.guide.wide = !0, a.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('PrefController', [
  '$scope',
  'Rainbow',
  function (a, b) {
    a.menu.setTitle(a.appName + ' Preferences'), console.log('Preferences route invoked'), a.brighten = b.brightenFull;
  }
]), FirstRevenueApp.controller('ProjectListController', [
  '$scope',
  'Renderer',
  'Rainbow',
  function (a, b, c) {
    var d = 'ProjectListController', e = {
        branch: '#b2b19d',
        code: 'orange',
        doc: '#922E00',
        demo: '#a7af00'
      };
    console.log(d, 'invoked'), angular.extend(a, {
      getProjectDemoData: function () {
        return a.demoData;
      },
      getProjectData: function () {
        var b = {
            nodes: {},
            edges: {}
          }, d = a.sync.user.profile.name;
        return b.nodes[d] = {
          color: 'blue',
          shape: 'dot',
          alpha: 1
        }, b.edges[d] = {}, _.each(a.sync.user.models, function (e, f) {
          var g = a.sync.models[f];
          b.nodes[g.fields.name] = {
            color: 'red',
            alpha: 1
          }, b.edges[d][g.fields.name] = { length: 1 }, b.edges[g.fields.name] = {}, _.each(g.stickers, function (a) {
            b.nodes[a.title] = {
              color: '#' + c.brighten(a.color),
              shape: 'square',
              alpha: 1
            }, b.edges[g.fields.name][a.title] = {};
          });
        }), b;
      },
      demoData: {
        nodes: {
          '1R Model': {
            color: 'red',
            shape: 'dot',
            alpha: 1
          },
          MetaData: {
            color: e.branch,
            shape: 'dot',
            alpha: 1
          },
          Pitch: {
            color: e.demo,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12589021'
          },
          Web: {
            color: e.demo,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12589147'
          },
          Description: {
            color: e.demo,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12589125'
          },
          Team: {
            color: e.branch,
            shape: 'dot',
            alpha: 1
          },
          Terje: {
            color: e.doc,
            alpha: 1,
            link: 'https://podio.com/users/573093'
          },
          Edmundas: {
            color: e.doc,
            alpha: 1,
            link: 'https://podio.com/users/639605'
          },
          MarketTrends: {
            color: e.branch,
            shape: 'dot',
            alpha: 1
          },
          'Focus on Business Model Generation': {
            color: e.doc,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12827502'
          },
          Article2: {
            color: e.doc,
            alpha: 1,
            link: 'https://podio.com/users/639605'
          },
          Competitors: {
            color: e.branch,
            shape: 'dot',
            alpha: 1
          },
          LeanLaunchLab: {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11364419'
          },
          'Business Model Toolbox (iPad app)': {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11364415'
          },
          Strategyzr: {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11364417'
          },
          CustSegm: {
            color: e.branch,
            shape: 'dot',
            alpha: 1
          },
          Users: {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          Mentors: {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          Incubators: {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          Forskningsparken: {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11365132'
          },
          'Kjeller Innovasjon': {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11365125'
          },
          'BTO (Bergen Technology Transfer Office)': {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11365051'
          },
          SegmChan: {
            color: e.branch,
            shape: 'dot',
            alpha: 1
          },
          'Social media': {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          'Traditional sales': {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          Twitter: {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          Facebook: {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          'Sales meetings': {
            color: e.code,
            shape: 'dot',
            alpha: 1
          },
          'Educational institutions': {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/6163425'
          },
          'BMG Consulting companies': {
            color: e.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/6163083'
          }
        },
        edges: {
          '1R Model': {
            MetaData: { length: 0.8 },
            Team: { length: 0.8 },
            MarketTrends: { length: 0.8 },
            Competitors: { length: 0.8 },
            SegmChan: { length: 0.8 },
            CustSegm: { length: 0.8 }
          },
          MetaData: {
            Pitch: {},
            Web: {},
            Description: {}
          },
          Team: {
            Terje: {},
            Edmundas: {}
          },
          MarketTrends: {
            'Focus on Business Model Generation': {},
            Article2: {}
          },
          Competitors: {
            'Business Model Toolbox (iPad app)': {},
            Strategyzr: {},
            LeanLaunchLab: {}
          },
          CustSegm: {
            Users: {},
            Mentors: {},
            Incubators: {}
          },
          SegmChan: {
            'Social media': {},
            'Traditional sales': {}
          },
          'Social media': {
            Twitter: {},
            Facebook: {}
          },
          'Traditional sales': { 'Sales meetings': {} },
          'Sales meetings': {
            'Educational institutions': {},
            'BMG Consulting companies': {}
          },
          Incubators: {
            Forskningsparken: {},
            'Kjeller Innovasjon': {},
            'BTO (Bergen Technology Transfer Office)': {}
          }
        }
      }
    }), a.menu.setTitle('Projects'), b.render('#project-map', a.getProjectData());
  }
]), FirstRevenueApp.controller('RegisterController', [
  '$scope',
  'Register',
  'Credentials',
  function (a, b, c) {
    var d = 'RegisterController';
    console.log(d, 'launched'), angular.extend(a, {
      register: b,
      cr: c
    });
    var e = b.init();
    c.init(e), a.menu.setTitle('Register to the ' + a.appName);
  }
]), FirstRevenueApp.controller('RepoController', [
  '$scope',
  'ModelCatalog',
  'Modal',
  'RrrrRrrr',
  function (a, b, c, d) {
    var e = 'RepoController';
    console.log(e, 'launched'), angular.extend(a, {
      catalog: b,
      modal: c,
      modelTabName: 'models',
      rrrrImageLink: d.getImageLink()
    });
    var f = _.size(a.catalog.getModelIdList('my')), g = _.size(a.catalog.getModelIdList('shared'));
    a.layout.setView(g && !f ? 'shared' : 'my'), a.layout.guide.wide = !0, a.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('RibbonController', [
  '$scope',
  '$location',
  '$window',
  function (a, b, c) {
    var d = 'RibbonController';
    console.log(d, 'loaded');
    var e = {
        gplus: {
          icon: 'google-plus',
          label: 'Google+'
        },
        gmail: {
          icon: 'envelope',
          label: 'Gmail'
        },
        facebook: { label: 'Facebook' },
        linkedin: { label: 'LinkedIn' }
      };
    angular.extend(a, {
      ribbon: a.layout.guide,
      routeTo: function (a) {
        b.path('/' + a);
      },
      getSocialIconName: function (a) {
        var b = a.profile.service, c = e[b];
        return 'icon-' + (c && c.icon || b);
      },
      getSocialLabel: function (a) {
        var b = a.profile.service, c = e[b];
        return c && c.label || b;
      },
      getModelUserIds: function () {
        return _.keys(a.canvas.model && a.canvas.model.users || {});
      },
      toggleShare: function () {
        a.layout.share = !a.layout.share, a.layout.share;
      },
      toggleQRCode: function () {
        if (a.layout.qrCode = !a.layout.qrCode, a.layout.qrCode) {
          var b = c.location.origin || c.location.protocol + '//' + c.location.host, d = b + c.location.pathname, e = d + '#/canvas' + a.canvas.modelId, f = new JSQR(), g = new f.Code();
          g.encodeMode = g.ENCODE_MODE.UTF8_SIGNATURE, g.version = 7, g.errorCorrection = g.ERROR_CORRECTION.Q;
          var h = new f.Input();
          h.dataType = h.DATA_TYPE.URL, h.data = { url: e };
          var i = new f.Matrix(h, g);
          i.scale = 7;
          var j = document.createElement('canvas');
          j.setAttribute('width', i.pixelWidth), j.setAttribute('height', i.pixelWidth), j.getContext('2d').fillStyle = 'rgb(0,0,0)', i.draw(j, 0, 0), $('#qrcode').empty(), $('#qrcode').append(j);
        }
      }
    }), c.UserVoice = c.UserVoice || [];
  }
]), FirstRevenueApp.controller('SocialController', [
  '$scope',
  '$timeout',
  'Social',
  'Myself',
  function (a, b, c, d) {
    var e = 'SocialController';
    console.log(e, 'Entered');
    var f = d;
    angular.extend(a, {
      service: null,
      account: null,
      accountId: null,
      contactProvider: null,
      timeStamp: null,
      social: c,
      init: function (b) {
        a.service = b, a.account = _.find(f.sync.user.accounts, function (a) {
          return a.profile.service === b;
        });
      },
      saveContacts: function () {
      },
      setAccount: function (b) {
        a.accountId = b;
      },
      isPartner: function (a) {
        return !!a.partner;
      },
      isFavorite: function (a) {
        return a.partner && a.partner.favorite;
      },
      toggleFavorite: function (b) {
        if (console.log(e, 'toggleFavorite contact=', b), !b.partner) {
          var c = a.me.sync.user.accounts[b.profileKey].contacts;
          c.partners || (c.partners = {}), c.partners[b.id] || (c.partners[b.id] = {
            name: b.name,
            image: b.image
          }), b.partner = c.partners[b.id];
        }
        b.partner.favorite = !b.partner.favorite, console.log(e, 'toggleFavorite contact.partner=', b.partner);
      },
      getSocialPartners: function (a) {
        console.log(e, 'getSocialPartners service=', a);
        var b = {}, c = _.find(f.sync.user.accounts, function (b) {
            return b.profile.service === a;
          });
        return console.log(e, 'getSocialPartners account=', c), _.each(c.contacts.partners, function (a, d) {
          b[d] = {
            provider: c.profile.provider,
            service: c.profile.service,
            name: a.name,
            image: a.image,
            id: d,
            partner: a
          };
        }), console.log(e, 'getSocialPartners contacts=', b), b;
      },
      getContacts: function (b) {
        return console.log(e, 'getContacts service=', b), c.loaded[b] ? c.contacts[b] : a.getSocialPartners(b);
      },
      getSocialContacts: function (a) {
        console.log(e, 'getSocialContacts service=', a);
        var b = _.find(f.user.accounts, function (b) {
            return console.log(e, 'getSocialContacts account=', b), b.profile.service === a;
          });
        return console.log(e, 'getSocialContacts found account=', b), b.allContacts;
      },
      getContactCount: function (a) {
        return f.findAccount(a).contacts.total;
      },
      getRefreshTime: function (a) {
        var b = f.findAccount(a).contacts.refreshed;
        return b ? new Date(b).toString() : null;
      },
      getRefreshLatency: function (c) {
        var d = f.findAccount(c).contacts.refreshed;
        return b(function () {
          a.timeStamp = Date.now();
        }, 1000), a.getLatency(d, a.timeStamp);
      },
      hasBeenInvited: function (a) {
        return !!a.inviteSent;
      },
      hasNoInvitation: function (a) {
        return !a.inviteSent && !a.account;
      },
      invite: function (b, d) {
        console.log(e, 'invite key=', b, 'partner=', d);
        var g = f.userRef.child('invites').push();
        g.set({
          service: d.service,
          id: b
        }), d.invite = g.name();
        var h = {
            service: d.service,
            id: b,
            status: 'created',
            creator: f.userId
          }, i = f.rootRef.child('invites').child(d.invite);
        i.set(h, function (b) {
          a.inviteCallback(b, d, 'created');
        }), c.invite(d, function (b) {
          b && (console.log(e, 'invite sent partner=', d), i.update({ status: 'sent' }, function (b) {
            a.inviteCallback(b, d, 'sent');
          }));
        });
      },
      inviteCallback: function (a, b, c) {
        a ? (console.log(e, 'invite global status cannot be set to', c, 'error=', a), b.inviteFailed = !0) : (console.log(e, 'invite global status set to', c), 'created' === c && (b.inviteCreated = !0), 'sent' === c && (b.inviteSent = !0));
      },
      isUser: function (a) {
        return !!a.account;
      }
    }), a.layout.guide.wide = !0, a.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('StickerController', [
  '$scope',
  'StickerEditor',
  'Modal',
  function (a, b, c) {
    console.log('---- StickerController'), angular.extend(a, {
      modal: c,
      editor: b,
      titleOfDeleteButton: function () {
        return this.isDeleteAllowed() ? 'Delete sticker' : 'Not allowed to delete this sticker';
      },
      openDeleteStickerDialog: function () {
        var b = a.canvas.model.stickers[a.stickerId];
        this.modal.openDeleteStickerDialog(a.stickerId, b);
      },
      isDeleteAllowed: function () {
        return this.modal.isDeleteAllowed(a.stickerId);
      }
    });
  }
]), FirstRevenueApp.controller('StickerEditorController', [
  '$scope',
  'StickerEditor',
  'Info',
  'Modal',
  function (a, b, c, d) {
    console.log('---- StickerEditorController');
    var e = a.editor = b;
    a.$watch('Info.view.sticker', function (a) {
      a && e.focusTitle();
    }), angular.extend(a, {
      modal: d,
      purpose: '',
      confirmCloseEditor: function () {
        a.layout.editor.sticker = !1;
      },
      confirmDeleteSticker: function () {
        this.modal.openDeleteStickerDialog(e.stickerId, e.sticker), a.layout.tooltips = !1;
      },
      createSticker: function () {
        e.matchTitle() ? (d.dup = !0, a.layout.tooltips = !1) : (e.sticker.id = 0, e.saveSticker());
      },
      saveSticker: function () {
        e.saveSticker();
      },
      isColorChosen: function (a) {
        return e.sticker && e.sticker.color && e.sticker.color.toLowerCase() === a;
      },
      isCancelButtonDisabled: function () {
        return !e.wasStickerModified();
      },
      isCloseButtonDisabled: function () {
        return e.wasStickerModified();
      },
      isDeleteButtonHidden: function () {
        return this.isStickerNew();
      },
      isDeleteButtonDisabled: function () {
        return !1;
      },
      isNewButtonDisabled: function () {
        return !this.isStickerNew() && this.matchTitle(e.sticker);
      },
      isSaveButtonDisabled: function () {
        return !e.wasStickerModified();
      },
      isStickerNew: function () {
        return !e.sticker || 0 === e.sticker.id;
      },
      getBlock: function () {
        return a.getBlocks()[e.sticker.block];
      }
    });
  }
]), FirstRevenueApp.controller('StickerListController', [
  '$scope',
  function (a) {
    var b = 'StickerListController';
    console.log(b, 'started'), angular.extend(a, {
      list: {},
      getStickers2: function (b) {
        var c = {}, d = a.canvas.modelId, e = a.me.sync.models[d];
        return e && e.stickers && _.each(a.me.sync.models[d].stickers, function (a, d) {
          a.block === b && (c[d] = a);
        }), c;
      }
    });
  }
]), FirstRevenueApp.controller('ModelTagController', [
  '$scope',
  'TagCatalog',
  function (a, b) {
    console.log('---- ModelTagController'), _.extend(a, { catalog: b });
  }
]), FirstRevenueApp.directive('uiModal', [
  '$timeout',
  function (a) {
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (b, c, d, e) {
        c.addClass('modal hide'), b.$watch(d.ngModel, function (a) {
          c.modal(a && 'show' || 'hide');
        }), c.on('show.ui', function () {
          a(function () {
            e.$setViewValue(!0);
          });
        }), c.on('hide.ui', function () {
          a(function () {
            e.$setViewValue(!1);
          });
        });
      }
    };
  }
]), FirstRevenueApp.directive('contenteditable', function () {
  return {
    require: 'ngModel',
    link: function (a, b, c, d) {
      b.bind('blur keyup', function () {
        a.$apply(function () {
          d.$setViewValue(b.html());
        });
      }), d.$render = function () {
        b.html(d.$viewValue);
      };
    }
  };
}), FirstRevenueApp.directive('firstRevenueButtons', [
  'Canvas',
  'StickerEditor',
  function (a, b) {
    return console.log('first-revenue-buttons'), function (c, d) {
      d.on('click.first-revenue-buttons', '.st-grad button', function (d) {
        var e = $(this).offsetParent(), f = e.attr('data-pane'), g = e.attr('data-block'), h = e.attr('data-sticker');
        console.log('first-revenue-buttons pane=', f, 'blockId=', g, 'stickerId=', h), d.stopPropagation();
        var i = a.model.blocks;
        $('.pulsate').removeClass('pulsate'), _.each(i, function (a) {
          a.stickers[0] && delete a.stickers[0];
        });
        var j = i[g], k = j.stickers[h], l = $(this).attr('title');
        if ('Delete' === l)
          window.confirm('Delete sticker ' + h + '\n' + k.title + '?');
        else if ('Edit' === l) {
          for (var m = 0; m < Opentip.tips; m++)
            Opentip.tips[m].hide();
          var n = $('.st-grad[data-id=' + h + ']');
          n.addClass('pulsate'), b.showSticker(a.model, j, h), console.log('first-revenue-buttons sticker=', k);
        }
        c.$root.$apply();
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueDrag', [function () {
    return function (a, b) {
      var c = {
          opop: null,
          op: null,
          st: null,
          stl: 0,
          stt: 0,
          cl: 0,
          ct: 0,
          touchHandled: !1,
          touchMoved: !1,
          clicked: function (a) {
            var b = $(a.target);
            if (!b.hasClass('btn') && !b.offsetParent().hasClass('btn')) {
              var d = c.op.offset(), e = c.st.offset();
              return c.stl = e.left - d.left, c.stt = e.top - d.top, c.cl = a.pageX - d.left, c.ct = a.pageY - d.top, c.opop.bind('mousemove', c.dragged), $(window).bind('mouseup', c.dropped), a.preventDefault(), !1;
            }
          },
          dragged: function (b) {
            a.$root.draggingActive = !0, a.layout.tooltips = !1, c.opop.addClass('drag-area'), c.st.addClass('st-dragged'), c.st.removeClass('st-show-buttons'), c.st.trigger('dragActive');
            var d = c.op.offset(), e = b.pageX - d.left, f = b.pageY - d.top, g = c.stl + (e - c.cl), h = c.stt + (f - c.ct);
            return g = Math.max(0, g), h = Math.max(0, h), g = Math.min(c.opop.width() - c.st.width(), g), h = Math.min(c.op.height(), h), c.st.css({
              position: 'absolute',
              left: g,
              top: h
            }), !1;
          },
          dropped: function () {
            return a.$root.draggingActive = !1, a.layout.tooltips = !0, c.opop.removeClass('drag-area'), c.st.removeClass('st-dragged'), c.opop.unbind('mousemove', c.dragged), $(window).unbind('mouseup', c.dropped), (!c.touchHandled || c.touchMoved) && c.savePosition(), !1;
          },
          savePosition: function () {
            var b = c.st.offset(), d = c.st.width(), e = c.opop.width() - d, f = c.op.height(), g = 0 === e ? 0 : 100 * (b.left - c.op.offset().left) / e, h = 0 === f ? 0 : 100 * (b.top - c.op.offset().top) / f, i = Math.max(0, Math.min(Math.round(100 * g) / 100, 100)), j = Math.max(0, Math.min(Math.round(100 * h) / 100, 100));
            console.log('first-revenue-drag xPerc=', i, 'yPerc=', j, 'sticker=', a.sticker, 'sto=', b, 'dh.opop.offset()=', c.opop.offset(), 'dh.op.offset()=', c.op.offset()), c.st.css({
              position: 'absolute',
              top: j + '%',
              left: i + '%'
            });
            var k = a.getSticker(a.stickerId);
            k.x = i, k.y = j, a.$apply();
          },
          touchStart: function (a) {
            c.touchHandled || (c.touchHandled = !0, c.touchMoved = !1, c.simulateMouseEvent(a, 'mousedown'));
          },
          touchMove: function (a) {
            c.touchHandled && (c.touchMoved = !0, c.simulateMouseEvent(a, 'mousemove'));
          },
          touchEnd: function (a) {
            c.touchHandled && (c.simulateMouseEvent(a, 'mouseup'), c.touchMoved || c.simulateMouseEvent(a, 'click'), c.touchHandled = !1);
          },
          simulateMouseEvent: function (a, b) {
            a.preventDefault();
            var d = a.originalEvent.changedTouches[0], e = document.createEvent('MouseEvents');
            if ('click' === b)
              c.simulateEvent(e, b, d), a.target.dispatchEvent(e);
            else if ('mousedown' === b) {
              c.simulateEvent(e, b, d), c.clicked(e);
              var f = document.createEvent('MouseEvents');
              c.simulateEvent(f, 'mousemove', d), c.dragged(f);
            } else
              'mousemove' === b ? (c.simulateEvent(e, b, d), c.dragged(e)) : 'mouseup' === b && (c.simulateEvent(e, b, d), c.dropped(e));
          },
          simulateEvent: function (a, b, c) {
            return a.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null);
          }
        }, d = function (a) {
          var b = a.offsetParent(), d = b;
          b.hasClass('pane') ? b = b.find('.pane-sticker') : d = b.offsetParent(), c.opop = d, c.op = b, c.st = a, a.mousedown(c.clicked), 'ontouchend' in document && (a.bind('touchstart', c.touchStart), a.bind('touchmove', c.touchMove), a.bind('touchend', c.touchEnd));
        };
      d(b);
    };
  }]), FirstRevenueApp.directive('firstRevenueEdit', [
  'Canvas',
  'StickerEditor',
  function (a, b) {
    var c = 'firstRevenueEdit';
    return console.log(c, 'loaded'), function (d, e, f) {
      var g = function (f, g) {
        f.stopPropagation(), console.log(c, 'scope=', d, 'linkElement=', e, '$this=', g);
        var h = a.model, i = 0, j = g;
        if ($('.pulsate').removeClass('pulsate'), g.hasClass('pane')) {
          var k = d.canvas.modelId, l = d.me.rootRef.child('models').child(k);
          i = l.child('stickers').push().name(), console.log(c, 'create sticker stickerId=', i), d.sync.models[k].stickers = d.sync.models[k].stickers || {}, d.sync.models[k].stickers[i] = {
            title: '',
            notes: '',
            color: 'yellow',
            block: j.attr('data-id')
          };
        } else
          j = g.offsetParent().offsetParent(), i = g.attr('data-id'), console.log(c, 'existing sticker stickerId=', i), g.addClass('pulsate');
        var m = j.attr('data-id');
        b.showSticker(h, m, i), console.log(c, 'editor.sticker=', b.sticker), d.$apply();
      };
      e.on('dblclick.st-edit', function (b) {
        var c = $(this), d = f.firstRevenueEdit;
        a.singleBlock && 'XXC' !== d || g(b, c);
      }), e.on('click.st-edit', '.pane-button', function (b) {
        var c = $(this).offsetParent(), d = f.firstRevenueEdit;
        a.singleBlock && 'XXC' !== d || g(b, c);
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueGapiInteractivePost', [function () {
    var a = 'firstRevenueGapiInteractivePost', b = window.location.origin || window.location.protocol + '//' + window.location.host, c = b + window.location.pathname + '#/invite/', d = b + window.location.pathname + 'views/GooglePlusInvitation.html';
    return {
      restrict: 'A',
      link: function (b, e, f) {
        var g = f.firstRevenueGapiInteractivePost, h = {
            contenturl: d,
            clientid: CONFIG_1ST_REVENUE.googleClientId,
            cookiepolicy: 'single_host_origin',
            prefilltext: 'Join the ' + b.appName + ' to collaborate on model ' + b.canvas.model.fields.name,
            calltoactionlabel: 'INVITE',
            calltoactionurl: c + b.inviteId,
            recipients: g
          };
        console.log(a, 'Interactive post options=', h), gapi.interactivepost.render(e[0], h);
      }
    };
  }]), FirstRevenueApp.directive('firstRevenueOpenTip', [
  '$window',
  function (a) {
    var b = function (b) {
        var c = b.currentTarget, d = $(c).offset(), e = d.left + c.clientWidth / 2, f = d.top + c.clientHeight / 2;
        return {
          hp: e,
          vp: f,
          ww: a.innerWidth,
          wh: a.innerHeight,
          ww2: a.innerWidth / 2,
          wh2: a.innerHeight / 2,
          cx: b.clientX,
          cy: b.clientY,
          ox: b.offsetX,
          oy: b.offsetY,
          t: c,
          tl: d.left,
          tt: d.top,
          cw: c.clientWidth,
          ch: c.clientHeight,
          cw2: c.clientWidth / 2,
          ch2: c.clientHeight / 2,
          left: e < a.innerWidth / 2,
          top: f < a.innerHeight / 2
        };
      }, c = function (a) {
        return a.offsetX || (a.offsetX = a.pageX - $(a.target).offset().left, a.offsetY = a.pageY - $(a.target).offset().top), a;
      }, d = function (a, b) {
        new Opentip(this, $(a).find('.st-pop').html(), {
          tipJoint: (b.top ? 'top' : 'bottom') + ' ' + (b.left ? 'left' : 'right'),
          stem: !0
        });
      }, e = function (a, b) {
        console.log('qtipAdjust exposeButtons');
        var c = $(a).find('.btn-edit-sticker'), d = $(a).find('.btn-delete-sticker');
        $(a).on('mouseleave', function () {
          $(a).removeClass('st-show-buttons'), c.removeClass('btn-edit-bottom'), c.removeClass('btn-edit-top'), c.removeClass('btn-edit-right'), c.removeClass('btn-edit-left'), d.removeClass('btn-delete-bottom'), d.removeClass('btn-delete-top'), d.removeClass('btn-delete-right'), d.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(a).addClass('st-show-buttons'), b.top ? (c.removeClass('btn-edit-bottom'), c.addClass('btn-edit-top'), d.removeClass('btn-delete-bottom'), d.addClass('btn-delete-top')) : (c.removeClass('btn-edit-top'), c.addClass('btn-edit-bottom'), d.removeClass('btn-delete-top'), d.addClass('btn-delete-bottom')), b.left ? (c.removeClass('btn-edit-right'), c.addClass('btn-edit-left'), d.removeClass('btn-delete-right'), d.addClass('btn-delete-left')) : (c.removeClass('btn-edit-left'), c.addClass('btn-edit-right'), d.removeClass('btn-delete-left'), d.addClass('btn-delete-right'));
      };
    return function (a, f, g) {
      f.on('mouseenter.open-tips click.open-tips', '.st-grad', function (h) {
        var i = g.firstRevenueOpenTip;
        if (a.layout.tooltips) {
          console.log('first-revenue-open-tip linkElement=', f, 'this=', this, 'label=', i, 'event=', h);
          var j = c(h), k = b(j), l = $.trim($(this).find('.st-pop').text());
          console.log('tooltips stickerText=[' + l + '], quadrant=', k), l.length > 0 && d(this, k, j), e(this, k), a.hovering = !0, a.$root.$apply();
        }
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueTypeahead', [
  '$timeout',
  '$parse',
  function (a, b) {
    var c = 'firstRevenueTypeahead', d = [
        'search-query',
        'input-mini',
        'input-small',
        'input-medium',
        'input-large',
        'input-xlarge',
        'input-xxlarge'
      ], e = function (a) {
        for (var b in d) {
          var c = d[b];
          a.hasClass(c) && a.prev().addClass(c);
        }
      };
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (d, f, g) {
        var h = b(g.ngModel), i = h(d);
        d.$watch(g.ngModel, function (a, b) {
          a !== b && (i = a), console.log(c, '$watch modelValue=', i);
        });
        var j = b(g.firstRevenueTypeahead)(d);
        console.log(c, 'dataset=', j), j && (f.typeahead(j), e(f)), d.$watch(g.firstRevenueTypeahead, function (a, d, h) {
          j = b(g.firstRevenueTypeahead)(h), console.log(c, '$watch tah.dataset=', j), f.typeahead('destroy'), f.typeahead(j), e(f);
        }, !0), f.on('typeahead:selected typeahead:autocompleted', function (b, e) {
          console.log(c, 'event $e=', b, 'data=', e), a(function () {
            d.tah.selectedDatum = e, d.selectedUsers[e.service + '-' + e.serviceId] = e;
          });
        });
      }
    };
  }
]), FirstRevenueApp.directive('firstRevenueServiceIcon', [
  '$timeout',
  '$parse',
  function (a, b) {
    return {
      restrict: 'A',
      templateUrl: 'views/ServiceIconSwitch.html',
      link: function (a, c, d) {
        a.service = b(d.firstRevenueServiceIcon)(a), a.$watch(d.firstRevenueServiceIcon, function (a, c, e) {
          e.service = b(d.firstRevenueServiceIcon)(e);
        }, !0);
      }
    };
  }
]), FirstRevenueApp.directive('gplusInvite', [function () {
    var a = 'gplusInvite';
    return {
      restrict: 'EAC',
      replace: !0,
      templateUrl: 'views/people/GPlusInviteButton.html',
      link: function (b, c) {
        var d = {
            contenturl: 'http://prototype.1strevenue.com/1stRevenue/#/invite',
            contentdeeplinkid: '/1stRevenue/#/invite',
            clientid: '1010606663349.apps.googleusercontent.com',
            cookiepolicy: 'http://1strevenue.com',
            prefilltext: 'Join 1stRevenue.com and collaborate with us on business modeling. Use your Google+ account to sign to the application. The original sender of the invitation will be notified when you log on to the ' + b.appName + '. ' + 'Create your account at the Join link below:',
            calltoactionlabel: 'JOIN',
            calltoactionurl: 'http://prototype.1strevenue.com/1stRevenue/#/invite',
            calltoactiondeeplinkid: '/1stRevenue/#/invite',
            recipients: b.key
          }, e = c[0];
        gapi.interactivepost.render(e, d), console.log(a, 'createButton partner=', b.partner, 'options=', d, 'element=', c, 'button=', e);
      }
    };
  }]), FirstRevenueApp.directive('openTip', [
  '$window',
  '$timeout',
  'Rainbow',
  function (a, b, c) {
    var d = function (b) {
        var c = $(b), d = c.offset(), e = d.left + b.context.clientWidth / 2, f = d.top + b.context.clientHeight / 2, g = e < a.innerWidth / 2, h = f < a.innerHeight / 2;
        return {
          top: h,
          left: g
        };
      }, e = function (a) {
        return (a.top ? 'top' : 'bottom') + ' ' + (a.left ? 'left' : 'right');
      }, f = function (a, b, c) {
        var f = d(a), g = [
            (f.left ? -1 : 1) * $(a).width() / 2,
            (f.top ? -1 : 1) * $(a).height() / 2
          ], h = {
            tipJoint: e(f),
            background: b,
            borderWidth: 0,
            stem: !0,
            delay: 'click' === c ? 0 : 1,
            offset: g,
            group: '1R',
            cache: !1,
            showOn: c,
            target: !0,
            hideTriggers: [
              'closeButton',
              'tip',
              'target',
              'trigger'
            ]
          };
        return new Opentip(a, a.find('.st-pop').html(), h);
      }, g = function (a, b) {
        var c = $(a).find('.btn-edit-sticker'), d = $(a).find('.btn-delete-sticker');
        $(a).on('mouseleave', function () {
          $(a).removeClass('st-show-buttons'), c.removeClass('btn-edit-bottom'), c.removeClass('btn-edit-top'), c.removeClass('btn-edit-right'), c.removeClass('btn-edit-left'), d.removeClass('btn-delete-bottom'), d.removeClass('btn-delete-top'), d.removeClass('btn-delete-right'), d.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(a).addClass('st-show-buttons'), b.top ? (c.removeClass('btn-edit-bottom'), c.addClass('btn-edit-top'), d.removeClass('btn-delete-bottom'), d.addClass('btn-delete-top')) : (c.removeClass('btn-edit-top'), c.addClass('btn-edit-bottom'), d.removeClass('btn-delete-top'), d.addClass('btn-delete-bottom')), b.left ? (c.removeClass('btn-edit-right'), c.addClass('btn-edit-left'), d.removeClass('btn-delete-right'), d.addClass('btn-delete-left')) : (c.removeClass('btn-edit-left'), c.addClass('btn-edit-right'), d.removeClass('btn-delete-left'), d.addClass('btn-delete-right'));
      }, h = function (a, b, e, h) {
        b.on(e + '.open-tips', function () {
          var e = $(b).data();
          console.log('openTip linkElement.on', 'data=', e);
          var i = e.opentips, j = c.opaqueField(a.sticker.color), k = null;
          for (var l in i) {
            var m = i[l];
            m.setContent(b.find('.st-pop').html()), m.options.background = j, m.redraw = !0, m.options.showOn === h && (k = m);
          }
          k || (k = f(b, j, h), k.prepareToShow()), g(this, d(b));
        });
      };
    return function (a, b) {
      h(a, b, 'mouseenter', 'mouseover'), h(a, b, 'click', 'click');
    };
  }
]), FirstRevenueApp.constant('AppName', '1$T REVENUE'), FirstRevenueApp.factory('BMG', [function () {
    var a = 'BMG';
    console.log(a, 'service launched');
    var b = {
        KP: {
          q: [
            'Who are our Key Partners?',
            'Who are our key suppliers?',
            'Which Key Resources are we acquiring from partners?',
            'Which Key Activities do partners perform?'
          ],
          c: [{
              t: 'Motivations for partnerships',
              l: [
                'Optimization and economy',
                'Reduction of risk and uncertainty',
                'Acquisition of particular resources and activities'
              ]
            }]
        },
        KA: {
          q: [
            'What Key Activities do our Value Propositions require?',
            'Our Distribution Channels?',
            'Customer Relationships?',
            'Revenue streams?'
          ],
          c: [{
              t: 'Categories',
              l: [
                'Production',
                'Problem solving',
                'Platform/Network'
              ]
            }]
        },
        KR: {
          q: [
            'What Key Resources do our Value Propositions require?',
            'Our Distribution Channels?',
            'Customer Relationships?',
            'Revenue Streams?'
          ],
          c: [{
              t: 'Types of Resources',
              l: [
                'Physical',
                'Intellectual (brand patents, copyrights, data)',
                'Human',
                'Financial'
              ]
            }]
        },
        VP: {
          q: [
            'What value do we deliver to the customer?',
            'Which one of our customer\'s problems are we helping to solve?',
            'What bundles of products and services are we offering to each Customer Segment?',
            'Which customer needs are we satisfying?'
          ],
          c: [{
              t: 'Characteristics',
              l: [
                'Newness',
                'Performance',
                'Customization',
                '"Getting the Job Done"',
                'Design',
                'Brand/Status',
                'Price',
                'Cost Reduction',
                'Accessibility',
                'Convenience/Usability'
              ]
            }]
        },
        CR: {
          q: [
            'What type of relationship does each of our Customer Segments expect us to maintain with them?',
            'Which ones have we established?',
            'How are they integrated with the rest of our business model?',
            'How costly are they?'
          ],
          c: [{
              t: 'Examples',
              l: [
                'Personal assistance',
                'Dedicated Personal Assistance',
                'Self-Service',
                'Automated Services',
                'Communities',
                'Co-creation'
              ]
            }]
        },
        CH: {
          q: [
            'Through which Channels do our Customer Segments want to be reached?',
            'How are we reaching them now?',
            'How are our Channels integrated?',
            'Which ones work best?',
            'Which ones are most cost-efficient?',
            'How are we integrating then with customer routines?'
          ],
          c: [{
              t: 'Channel Phases',
              p: [
                {
                  n: 1,
                  t: 'Awareness',
                  q: 'How do we raise awareness about our company\'s products and services?'
                },
                {
                  n: 2,
                  t: 'Evaluation',
                  q: 'How do we help customers evaluate our organization\'s Value Proposition?'
                },
                {
                  n: 3,
                  t: 'Purchase',
                  q: 'How do we allow customers to purchase specific products and services?'
                },
                {
                  n: 4,
                  t: 'Delivery',
                  q: 'How do we deliver a Value Proposition to customers?'
                },
                {
                  n: 5,
                  t: 'After sales',
                  q: 'How do we provide post purchase customer support?'
                }
              ]
            }]
        },
        CS: {
          q: [
            'For whom are we creating value?',
            'Who are our most important customers?'
          ],
          c: [{
              t: '',
              l: [
                'Mass Market',
                'Niche Market',
                'Segmented',
                'Diversified',
                'Multi-sided Platform'
              ]
            }]
        },
        CX: {
          q: [
            'What are the most important costs inherent in our business model?',
            'Which Key Resources are most expensive?',
            'Which Key Activities are most expensive?'
          ],
          c: [
            {
              t: 'Is your business more:',
              l: [
                'Cost Driven (leanest cost structure, low price value proposition, maximum automation, extensive outsourcing)',
                'Value Driven (focused on value creation, premium value proposition)'
              ]
            },
            {
              t: 'Sample Characteristics:',
              l: [
                'Fixed Costs (salaries, rents, utilities)',
                'Variable costs',
                'Economies of scale',
                'Economies of scope'
              ]
            }
          ]
        },
        RX: {
          q: [
            'For what value are our customers really willing to pay?',
            'For what do they currently pay?',
            'How are they currently paying?',
            'How would they prefer to pay?',
            'How much does each Revenue Stream contribute to overall revenues?'
          ],
          c: [
            {
              t: 'Types:',
              l: [
                'Asset sale',
                'Usage fee',
                'Subscription Fees',
                'Lending/Renting/Leasing',
                'Licensing',
                'Brokerage fees',
                'Advertising'
              ]
            },
            {
              t: 'Fixed Pricing',
              l: [
                'List Price',
                'Product feature dependent',
                'Customer segment dependent',
                'Volume dependent'
              ]
            },
            {
              t: 'Dynamic Pricing',
              l: [
                'Negotiation (bargaining)',
                'Yield management',
                'Real-time Market'
              ]
            }
          ]
        }
      }, c = {
        getBlockPurpose: function (a) {
          return b[a];
        }
      };
    return c;
  }]), FirstRevenueApp.factory('Canvas', [
  'Menu',
  'BMG',
  function (a, b) {
    var c = 'Canvas';
    console.log(c, 'service launched');
    var d = {
        bmg: b,
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
        setModel: function (b, c) {
          d.modelId = b, d.model = c || null, a.selected = 'canvas', a.setTitle(c && c.fields ? c.fields.name : null);
        },
        setView: function (a) {
          d.view = a;
        },
        toggleView: function () {
          d.view = 'free' === d.view ? 'grid' : 'free';
        },
        peerCount: function () {
          return d.model ? _.size(d.model.users) : 0;
        },
        getStyle: function () {
          return 'st-list-style4';
        },
        getLogoStyle: function () {
          var a = $('.model-logotype'), b = -Math.round(a.width() / 2), c = -Math.round(a.height() / 2);
          return {
            'margin-left': b,
            'margin-top': c
          };
        },
        getGridClass: function () {
          return 'grid' === this.view ? 'pane-grid' : 'list' === this.view ? 'pane-list' : '';
        },
        getAbs: function (a) {
          return 'free' === d.view && a && angular.isNumber(a.x) && angular.isNumber(a.y) || !1;
        },
        getPosition: function (a) {
          return d.getAbs(a) ? 'left: ' + a.x + '%; top: ' + a.y + '%;' : '';
        },
        switchBlock: function (a) {
          console.log(c, 'switchBlock pane=', a, 'this.model.blocks=', d.model.blocks), d.singleBlock = _.find(d.model.blocks, function (b) {
            return console.log(c, 'switchBlock findingBlock b=', b), b.paneClass === a.icon;
          });
        },
        getBackgroundImageURL: function () {
          return 'images/DemoCanvasModelIcon.png';
        }
      };
    return d;
  }
]), FirstRevenueApp.factory('Detect', [
  '$window',
  function (a) {
    var b = 'Detect';
    console.log(b, 'service launched');
    var c = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0, d = 'undefined' != typeof InstallTrigger, e = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0, f = !!a.chrome && !c, g = f && /Chromium/.test(a.navigator.userAgent), h = !1 || document.documentMode, i = h ? 'Internet Explorer' : g ? 'Chromium' : f ? 'Chrome' : e ? 'Safari' : d ? 'Firefox' : c ? 'Opera' : 'Unknown', j = _.copy(a.ui);
    return j.browserSafe = i, j;
  }
]), FirstRevenueApp.factory('Favicon', [function () {
    var a = {
        persona: 'login.persona.org',
        gplus: 'plus.google.com',
        gcontacts: 'google.com'
      };
    return {
      getUrl: function (b) {
        var c = a[b];
        return c = c || b + '.com', '//' + c + '/favicon.ico';
      }
    };
  }]), FirstRevenueApp.factory('FilePicker', [
  '$timeout',
  function (a) {
    var b = 'FilePicker', c = {
        fpFile: null,
        attachIcon: function (a) {
          c.fpicker(a);
        },
        replaceIcon: function (a) {
          c.removeIcon(a), c.fpicker(a);
        },
        removeIcon: function (d) {
          filepicker.setKey(CONFIG_1ST_REVENUE.filepickerKey), filepicker.remove(d.fields.icon, function () {
            console.log(b, 'removeIcon icon removed'), a(function () {
              c.fpFile = null, d.fields.icon = null;
            });
          }, function (a) {
            console.log(b, 'removeIcon FPError=', a);
          });
        },
        fpicker: function (d) {
          return filepicker.setKey(CONFIG_1ST_REVENUE.filepickerKey), filepicker.pickAndStore({ maxSize: 1048576 }, { location: 'S3' }, function (e) {
            console.log(b, 'filepicker', e), a(function () {
              c.fpFile = e, d.fields.icon = e[0].url;
            });
          }, function (a) {
            console.log(b, 'filepicker error', a.toString());
          }), !1;
        }
      };
    return c;
  }
]), FirstRevenueApp.factory('Firebase', [
  '$rootScope',
  '$timeout',
  '$location',
  '$window',
  'Myself',
  'Layout',
  'Notif',
  function (a, b, c, d, e, f, g) {
    var h = 'Firebase';
    console.log(h, 'service launched');
    var i = {
        endpoint: CONFIG_1ST_REVENUE.firebaseEndpoint,
        nowRemote: null,
        rootRef: null,
        authClient: null,
        notif: g,
        providers: {
          facebook: {
            seq: 1,
            icon: 'facebook',
            title: 'Facebook',
            method: 'simple',
            scope: 'email',
            border: '#3B5997'
          },
          linkedin: {
            seq: 2,
            icon: 'linkedin',
            title: 'LinkedIn',
            method: 'singly',
            option: 'linkedin',
            border: '#0059A7'
          },
          gplus: {
            seq: 7,
            icon: 'google-plus',
            title: 'Google+',
            method: 'singly',
            option: 'gplus',
            border: '#DD4B39'
          }
        },
        init: function () {
          i.rootRef = new Firebase(i.endpoint), Firebase.enableLogging(!0), console.log(h, 'init fb.rootRef=', i.rootRef);
        },
        retrieveSession: function () {
          e.authFailed || (i.authClient = new FirebaseSimpleLogin(i.rootRef, i.verifySession));
        },
        resumeSession: function () {
          e.authFailed || (i.authClient = new FirebaseSimpleLogin(i.rootRef, i.generalAuth));
        },
        verifySession: function (a, b) {
          console.log(h, 'verifySession error=', a, 'fbUser=', b);
          var d = !1;
          a ? console.log(h, 'verifySession Firebase returned an error=', a) : b ? (console.log(h, 'verifySession Firebase auth success fbUser=', b, 'sessionKey=', b.sessionKey), d = !0) : console.log(h, 'verifySession Firebase auth returned null fbUser=', b, '$location=', c), d && e.mp.setLastUser(b), e.processInvite(d);
        },
        clearSession: function () {
          FirebaseSimpleLogin.prototype.clearSession();
        },
        setAdmin: function (a) {
          e.adminRole = a;
        },
        generalAuth: function (a, b) {
          if (console.log(h, 'generalAuth error=', a, 'fbUser=', b), e.mp.clearLastUser(), a)
            console.log(h, 'generalAuth Firebase returned an error=', a), i.authFailed(a);
          else if (b) {
            if (console.log(h, 'generalAuth Firebase auth success fbUser=', b, 'sessionKey=', b.sessionKey), e.mp.setLastUser(b), b.sessionKey)
              FirebaseSimpleLogin.prototype.saveSession(b.firebaseAuthToken, b), delete b.sessionKey;
            else {
              var d = FirebaseSimpleLogin.prototype.readCookie('firebaseSessionKey');
              console.log(h, 'sessionKey from cookie firebaseSessionKey=', d), b.firebaseSessionKey = d;
            }
            var f = i.rootRef.child('usermap'), g = f.child(b.provider).child(b.id);
            g.once('value', function (a) {
              console.log(h, 'generalAuth', 'mapUserRef once value=', a.val()), i.checkUserMap(a.val(), b, g);
            });
          } else
            console.log(h, 'generalAuth Firebase auth returned null fbUser=', b, '$location=', c), i.authFailed();
        },
        checkUserMap: function (a, b, c) {
          if (a) {
            var d = i.rootRef.child('users').child(a);
            d.once('value', function (d) {
              var e = d.val();
              console.log(h, 'checkUserMap', 'userRef once urValue=', e), e ? (console.log(h, 'checkUserMap', 'userRef urValue=', e), i.openSession(a, b)) : (console.log(h, 'checkUserMap', 'Remove orphan from user map: fbUser=', b), c.remove(function () {
                console.log(h, 'checkUserMap', 'Orphan removed from user map: fbUser=', b), i.authFailed({
                  code: 'USER_UNKNOWN',
                  message: b.service + ' user ' + (b.name ? b.name : '') + ' (id=' + b.id + ') not found in 1st Revenue',
                  user: b
                });
              }));
            });
          } else
            console.log(h, 'checkUserMap', 'No record in user map for fbUser=', b, 'firebaseSessionKey=', b.firebaseSessionKey), i.clearSession(), console.log(h, 'checkUserMap', 'Firebase session cleared'), b.service = b.service || b.provider, i.authFailed({
              code: 'USER_UNKNOWN',
              message: i.providers[b.service].title + ' user ' + (b.name ? b.name : '') + ' (id=' + b.id + ') not found in 1st Revenue',
              user: b
            });
        },
        authFailed: function (a) {
          console.log(h, 'authFailed error=', a), e.authError(a), b(function () {
            '/entry' === c.$$url ? f.setView('signin') : c.url('/entry');
          });
        },
        openSession: function (b, c, d) {
          console.log(h, 'openSession userId=', b, 'fbUser=', c, 'modelId=', d), e.wakeup(i.rootRef, b, d), console.log(h, 'openSession resolving launch promise'), a.deferredLaunch.resolve(), analytics.identify(b, {
            id: c.id,
            provider: c.provider,
            name: c.name
          });
        },
        log: function (a) {
          var b = new Date(), c = b.getUTCFullYear(), d = b.getUTCMonth(), f = b.getUTCDate(), g = b.getUTCHours(), h = i.rootRef.child('log').child(c).child(d).child(f).child(g);
          a.time = b.getTime(), a.timeISO = b.toISOString(), a.user = e.sync.user.primary, h.push(a);
        },
        createModel: function (a, c) {
          console.log(h, 'createModel modelName=', a);
          var d = i.rootRef.child('models'), f = d.push(), g = f.name(), j = {
              fields: { name: a },
              users: {},
              owner: e.userId
            };
          return j.users[e.userId] = !0, console.log(h, 'createModel modelUpdate=', j), e.sync.models[g] = {
            fields: {},
            users: {}
          }, f.set(j, function (d, f) {
            console.log(h, 'createModel model created', 'modelUpdate=', j, 'modelName=', a, 'error=', d, 'dummy=', f), i.log({
              op: d ? 'createModel-error' : 'createModel',
              error: d,
              path: '/models/' + g,
              model: j
            }), d || (e.sync.user.models = e.sync.user.models || {}, e.sync.user.models[g] = !0, b(function () {
              c();
            }));
          }), g;
        },
        getStickerPath: function (a) {
          return '/models/' + a.modelId + '/stickers/' + a.id;
        },
        getModelPath: function (a) {
          return '/models/' + a.modelId;
        },
        getRepoPath: function (a) {
          return '/orgs/' + a.orgId + '/repos/' + a.repoId;
        },
        getOrgPath: function (a) {
          return '/orgs/' + a.id;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('FullScreen', [
  '$window',
  'Notif',
  function (a, b) {
    var c = 'FullScreen';
    return console.log(c, 'service launched'), {
      fullScreenActive: !1,
      isFullScreen: function () {
        return a.navigator.standalone;
      },
      toggle: function () {
        if (this.fullScreenActive = !this.fullScreenActive, this.fullScreenActive) {
          var a = $('.first-revenue').get(0);
          a.requestFullScreen ? a.requestFullScreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullScreen && a.webkitRequestFullScreen(), b.add({ text: 'Full screen mode entered' });
        } else
          b.add({ text: 'Full screen mode closed' });
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
        show: function (a) {
          this.status = a;
        },
        current: function (a) {
          return this.status === a;
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
      show: function (a) {
        this.view[a] || this.toggle(a);
      },
      hide: function (a) {
        this.view[a] && this.toggle(a);
      },
      toggle: function (a) {
        'model' === a || 'sticker' === a ? (this.view[a] = !this.view[a], this.view[a] && (this.view.user = !1, this.view.contact = !1)) : ('user' === a || 'contact' === a) && (this.view[a] = !this.view[a], this.view.contact && (this.view.user = !0), this.view.user ? (this.view.model = !1, this.view.sticker = !1) : this.view.contact = !1), this.view.sticker || $('.pulsate').removeClass('pulsate');
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
  }]), FirstRevenueApp.factory('JWT', [function () {
    var a = 'JWT';
    return console.log(a, 'service launched'), {
      decodeJWT: function (b) {
        console.log(a, 'decodeJWT token=', b);
        var c = b.split('.');
        if (3 !== c.length)
          throw new Error('Not enough or too many segments');
        var d = c[0], e = c[1], f = c[2];
        console.log(a, 'decodeJWT', 'headerSeg=', d, 'payloadSeg=', e, 'signatureSeg=', f);
        var g = this.base64urldecode(d), h = this.base64urldecode(e), i = this.base64urldecode(f);
        return console.log(a, 'decodeJWT', 'header=', g, 'payload=', h, 'signature=', i), [
          JSON.parse(g),
          JSON.parse(h),
          i
        ];
      },
      base64urldecode: function (a) {
        var b = a;
        switch (b = b.replace(/-/g, '+'), b = b.replace(/_/g, '/'), b.length % 4) {
        case 0:
          break;
        case 2:
          b += '==';
          break;
        case 3:
          b += '=';
          break;
        default:
          throw new InputException('Illegal base64url string!');
        }
        return window.atob(b);
      },
      displayToken: function (b) {
        var c = b.split('.');
        console.log(a, 'displayToken tokenParts=', atob(c[0]), atob(c[1]), c[2]);
      }
    };
  }]), FirstRevenueApp.factory('Layout', [
  '$window',
  'Popup',
  'Zoom',
  'FullScreen',
  'Menu',
  function (a, b, c, d, e) {
    var f = 'Layout';
    console.log(f, 'loaded');
    var g = [
        'canvas',
        'zoom',
        'comment',
        'stream',
        'list'
      ], h = [
        'comment',
        'stream',
        'list'
      ], i = {
        title: '',
        colorValue: 100,
        view: '',
        tooltips: !0,
        profile: !0,
        qrCode: !1,
        zoom: !1,
        comments: !1,
        stickerList: !1,
        guide: { wide: !0 },
        peer: { wide: !0 },
        editor: {
          model: !1,
          sticker: !1,
          contact: !1,
          user: !1
        },
        setView: function (a) {
          this.view = a;
        },
        isView: function (a) {
          return this.view === a;
        },
        showCanvas: function () {
          return _.contains(_.union(g, h), i.view);
        },
        showSideView: function () {
          return _.contains(h, i.view);
        },
        reset: function () {
          b.reset(), c.reset(), i.view = '', i.guide.wide = !0, i.peer.wide = !1;
        },
        getLayoutClasses: function () {
          var a = [c.getZoomClass(i.zoom ? null : 0)];
          return i.editor.sticker && a.push('edit-sticker'), a;
        },
        isFullScreen: function () {
          return a.navigator.standalone;
        },
        showButtons: function () {
          return 'canvas' === e.selected;
        },
        toggleZoom: function () {
          i.zoom = !i.zoom, i.zoom || c.reset();
        },
        toggleComments: function () {
          i.comments = !i.comments, i.stickerList = !1;
        },
        toggleStickerList: function () {
          i.stickerList = !i.stickerList, i.comments = !1;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('MasterScope', [function () {
    return {
      masterScope: null,
      setMasterScope: function (a) {
        this.masterScope = a;
      },
      getMasterScope: function () {
        return this.masterScope;
      }
    };
  }]), FirstRevenueApp.factory('MemberCatalog', [function () {
    return {
      sort: null,
      getMembers: function () {
      },
      getTitle: function (a) {
        return a.title ? a.title[0] : '';
      },
      getFullTitle: function (a) {
        return _.reduce(a.title || [], function (a, b) {
          return (a ? a + '\n' : '') + b;
        });
      },
      modelCount: function (a) {
        return a.models ? _.size(a.models) : 0;
      },
      highlightModels: function (a) {
        console.log('highlightModels member=', a, 'event=', event), $(event.target).parent().children().css('color', 'darkred');
      }
    };
  }]), FirstRevenueApp.factory('Menu', [
  '$window',
  'AppName',
  function (a, b) {
    var c = b, d = {
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
        toggle: function (a) {
          d[a] = !d[a];
        },
        setTitle: function (b) {
          var e = b ? b.indexOf(c) < 0 ? b + ' - ' + c : b : c;
          d.title = a.document.title = e;
        },
        getAppName: function () {
          return b;
        }
      };
    return d;
  }
]), FirstRevenueApp.factory('Modal', [function () {
    var a = {
        logon: !1,
        logoff: !1,
        dup: !1,
        dis: !1,
        del: !1,
        delNoRights: !1,
        model: !1,
        modelNew: !1,
        modelEditorTab: 0,
        stickerId: null,
        sticker: null,
        contact: null,
        inviteText: null,
        inviteId: null,
        openDeleteStickerDialog: function (b, c) {
          a.stickerId = b, a.sticker = c;
        },
        isDeleteAllowed: function () {
          return !0;
        }
      };
    return a;
  }]), FirstRevenueApp.factory('ModelCatalog', [
  'TagCatalog',
  'Myself',
  function (a, b) {
    var c = 'ModelCatalog';
    console.log(c, 'service loaded');
    var d = {
        sort: 'time',
        tag: '*',
        ascending: !0,
        backInTime: !0,
        refreshModels: function () {
        },
        getModel: function (a) {
          return b.sync.models[a];
        },
        isMine: function (a) {
          return b.sync.models[a].owner === b.userId;
        },
        isPublic: function (a) {
          return b.sync.public.models && !!b.sync.public.models[a];
        },
        isShared: function (a) {
          return !!b.sync.user.models[a] && !d.isMine(a);
        },
        isReadOnly: function (a) {
          return d.isPublic(a) && !b.sync.user.models[a];
        },
        getModelsNew3: function (a) {
          var c = {};
          return _.each(b.sync.models, function (b, e) {
            var f = d.isPublic(e);
            ('all' === a || 'public' === a && f || 'my' === a && !f) && (b.id = e, c[e] = b);
          }), this.sortModelList(c);
        },
        getModels: function (a) {
          var c = [];
          return _.each(b.sync.models, function (b, e) {
            b.id = e;
            var f = d.isPublic(e), g = d.isMine(e), h = d.isShared(e);
            ('all' === a || 'public' === a && f || 'shared' === a && h || 'my' === a && g) && c.push(b);
          }), this.sortModelList(c);
        },
        getModelIdList: function (a) {
          var c = [];
          return _.each(b.sync.models, function (b, e) {
            if (b && b.fields) {
              var f = d.isPublic(e), g = d.isMine(e), h = d.isShared(e);
              ('all' === a || 'public' === a && f || 'shared' === a && h || 'my' === a && g) && c.push(e);
            }
          }), this.sortModelIdList(c);
        },
        getFields: function (a) {
          return b.sync.models[a].fields;
        },
        getTags: function (a) {
          return b.sync.models[a].tags;
        },
        sortModelIdList: function (a) {
          var c = a;
          return 'name' === this.sort && (c = _.sortBy(a, function (a) {
            return b.sync.models[a].fields.name;
          }), this.ascending || c.reverse()), 'time' === this.sort && (c = _.sortBy(a, function (a) {
            return a;
          }), this.backInTime && c.reverse()), c;
        },
        sortModelList: function (a) {
          var b = a;
          return 'name' === this.sort && (b = _.sortBy(a, function (a) {
            return a.fields.name;
          }), this.ascending || b.reverse()), 'time' === this.sort && (b = _.sortBy(a, function (a) {
            return a.id;
          }), this.backInTime && b.reverse()), b;
        },
        nameSortOrder: function () {
          return this.ascending ? 'a-z' : 'z-a';
        },
        timeSortIconSuffix: function () {
          return (this.backInTime ? '-back' : '') + ('time' === this.sort ? '-white' : '');
        },
        getMemberCount: function (a) {
          var c = b.sync.models[a];
          return c.users ? _.size(c.users) : 0;
        },
        highlightMembers: function (a) {
          console.log(c, 'highlightMembers modelId=', a, 'event=', event);
        },
        getAllTags: function () {
          var a = [];
          return _.each(b.sync.models, function (b) {
            console.log(c, 'getAllTags model loop model.id=', b.id), _.each(b.tags, function (b) {
              console.log(c, 'getAllTags tag loop tag.text=', b.text), a.push({
                text: b.text,
                type: 'info',
                count: 1
              });
            });
          }), console.log(c, 'getAllTags allTags=', a), a;
        },
        sortModels: function (a) {
          'name' === this.sort ? 'name' === a ? this.ascending = !this.ascending : (this.sort = a, this.ascending = !0) : 'time' === this.sort && ('time' === a ? this.backInTime = !this.backInTime : (this.sort = a, this.backInTime = !0));
        },
        labelColor: function (a) {
          return a === this.tag ? 'label-success' : 'label-info';
        },
        filterMatch: function (b) {
          var c = d.getTags(b), e = a.tag, f = !1;
          if (e)
            if ('*' === e)
              f = !0;
            else {
              var g = _.find(c, function (a) {
                  return a.text === e;
                });
              f = !!g;
            }
          else
            f = 0 === c.length;
          return f;
        }
      };
    return d;
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
      getRateStats: function (a) {
        var b = this;
        now.getRateStats(function (c) {
          console.log('Monitor.getRateStats=', c), b.rateStats = c, a();
        }), now.getGlobalStats(function (c) {
          console.log('Monitor.getGlobalStats=', c), b.globalStats = c, a();
        });
      }
    };
  }]), FirstRevenueApp.factory('Notif', [
  'Popup',
  function (a) {
    var b = 'Notif';
    return console.log(b, 'service launched'), {
      list: {},
      next: 0,
      show: !1,
      add: function (a) {
        console.log(b, 'add', a), a.seq = this.next, a.time = new Date(), a.type || (a.type = 'info'), this.list[this.next++] = a;
      },
      remove: function (a) {
        console.log(b, 'remove index=', a, 'item=', this.list[a]), delete this.list[a], console.log(b, 'remove deleted notif=', this.list);
      },
      count: function () {
        return _.size(this.list);
      },
      get: function (a) {
        return this.list[a];
      },
      getList: function () {
        return this.list;
      },
      clear: function () {
        this.list = {}, this.next = 0, a.notif = !1;
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
  toggle: function (a) {
    this[a] = !this[a];
  }
}), FirstRevenueApp.factory('RGB', [function () {
    return {
      hsvObject: function (a, b, c) {
        this.h = a, this.s = b, this.v = c, this.validate = function () {
          this.h <= 0 && (this.h = 0), this.s <= 0 && (this.s = 0), this.v <= 0 && (this.v = 0), this.h > 360 && (this.h = 360), this.s > 100 && (this.s = 100), this.v > 100 && (this.v = 100);
        };
      },
      rgbObject: function (a, b, c) {
        this.r = a, this.g = b, this.b = c, this.validate = function () {
          this.r <= 0 && (this.r = 0), this.g <= 0 && (this.g = 0), this.b <= 0 && (this.b = 0), this.r > 255 && (this.r = 255), this.g > 255 && (this.g = 255), this.b > 255 && (this.b = 255);
        };
      },
      hexify: function (a) {
        var b = '0123456789ABCDEF', c = a % 16, d = (a - c) / 16, e = b.charAt(d) + b.charAt(c);
        return e;
      },
      decimalize: function (a) {
        var b = '0123456789ABCDEF';
        return 16 * b.indexOf(a.charAt(0).toUpperCase()) + b.indexOf(a.charAt(1).toUpperCase());
      },
      hex2rgb: function (a, b) {
        b.r = this.decimalize(a.substring(1, 3)), b.g = this.decimalize(a.substring(3, 5)), b.b = this.decimalize(a.substring(5, 7));
      },
      rgb2hex: function (a) {
        return '#' + this.hexify(a.r) + this.hexify(a.g) + this.hexify(a.b);
      },
      rgb2hsv: function (a, b) {
        var c = a.r / 255, d = a.g / 255, e = a.b / 255, f = Math.min(c, d, e), g = Math.max(c, d, e), h = g - f;
        if (b.v = g, 0 === h)
          b.h = 0, b.s = 0;
        else {
          b.s = h / g;
          var i = ((g - c) / 6 + h / 2) / h, j = ((g - d) / 6 + h / 2) / h, k = ((g - e) / 6 + h / 2) / h;
          c === g ? b.h = k - j : d === g ? b.h = 1 / 3 + i - k : e === g && (b.h = 2 / 3 + j - i), b.h < 0 && (b.h += 1), b.h > 1 && (b.h -= 1);
        }
        b.h *= 360, b.s *= 100, b.v *= 100;
      },
      hsv2rgb: function (a, b) {
        var c = a.h / 360, d = a.s / 100, e = a.v / 100;
        if (0 === d)
          b.r = 255 * e, b.g = 255 * e, b.b = 255 * e;
        else {
          var f, g, h, i = 6 * c, j = Math.floor(i), k = e * (1 - d), l = e * (1 - d * (i - j)), m = e * (1 - d * (1 - (i - j)));
          0 === j ? (f = e, g = m, h = k) : 1 === j ? (f = l, g = e, h = k) : 2 === j ? (f = k, g = e, h = m) : 3 === j ? (f = k, g = l, h = e) : 4 === j ? (f = m, g = k, h = e) : (f = e, g = k, h = l), b.r = 255 * f, b.g = 255 * g, b.b = 255 * h;
        }
      }
    };
  }]), FirstRevenueApp.factory('Rainbow', [
  'Canvas',
  'RGB',
  function (a, b) {
    var c = '0123456789abcdef', d = {
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
      canvas: a,
      rgb: b,
      colorMap: d,
      getColorMap: function () {
        return this.colorMap;
      },
      getColor: function (a) {
        var b = this.colorMap[a];
        return b || this.colorMap.neutral;
      },
      colorList: function () {
        return $.map(this.colorMap, function (a, b) {
          return 'neutral' === b ? null : b;
        });
      },
      colorCodeList: function () {
        return $.map(this.colorMap, function (a, b) {
          return a.name = b, 'neutral' === b ? null : a;
        });
      },
      brightenHex: function (a) {
        return a = a || 'FF0000', this.brightenFull(a);
      },
      brighten: function (a) {
        var b = this.colorMap[a].code;
        return this.brightenFull(b);
      },
      brightenFull: function (a, b, c) {
        var d = new this.rgb.rgbObject(0, 0, 0), e = new this.rgb.hsvObject(0, 0, 0);
        return this.rgb.hex2rgb('#' + a, d), this.rgb.rgb2hsv(d, e), 0 === e.s ? e.v < 100 && (e.v = c ? c : 80) : (e.s = b ? b : 50, e.v = c ? c : 100), this.rgb.hsv2rgb(e, d), this.rgb.rgb2hex(d).substring(1);
      },
      opaqueField: function (a) {
        var b = this.colorMap[a].code;
        return this.opaqueFieldHex(b);
      },
      brightenFieldCSS: function (a) {
        return this.brightenFull(this.rgb2hex(a), 100, 100);
      },
      opaqueFieldCSS: function (a) {
        var b = a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), c = new this.rgb.hsvObject(0, 0, 0), d = new this.rgb.rgbObject(b[1], b[2], b[3]);
        return this.makeOpaque(d, c);
      },
      opaqueFieldHex: function (a) {
        var b = new this.rgb.rgbObject(0, 0, 0), c = new this.rgb.hsvObject(0, 0, 0);
        return a || (a = 'EFEFEF'), this.rgb.hex2rgb('#' + a, b), this.makeOpaque(b, c);
      },
      makeOpaque: function (a, b) {
        return this.rgb.rgb2hsv(a, b), b.v < 100 ? b.v = 100 : b.s = 0 === b.s ? 0 : Math.max(0, b.s - 10), this.rgb.hsv2rgb(b, a), this.rgb.rgb2hex(a).substring(1);
      },
      rgb2hex: function (a) {
        return a = a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), this.hex(a[1]) + this.hex(a[2]) + this.hex(a[3]);
      },
      hex: function (a) {
        return isNaN(a) ? '00' : c[(a - a % 16) / 16] + c[a % 16];
      }
    };
  }
]), FirstRevenueApp.factory('RrrrRrrr', [function () {
    return {
      launching: !0,
      getImageLink: function () {
        var a = Math.floor(Math.random() * this.rrrrrrrrImages.length);
        return this.imageLinkPrefix + this.rrrrrrrrImages[a] + this.imageLinkSuffix;
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
  }]), FirstRevenueApp.factory('TagCatalog', [function () {
    return {
      tag: '*',
      getTagCloud: function () {
      },
      tagFilter: function (a) {
        this.tag = a;
      },
      labelColor: function (a) {
        var b = this.colorClass(a);
        return b ? 'label-' + b : '';
      },
      colorClass: function (a) {
        return a && '*' !== a ? a === this.tag ? 'success' : 'info' : a === this.tag ? 'success' : '';
      },
      getModelCount: function () {
      },
      getTaggedCount: function () {
        return this.getModelCount() - this.getUntaggedCount();
      },
      getUntaggedCount: function () {
        var a = 0;
        return a;
      }
    };
  }]), FirstRevenueApp.factory('Zoom', [
  'Popup',
  'Canvas',
  function (a, b) {
    var c = 'Zoom';
    console.log(c, 'loaded');
    var d = {
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
        },
        6: {
          label: 'map',
          title: 'Scrolling map'
        }
      }, e = {
        choice: 0,
        singleBlock: !1,
        levels: d,
        canvas: b,
        getZoomClass: function (a) {
          var b = angular.isNumber(a) ? a : e.choice;
          return 'canvas-' + d[b].label;
        },
        reset: function () {
          e.choice = 0, e.singleBlock = !1;
        },
        zoom: function (b) {
          console.log(c, 'choice=', b), e.choice = b, a.zoom = !1;
        }
      };
    return e;
  }
]), FirstRevenueApp.factory('Renderer', [function () {
    var a = 'Renderer', b = [
        '1R Model',
        'Competitors',
        'CustSegm',
        'Team',
        'MarketTrends',
        'MetaData',
        'Incubators',
        'SegmChan'
      ], c = {
        render: function (a, b) {
          var d = arbor.ParticleSystem();
          d.parameters({
            stiffness: 900,
            repulsion: 2000,
            gravity: !0,
            dt: 0.015
          }), d.renderer = c.create(a), d.graft(b);
        },
        create: function (c) {
          var d = $(c), e = d.get(0), f = e.getContext('2d'), g = arbor.Graphics(e), h = null, i = null, j = null, k = null, l = null, m = {
              init: function (b) {
                console.log(a, 'init pSystem=', b), h = b, h.screen({
                  size: {
                    width: d.width(),
                    height: d.height()
                  },
                  padding: [
                    36,
                    60,
                    36,
                    60
                  ]
                }), $(window).resize(m.resize), m.resize(), m._initMouseHandling();
              },
              resize: function () {
                console.log(a, 'resize'), e.width = $(window).width() - 250, e.height = $(window).height() - 150, console.log(a, 'resize width=', e.width, 'height=', e.height), h.screen({
                  size: {
                    width: e.width,
                    height: e.height
                  }
                }), i = null, m.redraw();
              },
              redraw: function () {
                g.clear(), h.eachEdge(function (a, b, c) {
                  0 !== a.source.data.alpha * a.target.data.alpha && g.line(b, c, {
                    stroke: '#b2b19d',
                    width: 2,
                    alpha: a.target.data.alpha
                  });
                }), h.eachNode(function (a, b) {
                  var c = Math.max(20, 20 + g.textWidth(a.name));
                  0 !== a.data.alpha && ('dot' === a.data.shape && (g.oval(b.x - c / 2, b.y - c / 2, c, c, {
                    fill: a.data.color,
                    alpha: a.data.alpha
                  }), m._drawName(a, b, 7), m._drawName(a, b, 7)), 'square' === a.data.shape ? (g.rect(b.x - c / 2, b.y - c / 2, c, c, 4, {
                    fill: a.data.color,
                    alpha: a.data.alpha
                  }), m._drawName(a, b, 9, 'black'), m._drawName(a, b, 9, 'black')) : (g.rect(b.x - c / 2, b.y - 8, c, 20, 4, {
                    fill: a.data.color,
                    alpha: a.data.alpha
                  }), m._drawName(a, b, 9), m._drawName(a, b, 9)));
                }), m._drawVignette();
              },
              _drawName: function (a, b, c, d) {
                g.text(a.name, b.x, b.y + c, {
                  color: d ? d : 'white',
                  align: 'center',
                  font: 'Arial',
                  size: 12
                });
              },
              _drawVignette: function () {
                var a = e.width, b = e.height, c = 20;
                if (!i) {
                  var d = f.createLinearGradient(0, 0, 0, c);
                  d.addColorStop(0, '#e0e0e0'), d.addColorStop(0.7, 'rgba(255,255,255,0)');
                  var g = f.createLinearGradient(0, b - c, 0, b);
                  g.addColorStop(0, 'rgba(255,255,255,0)'), g.addColorStop(1, 'white'), i = {
                    top: d,
                    bot: g
                  };
                }
                f.fillStyle = i.top, f.fillRect(0, 0, a, c), f.fillStyle = i.bot, f.fillRect(0, b - c, a, c);
              },
              switchSection: function (a) {
                var b = h.getEdgesFrom(a)[0].source, c = $.map(h.getEdgesFrom(a), function (a) {
                    return a.target;
                  });
                h.eachNode(function (a) {
                  var d = $.inArray(a, c) >= 0, e = d ? 1 : 0;
                  1 === e && (a.p.x = b.p.x + 0.05 * Math.random() - 0.025, a.p.y = b.p.y + 0.05 * Math.random() - 0.025, a.tempMass = 0.001);
                });
              },
              _initMouseHandling: function () {
                j = null, k = null;
                var a = null, c = null, f = {
                    moved: function (a) {
                      var f = $(e).offset();
                      return l = arbor.Point(a.pageX - f.left, a.pageY - f.top), k = h.nearest(l), k && k.node ? ('dot' !== k.node.data.shape ? (j = k.distance < 50 ? k : null, j ? (d.addClass('linkable'), j.node.data && j.node.data.link && (window.status = j.node.data.link.replace(/^\//, 'http://' + window.location.host + '/').replace(/^#/, ''))) : (d.removeClass('linkable'), window.status = '')) : $.inArray(k.node.name, b) >= 0 && (k.node.name !== c && (c = k.node.name, m.switchSection(c)), d.removeClass('linkable'), window.status = ''), !1) : !1;
                    },
                    clicked: function (b) {
                      var c = $(e).offset();
                      if (l = arbor.Point(b.pageX - c.left, b.pageY - c.top), k = a = h.nearest(l), k && j && k.node === j.node) {
                        var d = j.node.data.link;
                        return d && (d.match(/^#/) ? $(m).trigger({
                          type: 'navigate',
                          path: d.substr(1)
                        }) : window.location = d), !1;
                      }
                      return a && null !== a.node && (a.node.fixed = !0), $(e).unbind('mousemove', f.moved), $(e).bind('mousemove', f.dragged), $(window).bind('mouseup', f.dropped), !1;
                    },
                    dragged: function (b) {
                      var c = $(e).offset(), d = arbor.Point(b.pageX - c.left, b.pageY - c.top);
                      if (k) {
                        if (null !== a && null !== a.node) {
                          var f = h.fromScreen(d);
                          a.node.p = f;
                        }
                        return !1;
                      }
                    },
                    dropped: function () {
                      return null !== a && void 0 !== a.node ? (null !== a.node && (a.node.fixed = !1), a.node.tempMass = 1000, a = null, $(e).unbind('mousemove', f.dragged), $(window).unbind('mouseup', f.dropped), $(e).bind('mousemove', f.moved), l = null, !1) : void 0;
                    }
                  };
                $(e).mousedown(f.clicked), $(e).mousemove(f.moved);
              }
            };
          return m;
        }
      };
    return c;
  }]), FirstRevenueApp.factory('StickerEditor', [
  '$window',
  '$log',
  'Layout',
  'Firebase',
  'Rainbow',
  'BMG',
  function (a, b, c, d, e, f) {
    return {
      active: !1,
      block: null,
      stickerId: null,
      sticker: null,
      rainbow: e,
      firebase: d,
      bmg: f,
      purpose: '',
      showSticker: function (a, b, d) {
        console.log('StickerEditor showSticker model=', a, 'blockId=', b, 'stickerId=', d);
        var e = this;
        this.active = !0, 0 === d ? this.sticker = {
          title: '',
          notes: '',
          block: b,
          color: 'yellow'
        } : (this.stickerId = d, this.sticker = a.stickers[d]), c.editor.sticker = !0, this.purpose = this.bmg.getBlockPurpose(b), setTimeout(function () {
          e.focusTitle();
        }, 0);
      },
      setColor: function (a) {
        this.sticker.color = a;
      },
      checkModelRights: function (a) {
        return console.log('StickerEditor checkModelRights rightName=', a), !0;
      },
      matchTitle: function () {
        var a = this.sticker;
        return a && a.shadow ? a.shadow.title === a.title : !0;
      },
      matchNotes: function () {
        var a = this.sticker;
        return a && a.shadow ? a.shadow.notes === a.notes : !0;
      },
      matchColor: function () {
        var a = this.sticker;
        return a && a.shadow && a.color ? a.shadow.color === a.color.name : !0;
      },
      wasStickerModified: function () {
        return !(this.matchTitle() && this.matchNotes() && this.matchColor());
      },
      focusTitle: function () {
        var a = $('.field-title').get(0);
        a && this.placeCaretAtEnd(a);
      },
      placeCaretAtEnd: function (b) {
        if (b.focus(), 'undefined' != typeof a.getSelection && 'undefined' != typeof a.document.createRange) {
          var c = a.document.createRange();
          c.selectNodeContents(b), c.collapse(!1);
          var d = a.getSelection();
          d.removeAllRanges(), d.addRange(c);
        } else if ('undefined' != typeof a.document.body.createTextRange) {
          var e = a.document.body.createTextRange();
          e.moveToElementText(b), e.collapse(!1), e.select();
        }
      }
    };
  }
]), FirstRevenueApp.factory('ModelEditor', [
  'Canvas',
  function (a) {
    return {
      model: null,
      shadow: {
        name: null,
        icon: null,
        descr: null,
        pitch: null
      },
      wasModelModified: function () {
        return !0;
      },
      matchModelDescr: function (b) {
        var c = a.model.label;
        if (c) {
          var d = _.find(b.fields, function (a) {
              return 'Notes' === a.label;
            });
          if (d) {
            var e = d.values[0].value;
            return e === b.notes;
          }
          return '' === b.notes;
        }
        return !0;
      }
    };
  }
]), FirstRevenueApp.factory('Auth', [
  '$rootScope',
  '$location',
  '$resource',
  '$q',
  'Firebase',
  'Myself',
  'Singly',
  function (a, b, c, d, e, f, g) {
    var h = 'Auth';
    return console.log(h, 'service launched'), {
      deferred: null,
      rememberMe: !0,
      accepted: !1,
      launchLogon: function (a, b) {
        switch (console.log('Auth.launchLogon method=', a, 'provider=', b), f.error = null, a) {
        case 'simple':
          this.accepted = !0;
          var c = { rememberMe: this.rememberMe };
          switch (b) {
          case 'password':
            c.email = f.email, c.password = f.password;
            break;
          case 'facebook':
            c.scope = 'email';
            break;
          case 'github':
            c.scope = 'user:email';
          }
          e.authClient.login(b, c);
          break;
        case 'singly':
          this.accepted = !0, this.launchSinglyAuth(b);
          break;
        default:
          console.log('Auth.launchLogon unknown method=', a);
        }
      },
      signupPasswordAuth: function () {
        console.log('Auth.signupPasswordAuth email=', f.email, 'password=', f.password), e.authClient.createUser(f.email, f.password, function (a, b) {
          console.log('Auth.signupPasswordAuth email=', f.email, 'password=', f.password), a ? console.log('Auth.signupPasswordAuth error=', a) : (console.log('Auth.signupPasswordAuth success user id=', b.id, 'email', f.email), e.authClient.login('password', {
            email: f.email,
            password: f.password,
            rememberMe: !0
          }));
        });
      },
      launchPasswordAuth: function () {
        console.log('Auth.launchPasswordAuth email=', f.email, 'password=', f.password), e.authClient.login('password', {
          email: f.email,
          password: f.password,
          rememberMe: !0
        });
      },
      launchFacebookAuth: function () {
        console.log('Auth.launchFacebookAuth'), e.authClient.login('facebook', {
          rememberMe: !0,
          scope: 'email'
        });
      },
      launchTwitterAuth: function () {
        console.log('Auth.launchTwitterAuth'), e.authClient.login('twitter', { rememberMe: !0 });
      },
      launchPersonaAuth: function () {
        console.log('Auth.launchPersonaAuth'), e.authClient.login('persona', { rememberMe: !0 });
      },
      launchGithubAuth: function () {
        console.log('Auth.launchGithubAuth'), e.authClient.login('github', {
          rememberMe: !0,
          scope: 'user:email'
        });
      },
      launchSinglyAuth: function (a, b) {
        console.log('Auth.launchSinglyAuth service=', a), g.launchAuth(a, e.rootRef, b || e.generalAuth);
      },
      changePassword: function () {
        console.log('Auth.changePassword', 'email=', f.email, 'oldPassword=', f.password, 'newPassword=', f.newPassword), e.authClient.changePassword(f.email, f.password, f.newPassword, function (a, b) {
          console.log('Auth.changePassword done error=', a, 'success=', b), a ? console.log('Auth.changePassword error=', a) : console.log('Auth.changePassword success=', b);
        });
      }
    };
  }
]), FirstRevenueApp.factory('Credentials', [
  '$timeout',
  'Firebase',
  'Myself',
  '$q',
  function (a, b, c, d) {
    var e = 'Credentials';
    console.log(e, 'Service launched');
    var f = c.mp, g = {
        deferred: null,
        fb: b,
        fbAuthClient: null,
        fbUser: null,
        providers: b.providers,
        init: function (a) {
          console.log(e, 'init'), g.fbAuthClient = a;
        },
        saveChanges: function () {
          console.log(e, 'saveChanges', 'userId=', c.userId), g.mapRef = g.fb.rootRef.child('usermap'), g.accRef = g.fb.rootRef.child('users'), c.userId ? (g.recRef = g.accRef.child(c.userId), console.log(e, 'saveChanges uses existing user for recRef')) : (g.recRef = g.accRef.push(), c.userId = g.recRef.name(), console.log(e, 'saveChanges creates new user for recRef userId=', c.userId)), g.loadCred(f.firstCred).then(g.recurseCred);
        },
        loadCred: function (a) {
          console.log(e, 'loadCred', 'cred=', a);
          var b = d.defer();
          return a.detached ? g.deleteCred(a, b) : g.processCred(a, b), b.promise;
        },
        recurseCred: function (a) {
          console.log(e, 'recurseCred', 'cred=', a), a ? g.loadCred(a).then(g.recurseCred) : g.doneCred();
        },
        deleteCred: function (a, b) {
          console.log(e, 'deleteCred', 'cred=', a);
          var d = a.profile;
          f.primaryToken === a.token && (f.primaryToken = f.firstCred ? f.firstCred.token : null), f.deleteAccount(d, a), console.log(e, 'deleteCred', 'profile.provider=', d.provider, 'profile.id=', d.id);
          var h = g.mapRef.child(d.provider).child(d.id);
          g.fb.rootRef.auth(a.token, function (d) {
            d ? g.mapSetAuthError(b, d) : h && (console.log(e, 'deleteCred', 'setUserMap mapUserRef found, userId=', c.userId), g.removeUserMap(b, h, a));
          });
        },
        processCred: function (a, b) {
          console.log(e, 'processCred', 'cred=', a, 'deferred=', b);
          var d = a.profile;
          f.primaryToken || (f.primaryToken = a.token), f.storeAccount(d, a), console.log(e, 'processCred', 'profile.provider=', d.provider, 'profile.id=', d.id);
          var h = g.mapRef.child(d.provider).child(d.id);
          g.fb.rootRef.auth(a.token, function (d) {
            d ? g.mapSetAuthError(b, d) : h && (console.log(e, 'processCred', 'setUserMap mapUserRef found, userId=', c.userId), g.setUserMap(b, h, a));
          });
        },
        removeUserMap: function (b, c, d) {
          c.remove(function (c) {
            c ? (console.log(e, 'removeUserMap user map set error=', c), a(function () {
              b.reject(c);
            })) : (console.log(e, 'removeUserMap user map record removed, cred.next=', d.next), a(function () {
              b.resolve(d.next);
            }));
          });
        },
        setUserMap: function (b, d, f) {
          d.set(c.userId, function (c) {
            c ? (console.log(e, 'setUserMap user map set error=', c), a(function () {
              b.reject(c);
            })) : (console.log(e, 'setUserMap user map record created, cred.next=', f.next), a(function () {
              b.resolve(f.next);
            }));
          });
        },
        mapSetAuthError: function (b, c) {
          'EXPIRED_TOKEN' === c.code ? console.log(e, 'mapSetAuthError error=', c, 'Processing expired token') : (console.log(e, 'mapSetAuthError', 'user map set auth failed error=', c), a(function () {
            b.reject(c);
          }));
        },
        doneCred: function () {
          console.log(e, 'doneCred primaryToken=', f.primaryToken), f.primaryToken ? g.fb.rootRef.auth(f.primaryToken, function (a) {
            a ? console.log(e, 'doneCred', 'user account set auth failed error=', a) : g.recRef.set(c.mp.user, g.doneCredSet);
          }) : console.log(e, 'doneCred', 'primaryToken not found');
        },
        doneCredSet: function (b) {
          a(function () {
            if (b)
              console.log(e, 'doneCred user account set error=', b);
            else {
              console.log(e, 'doneCred user account record created');
              var a = c.mp.user.primary, d = c.mp.user.accounts[a].authentic;
              'singly' === d.provider ? console.log(e, 'doneCred provider singly authUser=', d) : (console.log(e, 'doneCred openSession authUser=', d), d.sessionKey = d.firebaseSessionKey, g.fbAuthClient.saveSession(f.primaryToken, d), c.authenticated = !0), g.fb.openSession(g.recRef.name(), d), c.mp.user = null;
            }
          });
        }
      };
    return g;
  }
]), FirstRevenueApp.factory('Invite', [
  '$timeout',
  '$resource',
  '$location',
  '$q',
  'Firebase',
  'Auth',
  'Myself',
  function (a, b, c, d, e, f, g) {
    var h = 'Invite';
    console.log(h, 'Service launched');
    var i = [
        'facebook',
        'twitter',
        'github'
      ], j = [
        'linkedin',
        'google',
        'gplus',
        'gmail',
        'gcontacts'
      ], k = {
        deferred: null,
        fb: e,
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
        res: b,
        inviteId: null,
        inviteValue: null,
        inviteRef: null,
        setInvite: function (a, b) {
          console.log(h, 'setInvite id=', a), k.inviteId = a, b.then(function (b) {
            console.log(h, 'setInvite then id=', a, 'v=', b), k.inviteValue = b;
          });
        },
        ignoreInvite: function () {
          console.log(h, 'ignoreInvite'), e.generalAuth(null, g.getLastUser());
        },
        abandonSession: function () {
          console.log(h, 'abandonSession'), e.authClient.clearSession(), e.rootRef.unauth();
        },
        acceptInvite: function (a) {
          console.log(h, 'acceptInvite', 'service=', a), k.abandonSession(), k.authenticateInvite(a).then(k.inviteAuthenticated).then(k.inviteAuthorized).then(k.inviteExisting).then(k.userFetched).then(k.processInvite).then(k.doneInvite).then(k.createNewUser).then(k.updateInviteRecord).then(k.saveSession).then(k.inviteModels).then(k.attachModelsToUser).then(k.finishInvite, k.inviteFailed);
        },
        rejectResolve: function (b, c, d, e) {
          if (b) {
            var f = e || b;
            console.log(h, 'rejectResolve', 'rejecting error=', f), c.reject(f);
          } else
            'function' == typeof d ? (console.log(h, 'rejectResolve', 'calling success'), d()) : (console.log(h, 'rejectResolve', 'resolving success=', d), a(function () {
              c.resolve(d);
            }));
        },
        authenticateInvite: function (a) {
          var b = d.defer();
          if (_.contains(i, a)) {
            var c = k.providers[a].scope, e = { rememberMe: !0 };
            c && (e.scope = c), console.log(h, 'authenticateInvite', 'Firebase service scope=', c, 'options=', e), k.fb.authClient.launchAuthWindow(a, e, function (a, c, d) {
              k.rejectResolve(a, b, function () {
                d.firebaseAuthToken = c, k.cbInvite(b, d);
              });
            });
          } else
            _.contains(j, a) && (console.log(h, 'authenticateInvite', 'Singly service'), console.log(h, 'authenticateInvite', '$timeout call Auth.launchSinglyAuth'), f.launchSinglyAuth(a, function (a, c) {
              k.rejectResolve(a, b, function () {
                k.cbInvite(b, c);
              });
            }));
          return b.promise;
        },
        cbInvite: function (b, c) {
          console.log(h, 'cbInvite', 'Invite=', k, 'user=', c), c ? (console.log(h, 'cbInvite', 'resolving ivUser=', c), a(function () {
            b.resolve(c);
          })) : (console.log(h, 'cbInvite', 'null user'), g.authFailed = !0, b.reject('Authentication failed'));
        },
        inviteAuthenticated: function (a) {
          var b = d.defer();
          g.authFailed = !0;
          var c = k.inviteValue.status;
          switch (c) {
          case 'created':
            b.reject('App error. This invite was not activated yet.');
            break;
          case 'sent':
            k.inviteMatch(a) ? g.authFailed = !1 : b.reject('The invite was addressed to another user.');
            break;
          case 'accepted':
            k.inviteMatch(a) ? (console.log(h, 'inviteAuthenticated', 'invite already accepted by yourself'), g.authFailed = !1) : b.reject('The invite was already accepted, it was addressed to another user.');
            break;
          default:
            b.reject('App error. Unknown invite status=', c);
          }
          return g.authFailed || (console.log(h, 'inviteAuthenticated', 'sessionKey=', a.sessionKey), a.firebaseSessionKey = a.sessionKey || null, k.fb.rootRef.auth(a.firebaseAuthToken, function (c) {
            k.rejectResolve(c, b, a);
          })), b.promise;
        },
        inviteAuthorized: function (b) {
          var c = d.defer();
          console.log(h, 'inviteAuthorized', 'ivUser=', b);
          var e = k.fb.rootRef.child('usermap'), f = e.child(b.provider).child(b.id);
          return f.once('value', function (d) {
            console.log(h, 'inviteAuthorized', 'mapUserRef once value=', d.val()), b.mapValue = d.val(), a(function () {
              c.resolve(b);
            });
          }), c.promise;
        },
        inviteMatch: function (a) {
          var b = k.inviteValue;
          return 'singly' === a.provider ? a.service === b.service && a.services[a.service].id === b.serviceId : a.provider === b.service && a.id === b.serviceId;
        },
        inviteExisting: function (b) {
          var c = d.defer();
          if (console.log(h, 'inviteExisting', 'mapValue=', b.mapValue, 'ivUser=', b), b.mapValue) {
            console.log(h, 'inviteExisting', 'found usermap for user', b.provider + '/' + b.id, 'value=', b.mapValue);
            var e = k.fb.rootRef.child('users').child(b.mapValue);
            e.once('value', function (d) {
              var f = d.val();
              console.log(h, 'inviteExisting', 'userRecordRef once value userRecord=', f), a(function () {
                b.record = f, k.recRef = e, k.userId = d.name(), k.fbUser = b, c.resolve(b);
              });
            }, function (a) {
              console.log(h, 'inviteExisting', 'userRecordRef once value error=', a), c.reject(a);
            });
          } else
            c.resolve(b);
          return c.promise;
        },
        userFetched: function (a) {
          console.log(h, 'userFetched', 'ivUser=', a);
          var b = d.defer(), c = a.record;
          return c ? k.inviteRef.update({
            status: 'accepted',
            userId: k.userId,
            profile: c.profile
          }, function (c) {
            c ? b.reject(c) : (k.fbUser = a, console.log(h, 'userFetched', 'create promise chain shortcut to finish'), k.inviteModels().then(k.attachModelsToUser).then(k.finishInvite, k.inviteFailed), console.log(h, 'userFetched', 'abandon the main promise chain'), b.reject({
              code: 'EXISTING_USER_FOUND',
              message: 'An existing user found'
            }));
          }) : k.createInvitedUser(b, a), b.promise;
        },
        createInvitedUser: function (a, b) {
          if (console.log(h, 'createInvitedUser', 'ivUser=', b), b) {
            var c = g.mp.storeInviteCredentials(b);
            k.mapRef = k.fb.rootRef.child('usermap'), k.accRef = k.fb.rootRef.child('users'), k.recRef = k.accRef.push(), k.userId = k.recRef.name(), k.fbUser = b, a.resolve(c);
          } else
            a.reject({
              code: 'NO_USER',
              message: 'No authenticated user passed to createInvitedUser'
            });
        },
        processInvite: function (a) {
          var b = d.defer();
          console.log(h, 'doneInvite cred=', a), k.primaryToken = a.token;
          var c = a.profile;
          g.mp.storeAccount(c, a);
          var e = k.mapRef.child(c.provider).child(c.id);
          return console.log(h, 'processInvite', 'profile.provider=', c.provider, 'profile.id=', c.id), k.fb.rootRef.auth(a.token, function (c) {
            c ? (console.log(h, 'processInvite', 'user map set auth failed error=', c), b.reject(c)) : e && (console.log(h, 'processInvite', 'setUserMap mapUserRef found, userId=', k.userId), e.set(k.userId, function (c) {
              k.rejectResolve(c, b, a);
            }));
          }), b.promise;
        },
        doneInvite: function (a) {
          var b = d.defer();
          console.log(h, 'doneInvite cred=', a), k.primaryToken = a.token;
          var c = a.profile;
          return g.mp.storeAccount(c, a), k.primaryToken && k.fb.rootRef.auth(k.primaryToken, function (c) {
            console.log(h, 'createNewUser user account set error=', c, 'cred=', a), k.rejectResolve(c, b, a);
          }), b.promise;
        },
        createNewUser: function (a) {
          var b = d.defer();
          return g.mp.user.inviteId = k.inviteId, k.recRef.set(g.mp.user, function (c) {
            console.log(h, 'createNewUser user account set error=', c, 'cred=', a), k.rejectResolve(c, b, a);
          }), b.promise;
        },
        updateInviteRecord: function (a) {
          console.log(h, 'updateInviteRecord cred=', a);
          var b = d.defer(), c = {
              status: 'accepted',
              userId: k.userId
            };
          return console.log(h, 'saveSession inviteUpdate=', c, 'cred=', a), k.inviteRef.update(c, function (c) {
            console.log(h, 'saveSession invite profile stored error=', c), k.rejectResolve(c, b, a);
          }), b.promise;
        },
        saveSession: function (a) {
          var b = d.defer();
          console.log(h, 'saveSession cred=', a), console.log(h, 'saveSession user account record created');
          var c = g.mp.user.primary, e = g.mp.user.accounts[c].authentic;
          return 'singly' === e.provider ? console.log(h, 'saveSession provider singly authUser=', e) : (console.log(h, 'saveSession openSession authUser=', e), k.fb.authClient.saveSession(k.primaryToken, e), g.authenticated = !0, k.inviteValue.models ? console.log(h, 'saveSession models=', k.inviteValue.models) : console.log(h, 'saveSession no models'), b.resolve(null)), console.log(h, 'saveSession returning promise=', b.promise), b.promise;
        },
        inviteModels: function () {
          console.log(h, 'inviteModels userId=', k.userId);
          var a = _.keys(k.inviteValue.models || {});
          console.log(h, 'inviteModels modelIds=', a);
          var b = [];
          return _.each(a, function (a) {
            console.log(h, 'inviteModels modelId=', a);
            var c = k.fb.rootRef.child('models').child(a), e = d.defer();
            b.push(e.promise), console.log(h, 'inviteModels setting userId=', k.userId), c.child('users').child(k.userId).set(k.inviteId, function (b) {
              console.log(h, 'inviteModels user userId=', k.userId, 'added to model modelId=', a), k.rejectResolve(b, e, c.name());
            });
          }), d.all(b);
        },
        attachModelsToUser: function (a) {
          var b = d.defer();
          console.log(h, 'attachModelsToUser modelIds=', a);
          var c = {};
          return _.each(a, function (d) {
            c[d] = !0, k.recRef.child('models').update(c, function (c) {
              k.rejectResolve(c, b, a);
            });
          }), b.promise;
        },
        finishInvite: function (a) {
          console.log(h, 'finishInvite modelIds=', a), k.completed = !0;
          var b = null;
          1 === _.size(a) && (b = a[0], k.modelId = b), c.path('/repo'), e.openSession(k.userId, k.fbUser);
        },
        inviteFailed: function (b) {
          console.log(h, 'inviteFailed error=', b), a(function () {
            k.error = { message: b };
          });
        }
      };
    return k;
  }
]), FirstRevenueApp.factory('Register', [
  '$timeout',
  '$resource',
  '$q',
  'Firebase',
  'Auth',
  'Myself',
  function (a, b, c, d, e, f) {
    var g = 'Register';
    console.log(g, 'Service launched');
    var h = f.mp, i = {
        deferred: null,
        fb: d,
        fbAuthClient: null,
        fbUser: null,
        providers: d.providers,
        res: b,
        init: function () {
          console.log(g, 'init'), i.fb.clearSession(), i.fbAuthClient = new FirebaseSimpleLogin(i.fb.rootRef, i.cbVerify), h.services = {}, h.credentials = {};
          var a = h.getLastUser();
          return a && (console.log(g, 'init attaching the last user firebaseSessionKey=', a.firebaseSessionKey), i.cbVerify(null, a)), i.fbAuthClient;
        },
        unusedProviders: function () {
          return _.omit(i.providers, _.keys(h.services));
        },
        attach: function (a, b, c) {
          f.error = null, console.log(g, 'attach service=', a);
          var d = h.credentials[a];
          if (d && d.detached)
            console.log(g, 'attach - re-attach service=', a), d.detached = !1, h.services[a] = d.services[a];
          else if (h.isSameUser(a))
            console.log(g, 'attach - same user found for service=', a), i.cbVerify(null, h.getLastUser());
          else {
            var j = i.fb.providers[a].method;
            switch (j) {
            case 'simple':
              i.attachSimple(a, b, c);
              break;
            case 'singly':
              e.launchSinglyAuth(a, i.cbVerify);
              break;
            default:
              console.log(g, 'Unsupported auth method=', j);
            }
          }
        },
        attachSimple: function (a, b, c) {
          switch (a) {
          case 'persona':
            i.personaLogin();
            break;
          case 'password':
            i.sendAuthRequest('/auth/firebase', {
              email: b,
              password: c
            });
            break;
          default:
            var d = i.providers[a].scope, e = { rememberMe: !0 };
            d && (e.scope = d), i.fbAuthClient.launchAuthWindow(a, e, i.cbVerify3);
          }
        },
        detach: function (a) {
          var b = h.credentials[a];
          console.log(g, 'detach key=', a), b && (b.detached = !0), delete h.services[a];
        },
        personaLogin: function () {
          var a = i.handlePersonaResponse;
          console.log(g, 'personaLogin'), navigator.id.watch({
            onlogin: function (b) {
              console.log(g, 'personaLogin onlogin assertion=', b), a(b);
            },
            onlogout: function () {
              console.log(g, 'personaLogin onlogout');
            }
          }), navigator.id.request({
            oncancel: function () {
              console.log(g, 'personaLogin oncancel'), a(null);
            }
          });
        },
        handlePersonaResponse: function (a) {
          console.log(g, 'handlePersonaResponse authResponse=', a), null === a ? i.cbVerify(i.fbAuthClient.formatError({
            code: 'UNKNOWN_ERROR',
            message: 'User denied authentication request or an error occurred.'
          })) : i.sendAuthRequest('/auth/persona/authenticate', { assertion: a });
        },
        sendAuthRequest: function (a, b) {
          console.log(g, 'sendAuthRequest url=', a, 'json=', b), i.fbAuthClient.jsonp(a, b, function (a, b) {
            console.log(g, 'sendAuthRequest jsonp callback error=', a, 'response=', b), a || !b.token ? i.cbVerify(i.fbAuthClient.formatError(a)) : (i.fbUser = b.user, i.fbUser.firebaseAuthToken = i.fbUser.firebaseAuthToken || b.token, i.cbVerify(null, i.fbUser));
          });
        },
        cbVerify3: function (a, b, c) {
          c.firebaseAuthToken = b, i.cbVerify(a, c);
        },
        cbVerify: function (a, b) {
          console.log(g, 'cbVerify', 'Register=', i, ' error=', a, 'user=', b), a ? i.reportLaunchError(a) : b && (console.log(g, 'cbVerify', 'sessionKey=', b.sessionKey), b.sessionKey ? b.firebaseSessionKey = b.sessionKey || null : b.sessionKey = b.firebaseSessionKey || null, i.fb.rootRef.auth(b.firebaseAuthToken, function (a) {
            if (a)
              i.reportLaunchError(a);
            else {
              console.log(g, 'cbVerify', 'user.provider=', b.provider);
              var c = i.fb.rootRef.child('usermap'), d = c.child(b.provider).child(b.id);
              d.once('value', function (a) {
                console.log(g, 'cbVerify', 'mapUserRef once value=', a.val()), i.checkExisting(a, b);
              });
            }
          }));
        },
        checkExisting: function (a, b) {
          var c = a.val();
          if (console.log(g, 'checkExisting', 'mapUserId=', c, 'fbUser=', b), c) {
            console.log(g, 'checkExisting', 'found usermap for user', b.provider + '/' + b.id, 'mapUserId=', c);
            var d = i.fb.rootRef.child('users').child(c);
            d.once('value', function (d) {
              var e = d.val();
              console.log(g, 'checkExisting', 'userRecordRef once mapUserId userRecord=', e), e ? (h.retrieveUserRecord(e, b.firebaseAuthToken), f.userId = c) : (h.buildServiceCredentials(b), a.ref().remove(function (a) {
                a ? console.log(g, 'checkExisting', 'Orphan user map entry for mapUserId=', c, 'could not be deleted err=', a) : console.log(g, 'checkExisting', 'Orphan user map entry deleted for mapUserId=', c);
              }));
            }, function (a) {
              console.log(g, 'checkExisting', 'userRecordRef once mapUserId error=', a), f.authFailed = !0;
            });
          } else
            console.log(g, 'checkExisting', 'mapUserId null - build credentials'), h.buildServiceCredentials(b);
        },
        reportLaunchError: function (a) {
          console.log(g, 'reportLaunchError', 'launchError=', a), f.authFailed = !0, f.error = 'unknown closed window' === a ? {
            code: 'WINDOW_CLOSED',
            message: 'Authentication window has been closed'
          } : angular.isString(a) ? {
            code: 'UNKNOWN_ERROR',
            message: a
          } : a;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('Singly', [
  '$rootScope',
  '$timeout',
  '$resource',
  'JWT',
  function (a, b, c, d) {
    var e = 'Singly';
    console.log(e, 'service launched');
    var f = 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375', g = 'https://api.singly.com/services/:service/:endpoint?limit=:limit&access_token=:token', h = 'https://api.singly.com/profile?access_token=:token', i = {
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
      }, j = {
        clientId: CONFIG_1ST_REVENUE.singlyClientId,
        accessToken: null,
        data: null,
        logoff: function () {
          j.accessToken = null;
        },
        buildErrorAccount: function (a, b) {
          var c = null, d = a.services[b];
          return d && (c = {
            name: a.name,
            service: b,
            id: d.id,
            image: a.thumbnail_url
          }), c;
        },
        launchAuth: function (a, b, c) {
          console.log(e, 'launchAuth service=', a);
          var g = window.location.origin || window.location.protocol + '//' + window.location.host, h = g + window.location.pathname + 'views/', k = {
              client_id: j.clientId,
              redirect_uri: h + 'SinglyRedirect.html',
              service: a,
              response_type: 'token'
            };
          j.accessToken, 'linkedin' === a ? k.scope = 'r_basicprofile r_emailaddress r_network w_messages' : 'gplus' === a ? k.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email' : 'gcontacts' === a && (k.scope = 'https://www.google.com/m8/feeds/'), console.log(e, 'launchAuth Opening WinChan params=', k), WinChan.open({
            url: h + 'SinglyLaunch.html',
            relay_url: h + 'WinChanRelay.html',
            window_features: f,
            params: k
          }, function (f, g) {
            if (console.log(e, 'launchAuth', 'error=', f, 'response=', g), f)
              console.log(e, 'launchAuth', 'error=', f), c(f);
            else {
              console.log(e, 'launchAuth', 'response=', g), j.accessToken = g.access_token;
              var h = d.decodeJWT(g.firebase);
              console.log(e, 'launchAuth', 'singlyFirebase=', h), j.getProfile(g.access_token, function (d) {
                console.log(e, 'launchAuth', 'Profile.get p=', d), b.auth(g.firebase, function (b, f) {
                  if (b) {
                    console.log(e, 'Login Failed!', b);
                    var h = j.buildErrorAccount(d, a);
                    c({
                      code: b.code,
                      message: h.service + ' user ' + h.name + ' (id=' + h.id + ') not found in 1st Revenue',
                      user: h
                    }, f);
                  } else
                    console.log(e, 'Login Succeeded! account=', f), j.processProfile(a, g, d, f, c);
                });
              }), j.getData(a, g.access_token, i[a], function (a) {
                console.log(e, 'launchAuth data=', a), _.each(a, function (a) {
                  console.log(e, 'launchAuth getData element=', a);
                });
              }, function (a) {
                console.log(e, 'launchAuth getData error=', a);
              });
            }
          });
        },
        getProfile: function (b, d) {
          console.log(e, 'getProfile token=', b);
          var f = c(h, { token: b });
          console.log(e, 'getProfile profileURL=', h), f.get(d, j.requestError), a.$$phase || a.$apply();
        },
        processProfile: function (a, b, c, d, f) {
          var g = CryptoJS.MD5(b.firebase).toString(CryptoJS.enc.Hex), h = {
              provider: 'singly',
              token: b.access_token,
              firebaseAuthToken: b.firebase,
              sessionKey: g,
              id: d.auth.account,
              service: a,
              expires: d.expires,
              name: c.name || null,
              email: c.email || null,
              url: c.url || null,
              handle: c.handle || null,
              thumbnail_url: c.thumbnail_url || null,
              services: c.services || null
            };
          console.log(e, 'processProfile acc=', h), f(null, h);
        },
        getData: function (b, d, f, h, i) {
          console.log(e, 'getData service=', b, 'token=', d, 'endpoint=', f);
          var k = h || j.processData, l = c(g, {
              service: b,
              token: d,
              endpoint: f,
              limit: 20
            });
          j.data = l.query(k, i || j.requestError), a.$$phase || a.$apply();
        },
        processData: function () {
          _.each(j.data, j.processElement);
        },
        processElement: function (a) {
          console.log(e, 'processElement element=', a);
        },
        requestError: function (a) {
          console.log(e, 'requestError error=', a);
        }
      };
    return j;
  }
]), FirstRevenueApp.factory('Myself', [
  '$location',
  '$timeout',
  '$route',
  'Sync',
  'MyModels',
  'MyProfile',
  'Social',
  function (a, b, c, d, e, f, g) {
    var h = 'Myself';
    console.log(h, 'service launched');
    var i = e, j = {
        rootRef: null,
        userRef: null,
        adminRef: null,
        publicRef: null,
        userId: null,
        provider: null,
        providerId: null,
        serviceId: null,
        authenticated: !1,
        authFailed: !1,
        error: null,
        adminRole: !1,
        email: null,
        password: null,
        newPassword: null,
        sync: d,
        mp: f,
        social: g,
        models: i.models,
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
        init: function (a) {
          console.log(h, 'init'), j.originalPath = a;
        },
        wakeup: function (a, b, c) {
          console.log(h, 'wakeup'), j.rootRef = a, j.userId = b, j.userRef = a.child('users').child(b), j.publicRef = a.child('public'), j.adminRef = a.child('admin').child(b), j.authenticated = !0, j.authFailed = !1, i.init(a, j.userRef), j.sync.angularFire(j.userRef, 'sync.user').then(j.collectUserData), j.sync.angularFire(j.publicRef, 'sync.public').then(j.collectPublicData), j.connTracking(a, b), j.selectedModelId = c || null, j.social.reset();
        },
        collectUserData: function (a) {
          console.log(h, 'wakeup userPromise resolved syncUserReady=', a), i.collectModels(j.userRef.child('models'), !1), a.value.admin === !0 && j.sync.angularFire(j.adminRef, 'sync.admin.status').then(j.collectAdminData), j.navigateInitialView();
        },
        collectPublicData: function (a) {
          console.log(h, 'wakeup publicPromise resolved syncPublic=', a), i.collectModels(j.publicRef.child('models'), !0);
        },
        collectAdminData: function (a) {
          console.log(h, 'wakeup adminPromise resolved syncAdminReady=', a);
        },
        logoff: function () {
          console.log(h, 'logoff'), i.logoff(), d.logoff(), j.userRef = null, j.userId = null;
        },
        authError: function (a) {
          console.log(h, 'authError error=', a), j.authenticated = !1, j.authFailed = !0, a && a.code && (j.error = a);
        },
        processInvite: function (a) {
          console.log(h, 'processInvite'), j.sessionFound = a, b(function () {
            console.log(h, 'processInvite $timeout calls $route.reload()'), c.reload();
          });
        },
        myDataValue: function (a) {
          j.user = a.val(), console.log(h, 'myDataValue me.user=', j.user), i.collectModels(j.userRef), i.collectModels(j.rootRef.child('public')), j.navigateInitialView();
        },
        navigateInitialView: function () {
          b(function () {
            j.modelsLoaded = !0, a.path(j.selectedModelId ? '/canvas/' + j.selectedModelId : '/home');
          });
        },
        dataCancel: function (c) {
          console.log(h, 'dataCancel error=', c), b(function () {
            a.path('/entry');
          });
        },
        isMyself: function (a) {
          return a === j.userId;
        },
        isOnline: function (a) {
          return j.sync.peerPresence[a] < -1;
        },
        connTracking: function (a, c) {
          var d = a.child('presence').child(c), e = a.child('.info/connected');
          e.on('value', function (a) {
            j.connected = a.val(), j.connected && b(function () {
              d.onDisconnect().set(Firebase.ServerValue.TIMESTAMP), d.set(-Date.now());
            }), console.log(h, 'connTracking connRef .info/connected connRef=', e, 'me.connected=', j.connected, 'me.connStatus=', j.connStatus());
          });
        },
        connStatus: function () {
          return j.connected ? 'Connected' : 'Offline';
        },
        modelCount: function () {
          return _.size(j.sync.user.models);
        },
        getAccounts: function () {
          return j.sync.user.accounts;
        },
        getContacts: function (a) {
          console.log(h, 'getContacts accountId=', a);
          var b = {};
          return a ? j.getAccountContacts(b, j.sync.user.accounts[a]) : _.each(j.sync.user.accounts, function (a) {
            j.getAccountContacts(b, a);
          }), b;
        },
        getAccountContacts: function (a, b) {
          if (b) {
            var c = b.profile.service;
            _.each(b.contacts.partners, function (b, d) {
              a[c + '-' + d] = b;
            });
          }
        },
        getSocialContacts: function (a) {
          return console.log(h, 'getContacts accountId=', a), j.getContacts(a);
        },
        toggleContact: function (a) {
          var b = j.getContactKey(a);
          j.currentModel.users[b] ? delete j.currentModel.users[b] : j.currentModel.users[b] = a;
        },
        wasContactSelected: function (a) {
          return console.log(h, 'wasContactSelected contact=', a), j.currentModel ? !!j.currentModel.users[j.getContactKey(a)] : {};
        },
        getContactKey: function (a) {
          return a.service + '-' + a.id;
        },
        inviteUsers: function () {
        },
        peerCount: function () {
          return _.size(j.getContacts());
        },
        findAccount: function (a) {
          return _.find(j.sync.user.accounts, function (b) {
            return b.profile.service === a;
          }) || {};
        }
      };
    return j;
  }
]), FirstRevenueApp.factory('MyProfile', [
  '$timeout',
  'TProfile',
  function (a, b) {
    var c = 'MyProfile';
    console.log(c, 'service loaded');
    var d = {
        lastUser: null,
        user: null,
        credentials: {},
        primaryToken: null,
        services: {},
        firstCred: null,
        lastCred: null,
        getLastUser: function () {
          return d.lastUser;
        },
        setLastUser: function (a) {
          d.lastUser = a;
        },
        clearLastUser: function () {
          d.lastUser = null;
        },
        isSameUser: function (a) {
          var c = d.lastUser ? new b(d.lastUser) : null;
          return c && c.service === a;
        },
        getService: function () {
          return 'singly' === d.lastUser.provider ? d.lastUser.service : d.lastUser.provider;
        },
        getServiceId: function () {
          return 'singly' === d.lastUser.provider ? d.lastUser.services[d.lastUser.service].id : d.lastUser.id;
        },
        wasCurrentUserInvited: function (a) {
          return a.service === d.getService() && a.serviceId === d.getServiceId();
        },
        buildServiceCredentials: function (e) {
          if (e.provider) {
            console.log(c, 'buildServiceCredentials', 'user added to credentials');
            var f = new b(e);
            a(function () {
              d.storeCredential(f.service, {
                token: e.firebaseAuthToken,
                authentic: e,
                profile: f
              });
            });
          }
        },
        retrieveUserRecord: function (b, e) {
          console.log(c, 'retrieveUserRecord', 'ur=', b), a(function () {
            b.primary = b.profile.provider + '-' + b.profile.id, _.each(b.accounts, function (a) {
              d.storeCredential(a.profile.service, a);
            }), d.user = b, d.primaryToken = e;
          });
        },
        storeInviteCredentials: function (a) {
          console.log(c, 'storeInviteCredentials', 'user added to credentials');
          var e = new b(a), f = e.service, g = {
              token: a.firebaseAuthToken,
              authentic: a,
              profile: e
            }, h = {
              token: g.authentic.firebaseAuthToken,
              authentic: g.authentic,
              profile: g.profile,
              services: {},
              next: null,
              detached: !1
            };
          return 'singly' === g.profile.provider ? _.each(g.authentic.services, function (a, b) {
            var c = {
                id: a.id,
                name: a.name
              }, e = a.thumbnail_url;
            e && (c.image = e), h.services[b] = c, d.services[b] = c;
          }) : (h.services[g.profile.provider] = g.profile, d.services[g.profile.provider] = g.profile), d.credentials[f] = h, d.enhanceProfile(g.profile), h;
        },
        removeCred: function (a) {
          console.log(c, 'removeCred', 'cred=', a);
          for (var b = d.firstCred, e = null; b;) {
            if (b === a) {
              d.firstCred === a && (d.firstCred = a.next), d.lastCred === a && (d.lastCred = e), e && (e.next = b.next);
              break;
            }
            e = b, b = b.next;
          }
        },
        storeCredential: function (a, b) {
          console.log(c, 'storeCredential', 'service=', a, 'account=', b);
          var e = d.credentials[a];
          e && d.removeCred(e);
          var f = b.authentic;
          e = {
            token: f.firebaseAuthToken,
            authentic: f,
            profile: b.profile,
            services: {},
            next: null,
            detached: !1
          }, console.log(c, 'storeCredential', 'authentic=', f, 'cred=', e), 'singly' === b.profile.provider ? _.each(f.services, function (a, b) {
            var f = d.getServiceObject(a);
            console.log(c, 'storeCredential', 'singlyService=', a, 'key=', b, 's=', f), e.services[b] = f, d.services[b] = f;
          }) : (console.log(c, 'storeCredential', 'account.profile=', b.profile), e.services[b.profile.provider] = b.profile, d.services[b.profile.provider] = b.profile), d.credentials[a] = e, console.log(c, 'storeCredential', 'mp.services=', d.services, 'mp.credentials=', d.credentials), d.lastCred && (d.lastCred.next = e), d.firstCred = d.firstCred || e, d.lastCred = e, d.enhanceProfile(b.profile);
        },
        getServiceObject: function (a) {
          var b = {
              id: a.id,
              name: a.name
            }, c = a.thumbnail_url;
          return c && (b.image = c), b;
        },
        enhanceProfile: function (a) {
          console.log(c, 'enhanceProfile', 'serviceProfile=', a), d.user = d.user || {}, d.user.profile = d.user.profile || {}, _.defaults(d.user.profile, a), console.log(c, 'enhanceProfile', 'mp.user=', d.user), d.user.primary = d.user.primary || a.key, d.user.profile.ready = !0;
        },
        deleteAccount: function (a, b) {
          var e = a.account ? 'singly-' + a.account : a.provider + '-' + a.id;
          if (d.user.primary === e) {
            var f = _.keys(d.user.accounts);
            _.size(f) ? (d.user.primary = f[0], d.user.profile = d.user.accounts[d.user.primary].profile) : (delete d.user.primary, delete d.user.profile);
          }
          console.log(c, 'deleteAccount', 'cred=', b, 'profile=', a), d.user.accounts && delete d.user.accounts[e], d.user.services && _.each(b.services, function (a, b) {
            delete d.user.services[b];
          }), console.log(c, 'deleteAccount', 'mp.user=', d.user);
        },
        storeAccount: function (a, b) {
          var e = a.account ? 'singly-' + a.account : a.provider + '-' + a.id;
          d.user.primary || (d.user.primary = e, d.user.profile = a), console.log(c, 'storeAccount', 'cred=', b, 'profile=', a), d.user.accounts = d.user.accounts || {}, d.user.accounts[e] = angular.copy({
            active: !0,
            profile: a,
            authentic: b.authentic,
            services: b.services ? b.services : null
          }), d.user.services = d.user.services || {}, _.each(b.services, function (a, b) {
            d.user.services[b] = angular.copy(a);
          }), console.log(c, 'storeAccount', 'mp.user=', d.user);
        },
        getCredentials: function () {
          var a = {};
          return _.each(d.credentials, function (b, c) {
            b.detached || (a[c] = b);
          }), a;
        },
        getCredentialKeys: function () {
          return _.keys(d.getCredentials());
        }
      };
    return d;
  }
]), FirstRevenueApp.factory('MyModels', [
  '$timeout',
  'Sync',
  'Canvas',
  function (a, b, c) {
    var d = 'MyModels';
    console.log(d, 'service launched');
    var e = {
        rootRef: null,
        userRef: null,
        userId: null,
        sync: b,
        models: {},
        init: function (a, b) {
          console.log(d, 'init'), e.rootRef = a, e.userRef = b, e.userId = b.name();
        },
        logoff: function () {
          console.log(d, 'logoff');
        },
        collectModels: function (a, b) {
          a.on('child_added', function (a) {
            e.loadModel(a.name(), b);
          }, e.modelCancel), a.on('child_removed', e.modelRemoved, e.modelCancel);
        },
        modelRemoved: function (c) {
          var f = c.name();
          console.log(d, 'modelRemoved modelId=', f);
          var g = e.rootRef.child('models').child(f);
          g.child('users').off('child_added', e.processModelUsers), g.child('invites').off('child_added', e.processModelInvites), a(function () {
            b.reset(b.getScopeName(f, 'models'));
          });
        },
        modelCancel: function (a) {
          console.log(d, 'modelCancel error=', a);
        },
        getModelKey: function (a) {
          return b.getScopeName(a, 'models');
        },
        loadModel: function (a, b) {
          console.log(d, 'loadModel modelId=', a, 'publicFlag=', b);
          var c = e.rootRef.child('models').child(a), f = e.getModelKey(a);
          console.log(d, 'loadModel modelKey=', f);
          var g = e.sync.angularFire(c, f);
          g ? g.then(e.loadModelData) : console.log(d, 'loadModel angularFire failed for modelKey=', f);
        },
        loadModelData: function (a) {
          console.log(d, 'loadModelData modelPromise resolved modelReady=', a);
          var b = a.ref.name();
          if (a.value)
            if (a.value.users[e.userId]) {
              console.log(d, 'loadModelData user userId=', e.userId, 'found for modelId=', b), c.modelId === b && (c.model = e.sync.models[b]);
              var f = a.ref.child('users');
              f.on('child_added', e.processModelUsers);
              var g = a.ref.child('invites');
              g.on('child_added', e.processModelInvites);
            } else
              e.sync.user.models[b] && (console.log(d, 'loadModelData user not in model user list, deleting modelId=', b), delete e.sync.user.models[b]);
          else
            e.sync.user.models[b] && (console.log(d, 'loadModelData model does not exist, deleting modelId=', b), delete e.sync.user.models[b]);
        },
        processModelUsers: function (a) {
          var b = a.name();
          if (e.sync.peers[b])
            console.log(d, 'processModelUsers peer already loaded key=', b);
          else {
            var c = 'sync.peers[\'' + b + '\']', f = e.rootRef.child('users').child(b).child('profile'), g = e.sync.angularFire(f, c);
            g && g.then(function (a) {
              console.log(d, 'processModelUsers resolved peer=', a);
            });
            var h = 'sync.peerPresence[\'' + b + '\']', i = e.rootRef.child('presence').child(b), j = e.sync.angularFire(i, h, -1);
            j && j.then(function (a) {
              console.log(d, 'processModelUsers resolved presence=', a);
            });
          }
        },
        processModelInvites: function (a) {
          var b = a.name();
          if (e.sync.invites[b])
            console.log(d, 'processModelInvites invite already loaded key=', b);
          else {
            var c = 'sync.invites[\'' + b + '\']', f = e.rootRef.child('invites').child(b), g = e.sync.angularFire(f, c);
            g && g.then(function (a) {
              console.log(d, 'processModelInvites resolved invite=', a), 'accepted' === a.status && console.log(d, 'processModelInvites accepted invite=', a);
            });
          }
        }
      };
    return e;
  }
]), FirstRevenueApp.factory('Sync', [
  '$q',
  'angularFire',
  function (a, b) {
    var c = 'Sync';
    console.log(c, 'service loaded');
    var d = {
        masterScope: null,
        user: {},
        models: {},
        invites: {},
        peers: {},
        peerPresence: {},
        admin: {
          status: !1,
          enabled: !1,
          presence: {},
          admins: {},
          users: {},
          models: {},
          invites: {},
          promises: []
        },
        dereg: {},
        init: function (a) {
          console.log(c, 'init'), d.masterScope = a;
        },
        angularFire: function (a, e, f) {
          console.log(c, 'angularFire name=', e, f), f = angular.isUndefined(f) ? {} : f;
          var g = b(a, d.masterScope, e, f);
          return g.then(function (a) {
            console.log(c, 'angularFire callback afReady=', a), a.off && a.name ? d.dereg[e] = a.off : g.off && (d.dereg[e] = g.off);
          }), g;
        },
        reset: function (a) {
          console.log(c, 'reset name=', a);
          var b = d.dereg[a];
          b && b();
        },
        getScopeName: function (a, b) {
          return 'sync.' + b + '[\'' + a + '\']';
        },
        collectAdminData: function (b) {
          var c = [
              d.angularFire(b.child('presence'), 'sync.admin.presence'),
              d.angularFire(b.child('admins'), 'sync.admin.admins'),
              d.angularFire(b.child('users'), 'sync.admin.users'),
              d.angularFire(b.child('models'), 'sync.admin.models'),
              d.angularFire(b.child('invites'), 'sync.admin.invites')
            ];
          a.all(c).then(d.adminDataLoaded, d.adminDataFailed);
        },
        adminDataLoaded: function (a) {
          console.log(c, 'adminDataLoaded result=', a), d.admin.promises = a;
        },
        adminDataFailed: function (a) {
          console.log(c, 'adminDataFailed err=', a);
        },
        logoff: function () {
          console.log(c, 'logoff'), d.reset('sync.user'), d.reset('sync.public'), d.admin.status && (d.reset('sync.admin.presence'), d.reset('sync.admin.admins'), d.reset('sync.admin.users'), d.reset('sync.admin.models'), d.reset('sync.admin.invites'), d.admin.status = !1, d.admin.enabled = !1, d.admin.presence = {}, d.admin.admins = {}, d.admin.users = {}, d.admin.models = {}, d.admin.invites = {}, d.admin.promises = []), _.each(d.models, function (a, b) {
            d.reset(d.getScopeName(b, 'models'));
          }), _.each(d.invites, function (a, b) {
            d.reset(d.getScopeName(b, 'invites'));
          }), _.each(d.peers, function (a, b) {
            d.reset(d.getScopeName(b, 'peers'));
          }), d.user = {}, d.models = {}, d.invites = {}, d.peers = {}, d.peerPresence = {};
        }
      };
    return d;
  }
]), FirstRevenueApp.factory('TOrg', [function () {
    var a = function (a, b) {
      this.id = a, b && (this.name = b.name, this.descr = b.descr), this.repos = {};
    };
    return a.prototype.xxxx = function () {
    }, a;
  }]), FirstRevenueApp.factory('TRepo', [function () {
    var a = function (a, b, c) {
      this.orgId = a.id, this.id = b, c && (this.name = c.name, this.descr = c.descr), this.models = {};
    };
    return a.prototype.xxxx = function () {
    }, a;
  }]), FirstRevenueApp.factory('TModel', [function () {
    var a = 'TModel', b = [
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
      ], c = function (b, c, d) {
        this.orgId = b.orgId, this.repoId = b.id, this.id = c, d && (this.fields = angular.copy(d.fields)), this.createBlocks(), console.log(a, 'constructor this=', this);
      };
    return c.prototype.createBlocks = function () {
      var c = this, d = c.id;
      c.blocks = {};
      for (var e in b) {
        var f = b[e];
        c.blocks[f.id] = c.blocks[f.id] || {
          paneClass: f.id,
          id: f.id,
          bmId: d,
          name: f.name,
          iconId: f.iconId,
          initials: f.initials,
          stickers: {}
        };
      }
      console.log(a, 'createBlocks model=', c);
    }, c;
  }]), FirstRevenueApp.factory('TSticker', [function () {
    var a = function (a, b, c) {
      console.log('scripts/services/obj/TSticker constructor this=', this, 'model=', a, 'id=', b, 'sticker=', c), this.orgId = a.orgId, this.repoId = a.repoId, this.modelId = a.id, this.id = b, this.setFields(this, c);
    };
    return a.prototype.setFields = function (a, b) {
      a.title = b.title, a.notes = b.notes, a.block = b.block, b.color = b.color || 'yellow', a.color = b.color, b.x || b.y ? a.position = {
        absolute: !0,
        x: b.x,
        y: b.y
      } : a.position && delete a.position, a.shadow = {
        title: b.title,
        notes: b.notes,
        color: b.color
      };
    }, a.prototype.update = function (a) {
      console.log('scripts/services/obj/TSticker update this=', this, 'sticker=', a), this.setFields(this, a);
    }, a;
  }]), FirstRevenueApp.factory('TProfile', [function () {
    var a = function (a) {
      var b = _.extend(this, {
          provider: a.provider || (a.account ? 'singly' : null),
          service: a.service || a.provider,
          id: a.id || a.account,
          serviceId: a.services ? a.services[a.service].id : a.id,
          email: a.email || null,
          name: a.name || (a.email ? a.email.split('@')[0] : null),
          hash: a.hash || (a.email ? CryptoJS.MD5(a.email).toString(CryptoJS.enc.Hex) : null)
        });
      switch (b.key = b.provider + '-' + b.id, a.provider) {
      case 'facebook':
        b.link = a.link, b.image = '//graph.facebook.com/' + a.id + '/picture';
        break;
      case 'twitter':
        b.link = '//twitter.com/' + a.username, b.image = a.profile_image_url;
        break;
      case 'github':
        b.link = a.profileUrl, b.image = a.avatar_url;
        break;
      case 'persona':
        b.image = '//www.gravatar.com/avatar/' + b.hash;
        break;
      case 'password':
        b.image = '//www.gravatar.com/avatar/' + b.hash;
        break;
      case 'singly':
        b.link = a.url, b.image = a.thumbnail_url;
        break;
      default:
        b.image = null;
      }
      b.image = b.image || null, console.log('TProfile fbUser=', a, 'profile=', b);
    };
    return a;
  }]), FirstRevenueApp.factory('Social', [
  '$timeout',
  'Singly',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'GPlus',
  'GContacts',
  'JWT',
  function (a, b, c, d, e, f, g, h) {
    var i = 'Social';
    console.log(i, 'service launched');
    var j = {
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
      }, k = {
        partners: {},
        refreshed: 0,
        total: 0
      }, l = {
        me: null,
        account: null,
        selectedUsers: {},
        loaded: {},
        loading: {},
        contacts: {},
        linkedinMsg: {
          title: '',
          sender: {
            name: '',
            title: ''
          },
          recipient: { name: '' },
          date: '',
          text: '',
          link: ''
        },
        reset: function () {
          l.selectedUsers = {}, l.loaded = {}, l.loading = {}, l.contacts = {};
        },
        fetchAccount: function (a, b) {
          l.me = a;
          var c = l.findAccount(b);
          l.fetchSocialAccount(c);
        },
        fetchSocialAccount: function (a) {
          console.log(i, 'fetchSocialAccount account=', a), a.contacts = a.contacts || k;
          var h = a.authentic.accessToken;
          if ('singly' === a.profile.provider) {
            var m = a.profile.service, n = a.authentic.token, o = j[m] || 'self', p = a.authentic.expires, q = new Date().getTime() / 1000;
            console.log(i, 'fetchSocialAccount service=', m, 'token=', n, 'expires=', p, 'currentTime=', q), 'linkedin' === m ? e.getFriends(l.me, a, n) : 'gplus' === m ? b.launchAuth('gplus', l.me.rootRef, function (b, c) {
              console.log(i, 'fetchSocialAccount gplus err=', b, 'acc=', c), c && (l.me.sync.user.accounts['singly-' + c.id].authentic = c, f.getPeople(l.me, a, c.token));
            }) : 'gcontacts' === m ? g.getContacts(l.me, a, n) : o ? b.getData(m, n, o) : console.log(i, 'Unknown Singly service, endpoint not found');
          } else
            'facebook' === a.profile.provider ? c.getFriends(l.me, a, h) : 'twitter' === a.profile.provider && d.getFriends(l.me, a, h);
        },
        addModelInvite: function (a, b) {
          if (console.log(i, 'addModelInvite data=', b), b) {
            var c = angular.copy(b), d = l.me.rootRef.child('usermap').child(c.service).child(c.serviceId);
            d.once('value', function (b) {
              var d = b.val();
              console.log(i, 'addModelInvite usermap value userId=', d), d ? l.attachModelToUser(a, c, d) : l.verifyInviteMap(a, c), l.addPartner(c, d);
            });
          }
        },
        addPartner: function (a, b) {
          var c = l.me.sync.user.partners = l.me.sync.user.partners || {}, d = _.find(c, function (b) {
              return b.service === a.service && b.serviceId === a.serviceId;
            });
          if (!d) {
            var e = l.me.rootRef.push().name();
            d = c[e] = {
              name: a.name,
              service: a.service,
              serviceId: a.serviceId,
              image: a.image
            }, b && (d.userId = b);
          }
        },
        attachModelToUser: function (a, b, c) {
          console.log(i, 'attachModelToUser userId=', c, 'modelId=', a.modelId);
          var d = l.me.rootRef.child('users').child(c), e = d.child('models').child(a.modelId);
          e.set(!0, function (d) {
            console.log(i, 'attachModelToUser set completed err=', d), d || l.attachUserToModel(a, b, c);
          });
        },
        attachUserToModel: function (a, b, c) {
          console.log(i, 'attachUserToModel canvas=', a);
          var d = l.me.rootRef.child('models').child(a.modelId), e = d.child('users').child(c);
          e.set(!0, function (a) {
            console.log(i, 'attachUserToModel set completed err=', a);
          });
        },
        verifyInviteMap: function (a, b) {
          console.log(i, 'verifyInviteMap data=', b);
          var c = l.me.rootRef.child('invitemap').child(b.service).child(b.serviceId);
          c.once('value', function (d) {
            var e = d.val();
            if (e) {
              var f = l.me.rootRef.child('invites').child(e), g = f.child('models').child(a.modelId);
              g.set(!0, function (c) {
                c ? console.log(i, 'failed to set model in invite inviteId=', e, 'modelId=', a.modelId, 'err=', c) : console.log(i, 'successfully set model in invite inviteId=', e, 'modelId=', a.modelId, 'err=', c), l.updateModelInvite(a, b, e);
              });
            } else
              l.createModelInvite(a, b, c, b.account);
          });
        },
        createModelInvite: function (a, b, c) {
          console.log(i, 'createModelInvite data=', b);
          var d = {
              creator: l.me.userId,
              service: b.service,
              serviceId: b.serviceId,
              name: b.name,
              image: b.image,
              status: 'created',
              models: {}
            };
          d.models[a.modelId] = !0;
          var e = l.me.rootRef.child('invites'), f = e.push().name();
          console.log(i, 'createModelInvite inviteId=', f), e.child(f).set(d, function (e) {
            e ? console.log(i, 'failed to create an invite=', d, 'err=', e) : c.set(f, function () {
              l.updateModelInvite(a, b, f);
            });
          });
        },
        updateModelInvite: function (b, c, d) {
          console.log(i, 'updateModelInvite data=', c), a(function () {
            b.model.invites = b.model.invites || {}, b.model.invites[d] = !0, l.me.sync.user.invites = l.me.sync.user.invites || {}, l.me.sync.user.invites[d] = !0;
          });
        },
        updateInvite: function (a, b) {
          console.log(i, 'inviteId=', a);
          var c = l.me.rootRef.child('invites').child(a), d = l.findPartner(a);
          d.inviteId = a, b && (d.inviteMsg = b), console.log(i, 'updateInvite partner=', d), l.serviceInvite(d, function (a, b) {
            a ? console.log(i, 'invite error=', a, 'partner=', d) : b && (console.log(i, 'invite sent partner=', d), c.update({ status: 'sent' }, function (a) {
              l.inviteCallback(a, d, 'sent');
            }));
          });
        },
        inviteCallback: function (a, b, c) {
          a ? (console.log(i, 'invite global status cannot be set to', c, 'error=', a), b.inviteFailed = !0) : (console.log(i, 'invite global status set to', c), 'created' === c ? b.inviteCreated = !0 : 'sent' === c && (b.inviteSent = !0));
        },
        serviceInvite: function (a, b) {
          var d = l.findAccount(a.service);
          switch (console.log(i, 'serviceInvite contact=', a, 'account=', d), a.service) {
          case 'facebook':
            c.sendMessage(a, b);
            break;
          case 'linkedin':
            e.sendMessage(a, d.authentic.token, b);
            break;
          case 'gplus':
            f.sendMessage(a, d.authentic.token, b);
            break;
          default:
            console.log(i, 'invite does not have sendMessage function for service=', a.service);
          }
        },
        findAccount: function (a) {
          return _.find(l.me.sync.user.accounts, function (b) {
            return b.profile.service === a;
          });
        },
        findPartner: function (a) {
          var b = l.me.sync.invites[a];
          return _.find(l.me.sync.user.partners, function (a) {
            return a.service === b.service && a.serviceId === b.serviceId;
          });
        },
        verifyExpiration: function (a, c) {
          console.log(i, 'verifyExpiration token=', a);
          var d = h.decodeJWT(a), e = d[1].exp;
          console.log(i, 'verifyExpiration token=', a, 'tokenArray=', d, 'expires=', e), e < Math.floor(Date.now()) ? (console.log(i, 'verifyExpiration token has expired'), b.launchAuth('gplus', l.me.rootRef, function (a, b) {
            console.log(i, 'verifyExpiration err=', a, 'acc=', b), l.me.sync.user.accounts['singly-' + b.id].authentic = b, c(b.token);
          })) : (console.log(i, 'verifyExpiration token not expired'), c(a));
        },
        launchLinkedInModal: function (a, b) {
          var c = window.location.origin || window.location.protocol + '//' + window.location.host, d = c + window.location.pathname + '#invite/' + a, e = _.find(l.me.sync.user.accounts, function (a) {
              return 'linkedin' === a.authentic.service;
            }), f = e ? e.authentic.services.linkedin : l.me.sync.user.profile, g = {
              title: 'Join 1stRevenue.com',
              sender: {
                name: f.name,
                title: f.description || '',
                image: f.thumbnail_url || null
              },
              recipient: { name: b.name },
              date: moment().format('LL'),
              link: d,
              text: 'Hello ' + b.name + '. ' + 'Join 1stRevenue.com and collaborate with us on business modeling. ' + 'Use your LinkedIn account to sign to the application. '
            };
          l.linkedinMsg = g, l.inviteId = a, $('#modalLinkedIn').modal('show');
        }
      };
    return l;
  }
]), FirstRevenueApp.factory('Facebook', [
  '$resource',
  '$timeout',
  function (a, b) {
    var c = 'Facebook', d = 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=1000,height=600', e = 'https://graph.facebook.com/me/friends?fields=name,username,picture,email&access_token=:token', f = {
        me: null,
        account: null,
        total: 0,
        friends: null,
        sendMessage: function (a) {
          console.log('Facebook sendMessage contact=', a);
          var b = window.location.origin || window.location.protocol + '//' + window.location.host, c = b + window.location.pathname + 'views/', d = c + 'FacebookInvitation.html', e = a.serviceId, f = {
              name: 'Invite to collaborate on model',
              app_id: CONFIG_1ST_REVENUE.facebookClientId,
              method: 'send',
              to: e,
              link: d
            };
          FB.getLoginStatus(function (a) {
            'connected' === a.status ? (console.log('Facebook sendMessage fbParam=', f), FB.ui(f)) : FB.login(function (a) {
              a.authResponse ? (console.log('Welcome!  Fetching your information.... '), FB.ui(f)) : console.log('User cancelled login or did not fully authorize.');
            });
          });
        },
        sendMessagePage: function (a, e) {
          console.log('Facebook sendMessage contact=', a);
          var f = window.location.origin || window.location.protocol + '//' + window.location.host, g = f + window.location.pathname + 'views/', h = g + 'FacebookRedirect.html', i = g + 'FacebookInvitation.html', j = a.serviceId, k = {
              app_id: CONFIG_1ST_REVENUE.facebookClientId,
              redirect_uri: h,
              display: 'page',
              to: j,
              link: i + '?invite=' + a.inviteId
            };
          WinChan.open({
            url: g + 'FacebookLaunch.html',
            relay_url: g + 'WinChanRelay.html',
            window_features: d,
            params: k
          }, function (a, d) {
            b(function () {
              console.log(c, 'sendMessage', 'error=', a, 'response=', d), a ? (console.log(c, 'sendMessage', 'error=', a), e(a)) : (console.log(c, 'sendMessage', 'response=', d), d.success ? e(null, !0) : e(null, !1));
            });
          });
        },
        getFriends: function (b, c, d) {
          f.me = b, f.account = c, f.me.social.loaded.facebook = !1, console.log('Facebook getFriends token=', d);
          var g = a(e, { token: d });
          f.friends = g.get(f.processFriends, f.queryError);
        },
        processFriends: function (a) {
          console.log('Facebook processFriends friends=', a), f.me.social.contacts.facebook = f.me.social.contacts.facebook || {}, b(function () {
            f.total = 0, f.account.contacts = f.account.contacts || { refreshed: Date.now() }, _.each(a.data, f.processFriend), console.log('Facebook processFriends facebook.total=', f.total);
            var b = f.account.profile.key, c = f.me.sync.user.accounts[b], d = c.contacts;
            d.refreshed = Date.now(), d.total = f.total, f.me.social.loaded.facebook = !0, console.log('Facebook processFriends contacts=', f.account.contacts, 'facebook.me.social.loaded.facebook=', f.me.social.loaded.facebook, 'facebook.me.sync=', f.me.sync);
          });
        },
        processFriend: function (a) {
          console.log('Facebook processFriend friend=', a), console.log('Facebook processFriend profile.key=', f.account.profile.key, 'account=', f.account);
          var b = f.account.contacts.partners, c = f.me.social.contacts.facebook[a.id] = {
              profileKey: f.account.profile.key,
              provider: 'facebook',
              service: 'facebook',
              id: a.id,
              serviceId: a.id,
              name: a.name,
              username: a.username,
              image: a.picture.data.url || null
            };
          b && b[a.id] && (b[a.id].name = c.name, b[a.id].image = c.image, c.partner = b[a.id]), console.log('Facebook processFriend c=', c), f.total += 1;
        },
        queryError: function (a) {
          console.log('Facebook queryError error=', a);
        }
      };
    return f;
  }
]), FirstRevenueApp.factory('GContacts', [
  '$resource',
  '$timeout',
  function (a, b) {
    var c = 'https://api.singly.com/proxy/gcontacts/contacts/default/full?access_token=:token&max-results=1000&alt=json', d = 'https://api.singly.com/proxy/gcontacts/groups/default/base?access_token=:token&max-results=1000&alt=json', e = 'http://schemas.google.com/contacts/2008/rel#edit-photo', f = {
        me: null,
        account: null,
        contacts: null,
        groups: null,
        token: null,
        total: 0,
        getContacts: function (b, e, g, h) {
          f.me = b, f.account = e, f.token = g, console.log('GContacts getContacts token=', g);
          var i = a(c, { token: g }), j = h || f.processContacts;
          f.contacts = i.get(j, f.requestError);
          var k = a(d, { token: g });
          f.groups = k.get(f.processGroups, f.requestError);
        },
        processContacts: function (a) {
          console.log('GContacts processContacts contacts=', a), f.account.friends = a, b(function () {
            f.total = 0, _.each(a.feed.entry, f.processContact), f.account.contacts.refreshed = Date.now(), f.me.social.loaded.linkedin = !0;
          });
        },
        processContact: function (a) {
          console.log('GContacts processContact contact=', a);
          var b = a.gd$email, c = a.id.$t.split('/')[8];
          if (c) {
            var d = f.account.contacts.partners, g = f.me.social.contacts.linkedin[a.id] = {
                profileKey: f.account.profile.key,
                service: 'gcontacts',
                id: c,
                serviceId: c,
                name: a.title.$t,
                email: '',
                org: '',
                image: '',
                phone: ''
              };
            d && d[a.id] && (g.partner = d[a.id]), f.total += 1, b && (g.email = b[0].address, _.each(b, function (a) {
              'true' === a.primary && (g.email = a.address);
            })), a.gd$organization && (g.org = a.gd$organization[0].gd$orgName.$t), a.link[0].gd$etag && _.each(a.link, function (a) {
              a.gd$etag && 'image/*' === a.type && a.rel === e && (g.image = a.href);
            }), a.gd$phoneNumber && _.each(a.gd$phoneNumber, function (a) {
              'true' === a.primary && (g.phone = a.$t);
            }), console.log('GContacts processContact c=', g);
          }
        },
        processGroups: function (a) {
          console.log('GContacts processGroups groups=', a);
        },
        requestError: function (a) {
          console.log('GContacts requestError error=', a);
        }
      };
    return f;
  }
]), FirstRevenueApp.factory('GPlus', [
  '$resource',
  '$http',
  '$timeout',
  function (a, b, c) {
    var d = 'GPlus', e = 'https://api.singly.com/profiles/gplus?auth=true&access_token=:token', f = 'https://www.googleapis.com/plus/v1/people/me', g = 'https://www.googleapis.com/plus/v1/people/me/people/visible', h = {
        me: null,
        account: null,
        total: 0,
        people: null,
        token: null,
        getPeople: function (b, c, f) {
          if (console.log(d, 'getPeople account=', c, 'token=', f), h.me = b, h.account = c, h.token = f, h.me.social.loaded.gplus = !1, !b.social.loading.gplus) {
            console.log(d, 'getPeople launching profileRequest'), b.social.loading.gplus = !0;
            var g = a(e, { token: f });
            h.profile = g.get(h.processProfile, h.requestError);
          }
        },
        processProfile: function (a) {
          c(function () {
            console.log(d, 'processProfile profile=', a), b({
              method: 'GET',
              url: f,
              params: { key: CONFIG_1ST_REVENUE.gplusAPIKey },
              headers: { Authorization: 'Bearer ' + a.auth.accessToken }
            }).success(h.processGPlusProfile).error(h.requestError), h.total = 0, h.account.contacts = h.account.contacts || { refreshed: Date.now() }, h.bearerToken = a.auth.accessToken, h.sendPeopleRequest();
          });
        },
        sendPeopleRequest: function (a) {
          console.log('GPlus sendPeopleRequest pageToken=', a), b({
            method: 'GET',
            url: g,
            params: {
              key: CONFIG_1ST_REVENUE.gplusAPIKey,
              pageToken: a || null
            },
            headers: { Authorization: 'Bearer ' + h.bearerToken }
          }).success(h.processGPlusPeople).error(h.requestError);
        },
        processGPlusProfile: function (a) {
          c(function () {
            console.log('GPlus processGPlusProfile gprofile=', a);
          });
        },
        processGPlusPeople: function (a) {
          console.log('GPlus processGPlusPeople people=', a), h.me.social.contacts.gplus = h.me.social.contacts.gplus || {}, c(function () {
            if (_.each(a.items, h.processPerson), console.log('GPlus processGPlusPeople people.nextPageToken=', a.nextPageToken), a.nextPageToken)
              h.sendPeopleRequest(a.nextPageToken);
            else {
              var b = h.account.profile.key, c = h.me.sync.user.accounts[b];
              console.log('GPlus processGPlusPeople gplus=', h, 'acc=', c);
              var d = c.contacts;
              d.refreshed = Date.now(), d.total = h.total, h.me.social.loaded.gplus = !0, h.me.social.loading.gplus = !1, console.log('GPlus processGPlusPeople key=', b, 'social=', h.me.social, 'contacts=', d);
            }
          });
        },
        processPerson: function (a) {
          console.log('GPlus processPerson person=', a);
          var b = h.account.contacts.partners, c = h.me.social.contacts.gplus[a.id] = {
              profileKey: h.account.profile.key,
              provider: 'singly',
              service: 'gplus',
              type: a.objectType,
              name: a.displayName,
              image: a.image.url,
              id: a.id,
              serviceId: a.id
            };
          b && b[a.id] && (c.partner = b[a.id]), h.total += 1;
        },
        requestError: function (a) {
          c(function () {
            console.log('GPlus requestError error=', a);
          });
        }
      };
    return h;
  }
]), FirstRevenueApp.factory('LinkedIn', [
  '$resource',
  '$timeout',
  function (a, b) {
    var c = 'https://api.singly.com/proxy/linkedin/people/~/connections?format=json&access_token=:token&scope=r_network', d = 'https://api.singly.com/proxy/linkedin/people/~/mailbox?format=json&access_token=:token&scope=w_messages', e = {
        me: null,
        account: null,
        total: 0,
        friends: null,
        token: null,
        msg: null,
        sendMessage: function (b, c, f) {
          e.token = c, console.log('LinkedIn sendMessage token=', c);
          var g = a(d, { token: c }), h = $('<div>' + b.inviteMsg.text + '</div>').text(), i = new g({
              recipients: { values: [{ person: { _path: '/people/' + b.serviceId } }] },
              subject: 'Join 1stRevenue.com',
              body: h + ' Visit ' + b.inviteMsg.link
            }), j = f || e.processMessage;
          i.$save(function (a) {
            console.log('LinkedIn processMessage msgResponse=', a), j(null, !0);
          }, e.requestError);
        },
        processMessage: function (a, b) {
          console.log('LinkedIn processMessage err=', a, 'msgResponse=', b);
        },
        getFriends: function (b, d, f, g) {
          e.me = b, e.account = d, e.token = f, e.me.social.loaded.linkedin = !1, console.log('LinkedIn getFriends token=', f);
          var h = a(c, { token: f }), i = g || e.processFriends;
          e.friends = h.get(i, e.requestError);
        },
        processFriends: function (a) {
          console.log('LinkedIn processFriends friends=', a), e.me.social.contacts.linkedin = e.me.social.contacts.linkedin || {}, b(function () {
            e.total = 0;
            var b = e.account.contacts = e.account.contacts || { refreshed: Date.now() };
            _.each(a.values, e.processFriend), b.refreshed = Date.now(), b.total = e.total, e.me.social.loaded.linkedin = !0, console.log('linkedin processFriends contacts=', b, 'linkedin.me.social.loaded.linkedin=', e.me.social.loaded.linkedin, 'linkedin.me.sync=', e.me.sync);
          });
        },
        processFriend: function (a) {
          if (console.log('LinkedIn processFriend friend=', a), 'private' !== a.id) {
            var b = e.account.contacts.partners, c = e.me.social.contacts.linkedin[a.id] = {
                profileKey: e.account.profile.key,
                provider: 'singly',
                service: 'linkedin',
                id: e.account.profile.id,
                serviceId: a.id,
                name: a.firstName + ' ' + a.lastName,
                username: null,
                image: a.pictureUrl || null
              };
            b && b[a.id] && (c.partner = b[a.id]), console.log('LinkedIn processFriend c=', c), e.total += 1;
          }
        },
        processProfile: function (a) {
          console.log('LinkedIn processProfile profile=', a);
        },
        requestError: function (a) {
          console.log('LinkedIn requestError error=', a);
        }
      };
    return e;
  }
]), FirstRevenueApp.factory('Twitter', [
  '$resource',
  '$timeout',
  function (a, b) {
    var c = 'https://api.twitter.com/1.1/friends/list.json', d = {
        friends: null,
        getFriends: function (b) {
          console.log('Twitter getFriends token=', b);
          var e = a(c, { token: b });
          d.friends = e.get(d.processFriends, d.queryError);
        },
        processFriends: function (a) {
          console.log('Twitter processFriends friends=', a), b(function () {
            _.each(d.friends.data, d.processFriend);
          });
        },
        processFriend: function (a) {
          console.log('Twitter processFriend friend=', a);
        },
        queryError: function (a) {
          console.log('Twitter queryError error=', a);
        }
      };
    return d;
  }
]);