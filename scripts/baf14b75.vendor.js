function AngularFire(e, t, o) {
  this._q = e, this._parse = t, this._initial = !0, this._remoteValue = !1, this._fRef = 'string' == typeof o ? new Firebase(o) : o;
}
var Opentip, firstAdapter, i, mouseMoved, mousePosition, mousePositionObservers, position, vendors, _i, _len, _ref, __slice = [].slice, __indexOf = [].indexOf || function (e) {
    for (var t = 0, o = this.length; o > t; t++)
      if (t in this && this[t] === e)
        return t;
    return -1;
  }, __hasProp = {}.hasOwnProperty;
for (Opentip = function () {
    function e(t, o, n, i) {
      var r, s, l, a, c, u, d, p, f, h, g, v, m, b, w = this;
      if (this.id = ++e.lastId, this.debug('Creating Opentip.'), e.tips.push(this), this.adapter = e.adapter, r = this.adapter.data(t, 'opentips') || [], r.push(this), this.adapter.data(t, 'opentips', r), this.triggerElement = this.adapter.wrap(t), this.triggerElement.length > 1)
        throw Error('You can\'t call Opentip on multiple elements.');
      if (1 > this.triggerElement.length)
        throw Error('Invalid element.');
      for (this.loaded = !1, this.loading = !1, this.visible = !1, this.waitingToShow = !1, this.waitingToHide = !1, this.currentPosition = {
          left: 0,
          top: 0
        }, this.dimensions = {
          width: 100,
          height: 50
        }, this.content = '', this.redraw = !0, this.currentObservers = {
          showing: !1,
          visible: !1,
          hiding: !1,
          hidden: !1
        }, i = this.adapter.clone(i), 'object' == typeof o ? (i = o, o = n = void 0) : 'object' == typeof n && (i = n, n = void 0), null != n && (i.title = n), null != o && this.setContent(o), null == i['extends'] && (i['extends'] = null != i.style ? i.style : e.defaultStyle), a = [i], b = i; b['extends'];) {
        if (u = b['extends'], b = e.styles[u], null == b)
          throw Error('Invalid style: ' + u);
        a.unshift(b), null == b['extends'] && 'standard' !== u && (b['extends'] = 'standard');
      }
      for (i = (g = this.adapter).extend.apply(g, [{}].concat(__slice.call(a))), i.hideTriggers = function () {
          var e, t, o, n;
          for (o = i.hideTriggers, n = [], e = 0, t = o.length; t > e; e++)
            s = o[e], n.push(s);
          return n;
        }(), i.hideTrigger && 0 === i.hideTriggers.length && i.hideTriggers.push(i.hideTrigger), v = [
          'tipJoint',
          'targetJoint',
          'stem'
        ], d = 0, f = v.length; f > d; d++)
        c = v[d], i[c] && 'string' == typeof i[c] && (i[c] = new e.Joint(i[c]));
      for (!i.ajax || i.ajax !== !0 && i.ajax || (i.ajax = 'A' === this.adapter.tagName(this.triggerElement) ? this.adapter.attr(this.triggerElement, 'href') : !1), 'click' === i.showOn && 'A' === this.adapter.tagName(this.triggerElement) && this.adapter.observe(this.triggerElement, 'click', function (e) {
          return e.preventDefault(), e.stopPropagation(), e.stopped = !0;
        }), i.target && (i.fixed = !0), i.stem === !0 && (i.stem = new e.Joint(i.tipJoint)), i.target === !0 ? i.target = this.triggerElement : i.target && (i.target = this.adapter.wrap(i.target)), this.currentStem = i.stem, null == i.delay && (i.delay = 'mouseover' === i.showOn ? 0.2 : 0), null == i.targetJoint && (i.targetJoint = new e.Joint(i.tipJoint).flip()), this.showTriggers = [], this.showTriggersWhenVisible = [], this.hideTriggers = [], i.showOn && 'creation' !== i.showOn && this.showTriggers.push({
          element: this.triggerElement,
          event: i.showOn
        }), null != i.ajaxCache && (i.cache = i.ajaxCache, delete i.ajaxCache), this.options = i, this.bound = {}, m = [
          'prepareToShow',
          'prepareToHide',
          'show',
          'hide',
          'reposition'
        ], p = 0, h = m.length; h > p; p++)
        l = m[p], this.bound[l] = function (e) {
          return function () {
            return w[e].apply(w, arguments);
          };
        }(l);
      this.adapter.domReady(function () {
        return w.activate(), 'creation' === w.options.showOn ? w.prepareToShow() : void 0;
      });
    }
    return e.prototype.STICKS_OUT_TOP = 1, e.prototype.STICKS_OUT_BOTTOM = 2, e.prototype.STICKS_OUT_LEFT = 1, e.prototype.STICKS_OUT_RIGHT = 2, e.prototype['class'] = {
      container: 'opentip-container',
      opentip: 'opentip',
      header: 'ot-header',
      content: 'ot-content',
      loadingIndicator: 'ot-loading-indicator',
      close: 'ot-close',
      goingToHide: 'ot-going-to-hide',
      hidden: 'ot-hidden',
      hiding: 'ot-hiding',
      goingToShow: 'ot-going-to-show',
      showing: 'ot-showing',
      visible: 'ot-visible',
      loading: 'ot-loading',
      ajaxError: 'ot-ajax-error',
      fixed: 'ot-fixed',
      showEffectPrefix: 'ot-show-effect-',
      hideEffectPrefix: 'ot-hide-effect-',
      stylePrefix: 'style-'
    }, e.prototype._setup = function () {
      var e, t, o, n, i, r, s, l, a, c, u;
      for (this.debug('Setting up the tooltip.'), this._buildContainer(), this.hideTriggers = [], a = this.options.hideTriggers, n = i = 0, s = a.length; s > i; n = ++i) {
        if (t = a[n], o = null, e = this.options.hideOn instanceof Array ? this.options.hideOn[n] : this.options.hideOn, 'string' == typeof t)
          switch (t) {
          case 'trigger':
            e = e || 'mouseout', o = this.triggerElement;
            break;
          case 'tip':
            e = e || 'mouseover', o = this.container;
            break;
          case 'target':
            e = e || 'mouseover', o = this.options.target;
            break;
          case 'closeButton':
            break;
          default:
            throw Error('Unknown hide trigger: ' + t + '.');
          }
        else
          e = e || 'mouseover', o = this.adapter.wrap(t);
        o && this.hideTriggers.push({
          element: o,
          event: e,
          original: t
        });
      }
      for (c = this.hideTriggers, u = [], r = 0, l = c.length; l > r; r++)
        t = c[r], u.push(this.showTriggersWhenVisible.push({
          element: t.element,
          event: 'mouseover'
        }));
      return u;
    }, e.prototype._buildContainer = function () {
      return this.container = this.adapter.create('<div id="opentip-' + this.id + '" class="' + this['class'].container + ' ' + this['class'].hidden + ' ' + this['class'].stylePrefix + this.options.className + '"></div>'), this.adapter.css(this.container, { position: 'absolute' }), this.options.ajax && this.adapter.addClass(this.container, this['class'].loading), this.options.fixed && this.adapter.addClass(this.container, this['class'].fixed), this.options.showEffect && this.adapter.addClass(this.container, '' + this['class'].showEffectPrefix + this.options.showEffect), this.options.hideEffect ? this.adapter.addClass(this.container, '' + this['class'].hideEffectPrefix + this.options.hideEffect) : void 0;
    }, e.prototype._buildElements = function () {
      var e, t;
      return this.tooltipElement = this.adapter.create('<div class="' + this['class'].opentip + '"><div class="' + this['class'].header + '"></div><div class="' + this['class'].content + '"></div></div>'), this.backgroundCanvas = this.adapter.wrap(document.createElement('canvas')), this.adapter.css(this.backgroundCanvas, { position: 'absolute' }), 'undefined' != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)), e = this.adapter.find(this.tooltipElement, '.' + this['class'].header), this.options.title && (t = this.adapter.create('<h1></h1>'), this.adapter.update(t, this.options.title, this.options.escapeTitle), this.adapter.append(e, t)), this.options.ajax && !this.loaded && this.adapter.append(this.tooltipElement, this.adapter.create('<div class="' + this['class'].loadingIndicator + '"><span>\u21bb</span></div>')), __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (this.closeButtonElement = this.adapter.create('<a href="javascript:undefined;" class="' + this['class'].close + '"><span>Close</span></a>'), this.adapter.append(e, this.closeButtonElement)), this.adapter.append(this.container, this.backgroundCanvas), this.adapter.append(this.container, this.tooltipElement), this.adapter.append(document.body, this.container), this._newContent = !0, this.redraw = !0;
    }, e.prototype.setContent = function (e) {
      return this.content = e, this._newContent = !0, 'function' == typeof this.content ? (this._contentFunction = this.content, this.content = '') : this._contentFunction = null, this.visible ? this._updateElementContent() : void 0;
    }, e.prototype._updateElementContent = function () {
      var e;
      return (this._newContent || !this.options.cache && this._contentFunction) && (e = this.adapter.find(this.container, '.' + this['class'].content), null != e && (this._contentFunction && (this.debug('Executing content function.'), this.content = this._contentFunction(this)), this.adapter.update(e, this.content, this.options.escapeContent)), this._newContent = !1), this._storeAndLockDimensions(), this.reposition();
    }, e.prototype._storeAndLockDimensions = function () {
      var e;
      return this.container ? (e = this.dimensions, this.adapter.css(this.container, {
        width: 'auto',
        left: '0px',
        top: '0px'
      }), this.dimensions = this.adapter.dimensions(this.container), this.dimensions.width += 1, this.adapter.css(this.container, {
        width: '' + this.dimensions.width + 'px',
        top: '' + this.currentPosition.top + 'px',
        left: '' + this.currentPosition.left + 'px'
      }), this._dimensionsEqual(this.dimensions, e) ? void 0 : (this.redraw = !0, this._draw())) : void 0;
    }, e.prototype.activate = function () {
      return this._setupObservers('hidden', 'hiding');
    }, e.prototype.deactivate = function () {
      return this.debug('Deactivating tooltip.'), this.hide(), this._setupObservers('-showing', '-visible', '-hidden', '-hiding');
    }, e.prototype._setupObservers = function () {
      var e, t, o, n, i, r, s, l, a, c, u, d, p, f, h, g, v = this;
      for (n = arguments.length >= 1 ? __slice.call(arguments, 0) : [], r = 0, c = n.length; c > r; r++)
        if (o = n[r], t = !1, '-' === o.charAt(0) && (t = !0, o = o.substr(1)), this.currentObservers[o] !== !t)
          switch (this.currentObservers[o] = !t, e = function () {
              var e, o, n;
              return e = arguments.length >= 1 ? __slice.call(arguments, 0) : [], t ? (o = v.adapter).stopObserving.apply(o, e) : (n = v.adapter).observe.apply(n, e);
            }, o) {
          case 'showing':
            for (f = this.hideTriggers, s = 0, u = f.length; u > s; s++)
              i = f[s], e(i.element, i.event, this.bound.prepareToHide);
            e(null != document.onresize ? document : window, 'resize', this.bound.reposition), e(window, 'scroll', this.bound.reposition);
            break;
          case 'visible':
            for (h = this.showTriggersWhenVisible, l = 0, d = h.length; d > l; l++)
              i = h[l], e(i.element, i.event, this.bound.prepareToShow);
            break;
          case 'hiding':
            for (g = this.showTriggers, a = 0, p = g.length; p > a; a++)
              i = g[a], e(i.element, i.event, this.bound.prepareToShow);
            break;
          case 'hidden':
            break;
          default:
            throw Error('Unknown state: ' + o);
          }
      return null;
    }, e.prototype.prepareToShow = function () {
      return this._abortHiding(), this._abortShowing(), this.visible ? void 0 : (this.debug('Showing in ' + this.options.delay + 's.'), null == this.container && this._setup(), this.options.group && e._abortShowingGroup(this.options.group, this), this.preparingToShow = !0, this._setupObservers('-hidden', '-hiding', 'showing'), this._followMousePosition(), this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition), this.reposition(), this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0));
    }, e.prototype.show = function () {
      var t = this;
      return this._abortHiding(), this.visible ? void 0 : (this._clearTimeouts(), this._triggerElementExists() ? (this.debug('Showing now.'), null == this.container && this._setup(), this.options.group && e._hideGroup(this.options.group, this), this.visible = !0, this.preparingToShow = !1, null == this.tooltipElement && this._buildElements(), this._updateElementContent(), !this.options.ajax || this.loaded && this.options.cache || this._loadAjax(), this._searchAndActivateCloseButtons(), this._startEnsureTriggerElement(), this.adapter.css(this.container, { zIndex: e.lastZIndex++ }), this._setupObservers('-hidden', '-hiding', '-showing', '-visible', 'showing', 'visible'), this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition), this.reposition(), this.adapter.removeClass(this.container, this['class'].hiding), this.adapter.removeClass(this.container, this['class'].hidden), this.adapter.addClass(this.container, this['class'].goingToShow), this.setCss3Style(this.container, { transitionDuration: '0s' }), this.defer(function () {
        var e;
        return t.visible && !t.preparingToHide ? (t.adapter.removeClass(t.container, t['class'].goingToShow), t.adapter.addClass(t.container, t['class'].showing), e = 0, t.options.showEffect && t.options.showEffectDuration && (e = t.options.showEffectDuration), t.setCss3Style(t.container, { transitionDuration: '' + e + 's' }), t._visibilityStateTimeoutId = t.setTimeout(function () {
          return t.adapter.removeClass(t.container, t['class'].showing), t.adapter.addClass(t.container, t['class'].visible);
        }, e), t._activateFirstInput()) : void 0;
      }), this._draw()) : this.deactivate());
    }, e.prototype._abortShowing = function () {
      return this.preparingToShow ? (this.debug('Aborting showing.'), this._clearTimeouts(), this._stopFollowingMousePosition(), this.preparingToShow = !1, this._setupObservers('-showing', '-visible', 'hiding', 'hidden')) : void 0;
    }, e.prototype.prepareToHide = function () {
      return this._abortShowing(), this._abortHiding(), this.visible ? (this.debug('Hiding in ' + this.options.hideDelay + 's'), this.preparingToHide = !0, this._setupObservers('-showing', 'visible', '-hidden', 'hiding'), this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay)) : void 0;
    }, e.prototype.hide = function () {
      var e = this;
      return this._abortShowing(), this.visible && (this._clearTimeouts(), this.debug('Hiding!'), this.visible = !1, this.preparingToHide = !1, this._stopEnsureTriggerElement(), this._setupObservers('-showing', '-visible', '-hiding', '-hidden', 'hiding', 'hidden'), this.options.fixed || this._stopFollowingMousePosition(), this.container) ? (this.adapter.removeClass(this.container, this['class'].visible), this.adapter.removeClass(this.container, this['class'].showing), this.adapter.addClass(this.container, this['class'].goingToHide), this.setCss3Style(this.container, { transitionDuration: '0s' }), this.defer(function () {
        var t;
        return e.adapter.removeClass(e.container, e['class'].goingToHide), e.adapter.addClass(e.container, e['class'].hiding), t = 0, e.options.hideEffect && e.options.hideEffectDuration && (t = e.options.hideEffectDuration), e.setCss3Style(e.container, { transitionDuration: '' + t + 's' }), e._visibilityStateTimeoutId = e.setTimeout(function () {
          return e.adapter.removeClass(e.container, e['class'].hiding), e.adapter.addClass(e.container, e['class'].hidden), e.setCss3Style(e.container, { transitionDuration: '0s' }), e.options.removeElementsOnHide ? (e.debug('Removing HTML elements.'), e.adapter.remove(e.container), delete e.container, delete e.tooltipElement) : void 0;
        }, t);
      })) : void 0;
    }, e.prototype._abortHiding = function () {
      return this.preparingToHide ? (this.debug('Aborting hiding.'), this._clearTimeouts(), this.preparingToHide = !1, this._setupObservers('-hiding', 'showing', 'visible')) : void 0;
    }, e.prototype.reposition = function () {
      var e, t, o, n = this;
      return e = this.getPosition(), null == e || (t = this.options.stem, this.options.containInViewport && (o = this._ensureViewportContainment(e), e = o.position, t = o.stem), this._positionsEqual(e, this.currentPosition)) ? void 0 : (this.options.stem && !t.eql(this.currentStem) && (this.redraw = !0), this.currentPosition = e, this.currentStem = t, this._draw(), this.adapter.css(this.container, {
        left: '' + e.left + 'px',
        top: '' + e.top + 'px'
      }), this.defer(function () {
        var e, t;
        return e = n.adapter.unwrap(n.container), e.style.visibility = 'hidden', t = e.offsetHeight, e.style.visibility = 'visible';
      }));
    }, e.prototype.getPosition = function (e, t, o) {
      var n, i, r, s, l, a, c, u, d;
      return this.container ? (null == e && (e = this.options.tipJoint), null == t && (t = this.options.targetJoint), s = {}, this.options.target ? (c = this.adapter.offset(this.options.target), a = this.adapter.dimensions(this.options.target), s = c, t.right ? (u = this.adapter.unwrap(this.options.target), null != u.getBoundingClientRect ? s.left = u.getBoundingClientRect().right + (null != (d = window.pageXOffset) ? d : document.body.scrollLeft) : s.left += a.width) : t.center && (s.left += Math.round(a.width / 2)), t.bottom ? s.top += a.height : t.middle && (s.top += Math.round(a.height / 2)), this.options.borderWidth && (this.options.tipJoint.left && (s.left += this.options.borderWidth), this.options.tipJoint.right && (s.left -= this.options.borderWidth), this.options.tipJoint.top ? s.top += this.options.borderWidth : this.options.tipJoint.bottom && (s.top -= this.options.borderWidth))) : s = this.initialMousePosition ? {
        top: this.initialMousePosition.y,
        left: this.initialMousePosition.x
      } : {
        top: mousePosition.y,
        left: mousePosition.x
      }, this.options.autoOffset && (l = this.options.stem ? this.options.stemLength : 0, r = l && this.options.fixed ? 2 : 10, n = e.middle && !this.options.fixed ? 15 : 0, i = e.center && !this.options.fixed ? 15 : 0, e.right ? s.left -= r + n : e.left && (s.left += r + n), e.bottom ? s.top -= r + i : e.top && (s.top += r + i), l && (null == o && (o = this.options.stem), o.right ? s.left -= l : o.left && (s.left += l), o.bottom ? s.top -= l : o.top && (s.top += l))), s.left += this.options.offset[0], s.top += this.options.offset[1], e.right ? s.left -= this.dimensions.width : e.center && (s.left -= Math.round(this.dimensions.width / 2)), e.bottom ? s.top -= this.dimensions.height : e.middle && (s.top -= Math.round(this.dimensions.height / 2)), s) : void 0;
    }, e.prototype._ensureViewportContainment = function (t) {
      var o, n, i, r, s, l, a, c, u, d, p, f;
      if (a = this.options.stem, i = {
          position: t,
          stem: a
        }, !this.visible || !t)
        return i;
      if (c = this._sticksOut(t), !c[0] && !c[1])
        return i;
      if (d = new e.Joint(this.options.tipJoint), this.options.targetJoint && (u = new e.Joint(this.options.targetJoint)), l = this.adapter.scrollOffset(), p = this.adapter.viewportDimensions(), f = [
          t.left - l[0],
          t.top - l[1]
        ], o = !1, p.width >= this.dimensions.width && c[0])
        switch (o = !0, c[0]) {
        case this.STICKS_OUT_LEFT:
          d.setHorizontal('left'), this.options.targetJoint && u.setHorizontal('right');
          break;
        case this.STICKS_OUT_RIGHT:
          d.setHorizontal('right'), this.options.targetJoint && u.setHorizontal('left');
        }
      if (p.height >= this.dimensions.height && c[1])
        switch (o = !0, c[1]) {
        case this.STICKS_OUT_TOP:
          d.setVertical('top'), this.options.targetJoint && u.setVertical('bottom');
          break;
        case this.STICKS_OUT_BOTTOM:
          d.setVertical('bottom'), this.options.targetJoint && u.setVertical('top');
        }
      return o ? (this.options.stem && (a = d), t = this.getPosition(d, u, a), n = this._sticksOut(t), r = !1, s = !1, n[0] && n[0] !== c[0] && (r = !0, d.setHorizontal(this.options.tipJoint.horizontal), this.options.targetJoint && u.setHorizontal(this.options.targetJoint.horizontal)), n[1] && n[1] !== c[1] && (s = !0, d.setVertical(this.options.tipJoint.vertical), this.options.targetJoint && u.setVertical(this.options.targetJoint.vertical)), r && s ? i : ((r || s) && (this.options.stem && (a = d), t = this.getPosition(d, u, a)), {
        position: t,
        stem: a
      })) : i;
    }, e.prototype._sticksOut = function (e) {
      var t, o, n, i;
      return o = this.adapter.scrollOffset(), i = this.adapter.viewportDimensions(), t = [
        e.left - o[0],
        e.top - o[1]
      ], n = [
        !1,
        !1
      ], 0 > t[0] ? n[0] = this.STICKS_OUT_LEFT : t[0] + this.dimensions.width > i.width && (n[0] = this.STICKS_OUT_RIGHT), 0 > t[1] ? n[1] = this.STICKS_OUT_TOP : t[1] + this.dimensions.height > i.height && (n[1] = this.STICKS_OUT_BOTTOM), n;
    }, e.prototype._draw = function () {
      var t, o, n, i, r, s, l, a, c, u, d, p, f, h, g, v, m, b, w, y = this;
      if (this.backgroundCanvas && this.redraw) {
        if (this.debug('Drawing background.'), this.redraw = !1, this.currentStem) {
          for (m = [
              'top',
              'right',
              'bottom',
              'left'
            ], g = 0, v = m.length; v > g; g++)
            p = m[g], this.adapter.removeClass(this.container, 'stem-' + p);
          this.adapter.addClass(this.container, 'stem-' + this.currentStem.horizontal), this.adapter.addClass(this.container, 'stem-' + this.currentStem.vertical);
        }
        return s = [
          0,
          0
        ], l = [
          0,
          0
        ], __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (r = new e.Joint('top right' === (null != (b = this.currentStem) ? b + '' : void 0) ? 'top left' : 'top right'), s = [
          this.options.closeButtonRadius + this.options.closeButtonOffset[0],
          this.options.closeButtonRadius + this.options.closeButtonOffset[1]
        ], l = [
          this.options.closeButtonRadius - this.options.closeButtonOffset[0],
          this.options.closeButtonRadius - this.options.closeButtonOffset[1]
        ]), n = this.adapter.clone(this.dimensions), i = [
          0,
          0
        ], this.options.borderWidth && (n.width += 2 * this.options.borderWidth, n.height += 2 * this.options.borderWidth, i[0] -= this.options.borderWidth, i[1] -= this.options.borderWidth), this.options.shadow && (n.width += 2 * this.options.shadowBlur, n.width += Math.max(0, this.options.shadowOffset[0] - 2 * this.options.shadowBlur), n.height += 2 * this.options.shadowBlur, n.height += Math.max(0, this.options.shadowOffset[1] - 2 * this.options.shadowBlur), i[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]), i[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])), o = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, this.currentStem && (this.currentStem.left ? o.left = this.options.stemLength : this.currentStem.right && (o.right = this.options.stemLength), this.currentStem.top ? o.top = this.options.stemLength : this.currentStem.bottom && (o.bottom = this.options.stemLength)), r && (r.left ? o.left = Math.max(o.left, l[0]) : r.right && (o.right = Math.max(o.right, l[0])), r.top ? o.top = Math.max(o.top, l[1]) : r.bottom && (o.bottom = Math.max(o.bottom, l[1]))), n.width += o.left + o.right, n.height += o.top + o.bottom, i[0] -= o.left, i[1] -= o.top, this.currentStem && this.options.borderWidth && (w = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), h = w.stemLength, f = w.stemBase), t = this.adapter.unwrap(this.backgroundCanvas), t.width = n.width, t.height = n.height, this.adapter.css(this.backgroundCanvas, {
          width: '' + t.width + 'px',
          height: '' + t.height + 'px',
          left: '' + i[0] + 'px',
          top: '' + i[1] + 'px'
        }), a = t.getContext('2d'), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, t.width, t.height), a.beginPath(), a.fillStyle = this._getColor(a, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal), a.lineJoin = 'miter', a.miterLimit = 500, d = this.options.borderWidth / 2, this.options.borderWidth ? (a.strokeStyle = this.options.borderColor, a.lineWidth = this.options.borderWidth) : (h = this.options.stemLength, f = this.options.stemBase), null == f && (f = 0), u = function (e, t, o) {
          return o && a.moveTo(Math.max(f, y.options.borderRadius, s[0]) + 1 - d, -d), t ? (a.lineTo(e / 2 - f / 2, -d), a.lineTo(e / 2, -h - d), a.lineTo(e / 2 + f / 2, -d)) : void 0;
        }, c = function (e, t, o) {
          var n, i, r, l;
          return e ? (a.lineTo(-f + d, 0 - d), a.lineTo(h + d, -h - d), a.lineTo(d, f - d)) : t ? (l = y.options.closeButtonOffset, r = s[0], 0 !== o % 2 && (l = [
            l[1],
            l[0]
          ], r = s[1]), n = Math.acos(l[1] / y.options.closeButtonRadius), i = Math.acos(l[0] / y.options.closeButtonRadius), a.lineTo(-r + d, -d), a.arc(d - l[0], -d + l[1], y.options.closeButtonRadius, -(Math.PI / 2 + n), i, !1)) : (a.lineTo(-y.options.borderRadius + d, -d), a.quadraticCurveTo(d, -d, d, y.options.borderRadius - d));
        }, a.translate(-i[0], -i[1]), a.save(), function () {
          var t, o, n, i, s, l, d, p, f, h, g;
          for (g = [], o = f = 0, h = e.positions.length / 2; h >= 0 ? h > f : f > h; o = h >= 0 ? ++f : --f)
            s = 2 * o, l = 0 === o || 3 === o ? 0 : y.dimensions.width, d = 2 > o ? 0 : y.dimensions.height, p = Math.PI / 2 * o, n = 0 === o % 2 ? y.dimensions.width : y.dimensions.height, i = new e.Joint(e.positions[s]), t = new e.Joint(e.positions[s + 1]), a.save(), a.translate(l, d), a.rotate(p), u(n, i.eql(y.currentStem), 0 === o), a.translate(n, 0), c(t.eql(y.currentStem), t.eql(r), o), g.push(a.restore());
          return g;
        }(), a.closePath(), a.save(), this.options.shadow && (a.shadowColor = this.options.shadowColor, a.shadowBlur = this.options.shadowBlur, a.shadowOffsetX = this.options.shadowOffset[0], a.shadowOffsetY = this.options.shadowOffset[1]), a.fill(), a.restore(), this.options.borderWidth && a.stroke(), a.restore(), r ? function () {
          var e, t, o, n, i;
          return o = t = 2 * y.options.closeButtonRadius, 'top right' == r + '' ? (i = [
            y.dimensions.width - y.options.closeButtonOffset[0],
            y.options.closeButtonOffset[1]
          ], e = [
            i[0] + d,
            i[1] - d
          ]) : (i = [
            y.options.closeButtonOffset[0],
            y.options.closeButtonOffset[1]
          ], e = [
            i[0] - d,
            i[1] - d
          ]), a.translate(e[0], e[1]), n = y.options.closeButtonCrossSize / 2, a.save(), a.beginPath(), a.strokeStyle = y.options.closeButtonCrossColor, a.lineWidth = y.options.closeButtonCrossLineWidth, a.lineCap = 'round', a.moveTo(-n, -n), a.lineTo(n, n), a.stroke(), a.beginPath(), a.moveTo(n, -n), a.lineTo(-n, n), a.stroke(), a.restore(), y.adapter.css(y.closeButtonElement, {
            left: '' + (i[0] - n - y.options.closeButtonLinkOverscan) + 'px',
            top: '' + (i[1] - n - y.options.closeButtonLinkOverscan) + 'px',
            width: '' + (y.options.closeButtonCrossSize + 2 * y.options.closeButtonLinkOverscan) + 'px',
            height: '' + (y.options.closeButtonCrossSize + 2 * y.options.closeButtonLinkOverscan) + 'px'
          });
        }() : void 0;
      }
    }, e.prototype._getPathStemMeasures = function (e, t, o) {
      var n, i, r, s, l, a, c;
      if (s = o / 2, r = Math.atan(e / 2 / t), n = 2 * r, l = s / Math.sin(n), i = 2 * l * Math.cos(r), c = s + t - i, 0 > c)
        throw Error('Sorry but your stemLength / stemBase ratio is strange.');
      return a = 2 * Math.tan(r) * c, {
        stemLength: c,
        stemBase: a
      };
    }, e.prototype._getColor = function (e, t, o, n) {
      var i, r, s, l, a;
      if (null == n && (n = !1), 'string' == typeof o)
        return o;
      for (r = n ? e.createLinearGradient(0, 0, t.width, 0) : e.createLinearGradient(0, 0, 0, t.height), s = l = 0, a = o.length; a > l; s = ++l)
        i = o[s], r.addColorStop(i[0], i[1]);
      return r;
    }, e.prototype._searchAndActivateCloseButtons = function () {
      var e, t, o, n;
      for (n = this.adapter.findAll(this.container, '.' + this['class'].close), t = 0, o = n.length; o > t; t++)
        e = n[t], this.hideTriggers.push({
          element: this.adapter.wrap(e),
          event: 'click'
        });
      return this.currentObservers.showing && this._setupObservers('-showing', 'showing'), this.currentObservers.visible ? this._setupObservers('-visible', 'visible') : void 0;
    }, e.prototype._activateFirstInput = function () {
      var e;
      return e = this.adapter.unwrap(this.adapter.find(this.container, 'input, textarea')), null != e ? 'function' == typeof e.focus ? e.focus() : void 0 : void 0;
    }, e.prototype._followMousePosition = function () {
      return this.options.fixed ? void 0 : e._observeMousePosition(this.bound.reposition);
    }, e.prototype._stopFollowingMousePosition = function () {
      return this.options.fixed ? void 0 : e._stopObservingMousePosition(this.bound.reposition);
    }, e.prototype._clearShowTimeout = function () {
      return clearTimeout(this._showTimeoutId);
    }, e.prototype._clearHideTimeout = function () {
      return clearTimeout(this._hideTimeoutId);
    }, e.prototype._clearTimeouts = function () {
      return clearTimeout(this._visibilityStateTimeoutId), this._clearShowTimeout(), this._clearHideTimeout();
    }, e.prototype._triggerElementExists = function () {
      var e;
      for (e = this.adapter.unwrap(this.triggerElement); e.parentNode;) {
        if ('BODY' === e.parentNode.tagName)
          return !0;
        e = e.parentNode;
      }
      return !1;
    }, e.prototype._loadAjax = function () {
      var e = this;
      return this.loading ? void 0 : (this.loaded = !1, this.loading = !0, this.adapter.addClass(this.container, this['class'].loading), this.setContent(''), this.debug('Loading content from ' + this.options.ajax), this.adapter.ajax({
        url: this.options.ajax,
        method: this.options.ajaxMethod,
        onSuccess: function (t) {
          return e.debug('Loading successful.'), e.adapter.removeClass(e.container, e['class'].loading), e.setContent(t);
        },
        onError: function (t) {
          var o;
          return o = e.options.ajaxErrorMessage, e.debug(o, t), e.setContent(o), e.adapter.addClass(e.container, e['class'].ajaxError);
        },
        onComplete: function () {
          return e.adapter.removeClass(e.container, e['class'].loading), e.loading = !1, e.loaded = !0, e._searchAndActivateCloseButtons(), e._activateFirstInput(), e.reposition();
        }
      }));
    }, e.prototype._ensureTriggerElement = function () {
      return this._triggerElementExists() ? void 0 : (this.deactivate(), this._stopEnsureTriggerElement());
    }, e.prototype._ensureTriggerElementInterval = 1000, e.prototype._startEnsureTriggerElement = function () {
      var e = this;
      return this._ensureTriggerElementTimeoutId = setInterval(function () {
        return e._ensureTriggerElement();
      }, this._ensureTriggerElementInterval);
    }, e.prototype._stopEnsureTriggerElement = function () {
      return clearInterval(this._ensureTriggerElementTimeoutId);
    }, e;
  }(), vendors = [
    'khtml',
    'ms',
    'o',
    'moz',
    'webkit'
  ], Opentip.prototype.setCss3Style = function (e, t) {
    var o, n, i, r, s;
    e = this.adapter.unwrap(e), s = [];
    for (o in t)
      __hasProp.call(t, o) && (n = t[o], null != e.style[o] ? s.push(e.style[o] = n) : s.push(function () {
        var t, s, l;
        for (l = [], t = 0, s = vendors.length; s > t; t++)
          i = vendors[t], r = '' + this.ucfirst(i) + this.ucfirst(o), null != e.style[r] ? l.push(e.style[r] = n) : l.push(void 0);
        return l;
      }.call(this)));
    return s;
  }, Opentip.prototype.defer = function (e) {
    return setTimeout(e, 0);
  }, Opentip.prototype.setTimeout = function (e, t) {
    return setTimeout(e, t ? 1000 * t : 0);
  }, Opentip.prototype.ucfirst = function (e) {
    return null == e ? '' : e.charAt(0).toUpperCase() + e.slice(1);
  }, Opentip.prototype.dasherize = function (e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return '-' + t.toLowerCase();
    });
  }, mousePositionObservers = [], mousePosition = {
    x: 0,
    y: 0
  }, mouseMoved = function (e) {
    var t, o, n, i;
    for (mousePosition = Opentip.adapter.mousePosition(e), i = [], o = 0, n = mousePositionObservers.length; n > o; o++)
      t = mousePositionObservers[o], i.push(t());
    return i;
  }, Opentip.followMousePosition = function () {
    return Opentip.adapter.observe(document.body, 'mousemove', mouseMoved);
  }, Opentip._observeMousePosition = function (e) {
    return mousePositionObservers.push(e);
  }, Opentip._stopObservingMousePosition = function (e) {
    var t;
    return mousePositionObservers = function () {
      var o, n, i;
      for (i = [], o = 0, n = mousePositionObservers.length; n > o; o++)
        t = mousePositionObservers[o], t !== e && i.push(t);
      return i;
    }();
  }, Opentip.Joint = function () {
    function e(e) {
      null != e && (e instanceof Opentip.Joint && (e += ''), this.set(e));
    }
    return e.prototype.set = function (e) {
      return e = e.toLowerCase(), this.setHorizontal(e), this.setVertical(e), this;
    }, e.prototype.setHorizontal = function (e) {
      var t, o, n, i, r, s, l;
      for (o = [
          'left',
          'center',
          'right'
        ], n = 0, r = o.length; r > n; n++)
        t = o[n], ~e.indexOf(t) && (this.horizontal = t.toLowerCase());
      for (null == this.horizontal && (this.horizontal = 'center'), l = [], i = 0, s = o.length; s > i; i++)
        t = o[i], l.push(this[t] = this.horizontal === t ? t : void 0);
      return l;
    }, e.prototype.setVertical = function (e) {
      var t, o, n, i, r, s, l;
      for (o = [
          'top',
          'middle',
          'bottom'
        ], n = 0, r = o.length; r > n; n++)
        t = o[n], ~e.indexOf(t) && (this.vertical = t.toLowerCase());
      for (null == this.vertical && (this.vertical = 'middle'), l = [], i = 0, s = o.length; s > i; i++)
        t = o[i], l.push(this[t] = this.vertical === t ? t : void 0);
      return l;
    }, e.prototype.eql = function (e) {
      return null != e && this.horizontal === e.horizontal && this.vertical === e.vertical;
    }, e.prototype.flip = function () {
      var e, t;
      return t = Opentip.position[this.toString(!0)], e = (t + 4) % 8, this.set(Opentip.positions[e]), this;
    }, e.prototype.toString = function (e) {
      var t, o;
      return null == e && (e = !1), o = 'middle' === this.vertical ? '' : this.vertical, t = 'center' === this.horizontal ? '' : this.horizontal, o && t && (t = e ? Opentip.prototype.ucfirst(t) : ' ' + t), '' + o + t;
    }, e;
  }(), Opentip.prototype._positionsEqual = function (e, t) {
    return null != e && null != t && e.left === t.left && e.top === t.top;
  }, Opentip.prototype._dimensionsEqual = function (e, t) {
    return null != e && null != t && e.width === t.width && e.height === t.height;
  }, Opentip.prototype.debug = function () {
    var e;
    return e = arguments.length >= 1 ? __slice.call(arguments, 0) : [], Opentip.debug && null != ('undefined' != typeof console && null !== console ? console.debug : void 0) ? (e.unshift('#' + this.id + ' |'), console.debug.apply(console, e)) : void 0;
  }, Opentip.findElements = function () {
    var e, t, o, n, i, r, s, l, a, c;
    for (e = Opentip.adapter, a = e.findAll(document.body, '[data-ot]'), c = [], s = 0, l = a.length; l > s; s++) {
      o = a[s], r = {}, t = e.data(o, 'ot'), ('' === t || 'true' === t || 'yes' === t) && (t = e.attr(o, 'title'), e.attr(o, 'title', '')), t = t || '';
      for (n in Opentip.styles.standard)
        i = e.data(o, 'ot' + Opentip.prototype.ucfirst(n)), null != i && ('yes' === i || 'true' === i || 'on' === i ? i = !0 : ('no' === i || 'false' === i || 'off' === i) && (i = !1), r[n] = i);
      c.push(new Opentip(o, t, r));
    }
    return c;
  }, Opentip.version = '2.4.6', Opentip.debug = !1, Opentip.lastId = 0, Opentip.lastZIndex = 100, Opentip.tips = [], Opentip._abortShowingGroup = function (e, t) {
    var o, n, i, r, s;
    for (r = Opentip.tips, s = [], n = 0, i = r.length; i > n; n++)
      o = r[n], o !== t && o.options.group === e ? s.push(o._abortShowing()) : s.push(void 0);
    return s;
  }, Opentip._hideGroup = function (e, t) {
    var o, n, i, r, s;
    for (r = Opentip.tips, s = [], n = 0, i = r.length; i > n; n++)
      o = r[n], o !== t && o.options.group === e ? s.push(o.hide()) : s.push(void 0);
    return s;
  }, Opentip.adapters = {}, Opentip.adapter = null, firstAdapter = !0, Opentip.addAdapter = function (e) {
    return Opentip.adapters[e.name] = e, firstAdapter ? (Opentip.adapter = e, e.domReady(Opentip.findElements), e.domReady(Opentip.followMousePosition), firstAdapter = !1) : void 0;
  }, Opentip.positions = [
    'top',
    'topRight',
    'right',
    'bottomRight',
    'bottom',
    'bottomLeft',
    'left',
    'topLeft'
  ], Opentip.position = {}, _ref = Opentip.positions, i = _i = 0, _len = _ref.length; _len > _i; i = ++_i)
  position = _ref[i], Opentip.position[position] = i;
Opentip.styles = {
  standard: {
    'extends': null,
    title: void 0,
    escapeTitle: !0,
    escapeContent: !1,
    className: 'standard',
    stem: !0,
    delay: null,
    hideDelay: 0.1,
    fixed: !1,
    showOn: 'mouseover',
    hideTrigger: 'trigger',
    hideTriggers: [],
    hideOn: null,
    removeElementsOnHide: !1,
    offset: [
      0,
      0
    ],
    containInViewport: !0,
    autoOffset: !0,
    showEffect: 'appear',
    hideEffect: 'fade',
    showEffectDuration: 0.3,
    hideEffectDuration: 0.2,
    stemLength: 5,
    stemBase: 8,
    tipJoint: 'top left',
    target: null,
    targetJoint: null,
    cache: !0,
    ajax: !1,
    ajaxMethod: 'GET',
    ajaxErrorMessage: 'There was a problem downloading the content.',
    group: null,
    style: null,
    background: '#fff18f',
    backgroundGradientHorizontal: !1,
    closeButtonOffset: [
      5,
      5
    ],
    closeButtonRadius: 7,
    closeButtonCrossSize: 4,
    closeButtonCrossColor: '#d2c35b',
    closeButtonCrossLineWidth: 1.5,
    closeButtonLinkOverscan: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f2e37b',
    shadow: !0,
    shadowBlur: 10,
    shadowOffset: [
      3,
      3
    ],
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  },
  glass: {
    'extends': 'standard',
    className: 'glass',
    background: [
      [
        0,
        'rgba(252, 252, 252, 0.8)'
      ],
      [
        0.5,
        'rgba(255, 255, 255, 0.8)'
      ],
      [
        0.5,
        'rgba(250, 250, 250, 0.9)'
      ],
      [
        1,
        'rgba(245, 245, 245, 0.9)'
      ]
    ],
    borderColor: '#eee',
    closeButtonCrossColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    closeButtonRadius: 10,
    closeButtonOffset: [
      8,
      8
    ]
  },
  dark: {
    'extends': 'standard',
    className: 'dark',
    borderRadius: 13,
    borderColor: '#444',
    closeButtonCrossColor: 'rgba(240, 240, 240, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: [
      2,
      2
    ],
    background: [
      [
        0,
        'rgba(30, 30, 30, 0.7)'
      ],
      [
        0.5,
        'rgba(30, 30, 30, 0.8)'
      ],
      [
        0.5,
        'rgba(10, 10, 10, 0.8)'
      ],
      [
        1,
        'rgba(10, 10, 10, 0.9)'
      ]
    ]
  },
  alert: {
    'extends': 'standard',
    className: 'alert',
    borderRadius: 1,
    borderColor: '#AE0D11',
    closeButtonCrossColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: [
      2,
      2
    ],
    background: [
      [
        0,
        'rgba(203, 15, 19, 0.7)'
      ],
      [
        0.5,
        'rgba(203, 15, 19, 0.8)'
      ],
      [
        0.5,
        'rgba(189, 14, 18, 0.8)'
      ],
      [
        1,
        'rgba(179, 14, 17, 0.9)'
      ]
    ]
  }
}, Opentip.defaultStyle = 'standard', 'undefined' != typeof module && null !== module ? module.exports = Opentip : window.Opentip = Opentip;
var __slice = [].slice;
(function (e) {
  var t;
  return e.fn.opentip = function (e, t, o) {
    return new Opentip(this, e, t, o);
  }, t = function () {
    function t() {
    }
    return t.prototype.name = 'jquery', t.prototype.domReady = function (t) {
      return e(t);
    }, t.prototype.create = function (t) {
      return e(t);
    }, t.prototype.wrap = function (t) {
      if (t = e(t), t.length > 1)
        throw Error('Multiple elements provided.');
      return t;
    }, t.prototype.unwrap = function (t) {
      return e(t)[0];
    }, t.prototype.tagName = function (e) {
      return this.unwrap(e).tagName;
    }, t.prototype.attr = function () {
      var t, o, n;
      return o = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (n = e(o)).attr.apply(n, t);
    }, t.prototype.data = function () {
      var t, o, n;
      return o = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (n = e(o)).data.apply(n, t);
    }, t.prototype.find = function (t, o) {
      return e(t).find(o).get(0);
    }, t.prototype.findAll = function (t, o) {
      return e(t).find(o);
    }, t.prototype.update = function (t, o, n) {
      return t = e(t), n ? t.text(o) : t.html(o);
    }, t.prototype.append = function (t, o) {
      return e(t).append(o);
    }, t.prototype.remove = function (t) {
      return e(t).remove();
    }, t.prototype.addClass = function (t, o) {
      return e(t).addClass(o);
    }, t.prototype.removeClass = function (t, o) {
      return e(t).removeClass(o);
    }, t.prototype.css = function (t, o) {
      return e(t).css(o);
    }, t.prototype.dimensions = function (t) {
      return {
        width: e(t).outerWidth(),
        height: e(t).outerHeight()
      };
    }, t.prototype.scrollOffset = function () {
      return [
        window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      ];
    }, t.prototype.viewportDimensions = function () {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    }, t.prototype.mousePosition = function (e) {
      return null == e ? null : {
        x: e.pageX,
        y: e.pageY
      };
    }, t.prototype.offset = function (t) {
      var o;
      return o = e(t).offset(), {
        left: o.left,
        top: o.top
      };
    }, t.prototype.observe = function (t, o, n) {
      return e(t).bind(o, n);
    }, t.prototype.stopObserving = function (t, o, n) {
      return e(t).unbind(o, n);
    }, t.prototype.ajax = function (t) {
      var o, n;
      if (null == t.url)
        throw Error('No url provided');
      return e.ajax({
        url: t.url,
        type: null != (o = null != (n = t.method) ? n.toUpperCase() : void 0) ? o : 'GET'
      }).done(function (e) {
        return 'function' == typeof t.onSuccess ? t.onSuccess(e) : void 0;
      }).fail(function (e) {
        return 'function' == typeof t.onError ? t.onError('Server responded with status ' + e.status) : void 0;
      }).always(function () {
        return 'function' == typeof t.onComplete ? t.onComplete() : void 0;
      });
    }, t.prototype.clone = function (t) {
      return e.extend({}, t);
    }, t.prototype.extend = function () {
      var t, o;
      return o = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], e.extend.apply(e, [o].concat(__slice.call(t)));
    }, t;
  }(), Opentip.addAdapter(new t());
}(jQuery));
var FirebaseIndex;
(function (e) {
  'use strict';
  function t(e, t) {
    this.indexRef = e, this.dataRef = t, this._initMemberVars();
  }
  function o(e, t, o, n) {
    e.forEach(function (e) {
      p(function () {
        e.fn(u(t, o), n);
      });
    });
  }
  function n(e, t, o) {
    var n = o ? t.bind(o) : t;
    return e.push({
      fn: n,
      cb: t,
      ctx: o
    }), n;
  }
  function i(e, t, o) {
    var n;
    for (n in t)
      t.hasOwnProperty(n) && t[n].loaded && r(e(n), n, o);
  }
  function r(e, t, o) {
    e.once('value', function (e) {
      null !== e.val() && p(function () {
        o(u(e, t));
      });
    });
  }
  function s(t, o, n, i) {
    var r = n.name(), s = n.ref();
    return t[r] = {
      prevId: i,
      loaded: !1,
      def: e ? e.Deferred() : null,
      ref: n.ref(),
      dispose: function () {
        s.off('value', o), delete t[r];
      }
    }, s;
  }
  function l(e, t, o) {
    var n = e[t];
    t && n && !n.loaded ? n.def ? n.def.done(o) : setTimeout(function () {
      l(e, t, o);
    }, 10) : o();
  }
  function a(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    t.forEach(function (t) {
      e[t] = e[t].bind(e);
    });
  }
  function c(e, t, o) {
    var n;
    for (n in t.prototype)
      t.prototype.hasOwnProperty(n) && (e.prototype[n] = t.prototype[n]);
    for (n in o)
      o.hasOwnProperty(n) && (e.prototype[n] = o[n]);
  }
  function u(e, t) {
    return e.name = function () {
      return t;
    }, e;
  }
  var d;
  FirebaseIndex = function (e, t) {
    this.indexRef = e, this.dataRef = 'function' == typeof t ? t : function (e) {
      return t.child(e);
    }, this._initMemberVars();
  }, FirebaseIndex.prototype.add = function (e, t, o) {
    var n = this.indexRef.child(e);
    return t && 'function' == typeof t && (o = t, t = d), t !== d ? n.setWithPriority(1, t, o) : n.set(1, o), this;
  }, FirebaseIndex.prototype.drop = function (e, t) {
    return this.indexRef.child(e).remove(t), this;
  }, FirebaseIndex.prototype.on = function (e, t, o) {
    var r;
    switch (this._initChildListeners(), 2 === arguments.length && 'object' == typeof t && (o = t, t = null), e) {
    case 'child_added':
      r = n(this.eventListeners[e], t, o), i(this.dataRef, this.childRefs, r);
      break;
    case 'child_changed':
    case 'child_removed':
    case 'child_moved':
      r = n(this.eventListeners[e], t, o);
      break;
    default:
      throw Error('I cannot process this event type: ' + e);
    }
    return r;
  }, FirebaseIndex.prototype.off = function (e, t, o) {
    switch (2 === arguments.length && 'object' == typeof t && (o = t, t = null), e) {
    case 'child_added':
    case 'child_changed':
    case 'child_moved':
    case 'child_removed':
      for (var n = this.eventListeners[e]; n.length && n.some(function (e, i) {
          return e.cb === t && e.ctx === o ? (n.splice(i, 1), !0) : !1;
        }););
      break;
    default:
      throw Error('I cannot process this event type: ' + e);
    }
    return this;
  }, FirebaseIndex.prototype.startAt = function (e, o) {
    return new t(this.indexRef.startAt(e, o), this.dataRef);
  }, FirebaseIndex.prototype.endAt = function (e, o) {
    return new t(this.indexRef.endAt(e, o), this.dataRef);
  }, FirebaseIndex.prototype.limit = function (e) {
    return new t(this.indexRef.limit(e), this.dataRef);
  }, FirebaseIndex.prototype.dispose = function () {
    this.childRefs.forEach(function (e) {
      e.dispose();
    }), this.indexRef.off('child_added', this._indexAdded), this.indexRef.off('child_removed', this._indexRemoved), this.indexRef.off('child_moved', this._indexMoved), this.childRefs = this.eventListeners = this.indexRef = this.dataRef = null;
  }, FirebaseIndex.prototype._initMemberVars = function () {
    a(this, '_indexAdded', '_indexRemoved', '_indexMoved', '_childChanged'), this.initialized = !1, this.eventListeners = {
      child_added: [],
      child_moved: [],
      child_removed: [],
      child_changed: []
    }, this.childRefs = {};
  }, FirebaseIndex.prototype._initChildListeners = function () {
    this.initialized || (this.initialized = !0, this.indexRef.on('child_added', this._indexAdded), this.indexRef.on('child_removed', this._indexRemoved), this.indexRef.on('child_moved', this._indexMoved));
  }, FirebaseIndex.prototype._indexAdded = function (e, t) {
    s(this.childRefs, this._childChanged, e, t), this.dataRef(e.name()).on('value', this._childChanged.bind(this, e.name()));
  }, FirebaseIndex.prototype._indexRemoved = function (e) {
    var t = e.name();
    this.childRefs[t] && (this.childRefs[t].dispose(), o(this.eventListeners.child_removed, e, t));
  }, FirebaseIndex.prototype._indexMoved = function (e, t) {
    var n = e.name();
    this.childRefs[n] && (this.childRefs[n].prevId = t, o(this.eventListeners.child_moved, e, n, t));
  }, FirebaseIndex.prototype._childChanged = function (e, t) {
    var n = t.val(), i = null, r = d, s = this.childRefs[e];
    return null === n ? this.childRefs[e] && (i = 'child_removed') : s.loaded ? i = 'child_changed' : (r = this.childRefs[e].prevId, l(this.childRefs, r, function () {
      o(this.eventListeners.child_added, t, e, r), s.loaded = !0, s.def && s.def.resolve();
    }.bind(this))), i && o(this.eventListeners[i], t, e), this;
  }, c(t, FirebaseIndex, {
    add: function () {
      throw Error('cannot add to index on read-only FirebaseIndexQueue instance (after calling limit, endAt, or startAt)');
    },
    drop: function () {
      throw Error('cannot drop from index on read-only FirebaseIndexQueue instance (after calling limit, endAt, or startAt)');
    },
    child: function () {
      throw Error('cannot access child on read-only FirebaseIndexQueue instance (after calling limit, endAt, or startAt)');
    }
  });
  var p;
  p = 'object' == typeof _ && _ && 'function' == typeof _.defer ? _.defer : function (e) {
    return setTimeout(e, 0);
  }, Function.prototype.bind || (Function.prototype.bind = function (e) {
    if ('function' != typeof this)
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    var t = Array.prototype.slice.call(arguments, 1), o = this, n = function () {
      }, i = function () {
        return o.apply(this instanceof n && e ? this : e, t.concat(Array.prototype.slice.call(arguments)));
      };
    return n.prototype = this.prototype, i.prototype = new n(), i;
  }), Array.prototype.some || (Array.prototype.some = function (e) {
    if (null == this)
      throw new TypeError();
    var t = Object(this), o = t.length >>> 0;
    if ('function' != typeof e)
      throw new TypeError();
    for (var n = arguments[1], i = 0; o > i; i++)
      if (i in t && e.call(n, t[i], i, t))
        return !0;
    return !1;
  }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
    for (var o = 0, n = this.length; n > o; ++o)
      e.call(t, this[o], o, this);
  });
}(jQuery), angular.module('firebase', []).value('Firebase', Firebase), angular.module('firebase').factory('angularFire', [
  '$q',
  '$parse',
  function (e, t) {
    return function (o, n, i, r) {
      var s = new AngularFire(e, t, o);
      return s.associate(n, i, r);
    };
  }
]), AngularFire.prototype = {
  associate: function (e, t, o) {
    var n = this;
    void 0 == o && (o = []);
    var i = this._q.defer(), r = i.promise;
    return this._fRef.on('value', function (r) {
      var s = !1;
      if (i && (s = i, i = !1), n._remoteValue = o, r && void 0 != r.val()) {
        var l = r.val();
        if (typeof l != typeof o)
          return n._log('Error: type mismatch'), void 0;
        var a = Object.prototype.toString;
        if (a.call(o) != a.call(l))
          return n._log('Error: type mismatch'), void 0;
        if (n._remoteValue = angular.copy(l), angular.equals(l, n._parse(t)(e)))
          return;
      }
      n._safeApply(e, n._resolve.bind(n, e, t, s, n._remoteValue));
    }), r;
  },
  _log: function (e) {
    console && console.log && console.log(e);
  },
  _resolve: function (e, t, o, n) {
    this._parse(t).assign(e, angular.copy(n)), this._remoteValue = angular.copy(n), o && (o.resolve(n), this._watch(e, t));
  },
  _watch: function (e, t) {
    var o = this;
    e.$watch(t, function () {
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
      function l(e, t) {
        d[e] = t;
      }
      function a(e, t, o) {
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
          l(e, s), r !== e && a(e, r, s);
        });
      }), u.on('child_moved', function (t, o) {
        e(function () {
          var e = p[t.name()], n = i(o), r = d[e];
          a(e, n, r);
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
]), function (e, t) {
  'object' == typeof exports ? t(exports) : 'function' == typeof define && define.amd ? define(['exports'], t) : t(e);
}(this, function (e) {
  function t(e) {
    this._targetElement = e, this._options = {
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      skipLabel: 'Skip',
      doneLabel: 'Done',
      tooltipPosition: 'bottom',
      exitOnEsc: !0,
      exitOnOverlayClick: !0
    };
  }
  function o() {
    void 0 === this._currentStep ? this._currentStep = 0 : ++this._currentStep, this._introItems.length <= this._currentStep ? ('function' == typeof this._introCompleteCallback && this._introCompleteCallback.call(this), i.call(this, this._targetElement)) : l.call(this, this._introItems[this._currentStep]);
  }
  function n() {
    return 0 === this._currentStep ? !1 : (l.call(this, this._introItems[--this._currentStep]), void 0);
  }
  function i(e) {
    var t = e.querySelector('.introjs-overlay');
    if (t.style.opacity = 0, setTimeout(function () {
        t.parentNode && t.parentNode.removeChild(t);
      }, 500), (e = e.querySelector('.introjs-helperLayer')) && e.parentNode.removeChild(e), (e = document.querySelector('.introjs-showElement')) && (e.className = e.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '')), (e = document.querySelectorAll('.introjs-fixParent')) && e.length > 0)
      for (var o = e.length - 1; o >= 0; o--)
        e[o].className = e[o].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
    window.removeEventListener ? window.removeEventListener('keydown', this._onKeyDown, !0) : document.detachEvent && document.detachEvent('onkeydown', this._onKeyDown), this._currentStep = void 0, void 0 != this._introExitCallback && this._introExitCallback.call(this);
  }
  function r(e, t, o) {
    if (e = u(t), t.style.top = null, t.style.right = null, t.style.bottom = null, t.style.left = null, this._introItems[this._currentStep])
      switch (this._introItems[this._currentStep].position) {
      case 'top':
        t.style.left = '15px', t.style.top = '-' + (e.height + 10) + 'px', o.className = 'introjs-arrow bottom';
        break;
      case 'right':
        t.style.right = '-' + (e.width + 10) + 'px', o.className = 'introjs-arrow left';
        break;
      case 'left':
        t.style.top = '15px', t.style.left = '-' + (e.width + 10) + 'px', o.className = 'introjs-arrow right';
        break;
      default:
        t.style.bottom = '-' + (e.height + 10) + 'px', o.className = 'introjs-arrow top';
      }
  }
  function s(e) {
    if (e && this._introItems[this._currentStep]) {
      var t = u(this._introItems[this._currentStep].element);
      e.setAttribute('style', 'width: ' + (t.width + 10) + 'px; height:' + (t.height + 10) + 'px; top:' + (t.top - 5) + 'px;left: ' + (t.left - 5) + 'px;');
    }
  }
  function l(e) {
    var t;
    void 0 !== this._introChangeCallback && this._introChangeCallback.call(this, e.element);
    var l = this, c = document.querySelector('.introjs-helperLayer');
    if (u(e.element), null != c) {
      var d = c.querySelector('.introjs-helperNumberLayer'), p = c.querySelector('.introjs-tooltiptext'), f = c.querySelector('.introjs-arrow'), h = c.querySelector('.introjs-tooltip'), g = c.querySelector('.introjs-skipbutton');
      t = c.querySelector('.introjs-prevbutton');
      var v = c.querySelector('.introjs-nextbutton');
      if (h.style.opacity = 0, s.call(l, c), (c = document.querySelectorAll('.introjs-fixParent')) && c.length > 0)
        for (var m = c.length - 1; m >= 0; m--)
          c[m].className = c[m].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
      c = document.querySelector('.introjs-showElement'), c.className = c.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''), l._lastShowElementTimer && clearTimeout(l._lastShowElementTimer), l._lastShowElementTimer = setTimeout(function () {
        d.innerHTML = e.step, p.innerHTML = e.intro, r.call(l, e.element, h, f), h.style.opacity = 1;
      }, 350);
    } else {
      g = document.createElement('div'), t = document.createElement('span'), c = document.createElement('div'), m = document.createElement('div'), g.className = 'introjs-helperLayer', s.call(l, g), this._targetElement.appendChild(g), t.className = 'introjs-helperNumberLayer', c.className = 'introjs-arrow', m.className = 'introjs-tooltip', t.innerHTML = e.step, m.innerHTML = '<div class="introjs-tooltiptext">' + e.intro + '</div><div class="introjs-tooltipbuttons"></div>', g.appendChild(t), m.appendChild(c), g.appendChild(m), v = document.createElement('a'), v.onclick = function () {
        l._introItems.length - 1 != l._currentStep && o.call(l);
      }, v.href = 'javascript:void(0);', v.innerHTML = this._options.nextLabel, t = document.createElement('a'), t.onclick = function () {
        0 != l._currentStep && n.call(l);
      }, t.href = 'javascript:void(0);', t.innerHTML = this._options.prevLabel, g = document.createElement('a'), g.className = 'introjs-button introjs-skipbutton', g.href = 'javascript:void(0);', g.innerHTML = this._options.skipLabel, g.onclick = function () {
        i.call(l, l._targetElement);
      };
      var b = m.querySelector('.introjs-tooltipbuttons');
      b.appendChild(g), b.appendChild(t), b.appendChild(v), r.call(l, e.element, m, c);
    }
    for (0 == this._currentStep ? (t.className = 'introjs-button introjs-prevbutton introjs-disabled', v.className = 'introjs-button introjs-nextbutton', g.innerHTML = this._options.skipLabel) : this._introItems.length - 1 == this._currentStep ? (g.innerHTML = this._options.doneLabel, t.className = 'introjs-button introjs-prevbutton', v.className = 'introjs-button introjs-nextbutton introjs-disabled') : (t.className = 'introjs-button introjs-prevbutton', v.className = 'introjs-button introjs-nextbutton', g.innerHTML = this._options.skipLabel), v.focus(), e.element.className += ' introjs-showElement', g = a(e.element, 'position'), 'absolute' !== g && 'relative' !== g && (e.element.className += ' introjs-relativePosition'), g = e.element.parentNode; null != g && 'body' !== g.tagName.toLowerCase();)
      t = a(g, 'z-index'), /[0-9]+/.test(t) && (g.className += ' introjs-fixParent'), g = g.parentNode;
    g = e.element.getBoundingClientRect(), g.top >= 0 && g.left >= 0 && g.bottom + 80 <= window.innerHeight && g.right <= window.innerWidth || (t = e.element.getBoundingClientRect(), g = t.bottom - (t.bottom - t.top), v = t.bottom, t = void 0 != window.innerWidth ? window.innerHeight : document.documentElement.clientHeight, t = v - t, 0 > g ? window.scrollBy(0, g - 30) : window.scrollBy(0, t + 100));
  }
  function a(e, t) {
    var o = '';
    return e.currentStyle ? o = e.currentStyle[t] : document.defaultView && document.defaultView.getComputedStyle && (o = document.defaultView.getComputedStyle(e, null).getPropertyValue(t)), o.toLowerCase ? o.toLowerCase() : o;
  }
  function c(e) {
    var t = document.createElement('div'), o = '', n = this;
    if (t.className = 'introjs-overlay', 'body' === e.tagName.toLowerCase())
      o += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;', t.setAttribute('style', o);
    else {
      var r = u(e);
      r && (o += 'width: ' + r.width + 'px; height:' + r.height + 'px; top:' + r.top + 'px;left: ' + r.left + 'px;', t.setAttribute('style', o));
    }
    return e.appendChild(t), t.onclick = function () {
      !0 == n._options.exitOnOverlayClick && i.call(n, e);
    }, setTimeout(function () {
      o += 'opacity: .5;', t.setAttribute('style', o);
    }, 10), !0;
  }
  function u(e) {
    var t = {};
    t.width = e.offsetWidth, t.height = e.offsetHeight;
    for (var o = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);)
      o += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
    return t.top = n, t.left = o, t;
  }
  var d = function (e) {
    if ('object' == typeof e)
      return new t(e);
    if ('string' == typeof e) {
      if (e = document.querySelector(e))
        return new t(e);
      throw Error('There is no element with given selector.');
    }
    return new t(document.body);
  };
  return d.version = '0.4.0', d.fn = t.prototype = {
    clone: function () {
      return new t(this);
    },
    setOption: function (e, t) {
      return this._options[e] = t, this;
    },
    setOptions: function (e) {
      var t, o = this._options, n = {};
      for (t in o)
        n[t] = o[t];
      for (t in e)
        n[t] = e[t];
      return this._options = n, this;
    },
    start: function () {
      e: {
        var e = this._targetElement, t = e.querySelectorAll('*[data-intro]'), r = [], l = this;
        if (this._options.steps)
          for (var t = [], a = 0; this._options.steps.length > a; a++)
            this._options.steps[a].step = a + 1, r.push(this._options.steps[a]);
        else {
          if (1 > t.length)
            break e;
          for (var a = 0, u = t.length; u > a; a++) {
            var d = t[a];
            r.push({
              element: d,
              intro: d.getAttribute('data-intro'),
              step: parseInt(d.getAttribute('data-step'), 10),
              position: d.getAttribute('data-position') || this._options.tooltipPosition
            });
          }
        }
        r.sort(function (e, t) {
          return e.step - t.step;
        }), l._introItems = r, c.call(l, e) && (o.call(l), e.querySelector('.introjs-skipbutton'), e.querySelector('.introjs-nextbutton'), l._onKeyDown = function (t) {
          27 === t.keyCode && !0 == l._options.exitOnEsc ? i.call(l, e) : 37 === t.keyCode ? n.call(l) : (39 === t.keyCode || 13 === t.keyCode) && (o.call(l), t.preventDefault ? t.preventDefault() : t.returnValue = !1);
        }, l._onResize = function () {
          s.call(l, document.querySelector('.introjs-helperLayer'));
        }, window.addEventListener ? (window.addEventListener('keydown', l._onKeyDown, !0), window.addEventListener('resize', l._onResize, !0)) : document.attachEvent && (document.attachEvent('onkeydown', l._onKeyDown), document.attachEvent('onresize', l._onResize)));
      }
      return this;
    },
    goToStep: function (e) {
      return this._currentStep = e - 2, void 0 !== this._introItems && o.call(this), this;
    },
    exit: function () {
      i.call(this, this._targetElement);
    },
    onchange: function (e) {
      if ('function' != typeof e)
        throw Error('Provided callback for onchange was not a function.');
      return this._introChangeCallback = e, this;
    },
    oncomplete: function (e) {
      if ('function' != typeof e)
        throw Error('Provided callback for oncomplete was not a function.');
      return this._introCompleteCallback = e, this;
    },
    onexit: function (e) {
      if ('function' != typeof e)
        throw Error('Provided callback for onexit was not a function.');
      return this._introExitCallback = e, this;
    }
  }, e.introJs = d;
}), function () {
  var e = [].slice;
  (function (t, o) {
    var n;
    return n = function () {
      function e(e) {
        var n = this;
        this.$el = t(e), t(o).resize(function () {
          return n.refresh();
        });
      }
      return e.prototype.start = function () {
        var e, t, o, n;
        if (this._overlay_visible())
          return !1;
        for (this._add_overlay_layer(), n = this.$el.find('*[data-intro]'), t = 0, o = n.length; o > t; t++)
          e = n[t], this._show_element(e);
        return this.$el.trigger('chardinJs:start');
      }, e.prototype.toggle = function () {
        return this._overlay_visible() ? this.stop() : this.start();
      }, e.prototype.refresh = function () {
        var e, t, o, n, i;
        if (this._overlay_visible()) {
          for (n = this.$el.find('*[data-intro]'), i = [], t = 0, o = n.length; o > t; t++)
            e = n[t], i.push(this._position_helper_layer(e));
          return i;
        }
        return this;
      }, e.prototype.stop = function () {
        return this.$el.find('.chardinjs-overlay').fadeOut(function () {
          return t(this).remove();
        }), this.$el.find('.chardinjs-helper-layer').remove(), this.$el.find('.chardinjs-show-element').removeClass('chardinjs-show-element'), this.$el.find('.chardinjs-relative-position').removeClass('chardinjs-relative-position'), o.removeEventListener ? o.removeEventListener('keydown', this._onKeyDown, !0) : document.detachEvent && document.detachEvent('onkeydown', this._onKeyDown), this.$el.trigger('chardinJs:stop');
      }, e.prototype._overlay_visible = function () {
        return 0 !== this.$el.find('.chardinjs-overlay').length;
      }, e.prototype._add_overlay_layer = function () {
        var e, t, o, n = this;
        return this._overlay_visible() ? !1 : (t = document.createElement('div'), o = '', t.className = 'chardinjs-overlay', 'BODY' === this.$el.prop('tagName') ? (o += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;', t.setAttribute('style', o)) : (e = this._get_offset(this.$el.get()[0]), e && (o += 'width: ' + e.width + 'px; height:' + e.height + 'px; top:' + e.top + 'px;left: ' + e.left + 'px;', t.setAttribute('style', o))), this.$el.get()[0].appendChild(t), t.onclick = function () {
          return n.stop();
        }, setTimeout(function () {
          return o += 'opacity: .8;', t.setAttribute('style', o);
        }, 10));
      }, e.prototype._get_position = function (e) {
        return e.getAttribute('data-position') || 'bottom';
      }, e.prototype._place_tooltip = function (e) {
        var o, n, i, r, s, l, a;
        switch (l = t(e).data('tooltip_layer'), a = this._get_offset(l), l.style.top = null, l.style.right = null, l.style.bottom = null, l.style.left = null, this._get_position(e)) {
        case 'top':
        case 'bottom':
          i = this._get_offset(e), s = i.width, n = t(l).width(), l.style.left = '' + (s / 2 - a.width / 2) + 'px';
          break;
        case 'left':
        case 'right':
          i = this._get_offset(e), r = i.height, o = t(l).height(), l.style.top = '' + (r / 2 - a.height / 2) + 'px';
        }
        switch (this._get_position(e)) {
        case 'left':
          return l.style.left = '-' + (a.width - 34) + 'px';
        case 'right':
          return l.style.right = '-' + (a.width - 34) + 'px';
        case 'bottom':
          return l.style.bottom = '-' + a.height + 'px';
        case 'top':
          return l.style.top = '-' + a.height + 'px';
        }
      }, e.prototype._position_helper_layer = function (e) {
        var o, n;
        return n = t(e).data('helper_layer'), o = this._get_offset(e), n.setAttribute('style', 'width: ' + o.width + 'px; height:' + o.height + 'px; top:' + o.top + 'px; left: ' + o.left + 'px;');
      }, e.prototype._show_element = function (e) {
        var o, n, i, r;
        return n = this._get_offset(e), i = document.createElement('div'), r = document.createElement('div'), t(e).data('helper_layer', i).data('tooltip_layer', r), e.id && i.setAttribute('data-id', e.id), i.className = 'chardinjs-helper-layer chardinjs-' + this._get_position(e), this._position_helper_layer(e), this.$el.get()[0].appendChild(i), r.className = 'chardinjs-tooltip chardinjs-' + this._get_position(e), r.innerHTML = '<div class=\'chardinjs-tooltiptext\'>' + e.getAttribute('data-intro') + '</div>', i.appendChild(r), this._place_tooltip(e), e.className += ' chardinjs-show-element', o = '', e.currentStyle ? o = e.currentStyle.position : document.defaultView && document.defaultView.getComputedStyle && (o = document.defaultView.getComputedStyle(e, null).getPropertyValue('position')), o = o.toLowerCase(), 'absolute' !== o && 'relative' !== o ? e.className += ' chardinjs-relative-position' : void 0;
      }, e.prototype._get_offset = function (e) {
        var t, o, n;
        for (t = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, o = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);)
          o += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
        return t.top = n, t.left = o, t;
      }, e;
    }(), t.fn.extend({
      chardinJs: function () {
        var o, i, r, s;
        return s = arguments[0], i = arguments.length >= 2 ? e.call(arguments, 1) : [], o = t(this[0]), r = o.data('chardinJs'), r || o.data('chardinJs', r = new n(this, s)), 'string' == typeof s && r[s].apply(r, i), r;
      }
    });
  }(window.jQuery, window));
}.call(this), function (e) {
  'use strict';
  var t = 6, o = 4, n = 'asc', i = 'desc', r = '_ng_field_', s = '_ng_depth_', l = '_ng_hidden_', a = '_ng_column_', c = /CUSTOM_FILTERS/g, u = /COL_FIELD/g, d = /DISPLAY_CELL_TEMPLATE/g, p = /EDITABLE_CELL_TEMPLATE/g, f = /<.+>/;
  e.ng || (e.ng = {}), e.ngGrid = {}, e.ngGrid.i18n = {};
  var h = angular.module('ngGrid.services', []), g = angular.module('ngGrid.directives', []), v = angular.module('ngGrid.filters', []);
  angular.module('ngGrid', [
    'ngGrid.services',
    'ngGrid.directives',
    'ngGrid.filters'
  ]), ng.moveSelectionHandler = function (e, o, n, i) {
    if (void 0 === e.selectionService.selectedItems)
      return !0;
    var r, s = n.which || n.keyCode, l = !1, a = !1, c = e.selectionService.lastClickedRow.rowIndex;
    if (e.col && (r = e.col.index), 37 != s && 38 != s && 39 != s && 40 != s && 9 != s && 13 != s)
      return !0;
    if (e.enableCellSelection) {
      9 == s && n.preventDefault();
      var u = e.showSelectionCheckbox ? 1 == e.col.index : 0 == e.col.index, d = 1 == e.$index || 0 == e.$index, p = e.$index == e.renderedColumns.length - 1 || e.$index == e.renderedColumns.length - 2, f = e.col.index == e.columns.length - 1;
      37 == s || 9 == s && n.shiftKey ? (d && (u && 9 == s && n.shiftKey ? (i.$viewport.scrollLeft(i.$canvas.width()), r = e.columns.length - 1, a = !0) : i.$viewport.scrollLeft(i.$viewport.scrollLeft() - e.col.width)), u || (r -= 1)) : (39 == s || 9 == s && !n.shiftKey) && (p && (f && 9 == s && !n.shiftKey ? (i.$viewport.scrollLeft(0), r = e.showSelectionCheckbox ? 1 : 0, l = !0) : i.$viewport.scrollLeft(i.$viewport.scrollLeft() + e.col.width)), f || (r += 1));
    }
    var h;
    h = e.configGroups.length > 0 ? i.rowFactory.parsedData.filter(function (e) {
      return !e.isAggRow;
    }) : i.filteredRows;
    var g = 0;
    if (0 != c && (38 == s || 13 == s && n.shiftKey || 9 == s && n.shiftKey && a) ? g = -1 : c != h.length - 1 && (40 == s || 13 == s && !n.shiftKey || 9 == s && l) && (g = 1), g) {
      var v = h[c + g];
      v.beforeSelectionChange(v, n) && (v.continueSelection(n), e.$emit('ngGridEventDigestGridParent'), e.selectionService.lastClickedRow.renderedRowIndex >= e.renderedRows.length - t - 2 ? i.$viewport.scrollTop(i.$viewport.scrollTop() + e.rowHeight) : t + 2 >= e.selectionService.lastClickedRow.renderedRowIndex && i.$viewport.scrollTop(i.$viewport.scrollTop() - e.rowHeight));
    }
    return e.enableCellSelection && setTimeout(function () {
      e.domAccessProvider.focusCellElement(e, e.renderedColumns.indexOf(e.columns[r]));
    }, 3), !1;
  }, String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
    var t = this.length >>> 0, o = Number(arguments[1]) || 0;
    for (o = 0 > o ? Math.ceil(o) : Math.floor(o), 0 > o && (o += t); t > o; o++)
      if (o in this && this[o] === e)
        return o;
    return -1;
  }), Array.prototype.filter || (Array.prototype.filter = function (e) {
    var t = Object(this), o = t.length >>> 0;
    if ('function' != typeof e)
      throw new TypeError();
    for (var n = [], i = arguments[1], r = 0; o > r; r++)
      if (r in t) {
        var s = t[r];
        e.call(i, s, r, t) && n.push(s);
      }
    return n;
  }), v.filter('checkmark', function () {
    return function (e) {
      return e ? '\u2714' : '\u2718';
    };
  }), v.filter('ngColumns', function () {
    return function (e) {
      return e.filter(function (e) {
        return !e.isAggCol;
      });
    };
  }), h.factory('$domUtilityService', [
    '$utilityService',
    function (e) {
      var t = {}, o = {}, n = function () {
          var e = $('<div></div>');
          e.appendTo('body'), e.height(100).width(100).css('position', 'absolute').css('overflow', 'scroll'), e.append('<div style="height: 400px; width: 400px;"></div>'), t.ScrollH = e.height() - e[0].clientHeight, t.ScrollW = e.width() - e[0].clientWidth, e.empty(), e.attr('style', ''), e.append('<span style="font-family: Verdana, Helvetica, Sans-Serif; font-size: 14px;"><strong>M</strong></span>'), t.LetterW = e.children().first().width(), e.remove();
        };
      return t.eventStorage = {}, t.AssignGridContainers = function (e, o, n) {
        n.$root = $(o), n.$topPanel = n.$root.find('.ngTopPanel'), n.$groupPanel = n.$root.find('.ngGroupPanel'), n.$headerContainer = n.$topPanel.find('.ngHeaderContainer'), e.$headerContainer = n.$headerContainer, n.$headerScroller = n.$topPanel.find('.ngHeaderScroller'), n.$headers = n.$headerScroller.children(), n.$viewport = n.$root.find('.ngViewport'), n.$canvas = n.$viewport.find('.ngCanvas'), n.$footerPanel = n.$root.find('.ngFooterPanel'), e.$watch(function () {
          return n.$viewport.scrollLeft();
        }, function (e) {
          return n.$headerContainer.scrollLeft(e);
        }), t.UpdateGridLayout(e, n);
      }, t.getRealWidth = function (e) {
        var t = 0, o = {
            visibility: 'hidden',
            display: 'block'
          }, n = e.parents().andSelf().not(':visible');
        return $.swap(n[0], o, function () {
          t = e.outerWidth();
        }), t;
      }, t.UpdateGridLayout = function (e, o) {
        var n = o.$viewport.scrollTop();
        o.elementDims.rootMaxW = o.$root.width(), o.$root.is(':hidden') && (o.elementDims.rootMaxW = t.getRealWidth(o.$root)), o.elementDims.rootMaxH = o.$root.height(), o.refreshDomSizes(), e.adjustScrollTop(n, !0);
      }, t.numberOfGrids = 0, t.BuildStyles = function (o, n, i) {
        var r, s = n.config.rowHeight, l = n.$styleSheet, a = n.gridId, c = o.columns, u = 0;
        l || (l = $('#' + a), l[0] || (l = $('<style id=\'' + a + '\' type=\'text/css\' rel=\'stylesheet\' />').appendTo(n.$root))), l.empty();
        var d = o.totalRowWidth();
        r = '.' + a + ' .ngCanvas { width: ' + d + 'px; }' + '.' + a + ' .ngRow { width: ' + d + 'px; }' + '.' + a + ' .ngCanvas { width: ' + d + 'px; }' + '.' + a + ' .ngHeaderScroller { width: ' + (d + t.ScrollH + 2) + 'px}';
        for (var p = 0; c.length > p; p++) {
          var f = c[p];
          if (f.visible !== !1) {
            var h = f.pinned ? n.$viewport.scrollLeft() + u : u;
            r += '.' + a + ' .col' + p + ' { width: ' + f.width + 'px; left: ' + h + 'px; height: ' + s + 'px }' + '.' + a + ' .colt' + p + ' { width: ' + f.width + 'px; }', u += f.width;
          }
        }
        e.isIe ? l[0].styleSheet.cssText = r : l[0].appendChild(document.createTextNode(r)), n.$styleSheet = l, i && (o.adjustScrollLeft(n.$viewport.scrollLeft()), t.digest(o));
      }, t.setColLeft = function (t, n, i) {
        if (i.$styleSheet) {
          var r = o[t.index];
          r || (r = o[t.index] = RegExp('.col' + t.index + ' { width: [0-9]+px; left: [0-9]+px'));
          var s = i.$styleSheet.html(), l = s.replace(r, '.col' + t.index + ' { width: ' + t.width + 'px; left: ' + n + 'px');
          e.isIe ? setTimeout(function () {
            i.$styleSheet.html(l);
          }) : i.$styleSheet.html(l);
        }
      }, t.setColLeft.immediate = 1, t.RebuildGrid = function (e, o) {
        t.UpdateGridLayout(e, o), o.config.maintainColumnRatios && o.configureColumnWidths(), e.adjustScrollLeft(o.$viewport.scrollLeft()), t.BuildStyles(e, o, !0);
      }, t.digest = function (e) {
        e.$root.$$phase || e.$digest();
      }, t.ScrollH = 17, t.ScrollW = 17, t.LetterW = 10, n(), t;
    }
  ]), h.factory('$sortService', [
    '$parse',
    function (e) {
      var t = {};
      return t.colSortFnCache = {}, t.guessSortFn = function (e) {
        var o = typeof e;
        switch (o) {
        case 'number':
          return t.sortNumber;
        case 'boolean':
          return t.sortBool;
        case 'string':
          return e.match(/^-?[£$¤]?[\d,.]+%?$/) ? t.sortNumberStr : t.sortAlpha;
        default:
          return '[object Date]' === Object.prototype.toString.call(e) ? t.sortDate : t.basicSort;
        }
      }, t.basicSort = function (e, t) {
        return e == t ? 0 : t > e ? -1 : 1;
      }, t.sortNumber = function (e, t) {
        return e - t;
      }, t.sortNumberStr = function (e, t) {
        var o, n, i = !1, r = !1;
        return o = parseFloat(e.replace(/[^0-9.-]/g, '')), isNaN(o) && (i = !0), n = parseFloat(t.replace(/[^0-9.-]/g, '')), isNaN(n) && (r = !0), i && r ? 0 : i ? 1 : r ? -1 : o - n;
      }, t.sortAlpha = function (e, t) {
        var o = e.toLowerCase(), n = t.toLowerCase();
        return o == n ? 0 : n > o ? -1 : 1;
      }, t.sortDate = function (e, t) {
        var o = e.getTime(), n = t.getTime();
        return o == n ? 0 : n > o ? -1 : 1;
      }, t.sortBool = function (e, t) {
        return e && t ? 0 : e || t ? e ? 1 : -1 : 0;
      }, t.sortData = function (o, i) {
        if (i && o) {
          var r, s, l = o.fields.length, a = o.fields, c = i.slice(0);
          i.sort(function (i, u) {
            for (var d, p = 0, f = 0; 0 == p && l > f;) {
              r = o.columns[f], s = o.directions[f], d = t.getSortFn(r, c);
              var h = e(a[f])(i), g = e(a[f])(u);
              !h && 0 != h || !g && 0 != g ? g || h ? h ? g || (p = -1) : p = 1 : p = 0 : p = d(h, g), f++;
            }
            return s === n ? p : 0 - p;
          });
        }
      }, t.Sort = function (e, o) {
        t.isSorting || (t.isSorting = !0, t.sortData(e, o), t.isSorting = !1);
      }, t.getSortFn = function (o, n) {
        var i, r = void 0;
        if (t.colSortFnCache[o.field])
          r = t.colSortFnCache[o.field];
        else if (void 0 != o.sortingAlgorithm)
          r = o.sortingAlgorithm, t.colSortFnCache[o.field] = o.sortingAlgorithm;
        else {
          if (i = n[0], !i)
            return r;
          r = t.guessSortFn(e(o.field)(i)), r ? t.colSortFnCache[o.field] = r : r = t.sortAlpha;
        }
        return r;
      }, t;
    }
  ]), h.factory('$utilityService', [
    '$parse',
    function (t) {
      var o = {
          visualLength: function (e) {
            var t = document.getElementById('testDataLength');
            return t || (t = document.createElement('SPAN'), t.id = 'testDataLength', t.style.visibility = 'hidden', document.body.appendChild(t)), $(t).css('font', $(e).css('font')), t.innerHTML = $(e).text(), t.offsetWidth;
          },
          forIn: function (e, t) {
            for (var o in e)
              e.hasOwnProperty(o) && t(e[o], o);
          },
          evalProperty: function (e, o) {
            return t(o)(e);
          },
          endsWith: function (e, t) {
            return e && t && 'string' == typeof e ? -1 !== e.indexOf(t, e.length - t.length) : !1;
          },
          isNullOrUndefined: function (e) {
            return void 0 === e || null === e ? !0 : !1;
          },
          getElementsByClassName: function (e) {
            for (var t = [], o = RegExp('\\b' + e + '\\b'), n = document.getElementsByTagName('*'), i = 0; n.length > i; i++) {
              var r = n[i].className;
              o.test(r) && t.push(n[i]);
            }
            return t;
          },
          newId: function () {
            var e = new Date().getTime();
            return function () {
              return e += 1;
            };
          }(),
          seti18n: function (t, o) {
            var n = e.ngGrid.i18n[o];
            for (var i in n)
              t.i18n[i] = n[i];
          },
          ieVersion: function () {
            for (var e = 3, t = document.createElement('div'), o = t.getElementsByTagName('i'); t.innerHTML = '<!--[if gt IE ' + ++e + ']><i></i><![endif]-->', o[0];);
            return e > 4 ? e : void 0;
          }()
        };
      return $.extend(o, {
        isIe: function () {
          return void 0 !== o.ieVersion;
        }()
      }), o;
    }
  ]), ng.Aggregate = function (e, t, o) {
    var n = this;
    n.rowIndex = 0, n.offsetTop = n.rowIndex * o, n.entity = e, n.label = e.gLabel, n.field = e.gField, n.depth = e.gDepth, n.parent = e.parent, n.children = e.children, n.aggChildren = e.aggChildren, n.aggIndex = e.aggIndex, n.collapsed = !0, n.isAggRow = !0, n.offsetleft = 25 * e.gDepth, n.aggLabelFilter = e.aggLabelFilter, n.toggleExpand = function () {
      n.collapsed = n.collapsed ? !1 : !0, n.orig && (n.orig.collapsed = n.collapsed), n.notifyChildren();
    }, n.setExpand = function (e) {
      n.collapsed = e, n.notifyChildren();
    }, n.notifyChildren = function () {
      for (var e = Math.max(t.aggCache.length, n.children.length), o = 0; e > o; o++)
        if (n.aggChildren[o] && (n.aggChildren[o].entity[l] = n.collapsed, n.collapsed && n.aggChildren[o].setExpand(n.collapsed)), n.children[o] && (n.children[o][l] = n.collapsed), o > n.aggIndex && t.aggCache[o]) {
          var i = t.aggCache[o], r = 30 * n.children.length;
          i.offsetTop = n.collapsed ? i.offsetTop - r : i.offsetTop + r;
        }
      t.renderedChange();
    }, n.aggClass = function () {
      return n.collapsed ? 'ngAggArrowCollapsed' : 'ngAggArrowExpanded';
    }, n.totalChildren = function () {
      if (n.aggChildren.length > 0) {
        var e = 0, t = function (o) {
            o.aggChildren.length > 0 ? angular.forEach(o.aggChildren, function (e) {
              t(e);
            }) : e += o.children.length;
          };
        return t(n), e;
      }
      return n.children.length;
    }, n.copy = function () {
      var e = new ng.Aggregate(n.entity, t, o);
      return e.orig = n, e;
    };
  }, ng.Column = function (e, t, o, r, s, l) {
    var a = this, u = e.colDef, d = 500, p = 0, h = null;
    a.width = u.width, a.groupIndex = 0, a.isGroupedBy = !1, a.minWidth = u.minWidth ? u.minWidth : 50, a.maxWidth = u.maxWidth ? u.maxWidth : 9000, a.enableCellEdit = e.enableCellEdit || u.enableCellEdit, a.headerRowHeight = e.headerRowHeight, a.displayName = u.displayName || u.field, a.index = e.index, a.isAggCol = e.isAggCol, a.cellClass = u.cellClass, a.sortPriority = void 0, a.zIndex = function () {
      return a.pinned ? 5 : 0;
    }, a.cellFilter = u.cellFilter ? u.cellFilter : '', a.field = u.field, a.aggLabelFilter = u.cellFilter || u.aggLabelFilter, a.visible = l.isNullOrUndefined(u.visible) || u.visible, a.sortable = !1, a.resizable = !1, a.pinnable = !1, a.pinned = u.pinned, a.originalIndex = a.index, a.groupable = l.isNullOrUndefined(u.groupable) || u.groupable, e.enableSort && (a.sortable = l.isNullOrUndefined(u.sortable) || u.sortable), e.enableResize && (a.resizable = l.isNullOrUndefined(u.resizable) || u.resizable), e.enablePinning && (a.pinnable = l.isNullOrUndefined(u.pinnable) || u.pinnable), a.sortDirection = void 0, a.sortingAlgorithm = u.sortFn, a.headerClass = u.headerClass, a.cursor = a.sortable ? 'pointer' : 'default', a.headerCellTemplate = u.headerCellTemplate || s.get('headerCellTemplate.html'), a.cellTemplate = u.cellTemplate || s.get('cellTemplate.html').replace(c, a.cellFilter ? '|' + a.cellFilter : ''), a.enableCellEdit && (a.cellEditTemplate = s.get('cellEditTemplate.html'), a.editableCellTemplate = u.editableCellTemplate || s.get('editableCellTemplate.html')), u.cellTemplate && !f.test(u.cellTemplate) && (a.cellTemplate = $.ajax({
      type: 'GET',
      url: u.cellTemplate,
      async: !1
    }).responseText), a.enableCellEdit && u.editableCellTemplate && !f.test(u.editableCellTemplate) && (a.editableCellTemplate = $.ajax({
      type: 'GET',
      url: u.editableCellTemplate,
      async: !1
    }).responseText), u.headerCellTemplate && !f.test(u.headerCellTemplate) && (a.headerCellTemplate = $.ajax({
      type: 'GET',
      url: u.headerCellTemplate,
      async: !1
    }).responseText), a.colIndex = function () {
      return 'col' + a.index + ' colt' + a.index;
    }, a.groupedByClass = function () {
      return a.isGroupedBy ? 'ngGroupedByIcon' : 'ngGroupIcon';
    }, a.toggleVisible = function () {
      a.visible = !a.visible;
    }, a.showSortButtonUp = function () {
      return a.sortable ? a.sortDirection === i : a.sortable;
    }, a.showSortButtonDown = function () {
      return a.sortable ? a.sortDirection === n : a.sortable;
    }, a.noSortVisible = function () {
      return !a.sortDirection;
    }, a.sort = function (t) {
      if (!a.sortable)
        return !0;
      var o = a.sortDirection === n ? i : n;
      return a.sortDirection = o, e.sortCallback(a, t), !1;
    }, a.gripClick = function () {
      p++, 1 === p ? h = setTimeout(function () {
        p = 0;
      }, d) : (clearTimeout(h), e.resizeOnDataCallback(a), p = 0);
    }, a.gripOnMouseDown = function (e) {
      return e.ctrlKey && !a.pinned ? (a.toggleVisible(), r.BuildStyles(t, o), !0) : (e.target.parentElement.style.cursor = 'col-resize', a.startMousePosition = e.clientX, a.origWidth = a.width, $(document).mousemove(a.onMouseMove), $(document).mouseup(a.gripOnMouseUp), !1);
    }, a.onMouseMove = function (e) {
      var n = e.clientX - a.startMousePosition, i = n + a.origWidth;
      return a.width = a.minWidth > i ? a.minWidth : i > a.maxWidth ? a.maxWidth : i, r.BuildStyles(t, o), !1;
    }, a.gripOnMouseUp = function (e) {
      return $(document).off('mousemove', a.onMouseMove), $(document).off('mouseup', a.gripOnMouseUp), e.target.parentElement.style.cursor = 'default', t.adjustScrollLeft(0), r.digest(t), !1;
    }, a.copy = function () {
      var n = new ng.Column(e, t, o, r, s);
      return n.isClone = !0, n.orig = a, n;
    }, a.setVars = function (e) {
      a.orig = e, a.width = e.width, a.groupIndex = e.groupIndex, a.isGroupedBy = e.isGroupedBy, a.displayName = e.displayName, a.index = e.index, a.isAggCol = e.isAggCol, a.cellClass = e.cellClass, a.cellFilter = e.cellFilter, a.field = e.field, a.aggLabelFilter = e.aggLabelFilter, a.visible = e.visible, a.sortable = e.sortable, a.resizable = e.resizable, a.pinnable = e.pinnable, a.pinned = e.pinned, a.originalIndex = e.originalIndex, a.sortDirection = e.sortDirection, a.sortingAlgorithm = e.sortingAlgorithm, a.headerClass = e.headerClass, a.headerCellTemplate = e.headerCellTemplate, a.cellTemplate = e.cellTemplate, a.cellEditTemplate = e.cellEditTemplate;
    };
  }, ng.Dimension = function (e) {
    this.outerHeight = null, this.outerWidth = null, $.extend(this, e);
  }, ng.DomAccessProvider = function (e) {
    var t, o = this;
    o.selectInputElement = function (e) {
      var t = e.nodeName.toLowerCase();
      ('input' == t || 'textarea' == t) && e.select();
    }, o.focusCellElement = function (o, n) {
      if (o.selectionProvider.lastClickedRow) {
        var i = void 0 != n ? n : t, r = o.selectionProvider.lastClickedRow.clone ? o.selectionProvider.lastClickedRow.clone.elm : o.selectionProvider.lastClickedRow.elm;
        if (void 0 != i && r) {
          var s = angular.element(r[0].children).filter(function () {
              return 8 != this.nodeType;
            }), l = Math.max(Math.min(o.renderedColumns.length - 1, i), 0);
          e.config.showSelectionCheckbox && angular.element(s[l]).scope() && 0 == angular.element(s[l]).scope().col.index && (l = 1), s[l] && s[l].children[0].focus(), t = i;
        }
      }
    };
    var n = function (e, t) {
      e.css({
        '-webkit-touch-callout': t,
        '-webkit-user-select': t,
        '-khtml-user-select': t,
        '-moz-user-select': 'none' == t ? '-moz-none' : t,
        '-ms-user-select': t,
        'user-select': t
      });
    };
    o.selectionHandlers = function (t, o) {
      var i = !1;
      o.bind('keydown', function (r) {
        if (16 == r.keyCode)
          return n(o, 'none', r), !0;
        if (!i) {
          i = !0;
          var s = ng.moveSelectionHandler(t, o, r, e);
          return i = !1, s;
        }
        return !0;
      }), o.bind('keyup', function (e) {
        return 16 == e.keyCode && n(o, 'text', e), !0;
      });
    };
  }, ng.EventProvider = function (t, o, n) {
    var i = this;
    i.colToMove = void 0, i.groupToMove = void 0, i.assignEvents = function () {
      t.config.jqueryUIDraggable && !t.config.enablePinning ? (t.$groupPanel.droppable({
        addClasses: !1,
        drop: function (e) {
          i.onGroupDrop(e);
        }
      }), o.$evalAsync(i.setDraggables)) : (t.$groupPanel.on('mousedown', i.onGroupMouseDown).on('dragover', i.dragOver).on('drop', i.onGroupDrop), t.$headerScroller.on('mousedown', i.onHeaderMouseDown).on('dragover', i.dragOver), t.config.enableColumnReordering && !t.config.enablePinning && t.$headerScroller.on('drop', i.onHeaderDrop), t.config.enableRowReordering && t.$viewport.on('mousedown', i.onRowMouseDown).on('dragover', i.dragOver).on('drop', i.onRowDrop)), o.$watch('columns', i.setDraggables, !0);
    }, i.dragStart = function (e) {
      e.dataTransfer.setData('text', '');
    }, i.dragOver = function (e) {
      e.preventDefault();
    }, i.setDraggables = function () {
      if (t.config.jqueryUIDraggable)
        t.$root.find('.ngHeaderSortColumn').draggable({
          helper: 'clone',
          appendTo: 'body',
          stack: 'div',
          addClasses: !1,
          start: function (e) {
            i.onHeaderMouseDown(e);
          }
        }).droppable({
          drop: function (e) {
            i.onHeaderDrop(e);
          }
        });
      else {
        var e = t.$root.find('.ngHeaderSortColumn');
        angular.forEach(e, function (e) {
          e.setAttribute('draggable', 'true'), e.addEventListener && e.addEventListener('dragstart', i.dragStart);
        }), -1 != navigator.userAgent.indexOf('MSIE') && t.$root.find('.ngHeaderSortColumn').bind('selectstart', function () {
          return this.dragDrop(), !1;
        });
      }
    }, i.onGroupMouseDown = function (e) {
      var o = $(e.target);
      if ('ngRemoveGroup' != o[0].className) {
        var n = angular.element(o).scope();
        n && (t.config.jqueryUIDraggable || (o.attr('draggable', 'true'), this.addEventListener && this.addEventListener('dragstart', i.dragStart), -1 != navigator.userAgent.indexOf('MSIE') && o.bind('selectstart', function () {
          return this.dragDrop(), !1;
        })), i.groupToMove = {
          header: o,
          groupName: n.group,
          index: n.$index
        });
      } else
        i.groupToMove = void 0;
    }, i.onGroupDrop = function (e) {
      e.stopPropagation();
      var n, r;
      i.groupToMove ? (n = $(e.target).closest('.ngGroupElement'), 'ngGroupPanel' == n.context.className ? (o.configGroups.splice(i.groupToMove.index, 1), o.configGroups.push(i.groupToMove.groupName)) : (r = angular.element(n).scope(), r && i.groupToMove.index != r.$index && (o.configGroups.splice(i.groupToMove.index, 1), o.configGroups.splice(r.$index, 0, i.groupToMove.groupName))), i.groupToMove = void 0, t.fixGroupIndexes()) : i.colToMove && (-1 == o.configGroups.indexOf(i.colToMove.col) && (n = $(e.target).closest('.ngGroupElement'), 'ngGroupPanel' == n.context.className || 'ngGroupPanelDescription ng-binding' == n.context.className ? o.groupBy(i.colToMove.col) : (r = angular.element(n).scope(), r && o.removeGroup(r.$index))), i.colToMove = void 0), o.$$phase || o.$apply();
    }, i.onHeaderMouseDown = function (e) {
      var t = $(e.target).closest('.ngHeaderSortColumn'), o = angular.element(t).scope();
      o && (i.colToMove = {
        header: t,
        col: o.col
      });
    }, i.onHeaderDrop = function (e) {
      if (i.colToMove) {
        var r = $(e.target).closest('.ngHeaderSortColumn'), s = angular.element(r).scope();
        if (s) {
          if (i.colToMove.col == s.col)
            return;
          o.columns.splice(i.colToMove.col.index, 1), o.columns.splice(s.col.index, 0, i.colToMove.col), t.fixColumnIndexes(), n.BuildStyles(o, t, !0), i.colToMove = void 0;
        }
      }
    }, i.onRowMouseDown = function (e) {
      var t = $(e.target).closest('.ngRow'), o = angular.element(t).scope();
      o && (t.attr('draggable', 'true'), n.eventStorage.rowToMove = {
        targetRow: t,
        scope: o
      });
    }, i.onRowDrop = function (e) {
      var o = $(e.target).closest('.ngRow'), i = angular.element(o).scope();
      if (i) {
        var r = n.eventStorage.rowToMove;
        if (r.scope.row == i.row)
          return;
        t.changeRowOrder(r.scope.row, i.row), t.searchProvider.evalFilter(), n.eventStorage.rowToMove = void 0, n.digest(i.$root);
      }
    }, i.assignGridEventHandlers = function () {
      -1 === t.config.tabIndex ? (t.$viewport.attr('tabIndex', n.numberOfGrids), n.numberOfGrids++) : t.$viewport.attr('tabIndex', t.config.tabIndex), $(e).resize(function () {
        n.RebuildGrid(o, t);
      });
    }, i.assignGridEventHandlers(), i.assignEvents();
  }, ng.Footer = function (e, t) {
    e.maxRows = function () {
      var o = Math.max(e.pagingOptions.totalServerItems, t.data.length);
      return o;
    }, e.multiSelect = t.config.enableRowSelection && t.config.multiSelect, e.selectedItemCount = t.selectedItemCount, e.maxPages = function () {
      return Math.ceil(e.maxRows() / e.pagingOptions.pageSize);
    }, e.pageForward = function () {
      var t = e.pagingOptions.currentPage;
      e.pagingOptions.totalServerItems > 0 ? e.pagingOptions.currentPage = Math.min(t + 1, e.maxPages()) : e.pagingOptions.currentPage++;
    }, e.pageBackward = function () {
      var t = e.pagingOptions.currentPage;
      e.pagingOptions.currentPage = Math.max(t - 1, 1);
    }, e.pageToFirst = function () {
      e.pagingOptions.currentPage = 1;
    }, e.pageToLast = function () {
      var t = e.maxPages();
      e.pagingOptions.currentPage = t;
    }, e.cantPageForward = function () {
      var o = e.pagingOptions.currentPage, n = e.maxPages();
      return e.pagingOptions.totalServerItems > 0 ? !(n > o) : 1 > t.data.length;
    }, e.cantPageToLast = function () {
      return e.pagingOptions.totalServerItems > 0 ? e.cantPageForward() : !0;
    }, e.cantPageBackward = function () {
      var t = e.pagingOptions.currentPage;
      return !(t > 1);
    };
  }, ng.Grid = function (n, i, r, s, a, c, u, d) {
    var p = {
        aggregateTemplate: void 0,
        afterSelectionChange: function () {
        },
        beforeSelectionChange: function () {
          return !0;
        },
        checkboxCellTemplate: void 0,
        checkboxHeaderTemplate: void 0,
        columnDefs: void 0,
        data: [],
        dataUpdated: function () {
        },
        enableCellEdit: !1,
        enableCellSelection: !1,
        enableColumnResize: !1,
        enableColumnReordering: !1,
        enableColumnHeavyVirt: !1,
        enablePaging: !1,
        enablePinning: !1,
        enableRowReordering: !1,
        enableRowSelection: !0,
        enableSorting: !0,
        excludeProperties: [],
        filterOptions: {
          filterText: '',
          useExternalFilter: !1
        },
        footerRowHeight: 55,
        groups: [],
        headerRowHeight: 30,
        headerRowTemplate: void 0,
        jqueryUIDraggable: !1,
        jqueryUITheme: !1,
        keepLastSelected: !0,
        maintainColumnRatios: void 0,
        multiSelect: !0,
        pagingOptions: {
          pageSizes: [
            250,
            500,
            1000
          ],
          pageSize: 250,
          totalServerItems: 0,
          currentPage: 1
        },
        pinSelectionCheckbox: !1,
        plugins: [],
        rowHeight: 30,
        rowTemplate: void 0,
        selectedItems: [],
        selectWithCheckboxOnly: !1,
        showColumnMenu: !1,
        showFilter: !1,
        showFooter: !1,
        showGroupPanel: !1,
        showSelectionCheckbox: !1,
        sortInfo: {
          fields: [],
          columns: [],
          directions: []
        },
        tabIndex: -1,
        useExternalSorting: !1,
        i18n: 'en',
        virtualizationThreshold: 50
      }, h = this;
    h.maxCanvasHt = 0, h.config = $.extend(p, e.ngGrid.config, i), h.config.showSelectionCheckbox = h.config.showSelectionCheckbox && h.config.enableColumnHeavyVirt === !1, h.config.enablePinning = h.config.enablePinning && h.config.enableColumnHeavyVirt === !1, h.config.selectWithCheckboxOnly = h.config.selectWithCheckboxOnly && h.config.showSelectionCheckbox !== !1, h.config.pinSelectionCheckbox = h.config.enablePinning, 'string' == typeof i.columnDefs && (h.config.columnDefs = n.$eval(i.columnDefs)), h.rowCache = [], h.rowMap = [], h.gridId = 'ng' + u.newId(), h.$root = null, h.$groupPanel = null, h.$topPanel = null, h.$headerContainer = null, h.$headerScroller = null, h.$headers = null, h.$viewport = null, h.$canvas = null, h.rootDim = h.config.gridDim, h.data = [], h.lateBindColumns = !1, h.filteredRows = [];
    var g = function (e) {
      var t = h.config[e], o = h.gridId + e + '.html';
      if (t && !f.test(t))
        c.put(o, $.ajax({
          type: 'GET',
          url: t,
          async: !1
        }).responseText);
      else if (t)
        c.put(o, t);
      else {
        var n = e + '.html';
        c.put(o, c.get(n));
      }
    };
    g('rowTemplate'), g('aggregateTemplate'), g('headerRowTemplate'), g('checkboxCellTemplate'), g('checkboxHeaderTemplate'), 'object' == typeof h.config.data && (h.data = h.config.data), h.calcMaxCanvasHeight = function () {
      return h.config.groups.length > 0 ? h.rowFactory.parsedData.filter(function (e) {
        return !e[l];
      }).length * h.config.rowHeight : h.filteredRows.length * h.config.rowHeight;
    }, h.elementDims = {
      scrollW: 0,
      scrollH: 0,
      rowIndexCellW: 25,
      rowSelectedCellW: 25,
      rootMaxW: 0,
      rootMaxH: 0
    }, h.setRenderedRows = function (e) {
      n.renderedRows.length = e.length;
      for (var t = 0; e.length > t; t++)
        !n.renderedRows[t] || e[t].isAggRow || n.renderedRows[t].isAggRow ? (n.renderedRows[t] = e[t].copy(), n.renderedRows[t].collapsed = e[t].collapsed, e[t].isAggRow || n.renderedRows[t].setVars(e[t])) : n.renderedRows[t].setVars(e[t]), n.renderedRows[t].rowIndex = e[t].rowIndex, n.renderedRows[t].offsetTop = e[t].offsetTop, e[t].renderedRowIndex = t;
      h.refreshDomSizes(), n.$emit('ngGridEventRows', e);
    }, h.minRowsToRender = function () {
      var e = n.viewportDimHeight() || 1;
      return Math.floor(e / h.config.rowHeight);
    }, h.refreshDomSizes = function () {
      var e = new ng.Dimension();
      e.outerWidth = h.elementDims.rootMaxW, e.outerHeight = h.elementDims.rootMaxH, h.rootDim = e, h.maxCanvasHt = h.calcMaxCanvasHeight();
    }, h.buildColumnDefsFromData = function () {
      h.config.columnDefs = [];
      var e = h.data[0];
      return e ? (u.forIn(e, function (e, t) {
        -1 == h.config.excludeProperties.indexOf(t) && h.config.columnDefs.push({ field: t });
      }), void 0) : (h.lateBoundColumns = !0, void 0);
    }, h.buildColumns = function () {
      var e = h.config.columnDefs, t = [];
      if (e || (h.buildColumnDefsFromData(), e = h.config.columnDefs), h.config.showSelectionCheckbox && t.push(new ng.Column({
          colDef: {
            field: '\u2714',
            width: h.elementDims.rowSelectedCellW,
            sortable: !1,
            resizable: !1,
            groupable: !1,
            headerCellTemplate: c.get(n.gridId + 'checkboxHeaderTemplate.html'),
            cellTemplate: c.get(n.gridId + 'checkboxCellTemplate.html'),
            pinned: h.config.pinSelectionCheckbox
          },
          index: 0,
          headerRowHeight: h.config.headerRowHeight,
          sortCallback: h.sortData,
          resizeOnDataCallback: h.resizeOnData,
          enableResize: h.config.enableColumnResize,
          enableSort: h.config.enableSorting
        }, n, h, s, c, u)), e.length > 0) {
        var o = h.config.showSelectionCheckbox ? h.config.groups.length + 1 : h.config.groups.length;
        n.configGroups.length = 0, angular.forEach(e, function (e, i) {
          i += o;
          var r = new ng.Column({
              colDef: e,
              index: i,
              headerRowHeight: h.config.headerRowHeight,
              sortCallback: h.sortData,
              resizeOnDataCallback: h.resizeOnData,
              enableResize: h.config.enableColumnResize,
              enableSort: h.config.enableSorting,
              enablePinning: h.config.enablePinning,
              enableCellEdit: h.config.enableCellEdit
            }, n, h, s, c, u), l = h.config.groups.indexOf(e.field);
          -1 != l && (r.isGroupedBy = !0, n.configGroups.splice(l, 0, r), r.groupIndex = n.configGroups.length), t.push(r);
        }), n.columns = t;
      }
    }, h.configureColumnWidths = function () {
      var e = h.config.columnDefs, t = h.config.showSelectionCheckbox ? n.configGroups.length + 1 : n.configGroups.length, o = e.length + t, i = [], r = [], l = 0, a = 0;
      if (a += h.config.showSelectionCheckbox ? 25 : 0, angular.forEach(e, function (e, o) {
          o += t;
          var s = !1, c = void 0;
          if (u.isNullOrUndefined(e.width) ? e.width = '*' : (s = isNaN(e.width) ? u.endsWith(e.width, '%') : !1, c = s ? e.width : parseInt(e.width, 10)), isNaN(c)) {
            if (c = e.width, 'auto' == c) {
              n.columns[o].width = e.minWidth, a += n.columns[o].width;
              var p = n.columns[o];
              return d(function () {
                h.resizeOnData(p, !0);
              }), void 0;
            }
            if (-1 != c.indexOf('*'))
              return e.visible !== !1 && (l += c.length), e.index = o, i.push(e), void 0;
            if (s)
              return e.index = o, r.push(e), void 0;
            throw 'unable to parse column width, use percentage ("10%","20%", etc...) or "*" to use remaining width of grid';
          }
          e.visible !== !1 && (a += n.columns[o].width = parseInt(e.width, 10));
        }), i.length > 0) {
        h.config.maintainColumnRatios === !1 ? angular.noop() : h.config.maintainColumnRatios = !0;
        var c = h.rootDim.outerWidth - a, p = Math.floor(c / l);
        angular.forEach(i, function (e) {
          var t = e.width.length;
          if (n.columns[e.index].width = p * t, e.index + 1 == o) {
            var i = 2;
            h.maxCanvasHt > n.viewportDimHeight() && (i += s.ScrollW), n.columns[e.index].width -= i;
          }
          e.visible !== !1 && (a += n.columns[e.index].width);
        });
      }
      r.length > 0 && angular.forEach(r, function (e) {
        var t = e.width;
        n.columns[e.index].width = Math.floor(h.rootDim.outerWidth * (parseInt(t.slice(0, -1), 10) / 100));
      });
    }, h.init = function () {
      n.selectionProvider = new ng.selectionProvider(h, n), n.domAccessProvider = new ng.DomAccessProvider(h), h.rowFactory = new ng.RowFactory(h, n, s, c, u), h.searchProvider = new ng.SearchProvider(n, h, a), h.styleProvider = new ng.StyleProvider(n, h, s), n.$watch('configGroups', function (e) {
        var t = [];
        angular.forEach(e, function (e) {
          t.push(e.field || e);
        }), h.config.groups = t, h.rowFactory.filteredRowsChanged(), n.$emit('ngGridEventGroups', e);
      }, !0), n.$watch('columns', function (e) {
        s.BuildStyles(n, h, !0), n.$emit('ngGridEventColumns', e);
      }, !0), n.$watch(function () {
        return i.i18n;
      }, function (e) {
        u.seti18n(n, e);
      }), h.maxCanvasHt = h.calcMaxCanvasHeight(), h.config.sortInfo.fields && h.config.sortInfo.fields.length > 0 && (h.config.sortInfo.columns ? h.config.sortInfo.columns.length = 0 : h.config.sortInfo.columns = [], angular.forEach(n.columns, function (e) {
        return -1 != h.config.sortInfo.fields.indexOf(e.field) && h.config.sortInfo.columns.push(e), !1;
      }), h.sortData(h.config.sortInfo.columns, {}));
    }, h.resizeOnData = function (e) {
      var t = e.minWidth, o = u.getElementsByClassName('col' + e.index);
      angular.forEach(o, function (e, o) {
        var n;
        if (0 === o) {
          var i = $(e).find('.ngHeaderText');
          n = u.visualLength(i) + 10;
        } else {
          var r = $(e).find('.ngCellText');
          n = u.visualLength(r) + 10;
        }
        n > t && (t = n);
      }), e.width = e.longest = Math.min(e.maxWidth, t + 7), s.BuildStyles(n, h, !0);
    }, h.lastSortedColumns = [], h.changeRowOrder = function (e, t) {
      var o = h.rowCache.indexOf(e), i = h.rowCache.indexOf(t);
      h.rowCache.splice(o, 1), h.rowCache.splice(i, 0, e), n.$emit('ngGridEventChangeOrder', h.rowCache);
    }, h.sortData = function (e, t) {
      if (t.shiftKey && h.config.sortInfo) {
        var o = h.config.sortInfo.columns.indexOf(e);
        -1 === o ? (1 == h.config.sortInfo.columns.length && (h.config.sortInfo.columns[0].sortPriority = 1), h.config.sortInfo.columns.push(e), e.sortPriority = h.config.sortInfo.columns.length, h.config.sortInfo.fields.push(e.field), h.config.sortInfo.directions.push(e.sortDirection), h.lastSortedColumns.push(e)) : h.config.sortInfo.directions[o] = e.sortDirection;
      } else {
        var i = $.isArray(e);
        h.config.sortInfo.columns.length = 0, h.config.sortInfo.fields.length = 0, h.config.sortInfo.directions.length = 0;
        var s = function (e) {
          h.config.sortInfo.columns.push(e), h.config.sortInfo.fields.push(e.field), h.config.sortInfo.directions.push(e.sortDirection), h.lastSortedColumns.push(e);
        };
        i ? (h.clearSortingData(), angular.forEach(e, function (e, t) {
          e.sortPriority = t + 1, s(e);
        })) : (h.clearSortingData(e), e.sortPriority = void 0, s(e));
      }
      if (!h.config.useExternalSorting) {
        var l = h.data.slice(0);
        angular.forEach(l, function (e, t) {
          e.preSortSelected = h.rowCache[h.rowMap[t]].selected, e.preSortIndex = t;
        }), r.Sort(h.config.sortInfo, l), angular.forEach(l, function (e, t) {
          h.rowCache[t].entity = e, h.rowCache[t].selected = e.preSortSelected, h.rowMap[e.preSortIndex] = t, delete e.preSortSelected, delete e.preSortIndex;
        });
      }
      h.searchProvider.evalFilter(), n.$emit('ngGridEventSorted', h.config.sortInfo);
    }, h.clearSortingData = function (e) {
      e ? (angular.forEach(h.lastSortedColumns, function (t) {
        e.index != t.index && (t.sortDirection = '', t.sortPriority = null);
      }), h.lastSortedColumns[0] = e, h.lastSortedColumns.length = 1) : (angular.forEach(h.lastSortedColumns, function (e) {
        e.sortDirection = '', e.sortPriority = null;
      }), h.lastSortedColumns = []);
    }, h.fixColumnIndexes = function () {
      for (var e = 0; n.columns.length > e; e++)
        n.columns[e].visible !== !1 && (n.columns[e].index = e);
    }, h.fixGroupIndexes = function () {
      angular.forEach(n.configGroups, function (e, t) {
        e.groupIndex = t + 1;
      });
    }, n.elementsNeedMeasuring = !0, n.columns = [], n.renderedRows = [], n.renderedColumns = [], n.headerRow = null, n.rowHeight = h.config.rowHeight, n.jqueryUITheme = h.config.jqueryUITheme, n.showSelectionCheckbox = h.config.showSelectionCheckbox, n.enableCellSelection = h.config.enableCellSelection, n.footer = null, n.selectedItems = h.config.selectedItems, n.multiSelect = h.config.multiSelect, n.showFooter = h.config.showFooter, n.footerRowHeight = n.showFooter ? h.config.footerRowHeight : 0, n.showColumnMenu = h.config.showColumnMenu, n.showMenu = !1, n.configGroups = [], n.gridId = h.gridId, n.enablePaging = h.config.enablePaging, n.pagingOptions = h.config.pagingOptions, n.i18n = {}, u.seti18n(n, h.config.i18n), n.adjustScrollLeft = function (e) {
      for (var t = 0, o = 0, i = n.columns.length, r = [], l = !h.config.enableColumnHeavyVirt, a = 0, c = function (e) {
            l ? r.push(e) : n.renderedColumns[a] ? n.renderedColumns[a].setVars(e) : n.renderedColumns[a] = e.copy(), a++;
          }, u = 0; i > u; u++) {
        var d = n.columns[u];
        if (d.visible !== !1) {
          var p = d.width + t;
          if (d.pinned) {
            c(d);
            var f = u > 0 ? e + o : e;
            s.setColLeft(d, f, h), o += d.width;
          } else
            p >= e && e + h.rootDim.outerWidth >= t && c(d);
          t += d.width;
        }
      }
      l && (n.renderedColumns = r);
    }, h.prevScrollTop = 0, h.prevScrollIndex = 0, n.adjustScrollTop = function (e, i) {
      if (h.prevScrollTop !== e || i) {
        e > 0 && h.$viewport[0].scrollHeight - e <= h.$viewport.outerHeight() && n.$emit('ngGridEventScroll');
        var r, s = Math.floor(e / h.config.rowHeight);
        if (h.filteredRows.length > h.config.virtualizationThreshold) {
          if (e > h.prevScrollTop && h.prevScrollIndex + o > s)
            return;
          if (h.prevScrollTop > e && s > h.prevScrollIndex - o)
            return;
          r = new ng.Range(Math.max(0, s - t), s + h.minRowsToRender() + t);
        } else {
          var l = n.configGroups.length > 0 ? h.rowFactory.parsedData.length : h.data.length;
          r = new ng.Range(0, Math.max(l, h.minRowsToRender() + t));
        }
        h.prevScrollTop = e, h.rowFactory.UpdateViewableRange(r), h.prevScrollIndex = s;
      }
    }, n.toggleShowMenu = function () {
      n.showMenu = !n.showMenu;
    }, n.toggleSelectAll = function (e) {
      n.selectionProvider.toggleSelectAll(e);
    }, n.totalFilteredItemsLength = function () {
      return h.filteredRows.length;
    }, n.showGroupPanel = function () {
      return h.config.showGroupPanel;
    }, n.topPanelHeight = function () {
      return h.config.showGroupPanel === !0 ? h.config.headerRowHeight + 32 : h.config.headerRowHeight;
    }, n.viewportDimHeight = function () {
      return Math.max(0, h.rootDim.outerHeight - n.topPanelHeight() - n.footerRowHeight - 2);
    }, n.groupBy = function (e) {
      if (e.sortDirection || e.sort({ shiftKey: !1 }), !(1 > h.data.length) && e.groupable && e.field) {
        var t = n.configGroups.indexOf(e);
        -1 == t ? (e.isGroupedBy = !0, n.configGroups.push(e), e.groupIndex = n.configGroups.length) : n.removeGroup(t), h.$viewport.scrollTop(0), s.digest(n);
      }
    }, n.removeGroup = function (e) {
      var t = n.columns.filter(function (t) {
          return t.groupIndex == e + 1;
        })[0];
      t.isGroupedBy = !1, t.groupIndex = 0, n.columns[e].isAggCol && (n.columns.splice(e, 1), n.configGroups.splice(e, 1), h.fixGroupIndexes()), 0 === n.configGroups.length && (h.fixColumnIndexes(), s.digest(n)), n.adjustScrollLeft(0);
    }, n.togglePin = function (e) {
      for (var t = e.index, o = 0, i = 0; n.columns.length > i && n.columns[i].pinned; i++)
        o++;
      e.pinned && (o = Math.max(e.originalIndex, o - 1)), e.pinned = !e.pinned, n.columns.splice(t, 1), n.columns.splice(o, 0, e), h.fixColumnIndexes(), s.BuildStyles(n, h, !0), h.$viewport.scrollLeft(h.$viewport.scrollLeft() - e.width);
    }, n.totalRowWidth = function () {
      for (var e = 0, t = n.columns, o = 0; t.length > o; o++)
        t[o].visible !== !1 && (e += t[o].width);
      return e;
    }, n.headerScrollerDim = function () {
      var e = n.viewportDimHeight(), t = h.maxCanvasHt, o = t > e, i = new ng.Dimension();
      return i.autoFitHeight = !0, i.outerWidth = n.totalRowWidth(), o ? i.outerWidth += h.elementDims.scrollW : h.elementDims.scrollH >= t - e && (i.outerWidth += h.elementDims.scrollW), i;
    }, h.init();
  }, ng.Range = function (e, t) {
    this.topRow = e, this.bottomRow = t;
  }, ng.Row = function (e, t, o, n, i) {
    var r = this, s = t.enableRowSelection;
    r.jqueryUITheme = t.jqueryUITheme, r.rowClasses = t.rowClasses, r.entity = e, r.selectionProvider = o, r.selected = o.getSelection(e), r.cursor = s ? 'pointer' : 'default', r.setSelection = function (e) {
      r.selectionProvider.setSelection(r, e), r.selectionProvider.lastClickedRow = r;
    }, r.continueSelection = function (e) {
      r.selectionProvider.ChangeSelection(r, e);
    }, r.ensureEntity = function (e) {
      r.entity != e && (r.entity = e, r.selected = r.selectionProvider.getSelection(r.entity));
    }, r.toggleSelected = function (e) {
      if (!s && !t.enableCellSelection)
        return !0;
      var o = e.target || e;
      return 'checkbox' == o.type && 'ngSelectionCell ng-scope' != o.parentElement.className ? !0 : t.selectWithCheckboxOnly && 'checkbox' != o.type ? (r.selectionProvider.lastClickedRow = r, !0) : (r.beforeSelectionChange(r, e) && r.continueSelection(e), !1);
    }, r.rowIndex = n, r.offsetTop = r.rowIndex * t.rowHeight, r.rowDisplayIndex = 0, r.alternatingRowClass = function () {
      var e = 0 === r.rowIndex % 2, t = {
          selected: r.selected,
          'ui-state-default': r.jqueryUITheme && e,
          'ui-state-active': r.jqueryUITheme && !e,
          even: e,
          odd: !e
        };
      return t;
    }, r.beforeSelectionChange = t.beforeSelectionChangeCallback, r.afterSelectionChange = t.afterSelectionChangeCallback, r.getProperty = function (e) {
      return i.evalProperty(r.entity, e);
    }, r.copy = function () {
      return r.clone = new ng.Row(e, t, o, n, i), r.clone.isClone = !0, r.clone.elm = r.elm, r.clone;
    }, r.setVars = function (e) {
      e.clone = r, r.entity = e.entity, r.selected = e.selected;
    };
  }, ng.RowFactory = function (e, o, n, i, c) {
    var u = this;
    u.aggCache = {}, u.parentCache = [], u.dataChanged = !0, u.parsedData = [], u.rowConfig = {}, u.selectionProvider = o.selectionProvider, u.rowHeight = 30, u.numberOfAggregates = 0, u.groupedData = void 0, u.rowHeight = e.config.rowHeight, u.rowConfig = {
      enableRowSelection: e.config.enableRowSelection,
      rowClasses: e.config.rowClasses,
      selectedItems: o.selectedItems,
      selectWithCheckboxOnly: e.config.selectWithCheckboxOnly,
      beforeSelectionChangeCallback: e.config.beforeSelectionChange,
      afterSelectionChangeCallback: e.config.afterSelectionChange,
      jqueryUITheme: e.config.jqueryUITheme,
      enableCellSelection: e.config.enableCellSelection,
      rowHeight: e.config.rowHeight
    }, u.renderedRange = new ng.Range(0, e.minRowsToRender() + t), u.buildEntityRow = function (e, t) {
      return new ng.Row(e, u.rowConfig, u.selectionProvider, t, c);
    }, u.buildAggregateRow = function (e, t) {
      var o = u.aggCache[e.aggIndex];
      return o || (o = new ng.Aggregate(e, u, u.rowConfig.rowHeight), u.aggCache[e.aggIndex] = o), o.rowIndex = t, o.offsetTop = t * u.rowConfig.rowHeight, o;
    }, u.UpdateViewableRange = function (e) {
      u.renderedRange = e, u.renderedChange();
    }, u.filteredRowsChanged = function () {
      e.lateBoundColumns && e.filteredRows.length > 0 && (e.config.columnDefs = void 0, e.buildColumns(), e.lateBoundColumns = !1, o.$evalAsync(function () {
        o.adjustScrollLeft(0);
      })), u.dataChanged = !0, e.config.groups.length > 0 && u.getGrouping(e.config.groups), u.UpdateViewableRange(u.renderedRange);
    }, u.renderedChange = function () {
      if (!u.groupedData || 1 > e.config.groups.length)
        return u.renderedChangeNoGroups(), e.refreshDomSizes(), void 0;
      u.wasGrouped = !0, u.parentCache = [];
      var t = 0, o = u.parsedData.filter(function (e) {
          return e.isAggRow ? e.parent && e.parent.collapsed ? !1 : !0 : (e[l] || (e.rowIndex = t++), !e[l]);
        });
      u.totalRows = o.length;
      for (var n = [], i = u.renderedRange.topRow; u.renderedRange.bottomRow > i; i++)
        o[i] && (o[i].offsetTop = i * e.config.rowHeight, n.push(o[i]));
      e.setRenderedRows(n);
    }, u.renderedChangeNoGroups = function () {
      for (var t = [], o = u.renderedRange.topRow; u.renderedRange.bottomRow > o; o++)
        e.filteredRows[o] && (e.filteredRows[o].rowIndex = o, e.filteredRows[o].offsetTop = o * e.config.rowHeight, t.push(e.filteredRows[o]));
      e.setRenderedRows(t);
    }, u.fixRowCache = function () {
      var t = e.data.length, o = t - e.rowCache.length;
      if (0 > o)
        e.rowCache.length = e.rowMap.length = t;
      else
        for (var n = e.rowCache.length; t > n; n++)
          e.rowCache[n] = e.rowFactory.buildEntityRow(e.data[n], n);
    }, u.parseGroupData = function (e) {
      if (e.values)
        for (var t = 0; e.values.length > t; t++)
          u.parentCache[u.parentCache.length - 1].children.push(e.values[t]), u.parsedData.push(e.values[t]);
      else
        for (var o in e)
          if (o != r && o != s && o != a && e.hasOwnProperty(o)) {
            var n = u.buildAggregateRow({
                gField: e[r],
                gLabel: o,
                gDepth: e[s],
                isAggRow: !0,
                _ng_hidden_: !1,
                children: [],
                aggChildren: [],
                aggIndex: u.numberOfAggregates,
                aggLabelFilter: e[a].aggLabelFilter
              }, 0);
            u.numberOfAggregates++, n.parent = u.parentCache[n.depth - 1], n.parent && (n.parent.collapsed = !1, n.parent.aggChildren.push(n)), u.parsedData.push(n), u.parentCache[n.depth] = n, u.parseGroupData(e[o]);
          }
    }, u.getGrouping = function (t) {
      u.aggCache = [], u.numberOfAggregates = 0, u.groupedData = {};
      for (var d = e.filteredRows, p = t.length, f = o.columns, h = 0; d.length > h; h++) {
        var g = d[h].entity;
        if (!g)
          return;
        d[h][l] = !0;
        for (var v = u.groupedData, m = 0; t.length > m; m++) {
          var b = t[m], w = f.filter(function (e) {
              return e.field == b;
            })[0], y = c.evalProperty(g, b);
          y = y ? '' + y : 'null', v[y] || (v[y] = {}), v[r] || (v[r] = b), v[s] || (v[s] = m), v[a] || (v[a] = w), v = v[y];
        }
        v.values || (v.values = []), v.values.push(d[h]);
      }
      for (var C = 0; t.length > C; C++)
        !f[C].isAggCol && p >= C && f.splice(0, 0, new ng.Column({
          colDef: {
            field: '',
            width: 25,
            sortable: !1,
            resizable: !1,
            headerCellTemplate: '<div class="ngAggHeader"></div>',
            pinned: e.config.pinSelectionCheckbox
          },
          isAggCol: !0,
          headerRowHeight: e.config.headerRowHeight
        }, o, e, n, i, c));
      n.BuildStyles(o, e, !0), e.fixColumnIndexes(), o.adjustScrollLeft(0), u.parsedData.length = 0, u.parseGroupData(u.groupedData), u.fixRowCache();
    }, e.config.groups.length > 0 && e.filteredRows.length > 0 && u.getGrouping(e.config.groups);
  }, ng.SearchProvider = function (e, t, o) {
    var n = this, i = [];
    n.extFilter = t.config.filterOptions.useExternalFilter, e.showFilter = t.config.showFilter, e.filterText = '', n.fieldMap = {}, n.evalFilter = function () {
      var e = function (e) {
        for (var t = 0, s = i.length; s > t; t++) {
          var l, a = i[t];
          if (!a.column) {
            for (var c in e)
              if (e.hasOwnProperty(c)) {
                var u = n.fieldMap[c];
                if (!u)
                  continue;
                var d = null, p = null;
                u && u.cellFilter && (p = u.cellFilter.split(':'), d = o(p[0]));
                var f = e[c];
                if (null != f) {
                  if ('function' == typeof d) {
                    var h = '' + d('object' == typeof f ? r(f, u.field) : f, p[1]);
                    l = a.regex.test(h);
                  } else
                    l = a.regex.test('object' == typeof f ? '' + r(f, u.field) : '' + f);
                  if (f && l)
                    return !0;
                }
              }
            return !1;
          }
          var g = n.fieldMap[a.columnDisplay];
          if (!g)
            return !1;
          var v = g.cellFilter.split(':'), m = g.cellFilter ? o(v[0]) : null, b = e[a.column] || e[g.field.split('.')[0]];
          if (null == b)
            return !1;
          if ('function' == typeof m) {
            var w = '' + m('object' == typeof b ? r(b, g.field) : b, v[1]);
            l = a.regex.test(w);
          } else
            l = a.regex.test('object' == typeof b ? '' + r(b, g.field) : '' + b);
          if (!b || !l)
            return !1;
        }
        return !0;
      };
      t.filteredRows = 0 === i.length ? t.rowCache : t.rowCache.filter(function (t) {
        return e(t.entity);
      });
      for (var s = 0; t.filteredRows.length > s; s++)
        t.filteredRows[s].rowIndex = s;
      t.rowFactory.filteredRowsChanged();
    };
    var r = function (e, t) {
        if ('object' != typeof e || 'string' != typeof t)
          return e;
        var o = t.split('.'), n = e;
        if (o.length > 1) {
          for (var i = 1, r = o.length; r > i; i++)
            if (n = n[o[i]], !n)
              return e;
          return n;
        }
        return e;
      }, s = function (e, t) {
        try {
          return RegExp(e, t);
        } catch (o) {
          return RegExp(e.replace(/(\^|\$|\(|\)|\<|\>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, '\\$1'));
        }
      }, l = function (e) {
        i = [];
        var t;
        if (t = $.trim(e))
          for (var o = t.split(';'), n = 0; o.length > n; n++) {
            var r = o[n].split(':');
            if (r.length > 1) {
              var l = $.trim(r[0]), a = $.trim(r[1]);
              l && a && i.push({
                column: l,
                columnDisplay: l.replace(/\s+/g, '').toLowerCase(),
                regex: s(a, 'i')
              });
            } else {
              var c = $.trim(r[0]);
              c && i.push({
                column: '',
                regex: s(c, 'i')
              });
            }
          }
      };
    e.$watch(t.config.filterOptions.filterText, function (t) {
      e.filterText = t;
    }), e.$watch('filterText', function (t) {
      n.extFilter || (e.$emit('ngGridEventFilter', t), l(t), n.evalFilter());
    }), n.extFilter || e.$watch('columns', function (e) {
      for (var t = 0; e.length > t; t++) {
        var o = e[t];
        o.field && (n.fieldMap[o.field.split('.')[0]] = o), o.displayName && (n.fieldMap[o.displayName.toLowerCase().replace(/\s+/g, '')] = o);
      }
    });
  }, ng.selectionProvider = function (e, t) {
    var o = this;
    o.multi = e.config.multiSelect, o.selectedItems = e.config.selectedItems, o.selectedIndex = e.config.selectedIndex, o.lastClickedRow = void 0, o.ignoreSelectedItemChanges = !1, o.ChangeSelection = function (n, i) {
      var r = n.isClone ? e.filteredRows[n.rowIndex] : n;
      if (i && i.shiftKey && !i.keyCode && o.multi && e.config.enableRowSelection) {
        if (o.lastClickedRow) {
          var s;
          s = t.configGroups.length > 0 ? e.rowFactory.parsedData.filter(function (e) {
            return !e.isAggRow;
          }) : e.filteredRows;
          var l = r.rowIndex, a = o.lastClickedRow.rowIndex;
          if (o.lastClickedRow = r, l == a)
            return !1;
          a > l ? (l ^= a, a = l ^ a, l ^= a, l--) : a++;
          for (var c = []; l >= a; a++)
            c.push(s[a]);
          if (c[c.length - 1].beforeSelectionChange(c, i)) {
            for (var u = 0; c.length > u; u++) {
              var d = c[u], p = d.selected;
              d.selected = !p, d.clone && (d.clone.selected = d.selected);
              var f = o.selectedItems.indexOf(d.entity);
              -1 === f ? o.selectedItems.push(d.entity) : o.selectedItems.splice(f, 1);
            }
            c[c.length - 1].afterSelectionChange(c, i);
          }
          return !0;
        }
      } else
        o.multi ? i.keyCode || o.setSelection(r, !r.selected) : o.lastClickedRow == r ? o.setSelection(o.lastClickedRow, e.config.keepLastSelected ? !0 : !r.selected) : (o.lastClickedRow && o.setSelection(o.lastClickedRow, !1), o.setSelection(r, !r.selected));
      return o.lastClickedRow = r, !0;
    }, o.getSelection = function (e) {
      return -1 !== o.selectedItems.indexOf(e);
    }, o.setSelection = function (t, n) {
      var i = t.isClone ? e.filteredRows[t.rowIndex] : t;
      if (e.config.enableRowSelection) {
        if (i.selected = n, i.clone && (i.clone.selected = n), n)
          -1 === o.selectedItems.indexOf(i.entity) && (!o.multi && o.selectedItems.length > 0 && (o.toggleSelectAll(!1, !0), i.selected = n, i.clone && (i.clone.selected = n)), o.selectedItems.push(i.entity));
        else {
          var r = o.selectedItems.indexOf(i.entity);
          -1 != r && o.selectedItems.splice(r, 1);
        }
        i.afterSelectionChange(i);
      }
    }, o.toggleSelectAll = function (t, n) {
      if (n || e.config.beforeSelectionChange(e.filteredRows)) {
        var i = o.selectedItems.length;
        i > 0 && (o.selectedItems.length = 0);
        for (var r = 0; e.filteredRows.length > r; r++)
          e.filteredRows[r].selected = t, e.filteredRows[r].clone && (e.filteredRows[r].clone.selected = t), t && o.selectedItems.push(e.filteredRows[r].entity);
        n || e.config.afterSelectionChange(e.filteredRows);
      }
    };
  }, ng.StyleProvider = function (e, t, o) {
    e.headerCellStyle = function (e) {
      return { height: e.headerRowHeight + 'px' };
    }, e.rowStyle = function (t) {
      return {
        top: t.offsetTop + 'px',
        height: e.rowHeight + 'px'
      };
    }, e.canvasStyle = function () {
      return { height: '' + t.maxCanvasHt + 'px' };
    }, e.headerScrollerStyle = function () {
      return { height: t.config.headerRowHeight + 'px' };
    }, e.topPanelStyle = function () {
      return {
        width: t.rootDim.outerWidth + 'px',
        height: e.topPanelHeight() + 'px'
      };
    }, e.headerStyle = function () {
      return {
        width: t.rootDim.outerWidth - o.ScrollW + 'px',
        height: t.config.headerRowHeight + 'px'
      };
    }, e.groupPanelStyle = function () {
      return {
        width: t.rootDim.outerWidth - o.ScrollW + 'px',
        height: '32px'
      };
    }, e.viewportStyle = function () {
      return {
        width: t.rootDim.outerWidth + 'px',
        height: e.viewportDimHeight() + 'px'
      };
    }, e.footerStyle = function () {
      return {
        width: t.rootDim.outerWidth + 'px',
        height: e.footerRowHeight + 'px'
      };
    };
  }, g.directive('ngCellHasFocus', [
    '$domUtilityService',
    function (e) {
      var t = function (t, o) {
        t.isFocused = !0, e.digest(t);
        var n = angular.element(o[0].children).filter(function () {
            return 8 != this.nodeType;
          }), i = angular.element(n[0].children[0]);
        i.length > 0 && (angular.element(i).focus(), t.domAccessProvider.selectInputElement(i[0]), angular.element(i).bind('blur', function () {
          return t.isFocused = !1, e.digest(t), !0;
        }));
      };
      return function (e, o) {
        var n = !1;
        e.editCell = function () {
          setTimeout(function () {
            t(e, o);
          }, 0);
        }, o.bind('mousedown', function () {
          return o.focus(), !0;
        }), o.bind('focus', function () {
          return n = !0, !0;
        }), o.bind('blur', function () {
          return n = !1, !0;
        }), o.bind('keydown', function (i) {
          return n && 37 != i.keyCode && 38 != i.keyCode && 39 != i.keyCode && 40 != i.keyCode && 9 != i.keyCode && !i.shiftKey && 13 != i.keyCode && t(e, o), 27 == i.keyCode && o.focus(), !0;
        });
      };
    }
  ]), g.directive('ngCellText', function () {
    return function (e, t) {
      t.bind('mouseover', function (e) {
        e.preventDefault(), t.css({ cursor: 'text' });
      }), t.bind('mouseleave', function (e) {
        e.preventDefault(), t.css({ cursor: 'default' });
      });
    };
  }), g.directive('ngCell', [
    '$compile',
    '$domUtilityService',
    function (e, t) {
      var o = {
          scope: !1,
          compile: function () {
            return {
              pre: function (t, o) {
                var n, i = t.col.cellTemplate.replace(u, '$eval(\'row.entity.\' + col.field)');
                t.col.enableCellEdit ? (n = t.col.cellEditTemplate, n = n.replace(d, i), n = n.replace(p, t.col.editableCellTemplate.replace(u, 'col.field'))) : n = i;
                var r = e(n)(t);
                t.enableCellSelection && -1 == r[0].className.indexOf('ngSelectionCell') && (r[0].setAttribute('tabindex', 0), r.addClass('ngCellElement')), o.append(r);
              },
              post: function (e, o) {
                e.enableCellSelection && e.domAccessProvider.selectionHandlers(e, o), e.$on('ngGridEventDigestCell', function () {
                  t.digest(e);
                });
              }
            };
          }
        };
      return o;
    }
  ]), g.directive('ngGrid', [
    '$compile',
    '$filter',
    '$templateCache',
    '$sortService',
    '$domUtilityService',
    '$utilityService',
    '$timeout',
    function (e, t, o, n, i, r, s) {
      var l = {
          scope: !0,
          compile: function () {
            return {
              pre: function (l, a, c) {
                var u = $(a), d = l.$eval(c.ngGrid);
                d.gridDim = new ng.Dimension({
                  outerHeight: $(u).height(),
                  outerWidth: $(u).width()
                });
                var p = new ng.Grid(l, d, n, i, t, o, r, s);
                if ('string' == typeof d.columnDefs ? l.$parent.$watch(d.columnDefs, function (e) {
                    return e ? (l.columns = [], p.config.columnDefs = e, p.buildColumns(), p.configureColumnWidths(), p.eventProvider.assignEvents(), i.RebuildGrid(l, p), void 0) : (p.refreshDomSizes(), p.buildColumns(), void 0);
                  }) : p.buildColumns(), 'string' == typeof d.data) {
                  var f = function (e) {
                    p.data = $.extend([], e), p.rowFactory.fixRowCache(), angular.forEach(p.data, function (e, t) {
                      var o = p.rowMap[t] || t;
                      p.rowCache[o] && p.rowCache[o].ensureEntity(e), p.rowMap[o] = t;
                    }), p.searchProvider.evalFilter(), p.configureColumnWidths(), p.refreshDomSizes(), p.config.sortInfo.fields.length > 0 && n.sortData(p.config.sortInfo, p.data.slice(0)), l.$emit('ngGridEventData', p.gridId);
                  };
                  l.$parent.$watch(d.data, f), l.$parent.$watch(d.data + '.length', function () {
                    f(l.$eval(d.data));
                  });
                }
                return p.footerController = new ng.Footer(l, p), a.addClass('ngGrid').addClass('' + p.gridId), d.jqueryUITheme && a.addClass('ui-widget'), a.append(e(o.get('gridTemplate.html'))(l)), i.AssignGridContainers(l, a, p), p.eventProvider = new ng.EventProvider(p, l, i), angular.forEach(d.plugins, function (e) {
                  'function' == typeof e ? e.call(this, []).init(l.$new(), p, {
                    SortService: n,
                    DomUtilityService: i
                  }) : e.init(l.$new(), p, {
                    SortService: n,
                    DomUtilityService: i
                  });
                }), d.selectRow = function (e, t) {
                  p.rowCache[e] && p.rowCache[e].setSelection(t ? !0 : !1);
                }, d.selectItem = function (e, t) {
                  d.selectRow(p.rowMap[e], t);
                }, d.selectAll = function (e) {
                  l.toggleSelectAll(e);
                }, d.groupBy = function (e) {
                  if (e)
                    l.groupBy(l.columns.filter(function (t) {
                      return t.field == e;
                    })[0]);
                  else {
                    var t = $.extend(!0, [], l.configGroups);
                    angular.forEach(t, l.groupBy);
                  }
                }, d.sortBy = function (e) {
                  var t = l.columns.filter(function (t) {
                      return t.field == e;
                    })[0];
                  t && t.sort();
                }, d.gridId = p.gridId, d.ngGrid = p, d.$gridScope = l, l.$on('ngGridEventDigestGrid', function () {
                  i.digest(l.$parent);
                }), l.$on('ngGridEventDigestGridParent', function () {
                  i.digest(l.$parent);
                }), l.$evalAsync(function () {
                  l.adjustScrollLeft(0);
                }), null;
              }
            };
          }
        };
      return l;
    }
  ]), g.directive('ngHeaderCell', [
    '$compile',
    function (e) {
      var t = {
          scope: !1,
          compile: function () {
            return {
              pre: function (t, o) {
                o.append(e(t.col.headerCellTemplate)(t));
              }
            };
          }
        };
      return t;
    }
  ]), g.directive('ngHeaderRow', [
    '$compile',
    '$templateCache',
    function (e, t) {
      var o = {
          scope: !1,
          compile: function () {
            return {
              pre: function (o, n) {
                0 === n.children().length && n.append(e(t.get(o.gridId + 'headerRowTemplate.html'))(o));
              }
            };
          }
        };
      return o;
    }
  ]), g.directive('ngIf', [function () {
      return {
        transclude: 'element',
        priority: 1000,
        terminal: !0,
        restrict: 'A',
        compile: function (e, t, o) {
          return function (e, t, n) {
            var i, r;
            e.$watch(n.ngIf, function (n) {
              i && (i.remove(), i = void 0), r && (r.$destroy(), r = void 0), n && (r = e.$new(), o(r, function (e) {
                i = e, t.after(e);
              }));
            });
          };
        }
      };
    }]), g.directive('ngInput', [
    '$parse',
    function (e) {
      return function (t, o, n) {
        var i = e(t.$eval(n.ngInput)), r = i.assign, s = i(t.row.entity);
        o.val(s), o.bind('keyup', function () {
          var e = o.val();
          t.$root.$$phase || t.$apply(function () {
            r(t.row.entity, e);
          });
        }), o.bind('keydown', function (e) {
          switch (e.keyCode) {
          case 37:
          case 38:
          case 39:
          case 40:
            e.stopPropagation();
            break;
          case 27:
            t.$root.$$phase || t.$apply(function () {
              r(t.row.entity, s), o.val(s), o.blur();
            });
          default:
          }
          return !0;
        });
      };
    }
  ]), g.directive('ngRow', [
    '$compile',
    '$domUtilityService',
    '$templateCache',
    function (e, t, o) {
      var n = {
          scope: !1,
          compile: function () {
            return {
              pre: function (n, i) {
                if (n.row.elm = i, n.row.clone && (n.row.clone.elm = i), n.row.isAggRow) {
                  var r = o.get(n.gridId + 'aggregateTemplate.html');
                  r = n.row.aggLabelFilter ? r.replace(c, '| ' + n.row.aggLabelFilter) : r.replace(c, ''), i.append(e(r)(n));
                } else
                  i.append(e(o.get(n.gridId + 'rowTemplate.html'))(n));
                n.$on('ngGridEventDigestRow', function () {
                  t.digest(n);
                });
              }
            };
          }
        };
      return n;
    }
  ]), g.directive('ngViewport', [function () {
      return function (e, t) {
        var o, n, i = 0;
        t.bind('scroll', function (t) {
          var r = t.target.scrollLeft, s = t.target.scrollTop;
          return e.$headerContainer && e.$headerContainer.scrollLeft(r), e.adjustScrollLeft(r), e.adjustScrollTop(s), e.$root.$$phase || e.$digest(), n = r, i = i, o = !1, !0;
        }), t.bind('mousewheel DOMMouseScroll', function () {
          return o = !0, t.focus(), !0;
        }), e.enableCellSelection || e.domAccessProvider.selectionHandlers(e, t);
      };
    }]), e.ngGrid.i18n.en = {
    ngAggregateLabel: 'items',
    ngGroupPanelDescription: 'Drag a column header here and drop it to group by that column.',
    ngSearchPlaceHolder: 'Search...',
    ngMenuText: 'Choose Columns:',
    ngShowingItemsLabel: 'Showing Items:',
    ngTotalItemsLabel: 'Total Items:',
    ngSelectedItemsLabel: 'Selected Items:',
    ngPageSizeLabel: 'Page Size:',
    ngPagerFirstTitle: 'First Page',
    ngPagerNextTitle: 'Next Page',
    ngPagerPrevTitle: 'Previous Page',
    ngPagerLastTitle: 'Last Page'
  }, e.ngGrid.i18n.fr = {
    ngAggregateLabel: 'articles',
    ngGroupPanelDescription: 'Faites glisser un en-t\xeate de colonne ici et d\xe9posez-le vers un groupe par cette colonne.',
    ngSearchPlaceHolder: 'Recherche...',
    ngMenuText: 'Choisir des colonnes:',
    ngShowingItemsLabel: 'Articles Affichage des:',
    ngTotalItemsLabel: 'Nombre total d\'articles:',
    ngSelectedItemsLabel: '\xc9l\xe9ments Articles:',
    ngPageSizeLabel: 'Taille de page:',
    ngPagerFirstTitle: 'Premi\xe8re page',
    ngPagerNextTitle: 'Page Suivante',
    ngPagerPrevTitle: 'Page pr\xe9c\xe9dente',
    ngPagerLastTitle: 'Derni\xe8re page'
  }, e.ngGrid.i18n.ge = {
    ngAggregateLabel: 'artikel',
    ngGroupPanelDescription: 'Ziehen Sie eine Spalten\xfcberschrift hier und legen Sie es der Gruppe nach dieser Spalte.',
    ngSearchPlaceHolder: 'Suche...',
    ngMenuText: 'Spalten ausw\xe4hlen:',
    ngShowingItemsLabel: 'Zeige Artikel:',
    ngTotalItemsLabel: 'Meiste Artikel:',
    ngSelectedItemsLabel: 'Ausgew\xe4hlte Artikel:',
    ngPageSizeLabel: 'Gr\xf6\xdfe Seite:',
    ngPagerFirstTitle: 'Erste Page',
    ngPagerNextTitle: 'N\xe4chste Page',
    ngPagerPrevTitle: 'Vorherige Page',
    ngPagerLastTitle: 'Letzte Page'
  }, e.ngGrid.i18n.sp = {
    ngAggregateLabel: 'Art\xedculos',
    ngGroupPanelDescription: 'Arrastre un encabezado de columna aqu\xed y soltarlo para agrupar por esa columna.',
    ngSearchPlaceHolder: 'Buscar...',
    ngMenuText: 'Elegir columnas:',
    ngShowingItemsLabel: 'Art\xedculos Mostrando:',
    ngTotalItemsLabel: 'Art\xedculos Totales:',
    ngSelectedItemsLabel: 'Art\xedculos Seleccionados:',
    ngPageSizeLabel: 'Tama\xf1o de P\xe1gina:',
    ngPagerFirstTitle: 'Primera P\xe1gina',
    ngPagerNextTitle: 'P\xe1gina Siguiente',
    ngPagerPrevTitle: 'P\xe1gina Anterior',
    ngPagerLastTitle: '\xdaltima P\xe1gina'
  }, e.ngGrid.i18n['zh-cn'] = {
    ngAggregateLabel: '\u6761\u76ee',
    ngGroupPanelDescription: '\u62d6\u66f3\u8868\u5934\u5230\u6b64\u5904\u4ee5\u8fdb\u884c\u5206\u7ec4',
    ngSearchPlaceHolder: '\u641c\u7d22...',
    ngMenuText: '\u6570\u636e\u5206\u7ec4\u4e0e\u9009\u62e9\u5217\uff1a',
    ngShowingItemsLabel: '\u5f53\u524d\u663e\u793a\u6761\u76ee\uff1a',
    ngTotalItemsLabel: '\u6761\u76ee\u603b\u6570\uff1a',
    ngSelectedItemsLabel: '\u9009\u4e2d\u6761\u76ee\uff1a',
    ngPageSizeLabel: '\u6bcf\u9875\u663e\u793a\u6570\uff1a',
    ngPagerFirstTitle: '\u56de\u5230\u9996\u9875',
    ngPagerNextTitle: '\u4e0b\u4e00\u9875',
    ngPagerPrevTitle: '\u4e0a\u4e00\u9875',
    ngPagerLastTitle: '\u524d\u5f80\u5c3e\u9875'
  }, angular.module('ngGrid').run([
    '$templateCache',
    function (e) {
      e.put('aggregateTemplate.html', '<div ng-click="row.toggleExpand()" ng-style="{\'left\': row.offsetleft}" class="ngAggregate">    <span class="ngAggregateText">{{row.label CUSTOM_FILTERS}} ({{row.totalChildren()}} {{AggItemsLabel}})</span>    <div class="{{row.aggClass()}}"></div></div>'), e.put('cellEditTemplate.html', '<div ng-cell-has-focus ng-dblclick="editCell()">\t<div ng-if="!isFocused">\tDISPLAY_CELL_TEMPLATE\t</div>\t<div ng-if="isFocused">\tEDITABLE_CELL_TEMPLATE\t</div></div>'), e.put('cellTemplate.html', '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD CUSTOM_FILTERS}}</span></div>'), e.put('checkboxCellTemplate.html', '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'), e.put('checkboxHeaderTemplate.html', '<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>'), e.put('editableCellTemplate.html', '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />'), e.put('gridTemplate.html', '<div class="ngTopPanel" ng-class="{\'ui-widget-header\':jqueryUITheme, \'ui-corner-top\': jqueryUITheme}" ng-style="topPanelStyle()">    <div class="ngGroupPanel" ng-show="showGroupPanel()" ng-style="groupPanelStyle()">        <div class="ngGroupPanelDescription" ng-show="configGroups.length == 0">{{i18n.ngGroupPanelDescription}}</div>        <ul ng-show="configGroups.length > 0" class="ngGroupList">            <li class="ngGroupItem" ng-repeat="group in configGroups">                <span class="ngGroupElement">                    <span class="ngGroupName">{{group.displayName}}                        <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span>                    </span>                    <span ng-hide="$last" class="ngGroupArrow"></span>                </span>            </li>        </ul>    </div>    <div class="ngHeaderContainer" ng-style="headerStyle()">        <div class="ngHeaderScroller" ng-style="headerScrollerStyle()" ng-header-row></div>    </div>    <div class="ngHeaderButton" ng-show="showColumnMenu || showFilter" ng-click="toggleShowMenu()">        <div class="ngHeaderButtonArrow" ng-click=""></div>    </div>    <div ng-show="showMenu" class="ngColMenu">        <div ng-show="showFilter">            <input placeholder="{{i18n.ngSearchPlaceHolder}}" type="text" ng-model="filterText"/>        </div>        <div ng-show="showColumnMenu">            <span class="ngMenuText">{{i18n.ngMenuText}}</span>            <ul class="ngColList">                <li class="ngColListItem" ng-repeat="col in columns | ngColumns">                    <label><input ng-disabled="col.pinned" type="checkbox" class="ngColListCheckbox" ng-model="col.visible"/>{{col.displayName}}</label>\t\t\t\t\t<a title="Group By" ng-class="col.groupedByClass()" ng-show="col.groupable && col.visible" ng-click="groupBy(col)"></a>\t\t\t\t\t<span class="ngGroupingNumber" ng-show="col.groupIndex > 0">{{col.groupIndex}}</span>                          </li>            </ul>        </div>    </div></div><div class="ngViewport" unselectable="on" ng-viewport ng-class="{\'ui-widget-content\': jqueryUITheme}" ng-style="viewportStyle()">    <div class="ngCanvas" ng-style="canvasStyle()">        <div ng-style="rowStyle(row)" ng-repeat="row in renderedRows" ng-click="row.toggleSelected($event)" class="ngRow" ng-class="row.alternatingRowClass()" ng-row></div>    </div></div><div class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()">    <div class="ngTotalSelectContainer" ng-show="showFooter">        <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}" >            <span class="ngLabel">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show="filterText.length > 0" class="ngLabel">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>        </div>        <div class="ngFooterSelectedItems" ng-show="multiSelect">            <span class="ngLabel">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>        </div>    </div>    <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="showFooter && enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}">        <div style="float:left; margin-right: 10px;" class="ngRowCountPicker">            <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span>            <select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize" >                <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>            </select>        </div>        <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl" style="float: left; min-width: 135px;">            <button class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"><div class="ngPagerFirstTriangle"><div class="ngPagerFirstBar"></div></div></button>            <button class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerPrevTitle}}"><div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div></button>            <input class="ngPagerCurrent" type="number" style="width:50px; height: 24px; margin-top: 1px; padding: 0px 4px;" ng-model="pagingOptions.currentPage"/>            <button class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()" title="{{i18n.ngPagerNextTitle}}"><div class="ngPagerLastTriangle ngPagerNextTriangle"></div></button>            <button class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"><div class="ngPagerLastTriangle"><div class="ngPagerLastBar"></div></div></button>        </div>    </div></div>'), e.put('headerCellTemplate.html', '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'), e.put('headerRowTemplate.html', '<div ng-style="{\'z-index\': col.zIndex(), height: col.headerRowHeight}" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngHeaderCell" ng-header-cell></div>'), e.put('rowTemplate.html', '<div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>');
    }
  ]);
}(window));