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
    'firebase'
  ]).config([
    '$routeProvider',
    function (e) {
      e.when('/impress/:modelId', {
        templateUrl: 'views/impress/Impress.html',
        controller: 'ImpressController'
      }).when('/', {
        templateUrl: 'views/impress/Impress.html',
        controller: 'ImpressController'
      }).otherwise({ redirectTo: '/' });
    }
  ]).run([
    '$route',
    function (e) {
      e.reload();
    }
  ]);
FirstRevenueApp.controller('AdminController', [
  '$scope',
  function (e) {
    var t = 'AdminController';
    console.log(t, 'launched'), _.extend(e, {
      admin: e.me.sync.admin,
      getOnlineUsers: function () {
      }
    }), e.layout.setView('summary'), e.menu.setTitle('Administer 1st Revenue');
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
    console.log(s, 'route invoked $route=', t);
    var a = t.current.params.modelId, l = {
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
        return l;
      },
      getStickers: function (t) {
        var o = {}, n = e.canvas.modelId, i = e.me.sync.models[n];
        return i && i.stickers && _.each(e.me.sync.models[n].stickers, function (e, n) {
          e.block === t && (o[n] = e);
        }), o;
      },
      getSticker: function (t) {
        return e.me.sync.models[a].stickers[t];
      },
      isPublic: function () {
        return e.sync.public.models && !!e.sync.public.models[a];
      },
      isReadOnly: function () {
        return e.isPublic() && !e.sync.user.models[a];
      }
    }), e.layout.tooltips = !0, e.layout.setView('canvas'), e.layout.guide.wide = !1, e.menu.selected = 'canvas', e.layout.qrCode = !1, e.canvas.modelId = a, e.canvas.model = e.me.sync.models[a] || null, e.canvas.model && (e.menu.setTitle(e.canvas.model.fields ? e.canvas.model.fields.name : null), console.log(s, 'menu.title=', e.menu.title, 'canvas.model.fields=', e.canvas.model.fields), a !== e.canvas.lastModelId && (e.canvas.loaded || (console.log(s, 'firebase.loadCanvas modelId=', a), e.canvas.lastModelId = a)), e.canvas.readOnly = e.isReadOnly(a));
  }
]), FirstRevenueApp.controller('CommentController', [
  '$scope',
  function (e) {
    var t = 'CommentController';
    console.log(t, 'started'), angular.extend(e, {
      comment: {
        id: null,
        sort: '-updated'
      },
      getComments: function () {
        return _.sortBy(e.canvas.model.comments, function (e) {
          return -e.updated;
        });
      },
      openComment: function () {
        e.comment.id = e.me.userRef.push().name(), e.canvas.model.comments = e.canvas.model.comments || {}, e.canvas.model.comments[e.comment.id] = {
          id: e.comment.id,
          author: e.me.userId,
          updated: Date.now(),
          text: ''
        };
      },
      closeComment: function () {
        var t = e.canvas.model.comments[e.comment.id];
        t.updated = Date.now(), t.created || (t.created = t.updated), e.comment.id = null;
      },
      modifyComment: function (t) {
        e.comment.id = t.id;
      },
      getDateUpdated: function (t) {
        return t.updated ? e.getLatency(new Date(t.updated), Date.now()) : null;
      },
      getDateCreated: function (t) {
        return t.created ? e.getLatency(new Date(t.created), Date.now()) : null;
      },
      getCommentLatency: function (t) {
        return t ? e.getLatency(new Date(t), Date.now()) : null;
      },
      getRefreshLatency: function (t) {
        return e.timeStamp = Date.now(), t ? e.getLatency(t, e.timeStamp) : '';
      }
    });
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
        e.service = t, e.account = _.find(r.sync.user.accounts, function (e) {
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
        return _.each(r.sync.user.accounts, function (t) {
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
          var o = e.me.sync.user.accounts[t.profileKey].contacts;
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
        return console.log(i, 'getSocialPartners account=', n), e.account && e.account.contacts && _.each(e.account.contacts.partners, function (e, t) {
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
        return console.log(i, 'getSocialPartnerIds service=', t), e.account.contacts ? _.keys(e.account.contacts.partners) : [];
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
          var a = Math.round((Date.now() - i) / 1000);
          1 > a ? s = 'just now' : 60 > a ? s = a + ' second' + e.numberEnding(a) + ' ago' : 3600 > a ? (a = Math.round(a / 60), s = a + ' minute' + e.numberEnding(a) + ' ago') : 86400 > a ? (a = Math.round(a / 60 / 60), s = a + ' hour' + e.numberEnding(a) + ' ago') : (a = Math.round(a / 60 / 60 / 24), s = a + ' day' + e.numberEnding(a) + ' ago');
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
      invite: function (e, t) {
        o.createInvite(e, t);
      },
      isUser: function (e) {
        return !!e.account;
      }
    }), e.layout.guide.wide = !0, e.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('EntryController', [
  '$scope',
  '$location',
  '$timeout',
  'Auth',
  'Modal',
  'Register',
  function (e, t, o, n, i, r) {
    var s = 'EntryController';
    console.log(s, 'Entry route invoked Modal=', i, 'Auth=', n), angular.extend(e, {
      modal: i,
      auth: n,
      logonTabName: 'persona',
      register: r,
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
    }), e.layout.setView('welcome'), e.layout.guide.wide = !0, e.menu.setTitle('Welcome to the 1st Revenue'), e.menu.selected = 'logon', e.menu.visible = [
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
  function (e, t, o, n, i, r) {
    _.extend(e, {
      modal: o,
      zoom: n,
      model: i,
      info: r,
      admin: function () {
        e.me.sync.admin.status && (e.me.sync.collectAdminData(e.me.rootRef), e.me.sync.admin.enabled = !0, t.path('/admin'));
      },
      modifyAccount: function () {
        e.modal.logoff = !0;
      },
      preferences: function () {
        e.modal.logoff = !0;
      },
      logoff: function () {
        e.modal.logoff = !0;
      }
    });
  }
]), FirstRevenueApp.controller('HomeController', [
  '$scope',
  function (e) {
    var t = 'HomeController';
    console.log(t, 'route invoked'), e.menu.setTitle('1st Revenue'), e.menu.selected = 'home', e.menu.visible = [
      'home',
      'repo'
    ];
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
]), FirstRevenueApp.controller('ImpressController', [
  '$scope',
  '$route',
  function (e, t) {
    var o = 'ImpressController';
    console.log(o, 'invoked');
    var n = {
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
      modelId: null,
      getBlocks: function () {
        return n;
      },
      getStickers: function (t) {
        var o = {}, n = e.im.model;
        return n && n.stickers && _.each(e.im.model.stickers, function (e, n) {
          e.block === t && (o[n] = e);
        }), o;
      }
    }), e.modelId = t.current.params.modelId, console.log(o, '$route=', t, 'modelId=', e.modelId), e.modelId && e.im.loadModel(e.modelId);
  }
]), FirstRevenueApp.controller('ImpressMasterController', [
  '$scope',
  '$route',
  '$routeParams',
  '$window',
  'Canvas',
  'ImpressModel',
  function (e, t, o, n, i, r) {
    var s = 'ImpressMasterController';
    console.log(s, 'launched'), e.$root._ = window._, angular.extend(e, {
      canvas: i,
      im: r
    }), e.rootRef = new Firebase(CONFIG_1ST_REVENUE.firebaseEndpoint), n.document.title = '1st Revenue Presentation', r.init(e.rootRef, e), console.log(s, '$route=', t, 'modelId=', e.modelId, '$routeParams=', o), analytics.track('Impress launch');
  }
]), FirstRevenueApp.controller('InviteController', [
  '$scope',
  '$location',
  '$timeout',
  '$route',
  '$q',
  'Firebase',
  'Invite',
  function (e, t, o, n, i, r, s) {
    var a = 'InviteController', l = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    angular.extend(e, {
      invite: s,
      inviteId: null,
      service: null,
      loaded: !1,
      creator: null,
      openAuth: function () {
        var t = e.inviteId = n.current.params.inviteId, l = i.defer();
        console.log(a, 'openAuth $scope=', e, 'inviteId=', t), s.inviteRef = r.rootRef.child('invites').child(t), s.inviteRef.once('value', function (t) {
          var n = t.val();
          console.log(a, 'openAuth inviteValue=', n), o(function () {
            e.invite.loaded = !0, e.me.sessionFound && (e.me.mp.wasCurrentUserInvited(n) ? (n.current = !0, l.resolve(n)) : l.resolve(n)), l.resolve(n), e.service = n ? n.service : null, e.me.sessionFound && e.loadCreator(n), console.log(a, 'invite value=', n);
          });
        }, function (e) {
          console.log('Invite error=', e), l.reject(e);
        }), s.setInvite(t, l.promise);
      },
      loadCreator: function (e) {
        s.creatorRef = r.rootRef.child('users').child(e.creator).child('profile'), s.creatorRef.once('value', function (e) {
          o(function () {
            s.creator = e.val();
          });
        });
      },
      extractTimeStamp: function (e) {
        for (var t = e.substr(0, 8), o = 0, n = 0; 8 > n; n++)
          o = 64 * o + l.indexOf(t.charAt(n));
        return o;
      },
      getInviteDate: function (t) {
        return new Date(e.extractTimeStamp(t)).toLocaleString();
      },
      signIn: function () {
        t.path('/entry');
      }
    }), e.invite.loaded = !1, e.invite.creator = null, e.openAuth();
  }
]), FirstRevenueApp.controller('MasterController', [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
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
  function (e, t, o, n, i, r, s, a, l, c, u, d, p, h) {
    var g = 'MasterController';
    console.log(g, 'launched'), e.$root._ = window._, angular.extend(e, {
      layout: r,
      popup: s,
      menu: a,
      notif: l,
      firebase: c,
      canvas: u,
      me: d,
      sync: i,
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
      getLatency: function (e, t) {
        var o = Math.round((t - e) / 1000), n = '';
        return 1 > o ? n = 'just now' : 60 > o ? n = o + 's ago' : 3600 > o ? (o = Math.round(o / 60), n = o + ' min ago') : 86400 > o ? (o = Math.round(o / 60 / 60), n = o + 'h ago') : (o = Math.round(o / 60 / 60 / 24), n = new Date(+e).toISOString().substr(0, 10)), n;
      },
      numberEnding: function (e) {
        return 1 === e ? '' : 's';
      }
    }), e.layout.reset(), e.me.authenticated = !1, e.menu.setTitle('1st Revenue'), c.init(), i.init(e), d.init(t.path());
    var f = '/invite/';
    t.path().substring(0, f.length) === f ? (e.firebase.retrieveSession(), console.log(g, 'Firebase retrieveSession() done $location.path()=', t.path())) : (e.firebase.resumeSession(), console.log(g, 'Firebase resumeSession() done $location.path()=', t.path())), e.notif.add({ text: '1st Revenue started' }), analytics.track('App launch');
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
      modelName: null,
      logoff: function () {
        this.modal.logoff = !1, e.me.authenticated = !1, e.me.authFailed = !0, e.firebase.rootRef.unauth(), FirebaseSimpleLogin.prototype.clearSession(), e.me.logoff(), t.url('/entry');
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
        console.log(i, 'deleteSticker'), delete e.me.sync.models[e.canvas.modelId].stickers[this.modal.stickerId], this.modal.stickerId = null, this.modal.sticker = null, e.layout.editor.sticker = !1, this.modal.del = !1, e.layout.tooltips = !0;
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
  '$timeout',
  'Social',
  'FilePicker',
  function (e, t, o, n, i) {
    var r = 'ModelController';
    console.log(r, 'started');
    var s = {
        facebook: 'Facebook',
        linkedin: 'LinkedIn',
        gplus: 'Google+',
        gmail: 'Gmail'
      };
    angular.extend(e, {
      social: n,
      fp: i,
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
        template: e.template,
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
        return _.sortBy(e.canvas.model.comments, function (e) {
          return -e.updated;
        });
      },
      openComment: function () {
        e.model.commentId = e.me.userRef.push().name(), e.canvas.model.comments = e.canvas.model.comments || {}, e.canvas.model.comments[e.model.commentId] = {
          id: e.model.commentId,
          author: e.me.userId,
          updated: Date.now(),
          text: ''
        };
      },
      closeComment: function () {
        var t = e.canvas.model.comments[e.model.commentId];
        t.updated = Date.now(), t.created || (t.created = t.updated), e.model.commentId = null;
      },
      modifyComment: function (t) {
        e.model.commentId = t.id;
      },
      getDateUpdated: function (t) {
        return t.updated ? e.getLatency(new Date(t.updated), Date.now()) : null;
      },
      getDateCreated: function (t) {
        return t.created ? e.getLatency(new Date(t.created), Date.now()) : null;
      },
      getCommentLatency: function (t) {
        return t ? e.getLatency(new Date(t), Date.now()) : null;
      },
      resetSearch: function () {
        e.tah.userTypeAhead = '', e.tah.selectedDatum = null;
      },
      massInviteAllowed: function () {
        return !1;
      },
      tahSubmit: function () {
        console.log(r, 'tahSubmit tah.userTypeAhead=', e.tah.userTypeAhead), n.addModelInvite(e.canvas, e.tah.selectedDatum), e.resetSearch();
      },
      deletePeer: function (t) {
        console.log(r, 'deletePeer userId=', t);
        var o = e.canvas.modelId;
        delete e.sync.peers[t].models[o], delete e.sync.models[o].users[t];
      },
      deleteInvite: function (t) {
        console.log(r, 'deleteInvite inviteId=', t);
        var o = e.canvas.modelId;
        delete e.sync.models[o].invites[t], delete e.sync.user.invites[t].models[o];
      },
      getRefreshLatency: function (t) {
        return e.timeStamp = Date.now(), t ? e.getLatency(t, e.timeStamp) : '';
      },
      getRepos: function () {
        var e = this.repoList = [];
        return e;
      },
      'delete': function () {
        console.log(r, 'model delete remove model ref from user modelId=', e.canvas.modelId), delete e.sync.user.models[e.canvas.modelId], console.log(r, 'model delete set model to null modelId=', e.canvas.modelId), e.sync.models[e.canvas.modelId] = null, console.log(r, 'model delete done models[id]=', e.sync.models[e.canvas.modelId]), e.modal.model = !1, t.path('/repo');
      },
      finish: function () {
        e.layout.setView('canvas');
      },
      manageUsers: function () {
        e.layout.setView('users');
      },
      showModels: function () {
        e.fpFile = null, t.path('/repo');
      },
      pitchWordCount: function () {
        var t = e.canvas.model.fields.pitch ? e.canvas.model.fields.pitch : '';
        return '' === t ? 0 : t.split(/\s+/).length;
      },
      pitchRed: function () {
        var e = this.pitchWordCount(), t = Math.min(100, e);
        return Math.round(255 * t / 100);
      },
      pitchGreen: function () {
        var e = this.pitchWordCount(), t = Math.min(100, e);
        return 160 - Math.round(160 * t / 100);
      },
      addUser: function () {
      },
      getUserTypeahead: function () {
        var t = [];
        return _.each(e.sync.user.accounts, function (e) {
          e.contacts && _.each(e.contacts.partners, function (o, n) {
            var i = {
                provider: e.profile.provider,
                service: e.profile.service,
                serviceId: n,
                name: o.name,
                value: o.name,
                tokens: o.name.split(' '),
                image: o.image
              };
            t.push(i);
          });
        }), t;
      },
      header: function (e) {
        return console.log(r, 'header data=', e), '<div class="tt-header">' + e.name + ' partners (' + e.count + ')</div';
      },
      template: function (e) {
        return '<img src="' + (e.image ? e.image : 'images/bbf82395.light_avatar_small.png') + '" />' + '<div class="tt-name">' + e.name + '</div>' + '<div class="tt-user-id">' + e.serviceId + '</div>';
      },
      preparePartnerMarks: function () {
        _.each(e.sync.user.accounts, function (t) {
          e.tah.partners[t.profile.service] = !0;
        });
      },
      createDataset: function (t, o, n) {
        var i = s[n.profile.service] || 'Unknown', a = {
            name: n.profile.service + '-' + t,
            count: n.contacts.total,
            service: n.profile.service,
            serviceTitle: i,
            template: e.template,
            header: '<div class="tt-header">' + i + ' ' + t + ' (' + _.size(o) + ')</div>',
            local: o
          };
        return console.log(r, 'createDataset ' + t + ' dataset=', a), a;
      },
      buildDatasetItem: function (e) {
        return function (t, o) {
          var n = t.name.split(' ');
          n.push('*');
          var i = {
              account: e,
              provider: e.profile.provider,
              service: e.profile.service,
              serviceId: o,
              name: t.name,
              value: t.name,
              tokens: n,
              image: t.image
            };
          return console.log(r, 'buildDatasets partners partnerData=', t, 'key=', o, 'partner=', i), i;
        };
      },
      buildDatasets: function () {
        console.log(r, 'buildDatasets');
        var t = [];
        _.each(e.sync.user.accounts, function (o) {
          if (console.log(r, 'buildDatasets account=', o), o.contacts) {
            if (o.contacts.partners = o.contacts.partners || {}, e.tah.partners[o.profile.service]) {
              var n = _.map(o.contacts.partners, e.buildDatasetItem(o));
              _.size(n) > 0 && t.push(e.createDataset('partners', n, o));
            }
            if (e.social.loaded[o.profile.service] && e.tah.social[o.profile.service]) {
              var i = _.map(e.social.contacts[o.profile.service], e.buildDatasetItem(o)), s = _.filter(i, function (e) {
                  return !o.contacts.partners[e.serviceId];
                });
              _.size(s) > 0 && t.push(e.createDataset('friends', s, o));
            }
          }
        }), e.tah.empty = 0 === _.size(t), e.tah.empty && t.push(e.emptyDataset), o(function () {
          console.log(r, 'buildDatasets tah.dataset=', t), e.tah.dataset = t;
        });
      },
      loadAccount: function (t) {
        e.social.fetchAccount(e.me, t.profile.service), e.tah.social[t.profile.service] = !0, e.picks[t.profile.service] = !0;
      },
      refreshAccount: function (t) {
        e.social.fetchAccount(e.me, t.profile.service);
      },
      getPartners: function () {
        return _.toArray(e.sync.user.partners);
      },
      prefixFilter: function (t) {
        for (var o = e.tah.userTypeAhead.toLowerCase(), n = o.length, i = t.name.toLowerCase().split(' '), r = 0; i.length > r; r++)
          if (i[r].slice(0, n) === o)
            return !0;
        return !1;
      },
      pickGroup: function (t) {
        e.picks[t] = !e.picks[t];
      },
      isPickVisible: function (t) {
        return !!e.picks[t];
      },
      partnersLoaded: function () {
        return !(_.isEmpty(e.sync.user.groups) && _.isEmpty(e.sync.user.partners) && e.tah.empty);
      },
      wasInvited: function (t) {
        var o, n;
        return n = _.find(e.sync.models[e.canvas.modelId].users, function (o, n) {
          var i = e.sync.peers[n];
          return t.service === i.service && t.serviceId === i.serviceId;
        }), _.isUndefined(n) && (o = _.find(e.sync.models[e.canvas.modelId].invites, function (o, n) {
          return t.service === e.sync.invites[n].service && t.serviceId === e.sync.invites[n].serviceId;
        })), !(_.isUndefined(n) && _.isUndefined(o));
      },
      countInvites: function () {
        var t = e.sync.models[e.canvas.modelId];
        return t ? _.reduce(t.invites, e.injectInviteCount, 0) : 0;
      },
      injectInviteCount: function (t, o, n) {
        var i = e.sync.invites[n];
        return t + (i && 'accepted' !== i.status ? 1 : 0);
      },
      showInviteCard: function (t) {
        var o = e.sync.invites[t];
        e.showBusinessCard('invite', o, t);
      },
      showUserCard: function (t) {
        var o = e.sync.peers[t];
        e.showBusinessCard('user', o, t);
      },
      showBusinessCard: function (t, o, n) {
        console.log(r, 'showBusinessCard type=', t, 'user=', o, 'id=', n);
        var i = o.image;
        switch ('facebook' === o.service ? i = 'https://graph.facebook.com/' + o.serviceId + '/picture?type=large' : 'gplus' === o.service && (i = i.slice(0, -2) + '200'), e.businessCard = {
            type: t,
            name: o.name,
            image: i,
            email: o.email,
            serviceTitle: s[o.service],
            serviceId: o.serviceId,
            description: o.description,
            work: o.work
          }, t) {
        case 'invite':
          e.businessCard.inviteId = n;
          break;
        case 'user':
          e.businessCard.userId = n;
        }
      },
      hideBusinessCard: function () {
        console.log(r, 'hideBusinessCard'), e.businessCard = null;
      },
      toggleHelp: function (t) {
        e.sectionHelp[t] = !e.sectionHelp[t];
      },
      showHelp: function (t) {
        return !!e.sectionHelp[t];
      }
    }), e.menu.selected = 'canvas', e.social.me = e.me, e.preparePartnerMarks(), e.buildDatasets(), e.$watch('sync.user.accounts', e.buildDatasets, !0), e.$watch('social.contacts', e.buildDatasets, !0);
  }
]), FirstRevenueApp.controller('ModelsController', [
  '$scope',
  'ModelCatalog',
  'Zoom',
  function (e, t, o) {
    var n = 'ModelsController';
    console.log(n, 'invoked'), angular.extend(e, {
      catalog: t,
      zoom: o
    }), e.menu.setTitle('1st Revenue Repository'), e.menu.selected = 'repo', e.menu.visible = [
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
  function (e, t) {
    var o = 'NewModelController';
    e.layout.peer.wide = !1, e.menu.setTitle('Create Model'), e.menu.selected = 'create', console.log(o, 'launched'), angular.extend(e, {
      newModel: {},
      nameError: !1,
      createModel: function (n) {
        console.log(o, 'createModel name=', n), '' === n ? e.nameError = !0 : (e.nameError = !1, e.menu.setTitle(n), console.log(o, 'calling Firebase.createModel newModelName=', n), e.newModel.id = e.firebase.createModel(n, function () {
          console.log(o, 'model create callback newModelId=', e.newModel.id), e.canvas.modelId = e.newModel.id, e.canvas.model = e.sync.models[e.newModel.id], t.path('/canvas/' + e.newModel.id);
        }));
      },
      cancel: function () {
        e.layout.setView(e.layout.lastRepoView);
      }
    });
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
    e.menu.setTitle('1st Revenue Preferences'), console.log('Preferences route invoked'), e.brighten = t.brightenFull;
  }
]), FirstRevenueApp.controller('ProjectListController', [
  '$scope',
  'Renderer',
  'Rainbow',
  function (e, t, o) {
    var n = 'ProjectListController', i = {
        branch: '#b2b19d',
        code: 'orange',
        doc: '#922E00',
        demo: '#a7af00'
      };
    console.log(n, 'invoked'), angular.extend(e, {
      getProjectDemoData: function () {
        return e.demoData;
      },
      getProjectData: function () {
        var t = {
            nodes: {},
            edges: {}
          }, n = e.sync.user.profile.name;
        return t.nodes[n] = {
          color: 'blue',
          shape: 'dot',
          alpha: 1
        }, t.edges[n] = {}, _.each(e.sync.user.models, function (i, r) {
          var s = e.sync.models[r];
          t.nodes[s.fields.name] = {
            color: 'red',
            alpha: 1
          }, t.edges[n][s.fields.name] = { length: 1 }, t.edges[s.fields.name] = {}, _.each(s.stickers, function (e) {
            t.nodes[e.title] = {
              color: '#' + o.brighten(e.color),
              shape: 'square',
              alpha: 1
            }, t.edges[s.fields.name][e.title] = {};
          });
        }), t;
      },
      demoData: {
        nodes: {
          '1R Model': {
            color: 'red',
            shape: 'dot',
            alpha: 1
          },
          MetaData: {
            color: i.branch,
            shape: 'dot',
            alpha: 1
          },
          Pitch: {
            color: i.demo,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12589021'
          },
          Web: {
            color: i.demo,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12589147'
          },
          Description: {
            color: i.demo,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12589125'
          },
          Team: {
            color: i.branch,
            shape: 'dot',
            alpha: 1
          },
          Terje: {
            color: i.doc,
            alpha: 1,
            link: 'https://podio.com/users/573093'
          },
          Edmundas: {
            color: i.doc,
            alpha: 1,
            link: 'https://podio.com/users/639605'
          },
          MarketTrends: {
            color: i.branch,
            shape: 'dot',
            alpha: 1
          },
          'Focus on Business Model Generation': {
            color: i.doc,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/12827502'
          },
          Article2: {
            color: i.doc,
            alpha: 1,
            link: 'https://podio.com/users/639605'
          },
          Competitors: {
            color: i.branch,
            shape: 'dot',
            alpha: 1
          },
          LeanLaunchLab: {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11364419'
          },
          'Business Model Toolbox (iPad app)': {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11364415'
          },
          Strategyzr: {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11364417'
          },
          CustSegm: {
            color: i.branch,
            shape: 'dot',
            alpha: 1
          },
          Users: {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          Mentors: {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          Incubators: {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          Forskningsparken: {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11365132'
          },
          'Kjeller Innovasjon': {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11365125'
          },
          'BTO (Bergen Technology Transfer Office)': {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/11365051'
          },
          SegmChan: {
            color: i.branch,
            shape: 'dot',
            alpha: 1
          },
          'Social media': {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          'Traditional sales': {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          Twitter: {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          Facebook: {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          'Sales meetings': {
            color: i.code,
            shape: 'dot',
            alpha: 1
          },
          'Educational institutions': {
            color: i.code,
            alpha: 1,
            link: 'https://netbmgrepository.podio.com/netbmg-business-model/item/6163425'
          },
          'BMG Consulting companies': {
            color: i.code,
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
    }), e.menu.setTitle('Projects'), t.render('#project-map', e.getProjectData());
  }
]), FirstRevenueApp.controller('RegisterController', [
  '$scope',
  'Register',
  'Credentials',
  function (e, t, o) {
    var n = 'RegisterController';
    console.log(n, 'launched'), angular.extend(e, {
      register: t,
      cr: o
    });
    var i = t.init();
    o.init(i), e.menu.setTitle('Register to the 1st Revenue');
  }
]), FirstRevenueApp.controller('RepoController', [
  '$scope',
  'ModelCatalog',
  'Modal',
  'RrrrRrrr',
  function (e, t, o, n) {
    var i = 'RepoController';
    console.log(i, 'launched'), angular.extend(e, {
      catalog: t,
      modal: o,
      modelTabName: 'models',
      rrrrImageLink: n.getImageLink()
    });
    var r = _.size(e.catalog.getModelIdList('my')), s = _.size(e.catalog.getModelIdList('shared'));
    e.layout.setView(s && !r ? 'shared' : 'my'), e.layout.guide.wide = !0, e.layout.peer.wide = !1;
  }
]), FirstRevenueApp.controller('RibbonController', [
  '$scope',
  '$location',
  '$window',
  function (e, t, o) {
    var n = 'RibbonController';
    console.log(n, 'loaded');
    var i = {
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
    angular.extend(e, {
      ribbon: e.layout.guide,
      routeTo: function (e) {
        t.path('/' + e);
      },
      getSocialIconName: function (e) {
        var t = e.profile.service, o = i[t];
        return 'icon-' + (o && o.icon || t);
      },
      getSocialLabel: function (e) {
        var t = e.profile.service, o = i[t];
        return o && o.label || t;
      },
      getModelUserIds: function () {
        return _.keys(e.canvas.model && e.canvas.model.users || {});
      },
      toggleShare: function () {
        e.layout.share = !e.layout.share, e.layout.share;
      },
      toggleQRCode: function () {
        if (e.layout.qrCode = !e.layout.qrCode, e.layout.qrCode) {
          var t = o.location.origin || o.location.protocol + '//' + o.location.host, n = t + o.location.pathname, i = n + '#/canvas' + e.canvas.modelId, r = new JSQR(), s = new r.Code();
          s.encodeMode = s.ENCODE_MODE.UTF8_SIGNATURE, s.version = 7, s.errorCorrection = s.ERROR_CORRECTION.Q;
          var a = new r.Input();
          a.dataType = a.DATA_TYPE.URL, a.data = { url: i };
          var l = new r.Matrix(a, s);
          l.scale = 7;
          var c = document.createElement('canvas');
          c.setAttribute('width', l.pixelWidth), c.setAttribute('height', l.pixelWidth), c.getContext('2d').fillStyle = 'rgb(0,0,0)', l.draw(c, 0, 0), $('#qrcode').empty(), $('#qrcode').append(c);
        }
      }
    }), o.UserVoice = o.UserVoice || [];
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
        e.service = t, e.account = _.find(r.sync.user.accounts, function (e) {
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
          var o = e.me.sync.user.accounts[t.profileKey].contacts;
          o.partners || (o.partners = {}), o.partners[t.id] || (o.partners[t.id] = {
            name: t.name,
            image: t.image
          }), t.partner = o.partners[t.id];
        }
        t.partner.favorite = !t.partner.favorite, console.log(i, 'toggleFavorite contact.partner=', t.partner);
      },
      getSocialPartners: function (e) {
        console.log(i, 'getSocialPartners service=', e);
        var t = {}, o = _.find(r.sync.user.accounts, function (t) {
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
        return t(function () {
          e.timeStamp = Date.now();
        }, 1000), e.getLatency(n, e.timeStamp);
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
        var a = {
            service: n.service,
            id: t,
            status: 'created',
            creator: r.userId
          }, l = r.rootRef.child('invites').child(n.invite);
        l.set(a, function (t) {
          e.inviteCallback(t, n, 'created');
        }), o.invite(n, function (t) {
          t && (console.log(i, 'invite sent partner=', n), l.update({ status: 'sent' }, function (t) {
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
]), FirstRevenueApp.controller('StickerListController', [
  '$scope',
  function (e) {
    var t = 'StickerListController';
    console.log(t, 'started'), angular.extend(e, {
      list: {},
      getStickers2: function (t) {
        var o = {}, n = e.canvas.modelId, i = e.me.sync.models[n];
        return i && i.stickers && _.each(e.me.sync.models[n].stickers, function (e, n) {
          e.block === t && (o[n] = e);
        }), o;
      }
    });
  }
]), FirstRevenueApp.controller('ModelTagController', [
  '$scope',
  'TagCatalog',
  function (e, t) {
    console.log('---- ModelTagController'), _.extend(e, { catalog: t });
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
        var i = $(this).offsetParent(), r = i.attr('data-pane'), s = i.attr('data-block'), a = i.attr('data-sticker');
        console.log('first-revenue-buttons pane=', r, 'blockId=', s, 'stickerId=', a), n.stopPropagation();
        var l = e.model.blocks;
        $('.pulsate').removeClass('pulsate'), _.each(l, function (e) {
          e.stickers[0] && delete e.stickers[0];
        });
        var c = l[s], u = c.stickers[a], d = $(this).attr('title');
        if ('Delete' === d)
          window.confirm('Delete sticker ' + a + '\n' + u.title + '?');
        else if ('Edit' === d) {
          for (var p = 0; Opentip.tips > p; p++)
            Opentip.tips[p].hide();
          var h = $('.st-grad[data-id=' + a + ']');
          h.addClass('pulsate'), t.showSticker(e.model, c, a), console.log('first-revenue-buttons sticker=', u);
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
            var n = o.op.offset(), i = t.pageX - n.left, r = t.pageY - n.top, s = o.stl + (i - o.cl), a = o.stt + (r - o.ct);
            return s = Math.max(0, s), a = Math.max(0, a), s = Math.min(o.opop.width() - o.st.width(), s), a = Math.min(o.op.height(), a), o.st.css({
              position: 'absolute',
              left: s,
              top: a
            }), !1;
          },
          dropped: function () {
            return e.$root.draggingActive = !1, e.layout.tooltips = !0, o.opop.removeClass('drag-area'), o.st.removeClass('st-dragged'), o.opop.unbind('mousemove', o.dragged), $(window).unbind('mouseup', o.dropped), (!o.touchHandled || o.touchMoved) && o.savePosition(), !1;
          },
          savePosition: function () {
            var t = o.st.offset(), n = o.st.width(), i = o.opop.width() - n, r = o.op.height(), s = 0 === i ? 0 : 100 * (t.left - o.op.offset().left) / i, a = 0 === r ? 0 : 100 * (t.top - o.op.offset().top) / r, l = Math.max(0, Math.min(Math.round(100 * s) / 100, 100)), c = Math.max(0, Math.min(Math.round(100 * a) / 100, 100));
            console.log('first-revenue-drag xPerc=', l, 'yPerc=', c, 'sticker=', e.sticker, 'sto=', t, 'dh.opop.offset()=', o.opop.offset(), 'dh.op.offset()=', o.op.offset()), o.st.css({
              position: 'absolute',
              top: c + '%',
              left: l + '%'
            });
            var u = e.getSticker(e.stickerId);
            u.x = l, u.y = c, e.$apply();
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
        var a = e.model, l = 0, c = s;
        if ($('.pulsate').removeClass('pulsate'), s.hasClass('pane')) {
          var u = n.canvas.modelId, d = n.me.rootRef.child('models').child(u);
          l = d.child('stickers').push().name(), console.log(o, 'create sticker stickerId=', l), n.sync.models[u].stickers = n.sync.models[u].stickers || {}, n.sync.models[u].stickers[l] = {
            title: '',
            notes: '',
            color: 'yellow',
            block: c.attr('data-id')
          };
        } else
          c = s.offsetParent().offsetParent(), l = s.attr('data-id'), console.log(o, 'existing sticker stickerId=', l), s.addClass('pulsate');
        var p = c.attr('data-id');
        t.showSticker(a, p, l), console.log(o, 'editor.sticker=', t.sticker), n.$apply();
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
]), FirstRevenueApp.directive('firstRevenueGapiInteractivePost', [
  '$parse',
  function (e) {
    var t = 'firstRevenueGapiInteractivePost', o = window.location.origin || window.location.protocol + '//' + window.location.host, n = o + window.location.pathname + 'invite/';
    return {
      restrict: 'A',
      link: function (o, i, r) {
        var s = e(r.firstRevenueGapiInteractivePost)(o), a = {
            contenturl: 'GooglePlusInvitation.html',
            contentdeeplinkid: o.inviteId,
            clientid: CONFIG_1ST_REVENUE.googleClientId,
            cookiepolicy: 'single_host_origin',
            prefilltext: 'Join 1st Revenue to collaborate on model ' + o.canvas.model.fields.name,
            calltoactionlabel: 'INVITE',
            calltoactionurl: n + o.inviteId,
            calltoactiondeeplinkid: o.inviteId,
            recipients: s
          };
        console.log(t, 'Interactive post options=', a), gapi.interactivepost.render(i, a);
      }
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
      r.on('mouseenter.open-tips click.open-tips', '.st-grad', function (a) {
        var l = s.firstRevenueOpenTip;
        if (e.layout.tooltips) {
          console.log('first-revenue-open-tip linkElement=', r, 'this=', this, 'label=', l, 'event=', a);
          var c = o(a), u = t(c), d = $.trim($(this).find('.st-pop').text());
          console.log('tooltips stickerText=[' + d + '], quadrant=', u), d.length > 0 && n(this, u, c), i(this, u), e.hovering = !0, e.$root.$apply();
        }
      });
    };
  }
]), FirstRevenueApp.directive('firstRevenueTypeahead', [
  '$timeout',
  '$parse',
  function (e, t) {
    var o = 'firstRevenueTypeahead', n = [
        'search-query',
        'input-mini',
        'input-small',
        'input-medium',
        'input-large',
        'input-xlarge',
        'input-xxlarge'
      ], i = function (e) {
        for (var t in n) {
          var o = n[t];
          e.hasClass(o) && e.prev().addClass(o);
        }
      };
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (n, r, s) {
        var a = t(s.ngModel), l = a(n);
        n.$watch(s.ngModel, function (e, t) {
          e !== t && (l = e), console.log(o, '$watch modelValue=', l);
        });
        var c = t(s.firstRevenueTypeahead)(n);
        console.log(o, 'dataset=', c), c && (r.typeahead(c), i(r)), n.$watch(s.firstRevenueTypeahead, function (e, n, a) {
          c = t(s.firstRevenueTypeahead)(a), console.log(o, '$watch tah.dataset=', c), r.typeahead('destroy'), r.typeahead(c), i(r);
        }, !0), r.on('typeahead:selected typeahead:autocompleted', function (t, i) {
          console.log(o, 'event $e=', t, 'data=', i), e(function () {
            n.tah.selectedDatum = i, n.selectedUsers[i.service + '-' + i.serviceId] = i;
          });
        });
      }
    };
  }
]), FirstRevenueApp.directive('firstRevenueServiceIcon', [
  '$timeout',
  '$parse',
  function (e, t) {
    return {
      restrict: 'A',
      templateUrl: 'views/ServiceIconSwitch.html',
      link: function (e, o, n) {
        e.service = t(n.firstRevenueServiceIcon)(e), e.$watch(n.firstRevenueServiceIcon, function (e, o, i) {
          i.service = t(n.firstRevenueServiceIcon)(i);
        }, !0);
      }
    };
  }
]), FirstRevenueApp.directive('gplusInvite', [function () {
    var e = 'gplusInvite';
    return {
      restrict: 'EAC',
      replace: !0,
      templateUrl: 'views/people/GPlusInviteButton.html',
      link: function (t, o) {
        var n = {
            contenturl: 'http://prototype.1strevenue.com/1stRevenue/#/invite',
            contentdeeplinkid: '/1stRevenue/#/invite',
            clientid: '1010606663349.apps.googleusercontent.com',
            cookiepolicy: 'http://1strevenue.com',
            prefilltext: 'Join 1stRevenue.com and collaborate with us on business modeling. Use your Google+ account to sign to the application. The original sender of the invitation will be notified when you log on to the 1st Revenue. Create your account at the Join link below:',
            calltoactionlabel: 'JOIN',
            calltoactionurl: 'http://prototype.1strevenue.com/1stRevenue/#/invite',
            calltoactiondeeplinkid: '/1stRevenue/#/invite',
            recipients: t.key
          }, i = o[0];
        gapi.interactivepost.render(i, n), console.log(e, 'createButton partner=', t.partner, 'options=', n, 'element=', o, 'button=', i);
      }
    };
  }]), FirstRevenueApp.directive('openTip', [
  '$window',
  '$timeout',
  'Rainbow',
  function (e, t, o) {
    var n = function (t) {
        var o = $(t), n = o.offset(), i = n.left + t.context.clientWidth / 2, r = n.top + t.context.clientHeight / 2, s = e.innerWidth / 2 > i, a = e.innerHeight / 2 > r;
        return {
          top: a,
          left: s
        };
      }, i = function (e) {
        return (e.top ? 'top' : 'bottom') + ' ' + (e.left ? 'left' : 'right');
      }, r = function (e, t, o) {
        var r = n(e), s = [
            (r.left ? -1 : 1) * $(e).width() / 2,
            (r.top ? -1 : 1) * $(e).height() / 2
          ], a = {
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
        return new Opentip(e, e.find('.st-pop').html(), a);
      }, s = function (e, t) {
        var o = $(e).find('.btn-edit-sticker'), n = $(e).find('.btn-delete-sticker');
        $(e).on('mouseleave', function () {
          $(e).removeClass('st-show-buttons'), o.removeClass('btn-edit-bottom'), o.removeClass('btn-edit-top'), o.removeClass('btn-edit-right'), o.removeClass('btn-edit-left'), n.removeClass('btn-delete-bottom'), n.removeClass('btn-delete-top'), n.removeClass('btn-delete-right'), n.removeClass('btn-edit-left');
        }), $('.st-show-buttons').removeClass('st-show-buttons'), $(e).addClass('st-show-buttons'), t.top ? (o.removeClass('btn-edit-bottom'), o.addClass('btn-edit-top'), n.removeClass('btn-delete-bottom'), n.addClass('btn-delete-top')) : (o.removeClass('btn-edit-top'), o.addClass('btn-edit-bottom'), n.removeClass('btn-delete-top'), n.addClass('btn-delete-bottom')), t.left ? (o.removeClass('btn-edit-right'), o.addClass('btn-edit-left'), n.removeClass('btn-delete-right'), n.addClass('btn-delete-left')) : (o.removeClass('btn-edit-left'), o.addClass('btn-edit-right'), n.removeClass('btn-delete-left'), n.addClass('btn-delete-right'));
      }, a = function (e, t, i, a) {
        t.on(i + '.open-tips', function () {
          var i = $(t).data();
          console.log('openTip linkElement.on', 'data=', i);
          var l = i.opentips, c = o.opaqueField(e.sticker.color), u = null;
          for (var d in l) {
            var p = l[d];
            p.setContent(t.find('.st-pop').html()), p.options.background = c, p.redraw = !0, p.options.showOn === a && (u = p);
          }
          u || (u = r(t, c, a), u.prepareToShow()), s(this, n(t));
        });
      };
    return function (e, t) {
      a(e, t, 'mouseenter', 'mouseover'), a(e, t, 'click', 'click');
    };
  }
]), FirstRevenueApp.factory('BMG', [function () {
    var e = 'BMG';
    console.log(e, 'service launched');
    var t = {
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
      }, o = {
        getBlockPurpose: function (e) {
          return t[e];
        }
      };
    return o;
  }]), FirstRevenueApp.factory('Canvas', [
  'Menu',
  'BMG',
  function (e, t) {
    var o = 'Canvas';
    console.log(o, 'service launched');
    var n = {
        bmg: t,
        view: 'free',
        loaded: !1,
        modelId: 0,
        lastModelId: 0,
        model: null,
        singleBlock: null,
        showBlockInitials: !1,
        readOnly: !1,
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
          return n.model ? _.size(n.model.users) : 0;
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
          return 'free' === n.view && e && angular.isNumber(e.x) && angular.isNumber(e.y) || !1;
        },
        getPosition: function (e) {
          return n.getAbs(e) ? 'left: ' + e.x + '%; top: ' + e.y + '%;' : '';
        },
        switchBlock: function (e) {
          console.log(o, 'switchBlock pane=', e, 'this.model.blocks=', n.model.blocks), n.singleBlock = _.find(n.model.blocks, function (t) {
            return console.log(o, 'switchBlock findingBlock b=', t), t.paneClass === e.icon;
          });
        },
        getBackgroundImageURL: function () {
          return 'images/DemoCanvasModelIcon.png';
        }
      };
    return n;
  }
]), FirstRevenueApp.factory('Favicon', [function () {
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
  }]), FirstRevenueApp.factory('FilePicker', [
  '$timeout',
  function (e) {
    var t = 'FilePicker', o = {
        fpFile: null,
        attachIcon: function (e) {
          o.fpicker(e);
        },
        replaceIcon: function (e) {
          o.removeIcon(e), o.fpicker(e);
        },
        removeIcon: function (n) {
          filepicker.setKey(CONFIG_1ST_REVENUE.filepickerKey), filepicker.remove(n.fields.icon, function () {
            console.log(t, 'removeIcon icon removed'), e(function () {
              o.fpFile = null, n.fields.icon = null;
            });
          }, function (e) {
            console.log(t, 'removeIcon FPError=', e);
          });
        },
        fpicker: function (n) {
          return filepicker.setKey(CONFIG_1ST_REVENUE.filepickerKey), filepicker.pickAndStore({ maxSize: 1048576 }, { location: 'S3' }, function (i) {
            console.log(t, 'filepicker', i), e(function () {
              o.fpFile = i, n.fields.icon = i[0].url;
            });
          }, function (e) {
            console.log(t, 'filepicker error', '' + e);
          }), !1;
        }
      };
    return o;
  }
]), FirstRevenueApp.factory('Firebase', [
  '$rootScope',
  '$timeout',
  '$location',
  '$window',
  'Myself',
  'Layout',
  'Notif',
  function (e, t, o, n, i, r, s) {
    var a = 'Firebase';
    console.log(a, 'service launched');
    var l = {
        endpoint: CONFIG_1ST_REVENUE.firebaseEndpoint,
        nowRemote: null,
        rootRef: null,
        authClient: null,
        notif: s,
        providers: {
          facebook: {
            seq: 1,
            icon: 'facebook',
            title: 'Facebook',
            method: 'simple',
            scope: 'email'
          },
          linkedin: {
            seq: 2,
            icon: 'linkedin',
            title: 'LinkedIn',
            method: 'singly',
            option: 'linkedin'
          },
          gplus: {
            seq: 7,
            icon: 'google-plus',
            title: 'Google+',
            method: 'singly',
            option: 'gplus'
          }
        },
        init: function () {
          l.rootRef = new Firebase(l.endpoint), Firebase.enableLogging(!0), console.log(a, 'init fb.rootRef=', l.rootRef);
        },
        retrieveSession: function () {
          i.authFailed || (l.authClient = new FirebaseSimpleLogin(l.rootRef, l.verifySession));
        },
        resumeSession: function () {
          i.authFailed || (l.authClient = new FirebaseSimpleLogin(l.rootRef, l.generalAuth));
        },
        verifySession: function (e, t) {
          console.log(a, 'verifySession error=', e, 'fbUser=', t);
          var n = !1;
          e ? console.log(a, 'verifySession Firebase returned an error=', e) : t ? (console.log(a, 'verifySession Firebase auth success fbUser=', t, 'sessionKey=', t.sessionKey), n = !0) : console.log(a, 'verifySession Firebase auth returned null fbUser=', t, '$location=', o), n && i.mp.setLastUser(t), i.processInvite(n);
        },
        clearSession: function () {
          FirebaseSimpleLogin.prototype.clearSession();
        },
        setAdmin: function (e) {
          i.adminRole = e;
        },
        generalAuth: function (e, t) {
          if (console.log(a, 'generalAuth error=', e, 'fbUser=', t), i.mp.clearLastUser(), e)
            console.log(a, 'generalAuth Firebase returned an error=', e), l.authFailed(e);
          else if (t) {
            if (console.log(a, 'generalAuth Firebase auth success fbUser=', t, 'sessionKey=', t.sessionKey), i.mp.setLastUser(t), t.sessionKey)
              FirebaseSimpleLogin.prototype.saveSession(t.firebaseAuthToken, t), delete t.sessionKey;
            else {
              var n = FirebaseSimpleLogin.prototype.readCookie('firebaseSessionKey');
              console.log(a, 'sessionKey from cookie firebaseSessionKey=', n), t.firebaseSessionKey = n;
            }
            var r = l.rootRef.child('usermap'), s = r.child(t.provider).child(t.id);
            s.once('value', function (e) {
              console.log(a, 'generalAuth', 'mapUserRef once value=', e.val()), l.checkUserMap(e.val(), t, s);
            });
          } else
            console.log(a, 'generalAuth Firebase auth returned null fbUser=', t, '$location=', o), l.authFailed();
        },
        checkUserMap: function (e, t, o) {
          if (e) {
            var n = l.rootRef.child('users').child(e);
            n.once('value', function (n) {
              var i = n.val();
              console.log(a, 'checkUserMap', 'userRef once urValue=', i), i ? (console.log(a, 'checkUserMap', 'userRef urValue=', i), l.openSession(e, t)) : (console.log(a, 'checkUserMap', 'Remove orphan from user map: fbUser=', t), o.remove(function () {
                console.log(a, 'checkUserMap', 'Orphan removed from user map: fbUser=', t), l.authFailed({
                  code: 'USER_UNKNOWN',
                  message: t.service + ' user ' + (t.name ? t.name : '') + ' (id=' + t.id + ') not found in 1st Revenue',
                  user: t
                });
              }));
            });
          } else
            console.log(a, 'checkUserMap', 'No record in user map for fbUser=', t, 'firebaseSessionKey=', t.firebaseSessionKey), l.clearSession(), console.log(a, 'checkUserMap', 'Firebase session cleared'), t.service = t.service || t.provider, l.authFailed({
              code: 'USER_UNKNOWN',
              message: l.providers[t.service].title + ' user ' + (t.name ? t.name : '') + ' (id=' + t.id + ') not found in 1st Revenue',
              user: t
            });
        },
        authFailed: function (e) {
          console.log(a, 'authFailed error=', e), i.authError(e), t(function () {
            '/entry' === o.$$url ? r.setView('signin') : o.url('/entry');
          });
        },
        openSession: function (t, o, n) {
          console.log(a, 'openSession userId=', t, 'fbUser=', o, 'modelId=', n), i.wakeup(l.rootRef, t, n), console.log(a, 'openSession resolving launch promise'), e.deferredLaunch.resolve(), analytics.identify(t, {
            id: o.id,
            provider: o.provider,
            name: o.name
          });
        },
        log: function (e) {
          var t = new Date(), o = t.getUTCFullYear(), n = t.getUTCMonth(), r = t.getUTCDate(), s = t.getUTCHours(), a = l.rootRef.child('log').child(o).child(n).child(r).child(s);
          e.time = t.getTime(), e.timeISO = t.toISOString(), e.user = i.sync.user.primary, a.push(e);
        },
        createModel: function (e, o) {
          console.log(a, 'createModel modelName=', e);
          var n = l.rootRef.child('models'), r = n.push(), s = r.name(), c = {
              fields: { name: e },
              users: {},
              owner: i.userId
            };
          return c.users[i.userId] = !0, console.log(a, 'createModel modelUpdate=', c), i.sync.models[s] = {
            fields: {},
            users: {}
          }, r.set(c, function (n, r) {
            console.log(a, 'createModel model created', 'modelUpdate=', c, 'modelName=', e, 'error=', n, 'dummy=', r), l.log({
              op: n ? 'createModel-error' : 'createModel',
              error: n,
              path: '/models/' + s,
              model: c
            }), n || (i.sync.user.models = i.sync.user.models || {}, i.sync.user.models[s] = !0, t(function () {
              o();
            }));
          }), s;
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
    return l;
  }
]), FirstRevenueApp.factory('FullScreen', [
  '$window',
  'Notif',
  function (e, t) {
    var o = 'FullScreen';
    return console.log(o, 'service launched'), {
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
  }]), FirstRevenueApp.factory('JWT', [function () {
    var e = 'JWT';
    return console.log(e, 'service launched'), {
      decodeJWT: function (t) {
        console.log(e, 'decodeJWT token=', t);
        var o = t.split('.');
        if (3 !== o.length)
          throw Error('Not enough or too many segments');
        var n = o[0], i = o[1], r = o[2];
        console.log(e, 'decodeJWT', 'headerSeg=', n, 'payloadSeg=', i, 'signatureSeg=', r);
        var s = this.base64urldecode(n), a = this.base64urldecode(i), l = this.base64urldecode(r);
        return console.log(e, 'decodeJWT', 'header=', s, 'payload=', a, 'signature=', l), [
          JSON.parse(s),
          JSON.parse(a),
          l
        ];
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
  'Popup',
  'Zoom',
  'FullScreen',
  'Menu',
  function (e, t, o, n, i) {
    var r = 'Layout';
    console.log(r, 'loaded');
    var s = [
        'canvas',
        'zoom',
        'comment',
        'stream',
        'list'
      ], a = [
        'comment',
        'stream',
        'list'
      ], l = {
        title: '',
        colorValue: 100,
        view: '',
        tooltips: !0,
        profile: !0,
        qrCode: !1,
        guide: { wide: !0 },
        peer: { wide: !0 },
        editor: {
          model: !1,
          sticker: !1,
          contact: !1,
          user: !1
        },
        setView: function (e) {
          this.view = e;
        },
        isView: function (e) {
          return this.view === e;
        },
        showCanvas: function () {
          return _.contains(_.union(s, a), l.view);
        },
        showSideView: function () {
          return _.contains(a, l.view);
        },
        reset: function () {
          t.reset(), o.reset(), l.view = '', l.guide.wide = !0, l.peer.wide = !1;
        },
        getLayoutClasses: function () {
          var e = [o.getZoomClass(l.isView('canvas') ? 0 : null)];
          return l.editor.sticker && e.push('edit-sticker'), e;
        },
        isFullScreen: function () {
          return e.navigator.standalone;
        },
        showButtons: function () {
          return 'canvas' === i.selected;
        }
      };
    return l;
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
  }]), FirstRevenueApp.factory('MemberCatalog', [function () {
    return {
      sort: null,
      getMembers: function () {
      },
      getTitle: function (e) {
        return e.title ? e.title[0] : '';
      },
      getFullTitle: function (e) {
        return _.reduce(e.title || [], function (e, t) {
          return (e ? e + '\n' : '') + t;
        });
      },
      modelCount: function (e) {
        return e.models ? _.size(e.models) : 0;
      },
      highlightModels: function (e) {
        console.log('highlightModels member=', e, 'event=', event), $(event.target).parent().children().css('color', 'darkred');
      }
    };
  }]), FirstRevenueApp.factory('Menu', [
  '$window',
  function (e) {
    var t = '1st Revenue', o = {
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
          o[e] = !o[e];
        },
        setTitle: function (n) {
          var i = n ? 0 > n.indexOf(t) ? n + ' - ' + t : n : t;
          o.title = e.document.title = i;
        }
      };
    return o;
  }
]), FirstRevenueApp.factory('Modal', [function () {
    var e = {
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
        openDeleteStickerDialog: function (t, o) {
          e.stickerId = t, e.sticker = o, e.isDeleteAllowed(t) ? e.del = !0 : e.delNoRights = !0;
        },
        isDeleteAllowed: function () {
          return !0;
        }
      };
    return e;
  }]), FirstRevenueApp.factory('ModelCatalog', [
  'TagCatalog',
  'Myself',
  function (e, t) {
    var o = 'ModelCatalog';
    console.log(o, 'service loaded');
    var n = {
        sort: 'time',
        tag: '*',
        ascending: !0,
        backInTime: !0,
        refreshModels: function () {
        },
        getModel: function (e) {
          return t.sync.models[e];
        },
        isMine: function (e) {
          return t.sync.models[e].owner === t.userId;
        },
        isPublic: function (e) {
          return t.sync.public.models && !!t.sync.public.models[e];
        },
        isShared: function (e) {
          return !!t.sync.user.models[e] && !n.isMine(e);
        },
        isReadOnly: function (e) {
          return n.isPublic(e) && !t.sync.user.models[e];
        },
        getModelsNew3: function (e) {
          var o = {};
          return _.each(t.sync.models, function (t, i) {
            var r = n.isPublic(i);
            ('all' === e || 'public' === e && r || 'my' === e && !r) && (t.id = i, o[i] = t);
          }), this.sortModelList(o);
        },
        getModels: function (e) {
          var o = [];
          return _.each(t.sync.models, function (t, i) {
            t.id = i;
            var r = n.isPublic(i), s = n.isMine(i), a = n.isShared(i);
            ('all' === e || 'public' === e && r || 'shared' === e && a || 'my' === e && s) && o.push(t);
          }), this.sortModelList(o);
        },
        getModelIdList: function (e) {
          var o = [];
          return _.each(t.sync.models, function (t, i) {
            if (t && t.fields) {
              var r = n.isPublic(i), s = n.isMine(i), a = n.isShared(i);
              ('all' === e || 'public' === e && r || 'shared' === e && a || 'my' === e && s) && o.push(i);
            }
          }), this.sortModelIdList(o);
        },
        getFields: function (e) {
          return t.sync.models[e].fields;
        },
        getTags: function (e) {
          return t.sync.models[e].tags;
        },
        sortModelIdList: function (e) {
          var o = e;
          return 'name' === this.sort && (o = _.sortBy(e, function (e) {
            return t.sync.models[e].fields.name;
          }), this.ascending || o.reverse()), 'time' === this.sort && (o = _.sortBy(e, function (e) {
            return e;
          }), this.backInTime && o.reverse()), o;
        },
        sortModelList: function (e) {
          var t = e;
          return 'name' === this.sort && (t = _.sortBy(e, function (e) {
            return e.fields.name;
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
          var o = t.sync.models[e];
          return o.users ? _.size(o.users) : 0;
        },
        highlightMembers: function (e) {
          console.log(o, 'highlightMembers modelId=', e, 'event=', event);
        },
        getAllTags: function () {
          var e = [];
          return _.each(t.sync.models, function (t) {
            console.log(o, 'getAllTags model loop model.id=', t.id), _.each(t.tags, function (t) {
              console.log(o, 'getAllTags tag loop tag.text=', t.text), e.push({
                text: t.text,
                type: 'info',
                count: 1
              });
            });
          }), console.log(o, 'getAllTags allTags=', e), e;
        },
        sortModels: function (e) {
          'name' === this.sort ? 'name' === e ? this.ascending = !this.ascending : (this.sort = e, this.ascending = !0) : 'time' === this.sort && ('time' === e ? this.backInTime = !this.backInTime : (this.sort = e, this.backInTime = !0));
        },
        labelColor: function (e) {
          return e === this.tag ? 'label-success' : 'label-info';
        },
        filterMatch: function (t) {
          var o = n.getTags(t), i = e.tag, r = !1;
          if (i)
            if ('*' === i)
              r = !0;
            else {
              var s = _.find(o, function (e) {
                  return e.text === i;
                });
              r = !!s;
            }
          else
            r = 0 === o.length;
          return r;
        }
      };
    return n;
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
  }]), FirstRevenueApp.factory('Notif', [
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
        var o = e.r / 255, n = e.g / 255, i = e.b / 255, r = Math.min(o, n, i), s = Math.max(o, n, i), a = s - r;
        if (t.v = s, 0 === a)
          t.h = 0, t.s = 0;
        else {
          t.s = a / s;
          var l = ((s - o) / 6 + a / 2) / a, c = ((s - n) / 6 + a / 2) / a, u = ((s - i) / 6 + a / 2) / a;
          o === s ? t.h = u - c : n === s ? t.h = 1 / 3 + l - u : i === s && (t.h = 2 / 3 + c - l), 0 > t.h && (t.h += 1), t.h > 1 && (t.h -= 1);
        }
        t.h *= 360, t.s *= 100, t.v *= 100;
      },
      hsv2rgb: function (e, t) {
        var o = e.h / 360, n = e.s / 100, i = e.v / 100;
        if (0 === n)
          t.r = 255 * i, t.g = 255 * i, t.b = 255 * i;
        else {
          var r, s, a, l = 6 * o, c = Math.floor(l), u = i * (1 - n), d = i * (1 - n * (l - c)), p = i * (1 - n * (1 - (l - c)));
          0 === c ? (r = i, s = p, a = u) : 1 === c ? (r = d, s = i, a = u) : 2 === c ? (r = u, s = i, a = p) : 3 === c ? (r = u, s = d, a = i) : 4 === c ? (r = p, s = u, a = i) : (r = i, s = u, a = d), t.r = 255 * r, t.g = 255 * s, t.b = 255 * a;
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
  }]), FirstRevenueApp.factory('TagCatalog', [function () {
    return {
      tag: '*',
      getTagCloud: function () {
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
      },
      getTaggedCount: function () {
        return this.getModelCount() - this.getUntaggedCount();
      },
      getUntaggedCount: function () {
        var e = 0;
        return e;
      }
    };
  }]), FirstRevenueApp.factory('Zoom', [
  'Popup',
  'Canvas',
  function (e, t) {
    var o = 'Zoom';
    console.log(o, 'loaded');
    var n = {
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
      }, i = {
        choice: 0,
        singleBlock: !1,
        levels: n,
        canvas: t,
        getZoomClass: function (e) {
          var t = angular.isNumber(e) ? e : i.choice;
          return 'canvas-' + n[t].label;
        },
        reset: function () {
          i.choice = 0, i.singleBlock = !1;
        },
        zoom: function (t) {
          console.log(o, 'choice=', t), i.choice = t, e.zoom = !1;
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('Renderer', [function () {
    var e = 'Renderer', t = [
        '1R Model',
        'Competitors',
        'CustSegm',
        'Team',
        'MarketTrends',
        'MetaData',
        'Incubators',
        'SegmChan'
      ], o = {
        render: function (e, t) {
          var n = arbor.ParticleSystem();
          n.parameters({
            stiffness: 900,
            repulsion: 2000,
            gravity: !0,
            dt: 0.015
          }), n.renderer = o.create(e), n.graft(t);
        },
        create: function (o) {
          var n = $(o), i = n.get(0), r = i.getContext('2d'), s = arbor.Graphics(i), a = null, l = null, c = null, u = null, d = null, p = {
              init: function (t) {
                console.log(e, 'init pSystem=', t), a = t, a.screen({
                  size: {
                    width: n.width(),
                    height: n.height()
                  },
                  padding: [
                    36,
                    60,
                    36,
                    60
                  ]
                }), $(window).resize(p.resize), p.resize(), p._initMouseHandling();
              },
              resize: function () {
                console.log(e, 'resize'), i.width = $(window).width() - 250, i.height = $(window).height() - 150, console.log(e, 'resize width=', i.width, 'height=', i.height), a.screen({
                  size: {
                    width: i.width,
                    height: i.height
                  }
                }), l = null, p.redraw();
              },
              redraw: function () {
                s.clear(), a.eachEdge(function (e, t, o) {
                  0 !== e.source.data.alpha * e.target.data.alpha && s.line(t, o, {
                    stroke: '#b2b19d',
                    width: 2,
                    alpha: e.target.data.alpha
                  });
                }), a.eachNode(function (e, t) {
                  var o = Math.max(20, 20 + s.textWidth(e.name));
                  0 !== e.data.alpha && ('dot' === e.data.shape && (s.oval(t.x - o / 2, t.y - o / 2, o, o, {
                    fill: e.data.color,
                    alpha: e.data.alpha
                  }), p._drawName(e, t, 7), p._drawName(e, t, 7)), 'square' === e.data.shape ? (s.rect(t.x - o / 2, t.y - o / 2, o, o, 4, {
                    fill: e.data.color,
                    alpha: e.data.alpha
                  }), p._drawName(e, t, 9, 'black'), p._drawName(e, t, 9, 'black')) : (s.rect(t.x - o / 2, t.y - 8, o, 20, 4, {
                    fill: e.data.color,
                    alpha: e.data.alpha
                  }), p._drawName(e, t, 9), p._drawName(e, t, 9)));
                }), p._drawVignette();
              },
              _drawName: function (e, t, o, n) {
                s.text(e.name, t.x, t.y + o, {
                  color: n ? n : 'white',
                  align: 'center',
                  font: 'Arial',
                  size: 12
                });
              },
              _drawVignette: function () {
                var e = i.width, t = i.height, o = 20;
                if (!l) {
                  var n = r.createLinearGradient(0, 0, 0, o);
                  n.addColorStop(0, '#e0e0e0'), n.addColorStop(0.7, 'rgba(255,255,255,0)');
                  var s = r.createLinearGradient(0, t - o, 0, t);
                  s.addColorStop(0, 'rgba(255,255,255,0)'), s.addColorStop(1, 'white'), l = {
                    top: n,
                    bot: s
                  };
                }
                r.fillStyle = l.top, r.fillRect(0, 0, e, o), r.fillStyle = l.bot, r.fillRect(0, t - o, e, o);
              },
              switchSection: function (e) {
                var t = a.getEdgesFrom(e)[0].source, o = $.map(a.getEdgesFrom(e), function (e) {
                    return e.target;
                  });
                a.eachNode(function (e) {
                  var n = $.inArray(e, o) >= 0, i = n ? 1 : 0;
                  1 === i && (e.p.x = t.p.x + 0.05 * Math.random() - 0.025, e.p.y = t.p.y + 0.05 * Math.random() - 0.025, e.tempMass = 0.001);
                });
              },
              _initMouseHandling: function () {
                c = null, u = null;
                var e = null, o = null, r = {
                    moved: function (e) {
                      var r = $(i).offset();
                      return d = arbor.Point(e.pageX - r.left, e.pageY - r.top), u = a.nearest(d), u && u.node ? ('dot' !== u.node.data.shape ? (c = 50 > u.distance ? u : null, c ? (n.addClass('linkable'), c.node.data && c.node.data.link && (window.status = c.node.data.link.replace(/^\//, 'http://' + window.location.host + '/').replace(/^#/, ''))) : (n.removeClass('linkable'), window.status = '')) : $.inArray(u.node.name, t) >= 0 && (u.node.name !== o && (o = u.node.name, p.switchSection(o)), n.removeClass('linkable'), window.status = ''), !1) : !1;
                    },
                    clicked: function (t) {
                      var o = $(i).offset();
                      if (d = arbor.Point(t.pageX - o.left, t.pageY - o.top), u = e = a.nearest(d), u && c && u.node === c.node) {
                        var n = c.node.data.link;
                        return n && (n.match(/^#/) ? $(p).trigger({
                          type: 'navigate',
                          path: n.substr(1)
                        }) : window.location = n), !1;
                      }
                      return e && null !== e.node && (e.node.fixed = !0), $(i).unbind('mousemove', r.moved), $(i).bind('mousemove', r.dragged), $(window).bind('mouseup', r.dropped), !1;
                    },
                    dragged: function (t) {
                      var o = $(i).offset(), n = arbor.Point(t.pageX - o.left, t.pageY - o.top);
                      if (u) {
                        if (null !== e && null !== e.node) {
                          var r = a.fromScreen(n);
                          e.node.p = r;
                        }
                        return !1;
                      }
                    },
                    dropped: function () {
                      return null !== e && void 0 !== e.node ? (null !== e.node && (e.node.fixed = !1), e.node.tempMass = 1000, e = null, $(i).unbind('mousemove', r.dragged), $(window).unbind('mouseup', r.dropped), $(i).bind('mousemove', r.moved), d = null, !1) : void 0;
                    }
                  };
                $(i).mousedown(r.clicked), $(i).mousemove(r.moved);
              }
            };
          return p;
        }
      };
    return o;
  }]), FirstRevenueApp.factory('StickerEditor', [
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
        if (t.focus(), e.getSelection !== void 0 && e.document.createRange !== void 0) {
          var o = e.document.createRange();
          o.selectNodeContents(t), o.collapse(!1);
          var n = e.getSelection();
          n.removeAllRanges(), n.addRange(o);
        } else if (e.document.body.createTextRange !== void 0) {
          var i = e.document.body.createTextRange();
          i.moveToElementText(t), i.collapse(!1), i.select();
        }
      }
    };
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
      wasModelModified: function () {
        return !0;
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
]), FirstRevenueApp.factory('Auth', [
  '$rootScope',
  '$location',
  '$resource',
  '$q',
  'Firebase',
  'Myself',
  'Singly',
  function (e, t, o, n, i, r, s) {
    var a = 'Auth';
    return console.log(a, 'service launched'), {
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
          console.log('Auth.signupPasswordAuth email=', r.email, 'password=', r.password), e ? console.log('Auth.signupPasswordAuth error=', e) : (console.log('Auth.signupPasswordAuth success user id=', t.id, 'email', r.email), i.authClient.login('password', {
            email: r.email,
            password: r.password,
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
]), FirstRevenueApp.factory('Credentials', [
  '$timeout',
  'Firebase',
  'Myself',
  '$q',
  function (e, t, o, n) {
    var i = 'Credentials';
    console.log(i, 'Service launched');
    var r = o.mp, s = {
        deferred: null,
        fb: t,
        fbAuthClient: null,
        fbUser: null,
        providers: t.providers,
        init: function (e) {
          console.log(i, 'init'), s.fbAuthClient = e;
        },
        saveChanges: function () {
          console.log(i, 'saveChanges', 'userId=', o.userId), s.mapRef = s.fb.rootRef.child('usermap'), s.accRef = s.fb.rootRef.child('users'), o.userId ? (s.recRef = s.accRef.child(o.userId), console.log(i, 'saveChanges uses existing user for recRef')) : (s.recRef = s.accRef.push(), o.userId = s.recRef.name(), console.log(i, 'saveChanges creates new user for recRef userId=', o.userId)), s.loadCred(r.firstCred).then(s.recurseCred);
        },
        loadCred: function (e) {
          console.log(i, 'loadCred', 'cred=', e);
          var t = n.defer();
          return e.detached ? s.deleteCred(e, t) : s.processCred(e, t), t.promise;
        },
        recurseCred: function (e) {
          console.log(i, 'recurseCred', 'cred=', e), e ? s.loadCred(e).then(s.recurseCred) : s.doneCred();
        },
        deleteCred: function (e, t) {
          console.log(i, 'deleteCred', 'cred=', e);
          var n = e.profile;
          r.primaryToken === e.token && (r.primaryToken = r.firstCred ? r.firstCred.token : null), r.deleteAccount(n, e), console.log(i, 'deleteCred', 'profile.provider=', n.provider, 'profile.id=', n.id);
          var a = s.mapRef.child(n.provider).child(n.id);
          s.fb.rootRef.auth(e.token, function (n) {
            n ? s.mapSetAuthError(t, n) : a && (console.log(i, 'deleteCred', 'setUserMap mapUserRef found, userId=', o.userId), s.removeUserMap(t, a, e));
          });
        },
        processCred: function (e, t) {
          console.log(i, 'processCred', 'cred=', e, 'deferred=', t);
          var n = e.profile;
          r.primaryToken || (r.primaryToken = e.token), r.storeAccount(n, e), console.log(i, 'processCred', 'profile.provider=', n.provider, 'profile.id=', n.id);
          var a = s.mapRef.child(n.provider).child(n.id);
          s.fb.rootRef.auth(e.token, function (n) {
            n ? s.mapSetAuthError(t, n) : a && (console.log(i, 'processCred', 'setUserMap mapUserRef found, userId=', o.userId), s.setUserMap(t, a, e));
          });
        },
        removeUserMap: function (t, o, n) {
          o.remove(function (o) {
            o ? (console.log(i, 'removeUserMap user map set error=', o), e(function () {
              t.reject(o);
            })) : (console.log(i, 'removeUserMap user map record removed, cred.next=', n.next), e(function () {
              t.resolve(n.next);
            }));
          });
        },
        setUserMap: function (t, n, r) {
          n.set(o.userId, function (o) {
            o ? (console.log(i, 'setUserMap user map set error=', o), e(function () {
              t.reject(o);
            })) : (console.log(i, 'setUserMap user map record created, cred.next=', r.next), e(function () {
              t.resolve(r.next);
            }));
          });
        },
        mapSetAuthError: function (t, o) {
          'EXPIRED_TOKEN' === o.code ? console.log(i, 'mapSetAuthError error=', o, 'Processing expired token') : (console.log(i, 'mapSetAuthError', 'user map set auth failed error=', o), e(function () {
            t.reject(o);
          }));
        },
        doneCred: function () {
          console.log(i, 'doneCred primaryToken=', r.primaryToken), r.primaryToken ? s.fb.rootRef.auth(r.primaryToken, function (e) {
            e ? console.log(i, 'doneCred', 'user account set auth failed error=', e) : s.recRef.set(o.mp.user, s.doneCredSet);
          }) : console.log(i, 'doneCred', 'primaryToken not found');
        },
        doneCredSet: function (t) {
          e(function () {
            if (t)
              console.log(i, 'doneCred user account set error=', t);
            else {
              console.log(i, 'doneCred user account record created');
              var e = o.mp.user.primary, n = o.mp.user.accounts[e].authentic;
              'singly' === n.provider ? console.log(i, 'doneCred provider singly authUser=', n) : (console.log(i, 'doneCred openSession authUser=', n), n.sessionKey = n.firebaseSessionKey, s.fbAuthClient.saveSession(r.primaryToken, n), o.authenticated = !0), s.fb.openSession(s.recRef.name(), n), o.mp.user = null;
            }
          });
        }
      };
    return s;
  }
]), FirstRevenueApp.factory('Invite', [
  '$timeout',
  '$resource',
  '$location',
  '$q',
  'Firebase',
  'Auth',
  'Myself',
  function (e, t, o, n, i, r, s) {
    var a = 'Invite';
    console.log(a, 'Service launched');
    var l = [
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
        res: t,
        inviteId: null,
        inviteValue: null,
        inviteRef: null,
        setInvite: function (e, t) {
          console.log(a, 'setInvite id=', e), u.inviteId = e, t.then(function (t) {
            console.log(a, 'setInvite then id=', e, 'v=', t), u.inviteValue = t;
          });
        },
        ignoreInvite: function () {
          console.log(a, 'ignoreInvite'), i.generalAuth(null, s.getLastUser());
        },
        abandonSession: function () {
          console.log(a, 'abandonSession'), i.authClient.clearSession(), i.rootRef.unauth();
        },
        acceptInvite: function (e) {
          console.log(a, 'acceptInvite', 'service=', e), u.abandonSession(), u.authenticateInvite(e).then(u.inviteAuthenticated).then(u.inviteAuthorized).then(u.inviteExisting).then(u.userFetched).then(u.processInvite).then(u.doneInvite).then(u.createNewUser).then(u.updateInviteRecord).then(u.saveSession).then(u.inviteModels).then(u.attachModelsToUser).then(u.finishInvite, u.inviteFailed);
        },
        rejectResolve: function (t, o, n, i) {
          if (t) {
            var r = i || t;
            console.log(a, 'rejectResolve', 'rejecting error=', r), o.reject(r);
          } else
            'function' == typeof n ? (console.log(a, 'rejectResolve', 'calling success'), n()) : (console.log(a, 'rejectResolve', 'resolving success=', n), e(function () {
              o.resolve(n);
            }));
        },
        authenticateInvite: function (e) {
          var t = n.defer();
          if (_.contains(l, e)) {
            var o = u.providers[e].scope, i = { rememberMe: !0 };
            o && (i.scope = o), console.log(a, 'authenticateInvite', 'Firebase service scope=', o, 'options=', i), u.fb.authClient.launchAuthWindow(e, i, function (e, o, n) {
              u.rejectResolve(e, t, function () {
                n.firebaseAuthToken = o, u.cbInvite(t, n);
              });
            });
          } else
            _.contains(c, e) && (console.log(a, 'authenticateInvite', 'Singly service'), console.log(a, 'authenticateInvite', '$timeout call Auth.launchSinglyAuth'), r.launchSinglyAuth(e, function (e, o) {
              u.rejectResolve(e, t, function () {
                u.cbInvite(t, o);
              });
            }));
          return t.promise;
        },
        cbInvite: function (t, o) {
          console.log(a, 'cbInvite', 'Invite=', u, 'user=', o), o ? (console.log(a, 'cbInvite', 'resolving ivUser=', o), e(function () {
            t.resolve(o);
          })) : (console.log(a, 'cbInvite', 'null user'), s.authFailed = !0, t.reject('Authentication failed'));
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
            u.inviteMatch(e) ? (console.log(a, 'inviteAuthenticated', 'invite already accepted by yourself'), s.authFailed = !1) : t.reject('The invite was already accepted, it was addressed to another user.');
            break;
          default:
            t.reject('App error. Unknown invite status=', o);
          }
          return s.authFailed || (console.log(a, 'inviteAuthenticated', 'sessionKey=', e.sessionKey), e.firebaseSessionKey = e.sessionKey || null, u.fb.rootRef.auth(e.firebaseAuthToken, function (o) {
            u.rejectResolve(o, t, e);
          })), t.promise;
        },
        inviteAuthorized: function (t) {
          var o = n.defer();
          console.log(a, 'inviteAuthorized', 'ivUser=', t);
          var i = u.fb.rootRef.child('usermap'), r = i.child(t.provider).child(t.id);
          return r.once('value', function (n) {
            console.log(a, 'inviteAuthorized', 'mapUserRef once value=', n.val()), t.mapValue = n.val(), e(function () {
              o.resolve(t);
            });
          }), o.promise;
        },
        inviteMatch: function (e) {
          var t = u.inviteValue;
          return 'singly' === e.provider ? e.service === t.service && e.services[e.service].id === t.serviceId : e.provider === t.service && e.id === t.serviceId;
        },
        inviteExisting: function (t) {
          var o = n.defer();
          if (console.log(a, 'inviteExisting', 'mapValue=', t.mapValue, 'ivUser=', t), t.mapValue) {
            console.log(a, 'inviteExisting', 'found usermap for user', t.provider + '/' + t.id, 'value=', t.mapValue);
            var i = u.fb.rootRef.child('users').child(t.mapValue);
            i.once('value', function (n) {
              var r = n.val();
              console.log(a, 'inviteExisting', 'userRecordRef once value userRecord=', r), e(function () {
                t.record = r, u.recRef = i, u.userId = n.name(), u.fbUser = t, o.resolve(t);
              });
            }, function (e) {
              console.log(a, 'inviteExisting', 'userRecordRef once value error=', e), o.reject(e);
            });
          } else
            o.resolve(t);
          return o.promise;
        },
        userFetched: function (e) {
          console.log(a, 'userFetched', 'ivUser=', e);
          var t = n.defer(), o = e.record;
          return o ? u.inviteRef.update({
            status: 'accepted',
            userId: u.userId,
            profile: o.profile
          }, function (o) {
            o ? t.reject(o) : (u.fbUser = e, console.log(a, 'userFetched', 'create promise chain shortcut to finish'), u.inviteModels().then(u.attachModelsToUser).then(u.finishInvite, u.inviteFailed), console.log(a, 'userFetched', 'abandon the main promise chain'), t.reject({
              code: 'EXISTING_USER_FOUND',
              message: 'An existing user found'
            }));
          }) : u.createInvitedUser(t, e), t.promise;
        },
        createInvitedUser: function (e, t) {
          if (console.log(a, 'createInvitedUser', 'ivUser=', t), t) {
            var o = s.mp.storeInviteCredentials(t);
            u.mapRef = u.fb.rootRef.child('usermap'), u.accRef = u.fb.rootRef.child('users'), u.recRef = u.accRef.push(), u.userId = u.recRef.name(), u.fbUser = t, e.resolve(o);
          } else
            e.reject({
              code: 'NO_USER',
              message: 'No authenticated user passed to createInvitedUser'
            });
        },
        processInvite: function (e) {
          var t = n.defer();
          console.log(a, 'doneInvite cred=', e), u.primaryToken = e.token;
          var o = e.profile;
          s.mp.storeAccount(o, e);
          var i = u.mapRef.child(o.provider).child(o.id);
          return console.log(a, 'processInvite', 'profile.provider=', o.provider, 'profile.id=', o.id), u.fb.rootRef.auth(e.token, function (o) {
            o ? (console.log(a, 'processInvite', 'user map set auth failed error=', o), t.reject(o)) : i && (console.log(a, 'processInvite', 'setUserMap mapUserRef found, userId=', u.userId), i.set(u.userId, function (o) {
              u.rejectResolve(o, t, e);
            }));
          }), t.promise;
        },
        doneInvite: function (e) {
          var t = n.defer();
          console.log(a, 'doneInvite cred=', e), u.primaryToken = e.token;
          var o = e.profile;
          return s.mp.storeAccount(o, e), u.primaryToken && u.fb.rootRef.auth(u.primaryToken, function (o) {
            console.log(a, 'createNewUser user account set error=', o, 'cred=', e), u.rejectResolve(o, t, e);
          }), t.promise;
        },
        createNewUser: function (e) {
          var t = n.defer();
          return s.mp.user.inviteId = u.inviteId, u.recRef.set(s.mp.user, function (o) {
            console.log(a, 'createNewUser user account set error=', o, 'cred=', e), u.rejectResolve(o, t, e);
          }), t.promise;
        },
        updateInviteRecord: function (e) {
          console.log(a, 'updateInviteRecord cred=', e);
          var t = n.defer(), o = {
              status: 'accepted',
              userId: u.userId
            };
          return console.log(a, 'saveSession inviteUpdate=', o, 'cred=', e), u.inviteRef.update(o, function (o) {
            console.log(a, 'saveSession invite profile stored error=', o), u.rejectResolve(o, t, e);
          }), t.promise;
        },
        saveSession: function (e) {
          var t = n.defer();
          console.log(a, 'saveSession cred=', e), console.log(a, 'saveSession user account record created');
          var o = s.mp.user.primary, i = s.mp.user.accounts[o].authentic;
          return 'singly' === i.provider ? console.log(a, 'saveSession provider singly authUser=', i) : (console.log(a, 'saveSession openSession authUser=', i), u.fb.authClient.saveSession(u.primaryToken, i), s.authenticated = !0, u.inviteValue.models ? console.log(a, 'saveSession models=', u.inviteValue.models) : console.log(a, 'saveSession no models'), t.resolve(null)), console.log(a, 'saveSession returning promise=', t.promise), t.promise;
        },
        inviteModels: function () {
          console.log(a, 'inviteModels userId=', u.userId);
          var e = _.keys(u.inviteValue.models || {});
          console.log(a, 'inviteModels modelIds=', e);
          var t = [];
          return _.each(e, function (e) {
            console.log(a, 'inviteModels modelId=', e);
            var o = u.fb.rootRef.child('models').child(e), i = n.defer();
            t.push(i.promise), console.log(a, 'inviteModels setting userId=', u.userId), o.child('users').child(u.userId).set(u.inviteId, function (t) {
              console.log(a, 'inviteModels user userId=', u.userId, 'added to model modelId=', e), u.rejectResolve(t, i, o.name());
            });
          }), n.all(t);
        },
        attachModelsToUser: function (e) {
          var t = n.defer();
          console.log(a, 'attachModelsToUser modelIds=', e);
          var o = {};
          return _.each(e, function (n) {
            o[n] = !0, u.recRef.child('models').update(o, function (o) {
              u.rejectResolve(o, t, e);
            });
          }), t.promise;
        },
        finishInvite: function (e) {
          console.log(a, 'finishInvite modelIds=', e), u.completed = !0;
          var t = null;
          1 === _.size(e) && (t = e[0], u.modelId = t), o.path('/repo'), i.openSession(u.userId, u.fbUser);
        },
        inviteFailed: function (t) {
          console.log(a, 'inviteFailed error=', t), e(function () {
            u.error = { message: t };
          });
        }
      };
    return u;
  }
]), FirstRevenueApp.factory('Register', [
  '$timeout',
  '$resource',
  '$q',
  'Firebase',
  'Auth',
  'Myself',
  function (e, t, o, n, i, r) {
    var s = 'Register';
    console.log(s, 'Service launched');
    var a = r.mp, l = {
        deferred: null,
        fb: n,
        fbAuthClient: null,
        fbUser: null,
        providers: n.providers,
        res: t,
        init: function () {
          console.log(s, 'init'), l.fb.clearSession(), l.fbAuthClient = new FirebaseSimpleLogin(l.fb.rootRef, l.cbVerify), a.services = {}, a.credentials = {};
          var e = a.getLastUser();
          return e && (console.log(s, 'init attaching the last user firebaseSessionKey=', e.firebaseSessionKey), l.cbVerify(null, e)), l.fbAuthClient;
        },
        unusedProviders: function () {
          return _.omit(l.providers, _.keys(a.services));
        },
        attach: function (e, t, o) {
          r.error = null, console.log(s, 'attach service=', e);
          var n = a.credentials[e];
          if (n && n.detached)
            console.log(s, 'attach - re-attach service=', e), n.detached = !1, a.services[e] = n.services[e];
          else if (a.isSameUser(e))
            console.log(s, 'attach - same user found for service=', e), l.cbVerify(null, a.getLastUser());
          else {
            var c = l.fb.providers[e].method;
            switch (c) {
            case 'simple':
              l.attachSimple(e, t, o);
              break;
            case 'singly':
              i.launchSinglyAuth(e, l.cbVerify);
              break;
            default:
              console.log(s, 'Unsupported auth method=', c);
            }
          }
        },
        attachSimple: function (e, t, o) {
          switch (e) {
          case 'persona':
            l.personaLogin();
            break;
          case 'password':
            l.sendAuthRequest('/auth/firebase', {
              email: t,
              password: o
            });
            break;
          default:
            var n = l.providers[e].scope, i = { rememberMe: !0 };
            n && (i.scope = n), l.fbAuthClient.launchAuthWindow(e, i, l.cbVerify3);
          }
        },
        detach: function (e) {
          var t = a.credentials[e];
          console.log(s, 'detach key=', e), t && (t.detached = !0), delete a.services[e];
        },
        personaLogin: function () {
          var e = l.handlePersonaResponse;
          console.log(s, 'personaLogin'), navigator.id.watch({
            onlogin: function (t) {
              console.log(s, 'personaLogin onlogin assertion=', t), e(t);
            },
            onlogout: function () {
              console.log(s, 'personaLogin onlogout');
            }
          }), navigator.id.request({
            oncancel: function () {
              console.log(s, 'personaLogin oncancel'), e(null);
            }
          });
        },
        handlePersonaResponse: function (e) {
          console.log(s, 'handlePersonaResponse authResponse=', e), null === e ? l.cbVerify(l.fbAuthClient.formatError({
            code: 'UNKNOWN_ERROR',
            message: 'User denied authentication request or an error occurred.'
          })) : l.sendAuthRequest('/auth/persona/authenticate', { assertion: e });
        },
        sendAuthRequest: function (e, t) {
          console.log(s, 'sendAuthRequest url=', e, 'json=', t), l.fbAuthClient.jsonp(e, t, function (e, t) {
            console.log(s, 'sendAuthRequest jsonp callback error=', e, 'response=', t), e || !t.token ? l.cbVerify(l.fbAuthClient.formatError(e)) : (l.fbUser = t.user, l.fbUser.firebaseAuthToken = l.fbUser.firebaseAuthToken || t.token, l.cbVerify(null, l.fbUser));
          });
        },
        cbVerify3: function (e, t, o) {
          o.firebaseAuthToken = t, l.cbVerify(e, o);
        },
        cbVerify: function (e, t) {
          console.log(s, 'cbVerify', 'Register=', l, ' error=', e, 'user=', t), e ? l.reportLaunchError(e) : t && (console.log(s, 'cbVerify', 'sessionKey=', t.sessionKey), t.sessionKey ? t.firebaseSessionKey = t.sessionKey || null : t.sessionKey = t.firebaseSessionKey || null, l.fb.rootRef.auth(t.firebaseAuthToken, function (e) {
            if (e)
              l.reportLaunchError(e);
            else {
              console.log(s, 'cbVerify', 'user.provider=', t.provider);
              var o = l.fb.rootRef.child('usermap'), n = o.child(t.provider).child(t.id);
              n.once('value', function (e) {
                console.log(s, 'cbVerify', 'mapUserRef once value=', e.val()), l.checkExisting(e, t);
              });
            }
          }));
        },
        checkExisting: function (e, t) {
          var o = e.val();
          if (console.log(s, 'checkExisting', 'mapUserId=', o, 'fbUser=', t), o) {
            console.log(s, 'checkExisting', 'found usermap for user', t.provider + '/' + t.id, 'mapUserId=', o);
            var n = l.fb.rootRef.child('users').child(o);
            n.once('value', function (n) {
              var i = n.val();
              console.log(s, 'checkExisting', 'userRecordRef once mapUserId userRecord=', i), i ? (a.retrieveUserRecord(i, t.firebaseAuthToken), r.userId = o) : (a.buildServiceCredentials(t), e.ref().remove(function (e) {
                e ? console.log(s, 'checkExisting', 'Orphan user map entry for mapUserId=', o, 'could not be deleted err=', e) : console.log(s, 'checkExisting', 'Orphan user map entry deleted for mapUserId=', o);
              }));
            }, function (e) {
              console.log(s, 'checkExisting', 'userRecordRef once mapUserId error=', e), r.authFailed = !0;
            });
          } else
            console.log(s, 'checkExisting', 'mapUserId null - build credentials'), a.buildServiceCredentials(t);
        },
        reportLaunchError: function (e) {
          console.log(s, 'reportLaunchError', 'launchError=', e), r.authFailed = !0, r.error = 'unknown closed window' === e ? {
            code: 'WINDOW_CLOSED',
            message: 'Authentication window has been closed'
          } : angular.isString(e) ? {
            code: 'UNKNOWN_ERROR',
            message: e
          } : e;
        }
      };
    return l;
  }
]), FirstRevenueApp.factory('Singly', [
  '$rootScope',
  '$timeout',
  '$resource',
  'JWT',
  function (e, t, o, n) {
    var i = 'Singly';
    console.log(i, 'service launched');
    var r = 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=700,height=375', s = 'https://api.singly.com/services/:service/:endpoint?limit=:limit&access_token=:token', a = 'https://api.singly.com/profile?access_token=:token', l = {
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
      }, c = {
        clientId: CONFIG_1ST_REVENUE.singlyClientId,
        accessToken: null,
        data: null,
        logoff: function () {
          c.accessToken = null;
        },
        buildErrorAccount: function (e, t) {
          var o = null, n = e.services[t];
          return n && (o = {
            name: e.name,
            service: t,
            id: n.id,
            image: e.thumbnail_url
          }), o;
        },
        launchAuth: function (e, t, o) {
          console.log(i, 'launchAuth service=', e);
          var s = window.location.origin || window.location.protocol + '//' + window.location.host, a = s + window.location.pathname + 'views/', u = {
              client_id: c.clientId,
              redirect_uri: a + 'SinglyRedirect.html',
              service: e,
              response_type: 'token'
            };
          c.accessToken, 'linkedin' === e ? u.scope = 'r_basicprofile r_emailaddress r_network w_messages' : 'gplus' === e ? u.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email' : 'gcontacts' === e && (u.scope = 'https://www.google.com/m8/feeds/'), console.log(i, 'launchAuth Opening WinChan params=', u), WinChan.open({
            url: a + 'SinglyLaunch.html',
            relay_url: a + 'WinChanRelay.html',
            window_features: r,
            params: u
          }, function (r, s) {
            if (console.log(i, 'launchAuth', 'error=', r, 'response=', s), r)
              console.log(i, 'launchAuth', 'error=', r), o(r);
            else {
              console.log(i, 'launchAuth', 'response=', s), c.accessToken = s.access_token;
              var a = n.decodeJWT(s.firebase);
              console.log(i, 'launchAuth', 'singlyFirebase=', a), c.getProfile(s.access_token, function (n) {
                console.log(i, 'launchAuth', 'Profile.get p=', n), t.auth(s.firebase, function (t, r) {
                  if (t) {
                    console.log(i, 'Login Failed!', t);
                    var a = c.buildErrorAccount(n, e);
                    o({
                      code: t.code,
                      message: a.service + ' user ' + a.name + ' (id=' + a.id + ') not found in 1st Revenue',
                      user: a
                    }, r);
                  } else
                    console.log(i, 'Login Succeeded! account=', r), c.processProfile(e, s, n, r, o);
                });
              }), c.getData(e, s.access_token, l[e], function (e) {
                console.log(i, 'launchAuth data=', e), _.each(e, function (e) {
                  console.log(i, 'launchAuth getData element=', e);
                });
              }, function (e) {
                console.log(i, 'launchAuth getData error=', e);
              });
            }
          });
        },
        getProfile: function (t, n) {
          console.log(i, 'getProfile token=', t);
          var r = o(a, { token: t });
          console.log(i, 'getProfile profileURL=', a), r.get(n, c.requestError), e.$$phase || e.$apply();
        },
        processProfile: function (e, t, o, n, r) {
          var s = CryptoJS.MD5(t.firebase).toString(CryptoJS.enc.Hex), a = {
              provider: 'singly',
              token: t.access_token,
              firebaseAuthToken: t.firebase,
              sessionKey: s,
              id: n.auth.account,
              service: e,
              expires: n.expires,
              name: o.name || null,
              email: o.email || null,
              url: o.url || null,
              handle: o.handle || null,
              thumbnail_url: o.thumbnail_url || null,
              services: o.services || null
            };
          console.log(i, 'processProfile acc=', a), r(null, a);
        },
        getData: function (t, n, r, a, l) {
          console.log(i, 'getData service=', t, 'token=', n, 'endpoint=', r);
          var u = a || c.processData, d = o(s, {
              service: t,
              token: n,
              endpoint: r,
              limit: 20
            });
          c.data = d.query(u, l || c.requestError), e.$$phase || e.$apply();
        },
        processData: function () {
          _.each(c.data, c.processElement);
        },
        processElement: function (e) {
          console.log(i, 'processElement element=', e);
        },
        requestError: function (e) {
          console.log(i, 'requestError error=', e);
        }
      };
    return c;
  }
]), FirstRevenueApp.factory('Myself', [
  '$location',
  '$timeout',
  '$route',
  'Sync',
  'MyModels',
  'MyProfile',
  'Social',
  function (e, t, o, n, i, r, s) {
    var a = 'Myself';
    console.log(a, 'service launched');
    var l = i, c = {
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
        sync: n,
        mp: r,
        social: s,
        models: l.models,
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
        init: function (e) {
          console.log(a, 'init'), c.originalPath = e;
        },
        wakeup: function (e, t, o) {
          console.log(a, 'wakeup'), c.rootRef = e, c.userId = t, c.userRef = e.child('users').child(t), c.publicRef = e.child('public'), c.adminRef = e.child('admin').child(t), c.authenticated = !0, c.authFailed = !1, l.init(e, c.userRef), c.sync.angularFire(c.userRef, 'sync.user').then(c.collectUserData), c.sync.angularFire(c.publicRef, 'sync.public').then(c.collectPublicData), c.sync.angularFire(c.adminRef, 'sync.admin.status').then(c.collectAdminData), c.connTracking(e, t), c.selectedModelId = o || null, c.social.reset();
        },
        collectUserData: function (e) {
          console.log(a, 'wakeup userPromise resolved syncUserReady=', e), l.collectModels(c.userRef.child('models'), !1), c.navigateInitialView();
        },
        collectPublicData: function (e) {
          console.log(a, 'wakeup publicPromise resolved syncPublic=', e), l.collectModels(c.publicRef.child('models'), !0);
        },
        collectAdminData: function (e) {
          console.log(a, 'wakeup adminPromise resolved syncAdminReady=', e);
        },
        logoff: function () {
          console.log(a, 'logoff'), l.logoff(), n.logoff(), c.userRef = null, c.userId = null;
        },
        authError: function (e) {
          console.log(a, 'authError error=', e), c.authenticated = !1, c.authFailed = !0, e && e.code && (c.error = e);
        },
        processInvite: function (e) {
          console.log(a, 'processInvite'), c.sessionFound = e, t(function () {
            console.log(a, 'processInvite $timeout calls $route.reload()'), o.reload();
          });
        },
        myDataValue: function (e) {
          c.user = e.val(), console.log(a, 'myDataValue me.user=', c.user), l.collectModels(c.userRef), l.collectModels(c.rootRef.child('public')), c.navigateInitialView();
        },
        navigateInitialView: function () {
          t(function () {
            c.modelsLoaded = !0, e.path(c.selectedModelId ? '/canvas/' + c.selectedModelId : '/home');
          });
        },
        dataCancel: function (o) {
          console.log(a, 'dataCancel error=', o), t(function () {
            e.path('/entry');
          });
        },
        isMyself: function (e) {
          return e === c.userId;
        },
        isOnline: function (e) {
          return -1 > c.sync.peerPresence[e];
        },
        connTracking: function (e, o) {
          var n = e.child('presence').child(o), i = e.child('.info/connected');
          i.on('value', function (e) {
            c.connected = e.val(), c.connected && t(function () {
              n.onDisconnect().set(Firebase.ServerValue.TIMESTAMP), n.set(-Date.now());
            }), console.log(a, 'connTracking connRef .info/connected connRef=', i, 'me.connected=', c.connected, 'me.connStatus=', c.connStatus());
          });
        },
        connStatus: function () {
          return c.connected ? 'Connected' : 'Offline';
        },
        modelCount: function () {
          return _.size(c.sync.user.models);
        },
        getAccounts: function () {
          return c.sync.user.accounts;
        },
        getContacts: function (e) {
          console.log(a, 'getContacts accountId=', e);
          var t = {};
          return e ? c.getAccountContacts(t, c.sync.user.accounts[e]) : _.each(c.sync.user.accounts, function (e) {
            c.getAccountContacts(t, e);
          }), t;
        },
        getAccountContacts: function (e, t) {
          if (t) {
            var o = t.profile.service;
            _.each(t.contacts.partners, function (t, n) {
              e[o + '-' + n] = t;
            });
          }
        },
        getSocialContacts: function (e) {
          return console.log(a, 'getContacts accountId=', e), c.getContacts(e);
        },
        toggleContact: function (e) {
          var t = c.getContactKey(e);
          c.currentModel.users[t] ? delete c.currentModel.users[t] : c.currentModel.users[t] = e;
        },
        wasContactSelected: function (e) {
          return console.log(a, 'wasContactSelected contact=', e), c.currentModel ? !!c.currentModel.users[c.getContactKey(e)] : {};
        },
        getContactKey: function (e) {
          return e.service + '-' + e.id;
        },
        inviteUsers: function () {
        },
        peerCount: function () {
          return _.size(c.getContacts());
        },
        findAccount: function (e) {
          return _.find(c.sync.user.accounts, function (t) {
            return t.profile.service === e;
          }) || {};
        }
      };
    return c;
  }
]), FirstRevenueApp.factory('MyProfile', [
  '$timeout',
  'TProfile',
  function (e, t) {
    var o = 'MyProfile';
    console.log(o, 'service loaded');
    var n = {
        lastUser: null,
        user: null,
        credentials: {},
        primaryToken: null,
        services: {},
        firstCred: null,
        lastCred: null,
        getLastUser: function () {
          return n.lastUser;
        },
        setLastUser: function (e) {
          n.lastUser = e;
        },
        clearLastUser: function () {
          n.lastUser = null;
        },
        isSameUser: function (e) {
          var o = n.lastUser ? new t(n.lastUser) : null;
          return o && o.service === e;
        },
        getService: function () {
          return 'singly' === n.lastUser.provider ? n.lastUser.service : n.lastUser.provider;
        },
        getServiceId: function () {
          return 'singly' === n.lastUser.provider ? n.lastUser.services[n.lastUser.service].id : n.lastUser.id;
        },
        wasCurrentUserInvited: function (e) {
          return e.service === n.getService() && e.serviceId === n.getServiceId();
        },
        buildServiceCredentials: function (i) {
          if (i.provider) {
            console.log(o, 'buildServiceCredentials', 'user added to credentials');
            var r = new t(i);
            e(function () {
              n.storeCredential(r.service, {
                token: i.firebaseAuthToken,
                authentic: i,
                profile: r
              });
            });
          }
        },
        retrieveUserRecord: function (t, i) {
          console.log(o, 'retrieveUserRecord', 'ur=', t), e(function () {
            t.primary = t.profile.provider + '-' + t.profile.id, _.each(t.accounts, function (e) {
              n.storeCredential(e.profile.service, e);
            }), n.user = t, n.primaryToken = i;
          });
        },
        storeInviteCredentials: function (e) {
          console.log(o, 'storeInviteCredentials', 'user added to credentials');
          var i = new t(e), r = i.service, s = {
              token: e.firebaseAuthToken,
              authentic: e,
              profile: i
            }, a = {
              token: s.authentic.firebaseAuthToken,
              authentic: s.authentic,
              profile: s.profile,
              services: {},
              next: null,
              detached: !1
            };
          return 'singly' === s.profile.provider ? _.each(s.authentic.services, function (e, t) {
            var o = {
                id: e.id,
                name: e.name
              }, i = e.thumbnail_url;
            i && (o.image = i), a.services[t] = o, n.services[t] = o;
          }) : (a.services[s.profile.provider] = s.profile, n.services[s.profile.provider] = s.profile), n.credentials[r] = a, n.enhanceProfile(s.profile), a;
        },
        removeCred: function (e) {
          console.log(o, 'removeCred', 'cred=', e);
          for (var t = n.firstCred, i = null; t;) {
            if (t === e) {
              n.firstCred === e && (n.firstCred = e.next), n.lastCred === e && (n.lastCred = i), i && (i.next = t.next);
              break;
            }
            i = t, t = t.next;
          }
        },
        storeCredential: function (e, t) {
          console.log(o, 'storeCredential', 'service=', e, 'account=', t);
          var i = n.credentials[e];
          i && n.removeCred(i);
          var r = t.authentic;
          i = {
            token: r.firebaseAuthToken,
            authentic: r,
            profile: t.profile,
            services: {},
            next: null,
            detached: !1
          }, console.log(o, 'storeCredential', 'authentic=', r, 'cred=', i), 'singly' === t.profile.provider ? _.each(r.services, function (e, t) {
            var r = n.getServiceObject(e);
            console.log(o, 'storeCredential', 'singlyService=', e, 'key=', t, 's=', r), i.services[t] = r, n.services[t] = r;
          }) : (console.log(o, 'storeCredential', 'account.profile=', t.profile), i.services[t.profile.provider] = t.profile, n.services[t.profile.provider] = t.profile), n.credentials[e] = i, console.log(o, 'storeCredential', 'mp.services=', n.services, 'mp.credentials=', n.credentials), n.lastCred && (n.lastCred.next = i), n.firstCred = n.firstCred || i, n.lastCred = i, n.enhanceProfile(t.profile);
        },
        getServiceObject: function (e) {
          var t = {
              id: e.id,
              name: e.name
            }, o = e.thumbnail_url;
          return o && (t.image = o), t;
        },
        enhanceProfile: function (e) {
          console.log(o, 'enhanceProfile', 'serviceProfile=', e), n.user = n.user || {}, n.user.profile = n.user.profile || {}, _.defaults(n.user.profile, e), console.log(o, 'enhanceProfile', 'mp.user=', n.user), n.user.primary = n.user.primary || e.key, n.user.profile.ready = !0;
        },
        deleteAccount: function (e, t) {
          var i = e.account ? 'singly-' + e.account : e.provider + '-' + e.id;
          if (n.user.primary === i) {
            var r = _.keys(n.user.accounts);
            _.size(r) ? (n.user.primary = r[0], n.user.profile = n.user.accounts[n.user.primary].profile) : (delete n.user.primary, delete n.user.profile);
          }
          console.log(o, 'deleteAccount', 'cred=', t, 'profile=', e), n.user.accounts && delete n.user.accounts[i], n.user.services && _.each(t.services, function (e, t) {
            delete n.user.services[t];
          }), console.log(o, 'deleteAccount', 'mp.user=', n.user);
        },
        storeAccount: function (e, t) {
          var i = e.account ? 'singly-' + e.account : e.provider + '-' + e.id;
          n.user.primary || (n.user.primary = i, n.user.profile = e), console.log(o, 'storeAccount', 'cred=', t, 'profile=', e), n.user.accounts = n.user.accounts || {}, n.user.accounts[i] = angular.copy({
            active: !0,
            profile: e,
            authentic: t.authentic,
            services: t.services ? t.services : null
          }), n.user.services = n.user.services || {}, _.each(t.services, function (e, t) {
            n.user.services[t] = angular.copy(e);
          }), console.log(o, 'storeAccount', 'mp.user=', n.user);
        },
        getCredentials: function () {
          var e = {};
          return _.each(n.credentials, function (t, o) {
            t.detached || (e[o] = t);
          }), e;
        },
        getCredentialKeys: function () {
          return _.keys(n.getCredentials());
        }
      };
    return n;
  }
]), FirstRevenueApp.factory('MyModels', [
  '$timeout',
  'Sync',
  'Canvas',
  function (e, t, o) {
    var n = 'MyModels';
    console.log(n, 'service launched');
    var i = {
        rootRef: null,
        userRef: null,
        sync: t,
        models: {},
        init: function (e, t) {
          console.log(n, 'init'), i.rootRef = e, i.userRef = t;
        },
        logoff: function () {
          console.log(n, 'logoff');
        },
        collectModels: function (e, t) {
          e.on('child_added', function (e) {
            i.loadModel(e.name(), t);
          }, i.modelCancel), e.on('child_removed', i.modelRemoved, i.modelCancel);
        },
        modelRemoved: function (o) {
          var r = o.name();
          console.log(n, 'modelRemoved modelId=', r);
          var s = i.rootRef.child('models').child(r);
          s.child('users').off('child_added', i.processModelUsers), s.child('invites').off('child_added', i.processModelInvites), e(function () {
            t.reset(t.getScopeName(r, 'models'));
          });
        },
        modelCancel: function (e) {
          console.log(n, 'modelCancel error=', e);
        },
        getModelKey: function (e) {
          return t.getScopeName(e, 'models');
        },
        loadModel: function (e, t) {
          console.log(n, 'loadModel modelId=', e, 'publicFlag=', t);
          var o = i.rootRef.child('models').child(e), r = i.getModelKey(e);
          console.log(n, 'loadModel modelKey=', r);
          var s = i.sync.angularFire(o, r);
          s ? s.then(i.loadModelData) : console.log(n, 'loadModel angularFire failed for modelKey=', r);
        },
        loadModelData: function (e) {
          console.log(n, 'loadModelData modelPromise resolved modelReady=', e);
          var r = e.ref.name();
          o.modelId === r && (o.model = t.models[r]);
          var s = e.ref.child('users');
          s.on('child_added', i.processModelUsers);
          var a = e.ref.child('invites');
          a.on('child_added', i.processModelInvites);
        },
        processModelUsers: function (e) {
          var t = e.name();
          if (i.sync.peers[t])
            console.log(n, 'processModelUsers peer already loaded key=', t);
          else {
            var o = 'sync.peers[\'' + t + '\']', r = i.rootRef.child('users').child(t).child('profile'), s = i.sync.angularFire(r, o);
            s && s.then(function (e) {
              console.log(n, 'processModelUsers resolved peer=', e);
            });
            var a = 'sync.peerPresence[\'' + t + '\']', l = i.rootRef.child('presence').child(t), c = i.sync.angularFire(l, a, -1);
            c && c.then(function (e) {
              console.log(n, 'processModelUsers resolved presence=', e);
            });
          }
        },
        processModelInvites: function (e) {
          var t = e.name();
          if (i.sync.invites[t])
            console.log(n, 'processModelInvites invite already loaded key=', t);
          else {
            var o = 'sync.invites[\'' + t + '\']', r = i.rootRef.child('invites').child(t), s = i.sync.angularFire(r, o);
            s && s.then(function (e) {
              console.log(n, 'processModelInvites resolved invite=', e), 'accepted' === e.status && console.log(n, 'processModelInvites accepted invite=', e);
            });
          }
        }
      };
    return i;
  }
]), FirstRevenueApp.factory('Sync', [
  '$q',
  'angularFire',
  function (e, t) {
    var o = 'Sync';
    console.log(o, 'service loaded');
    var n = {
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
        init: function (e) {
          console.log(o, 'init'), n.masterScope = e;
        },
        angularFire: function (e, i, r) {
          console.log(o, 'angularFire name=', i, r), r = angular.isUndefined(r) ? {} : r;
          var s = t(e, n.masterScope, i, r);
          return s.then(function (e) {
            console.log(o, 'angularFire callback afReady=', e), e.off && e.name ? n.dereg[i] = e.off : s.off && (n.dereg[i] = s.off);
          }), s;
        },
        reset: function (e) {
          console.log(o, 'reset name=', e);
          var t = n.dereg[e];
          t && t();
        },
        getScopeName: function (e, t) {
          return 'sync.' + t + '[\'' + e + '\']';
        },
        collectAdminData: function (t) {
          var o = [
              n.angularFire(t.child('presence'), 'sync.admin.presence'),
              n.angularFire(t.child('admins'), 'sync.admin.admins'),
              n.angularFire(t.child('users'), 'sync.admin.users'),
              n.angularFire(t.child('models'), 'sync.admin.models'),
              n.angularFire(t.child('invites'), 'sync.admin.invites')
            ];
          e.all(o).then(n.adminDataLoaded, n.adminDataFailed);
        },
        adminDataLoaded: function (e) {
          console.log(o, 'adminDataLoaded result=', e), n.admin.promises = e;
        },
        adminDataFailed: function (e) {
          console.log(o, 'adminDataFailed err=', e);
        },
        logoff: function () {
          console.log(o, 'logoff'), n.reset('sync.user'), n.reset('sync.public'), n.admin.status && (n.reset('sync.admin.presence'), n.reset('sync.admin.admins'), n.reset('sync.admin.users'), n.reset('sync.admin.models'), n.reset('sync.admin.invites'), n.admin.status = !1, n.admin.enabled = !1, n.admin.presence = {}, n.admin.admins = {}, n.admin.users = {}, n.admin.models = {}, n.admin.invites = {}, n.admin.promises = []), _.each(n.models, function (e, t) {
            n.reset(n.getScopeName(t, 'models'));
          }), _.each(n.invites, function (e, t) {
            n.reset(n.getScopeName(t, 'invites'));
          }), _.each(n.peers, function (e, t) {
            n.reset(n.getScopeName(t, 'peers'));
          }), n.user = {}, n.models = {}, n.invites = {}, n.peers = {}, n.peerPresence = {};
        }
      };
    return n;
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
        t.link = e.link, t.image = '//graph.facebook.com/' + e.id + '/picture';
        break;
      case 'twitter':
        t.link = '//twitter.com/' + e.username, t.image = e.profile_image_url;
        break;
      case 'github':
        t.link = e.profileUrl, t.image = e.avatar_url;
        break;
      case 'persona':
        t.image = '//www.gravatar.com/avatar/' + t.hash;
        break;
      case 'password':
        t.image = '//www.gravatar.com/avatar/' + t.hash;
        break;
      case 'singly':
        t.link = e.url, t.image = e.thumbnail_url;
        break;
      default:
        t.image = null;
      }
      t.image = t.image || null, console.log('TProfile fbUser=', e, 'profile=', t);
    };
    return e;
  }]), FirstRevenueApp.factory('Social', [
  '$timeout',
  'Singly',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'GPlus',
  'GContacts',
  'JWT',
  function (e, t, o, n, i, r, s, a) {
    var l = 'Social';
    console.log(l, 'service launched');
    var c = {
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
      }, u = {
        partners: {},
        refreshed: 0,
        total: 0
      }, d = {
        me: null,
        account: null,
        selectedUsers: {},
        loaded: {},
        loading: {},
        contacts: {},
        reset: function () {
          d.selectedUsers = {}, d.loaded = {}, d.loading = {}, d.contacts = {};
        },
        fetchAccount: function (e, t) {
          d.me = e;
          var o = d.findAccount(t);
          d.fetchSocialAccount(o);
        },
        fetchSocialAccount: function (e) {
          console.log(l, 'fetchSocialAccount account=', e), e.contacts = e.contacts || u;
          var a = e.authentic.accessToken;
          if ('singly' === e.profile.provider) {
            var p = e.profile.service, h = e.authentic.token, g = c[p] || 'self', f = e.authentic.expires, m = new Date().getTime() / 1000;
            console.log(l, 'fetchSocialAccount service=', p, 'token=', h, 'expires=', f, 'currentTime=', m), 'linkedin' === p ? i.getFriends(d.me, e, h) : 'gplus' === p ? t.launchAuth('gplus', d.me.rootRef, function (t, o) {
              console.log(l, 'fetchSocialAccount gplus err=', t, 'acc=', o), d.me.sync.user.accounts['singly-' + o.id].authentic = o, r.getPeople(d.me, e, o.token);
            }) : 'gcontacts' === p ? s.getContacts(d.me, e, h) : g ? t.getData(p, h, g) : console.log(l, 'Unknown Singly service, endpoint not found');
          } else
            'facebook' === e.profile.provider ? o.getFriends(d.me, e, a) : 'twitter' === e.profile.provider && n.getFriends(d.me, e, a);
        },
        addModelInvite: function (e, t) {
          if (console.log(l, 'addModelInvite data=', t), t) {
            var o = angular.copy(t), n = d.me.rootRef.child('usermap').child(o.service).child(o.serviceId);
            n.once('value', function (t) {
              var n = t.val();
              console.log(l, 'addModelInvite usermap value userId=', n), n ? d.attachModelToUser(e, o, n) : d.verifyInviteMap(e, o), d.addPartner(o, n);
            });
          }
        },
        addPartner: function (e, t) {
          var o = d.me.sync.user.partners = d.me.sync.user.partners || {}, n = _.find(o, function (t) {
              return t.service === e.service && t.serviceId === e.serviceId;
            });
          if (!n) {
            var i = d.me.rootRef.push().name();
            n = o[i] = {
              name: e.name,
              service: e.service,
              serviceId: e.serviceId,
              image: e.image
            }, t && (n.userId = t);
          }
        },
        attachModelToUser: function (e, t, o) {
          console.log(l, 'attachModelToUser userId=', o, 'modelId=', e.modelId);
          var n = d.me.rootRef.child('users').child(o), i = n.child('models').child(e.modelId);
          i.set(!0, function (n) {
            console.log(l, 'attachModelToUser set completed err=', n), n || d.attachUserToModel(e, t, o);
          });
        },
        attachUserToModel: function (e, t, o) {
          console.log(l, 'attachUserToModel canvas=', e);
          var n = d.me.rootRef.child('models').child(e.modelId), i = n.child('users').child(o);
          i.set(!0, function (e) {
            console.log(l, 'attachUserToModel set completed err=', e);
          });
        },
        verifyInviteMap: function (e, t) {
          console.log(l, 'verifyInviteMap data=', t);
          var o = d.me.rootRef.child('invitemap').child(t.service).child(t.serviceId);
          o.once('value', function (n) {
            var i = n.val();
            if (i) {
              var r = d.me.rootRef.child('invites').child(i), s = r.child('models').child(e.modelId);
              s.set(!0, function (o) {
                o ? console.log(l, 'failed to set model in invite inviteId=', i, 'modelId=', e.modelId, 'err=', o) : console.log(l, 'successfully set model in invite inviteId=', i, 'modelId=', e.modelId, 'err=', o), d.updateModelInvite(e, t, i);
              });
            } else
              d.createModelInvite(e, t, o, t.account);
          });
        },
        createModelInvite: function (e, t, o) {
          console.log(l, 'createModelInvite data=', t);
          var n = {
              creator: d.me.userId,
              service: t.service,
              serviceId: t.serviceId,
              name: t.name,
              image: t.image,
              status: 'created',
              models: {}
            };
          n.models[e.modelId] = !0;
          var i = d.me.rootRef.child('invites'), r = i.push().name();
          console.log(l, 'createModelInvite inviteId=', r), i.child(r).set(n, function (i) {
            i ? console.log(l, 'failed to create an invite=', n, 'err=', i) : o.set(r, function () {
              d.updateModelInvite(e, t, r);
            });
          });
        },
        updateModelInvite: function (t, o, n) {
          console.log(l, 'updateModelInvite data=', o), e(function () {
            t.model.invites = t.model.invites || {}, t.model.invites[n] = !0, d.me.sync.user.invites = d.me.sync.user.invites || {}, d.me.sync.user.invites[n] = !0;
          });
        },
        updateInvite: function (e) {
          console.log(l, 'inviteId=', e);
          var t = d.me.rootRef.child('invites').child(e), o = d.findPartner(e);
          o.inviteId = e, console.log(l, 'updateInvite partner=', o), d.serviceInvite(o, function (e, n) {
            e ? console.log(l, 'invite error=', e, 'partner=', o) : n && (console.log(l, 'invite sent partner=', o), t.update({ status: 'sent' }, function (e) {
              d.inviteCallback(e, o, 'sent');
            }));
          });
        },
        inviteCallback: function (e, t, o) {
          e ? (console.log(l, 'invite global status cannot be set to', o, 'error=', e), t.inviteFailed = !0) : (console.log(l, 'invite global status set to', o), 'created' === o ? t.inviteCreated = !0 : 'sent' === o && (t.inviteSent = !0));
        },
        serviceInvite: function (e, t) {
          var n = d.findAccount(e.service);
          switch (console.log(l, 'serviceInvite contact=', e, 'account=', n), e.service) {
          case 'facebook':
            o.sendMessage(e, t);
            break;
          case 'linkedin':
            i.sendMessage(e, n.authentic.token, t);
            break;
          case 'gplus':
            r.sendMessage(e, n.authentic.token, t);
            break;
          default:
            console.log(l, 'invite does not have sendMessage function for service=', e.service);
          }
        },
        findAccount: function (e) {
          return _.find(d.me.sync.user.accounts, function (t) {
            return t.profile.service === e;
          });
        },
        findPartner: function (e) {
          var t = d.me.sync.invites[e];
          return _.find(d.me.sync.user.partners, function (e) {
            return e.service === t.service && e.serviceId === t.serviceId;
          });
        },
        verifyExpiration: function (e, o) {
          console.log(l, 'verifyExpiration token=', e);
          var n = a.decodeJWT(e), i = n[1].exp;
          console.log(l, 'verifyExpiration token=', e, 'tokenArray=', n, 'expires=', i), Math.floor(Date.now()) > i ? (console.log(l, 'verifyExpiration token has expired'), t.launchAuth('gplus', d.me.rootRef, function (e, t) {
            console.log(l, 'verifyExpiration err=', e, 'acc=', t), d.me.sync.user.accounts['singly-' + t.id].authentic = t, o(t.token);
          })) : (console.log(l, 'verifyExpiration token not expired'), o(e));
        }
      };
    return d;
  }
]), FirstRevenueApp.factory('Facebook', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = 'Facebook', n = 'menubar=0,location=0,resizable=0,scrollbars=0,status=0,dialog=1,width=1000,height=600', i = 'https://graph.facebook.com/me/friends?fields=name,username,picture,email&access_token=:token', r = {
        me: null,
        account: null,
        total: 0,
        friends: null,
        sendMessage: function (e, i) {
          console.log('Facebook sendMessage contact=', e);
          var r = window.location.origin || window.location.protocol + '//' + window.location.host, s = r + window.location.pathname + 'views/', a = s + 'FacebookRedirect.html', l = s + 'FacebookInvitation.html', c = e.serviceId, u = {
              app_id: CONFIG_1ST_REVENUE.facebookClientId,
              redirect_uri: a,
              display: 'page',
              to: c,
              link: l + '?invite=' + e.inviteId
            };
          WinChan.open({
            url: s + 'FacebookLaunch.html',
            relay_url: s + 'WinChanRelay.html',
            window_features: n,
            params: u
          }, function (e, n) {
            t(function () {
              console.log(o, 'sendMessage', 'error=', e, 'response=', n), e ? (console.log(o, 'sendMessage', 'error=', e), i(e)) : (console.log(o, 'sendMessage', 'response=', n), n.success ? i(null, !0) : i(null, !1));
            });
          });
        },
        getFriends: function (t, o, n) {
          r.me = t, r.account = o, r.me.social.loaded.facebook = !1, console.log('Facebook getFriends token=', n);
          var s = e(i, { token: n });
          r.friends = s.get(r.processFriends, r.queryError);
        },
        processFriends: function (e) {
          console.log('Facebook processFriends friends=', e), r.me.social.contacts.facebook = r.me.social.contacts.facebook || {}, t(function () {
            r.total = 0, r.account.contacts = r.account.contacts || { refreshed: Date.now() }, _.each(e.data, r.processFriend), console.log('Facebook processFriends facebook.total=', r.total);
            var t = r.account.profile.key, o = r.me.sync.user.accounts[t], n = o.contacts;
            n.refreshed = Date.now(), n.total = r.total, r.me.social.loaded.facebook = !0, console.log('Facebook processFriends contacts=', r.account.contacts, 'facebook.me.social.loaded.facebook=', r.me.social.loaded.facebook, 'facebook.me.sync=', r.me.sync);
          });
        },
        processFriend: function (e) {
          console.log('Facebook processFriend friend=', e), console.log('Facebook processFriend profile.key=', r.account.profile.key, 'account=', r.account);
          var t = r.account.contacts.partners, o = r.me.social.contacts.facebook[e.id] = {
              profileKey: r.account.profile.key,
              provider: 'facebook',
              service: 'facebook',
              id: e.id,
              serviceId: e.id,
              name: e.name,
              username: e.username,
              image: e.picture.data.url || null
            };
          t && t[e.id] && (t[e.id].name = o.name, t[e.id].image = o.image, o.partner = t[e.id]), console.log('Facebook processFriend c=', o), r.total += 1;
        },
        queryError: function (e) {
          console.log('Facebook queryError error=', e);
        }
      };
    return r;
  }
]), FirstRevenueApp.factory('GContacts', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = 'https://api.singly.com/proxy/gcontacts/contacts/default/full?access_token=:token&max-results=1000&alt=json', n = 'https://api.singly.com/proxy/gcontacts/groups/default/base?access_token=:token&max-results=1000&alt=json', i = 'http://schemas.google.com/contacts/2008/rel#edit-photo', r = {
        me: null,
        account: null,
        contacts: null,
        groups: null,
        token: null,
        total: 0,
        getContacts: function (t, i, s, a) {
          r.me = t, r.account = i, r.token = s, console.log('GContacts getContacts token=', s);
          var l = e(o, { token: s }), c = a || r.processContacts;
          r.contacts = l.get(c, r.requestError);
          var u = e(n, { token: s });
          r.groups = u.get(r.processGroups, r.requestError);
        },
        processContacts: function (e) {
          console.log('GContacts processContacts contacts=', e), r.account.friends = e, t(function () {
            r.total = 0, _.each(e.feed.entry, r.processContact), r.account.contacts.refreshed = Date.now(), r.me.social.loaded.linkedin = !0;
          });
        },
        processContact: function (e) {
          console.log('GContacts processContact contact=', e);
          var t = e.gd$email, o = e.id.$t.split('/')[8];
          if (o) {
            var n = r.account.contacts.partners, s = r.me.social.contacts.linkedin[e.id] = {
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
            n && n[e.id] && (s.partner = n[e.id]), r.total += 1, t && (s.email = t[0].address, _.each(t, function (e) {
              'true' === e.primary && (s.email = e.address);
            })), e.gd$organization && (s.org = e.gd$organization[0].gd$orgName.$t), e.link[0].gd$etag && _.each(e.link, function (e) {
              e.gd$etag && 'image/*' === e.type && e.rel === i && (s.image = e.href);
            }), e.gd$phoneNumber && _.each(e.gd$phoneNumber, function (e) {
              'true' === e.primary && (s.phone = e.$t);
            }), console.log('GContacts processContact c=', s);
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
    var n = 'GPlus', i = 'https://api.singly.com/profiles/gplus?auth=true&access_token=:token', r = 'https://www.googleapis.com/plus/v1/people/me', s = 'https://www.googleapis.com/plus/v1/people/me/people/visible', a = {
        me: null,
        account: null,
        total: 0,
        people: null,
        token: null,
        getPeople: function (t, o, r) {
          if (console.log(n, 'getPeople account=', o, 'token=', r), a.me = t, a.account = o, a.token = r, a.me.social.loaded.gplus = !1, !t.social.loading.gplus) {
            console.log(n, 'getPeople launching ProfileRequest'), t.social.loading.gplus = !0;
            var s = e(i, { token: r });
            a.profile = s.get(a.processProfile, a.requestError);
          }
        },
        processProfile: function (e) {
          o(function () {
            console.log(n, 'processProfile profile=', e), t({
              method: 'GET',
              url: r,
              params: { key: CONFIG_1ST_REVENUE.gplusAPIKey },
              headers: { Authorization: 'Bearer ' + e.auth.accessToken }
            }).success(a.processGPlusProfile).error(a.requestError), a.total = 0, a.account.contacts = a.account.contacts || { refreshed: Date.now() }, a.bearerToken = e.auth.accessToken, a.sendPeopleRequest();
          });
        },
        sendPeopleRequest: function (e) {
          console.log('GPlus sendPeopleRequest pageToken=', e), t({
            method: 'GET',
            url: s,
            params: {
              key: CONFIG_1ST_REVENUE.gplusAPIKey,
              pageToken: e || null
            },
            headers: { Authorization: 'Bearer ' + a.bearerToken }
          }).success(a.processGPlusPeople).error(a.requestError);
        },
        processGPlusProfile: function (e) {
          o(function () {
            console.log('GPlus processGPlusProfile gprofile=', e);
          });
        },
        processGPlusPeople: function (e) {
          console.log('GPlus processGPlusPeople people=', e), a.me.social.contacts.gplus = a.me.social.contacts.gplus || {}, o(function () {
            if (_.each(e.items, a.processPerson), e.nextPageToken)
              a.sendPeopleRequest(e.nextPageToken);
            else {
              var t = a.account.profile.key, o = a.me.sync.user.accounts[t], n = o.contacts;
              n.refreshed = Date.now(), n.total = a.total, a.me.social.loaded.gplus = !0, a.me.social.loading.gplus = !1;
            }
          });
        },
        processPerson: function (e) {
          console.log('GPlus processPerson person=', e);
          var t = a.account.contacts.partners, o = a.me.social.contacts.gplus[e.id] = {
              profileKey: a.account.profile.key,
              provider: 'singly',
              service: 'gplus',
              type: e.objectType,
              name: e.displayName,
              image: e.image.url,
              id: e.id,
              serviceId: e.id
            };
          t && t[e.id] && (o.partner = t[e.id]), a.total += 1, console.log('GPlus processPerson c=', o);
        },
        requestError: function (e) {
          o(function () {
            console.log('GPlus requestError error=', e);
          });
        }
      };
    return a;
  }
]), FirstRevenueApp.factory('LinkedIn', [
  '$resource',
  '$timeout',
  function (e, t) {
    var o = 'https://api.singly.com/proxy/linkedin/people/~/connections?format=json&access_token=:token&scope=r_network', n = 'https://api.singly.com/proxy/linkedin/people/~/mailbox?format=json&access_token=:token&scope=w_messages', i = {
        me: null,
        account: null,
        total: 0,
        friends: null,
        token: null,
        msg: null,
        sendMessage: function (t, o, r) {
          i.token = o, console.log('LinkedIn sendMessage token=', o);
          var s = window.location.origin || window.location.protocol + '//' + window.location.host, a = s + window.location.pathname + '#invite/', l = e(n, { token: o }), c = new l({
              recipients: { values: [{ person: { _path: '/people/' + t.serviceId } }] },
              subject: 'Join 1stRevenue.com',
              body: 'Join 1stRevenue.com and collaborate with us on business modeling. Use your LinkedIn account to sign to the application. The original sender of the invitation will be notified when you log on to the 1st Revenue. Create your account at ' + a + t.inviteId
            }), u = r || i.processMessage;
          c.$save(function (e) {
            console.log('LinkedIn processMessage msgResponse=', e), u(null, !0);
          }, i.requestError);
        },
        processMessage: function (e, t) {
          console.log('LinkedIn processMessage err=', e, 'msgResponse=', t);
        },
        getFriends: function (t, n, r, s) {
          i.me = t, i.account = n, i.token = r, i.me.social.loaded.linkedin = !1, console.log('LinkedIn getFriends token=', r);
          var a = e(o, { token: r }), l = s || i.processFriends;
          i.friends = a.get(l, i.requestError);
        },
        processFriends: function (e) {
          console.log('LinkedIn processFriends friends=', e), i.me.social.contacts.linkedin = i.me.social.contacts.linkedin || {}, t(function () {
            i.total = 0, i.account.contacts = i.account.contacts || { refreshed: Date.now() }, _.each(e.values, i.processFriend), i.account.contacts.refreshed = Date.now(), i.account.contacts.total = i.total, i.me.social.loaded.linkedin = !0;
          });
        },
        processFriend: function (e) {
          if (console.log('LinkedIn processFriend friend=', e), 'private' !== e.id) {
            var t = i.account.contacts.partners, o = i.me.social.contacts.linkedin[e.id] = {
                profileKey: i.account.profile.key,
                provider: 'singly',
                service: 'linkedin',
                id: i.account.profile.id,
                serviceId: e.id,
                name: e.firstName + ' ' + e.lastName,
                username: null,
                image: e.pictureUrl || null
              };
            t && t[e.id] && (o.partner = t[e.id]), console.log('LinkedIn processFriend c=', o), i.total += 1;
          }
        },
        processProfile: function (e) {
          console.log('LinkedIn processProfile profile=', e);
        },
        requestError: function (e) {
          console.log('LinkedIn requestError error=', e);
        }
      };
    return i;
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
]), FirstRevenueApp.factory('ImpressModel', [
  '$timeout',
  '$window',
  'Canvas',
  'angularFire',
  function (e, t, o, n) {
    var i = 'ImpressModel';
    console.log(i, 'service launched');
    var r = {
        rootRef: null,
        masterScope: null,
        dereg: {},
        init: function (e, t) {
          console.log(i, 'init'), r.rootRef = e, r.masterScope = t;
        },
        angularFire: function (e, t, o) {
          console.log(i, 'angularFire name=', t, o), o = angular.isUndefined(o) ? {} : o;
          var s = n(e, r.masterScope, t, o);
          return s.then(function (e) {
            console.log(i, 'angularFire callback afReady=', e), e.off && e.name ? r.dereg = e.off : s.off && (r.dereg = s.off);
          }), s;
        },
        loadModel: function (e) {
          console.log(i, 'loadModel modelId=', e);
          var t = r.rootRef.child('models').child(e), o = r.angularFire(t, 'canvas.model');
          o ? o.then(r.loadModelData) : console.log(i, 'loadModel angularFire failed for modelId', e);
        },
        loadModelData: function (n) {
          console.log(i, 'loadModelData modelPromise resolved modelReady=', n), e(function () {
            t.document.title = o.model.fields.name + ' - 1st Revenue Presentation', impress().init();
          });
        }
      };
    return r;
  }
]);