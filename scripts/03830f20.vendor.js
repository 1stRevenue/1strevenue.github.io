var Opentip, firstAdapter, i, position, vendors, _i, _len, _ref, __slice = [].slice, __indexOf = [].indexOf || function (e) {
    for (var t = 0, o = this.length; o > t; t++)
      if (t in this && this[t] === e)
        return t;
    return -1;
  }, __hasProp = {}.hasOwnProperty;
for (Opentip = function () {
    function e(t, o, i, n) {
      var s, r, a, l, c, d, u, h, p, f, g = this;
      if (this.id = ++e.lastId, this.debug('Creating Opentip.'), e.tips.push(this), this.adapter = e.adapter, s = this.adapter.data(t, 'opentips') || [], s.push(this), this.adapter.data(t, 'opentips', s), this.triggerElement = this.adapter.wrap(t), this.triggerElement.length > 1)
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
        }, n = this.adapter.clone(n), 'object' == typeof o ? (n = o, o = i = void 0) : 'object' == typeof i && (n = i, i = void 0), null != i && (n.title = i), null != o && this.setContent(o), null == n['extends'] && (n['extends'] = null != n.style ? n.style : e.defaultStyle), a = [n], f = n; f['extends'];) {
        if (c = f['extends'], f = e.styles[c], null == f)
          throw Error('Invalid style: ' + c);
        a.unshift(f), null == f['extends'] && 'standard' !== c && (f['extends'] = 'standard');
      }
      for (n = (h = this.adapter).extend.apply(h, [{}].concat(__slice.call(a))), n.hideTriggers = function () {
          var e, t, o, i;
          for (o = n.hideTriggers, i = [], e = 0, t = o.length; t > e; e++)
            r = o[e], i.push(r);
          return i;
        }(), n.hideTrigger && 0 === n.hideTriggers.length && n.hideTriggers.push(n.hideTrigger), p = [
          'tipJoint',
          'targetJoint',
          'stem'
        ], d = 0, u = p.length; u > d; d++)
        l = p[d], n[l] && 'string' == typeof n[l] && (n[l] = new e.Joint(n[l]));
      !n.ajax || n.ajax !== !0 && n.ajax || (n.ajax = 'A' === this.adapter.tagName(this.triggerElement) ? this.adapter.attr(this.triggerElement, 'href') : !1), 'click' === n.showOn && 'A' === this.adapter.tagName(this.triggerElement) && this.adapter.observe(this.triggerElement, 'click', function (e) {
        return e.preventDefault(), e.stopPropagation(), e.stopped = !0;
      }), n.target && (n.fixed = !0), n.stem === !0 && (n.stem = new e.Joint(n.tipJoint)), n.target === !0 ? n.target = this.triggerElement : n.target && (n.target = this.adapter.wrap(n.target)), this.currentStem = n.stem, null == n.delay && (n.delay = 'mouseover' === n.showOn ? 0.2 : 0), null == n.targetJoint && (n.targetJoint = new e.Joint(n.tipJoint).flip()), this.showTriggers = [], this.showTriggersWhenVisible = [], this.hideTriggers = [], n.showOn && 'creation' !== n.showOn && this.showTriggers.push({
        element: this.triggerElement,
        event: n.showOn
      }), this.options = n, this.adapter.domReady(function () {
        return g._init();
      });
    }
    return e.prototype.STICKS_OUT_TOP = 1, e.prototype.STICKS_OUT_BOTTOM = 2, e.prototype.STICKS_OUT_LEFT = 1, e.prototype.STICKS_OUT_RIGHT = 2, e.prototype['class'] = {
      container: 'opentip-container',
      opentip: 'opentip',
      content: 'content',
      loadingIndicator: 'loading-indicator',
      close: 'close',
      goingToHide: 'going-to-hide',
      hidden: 'hidden',
      hiding: 'hiding',
      goingToShow: 'going-to-show',
      showing: 'showing',
      visible: 'visible',
      loading: 'loading',
      ajaxError: 'ajax-error',
      fixed: 'fixed',
      showEffectPrefix: 'show-effect-',
      hideEffectPrefix: 'hide-effect-',
      stylePrefix: 'style-'
    }, e.prototype._init = function () {
      var e, t, o, i, n, s, r, a, l, c, d, u, h, p, f = this;
      for (this._buildContainer(), u = this.options.hideTriggers, i = s = 0, l = u.length; l > s; i = ++s) {
        if (t = u[i], o = null, e = this.options.hideOn instanceof Array ? this.options.hideOn[i] : this.options.hideOn, 'string' == typeof t)
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
      for (h = this.hideTriggers, r = 0, c = h.length; c > r; r++)
        t = h[r], this.showTriggersWhenVisible.push({
          element: t.element,
          event: 'mouseover'
        });
      for (this.bound = {}, p = [
          'prepareToShow',
          'prepareToHide',
          'show',
          'hide',
          'reposition'
        ], a = 0, d = p.length; d > a; a++)
        n = p[a], this.bound[n] = function (e) {
          return function () {
            return f[e].apply(f, arguments);
          };
        }(n);
      return this.activate(), 'creation' === this.options.showOn ? this.prepareToShow() : void 0;
    }, e.prototype._buildContainer = function () {
      return this.container = this.adapter.create('<div id="opentip-' + this.id + '" class="' + this['class'].container + ' ' + this['class'].hidden + ' ' + this['class'].stylePrefix + this.options.className + '"></div>'), this.adapter.css(this.container, { position: 'absolute' }), this.options.ajax && this.adapter.addClass(this.container, this['class'].loading), this.options.fixed && this.adapter.addClass(this.container, this['class'].fixed), this.options.showEffect && this.adapter.addClass(this.container, '' + this['class'].showEffectPrefix + this.options.showEffect), this.options.hideEffect ? this.adapter.addClass(this.container, '' + this['class'].hideEffectPrefix + this.options.hideEffect) : void 0;
    }, e.prototype._buildElements = function () {
      var e, t;
      return this.tooltipElement = this.adapter.create('<div class="' + this['class'].opentip + '"><div class="header"></div><div class="' + this['class'].content + '"></div></div>'), this.backgroundCanvas = this.adapter.wrap(document.createElement('canvas')), this.adapter.css(this.backgroundCanvas, { position: 'absolute' }), 'undefined' != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)), e = this.adapter.find(this.tooltipElement, '.header'), this.options.title && (t = this.adapter.create('<h1></h1>'), this.adapter.update(t, this.options.title, this.options.escapeTitle), this.adapter.append(e, t)), this.options.ajax && this.adapter.append(this.tooltipElement, this.adapter.create('<div class="' + this['class'].loadingIndicator + '"><span>\u21bb</span></div>')), __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (this.closeButtonElement = this.adapter.create('<a href="javascript:undefined;" class="' + this['class'].close + '"><span>Close</span></a>'), this.adapter.append(e, this.closeButtonElement)), this.adapter.append(this.container, this.backgroundCanvas), this.adapter.append(this.container, this.tooltipElement), this.adapter.append(document.body, this.container);
    }, e.prototype.setContent = function (e) {
      return this.content = e, this.visible ? this._updateElementContent() : void 0;
    }, e.prototype._updateElementContent = function () {
      var e;
      return e = this.adapter.find(this.container, '.content'), null != e && ('function' == typeof this.content && (this.debug('Executing content function.'), this.content = this.content(this)), this.adapter.update(e, this.content, this.options.escapeContent)), this._storeAndLockDimensions(), this.reposition();
    }, e.prototype._storeAndLockDimensions = function () {
      var e;
      return e = this.dimensions, this.adapter.css(this.container, {
        width: 'auto',
        left: '0px',
        top: '0px'
      }), this.dimensions = this.adapter.dimensions(this.container), this.dimensions.width += 1, this.adapter.css(this.container, {
        width: '' + this.dimensions.width + 'px',
        top: '' + this.currentPosition.top + 'px',
        left: '' + this.currentPosition.left + 'px'
      }), this._dimensionsEqual(this.dimensions, e) ? void 0 : (this.redraw = !0, this._draw());
    }, e.prototype.activate = function () {
      return this._setupObservers('-showing', '-visible', 'hidden', 'hiding');
    }, e.prototype.deactivate = function () {
      return this.debug('Deactivating tooltip.'), this.hide();
    }, e.prototype._setupObservers = function () {
      var e, t, o, i, n, s, r, a, l, c, d, u, h, p, f, g, m = this;
      for (i = arguments.length >= 1 ? __slice.call(arguments, 0) : [], s = 0, c = i.length; c > s; s++)
        if (o = i[s], t = !1, '-' === o.charAt(0) && (t = !0, o = o.substr(1)), this.currentObservers[o] !== !t)
          switch (this.currentObservers[o] = !t, e = function () {
              var e, o, i;
              return e = arguments.length >= 1 ? __slice.call(arguments, 0) : [], t ? (o = m.adapter).stopObserving.apply(o, e) : (i = m.adapter).observe.apply(i, e);
            }, o) {
          case 'showing':
            for (p = this.hideTriggers, r = 0, d = p.length; d > r; r++)
              n = p[r], e(n.element, n.event, this.bound.prepareToHide);
            e(null != document.onresize ? document : window, 'resize', this.bound.reposition), e(window, 'scroll', this.bound.reposition);
            break;
          case 'visible':
            for (f = this.showTriggersWhenVisible, a = 0, u = f.length; u > a; a++)
              n = f[a], e(n.element, n.event, this.bound.prepareToShow);
            break;
          case 'hiding':
            for (g = this.showTriggers, l = 0, h = g.length; h > l; l++)
              n = g[l], e(n.element, n.event, this.bound.prepareToShow);
            break;
          case 'hidden':
            break;
          default:
            throw Error('Unknown state: ' + o);
          }
      return null;
    }, e.prototype.prepareToShow = function () {
      return this._abortHiding(), this._abortShowing(), this.visible ? void 0 : (this.debug('Showing in ' + this.options.delay + 's.'), this.options.group && e._abortShowingGroup(this.options.group, this), this.preparingToShow = !0, this._setupObservers('-hidden', '-hiding', 'showing'), this._followMousePosition(), this.reposition(), this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0));
    }, e.prototype.show = function () {
      var t = this;
      return this._abortHiding(), this._clearTimeouts(), this.visible ? void 0 : this._triggerElementExists() ? (this.debug('Showing now.'), this.options.group && e._hideGroup(this.options.group, this), this.visible = !0, this.preparingToShow = !1, null == this.tooltipElement && this._buildElements(), this._updateElementContent(), !this.options.ajax || this.loaded && this.options.ajaxCache || this._loadAjax(), this._searchAndActivateCloseButtons(), this._startEnsureTriggerElement(), this.adapter.css(this.container, { zIndex: e.lastZIndex++ }), this._setupObservers('-hidden', '-hiding', '-showing', '-visible', 'showing', 'visible'), this.reposition(), this.adapter.removeClass(this.container, this['class'].hiding), this.adapter.removeClass(this.container, this['class'].hidden), this.adapter.addClass(this.container, this['class'].goingToShow), this.setCss3Style(this.container, { transitionDuration: '0s' }), this.defer(function () {
        var e;
        return t.adapter.removeClass(t.container, t['class'].goingToShow), t.adapter.addClass(t.container, t['class'].showing), e = 0, t.options.showEffect && t.options.showEffectDuration && (e = t.options.showEffectDuration), t.setCss3Style(t.container, { transitionDuration: '' + e + 's' }), t._visibilityStateTimeoutId = t.setTimeout(function () {
          return t.adapter.removeClass(t.container, t['class'].showing), t.adapter.addClass(t.container, t['class'].visible);
        }, e), t._activateFirstInput();
      }), this._draw()) : this.deactivate();
    }, e.prototype._abortShowing = function () {
      return this.preparingToShow ? (this.debug('Aborting showing.'), this._clearTimeouts(), this._stopFollowingMousePosition(), this.preparingToShow = !1, this._setupObservers('-showing', '-visible', 'hiding', 'hidden')) : void 0;
    }, e.prototype.prepareToHide = function () {
      return this._abortShowing(), this._abortHiding(), this.visible ? (this.debug('Hiding in ' + this.options.hideDelay + 's'), this.preparingToHide = !0, this._setupObservers('-showing', 'visible', '-hidden', 'hiding'), this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay)) : void 0;
    }, e.prototype.hide = function () {
      var e = this;
      return this._abortShowing(), this._clearTimeouts(), this.visible ? (this.debug('Hiding!'), this.visible = !1, this.preparingToHide = !1, this._stopEnsureTriggerElement(), this._setupObservers('-showing', '-visible', '-hiding', '-hidden', 'hiding', 'hidden'), this.options.fixed || this._stopFollowingMousePosition(), this.adapter.removeClass(this.container, this['class'].visible), this.adapter.removeClass(this.container, this['class'].showing), this.adapter.addClass(this.container, this['class'].goingToHide), this.setCss3Style(this.container, { transitionDuration: '0s' }), this.defer(function () {
        var t;
        return e.adapter.removeClass(e.container, e['class'].goingToHide), e.adapter.addClass(e.container, e['class'].hiding), t = 0, e.options.hideEffect && e.options.hideEffectDuration && (t = e.options.hideEffectDuration), e.setCss3Style(e.container, { transitionDuration: '' + t + 's' }), e._visibilityStateTimeoutId = e.setTimeout(function () {
          return e.adapter.removeClass(e.container, e['class'].hiding), e.adapter.addClass(e.container, e['class'].hidden), e.setCss3Style(e.container, { transitionDuration: '0s' });
        }, t);
      })) : void 0;
    }, e.prototype._abortHiding = function () {
      return this.preparingToHide ? (this.debug('Aborting hiding.'), this._clearTimeouts(), this.preparingToHide = !1, this._setupObservers('-hiding', 'showing', 'visible')) : void 0;
    }, e.prototype.reposition = function (e) {
      var t, o, i, n = this;
      return null == e && (e = this.lastEvent), t = this.getPosition(e), null == t || (o = this.options.stem, this.options.containInViewport && (i = this._ensureViewportContainment(e, t), t = i.position, o = i.stem), this._positionsEqual(t, this.currentPosition)) ? void 0 : (this.options.stem && !o.eql(this.currentStem) && (this.redraw = !0), this.currentPosition = t, this.currentStem = o, this._draw(), this.adapter.css(this.container, {
        left: '' + t.left + 'px',
        top: '' + t.top + 'px'
      }), this.defer(function () {
        var e, t;
        return e = n.adapter.unwrap(n.container), e.style.visibility = 'hidden', t = e.offsetHeight, e.style.visibility = 'visible';
      }));
    }, e.prototype.getPosition = function (e, t, o, i) {
      var n, s, r, a, l, c, d, u, h, p;
      if (null == t && (t = this.options.tipJoint), null == o && (o = this.options.targetJoint), l = {}, this.options.target)
        u = this.adapter.offset(this.options.target), d = this.adapter.dimensions(this.options.target), l = u, o.right ? (h = this.adapter.unwrap(this.options.target), null != h.getBoundingClientRect ? l.left = h.getBoundingClientRect().right + (null != (p = window.pageXOffset) ? p : document.body.scrollLeft) : l.left += d.width) : o.center && (l.left += Math.round(d.width / 2)), o.bottom ? l.top += d.height : o.middle && (l.top += Math.round(d.height / 2)), this.options.borderWidth && (this.options.tipJoint.left && (l.left += this.options.borderWidth), this.options.tipJoint.right && (l.left -= this.options.borderWidth), this.options.tipJoint.top ? l.top += this.options.borderWidth : this.options.tipJoint.bottom && (l.top -= this.options.borderWidth));
      else {
        if (null != e && (this.lastEvent = e), r = this.adapter.mousePosition(e), null == r)
          return;
        l = {
          top: r.y,
          left: r.x
        };
      }
      return this.options.autoOffset && (c = this.options.stem ? this.options.stemLength : 0, a = c && this.options.fixed ? 2 : 10, n = t.middle && !this.options.fixed ? 15 : 0, s = t.center && !this.options.fixed ? 15 : 0, t.right ? l.left -= a + n : t.left && (l.left += a + n), t.bottom ? l.top -= a + s : t.top && (l.top += a + s), c && (null == i && (i = this.options.stem), i.right ? l.left -= c : i.left && (l.left += c), i.bottom ? l.top -= c : i.top && (l.top += c))), l.left += this.options.offset[0], l.top += this.options.offset[1], t.right ? l.left -= this.dimensions.width : t.center && (l.left -= Math.round(this.dimensions.width / 2)), t.bottom ? l.top -= this.dimensions.height : t.middle && (l.top -= Math.round(this.dimensions.height / 2)), l;
    }, e.prototype._ensureViewportContainment = function (t, o) {
      var i, n, s, r, a, l, c, d, u, h, p, f;
      if (c = this.options.stem, s = {
          position: o,
          stem: c
        }, !this.visible || !o)
        return s;
      if (d = this._sticksOut(o), !d[0] && !d[1])
        return s;
      if (h = new e.Joint(this.options.tipJoint), this.options.targetJoint && (u = new e.Joint(this.options.targetJoint)), l = this.adapter.scrollOffset(), p = this.adapter.viewportDimensions(), f = [
          o.left - l[0],
          o.top - l[1]
        ], i = !1, p.width >= this.dimensions.width && d[0])
        switch (i = !0, d[0]) {
        case this.STICKS_OUT_LEFT:
          h.setHorizontal('left'), this.options.targetJoint && u.setHorizontal('right');
          break;
        case this.STICKS_OUT_RIGHT:
          h.setHorizontal('right'), this.options.targetJoint && u.setHorizontal('left');
        }
      if (p.height >= this.dimensions.height && d[1])
        switch (i = !0, d[1]) {
        case this.STICKS_OUT_TOP:
          h.setVertical('top'), this.options.targetJoint && u.setVertical('bottom');
          break;
        case this.STICKS_OUT_BOTTOM:
          h.setVertical('bottom'), this.options.targetJoint && u.setVertical('top');
        }
      return i ? (this.options.stem && (c = h), o = this.getPosition(t, h, u, c), n = this._sticksOut(o), r = !1, a = !1, n[0] && n[0] !== d[0] && (r = !0, h.setHorizontal(this.options.tipJoint.horizontal), this.options.targetJoint && u.setHorizontal(this.options.targetJoint.horizontal)), n[1] && n[1] !== d[1] && (a = !0, h.setVertical(this.options.tipJoint.vertical), this.options.targetJoint && u.setVertical(this.options.targetJoint.vertical)), r && a ? s : ((r || a) && (this.options.stem && (c = h), o = this.getPosition(t, h, u, c)), {
        position: o,
        stem: c
      })) : s;
    }, e.prototype._sticksOut = function (e) {
      var t, o, i, n;
      return o = this.adapter.scrollOffset(), n = this.adapter.viewportDimensions(), t = [
        e.left - o[0],
        e.top - o[1]
      ], i = [
        !1,
        !1
      ], 0 > t[0] ? i[0] = this.STICKS_OUT_LEFT : t[0] + this.dimensions.width > n.width && (i[0] = this.STICKS_OUT_RIGHT), 0 > t[1] ? i[1] = this.STICKS_OUT_TOP : t[1] + this.dimensions.height > n.height && (i[1] = this.STICKS_OUT_BOTTOM), i;
    }, e.prototype._draw = function () {
      var t, o, i, n, s, r, a, l, c, d, u, h, p, f, g, m, v, b, w, k = this;
      if (this.backgroundCanvas && this.redraw) {
        if (this.debug('Drawing background.'), this.redraw = !1, this.currentStem) {
          for (v = [
              'top',
              'right',
              'bottom',
              'left'
            ], g = 0, m = v.length; m > g; g++)
            h = v[g], this.adapter.removeClass(this.container, 'stem-' + h);
          this.adapter.addClass(this.container, 'stem-' + this.currentStem.horizontal), this.adapter.addClass(this.container, 'stem-' + this.currentStem.vertical);
        }
        return r = [
          0,
          0
        ], a = [
          0,
          0
        ], __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (s = new e.Joint('top right' === (null != (b = this.currentStem) ? b + '' : void 0) ? 'top left' : 'top right'), r = [
          this.options.closeButtonRadius + this.options.closeButtonOffset[0],
          this.options.closeButtonRadius + this.options.closeButtonOffset[1]
        ], a = [
          this.options.closeButtonRadius - this.options.closeButtonOffset[0],
          this.options.closeButtonRadius - this.options.closeButtonOffset[1]
        ]), i = this.adapter.clone(this.dimensions), n = [
          0,
          0
        ], this.options.borderWidth && (i.width += 2 * this.options.borderWidth, i.height += 2 * this.options.borderWidth, n[0] -= this.options.borderWidth, n[1] -= this.options.borderWidth), this.options.shadow && (i.width += 2 * this.options.shadowBlur, i.width += Math.max(0, this.options.shadowOffset[0] - 2 * this.options.shadowBlur), i.height += 2 * this.options.shadowBlur, i.height += Math.max(0, this.options.shadowOffset[1] - 2 * this.options.shadowBlur), n[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]), n[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])), o = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, this.currentStem && (this.currentStem.left ? o.left = this.options.stemLength : this.currentStem.right && (o.right = this.options.stemLength), this.currentStem.top ? o.top = this.options.stemLength : this.currentStem.bottom && (o.bottom = this.options.stemLength)), s && (s.left ? o.left = Math.max(o.left, a[0]) : s.right && (o.right = Math.max(o.right, a[0])), s.top ? o.top = Math.max(o.top, a[1]) : s.bottom && (o.bottom = Math.max(o.bottom, a[1]))), i.width += o.left + o.right, i.height += o.top + o.bottom, n[0] -= o.left, n[1] -= o.top, this.currentStem && this.options.borderWidth && (w = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), f = w.stemLength, p = w.stemBase), t = this.adapter.unwrap(this.backgroundCanvas), t.width = i.width, t.height = i.height, this.adapter.css(this.backgroundCanvas, {
          width: '' + t.width + 'px',
          height: '' + t.height + 'px',
          left: '' + n[0] + 'px',
          top: '' + n[1] + 'px'
        }), l = t.getContext('2d'), l.setTransform(1, 0, 0, 1, 0, 0), l.clearRect(0, 0, t.width, t.height), l.beginPath(), l.fillStyle = this._getColor(l, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal), l.lineJoin = 'miter', l.miterLimit = 500, u = this.options.borderWidth / 2, this.options.borderWidth ? (l.strokeStyle = this.options.borderColor, l.lineWidth = this.options.borderWidth) : (f = this.options.stemLength, p = this.options.stemBase), null == p && (p = 0), d = function (e, t, o) {
          return o && l.moveTo(Math.max(p, k.options.borderRadius, r[0]) + 1 - u, -u), t ? (l.lineTo(e / 2 - p / 2, -u), l.lineTo(e / 2, -f - u), l.lineTo(e / 2 + p / 2, -u)) : void 0;
        }, c = function (e, t, o) {
          var i, n, s, a;
          return e ? (l.lineTo(-p + u, 0 - u), l.lineTo(f + u, -f - u), l.lineTo(u, p - u)) : t ? (a = k.options.closeButtonOffset, s = r[0], 0 !== o % 2 && (a = [
            a[1],
            a[0]
          ], s = r[1]), i = Math.acos(a[1] / k.options.closeButtonRadius), n = Math.acos(a[0] / k.options.closeButtonRadius), l.lineTo(-s + u, -u), l.arc(u - a[0], -u + a[1], k.options.closeButtonRadius, -(Math.PI / 2 + i), n, !1)) : (l.lineTo(-k.options.borderRadius + u, -u), l.quadraticCurveTo(u, -u, u, k.options.borderRadius - u));
        }, l.translate(-n[0], -n[1]), l.save(), function () {
          var t, o, i, n, r, a, u, h, p, f, g;
          for (g = [], o = p = 0, f = e.positions.length / 2; f >= 0 ? f > p : p > f; o = f >= 0 ? ++p : --p)
            r = 2 * o, a = 0 === o || 3 === o ? 0 : k.dimensions.width, u = 2 > o ? 0 : k.dimensions.height, h = Math.PI / 2 * o, i = 0 === o % 2 ? k.dimensions.width : k.dimensions.height, n = new e.Joint(e.positions[r]), t = new e.Joint(e.positions[r + 1]), l.save(), l.translate(a, u), l.rotate(h), d(i, n.eql(k.currentStem), 0 === o), l.translate(i, 0), c(t.eql(k.currentStem), t.eql(s), o), g.push(l.restore());
          return g;
        }(), l.closePath(), l.save(), this.options.shadow && (l.shadowColor = this.options.shadowColor, l.shadowBlur = this.options.shadowBlur, l.shadowOffsetX = this.options.shadowOffset[0], l.shadowOffsetY = this.options.shadowOffset[1]), l.fill(), l.restore(), this.options.borderWidth && l.stroke(), l.restore(), s ? function () {
          var e, t, o, i, n;
          return o = t = 2 * k.options.closeButtonRadius, 'top right' == s + '' ? (n = [
            k.dimensions.width - k.options.closeButtonOffset[0],
            k.options.closeButtonOffset[1]
          ], e = [
            n[0] + u,
            n[1] - u
          ]) : (n = [
            k.options.closeButtonOffset[0],
            k.options.closeButtonOffset[1]
          ], e = [
            n[0] - u,
            n[1] - u
          ]), l.translate(e[0], e[1]), i = k.options.closeButtonCrossSize / 2, l.save(), l.beginPath(), l.strokeStyle = k.options.closeButtonCrossColor, l.lineWidth = k.options.closeButtonCrossLineWidth, l.lineCap = 'round', l.moveTo(-i, -i), l.lineTo(i, i), l.stroke(), l.beginPath(), l.moveTo(i, -i), l.lineTo(-i, i), l.stroke(), l.restore(), k.adapter.css(k.closeButtonElement, {
            left: '' + (n[0] - i - k.options.closeButtonLinkOverscan) + 'px',
            top: '' + (n[1] - i - k.options.closeButtonLinkOverscan) + 'px',
            width: '' + (k.options.closeButtonCrossSize + 2 * k.options.closeButtonLinkOverscan) + 'px',
            height: '' + (k.options.closeButtonCrossSize + 2 * k.options.closeButtonLinkOverscan) + 'px'
          });
        }() : void 0;
      }
    }, e.prototype._getPathStemMeasures = function (e, t, o) {
      var i, n, s, r, a, l, c;
      if (r = o / 2, s = Math.atan(e / 2 / t), i = 2 * s, a = r / Math.sin(i), n = 2 * a * Math.cos(s), c = r + t - n, 0 > c)
        throw Error('Sorry but your stemLength / stemBase ratio is strange.');
      return l = 2 * Math.tan(s) * c, {
        stemLength: c,
        stemBase: l
      };
    }, e.prototype._getColor = function (e, t, o, i) {
      var n, s, r, a, l;
      if (null == i && (i = !1), 'string' == typeof o)
        return o;
      for (s = i ? e.createLinearGradient(0, 0, t.width, 0) : e.createLinearGradient(0, 0, 0, t.height), r = a = 0, l = o.length; l > a; r = ++a)
        n = o[r], s.addColorStop(n[0], n[1]);
      return s;
    }, e.prototype._searchAndActivateCloseButtons = function () {
      var e, t, o, i;
      for (i = this.adapter.findAll(this.container, '.' + this['class'].close), t = 0, o = i.length; o > t; t++)
        e = i[t], this.hideTriggers.push({
          element: this.adapter.wrap(e),
          event: 'click'
        });
      return this.currentObservers.showing && this._setupObservers('-showing', 'showing'), this.currentObservers.visible ? this._setupObservers('-visible', 'visible') : void 0;
    }, e.prototype._activateFirstInput = function () {
      var e;
      return e = this.adapter.unwrap(this.adapter.find(this.container, 'input, textarea')), null != e ? 'function' == typeof e.focus ? e.focus() : void 0 : void 0;
    }, e.prototype._followMousePosition = function () {
      return this.options.fixed ? void 0 : this.adapter.observe(document.body, 'mousemove', this.bound.reposition);
    }, e.prototype._stopFollowingMousePosition = function () {
      return this.options.fixed ? void 0 : this.adapter.stopObserving(document.body, 'mousemove', this.bound.reposition);
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
          return o = 'There was a problem downloading the content.', e.debug(o, t), e.setContent(o), e.adapter.addClass(e.container, e['class'].ajaxError);
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
    var o, i, n, s, r;
    e = this.adapter.unwrap(e), r = [];
    for (o in t)
      __hasProp.call(t, o) && (i = t[o], null != e.style[o] ? r.push(e.style[o] = i) : r.push(function () {
        var t, r, a;
        for (a = [], t = 0, r = vendors.length; r > t; t++)
          n = vendors[t], s = '' + this.ucfirst(n) + this.ucfirst(o), null != e.style[s] ? a.push(e.style[s] = i) : a.push(void 0);
        return a;
      }.call(this)));
    return r;
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
  }, Opentip.Joint = function () {
    function e(e) {
      null != e && (e instanceof Opentip.Joint && (e += ''), this.set(e));
    }
    return e.prototype.set = function (e) {
      return e = e.toLowerCase(), this.setHorizontal(e), this.setVertical(e), this;
    }, e.prototype.setHorizontal = function (e) {
      var t, o, i, n, s, r, a;
      for (o = [
          'left',
          'center',
          'right'
        ], i = 0, s = o.length; s > i; i++)
        t = o[i], ~e.indexOf(t) && (this.horizontal = t.toLowerCase());
      for (null == this.horizontal && (this.horizontal = 'center'), a = [], n = 0, r = o.length; r > n; n++)
        t = o[n], a.push(this[t] = this.horizontal === t ? t : void 0);
      return a;
    }, e.prototype.setVertical = function (e) {
      var t, o, i, n, s, r, a;
      for (o = [
          'top',
          'middle',
          'bottom'
        ], i = 0, s = o.length; s > i; i++)
        t = o[i], ~e.indexOf(t) && (this.vertical = t.toLowerCase());
      for (null == this.vertical && (this.vertical = 'middle'), a = [], n = 0, r = o.length; r > n; n++)
        t = o[n], a.push(this[t] = this.vertical === t ? t : void 0);
      return a;
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
    var e, t, o, i, n, s, r, a, l, c;
    for (e = Opentip.adapter, l = e.findAll(document.body, '[data-ot]'), c = [], r = 0, a = l.length; a > r; r++) {
      o = l[r], s = {}, t = e.data(o, 'ot'), ('' === t || 'true' === t || 'yes' === t) && (t = e.attr(o, 'title'), e.attr(o, 'title', '')), t = t || '';
      for (i in Opentip.styles.standard)
        n = e.data(o, 'ot' + Opentip.prototype.ucfirst(i)), null != n && ('yes' === n || 'true' === n || 'on' === n ? n = !0 : ('no' === n || 'false' === n || 'off' === n) && (n = !1), s[i] = n);
      c.push(new Opentip(o, t, s));
    }
    return c;
  }, Opentip.version = '2.2.5', Opentip.debug = !1, Opentip.lastId = 0, Opentip.lastZIndex = 100, Opentip.tips = [], Opentip._abortShowingGroup = function (e, t) {
    var o, i, n, s, r;
    for (s = Opentip.tips, r = [], i = 0, n = s.length; n > i; i++)
      o = s[i], o !== t && o.options.group === e ? r.push(o._abortShowing()) : r.push(void 0);
    return r;
  }, Opentip._hideGroup = function (e, t) {
    var o, i, n, s, r;
    for (s = Opentip.tips, r = [], i = 0, n = s.length; n > i; i++)
      o = s[i], o !== t && o.options.group === e ? r.push(o.hide()) : r.push(void 0);
    return r;
  }, Opentip.adapters = {}, Opentip.adapter = null, firstAdapter = !0, Opentip.addAdapter = function (e) {
    return Opentip.adapters[e.name] = e, firstAdapter ? (Opentip.adapter = e, e.domReady(Opentip.findElements), firstAdapter = !1) : void 0;
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
    ajax: !1,
    ajaxMethod: 'GET',
    ajaxCache: !0,
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
      var t, o, i;
      return o = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (i = e(o)).attr.apply(i, t);
    }, t.prototype.data = function () {
      var t, o, i;
      return o = arguments[0], t = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (i = e(o)).data.apply(i, t);
    }, t.prototype.find = function (t, o) {
      return e(t).find(o);
    }, t.prototype.findAll = function () {
      return this.find.apply(this, arguments);
    }, t.prototype.update = function (t, o, i) {
      return t = e(t), i ? t.text(o) : t.html(o);
    }, t.prototype.append = function (t, o) {
      return e(t).append(o);
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
    }, t.prototype.observe = function (t, o, i) {
      return e(t).bind(o, i);
    }, t.prototype.stopObserving = function (t, o, i) {
      return e(t).unbind(o, i);
    }, t.prototype.ajax = function (t) {
      var o, i;
      if (null == t.url)
        throw Error('No url provided');
      return e.ajax({
        url: t.url,
        type: null != (o = null != (i = t.method) ? i.toUpperCase() : void 0) ? o : 'GET'
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