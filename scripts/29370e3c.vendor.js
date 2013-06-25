function AngularFire(e, t, n) {
  this._q = e, this._parse = t, this._initial = !0, this._remoteValue = !1, this._fRef = 'string' == typeof n ? new Firebase(n) : n;
}
var Opentip, firstAdapter, i, mouseMoved, mousePosition, mousePositionObservers, position, vendors, _i, _len, _ref, __slice = [].slice, __indexOf = [].indexOf || function (e) {
    for (var t = 0, n = this.length; n > t; t++)
      if (t in this && this[t] === e)
        return t;
    return -1;
  }, __hasProp = {}.hasOwnProperty;
for (Opentip = function () {
    function e(t, n, o, i) {
      var r, s, a, l, c, u, d, h, p, g, f, m, v, y, b = this;
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
        }, i = this.adapter.clone(i), 'object' == typeof n ? (i = n, n = o = void 0) : 'object' == typeof o && (i = o, o = void 0), null != o && (i.title = o), null != n && this.setContent(n), null == i['extends'] && (i['extends'] = null != i.style ? i.style : e.defaultStyle), l = [i], y = i; y['extends'];) {
        if (u = y['extends'], y = e.styles[u], null == y)
          throw Error('Invalid style: ' + u);
        l.unshift(y), null == y['extends'] && 'standard' !== u && (y['extends'] = 'standard');
      }
      for (i = (f = this.adapter).extend.apply(f, [{}].concat(__slice.call(l))), i.hideTriggers = function () {
          var e, t, n, o;
          for (n = i.hideTriggers, o = [], e = 0, t = n.length; t > e; e++)
            s = n[e], o.push(s);
          return o;
        }(), i.hideTrigger && 0 === i.hideTriggers.length && i.hideTriggers.push(i.hideTrigger), m = [
          'tipJoint',
          'targetJoint',
          'stem'
        ], d = 0, p = m.length; p > d; d++)
        c = m[d], i[c] && 'string' == typeof i[c] && (i[c] = new e.Joint(i[c]));
      for (!i.ajax || i.ajax !== !0 && i.ajax || (i.ajax = 'A' === this.adapter.tagName(this.triggerElement) ? this.adapter.attr(this.triggerElement, 'href') : !1), 'click' === i.showOn && 'A' === this.adapter.tagName(this.triggerElement) && this.adapter.observe(this.triggerElement, 'click', function (e) {
          return e.preventDefault(), e.stopPropagation(), e.stopped = !0;
        }), i.target && (i.fixed = !0), i.stem === !0 && (i.stem = new e.Joint(i.tipJoint)), i.target === !0 ? i.target = this.triggerElement : i.target && (i.target = this.adapter.wrap(i.target)), this.currentStem = i.stem, null == i.delay && (i.delay = 'mouseover' === i.showOn ? 0.2 : 0), null == i.targetJoint && (i.targetJoint = new e.Joint(i.tipJoint).flip()), this.showTriggers = [], this.showTriggersWhenVisible = [], this.hideTriggers = [], i.showOn && 'creation' !== i.showOn && this.showTriggers.push({
          element: this.triggerElement,
          event: i.showOn
        }), null != i.ajaxCache && (i.cache = i.ajaxCache, delete i.ajaxCache), this.options = i, this.bound = {}, v = [
          'prepareToShow',
          'prepareToHide',
          'show',
          'hide',
          'reposition'
        ], h = 0, g = v.length; g > h; h++)
        a = v[h], this.bound[a] = function (e) {
          return function () {
            return b[e].apply(b, arguments);
          };
        }(a);
      this.adapter.domReady(function () {
        return b.activate(), 'creation' === b.options.showOn ? b.prepareToShow() : void 0;
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
      var e, t, n, o, i, r, s, a, l, c, u;
      for (this.debug('Setting up the tooltip.'), this._buildContainer(), this.hideTriggers = [], l = this.options.hideTriggers, o = i = 0, s = l.length; s > i; o = ++i) {
        if (t = l[o], n = null, e = this.options.hideOn instanceof Array ? this.options.hideOn[o] : this.options.hideOn, 'string' == typeof t)
          switch (t) {
          case 'trigger':
            e = e || 'mouseout', n = this.triggerElement;
            break;
          case 'tip':
            e = e || 'mouseover', n = this.container;
            break;
          case 'target':
            e = e || 'mouseover', n = this.options.target;
            break;
          case 'closeButton':
            break;
          default:
            throw Error('Unknown hide trigger: ' + t + '.');
          }
        else
          e = e || 'mouseover', n = this.adapter.wrap(t);
        n && this.hideTriggers.push({
          element: n,
          event: e,
          original: t
        });
      }
      for (c = this.hideTriggers, u = [], r = 0, a = c.length; a > r; r++)
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
      var e, t, n, o, i, r, s, a, l, c, u, d, h, p, g, f, m = this;
      for (o = arguments.length >= 1 ? __slice.call(arguments, 0) : [], r = 0, c = o.length; c > r; r++)
        if (n = o[r], t = !1, '-' === n.charAt(0) && (t = !0, n = n.substr(1)), this.currentObservers[n] !== !t)
          switch (this.currentObservers[n] = !t, e = function () {
              var e, n, o;
              return e = arguments.length >= 1 ? __slice.call(arguments, 0) : [], t ? (n = m.adapter).stopObserving.apply(n, e) : (o = m.adapter).observe.apply(o, e);
            }, n) {
          case 'showing':
            for (p = this.hideTriggers, s = 0, u = p.length; u > s; s++)
              i = p[s], e(i.element, i.event, this.bound.prepareToHide);
            e(null != document.onresize ? document : window, 'resize', this.bound.reposition), e(window, 'scroll', this.bound.reposition);
            break;
          case 'visible':
            for (g = this.showTriggersWhenVisible, a = 0, d = g.length; d > a; a++)
              i = g[a], e(i.element, i.event, this.bound.prepareToShow);
            break;
          case 'hiding':
            for (f = this.showTriggers, l = 0, h = f.length; h > l; l++)
              i = f[l], e(i.element, i.event, this.bound.prepareToShow);
            break;
          case 'hidden':
            break;
          default:
            throw Error('Unknown state: ' + n);
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
      var e, t, n, o = this;
      return e = this.getPosition(), null == e || (t = this.options.stem, this.options.containInViewport && (n = this._ensureViewportContainment(e), e = n.position, t = n.stem), this._positionsEqual(e, this.currentPosition)) ? void 0 : (this.options.stem && !t.eql(this.currentStem) && (this.redraw = !0), this.currentPosition = e, this.currentStem = t, this._draw(), this.adapter.css(this.container, {
        left: '' + e.left + 'px',
        top: '' + e.top + 'px'
      }), this.defer(function () {
        var e, t;
        return e = o.adapter.unwrap(o.container), e.style.visibility = 'hidden', t = e.offsetHeight, e.style.visibility = 'visible';
      }));
    }, e.prototype.getPosition = function (e, t, n) {
      var o, i, r, s, a, l, c, u, d;
      return this.container ? (null == e && (e = this.options.tipJoint), null == t && (t = this.options.targetJoint), s = {}, this.options.target ? (c = this.adapter.offset(this.options.target), l = this.adapter.dimensions(this.options.target), s = c, t.right ? (u = this.adapter.unwrap(this.options.target), null != u.getBoundingClientRect ? s.left = u.getBoundingClientRect().right + (null != (d = window.pageXOffset) ? d : document.body.scrollLeft) : s.left += l.width) : t.center && (s.left += Math.round(l.width / 2)), t.bottom ? s.top += l.height : t.middle && (s.top += Math.round(l.height / 2)), this.options.borderWidth && (this.options.tipJoint.left && (s.left += this.options.borderWidth), this.options.tipJoint.right && (s.left -= this.options.borderWidth), this.options.tipJoint.top ? s.top += this.options.borderWidth : this.options.tipJoint.bottom && (s.top -= this.options.borderWidth))) : s = this.initialMousePosition ? {
        top: this.initialMousePosition.y,
        left: this.initialMousePosition.x
      } : {
        top: mousePosition.y,
        left: mousePosition.x
      }, this.options.autoOffset && (a = this.options.stem ? this.options.stemLength : 0, r = a && this.options.fixed ? 2 : 10, o = e.middle && !this.options.fixed ? 15 : 0, i = e.center && !this.options.fixed ? 15 : 0, e.right ? s.left -= r + o : e.left && (s.left += r + o), e.bottom ? s.top -= r + i : e.top && (s.top += r + i), a && (null == n && (n = this.options.stem), n.right ? s.left -= a : n.left && (s.left += a), n.bottom ? s.top -= a : n.top && (s.top += a))), s.left += this.options.offset[0], s.top += this.options.offset[1], e.right ? s.left -= this.dimensions.width : e.center && (s.left -= Math.round(this.dimensions.width / 2)), e.bottom ? s.top -= this.dimensions.height : e.middle && (s.top -= Math.round(this.dimensions.height / 2)), s) : void 0;
    }, e.prototype._ensureViewportContainment = function (t) {
      var n, o, i, r, s, a, l, c, u, d, h, p;
      if (l = this.options.stem, i = {
          position: t,
          stem: l
        }, !this.visible || !t)
        return i;
      if (c = this._sticksOut(t), !c[0] && !c[1])
        return i;
      if (d = new e.Joint(this.options.tipJoint), this.options.targetJoint && (u = new e.Joint(this.options.targetJoint)), a = this.adapter.scrollOffset(), h = this.adapter.viewportDimensions(), p = [
          t.left - a[0],
          t.top - a[1]
        ], n = !1, h.width >= this.dimensions.width && c[0])
        switch (n = !0, c[0]) {
        case this.STICKS_OUT_LEFT:
          d.setHorizontal('left'), this.options.targetJoint && u.setHorizontal('right');
          break;
        case this.STICKS_OUT_RIGHT:
          d.setHorizontal('right'), this.options.targetJoint && u.setHorizontal('left');
        }
      if (h.height >= this.dimensions.height && c[1])
        switch (n = !0, c[1]) {
        case this.STICKS_OUT_TOP:
          d.setVertical('top'), this.options.targetJoint && u.setVertical('bottom');
          break;
        case this.STICKS_OUT_BOTTOM:
          d.setVertical('bottom'), this.options.targetJoint && u.setVertical('top');
        }
      return n ? (this.options.stem && (l = d), t = this.getPosition(d, u, l), o = this._sticksOut(t), r = !1, s = !1, o[0] && o[0] !== c[0] && (r = !0, d.setHorizontal(this.options.tipJoint.horizontal), this.options.targetJoint && u.setHorizontal(this.options.targetJoint.horizontal)), o[1] && o[1] !== c[1] && (s = !0, d.setVertical(this.options.tipJoint.vertical), this.options.targetJoint && u.setVertical(this.options.targetJoint.vertical)), r && s ? i : ((r || s) && (this.options.stem && (l = d), t = this.getPosition(d, u, l)), {
        position: t,
        stem: l
      })) : i;
    }, e.prototype._sticksOut = function (e) {
      var t, n, o, i;
      return n = this.adapter.scrollOffset(), i = this.adapter.viewportDimensions(), t = [
        e.left - n[0],
        e.top - n[1]
      ], o = [
        !1,
        !1
      ], 0 > t[0] ? o[0] = this.STICKS_OUT_LEFT : t[0] + this.dimensions.width > i.width && (o[0] = this.STICKS_OUT_RIGHT), 0 > t[1] ? o[1] = this.STICKS_OUT_TOP : t[1] + this.dimensions.height > i.height && (o[1] = this.STICKS_OUT_BOTTOM), o;
    }, e.prototype._draw = function () {
      var t, n, o, i, r, s, a, l, c, u, d, h, p, g, f, m, v, y, b, w = this;
      if (this.backgroundCanvas && this.redraw) {
        if (this.debug('Drawing background.'), this.redraw = !1, this.currentStem) {
          for (v = [
              'top',
              'right',
              'bottom',
              'left'
            ], f = 0, m = v.length; m > f; f++)
            h = v[f], this.adapter.removeClass(this.container, 'stem-' + h);
          this.adapter.addClass(this.container, 'stem-' + this.currentStem.horizontal), this.adapter.addClass(this.container, 'stem-' + this.currentStem.vertical);
        }
        return s = [
          0,
          0
        ], a = [
          0,
          0
        ], __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (r = new e.Joint('top right' === (null != (y = this.currentStem) ? y + '' : void 0) ? 'top left' : 'top right'), s = [
          this.options.closeButtonRadius + this.options.closeButtonOffset[0],
          this.options.closeButtonRadius + this.options.closeButtonOffset[1]
        ], a = [
          this.options.closeButtonRadius - this.options.closeButtonOffset[0],
          this.options.closeButtonRadius - this.options.closeButtonOffset[1]
        ]), o = this.adapter.clone(this.dimensions), i = [
          0,
          0
        ], this.options.borderWidth && (o.width += 2 * this.options.borderWidth, o.height += 2 * this.options.borderWidth, i[0] -= this.options.borderWidth, i[1] -= this.options.borderWidth), this.options.shadow && (o.width += 2 * this.options.shadowBlur, o.width += Math.max(0, this.options.shadowOffset[0] - 2 * this.options.shadowBlur), o.height += 2 * this.options.shadowBlur, o.height += Math.max(0, this.options.shadowOffset[1] - 2 * this.options.shadowBlur), i[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]), i[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])), n = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, this.currentStem && (this.currentStem.left ? n.left = this.options.stemLength : this.currentStem.right && (n.right = this.options.stemLength), this.currentStem.top ? n.top = this.options.stemLength : this.currentStem.bottom && (n.bottom = this.options.stemLength)), r && (r.left ? n.left = Math.max(n.left, a[0]) : r.right && (n.right = Math.max(n.right, a[0])), r.top ? n.top = Math.max(n.top, a[1]) : r.bottom && (n.bottom = Math.max(n.bottom, a[1]))), o.width += n.left + n.right, o.height += n.top + n.bottom, i[0] -= n.left, i[1] -= n.top, this.currentStem && this.options.borderWidth && (b = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), g = b.stemLength, p = b.stemBase), t = this.adapter.unwrap(this.backgroundCanvas), t.width = o.width, t.height = o.height, this.adapter.css(this.backgroundCanvas, {
          width: '' + t.width + 'px',
          height: '' + t.height + 'px',
          left: '' + i[0] + 'px',
          top: '' + i[1] + 'px'
        }), l = t.getContext('2d'), l.setTransform(1, 0, 0, 1, 0, 0), l.clearRect(0, 0, t.width, t.height), l.beginPath(), l.fillStyle = this._getColor(l, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal), l.lineJoin = 'miter', l.miterLimit = 500, d = this.options.borderWidth / 2, this.options.borderWidth ? (l.strokeStyle = this.options.borderColor, l.lineWidth = this.options.borderWidth) : (g = this.options.stemLength, p = this.options.stemBase), null == p && (p = 0), u = function (e, t, n) {
          return n && l.moveTo(Math.max(p, w.options.borderRadius, s[0]) + 1 - d, -d), t ? (l.lineTo(e / 2 - p / 2, -d), l.lineTo(e / 2, -g - d), l.lineTo(e / 2 + p / 2, -d)) : void 0;
        }, c = function (e, t, n) {
          var o, i, r, a;
          return e ? (l.lineTo(-p + d, 0 - d), l.lineTo(g + d, -g - d), l.lineTo(d, p - d)) : t ? (a = w.options.closeButtonOffset, r = s[0], 0 !== n % 2 && (a = [
            a[1],
            a[0]
          ], r = s[1]), o = Math.acos(a[1] / w.options.closeButtonRadius), i = Math.acos(a[0] / w.options.closeButtonRadius), l.lineTo(-r + d, -d), l.arc(d - a[0], -d + a[1], w.options.closeButtonRadius, -(Math.PI / 2 + o), i, !1)) : (l.lineTo(-w.options.borderRadius + d, -d), l.quadraticCurveTo(d, -d, d, w.options.borderRadius - d));
        }, l.translate(-i[0], -i[1]), l.save(), function () {
          var t, n, o, i, s, a, d, h, p, g, f;
          for (f = [], n = p = 0, g = e.positions.length / 2; g >= 0 ? g > p : p > g; n = g >= 0 ? ++p : --p)
            s = 2 * n, a = 0 === n || 3 === n ? 0 : w.dimensions.width, d = 2 > n ? 0 : w.dimensions.height, h = Math.PI / 2 * n, o = 0 === n % 2 ? w.dimensions.width : w.dimensions.height, i = new e.Joint(e.positions[s]), t = new e.Joint(e.positions[s + 1]), l.save(), l.translate(a, d), l.rotate(h), u(o, i.eql(w.currentStem), 0 === n), l.translate(o, 0), c(t.eql(w.currentStem), t.eql(r), n), f.push(l.restore());
          return f;
        }(), l.closePath(), l.save(), this.options.shadow && (l.shadowColor = this.options.shadowColor, l.shadowBlur = this.options.shadowBlur, l.shadowOffsetX = this.options.shadowOffset[0], l.shadowOffsetY = this.options.shadowOffset[1]), l.fill(), l.restore(), this.options.borderWidth && l.stroke(), l.restore(), r ? function () {
          var e, t, n, o, i;
          return n = t = 2 * w.options.closeButtonRadius, 'top right' == r + '' ? (i = [
            w.dimensions.width - w.options.closeButtonOffset[0],
            w.options.closeButtonOffset[1]
          ], e = [
            i[0] + d,
            i[1] - d
          ]) : (i = [
            w.options.closeButtonOffset[0],
            w.options.closeButtonOffset[1]
          ], e = [
            i[0] - d,
            i[1] - d
          ]), l.translate(e[0], e[1]), o = w.options.closeButtonCrossSize / 2, l.save(), l.beginPath(), l.strokeStyle = w.options.closeButtonCrossColor, l.lineWidth = w.options.closeButtonCrossLineWidth, l.lineCap = 'round', l.moveTo(-o, -o), l.lineTo(o, o), l.stroke(), l.beginPath(), l.moveTo(o, -o), l.lineTo(-o, o), l.stroke(), l.restore(), w.adapter.css(w.closeButtonElement, {
            left: '' + (i[0] - o - w.options.closeButtonLinkOverscan) + 'px',
            top: '' + (i[1] - o - w.options.closeButtonLinkOverscan) + 'px',
            width: '' + (w.options.closeButtonCrossSize + 2 * w.options.closeButtonLinkOverscan) + 'px',
            height: '' + (w.options.closeButtonCrossSize + 2 * w.options.closeButtonLinkOverscan) + 'px'
          });
        }() : void 0;
      }
    }, e.prototype._getPathStemMeasures = function (e, t, n) {
      var o, i, r, s, a, l, c;
      if (s = n / 2, r = Math.atan(e / 2 / t), o = 2 * r, a = s / Math.sin(o), i = 2 * a * Math.cos(r), c = s + t - i, 0 > c)
        throw Error('Sorry but your stemLength / stemBase ratio is strange.');
      return l = 2 * Math.tan(r) * c, {
        stemLength: c,
        stemBase: l
      };
    }, e.prototype._getColor = function (e, t, n, o) {
      var i, r, s, a, l;
      if (null == o && (o = !1), 'string' == typeof n)
        return n;
      for (r = o ? e.createLinearGradient(0, 0, t.width, 0) : e.createLinearGradient(0, 0, 0, t.height), s = a = 0, l = n.length; l > a; s = ++a)
        i = n[s], r.addColorStop(i[0], i[1]);
      return r;
    }, e.prototype._searchAndActivateCloseButtons = function () {
      var e, t, n, o;
      for (o = this.adapter.findAll(this.container, '.' + this['class'].close), t = 0, n = o.length; n > t; t++)
        e = o[t], this.hideTriggers.push({
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
          var n;
          return n = e.options.ajaxErrorMessage, e.debug(n, t), e.setContent(n), e.adapter.addClass(e.container, e['class'].ajaxError);
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
    var n, o, i, r, s;
    e = this.adapter.unwrap(e), s = [];
    for (n in t)
      __hasProp.call(t, n) && (o = t[n], null != e.style[n] ? s.push(e.style[n] = o) : s.push(function () {
        var t, s, a;
        for (a = [], t = 0, s = vendors.length; s > t; t++)
          i = vendors[t], r = '' + this.ucfirst(i) + this.ucfirst(n), null != e.style[r] ? a.push(e.style[r] = o) : a.push(void 0);
        return a;
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
    var t, n, o, i;
    for (mousePosition = Opentip.adapter.mousePosition(e), i = [], n = 0, o = mousePositionObservers.length; o > n; n++)
      t = mousePositionObservers[n], i.push(t());
    return i;
  }, Opentip.followMousePosition = function () {
    return Opentip.adapter.observe(document.body, 'mousemove', mouseMoved);
  }, Opentip._observeMousePosition = function (e) {
    return mousePositionObservers.push(e);
  }, Opentip._stopObservingMousePosition = function (e) {
    var t;
    return mousePositionObservers = function () {
      var n, o, i;
      for (i = [], n = 0, o = mousePositionObservers.length; o > n; n++)
        t = mousePositionObservers[n], t !== e && i.push(t);
      return i;
    }();
  }, Opentip.Joint = function () {
    function e(e) {
      null != e && (e instanceof Opentip.Joint && (e += ''), this.set(e));
    }
    return e.prototype.set = function (e) {
      return e = e.toLowerCase(), this.setHorizontal(e), this.setVertical(e), this;
    }, e.prototype.setHorizontal = function (e) {
      var t, n, o, i, r, s, a;
      for (n = [
          'left',
          'center',
          'right'
        ], o = 0, r = n.length; r > o; o++)
        t = n[o], ~e.indexOf(t) && (this.horizontal = t.toLowerCase());
      for (null == this.horizontal && (this.horizontal = 'center'), a = [], i = 0, s = n.length; s > i; i++)
        t = n[i], a.push(this[t] = this.horizontal === t ? t : void 0);
      return a;
    }, e.prototype.setVertical = function (e) {
      var t, n, o, i, r, s, a;
      for (n = [
          'top',
          'middle',
          'bottom'
        ], o = 0, r = n.length; r > o; o++)
        t = n[o], ~e.indexOf(t) && (this.vertical = t.toLowerCase());
      for (null == this.vertical && (this.vertical = 'middle'), a = [], i = 0, s = n.length; s > i; i++)
        t = n[i], a.push(this[t] = this.vertical === t ? t : void 0);
      return a;
    }, e.prototype.eql = function (e) {
      return null != e && this.horizontal === e.horizontal && this.vertical === e.vertical;
    }, e.prototype.flip = function () {
      var e, t;
      return t = Opentip.position[this.toString(!0)], e = (t + 4) % 8, this.set(Opentip.positions[e]), this;
    }, e.prototype.toString = function (e) {
      var t, n;
      return null == e && (e = !1), n = 'middle' === this.vertical ? '' : this.vertical, t = 'center' === this.horizontal ? '' : this.horizontal, n && t && (t = e ? Opentip.prototype.ucfirst(t) : ' ' + t), '' + n + t;
    }, e;
  }(), Opentip.prototype._positionsEqual = function (e, t) {
    return null != e && null != t && e.left === t.left && e.top === t.top;
  }, Opentip.prototype._dimensionsEqual = function (e, t) {
    return null != e && null != t && e.width === t.width && e.height === t.height;
  }, Opentip.prototype.debug = function () {
    var e;
    return e = arguments.length >= 1 ? __slice.call(arguments, 0) : [], Opentip.debug && null != ('undefined' != typeof console && null !== console ? console.debug : void 0) ? (e.unshift('#' + this.id + ' |'), console.debug.apply(console, e)) : void 0;
  }, Opentip.findElements = function () {
    var e, t, n, o, i, r, s, a, l, c;
    for (e = Opentip.adapter, l = e.findAll(document.body, '[data-ot]'), c = [], s = 0, a = l.length; a > s; s++) {
      n = l[s], r = {}, t = e.data(n, 'ot'), ('' === t || 'true' === t || 'yes' === t) && (t = e.attr(n, 'title'), e.attr(n, 'title', '')), t = t || '';
      for (o in Opentip.styles.standard)
        i = e.data(n, 'ot' + Opentip.prototype.ucfirst(o)), null != i && ('yes' === i || 'true' === i || 'on' === i ? i = !0 : ('no' === i || 'false' === i || 'off' === i) && (i = !1), r[o] = i);
      c.push(new Opentip(n, t, r));
    }
    return c;
  }, Opentip.version = '2.4.6', Opentip.debug = !1, Opentip.lastId = 0, Opentip.lastZIndex = 100, Opentip.tips = [], Opentip._abortShowingGroup = function (e, t) {
    var n, o, i, r, s;
    for (r = Opentip.tips, s = [], o = 0, i = r.length; i > o; o++)
      n = r[o], n !== t && n.options.group === e ? s.push(n._abortShowing()) : s.push(void 0);
    return s;
  }, Opentip._hideGroup = function (e, t) {
    var n, o, i, r, s;
    for (r = Opentip.tips, s = [], o = 0, i = r.length; i > o; o++)
      n = r[o], n !== t && n.options.group === e ? s.push(n.hide()) : s.push(void 0);
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
  return e.fn.opentip = function (e, t, n) {
    return new Opentip(this, e, t, n);
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
      var t, n, o;
      return n = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (o = e(n)).attr.apply(o, t);
    }, t.prototype.data = function () {
      var t, n, o;
      return n = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (o = e(n)).data.apply(o, t);
    }, t.prototype.find = function (t, n) {
      return e(t).find(n).get(0);
    }, t.prototype.findAll = function (t, n) {
      return e(t).find(n);
    }, t.prototype.update = function (t, n, o) {
      return t = e(t), o ? t.text(n) : t.html(n);
    }, t.prototype.append = function (t, n) {
      return e(t).append(n);
    }, t.prototype.remove = function (t) {
      return e(t).remove();
    }, t.prototype.addClass = function (t, n) {
      return e(t).addClass(n);
    }, t.prototype.removeClass = function (t, n) {
      return e(t).removeClass(n);
    }, t.prototype.css = function (t, n) {
      return e(t).css(n);
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
      var n;
      return n = e(t).offset(), {
        left: n.left,
        top: n.top
      };
    }, t.prototype.observe = function (t, n, o) {
      return e(t).bind(n, o);
    }, t.prototype.stopObserving = function (t, n, o) {
      return e(t).unbind(n, o);
    }, t.prototype.ajax = function (t) {
      var n, o;
      if (null == t.url)
        throw Error('No url provided');
      return e.ajax({
        url: t.url,
        type: null != (n = null != (o = t.method) ? o.toUpperCase() : void 0) ? n : 'GET'
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
      var t, n;
      return n = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], e.extend.apply(e, [n].concat(__slice.call(t)));
    }, t;
  }(), Opentip.addAdapter(new t());
}(jQuery));
var FirebaseIndex;
(function (e) {
  'use strict';
  function t(e, t) {
    this.indexRef = e, this.dataRef = t, this._initMemberVars();
  }
  function n(e, t, n, o) {
    e.forEach(function (e) {
      h(function () {
        e.fn(u(t, n), o);
      });
    });
  }
  function o(e, t, n) {
    var o = n ? t.bind(n) : t;
    return e.push({
      fn: o,
      cb: t,
      ctx: n
    }), o;
  }
  function i(e, t, n) {
    var o;
    for (o in t)
      t.hasOwnProperty(o) && t[o].loaded && r(e(o), o, n);
  }
  function r(e, t, n) {
    e.once('value', function (e) {
      null !== e.val() && h(function () {
        n(u(e, t));
      });
    });
  }
  function s(t, n, o, i) {
    var r = o.name(), s = o.ref();
    return t[r] = {
      prevId: i,
      loaded: !1,
      def: e ? e.Deferred() : null,
      ref: o.ref(),
      dispose: function () {
        s.off('value', n), delete t[r];
      }
    }, s;
  }
  function a(e, t, n) {
    var o = e[t];
    t && o && !o.loaded ? o.def ? o.def.done(n) : setTimeout(function () {
      a(e, t, n);
    }, 10) : n();
  }
  function l(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    t.forEach(function (t) {
      e[t] = e[t].bind(e);
    });
  }
  function c(e, t, n) {
    var o;
    for (o in t.prototype)
      t.prototype.hasOwnProperty(o) && (e.prototype[o] = t.prototype[o]);
    for (o in n)
      n.hasOwnProperty(o) && (e.prototype[o] = n[o]);
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
  }, FirebaseIndex.prototype.add = function (e, t, n) {
    var o = this.indexRef.child(e);
    return t && 'function' == typeof t && (n = t, t = d), t !== d ? o.setWithPriority(1, t, n) : o.set(1, n), this;
  }, FirebaseIndex.prototype.drop = function (e, t) {
    return this.indexRef.child(e).remove(t), this;
  }, FirebaseIndex.prototype.on = function (e, t, n) {
    var r;
    switch (this._initChildListeners(), 2 === arguments.length && 'object' == typeof t && (n = t, t = null), e) {
    case 'child_added':
      r = o(this.eventListeners[e], t, n), i(this.dataRef, this.childRefs, r);
      break;
    case 'child_changed':
    case 'child_removed':
    case 'child_moved':
      r = o(this.eventListeners[e], t, n);
      break;
    default:
      throw Error('I cannot process this event type: ' + e);
    }
    return r;
  }, FirebaseIndex.prototype.off = function (e, t, n) {
    switch (2 === arguments.length && 'object' == typeof t && (n = t, t = null), e) {
    case 'child_added':
    case 'child_changed':
    case 'child_moved':
    case 'child_removed':
      for (var o = this.eventListeners[e]; o.length && o.some(function (e, i) {
          return e.cb === t && e.ctx === n ? (o.splice(i, 1), !0) : !1;
        }););
      break;
    default:
      throw Error('I cannot process this event type: ' + e);
    }
    return this;
  }, FirebaseIndex.prototype.startAt = function (e, n) {
    return new t(this.indexRef.startAt(e, n), this.dataRef);
  }, FirebaseIndex.prototype.endAt = function (e, n) {
    return new t(this.indexRef.endAt(e, n), this.dataRef);
  }, FirebaseIndex.prototype.limit = function (e) {
    return new t(this.indexRef.limit(e), this.dataRef);
  }, FirebaseIndex.prototype.dispose = function () {
    this.childRefs.forEach(function (e) {
      e.dispose();
    }), this.indexRef.off('child_added', this._indexAdded), this.indexRef.off('child_removed', this._indexRemoved), this.indexRef.off('child_moved', this._indexMoved), this.childRefs = this.eventListeners = this.indexRef = this.dataRef = null;
  }, FirebaseIndex.prototype._initMemberVars = function () {
    l(this, '_indexAdded', '_indexRemoved', '_indexMoved', '_childChanged'), this.initialized = !1, this.eventListeners = {
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
    this.childRefs[t] && (this.childRefs[t].dispose(), n(this.eventListeners.child_removed, e, t));
  }, FirebaseIndex.prototype._indexMoved = function (e, t) {
    var o = e.name();
    this.childRefs[o] && (this.childRefs[o].prevId = t, n(this.eventListeners.child_moved, e, o, t));
  }, FirebaseIndex.prototype._childChanged = function (e, t) {
    var o = t.val(), i = null, r = d, s = this.childRefs[e];
    return null === o ? this.childRefs[e] && (i = 'child_removed') : s.loaded ? i = 'child_changed' : (r = this.childRefs[e].prevId, a(this.childRefs, r, function () {
      n(this.eventListeners.child_added, t, e, r), s.loaded = !0, s.def && s.def.resolve();
    }.bind(this))), i && n(this.eventListeners[i], t, e), this;
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
  var h;
  h = 'object' == typeof _ && _ && 'function' == typeof _.defer ? _.defer : function (e) {
    return setTimeout(e, 0);
  }, Function.prototype.bind || (Function.prototype.bind = function (e) {
    if ('function' != typeof this)
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    var t = Array.prototype.slice.call(arguments, 1), n = this, o = function () {
      }, i = function () {
        return n.apply(this instanceof o && e ? this : e, t.concat(Array.prototype.slice.call(arguments)));
      };
    return o.prototype = this.prototype, i.prototype = new o(), i;
  }), Array.prototype.some || (Array.prototype.some = function (e) {
    if (null == this)
      throw new TypeError();
    var t = Object(this), n = t.length >>> 0;
    if ('function' != typeof e)
      throw new TypeError();
    for (var o = arguments[1], i = 0; n > i; i++)
      if (i in t && e.call(o, t[i], i, t))
        return !0;
    return !1;
  }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
    for (var n = 0, o = this.length; o > n; ++n)
      e.call(t, this[n], n, this);
  });
}(jQuery), angular.module('firebase', []).value('Firebase', Firebase), angular.module('firebase').factory('angularFire', [
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
        return e ? h[e] + 1 : 0;
      }
      function r(e, t) {
        h[t.$id] = e, d.splice(e, 0, t);
      }
      function s(e) {
        var t = h[e];
        d.splice(t, 1), h[e] = void 0;
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
          i.$index = h[i.$id] = o;
        }
      }
      var u, d = [], h = {};
      return u = 'string' == typeof n ? new Firebase(n) : n, o && 'function' == typeof o && u.once('value', o), u.on('child_added', function (n, o) {
        e(function () {
          var e = i(o);
          r(e, new t(n, e)), c(e);
        });
      }), u.on('child_removed', function (t) {
        e(function () {
          var e = t.name(), n = h[e];
          s(e), c(n);
        });
      }), u.on('child_changed', function (n, o) {
        e(function () {
          var e = h[n.name()], r = i(o), s = new t(n, e);
          a(e, s), r !== e && l(e, r, s);
        });
      }), u.on('child_moved', function (t, n) {
        e(function () {
          var e = h[t.name()], o = i(n), r = d[e];
          l(e, o, r);
        });
      }), d.add = function (e, t) {
        t ? u.ref().push(e, t) : u.ref().push(e);
      }, d.remove = function (e) {
        var t = angular.isString(e) ? d[h[e]] : e;
        t.$ref.remove();
      }, d.update = function (e) {
        var t = angular.isString(e) ? d[h[e]] : e, n = {};
        angular.forEach(t, function (e, t) {
          0 !== t.indexOf('$') && (n[t] = e);
        }), t.$ref.set(n);
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
  function n() {
    void 0 === this._currentStep ? this._currentStep = 0 : ++this._currentStep, this._introItems.length <= this._currentStep ? ('function' == typeof this._introCompleteCallback && this._introCompleteCallback.call(this), i.call(this, this._targetElement)) : a.call(this, this._introItems[this._currentStep]);
  }
  function o() {
    return 0 === this._currentStep ? !1 : (a.call(this, this._introItems[--this._currentStep]), void 0);
  }
  function i(e) {
    var t = e.querySelector('.introjs-overlay');
    if (t.style.opacity = 0, setTimeout(function () {
        t.parentNode && t.parentNode.removeChild(t);
      }, 500), (e = e.querySelector('.introjs-helperLayer')) && e.parentNode.removeChild(e), (e = document.querySelector('.introjs-showElement')) && (e.className = e.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '')), (e = document.querySelectorAll('.introjs-fixParent')) && e.length > 0)
      for (var n = e.length - 1; n >= 0; n--)
        e[n].className = e[n].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
    window.removeEventListener ? window.removeEventListener('keydown', this._onKeyDown, !0) : document.detachEvent && document.detachEvent('onkeydown', this._onKeyDown), this._currentStep = void 0, void 0 != this._introExitCallback && this._introExitCallback.call(this);
  }
  function r(e, t, n) {
    if (e = u(t), t.style.top = null, t.style.right = null, t.style.bottom = null, t.style.left = null, this._introItems[this._currentStep])
      switch (this._introItems[this._currentStep].position) {
      case 'top':
        t.style.left = '15px', t.style.top = '-' + (e.height + 10) + 'px', n.className = 'introjs-arrow bottom';
        break;
      case 'right':
        t.style.right = '-' + (e.width + 10) + 'px', n.className = 'introjs-arrow left';
        break;
      case 'left':
        t.style.top = '15px', t.style.left = '-' + (e.width + 10) + 'px', n.className = 'introjs-arrow right';
        break;
      default:
        t.style.bottom = '-' + (e.height + 10) + 'px', n.className = 'introjs-arrow top';
      }
  }
  function s(e) {
    if (e && this._introItems[this._currentStep]) {
      var t = u(this._introItems[this._currentStep].element);
      e.setAttribute('style', 'width: ' + (t.width + 10) + 'px; height:' + (t.height + 10) + 'px; top:' + (t.top - 5) + 'px;left: ' + (t.left - 5) + 'px;');
    }
  }
  function a(e) {
    var t;
    void 0 !== this._introChangeCallback && this._introChangeCallback.call(this, e.element);
    var a = this, c = document.querySelector('.introjs-helperLayer');
    if (u(e.element), null != c) {
      var d = c.querySelector('.introjs-helperNumberLayer'), h = c.querySelector('.introjs-tooltiptext'), p = c.querySelector('.introjs-arrow'), g = c.querySelector('.introjs-tooltip'), f = c.querySelector('.introjs-skipbutton');
      t = c.querySelector('.introjs-prevbutton');
      var m = c.querySelector('.introjs-nextbutton');
      if (g.style.opacity = 0, s.call(a, c), (c = document.querySelectorAll('.introjs-fixParent')) && c.length > 0)
        for (var v = c.length - 1; v >= 0; v--)
          c[v].className = c[v].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
      c = document.querySelector('.introjs-showElement'), c.className = c.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''), a._lastShowElementTimer && clearTimeout(a._lastShowElementTimer), a._lastShowElementTimer = setTimeout(function () {
        d.innerHTML = e.step, h.innerHTML = e.intro, r.call(a, e.element, g, p), g.style.opacity = 1;
      }, 350);
    } else {
      f = document.createElement('div'), t = document.createElement('span'), c = document.createElement('div'), v = document.createElement('div'), f.className = 'introjs-helperLayer', s.call(a, f), this._targetElement.appendChild(f), t.className = 'introjs-helperNumberLayer', c.className = 'introjs-arrow', v.className = 'introjs-tooltip', t.innerHTML = e.step, v.innerHTML = '<div class="introjs-tooltiptext">' + e.intro + '</div><div class="introjs-tooltipbuttons"></div>', f.appendChild(t), v.appendChild(c), f.appendChild(v), m = document.createElement('a'), m.onclick = function () {
        a._introItems.length - 1 != a._currentStep && n.call(a);
      }, m.href = 'javascript:void(0);', m.innerHTML = this._options.nextLabel, t = document.createElement('a'), t.onclick = function () {
        0 != a._currentStep && o.call(a);
      }, t.href = 'javascript:void(0);', t.innerHTML = this._options.prevLabel, f = document.createElement('a'), f.className = 'introjs-button introjs-skipbutton', f.href = 'javascript:void(0);', f.innerHTML = this._options.skipLabel, f.onclick = function () {
        i.call(a, a._targetElement);
      };
      var y = v.querySelector('.introjs-tooltipbuttons');
      y.appendChild(f), y.appendChild(t), y.appendChild(m), r.call(a, e.element, v, c);
    }
    for (0 == this._currentStep ? (t.className = 'introjs-button introjs-prevbutton introjs-disabled', m.className = 'introjs-button introjs-nextbutton', f.innerHTML = this._options.skipLabel) : this._introItems.length - 1 == this._currentStep ? (f.innerHTML = this._options.doneLabel, t.className = 'introjs-button introjs-prevbutton', m.className = 'introjs-button introjs-nextbutton introjs-disabled') : (t.className = 'introjs-button introjs-prevbutton', m.className = 'introjs-button introjs-nextbutton', f.innerHTML = this._options.skipLabel), m.focus(), e.element.className += ' introjs-showElement', f = l(e.element, 'position'), 'absolute' !== f && 'relative' !== f && (e.element.className += ' introjs-relativePosition'), f = e.element.parentNode; null != f && 'body' !== f.tagName.toLowerCase();)
      t = l(f, 'z-index'), /[0-9]+/.test(t) && (f.className += ' introjs-fixParent'), f = f.parentNode;
    f = e.element.getBoundingClientRect(), f.top >= 0 && f.left >= 0 && f.bottom + 80 <= window.innerHeight && f.right <= window.innerWidth || (t = e.element.getBoundingClientRect(), f = t.bottom - (t.bottom - t.top), m = t.bottom, t = void 0 != window.innerWidth ? window.innerHeight : document.documentElement.clientHeight, t = m - t, 0 > f ? window.scrollBy(0, f - 30) : window.scrollBy(0, t + 100));
  }
  function l(e, t) {
    var n = '';
    return e.currentStyle ? n = e.currentStyle[t] : document.defaultView && document.defaultView.getComputedStyle && (n = document.defaultView.getComputedStyle(e, null).getPropertyValue(t)), n.toLowerCase ? n.toLowerCase() : n;
  }
  function c(e) {
    var t = document.createElement('div'), n = '', o = this;
    if (t.className = 'introjs-overlay', 'body' === e.tagName.toLowerCase())
      n += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;', t.setAttribute('style', n);
    else {
      var r = u(e);
      r && (n += 'width: ' + r.width + 'px; height:' + r.height + 'px; top:' + r.top + 'px;left: ' + r.left + 'px;', t.setAttribute('style', n));
    }
    return e.appendChild(t), t.onclick = function () {
      !0 == o._options.exitOnOverlayClick && i.call(o, e);
    }, setTimeout(function () {
      n += 'opacity: .5;', t.setAttribute('style', n);
    }, 10), !0;
  }
  function u(e) {
    var t = {};
    t.width = e.offsetWidth, t.height = e.offsetHeight;
    for (var n = 0, o = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);)
      n += e.offsetLeft, o += e.offsetTop, e = e.offsetParent;
    return t.top = o, t.left = n, t;
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
      var t, n = this._options, o = {};
      for (t in n)
        o[t] = n[t];
      for (t in e)
        o[t] = e[t];
      return this._options = o, this;
    },
    start: function () {
      e: {
        var e = this._targetElement, t = e.querySelectorAll('*[data-intro]'), r = [], a = this;
        if (this._options.steps)
          for (var t = [], l = 0; this._options.steps.length > l; l++)
            this._options.steps[l].step = l + 1, r.push(this._options.steps[l]);
        else {
          if (1 > t.length)
            break e;
          for (var l = 0, u = t.length; u > l; l++) {
            var d = t[l];
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
        }), a._introItems = r, c.call(a, e) && (n.call(a), e.querySelector('.introjs-skipbutton'), e.querySelector('.introjs-nextbutton'), a._onKeyDown = function (t) {
          27 === t.keyCode && !0 == a._options.exitOnEsc ? i.call(a, e) : 37 === t.keyCode ? o.call(a) : (39 === t.keyCode || 13 === t.keyCode) && (n.call(a), t.preventDefault ? t.preventDefault() : t.returnValue = !1);
        }, a._onResize = function () {
          s.call(a, document.querySelector('.introjs-helperLayer'));
        }, window.addEventListener ? (window.addEventListener('keydown', a._onKeyDown, !0), window.addEventListener('resize', a._onResize, !0)) : document.attachEvent && (document.attachEvent('onkeydown', a._onKeyDown), document.attachEvent('onresize', a._onResize)));
      }
      return this;
    },
    goToStep: function (e) {
      return this._currentStep = e - 2, void 0 !== this._introItems && n.call(this), this;
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
  (function (t, n) {
    var o;
    return o = function () {
      function e(e) {
        var o = this;
        this.$el = t(e), t(n).resize(function () {
          return o.refresh();
        });
      }
      return e.prototype.start = function () {
        var e, t, n, o;
        if (this._overlay_visible())
          return !1;
        for (this._add_overlay_layer(), o = this.$el.find('*[data-intro]'), t = 0, n = o.length; n > t; t++)
          e = o[t], this._show_element(e);
        return this.$el.trigger('chardinJs:start');
      }, e.prototype.toggle = function () {
        return this._overlay_visible() ? this.stop() : this.start();
      }, e.prototype.refresh = function () {
        var e, t, n, o, i;
        if (this._overlay_visible()) {
          for (o = this.$el.find('*[data-intro]'), i = [], t = 0, n = o.length; n > t; t++)
            e = o[t], i.push(this._position_helper_layer(e));
          return i;
        }
        return this;
      }, e.prototype.stop = function () {
        return this.$el.find('.chardinjs-overlay').fadeOut(function () {
          return t(this).remove();
        }), this.$el.find('.chardinjs-helper-layer').remove(), this.$el.find('.chardinjs-show-element').removeClass('chardinjs-show-element'), this.$el.find('.chardinjs-relative-position').removeClass('chardinjs-relative-position'), n.removeEventListener ? n.removeEventListener('keydown', this._onKeyDown, !0) : document.detachEvent && document.detachEvent('onkeydown', this._onKeyDown), this.$el.trigger('chardinJs:stop');
      }, e.prototype._overlay_visible = function () {
        return 0 !== this.$el.find('.chardinjs-overlay').length;
      }, e.prototype._add_overlay_layer = function () {
        var e, t, n, o = this;
        return this._overlay_visible() ? !1 : (t = document.createElement('div'), n = '', t.className = 'chardinjs-overlay', 'BODY' === this.$el.prop('tagName') ? (n += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;', t.setAttribute('style', n)) : (e = this._get_offset(this.$el.get()[0]), e && (n += 'width: ' + e.width + 'px; height:' + e.height + 'px; top:' + e.top + 'px;left: ' + e.left + 'px;', t.setAttribute('style', n))), this.$el.get()[0].appendChild(t), t.onclick = function () {
          return o.stop();
        }, setTimeout(function () {
          return n += 'opacity: .8;', t.setAttribute('style', n);
        }, 10));
      }, e.prototype._get_position = function (e) {
        return e.getAttribute('data-position') || 'bottom';
      }, e.prototype._place_tooltip = function (e) {
        var n, o, i, r, s, a, l;
        switch (a = t(e).data('tooltip_layer'), l = this._get_offset(a), a.style.top = null, a.style.right = null, a.style.bottom = null, a.style.left = null, this._get_position(e)) {
        case 'top':
        case 'bottom':
          i = this._get_offset(e), s = i.width, o = t(a).width(), a.style.left = '' + (s / 2 - l.width / 2) + 'px';
          break;
        case 'left':
        case 'right':
          i = this._get_offset(e), r = i.height, n = t(a).height(), a.style.top = '' + (r / 2 - l.height / 2) + 'px';
        }
        switch (this._get_position(e)) {
        case 'left':
          return a.style.left = '-' + (l.width - 34) + 'px';
        case 'right':
          return a.style.right = '-' + (l.width - 34) + 'px';
        case 'bottom':
          return a.style.bottom = '-' + l.height + 'px';
        case 'top':
          return a.style.top = '-' + l.height + 'px';
        }
      }, e.prototype._position_helper_layer = function (e) {
        var n, o;
        return o = t(e).data('helper_layer'), n = this._get_offset(e), o.setAttribute('style', 'width: ' + n.width + 'px; height:' + n.height + 'px; top:' + n.top + 'px; left: ' + n.left + 'px;');
      }, e.prototype._show_element = function (e) {
        var n, o, i, r;
        return o = this._get_offset(e), i = document.createElement('div'), r = document.createElement('div'), t(e).data('helper_layer', i).data('tooltip_layer', r), e.id && i.setAttribute('data-id', e.id), i.className = 'chardinjs-helper-layer chardinjs-' + this._get_position(e), this._position_helper_layer(e), this.$el.get()[0].appendChild(i), r.className = 'chardinjs-tooltip chardinjs-' + this._get_position(e), r.innerHTML = '<div class=\'chardinjs-tooltiptext\'>' + e.getAttribute('data-intro') + '</div>', i.appendChild(r), this._place_tooltip(e), e.className += ' chardinjs-show-element', n = '', e.currentStyle ? n = e.currentStyle.position : document.defaultView && document.defaultView.getComputedStyle && (n = document.defaultView.getComputedStyle(e, null).getPropertyValue('position')), n = n.toLowerCase(), 'absolute' !== n && 'relative' !== n ? e.className += ' chardinjs-relative-position' : void 0;
      }, e.prototype._get_offset = function (e) {
        var t, n, o;
        for (t = {
            width: e.offsetWidth,
            height: e.offsetHeight
          }, n = 0, o = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);)
          n += e.offsetLeft, o += e.offsetTop, e = e.offsetParent;
        return t.top = o, t.left = n, t;
      }, e;
    }(), t.fn.extend({
      chardinJs: function () {
        var n, i, r, s;
        return s = arguments[0], i = arguments.length >= 2 ? e.call(arguments, 1) : [], n = t(this[0]), r = n.data('chardinJs'), r || n.data('chardinJs', r = new o(this, s)), 'string' == typeof s && r[s].apply(r, i), r;
      }
    });
  }(window.jQuery, window));
}.call(this), function (e) {
  'use strict';
  var t = 6, n = 4, o = 'asc', i = 'desc', r = '_ng_field_', s = '_ng_depth_', a = '_ng_hidden_', l = '_ng_column_', c = /CUSTOM_FILTERS/g, u = /COL_FIELD/g, d = /DISPLAY_CELL_TEMPLATE/g, h = /EDITABLE_CELL_TEMPLATE/g, p = /<.+>/;
  e.ng || (e.ng = {}), e.ngGrid = {}, e.ngGrid.i18n = {};
  var g = angular.module('ngGrid.services', []), f = angular.module('ngGrid.directives', []), m = angular.module('ngGrid.filters', []);
  angular.module('ngGrid', [
    'ngGrid.services',
    'ngGrid.directives',
    'ngGrid.filters'
  ]), ng.moveSelectionHandler = function (e, n, o, i) {
    if (void 0 === e.selectionService.selectedItems)
      return !0;
    var r, s = o.which || o.keyCode, a = !1, l = !1, c = e.selectionService.lastClickedRow.rowIndex;
    if (e.col && (r = e.col.index), 37 != s && 38 != s && 39 != s && 40 != s && 9 != s && 13 != s)
      return !0;
    if (e.enableCellSelection) {
      9 == s && o.preventDefault();
      var u = e.showSelectionCheckbox ? 1 == e.col.index : 0 == e.col.index, d = 1 == e.$index || 0 == e.$index, h = e.$index == e.renderedColumns.length - 1 || e.$index == e.renderedColumns.length - 2, p = e.col.index == e.columns.length - 1;
      37 == s || 9 == s && o.shiftKey ? (d && (u && 9 == s && o.shiftKey ? (i.$viewport.scrollLeft(i.$canvas.width()), r = e.columns.length - 1, l = !0) : i.$viewport.scrollLeft(i.$viewport.scrollLeft() - e.col.width)), u || (r -= 1)) : (39 == s || 9 == s && !o.shiftKey) && (h && (p && 9 == s && !o.shiftKey ? (i.$viewport.scrollLeft(0), r = e.showSelectionCheckbox ? 1 : 0, a = !0) : i.$viewport.scrollLeft(i.$viewport.scrollLeft() + e.col.width)), p || (r += 1));
    }
    var g;
    g = e.configGroups.length > 0 ? i.rowFactory.parsedData.filter(function (e) {
      return !e.isAggRow;
    }) : i.filteredRows;
    var f = 0;
    if (0 != c && (38 == s || 13 == s && o.shiftKey || 9 == s && o.shiftKey && l) ? f = -1 : c != g.length - 1 && (40 == s || 13 == s && !o.shiftKey || 9 == s && a) && (f = 1), f) {
      var m = g[c + f];
      m.beforeSelectionChange(m, o) && (m.continueSelection(o), e.$emit('ngGridEventDigestGridParent'), e.selectionService.lastClickedRow.renderedRowIndex >= e.renderedRows.length - t - 2 ? i.$viewport.scrollTop(i.$viewport.scrollTop() + e.rowHeight) : t + 2 >= e.selectionService.lastClickedRow.renderedRowIndex && i.$viewport.scrollTop(i.$viewport.scrollTop() - e.rowHeight));
    }
    return e.enableCellSelection && setTimeout(function () {
      e.domAccessProvider.focusCellElement(e, e.renderedColumns.indexOf(e.columns[r]));
    }, 3), !1;
  }, String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
    var t = this.length >>> 0, n = Number(arguments[1]) || 0;
    for (n = 0 > n ? Math.ceil(n) : Math.floor(n), 0 > n && (n += t); t > n; n++)
      if (n in this && this[n] === e)
        return n;
    return -1;
  }), Array.prototype.filter || (Array.prototype.filter = function (e) {
    var t = Object(this), n = t.length >>> 0;
    if ('function' != typeof e)
      throw new TypeError();
    for (var o = [], i = arguments[1], r = 0; n > r; r++)
      if (r in t) {
        var s = t[r];
        e.call(i, s, r, t) && o.push(s);
      }
    return o;
  }), m.filter('checkmark', function () {
    return function (e) {
      return e ? '\u2714' : '\u2718';
    };
  }), m.filter('ngColumns', function () {
    return function (e) {
      return e.filter(function (e) {
        return !e.isAggCol;
      });
    };
  }), g.factory('$domUtilityService', [
    '$utilityService',
    function (e) {
      var t = {}, n = {}, o = function () {
          var e = $('<div></div>');
          e.appendTo('body'), e.height(100).width(100).css('position', 'absolute').css('overflow', 'scroll'), e.append('<div style="height: 400px; width: 400px;"></div>'), t.ScrollH = e.height() - e[0].clientHeight, t.ScrollW = e.width() - e[0].clientWidth, e.empty(), e.attr('style', ''), e.append('<span style="font-family: Verdana, Helvetica, Sans-Serif; font-size: 14px;"><strong>M</strong></span>'), t.LetterW = e.children().first().width(), e.remove();
        };
      return t.eventStorage = {}, t.AssignGridContainers = function (e, n, o) {
        o.$root = $(n), o.$topPanel = o.$root.find('.ngTopPanel'), o.$groupPanel = o.$root.find('.ngGroupPanel'), o.$headerContainer = o.$topPanel.find('.ngHeaderContainer'), e.$headerContainer = o.$headerContainer, o.$headerScroller = o.$topPanel.find('.ngHeaderScroller'), o.$headers = o.$headerScroller.children(), o.$viewport = o.$root.find('.ngViewport'), o.$canvas = o.$viewport.find('.ngCanvas'), o.$footerPanel = o.$root.find('.ngFooterPanel'), e.$watch(function () {
          return o.$viewport.scrollLeft();
        }, function (e) {
          return o.$headerContainer.scrollLeft(e);
        }), t.UpdateGridLayout(e, o);
      }, t.getRealWidth = function (e) {
        var t = 0, n = {
            visibility: 'hidden',
            display: 'block'
          }, o = e.parents().andSelf().not(':visible');
        return $.swap(o[0], n, function () {
          t = e.outerWidth();
        }), t;
      }, t.UpdateGridLayout = function (e, n) {
        var o = n.$viewport.scrollTop();
        n.elementDims.rootMaxW = n.$root.width(), n.$root.is(':hidden') && (n.elementDims.rootMaxW = t.getRealWidth(n.$root)), n.elementDims.rootMaxH = n.$root.height(), n.refreshDomSizes(), e.adjustScrollTop(o, !0);
      }, t.numberOfGrids = 0, t.BuildStyles = function (n, o, i) {
        var r, s = o.config.rowHeight, a = o.$styleSheet, l = o.gridId, c = n.columns, u = 0;
        a || (a = $('#' + l), a[0] || (a = $('<style id=\'' + l + '\' type=\'text/css\' rel=\'stylesheet\' />').appendTo(o.$root))), a.empty();
        var d = n.totalRowWidth();
        r = '.' + l + ' .ngCanvas { width: ' + d + 'px; }' + '.' + l + ' .ngRow { width: ' + d + 'px; }' + '.' + l + ' .ngCanvas { width: ' + d + 'px; }' + '.' + l + ' .ngHeaderScroller { width: ' + (d + t.ScrollH + 2) + 'px}';
        for (var h = 0; c.length > h; h++) {
          var p = c[h];
          if (p.visible !== !1) {
            var g = p.pinned ? o.$viewport.scrollLeft() + u : u;
            r += '.' + l + ' .col' + h + ' { width: ' + p.width + 'px; left: ' + g + 'px; height: ' + s + 'px }' + '.' + l + ' .colt' + h + ' { width: ' + p.width + 'px; }', u += p.width;
          }
        }
        e.isIe ? a[0].styleSheet.cssText = r : a[0].appendChild(document.createTextNode(r)), o.$styleSheet = a, i && (n.adjustScrollLeft(o.$viewport.scrollLeft()), t.digest(n));
      }, t.setColLeft = function (t, o, i) {
        if (i.$styleSheet) {
          var r = n[t.index];
          r || (r = n[t.index] = RegExp('.col' + t.index + ' { width: [0-9]+px; left: [0-9]+px'));
          var s = i.$styleSheet.html(), a = s.replace(r, '.col' + t.index + ' { width: ' + t.width + 'px; left: ' + o + 'px');
          e.isIe ? setTimeout(function () {
            i.$styleSheet.html(a);
          }) : i.$styleSheet.html(a);
        }
      }, t.setColLeft.immediate = 1, t.RebuildGrid = function (e, n) {
        t.UpdateGridLayout(e, n), n.config.maintainColumnRatios && n.configureColumnWidths(), e.adjustScrollLeft(n.$viewport.scrollLeft()), t.BuildStyles(e, n, !0);
      }, t.digest = function (e) {
        e.$root.$$phase || e.$digest();
      }, t.ScrollH = 17, t.ScrollW = 17, t.LetterW = 10, o(), t;
    }
  ]), g.factory('$sortService', [
    '$parse',
    function (e) {
      var t = {};
      return t.colSortFnCache = {}, t.guessSortFn = function (e) {
        var n = typeof e;
        switch (n) {
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
        var n, o, i = !1, r = !1;
        return n = parseFloat(e.replace(/[^0-9.-]/g, '')), isNaN(n) && (i = !0), o = parseFloat(t.replace(/[^0-9.-]/g, '')), isNaN(o) && (r = !0), i && r ? 0 : i ? 1 : r ? -1 : n - o;
      }, t.sortAlpha = function (e, t) {
        var n = e.toLowerCase(), o = t.toLowerCase();
        return n == o ? 0 : o > n ? -1 : 1;
      }, t.sortDate = function (e, t) {
        var n = e.getTime(), o = t.getTime();
        return n == o ? 0 : o > n ? -1 : 1;
      }, t.sortBool = function (e, t) {
        return e && t ? 0 : e || t ? e ? 1 : -1 : 0;
      }, t.sortData = function (n, i) {
        if (i && n) {
          var r, s, a = n.fields.length, l = n.fields, c = i.slice(0);
          i.sort(function (i, u) {
            for (var d, h = 0, p = 0; 0 == h && a > p;) {
              r = n.columns[p], s = n.directions[p], d = t.getSortFn(r, c);
              var g = e(l[p])(i), f = e(l[p])(u);
              !g && 0 != g || !f && 0 != f ? f || g ? g ? f || (h = -1) : h = 1 : h = 0 : h = d(g, f), p++;
            }
            return s === o ? h : 0 - h;
          });
        }
      }, t.Sort = function (e, n) {
        t.isSorting || (t.isSorting = !0, t.sortData(e, n), t.isSorting = !1);
      }, t.getSortFn = function (n, o) {
        var i, r = void 0;
        if (t.colSortFnCache[n.field])
          r = t.colSortFnCache[n.field];
        else if (void 0 != n.sortingAlgorithm)
          r = n.sortingAlgorithm, t.colSortFnCache[n.field] = n.sortingAlgorithm;
        else {
          if (i = o[0], !i)
            return r;
          r = t.guessSortFn(e(n.field)(i)), r ? t.colSortFnCache[n.field] = r : r = t.sortAlpha;
        }
        return r;
      }, t;
    }
  ]), g.factory('$utilityService', [
    '$parse',
    function (t) {
      var n = {
          visualLength: function (e) {
            var t = document.getElementById('testDataLength');
            return t || (t = document.createElement('SPAN'), t.id = 'testDataLength', t.style.visibility = 'hidden', document.body.appendChild(t)), $(t).css('font', $(e).css('font')), t.innerHTML = $(e).text(), t.offsetWidth;
          },
          forIn: function (e, t) {
            for (var n in e)
              e.hasOwnProperty(n) && t(e[n], n);
          },
          evalProperty: function (e, n) {
            return t(n)(e);
          },
          endsWith: function (e, t) {
            return e && t && 'string' == typeof e ? -1 !== e.indexOf(t, e.length - t.length) : !1;
          },
          isNullOrUndefined: function (e) {
            return void 0 === e || null === e ? !0 : !1;
          },
          getElementsByClassName: function (e) {
            for (var t = [], n = RegExp('\\b' + e + '\\b'), o = document.getElementsByTagName('*'), i = 0; o.length > i; i++) {
              var r = o[i].className;
              n.test(r) && t.push(o[i]);
            }
            return t;
          },
          newId: function () {
            var e = new Date().getTime();
            return function () {
              return e += 1;
            };
          }(),
          seti18n: function (t, n) {
            var o = e.ngGrid.i18n[n];
            for (var i in o)
              t.i18n[i] = o[i];
          },
          ieVersion: function () {
            for (var e = 3, t = document.createElement('div'), n = t.getElementsByTagName('i'); t.innerHTML = '<!--[if gt IE ' + ++e + ']><i></i><![endif]-->', n[0];);
            return e > 4 ? e : void 0;
          }()
        };
      return $.extend(n, {
        isIe: function () {
          return void 0 !== n.ieVersion;
        }()
      }), n;
    }
  ]), ng.Aggregate = function (e, t, n) {
    var o = this;
    o.rowIndex = 0, o.offsetTop = o.rowIndex * n, o.entity = e, o.label = e.gLabel, o.field = e.gField, o.depth = e.gDepth, o.parent = e.parent, o.children = e.children, o.aggChildren = e.aggChildren, o.aggIndex = e.aggIndex, o.collapsed = !0, o.isAggRow = !0, o.offsetleft = 25 * e.gDepth, o.aggLabelFilter = e.aggLabelFilter, o.toggleExpand = function () {
      o.collapsed = o.collapsed ? !1 : !0, o.orig && (o.orig.collapsed = o.collapsed), o.notifyChildren();
    }, o.setExpand = function (e) {
      o.collapsed = e, o.notifyChildren();
    }, o.notifyChildren = function () {
      for (var e = Math.max(t.aggCache.length, o.children.length), n = 0; e > n; n++)
        if (o.aggChildren[n] && (o.aggChildren[n].entity[a] = o.collapsed, o.collapsed && o.aggChildren[n].setExpand(o.collapsed)), o.children[n] && (o.children[n][a] = o.collapsed), n > o.aggIndex && t.aggCache[n]) {
          var i = t.aggCache[n], r = 30 * o.children.length;
          i.offsetTop = o.collapsed ? i.offsetTop - r : i.offsetTop + r;
        }
      t.renderedChange();
    }, o.aggClass = function () {
      return o.collapsed ? 'ngAggArrowCollapsed' : 'ngAggArrowExpanded';
    }, o.totalChildren = function () {
      if (o.aggChildren.length > 0) {
        var e = 0, t = function (n) {
            n.aggChildren.length > 0 ? angular.forEach(n.aggChildren, function (e) {
              t(e);
            }) : e += n.children.length;
          };
        return t(o), e;
      }
      return o.children.length;
    }, o.copy = function () {
      var e = new ng.Aggregate(o.entity, t, n);
      return e.orig = o, e;
    };
  }, ng.Column = function (e, t, n, r, s, a) {
    var l = this, u = e.colDef, d = 500, h = 0, g = null;
    l.width = u.width, l.groupIndex = 0, l.isGroupedBy = !1, l.minWidth = u.minWidth ? u.minWidth : 50, l.maxWidth = u.maxWidth ? u.maxWidth : 9000, l.enableCellEdit = e.enableCellEdit || u.enableCellEdit, l.headerRowHeight = e.headerRowHeight, l.displayName = u.displayName || u.field, l.index = e.index, l.isAggCol = e.isAggCol, l.cellClass = u.cellClass, l.sortPriority = void 0, l.zIndex = function () {
      return l.pinned ? 5 : 0;
    }, l.cellFilter = u.cellFilter ? u.cellFilter : '', l.field = u.field, l.aggLabelFilter = u.cellFilter || u.aggLabelFilter, l.visible = a.isNullOrUndefined(u.visible) || u.visible, l.sortable = !1, l.resizable = !1, l.pinnable = !1, l.pinned = u.pinned, l.originalIndex = l.index, l.groupable = a.isNullOrUndefined(u.groupable) || u.groupable, e.enableSort && (l.sortable = a.isNullOrUndefined(u.sortable) || u.sortable), e.enableResize && (l.resizable = a.isNullOrUndefined(u.resizable) || u.resizable), e.enablePinning && (l.pinnable = a.isNullOrUndefined(u.pinnable) || u.pinnable), l.sortDirection = void 0, l.sortingAlgorithm = u.sortFn, l.headerClass = u.headerClass, l.cursor = l.sortable ? 'pointer' : 'default', l.headerCellTemplate = u.headerCellTemplate || s.get('headerCellTemplate.html'), l.cellTemplate = u.cellTemplate || s.get('cellTemplate.html').replace(c, l.cellFilter ? '|' + l.cellFilter : ''), l.enableCellEdit && (l.cellEditTemplate = s.get('cellEditTemplate.html'), l.editableCellTemplate = u.editableCellTemplate || s.get('editableCellTemplate.html')), u.cellTemplate && !p.test(u.cellTemplate) && (l.cellTemplate = $.ajax({
      type: 'GET',
      url: u.cellTemplate,
      async: !1
    }).responseText), l.enableCellEdit && u.editableCellTemplate && !p.test(u.editableCellTemplate) && (l.editableCellTemplate = $.ajax({
      type: 'GET',
      url: u.editableCellTemplate,
      async: !1
    }).responseText), u.headerCellTemplate && !p.test(u.headerCellTemplate) && (l.headerCellTemplate = $.ajax({
      type: 'GET',
      url: u.headerCellTemplate,
      async: !1
    }).responseText), l.colIndex = function () {
      return 'col' + l.index + ' colt' + l.index;
    }, l.groupedByClass = function () {
      return l.isGroupedBy ? 'ngGroupedByIcon' : 'ngGroupIcon';
    }, l.toggleVisible = function () {
      l.visible = !l.visible;
    }, l.showSortButtonUp = function () {
      return l.sortable ? l.sortDirection === i : l.sortable;
    }, l.showSortButtonDown = function () {
      return l.sortable ? l.sortDirection === o : l.sortable;
    }, l.noSortVisible = function () {
      return !l.sortDirection;
    }, l.sort = function (t) {
      if (!l.sortable)
        return !0;
      var n = l.sortDirection === o ? i : o;
      return l.sortDirection = n, e.sortCallback(l, t), !1;
    }, l.gripClick = function () {
      h++, 1 === h ? g = setTimeout(function () {
        h = 0;
      }, d) : (clearTimeout(g), e.resizeOnDataCallback(l), h = 0);
    }, l.gripOnMouseDown = function (e) {
      return e.ctrlKey && !l.pinned ? (l.toggleVisible(), r.BuildStyles(t, n), !0) : (e.target.parentElement.style.cursor = 'col-resize', l.startMousePosition = e.clientX, l.origWidth = l.width, $(document).mousemove(l.onMouseMove), $(document).mouseup(l.gripOnMouseUp), !1);
    }, l.onMouseMove = function (e) {
      var o = e.clientX - l.startMousePosition, i = o + l.origWidth;
      return l.width = l.minWidth > i ? l.minWidth : i > l.maxWidth ? l.maxWidth : i, r.BuildStyles(t, n), !1;
    }, l.gripOnMouseUp = function (e) {
      return $(document).off('mousemove', l.onMouseMove), $(document).off('mouseup', l.gripOnMouseUp), e.target.parentElement.style.cursor = 'default', t.adjustScrollLeft(0), r.digest(t), !1;
    }, l.copy = function () {
      var o = new ng.Column(e, t, n, r, s);
      return o.isClone = !0, o.orig = l, o;
    }, l.setVars = function (e) {
      l.orig = e, l.width = e.width, l.groupIndex = e.groupIndex, l.isGroupedBy = e.isGroupedBy, l.displayName = e.displayName, l.index = e.index, l.isAggCol = e.isAggCol, l.cellClass = e.cellClass, l.cellFilter = e.cellFilter, l.field = e.field, l.aggLabelFilter = e.aggLabelFilter, l.visible = e.visible, l.sortable = e.sortable, l.resizable = e.resizable, l.pinnable = e.pinnable, l.pinned = e.pinned, l.originalIndex = e.originalIndex, l.sortDirection = e.sortDirection, l.sortingAlgorithm = e.sortingAlgorithm, l.headerClass = e.headerClass, l.headerCellTemplate = e.headerCellTemplate, l.cellTemplate = e.cellTemplate, l.cellEditTemplate = e.cellEditTemplate;
    };
  }, ng.Dimension = function (e) {
    this.outerHeight = null, this.outerWidth = null, $.extend(this, e);
  }, ng.DomAccessProvider = function (e) {
    var t, n = this;
    n.selectInputElement = function (e) {
      var t = e.nodeName.toLowerCase();
      ('input' == t || 'textarea' == t) && e.select();
    }, n.focusCellElement = function (n, o) {
      if (n.selectionProvider.lastClickedRow) {
        var i = void 0 != o ? o : t, r = n.selectionProvider.lastClickedRow.clone ? n.selectionProvider.lastClickedRow.clone.elm : n.selectionProvider.lastClickedRow.elm;
        if (void 0 != i && r) {
          var s = angular.element(r[0].children).filter(function () {
              return 8 != this.nodeType;
            }), a = Math.max(Math.min(n.renderedColumns.length - 1, i), 0);
          e.config.showSelectionCheckbox && angular.element(s[a]).scope() && 0 == angular.element(s[a]).scope().col.index && (a = 1), s[a] && s[a].children[0].focus(), t = i;
        }
      }
    };
    var o = function (e, t) {
      e.css({
        '-webkit-touch-callout': t,
        '-webkit-user-select': t,
        '-khtml-user-select': t,
        '-moz-user-select': 'none' == t ? '-moz-none' : t,
        '-ms-user-select': t,
        'user-select': t
      });
    };
    n.selectionHandlers = function (t, n) {
      var i = !1;
      n.bind('keydown', function (r) {
        if (16 == r.keyCode)
          return o(n, 'none', r), !0;
        if (!i) {
          i = !0;
          var s = ng.moveSelectionHandler(t, n, r, e);
          return i = !1, s;
        }
        return !0;
      }), n.bind('keyup', function (e) {
        return 16 == e.keyCode && o(n, 'text', e), !0;
      });
    };
  }, ng.EventProvider = function (t, n, o) {
    var i = this;
    i.colToMove = void 0, i.groupToMove = void 0, i.assignEvents = function () {
      t.config.jqueryUIDraggable && !t.config.enablePinning ? (t.$groupPanel.droppable({
        addClasses: !1,
        drop: function (e) {
          i.onGroupDrop(e);
        }
      }), n.$evalAsync(i.setDraggables)) : (t.$groupPanel.on('mousedown', i.onGroupMouseDown).on('dragover', i.dragOver).on('drop', i.onGroupDrop), t.$headerScroller.on('mousedown', i.onHeaderMouseDown).on('dragover', i.dragOver), t.config.enableColumnReordering && !t.config.enablePinning && t.$headerScroller.on('drop', i.onHeaderDrop), t.config.enableRowReordering && t.$viewport.on('mousedown', i.onRowMouseDown).on('dragover', i.dragOver).on('drop', i.onRowDrop)), n.$watch('columns', i.setDraggables, !0);
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
      var n = $(e.target);
      if ('ngRemoveGroup' != n[0].className) {
        var o = angular.element(n).scope();
        o && (t.config.jqueryUIDraggable || (n.attr('draggable', 'true'), this.addEventListener && this.addEventListener('dragstart', i.dragStart), -1 != navigator.userAgent.indexOf('MSIE') && n.bind('selectstart', function () {
          return this.dragDrop(), !1;
        })), i.groupToMove = {
          header: n,
          groupName: o.group,
          index: o.$index
        });
      } else
        i.groupToMove = void 0;
    }, i.onGroupDrop = function (e) {
      e.stopPropagation();
      var o, r;
      i.groupToMove ? (o = $(e.target).closest('.ngGroupElement'), 'ngGroupPanel' == o.context.className ? (n.configGroups.splice(i.groupToMove.index, 1), n.configGroups.push(i.groupToMove.groupName)) : (r = angular.element(o).scope(), r && i.groupToMove.index != r.$index && (n.configGroups.splice(i.groupToMove.index, 1), n.configGroups.splice(r.$index, 0, i.groupToMove.groupName))), i.groupToMove = void 0, t.fixGroupIndexes()) : i.colToMove && (-1 == n.configGroups.indexOf(i.colToMove.col) && (o = $(e.target).closest('.ngGroupElement'), 'ngGroupPanel' == o.context.className || 'ngGroupPanelDescription ng-binding' == o.context.className ? n.groupBy(i.colToMove.col) : (r = angular.element(o).scope(), r && n.removeGroup(r.$index))), i.colToMove = void 0), n.$$phase || n.$apply();
    }, i.onHeaderMouseDown = function (e) {
      var t = $(e.target).closest('.ngHeaderSortColumn'), n = angular.element(t).scope();
      n && (i.colToMove = {
        header: t,
        col: n.col
      });
    }, i.onHeaderDrop = function (e) {
      if (i.colToMove) {
        var r = $(e.target).closest('.ngHeaderSortColumn'), s = angular.element(r).scope();
        if (s) {
          if (i.colToMove.col == s.col)
            return;
          n.columns.splice(i.colToMove.col.index, 1), n.columns.splice(s.col.index, 0, i.colToMove.col), t.fixColumnIndexes(), o.BuildStyles(n, t, !0), i.colToMove = void 0;
        }
      }
    }, i.onRowMouseDown = function (e) {
      var t = $(e.target).closest('.ngRow'), n = angular.element(t).scope();
      n && (t.attr('draggable', 'true'), o.eventStorage.rowToMove = {
        targetRow: t,
        scope: n
      });
    }, i.onRowDrop = function (e) {
      var n = $(e.target).closest('.ngRow'), i = angular.element(n).scope();
      if (i) {
        var r = o.eventStorage.rowToMove;
        if (r.scope.row == i.row)
          return;
        t.changeRowOrder(r.scope.row, i.row), t.searchProvider.evalFilter(), o.eventStorage.rowToMove = void 0, o.digest(i.$root);
      }
    }, i.assignGridEventHandlers = function () {
      -1 === t.config.tabIndex ? (t.$viewport.attr('tabIndex', o.numberOfGrids), o.numberOfGrids++) : t.$viewport.attr('tabIndex', t.config.tabIndex), $(e).resize(function () {
        o.RebuildGrid(n, t);
      });
    }, i.assignGridEventHandlers(), i.assignEvents();
  }, ng.Footer = function (e, t) {
    e.maxRows = function () {
      var n = Math.max(e.pagingOptions.totalServerItems, t.data.length);
      return n;
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
      var n = e.pagingOptions.currentPage, o = e.maxPages();
      return e.pagingOptions.totalServerItems > 0 ? !(o > n) : 1 > t.data.length;
    }, e.cantPageToLast = function () {
      return e.pagingOptions.totalServerItems > 0 ? e.cantPageForward() : !0;
    }, e.cantPageBackward = function () {
      var t = e.pagingOptions.currentPage;
      return !(t > 1);
    };
  }, ng.Grid = function (o, i, r, s, l, c, u, d) {
    var h = {
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
      }, g = this;
    g.maxCanvasHt = 0, g.config = $.extend(h, e.ngGrid.config, i), g.config.showSelectionCheckbox = g.config.showSelectionCheckbox && g.config.enableColumnHeavyVirt === !1, g.config.enablePinning = g.config.enablePinning && g.config.enableColumnHeavyVirt === !1, g.config.selectWithCheckboxOnly = g.config.selectWithCheckboxOnly && g.config.showSelectionCheckbox !== !1, g.config.pinSelectionCheckbox = g.config.enablePinning, 'string' == typeof i.columnDefs && (g.config.columnDefs = o.$eval(i.columnDefs)), g.rowCache = [], g.rowMap = [], g.gridId = 'ng' + u.newId(), g.$root = null, g.$groupPanel = null, g.$topPanel = null, g.$headerContainer = null, g.$headerScroller = null, g.$headers = null, g.$viewport = null, g.$canvas = null, g.rootDim = g.config.gridDim, g.data = [], g.lateBindColumns = !1, g.filteredRows = [];
    var f = function (e) {
      var t = g.config[e], n = g.gridId + e + '.html';
      if (t && !p.test(t))
        c.put(n, $.ajax({
          type: 'GET',
          url: t,
          async: !1
        }).responseText);
      else if (t)
        c.put(n, t);
      else {
        var o = e + '.html';
        c.put(n, c.get(o));
      }
    };
    f('rowTemplate'), f('aggregateTemplate'), f('headerRowTemplate'), f('checkboxCellTemplate'), f('checkboxHeaderTemplate'), 'object' == typeof g.config.data && (g.data = g.config.data), g.calcMaxCanvasHeight = function () {
      return g.config.groups.length > 0 ? g.rowFactory.parsedData.filter(function (e) {
        return !e[a];
      }).length * g.config.rowHeight : g.filteredRows.length * g.config.rowHeight;
    }, g.elementDims = {
      scrollW: 0,
      scrollH: 0,
      rowIndexCellW: 25,
      rowSelectedCellW: 25,
      rootMaxW: 0,
      rootMaxH: 0
    }, g.setRenderedRows = function (e) {
      o.renderedRows.length = e.length;
      for (var t = 0; e.length > t; t++)
        !o.renderedRows[t] || e[t].isAggRow || o.renderedRows[t].isAggRow ? (o.renderedRows[t] = e[t].copy(), o.renderedRows[t].collapsed = e[t].collapsed, e[t].isAggRow || o.renderedRows[t].setVars(e[t])) : o.renderedRows[t].setVars(e[t]), o.renderedRows[t].rowIndex = e[t].rowIndex, o.renderedRows[t].offsetTop = e[t].offsetTop, e[t].renderedRowIndex = t;
      g.refreshDomSizes(), o.$emit('ngGridEventRows', e);
    }, g.minRowsToRender = function () {
      var e = o.viewportDimHeight() || 1;
      return Math.floor(e / g.config.rowHeight);
    }, g.refreshDomSizes = function () {
      var e = new ng.Dimension();
      e.outerWidth = g.elementDims.rootMaxW, e.outerHeight = g.elementDims.rootMaxH, g.rootDim = e, g.maxCanvasHt = g.calcMaxCanvasHeight();
    }, g.buildColumnDefsFromData = function () {
      g.config.columnDefs = [];
      var e = g.data[0];
      return e ? (u.forIn(e, function (e, t) {
        -1 == g.config.excludeProperties.indexOf(t) && g.config.columnDefs.push({ field: t });
      }), void 0) : (g.lateBoundColumns = !0, void 0);
    }, g.buildColumns = function () {
      var e = g.config.columnDefs, t = [];
      if (e || (g.buildColumnDefsFromData(), e = g.config.columnDefs), g.config.showSelectionCheckbox && t.push(new ng.Column({
          colDef: {
            field: '\u2714',
            width: g.elementDims.rowSelectedCellW,
            sortable: !1,
            resizable: !1,
            groupable: !1,
            headerCellTemplate: c.get(o.gridId + 'checkboxHeaderTemplate.html'),
            cellTemplate: c.get(o.gridId + 'checkboxCellTemplate.html'),
            pinned: g.config.pinSelectionCheckbox
          },
          index: 0,
          headerRowHeight: g.config.headerRowHeight,
          sortCallback: g.sortData,
          resizeOnDataCallback: g.resizeOnData,
          enableResize: g.config.enableColumnResize,
          enableSort: g.config.enableSorting
        }, o, g, s, c, u)), e.length > 0) {
        var n = g.config.showSelectionCheckbox ? g.config.groups.length + 1 : g.config.groups.length;
        o.configGroups.length = 0, angular.forEach(e, function (e, i) {
          i += n;
          var r = new ng.Column({
              colDef: e,
              index: i,
              headerRowHeight: g.config.headerRowHeight,
              sortCallback: g.sortData,
              resizeOnDataCallback: g.resizeOnData,
              enableResize: g.config.enableColumnResize,
              enableSort: g.config.enableSorting,
              enablePinning: g.config.enablePinning,
              enableCellEdit: g.config.enableCellEdit
            }, o, g, s, c, u), a = g.config.groups.indexOf(e.field);
          -1 != a && (r.isGroupedBy = !0, o.configGroups.splice(a, 0, r), r.groupIndex = o.configGroups.length), t.push(r);
        }), o.columns = t;
      }
    }, g.configureColumnWidths = function () {
      var e = g.config.columnDefs, t = g.config.showSelectionCheckbox ? o.configGroups.length + 1 : o.configGroups.length, n = e.length + t, i = [], r = [], a = 0, l = 0;
      if (l += g.config.showSelectionCheckbox ? 25 : 0, angular.forEach(e, function (e, n) {
          n += t;
          var s = !1, c = void 0;
          if (u.isNullOrUndefined(e.width) ? e.width = '*' : (s = isNaN(e.width) ? u.endsWith(e.width, '%') : !1, c = s ? e.width : parseInt(e.width, 10)), isNaN(c)) {
            if (c = e.width, 'auto' == c) {
              o.columns[n].width = e.minWidth, l += o.columns[n].width;
              var h = o.columns[n];
              return d(function () {
                g.resizeOnData(h, !0);
              }), void 0;
            }
            if (-1 != c.indexOf('*'))
              return e.visible !== !1 && (a += c.length), e.index = n, i.push(e), void 0;
            if (s)
              return e.index = n, r.push(e), void 0;
            throw 'unable to parse column width, use percentage ("10%","20%", etc...) or "*" to use remaining width of grid';
          }
          e.visible !== !1 && (l += o.columns[n].width = parseInt(e.width, 10));
        }), i.length > 0) {
        g.config.maintainColumnRatios === !1 ? angular.noop() : g.config.maintainColumnRatios = !0;
        var c = g.rootDim.outerWidth - l, h = Math.floor(c / a);
        angular.forEach(i, function (e) {
          var t = e.width.length;
          if (o.columns[e.index].width = h * t, e.index + 1 == n) {
            var i = 2;
            g.maxCanvasHt > o.viewportDimHeight() && (i += s.ScrollW), o.columns[e.index].width -= i;
          }
          e.visible !== !1 && (l += o.columns[e.index].width);
        });
      }
      r.length > 0 && angular.forEach(r, function (e) {
        var t = e.width;
        o.columns[e.index].width = Math.floor(g.rootDim.outerWidth * (parseInt(t.slice(0, -1), 10) / 100));
      });
    }, g.init = function () {
      o.selectionProvider = new ng.selectionProvider(g, o), o.domAccessProvider = new ng.DomAccessProvider(g), g.rowFactory = new ng.RowFactory(g, o, s, c, u), g.searchProvider = new ng.SearchProvider(o, g, l), g.styleProvider = new ng.StyleProvider(o, g, s), o.$watch('configGroups', function (e) {
        var t = [];
        angular.forEach(e, function (e) {
          t.push(e.field || e);
        }), g.config.groups = t, g.rowFactory.filteredRowsChanged(), o.$emit('ngGridEventGroups', e);
      }, !0), o.$watch('columns', function (e) {
        s.BuildStyles(o, g, !0), o.$emit('ngGridEventColumns', e);
      }, !0), o.$watch(function () {
        return i.i18n;
      }, function (e) {
        u.seti18n(o, e);
      }), g.maxCanvasHt = g.calcMaxCanvasHeight(), g.config.sortInfo.fields && g.config.sortInfo.fields.length > 0 && (g.config.sortInfo.columns ? g.config.sortInfo.columns.length = 0 : g.config.sortInfo.columns = [], angular.forEach(o.columns, function (e) {
        return -1 != g.config.sortInfo.fields.indexOf(e.field) && g.config.sortInfo.columns.push(e), !1;
      }), g.sortData(g.config.sortInfo.columns, {}));
    }, g.resizeOnData = function (e) {
      var t = e.minWidth, n = u.getElementsByClassName('col' + e.index);
      angular.forEach(n, function (e, n) {
        var o;
        if (0 === n) {
          var i = $(e).find('.ngHeaderText');
          o = u.visualLength(i) + 10;
        } else {
          var r = $(e).find('.ngCellText');
          o = u.visualLength(r) + 10;
        }
        o > t && (t = o);
      }), e.width = e.longest = Math.min(e.maxWidth, t + 7), s.BuildStyles(o, g, !0);
    }, g.lastSortedColumns = [], g.changeRowOrder = function (e, t) {
      var n = g.rowCache.indexOf(e), i = g.rowCache.indexOf(t);
      g.rowCache.splice(n, 1), g.rowCache.splice(i, 0, e), o.$emit('ngGridEventChangeOrder', g.rowCache);
    }, g.sortData = function (e, t) {
      if (t.shiftKey && g.config.sortInfo) {
        var n = g.config.sortInfo.columns.indexOf(e);
        -1 === n ? (1 == g.config.sortInfo.columns.length && (g.config.sortInfo.columns[0].sortPriority = 1), g.config.sortInfo.columns.push(e), e.sortPriority = g.config.sortInfo.columns.length, g.config.sortInfo.fields.push(e.field), g.config.sortInfo.directions.push(e.sortDirection), g.lastSortedColumns.push(e)) : g.config.sortInfo.directions[n] = e.sortDirection;
      } else {
        var i = $.isArray(e);
        g.config.sortInfo.columns.length = 0, g.config.sortInfo.fields.length = 0, g.config.sortInfo.directions.length = 0;
        var s = function (e) {
          g.config.sortInfo.columns.push(e), g.config.sortInfo.fields.push(e.field), g.config.sortInfo.directions.push(e.sortDirection), g.lastSortedColumns.push(e);
        };
        i ? (g.clearSortingData(), angular.forEach(e, function (e, t) {
          e.sortPriority = t + 1, s(e);
        })) : (g.clearSortingData(e), e.sortPriority = void 0, s(e));
      }
      if (!g.config.useExternalSorting) {
        var a = g.data.slice(0);
        angular.forEach(a, function (e, t) {
          e.preSortSelected = g.rowCache[g.rowMap[t]].selected, e.preSortIndex = t;
        }), r.Sort(g.config.sortInfo, a), angular.forEach(a, function (e, t) {
          g.rowCache[t].entity = e, g.rowCache[t].selected = e.preSortSelected, g.rowMap[e.preSortIndex] = t, delete e.preSortSelected, delete e.preSortIndex;
        });
      }
      g.searchProvider.evalFilter(), o.$emit('ngGridEventSorted', g.config.sortInfo);
    }, g.clearSortingData = function (e) {
      e ? (angular.forEach(g.lastSortedColumns, function (t) {
        e.index != t.index && (t.sortDirection = '', t.sortPriority = null);
      }), g.lastSortedColumns[0] = e, g.lastSortedColumns.length = 1) : (angular.forEach(g.lastSortedColumns, function (e) {
        e.sortDirection = '', e.sortPriority = null;
      }), g.lastSortedColumns = []);
    }, g.fixColumnIndexes = function () {
      for (var e = 0; o.columns.length > e; e++)
        o.columns[e].visible !== !1 && (o.columns[e].index = e);
    }, g.fixGroupIndexes = function () {
      angular.forEach(o.configGroups, function (e, t) {
        e.groupIndex = t + 1;
      });
    }, o.elementsNeedMeasuring = !0, o.columns = [], o.renderedRows = [], o.renderedColumns = [], o.headerRow = null, o.rowHeight = g.config.rowHeight, o.jqueryUITheme = g.config.jqueryUITheme, o.showSelectionCheckbox = g.config.showSelectionCheckbox, o.enableCellSelection = g.config.enableCellSelection, o.footer = null, o.selectedItems = g.config.selectedItems, o.multiSelect = g.config.multiSelect, o.showFooter = g.config.showFooter, o.footerRowHeight = o.showFooter ? g.config.footerRowHeight : 0, o.showColumnMenu = g.config.showColumnMenu, o.showMenu = !1, o.configGroups = [], o.gridId = g.gridId, o.enablePaging = g.config.enablePaging, o.pagingOptions = g.config.pagingOptions, o.i18n = {}, u.seti18n(o, g.config.i18n), o.adjustScrollLeft = function (e) {
      for (var t = 0, n = 0, i = o.columns.length, r = [], a = !g.config.enableColumnHeavyVirt, l = 0, c = function (e) {
            a ? r.push(e) : o.renderedColumns[l] ? o.renderedColumns[l].setVars(e) : o.renderedColumns[l] = e.copy(), l++;
          }, u = 0; i > u; u++) {
        var d = o.columns[u];
        if (d.visible !== !1) {
          var h = d.width + t;
          if (d.pinned) {
            c(d);
            var p = u > 0 ? e + n : e;
            s.setColLeft(d, p, g), n += d.width;
          } else
            h >= e && e + g.rootDim.outerWidth >= t && c(d);
          t += d.width;
        }
      }
      a && (o.renderedColumns = r);
    }, g.prevScrollTop = 0, g.prevScrollIndex = 0, o.adjustScrollTop = function (e, i) {
      if (g.prevScrollTop !== e || i) {
        e > 0 && g.$viewport[0].scrollHeight - e <= g.$viewport.outerHeight() && o.$emit('ngGridEventScroll');
        var r, s = Math.floor(e / g.config.rowHeight);
        if (g.filteredRows.length > g.config.virtualizationThreshold) {
          if (e > g.prevScrollTop && g.prevScrollIndex + n > s)
            return;
          if (g.prevScrollTop > e && s > g.prevScrollIndex - n)
            return;
          r = new ng.Range(Math.max(0, s - t), s + g.minRowsToRender() + t);
        } else {
          var a = o.configGroups.length > 0 ? g.rowFactory.parsedData.length : g.data.length;
          r = new ng.Range(0, Math.max(a, g.minRowsToRender() + t));
        }
        g.prevScrollTop = e, g.rowFactory.UpdateViewableRange(r), g.prevScrollIndex = s;
      }
    }, o.toggleShowMenu = function () {
      o.showMenu = !o.showMenu;
    }, o.toggleSelectAll = function (e) {
      o.selectionProvider.toggleSelectAll(e);
    }, o.totalFilteredItemsLength = function () {
      return g.filteredRows.length;
    }, o.showGroupPanel = function () {
      return g.config.showGroupPanel;
    }, o.topPanelHeight = function () {
      return g.config.showGroupPanel === !0 ? g.config.headerRowHeight + 32 : g.config.headerRowHeight;
    }, o.viewportDimHeight = function () {
      return Math.max(0, g.rootDim.outerHeight - o.topPanelHeight() - o.footerRowHeight - 2);
    }, o.groupBy = function (e) {
      if (e.sortDirection || e.sort({ shiftKey: !1 }), !(1 > g.data.length) && e.groupable && e.field) {
        var t = o.configGroups.indexOf(e);
        -1 == t ? (e.isGroupedBy = !0, o.configGroups.push(e), e.groupIndex = o.configGroups.length) : o.removeGroup(t), g.$viewport.scrollTop(0), s.digest(o);
      }
    }, o.removeGroup = function (e) {
      var t = o.columns.filter(function (t) {
          return t.groupIndex == e + 1;
        })[0];
      t.isGroupedBy = !1, t.groupIndex = 0, o.columns[e].isAggCol && (o.columns.splice(e, 1), o.configGroups.splice(e, 1), g.fixGroupIndexes()), 0 === o.configGroups.length && (g.fixColumnIndexes(), s.digest(o)), o.adjustScrollLeft(0);
    }, o.togglePin = function (e) {
      for (var t = e.index, n = 0, i = 0; o.columns.length > i && o.columns[i].pinned; i++)
        n++;
      e.pinned && (n = Math.max(e.originalIndex, n - 1)), e.pinned = !e.pinned, o.columns.splice(t, 1), o.columns.splice(n, 0, e), g.fixColumnIndexes(), s.BuildStyles(o, g, !0), g.$viewport.scrollLeft(g.$viewport.scrollLeft() - e.width);
    }, o.totalRowWidth = function () {
      for (var e = 0, t = o.columns, n = 0; t.length > n; n++)
        t[n].visible !== !1 && (e += t[n].width);
      return e;
    }, o.headerScrollerDim = function () {
      var e = o.viewportDimHeight(), t = g.maxCanvasHt, n = t > e, i = new ng.Dimension();
      return i.autoFitHeight = !0, i.outerWidth = o.totalRowWidth(), n ? i.outerWidth += g.elementDims.scrollW : g.elementDims.scrollH >= t - e && (i.outerWidth += g.elementDims.scrollW), i;
    }, g.init();
  }, ng.Range = function (e, t) {
    this.topRow = e, this.bottomRow = t;
  }, ng.Row = function (e, t, n, o, i) {
    var r = this, s = t.enableRowSelection;
    r.jqueryUITheme = t.jqueryUITheme, r.rowClasses = t.rowClasses, r.entity = e, r.selectionProvider = n, r.selected = n.getSelection(e), r.cursor = s ? 'pointer' : 'default', r.setSelection = function (e) {
      r.selectionProvider.setSelection(r, e), r.selectionProvider.lastClickedRow = r;
    }, r.continueSelection = function (e) {
      r.selectionProvider.ChangeSelection(r, e);
    }, r.ensureEntity = function (e) {
      r.entity != e && (r.entity = e, r.selected = r.selectionProvider.getSelection(r.entity));
    }, r.toggleSelected = function (e) {
      if (!s && !t.enableCellSelection)
        return !0;
      var n = e.target || e;
      return 'checkbox' == n.type && 'ngSelectionCell ng-scope' != n.parentElement.className ? !0 : t.selectWithCheckboxOnly && 'checkbox' != n.type ? (r.selectionProvider.lastClickedRow = r, !0) : (r.beforeSelectionChange(r, e) && r.continueSelection(e), !1);
    }, r.rowIndex = o, r.offsetTop = r.rowIndex * t.rowHeight, r.rowDisplayIndex = 0, r.alternatingRowClass = function () {
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
      return r.clone = new ng.Row(e, t, n, o, i), r.clone.isClone = !0, r.clone.elm = r.elm, r.clone;
    }, r.setVars = function (e) {
      e.clone = r, r.entity = e.entity, r.selected = e.selected;
    };
  }, ng.RowFactory = function (e, n, o, i, c) {
    var u = this;
    u.aggCache = {}, u.parentCache = [], u.dataChanged = !0, u.parsedData = [], u.rowConfig = {}, u.selectionProvider = n.selectionProvider, u.rowHeight = 30, u.numberOfAggregates = 0, u.groupedData = void 0, u.rowHeight = e.config.rowHeight, u.rowConfig = {
      enableRowSelection: e.config.enableRowSelection,
      rowClasses: e.config.rowClasses,
      selectedItems: n.selectedItems,
      selectWithCheckboxOnly: e.config.selectWithCheckboxOnly,
      beforeSelectionChangeCallback: e.config.beforeSelectionChange,
      afterSelectionChangeCallback: e.config.afterSelectionChange,
      jqueryUITheme: e.config.jqueryUITheme,
      enableCellSelection: e.config.enableCellSelection,
      rowHeight: e.config.rowHeight
    }, u.renderedRange = new ng.Range(0, e.minRowsToRender() + t), u.buildEntityRow = function (e, t) {
      return new ng.Row(e, u.rowConfig, u.selectionProvider, t, c);
    }, u.buildAggregateRow = function (e, t) {
      var n = u.aggCache[e.aggIndex];
      return n || (n = new ng.Aggregate(e, u, u.rowConfig.rowHeight), u.aggCache[e.aggIndex] = n), n.rowIndex = t, n.offsetTop = t * u.rowConfig.rowHeight, n;
    }, u.UpdateViewableRange = function (e) {
      u.renderedRange = e, u.renderedChange();
    }, u.filteredRowsChanged = function () {
      e.lateBoundColumns && e.filteredRows.length > 0 && (e.config.columnDefs = void 0, e.buildColumns(), e.lateBoundColumns = !1, n.$evalAsync(function () {
        n.adjustScrollLeft(0);
      })), u.dataChanged = !0, e.config.groups.length > 0 && u.getGrouping(e.config.groups), u.UpdateViewableRange(u.renderedRange);
    }, u.renderedChange = function () {
      if (!u.groupedData || 1 > e.config.groups.length)
        return u.renderedChangeNoGroups(), e.refreshDomSizes(), void 0;
      u.wasGrouped = !0, u.parentCache = [];
      var t = 0, n = u.parsedData.filter(function (e) {
          return e.isAggRow ? e.parent && e.parent.collapsed ? !1 : !0 : (e[a] || (e.rowIndex = t++), !e[a]);
        });
      u.totalRows = n.length;
      for (var o = [], i = u.renderedRange.topRow; u.renderedRange.bottomRow > i; i++)
        n[i] && (n[i].offsetTop = i * e.config.rowHeight, o.push(n[i]));
      e.setRenderedRows(o);
    }, u.renderedChangeNoGroups = function () {
      for (var t = [], n = u.renderedRange.topRow; u.renderedRange.bottomRow > n; n++)
        e.filteredRows[n] && (e.filteredRows[n].rowIndex = n, e.filteredRows[n].offsetTop = n * e.config.rowHeight, t.push(e.filteredRows[n]));
      e.setRenderedRows(t);
    }, u.fixRowCache = function () {
      var t = e.data.length, n = t - e.rowCache.length;
      if (0 > n)
        e.rowCache.length = e.rowMap.length = t;
      else
        for (var o = e.rowCache.length; t > o; o++)
          e.rowCache[o] = e.rowFactory.buildEntityRow(e.data[o], o);
    }, u.parseGroupData = function (e) {
      if (e.values)
        for (var t = 0; e.values.length > t; t++)
          u.parentCache[u.parentCache.length - 1].children.push(e.values[t]), u.parsedData.push(e.values[t]);
      else
        for (var n in e)
          if (n != r && n != s && n != l && e.hasOwnProperty(n)) {
            var o = u.buildAggregateRow({
                gField: e[r],
                gLabel: n,
                gDepth: e[s],
                isAggRow: !0,
                _ng_hidden_: !1,
                children: [],
                aggChildren: [],
                aggIndex: u.numberOfAggregates,
                aggLabelFilter: e[l].aggLabelFilter
              }, 0);
            u.numberOfAggregates++, o.parent = u.parentCache[o.depth - 1], o.parent && (o.parent.collapsed = !1, o.parent.aggChildren.push(o)), u.parsedData.push(o), u.parentCache[o.depth] = o, u.parseGroupData(e[n]);
          }
    }, u.getGrouping = function (t) {
      u.aggCache = [], u.numberOfAggregates = 0, u.groupedData = {};
      for (var d = e.filteredRows, h = t.length, p = n.columns, g = 0; d.length > g; g++) {
        var f = d[g].entity;
        if (!f)
          return;
        d[g][a] = !0;
        for (var m = u.groupedData, v = 0; t.length > v; v++) {
          var y = t[v], b = p.filter(function (e) {
              return e.field == y;
            })[0], w = c.evalProperty(f, y);
          w = w ? '' + w : 'null', m[w] || (m[w] = {}), m[r] || (m[r] = y), m[s] || (m[s] = v), m[l] || (m[l] = b), m = m[w];
        }
        m.values || (m.values = []), m.values.push(d[g]);
      }
      for (var C = 0; t.length > C; C++)
        !p[C].isAggCol && h >= C && p.splice(0, 0, new ng.Column({
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
        }, n, e, o, i, c));
      o.BuildStyles(n, e, !0), e.fixColumnIndexes(), n.adjustScrollLeft(0), u.parsedData.length = 0, u.parseGroupData(u.groupedData), u.fixRowCache();
    }, e.config.groups.length > 0 && e.filteredRows.length > 0 && u.getGrouping(e.config.groups);
  }, ng.SearchProvider = function (e, t, n) {
    var o = this, i = [];
    o.extFilter = t.config.filterOptions.useExternalFilter, e.showFilter = t.config.showFilter, e.filterText = '', o.fieldMap = {}, o.evalFilter = function () {
      var e = function (e) {
        for (var t = 0, s = i.length; s > t; t++) {
          var a, l = i[t];
          if (!l.column) {
            for (var c in e)
              if (e.hasOwnProperty(c)) {
                var u = o.fieldMap[c];
                if (!u)
                  continue;
                var d = null, h = null;
                u && u.cellFilter && (h = u.cellFilter.split(':'), d = n(h[0]));
                var p = e[c];
                if (null != p) {
                  if ('function' == typeof d) {
                    var g = '' + d('object' == typeof p ? r(p, u.field) : p, h[1]);
                    a = l.regex.test(g);
                  } else
                    a = l.regex.test('object' == typeof p ? '' + r(p, u.field) : '' + p);
                  if (p && a)
                    return !0;
                }
              }
            return !1;
          }
          var f = o.fieldMap[l.columnDisplay];
          if (!f)
            return !1;
          var m = f.cellFilter.split(':'), v = f.cellFilter ? n(m[0]) : null, y = e[l.column] || e[f.field.split('.')[0]];
          if (null == y)
            return !1;
          if ('function' == typeof v) {
            var b = '' + v('object' == typeof y ? r(y, f.field) : y, m[1]);
            a = l.regex.test(b);
          } else
            a = l.regex.test('object' == typeof y ? '' + r(y, f.field) : '' + y);
          if (!y || !a)
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
        var n = t.split('.'), o = e;
        if (n.length > 1) {
          for (var i = 1, r = n.length; r > i; i++)
            if (o = o[n[i]], !o)
              return e;
          return o;
        }
        return e;
      }, s = function (e, t) {
        try {
          return RegExp(e, t);
        } catch (n) {
          return RegExp(e.replace(/(\^|\$|\(|\)|\<|\>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, '\\$1'));
        }
      }, a = function (e) {
        i = [];
        var t;
        if (t = $.trim(e))
          for (var n = t.split(';'), o = 0; n.length > o; o++) {
            var r = n[o].split(':');
            if (r.length > 1) {
              var a = $.trim(r[0]), l = $.trim(r[1]);
              a && l && i.push({
                column: a,
                columnDisplay: a.replace(/\s+/g, '').toLowerCase(),
                regex: s(l, 'i')
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
      o.extFilter || (e.$emit('ngGridEventFilter', t), a(t), o.evalFilter());
    }), o.extFilter || e.$watch('columns', function (e) {
      for (var t = 0; e.length > t; t++) {
        var n = e[t];
        n.field && (o.fieldMap[n.field.split('.')[0]] = n), n.displayName && (o.fieldMap[n.displayName.toLowerCase().replace(/\s+/g, '')] = n);
      }
    });
  }, ng.selectionProvider = function (e, t) {
    var n = this;
    n.multi = e.config.multiSelect, n.selectedItems = e.config.selectedItems, n.selectedIndex = e.config.selectedIndex, n.lastClickedRow = void 0, n.ignoreSelectedItemChanges = !1, n.ChangeSelection = function (o, i) {
      var r = o.isClone ? e.filteredRows[o.rowIndex] : o;
      if (i && i.shiftKey && !i.keyCode && n.multi && e.config.enableRowSelection) {
        if (n.lastClickedRow) {
          var s;
          s = t.configGroups.length > 0 ? e.rowFactory.parsedData.filter(function (e) {
            return !e.isAggRow;
          }) : e.filteredRows;
          var a = r.rowIndex, l = n.lastClickedRow.rowIndex;
          if (n.lastClickedRow = r, a == l)
            return !1;
          l > a ? (a ^= l, l = a ^ l, a ^= l, a--) : l++;
          for (var c = []; a >= l; l++)
            c.push(s[l]);
          if (c[c.length - 1].beforeSelectionChange(c, i)) {
            for (var u = 0; c.length > u; u++) {
              var d = c[u], h = d.selected;
              d.selected = !h, d.clone && (d.clone.selected = d.selected);
              var p = n.selectedItems.indexOf(d.entity);
              -1 === p ? n.selectedItems.push(d.entity) : n.selectedItems.splice(p, 1);
            }
            c[c.length - 1].afterSelectionChange(c, i);
          }
          return !0;
        }
      } else
        n.multi ? i.keyCode || n.setSelection(r, !r.selected) : n.lastClickedRow == r ? n.setSelection(n.lastClickedRow, e.config.keepLastSelected ? !0 : !r.selected) : (n.lastClickedRow && n.setSelection(n.lastClickedRow, !1), n.setSelection(r, !r.selected));
      return n.lastClickedRow = r, !0;
    }, n.getSelection = function (e) {
      return -1 !== n.selectedItems.indexOf(e);
    }, n.setSelection = function (t, o) {
      var i = t.isClone ? e.filteredRows[t.rowIndex] : t;
      if (e.config.enableRowSelection) {
        if (i.selected = o, i.clone && (i.clone.selected = o), o)
          -1 === n.selectedItems.indexOf(i.entity) && (!n.multi && n.selectedItems.length > 0 && (n.toggleSelectAll(!1, !0), i.selected = o, i.clone && (i.clone.selected = o)), n.selectedItems.push(i.entity));
        else {
          var r = n.selectedItems.indexOf(i.entity);
          -1 != r && n.selectedItems.splice(r, 1);
        }
        i.afterSelectionChange(i);
      }
    }, n.toggleSelectAll = function (t, o) {
      if (o || e.config.beforeSelectionChange(e.filteredRows)) {
        var i = n.selectedItems.length;
        i > 0 && (n.selectedItems.length = 0);
        for (var r = 0; e.filteredRows.length > r; r++)
          e.filteredRows[r].selected = t, e.filteredRows[r].clone && (e.filteredRows[r].clone.selected = t), t && n.selectedItems.push(e.filteredRows[r].entity);
        o || e.config.afterSelectionChange(e.filteredRows);
      }
    };
  }, ng.StyleProvider = function (e, t, n) {
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
        width: t.rootDim.outerWidth - n.ScrollW + 'px',
        height: t.config.headerRowHeight + 'px'
      };
    }, e.groupPanelStyle = function () {
      return {
        width: t.rootDim.outerWidth - n.ScrollW + 'px',
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
  }, f.directive('ngCellHasFocus', [
    '$domUtilityService',
    function (e) {
      var t = function (t, n) {
        t.isFocused = !0, e.digest(t);
        var o = angular.element(n[0].children).filter(function () {
            return 8 != this.nodeType;
          }), i = angular.element(o[0].children[0]);
        i.length > 0 && (angular.element(i).focus(), t.domAccessProvider.selectInputElement(i[0]), angular.element(i).bind('blur', function () {
          return t.isFocused = !1, e.digest(t), !0;
        }));
      };
      return function (e, n) {
        var o = !1;
        e.editCell = function () {
          setTimeout(function () {
            t(e, n);
          }, 0);
        }, n.bind('mousedown', function () {
          return n.focus(), !0;
        }), n.bind('focus', function () {
          return o = !0, !0;
        }), n.bind('blur', function () {
          return o = !1, !0;
        }), n.bind('keydown', function (i) {
          return o && 37 != i.keyCode && 38 != i.keyCode && 39 != i.keyCode && 40 != i.keyCode && 9 != i.keyCode && !i.shiftKey && 13 != i.keyCode && t(e, n), 27 == i.keyCode && n.focus(), !0;
        });
      };
    }
  ]), f.directive('ngCellText', function () {
    return function (e, t) {
      t.bind('mouseover', function (e) {
        e.preventDefault(), t.css({ cursor: 'text' });
      }), t.bind('mouseleave', function (e) {
        e.preventDefault(), t.css({ cursor: 'default' });
      });
    };
  }), f.directive('ngCell', [
    '$compile',
    '$domUtilityService',
    function (e, t) {
      var n = {
          scope: !1,
          compile: function () {
            return {
              pre: function (t, n) {
                var o, i = t.col.cellTemplate.replace(u, '$eval(\'row.entity.\' + col.field)');
                t.col.enableCellEdit ? (o = t.col.cellEditTemplate, o = o.replace(d, i), o = o.replace(h, t.col.editableCellTemplate.replace(u, 'col.field'))) : o = i;
                var r = e(o)(t);
                t.enableCellSelection && -1 == r[0].className.indexOf('ngSelectionCell') && (r[0].setAttribute('tabindex', 0), r.addClass('ngCellElement')), n.append(r);
              },
              post: function (e, n) {
                e.enableCellSelection && e.domAccessProvider.selectionHandlers(e, n), e.$on('ngGridEventDigestCell', function () {
                  t.digest(e);
                });
              }
            };
          }
        };
      return n;
    }
  ]), f.directive('ngGrid', [
    '$compile',
    '$filter',
    '$templateCache',
    '$sortService',
    '$domUtilityService',
    '$utilityService',
    '$timeout',
    function (e, t, n, o, i, r, s) {
      var a = {
          scope: !0,
          compile: function () {
            return {
              pre: function (a, l, c) {
                var u = $(l), d = a.$eval(c.ngGrid);
                d.gridDim = new ng.Dimension({
                  outerHeight: $(u).height(),
                  outerWidth: $(u).width()
                });
                var h = new ng.Grid(a, d, o, i, t, n, r, s);
                if ('string' == typeof d.columnDefs ? a.$parent.$watch(d.columnDefs, function (e) {
                    return e ? (a.columns = [], h.config.columnDefs = e, h.buildColumns(), h.configureColumnWidths(), h.eventProvider.assignEvents(), i.RebuildGrid(a, h), void 0) : (h.refreshDomSizes(), h.buildColumns(), void 0);
                  }) : h.buildColumns(), 'string' == typeof d.data) {
                  var p = function (e) {
                    h.data = $.extend([], e), h.rowFactory.fixRowCache(), angular.forEach(h.data, function (e, t) {
                      var n = h.rowMap[t] || t;
                      h.rowCache[n] && h.rowCache[n].ensureEntity(e), h.rowMap[n] = t;
                    }), h.searchProvider.evalFilter(), h.configureColumnWidths(), h.refreshDomSizes(), h.config.sortInfo.fields.length > 0 && o.sortData(h.config.sortInfo, h.data.slice(0)), a.$emit('ngGridEventData', h.gridId);
                  };
                  a.$parent.$watch(d.data, p), a.$parent.$watch(d.data + '.length', function () {
                    p(a.$eval(d.data));
                  });
                }
                return h.footerController = new ng.Footer(a, h), l.addClass('ngGrid').addClass('' + h.gridId), d.jqueryUITheme && l.addClass('ui-widget'), l.append(e(n.get('gridTemplate.html'))(a)), i.AssignGridContainers(a, l, h), h.eventProvider = new ng.EventProvider(h, a, i), angular.forEach(d.plugins, function (e) {
                  'function' == typeof e ? e.call(this, []).init(a.$new(), h, {
                    SortService: o,
                    DomUtilityService: i
                  }) : e.init(a.$new(), h, {
                    SortService: o,
                    DomUtilityService: i
                  });
                }), d.selectRow = function (e, t) {
                  h.rowCache[e] && h.rowCache[e].setSelection(t ? !0 : !1);
                }, d.selectItem = function (e, t) {
                  d.selectRow(h.rowMap[e], t);
                }, d.selectAll = function (e) {
                  a.toggleSelectAll(e);
                }, d.groupBy = function (e) {
                  if (e)
                    a.groupBy(a.columns.filter(function (t) {
                      return t.field == e;
                    })[0]);
                  else {
                    var t = $.extend(!0, [], a.configGroups);
                    angular.forEach(t, a.groupBy);
                  }
                }, d.sortBy = function (e) {
                  var t = a.columns.filter(function (t) {
                      return t.field == e;
                    })[0];
                  t && t.sort();
                }, d.gridId = h.gridId, d.ngGrid = h, d.$gridScope = a, a.$on('ngGridEventDigestGrid', function () {
                  i.digest(a.$parent);
                }), a.$on('ngGridEventDigestGridParent', function () {
                  i.digest(a.$parent);
                }), a.$evalAsync(function () {
                  a.adjustScrollLeft(0);
                }), null;
              }
            };
          }
        };
      return a;
    }
  ]), f.directive('ngHeaderCell', [
    '$compile',
    function (e) {
      var t = {
          scope: !1,
          compile: function () {
            return {
              pre: function (t, n) {
                n.append(e(t.col.headerCellTemplate)(t));
              }
            };
          }
        };
      return t;
    }
  ]), f.directive('ngHeaderRow', [
    '$compile',
    '$templateCache',
    function (e, t) {
      var n = {
          scope: !1,
          compile: function () {
            return {
              pre: function (n, o) {
                0 === o.children().length && o.append(e(t.get(n.gridId + 'headerRowTemplate.html'))(n));
              }
            };
          }
        };
      return n;
    }
  ]), f.directive('ngIf', [function () {
      return {
        transclude: 'element',
        priority: 1000,
        terminal: !0,
        restrict: 'A',
        compile: function (e, t, n) {
          return function (e, t, o) {
            var i, r;
            e.$watch(o.ngIf, function (o) {
              i && (i.remove(), i = void 0), r && (r.$destroy(), r = void 0), o && (r = e.$new(), n(r, function (e) {
                i = e, t.after(e);
              }));
            });
          };
        }
      };
    }]), f.directive('ngInput', [
    '$parse',
    function (e) {
      return function (t, n, o) {
        var i = e(t.$eval(o.ngInput)), r = i.assign, s = i(t.row.entity);
        n.val(s), n.bind('keyup', function () {
          var e = n.val();
          t.$root.$$phase || t.$apply(function () {
            r(t.row.entity, e);
          });
        }), n.bind('keydown', function (e) {
          switch (e.keyCode) {
          case 37:
          case 38:
          case 39:
          case 40:
            e.stopPropagation();
            break;
          case 27:
            t.$root.$$phase || t.$apply(function () {
              r(t.row.entity, s), n.val(s), n.blur();
            });
          default:
          }
          return !0;
        });
      };
    }
  ]), f.directive('ngRow', [
    '$compile',
    '$domUtilityService',
    '$templateCache',
    function (e, t, n) {
      var o = {
          scope: !1,
          compile: function () {
            return {
              pre: function (o, i) {
                if (o.row.elm = i, o.row.clone && (o.row.clone.elm = i), o.row.isAggRow) {
                  var r = n.get(o.gridId + 'aggregateTemplate.html');
                  r = o.row.aggLabelFilter ? r.replace(c, '| ' + o.row.aggLabelFilter) : r.replace(c, ''), i.append(e(r)(o));
                } else
                  i.append(e(n.get(o.gridId + 'rowTemplate.html'))(o));
                o.$on('ngGridEventDigestRow', function () {
                  t.digest(o);
                });
              }
            };
          }
        };
      return o;
    }
  ]), f.directive('ngViewport', [function () {
      return function (e, t) {
        var n, o, i = 0;
        t.bind('scroll', function (t) {
          var r = t.target.scrollLeft, s = t.target.scrollTop;
          return e.$headerContainer && e.$headerContainer.scrollLeft(r), e.adjustScrollLeft(r), e.adjustScrollTop(s), e.$root.$$phase || e.$digest(), o = r, i = i, n = !1, !0;
        }), t.bind('mousewheel DOMMouseScroll', function () {
          return n = !0, t.focus(), !0;
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
}(window), function (e) {
  var t = '0.9.2', n = {
      isMsie: function () {
        var e = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
        return e ? parseInt(e[2], 10) : !1;
      },
      isBlankString: function (e) {
        return !e || /^\s*$/.test(e);
      },
      escapeRegExChars: function (e) {
        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      },
      isString: function (e) {
        return 'string' == typeof e;
      },
      isNumber: function (e) {
        return 'number' == typeof e;
      },
      isArray: e.isArray,
      isFunction: e.isFunction,
      isObject: e.isPlainObject,
      isUndefined: function (e) {
        return void 0 === e;
      },
      bind: e.proxy,
      bindAll: function (t) {
        var n;
        for (var o in t)
          e.isFunction(n = t[o]) && (t[o] = e.proxy(n, t));
      },
      indexOf: function (e, t) {
        for (var n = 0; e.length > n; n++)
          if (e[n] === t)
            return n;
        return -1;
      },
      each: e.each,
      map: e.map,
      filter: e.grep,
      every: function (t, n) {
        var o = !0;
        return t ? (e.each(t, function (e, i) {
          return (o = n.call(null, i, e, t)) ? void 0 : !1;
        }), !!o) : o;
      },
      some: function (t, n) {
        var o = !1;
        return t ? (e.each(t, function (e, i) {
          return (o = n.call(null, i, e, t)) ? !1 : void 0;
        }), !!o) : o;
      },
      mixin: e.extend,
      getUniqueId: function () {
        var e = 0;
        return function () {
          return e++;
        };
      }(),
      defer: function (e) {
        setTimeout(e, 0);
      },
      debounce: function (e, t, n) {
        var o, i;
        return function () {
          var r, s, a = this, l = arguments;
          return r = function () {
            o = null, n || (i = e.apply(a, l));
          }, s = n && !o, clearTimeout(o), o = setTimeout(r, t), s && (i = e.apply(a, l)), i;
        };
      },
      throttle: function (e, t) {
        var n, o, i, r, s, a;
        return s = 0, a = function () {
          s = new Date(), i = null, r = e.apply(n, o);
        }, function () {
          var l = new Date(), c = t - (l - s);
          return n = this, o = arguments, 0 >= c ? (clearTimeout(i), i = null, s = l, r = e.apply(n, o)) : i || (i = setTimeout(a, c)), r;
        };
      },
      tokenizeQuery: function (t) {
        return e.trim(t).toLowerCase().split(/[\s]+/);
      },
      tokenizeText: function (t) {
        return e.trim(t).toLowerCase().split(/[\s\-_]+/);
      },
      getProtocol: function () {
        return location.protocol;
      },
      noop: function () {
      }
    }, o = function () {
      var e = /\s+/;
      return {
        on: function (t, n) {
          var o;
          if (!n)
            return this;
          for (this._callbacks = this._callbacks || {}, t = t.split(e); o = t.shift();)
            this._callbacks[o] = this._callbacks[o] || [], this._callbacks[o].push(n);
          return this;
        },
        trigger: function (t, n) {
          var o, i;
          if (!this._callbacks)
            return this;
          for (t = t.split(e); o = t.shift();)
            if (i = this._callbacks[o])
              for (var r = 0; i.length > r; r += 1)
                i[r].call(this, {
                  type: o,
                  data: n
                });
          return this;
        }
      };
    }(), i = function () {
      function t(t) {
        t && t.el || e.error('EventBus initialized without el'), this.$el = e(t.el);
      }
      var o = 'typeahead:';
      return n.mixin(t.prototype, {
        trigger: function (e) {
          var t = [].slice.call(arguments, 1);
          this.$el.trigger(o + e, t);
        }
      }), t;
    }(), r = function () {
      function e(e) {
        this.prefix = [
          '__',
          e,
          '__'
        ].join(''), this.ttlKey = '__ttl__', this.keyMatcher = RegExp('^' + this.prefix);
      }
      function t() {
        return new Date().getTime();
      }
      function o(e) {
        return JSON.stringify(n.isUndefined(e) ? null : e);
      }
      function i(e) {
        return JSON.parse(e);
      }
      var r, s;
      try {
        r = window.localStorage;
      } catch (a) {
        r = null;
      }
      return s = r && window.JSON ? {
        _prefix: function (e) {
          return this.prefix + e;
        },
        _ttlKey: function (e) {
          return this._prefix(e) + this.ttlKey;
        },
        get: function (e) {
          return this.isExpired(e) && this.remove(e), i(r.getItem(this._prefix(e)));
        },
        set: function (e, i, s) {
          return n.isNumber(s) ? r.setItem(this._ttlKey(e), o(t() + s)) : r.removeItem(this._ttlKey(e)), r.setItem(this._prefix(e), o(i));
        },
        remove: function (e) {
          return r.removeItem(this._ttlKey(e)), r.removeItem(this._prefix(e)), this;
        },
        clear: function () {
          var e, t, n = [], o = r.length;
          for (e = 0; o > e; e++)
            (t = r.key(e)).match(this.keyMatcher) && n.push(t.replace(this.keyMatcher, ''));
          for (e = n.length; e--;)
            this.remove(n[e]);
          return this;
        },
        isExpired: function (e) {
          var o = i(r.getItem(this._ttlKey(e)));
          return n.isNumber(o) && t() > o ? !0 : !1;
        }
      } : {
        get: n.noop,
        set: n.noop,
        remove: n.noop,
        clear: n.noop,
        isExpired: n.noop
      }, n.mixin(e.prototype, s), e;
    }(), s = function () {
      function e(e) {
        n.bindAll(this), e = e || {}, this.sizeLimit = e.sizeLimit || 10, this.cache = {}, this.cachedKeysByAge = [];
      }
      return n.mixin(e.prototype, {
        get: function (e) {
          return this.cache[e];
        },
        set: function (e, t) {
          var n;
          this.cachedKeysByAge.length === this.sizeLimit && (n = this.cachedKeysByAge.shift(), delete this.cache[n]), this.cache[e] = t, this.cachedKeysByAge.push(e);
        }
      }), e;
    }(), a = function () {
      function t(e) {
        n.bindAll(this), e = n.isString(e) ? { url: e } : e, l = l || new s(), a = n.isNumber(e.maxParallelRequests) ? e.maxParallelRequests : a || 6, this.url = e.url, this.wildcard = e.wildcard || '%QUERY', this.filter = e.filter, this.replace = e.replace, this.ajaxSettings = {
          type: 'get',
          cache: e.cache,
          timeout: e.timeout,
          dataType: e.dataType || 'json',
          beforeSend: e.beforeSend
        }, this._get = (/^throttle$/i.test(e.rateLimitFn) ? n.throttle : n.debounce)(this._get, e.rateLimitWait || 300);
      }
      function o() {
        c++;
      }
      function i() {
        c--;
      }
      function r() {
        return a > c;
      }
      var a, l, c = 0, u = {};
      return n.mixin(t.prototype, {
        _get: function (e, t) {
          function n(n) {
            var i = o.filter ? o.filter(n) : n;
            t && t(i), l.set(e, n);
          }
          var o = this;
          r() ? this._sendRequest(e).done(n) : this.onDeckRequestArgs = [].slice.call(arguments, 0);
        },
        _sendRequest: function (t) {
          function n() {
            i(), u[t] = null, r.onDeckRequestArgs && (r._get.apply(r, r.onDeckRequestArgs), r.onDeckRequestArgs = null);
          }
          var r = this, s = u[t];
          return s || (o(), s = u[t] = e.ajax(t, this.ajaxSettings).always(n)), s;
        },
        get: function (e, t) {
          var o, i, r = this, s = encodeURIComponent(e || '');
          return t = t || n.noop, o = this.replace ? this.replace(this.url, s) : this.url.replace(this.wildcard, s), (i = l.get(o)) ? n.defer(function () {
            t(r.filter ? r.filter(i) : i);
          }) : this._get(o, t), !!i;
        }
      }), t;
    }(), l = function () {
      function o(t) {
        n.bindAll(this), n.isString(t.template) && !t.engine && e.error('no template engine specified'), t.local || t.prefetch || t.remote || e.error('one of local, prefetch, or remote is required'), this.name = t.name || n.getUniqueId(), this.limit = t.limit || 5, this.minLength = t.minLength || 1, this.header = t.header, this.footer = t.footer, this.valueKey = t.valueKey || 'value', this.template = i(t.template, t.engine, this.valueKey), this.local = t.local, this.prefetch = t.prefetch, this.remote = t.remote, this.itemHash = {}, this.adjacencyList = {}, this.storage = t.name ? new r(t.name) : null;
      }
      function i(e, t, o) {
        var i, r;
        return n.isFunction(e) ? i = e : n.isString(e) ? (r = t.compile(e), i = n.bind(r.render, r)) : i = function (e) {
          return '<p>' + e[o] + '</p>';
        }, i;
      }
      var s = {
          thumbprint: 'thumbprint',
          protocol: 'protocol',
          itemHash: 'itemHash',
          adjacencyList: 'adjacencyList'
        };
      return n.mixin(o.prototype, {
        _processLocalData: function (e) {
          this._mergeProcessedData(this._processData(e));
        },
        _loadPrefetchData: function (o) {
          function i(e) {
            var t = o.filter ? o.filter(e) : e, i = h._processData(t), r = i.itemHash, a = i.adjacencyList;
            h.storage && (h.storage.set(s.itemHash, r, o.ttl), h.storage.set(s.adjacencyList, a, o.ttl), h.storage.set(s.thumbprint, p, o.ttl), h.storage.set(s.protocol, n.getProtocol(), o.ttl)), h._mergeProcessedData(i);
          }
          var r, a, l, c, u, d, h = this, p = t + (o.thumbprint || '');
          return this.storage && (r = this.storage.get(s.thumbprint), a = this.storage.get(s.protocol), l = this.storage.get(s.itemHash), c = this.storage.get(s.adjacencyList)), u = r !== p || a !== n.getProtocol(), o = n.isString(o) ? { url: o } : o, o.ttl = n.isNumber(o.ttl) ? o.ttl : 86400000, l && c && !u ? (this._mergeProcessedData({
            itemHash: l,
            adjacencyList: c
          }), d = e.Deferred().resolve()) : d = e.getJSON(o.url).done(i), d;
        },
        _transformDatum: function (e) {
          var t = n.isString(e) ? e : e[this.valueKey], o = e.tokens || n.tokenizeText(t), i = {
              value: t,
              tokens: o
            };
          return n.isString(e) ? (i.datum = {}, i.datum[this.valueKey] = e) : i.datum = e, i.tokens = n.filter(i.tokens, function (e) {
            return !n.isBlankString(e);
          }), i.tokens = n.map(i.tokens, function (e) {
            return e.toLowerCase();
          }), i;
        },
        _processData: function (e) {
          var t = this, o = {}, i = {};
          return n.each(e, function (e, r) {
            var s = t._transformDatum(r), a = n.getUniqueId(s.value);
            o[a] = s, n.each(s.tokens, function (e, t) {
              var o = t.charAt(0), r = i[o] || (i[o] = [a]);
              !~n.indexOf(r, a) && r.push(a);
            });
          }), {
            itemHash: o,
            adjacencyList: i
          };
        },
        _mergeProcessedData: function (e) {
          var t = this;
          n.mixin(this.itemHash, e.itemHash), n.each(e.adjacencyList, function (e, n) {
            var o = t.adjacencyList[e];
            t.adjacencyList[e] = o ? o.concat(n) : n;
          });
        },
        _getLocalSuggestions: function (e) {
          var t, o = this, i = [], r = [], s = [];
          return n.each(e, function (e, t) {
            var o = t.charAt(0);
            !~n.indexOf(i, o) && i.push(o);
          }), n.each(i, function (e, n) {
            var i = o.adjacencyList[n];
            return i ? (r.push(i), (!t || i.length < t.length) && (t = i), void 0) : !1;
          }), r.length < i.length ? [] : (n.each(t, function (t, i) {
            var a, l, c = o.itemHash[i];
            a = n.every(r, function (e) {
              return ~n.indexOf(e, i);
            }), l = a && n.every(e, function (e) {
              return n.some(c.tokens, function (t) {
                return 0 === t.indexOf(e);
              });
            }), l && s.push(c);
          }), s);
        },
        initialize: function () {
          var t;
          return this.local && this._processLocalData(this.local), this.transport = this.remote ? new a(this.remote) : null, t = this.prefetch ? this._loadPrefetchData(this.prefetch) : e.Deferred().resolve(), this.local = this.prefetch = this.remote = null, this.initialize = function () {
            return t;
          }, t;
        },
        getSuggestions: function (e, t) {
          function o(e) {
            r = r.slice(0), n.each(e, function (e, t) {
              var o, i = s._transformDatum(t);
              return o = n.some(r, function (e) {
                return i.value === e.value;
              }), !o && r.push(i), r.length < s.limit;
            }), t && t(r);
          }
          var i, r, s = this, a = !1;
          e.length < this.minLength || (i = n.tokenizeQuery(e), r = this._getLocalSuggestions(i).slice(0, this.limit), r.length < this.limit && this.transport && (a = this.transport.get(e, o)), !a && t && t(r));
        }
      }), o;
    }(), c = function () {
      function t(t) {
        var o = this;
        n.bindAll(this), this.specialKeyCodeMap = {
          9: 'tab',
          27: 'esc',
          37: 'left',
          39: 'right',
          13: 'enter',
          38: 'up',
          40: 'down'
        }, this.$hint = e(t.hint), this.$input = e(t.input).on('blur.tt', this._handleBlur).on('focus.tt', this._handleFocus).on('keydown.tt', this._handleSpecialKeyEvent), n.isMsie() ? this.$input.on('keydown.tt keypress.tt cut.tt paste.tt', function (e) {
          o.specialKeyCodeMap[e.which || e.keyCode] || n.defer(o._compareQueryToInputValue);
        }) : this.$input.on('input.tt', this._compareQueryToInputValue), this.query = this.$input.val(), this.$overflowHelper = i(this.$input);
      }
      function i(t) {
        return e('<span></span>').css({
          position: 'absolute',
          left: '-9999px',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontFamily: t.css('font-family'),
          fontSize: t.css('font-size'),
          fontStyle: t.css('font-style'),
          fontVariant: t.css('font-variant'),
          fontWeight: t.css('font-weight'),
          wordSpacing: t.css('word-spacing'),
          letterSpacing: t.css('letter-spacing'),
          textIndent: t.css('text-indent'),
          textRendering: t.css('text-rendering'),
          textTransform: t.css('text-transform')
        }).insertAfter(t);
      }
      function r(e, t) {
        return e = (e || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' '), t = (t || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' '), e === t;
      }
      return n.mixin(t.prototype, o, {
        _handleFocus: function () {
          this.trigger('focused');
        },
        _handleBlur: function () {
          this.trigger('blured');
        },
        _handleSpecialKeyEvent: function (e) {
          var t = this.specialKeyCodeMap[e.which || e.keyCode];
          t && this.trigger(t + 'Keyed', e);
        },
        _compareQueryToInputValue: function () {
          var e = this.getInputValue(), t = r(this.query, e), n = t ? this.query.length !== e.length : !1;
          n ? this.trigger('whitespaceChanged', { value: this.query }) : t || this.trigger('queryChanged', { value: this.query = e });
        },
        destroy: function () {
          this.$hint.off('.tt'), this.$input.off('.tt'), this.$hint = this.$input = this.$overflowHelper = null;
        },
        focus: function () {
          this.$input.focus();
        },
        blur: function () {
          this.$input.blur();
        },
        getQuery: function () {
          return this.query;
        },
        setQuery: function (e) {
          this.query = e;
        },
        getInputValue: function () {
          return this.$input.val();
        },
        setInputValue: function (e, t) {
          this.$input.val(e), !t && this._compareQueryToInputValue();
        },
        getHintValue: function () {
          return this.$hint.val();
        },
        setHintValue: function (e) {
          this.$hint.val(e);
        },
        getLanguageDirection: function () {
          return (this.$input.css('direction') || 'ltr').toLowerCase();
        },
        isOverflow: function () {
          return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() > this.$input.width();
        },
        isCursorAtEnd: function () {
          var e, t = this.$input.val().length, o = this.$input[0].selectionStart;
          return n.isNumber(o) ? o === t : document.selection ? (e = document.selection.createRange(), e.moveStart('character', -t), t === e.text.length) : !0;
        }
      }), t;
    }(), u = function () {
      function t(t) {
        n.bindAll(this), this.isOpen = !1, this.isEmpty = !0, this.isMouseOverDropdown = !1, this.$menu = e(t.menu).on('mouseenter.tt', this._handleMouseenter).on('mouseleave.tt', this._handleMouseleave).on('click.tt', '.tt-suggestion', this._handleSelection).on('mouseover.tt', '.tt-suggestion', this._handleMouseover);
      }
      function i(e) {
        return e.data('suggestion');
      }
      var r = { suggestionsList: '<span class="tt-suggestions"></span>' }, s = {
          suggestionsList: { display: 'block' },
          suggestion: {
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          },
          suggestionChild: { whiteSpace: 'normal' }
        };
      return n.mixin(t.prototype, o, {
        _handleMouseenter: function () {
          this.isMouseOverDropdown = !0;
        },
        _handleMouseleave: function () {
          this.isMouseOverDropdown = !1;
        },
        _handleMouseover: function (t) {
          var n = e(t.currentTarget);
          this._getSuggestions().removeClass('tt-is-under-cursor'), n.addClass('tt-is-under-cursor');
        },
        _handleSelection: function (t) {
          var n = e(t.currentTarget);
          this.trigger('suggestionSelected', i(n));
        },
        _show: function () {
          this.$menu.css('display', 'block');
        },
        _hide: function () {
          this.$menu.hide();
        },
        _moveCursor: function (e) {
          var t, n, o, r;
          if (this.isVisible()) {
            if (t = this._getSuggestions(), n = t.filter('.tt-is-under-cursor'), n.removeClass('tt-is-under-cursor'), o = t.index(n) + e, o = (o + 1) % (t.length + 1) - 1, -1 === o)
              return this.trigger('cursorRemoved'), void 0;
            -1 > o && (o = t.length - 1), r = t.eq(o).addClass('tt-is-under-cursor'), this.trigger('cursorMoved', i(r));
          }
        },
        _getSuggestions: function () {
          return this.$menu.find('.tt-suggestions > .tt-suggestion');
        },
        destroy: function () {
          this.$menu.off('.tt'), this.$menu = null;
        },
        isVisible: function () {
          return this.isOpen && !this.isEmpty;
        },
        closeUnlessMouseIsOverDropdown: function () {
          this.isMouseOverDropdown || this.close();
        },
        close: function () {
          this.isOpen && (this.isOpen = !1, this._hide(), this.$menu.find('.tt-suggestions > .tt-suggestion').removeClass('tt-is-under-cursor'), this.trigger('closed'));
        },
        open: function () {
          this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger('opened'));
        },
        setLanguageDirection: function (e) {
          var t = {
              left: '0',
              right: 'auto'
            }, n = {
              left: 'auto',
              right: ' 0'
            };
          'ltr' === e ? this.$menu.css(t) : this.$menu.css(n);
        },
        moveCursorUp: function () {
          this._moveCursor(-1);
        },
        moveCursorDown: function () {
          this._moveCursor(1);
        },
        getSuggestionUnderCursor: function () {
          var e = this._getSuggestions().filter('.tt-is-under-cursor').first();
          return e.length > 0 ? i(e) : null;
        },
        getFirstSuggestion: function () {
          var e = this._getSuggestions().first();
          return e.length > 0 ? i(e) : null;
        },
        renderSuggestions: function (t, o) {
          var i, a, l, c, u, d = 'tt-dataset-' + t.name, h = '<div class="tt-suggestion">%body</div>', p = this.$menu.find('.' + d);
          0 === p.length && (a = e(r.suggestionsList).css(s.suggestionsList), p = e('<div></div>').addClass(d).append(t.header).append(a).append(t.footer).appendTo(this.$menu)), o.length > 0 ? (this.isEmpty = !1, this.isOpen && this._show(), l = document.createElement('div'), c = document.createDocumentFragment(), n.each(o, function (n, o) {
            i = t.template(o.datum), l.innerHTML = h.replace('%body', i), u = e(l.firstChild).css(s.suggestion).data('suggestion', o), u.children().each(function () {
              e(this).css(s.suggestionChild);
            }), c.appendChild(u[0]);
          }), p.show().find('.tt-suggestions').html(c)) : this.clearSuggestions(t.name), this.trigger('suggestionsRendered');
        },
        clearSuggestions: function (e) {
          var t = e ? this.$menu.find('.tt-dataset-' + e) : this.$menu.find('[class^="tt-dataset-"]'), n = t.find('.tt-suggestions');
          t.hide(), n.empty(), 0 === this._getSuggestions().length && (this.isEmpty = !0, this._hide());
        }
      }), t;
    }(), d = function () {
      function t(e) {
        var t, o, r;
        n.bindAll(this), this.$node = i(e.input), this.datasets = e.datasets, this.dir = null, this.eventBus = e.eventBus, t = this.$node.find('.tt-dropdown-menu'), o = this.$node.find('.tt-query'), r = this.$node.find('.tt-hint'), this.dropdownView = new u({ menu: t }).on('suggestionSelected', this._handleSelection).on('cursorMoved', this._clearHint).on('cursorMoved', this._setInputValueToSuggestionUnderCursor).on('cursorRemoved', this._setInputValueToQuery).on('cursorRemoved', this._updateHint).on('suggestionsRendered', this._updateHint).on('opened', this._updateHint).on('closed', this._clearHint).on('opened closed', this._propagateEvent), this.inputView = new c({
          input: o,
          hint: r
        }).on('focused', this._openDropdown).on('blured', this._closeDropdown).on('blured', this._setInputValueToQuery).on('enterKeyed', this._handleSelection).on('queryChanged', this._clearHint).on('queryChanged', this._clearSuggestions).on('queryChanged', this._getSuggestions).on('whitespaceChanged', this._updateHint).on('queryChanged whitespaceChanged', this._openDropdown).on('queryChanged whitespaceChanged', this._setLanguageDirection).on('escKeyed', this._closeDropdown).on('escKeyed', this._setInputValueToQuery).on('tabKeyed upKeyed downKeyed', this._managePreventDefault).on('upKeyed downKeyed', this._moveDropdownCursor).on('upKeyed downKeyed', this._openDropdown).on('tabKeyed leftKeyed rightKeyed', this._autocomplete);
      }
      function i(t) {
        var n = e(s.wrapper), o = e(s.dropdown), i = e(t), r = e(s.hint);
        n = n.css(a.wrapper), o = o.css(a.dropdown), r.css(a.hint).css({
          backgroundAttachment: i.css('background-attachment'),
          backgroundClip: i.css('background-clip'),
          backgroundColor: i.css('background-color'),
          backgroundImage: i.css('background-image'),
          backgroundOrigin: i.css('background-origin'),
          backgroundPosition: i.css('background-position'),
          backgroundRepeat: i.css('background-repeat'),
          backgroundSize: i.css('background-size')
        }), i.data('ttAttrs', {
          dir: i.attr('dir'),
          autocomplete: i.attr('autocomplete'),
          spellcheck: i.attr('spellcheck'),
          style: i.attr('style')
        }), i.addClass('tt-query').attr({
          autocomplete: 'off',
          spellcheck: !1
        }).css(a.query);
        try {
          !i.attr('dir') && i.attr('dir', 'auto');
        } catch (l) {
        }
        return i.wrap(n).parent().prepend(r).append(o);
      }
      function r(e) {
        var t = e.find('.tt-query');
        n.each(t.data('ttAttrs'), function (e, o) {
          n.isUndefined(o) ? t.removeAttr(e) : t.attr(e, o);
        }), t.detach().removeData('ttAttrs').removeClass('tt-query').insertAfter(e), e.remove();
      }
      var s = {
          wrapper: '<span class="twitter-typeahead"></span>',
          hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
          dropdown: '<span class="tt-dropdown-menu"></span>'
        }, a = {
          wrapper: {
            position: 'relative',
            display: 'inline-block'
          },
          hint: {
            position: 'absolute',
            top: '0',
            left: '0',
            borderColor: 'transparent',
            boxShadow: 'none'
          },
          query: {
            position: 'relative',
            verticalAlign: 'top',
            backgroundColor: 'transparent'
          },
          dropdown: {
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: '100',
            display: 'none'
          }
        };
      return n.isMsie() && n.mixin(a.query, { backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)' }), n.isMsie() && 7 >= n.isMsie() && (n.mixin(a.wrapper, {
        display: 'inline',
        zoom: '1'
      }), n.mixin(a.query, { marginTop: '-1px' })), n.mixin(t.prototype, o, {
        _managePreventDefault: function (e) {
          var t, n, o = e.data, i = !1;
          switch (e.type) {
          case 'tabKeyed':
            t = this.inputView.getHintValue(), n = this.inputView.getInputValue(), i = t && t !== n;
            break;
          case 'upKeyed':
          case 'downKeyed':
            i = !o.shiftKey && !o.ctrlKey && !o.metaKey;
          }
          i && o.preventDefault();
        },
        _setLanguageDirection: function () {
          var e = this.inputView.getLanguageDirection();
          e !== this.dir && (this.dir = e, this.$node.css('direction', e), this.dropdownView.setLanguageDirection(e));
        },
        _updateHint: function () {
          var e, t, o, i, r, s = this.dropdownView.getFirstSuggestion(), a = s ? s.value : null, l = this.dropdownView.isVisible(), c = this.inputView.isOverflow();
          a && l && !c && (e = this.inputView.getInputValue(), t = e.replace(/\s{2,}/g, ' ').replace(/^\s+/g, ''), o = n.escapeRegExChars(t), i = RegExp('^(?:' + o + ')(.*$)', 'i'), r = i.exec(a), this.inputView.setHintValue(e + (r ? r[1] : '')));
        },
        _clearHint: function () {
          this.inputView.setHintValue('');
        },
        _clearSuggestions: function () {
          this.dropdownView.clearSuggestions();
        },
        _setInputValueToQuery: function () {
          this.inputView.setInputValue(this.inputView.getQuery());
        },
        _setInputValueToSuggestionUnderCursor: function (e) {
          var t = e.data;
          this.inputView.setInputValue(t.value, !0);
        },
        _openDropdown: function () {
          this.dropdownView.open();
        },
        _closeDropdown: function (e) {
          this.dropdownView['blured' === e.type ? 'closeUnlessMouseIsOverDropdown' : 'close']();
        },
        _moveDropdownCursor: function (e) {
          var t = e.data;
          t.shiftKey || t.ctrlKey || t.metaKey || this.dropdownView['upKeyed' === e.type ? 'moveCursorUp' : 'moveCursorDown']();
        },
        _handleSelection: function (e) {
          var t = 'suggestionSelected' === e.type, o = t ? e.data : this.dropdownView.getSuggestionUnderCursor();
          o && (this.inputView.setInputValue(o.value), t ? this.inputView.focus() : e.data.preventDefault(), t && n.isMsie() ? n.defer(this.dropdownView.close) : this.dropdownView.close(), this.eventBus.trigger('selected', o.datum));
        },
        _getSuggestions: function () {
          var e = this, t = this.inputView.getQuery();
          n.isBlankString(t) || n.each(this.datasets, function (n, o) {
            o.getSuggestions(t, function (n) {
              t === e.inputView.getQuery() && e.dropdownView.renderSuggestions(o, n);
            });
          });
        },
        _autocomplete: function (e) {
          var t, n, o, i, r;
          ('rightKeyed' !== e.type && 'leftKeyed' !== e.type || (t = this.inputView.isCursorAtEnd(), n = 'ltr' === this.inputView.getLanguageDirection() ? 'leftKeyed' === e.type : 'rightKeyed' === e.type, t && !n)) && (o = this.inputView.getQuery(), i = this.inputView.getHintValue(), '' !== i && o !== i && (r = this.dropdownView.getFirstSuggestion(), this.inputView.setInputValue(r.value), this.eventBus.trigger('autocompleted', r.datum)));
        },
        _propagateEvent: function (e) {
          this.eventBus.trigger(e.type);
        },
        destroy: function () {
          this.inputView.destroy(), this.dropdownView.destroy(), r(this.$node), this.$node = null;
        },
        setQuery: function (e) {
          this.inputView.setQuery(e), this.inputView.setInputValue(e), this._clearHint(), this._clearSuggestions(), this._getSuggestions();
        }
      }), t;
    }();
  (function () {
    var t, o = {}, r = 'ttView';
    t = {
      initialize: function (t) {
        function s() {
          var t, o = e(this), s = new i({ el: o });
          t = n.map(a, function (e) {
            return e.initialize();
          }), o.data(r, new d({
            input: o,
            eventBus: s = new i({ el: o }),
            datasets: a
          })), e.when.apply(e, t).always(function () {
            n.defer(function () {
              s.trigger('initialized');
            });
          });
        }
        var a;
        return t = n.isArray(t) ? t : [t], 0 === t.length && e.error('no datasets provided'), a = n.map(t, function (e) {
          var t = o[e.name] ? o[e.name] : new l(e);
          return e.name && (o[e.name] = t), t;
        }), this.each(s);
      },
      destroy: function () {
        function t() {
          var t = e(this), n = t.data(r);
          n && (n.destroy(), t.removeData(r));
        }
        return this.each(t);
      },
      setQuery: function (t) {
        function n() {
          var n = e(this).data(r);
          n && n.setQuery(t);
        }
        return this.each(n);
      }
    }, jQuery.fn.typeahead = function (e) {
      return t[e] ? t[e].apply(this, [].slice.call(arguments, 1)) : t.initialize.apply(this, arguments);
    };
  }());
}(window.jQuery), function (e) {
  function t(e, t, n) {
    var u, d, h, w, C, S, T, I = t.version, k = t.errorCorrection, R = Array(8 * g[g.length - 1][p.TOTAL_BYTES]), E = 0;
    switch (t.encodeMode) {
    case t.ENCODE_MODE.NUMERIC:
      var x = 0;
      for (u = 0; e.length > u; u++) {
        if (!(e[u] >= 48 && 57 >= e[u]))
          throw new TypeError('Invalid data format.');
        x = 10 * x + (e[u] - 48), 2 === u % 3 && (E = a(R, E, i(x, 10)), x = 0);
      }
      switch (u % 3) {
      case 1:
        E = a(R, E, i(x, 4));
        break;
      case 2:
        E = a(R, E, i(x, 7));
        break;
      default:
      }
      if (I > 0)
        I >= 1 && 9 >= I ? S = 10 : I >= 10 && 26 >= I ? S = 12 : I >= 27 && 40 >= I && (S = 14);
      else {
        if (T = o(E + 4 + 10, k), !(T > 0))
          throw new RangeError('Too much data.');
        if (Math.abs(I) > T && (T = Math.abs(I)), T >= 1 && 9 >= T)
          S = 10;
        else {
          if (T = o(E + 4 + 12, k), !(T > 0))
            throw new RangeError('Too much data.');
          if (Math.abs(I) > T && (T = Math.abs(I)), T >= 10 && 26 >= T)
            S = 12;
          else {
            if (T = o(E + 4 + 14, k), !(T > 0))
              throw new RangeError('Too much data.');
            if (Math.abs(I) > T && (T = Math.abs(I)), !(T >= 27 && 40 >= T))
              throw new RangeError('Bug in version detection.');
            S = 14;
          }
        }
        I = T;
      }
      break;
    case t.ENCODE_MODE.ALPHA_NUMERIC:
      var _, A, M = [
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          32,
          36,
          37,
          42,
          43,
          45,
          46,
          47,
          58
        ];
      for (u = 0; e.length - 1 > u; u += 2) {
        if (_ = c(96 === (96 & e[u]) ? 95 & e[u] : e[u], M), A = c(96 === (96 & e[u + 1]) ? 95 & e[u + 1] : e[u + 1], M), -1 === _ || -1 === A)
          throw Error('Character not supported in ALPHA_NUMERIC encoding mode.');
        E = a(R, E, i(45 * _ + A, 11));
      }
      if (u === e.length - 1) {
        if (_ = c(96 === (96 & e[u]) ? 95 & e[u] : e[u], M), -1 === _)
          throw Error('Character not supported in ALPHA_NUMERIC encoding mode.');
        E = a(R, E, i(_, 6));
      }
      if (I > 0)
        I >= 1 && 9 >= I ? S = 9 : I >= 10 && 26 >= I ? S = 11 : I >= 27 && 40 >= I && (S = 13);
      else {
        if (T = o(E + 4 + 9, k), !(T > 0))
          throw new RangeError('Too much data.');
        if (Math.abs(I) > T && (T = Math.abs(I)), T >= 1 && 9 >= T)
          S = 9;
        else {
          if (T = o(E + 4 + 11, k), !(T > 0))
            throw new RangeError('Too much data.');
          if (Math.abs(I) > T && (T = Math.abs(I)), T >= 10 && 26 >= T)
            S = 11;
          else {
            if (T = o(E + 4 + 13, k), !(T > 0))
              throw new RangeError('Too much data.');
            if (Math.abs(I) > T && (T = Math.abs(I)), !(T >= 27 && 40 >= T))
              throw new RangeError('Bug in version detection.');
            S = 13;
          }
        }
        I = T;
      }
      break;
    case t.ENCODE_MODE.BYTE:
    case t.ENCODE_MODE.UTF8:
    case t.ENCODE_MODE.UTF8_SIGNATURE:
      for (u = 0; e.length > u; u++)
        E = a(R, E, i(e[u], 8));
      if (I > 0)
        I >= 0 && 9 >= I ? S = 8 : I >= 10 && 40 >= I && (S = 16);
      else {
        if (T = o(E + 4 + 8, k), !(T > 0))
          throw new RangeError('Too much data.');
        if (Math.abs(I) > T && (T = Math.abs(I)), T >= 1 && 9 >= T)
          S = 8;
        else {
          if (T = o(E + 4 + 16, k), !(T > 0))
            throw new RangeError('Too much data.');
          if (Math.abs(I) > T && (T = Math.abs(I)), !(T >= 10 && 40 >= T))
            throw new RangeError('Bug in version detection.');
          S = 16;
        }
        I = T;
      }
      break;
    case t.ENCODE_MODE.KANJI:
      throw Error('Encoding mode "KANJI" not supported yet.');
    default:
      throw Error('Unsupported encoding mode.');
    }
    if (n)
      return I;
    R = i(15 & t.encodeMode, 4).concat(i(e.length, S)).concat(R), E += 4 + S;
    var P = g[I][p.TOTAL_BYTES] - g[I][p.ECC_BYTES][k] << 3;
    if (E > P)
      throw new RangeError('Too much data for the selected version.');
    var D = P - E;
    for (D > 4 && (D = 4), E = a(R, E, s(D, 0)), E = a(R, E, s((8 - E % 8) % 8, 0)), u = 0, C = P - E >>> 3; C > u; u++)
      E = a(R, E, 1 & u ? [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ] : [
        1,
        1,
        1,
        0,
        1,
        1,
        0,
        0
      ]);
    var L = Math.floor((g[I][p.TOTAL_BYTES] - g[I][p.ECC_BYTES][k]) / (g[I][p.EC_BLOCKS][k][0] + g[I][p.EC_BLOCKS][k][1])), F = Math.floor(g[I][p.ECC_BYTES][k] / (g[I][p.EC_BLOCKS][k][0] + g[I][p.EC_BLOCKS][k][1])), O = [], $ = [];
    for (u = 0, C = g[I][p.EC_BLOCKS][k][0]; C > u; u++) {
      for ($ = [], d = 0; L > d; d++)
        $.push(r(R.splice(0, 8)));
      O.push($);
    }
    for (u = 0, C = g[I][p.EC_BLOCKS][k][1]; C > u; u++) {
      for ($ = [], d = 0; L >= d; d++)
        $.push(r(R.splice(0, 8)));
      O.push($);
    }
    var N = [], U = [];
    for (d = 1, u = 0; 255 > u; u++)
      N.push(d), U[d] = u, d <<= 1, d > 255 && (d = 285 ^ d);
    var j = [1];
    for (u = 0, C = F; C > u; u++) {
      for (j[u + 1] = 1, d = u; d > 0; d--)
        j[d] = j[d] > 0 ? j[d - 1] ^ N[(U[j[d]] + u) % 255] : j[d - 1];
      j[0] = N[(U[j[0]] + u) % 255];
    }
    var H = [];
    for (u = j.length - 1; u >= 0; u--)
      H.push(j[u]);
    var B = [];
    for (d = 0; O.length > d; d++) {
      B[d] = [].concat(O[d]).concat(s(F, 0));
      for (var V; B[d].length >= H.length;) {
        for (V = B[d][0], u = 0; H.length > u; u++)
          B[d][u] ^= N[(U[H[u]] + U[V]) % 255];
        if (0 !== B[d].shift())
          throw Error('Bug while generating the ECC');
      }
    }
    for (R = Array(8 * g[g.length - 1][p.TOTAL_BYTES]), E = 0, u = 0; L >= u; u++)
      for (d = 0; O.length > d; d++)
        O[d].length > u && (E = a(R, E, i(O[d][u], 8)));
    for (u = 0; F > u; u++)
      for (d = 0; B.length > d; d++)
        B[d].length > u && (E = a(R, E, i(B[d][u], 8)));
    var G = 17 + (I << 2), K = Array(G);
    for (u = 0; G > u; u++)
      K[u] = s(G, 0);
    for (l(K, 0, 0, m, b.FINDER), l(K, 0, G - 7, m, b.FINDER), l(K, G - 7, 0, m, b.FINDER), u = 0; 8 > u; u++)
      K[u][7] = b.SEPARATOR, K[7][u] = b.SEPARATOR, K[u][G - 8] = b.SEPARATOR, K[7][G - 1 - u] = b.SEPARATOR, K[G - 1 - u][7] = b.SEPARATOR, K[G - 8][u] = b.SEPARATOR;
    for (u = 8; G - 8 > u; u++)
      K[u][6] = b.TIMING | (u + 1) % 2, K[6][u] = b.TIMING | (u + 1) % 2;
    if (I > 1) {
      var z = g[I][p.ALIGNMENT_PATTERN_POSITION_OFFSET], q = 4 * I + 10;
      for (w = q;;) {
        for (h = q; 6 === h && 6 === w || 6 === h && w === G - 7 || h === G - 7 && 6 === w || l(K, h - 2, w - 2, v, b.ALIGNMENT), 6 !== h;)
          h -= z, 18 > h && (h = 6);
        if (6 === w)
          break;
        w -= z, 18 > w && (w = 6);
      }
    }
    if (I >= 7) {
      var W = g[I][p.VERSION_PATTERN];
      for (u = 0; 6 > u; u++)
        for (d = 0; 3 > d; d++)
          K[G - 11 + d][u] = b.VERSION | 1 & W, K[u][G - 11 + d] = b.VERSION | 1 & W, W >>= 1;
    }
    for (u = 0; 8 > u; u++)
      K[G - 1 - u][8] = 0 | b.FORMAT, K[8][G - 1 - u] = 0 | b.FORMAT, 6 !== u && (K[8][u] = 0 | b.FORMAT, K[u][8] = 0 | b.FORMAT);
    K[8][8] = 0 | b.FORMAT, K[G - 8][8] = 1 | b.FORMAT;
    var Y = -1;
    for (h = w = G - 1, u = 0; E > u; u++) {
      K[w][h] = b.DATA | R[u];
      do
        if (h > 6 && 0 === (1 & h) || 6 > h && 1 === (1 & h))
          h--;
        else if (-1 === Y && 0 === w || 1 === Y && w === G - 1) {
          if (0 === h) {
            if (E - 1 > u)
              throw new RangeError('Too much data while writing the symbol.');
            break;
          }
          Y = -Y, h--, 6 === h && h--;
        } else
          w += Y, h++;
      while (0 !== K[w][h]);
    }
    var J, X = [];
    for (u = 0; y.length > u; u++) {
      for (X[u] = [], w = 0; G > w; w++)
        for (X[u][w] = [], h = 0; G > h; h++)
          X[u][w][h] = K[w][h] & b.DATA ? 1 & (K[w][h] ^ y[u](h, w)) : 1 & K[w][h];
      J = i(f[k][u], 15), X[u][G - 1][8] = X[u][8][0] = J[0], X[u][G - 2][8] = X[u][8][1] = J[1], X[u][G - 3][8] = X[u][8][2] = J[2], X[u][G - 4][8] = X[u][8][3] = J[3], X[u][G - 5][8] = X[u][8][4] = J[4], X[u][G - 6][8] = X[u][8][5] = J[5], X[u][G - 7][8] = X[u][8][7] = J[6], X[u][8][G - 8] = X[u][8][8] = J[7], X[u][8][G - 7] = X[u][7][8] = J[8], X[u][8][G - 6] = X[u][5][8] = J[9], X[u][8][G - 5] = X[u][4][8] = J[10], X[u][8][G - 4] = X[u][3][8] = J[11], X[u][8][G - 3] = X[u][2][8] = J[12], X[u][8][G - 2] = X[u][1][8] = J[13], X[u][8][G - 1] = X[u][0][8] = J[14];
    }
    var Q, Z, et, tt, nt, ot = 0, it = 4294967295;
    for (u = 0; y.length > u; u++) {
      for (Q = Z = et = tt = nt = 0, w = 0; G > w; w++)
        for (h = 0; G > h; h++)
          h >= 6 && (1 === (X[u][w][h - 6] & X[u][w][h - 5] & X[u][w][h - 4] & X[u][w][h - 3] & X[u][w][h - 2] & X[u][w][h - 1] & X[u][w][h]) || 0 === (X[u][w][h - 6] | X[u][w][h - 5] | X[u][w][h - 4] | X[u][w][h - 3] | X[u][w][h - 2] | X[u][w][h - 1] | X[u][w][h])) && Q++, w >= 6 && (1 === (X[u][w - 6][h] & X[u][w - 5][h] & X[u][w - 4][h] & X[u][w - 3][h] & X[u][w - 2][h] & X[u][w - 1][h] & X[u][w][h]) || 0 === (X[u][w - 6][h] | X[u][w - 5][h] | X[u][w - 4][h] | X[u][w - 3][h] | X[u][w - 2][h] | X[u][w - 1][h] | X[u][w][h])) && Q++, h > 0 && w > 0 && (1 === (X[u][w][h] & X[u][w][h - 1] & X[u][w - 1][h] & X[u][w - 1][h - 1]) || 0 === (X[u][w][h] | X[u][w][h - 1] | X[u][w - 1][h] | X[u][w - 1][h - 1])) && Z++, h >= 6 && 1 === X[u][w][h - 6] && 0 === X[u][w][h - 5] && 1 === X[u][w][h - 4] && 1 === X[u][w][h - 3] && 1 === X[u][w][h - 2] && 0 === X[u][w][h - 1] && 1 === X[u][w][h] && et++, w >= 6 && 1 === X[u][w - 6][h] && 0 === X[u][w - 5][h] && 1 === X[u][w - 4][h] && 1 === X[u][w - 3][h] && 1 === X[u][w - 2][h] && 0 === X[u][w - 1][h] && 1 === X[u][w][h] && et++, tt += X[u][w][h];
      tt = Math.abs(100 * tt / (G * G) - 50) / 5, nt = 3 * Q + 3 * Z + 40 * et + 10 * tt, it > nt && (it = nt, ot = u);
    }
    for (w = 0; G > w; w++)
      for (h = 0; G > h; h++)
        K[w][h] = K[w][h] & (b.DATA | b.FORMAT) ? X[ot][w][h] : 1 & K[w][h];
    return K;
  }
  function n(t, n) {
    var o, i, r, s, a;
    switch (typeof t) {
    case 'string':
      o = t;
      break;
    case 'number':
      o = '' + t;
      break;
    case 'object':
      if (t.constructor === e[h].prototype.Input)
        o = '' + t;
      else {
        if ((Array.isArray || function (e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          })(t))
          return t;
        o = '' + new e[h].prototype.Input(t.dataType, t.data);
      }
      break;
    default:
      throw new TypeError('Unsupported input parameter.');
    }
    if (i = n.encodeMode === n.ENCODE_MODE.UTF8_SIGNATURE ? [
        239,
        187,
        191
      ] : [], n.encodeMode === n.ENCODE_MODE.UTF8_SIGNATURE || n.encodeMode === n.ENCODE_MODE.UTF8)
      for (r = 0, a = o.length; a > r; r++)
        s = o.charCodeAt(r), 128 > s ? i.push(s) : s > 127 && 2048 > s ? i.push(192 | s >> 6, 128 | 63 & s) : i.push(224 | s >> 12, 128 | 63 & s >> 6, 128 | 63 & s);
    else
      for (r = 0, a = o.length; a > r; r++)
        i.push(o.charCodeAt(r));
    return i;
  }
  function o(e, t) {
    for (var n = 1; g.length > n; n++)
      if (g[n][p.TOTAL_BYTES] - g[n][p.ECC_BYTES][t] << 3 >= e)
        return n;
    return 0;
  }
  function i(e, t) {
    var n = Array(t);
    if ('number' == typeof e && t > 0 && 32 >= t) {
      for (var o = t - 1; o >= 0; o--)
        n[o] = 1 & e, e >>= 1;
      return n;
    }
    throw Error('Invalid parameters in toBits().');
  }
  function r(e, t) {
    return t = t || 0, ((e[t] || 0) << 7) + ((e[t + 1] || 0) << 6) + ((e[t + 2] || 0) << 5) + ((e[t + 3] || 0) << 4) + ((e[t + 4] || 0) << 3) + ((e[t + 5] || 0) << 2) + ((e[t + 6] || 0) << 1) + (e[t + 7] || 0);
  }
  function s(e, t) {
    for (var n = Array(e), o = 0; e > o; o++)
      n[o] = t;
    return n;
  }
  function a(e, t, n) {
    for (var o = 0; n.length > o; o++)
      e[t + o] = n[o];
    return t + n.length;
  }
  function l(e, t, n, o, i) {
    var r, s, a, l;
    for (a = 0, l = o.length; l > a; a++)
      for (r = 0, s = o[a].length; s > r; r++)
        e[n + a][t + r] = o[a][r] ^ i;
  }
  function c(e, t) {
    if ('function' == typeof t.indexOf)
      return t.indexOf(e);
    for (var n = 0; t.length > n; n++)
      if (t[n] === e)
        return n;
    return -1;
  }
  function u(e, t) {
    for (var n in e)
      if (e[n] === t)
        return !0;
    return !1;
  }
  function d(e) {
    if ('object' != typeof e)
      return e;
    var t = {};
    for (var n in e)
      t[n] = 'object' == typeof e[n] ? d(e[n]) : e[n];
    return t;
  }
  var h = 'JSQR';
  e[h] = function () {
  }, e[h].prototype.encode = function (t, n) {
    return new e[h].prototype.Matrix(t, n);
  }, e[h].prototype.Input = function (e, t) {
    if (void 0 !== e) {
      if (!u(this.DATA_TYPE, e))
        throw new TypeError('Unsupported dataType.');
    } else
      e = this.DATA_TYPE.DEFAULT;
    try {
      Object.defineProperty(this, 'dataType', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return e;
        },
        set: function (t) {
          if (!u(this.DATA_TYPE, t))
            throw new TypeError('Unsupported dataType.');
          e = t;
        }
      });
    } catch (n) {
      this.dataType = e;
    }
    this.data = 'object' == typeof t ? d(t) : t;
  }, e[h].prototype.Input.prototype.DATA_TYPE = {
    DEFAULT: 0,
    TEXT: 0,
    URL: 1,
    BOOKMARK: 2,
    CALL: 3,
    SMS: 4,
    EMAIL: 5,
    VCARD: 6,
    MECARD: 7,
    VEVENT: 8,
    GOOGLE_MAPS: 9,
    BING_MAPS: 10,
    GEO: 11,
    ITUNES: 12,
    ITUNES_REVIEW: 13,
    ANDROID_MARKET: 14,
    FACEBOOK_USER_PROFILE: 15,
    FOURSQUARE: 16,
    TWEET_FETCH: 17,
    TWEET: 18,
    BLACKBERRY_MESSENGER_USER: 19,
    ANDROID_WIFI: 20,
    WIKIPEDIA: 21,
    YOUTUBE_USER: 22,
    YOUTUBE_VIDEO: 23
  }, e[h].prototype.DATA_TYPE = e[h].prototype.Input.prototype.DATA_TYPE, e[h].prototype.Input.prototype.toString = function () {
    function e(e) {
      var t = l.data;
      if ('string' == typeof e) {
        var n, o = e.split('.');
        for (n = 0; o.length > n; n++)
          t = t[o[n]];
      }
      return t;
    }
    function t(t) {
      var n = e(t);
      return void 0 === n ? '' : '' + n;
    }
    function n(e, t) {
      for (var n in t)
        e = e.replace(n, t[n], 'g');
      return e;
    }
    function o() {
      var e, t = arguments[0].split('.'), n = l;
      for (e = 0; t.length > e; e++)
        n = n[t[e]];
      for (e = 1; arguments.length > e; e++) {
        if ('object' == typeof n && 'function' == typeof arguments[e] && null !== n && n.constructor === arguments[e] || null === n && null === arguments[e] || typeof n === arguments[e])
          return !0;
        'function' == typeof arguments[e] && (arguments[e] = arguments[e].name);
      }
      throw void 0 === n ? new TypeError(arguments[0] + ' is undefined.') : new TypeError('Unexcepted type (' + typeof n + ') of ' + arguments[0] + ' (' + [].slice.call(arguments, 1).join('|') + ').');
    }
    function i() {
      var e, t, n, o;
      for (n = 0; arguments.length > n; n++) {
        for (e = arguments[n].split('.'), t = l, o = 0; e.length > o; o++)
          t = t[e[o]];
        if ('string' == typeof t && 0 === t.length)
          throw Error('Required: ' + arguments[n]);
      }
    }
    var r, s, a, l = this;
    switch (this.dataType) {
    case this.DATA_TYPE.DEFAULT:
    case this.DATA_TYPE.TEXT:
      return 'object' == typeof this.data ? (o('data.text', 'string', 'number'), i('data.text'), t('text')) : (o('data', 'string', 'number'), i('data'), t());
    case this.DATA_TYPE.URL:
      switch (typeof this.data) {
      case 'string':
        return i('data'), (/^[a-zA-Z]+:\/\//.test(t()) ? '' : 'http://') + t();
      case 'object':
        return o('data.url', 'string'), i('data.url'), (/^[a-zA-Z]+:\/\//.test(t('url')) ? '' : 'http://') + t('url');
      default:
        throw new TypeError('Unexcepted type of data.url (string).');
      }
    case this.DATA_TYPE.BOOKMARK:
      return o('data', 'object'), o('data.title', 'string', 'number'), o('data.url', 'string'), i('data.title', 'data.url'), 'MEBKM:TITLE:' + t('title') + ';URL:' + (/^[a-zA-Z]+:\/\//.test(t('url')) ? '' : 'http://') + t('url');
    case this.DATA_TYPE.CALL:
      switch (typeof this.data) {
      case 'string':
      case 'number':
        return i('data'), 'TEL:' + t();
      case 'object':
        switch (typeof this.data.phoneNumber) {
        case 'string':
        case 'number':
          return i('data.phoneNumber'), 'TEL:' + t('phoneNumber');
        default:
          throw new TypeError('Unexcepted type of data (string|number).');
        }
      default:
        throw new TypeError('Unexcepted type of data.phoneNumber (string|number).');
      }
    case this.DATA_TYPE.SMS:
      return o('data', 'object'), o('data.phoneNumber', 'string', 'number'), o('data.message', 'string', 'number'), i('data.phoneNumber'), 'SMSTO:' + t('phoneNumber') + ':' + t('message');
    case this.DATA_TYPE.EMAIL:
      return o('data', 'object'), o('data.recipient', 'string'), o('data.subject', 'string'), o('data.body', 'string'), i('data.recipient'), 'SMTP:' + t('recipient').replace(':', '') + ':' + t('subject').replace(/:/g, '\\:') + ':' + t('body');
    case this.DATA_TYPE.VCARD:
      switch (o('data', 'object'), o('data.version', 'string', 'number'), o('data.type', 'string'), o('data.firstName', 'string', 'number'), o('data.middleName', 'string', 'number'), o('data.lastName', 'string', 'number'), o('data.organization', 'string', 'number'), o('data.title', 'string', 'number'), o('data.mobilePhone', 'string', 'number'), o('data.work', 'object'), o('data.work.street', 'string', 'number'), o('data.work.city', 'string'), o('data.work.zip', 'string', 'number'), o('data.work.state', 'string'), o('data.work.country', 'string'), o('data.work.phone', 'string', 'number'), o('data.work.fax', 'string', 'number'), o('data.work.eMail', 'string'), o('data.work.url', 'string'), o('data.home', 'object'), o('data.home.street', 'string', 'number'), o('data.home.city', 'string', 'number'), o('data.home.zip', 'string', 'number'), o('data.home.state', 'string', 'number'), o('data.home.country', 'string'), o('data.home.phone', 'string', 'number'), o('data.home.eMail', 'string'), o('data.home.url', 'string'), o('data.birthday', Date, null), i('data.version', 'data.type'), a = {
          '\\': '\\\\',
          ';': '\\;',
          ',': '\\,',
          '\n': '\\n'
        }, r = [], parseFloat(t('version'))) {
      case 2.1:
        r[0] = '2.1';
        break;
      case 3:
        r[0] = '3.0';
        break;
      default:
        throw Error('Unsupported VCARD.version (' + t('version') + ').');
      }
      switch (t('type').toLowerCase()) {
      case 'person':
        r[1] = (t('firstName').length > 0 || t('middleName').length > 0 || t('lastName').length > 0 ? 'FN:' + (n(t('firstName'), a) + ' ' + n(t('middleName'), a) + ' ' + n(t('lastName'), a)).replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '') + '\n' : '') + (t('organization').length > 0 ? 'ORG:' + n(t('organization'), a) + '\n' : '');
        break;
      case 'company':
        r[1] = (t('organization').length > 0 ? 'ORG:' + n(t('organization'), a) + '\n' : '') + (t('organization').length > 0 ? 'FN:' + n(t('organization'), a) + '\n' : '') + 'X-ABShowAs:COMPANY\n';
        break;
      default:
        throw Error('Unsupported VCARD.type (' + t('type') + ').');
      }
      return 'BEGIN:VCARD\nVERSION:' + r[0] + '\n' + (t('lastName').length > 0 || t('firstName').length > 0 || t('middleName').length > 0 ? 'N:' + n(t('lastName'), a) + ';' + n(t('firstName'), a) + ';' + n(t('middleName'), a) + ';;\n' : '') + r[1] + (t('title').length > 0 ? 'TITLE:' + n(t('title'), a) + '\n' : '') + (e('work') && t('work.eMail').length > 0 ? 'EMAIL;' + ('3.0' === r[0] ? 'type=INTERNET;type=' : 'INTERNET;') + 'WORK:' + n(t('work.eMail'), a) + '\n' : '') + (e('home') && t('home.eMail').length > 0 ? 'EMAIL;' + ('3.0' === r[0] ? 'type=INTERNET;type=' : 'INTERNET;') + 'HOME:' + n(t('home.eMail'), a) + '\n' : '') + (t('mobilePhone').length > 0 ? 'TEL;' + ('3.0' === r[0] ? 'type=' : '') + 'CELL:' + n(t('mobilePhone'), a) + '\n' : '') + (e('work') && t('work.phone').length > 0 ? 'TEL;' + ('3.0' === r[0] ? 'type=' : '') + 'WORK:' + n(t('work.phone'), a) + '\n' : '') + (e('home') && t('home.phone').length > 0 ? 'TEL;' + ('3.0' === r[0] ? 'type=' : '') + 'HOME:' + n(t('home.phone'), a) + '\n' : '') + (e('work') && t('work.fax').length > 0 ? 'TEL;' + ('3.0' === r[0] ? 'type=WORK,' : 'WORK;') + 'FAX:' + n(t('work.fax'), a) + '\n' : '') + (e('work') && (t('work.street').length > 0 || t('work.city').length > 0 || t('work.state').length > 0 || t('work.zip').length > 0 || t('work.country').length > 0) ? 'ADR;' + ('3.0' === r[0] ? 'type=' : '') + 'WORK:;;' + n(t('work.street'), a) + ';' + n(t('work.city'), a) + ';' + n(t('work.state'), a) + ';' + n(t('work.zip'), a) + ';' + n(t('work.country'), a) + '\n' : '') + (e('home') && (t('home.street').length > 0 || t('home.city').length > 0 || t('home.state').length > 0 || t('home.zip').length > 0 || t('home.country').length > 0) ? 'ADR;' + ('3.0' === r[0] ? 'type=' : '') + 'HOME:;;' + n(t('home.street'), a) + ';' + n(t('home.city'), a) + ';' + n(t('home.state'), a) + ';' + n(t('home.zip'), a) + ';' + n(t('home.country'), a) + '\n' : '') + (e('birthday') && null !== e('birthday') ? 'BDAY;value=date:' + e('birthday').getFullYear() + ('0' + (e('birthday').getMonth() + 1)).substr(-2) + ('0' + e('birthday').getDate()).substr(-2) + ';' : '') + (e('work') && t('work.url').length > 0 ? 'URL;' + ('3.0' === r[0] ? 'type=' : '') + 'WORK:' + n(t('work.url'), a) + '\n' : '') + (e('home') && t('home.url').length > 0 ? 'URL;' + ('3.0' === r[0] ? 'type=' : '') + 'HOME:' + n(t('home.url'), a) + '\n' : '') + 'END:VCARD';
    case this.DATA_TYPE.MECARD:
      return o('data', 'object'), o('data.firstName', 'string', 'number'), o('data.lastName', 'string', 'number'), o('data.eMail', 'string'), o('data.phoneNumber', 'string', 'number'), o('data.videoCall', 'string', 'number'), o('data.birthday', Date, null), o('data.poBox', 'string', 'number'), o('data.room', 'string', 'number'), o('data.street', 'string', 'number'), o('data.city', 'string'), o('data.state', 'string'), o('data.zip', 'string', 'number'), o('data.country', 'string'), o('data.url', 'string', 'number'), o('data.memo', 'string', 'number'), a = {
        '\\': '\\\\',
        ':': '\\:',
        ';': '\\;',
        ',': '\\,'
      }, 'MECARD:' + (t('lastName').length > 0 || t('firstName') > 0 ? 'N:' + n(t('lastName'), a) + (t('firstName').length > 0 ? ',' + n(t('firstName'), a) : '') + ';' : '') + (t('phoneNumber').length > 0 ? 'TEL:' + n(t('phoneNumber'), a) + ';' : '') + (t('videoCall').length > 0 ? 'TEL-AV:' + n(t('videoCall'), a) + ';' : '') + (t('eMail').length > 0 ? 'EMAIL:' + n(t('eMail'), a) + ';' : '') + (t('url').length > 0 ? 'URL:' + n(t('url'), a) + ';' : '') + (t('memo').length > 0 ? 'NOTE:' + n(t('memo'), a) + ';' : '') + (e('birthday') && null !== e('birthday') ? 'BDAY:' + e('birthday').getFullYear() + ('0' + (e('birthday').getMonth() + 1)).substr(-2) + ('0' + e('birthday').getDate()).substr(-2) + ';' : '') + (t('street').length > 0 ? 'ADR:' + n(t('poBox'), a) + ',' + n(t('room'), a) + ',' + n(t('street'), a) + ',' + n(t('city'), a) + ',' + n(t('state'), a) + ',' + n(t('zip'), a) + ',' + n(t('country'), a) + ';' : '') + ';';
    case this.DATA_TYPE.VEVENT:
      if (o('data', 'object'), o('data.format', 'string'), o('data.summary', 'string', 'number'), o('data.description', 'string', 'number'), o('data.locationName', 'string', 'number'), o('data.fullDay', 'boolean'), o('data.startDate', Date), o('data.endDate', Date), i('data.format', 'data.summary', 'data.fullDay', 'data.startDate', 'data.endDate'), Date.parse(t('startDate')) > Date.parse(t('endDate')))
        throw new RangeError('VEVENT.startDate must be older than VEVENT.endDate.');
      switch (a = {
          '\\': '\\\\',
          ';': '\\;',
          ',': '\\,',
          '\n': '\\n'
        }, r = 'BEGIN:VEVENT\nSUMMARY:' + n(t('summary'), a) + '\n' + (t('description').length > 0 ? 'DESCRIPTION:' + n(t('description'), a) + '\n' : '') + (t('locationName').length > 0 ? 'LOCATION:' + n(t('locationName'), a) + '\n' : '') + 'DTSTART:' + e('startDate').getFullYear() + ('0' + (e('startDate').getMonth() + 1)).substr(-2) + ('0' + e('startDate').getDate()).substr(-2) + (e('fullDay') ? '' : 'T' + ('0' + e('startDate').getHours()).substr(-2) + ('0' + e('startDate').getMinutes()).substr(-2) + ('0' + e('startDate').getSeconds()).substr(-2)) + '\n' + 'DTEND:' + e('endDate').getFullYear() + ('0' + (e('endDate').getMonth() + 1)).substr(-2) + ('0' + e('endDate').getDate()).substr(-2) + (e('fullDay') ? '' : 'T' + ('0' + e('endDate').getHours()).substr(-2) + ('0' + e('endDate').getMinutes()).substr(-2) + ('0' + e('endDate').getSeconds()).substr(-2)) + '\n' + 'END:VEVENT', t('format').toLowerCase()) {
      case 'icalendar':
        return 'BEGIN:VCALENDAR\nVERSION:2.0\n' + r + '\n' + 'END:VCALENDAR';
      case 'zxing':
        return r;
      default:
        throw Error('Unsupported VEVENT.format (' + t('format') + ').');
      }
    case this.DATA_TYPE.GOOGLE_MAPS:
      return o('data', 'object'), o('data.locationName', 'string'), o('data.longitude', 'string', 'number'), o('data.latitude', 'string', 'number'), i('data.longitude', 'data.latitude'), 'http://maps.google.com/maps?f=q&q=' + t('latitude') + '%2C' + t('longitude') + '+%28' + encodeURIComponent(t('locationName')) + '%29';
    case this.DATA_TYPE.BING_MAPS:
      return o('data', 'object'), o('data.longitude', 'string', 'number'), o('data.latitude', 'string', 'number'), i('data.longitude', 'data.latitude'), 'http://www.bing.com/maps/?v=2&cp=' + t('latitude') + '~' + t('longitude') + '&lvl=16&dir=0&sty=r';
    case this.DATA_TYPE.GEO:
      return o('data', 'object'), o('data.longitude', 'string', 'number'), o('data.latitude', 'string', 'number'), i('data.longitude', 'data.latitude'), 'GEO:' + t('latitude') + ',' + t('longitude');
    case this.DATA_TYPE.ITUNES:
      if ('object' == typeof this.data ? (o('data.appId', 'string', 'number'), i('data.appId'), r = t('appId')) : (o('data', 'string', 'number'), i('data'), r = t()), !/\d+$/.test(r))
        throw Error('Invalid ITUNES.appId. The id must be numeric.');
      return 'http://itunes.apple.com/app/id' + /\d+$/.exec(r)[0];
    case this.DATA_TYPE.ITUNES_REVIEW:
      if ('object' == typeof this.data ? (o('data.appId', 'string', 'number'), i('data.appId'), r = t('appId')) : (o('data', 'string', 'number'), i('data'), r = t()), !/\d+$/.test(r))
        throw Error('Invalid ITUNES.appId. The id must be numeric.');
      return 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=' + /\d+$/.exec(r)[0];
    case this.DATA_TYPE.ANDROID_MARKET:
      switch (o('data', 'object'), o('data.searchType', 'string'), o('data.linkType', 'string'), o('data.search', 'string', 'number'), i('data.searchType', 'data.linkType', 'data.search'), t('linkType').toLowerCase()) {
      case 'market':
        r = 'market://';
        break;
      case 'website':
        r = 'http://market.android.com/';
        break;
      default:
        throw Error('Unsupported ANDROID_MARKET.linkType (' + t('linkType') + ').');
      }
      switch (t('searchType').toLowerCase()) {
      case 'raw':
        return r + 'search?q=' + encodeURIComponent(t('search'));
      case 'package':
        return r + 'search?q=pname%3A' + encodeURIComponent(t('search'));
      case 'publisher':
        return r + 'search?q=pub%3A' + encodeURIComponent(t('search'));
      case 'details':
        return r + 'details?id=' + encodeURIComponent(t('search'));
      default:
        throw Error('Unsupported ANDROID_MARKET.searchType (' + t('searchType') + ').');
      }
    case this.DATA_TYPE.FACEBOOK_USER_PROFILE:
      if ('object' == typeof this.data ? (o('data.profileId', 'string', 'number'), i('data.profileId'), r = t('profileId')) : (o('data', 'string', 'number'), i('data'), r = t()), /^\d{15}$/.test(r))
        return 'fb://profile/' + r;
      if (/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.test(r))
        return 'fb://profile/' + /(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.exec(r)[3];
      throw Error('Invalid FACEBOOK_USER_PROFILE.videoId. The id must be numeric, 15 characters in length.');
    case this.DATA_TYPE.FOURSQUARE:
      if ('object' == typeof this.data ? (o('data.venueId', 'string', 'number'), i('data.venueId'), r = t('venueId')) : (o('data', 'string', 'number'), i('data'), r = t()), !/\d+$/.test(r))
        throw Error('Invalid FOURSQUARE.venueId. The id must be numeric.');
      return 'http://foursquare.com/venue/' + /\d+$/.exec(r)[0];
    case this.DATA_TYPE.WIKIPEDIA:
      return 'object' == typeof this.data ? (o('data.url', 'string', 'number'), i('data.url'), r = t('url')) : (o('data', 'string', 'number'), i('data'), r = t()), a = { ' ': '_' }, s = /\/\/([a-z\-]*)\.?wikipedia.org\/wiki\/(.*)/i.exec(r), null === s || 3 !== s.length ? 'http://qrwp.org/' + n(r, a) : 'http://' + (s[1].length > 0 ? s[1] + '.' : '') + 'qrwp.org/' + n(s[2], a);
    case this.DATA_TYPE.YOUTUBE_USER:
      return 'object' == typeof this.data ? (o('data.userName', 'string', 'number'), i('data.userName'), r = t('userName')) : (o('data', 'string', 'number'), i('data'), r = t()), 'http://youtube.com/user/' + r;
    case this.DATA_TYPE.YOUTUBE_VIDEO:
      if ('object' == typeof this.data ? (o('data.videoId', 'string', 'number'), i('data.videoId'), r = t('videoId')) : (o('data', 'string', 'number'), i('data'), r = t()), /^[-_A-Za-z0-9]+$/.test(r))
        return 'youtube://' + r;
      if (/(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/.test(r))
        return 'youtube://' + /(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/.exec(r)[3];
      throw Error('Invalid YOUTUBE.videoId. The id must be alphanumeric.');
    case this.DATA_TYPE.TWEET_FETCH:
      throw Error('DATA_TYPE.TWEET_FETCH is currently unsupported.');
    case this.DATA_TYPE.TWEET:
      return 'object' == typeof this.data ? (o('data.text', 'string', 'number'), i('data.text'), 'http://twitter.com/home?status=' + encodeURIComponent(t('text'))) : (o('data', 'string', 'number'), i('data'), 'http://twitter.com/home?status=' + encodeURIComponent(t()));
    case this.DATA_TYPE.BLACKBERRY_MESSENGER_USER:
      if (o('data', 'object'), o('data.firstName', 'string'), o('data.lastName', 'string'), o('data.bbmPin', 'string'), i('data.bbmPin'), !/^[A-Za-z0-9]{8}$/.test(t('bbmPin')))
        throw Error('Invalid BLACKBERRY_MESSENGER_USER.bbmPin. The pin must be alphanumeric, eight characters in length.');
      return 'bbm:' + t('bbmPin') + '00000000' + t('firstName') + ' ' + t('lastName');
    case this.DATA_TYPE.ANDROID_WIFI:
      return o('data', 'object'), o('data.ssid', 'string'), o('data.password', 'string', 'number'), o('data.networkType', 'string'), i('data.ssid', 'data.networkType'), 'WIFI:S:' + t('ssid') + ';T:' + t('networkType') + (t('password').length > 0 ? ';P:' + t('password') : '') + ';;';
    default:
      throw new TypeError('Unsupported dataType.');
    }
    return '';
  }, e[h].prototype.Code = function (e, t, n) {
    if ('object' == typeof e && void 0 === t && void 0 === n && (n = e.errorCorrection, t = e.version, e = e.encodeMode), void 0 !== e) {
      if (!u(this.ENCODE_MODE, e))
        throw new TypeError('Unsupported encodeMode.');
    } else
      e = this.ENCODE_MODE.UTF8;
    try {
      Object.defineProperty(this, 'encodeMode', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return e;
        },
        set: function (t) {
          if (!u(this.ENCODE_MODE, t))
            throw new TypeError('Unsupported encodeMode.');
          e = t;
        }
      });
    } catch (o) {
      this.encodeMode = e;
    }
    if (void 0 !== t) {
      if ('number' != typeof t)
        throw new TypeError('Invalid version type.');
      if (-40 > t || t > 40)
        throw new RangeError('Invalid version value.');
    } else
      t = this.DEFAULT;
    try {
      Object.defineProperty(this, 'version', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return t;
        },
        set: function (e) {
          if ('number' != typeof e)
            throw new TypeError('Invalid version type.');
          if (-40 > e || e > 40)
            throw new RangeError('Invalid version value.');
          t = e;
        }
      });
    } catch (o) {
      this.version = t;
    }
    if (void 0 !== n) {
      if (!u(this.ERROR_CORRECTION, n))
        throw new TypeError('Invalid errorCorrection.');
    } else
      n = this.ERROR_CORRECTION.M;
    try {
      Object.defineProperty(this, 'errorCorrection', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return n;
        },
        set: function (e) {
          if (!u(this.ERROR_CORRECTION, e))
            throw new TypeError('Invalid errorCorrection.');
          n = e;
        }
      });
    } catch (o) {
      this.errorCorrection = n;
    }
  }, e[h].prototype.Code.prototype.ENCODE_MODE = {
    NUMERIC: 1,
    ALPHA_NUMERIC: 2,
    BYTE: 4,
    UTF8: 20,
    UTF8_SIGNATURE: 36,
    STRUCTURED_APPEND: 3,
    FNC1_POS1: 5,
    ECI: 7,
    KANJI: 8,
    FNC1_POS2: 9
  }, e[h].prototype.ENCODE_MODE = e[h].prototype.Code.prototype.ENCODE_MODE, e[h].prototype.Code.prototype.ERROR_CORRECTION = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  }, e[h].prototype.ERROR_CORRECTION = e[h].prototype.Code.prototype.ERROR_CORRECTION, e[h].prototype.Code.prototype.DEFAULT = 0, e[h].prototype.DEFAULT = e[h].prototype.Code.prototype.DEFAULT, e[h].prototype.Code.prototype.getVersion = function (e) {
    return this.version > 0 ? this.version : t(n(e, this), this, !0);
  }, e[h].prototype.Code.prototype.getMinVersion = function (o) {
    var i = new e[h].prototype.Code(this.encodeMode, this.DEFAULT, this.errorCorrection);
    return t(n(o, i), i, !0);
  }, e[h].prototype.Matrix = function (e, o) {
    var i, r, a = this;
    for (i = t(n(e, o), o), r = 0; i.length > r; r++)
      this[r] = i[r];
    try {
      Object.defineProperty(this, 'scale', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return l;
        },
        set: function (e) {
          if ('number' != typeof e)
            throw new TypeError('Invalid scale type.');
          if (0 >= e || e > 256)
            throw new RangeError('Scale value out of range.');
          l = e;
        }
      });
      var l = 4;
    } catch (c) {
      this.scale = 4;
    }
    try {
      Object.defineProperty(this, 'margin', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return u;
        },
        set: function (e) {
          if ('number' != typeof e)
            throw new TypeError('Invalid margin type.');
          if (0 > e || e > 256)
            throw new RangeError('Margin value out of range.');
          u = e;
        }
      });
      var u = 4;
    } catch (c) {
      this.margin = 4;
    }
    try {
      Object.defineProperty(this, 'color1', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return d;
        },
        set: function (e) {
          if ('string' != typeof e)
            throw new TypeError('Invalid color1 type.');
          d = e;
        }
      });
      var d = 'rgb(0,0,0)';
    } catch (c) {
      this.color1 = 'rgb(0,0,0)';
    }
    try {
      Object.defineProperty(this, 'color0', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return h;
        },
        set: function (e) {
          if ('string' != typeof e)
            throw new TypeError('Invalid color2 type.');
          h = e;
        }
      });
      var h = 'none';
    } catch (c) {
      this.color0 = 'none';
    }
    try {
      Object.defineProperty(this, 'length', {
        configurable: !1,
        writeable: !1,
        get: function () {
          return i.length;
        }
      });
    } catch (c) {
      this.length = new function () {
        this.toString = function () {
          return i.length;
        };
      }();
    }
    try {
      Object.defineProperty(this, 'width', {
        configurable: !1,
        writeable: !1,
        get: function () {
          return i.length + (a.margin << 1);
        }
      });
    } catch (c) {
      this.width = new function () {
        this.toString = function () {
          return i.length + (a.margin << 1);
        };
      }();
    }
    try {
      Object.defineProperty(this, 'pixelWidth', {
        configurable: !1,
        writeable: !1,
        get: function () {
          return (i.length + (a.margin << 1)) * a.scale;
        }
      });
    } catch (c) {
      this.pixelWidth = new function () {
        this.toString = function () {
          return (i.length + (a.margin << 1)) * a.scale;
        };
      }();
    }
    this.draw = function (e, t, n) {
      var o, r, s = e.getContext('2d'), a = this.scale, l = this.margin;
      for (r = 0; i.length > r; r++)
        for (o = 0; i[r].length > o; o++)
          i[r][o] && s.fillRect(t + (o + l) * a, n + (r + l) * a, a, a);
    }, this.drawHTML = function (e, t, n) {
      t = t || 'div';
      var o, r, s, a = this.scale, l = this.margin, c = this.color1, u = '<div style="position:relative; background:' + this.color2 + '">';
      for (r = 0; i.length > r; r++)
        for (o = 0; i.length > o; o += s)
          if (s = 1, 1 === i[r][o]) {
            for (; i.length > o + s && 1 === i[r][o + s];)
              s++;
            u += n ? '<' + t + ' style="width:' + s * a + 'px; height:' + a + 'px; left:' + (o + l) * a + 'px; top:' + (r + l) * a + 'px;"></' + t + '>' : '<' + t + ' style="position:absolute; width:' + s * a + 'px; height:' + a + 'px; left:' + (o + l) * a + 'px; top:' + (r + l) * a + 'px; background:' + c + ';"></' + t + '>';
          }
      return u += 0 / 0, e && void 0 !== e.innerHTML && (e.innerHTML = u), u;
    }, this.toDataURL = function () {
    }, this.toSVG = function () {
    }, this.toArray = function () {
      var e, t, n = s(i.length + (u << 1), 0);
      for (t = 0; i.length > t; t++)
        for (n[t + u] = s(i[t].length + (u << 1), 0), e = 0; i[t].length > e; e++)
          n[t + u][e + u] = i[t][e];
      return n;
    }, this.toString = function () {
      return '' + this.toArray();
    }, this.getDebuggingData = function () {
    };
  };
  var p = {
      TOTAL_BYTES: 0,
      REMAINDER_BITS: 1,
      ECC_BYTES: 2,
      EC_BLOCKS: 3,
      ALIGNMENT_PATTERN_POSITION_OFFSET: 4,
      VERSION_PATTERN: 5
    }, g = [
      null,
      [
        26,
        0,
        [
          10,
          7,
          17,
          13
        ],
        [
          [
            1,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            0
          ]
        ],
        0,
        null
      ],
      [
        44,
        7,
        [
          16,
          10,
          28,
          22
        ],
        [
          [
            1,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            0
          ],
          [
            1,
            0
          ]
        ],
        12,
        null
      ],
      [
        70,
        7,
        [
          26,
          15,
          44,
          36
        ],
        [
          [
            1,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            2,
            0
          ]
        ],
        16,
        null
      ],
      [
        100,
        7,
        [
          36,
          20,
          64,
          52
        ],
        [
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            4,
            0
          ],
          [
            2,
            0
          ]
        ],
        20,
        null
      ],
      [
        134,
        7,
        [
          48,
          26,
          88,
          72
        ],
        [
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            2
          ],
          [
            2,
            2
          ]
        ],
        24,
        null
      ],
      [
        172,
        7,
        [
          64,
          36,
          112,
          96
        ],
        [
          [
            4,
            0
          ],
          [
            2,
            0
          ],
          [
            4,
            0
          ],
          [
            4,
            0
          ]
        ],
        28,
        null
      ],
      [
        196,
        0,
        [
          72,
          40,
          130,
          108
        ],
        [
          [
            4,
            0
          ],
          [
            2,
            0
          ],
          [
            4,
            1
          ],
          [
            2,
            4
          ]
        ],
        16,
        31892
      ],
      [
        242,
        0,
        [
          88,
          48,
          156,
          132
        ],
        [
          [
            2,
            2
          ],
          [
            2,
            0
          ],
          [
            4,
            2
          ],
          [
            4,
            2
          ]
        ],
        18,
        34236
      ],
      [
        292,
        0,
        [
          110,
          60,
          192,
          160
        ],
        [
          [
            3,
            2
          ],
          [
            2,
            0
          ],
          [
            4,
            4
          ],
          [
            4,
            4
          ]
        ],
        20,
        39577
      ],
      [
        346,
        0,
        [
          130,
          72,
          224,
          192
        ],
        [
          [
            4,
            1
          ],
          [
            2,
            2
          ],
          [
            6,
            2
          ],
          [
            6,
            2
          ]
        ],
        22,
        42195
      ],
      [
        404,
        0,
        [
          150,
          80,
          264,
          224
        ],
        [
          [
            1,
            4
          ],
          [
            4,
            0
          ],
          [
            3,
            8
          ],
          [
            4,
            4
          ]
        ],
        24,
        48118
      ],
      [
        466,
        0,
        [
          176,
          96,
          308,
          260
        ],
        [
          [
            6,
            2
          ],
          [
            2,
            2
          ],
          [
            7,
            4
          ],
          [
            4,
            6
          ]
        ],
        26,
        51042
      ],
      [
        532,
        0,
        [
          198,
          104,
          352,
          288
        ],
        [
          [
            8,
            1
          ],
          [
            4,
            0
          ],
          [
            12,
            4
          ],
          [
            8,
            4
          ]
        ],
        28,
        55367
      ],
      [
        581,
        3,
        [
          216,
          120,
          384,
          320
        ],
        [
          [
            4,
            5
          ],
          [
            3,
            1
          ],
          [
            11,
            5
          ],
          [
            11,
            5
          ]
        ],
        20,
        58893
      ],
      [
        655,
        3,
        [
          240,
          132,
          432,
          360
        ],
        [
          [
            5,
            5
          ],
          [
            5,
            1
          ],
          [
            11,
            7
          ],
          [
            5,
            7
          ]
        ],
        22,
        63784
      ],
      [
        733,
        3,
        [
          280,
          144,
          480,
          408
        ],
        [
          [
            7,
            3
          ],
          [
            5,
            1
          ],
          [
            3,
            13
          ],
          [
            15,
            2
          ]
        ],
        24,
        68472
      ],
      [
        815,
        3,
        [
          308,
          168,
          532,
          448
        ],
        [
          [
            10,
            1
          ],
          [
            1,
            5
          ],
          [
            2,
            17
          ],
          [
            1,
            15
          ]
        ],
        24,
        70749
      ],
      [
        901,
        3,
        [
          338,
          180,
          588,
          504
        ],
        [
          [
            9,
            4
          ],
          [
            5,
            1
          ],
          [
            2,
            19
          ],
          [
            17,
            1
          ]
        ],
        26,
        76311
      ],
      [
        991,
        3,
        [
          364,
          196,
          650,
          546
        ],
        [
          [
            3,
            11
          ],
          [
            3,
            4
          ],
          [
            9,
            16
          ],
          [
            17,
            4
          ]
        ],
        28,
        79154
      ],
      [
        1085,
        3,
        [
          416,
          224,
          700,
          600
        ],
        [
          [
            3,
            13
          ],
          [
            3,
            5
          ],
          [
            15,
            10
          ],
          [
            15,
            5
          ]
        ],
        28,
        84390
      ],
      [
        1156,
        4,
        [
          442,
          224,
          750,
          644
        ],
        [
          [
            17,
            0
          ],
          [
            4,
            4
          ],
          [
            19,
            6
          ],
          [
            17,
            6
          ]
        ],
        22,
        87683
      ],
      [
        1258,
        4,
        [
          476,
          252,
          816,
          690
        ],
        [
          [
            17,
            0
          ],
          [
            2,
            7
          ],
          [
            34,
            0
          ],
          [
            7,
            16
          ]
        ],
        24,
        92361
      ],
      [
        1364,
        4,
        [
          504,
          270,
          900,
          750
        ],
        [
          [
            4,
            14
          ],
          [
            4,
            5
          ],
          [
            16,
            14
          ],
          [
            11,
            14
          ]
        ],
        24,
        96236
      ],
      [
        1474,
        4,
        [
          560,
          300,
          960,
          810
        ],
        [
          [
            6,
            14
          ],
          [
            6,
            4
          ],
          [
            30,
            2
          ],
          [
            11,
            16
          ]
        ],
        26,
        102084
      ],
      [
        1588,
        4,
        [
          588,
          312,
          1050,
          870
        ],
        [
          [
            8,
            13
          ],
          [
            8,
            4
          ],
          [
            22,
            13
          ],
          [
            7,
            22
          ]
        ],
        26,
        102881
      ],
      [
        1706,
        4,
        [
          644,
          336,
          1110,
          952
        ],
        [
          [
            19,
            4
          ],
          [
            10,
            2
          ],
          [
            33,
            4
          ],
          [
            28,
            6
          ]
        ],
        28,
        110507
      ],
      [
        1828,
        4,
        [
          700,
          360,
          1200,
          1020
        ],
        [
          [
            22,
            3
          ],
          [
            8,
            4
          ],
          [
            12,
            28
          ],
          [
            8,
            26
          ]
        ],
        28,
        110734
      ],
      [
        1921,
        3,
        [
          728,
          390,
          1260,
          1050
        ],
        [
          [
            3,
            23
          ],
          [
            3,
            10
          ],
          [
            11,
            31
          ],
          [
            4,
            31
          ]
        ],
        24,
        117786
      ],
      [
        2051,
        3,
        [
          784,
          420,
          1350,
          1140
        ],
        [
          [
            21,
            7
          ],
          [
            7,
            7
          ],
          [
            19,
            26
          ],
          [
            1,
            37
          ]
        ],
        24,
        119615
      ],
      [
        2185,
        3,
        [
          812,
          450,
          1440,
          1200
        ],
        [
          [
            19,
            10
          ],
          [
            5,
            10
          ],
          [
            23,
            25
          ],
          [
            15,
            25
          ]
        ],
        26,
        126325
      ],
      [
        2323,
        3,
        [
          868,
          480,
          1530,
          1290
        ],
        [
          [
            2,
            29
          ],
          [
            13,
            3
          ],
          [
            23,
            28
          ],
          [
            42,
            1
          ]
        ],
        26,
        127568
      ],
      [
        2465,
        3,
        [
          924,
          510,
          1620,
          1350
        ],
        [
          [
            10,
            23
          ],
          [
            17,
            0
          ],
          [
            19,
            35
          ],
          [
            10,
            35
          ]
        ],
        26,
        133589
      ],
      [
        2611,
        3,
        [
          980,
          540,
          1710,
          1440
        ],
        [
          [
            14,
            21
          ],
          [
            17,
            1
          ],
          [
            11,
            46
          ],
          [
            29,
            19
          ]
        ],
        28,
        136944
      ],
      [
        2761,
        3,
        [
          1036,
          570,
          1800,
          1530
        ],
        [
          [
            14,
            23
          ],
          [
            13,
            6
          ],
          [
            59,
            1
          ],
          [
            44,
            7
          ]
        ],
        28,
        141498
      ],
      [
        2876,
        0,
        [
          1064,
          570,
          1890,
          1590
        ],
        [
          [
            12,
            26
          ],
          [
            12,
            7
          ],
          [
            22,
            41
          ],
          [
            39,
            14
          ]
        ],
        24,
        145311
      ],
      [
        3034,
        0,
        [
          1120,
          600,
          1980,
          1680
        ],
        [
          [
            6,
            34
          ],
          [
            6,
            14
          ],
          [
            2,
            64
          ],
          [
            46,
            10
          ]
        ],
        26,
        150283
      ],
      [
        3196,
        0,
        [
          1204,
          630,
          2100,
          1770
        ],
        [
          [
            29,
            14
          ],
          [
            17,
            4
          ],
          [
            24,
            46
          ],
          [
            49,
            10
          ]
        ],
        26,
        152622
      ],
      [
        3362,
        0,
        [
          1260,
          660,
          2220,
          1860
        ],
        [
          [
            13,
            32
          ],
          [
            4,
            18
          ],
          [
            42,
            32
          ],
          [
            48,
            14
          ]
        ],
        26,
        158308
      ],
      [
        3532,
        0,
        [
          1316,
          720,
          2310,
          1950
        ],
        [
          [
            40,
            7
          ],
          [
            20,
            4
          ],
          [
            10,
            67
          ],
          [
            43,
            22
          ]
        ],
        28,
        161089
      ],
      [
        3706,
        0,
        [
          1372,
          750,
          2430,
          2040
        ],
        [
          [
            18,
            31
          ],
          [
            19,
            6
          ],
          [
            20,
            61
          ],
          [
            34,
            34
          ]
        ],
        28,
        167017
      ]
    ], f = [
      [
        21522,
        20773,
        24188,
        23371,
        17913,
        16590,
        20375,
        19104
      ],
      [
        30660,
        29427,
        32170,
        30877,
        26159,
        25368,
        27713,
        26998
      ],
      [
        5769,
        5054,
        7399,
        6608,
        1890,
        597,
        3340,
        2107
      ],
      [
        13663,
        12392,
        16177,
        14854,
        9396,
        8579,
        11994,
        11245
      ]
    ], m = [
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        1,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        1,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        1,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ]
    ], v = [
      [
        1,
        1,
        1,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        1
      ],
      [
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        0,
        1
      ],
      [
        1,
        1,
        1,
        1,
        1
      ]
    ], y = [
      function (e, t) {
        return 0 === (t + e) % 2;
      },
      function (e, t) {
        return 0 === t % 2;
      },
      function (e) {
        return 0 === e % 3;
      },
      function (e, t) {
        return 0 === (t + e) % 3;
      },
      function (e, t) {
        return 0 === (Math.floor(t / 2) + Math.floor(e / 3)) % 2;
      },
      function (e, t) {
        return 0 === t * e % 2 + t * e % 3;
      },
      function (e, t) {
        return 0 === (t * e % 2 + t * e % 3) % 2;
      },
      function (e, t) {
        return 0 === (t * e % 3 + (t + e) % 2) % 2;
      }
    ], b = {
      FINDER: 2,
      SEPARATOR: 4,
      TIMING: 8,
      ALIGNMENT: 16,
      VERSION: 32,
      FORMAT: 64,
      DATA: 128
    };
}(window));