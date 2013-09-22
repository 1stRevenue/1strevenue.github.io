function AngularFire(a, b, c) {
  this._q = a, this._parse = b, this._initial = !0, this._remoteValue = !1, this._fRef = 'string' == typeof c ? new Firebase(c) : c;
}
var Opentip, firstAdapter, i, mouseMoved, mousePosition, mousePositionObservers, position, vendors, _i, _len, _ref, __slice = [].slice, __indexOf = [].indexOf || function (a) {
    for (var b = 0, c = this.length; c > b; b++)
      if (b in this && this[b] === a)
        return b;
    return -1;
  }, __hasProp = {}.hasOwnProperty;
for (Opentip = function () {
    function a(b, c, d, e) {
      var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = this;
      if (this.id = ++a.lastId, this.debug('Creating Opentip.'), a.tips.push(this), this.adapter = a.adapter, f = this.adapter.data(b, 'opentips') || [], f.push(this), this.adapter.data(b, 'opentips', f), this.triggerElement = this.adapter.wrap(b), this.triggerElement.length > 1)
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
        }, e = this.adapter.clone(e), 'object' == typeof c ? (e = c, c = d = void 0) : 'object' == typeof d && (e = d, d = void 0), null != d && (e.title = d), null != c && this.setContent(c), null == e['extends'] && (e['extends'] = null != e.style ? e.style : a.defaultStyle), i = [e], s = e; s['extends'];) {
        if (k = s['extends'], s = a.styles[k], null == s)
          throw Error('Invalid style: ' + k);
        i.unshift(s), null == s['extends'] && 'standard' !== k && (s['extends'] = 'standard');
      }
      for (e = (p = this.adapter).extend.apply(p, [{}].concat(__slice.call(i))), e.hideTriggers = function () {
          var a, b, c, d;
          for (c = e.hideTriggers, d = [], a = 0, b = c.length; b > a; a++)
            g = c[a], d.push(g);
          return d;
        }(), e.hideTrigger && 0 === e.hideTriggers.length && e.hideTriggers.push(e.hideTrigger), q = [
          'tipJoint',
          'targetJoint',
          'stem'
        ], l = 0, n = q.length; n > l; l++)
        j = q[l], e[j] && 'string' == typeof e[j] && (e[j] = new a.Joint(e[j]));
      for (!e.ajax || e.ajax !== !0 && e.ajax || (e.ajax = 'A' === this.adapter.tagName(this.triggerElement) ? this.adapter.attr(this.triggerElement, 'href') : !1), 'click' === e.showOn && 'A' === this.adapter.tagName(this.triggerElement) && this.adapter.observe(this.triggerElement, 'click', function (a) {
          return a.preventDefault(), a.stopPropagation(), a.stopped = !0;
        }), e.target && (e.fixed = !0), e.stem === !0 && (e.stem = new a.Joint(e.tipJoint)), e.target === !0 ? e.target = this.triggerElement : e.target && (e.target = this.adapter.wrap(e.target)), this.currentStem = e.stem, null == e.delay && (e.delay = 'mouseover' === e.showOn ? 0.2 : 0), null == e.targetJoint && (e.targetJoint = new a.Joint(e.tipJoint).flip()), this.showTriggers = [], this.showTriggersWhenVisible = [], this.hideTriggers = [], e.showOn && 'creation' !== e.showOn && this.showTriggers.push({
          element: this.triggerElement,
          event: e.showOn
        }), null != e.ajaxCache && (e.cache = e.ajaxCache, delete e.ajaxCache), this.options = e, this.bound = {}, r = [
          'prepareToShow',
          'prepareToHide',
          'show',
          'hide',
          'reposition'
        ], m = 0, o = r.length; o > m; m++)
        h = r[m], this.bound[h] = function (a) {
          return function () {
            return t[a].apply(t, arguments);
          };
        }(h);
      this.adapter.domReady(function () {
        return t.activate(), 'creation' === t.options.showOn ? t.prepareToShow() : void 0;
      });
    }
    return a.prototype.STICKS_OUT_TOP = 1, a.prototype.STICKS_OUT_BOTTOM = 2, a.prototype.STICKS_OUT_LEFT = 1, a.prototype.STICKS_OUT_RIGHT = 2, a.prototype['class'] = {
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
    }, a.prototype._setup = function () {
      var a, b, c, d, e, f, g, h, i, j, k;
      for (this.debug('Setting up the tooltip.'), this._buildContainer(), this.hideTriggers = [], i = this.options.hideTriggers, d = e = 0, g = i.length; g > e; d = ++e) {
        if (b = i[d], c = null, a = this.options.hideOn instanceof Array ? this.options.hideOn[d] : this.options.hideOn, 'string' == typeof b)
          switch (b) {
          case 'trigger':
            a = a || 'mouseout', c = this.triggerElement;
            break;
          case 'tip':
            a = a || 'mouseover', c = this.container;
            break;
          case 'target':
            a = a || 'mouseover', c = this.options.target;
            break;
          case 'closeButton':
            break;
          default:
            throw Error('Unknown hide trigger: ' + b + '.');
          }
        else
          a = a || 'mouseover', c = this.adapter.wrap(b);
        c && this.hideTriggers.push({
          element: c,
          event: a,
          original: b
        });
      }
      for (j = this.hideTriggers, k = [], f = 0, h = j.length; h > f; f++)
        b = j[f], k.push(this.showTriggersWhenVisible.push({
          element: b.element,
          event: 'mouseover'
        }));
      return k;
    }, a.prototype._buildContainer = function () {
      return this.container = this.adapter.create('<div id="opentip-' + this.id + '" class="' + this['class'].container + ' ' + this['class'].hidden + ' ' + this['class'].stylePrefix + this.options.className + '"></div>'), this.adapter.css(this.container, { position: 'absolute' }), this.options.ajax && this.adapter.addClass(this.container, this['class'].loading), this.options.fixed && this.adapter.addClass(this.container, this['class'].fixed), this.options.showEffect && this.adapter.addClass(this.container, '' + this['class'].showEffectPrefix + this.options.showEffect), this.options.hideEffect ? this.adapter.addClass(this.container, '' + this['class'].hideEffectPrefix + this.options.hideEffect) : void 0;
    }, a.prototype._buildElements = function () {
      var a, b;
      return this.tooltipElement = this.adapter.create('<div class="' + this['class'].opentip + '"><div class="' + this['class'].header + '"></div><div class="' + this['class'].content + '"></div></div>'), this.backgroundCanvas = this.adapter.wrap(document.createElement('canvas')), this.adapter.css(this.backgroundCanvas, { position: 'absolute' }), 'undefined' != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)), a = this.adapter.find(this.tooltipElement, '.' + this['class'].header), this.options.title && (b = this.adapter.create('<h1></h1>'), this.adapter.update(b, this.options.title, this.options.escapeTitle), this.adapter.append(a, b)), this.options.ajax && !this.loaded && this.adapter.append(this.tooltipElement, this.adapter.create('<div class="' + this['class'].loadingIndicator + '"><span>\u21bb</span></div>')), __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (this.closeButtonElement = this.adapter.create('<a href="javascript:undefined;" class="' + this['class'].close + '"><span>Close</span></a>'), this.adapter.append(a, this.closeButtonElement)), this.adapter.append(this.container, this.backgroundCanvas), this.adapter.append(this.container, this.tooltipElement), this.adapter.append(document.body, this.container), this._newContent = !0, this.redraw = !0;
    }, a.prototype.setContent = function (a) {
      return this.content = a, this._newContent = !0, 'function' == typeof this.content ? (this._contentFunction = this.content, this.content = '') : this._contentFunction = null, this.visible ? this._updateElementContent() : void 0;
    }, a.prototype._updateElementContent = function () {
      var a;
      return (this._newContent || !this.options.cache && this._contentFunction) && (a = this.adapter.find(this.container, '.' + this['class'].content), null != a && (this._contentFunction && (this.debug('Executing content function.'), this.content = this._contentFunction(this)), this.adapter.update(a, this.content, this.options.escapeContent)), this._newContent = !1), this._storeAndLockDimensions(), this.reposition();
    }, a.prototype._storeAndLockDimensions = function () {
      var a;
      return this.container ? (a = this.dimensions, this.adapter.css(this.container, {
        width: 'auto',
        left: '0px',
        top: '0px'
      }), this.dimensions = this.adapter.dimensions(this.container), this.dimensions.width += 1, this.adapter.css(this.container, {
        width: '' + this.dimensions.width + 'px',
        top: '' + this.currentPosition.top + 'px',
        left: '' + this.currentPosition.left + 'px'
      }), this._dimensionsEqual(this.dimensions, a) ? void 0 : (this.redraw = !0, this._draw())) : void 0;
    }, a.prototype.activate = function () {
      return this._setupObservers('hidden', 'hiding');
    }, a.prototype.deactivate = function () {
      return this.debug('Deactivating tooltip.'), this.hide(), this._setupObservers('-showing', '-visible', '-hidden', '-hiding');
    }, a.prototype._setupObservers = function () {
      var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = this;
      for (d = arguments.length >= 1 ? __slice.call(arguments, 0) : [], f = 0, j = d.length; j > f; f++)
        if (c = d[f], b = !1, '-' === c.charAt(0) && (b = !0, c = c.substr(1)), this.currentObservers[c] !== !b)
          switch (this.currentObservers[c] = !b, a = function () {
              var a, c, d;
              return a = arguments.length >= 1 ? __slice.call(arguments, 0) : [], b ? (c = q.adapter).stopObserving.apply(c, a) : (d = q.adapter).observe.apply(d, a);
            }, c) {
          case 'showing':
            for (n = this.hideTriggers, g = 0, k = n.length; k > g; g++)
              e = n[g], a(e.element, e.event, this.bound.prepareToHide);
            a(null != document.onresize ? document : window, 'resize', this.bound.reposition), a(window, 'scroll', this.bound.reposition);
            break;
          case 'visible':
            for (o = this.showTriggersWhenVisible, h = 0, l = o.length; l > h; h++)
              e = o[h], a(e.element, e.event, this.bound.prepareToShow);
            break;
          case 'hiding':
            for (p = this.showTriggers, i = 0, m = p.length; m > i; i++)
              e = p[i], a(e.element, e.event, this.bound.prepareToShow);
            break;
          case 'hidden':
            break;
          default:
            throw Error('Unknown state: ' + c);
          }
      return null;
    }, a.prototype.prepareToShow = function () {
      return this._abortHiding(), this._abortShowing(), this.visible ? void 0 : (this.debug('Showing in ' + this.options.delay + 's.'), null == this.container && this._setup(), this.options.group && a._abortShowingGroup(this.options.group, this), this.preparingToShow = !0, this._setupObservers('-hidden', '-hiding', 'showing'), this._followMousePosition(), this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition), this.reposition(), this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0));
    }, a.prototype.show = function () {
      var b = this;
      return this._abortHiding(), this.visible ? void 0 : (this._clearTimeouts(), this._triggerElementExists() ? (this.debug('Showing now.'), null == this.container && this._setup(), this.options.group && a._hideGroup(this.options.group, this), this.visible = !0, this.preparingToShow = !1, null == this.tooltipElement && this._buildElements(), this._updateElementContent(), !this.options.ajax || this.loaded && this.options.cache || this._loadAjax(), this._searchAndActivateCloseButtons(), this._startEnsureTriggerElement(), this.adapter.css(this.container, { zIndex: a.lastZIndex++ }), this._setupObservers('-hidden', '-hiding', '-showing', '-visible', 'showing', 'visible'), this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition), this.reposition(), this.adapter.removeClass(this.container, this['class'].hiding), this.adapter.removeClass(this.container, this['class'].hidden), this.adapter.addClass(this.container, this['class'].goingToShow), this.setCss3Style(this.container, { transitionDuration: '0s' }), this.defer(function () {
        var a;
        return b.visible && !b.preparingToHide ? (b.adapter.removeClass(b.container, b['class'].goingToShow), b.adapter.addClass(b.container, b['class'].showing), a = 0, b.options.showEffect && b.options.showEffectDuration && (a = b.options.showEffectDuration), b.setCss3Style(b.container, { transitionDuration: '' + a + 's' }), b._visibilityStateTimeoutId = b.setTimeout(function () {
          return b.adapter.removeClass(b.container, b['class'].showing), b.adapter.addClass(b.container, b['class'].visible);
        }, a), b._activateFirstInput()) : void 0;
      }), this._draw()) : this.deactivate());
    }, a.prototype._abortShowing = function () {
      return this.preparingToShow ? (this.debug('Aborting showing.'), this._clearTimeouts(), this._stopFollowingMousePosition(), this.preparingToShow = !1, this._setupObservers('-showing', '-visible', 'hiding', 'hidden')) : void 0;
    }, a.prototype.prepareToHide = function () {
      return this._abortShowing(), this._abortHiding(), this.visible ? (this.debug('Hiding in ' + this.options.hideDelay + 's'), this.preparingToHide = !0, this._setupObservers('-showing', 'visible', '-hidden', 'hiding'), this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay)) : void 0;
    }, a.prototype.hide = function () {
      var a = this;
      return this._abortShowing(), this.visible && (this._clearTimeouts(), this.debug('Hiding!'), this.visible = !1, this.preparingToHide = !1, this._stopEnsureTriggerElement(), this._setupObservers('-showing', '-visible', '-hiding', '-hidden', 'hiding', 'hidden'), this.options.fixed || this._stopFollowingMousePosition(), this.container) ? (this.adapter.removeClass(this.container, this['class'].visible), this.adapter.removeClass(this.container, this['class'].showing), this.adapter.addClass(this.container, this['class'].goingToHide), this.setCss3Style(this.container, { transitionDuration: '0s' }), this.defer(function () {
        var b;
        return a.adapter.removeClass(a.container, a['class'].goingToHide), a.adapter.addClass(a.container, a['class'].hiding), b = 0, a.options.hideEffect && a.options.hideEffectDuration && (b = a.options.hideEffectDuration), a.setCss3Style(a.container, { transitionDuration: '' + b + 's' }), a._visibilityStateTimeoutId = a.setTimeout(function () {
          return a.adapter.removeClass(a.container, a['class'].hiding), a.adapter.addClass(a.container, a['class'].hidden), a.setCss3Style(a.container, { transitionDuration: '0s' }), a.options.removeElementsOnHide ? (a.debug('Removing HTML elements.'), a.adapter.remove(a.container), delete a.container, delete a.tooltipElement) : void 0;
        }, b);
      })) : void 0;
    }, a.prototype._abortHiding = function () {
      return this.preparingToHide ? (this.debug('Aborting hiding.'), this._clearTimeouts(), this.preparingToHide = !1, this._setupObservers('-hiding', 'showing', 'visible')) : void 0;
    }, a.prototype.reposition = function () {
      var a, b, c, d = this;
      return a = this.getPosition(), null == a || (b = this.options.stem, this.options.containInViewport && (c = this._ensureViewportContainment(a), a = c.position, b = c.stem), this._positionsEqual(a, this.currentPosition)) ? void 0 : (this.options.stem && !b.eql(this.currentStem) && (this.redraw = !0), this.currentPosition = a, this.currentStem = b, this._draw(), this.adapter.css(this.container, {
        left: '' + a.left + 'px',
        top: '' + a.top + 'px'
      }), this.defer(function () {
        var a, b;
        return a = d.adapter.unwrap(d.container), a.style.visibility = 'hidden', b = a.offsetHeight, a.style.visibility = 'visible';
      }));
    }, a.prototype.getPosition = function (a, b, c) {
      var d, e, f, g, h, i, j, k, l;
      return this.container ? (null == a && (a = this.options.tipJoint), null == b && (b = this.options.targetJoint), g = {}, this.options.target ? (j = this.adapter.offset(this.options.target), i = this.adapter.dimensions(this.options.target), g = j, b.right ? (k = this.adapter.unwrap(this.options.target), null != k.getBoundingClientRect ? g.left = k.getBoundingClientRect().right + (null != (l = window.pageXOffset) ? l : document.body.scrollLeft) : g.left += i.width) : b.center && (g.left += Math.round(i.width / 2)), b.bottom ? g.top += i.height : b.middle && (g.top += Math.round(i.height / 2)), this.options.borderWidth && (this.options.tipJoint.left && (g.left += this.options.borderWidth), this.options.tipJoint.right && (g.left -= this.options.borderWidth), this.options.tipJoint.top ? g.top += this.options.borderWidth : this.options.tipJoint.bottom && (g.top -= this.options.borderWidth))) : g = this.initialMousePosition ? {
        top: this.initialMousePosition.y,
        left: this.initialMousePosition.x
      } : {
        top: mousePosition.y,
        left: mousePosition.x
      }, this.options.autoOffset && (h = this.options.stem ? this.options.stemLength : 0, f = h && this.options.fixed ? 2 : 10, d = a.middle && !this.options.fixed ? 15 : 0, e = a.center && !this.options.fixed ? 15 : 0, a.right ? g.left -= f + d : a.left && (g.left += f + d), a.bottom ? g.top -= f + e : a.top && (g.top += f + e), h && (null == c && (c = this.options.stem), c.right ? g.left -= h : c.left && (g.left += h), c.bottom ? g.top -= h : c.top && (g.top += h))), g.left += this.options.offset[0], g.top += this.options.offset[1], a.right ? g.left -= this.dimensions.width : a.center && (g.left -= Math.round(this.dimensions.width / 2)), a.bottom ? g.top -= this.dimensions.height : a.middle && (g.top -= Math.round(this.dimensions.height / 2)), g) : void 0;
    }, a.prototype._ensureViewportContainment = function (b) {
      var c, d, e, f, g, h, i, j, k, l, m, n;
      if (i = this.options.stem, e = {
          position: b,
          stem: i
        }, !this.visible || !b)
        return e;
      if (j = this._sticksOut(b), !j[0] && !j[1])
        return e;
      if (l = new a.Joint(this.options.tipJoint), this.options.targetJoint && (k = new a.Joint(this.options.targetJoint)), h = this.adapter.scrollOffset(), m = this.adapter.viewportDimensions(), n = [
          b.left - h[0],
          b.top - h[1]
        ], c = !1, m.width >= this.dimensions.width && j[0])
        switch (c = !0, j[0]) {
        case this.STICKS_OUT_LEFT:
          l.setHorizontal('left'), this.options.targetJoint && k.setHorizontal('right');
          break;
        case this.STICKS_OUT_RIGHT:
          l.setHorizontal('right'), this.options.targetJoint && k.setHorizontal('left');
        }
      if (m.height >= this.dimensions.height && j[1])
        switch (c = !0, j[1]) {
        case this.STICKS_OUT_TOP:
          l.setVertical('top'), this.options.targetJoint && k.setVertical('bottom');
          break;
        case this.STICKS_OUT_BOTTOM:
          l.setVertical('bottom'), this.options.targetJoint && k.setVertical('top');
        }
      return c ? (this.options.stem && (i = l), b = this.getPosition(l, k, i), d = this._sticksOut(b), f = !1, g = !1, d[0] && d[0] !== j[0] && (f = !0, l.setHorizontal(this.options.tipJoint.horizontal), this.options.targetJoint && k.setHorizontal(this.options.targetJoint.horizontal)), d[1] && d[1] !== j[1] && (g = !0, l.setVertical(this.options.tipJoint.vertical), this.options.targetJoint && k.setVertical(this.options.targetJoint.vertical)), f && g ? e : ((f || g) && (this.options.stem && (i = l), b = this.getPosition(l, k, i)), {
        position: b,
        stem: i
      })) : e;
    }, a.prototype._sticksOut = function (a) {
      var b, c, d, e;
      return c = this.adapter.scrollOffset(), e = this.adapter.viewportDimensions(), b = [
        a.left - c[0],
        a.top - c[1]
      ], d = [
        !1,
        !1
      ], 0 > b[0] ? d[0] = this.STICKS_OUT_LEFT : b[0] + this.dimensions.width > e.width && (d[0] = this.STICKS_OUT_RIGHT), 0 > b[1] ? d[1] = this.STICKS_OUT_TOP : b[1] + this.dimensions.height > e.height && (d[1] = this.STICKS_OUT_BOTTOM), d;
    }, a.prototype._draw = function () {
      var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = this;
      if (this.backgroundCanvas && this.redraw) {
        if (this.debug('Drawing background.'), this.redraw = !1, this.currentStem) {
          for (r = [
              'top',
              'right',
              'bottom',
              'left'
            ], p = 0, q = r.length; q > p; p++)
            m = r[p], this.adapter.removeClass(this.container, 'stem-' + m);
          this.adapter.addClass(this.container, 'stem-' + this.currentStem.horizontal), this.adapter.addClass(this.container, 'stem-' + this.currentStem.vertical);
        }
        return g = [
          0,
          0
        ], h = [
          0,
          0
        ], __indexOf.call(this.options.hideTriggers, 'closeButton') >= 0 && (f = new a.Joint('top right' === (null != (s = this.currentStem) ? s + '' : void 0) ? 'top left' : 'top right'), g = [
          this.options.closeButtonRadius + this.options.closeButtonOffset[0],
          this.options.closeButtonRadius + this.options.closeButtonOffset[1]
        ], h = [
          this.options.closeButtonRadius - this.options.closeButtonOffset[0],
          this.options.closeButtonRadius - this.options.closeButtonOffset[1]
        ]), d = this.adapter.clone(this.dimensions), e = [
          0,
          0
        ], this.options.borderWidth && (d.width += 2 * this.options.borderWidth, d.height += 2 * this.options.borderWidth, e[0] -= this.options.borderWidth, e[1] -= this.options.borderWidth), this.options.shadow && (d.width += 2 * this.options.shadowBlur, d.width += Math.max(0, this.options.shadowOffset[0] - 2 * this.options.shadowBlur), d.height += 2 * this.options.shadowBlur, d.height += Math.max(0, this.options.shadowOffset[1] - 2 * this.options.shadowBlur), e[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]), e[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])), c = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, this.currentStem && (this.currentStem.left ? c.left = this.options.stemLength : this.currentStem.right && (c.right = this.options.stemLength), this.currentStem.top ? c.top = this.options.stemLength : this.currentStem.bottom && (c.bottom = this.options.stemLength)), f && (f.left ? c.left = Math.max(c.left, h[0]) : f.right && (c.right = Math.max(c.right, h[0])), f.top ? c.top = Math.max(c.top, h[1]) : f.bottom && (c.bottom = Math.max(c.bottom, h[1]))), d.width += c.left + c.right, d.height += c.top + c.bottom, e[0] -= c.left, e[1] -= c.top, this.currentStem && this.options.borderWidth && (t = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), o = t.stemLength, n = t.stemBase), b = this.adapter.unwrap(this.backgroundCanvas), b.width = d.width, b.height = d.height, this.adapter.css(this.backgroundCanvas, {
          width: '' + b.width + 'px',
          height: '' + b.height + 'px',
          left: '' + e[0] + 'px',
          top: '' + e[1] + 'px'
        }), i = b.getContext('2d'), i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, b.width, b.height), i.beginPath(), i.fillStyle = this._getColor(i, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal), i.lineJoin = 'miter', i.miterLimit = 500, l = this.options.borderWidth / 2, this.options.borderWidth ? (i.strokeStyle = this.options.borderColor, i.lineWidth = this.options.borderWidth) : (o = this.options.stemLength, n = this.options.stemBase), null == n && (n = 0), k = function (a, b, c) {
          return c && i.moveTo(Math.max(n, u.options.borderRadius, g[0]) + 1 - l, -l), b ? (i.lineTo(a / 2 - n / 2, -l), i.lineTo(a / 2, -o - l), i.lineTo(a / 2 + n / 2, -l)) : void 0;
        }, j = function (a, b, c) {
          var d, e, f, h;
          return a ? (i.lineTo(-n + l, 0 - l), i.lineTo(o + l, -o - l), i.lineTo(l, n - l)) : b ? (h = u.options.closeButtonOffset, f = g[0], 0 !== c % 2 && (h = [
            h[1],
            h[0]
          ], f = g[1]), d = Math.acos(h[1] / u.options.closeButtonRadius), e = Math.acos(h[0] / u.options.closeButtonRadius), i.lineTo(-f + l, -l), i.arc(l - h[0], -l + h[1], u.options.closeButtonRadius, -(Math.PI / 2 + d), e, !1)) : (i.lineTo(-u.options.borderRadius + l, -l), i.quadraticCurveTo(l, -l, l, u.options.borderRadius - l));
        }, i.translate(-e[0], -e[1]), i.save(), function () {
          var b, c, d, e, g, h, l, m, n, o, p;
          for (p = [], c = n = 0, o = a.positions.length / 2; o >= 0 ? o > n : n > o; c = o >= 0 ? ++n : --n)
            g = 2 * c, h = 0 === c || 3 === c ? 0 : u.dimensions.width, l = 2 > c ? 0 : u.dimensions.height, m = Math.PI / 2 * c, d = 0 === c % 2 ? u.dimensions.width : u.dimensions.height, e = new a.Joint(a.positions[g]), b = new a.Joint(a.positions[g + 1]), i.save(), i.translate(h, l), i.rotate(m), k(d, e.eql(u.currentStem), 0 === c), i.translate(d, 0), j(b.eql(u.currentStem), b.eql(f), c), p.push(i.restore());
          return p;
        }(), i.closePath(), i.save(), this.options.shadow && (i.shadowColor = this.options.shadowColor, i.shadowBlur = this.options.shadowBlur, i.shadowOffsetX = this.options.shadowOffset[0], i.shadowOffsetY = this.options.shadowOffset[1]), i.fill(), i.restore(), this.options.borderWidth && i.stroke(), i.restore(), f ? function () {
          var a, b, c, d, e;
          return c = b = 2 * u.options.closeButtonRadius, 'top right' == f + '' ? (e = [
            u.dimensions.width - u.options.closeButtonOffset[0],
            u.options.closeButtonOffset[1]
          ], a = [
            e[0] + l,
            e[1] - l
          ]) : (e = [
            u.options.closeButtonOffset[0],
            u.options.closeButtonOffset[1]
          ], a = [
            e[0] - l,
            e[1] - l
          ]), i.translate(a[0], a[1]), d = u.options.closeButtonCrossSize / 2, i.save(), i.beginPath(), i.strokeStyle = u.options.closeButtonCrossColor, i.lineWidth = u.options.closeButtonCrossLineWidth, i.lineCap = 'round', i.moveTo(-d, -d), i.lineTo(d, d), i.stroke(), i.beginPath(), i.moveTo(d, -d), i.lineTo(-d, d), i.stroke(), i.restore(), u.adapter.css(u.closeButtonElement, {
            left: '' + (e[0] - d - u.options.closeButtonLinkOverscan) + 'px',
            top: '' + (e[1] - d - u.options.closeButtonLinkOverscan) + 'px',
            width: '' + (u.options.closeButtonCrossSize + 2 * u.options.closeButtonLinkOverscan) + 'px',
            height: '' + (u.options.closeButtonCrossSize + 2 * u.options.closeButtonLinkOverscan) + 'px'
          });
        }() : void 0;
      }
    }, a.prototype._getPathStemMeasures = function (a, b, c) {
      var d, e, f, g, h, i, j;
      if (g = c / 2, f = Math.atan(a / 2 / b), d = 2 * f, h = g / Math.sin(d), e = 2 * h * Math.cos(f), j = g + b - e, 0 > j)
        throw Error('Sorry but your stemLength / stemBase ratio is strange.');
      return i = 2 * Math.tan(f) * j, {
        stemLength: j,
        stemBase: i
      };
    }, a.prototype._getColor = function (a, b, c, d) {
      var e, f, g, h, i;
      if (null == d && (d = !1), 'string' == typeof c)
        return c;
      for (f = d ? a.createLinearGradient(0, 0, b.width, 0) : a.createLinearGradient(0, 0, 0, b.height), g = h = 0, i = c.length; i > h; g = ++h)
        e = c[g], f.addColorStop(e[0], e[1]);
      return f;
    }, a.prototype._searchAndActivateCloseButtons = function () {
      var a, b, c, d;
      for (d = this.adapter.findAll(this.container, '.' + this['class'].close), b = 0, c = d.length; c > b; b++)
        a = d[b], this.hideTriggers.push({
          element: this.adapter.wrap(a),
          event: 'click'
        });
      return this.currentObservers.showing && this._setupObservers('-showing', 'showing'), this.currentObservers.visible ? this._setupObservers('-visible', 'visible') : void 0;
    }, a.prototype._activateFirstInput = function () {
      var a;
      return a = this.adapter.unwrap(this.adapter.find(this.container, 'input, textarea')), null != a ? 'function' == typeof a.focus ? a.focus() : void 0 : void 0;
    }, a.prototype._followMousePosition = function () {
      return this.options.fixed ? void 0 : a._observeMousePosition(this.bound.reposition);
    }, a.prototype._stopFollowingMousePosition = function () {
      return this.options.fixed ? void 0 : a._stopObservingMousePosition(this.bound.reposition);
    }, a.prototype._clearShowTimeout = function () {
      return clearTimeout(this._showTimeoutId);
    }, a.prototype._clearHideTimeout = function () {
      return clearTimeout(this._hideTimeoutId);
    }, a.prototype._clearTimeouts = function () {
      return clearTimeout(this._visibilityStateTimeoutId), this._clearShowTimeout(), this._clearHideTimeout();
    }, a.prototype._triggerElementExists = function () {
      var a;
      for (a = this.adapter.unwrap(this.triggerElement); a.parentNode;) {
        if ('BODY' === a.parentNode.tagName)
          return !0;
        a = a.parentNode;
      }
      return !1;
    }, a.prototype._loadAjax = function () {
      var a = this;
      return this.loading ? void 0 : (this.loaded = !1, this.loading = !0, this.adapter.addClass(this.container, this['class'].loading), this.setContent(''), this.debug('Loading content from ' + this.options.ajax), this.adapter.ajax({
        url: this.options.ajax,
        method: this.options.ajaxMethod,
        onSuccess: function (b) {
          return a.debug('Loading successful.'), a.adapter.removeClass(a.container, a['class'].loading), a.setContent(b);
        },
        onError: function (b) {
          var c;
          return c = a.options.ajaxErrorMessage, a.debug(c, b), a.setContent(c), a.adapter.addClass(a.container, a['class'].ajaxError);
        },
        onComplete: function () {
          return a.adapter.removeClass(a.container, a['class'].loading), a.loading = !1, a.loaded = !0, a._searchAndActivateCloseButtons(), a._activateFirstInput(), a.reposition();
        }
      }));
    }, a.prototype._ensureTriggerElement = function () {
      return this._triggerElementExists() ? void 0 : (this.deactivate(), this._stopEnsureTriggerElement());
    }, a.prototype._ensureTriggerElementInterval = 1000, a.prototype._startEnsureTriggerElement = function () {
      var a = this;
      return this._ensureTriggerElementTimeoutId = setInterval(function () {
        return a._ensureTriggerElement();
      }, this._ensureTriggerElementInterval);
    }, a.prototype._stopEnsureTriggerElement = function () {
      return clearInterval(this._ensureTriggerElementTimeoutId);
    }, a;
  }(), vendors = [
    'khtml',
    'ms',
    'o',
    'moz',
    'webkit'
  ], Opentip.prototype.setCss3Style = function (a, b) {
    var c, d, e, f, g;
    a = this.adapter.unwrap(a), g = [];
    for (c in b)
      __hasProp.call(b, c) && (d = b[c], null != a.style[c] ? g.push(a.style[c] = d) : g.push(function () {
        var b, g, h;
        for (h = [], b = 0, g = vendors.length; g > b; b++)
          e = vendors[b], f = '' + this.ucfirst(e) + this.ucfirst(c), null != a.style[f] ? h.push(a.style[f] = d) : h.push(void 0);
        return h;
      }.call(this)));
    return g;
  }, Opentip.prototype.defer = function (a) {
    return setTimeout(a, 0);
  }, Opentip.prototype.setTimeout = function (a, b) {
    return setTimeout(a, b ? 1000 * b : 0);
  }, Opentip.prototype.ucfirst = function (a) {
    return null == a ? '' : a.charAt(0).toUpperCase() + a.slice(1);
  }, Opentip.prototype.dasherize = function (a) {
    return a.replace(/([A-Z])/g, function (a, b) {
      return '-' + b.toLowerCase();
    });
  }, mousePositionObservers = [], mousePosition = {
    x: 0,
    y: 0
  }, mouseMoved = function (a) {
    var b, c, d, e;
    for (mousePosition = Opentip.adapter.mousePosition(a), e = [], c = 0, d = mousePositionObservers.length; d > c; c++)
      b = mousePositionObservers[c], e.push(b());
    return e;
  }, Opentip.followMousePosition = function () {
    return Opentip.adapter.observe(document.body, 'mousemove', mouseMoved);
  }, Opentip._observeMousePosition = function (a) {
    return mousePositionObservers.push(a);
  }, Opentip._stopObservingMousePosition = function (a) {
    var b;
    return mousePositionObservers = function () {
      var c, d, e;
      for (e = [], c = 0, d = mousePositionObservers.length; d > c; c++)
        b = mousePositionObservers[c], b !== a && e.push(b);
      return e;
    }();
  }, Opentip.Joint = function () {
    function a(a) {
      null != a && (a instanceof Opentip.Joint && (a += ''), this.set(a));
    }
    return a.prototype.set = function (a) {
      return a = a.toLowerCase(), this.setHorizontal(a), this.setVertical(a), this;
    }, a.prototype.setHorizontal = function (a) {
      var b, c, d, e, f, g, h;
      for (c = [
          'left',
          'center',
          'right'
        ], d = 0, f = c.length; f > d; d++)
        b = c[d], ~a.indexOf(b) && (this.horizontal = b.toLowerCase());
      for (null == this.horizontal && (this.horizontal = 'center'), h = [], e = 0, g = c.length; g > e; e++)
        b = c[e], h.push(this[b] = this.horizontal === b ? b : void 0);
      return h;
    }, a.prototype.setVertical = function (a) {
      var b, c, d, e, f, g, h;
      for (c = [
          'top',
          'middle',
          'bottom'
        ], d = 0, f = c.length; f > d; d++)
        b = c[d], ~a.indexOf(b) && (this.vertical = b.toLowerCase());
      for (null == this.vertical && (this.vertical = 'middle'), h = [], e = 0, g = c.length; g > e; e++)
        b = c[e], h.push(this[b] = this.vertical === b ? b : void 0);
      return h;
    }, a.prototype.eql = function (a) {
      return null != a && this.horizontal === a.horizontal && this.vertical === a.vertical;
    }, a.prototype.flip = function () {
      var a, b;
      return b = Opentip.position[this.toString(!0)], a = (b + 4) % 8, this.set(Opentip.positions[a]), this;
    }, a.prototype.toString = function (a) {
      var b, c;
      return null == a && (a = !1), c = 'middle' === this.vertical ? '' : this.vertical, b = 'center' === this.horizontal ? '' : this.horizontal, c && b && (b = a ? Opentip.prototype.ucfirst(b) : ' ' + b), '' + c + b;
    }, a;
  }(), Opentip.prototype._positionsEqual = function (a, b) {
    return null != a && null != b && a.left === b.left && a.top === b.top;
  }, Opentip.prototype._dimensionsEqual = function (a, b) {
    return null != a && null != b && a.width === b.width && a.height === b.height;
  }, Opentip.prototype.debug = function () {
    var a;
    return a = arguments.length >= 1 ? __slice.call(arguments, 0) : [], Opentip.debug && null != ('undefined' != typeof console && null !== console ? console.debug : void 0) ? (a.unshift('#' + this.id + ' |'), console.debug.apply(console, a)) : void 0;
  }, Opentip.findElements = function () {
    var a, b, c, d, e, f, g, h, i, j;
    for (a = Opentip.adapter, i = a.findAll(document.body, '[data-ot]'), j = [], g = 0, h = i.length; h > g; g++) {
      c = i[g], f = {}, b = a.data(c, 'ot'), ('' === b || 'true' === b || 'yes' === b) && (b = a.attr(c, 'title'), a.attr(c, 'title', '')), b = b || '';
      for (d in Opentip.styles.standard)
        e = a.data(c, 'ot' + Opentip.prototype.ucfirst(d)), null != e && ('yes' === e || 'true' === e || 'on' === e ? e = !0 : ('no' === e || 'false' === e || 'off' === e) && (e = !1), f[d] = e);
      j.push(new Opentip(c, b, f));
    }
    return j;
  }, Opentip.version = '2.4.6', Opentip.debug = !1, Opentip.lastId = 0, Opentip.lastZIndex = 100, Opentip.tips = [], Opentip._abortShowingGroup = function (a, b) {
    var c, d, e, f, g;
    for (f = Opentip.tips, g = [], d = 0, e = f.length; e > d; d++)
      c = f[d], c !== b && c.options.group === a ? g.push(c._abortShowing()) : g.push(void 0);
    return g;
  }, Opentip._hideGroup = function (a, b) {
    var c, d, e, f, g;
    for (f = Opentip.tips, g = [], d = 0, e = f.length; e > d; d++)
      c = f[d], c !== b && c.options.group === a ? g.push(c.hide()) : g.push(void 0);
    return g;
  }, Opentip.adapters = {}, Opentip.adapter = null, firstAdapter = !0, Opentip.addAdapter = function (a) {
    return Opentip.adapters[a.name] = a, firstAdapter ? (Opentip.adapter = a, a.domReady(Opentip.findElements), a.domReady(Opentip.followMousePosition), firstAdapter = !1) : void 0;
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
!function (a) {
  var b;
  return a.fn.opentip = function (a, b, c) {
    return new Opentip(this, a, b, c);
  }, b = function () {
    function b() {
    }
    return b.prototype.name = 'jquery', b.prototype.domReady = function (b) {
      return a(b);
    }, b.prototype.create = function (b) {
      return a(b);
    }, b.prototype.wrap = function (b) {
      if (b = a(b), b.length > 1)
        throw Error('Multiple elements provided.');
      return b;
    }, b.prototype.unwrap = function (b) {
      return a(b)[0];
    }, b.prototype.tagName = function (a) {
      return this.unwrap(a).tagName;
    }, b.prototype.attr = function () {
      var b, c, d;
      return c = arguments[0], b = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (d = a(c)).attr.apply(d, b);
    }, b.prototype.data = function () {
      var b, c, d;
      return c = arguments[0], b = arguments.length >= 2 ? __slice.call(arguments, 1) : [], (d = a(c)).data.apply(d, b);
    }, b.prototype.find = function (b, c) {
      return a(b).find(c).get(0);
    }, b.prototype.findAll = function (b, c) {
      return a(b).find(c);
    }, b.prototype.update = function (b, c, d) {
      return b = a(b), d ? b.text(c) : b.html(c);
    }, b.prototype.append = function (b, c) {
      return a(b).append(c);
    }, b.prototype.remove = function (b) {
      return a(b).remove();
    }, b.prototype.addClass = function (b, c) {
      return a(b).addClass(c);
    }, b.prototype.removeClass = function (b, c) {
      return a(b).removeClass(c);
    }, b.prototype.css = function (b, c) {
      return a(b).css(c);
    }, b.prototype.dimensions = function (b) {
      return {
        width: a(b).outerWidth(),
        height: a(b).outerHeight()
      };
    }, b.prototype.scrollOffset = function () {
      return [
        window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      ];
    }, b.prototype.viewportDimensions = function () {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    }, b.prototype.mousePosition = function (a) {
      return null == a ? null : {
        x: a.pageX,
        y: a.pageY
      };
    }, b.prototype.offset = function (b) {
      var c;
      return c = a(b).offset(), {
        left: c.left,
        top: c.top
      };
    }, b.prototype.observe = function (b, c, d) {
      return a(b).bind(c, d);
    }, b.prototype.stopObserving = function (b, c, d) {
      return a(b).unbind(c, d);
    }, b.prototype.ajax = function (b) {
      var c, d;
      if (null == b.url)
        throw Error('No url provided');
      return a.ajax({
        url: b.url,
        type: null != (c = null != (d = b.method) ? d.toUpperCase() : void 0) ? c : 'GET'
      }).done(function (a) {
        return 'function' == typeof b.onSuccess ? b.onSuccess(a) : void 0;
      }).fail(function (a) {
        return 'function' == typeof b.onError ? b.onError('Server responded with status ' + a.status) : void 0;
      }).always(function () {
        return 'function' == typeof b.onComplete ? b.onComplete() : void 0;
      });
    }, b.prototype.clone = function (b) {
      return a.extend({}, b);
    }, b.prototype.extend = function () {
      var b, c;
      return c = arguments[0], b = arguments.length >= 2 ? __slice.call(arguments, 1) : [], a.extend.apply(a, [c].concat(__slice.call(b)));
    }, b;
  }(), Opentip.addAdapter(new b());
}(jQuery);
var FirebaseIndex;
!function (a) {
  'use strict';
  function b(a, b) {
    this.indexRef = a, this.dataRef = b, this._initMemberVars();
  }
  function c(a, b, c, d) {
    a.forEach(function (a) {
      m(function () {
        a.fn(k(b, c), d);
      });
    });
  }
  function d(a, b, c) {
    var d = c ? b.bind(c) : b;
    return a.push({
      fn: d,
      cb: b,
      ctx: c
    }), d;
  }
  function e(a, b, c) {
    var d;
    for (d in b)
      b.hasOwnProperty(d) && b[d].loaded && f(a(d), d, c);
  }
  function f(a, b, c) {
    a.once('value', function (a) {
      null !== a.val() && m(function () {
        c(k(a, b));
      });
    });
  }
  function g(b, c, d, e) {
    var f = d.name(), g = d.ref();
    return b[f] = {
      prevId: e,
      loaded: !1,
      def: a ? a.Deferred() : null,
      ref: d.ref(),
      dispose: function () {
        g.off('value', c), delete b[f];
      }
    }, g;
  }
  function h(a, b, c) {
    var d = a[b];
    b && d && !d.loaded ? d.def ? d.def.done(c) : setTimeout(function () {
      h(a, b, c);
    }, 10) : c();
  }
  function i(a) {
    var b = Array.prototype.slice.call(arguments, 1);
    b.forEach(function (b) {
      a[b] = a[b].bind(a);
    });
  }
  function j(a, b, c) {
    var d;
    for (d in b.prototype)
      b.prototype.hasOwnProperty(d) && (a.prototype[d] = b.prototype[d]);
    for (d in c)
      c.hasOwnProperty(d) && (a.prototype[d] = c[d]);
  }
  function k(a, b) {
    return a.name = function () {
      return b;
    }, a;
  }
  var l;
  FirebaseIndex = function (a, b) {
    this.indexRef = a, this.dataRef = 'function' == typeof b ? b : function (a) {
      return b.child(a);
    }, this._initMemberVars();
  }, FirebaseIndex.prototype.add = function (a, b, c) {
    var d = this.indexRef.child(a);
    return b && 'function' == typeof b && (c = b, b = l), b !== l ? d.setWithPriority(1, b, c) : d.set(1, c), this;
  }, FirebaseIndex.prototype.drop = function (a, b) {
    return this.indexRef.child(a).remove(b), this;
  }, FirebaseIndex.prototype.on = function (a, b, c) {
    var f;
    switch (this._initChildListeners(), 2 === arguments.length && 'object' == typeof b && (c = b, b = null), a) {
    case 'child_added':
      f = d(this.eventListeners[a], b, c), e(this.dataRef, this.childRefs, f);
      break;
    case 'child_changed':
    case 'child_removed':
    case 'child_moved':
      f = d(this.eventListeners[a], b, c);
      break;
    default:
      throw new Error('I cannot process this event type: ' + a);
    }
    return f;
  }, FirebaseIndex.prototype.off = function (a, b, c) {
    switch (2 === arguments.length && 'object' == typeof b && (c = b, b = null), a) {
    case 'child_added':
    case 'child_changed':
    case 'child_moved':
    case 'child_removed':
      for (var d = this.eventListeners[a]; d.length && d.some(function (a, e) {
          return a.cb === b && a.ctx === c ? (d.splice(e, 1), !0) : !1;
        }););
      break;
    default:
      throw new Error('I cannot process this event type: ' + a);
    }
    return this;
  }, FirebaseIndex.prototype.startAt = function (a, c) {
    return new b(this.indexRef.startAt(a, c), this.dataRef);
  }, FirebaseIndex.prototype.endAt = function (a, c) {
    return new b(this.indexRef.endAt(a, c), this.dataRef);
  }, FirebaseIndex.prototype.limit = function (a) {
    return new b(this.indexRef.limit(a), this.dataRef);
  }, FirebaseIndex.prototype.dispose = function () {
    this.childRefs.forEach(function (a) {
      a.dispose();
    }), this.indexRef.off('child_added', this._indexAdded), this.indexRef.off('child_removed', this._indexRemoved), this.indexRef.off('child_moved', this._indexMoved), this.childRefs = this.eventListeners = this.indexRef = this.dataRef = null;
  }, FirebaseIndex.prototype._initMemberVars = function () {
    i(this, '_indexAdded', '_indexRemoved', '_indexMoved', '_childChanged'), this.initialized = !1, this.eventListeners = {
      child_added: [],
      child_moved: [],
      child_removed: [],
      child_changed: []
    }, this.childRefs = {};
  }, FirebaseIndex.prototype._initChildListeners = function () {
    this.initialized || (this.initialized = !0, this.indexRef.on('child_added', this._indexAdded), this.indexRef.on('child_removed', this._indexRemoved), this.indexRef.on('child_moved', this._indexMoved));
  }, FirebaseIndex.prototype._indexAdded = function (a, b) {
    g(this.childRefs, this._childChanged, a, b), this.dataRef(a.name()).on('value', this._childChanged.bind(this, a.name()));
  }, FirebaseIndex.prototype._indexRemoved = function (a) {
    var b = a.name();
    this.childRefs[b] && (this.childRefs[b].dispose(), c(this.eventListeners.child_removed, a, b));
  }, FirebaseIndex.prototype._indexMoved = function (a, b) {
    var d = a.name();
    this.childRefs[d] && (this.childRefs[d].prevId = b, c(this.eventListeners.child_moved, a, d, b));
  }, FirebaseIndex.prototype._childChanged = function (a, b) {
    var d = b.val(), e = null, f = l, g = this.childRefs[a];
    return null === d ? this.childRefs[a] && (e = 'child_removed') : g.loaded ? e = 'child_changed' : (f = this.childRefs[a].prevId, h(this.childRefs, f, function () {
      c(this.eventListeners.child_added, b, a, f), g.loaded = !0, g.def && g.def.resolve();
    }.bind(this))), e && c(this.eventListeners[e], b, a), this;
  }, j(b, FirebaseIndex, {
    add: function () {
      throw new Error('cannot add to index on read-only FirebaseIndexQueue instance (after calling limit, endAt, or startAt)');
    },
    drop: function () {
      throw new Error('cannot drop from index on read-only FirebaseIndexQueue instance (after calling limit, endAt, or startAt)');
    },
    child: function () {
      throw new Error('cannot access child on read-only FirebaseIndexQueue instance (after calling limit, endAt, or startAt)');
    }
  });
  var m;
  m = 'object' == typeof _ && _ && 'function' == typeof _.defer ? _.defer : function (a) {
    return setTimeout(a, 0);
  }, Function.prototype.bind || (Function.prototype.bind = function (a) {
    if ('function' != typeof this)
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    var b = Array.prototype.slice.call(arguments, 1), c = this, d = function () {
      }, e = function () {
        return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)));
      };
    return d.prototype = this.prototype, e.prototype = new d(), e;
  }), Array.prototype.some || (Array.prototype.some = function (a) {
    if (null == this)
      throw new TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ('function' != typeof a)
      throw new TypeError();
    for (var d = arguments[1], e = 0; c > e; e++)
      if (e in b && a.call(d, b[e], e, b))
        return !0;
    return !1;
  }), Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
    for (var c = 0, d = this.length; d > c; ++c)
      a.call(b, this[c], c, this);
  });
}(jQuery), angular.module('firebase', []).value('Firebase', Firebase), angular.module('firebase').factory('angularFire', [
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
]), function (a, b) {
  'object' == typeof exports ? b(exports) : 'function' == typeof define && define.amd ? define(['exports'], b) : b(a);
}(this, function (a) {
  function b(a) {
    this._targetElement = a, this._options = {
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Back',
      skipLabel: 'Skip',
      doneLabel: 'Done',
      tooltipPosition: 'bottom',
      exitOnEsc: !0,
      exitOnOverlayClick: !0
    };
  }
  function c() {
    'undefined' == typeof this._currentStep ? this._currentStep = 0 : ++this._currentStep, this._introItems.length <= this._currentStep ? ('function' == typeof this._introCompleteCallback && this._introCompleteCallback.call(this), e.call(this, this._targetElement)) : h.call(this, this._introItems[this._currentStep]);
  }
  function d() {
    return 0 === this._currentStep ? !1 : (h.call(this, this._introItems[--this._currentStep]), void 0);
  }
  function e(a) {
    var b = a.querySelector('.introjs-overlay');
    if (b.style.opacity = 0, setTimeout(function () {
        b.parentNode && b.parentNode.removeChild(b);
      }, 500), (a = a.querySelector('.introjs-helperLayer')) && a.parentNode.removeChild(a), (a = document.querySelector('.introjs-showElement')) && (a.className = a.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '')), (a = document.querySelectorAll('.introjs-fixParent')) && 0 < a.length)
      for (var c = a.length - 1; c >= 0; c--)
        a[c].className = a[c].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
    window.removeEventListener ? window.removeEventListener('keydown', this._onKeyDown, !0) : document.detachEvent && document.detachEvent('onkeydown', this._onKeyDown), this._currentStep = void 0, void 0 != this._introExitCallback && this._introExitCallback.call(this);
  }
  function f(a, b, c) {
    if (a = k(b), b.style.top = null, b.style.right = null, b.style.bottom = null, b.style.left = null, this._introItems[this._currentStep])
      switch (this._introItems[this._currentStep].position) {
      case 'top':
        b.style.left = '15px', b.style.top = '-' + (a.height + 10) + 'px', c.className = 'introjs-arrow bottom';
        break;
      case 'right':
        b.style.right = '-' + (a.width + 10) + 'px', c.className = 'introjs-arrow left';
        break;
      case 'left':
        b.style.top = '15px', b.style.left = '-' + (a.width + 10) + 'px', c.className = 'introjs-arrow right';
        break;
      default:
        b.style.bottom = '-' + (a.height + 10) + 'px', c.className = 'introjs-arrow top';
      }
  }
  function g(a) {
    if (a && this._introItems[this._currentStep]) {
      var b = k(this._introItems[this._currentStep].element);
      a.setAttribute('style', 'width: ' + (b.width + 10) + 'px; height:' + (b.height + 10) + 'px; top:' + (b.top - 5) + 'px;left: ' + (b.left - 5) + 'px;');
    }
  }
  function h(a) {
    var b;
    'undefined' != typeof this._introChangeCallback && this._introChangeCallback.call(this, a.element);
    var h = this, j = document.querySelector('.introjs-helperLayer');
    if (k(a.element), null != j) {
      var l = j.querySelector('.introjs-helperNumberLayer'), m = j.querySelector('.introjs-tooltiptext'), n = j.querySelector('.introjs-arrow'), o = j.querySelector('.introjs-tooltip'), p = j.querySelector('.introjs-skipbutton');
      b = j.querySelector('.introjs-prevbutton');
      var q = j.querySelector('.introjs-nextbutton');
      if (o.style.opacity = 0, g.call(h, j), (j = document.querySelectorAll('.introjs-fixParent')) && 0 < j.length)
        for (var r = j.length - 1; r >= 0; r--)
          j[r].className = j[r].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
      j = document.querySelector('.introjs-showElement'), j.className = j.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''), h._lastShowElementTimer && clearTimeout(h._lastShowElementTimer), h._lastShowElementTimer = setTimeout(function () {
        l.innerHTML = a.step, m.innerHTML = a.intro, f.call(h, a.element, o, n), o.style.opacity = 1;
      }, 350);
    } else {
      p = document.createElement('div'), b = document.createElement('span'), j = document.createElement('div'), r = document.createElement('div'), p.className = 'introjs-helperLayer', g.call(h, p), this._targetElement.appendChild(p), b.className = 'introjs-helperNumberLayer', j.className = 'introjs-arrow', r.className = 'introjs-tooltip', b.innerHTML = a.step, r.innerHTML = '<div class="introjs-tooltiptext">' + a.intro + '</div><div class="introjs-tooltipbuttons"></div>', p.appendChild(b), r.appendChild(j), p.appendChild(r), q = document.createElement('a'), q.onclick = function () {
        h._introItems.length - 1 != h._currentStep && c.call(h);
      }, q.href = 'javascript:void(0);', q.innerHTML = this._options.nextLabel, b = document.createElement('a'), b.onclick = function () {
        0 != h._currentStep && d.call(h);
      }, b.href = 'javascript:void(0);', b.innerHTML = this._options.prevLabel, p = document.createElement('a'), p.className = 'introjs-button introjs-skipbutton', p.href = 'javascript:void(0);', p.innerHTML = this._options.skipLabel, p.onclick = function () {
        e.call(h, h._targetElement);
      };
      var s = r.querySelector('.introjs-tooltipbuttons');
      s.appendChild(p), s.appendChild(b), s.appendChild(q), f.call(h, a.element, r, j);
    }
    for (0 == this._currentStep ? (b.className = 'introjs-button introjs-prevbutton introjs-disabled', q.className = 'introjs-button introjs-nextbutton', p.innerHTML = this._options.skipLabel) : this._introItems.length - 1 == this._currentStep ? (p.innerHTML = this._options.doneLabel, b.className = 'introjs-button introjs-prevbutton', q.className = 'introjs-button introjs-nextbutton introjs-disabled') : (b.className = 'introjs-button introjs-prevbutton', q.className = 'introjs-button introjs-nextbutton', p.innerHTML = this._options.skipLabel), q.focus(), a.element.className += ' introjs-showElement', p = i(a.element, 'position'), 'absolute' !== p && 'relative' !== p && (a.element.className += ' introjs-relativePosition'), p = a.element.parentNode; null != p && 'body' !== p.tagName.toLowerCase();)
      b = i(p, 'z-index'), /[0-9]+/.test(b) && (p.className += ' introjs-fixParent'), p = p.parentNode;
    p = a.element.getBoundingClientRect(), 0 <= p.top && 0 <= p.left && p.bottom + 80 <= window.innerHeight && p.right <= window.innerWidth || (b = a.element.getBoundingClientRect(), p = b.bottom - (b.bottom - b.top), q = b.bottom, b = void 0 != window.innerWidth ? window.innerHeight : document.documentElement.clientHeight, b = q - b, 0 > p ? window.scrollBy(0, p - 30) : window.scrollBy(0, b + 100));
  }
  function i(a, b) {
    var c = '';
    return a.currentStyle ? c = a.currentStyle[b] : document.defaultView && document.defaultView.getComputedStyle && (c = document.defaultView.getComputedStyle(a, null).getPropertyValue(b)), c.toLowerCase ? c.toLowerCase() : c;
  }
  function j(a) {
    var b = document.createElement('div'), c = '', d = this;
    if (b.className = 'introjs-overlay', 'body' === a.tagName.toLowerCase())
      c += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;', b.setAttribute('style', c);
    else {
      var f = k(a);
      f && (c += 'width: ' + f.width + 'px; height:' + f.height + 'px; top:' + f.top + 'px;left: ' + f.left + 'px;', b.setAttribute('style', c));
    }
    return a.appendChild(b), b.onclick = function () {
      1 == d._options.exitOnOverlayClick && e.call(d, a);
    }, setTimeout(function () {
      c += 'opacity: .5;', b.setAttribute('style', c);
    }, 10), !0;
  }
  function k(a) {
    var b = {};
    b.width = a.offsetWidth, b.height = a.offsetHeight;
    for (var c = 0, d = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);)
      c += a.offsetLeft, d += a.offsetTop, a = a.offsetParent;
    return b.top = d, b.left = c, b;
  }
  var l = function (a) {
    if ('object' == typeof a)
      return new b(a);
    if ('string' == typeof a) {
      if (a = document.querySelector(a))
        return new b(a);
      throw Error('There is no element with given selector.');
    }
    return new b(document.body);
  };
  return l.version = '0.4.0', l.fn = b.prototype = {
    clone: function () {
      return new b(this);
    },
    setOption: function (a, b) {
      return this._options[a] = b, this;
    },
    setOptions: function (a) {
      var b, c = this._options, d = {};
      for (b in c)
        d[b] = c[b];
      for (b in a)
        d[b] = a[b];
      return this._options = d, this;
    },
    start: function () {
      a: {
        var a = this._targetElement, b = a.querySelectorAll('*[data-intro]'), f = [], h = this;
        if (this._options.steps)
          for (var b = [], i = 0; i < this._options.steps.length; i++)
            this._options.steps[i].step = i + 1, f.push(this._options.steps[i]);
        else {
          if (1 > b.length)
            break a;
          for (var i = 0, k = b.length; k > i; i++) {
            var l = b[i];
            f.push({
              element: l,
              intro: l.getAttribute('data-intro'),
              step: parseInt(l.getAttribute('data-step'), 10),
              position: l.getAttribute('data-position') || this._options.tooltipPosition
            });
          }
        }
        f.sort(function (a, b) {
          return a.step - b.step;
        }), h._introItems = f, j.call(h, a) && (c.call(h), a.querySelector('.introjs-skipbutton'), a.querySelector('.introjs-nextbutton'), h._onKeyDown = function (b) {
          27 === b.keyCode && 1 == h._options.exitOnEsc ? e.call(h, a) : 37 === b.keyCode ? d.call(h) : (39 === b.keyCode || 13 === b.keyCode) && (c.call(h), b.preventDefault ? b.preventDefault() : b.returnValue = !1);
        }, h._onResize = function () {
          g.call(h, document.querySelector('.introjs-helperLayer'));
        }, window.addEventListener ? (window.addEventListener('keydown', h._onKeyDown, !0), window.addEventListener('resize', h._onResize, !0)) : document.attachEvent && (document.attachEvent('onkeydown', h._onKeyDown), document.attachEvent('onresize', h._onResize)));
      }
      return this;
    },
    goToStep: function (a) {
      return this._currentStep = a - 2, 'undefined' != typeof this._introItems && c.call(this), this;
    },
    exit: function () {
      e.call(this, this._targetElement);
    },
    onchange: function (a) {
      if ('function' != typeof a)
        throw Error('Provided callback for onchange was not a function.');
      return this._introChangeCallback = a, this;
    },
    oncomplete: function (a) {
      if ('function' != typeof a)
        throw Error('Provided callback for oncomplete was not a function.');
      return this._introCompleteCallback = a, this;
    },
    onexit: function (a) {
      if ('function' != typeof a)
        throw Error('Provided callback for onexit was not a function.');
      return this._introExitCallback = a, this;
    }
  }, a.introJs = l;
}), function () {
  var a = [].slice;
  !function (b, c) {
    var d;
    return d = function () {
      function a(a) {
        var d = this;
        this.$el = b(a), b(c).resize(function () {
          return d.refresh();
        });
      }
      return a.prototype.start = function () {
        var a, b, c, d;
        if (this._overlay_visible())
          return !1;
        for (this._add_overlay_layer(), d = this.$el.find('*[data-intro]'), b = 0, c = d.length; c > b; b++)
          a = d[b], this._show_element(a);
        return this.$el.trigger('chardinJs:start');
      }, a.prototype.toggle = function () {
        return this._overlay_visible() ? this.stop() : this.start();
      }, a.prototype.refresh = function () {
        var a, b, c, d, e;
        if (this._overlay_visible()) {
          for (d = this.$el.find('*[data-intro]'), e = [], b = 0, c = d.length; c > b; b++)
            a = d[b], e.push(this._position_helper_layer(a));
          return e;
        }
        return this;
      }, a.prototype.stop = function () {
        return this.$el.find('.chardinjs-overlay').fadeOut(function () {
          return b(this).remove();
        }), this.$el.find('.chardinjs-helper-layer').remove(), this.$el.find('.chardinjs-show-element').removeClass('chardinjs-show-element'), this.$el.find('.chardinjs-relative-position').removeClass('chardinjs-relative-position'), c.removeEventListener ? c.removeEventListener('keydown', this._onKeyDown, !0) : document.detachEvent && document.detachEvent('onkeydown', this._onKeyDown), this.$el.trigger('chardinJs:stop');
      }, a.prototype._overlay_visible = function () {
        return 0 !== this.$el.find('.chardinjs-overlay').length;
      }, a.prototype._add_overlay_layer = function () {
        var a, b, c, d = this;
        return this._overlay_visible() ? !1 : (b = document.createElement('div'), c = '', b.className = 'chardinjs-overlay', 'BODY' === this.$el.prop('tagName') ? (c += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;', b.setAttribute('style', c)) : (a = this._get_offset(this.$el.get()[0]), a && (c += 'width: ' + a.width + 'px; height:' + a.height + 'px; top:' + a.top + 'px;left: ' + a.left + 'px;', b.setAttribute('style', c))), this.$el.get()[0].appendChild(b), b.onclick = function () {
          return d.stop();
        }, setTimeout(function () {
          return c += 'opacity: .8;', b.setAttribute('style', c);
        }, 10));
      }, a.prototype._get_position = function (a) {
        return a.getAttribute('data-position') || 'bottom';
      }, a.prototype._place_tooltip = function (a) {
        var c, d, e, f, g, h, i;
        switch (h = b(a).data('tooltip_layer'), i = this._get_offset(h), h.style.top = null, h.style.right = null, h.style.bottom = null, h.style.left = null, this._get_position(a)) {
        case 'top':
        case 'bottom':
          e = this._get_offset(a), g = e.width, d = b(h).width(), h.style.left = '' + (g / 2 - i.width / 2) + 'px';
          break;
        case 'left':
        case 'right':
          e = this._get_offset(a), f = e.height, c = b(h).height(), h.style.top = '' + (f / 2 - i.height / 2) + 'px';
        }
        switch (this._get_position(a)) {
        case 'left':
          return h.style.left = '-' + (i.width - 34) + 'px';
        case 'right':
          return h.style.right = '-' + (i.width - 34) + 'px';
        case 'bottom':
          return h.style.bottom = '-' + i.height + 'px';
        case 'top':
          return h.style.top = '-' + i.height + 'px';
        }
      }, a.prototype._position_helper_layer = function (a) {
        var c, d;
        return d = b(a).data('helper_layer'), c = this._get_offset(a), d.setAttribute('style', 'width: ' + c.width + 'px; height:' + c.height + 'px; top:' + c.top + 'px; left: ' + c.left + 'px;');
      }, a.prototype._show_element = function (a) {
        var c, d, e, f;
        return d = this._get_offset(a), e = document.createElement('div'), f = document.createElement('div'), b(a).data('helper_layer', e).data('tooltip_layer', f), a.id && e.setAttribute('data-id', a.id), e.className = 'chardinjs-helper-layer chardinjs-' + this._get_position(a), this._position_helper_layer(a), this.$el.get()[0].appendChild(e), f.className = 'chardinjs-tooltip chardinjs-' + this._get_position(a), f.innerHTML = '<div class=\'chardinjs-tooltiptext\'>' + a.getAttribute('data-intro') + '</div>', e.appendChild(f), this._place_tooltip(a), a.className += ' chardinjs-show-element', c = '', a.currentStyle ? c = a.currentStyle.position : document.defaultView && document.defaultView.getComputedStyle && (c = document.defaultView.getComputedStyle(a, null).getPropertyValue('position')), c = c.toLowerCase(), 'absolute' !== c && 'relative' !== c ? a.className += ' chardinjs-relative-position' : void 0;
      }, a.prototype._get_offset = function (a) {
        var b, c, d;
        for (b = {
            width: a.offsetWidth,
            height: a.offsetHeight
          }, c = 0, d = 0; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);)
          c += a.offsetLeft, d += a.offsetTop, a = a.offsetParent;
        return b.top = d, b.left = c, b;
      }, a;
    }(), b.fn.extend({
      chardinJs: function () {
        var c, e, f, g;
        return g = arguments[0], e = 2 <= arguments.length ? a.call(arguments, 1) : [], c = b(this[0]), f = c.data('chardinJs'), f || c.data('chardinJs', f = new d(this, g)), 'string' == typeof g && f[g].apply(f, e), f;
      }
    });
  }(window.jQuery, window);
}.call(this), function (a) {
  'use strict';
  var b = 6, c = 4, d = 'asc', e = 'desc', f = '_ng_field_', g = '_ng_depth_', h = '_ng_hidden_', i = '_ng_column_', j = /CUSTOM_FILTERS/g, k = /COL_FIELD/g, l = /DISPLAY_CELL_TEMPLATE/g, m = /EDITABLE_CELL_TEMPLATE/g, n = /<.+>/;
  a.ng || (a.ng = {}), a.ngGrid = {}, a.ngGrid.i18n = {};
  var o = angular.module('ngGrid.services', []), p = angular.module('ngGrid.directives', []), q = angular.module('ngGrid.filters', []);
  angular.module('ngGrid', [
    'ngGrid.services',
    'ngGrid.directives',
    'ngGrid.filters'
  ]), ng.moveSelectionHandler = function (a, c, d, e) {
    if (void 0 === a.selectionService.selectedItems)
      return !0;
    var f, g = d.which || d.keyCode, h = !1, i = !1, j = a.selectionService.lastClickedRow.rowIndex;
    if (a.col && (f = a.col.index), 37 != g && 38 != g && 39 != g && 40 != g && 9 != g && 13 != g)
      return !0;
    if (a.enableCellSelection) {
      9 == g && d.preventDefault();
      var k = a.showSelectionCheckbox ? 1 == a.col.index : 0 == a.col.index, l = 1 == a.$index || 0 == a.$index, m = a.$index == a.renderedColumns.length - 1 || a.$index == a.renderedColumns.length - 2, n = a.col.index == a.columns.length - 1;
      37 == g || 9 == g && d.shiftKey ? (l && (k && 9 == g && d.shiftKey ? (e.$viewport.scrollLeft(e.$canvas.width()), f = a.columns.length - 1, i = !0) : e.$viewport.scrollLeft(e.$viewport.scrollLeft() - a.col.width)), k || (f -= 1)) : (39 == g || 9 == g && !d.shiftKey) && (m && (n && 9 == g && !d.shiftKey ? (e.$viewport.scrollLeft(0), f = a.showSelectionCheckbox ? 1 : 0, h = !0) : e.$viewport.scrollLeft(e.$viewport.scrollLeft() + a.col.width)), n || (f += 1));
    }
    var o;
    o = a.configGroups.length > 0 ? e.rowFactory.parsedData.filter(function (a) {
      return !a.isAggRow;
    }) : e.filteredRows;
    var p = 0;
    if (0 != j && (38 == g || 13 == g && d.shiftKey || 9 == g && d.shiftKey && i) ? p = -1 : j != o.length - 1 && (40 == g || 13 == g && !d.shiftKey || 9 == g && h) && (p = 1), p) {
      var q = o[j + p];
      q.beforeSelectionChange(q, d) && (q.continueSelection(d), a.$emit('ngGridEventDigestGridParent'), a.selectionService.lastClickedRow.renderedRowIndex >= a.renderedRows.length - b - 2 ? e.$viewport.scrollTop(e.$viewport.scrollTop() + a.rowHeight) : a.selectionService.lastClickedRow.renderedRowIndex <= b + 2 && e.$viewport.scrollTop(e.$viewport.scrollTop() - a.rowHeight));
    }
    return a.enableCellSelection && setTimeout(function () {
      a.domAccessProvider.focusCellElement(a, a.renderedColumns.indexOf(a.columns[f]));
    }, 3), !1;
  }, String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
    var b = this.length >>> 0, c = Number(arguments[1]) || 0;
    for (c = 0 > c ? Math.ceil(c) : Math.floor(c), 0 > c && (c += b); b > c; c++)
      if (c in this && this[c] === a)
        return c;
    return -1;
  }), Array.prototype.filter || (Array.prototype.filter = function (a) {
    var b = Object(this), c = b.length >>> 0;
    if ('function' != typeof a)
      throw new TypeError();
    for (var d = [], e = arguments[1], f = 0; c > f; f++)
      if (f in b) {
        var g = b[f];
        a.call(e, g, f, b) && d.push(g);
      }
    return d;
  }), q.filter('checkmark', function () {
    return function (a) {
      return a ? '\u2714' : '\u2718';
    };
  }), q.filter('ngColumns', function () {
    return function (a) {
      return a.filter(function (a) {
        return !a.isAggCol;
      });
    };
  }), o.factory('$domUtilityService', [
    '$utilityService',
    function (a) {
      var b = {}, c = {}, d = function () {
          var a = $('<div></div>');
          a.appendTo('body'), a.height(100).width(100).css('position', 'absolute').css('overflow', 'scroll'), a.append('<div style="height: 400px; width: 400px;"></div>'), b.ScrollH = a.height() - a[0].clientHeight, b.ScrollW = a.width() - a[0].clientWidth, a.empty(), a.attr('style', ''), a.append('<span style="font-family: Verdana, Helvetica, Sans-Serif; font-size: 14px;"><strong>M</strong></span>'), b.LetterW = a.children().first().width(), a.remove();
        };
      return b.eventStorage = {}, b.AssignGridContainers = function (a, c, d) {
        d.$root = $(c), d.$topPanel = d.$root.find('.ngTopPanel'), d.$groupPanel = d.$root.find('.ngGroupPanel'), d.$headerContainer = d.$topPanel.find('.ngHeaderContainer'), a.$headerContainer = d.$headerContainer, d.$headerScroller = d.$topPanel.find('.ngHeaderScroller'), d.$headers = d.$headerScroller.children(), d.$viewport = d.$root.find('.ngViewport'), d.$canvas = d.$viewport.find('.ngCanvas'), d.$footerPanel = d.$root.find('.ngFooterPanel'), a.$watch(function () {
          return d.$viewport.scrollLeft();
        }, function (a) {
          return d.$headerContainer.scrollLeft(a);
        }), b.UpdateGridLayout(a, d);
      }, b.getRealWidth = function (a) {
        var b = 0, c = {
            visibility: 'hidden',
            display: 'block'
          }, d = a.parents().andSelf().not(':visible');
        return $.swap(d[0], c, function () {
          b = a.outerWidth();
        }), b;
      }, b.UpdateGridLayout = function (a, c) {
        var d = c.$viewport.scrollTop();
        c.elementDims.rootMaxW = c.$root.width(), c.$root.is(':hidden') && (c.elementDims.rootMaxW = b.getRealWidth(c.$root)), c.elementDims.rootMaxH = c.$root.height(), c.refreshDomSizes(), a.adjustScrollTop(d, !0);
      }, b.numberOfGrids = 0, b.BuildStyles = function (c, d, e) {
        var f, g = d.config.rowHeight, h = d.$styleSheet, i = d.gridId, j = c.columns, k = 0;
        h || (h = $('#' + i), h[0] || (h = $('<style id=\'' + i + '\' type=\'text/css\' rel=\'stylesheet\' />').appendTo(d.$root))), h.empty();
        var l = c.totalRowWidth();
        f = '.' + i + ' .ngCanvas { width: ' + l + 'px; }' + '.' + i + ' .ngRow { width: ' + l + 'px; }' + '.' + i + ' .ngCanvas { width: ' + l + 'px; }' + '.' + i + ' .ngHeaderScroller { width: ' + (l + b.ScrollH + 2) + 'px}';
        for (var m = 0; m < j.length; m++) {
          var n = j[m];
          if (n.visible !== !1) {
            var o = n.pinned ? d.$viewport.scrollLeft() + k : k;
            f += '.' + i + ' .col' + m + ' { width: ' + n.width + 'px; left: ' + o + 'px; height: ' + g + 'px }' + '.' + i + ' .colt' + m + ' { width: ' + n.width + 'px; }', k += n.width;
          }
        }
        a.isIe ? h[0].styleSheet.cssText = f : h[0].appendChild(document.createTextNode(f)), d.$styleSheet = h, e && (c.adjustScrollLeft(d.$viewport.scrollLeft()), b.digest(c));
      }, b.setColLeft = function (b, d, e) {
        if (e.$styleSheet) {
          var f = c[b.index];
          f || (f = c[b.index] = new RegExp('.col' + b.index + ' { width: [0-9]+px; left: [0-9]+px'));
          var g = e.$styleSheet.html(), h = g.replace(f, '.col' + b.index + ' { width: ' + b.width + 'px; left: ' + d + 'px');
          a.isIe ? setTimeout(function () {
            e.$styleSheet.html(h);
          }) : e.$styleSheet.html(h);
        }
      }, b.setColLeft.immediate = 1, b.RebuildGrid = function (a, c) {
        b.UpdateGridLayout(a, c), c.config.maintainColumnRatios && c.configureColumnWidths(), a.adjustScrollLeft(c.$viewport.scrollLeft()), b.BuildStyles(a, c, !0);
      }, b.digest = function (a) {
        a.$root.$$phase || a.$digest();
      }, b.ScrollH = 17, b.ScrollW = 17, b.LetterW = 10, d(), b;
    }
  ]), o.factory('$sortService', [
    '$parse',
    function (a) {
      var b = {};
      return b.colSortFnCache = {}, b.guessSortFn = function (a) {
        var c = typeof a;
        switch (c) {
        case 'number':
          return b.sortNumber;
        case 'boolean':
          return b.sortBool;
        case 'string':
          return a.match(/^-?[£$¤]?[\d,.]+%?$/) ? b.sortNumberStr : b.sortAlpha;
        default:
          return '[object Date]' === Object.prototype.toString.call(a) ? b.sortDate : b.basicSort;
        }
      }, b.basicSort = function (a, b) {
        return a == b ? 0 : b > a ? -1 : 1;
      }, b.sortNumber = function (a, b) {
        return a - b;
      }, b.sortNumberStr = function (a, b) {
        var c, d, e = !1, f = !1;
        return c = parseFloat(a.replace(/[^0-9.-]/g, '')), isNaN(c) && (e = !0), d = parseFloat(b.replace(/[^0-9.-]/g, '')), isNaN(d) && (f = !0), e && f ? 0 : e ? 1 : f ? -1 : c - d;
      }, b.sortAlpha = function (a, b) {
        var c = a.toLowerCase(), d = b.toLowerCase();
        return c == d ? 0 : d > c ? -1 : 1;
      }, b.sortDate = function (a, b) {
        var c = a.getTime(), d = b.getTime();
        return c == d ? 0 : d > c ? -1 : 1;
      }, b.sortBool = function (a, b) {
        return a && b ? 0 : a || b ? a ? 1 : -1 : 0;
      }, b.sortData = function (c, e) {
        if (e && c) {
          var f, g, h = c.fields.length, i = c.fields, j = e.slice(0);
          e.sort(function (e, k) {
            for (var l, m = 0, n = 0; 0 == m && h > n;) {
              f = c.columns[n], g = c.directions[n], l = b.getSortFn(f, j);
              var o = a(i[n])(e), p = a(i[n])(k);
              !o && 0 != o || !p && 0 != p ? p || o ? o ? p || (m = -1) : m = 1 : m = 0 : m = l(o, p), n++;
            }
            return g === d ? m : 0 - m;
          });
        }
      }, b.Sort = function (a, c) {
        b.isSorting || (b.isSorting = !0, b.sortData(a, c), b.isSorting = !1);
      }, b.getSortFn = function (c, d) {
        var e, f = void 0;
        if (b.colSortFnCache[c.field])
          f = b.colSortFnCache[c.field];
        else if (void 0 != c.sortingAlgorithm)
          f = c.sortingAlgorithm, b.colSortFnCache[c.field] = c.sortingAlgorithm;
        else {
          if (e = d[0], !e)
            return f;
          f = b.guessSortFn(a(c.field)(e)), f ? b.colSortFnCache[c.field] = f : f = b.sortAlpha;
        }
        return f;
      }, b;
    }
  ]), o.factory('$utilityService', [
    '$parse',
    function (b) {
      var c = {
          visualLength: function (a) {
            var b = document.getElementById('testDataLength');
            return b || (b = document.createElement('SPAN'), b.id = 'testDataLength', b.style.visibility = 'hidden', document.body.appendChild(b)), $(b).css('font', $(a).css('font')), b.innerHTML = $(a).text(), b.offsetWidth;
          },
          forIn: function (a, b) {
            for (var c in a)
              a.hasOwnProperty(c) && b(a[c], c);
          },
          evalProperty: function (a, c) {
            return b(c)(a);
          },
          endsWith: function (a, b) {
            return a && b && 'string' == typeof a ? -1 !== a.indexOf(b, a.length - b.length) : !1;
          },
          isNullOrUndefined: function (a) {
            return void 0 === a || null === a ? !0 : !1;
          },
          getElementsByClassName: function (a) {
            for (var b = [], c = new RegExp('\\b' + a + '\\b'), d = document.getElementsByTagName('*'), e = 0; e < d.length; e++) {
              var f = d[e].className;
              c.test(f) && b.push(d[e]);
            }
            return b;
          },
          newId: function () {
            var a = new Date().getTime();
            return function () {
              return a += 1;
            };
          }(),
          seti18n: function (b, c) {
            var d = a.ngGrid.i18n[c];
            for (var e in d)
              b.i18n[e] = d[e];
          },
          ieVersion: function () {
            for (var a = 3, b = document.createElement('div'), c = b.getElementsByTagName('i'); b.innerHTML = '<!--[if gt IE ' + ++a + ']><i></i><![endif]-->', c[0];);
            return a > 4 ? a : void 0;
          }()
        };
      return $.extend(c, {
        isIe: function () {
          return void 0 !== c.ieVersion;
        }()
      }), c;
    }
  ]), ng.Aggregate = function (a, b, c) {
    var d = this;
    d.rowIndex = 0, d.offsetTop = d.rowIndex * c, d.entity = a, d.label = a.gLabel, d.field = a.gField, d.depth = a.gDepth, d.parent = a.parent, d.children = a.children, d.aggChildren = a.aggChildren, d.aggIndex = a.aggIndex, d.collapsed = !0, d.isAggRow = !0, d.offsetleft = 25 * a.gDepth, d.aggLabelFilter = a.aggLabelFilter, d.toggleExpand = function () {
      d.collapsed = d.collapsed ? !1 : !0, d.orig && (d.orig.collapsed = d.collapsed), d.notifyChildren();
    }, d.setExpand = function (a) {
      d.collapsed = a, d.notifyChildren();
    }, d.notifyChildren = function () {
      for (var a = Math.max(b.aggCache.length, d.children.length), c = 0; a > c; c++)
        if (d.aggChildren[c] && (d.aggChildren[c].entity[h] = d.collapsed, d.collapsed && d.aggChildren[c].setExpand(d.collapsed)), d.children[c] && (d.children[c][h] = d.collapsed), c > d.aggIndex && b.aggCache[c]) {
          var e = b.aggCache[c], f = 30 * d.children.length;
          e.offsetTop = d.collapsed ? e.offsetTop - f : e.offsetTop + f;
        }
      b.renderedChange();
    }, d.aggClass = function () {
      return d.collapsed ? 'ngAggArrowCollapsed' : 'ngAggArrowExpanded';
    }, d.totalChildren = function () {
      if (d.aggChildren.length > 0) {
        var a = 0, b = function (c) {
            c.aggChildren.length > 0 ? angular.forEach(c.aggChildren, function (a) {
              b(a);
            }) : a += c.children.length;
          };
        return b(d), a;
      }
      return d.children.length;
    }, d.copy = function () {
      var a = new ng.Aggregate(d.entity, b, c);
      return a.orig = d, a;
    };
  }, ng.Column = function (a, b, c, f, g, h) {
    var i = this, k = a.colDef, l = 500, m = 0, o = null;
    i.width = k.width, i.groupIndex = 0, i.isGroupedBy = !1, i.minWidth = k.minWidth ? k.minWidth : 50, i.maxWidth = k.maxWidth ? k.maxWidth : 9000, i.enableCellEdit = a.enableCellEdit || k.enableCellEdit, i.headerRowHeight = a.headerRowHeight, i.displayName = k.displayName || k.field, i.index = a.index, i.isAggCol = a.isAggCol, i.cellClass = k.cellClass, i.sortPriority = void 0, i.zIndex = function () {
      return i.pinned ? 5 : 0;
    }, i.cellFilter = k.cellFilter ? k.cellFilter : '', i.field = k.field, i.aggLabelFilter = k.cellFilter || k.aggLabelFilter, i.visible = h.isNullOrUndefined(k.visible) || k.visible, i.sortable = !1, i.resizable = !1, i.pinnable = !1, i.pinned = k.pinned, i.originalIndex = i.index, i.groupable = h.isNullOrUndefined(k.groupable) || k.groupable, a.enableSort && (i.sortable = h.isNullOrUndefined(k.sortable) || k.sortable), a.enableResize && (i.resizable = h.isNullOrUndefined(k.resizable) || k.resizable), a.enablePinning && (i.pinnable = h.isNullOrUndefined(k.pinnable) || k.pinnable), i.sortDirection = void 0, i.sortingAlgorithm = k.sortFn, i.headerClass = k.headerClass, i.cursor = i.sortable ? 'pointer' : 'default', i.headerCellTemplate = k.headerCellTemplate || g.get('headerCellTemplate.html'), i.cellTemplate = k.cellTemplate || g.get('cellTemplate.html').replace(j, i.cellFilter ? '|' + i.cellFilter : ''), i.enableCellEdit && (i.cellEditTemplate = g.get('cellEditTemplate.html'), i.editableCellTemplate = k.editableCellTemplate || g.get('editableCellTemplate.html')), k.cellTemplate && !n.test(k.cellTemplate) && (i.cellTemplate = $.ajax({
      type: 'GET',
      url: k.cellTemplate,
      async: !1
    }).responseText), i.enableCellEdit && k.editableCellTemplate && !n.test(k.editableCellTemplate) && (i.editableCellTemplate = $.ajax({
      type: 'GET',
      url: k.editableCellTemplate,
      async: !1
    }).responseText), k.headerCellTemplate && !n.test(k.headerCellTemplate) && (i.headerCellTemplate = $.ajax({
      type: 'GET',
      url: k.headerCellTemplate,
      async: !1
    }).responseText), i.colIndex = function () {
      return 'col' + i.index + ' colt' + i.index;
    }, i.groupedByClass = function () {
      return i.isGroupedBy ? 'ngGroupedByIcon' : 'ngGroupIcon';
    }, i.toggleVisible = function () {
      i.visible = !i.visible;
    }, i.showSortButtonUp = function () {
      return i.sortable ? i.sortDirection === e : i.sortable;
    }, i.showSortButtonDown = function () {
      return i.sortable ? i.sortDirection === d : i.sortable;
    }, i.noSortVisible = function () {
      return !i.sortDirection;
    }, i.sort = function (b) {
      if (!i.sortable)
        return !0;
      var c = i.sortDirection === d ? e : d;
      return i.sortDirection = c, a.sortCallback(i, b), !1;
    }, i.gripClick = function () {
      m++, 1 === m ? o = setTimeout(function () {
        m = 0;
      }, l) : (clearTimeout(o), a.resizeOnDataCallback(i), m = 0);
    }, i.gripOnMouseDown = function (a) {
      return a.ctrlKey && !i.pinned ? (i.toggleVisible(), f.BuildStyles(b, c), !0) : (a.target.parentElement.style.cursor = 'col-resize', i.startMousePosition = a.clientX, i.origWidth = i.width, $(document).mousemove(i.onMouseMove), $(document).mouseup(i.gripOnMouseUp), !1);
    }, i.onMouseMove = function (a) {
      var d = a.clientX - i.startMousePosition, e = d + i.origWidth;
      return i.width = e < i.minWidth ? i.minWidth : e > i.maxWidth ? i.maxWidth : e, f.BuildStyles(b, c), !1;
    }, i.gripOnMouseUp = function (a) {
      return $(document).off('mousemove', i.onMouseMove), $(document).off('mouseup', i.gripOnMouseUp), a.target.parentElement.style.cursor = 'default', b.adjustScrollLeft(0), f.digest(b), !1;
    }, i.copy = function () {
      var d = new ng.Column(a, b, c, f, g);
      return d.isClone = !0, d.orig = i, d;
    }, i.setVars = function (a) {
      i.orig = a, i.width = a.width, i.groupIndex = a.groupIndex, i.isGroupedBy = a.isGroupedBy, i.displayName = a.displayName, i.index = a.index, i.isAggCol = a.isAggCol, i.cellClass = a.cellClass, i.cellFilter = a.cellFilter, i.field = a.field, i.aggLabelFilter = a.aggLabelFilter, i.visible = a.visible, i.sortable = a.sortable, i.resizable = a.resizable, i.pinnable = a.pinnable, i.pinned = a.pinned, i.originalIndex = a.originalIndex, i.sortDirection = a.sortDirection, i.sortingAlgorithm = a.sortingAlgorithm, i.headerClass = a.headerClass, i.headerCellTemplate = a.headerCellTemplate, i.cellTemplate = a.cellTemplate, i.cellEditTemplate = a.cellEditTemplate;
    };
  }, ng.Dimension = function (a) {
    this.outerHeight = null, this.outerWidth = null, $.extend(this, a);
  }, ng.DomAccessProvider = function (a) {
    var b, c = this;
    c.selectInputElement = function (a) {
      var b = a.nodeName.toLowerCase();
      ('input' == b || 'textarea' == b) && a.select();
    }, c.focusCellElement = function (c, d) {
      if (c.selectionProvider.lastClickedRow) {
        var e = void 0 != d ? d : b, f = c.selectionProvider.lastClickedRow.clone ? c.selectionProvider.lastClickedRow.clone.elm : c.selectionProvider.lastClickedRow.elm;
        if (void 0 != e && f) {
          var g = angular.element(f[0].children).filter(function () {
              return 8 != this.nodeType;
            }), h = Math.max(Math.min(c.renderedColumns.length - 1, e), 0);
          a.config.showSelectionCheckbox && angular.element(g[h]).scope() && 0 == angular.element(g[h]).scope().col.index && (h = 1), g[h] && g[h].children[0].focus(), b = e;
        }
      }
    };
    var d = function (a, b) {
      a.css({
        '-webkit-touch-callout': b,
        '-webkit-user-select': b,
        '-khtml-user-select': b,
        '-moz-user-select': 'none' == b ? '-moz-none' : b,
        '-ms-user-select': b,
        'user-select': b
      });
    };
    c.selectionHandlers = function (b, c) {
      var e = !1;
      c.bind('keydown', function (f) {
        if (16 == f.keyCode)
          return d(c, 'none', f), !0;
        if (!e) {
          e = !0;
          var g = ng.moveSelectionHandler(b, c, f, a);
          return e = !1, g;
        }
        return !0;
      }), c.bind('keyup', function (a) {
        return 16 == a.keyCode && d(c, 'text', a), !0;
      });
    };
  }, ng.EventProvider = function (b, c, d) {
    var e = this;
    e.colToMove = void 0, e.groupToMove = void 0, e.assignEvents = function () {
      b.config.jqueryUIDraggable && !b.config.enablePinning ? (b.$groupPanel.droppable({
        addClasses: !1,
        drop: function (a) {
          e.onGroupDrop(a);
        }
      }), c.$evalAsync(e.setDraggables)) : (b.$groupPanel.on('mousedown', e.onGroupMouseDown).on('dragover', e.dragOver).on('drop', e.onGroupDrop), b.$headerScroller.on('mousedown', e.onHeaderMouseDown).on('dragover', e.dragOver), b.config.enableColumnReordering && !b.config.enablePinning && b.$headerScroller.on('drop', e.onHeaderDrop), b.config.enableRowReordering && b.$viewport.on('mousedown', e.onRowMouseDown).on('dragover', e.dragOver).on('drop', e.onRowDrop)), c.$watch('columns', e.setDraggables, !0);
    }, e.dragStart = function (a) {
      a.dataTransfer.setData('text', '');
    }, e.dragOver = function (a) {
      a.preventDefault();
    }, e.setDraggables = function () {
      if (b.config.jqueryUIDraggable)
        b.$root.find('.ngHeaderSortColumn').draggable({
          helper: 'clone',
          appendTo: 'body',
          stack: 'div',
          addClasses: !1,
          start: function (a) {
            e.onHeaderMouseDown(a);
          }
        }).droppable({
          drop: function (a) {
            e.onHeaderDrop(a);
          }
        });
      else {
        var a = b.$root.find('.ngHeaderSortColumn');
        angular.forEach(a, function (a) {
          a.setAttribute('draggable', 'true'), a.addEventListener && a.addEventListener('dragstart', e.dragStart);
        }), -1 != navigator.userAgent.indexOf('MSIE') && b.$root.find('.ngHeaderSortColumn').bind('selectstart', function () {
          return this.dragDrop(), !1;
        });
      }
    }, e.onGroupMouseDown = function (a) {
      var c = $(a.target);
      if ('ngRemoveGroup' != c[0].className) {
        var d = angular.element(c).scope();
        d && (b.config.jqueryUIDraggable || (c.attr('draggable', 'true'), this.addEventListener && this.addEventListener('dragstart', e.dragStart), -1 != navigator.userAgent.indexOf('MSIE') && c.bind('selectstart', function () {
          return this.dragDrop(), !1;
        })), e.groupToMove = {
          header: c,
          groupName: d.group,
          index: d.$index
        });
      } else
        e.groupToMove = void 0;
    }, e.onGroupDrop = function (a) {
      a.stopPropagation();
      var d, f;
      e.groupToMove ? (d = $(a.target).closest('.ngGroupElement'), 'ngGroupPanel' == d.context.className ? (c.configGroups.splice(e.groupToMove.index, 1), c.configGroups.push(e.groupToMove.groupName)) : (f = angular.element(d).scope(), f && e.groupToMove.index != f.$index && (c.configGroups.splice(e.groupToMove.index, 1), c.configGroups.splice(f.$index, 0, e.groupToMove.groupName))), e.groupToMove = void 0, b.fixGroupIndexes()) : e.colToMove && (-1 == c.configGroups.indexOf(e.colToMove.col) && (d = $(a.target).closest('.ngGroupElement'), 'ngGroupPanel' == d.context.className || 'ngGroupPanelDescription ng-binding' == d.context.className ? c.groupBy(e.colToMove.col) : (f = angular.element(d).scope(), f && c.removeGroup(f.$index))), e.colToMove = void 0), c.$$phase || c.$apply();
    }, e.onHeaderMouseDown = function (a) {
      var b = $(a.target).closest('.ngHeaderSortColumn'), c = angular.element(b).scope();
      c && (e.colToMove = {
        header: b,
        col: c.col
      });
    }, e.onHeaderDrop = function (a) {
      if (e.colToMove) {
        var f = $(a.target).closest('.ngHeaderSortColumn'), g = angular.element(f).scope();
        if (g) {
          if (e.colToMove.col == g.col)
            return;
          c.columns.splice(e.colToMove.col.index, 1), c.columns.splice(g.col.index, 0, e.colToMove.col), b.fixColumnIndexes(), d.BuildStyles(c, b, !0), e.colToMove = void 0;
        }
      }
    }, e.onRowMouseDown = function (a) {
      var b = $(a.target).closest('.ngRow'), c = angular.element(b).scope();
      c && (b.attr('draggable', 'true'), d.eventStorage.rowToMove = {
        targetRow: b,
        scope: c
      });
    }, e.onRowDrop = function (a) {
      var c = $(a.target).closest('.ngRow'), e = angular.element(c).scope();
      if (e) {
        var f = d.eventStorage.rowToMove;
        if (f.scope.row == e.row)
          return;
        b.changeRowOrder(f.scope.row, e.row), b.searchProvider.evalFilter(), d.eventStorage.rowToMove = void 0, d.digest(e.$root);
      }
    }, e.assignGridEventHandlers = function () {
      -1 === b.config.tabIndex ? (b.$viewport.attr('tabIndex', d.numberOfGrids), d.numberOfGrids++) : b.$viewport.attr('tabIndex', b.config.tabIndex), $(a).resize(function () {
        d.RebuildGrid(c, b);
      });
    }, e.assignGridEventHandlers(), e.assignEvents();
  }, ng.Footer = function (a, b) {
    a.maxRows = function () {
      var c = Math.max(a.pagingOptions.totalServerItems, b.data.length);
      return c;
    }, a.multiSelect = b.config.enableRowSelection && b.config.multiSelect, a.selectedItemCount = b.selectedItemCount, a.maxPages = function () {
      return Math.ceil(a.maxRows() / a.pagingOptions.pageSize);
    }, a.pageForward = function () {
      var b = a.pagingOptions.currentPage;
      a.pagingOptions.totalServerItems > 0 ? a.pagingOptions.currentPage = Math.min(b + 1, a.maxPages()) : a.pagingOptions.currentPage++;
    }, a.pageBackward = function () {
      var b = a.pagingOptions.currentPage;
      a.pagingOptions.currentPage = Math.max(b - 1, 1);
    }, a.pageToFirst = function () {
      a.pagingOptions.currentPage = 1;
    }, a.pageToLast = function () {
      var b = a.maxPages();
      a.pagingOptions.currentPage = b;
    }, a.cantPageForward = function () {
      var c = a.pagingOptions.currentPage, d = a.maxPages();
      return a.pagingOptions.totalServerItems > 0 ? !(d > c) : b.data.length < 1;
    }, a.cantPageToLast = function () {
      return a.pagingOptions.totalServerItems > 0 ? a.cantPageForward() : !0;
    }, a.cantPageBackward = function () {
      var b = a.pagingOptions.currentPage;
      return !(b > 1);
    };
  }, ng.Grid = function (d, e, f, g, i, j, k, l) {
    var m = {
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
      }, o = this;
    o.maxCanvasHt = 0, o.config = $.extend(m, a.ngGrid.config, e), o.config.showSelectionCheckbox = o.config.showSelectionCheckbox && o.config.enableColumnHeavyVirt === !1, o.config.enablePinning = o.config.enablePinning && o.config.enableColumnHeavyVirt === !1, o.config.selectWithCheckboxOnly = o.config.selectWithCheckboxOnly && o.config.showSelectionCheckbox !== !1, o.config.pinSelectionCheckbox = o.config.enablePinning, 'string' == typeof e.columnDefs && (o.config.columnDefs = d.$eval(e.columnDefs)), o.rowCache = [], o.rowMap = [], o.gridId = 'ng' + k.newId(), o.$root = null, o.$groupPanel = null, o.$topPanel = null, o.$headerContainer = null, o.$headerScroller = null, o.$headers = null, o.$viewport = null, o.$canvas = null, o.rootDim = o.config.gridDim, o.data = [], o.lateBindColumns = !1, o.filteredRows = [];
    var p = function (a) {
      var b = o.config[a], c = o.gridId + a + '.html';
      if (b && !n.test(b))
        j.put(c, $.ajax({
          type: 'GET',
          url: b,
          async: !1
        }).responseText);
      else if (b)
        j.put(c, b);
      else {
        var d = a + '.html';
        j.put(c, j.get(d));
      }
    };
    p('rowTemplate'), p('aggregateTemplate'), p('headerRowTemplate'), p('checkboxCellTemplate'), p('checkboxHeaderTemplate'), 'object' == typeof o.config.data && (o.data = o.config.data), o.calcMaxCanvasHeight = function () {
      return o.config.groups.length > 0 ? o.rowFactory.parsedData.filter(function (a) {
        return !a[h];
      }).length * o.config.rowHeight : o.filteredRows.length * o.config.rowHeight;
    }, o.elementDims = {
      scrollW: 0,
      scrollH: 0,
      rowIndexCellW: 25,
      rowSelectedCellW: 25,
      rootMaxW: 0,
      rootMaxH: 0
    }, o.setRenderedRows = function (a) {
      d.renderedRows.length = a.length;
      for (var b = 0; b < a.length; b++)
        !d.renderedRows[b] || a[b].isAggRow || d.renderedRows[b].isAggRow ? (d.renderedRows[b] = a[b].copy(), d.renderedRows[b].collapsed = a[b].collapsed, a[b].isAggRow || d.renderedRows[b].setVars(a[b])) : d.renderedRows[b].setVars(a[b]), d.renderedRows[b].rowIndex = a[b].rowIndex, d.renderedRows[b].offsetTop = a[b].offsetTop, a[b].renderedRowIndex = b;
      o.refreshDomSizes(), d.$emit('ngGridEventRows', a);
    }, o.minRowsToRender = function () {
      var a = d.viewportDimHeight() || 1;
      return Math.floor(a / o.config.rowHeight);
    }, o.refreshDomSizes = function () {
      var a = new ng.Dimension();
      a.outerWidth = o.elementDims.rootMaxW, a.outerHeight = o.elementDims.rootMaxH, o.rootDim = a, o.maxCanvasHt = o.calcMaxCanvasHeight();
    }, o.buildColumnDefsFromData = function () {
      o.config.columnDefs = [];
      var a = o.data[0];
      return a ? (k.forIn(a, function (a, b) {
        -1 == o.config.excludeProperties.indexOf(b) && o.config.columnDefs.push({ field: b });
      }), void 0) : (o.lateBoundColumns = !0, void 0);
    }, o.buildColumns = function () {
      var a = o.config.columnDefs, b = [];
      if (a || (o.buildColumnDefsFromData(), a = o.config.columnDefs), o.config.showSelectionCheckbox && b.push(new ng.Column({
          colDef: {
            field: '\u2714',
            width: o.elementDims.rowSelectedCellW,
            sortable: !1,
            resizable: !1,
            groupable: !1,
            headerCellTemplate: j.get(d.gridId + 'checkboxHeaderTemplate.html'),
            cellTemplate: j.get(d.gridId + 'checkboxCellTemplate.html'),
            pinned: o.config.pinSelectionCheckbox
          },
          index: 0,
          headerRowHeight: o.config.headerRowHeight,
          sortCallback: o.sortData,
          resizeOnDataCallback: o.resizeOnData,
          enableResize: o.config.enableColumnResize,
          enableSort: o.config.enableSorting
        }, d, o, g, j, k)), a.length > 0) {
        var c = o.config.showSelectionCheckbox ? o.config.groups.length + 1 : o.config.groups.length;
        d.configGroups.length = 0, angular.forEach(a, function (a, e) {
          e += c;
          var f = new ng.Column({
              colDef: a,
              index: e,
              headerRowHeight: o.config.headerRowHeight,
              sortCallback: o.sortData,
              resizeOnDataCallback: o.resizeOnData,
              enableResize: o.config.enableColumnResize,
              enableSort: o.config.enableSorting,
              enablePinning: o.config.enablePinning,
              enableCellEdit: o.config.enableCellEdit
            }, d, o, g, j, k), h = o.config.groups.indexOf(a.field);
          -1 != h && (f.isGroupedBy = !0, d.configGroups.splice(h, 0, f), f.groupIndex = d.configGroups.length), b.push(f);
        }), d.columns = b;
      }
    }, o.configureColumnWidths = function () {
      var a = o.config.columnDefs, b = o.config.showSelectionCheckbox ? d.configGroups.length + 1 : d.configGroups.length, c = a.length + b, e = [], f = [], h = 0, i = 0;
      if (i += o.config.showSelectionCheckbox ? 25 : 0, angular.forEach(a, function (a, c) {
          c += b;
          var g = !1, j = void 0;
          if (k.isNullOrUndefined(a.width) ? a.width = '*' : (g = isNaN(a.width) ? k.endsWith(a.width, '%') : !1, j = g ? a.width : parseInt(a.width, 10)), isNaN(j)) {
            if (j = a.width, 'auto' == j) {
              d.columns[c].width = a.minWidth, i += d.columns[c].width;
              var m = d.columns[c];
              return l(function () {
                o.resizeOnData(m, !0);
              }), void 0;
            }
            if (-1 != j.indexOf('*'))
              return a.visible !== !1 && (h += j.length), a.index = c, e.push(a), void 0;
            if (g)
              return a.index = c, f.push(a), void 0;
            throw 'unable to parse column width, use percentage ("10%","20%", etc...) or "*" to use remaining width of grid';
          }
          a.visible !== !1 && (i += d.columns[c].width = parseInt(a.width, 10));
        }), e.length > 0) {
        o.config.maintainColumnRatios === !1 ? angular.noop() : o.config.maintainColumnRatios = !0;
        var j = o.rootDim.outerWidth - i, m = Math.floor(j / h);
        angular.forEach(e, function (a) {
          var b = a.width.length;
          if (d.columns[a.index].width = m * b, a.index + 1 == c) {
            var e = 2;
            o.maxCanvasHt > d.viewportDimHeight() && (e += g.ScrollW), d.columns[a.index].width -= e;
          }
          a.visible !== !1 && (i += d.columns[a.index].width);
        });
      }
      f.length > 0 && angular.forEach(f, function (a) {
        var b = a.width;
        d.columns[a.index].width = Math.floor(o.rootDim.outerWidth * (parseInt(b.slice(0, -1), 10) / 100));
      });
    }, o.init = function () {
      d.selectionProvider = new ng.selectionProvider(o, d), d.domAccessProvider = new ng.DomAccessProvider(o), o.rowFactory = new ng.RowFactory(o, d, g, j, k), o.searchProvider = new ng.SearchProvider(d, o, i), o.styleProvider = new ng.StyleProvider(d, o, g), d.$watch('configGroups', function (a) {
        var b = [];
        angular.forEach(a, function (a) {
          b.push(a.field || a);
        }), o.config.groups = b, o.rowFactory.filteredRowsChanged(), d.$emit('ngGridEventGroups', a);
      }, !0), d.$watch('columns', function (a) {
        g.BuildStyles(d, o, !0), d.$emit('ngGridEventColumns', a);
      }, !0), d.$watch(function () {
        return e.i18n;
      }, function (a) {
        k.seti18n(d, a);
      }), o.maxCanvasHt = o.calcMaxCanvasHeight(), o.config.sortInfo.fields && o.config.sortInfo.fields.length > 0 && (o.config.sortInfo.columns ? o.config.sortInfo.columns.length = 0 : o.config.sortInfo.columns = [], angular.forEach(d.columns, function (a) {
        return -1 != o.config.sortInfo.fields.indexOf(a.field) && o.config.sortInfo.columns.push(a), !1;
      }), o.sortData(o.config.sortInfo.columns, {}));
    }, o.resizeOnData = function (a) {
      var b = a.minWidth, c = k.getElementsByClassName('col' + a.index);
      angular.forEach(c, function (a, c) {
        var d;
        if (0 === c) {
          var e = $(a).find('.ngHeaderText');
          d = k.visualLength(e) + 10;
        } else {
          var f = $(a).find('.ngCellText');
          d = k.visualLength(f) + 10;
        }
        d > b && (b = d);
      }), a.width = a.longest = Math.min(a.maxWidth, b + 7), g.BuildStyles(d, o, !0);
    }, o.lastSortedColumns = [], o.changeRowOrder = function (a, b) {
      var c = o.rowCache.indexOf(a), e = o.rowCache.indexOf(b);
      o.rowCache.splice(c, 1), o.rowCache.splice(e, 0, a), d.$emit('ngGridEventChangeOrder', o.rowCache);
    }, o.sortData = function (a, b) {
      if (b.shiftKey && o.config.sortInfo) {
        var c = o.config.sortInfo.columns.indexOf(a);
        -1 === c ? (1 == o.config.sortInfo.columns.length && (o.config.sortInfo.columns[0].sortPriority = 1), o.config.sortInfo.columns.push(a), a.sortPriority = o.config.sortInfo.columns.length, o.config.sortInfo.fields.push(a.field), o.config.sortInfo.directions.push(a.sortDirection), o.lastSortedColumns.push(a)) : o.config.sortInfo.directions[c] = a.sortDirection;
      } else {
        var e = $.isArray(a);
        o.config.sortInfo.columns.length = 0, o.config.sortInfo.fields.length = 0, o.config.sortInfo.directions.length = 0;
        var g = function (a) {
          o.config.sortInfo.columns.push(a), o.config.sortInfo.fields.push(a.field), o.config.sortInfo.directions.push(a.sortDirection), o.lastSortedColumns.push(a);
        };
        e ? (o.clearSortingData(), angular.forEach(a, function (a, b) {
          a.sortPriority = b + 1, g(a);
        })) : (o.clearSortingData(a), a.sortPriority = void 0, g(a));
      }
      if (!o.config.useExternalSorting) {
        var h = o.data.slice(0);
        angular.forEach(h, function (a, b) {
          a.preSortSelected = o.rowCache[o.rowMap[b]].selected, a.preSortIndex = b;
        }), f.Sort(o.config.sortInfo, h), angular.forEach(h, function (a, b) {
          o.rowCache[b].entity = a, o.rowCache[b].selected = a.preSortSelected, o.rowMap[a.preSortIndex] = b, delete a.preSortSelected, delete a.preSortIndex;
        });
      }
      o.searchProvider.evalFilter(), d.$emit('ngGridEventSorted', o.config.sortInfo);
    }, o.clearSortingData = function (a) {
      a ? (angular.forEach(o.lastSortedColumns, function (b) {
        a.index != b.index && (b.sortDirection = '', b.sortPriority = null);
      }), o.lastSortedColumns[0] = a, o.lastSortedColumns.length = 1) : (angular.forEach(o.lastSortedColumns, function (a) {
        a.sortDirection = '', a.sortPriority = null;
      }), o.lastSortedColumns = []);
    }, o.fixColumnIndexes = function () {
      for (var a = 0; a < d.columns.length; a++)
        d.columns[a].visible !== !1 && (d.columns[a].index = a);
    }, o.fixGroupIndexes = function () {
      angular.forEach(d.configGroups, function (a, b) {
        a.groupIndex = b + 1;
      });
    }, d.elementsNeedMeasuring = !0, d.columns = [], d.renderedRows = [], d.renderedColumns = [], d.headerRow = null, d.rowHeight = o.config.rowHeight, d.jqueryUITheme = o.config.jqueryUITheme, d.showSelectionCheckbox = o.config.showSelectionCheckbox, d.enableCellSelection = o.config.enableCellSelection, d.footer = null, d.selectedItems = o.config.selectedItems, d.multiSelect = o.config.multiSelect, d.showFooter = o.config.showFooter, d.footerRowHeight = d.showFooter ? o.config.footerRowHeight : 0, d.showColumnMenu = o.config.showColumnMenu, d.showMenu = !1, d.configGroups = [], d.gridId = o.gridId, d.enablePaging = o.config.enablePaging, d.pagingOptions = o.config.pagingOptions, d.i18n = {}, k.seti18n(d, o.config.i18n), d.adjustScrollLeft = function (a) {
      for (var b = 0, c = 0, e = d.columns.length, f = [], h = !o.config.enableColumnHeavyVirt, i = 0, j = function (a) {
            h ? f.push(a) : d.renderedColumns[i] ? d.renderedColumns[i].setVars(a) : d.renderedColumns[i] = a.copy(), i++;
          }, k = 0; e > k; k++) {
        var l = d.columns[k];
        if (l.visible !== !1) {
          var m = l.width + b;
          if (l.pinned) {
            j(l);
            var n = k > 0 ? a + c : a;
            g.setColLeft(l, n, o), c += l.width;
          } else
            m >= a && b <= a + o.rootDim.outerWidth && j(l);
          b += l.width;
        }
      }
      h && (d.renderedColumns = f);
    }, o.prevScrollTop = 0, o.prevScrollIndex = 0, d.adjustScrollTop = function (a, e) {
      if (o.prevScrollTop !== a || e) {
        a > 0 && o.$viewport[0].scrollHeight - a <= o.$viewport.outerHeight() && d.$emit('ngGridEventScroll');
        var f, g = Math.floor(a / o.config.rowHeight);
        if (o.filteredRows.length > o.config.virtualizationThreshold) {
          if (o.prevScrollTop < a && g < o.prevScrollIndex + c)
            return;
          if (o.prevScrollTop > a && g > o.prevScrollIndex - c)
            return;
          f = new ng.Range(Math.max(0, g - b), g + o.minRowsToRender() + b);
        } else {
          var h = d.configGroups.length > 0 ? o.rowFactory.parsedData.length : o.data.length;
          f = new ng.Range(0, Math.max(h, o.minRowsToRender() + b));
        }
        o.prevScrollTop = a, o.rowFactory.UpdateViewableRange(f), o.prevScrollIndex = g;
      }
    }, d.toggleShowMenu = function () {
      d.showMenu = !d.showMenu;
    }, d.toggleSelectAll = function (a) {
      d.selectionProvider.toggleSelectAll(a);
    }, d.totalFilteredItemsLength = function () {
      return o.filteredRows.length;
    }, d.showGroupPanel = function () {
      return o.config.showGroupPanel;
    }, d.topPanelHeight = function () {
      return o.config.showGroupPanel === !0 ? o.config.headerRowHeight + 32 : o.config.headerRowHeight;
    }, d.viewportDimHeight = function () {
      return Math.max(0, o.rootDim.outerHeight - d.topPanelHeight() - d.footerRowHeight - 2);
    }, d.groupBy = function (a) {
      if (a.sortDirection || a.sort({ shiftKey: !1 }), !(o.data.length < 1) && a.groupable && a.field) {
        var b = d.configGroups.indexOf(a);
        -1 == b ? (a.isGroupedBy = !0, d.configGroups.push(a), a.groupIndex = d.configGroups.length) : d.removeGroup(b), o.$viewport.scrollTop(0), g.digest(d);
      }
    }, d.removeGroup = function (a) {
      var b = d.columns.filter(function (b) {
          return b.groupIndex == a + 1;
        })[0];
      b.isGroupedBy = !1, b.groupIndex = 0, d.columns[a].isAggCol && (d.columns.splice(a, 1), d.configGroups.splice(a, 1), o.fixGroupIndexes()), 0 === d.configGroups.length && (o.fixColumnIndexes(), g.digest(d)), d.adjustScrollLeft(0);
    }, d.togglePin = function (a) {
      for (var b = a.index, c = 0, e = 0; e < d.columns.length && d.columns[e].pinned; e++)
        c++;
      a.pinned && (c = Math.max(a.originalIndex, c - 1)), a.pinned = !a.pinned, d.columns.splice(b, 1), d.columns.splice(c, 0, a), o.fixColumnIndexes(), g.BuildStyles(d, o, !0), o.$viewport.scrollLeft(o.$viewport.scrollLeft() - a.width);
    }, d.totalRowWidth = function () {
      for (var a = 0, b = d.columns, c = 0; c < b.length; c++)
        b[c].visible !== !1 && (a += b[c].width);
      return a;
    }, d.headerScrollerDim = function () {
      var a = d.viewportDimHeight(), b = o.maxCanvasHt, c = b > a, e = new ng.Dimension();
      return e.autoFitHeight = !0, e.outerWidth = d.totalRowWidth(), c ? e.outerWidth += o.elementDims.scrollW : b - a <= o.elementDims.scrollH && (e.outerWidth += o.elementDims.scrollW), e;
    }, o.init();
  }, ng.Range = function (a, b) {
    this.topRow = a, this.bottomRow = b;
  }, ng.Row = function (a, b, c, d, e) {
    var f = this, g = b.enableRowSelection;
    f.jqueryUITheme = b.jqueryUITheme, f.rowClasses = b.rowClasses, f.entity = a, f.selectionProvider = c, f.selected = c.getSelection(a), f.cursor = g ? 'pointer' : 'default', f.setSelection = function (a) {
      f.selectionProvider.setSelection(f, a), f.selectionProvider.lastClickedRow = f;
    }, f.continueSelection = function (a) {
      f.selectionProvider.ChangeSelection(f, a);
    }, f.ensureEntity = function (a) {
      f.entity != a && (f.entity = a, f.selected = f.selectionProvider.getSelection(f.entity));
    }, f.toggleSelected = function (a) {
      if (!g && !b.enableCellSelection)
        return !0;
      var c = a.target || a;
      return 'checkbox' == c.type && 'ngSelectionCell ng-scope' != c.parentElement.className ? !0 : b.selectWithCheckboxOnly && 'checkbox' != c.type ? (f.selectionProvider.lastClickedRow = f, !0) : (f.beforeSelectionChange(f, a) && f.continueSelection(a), !1);
    }, f.rowIndex = d, f.offsetTop = f.rowIndex * b.rowHeight, f.rowDisplayIndex = 0, f.alternatingRowClass = function () {
      var a = 0 === f.rowIndex % 2, b = {
          selected: f.selected,
          'ui-state-default': f.jqueryUITheme && a,
          'ui-state-active': f.jqueryUITheme && !a,
          even: a,
          odd: !a
        };
      return b;
    }, f.beforeSelectionChange = b.beforeSelectionChangeCallback, f.afterSelectionChange = b.afterSelectionChangeCallback, f.getProperty = function (a) {
      return e.evalProperty(f.entity, a);
    }, f.copy = function () {
      return f.clone = new ng.Row(a, b, c, d, e), f.clone.isClone = !0, f.clone.elm = f.elm, f.clone;
    }, f.setVars = function (a) {
      a.clone = f, f.entity = a.entity, f.selected = a.selected;
    };
  }, ng.RowFactory = function (a, c, d, e, j) {
    var k = this;
    k.aggCache = {}, k.parentCache = [], k.dataChanged = !0, k.parsedData = [], k.rowConfig = {}, k.selectionProvider = c.selectionProvider, k.rowHeight = 30, k.numberOfAggregates = 0, k.groupedData = void 0, k.rowHeight = a.config.rowHeight, k.rowConfig = {
      enableRowSelection: a.config.enableRowSelection,
      rowClasses: a.config.rowClasses,
      selectedItems: c.selectedItems,
      selectWithCheckboxOnly: a.config.selectWithCheckboxOnly,
      beforeSelectionChangeCallback: a.config.beforeSelectionChange,
      afterSelectionChangeCallback: a.config.afterSelectionChange,
      jqueryUITheme: a.config.jqueryUITheme,
      enableCellSelection: a.config.enableCellSelection,
      rowHeight: a.config.rowHeight
    }, k.renderedRange = new ng.Range(0, a.minRowsToRender() + b), k.buildEntityRow = function (a, b) {
      return new ng.Row(a, k.rowConfig, k.selectionProvider, b, j);
    }, k.buildAggregateRow = function (a, b) {
      var c = k.aggCache[a.aggIndex];
      return c || (c = new ng.Aggregate(a, k, k.rowConfig.rowHeight), k.aggCache[a.aggIndex] = c), c.rowIndex = b, c.offsetTop = b * k.rowConfig.rowHeight, c;
    }, k.UpdateViewableRange = function (a) {
      k.renderedRange = a, k.renderedChange();
    }, k.filteredRowsChanged = function () {
      a.lateBoundColumns && a.filteredRows.length > 0 && (a.config.columnDefs = void 0, a.buildColumns(), a.lateBoundColumns = !1, c.$evalAsync(function () {
        c.adjustScrollLeft(0);
      })), k.dataChanged = !0, a.config.groups.length > 0 && k.getGrouping(a.config.groups), k.UpdateViewableRange(k.renderedRange);
    }, k.renderedChange = function () {
      if (!k.groupedData || a.config.groups.length < 1)
        return k.renderedChangeNoGroups(), a.refreshDomSizes(), void 0;
      k.wasGrouped = !0, k.parentCache = [];
      var b = 0, c = k.parsedData.filter(function (a) {
          return a.isAggRow ? a.parent && a.parent.collapsed ? !1 : !0 : (a[h] || (a.rowIndex = b++), !a[h]);
        });
      k.totalRows = c.length;
      for (var d = [], e = k.renderedRange.topRow; e < k.renderedRange.bottomRow; e++)
        c[e] && (c[e].offsetTop = e * a.config.rowHeight, d.push(c[e]));
      a.setRenderedRows(d);
    }, k.renderedChangeNoGroups = function () {
      for (var b = [], c = k.renderedRange.topRow; c < k.renderedRange.bottomRow; c++)
        a.filteredRows[c] && (a.filteredRows[c].rowIndex = c, a.filteredRows[c].offsetTop = c * a.config.rowHeight, b.push(a.filteredRows[c]));
      a.setRenderedRows(b);
    }, k.fixRowCache = function () {
      var b = a.data.length, c = b - a.rowCache.length;
      if (0 > c)
        a.rowCache.length = a.rowMap.length = b;
      else
        for (var d = a.rowCache.length; b > d; d++)
          a.rowCache[d] = a.rowFactory.buildEntityRow(a.data[d], d);
    }, k.parseGroupData = function (a) {
      if (a.values)
        for (var b = 0; b < a.values.length; b++)
          k.parentCache[k.parentCache.length - 1].children.push(a.values[b]), k.parsedData.push(a.values[b]);
      else
        for (var c in a)
          if (c != f && c != g && c != i && a.hasOwnProperty(c)) {
            var d = k.buildAggregateRow({
                gField: a[f],
                gLabel: c,
                gDepth: a[g],
                isAggRow: !0,
                _ng_hidden_: !1,
                children: [],
                aggChildren: [],
                aggIndex: k.numberOfAggregates,
                aggLabelFilter: a[i].aggLabelFilter
              }, 0);
            k.numberOfAggregates++, d.parent = k.parentCache[d.depth - 1], d.parent && (d.parent.collapsed = !1, d.parent.aggChildren.push(d)), k.parsedData.push(d), k.parentCache[d.depth] = d, k.parseGroupData(a[c]);
          }
    }, k.getGrouping = function (b) {
      k.aggCache = [], k.numberOfAggregates = 0, k.groupedData = {};
      for (var l = a.filteredRows, m = b.length, n = c.columns, o = 0; o < l.length; o++) {
        var p = l[o].entity;
        if (!p)
          return;
        l[o][h] = !0;
        for (var q = k.groupedData, r = 0; r < b.length; r++) {
          var s = b[r], t = n.filter(function (a) {
              return a.field == s;
            })[0], u = j.evalProperty(p, s);
          u = u ? u.toString() : 'null', q[u] || (q[u] = {}), q[f] || (q[f] = s), q[g] || (q[g] = r), q[i] || (q[i] = t), q = q[u];
        }
        q.values || (q.values = []), q.values.push(l[o]);
      }
      for (var v = 0; v < b.length; v++)
        !n[v].isAggCol && m >= v && n.splice(0, 0, new ng.Column({
          colDef: {
            field: '',
            width: 25,
            sortable: !1,
            resizable: !1,
            headerCellTemplate: '<div class="ngAggHeader"></div>',
            pinned: a.config.pinSelectionCheckbox
          },
          isAggCol: !0,
          headerRowHeight: a.config.headerRowHeight
        }, c, a, d, e, j));
      d.BuildStyles(c, a, !0), a.fixColumnIndexes(), c.adjustScrollLeft(0), k.parsedData.length = 0, k.parseGroupData(k.groupedData), k.fixRowCache();
    }, a.config.groups.length > 0 && a.filteredRows.length > 0 && k.getGrouping(a.config.groups);
  }, ng.SearchProvider = function (a, b, c) {
    var d = this, e = [];
    d.extFilter = b.config.filterOptions.useExternalFilter, a.showFilter = b.config.showFilter, a.filterText = '', d.fieldMap = {}, d.evalFilter = function () {
      var a = function (a) {
        for (var b = 0, g = e.length; g > b; b++) {
          var h, i = e[b];
          if (!i.column) {
            for (var j in a)
              if (a.hasOwnProperty(j)) {
                var k = d.fieldMap[j];
                if (!k)
                  continue;
                var l = null, m = null;
                k && k.cellFilter && (m = k.cellFilter.split(':'), l = c(m[0]));
                var n = a[j];
                if (null != n) {
                  if ('function' == typeof l) {
                    var o = l('object' == typeof n ? f(n, k.field) : n, m[1]).toString();
                    h = i.regex.test(o);
                  } else
                    h = i.regex.test('object' == typeof n ? f(n, k.field).toString() : n.toString());
                  if (n && h)
                    return !0;
                }
              }
            return !1;
          }
          var p = d.fieldMap[i.columnDisplay];
          if (!p)
            return !1;
          var q = p.cellFilter.split(':'), r = p.cellFilter ? c(q[0]) : null, s = a[i.column] || a[p.field.split('.')[0]];
          if (null == s)
            return !1;
          if ('function' == typeof r) {
            var t = r('object' == typeof s ? f(s, p.field) : s, q[1]).toString();
            h = i.regex.test(t);
          } else
            h = i.regex.test('object' == typeof s ? f(s, p.field).toString() : s.toString());
          if (!s || !h)
            return !1;
        }
        return !0;
      };
      b.filteredRows = 0 === e.length ? b.rowCache : b.rowCache.filter(function (b) {
        return a(b.entity);
      });
      for (var g = 0; g < b.filteredRows.length; g++)
        b.filteredRows[g].rowIndex = g;
      b.rowFactory.filteredRowsChanged();
    };
    var f = function (a, b) {
        if ('object' != typeof a || 'string' != typeof b)
          return a;
        var c = b.split('.'), d = a;
        if (c.length > 1) {
          for (var e = 1, f = c.length; f > e; e++)
            if (d = d[c[e]], !d)
              return a;
          return d;
        }
        return a;
      }, g = function (a, b) {
        try {
          return new RegExp(a, b);
        } catch (c) {
          return new RegExp(a.replace(/(\^|\$|\(|\)|\<|\>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, '\\$1'));
        }
      }, h = function (a) {
        e = [];
        var b;
        if (b = $.trim(a))
          for (var c = b.split(';'), d = 0; d < c.length; d++) {
            var f = c[d].split(':');
            if (f.length > 1) {
              var h = $.trim(f[0]), i = $.trim(f[1]);
              h && i && e.push({
                column: h,
                columnDisplay: h.replace(/\s+/g, '').toLowerCase(),
                regex: g(i, 'i')
              });
            } else {
              var j = $.trim(f[0]);
              j && e.push({
                column: '',
                regex: g(j, 'i')
              });
            }
          }
      };
    a.$watch(b.config.filterOptions.filterText, function (b) {
      a.filterText = b;
    }), a.$watch('filterText', function (b) {
      d.extFilter || (a.$emit('ngGridEventFilter', b), h(b), d.evalFilter());
    }), d.extFilter || a.$watch('columns', function (a) {
      for (var b = 0; b < a.length; b++) {
        var c = a[b];
        c.field && (d.fieldMap[c.field.split('.')[0]] = c), c.displayName && (d.fieldMap[c.displayName.toLowerCase().replace(/\s+/g, '')] = c);
      }
    });
  }, ng.selectionProvider = function (a, b) {
    var c = this;
    c.multi = a.config.multiSelect, c.selectedItems = a.config.selectedItems, c.selectedIndex = a.config.selectedIndex, c.lastClickedRow = void 0, c.ignoreSelectedItemChanges = !1, c.ChangeSelection = function (d, e) {
      var f = d.isClone ? a.filteredRows[d.rowIndex] : d;
      if (e && e.shiftKey && !e.keyCode && c.multi && a.config.enableRowSelection) {
        if (c.lastClickedRow) {
          var g;
          g = b.configGroups.length > 0 ? a.rowFactory.parsedData.filter(function (a) {
            return !a.isAggRow;
          }) : a.filteredRows;
          var h = f.rowIndex, i = c.lastClickedRow.rowIndex;
          if (c.lastClickedRow = f, h == i)
            return !1;
          i > h ? (h ^= i, i = h ^ i, h ^= i, h--) : i++;
          for (var j = []; h >= i; i++)
            j.push(g[i]);
          if (j[j.length - 1].beforeSelectionChange(j, e)) {
            for (var k = 0; k < j.length; k++) {
              var l = j[k], m = l.selected;
              l.selected = !m, l.clone && (l.clone.selected = l.selected);
              var n = c.selectedItems.indexOf(l.entity);
              -1 === n ? c.selectedItems.push(l.entity) : c.selectedItems.splice(n, 1);
            }
            j[j.length - 1].afterSelectionChange(j, e);
          }
          return !0;
        }
      } else
        c.multi ? e.keyCode || c.setSelection(f, !f.selected) : c.lastClickedRow == f ? c.setSelection(c.lastClickedRow, a.config.keepLastSelected ? !0 : !f.selected) : (c.lastClickedRow && c.setSelection(c.lastClickedRow, !1), c.setSelection(f, !f.selected));
      return c.lastClickedRow = f, !0;
    }, c.getSelection = function (a) {
      return -1 !== c.selectedItems.indexOf(a);
    }, c.setSelection = function (b, d) {
      var e = b.isClone ? a.filteredRows[b.rowIndex] : b;
      if (a.config.enableRowSelection) {
        if (e.selected = d, e.clone && (e.clone.selected = d), d)
          -1 === c.selectedItems.indexOf(e.entity) && (!c.multi && c.selectedItems.length > 0 && (c.toggleSelectAll(!1, !0), e.selected = d, e.clone && (e.clone.selected = d)), c.selectedItems.push(e.entity));
        else {
          var f = c.selectedItems.indexOf(e.entity);
          -1 != f && c.selectedItems.splice(f, 1);
        }
        e.afterSelectionChange(e);
      }
    }, c.toggleSelectAll = function (b, d) {
      if (d || a.config.beforeSelectionChange(a.filteredRows)) {
        var e = c.selectedItems.length;
        e > 0 && (c.selectedItems.length = 0);
        for (var f = 0; f < a.filteredRows.length; f++)
          a.filteredRows[f].selected = b, a.filteredRows[f].clone && (a.filteredRows[f].clone.selected = b), b && c.selectedItems.push(a.filteredRows[f].entity);
        d || a.config.afterSelectionChange(a.filteredRows);
      }
    };
  }, ng.StyleProvider = function (a, b, c) {
    a.headerCellStyle = function (a) {
      return { height: a.headerRowHeight + 'px' };
    }, a.rowStyle = function (b) {
      return {
        top: b.offsetTop + 'px',
        height: a.rowHeight + 'px'
      };
    }, a.canvasStyle = function () {
      return { height: b.maxCanvasHt.toString() + 'px' };
    }, a.headerScrollerStyle = function () {
      return { height: b.config.headerRowHeight + 'px' };
    }, a.topPanelStyle = function () {
      return {
        width: b.rootDim.outerWidth + 'px',
        height: a.topPanelHeight() + 'px'
      };
    }, a.headerStyle = function () {
      return {
        width: b.rootDim.outerWidth - c.ScrollW + 'px',
        height: b.config.headerRowHeight + 'px'
      };
    }, a.groupPanelStyle = function () {
      return {
        width: b.rootDim.outerWidth - c.ScrollW + 'px',
        height: '32px'
      };
    }, a.viewportStyle = function () {
      return {
        width: b.rootDim.outerWidth + 'px',
        height: a.viewportDimHeight() + 'px'
      };
    }, a.footerStyle = function () {
      return {
        width: b.rootDim.outerWidth + 'px',
        height: a.footerRowHeight + 'px'
      };
    };
  }, p.directive('ngCellHasFocus', [
    '$domUtilityService',
    function (a) {
      var b = function (b, c) {
        b.isFocused = !0, a.digest(b);
        var d = angular.element(c[0].children).filter(function () {
            return 8 != this.nodeType;
          }), e = angular.element(d[0].children[0]);
        e.length > 0 && (angular.element(e).focus(), b.domAccessProvider.selectInputElement(e[0]), angular.element(e).bind('blur', function () {
          return b.isFocused = !1, a.digest(b), !0;
        }));
      };
      return function (a, c) {
        var d = !1;
        a.editCell = function () {
          setTimeout(function () {
            b(a, c);
          }, 0);
        }, c.bind('mousedown', function () {
          return c.focus(), !0;
        }), c.bind('focus', function () {
          return d = !0, !0;
        }), c.bind('blur', function () {
          return d = !1, !0;
        }), c.bind('keydown', function (e) {
          return d && 37 != e.keyCode && 38 != e.keyCode && 39 != e.keyCode && 40 != e.keyCode && 9 != e.keyCode && !e.shiftKey && 13 != e.keyCode && b(a, c), 27 == e.keyCode && c.focus(), !0;
        });
      };
    }
  ]), p.directive('ngCellText', function () {
    return function (a, b) {
      b.bind('mouseover', function (a) {
        a.preventDefault(), b.css({ cursor: 'text' });
      }), b.bind('mouseleave', function (a) {
        a.preventDefault(), b.css({ cursor: 'default' });
      });
    };
  }), p.directive('ngCell', [
    '$compile',
    '$domUtilityService',
    function (a, b) {
      var c = {
          scope: !1,
          compile: function () {
            return {
              pre: function (b, c) {
                var d, e = b.col.cellTemplate.replace(k, '$eval(\'row.entity.\' + col.field)');
                b.col.enableCellEdit ? (d = b.col.cellEditTemplate, d = d.replace(l, e), d = d.replace(m, b.col.editableCellTemplate.replace(k, 'col.field'))) : d = e;
                var f = a(d)(b);
                b.enableCellSelection && -1 == f[0].className.indexOf('ngSelectionCell') && (f[0].setAttribute('tabindex', 0), f.addClass('ngCellElement')), c.append(f);
              },
              post: function (a, c) {
                a.enableCellSelection && a.domAccessProvider.selectionHandlers(a, c), a.$on('ngGridEventDigestCell', function () {
                  b.digest(a);
                });
              }
            };
          }
        };
      return c;
    }
  ]), p.directive('ngGrid', [
    '$compile',
    '$filter',
    '$templateCache',
    '$sortService',
    '$domUtilityService',
    '$utilityService',
    '$timeout',
    function (a, b, c, d, e, f, g) {
      var h = {
          scope: !0,
          compile: function () {
            return {
              pre: function (h, i, j) {
                var k = $(i), l = h.$eval(j.ngGrid);
                l.gridDim = new ng.Dimension({
                  outerHeight: $(k).height(),
                  outerWidth: $(k).width()
                });
                var m = new ng.Grid(h, l, d, e, b, c, f, g);
                if ('string' == typeof l.columnDefs ? h.$parent.$watch(l.columnDefs, function (a) {
                    return a ? (h.columns = [], m.config.columnDefs = a, m.buildColumns(), m.configureColumnWidths(), m.eventProvider.assignEvents(), e.RebuildGrid(h, m), void 0) : (m.refreshDomSizes(), m.buildColumns(), void 0);
                  }) : m.buildColumns(), 'string' == typeof l.data) {
                  var n = function (a) {
                    m.data = $.extend([], a), m.rowFactory.fixRowCache(), angular.forEach(m.data, function (a, b) {
                      var c = m.rowMap[b] || b;
                      m.rowCache[c] && m.rowCache[c].ensureEntity(a), m.rowMap[c] = b;
                    }), m.searchProvider.evalFilter(), m.configureColumnWidths(), m.refreshDomSizes(), m.config.sortInfo.fields.length > 0 && d.sortData(m.config.sortInfo, m.data.slice(0)), h.$emit('ngGridEventData', m.gridId);
                  };
                  h.$parent.$watch(l.data, n), h.$parent.$watch(l.data + '.length', function () {
                    n(h.$eval(l.data));
                  });
                }
                return m.footerController = new ng.Footer(h, m), i.addClass('ngGrid').addClass(m.gridId.toString()), l.jqueryUITheme && i.addClass('ui-widget'), i.append(a(c.get('gridTemplate.html'))(h)), e.AssignGridContainers(h, i, m), m.eventProvider = new ng.EventProvider(m, h, e), angular.forEach(l.plugins, function (a) {
                  'function' == typeof a ? a.call(this, []).init(h.$new(), m, {
                    SortService: d,
                    DomUtilityService: e
                  }) : a.init(h.$new(), m, {
                    SortService: d,
                    DomUtilityService: e
                  });
                }), l.selectRow = function (a, b) {
                  m.rowCache[a] && m.rowCache[a].setSelection(b ? !0 : !1);
                }, l.selectItem = function (a, b) {
                  l.selectRow(m.rowMap[a], b);
                }, l.selectAll = function (a) {
                  h.toggleSelectAll(a);
                }, l.groupBy = function (a) {
                  if (a)
                    h.groupBy(h.columns.filter(function (b) {
                      return b.field == a;
                    })[0]);
                  else {
                    var b = $.extend(!0, [], h.configGroups);
                    angular.forEach(b, h.groupBy);
                  }
                }, l.sortBy = function (a) {
                  var b = h.columns.filter(function (b) {
                      return b.field == a;
                    })[0];
                  b && b.sort();
                }, l.gridId = m.gridId, l.ngGrid = m, l.$gridScope = h, h.$on('ngGridEventDigestGrid', function () {
                  e.digest(h.$parent);
                }), h.$on('ngGridEventDigestGridParent', function () {
                  e.digest(h.$parent);
                }), h.$evalAsync(function () {
                  h.adjustScrollLeft(0);
                }), null;
              }
            };
          }
        };
      return h;
    }
  ]), p.directive('ngHeaderCell', [
    '$compile',
    function (a) {
      var b = {
          scope: !1,
          compile: function () {
            return {
              pre: function (b, c) {
                c.append(a(b.col.headerCellTemplate)(b));
              }
            };
          }
        };
      return b;
    }
  ]), p.directive('ngHeaderRow', [
    '$compile',
    '$templateCache',
    function (a, b) {
      var c = {
          scope: !1,
          compile: function () {
            return {
              pre: function (c, d) {
                0 === d.children().length && d.append(a(b.get(c.gridId + 'headerRowTemplate.html'))(c));
              }
            };
          }
        };
      return c;
    }
  ]), p.directive('ngIf', [function () {
      return {
        transclude: 'element',
        priority: 1000,
        terminal: !0,
        restrict: 'A',
        compile: function (a, b, c) {
          return function (a, b, d) {
            var e, f;
            a.$watch(d.ngIf, function (d) {
              e && (e.remove(), e = void 0), f && (f.$destroy(), f = void 0), d && (f = a.$new(), c(f, function (a) {
                e = a, b.after(a);
              }));
            });
          };
        }
      };
    }]), p.directive('ngInput', [
    '$parse',
    function (a) {
      return function (b, c, d) {
        var e = a(b.$eval(d.ngInput)), f = e.assign, g = e(b.row.entity);
        c.val(g), c.bind('keyup', function () {
          var a = c.val();
          b.$root.$$phase || b.$apply(function () {
            f(b.row.entity, a);
          });
        }), c.bind('keydown', function (a) {
          switch (a.keyCode) {
          case 37:
          case 38:
          case 39:
          case 40:
            a.stopPropagation();
            break;
          case 27:
            b.$root.$$phase || b.$apply(function () {
              f(b.row.entity, g), c.val(g), c.blur();
            });
          }
          return !0;
        });
      };
    }
  ]), p.directive('ngRow', [
    '$compile',
    '$domUtilityService',
    '$templateCache',
    function (a, b, c) {
      var d = {
          scope: !1,
          compile: function () {
            return {
              pre: function (d, e) {
                if (d.row.elm = e, d.row.clone && (d.row.clone.elm = e), d.row.isAggRow) {
                  var f = c.get(d.gridId + 'aggregateTemplate.html');
                  f = d.row.aggLabelFilter ? f.replace(j, '| ' + d.row.aggLabelFilter) : f.replace(j, ''), e.append(a(f)(d));
                } else
                  e.append(a(c.get(d.gridId + 'rowTemplate.html'))(d));
                d.$on('ngGridEventDigestRow', function () {
                  b.digest(d);
                });
              }
            };
          }
        };
      return d;
    }
  ]), p.directive('ngViewport', [function () {
      return function (a, b) {
        var c, d, e = 0;
        b.bind('scroll', function (b) {
          var f = b.target.scrollLeft, g = b.target.scrollTop;
          return a.$headerContainer && a.$headerContainer.scrollLeft(f), a.adjustScrollLeft(f), a.adjustScrollTop(g), a.$root.$$phase || a.$digest(), d = f, e = e, c = !1, !0;
        }), b.bind('mousewheel DOMMouseScroll', function () {
          return c = !0, b.focus(), !0;
        }), a.enableCellSelection || a.domAccessProvider.selectionHandlers(a, b);
      };
    }]), a.ngGrid.i18n.en = {
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
  }, a.ngGrid.i18n.fr = {
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
  }, a.ngGrid.i18n.ge = {
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
  }, a.ngGrid.i18n.sp = {
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
  }, a.ngGrid.i18n['zh-cn'] = {
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
    function (a) {
      a.put('aggregateTemplate.html', '<div ng-click="row.toggleExpand()" ng-style="{\'left\': row.offsetleft}" class="ngAggregate">    <span class="ngAggregateText">{{row.label CUSTOM_FILTERS}} ({{row.totalChildren()}} {{AggItemsLabel}})</span>    <div class="{{row.aggClass()}}"></div></div>'), a.put('cellEditTemplate.html', '<div ng-cell-has-focus ng-dblclick="editCell()">\t<div ng-if="!isFocused">\tDISPLAY_CELL_TEMPLATE\t</div>\t<div ng-if="isFocused">\tEDITABLE_CELL_TEMPLATE\t</div></div>'), a.put('cellTemplate.html', '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD CUSTOM_FILTERS}}</span></div>'), a.put('checkboxCellTemplate.html', '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'), a.put('checkboxHeaderTemplate.html', '<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>'), a.put('editableCellTemplate.html', '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" />'), a.put('gridTemplate.html', '<div class="ngTopPanel" ng-class="{\'ui-widget-header\':jqueryUITheme, \'ui-corner-top\': jqueryUITheme}" ng-style="topPanelStyle()">    <div class="ngGroupPanel" ng-show="showGroupPanel()" ng-style="groupPanelStyle()">        <div class="ngGroupPanelDescription" ng-show="configGroups.length == 0">{{i18n.ngGroupPanelDescription}}</div>        <ul ng-show="configGroups.length > 0" class="ngGroupList">            <li class="ngGroupItem" ng-repeat="group in configGroups">                <span class="ngGroupElement">                    <span class="ngGroupName">{{group.displayName}}                        <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span>                    </span>                    <span ng-hide="$last" class="ngGroupArrow"></span>                </span>            </li>        </ul>    </div>    <div class="ngHeaderContainer" ng-style="headerStyle()">        <div class="ngHeaderScroller" ng-style="headerScrollerStyle()" ng-header-row></div>    </div>    <div class="ngHeaderButton" ng-show="showColumnMenu || showFilter" ng-click="toggleShowMenu()">        <div class="ngHeaderButtonArrow" ng-click=""></div>    </div>    <div ng-show="showMenu" class="ngColMenu">        <div ng-show="showFilter">            <input placeholder="{{i18n.ngSearchPlaceHolder}}" type="text" ng-model="filterText"/>        </div>        <div ng-show="showColumnMenu">            <span class="ngMenuText">{{i18n.ngMenuText}}</span>            <ul class="ngColList">                <li class="ngColListItem" ng-repeat="col in columns | ngColumns">                    <label><input ng-disabled="col.pinned" type="checkbox" class="ngColListCheckbox" ng-model="col.visible"/>{{col.displayName}}</label>\t\t\t\t\t<a title="Group By" ng-class="col.groupedByClass()" ng-show="col.groupable && col.visible" ng-click="groupBy(col)"></a>\t\t\t\t\t<span class="ngGroupingNumber" ng-show="col.groupIndex > 0">{{col.groupIndex}}</span>                          </li>            </ul>        </div>    </div></div><div class="ngViewport" unselectable="on" ng-viewport ng-class="{\'ui-widget-content\': jqueryUITheme}" ng-style="viewportStyle()">    <div class="ngCanvas" ng-style="canvasStyle()">        <div ng-style="rowStyle(row)" ng-repeat="row in renderedRows" ng-click="row.toggleSelected($event)" class="ngRow" ng-class="row.alternatingRowClass()" ng-row></div>    </div></div><div class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()">    <div class="ngTotalSelectContainer" ng-show="showFooter">        <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}" >            <span class="ngLabel">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show="filterText.length > 0" class="ngLabel">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>        </div>        <div class="ngFooterSelectedItems" ng-show="multiSelect">            <span class="ngLabel">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>        </div>    </div>    <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="showFooter && enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}">        <div style="float:left; margin-right: 10px;" class="ngRowCountPicker">            <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span>            <select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize" >                <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>            </select>        </div>        <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl" style="float: left; min-width: 135px;">            <button class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"><div class="ngPagerFirstTriangle"><div class="ngPagerFirstBar"></div></div></button>            <button class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerPrevTitle}}"><div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div></button>            <input class="ngPagerCurrent" type="number" style="width:50px; height: 24px; margin-top: 1px; padding: 0px 4px;" ng-model="pagingOptions.currentPage"/>            <button class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()" title="{{i18n.ngPagerNextTitle}}"><div class="ngPagerLastTriangle ngPagerNextTriangle"></div></button>            <button class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"><div class="ngPagerLastTriangle"><div class="ngPagerLastBar"></div></div></button>        </div>    </div></div>'), a.put('headerCellTemplate.html', '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>    <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>    <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>    <div class="ngSortPriority">{{col.sortPriority}}</div>    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div></div><div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'), a.put('headerRowTemplate.html', '<div ng-style="{\'z-index\': col.zIndex(), height: col.headerRowHeight}" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngHeaderCell" ng-header-cell></div>'), a.put('rowTemplate.html', '<div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>');
    }
  ]);
}(window), function (a) {
  var b = '0.9.2', c = {
      isMsie: function () {
        var a = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
        return a ? parseInt(a[2], 10) : !1;
      },
      isBlankString: function (a) {
        return !a || /^\s*$/.test(a);
      },
      escapeRegExChars: function (a) {
        return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      },
      isString: function (a) {
        return 'string' == typeof a;
      },
      isNumber: function (a) {
        return 'number' == typeof a;
      },
      isArray: a.isArray,
      isFunction: a.isFunction,
      isObject: a.isPlainObject,
      isUndefined: function (a) {
        return void 0 === a;
      },
      bind: a.proxy,
      bindAll: function (b) {
        var c;
        for (var d in b)
          a.isFunction(c = b[d]) && (b[d] = a.proxy(c, b));
      },
      indexOf: function (a, b) {
        for (var c = 0; a.length > c; c++)
          if (a[c] === b)
            return c;
        return -1;
      },
      each: a.each,
      map: a.map,
      filter: a.grep,
      every: function (b, c) {
        var d = !0;
        return b ? (a.each(b, function (a, e) {
          return (d = c.call(null, e, a, b)) ? void 0 : !1;
        }), !!d) : d;
      },
      some: function (b, c) {
        var d = !1;
        return b ? (a.each(b, function (a, e) {
          return (d = c.call(null, e, a, b)) ? !1 : void 0;
        }), !!d) : d;
      },
      mixin: a.extend,
      getUniqueId: function () {
        var a = 0;
        return function () {
          return a++;
        };
      }(),
      defer: function (a) {
        setTimeout(a, 0);
      },
      debounce: function (a, b, c) {
        var d, e;
        return function () {
          var f, g, h = this, i = arguments;
          return f = function () {
            d = null, c || (e = a.apply(h, i));
          }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e;
        };
      },
      throttle: function (a, b) {
        var c, d, e, f, g, h;
        return g = 0, h = function () {
          g = new Date(), e = null, f = a.apply(c, d);
        }, function () {
          var i = new Date(), j = b - (i - g);
          return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f;
        };
      },
      tokenizeQuery: function (b) {
        return a.trim(b).toLowerCase().split(/[\s]+/);
      },
      tokenizeText: function (b) {
        return a.trim(b).toLowerCase().split(/[\s\-_]+/);
      },
      getProtocol: function () {
        return location.protocol;
      },
      noop: function () {
      }
    }, d = function () {
      var a = /\s+/;
      return {
        on: function (b, c) {
          var d;
          if (!c)
            return this;
          for (this._callbacks = this._callbacks || {}, b = b.split(a); d = b.shift();)
            this._callbacks[d] = this._callbacks[d] || [], this._callbacks[d].push(c);
          return this;
        },
        trigger: function (b, c) {
          var d, e;
          if (!this._callbacks)
            return this;
          for (b = b.split(a); d = b.shift();)
            if (e = this._callbacks[d])
              for (var f = 0; e.length > f; f += 1)
                e[f].call(this, {
                  type: d,
                  data: c
                });
          return this;
        }
      };
    }(), e = function () {
      function b(b) {
        b && b.el || a.error('EventBus initialized without el'), this.$el = a(b.el);
      }
      var d = 'typeahead:';
      return c.mixin(b.prototype, {
        trigger: function (a) {
          var b = [].slice.call(arguments, 1);
          this.$el.trigger(d + a, b);
        }
      }), b;
    }(), f = function () {
      function a(a) {
        this.prefix = [
          '__',
          a,
          '__'
        ].join(''), this.ttlKey = '__ttl__', this.keyMatcher = RegExp('^' + this.prefix);
      }
      function b() {
        return new Date().getTime();
      }
      function d(a) {
        return JSON.stringify(c.isUndefined(a) ? null : a);
      }
      function e(a) {
        return JSON.parse(a);
      }
      var f, g;
      try {
        f = window.localStorage;
      } catch (h) {
        f = null;
      }
      return g = f && window.JSON ? {
        _prefix: function (a) {
          return this.prefix + a;
        },
        _ttlKey: function (a) {
          return this._prefix(a) + this.ttlKey;
        },
        get: function (a) {
          return this.isExpired(a) && this.remove(a), e(f.getItem(this._prefix(a)));
        },
        set: function (a, e, g) {
          return c.isNumber(g) ? f.setItem(this._ttlKey(a), d(b() + g)) : f.removeItem(this._ttlKey(a)), f.setItem(this._prefix(a), d(e));
        },
        remove: function (a) {
          return f.removeItem(this._ttlKey(a)), f.removeItem(this._prefix(a)), this;
        },
        clear: function () {
          var a, b, c = [], d = f.length;
          for (a = 0; d > a; a++)
            (b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ''));
          for (a = c.length; a--;)
            this.remove(c[a]);
          return this;
        },
        isExpired: function (a) {
          var d = e(f.getItem(this._ttlKey(a)));
          return c.isNumber(d) && b() > d ? !0 : !1;
        }
      } : {
        get: c.noop,
        set: c.noop,
        remove: c.noop,
        clear: c.noop,
        isExpired: c.noop
      }, c.mixin(a.prototype, g), a;
    }(), g = function () {
      function a(a) {
        c.bindAll(this), a = a || {}, this.sizeLimit = a.sizeLimit || 10, this.cache = {}, this.cachedKeysByAge = [];
      }
      return c.mixin(a.prototype, {
        get: function (a) {
          return this.cache[a];
        },
        set: function (a, b) {
          var c;
          this.cachedKeysByAge.length === this.sizeLimit && (c = this.cachedKeysByAge.shift(), delete this.cache[c]), this.cache[a] = b, this.cachedKeysByAge.push(a);
        }
      }), a;
    }(), h = function () {
      function b(a) {
        c.bindAll(this), a = c.isString(a) ? { url: a } : a, i = i || new g(), h = c.isNumber(a.maxParallelRequests) ? a.maxParallelRequests : h || 6, this.url = a.url, this.wildcard = a.wildcard || '%QUERY', this.filter = a.filter, this.replace = a.replace, this.ajaxSettings = {
          type: 'get',
          cache: a.cache,
          timeout: a.timeout,
          dataType: a.dataType || 'json',
          beforeSend: a.beforeSend
        }, this._get = (/^throttle$/i.test(a.rateLimitFn) ? c.throttle : c.debounce)(this._get, a.rateLimitWait || 300);
      }
      function d() {
        j++;
      }
      function e() {
        j--;
      }
      function f() {
        return h > j;
      }
      var h, i, j = 0, k = {};
      return c.mixin(b.prototype, {
        _get: function (a, b) {
          function c(c) {
            var e = d.filter ? d.filter(c) : c;
            b && b(e), i.set(a, c);
          }
          var d = this;
          f() ? this._sendRequest(a).done(c) : this.onDeckRequestArgs = [].slice.call(arguments, 0);
        },
        _sendRequest: function (b) {
          function c() {
            e(), k[b] = null, f.onDeckRequestArgs && (f._get.apply(f, f.onDeckRequestArgs), f.onDeckRequestArgs = null);
          }
          var f = this, g = k[b];
          return g || (d(), g = k[b] = a.ajax(b, this.ajaxSettings).always(c)), g;
        },
        get: function (a, b) {
          var d, e, f = this, g = encodeURIComponent(a || '');
          return b = b || c.noop, d = this.replace ? this.replace(this.url, g) : this.url.replace(this.wildcard, g), (e = i.get(d)) ? c.defer(function () {
            b(f.filter ? f.filter(e) : e);
          }) : this._get(d, b), !!e;
        }
      }), b;
    }(), i = function () {
      function d(b) {
        c.bindAll(this), c.isString(b.template) && !b.engine && a.error('no template engine specified'), b.local || b.prefetch || b.remote || a.error('one of local, prefetch, or remote is required'), this.name = b.name || c.getUniqueId(), this.limit = b.limit || 5, this.minLength = b.minLength || 1, this.header = b.header, this.footer = b.footer, this.valueKey = b.valueKey || 'value', this.template = e(b.template, b.engine, this.valueKey), this.local = b.local, this.prefetch = b.prefetch, this.remote = b.remote, this.itemHash = {}, this.adjacencyList = {}, this.storage = b.name ? new f(b.name) : null;
      }
      function e(a, b, d) {
        var e, f;
        return c.isFunction(a) ? e = a : c.isString(a) ? (f = b.compile(a), e = c.bind(f.render, f)) : e = function (a) {
          return '<p>' + a[d] + '</p>';
        }, e;
      }
      var g = {
          thumbprint: 'thumbprint',
          protocol: 'protocol',
          itemHash: 'itemHash',
          adjacencyList: 'adjacencyList'
        };
      return c.mixin(d.prototype, {
        _processLocalData: function (a) {
          this._mergeProcessedData(this._processData(a));
        },
        _loadPrefetchData: function (d) {
          function e(a) {
            var b = d.filter ? d.filter(a) : a, e = m._processData(b), f = e.itemHash, h = e.adjacencyList;
            m.storage && (m.storage.set(g.itemHash, f, d.ttl), m.storage.set(g.adjacencyList, h, d.ttl), m.storage.set(g.thumbprint, n, d.ttl), m.storage.set(g.protocol, c.getProtocol(), d.ttl)), m._mergeProcessedData(e);
          }
          var f, h, i, j, k, l, m = this, n = b + (d.thumbprint || '');
          return this.storage && (f = this.storage.get(g.thumbprint), h = this.storage.get(g.protocol), i = this.storage.get(g.itemHash), j = this.storage.get(g.adjacencyList)), k = f !== n || h !== c.getProtocol(), d = c.isString(d) ? { url: d } : d, d.ttl = c.isNumber(d.ttl) ? d.ttl : 86400000, i && j && !k ? (this._mergeProcessedData({
            itemHash: i,
            adjacencyList: j
          }), l = a.Deferred().resolve()) : l = a.getJSON(d.url).done(e), l;
        },
        _transformDatum: function (a) {
          var b = c.isString(a) ? a : a[this.valueKey], d = a.tokens || c.tokenizeText(b), e = {
              value: b,
              tokens: d
            };
          return c.isString(a) ? (e.datum = {}, e.datum[this.valueKey] = a) : e.datum = a, e.tokens = c.filter(e.tokens, function (a) {
            return !c.isBlankString(a);
          }), e.tokens = c.map(e.tokens, function (a) {
            return a.toLowerCase();
          }), e;
        },
        _processData: function (a) {
          var b = this, d = {}, e = {};
          return c.each(a, function (a, f) {
            var g = b._transformDatum(f), h = c.getUniqueId(g.value);
            d[h] = g, c.each(g.tokens, function (a, b) {
              var d = b.charAt(0), f = e[d] || (e[d] = [h]);
              !~c.indexOf(f, h) && f.push(h);
            });
          }), {
            itemHash: d,
            adjacencyList: e
          };
        },
        _mergeProcessedData: function (a) {
          var b = this;
          c.mixin(this.itemHash, a.itemHash), c.each(a.adjacencyList, function (a, c) {
            var d = b.adjacencyList[a];
            b.adjacencyList[a] = d ? d.concat(c) : c;
          });
        },
        _getLocalSuggestions: function (a) {
          var b, d = this, e = [], f = [], g = [];
          return c.each(a, function (a, b) {
            var d = b.charAt(0);
            !~c.indexOf(e, d) && e.push(d);
          }), c.each(e, function (a, c) {
            var e = d.adjacencyList[c];
            return e ? (f.push(e), (!b || e.length < b.length) && (b = e), void 0) : !1;
          }), f.length < e.length ? [] : (c.each(b, function (b, e) {
            var h, i, j = d.itemHash[e];
            h = c.every(f, function (a) {
              return ~c.indexOf(a, e);
            }), i = h && c.every(a, function (a) {
              return c.some(j.tokens, function (b) {
                return 0 === b.indexOf(a);
              });
            }), i && g.push(j);
          }), g);
        },
        initialize: function () {
          var b;
          return this.local && this._processLocalData(this.local), this.transport = this.remote ? new h(this.remote) : null, b = this.prefetch ? this._loadPrefetchData(this.prefetch) : a.Deferred().resolve(), this.local = this.prefetch = this.remote = null, this.initialize = function () {
            return b;
          }, b;
        },
        getSuggestions: function (a, b) {
          function d(a) {
            f = f.slice(0), c.each(a, function (a, b) {
              var d, e = g._transformDatum(b);
              return d = c.some(f, function (a) {
                return e.value === a.value;
              }), !d && f.push(e), f.length < g.limit;
            }), b && b(f);
          }
          var e, f, g = this, h = !1;
          a.length < this.minLength || (e = c.tokenizeQuery(a), f = this._getLocalSuggestions(e).slice(0, this.limit), f.length < this.limit && this.transport && (h = this.transport.get(a, d)), !h && b && b(f));
        }
      }), d;
    }(), j = function () {
      function b(b) {
        var d = this;
        c.bindAll(this), this.specialKeyCodeMap = {
          9: 'tab',
          27: 'esc',
          37: 'left',
          39: 'right',
          13: 'enter',
          38: 'up',
          40: 'down'
        }, this.$hint = a(b.hint), this.$input = a(b.input).on('blur.tt', this._handleBlur).on('focus.tt', this._handleFocus).on('keydown.tt', this._handleSpecialKeyEvent), c.isMsie() ? this.$input.on('keydown.tt keypress.tt cut.tt paste.tt', function (a) {
          d.specialKeyCodeMap[a.which || a.keyCode] || c.defer(d._compareQueryToInputValue);
        }) : this.$input.on('input.tt', this._compareQueryToInputValue), this.query = this.$input.val(), this.$overflowHelper = e(this.$input);
      }
      function e(b) {
        return a('<span></span>').css({
          position: 'absolute',
          left: '-9999px',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontFamily: b.css('font-family'),
          fontSize: b.css('font-size'),
          fontStyle: b.css('font-style'),
          fontVariant: b.css('font-variant'),
          fontWeight: b.css('font-weight'),
          wordSpacing: b.css('word-spacing'),
          letterSpacing: b.css('letter-spacing'),
          textIndent: b.css('text-indent'),
          textRendering: b.css('text-rendering'),
          textTransform: b.css('text-transform')
        }).insertAfter(b);
      }
      function f(a, b) {
        return a = (a || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' '), b = (b || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' '), a === b;
      }
      return c.mixin(b.prototype, d, {
        _handleFocus: function () {
          this.trigger('focused');
        },
        _handleBlur: function () {
          this.trigger('blured');
        },
        _handleSpecialKeyEvent: function (a) {
          var b = this.specialKeyCodeMap[a.which || a.keyCode];
          b && this.trigger(b + 'Keyed', a);
        },
        _compareQueryToInputValue: function () {
          var a = this.getInputValue(), b = f(this.query, a), c = b ? this.query.length !== a.length : !1;
          c ? this.trigger('whitespaceChanged', { value: this.query }) : b || this.trigger('queryChanged', { value: this.query = a });
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
        setQuery: function (a) {
          this.query = a;
        },
        getInputValue: function () {
          return this.$input.val();
        },
        setInputValue: function (a, b) {
          this.$input.val(a), !b && this._compareQueryToInputValue();
        },
        getHintValue: function () {
          return this.$hint.val();
        },
        setHintValue: function (a) {
          this.$hint.val(a);
        },
        getLanguageDirection: function () {
          return (this.$input.css('direction') || 'ltr').toLowerCase();
        },
        isOverflow: function () {
          return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() > this.$input.width();
        },
        isCursorAtEnd: function () {
          var a, b = this.$input.val().length, d = this.$input[0].selectionStart;
          return c.isNumber(d) ? d === b : document.selection ? (a = document.selection.createRange(), a.moveStart('character', -b), b === a.text.length) : !0;
        }
      }), b;
    }(), k = function () {
      function b(b) {
        c.bindAll(this), this.isOpen = !1, this.isEmpty = !0, this.isMouseOverDropdown = !1, this.$menu = a(b.menu).on('mouseenter.tt', this._handleMouseenter).on('mouseleave.tt', this._handleMouseleave).on('click.tt', '.tt-suggestion', this._handleSelection).on('mouseover.tt', '.tt-suggestion', this._handleMouseover);
      }
      function e(a) {
        return a.data('suggestion');
      }
      var f = { suggestionsList: '<span class="tt-suggestions"></span>' }, g = {
          suggestionsList: { display: 'block' },
          suggestion: {
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          },
          suggestionChild: { whiteSpace: 'normal' }
        };
      return c.mixin(b.prototype, d, {
        _handleMouseenter: function () {
          this.isMouseOverDropdown = !0;
        },
        _handleMouseleave: function () {
          this.isMouseOverDropdown = !1;
        },
        _handleMouseover: function (b) {
          var c = a(b.currentTarget);
          this._getSuggestions().removeClass('tt-is-under-cursor'), c.addClass('tt-is-under-cursor');
        },
        _handleSelection: function (b) {
          var c = a(b.currentTarget);
          this.trigger('suggestionSelected', e(c));
        },
        _show: function () {
          this.$menu.css('display', 'block');
        },
        _hide: function () {
          this.$menu.hide();
        },
        _moveCursor: function (a) {
          var b, c, d, f;
          if (this.isVisible()) {
            if (b = this._getSuggestions(), c = b.filter('.tt-is-under-cursor'), c.removeClass('tt-is-under-cursor'), d = b.index(c) + a, d = (d + 1) % (b.length + 1) - 1, -1 === d)
              return this.trigger('cursorRemoved'), void 0;
            -1 > d && (d = b.length - 1), f = b.eq(d).addClass('tt-is-under-cursor'), this.trigger('cursorMoved', e(f));
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
        setLanguageDirection: function (a) {
          var b = {
              left: '0',
              right: 'auto'
            }, c = {
              left: 'auto',
              right: ' 0'
            };
          'ltr' === a ? this.$menu.css(b) : this.$menu.css(c);
        },
        moveCursorUp: function () {
          this._moveCursor(-1);
        },
        moveCursorDown: function () {
          this._moveCursor(1);
        },
        getSuggestionUnderCursor: function () {
          var a = this._getSuggestions().filter('.tt-is-under-cursor').first();
          return a.length > 0 ? e(a) : null;
        },
        getFirstSuggestion: function () {
          var a = this._getSuggestions().first();
          return a.length > 0 ? e(a) : null;
        },
        renderSuggestions: function (b, d) {
          var e, h, i, j, k, l = 'tt-dataset-' + b.name, m = '<div class="tt-suggestion">%body</div>', n = this.$menu.find('.' + l);
          0 === n.length && (h = a(f.suggestionsList).css(g.suggestionsList), n = a('<div></div>').addClass(l).append(b.header).append(h).append(b.footer).appendTo(this.$menu)), d.length > 0 ? (this.isEmpty = !1, this.isOpen && this._show(), i = document.createElement('div'), j = document.createDocumentFragment(), c.each(d, function (c, d) {
            e = b.template(d.datum), i.innerHTML = m.replace('%body', e), k = a(i.firstChild).css(g.suggestion).data('suggestion', d), k.children().each(function () {
              a(this).css(g.suggestionChild);
            }), j.appendChild(k[0]);
          }), n.show().find('.tt-suggestions').html(j)) : this.clearSuggestions(b.name), this.trigger('suggestionsRendered');
        },
        clearSuggestions: function (a) {
          var b = a ? this.$menu.find('.tt-dataset-' + a) : this.$menu.find('[class^="tt-dataset-"]'), c = b.find('.tt-suggestions');
          b.hide(), c.empty(), 0 === this._getSuggestions().length && (this.isEmpty = !0, this._hide());
        }
      }), b;
    }(), l = function () {
      function b(a) {
        var b, d, f;
        c.bindAll(this), this.$node = e(a.input), this.datasets = a.datasets, this.dir = null, this.eventBus = a.eventBus, b = this.$node.find('.tt-dropdown-menu'), d = this.$node.find('.tt-query'), f = this.$node.find('.tt-hint'), this.dropdownView = new k({ menu: b }).on('suggestionSelected', this._handleSelection).on('cursorMoved', this._clearHint).on('cursorMoved', this._setInputValueToSuggestionUnderCursor).on('cursorRemoved', this._setInputValueToQuery).on('cursorRemoved', this._updateHint).on('suggestionsRendered', this._updateHint).on('opened', this._updateHint).on('closed', this._clearHint).on('opened closed', this._propagateEvent), this.inputView = new j({
          input: d,
          hint: f
        }).on('focused', this._openDropdown).on('blured', this._closeDropdown).on('blured', this._setInputValueToQuery).on('enterKeyed', this._handleSelection).on('queryChanged', this._clearHint).on('queryChanged', this._clearSuggestions).on('queryChanged', this._getSuggestions).on('whitespaceChanged', this._updateHint).on('queryChanged whitespaceChanged', this._openDropdown).on('queryChanged whitespaceChanged', this._setLanguageDirection).on('escKeyed', this._closeDropdown).on('escKeyed', this._setInputValueToQuery).on('tabKeyed upKeyed downKeyed', this._managePreventDefault).on('upKeyed downKeyed', this._moveDropdownCursor).on('upKeyed downKeyed', this._openDropdown).on('tabKeyed leftKeyed rightKeyed', this._autocomplete);
      }
      function e(b) {
        var c = a(g.wrapper), d = a(g.dropdown), e = a(b), f = a(g.hint);
        c = c.css(h.wrapper), d = d.css(h.dropdown), f.css(h.hint).css({
          backgroundAttachment: e.css('background-attachment'),
          backgroundClip: e.css('background-clip'),
          backgroundColor: e.css('background-color'),
          backgroundImage: e.css('background-image'),
          backgroundOrigin: e.css('background-origin'),
          backgroundPosition: e.css('background-position'),
          backgroundRepeat: e.css('background-repeat'),
          backgroundSize: e.css('background-size')
        }), e.data('ttAttrs', {
          dir: e.attr('dir'),
          autocomplete: e.attr('autocomplete'),
          spellcheck: e.attr('spellcheck'),
          style: e.attr('style')
        }), e.addClass('tt-query').attr({
          autocomplete: 'off',
          spellcheck: !1
        }).css(h.query);
        try {
          !e.attr('dir') && e.attr('dir', 'auto');
        } catch (i) {
        }
        return e.wrap(c).parent().prepend(f).append(d);
      }
      function f(a) {
        var b = a.find('.tt-query');
        c.each(b.data('ttAttrs'), function (a, d) {
          c.isUndefined(d) ? b.removeAttr(a) : b.attr(a, d);
        }), b.detach().removeData('ttAttrs').removeClass('tt-query').insertAfter(a), a.remove();
      }
      var g = {
          wrapper: '<span class="twitter-typeahead"></span>',
          hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
          dropdown: '<span class="tt-dropdown-menu"></span>'
        }, h = {
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
      return c.isMsie() && c.mixin(h.query, { backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)' }), c.isMsie() && 7 >= c.isMsie() && (c.mixin(h.wrapper, {
        display: 'inline',
        zoom: '1'
      }), c.mixin(h.query, { marginTop: '-1px' })), c.mixin(b.prototype, d, {
        _managePreventDefault: function (a) {
          var b, c, d = a.data, e = !1;
          switch (a.type) {
          case 'tabKeyed':
            b = this.inputView.getHintValue(), c = this.inputView.getInputValue(), e = b && b !== c;
            break;
          case 'upKeyed':
          case 'downKeyed':
            e = !d.shiftKey && !d.ctrlKey && !d.metaKey;
          }
          e && d.preventDefault();
        },
        _setLanguageDirection: function () {
          var a = this.inputView.getLanguageDirection();
          a !== this.dir && (this.dir = a, this.$node.css('direction', a), this.dropdownView.setLanguageDirection(a));
        },
        _updateHint: function () {
          var a, b, d, e, f, g = this.dropdownView.getFirstSuggestion(), h = g ? g.value : null, i = this.dropdownView.isVisible(), j = this.inputView.isOverflow();
          h && i && !j && (a = this.inputView.getInputValue(), b = a.replace(/\s{2,}/g, ' ').replace(/^\s+/g, ''), d = c.escapeRegExChars(b), e = RegExp('^(?:' + d + ')(.*$)', 'i'), f = e.exec(h), this.inputView.setHintValue(a + (f ? f[1] : '')));
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
        _setInputValueToSuggestionUnderCursor: function (a) {
          var b = a.data;
          this.inputView.setInputValue(b.value, !0);
        },
        _openDropdown: function () {
          this.dropdownView.open();
        },
        _closeDropdown: function (a) {
          this.dropdownView['blured' === a.type ? 'closeUnlessMouseIsOverDropdown' : 'close']();
        },
        _moveDropdownCursor: function (a) {
          var b = a.data;
          b.shiftKey || b.ctrlKey || b.metaKey || this.dropdownView['upKeyed' === a.type ? 'moveCursorUp' : 'moveCursorDown']();
        },
        _handleSelection: function (a) {
          var b = 'suggestionSelected' === a.type, d = b ? a.data : this.dropdownView.getSuggestionUnderCursor();
          d && (this.inputView.setInputValue(d.value), b ? this.inputView.focus() : a.data.preventDefault(), b && c.isMsie() ? c.defer(this.dropdownView.close) : this.dropdownView.close(), this.eventBus.trigger('selected', d.datum));
        },
        _getSuggestions: function () {
          var a = this, b = this.inputView.getQuery();
          c.isBlankString(b) || c.each(this.datasets, function (c, d) {
            d.getSuggestions(b, function (c) {
              b === a.inputView.getQuery() && a.dropdownView.renderSuggestions(d, c);
            });
          });
        },
        _autocomplete: function (a) {
          var b, c, d, e, f;
          ('rightKeyed' !== a.type && 'leftKeyed' !== a.type || (b = this.inputView.isCursorAtEnd(), c = 'ltr' === this.inputView.getLanguageDirection() ? 'leftKeyed' === a.type : 'rightKeyed' === a.type, b && !c)) && (d = this.inputView.getQuery(), e = this.inputView.getHintValue(), '' !== e && d !== e && (f = this.dropdownView.getFirstSuggestion(), this.inputView.setInputValue(f.value), this.eventBus.trigger('autocompleted', f.datum)));
        },
        _propagateEvent: function (a) {
          this.eventBus.trigger(a.type);
        },
        destroy: function () {
          this.inputView.destroy(), this.dropdownView.destroy(), f(this.$node), this.$node = null;
        },
        setQuery: function (a) {
          this.inputView.setQuery(a), this.inputView.setInputValue(a), this._clearHint(), this._clearSuggestions(), this._getSuggestions();
        }
      }), b;
    }();
  !function () {
    var b, d = {}, f = 'ttView';
    b = {
      initialize: function (b) {
        function g() {
          var b, d = a(this), g = new e({ el: d });
          b = c.map(h, function (a) {
            return a.initialize();
          }), d.data(f, new l({
            input: d,
            eventBus: g = new e({ el: d }),
            datasets: h
          })), a.when.apply(a, b).always(function () {
            c.defer(function () {
              g.trigger('initialized');
            });
          });
        }
        var h;
        return b = c.isArray(b) ? b : [b], 0 === b.length && a.error('no datasets provided'), h = c.map(b, function (a) {
          var b = d[a.name] ? d[a.name] : new i(a);
          return a.name && (d[a.name] = b), b;
        }), this.each(g);
      },
      destroy: function () {
        function b() {
          var b = a(this), c = b.data(f);
          c && (c.destroy(), b.removeData(f));
        }
        return this.each(b);
      },
      setQuery: function (b) {
        function c() {
          var c = a(this).data(f);
          c && c.setQuery(b);
        }
        return this.each(c);
      }
    }, jQuery.fn.typeahead = function (a) {
      return b[a] ? b[a].apply(this, [].slice.call(arguments, 1)) : b.initialize.apply(this, arguments);
    };
  }();
}(window.jQuery), function (a) {
  function b(a, b, c) {
    var k, l, m, u, v, w, x, y = b.version, z = b.errorCorrection, A = new Array(8 * o[o.length - 1][n.TOTAL_BYTES]), B = 0;
    switch (b.encodeMode) {
    case b.ENCODE_MODE.NUMERIC:
      var C = 0;
      for (k = 0; k < a.length; k++) {
        if (!(a[k] >= 48 && a[k] <= 57))
          throw new TypeError('Invalid data format.');
        C = 10 * C + (a[k] - 48), 2 === k % 3 && (B = h(A, B, e(C, 10)), C = 0);
      }
      switch (k % 3) {
      case 1:
        B = h(A, B, e(C, 4));
        break;
      case 2:
        B = h(A, B, e(C, 7));
      }
      if (y > 0)
        y >= 1 && 9 >= y ? w = 10 : y >= 10 && 26 >= y ? w = 12 : y >= 27 && 40 >= y && (w = 14);
      else {
        if (x = d(B + 4 + 10, z), !(x > 0))
          throw new RangeError('Too much data.');
        if (x < Math.abs(y) && (x = Math.abs(y)), x >= 1 && 9 >= x)
          w = 10;
        else {
          if (x = d(B + 4 + 12, z), !(x > 0))
            throw new RangeError('Too much data.');
          if (x < Math.abs(y) && (x = Math.abs(y)), x >= 10 && 26 >= x)
            w = 12;
          else {
            if (x = d(B + 4 + 14, z), !(x > 0))
              throw new RangeError('Too much data.');
            if (x < Math.abs(y) && (x = Math.abs(y)), !(x >= 27 && 40 >= x))
              throw new RangeError('Bug in version detection.');
            w = 14;
          }
        }
        y = x;
      }
      break;
    case b.ENCODE_MODE.ALPHA_NUMERIC:
      var D, E, F = [
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
      for (k = 0; k < a.length - 1; k += 2) {
        if (D = j(96 === (96 & a[k]) ? 95 & a[k] : a[k], F), E = j(96 === (96 & a[k + 1]) ? 95 & a[k + 1] : a[k + 1], F), -1 === D || -1 === E)
          throw new Error('Character not supported in ALPHA_NUMERIC encoding mode.');
        B = h(A, B, e(45 * D + E, 11));
      }
      if (k === a.length - 1) {
        if (D = j(96 === (96 & a[k]) ? 95 & a[k] : a[k], F), -1 === D)
          throw new Error('Character not supported in ALPHA_NUMERIC encoding mode.');
        B = h(A, B, e(D, 6));
      }
      if (y > 0)
        y >= 1 && 9 >= y ? w = 9 : y >= 10 && 26 >= y ? w = 11 : y >= 27 && 40 >= y && (w = 13);
      else {
        if (x = d(B + 4 + 9, z), !(x > 0))
          throw new RangeError('Too much data.');
        if (x < Math.abs(y) && (x = Math.abs(y)), x >= 1 && 9 >= x)
          w = 9;
        else {
          if (x = d(B + 4 + 11, z), !(x > 0))
            throw new RangeError('Too much data.');
          if (x < Math.abs(y) && (x = Math.abs(y)), x >= 10 && 26 >= x)
            w = 11;
          else {
            if (x = d(B + 4 + 13, z), !(x > 0))
              throw new RangeError('Too much data.');
            if (x < Math.abs(y) && (x = Math.abs(y)), !(x >= 27 && 40 >= x))
              throw new RangeError('Bug in version detection.');
            w = 13;
          }
        }
        y = x;
      }
      break;
    case b.ENCODE_MODE.BYTE:
    case b.ENCODE_MODE.UTF8:
    case b.ENCODE_MODE.UTF8_SIGNATURE:
      for (k = 0; k < a.length; k++)
        B = h(A, B, e(a[k], 8));
      if (y > 0)
        y >= 0 && 9 >= y ? w = 8 : y >= 10 && 40 >= y && (w = 16);
      else {
        if (x = d(B + 4 + 8, z), !(x > 0))
          throw new RangeError('Too much data.');
        if (x < Math.abs(y) && (x = Math.abs(y)), x >= 1 && 9 >= x)
          w = 8;
        else {
          if (x = d(B + 4 + 16, z), !(x > 0))
            throw new RangeError('Too much data.');
          if (x < Math.abs(y) && (x = Math.abs(y)), !(x >= 10 && 40 >= x))
            throw new RangeError('Bug in version detection.');
          w = 16;
        }
        y = x;
      }
      break;
    case b.ENCODE_MODE.KANJI:
      throw new Error('Encoding mode "KANJI" not supported yet.');
    default:
      throw new Error('Unsupported encoding mode.');
    }
    if (c)
      return y;
    A = e(15 & b.encodeMode, 4).concat(e(a.length, w)).concat(A), B += 4 + w;
    var G = o[y][n.TOTAL_BYTES] - o[y][n.ECC_BYTES][z] << 3;
    if (B > G)
      throw new RangeError('Too much data for the selected version.');
    var H = G - B;
    for (H > 4 && (H = 4), B = h(A, B, g(H, 0)), B = h(A, B, g((8 - B % 8) % 8, 0)), k = 0, v = G - B >>> 3; v > k; k++)
      B = h(A, B, 1 & k ? [
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
    var I = Math.floor((o[y][n.TOTAL_BYTES] - o[y][n.ECC_BYTES][z]) / (o[y][n.EC_BLOCKS][z][0] + o[y][n.EC_BLOCKS][z][1])), J = Math.floor(o[y][n.ECC_BYTES][z] / (o[y][n.EC_BLOCKS][z][0] + o[y][n.EC_BLOCKS][z][1])), K = [], L = [];
    for (k = 0, v = o[y][n.EC_BLOCKS][z][0]; v > k; k++) {
      for (L = [], l = 0; I > l; l++)
        L.push(f(A.splice(0, 8)));
      K.push(L);
    }
    for (k = 0, v = o[y][n.EC_BLOCKS][z][1]; v > k; k++) {
      for (L = [], l = 0; I >= l; l++)
        L.push(f(A.splice(0, 8)));
      K.push(L);
    }
    var M = [], N = [];
    for (l = 1, k = 0; 255 > k; k++)
      M.push(l), N[l] = k, l <<= 1, l > 255 && (l = 285 ^ l);
    var O = [1];
    for (k = 0, v = J; v > k; k++) {
      for (O[k + 1] = 1, l = k; l > 0; l--)
        O[l] = O[l] > 0 ? O[l - 1] ^ M[(N[O[l]] + k) % 255] : O[l - 1];
      O[0] = M[(N[O[0]] + k) % 255];
    }
    var P = [];
    for (k = O.length - 1; k >= 0; k--)
      P.push(O[k]);
    var Q = [];
    for (l = 0; l < K.length; l++) {
      Q[l] = [].concat(K[l]).concat(g(J, 0));
      for (var R; Q[l].length >= P.length;) {
        for (R = Q[l][0], k = 0; k < P.length; k++)
          Q[l][k] ^= M[(N[P[k]] + N[R]) % 255];
        if (0 !== Q[l].shift())
          throw new Error('Bug while generating the ECC');
      }
    }
    for (A = new Array(8 * o[o.length - 1][n.TOTAL_BYTES]), B = 0, k = 0; I >= k; k++)
      for (l = 0; l < K.length; l++)
        k < K[l].length && (B = h(A, B, e(K[l][k], 8)));
    for (k = 0; J > k; k++)
      for (l = 0; l < Q.length; l++)
        k < Q[l].length && (B = h(A, B, e(Q[l][k], 8)));
    var S = 17 + (y << 2), T = new Array(S);
    for (k = 0; S > k; k++)
      T[k] = g(S, 0);
    for (i(T, 0, 0, q, t.FINDER), i(T, 0, S - 7, q, t.FINDER), i(T, S - 7, 0, q, t.FINDER), k = 0; 8 > k; k++)
      T[k][7] = t.SEPARATOR, T[7][k] = t.SEPARATOR, T[k][S - 8] = t.SEPARATOR, T[7][S - 1 - k] = t.SEPARATOR, T[S - 1 - k][7] = t.SEPARATOR, T[S - 8][k] = t.SEPARATOR;
    for (k = 8; S - 8 > k; k++)
      T[k][6] = t.TIMING | (k + 1) % 2, T[6][k] = t.TIMING | (k + 1) % 2;
    if (y > 1) {
      var U = o[y][n.ALIGNMENT_PATTERN_POSITION_OFFSET], V = 4 * y + 10;
      for (u = V;;) {
        for (m = V; 6 === m && 6 === u || 6 === m && u === S - 7 || m === S - 7 && 6 === u || i(T, m - 2, u - 2, r, t.ALIGNMENT), 6 !== m;)
          m -= U, 18 > m && (m = 6);
        if (6 === u)
          break;
        u -= U, 18 > u && (u = 6);
      }
    }
    if (y >= 7) {
      var W = o[y][n.VERSION_PATTERN];
      for (k = 0; 6 > k; k++)
        for (l = 0; 3 > l; l++)
          T[S - 11 + l][k] = t.VERSION | 1 & W, T[k][S - 11 + l] = t.VERSION | 1 & W, W >>= 1;
    }
    for (k = 0; 8 > k; k++)
      T[S - 1 - k][8] = 0 | t.FORMAT, T[8][S - 1 - k] = 0 | t.FORMAT, 6 !== k && (T[8][k] = 0 | t.FORMAT, T[k][8] = 0 | t.FORMAT);
    T[8][8] = 0 | t.FORMAT, T[S - 8][8] = 1 | t.FORMAT;
    var X = -1;
    for (m = u = S - 1, k = 0; B > k; k++) {
      T[u][m] = t.DATA | A[k];
      do
        if (m > 6 && 0 === (1 & m) || 6 > m && 1 === (1 & m))
          m--;
        else if (-1 === X && 0 === u || 1 === X && u === S - 1) {
          if (0 === m) {
            if (B - 1 > k)
              throw new RangeError('Too much data while writing the symbol.');
            break;
          }
          X = -X, m--, 6 === m && m--;
        } else
          u += X, m++;
      while (0 !== T[u][m]);
    }
    var Y, Z = [];
    for (k = 0; k < s.length; k++) {
      for (Z[k] = [], u = 0; S > u; u++)
        for (Z[k][u] = [], m = 0; S > m; m++)
          Z[k][u][m] = T[u][m] & t.DATA ? 1 & (T[u][m] ^ s[k](m, u)) : 1 & T[u][m];
      Y = e(p[z][k], 15), Z[k][S - 1][8] = Z[k][8][0] = Y[0], Z[k][S - 2][8] = Z[k][8][1] = Y[1], Z[k][S - 3][8] = Z[k][8][2] = Y[2], Z[k][S - 4][8] = Z[k][8][3] = Y[3], Z[k][S - 5][8] = Z[k][8][4] = Y[4], Z[k][S - 6][8] = Z[k][8][5] = Y[5], Z[k][S - 7][8] = Z[k][8][7] = Y[6], Z[k][8][S - 8] = Z[k][8][8] = Y[7], Z[k][8][S - 7] = Z[k][7][8] = Y[8], Z[k][8][S - 6] = Z[k][5][8] = Y[9], Z[k][8][S - 5] = Z[k][4][8] = Y[10], Z[k][8][S - 4] = Z[k][3][8] = Y[11], Z[k][8][S - 3] = Z[k][2][8] = Y[12], Z[k][8][S - 2] = Z[k][1][8] = Y[13], Z[k][8][S - 1] = Z[k][0][8] = Y[14];
    }
    var $, _, ab, bb, cb, db = 0, eb = 4294967295;
    for (k = 0; k < s.length; k++) {
      for ($ = _ = ab = bb = cb = 0, u = 0; S > u; u++)
        for (m = 0; S > m; m++)
          m >= 6 && (1 === (Z[k][u][m - 6] & Z[k][u][m - 5] & Z[k][u][m - 4] & Z[k][u][m - 3] & Z[k][u][m - 2] & Z[k][u][m - 1] & Z[k][u][m]) || 0 === (Z[k][u][m - 6] | Z[k][u][m - 5] | Z[k][u][m - 4] | Z[k][u][m - 3] | Z[k][u][m - 2] | Z[k][u][m - 1] | Z[k][u][m])) && $++, u >= 6 && (1 === (Z[k][u - 6][m] & Z[k][u - 5][m] & Z[k][u - 4][m] & Z[k][u - 3][m] & Z[k][u - 2][m] & Z[k][u - 1][m] & Z[k][u][m]) || 0 === (Z[k][u - 6][m] | Z[k][u - 5][m] | Z[k][u - 4][m] | Z[k][u - 3][m] | Z[k][u - 2][m] | Z[k][u - 1][m] | Z[k][u][m])) && $++, m > 0 && u > 0 && (1 === (Z[k][u][m] & Z[k][u][m - 1] & Z[k][u - 1][m] & Z[k][u - 1][m - 1]) || 0 === (Z[k][u][m] | Z[k][u][m - 1] | Z[k][u - 1][m] | Z[k][u - 1][m - 1])) && _++, m >= 6 && 1 === Z[k][u][m - 6] && 0 === Z[k][u][m - 5] && 1 === Z[k][u][m - 4] && 1 === Z[k][u][m - 3] && 1 === Z[k][u][m - 2] && 0 === Z[k][u][m - 1] && 1 === Z[k][u][m] && ab++, u >= 6 && 1 === Z[k][u - 6][m] && 0 === Z[k][u - 5][m] && 1 === Z[k][u - 4][m] && 1 === Z[k][u - 3][m] && 1 === Z[k][u - 2][m] && 0 === Z[k][u - 1][m] && 1 === Z[k][u][m] && ab++, bb += Z[k][u][m];
      bb = Math.abs(100 * bb / (S * S) - 50) / 5, cb = 3 * $ + 3 * _ + 40 * ab + 10 * bb, eb > cb && (eb = cb, db = k);
    }
    for (u = 0; S > u; u++)
      for (m = 0; S > m; m++)
        T[u][m] = T[u][m] & (t.DATA | t.FORMAT) ? Z[db][u][m] : 1 & T[u][m];
    return T;
  }
  function c(b, c) {
    var d, e, f, g, h;
    switch (typeof b) {
    case 'string':
      d = b;
      break;
    case 'number':
      d = b.toString();
      break;
    case 'object':
      if (b.constructor === a[m].prototype.Input)
        d = b.toString();
      else {
        if ((Array.isArray || function (a) {
            return '[object Array]' === Object.prototype.toString.call(a);
          })(b))
          return b;
        d = new a[m].prototype.Input(b.dataType, b.data).toString();
      }
      break;
    default:
      throw new TypeError('Unsupported input parameter.');
    }
    if (e = c.encodeMode === c.ENCODE_MODE.UTF8_SIGNATURE ? [
        239,
        187,
        191
      ] : [], c.encodeMode === c.ENCODE_MODE.UTF8_SIGNATURE || c.encodeMode === c.ENCODE_MODE.UTF8)
      for (f = 0, h = d.length; h > f; f++)
        g = d.charCodeAt(f), 128 > g ? e.push(g) : g > 127 && 2048 > g ? e.push(192 | g >> 6, 128 | 63 & g) : e.push(224 | g >> 12, 128 | 63 & g >> 6, 128 | 63 & g);
    else
      for (f = 0, h = d.length; h > f; f++)
        e.push(d.charCodeAt(f));
    return e;
  }
  function d(a, b) {
    for (var c = 1; c < o.length; c++)
      if (a <= o[c][n.TOTAL_BYTES] - o[c][n.ECC_BYTES][b] << 3)
        return c;
    return 0;
  }
  function e(a, b) {
    var c = new Array(b);
    if ('number' == typeof a && b > 0 && 32 >= b) {
      for (var d = b - 1; d >= 0; d--)
        c[d] = 1 & a, a >>= 1;
      return c;
    }
    throw new Error('Invalid parameters in toBits().');
  }
  function f(a, b) {
    return b = b || 0, ((a[b] || 0) << 7) + ((a[b + 1] || 0) << 6) + ((a[b + 2] || 0) << 5) + ((a[b + 3] || 0) << 4) + ((a[b + 4] || 0) << 3) + ((a[b + 5] || 0) << 2) + ((a[b + 6] || 0) << 1) + (a[b + 7] || 0);
  }
  function g(a, b) {
    for (var c = new Array(a), d = 0; a > d; d++)
      c[d] = b;
    return c;
  }
  function h(a, b, c) {
    for (var d = 0; d < c.length; d++)
      a[b + d] = c[d];
    return b + c.length;
  }
  function i(a, b, c, d, e) {
    var f, g, h, i;
    for (h = 0, i = d.length; i > h; h++)
      for (f = 0, g = d[h].length; g > f; f++)
        a[c + h][b + f] = d[h][f] ^ e;
  }
  function j(a, b) {
    if ('function' == typeof b.indexOf)
      return b.indexOf(a);
    for (var c = 0; c < b.length; c++)
      if (b[c] === a)
        return c;
    return -1;
  }
  function k(a, b) {
    for (var c in a)
      if (a[c] === b)
        return !0;
    return !1;
  }
  function l(a) {
    if ('object' != typeof a)
      return a;
    var b = {};
    for (var c in a)
      b[c] = 'object' == typeof a[c] ? l(a[c]) : a[c];
    return b;
  }
  var m = 'JSQR';
  a[m] = function () {
  }, a[m].prototype.encode = function (b, c) {
    return new a[m].prototype.Matrix(b, c);
  }, a[m].prototype.Input = function (a, b) {
    if ('undefined' != typeof a) {
      if (!k(this.DATA_TYPE, a))
        throw new TypeError('Unsupported dataType.');
    } else
      a = this.DATA_TYPE.DEFAULT;
    try {
      Object.defineProperty(this, 'dataType', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return a;
        },
        set: function (b) {
          if (!k(this.DATA_TYPE, b))
            throw new TypeError('Unsupported dataType.');
          a = b;
        }
      });
    } catch (c) {
      this.dataType = a;
    }
    this.data = 'object' == typeof b ? l(b) : b;
  }, a[m].prototype.Input.prototype.DATA_TYPE = {
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
  }, a[m].prototype.DATA_TYPE = a[m].prototype.Input.prototype.DATA_TYPE, a[m].prototype.Input.prototype.toString = function () {
    function a(a) {
      var b = i.data;
      if ('string' == typeof a) {
        var c, d = a.split('.');
        for (c = 0; c < d.length; c++)
          b = b[d[c]];
      }
      return b;
    }
    function b(b) {
      var c = a(b);
      return 'undefined' == typeof c ? '' : c.toString();
    }
    function c(a, b) {
      for (var c in b)
        a = a.replace(c, b[c], 'g');
      return a;
    }
    function d() {
      var a, b = arguments[0].split('.'), c = i;
      for (a = 0; a < b.length; a++)
        c = c[b[a]];
      for (a = 1; a < arguments.length; a++) {
        if ('object' == typeof c && 'function' == typeof arguments[a] && null !== c && c.constructor === arguments[a] || null === c && null === arguments[a] || typeof c === arguments[a])
          return !0;
        'function' == typeof arguments[a] && (arguments[a] = arguments[a].name);
      }
      throw 'undefined' == typeof c ? new TypeError(arguments[0] + ' is undefined.') : new TypeError('Unexcepted type (' + typeof c + ') of ' + arguments[0] + ' (' + [].slice.call(arguments, 1).join('|') + ').');
    }
    function e() {
      var a, b, c, d;
      for (c = 0; c < arguments.length; c++) {
        for (a = arguments[c].split('.'), b = i, d = 0; d < a.length; d++)
          b = b[a[d]];
        if ('string' == typeof b && 0 === b.length)
          throw new Error('Required: ' + arguments[c]);
      }
    }
    var f, g, h, i = this;
    switch (this.dataType) {
    case this.DATA_TYPE.DEFAULT:
    case this.DATA_TYPE.TEXT:
      return 'object' == typeof this.data ? (d('data.text', 'string', 'number'), e('data.text'), b('text')) : (d('data', 'string', 'number'), e('data'), b());
    case this.DATA_TYPE.URL:
      switch (typeof this.data) {
      case 'string':
        return e('data'), (/^[a-zA-Z]+:\/\//.test(b()) ? '' : 'http://') + b();
      case 'object':
        return d('data.url', 'string'), e('data.url'), (/^[a-zA-Z]+:\/\//.test(b('url')) ? '' : 'http://') + b('url');
      default:
        throw new TypeError('Unexcepted type of data.url (string).');
      }
    case this.DATA_TYPE.BOOKMARK:
      return d('data', 'object'), d('data.title', 'string', 'number'), d('data.url', 'string'), e('data.title', 'data.url'), 'MEBKM:TITLE:' + b('title') + ';URL:' + (/^[a-zA-Z]+:\/\//.test(b('url')) ? '' : 'http://') + b('url');
    case this.DATA_TYPE.CALL:
      switch (typeof this.data) {
      case 'string':
      case 'number':
        return e('data'), 'TEL:' + b();
      case 'object':
        switch (typeof this.data.phoneNumber) {
        case 'string':
        case 'number':
          return e('data.phoneNumber'), 'TEL:' + b('phoneNumber');
        default:
          throw new TypeError('Unexcepted type of data (string|number).');
        }
      default:
        throw new TypeError('Unexcepted type of data.phoneNumber (string|number).');
      }
    case this.DATA_TYPE.SMS:
      return d('data', 'object'), d('data.phoneNumber', 'string', 'number'), d('data.message', 'string', 'number'), e('data.phoneNumber'), 'SMSTO:' + b('phoneNumber') + ':' + b('message');
    case this.DATA_TYPE.EMAIL:
      return d('data', 'object'), d('data.recipient', 'string'), d('data.subject', 'string'), d('data.body', 'string'), e('data.recipient'), 'SMTP:' + b('recipient').replace(':', '') + ':' + b('subject').replace(/:/g, '\\:') + ':' + b('body');
    case this.DATA_TYPE.VCARD:
      switch (d('data', 'object'), d('data.version', 'string', 'number'), d('data.type', 'string'), d('data.firstName', 'string', 'number'), d('data.middleName', 'string', 'number'), d('data.lastName', 'string', 'number'), d('data.organization', 'string', 'number'), d('data.title', 'string', 'number'), d('data.mobilePhone', 'string', 'number'), d('data.work', 'object'), d('data.work.street', 'string', 'number'), d('data.work.city', 'string'), d('data.work.zip', 'string', 'number'), d('data.work.state', 'string'), d('data.work.country', 'string'), d('data.work.phone', 'string', 'number'), d('data.work.fax', 'string', 'number'), d('data.work.eMail', 'string'), d('data.work.url', 'string'), d('data.home', 'object'), d('data.home.street', 'string', 'number'), d('data.home.city', 'string', 'number'), d('data.home.zip', 'string', 'number'), d('data.home.state', 'string', 'number'), d('data.home.country', 'string'), d('data.home.phone', 'string', 'number'), d('data.home.eMail', 'string'), d('data.home.url', 'string'), d('data.birthday', Date, null), e('data.version', 'data.type'), h = {
          '\\': '\\\\',
          ';': '\\;',
          ',': '\\,',
          '\n': '\\n'
        }, f = [], parseFloat(b('version'))) {
      case 2.1:
        f[0] = '2.1';
        break;
      case 3:
        f[0] = '3.0';
        break;
      default:
        throw new Error('Unsupported VCARD.version (' + b('version') + ').');
      }
      switch (b('type').toLowerCase()) {
      case 'person':
        f[1] = (b('firstName').length > 0 || b('middleName').length > 0 || b('lastName').length > 0 ? 'FN:' + (c(b('firstName'), h) + ' ' + c(b('middleName'), h) + ' ' + c(b('lastName'), h)).replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '') + '\n' : '') + (b('organization').length > 0 ? 'ORG:' + c(b('organization'), h) + '\n' : '');
        break;
      case 'company':
        f[1] = (b('organization').length > 0 ? 'ORG:' + c(b('organization'), h) + '\n' : '') + (b('organization').length > 0 ? 'FN:' + c(b('organization'), h) + '\n' : '') + 'X-ABShowAs:COMPANY\n';
        break;
      default:
        throw new Error('Unsupported VCARD.type (' + b('type') + ').');
      }
      return 'BEGIN:VCARD\nVERSION:' + f[0] + '\n' + (b('lastName').length > 0 || b('firstName').length > 0 || b('middleName').length > 0 ? 'N:' + c(b('lastName'), h) + ';' + c(b('firstName'), h) + ';' + c(b('middleName'), h) + ';;\n' : '') + f[1] + (b('title').length > 0 ? 'TITLE:' + c(b('title'), h) + '\n' : '') + (a('work') && b('work.eMail').length > 0 ? 'EMAIL;' + ('3.0' === f[0] ? 'type=INTERNET;type=' : 'INTERNET;') + 'WORK:' + c(b('work.eMail'), h) + '\n' : '') + (a('home') && b('home.eMail').length > 0 ? 'EMAIL;' + ('3.0' === f[0] ? 'type=INTERNET;type=' : 'INTERNET;') + 'HOME:' + c(b('home.eMail'), h) + '\n' : '') + (b('mobilePhone').length > 0 ? 'TEL;' + ('3.0' === f[0] ? 'type=' : '') + 'CELL:' + c(b('mobilePhone'), h) + '\n' : '') + (a('work') && b('work.phone').length > 0 ? 'TEL;' + ('3.0' === f[0] ? 'type=' : '') + 'WORK:' + c(b('work.phone'), h) + '\n' : '') + (a('home') && b('home.phone').length > 0 ? 'TEL;' + ('3.0' === f[0] ? 'type=' : '') + 'HOME:' + c(b('home.phone'), h) + '\n' : '') + (a('work') && b('work.fax').length > 0 ? 'TEL;' + ('3.0' === f[0] ? 'type=WORK,' : 'WORK;') + 'FAX:' + c(b('work.fax'), h) + '\n' : '') + (a('work') && (b('work.street').length > 0 || b('work.city').length > 0 || b('work.state').length > 0 || b('work.zip').length > 0 || b('work.country').length > 0) ? 'ADR;' + ('3.0' === f[0] ? 'type=' : '') + 'WORK:;;' + c(b('work.street'), h) + ';' + c(b('work.city'), h) + ';' + c(b('work.state'), h) + ';' + c(b('work.zip'), h) + ';' + c(b('work.country'), h) + '\n' : '') + (a('home') && (b('home.street').length > 0 || b('home.city').length > 0 || b('home.state').length > 0 || b('home.zip').length > 0 || b('home.country').length > 0) ? 'ADR;' + ('3.0' === f[0] ? 'type=' : '') + 'HOME:;;' + c(b('home.street'), h) + ';' + c(b('home.city'), h) + ';' + c(b('home.state'), h) + ';' + c(b('home.zip'), h) + ';' + c(b('home.country'), h) + '\n' : '') + (a('birthday') && null !== a('birthday') ? 'BDAY;value=date:' + a('birthday').getFullYear() + ('0' + (a('birthday').getMonth() + 1)).substr(-2) + ('0' + a('birthday').getDate()).substr(-2) + ';' : '') + (a('work') && b('work.url').length > 0 ? 'URL;' + ('3.0' === f[0] ? 'type=' : '') + 'WORK:' + c(b('work.url'), h) + '\n' : '') + (a('home') && b('home.url').length > 0 ? 'URL;' + ('3.0' === f[0] ? 'type=' : '') + 'HOME:' + c(b('home.url'), h) + '\n' : '') + 'END:VCARD';
    case this.DATA_TYPE.MECARD:
      return d('data', 'object'), d('data.firstName', 'string', 'number'), d('data.lastName', 'string', 'number'), d('data.eMail', 'string'), d('data.phoneNumber', 'string', 'number'), d('data.videoCall', 'string', 'number'), d('data.birthday', Date, null), d('data.poBox', 'string', 'number'), d('data.room', 'string', 'number'), d('data.street', 'string', 'number'), d('data.city', 'string'), d('data.state', 'string'), d('data.zip', 'string', 'number'), d('data.country', 'string'), d('data.url', 'string', 'number'), d('data.memo', 'string', 'number'), h = {
        '\\': '\\\\',
        ':': '\\:',
        ';': '\\;',
        ',': '\\,'
      }, 'MECARD:' + (b('lastName').length > 0 || b('firstName') > 0 ? 'N:' + c(b('lastName'), h) + (b('firstName').length > 0 ? ',' + c(b('firstName'), h) : '') + ';' : '') + (b('phoneNumber').length > 0 ? 'TEL:' + c(b('phoneNumber'), h) + ';' : '') + (b('videoCall').length > 0 ? 'TEL-AV:' + c(b('videoCall'), h) + ';' : '') + (b('eMail').length > 0 ? 'EMAIL:' + c(b('eMail'), h) + ';' : '') + (b('url').length > 0 ? 'URL:' + c(b('url'), h) + ';' : '') + (b('memo').length > 0 ? 'NOTE:' + c(b('memo'), h) + ';' : '') + (a('birthday') && null !== a('birthday') ? 'BDAY:' + a('birthday').getFullYear() + ('0' + (a('birthday').getMonth() + 1)).substr(-2) + ('0' + a('birthday').getDate()).substr(-2) + ';' : '') + (b('street').length > 0 ? 'ADR:' + c(b('poBox'), h) + ',' + c(b('room'), h) + ',' + c(b('street'), h) + ',' + c(b('city'), h) + ',' + c(b('state'), h) + ',' + c(b('zip'), h) + ',' + c(b('country'), h) + ';' : '') + ';';
    case this.DATA_TYPE.VEVENT:
      if (d('data', 'object'), d('data.format', 'string'), d('data.summary', 'string', 'number'), d('data.description', 'string', 'number'), d('data.locationName', 'string', 'number'), d('data.fullDay', 'boolean'), d('data.startDate', Date), d('data.endDate', Date), e('data.format', 'data.summary', 'data.fullDay', 'data.startDate', 'data.endDate'), Date.parse(b('startDate')) > Date.parse(b('endDate')))
        throw new RangeError('VEVENT.startDate must be older than VEVENT.endDate.');
      switch (h = {
          '\\': '\\\\',
          ';': '\\;',
          ',': '\\,',
          '\n': '\\n'
        }, f = 'BEGIN:VEVENT\nSUMMARY:' + c(b('summary'), h) + '\n' + (b('description').length > 0 ? 'DESCRIPTION:' + c(b('description'), h) + '\n' : '') + (b('locationName').length > 0 ? 'LOCATION:' + c(b('locationName'), h) + '\n' : '') + 'DTSTART:' + a('startDate').getFullYear() + ('0' + (a('startDate').getMonth() + 1)).substr(-2) + ('0' + a('startDate').getDate()).substr(-2) + (a('fullDay') ? '' : 'T' + ('0' + a('startDate').getHours()).substr(-2) + ('0' + a('startDate').getMinutes()).substr(-2) + ('0' + a('startDate').getSeconds()).substr(-2)) + '\n' + 'DTEND:' + a('endDate').getFullYear() + ('0' + (a('endDate').getMonth() + 1)).substr(-2) + ('0' + a('endDate').getDate()).substr(-2) + (a('fullDay') ? '' : 'T' + ('0' + a('endDate').getHours()).substr(-2) + ('0' + a('endDate').getMinutes()).substr(-2) + ('0' + a('endDate').getSeconds()).substr(-2)) + '\n' + 'END:VEVENT', b('format').toLowerCase()) {
      case 'icalendar':
        return 'BEGIN:VCALENDAR\nVERSION:2.0\n' + f + '\n' + 'END:VCALENDAR';
      case 'zxing':
        return f;
      default:
        throw new Error('Unsupported VEVENT.format (' + b('format') + ').');
      }
    case this.DATA_TYPE.GOOGLE_MAPS:
      return d('data', 'object'), d('data.locationName', 'string'), d('data.longitude', 'string', 'number'), d('data.latitude', 'string', 'number'), e('data.longitude', 'data.latitude'), 'http://maps.google.com/maps?f=q&q=' + b('latitude') + '%2C' + b('longitude') + '+%28' + encodeURIComponent(b('locationName')) + '%29';
    case this.DATA_TYPE.BING_MAPS:
      return d('data', 'object'), d('data.longitude', 'string', 'number'), d('data.latitude', 'string', 'number'), e('data.longitude', 'data.latitude'), 'http://www.bing.com/maps/?v=2&cp=' + b('latitude') + '~' + b('longitude') + '&lvl=16&dir=0&sty=r';
    case this.DATA_TYPE.GEO:
      return d('data', 'object'), d('data.longitude', 'string', 'number'), d('data.latitude', 'string', 'number'), e('data.longitude', 'data.latitude'), 'GEO:' + b('latitude') + ',' + b('longitude');
    case this.DATA_TYPE.ITUNES:
      if ('object' == typeof this.data ? (d('data.appId', 'string', 'number'), e('data.appId'), f = b('appId')) : (d('data', 'string', 'number'), e('data'), f = b()), !/\d+$/.test(f))
        throw new Error('Invalid ITUNES.appId. The id must be numeric.');
      return 'http://itunes.apple.com/app/id' + /\d+$/.exec(f)[0];
    case this.DATA_TYPE.ITUNES_REVIEW:
      if ('object' == typeof this.data ? (d('data.appId', 'string', 'number'), e('data.appId'), f = b('appId')) : (d('data', 'string', 'number'), e('data'), f = b()), !/\d+$/.test(f))
        throw new Error('Invalid ITUNES.appId. The id must be numeric.');
      return 'itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=' + /\d+$/.exec(f)[0];
    case this.DATA_TYPE.ANDROID_MARKET:
      switch (d('data', 'object'), d('data.searchType', 'string'), d('data.linkType', 'string'), d('data.search', 'string', 'number'), e('data.searchType', 'data.linkType', 'data.search'), b('linkType').toLowerCase()) {
      case 'market':
        f = 'market://';
        break;
      case 'website':
        f = 'http://market.android.com/';
        break;
      default:
        throw new Error('Unsupported ANDROID_MARKET.linkType (' + b('linkType') + ').');
      }
      switch (b('searchType').toLowerCase()) {
      case 'raw':
        return f + 'search?q=' + encodeURIComponent(b('search'));
      case 'package':
        return f + 'search?q=pname%3A' + encodeURIComponent(b('search'));
      case 'publisher':
        return f + 'search?q=pub%3A' + encodeURIComponent(b('search'));
      case 'details':
        return f + 'details?id=' + encodeURIComponent(b('search'));
      default:
        throw new Error('Unsupported ANDROID_MARKET.searchType (' + b('searchType') + ').');
      }
    case this.DATA_TYPE.FACEBOOK_USER_PROFILE:
      if ('object' == typeof this.data ? (d('data.profileId', 'string', 'number'), e('data.profileId'), f = b('profileId')) : (d('data', 'string', 'number'), e('data'), f = b()), /^\d{15}$/.test(f))
        return 'fb://profile/' + f;
      if (/(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.test(f))
        return 'fb://profile/' + /(\/profile\/|(\?|&)id=)(\d{15})(%26|&|$)/.exec(f)[3];
      throw new Error('Invalid FACEBOOK_USER_PROFILE.videoId. The id must be numeric, 15 characters in length.');
    case this.DATA_TYPE.FOURSQUARE:
      if ('object' == typeof this.data ? (d('data.venueId', 'string', 'number'), e('data.venueId'), f = b('venueId')) : (d('data', 'string', 'number'), e('data'), f = b()), !/\d+$/.test(f))
        throw new Error('Invalid FOURSQUARE.venueId. The id must be numeric.');
      return 'http://foursquare.com/venue/' + /\d+$/.exec(f)[0];
    case this.DATA_TYPE.WIKIPEDIA:
      return 'object' == typeof this.data ? (d('data.url', 'string', 'number'), e('data.url'), f = b('url')) : (d('data', 'string', 'number'), e('data'), f = b()), h = { ' ': '_' }, g = /\/\/([a-z\-]*)\.?wikipedia.org\/wiki\/(.*)/i.exec(f), null === g || 3 !== g.length ? 'http://qrwp.org/' + c(f, h) : 'http://' + (g[1].length > 0 ? g[1] + '.' : '') + 'qrwp.org/' + c(g[2], h);
    case this.DATA_TYPE.YOUTUBE_USER:
      return 'object' == typeof this.data ? (d('data.userName', 'string', 'number'), e('data.userName'), f = b('userName')) : (d('data', 'string', 'number'), e('data'), f = b()), 'http://youtube.com/user/' + f;
    case this.DATA_TYPE.YOUTUBE_VIDEO:
      if ('object' == typeof this.data ? (d('data.videoId', 'string', 'number'), e('data.videoId'), f = b('videoId')) : (d('data', 'string', 'number'), e('data'), f = b()), /^[-_A-Za-z0-9]+$/.test(f))
        return 'youtube://' + f;
      if (/(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/.test(f))
        return 'youtube://' + /(youtu.be\/|(\?|&)v=|\/v\/)([-_A-Za-z0-9]+)(%26|&|$)/.exec(f)[3];
      throw new Error('Invalid YOUTUBE.videoId. The id must be alphanumeric.');
    case this.DATA_TYPE.TWEET_FETCH:
      throw new Error('DATA_TYPE.TWEET_FETCH is currently unsupported.');
    case this.DATA_TYPE.TWEET:
      return 'object' == typeof this.data ? (d('data.text', 'string', 'number'), e('data.text'), 'http://twitter.com/home?status=' + encodeURIComponent(b('text'))) : (d('data', 'string', 'number'), e('data'), 'http://twitter.com/home?status=' + encodeURIComponent(b()));
    case this.DATA_TYPE.BLACKBERRY_MESSENGER_USER:
      if (d('data', 'object'), d('data.firstName', 'string'), d('data.lastName', 'string'), d('data.bbmPin', 'string'), e('data.bbmPin'), !/^[A-Za-z0-9]{8}$/.test(b('bbmPin')))
        throw new Error('Invalid BLACKBERRY_MESSENGER_USER.bbmPin. The pin must be alphanumeric, eight characters in length.');
      return 'bbm:' + b('bbmPin') + '00000000' + b('firstName') + ' ' + b('lastName');
    case this.DATA_TYPE.ANDROID_WIFI:
      return d('data', 'object'), d('data.ssid', 'string'), d('data.password', 'string', 'number'), d('data.networkType', 'string'), e('data.ssid', 'data.networkType'), 'WIFI:S:' + b('ssid') + ';T:' + b('networkType') + (b('password').length > 0 ? ';P:' + b('password') : '') + ';;';
    default:
      throw new TypeError('Unsupported dataType.');
    }
    return '';
  }, a[m].prototype.Code = function (a, b, c) {
    if ('object' == typeof a && 'undefined' == typeof b && 'undefined' == typeof c && (c = a.errorCorrection, b = a.version, a = a.encodeMode), 'undefined' != typeof a) {
      if (!k(this.ENCODE_MODE, a))
        throw new TypeError('Unsupported encodeMode.');
    } else
      a = this.ENCODE_MODE.UTF8;
    try {
      Object.defineProperty(this, 'encodeMode', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return a;
        },
        set: function (b) {
          if (!k(this.ENCODE_MODE, b))
            throw new TypeError('Unsupported encodeMode.');
          a = b;
        }
      });
    } catch (d) {
      this.encodeMode = a;
    }
    if ('undefined' != typeof b) {
      if ('number' != typeof b)
        throw new TypeError('Invalid version type.');
      if (-40 > b || b > 40)
        throw new RangeError('Invalid version value.');
    } else
      b = this.DEFAULT;
    try {
      Object.defineProperty(this, 'version', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return b;
        },
        set: function (a) {
          if ('number' != typeof a)
            throw new TypeError('Invalid version type.');
          if (-40 > a || a > 40)
            throw new RangeError('Invalid version value.');
          b = a;
        }
      });
    } catch (d) {
      this.version = b;
    }
    if ('undefined' != typeof c) {
      if (!k(this.ERROR_CORRECTION, c))
        throw new TypeError('Invalid errorCorrection.');
    } else
      c = this.ERROR_CORRECTION.M;
    try {
      Object.defineProperty(this, 'errorCorrection', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return c;
        },
        set: function (a) {
          if (!k(this.ERROR_CORRECTION, a))
            throw new TypeError('Invalid errorCorrection.');
          c = a;
        }
      });
    } catch (d) {
      this.errorCorrection = c;
    }
  }, a[m].prototype.Code.prototype.ENCODE_MODE = {
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
  }, a[m].prototype.ENCODE_MODE = a[m].prototype.Code.prototype.ENCODE_MODE, a[m].prototype.Code.prototype.ERROR_CORRECTION = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  }, a[m].prototype.ERROR_CORRECTION = a[m].prototype.Code.prototype.ERROR_CORRECTION, a[m].prototype.Code.prototype.DEFAULT = 0, a[m].prototype.DEFAULT = a[m].prototype.Code.prototype.DEFAULT, a[m].prototype.Code.prototype.getVersion = function (a) {
    return this.version > 0 ? this.version : b(c(a, this), this, !0);
  }, a[m].prototype.Code.prototype.getMinVersion = function (d) {
    var e = new a[m].prototype.Code(this.encodeMode, this.DEFAULT, this.errorCorrection);
    return b(c(d, e), e, !0);
  }, a[m].prototype.Matrix = function (a, d) {
    var e, f, h = this;
    for (e = b(c(a, d), d), f = 0; f < e.length; f++)
      this[f] = e[f];
    try {
      Object.defineProperty(this, 'scale', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return i;
        },
        set: function (a) {
          if ('number' != typeof a)
            throw new TypeError('Invalid scale type.');
          if (0 >= a || a > 256)
            throw new RangeError('Scale value out of range.');
          i = a;
        }
      });
      var i = 4;
    } catch (j) {
      this.scale = 4;
    }
    try {
      Object.defineProperty(this, 'margin', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return k;
        },
        set: function (a) {
          if ('number' != typeof a)
            throw new TypeError('Invalid margin type.');
          if (0 > a || a > 256)
            throw new RangeError('Margin value out of range.');
          k = a;
        }
      });
      var k = 4;
    } catch (j) {
      this.margin = 4;
    }
    try {
      Object.defineProperty(this, 'color1', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return l;
        },
        set: function (a) {
          if ('string' != typeof a)
            throw new TypeError('Invalid color1 type.');
          l = a;
        }
      });
      var l = 'rgb(0,0,0)';
    } catch (j) {
      this.color1 = 'rgb(0,0,0)';
    }
    try {
      Object.defineProperty(this, 'color0', {
        configurable: !1,
        writeable: !0,
        get: function () {
          return m;
        },
        set: function (a) {
          if ('string' != typeof a)
            throw new TypeError('Invalid color2 type.');
          m = a;
        }
      });
      var m = 'none';
    } catch (j) {
      this.color0 = 'none';
    }
    try {
      Object.defineProperty(this, 'length', {
        configurable: !1,
        writeable: !1,
        get: function () {
          return e.length;
        }
      });
    } catch (j) {
      this.length = new function () {
        this.toString = function () {
          return e.length;
        };
      }();
    }
    try {
      Object.defineProperty(this, 'width', {
        configurable: !1,
        writeable: !1,
        get: function () {
          return e.length + (h.margin << 1);
        }
      });
    } catch (j) {
      this.width = new function () {
        this.toString = function () {
          return e.length + (h.margin << 1);
        };
      }();
    }
    try {
      Object.defineProperty(this, 'pixelWidth', {
        configurable: !1,
        writeable: !1,
        get: function () {
          return (e.length + (h.margin << 1)) * h.scale;
        }
      });
    } catch (j) {
      this.pixelWidth = new function () {
        this.toString = function () {
          return (e.length + (h.margin << 1)) * h.scale;
        };
      }();
    }
    this.draw = function (a, b, c) {
      var d, f, g = a.getContext('2d'), h = this.scale, i = this.margin;
      for (f = 0; f < e.length; f++)
        for (d = 0; d < e[f].length; d++)
          e[f][d] && g.fillRect(b + (d + i) * h, c + (f + i) * h, h, h);
    }, this.drawHTML = function (a, b, c) {
      b = b || 'div';
      var d, f, g, h = this.scale, i = this.margin, j = this.color1, k = '<div style="position:relative; background:' + this.color2 + '">';
      for (f = 0; f < e.length; f++)
        for (d = 0; d < e.length; d += g)
          if (g = 1, 1 === e[f][d]) {
            for (; d + g < e.length && 1 === e[f][d + g];)
              g++;
            k += c ? '<' + b + ' style="width:' + g * h + 'px; height:' + h + 'px; left:' + (d + i) * h + 'px; top:' + (f + i) * h + 'px;"></' + b + '>' : '<' + b + ' style="position:absolute; width:' + g * h + 'px; height:' + h + 'px; left:' + (d + i) * h + 'px; top:' + (f + i) * h + 'px; background:' + j + ';"></' + b + '>';
          }
      return k += 0 / 0, a && 'undefined' != typeof a.innerHTML && (a.innerHTML = k), k;
    }, this.toDataURL = function () {
    }, this.toSVG = function () {
    }, this.toArray = function () {
      var a, b, c = g(e.length + (k << 1), 0);
      for (b = 0; b < e.length; b++)
        for (c[b + k] = g(e[b].length + (k << 1), 0), a = 0; a < e[b].length; a++)
          c[b + k][a + k] = e[b][a];
      return c;
    }, this.toString = function () {
      return this.toArray().toString();
    }, this.getDebuggingData = function () {
    };
  };
  var n = {
      TOTAL_BYTES: 0,
      REMAINDER_BITS: 1,
      ECC_BYTES: 2,
      EC_BLOCKS: 3,
      ALIGNMENT_PATTERN_POSITION_OFFSET: 4,
      VERSION_PATTERN: 5
    }, o = [
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
    ], p = [
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
    ], q = [
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
    ], r = [
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
    ], s = [
      function (a, b) {
        return 0 === (b + a) % 2;
      },
      function (a, b) {
        return 0 === b % 2;
      },
      function (a) {
        return 0 === a % 3;
      },
      function (a, b) {
        return 0 === (b + a) % 3;
      },
      function (a, b) {
        return 0 === (Math.floor(b / 2) + Math.floor(a / 3)) % 2;
      },
      function (a, b) {
        return 0 === b * a % 2 + b * a % 3;
      },
      function (a, b) {
        return 0 === (b * a % 2 + b * a % 3) % 2;
      },
      function (a, b) {
        return 0 === (b * a % 3 + (b + a) % 2) % 2;
      }
    ], t = {
      FINDER: 2,
      SEPARATOR: 4,
      TIMING: 8,
      ALIGNMENT: 16,
      VERSION: 32,
      FORMAT: 64,
      DATA: 128
    };
}(window), function (a) {
  a.fn.flowtype = function (b) {
    var c = a.extend({
        maximum: 9999,
        minimum: 1,
        maxFont: 9999,
        minFont: 1,
        fontRatio: 35,
        lineRatio: 1.45
      }, b), d = function (b) {
        var d = a(b), e = d.width(), f = e > c.maximum ? c.maximum : e < c.minimum ? c.minimum : e, g = f / c.fontRatio, h = g > c.maxFont ? c.maxFont : g < c.minFont ? c.minFont : g;
        d.css({
          'font-size': h + 'px',
          'line-height': h * c.lineRatio + 'px'
        });
      };
    return this.each(function () {
      var b = this;
      a(window).resize(function () {
        d(b);
      }), d(this);
    });
  };
}(jQuery);