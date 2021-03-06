!
function() {
	window.GeoBeans = {}
}();
window.requestNextAnimationFrame = function() {
	var e = void 0,
		n = void 0,
		i = 0,
		t = navigator.userAgent,
		o = 0,
		a = this;
	return window.webkitRequestAnimationFrame && (n = function(e) {
		void 0 === e && (e = +new Date), a.callback(e)
	}, e = window.webkitRequestAnimationFrame, window.webkitRequestAnimationFrame = function(i, t) {
		a.callback = i, e(n, t)
	}), window.mozRequestAnimationFrame && (o = t.indexOf("rv:"), t.indexOf("Gecko") != -1 && (i = t.substr(o + 3, 3), "2.0" === i && (window.mozRequestAnimationFrame = void 0))), window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(e, n) {
		var i, t;
		window.setTimeout(function() {
			i = +new Date, e(i), t = +new Date, a.timeout = 1e3 / 60 - (t - i)
		}, a.timeout)
	}
}(), window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
GeoBeans.Class = function() {
	var t = arguments.length,
		n = arguments[0],
		e = arguments[t - 1],
		o = "function" == typeof e.initialize ? e.initialize : function() {
			n.prototype.initialize.apply(this, arguments)
		};
	if (t > 1) {
		var i = [o, n].concat(Array.prototype.slice.call(arguments).slice(1, t - 1), e);
		GeoBeans.inherit.apply(null, i)
	} else o.prototype = e;
	return o
}, GeoBeans.inherit = function(t, n) {
	var e = function() {};
	e.prototype = n.prototype, t.prototype = new e;
	var o, i, r;
	for (o = 2, i = arguments.length; o < i; o++) r = arguments[o], "function" == typeof r && (r = r.prototype), GeoBeans.Util.extend(t.prototype, r)
}, GeoBeans.Util = GeoBeans.Util || {}, GeoBeans.Util.extend = function(t, n) {
	if (t = t || {}, n) {
		for (var e in n) {
			var o = n[e];
			void 0 !== o && (t[e] = o)
		}
		var i = "function" == typeof window.Event && n instanceof window.Event;
		!i && n.hasOwnProperty && n.hasOwnProperty("toString") && (t.toString = n.toString)
	}
	return t
};
GeoBeans.Color = GeoBeans.Class({
	r: null,
	g: null,
	b: null,
	a: null,
	initialize: function() {
		this.r = parseInt(255 * Math.random()), this.g = parseInt(255 * Math.random()), this.b = parseInt(255 * Math.random()), this.a = Math.random()
	},
	set: function(t, s, i, n) {
		this.r = t, this.g = s, this.b = i, this.a = n
	},
	setByHex: function(t, s) {
		if (null != t) {
			t = t.replace("#", "");
			var i = parseInt(t.substring(0, 2), 16),
				n = parseInt(t.substring(2, 4), 16),
				e = parseInt(t.substring(4, 6), 16);
			this.r = i, this.g = n, this.b = e
		}
		null != s && (this.a = parseFloat(s))
	},
	setByRgb: function(t, s) {
		if (null != t) {
			var i = t.indexOf("("),
				n = t.indexOf(")"),
				e = t.slice(i + 1, n),
				r = e.slice(0, e.indexOf(",")),
				a = e.slice(e.lastIndexOf(",") + 1, e.length),
				h = e.slice(e.indexOf(",") + 1, e.lastIndexOf(","));
			this.r = parseInt(r), this.g = parseInt(h), this.b = parseInt(a)
		}
		null != s && (this.a = parseFloat(s))
	},
	getRgb: function() {
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
	},
	getRgba: function() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
	},
	getOpacity: function() {
		return this.a
	},
	setOpacity: function(t) {
		this.a = t
	},
	zero_fill_hex: function(t, s) {
		for (var i = t.toString(16); i.length < s;) i = "0" + i;
		return i
	},
	getHex: function() {
		var t = this.getRgb();
		if ("#" == t.charAt(0)) return t;
		var s = t.split(/\D+/),
			i = 65536 * Number(s[1]) + 256 * Number(s[2]) + Number(s[3]);
		return "#" + this.zero_fill_hex(i, 6)
	},
	clone: function() {
		var t = new GeoBeans.Color;
		return t.r = this.r, t.g = this.g, t.b = this.b, t.a = this.a, t
	},
	setByHsl: function(t, s, i, n) {
		var e, r, a;
		if (0 == s) e = r = a = i;
		else {
			var h = function(t, s, i) {
					return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (s - t) * i : i < .5 ? s : i < 2 / 3 ? t + (s - t) * (2 / 3 - i) * 6 : t
				},
				l = i < .5 ? i * (1 + s) : i + s - i * s,
				u = 2 * i - l;
			e = h(u, l, t + 1 / 3), r = h(u, l, t), a = h(u, l, t - 1 / 3)
		}
		this.r = Math.round(255 * e), this.g = Math.round(255 * r), this.b = Math.round(255 * a), null != n && (this.a = parseFloat(n))
	},
	getHsl: function() {
		var t, s, i = this.r / 255,
			n = this.g / 255,
			e = this.b / 255,
			r = Math.max(i, n, e),
			a = Math.min(i, n, e),
			h = (r + a) / 2;
		if (r == a) t = s = 0;
		else {
			var l = r - a;
			switch (s = h > .5 ? l / (2 - r - a) : l / (r + a), r) {
			case i:
				t = (n - e) / l + (n < e ? 6 : 0);
				break;
			case n:
				t = (e - i) / l + 2;
				break;
			case e:
				t = (i - n) / l + 4
			}
			t /= 6
		}
		return {
			h: t,
			s: s,
			l: h
		}
	},
	setByABGR: function(t) {
		if (8 == t.length) {
			var s = parseInt(t.slice(0, 2), 16);
			this.a = parseFloat(s / 255), this.r = parseInt(t.slice(6, 8), 16), this.g = parseInt(t.slice(4, 6), 16), this.b = parseInt(t.slice(2, 4), 16)
		}
	}
});
GeoBeans.ColorRamp = GeoBeans.Class({
	beginColor: null,
	endColor: null,
	number: null,
	initialize: function(e, n, o) {
		this.beginColor = e, this.endColor = n, this.number = o
	},
	getValues: function() {
		for (var e, n, o, t, r, i = this.beginColor.slice(1, this.beginColor.length), l = this.endColor.slice(1, this.endColor.length), s = parseInt("0x" + i, 16), a = (16711680 & s) >> 16, h = (65280 & s) >> 8, u = (255 & s) >> 0, C = parseInt("0x" + l, 16), p = (16711680 & C) >> 16, b = (65280 & C) >> 8, g = (255 & C) >> 0, m = [], c = 0; c <= this.number; c++) e = this.interpolateColor(a, p, c, this.number), n = this.interpolateColor(h, b, c, this.number), o = this.interpolateColor(u, g, c, this.number), t = new GeoBeans.Color, t.set(parseInt(e), parseInt(n), parseInt(o), 1), r = t.getHex(), m.push(r);
		return m
	},
	interpolateColor: function(e, n, o, t) {
		return e < n ? (n - e) * (o / t) + e : (e - n) * (1 - o / t) + n
	}
});
GeoBeans.ColorRangeMap = GeoBeans.Class({
	beginColor: null,
	endColor: null,
	min: null,
	max: null,
	beginColorHSV: null,
	endColorHSV: null,
	initialize: function(o, r, e, i) {
		this.beginColor = o, this.endColor = r, this.min = e, this.max = i;
		var n = this.beginColor.slice(1, this.beginColor.length),
			t = this.endColor.slice(1, this.endColor.length),
			s = parseInt("0x" + n, 16),
			l = (16711680 & s) >> 16,
			a = (65280 & s) >> 8,
			h = (255 & s) >> 0;
		this.beginColorHSV = this.rgb_2_hsv(l, a, h);
		var g = parseInt("0x" + t, 16),
			C = (16711680 & g) >> 16,
			u = (65280 & g) >> 8,
			b = (255 & g) >> 0;
		this.endColorHSV = this.rgb_2_hsv(C, u, b)
	},
	getValue: function(o) {
		var r = this.getColorValue(this.beginColorHSV.h, this.endColorHSV.h, o),
			e = this.getColorValue(this.beginColorHSV.s, this.endColorHSV.s, o),
			i = this.getColorValue(this.beginColorHSV.v, this.endColorHSV.v, o),
			n = this.hsv_2_rgb(r, e, i);
		return color = new GeoBeans.Color, color.set(parseInt(n.r), parseInt(n.g), parseInt(n.b), 1), color
	},
	getColorValue: function(o, r, e) {
		var i = null;
		return i = e < this.min ? 0 : e > this.max ? this.max - this.min : e - this.min, o < r ? (r - o) * (i / (this.max - this.min)) + o : (o - r) * (1 - i / (this.max - this.min)) + r
	},
	rgb_2_hsv: function(o, r, e) {
		var i, n, t, s = Math.min(o, r, e),
			l = Math.max(o, r, e);
		t = l;
		var a = l - s;
		return 0 == l ? (n = 0, i = -1, {
			h: i,
			s: n,
			v: t
		}) : (n = a / l, i = o == l ? (r - e) / a : r == l ? 2 + (e - o) / a : 4 + (o - r) / a, i *= 60, i < 0 && (i += 360), {
			h: i,
			s: n,
			v: parseFloat(t / 255)
		})
	},
	hsv_2_rgb: function(o, r, e) {
		var i, n, t;
		if (0 == r) return i = n = t = e, {
			r: 255 * i,
			g: 255 * n,
			b: 255 * t
		};
		o /= 60;
		var s = Math.floor(o),
			l = o - s,
			a = e * (1 - r),
			h = e * (1 - r * l),
			g = e * (1 - r * (1 - l));
		switch (s) {
		case 0:
			i = e, n = g, t = a;
			break;
		case 1:
			i = h, n = e, t = a;
			break;
		case 2:
			i = a, n = e, t = g;
			break;
		case 3:
			i = a, n = h, t = e;
			break;
		case 4:
			i = g, n = a, t = e;
			break;
		default:
			i = e, n = a, t = h
		}
		return {
			r: 255 * i,
			g: 255 * n,
			b: 255 * t
		}
	}
});
GeoBeans.Cookie = GeoBeans.Class({
	initialize: function() {},
	setCookie: function(e, o, i) {
		var n = new Date;
		n.setTime(n.getTime() + 864e5);
		var t = e + "=" + escape(o) + ";expires=" + n.toGMTString();
		null != i && (t += ";path=" + i), document.cookie = t
	},
	getCookie: function(e) {
		var o = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
		return null != o ? unescape(o[2]) : null
	},
	delCookie: function(e, o) {
		var i = new Date;
		i.setTime(i.getTime() - 1);
		var n = this.getCookie(e);
		if (null != n) {
			var t = e + "=" + n + ";expires=" + i.toGMTString();
			null != o && (t += ";path=" + o), document.cookie = t
		}
	}
});
GeoBeans.Envelope = GeoBeans.Class({
	xmin: null,
	xmax: null,
	ymin: null,
	ymax: null,
	initialize: function(i, t, n, h) {
		this.xmin = i, this.ymin = t, this.xmax = n, this.ymax = h
	},
	getWidth: function() {
		return this.xmax - this.xmin
	},
	getHeight: function() {
		return this.ymax - this.ymin
	},
	getCenter: function() {
		var i = (this.xmin + this.xmax) / 2,
			t = (this.ymin + this.ymax) / 2,
			n = new GeoBeans.Geometry.Point(i, t);
		return n
	},
	offset: function(i, t) {
		this.xmin += i, this.xmax += i, this.ymin += t, this.ymax += t
	},
	union: function(i) {
		this.xmin = this.xmin < i.xmin ? this.xmin : i.xmin, this.xmax = this.xmax > i.xmax ? this.xmax : i.xmax, this.ymin = this.ymin < i.ymin ? this.ymin : i.ymin, this.ymax = this.ymax > i.ymax ? this.ymax : i.ymax
	},
	contain: function(i, t) {
		return i > this.xmin && i < this.xmax && t > this.ymin && t < this.ymax
	},
	containOther: function(i) {
		return null != i && (this.xmin <= i.xmin && this.xmax > i.xmax && this.ymin < i.ymin && this.ymax > i.ymax)
	},
	scale: function(i) {
		var t = (this.xmin + this.xmax) / 2,
			n = (this.ymin + this.ymax) / 2,
			h = (this.xmax - this.xmin) * i / 2,
			m = (this.ymax - this.ymin) * i / 2;
		this.xmin = t - h, this.xmax = t + h, this.ymin = n - m, this.ymax = n + m
	},
	toString: function() {
		var i = "";
		return i += this.xmin + ",", i += this.ymin + ",", i += this.xmax + ",", i += this.ymax
	},
	equal: function(i) {
		return this.xmin == i.xmin && this.xmax == i.xmax && this.ymin == i.ymin && this.ymax == i.ymax
	},
	intersects: function(i) {
		var t = this.xmin > i.xmin ? this.xmin : i.xmin,
			n = this.xmax < i.xmax ? this.xmax : i.xmax,
			h = this.ymin > i.ymin ? this.ymin : i.ymin,
			m = this.ymax < i.ymax ? this.ymax : i.ymax;
		return t < n && h < m
	},
	rotate: function(i) {
		var t = this.xmin * Math.cos(i * Math.PI / 180) - this.ymin * Math.sin(i * Math.PI / 180),
			n = this.xmin * Math.sin(i * Math.PI / 180) + this.ymin * Math.cos(i * Math.PI / 180),
			h = this.xmax * Math.cos(i * Math.PI / 180) - this.ymax * Math.sin(i * Math.PI / 180),
			m = this.xmax * Math.sin(i * Math.PI / 180) + this.ymax * Math.cos(i * Math.PI / 180),
			a = t < h ? t : h,
			x = t > h ? t : h,
			s = n < m ? n : m,
			e = n > m ? n : m;
		return new GeoBeans.Envelope(Math.round(1e6 * a) / 1e6, Math.round(1e6 * s) / 1e6, Math.round(1e6 * x) / 1e6, Math.round(1e6 * e) / 1e6)
	},
	rotateMaxMin: function(i) {
		var t = this.xmin * Math.cos(i * Math.PI / 180) - this.ymin * Math.sin(i * Math.PI / 180),
			n = this.xmin * Math.sin(i * Math.PI / 180) + this.ymin * Math.cos(i * Math.PI / 180),
			h = this.xmax * Math.cos(i * Math.PI / 180) - this.ymax * Math.sin(i * Math.PI / 180),
			m = this.xmax * Math.sin(i * Math.PI / 180) + this.ymax * Math.cos(i * Math.PI / 180),
			a = new GeoBeans.Geometry.Point(t, n),
			x = new GeoBeans.Geometry.Point(h, m);
		return {
			min: a,
			max: x
		}
	}
});
GeoBeans.Control = GeoBeans.Class({
	type: null,
	map: null,
	enabled: !0,
	initialize: function(n) {},
	destory: function() {},
	attach: function(n) {
		this.map = n
	},
	detach: function() {
		this.map = map
	},
	enable: function(n) {
		this.enabled = n
	}
}), GeoBeans.Control.Type = {
	SCROLL_MAP: "SrollMapControl",
	DRAG_MAP: "DragMapControl",
	TRACK: "TrackControl",
	TRACKBUFFER: "TrackBufferControl",
	TRACKTRANSACTION: "TrackTransactionControl",
	TRACKOVERLAY: "TrackOverlayControl",
	HIT_FEATURE: "FeatureHitControl",
	NAV: "navControl",
	ZOOM: "zoom"
}, GeoBeans.Control.Controls = GeoBeans.Class({
	map: null,
	controls: [],
	initialize: function(n) {
		this.map = n, this.controls = []
	},
	destory: function() {
		this.controls = null
	},
	add: function(n) {
		if (null != n && "undefined" != n) {
			var t = this.find(n.type);
			t < 0 ? (n.attach(this.map), this.controls.push(n)) : (this.controls[t] = null, this.controls[t] = n)
		}
	},
	remove: function(n) {
		if (null != n && "undefined" != n) {
			var t = this.find(n.type);
			t >= 0 && (this.controls[t] = null, this.controls[t].splice(t, 1))
		}
	},
	get: function(n) {
		return this.controls[n]
	},
	find: function(n) {
		for (var t = this.controls.length, o = 0; o < t; o++) {
			var l = this.controls[o];
			if (null != l && l.type == n) return o
		}
		return -1
	},
	cleanup: function() {
		for (var n = this.controls.length, t = 0; t < n; t++) this.controls[t].destory(), this.controls[t] = null;
		this.controls = []
	}
});
GeoBeans.Event = {
	CLICK: "click",
	DCLICK: "dblclick",
	MOUSE_DOWN: "mousedown",
	MOUSE_UP: "mouseup",
	MOUSE_MOVE: "mousemove",
	MOUSE_OVER: "mouseover",
	MOUSE_OUT: "mouseout",
	RESIZE: "resize",
	MOUSE_WHEEL: "mousewheel"
}, GeoBeans.Event.MouseButton = {
	LEFT: "left",
	RIGHT: "right",
	MID: "mid"
}, GeoBeans.Event.MouseArgs = function() {}, GeoBeans.Events = GeoBeans.Class({
	events: null,
	initialize: function() {
		this.events = []
	},
	destory: function() {
		this.events = null
	},
	addEvent: function(e, n) {
		this.events.push({
			event: e,
			handler: n
		})
	},
	getEvnet: function(e) {
		for (var n = this.events, t = 0; t < n; t++) {
			var s = this.events[t];
			if (s.event == e) return s
		}
		return null
	}
});
GeoBeans.Feature = GeoBeans.Class({
	featureType: null,
	fid: null,
	geometry: null,
	values: null,
	symbolizer: null,
	initialize: function(e, t, l, i) {
		this.featureType = e, this.fid = t, this.geometry = l, this.values = i
	},
	destroy: function() {
		this.featureType = null, this.geometry = null, this.values = null
	},
	setValue: function(e, t) {
		for (var l = this.featureType.getFields(), i = 0; i < l.length; ++i) {
			var u = l[i];
			if (u.name == e) return void(this.values[i] = t)
		}
	},
	getValue: function(e) {
		for (var t = this.featureType.getFields(), l = 0; l < t.length; ++l) {
			var i = t[l];
			if (i.name == e) return this.values[l]
		}
	}
});
GeoBeans.FeatureType = GeoBeans.Class({
	workspace: null,
	name: null,
	title: null,
	keywords: null,
	srs: null,
	extent: null,
	fields: null,
	geomFieldName: null,
	count: null,
	minMaxValue: null,
	callback_obj: null,
	initialize: function(e, t) {
		this.workspace = e, this.name = t
	},
	destory: function() {
		this.workspace = null, this.name = null, this.title = null, this.keywords = null, this.srs = null, this.extent = null, this.geomFieldName = null
	},
	setName: function(e) {
		this.name = e
	},
	setTitle: function(e) {
		this.title = e
	},
	setKeywords: function(e) {
		this.keywords = e
	},
	setSrs: function(e) {
		this.srs = e
	},
	setExtent: function(e) {
		this.extent = e
	},
	getFields: function() {
		return this.fields
	},
	getFieldsAsync: function(e, t) {
		if (null != this.fields && 0 != this.fields.length) return void(null != t && t(e, this.fields));
		var n = this,
			r = this.workspace.server,
			s = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=describeFeatureType&typeName=" + this.name;
		$.ajax({
			type: "get",
			url: r,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(r, s) {
				n.fields = n.parseFields(r), null != t && t(e, n.fields)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getFieldIndex: function(e) {
		for (var t = this.getFields(), n = 0, r = t.length; n < r; n++) {
			var s = t[n];
			if (s.name == e) return n
		}
		return -1
	},
	parseFields: function(e) {
		if (0 != $(e).find("ExceptionText").length) {
			var t = $(e).find("ExceptionText").text();
			return t
		}
		var n = this,
			r = null,
			s = new Array;
		return $(e).find("sequence").children().each(function() {
			r = n.parseField(this), s.push(r)
		}), s
	},
	parseField: function(e) {
		var t = $(e).attr("name"),
			n = ($(e).attr("nillable"), $(e).attr("type")),
			r = this.parseFieldType(n),
			s = $(e).attr("length"),
			a = new GeoBeans.Field(t, r, this, s);
		if (r == GeoBeans.FieldType.GEOMETRY) {
			var i = this.parseGeometryType(n);
			a.setGeomType(i), this.geomFieldName = t
		}
		return a
	},
	parseFieldType: function(e) {
		return "gml" == e.substr(0, 3) ? GeoBeans.FieldType.GEOMETRY : e.substring(4, e.length)
	},
	parseGeometryType: function(e) {
		return e.substr(4, e.length - 16)
	},
	getFeatures: function(e, t, n, r, s) {
		var a = this,
			i = this.workspace.server,
			o = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=getFeature&typeName=" + this.name;
		null != e && (o += "&mapName=" + e), null != t && (o += "&sourceName=" + t), null != n && (o += "&maxFeatures=" + n), null != r && (o += "&offset=" + r);
		var l = "";
		if (null != s) for (var u = 0; u < s.length; ++u) l += s[u], u < s.length - 1 && (l += ",");
		return 0 != l.length && (o += "&fields=" + l), a.fields = a.getFields(e, t), $.ajax({
			type: "get",
			url: i,
			data: encodeURI(encodeURI(o)),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseFeatures(e);
				a.features = n
			},
			complete: function(e, t) {},
			error: function() {}
		}), this.features
	},
	getFeaturesAsync: function(e, t, n, r) {
		var s = this,
			a = this.workspace.server,
			i = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=getFeature&typeName=" + this.name;
		null != e && (i += "&maxFeatures=" + e), null != t && (i += "&offset=" + t);
		var o = "";
		if (null != n) for (var l = 0; l < n.length; ++l) o += n[l], l < n.length - 1 && (o += ",");
		0 != o.length && (i += "&fields=" + o), s.fields = s.getFields(), $.ajax({
			type: "get",
			url: a,
			data: encodeURI(encodeURI(i)),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.parseFeatures(e);
				void 0 != r && r(n)
			},
			complete: function(e, t) {},
			error: function(e, t, n) {
				console.log("textStatus:" + t), console.log("error:" + n)
			}
		})
	},
	getFeaturesAsync: function(e, t, n, r, s) {
		var a = this,
			i = this.workspace.server,
			o = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=getFeature&typeName=" + this.name;
		null != e && (o += "&maxFeatures=" + e), null != t && (o += "&offset=" + t);
		var l = "";
		if (null != n) for (var u = 0; u < n.length; ++u) l += n[u], u < n.length - 1 && (l += ",");
		0 != l.length && (o += "&fields=" + l), null != this.fields && $.ajax({
			type: "get",
			url: i,
			data: encodeURI(encodeURI(o)),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseFeatures(e);
				void 0 != s && s(r, n)
			},
			complete: function(e, t) {},
			error: function(e, t, n) {
				console.log("textStatus:" + t), console.log("error:" + n)
			}
		})
	},
	getFeatureBBoxGet: function(e, t, n, r, s) {
		var a = this,
			i = this.workspace.server,
			o = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=getFeature&typeName=" + this.name;
		if (null != e && (o += "&mapName=" + e), null != t && (o += "&sourceName=" + t), null != n) {
			var l = n.xmin,
				u = n.xmax,
				c = n.ymin,
				p = n.ymax,
				f = "";
			f = u - l < .01 ? n.toString() : l.toFixed(6) + "," + c.toFixed(6) + "," + u.toFixed(6) + "," + p.toFixed(6), o += "&bbox=" + f
		}
		return null != r && (o += "&maxFeatures=" + r), null != s && (o += "&offset=" + s), a.fields = a.getFields(e, t), $.ajax({
			type: "get",
			url: i,
			data: encodeURI(o),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseFeatures(e);
				a.features = n
			},
			complete: function(e, t) {},
			error: function() {}
		}), a.features
	},
	getFeatureBBoxGetOutput: function(e, t, n, r, s) {
		var a = this.workspace.server,
			i = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=getFeature&typeName=" + this.name;
		if (null != e && (i += "&mapName=" + e), null != t && (i += "&sourceName=" + t), null != n) {
			var o = n.xmin,
				l = n.xmax,
				u = n.ymin,
				c = n.ymax,
				p = o.toFixed(2) + "," + u.toFixed(2) + "," + l.toFixed(2) + "," + c.toFixed(2);
			i += "&bbox=" + p
		}
		return null != r && (i += "&maxFeatures=" + r), null != s && (i += "&offset=" + s), i += "&outputformat=shape-zip", a + "?" + i
	},
	getFeaturesBBox: function(e, t, n) {
		var r = t.xmin,
			s = t.xmax,
			a = t.ymin,
			i = t.ymax,
			o = (r.toFixed(2) + "," + a.toFixed(2) + "," + s.toFixed(2) + "," + i.toFixed(2), this),
			l = this.workspace.server,
			u = this.buildGetFeatureXMLBboxFilter(t, n);
		$.ajax({
			type: "post",
			url: l,
			data: u,
			contentType: "text/xml",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(t, n) {
				var r = o.parseFeatures(t);
				void 0 != e && e(o, r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseFeatures: function(e) {
		var t = this,
			n = null,
			r = new Array,
			s = new GeoBeans.Geometry.GML.Reader(GeoBeans.Geometry.GML.Version.v_2_0);
		return $(e).find("featureMember").each(function() {
			n = t.parseFeature($(this).children()[0], s), r.push(n)
		}), r
	},
	parseFeature: function(e, t) {
		for (var n = this.parseFID($(e).attr("fid")), r = (this.getFields(), new Array), s = null, a = null, i = this.fields.length, o = 0; o < i; o++) if (a = this.fields[o], a.type == GeoBeans.FieldType.GEOMETRY) {
			var l = $(e).find(a.name + ":first").children()[0];
			null == l ? r.push(null) : (s = t.read(l), r.push(s))
		} else {
			var u = $(e).find(a.name + ":first");
			r.push(null == u || 0 == u.length ? null : u.text())
		}
		return new GeoBeans.Feature(this, n, s, r)
	},
	parseFID: function(e) {
		var t = e.indexOf(".");
		return e.substring(t + 1, e.length)
	},
	buildGetFeatureXMLBboxFilter: function(e, t) {
		var n = "",
			r = this.workspace.workspaceName,
			s = 'xmlns:wfs="http://www.opengis.net/wfs"',
			a = "xmlns:" + r + '="' + this.workspace.xmlnsWorkspace + '"',
			i = 'xmlns:gml="http://www.opengis.net/gml"',
			o = 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
			l = 'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd"',
			u = 'xmlns:ogc="http://www.opengis.net/ogc" ';
		n += '<wfs:GetFeature service="WFS" version="1.0.0"  ' + s + " " + u + " " + a + " " + i + " " + o + " " + l + '><wfs:Query typeName="' + this.name + '"><ogc:Filter>';
		var c = "",
			p = "";
		if (null != e && void 0 != e && (p += "<ogc:BBOX><gml:Box><gml:coordinates>" + e.xmin + "," + e.ymin + " " + e.xmax + "," + e.ymax + "</gml:coordinates></gml:Box></ogc:BBOX>"), null != t && void 0 != t) {
			var f = t.field,
				m = t.value;
			c += "<ogc:PropertyIsEqualTo><ogc:PropertyName>" + f + "</ogc:PropertyName><ogc:Literal>" + m + "</ogc:Literal></ogc:PropertyIsEqualTo>"
		}
		return "" != c && "" != p ? n += "<And>" + c + p + "</And>" : "" != c && "" == p ? n += c : "" == c && "" != p && (n += p), n += "</ogc:Filter></wfs:Query></wfs:GetFeature>"
	},
	getCount: function(e, t, n) {
		var r = this,
			s = this.workspace.server,
			a = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=GetCount&typeName=" + this.name;
		return null != e && (a += "&mapName=" + e), null != t && (a += "&sourceName=" + t), null != n && (a += "&bbox=" + n.toString()), $.ajax({
			type: "get",
			url: s,
			data: encodeURI(a),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				r.count = r.parseCount(e)
			},
			complete: function(e, t) {},
			error: function() {}
		}), r.count
	},
	parseCount: function(e) {
		if (0 != $(e).find("ExceptionText").length) {
			var t = $(e).find("ExceptionText").text();
			if ("" != t) return t
		}
		var n = $(e).find("Count").text();
		return parseInt(n)
	},
	getFeaturesWithin: function(e, t, n) {
		var r = this,
			s = this.workspace.server,
			a = this.buildGetFeaturesXMLWithin(e, t, n);
		return $.ajax({
			type: "post",
			url: s,
			contentType: "text/xml",
			dataType: "xml",
			data: a,
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = r.parseFeatures(e);
				r.features = n
			},
			complete: function(e, t) {},
			error: function() {}
		}), r.features
	},
	getFeaturesWithinAsync: function(e, t, n, r, s, a) {
		var i = this,
			o = this.workspace.server,
			l = this.buildGetFeaturesXMLWithin(e, t, n, s);
		$.ajax({
			type: "post",
			url: o,
			contentType: "text/xml",
			dataType: "xml",
			data: l,
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.parseFeatures(e);
				void 0 != r && r(a, n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	buildGetFeaturesXMLWithin: function(e, t, n, r) {
		var s = "";
		s += '<wfs:GetFeature service="WFS" version="1.1.0" ', null != e && (s += 'mapName="' + e + '" '), null != t && (s += 'sourceName="' + t + '" ');
		var a = "";
		if (null != r) for (var i = 0; i < r.length; ++i) {
			var o = r[i];
			null != o && (a += "<wfs:PropertyName>" + o + "</wfs:PropertyName>")
		}
		var l = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			u = l.write(n);
		return s += 'xmlns:world="www.world.ac.cn" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><wfs:Query typeName="' + this.name + '">' + a + "\t<Filter>\t\t<Within>\t\t\t<PropertyName>" + this.geomFieldName + "</PropertyName>" + u + "\t\t</Within>\t</Filter></wfs:Query></wfs:GetFeature>"
	},
	getFeaturesFilter: function(e, t, n, r, s, a, i) {
		var o = this,
			l = this.workspace.server,
			u = this.buildGetFeatureFilterXML(e, t, n, r, s, a, i);
		return this.fields = this.getFields(e, t), $.ajax({
			type: "post",
			url: l,
			data: u,
			contentType: "text/xml",
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = o.parseFeatures(e);
				o.features = n
			},
			complete: function(e, t) {},
			error: function() {}
		}), o.features
	},
	getFeaturesFilterAsync: function(e, t, n, r, s, a, i, o) {
		var l = this,
			u = this.workspace.server,
			c = this.buildGetFeatureFilterXML(e, t, n, r, s, a, i);
		this.fields = this.getFields(e, t), $.ajax({
			type: "post",
			url: u,
			data: c,
			contentType: "text/xml",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = l.parseFeatures(e);
				void 0 != o && o(n)
			},
			complete: function(e, t) {},
			error: function(e, t, n) {
				console.log("textStatus:" + t), console.log("error:" + n)
			}
		})
	},
	getFeaturesFilterAsync2: function(e, t, n, r, s, a, i, o, l) {
		var u = this,
			c = this.workspace.server,
			p = this.buildGetFeatureFilterXML(e, t, n, r, s, a);
		this.fields = this.getFields(e, t), this.callback_obj = o;
		var f = $.ajax({
			type: "post",
			url: c,
			data: p,
			contentType: "text/xml",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = u.parseFeatures(e);
				void 0 != l && l(u.callback_obj, n)
			},
			complete: function(e, t) {},
			error: function(e, t, n) {}
		});
		return f
	},
	buildGetFeatureFilterXML: function(e, t, n, r, s, a, i) {
		var o = '<?xml version="1.0" encoding="UTF-8"?><wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" ';
		null != e && (o += 'mapName="' + e + '" '), null != t && (o += 'sourceName="' + t + '" '), null != r && (o += 'maxFeatures="' + r + '" '), null != s && (o += 'offset="' + s + '" '), o += "/>";
		var l = $.parseXML(o),
			u = l.createElement("wfs:Query");
		if ($(u).attr("typeName", this.name), null != a) for (var c = 0; c < a.length; ++c) {
			var p = l.createElement("wfs:PropertyName");
			$(p).text(a[c]), $(u).append(p)
		}
		var f = new GeoBeans.FilterWriter,
			m = f.write(l, n);
		if ($(u).append(m), null != i) {
			var h = this.buildOrderbyXML(l, i);
			$(u).append(h)
		}
		$("GetFeature", l).append(u);
		var d = (new XMLSerializer).serializeToString(l);
		return d
	},
	buildOrderbyXML: function(e, t) {
		if (null == t) return "";
		var n = e.createElement("ogc:OrderBy"),
			r = t.isAsc();
		r ? $(n).attr("order", "asc") : $(n).attr("order", "desc");
		for (var s = t.getFieldCount(), a = null, i = null, o = 0; o < s; ++o) i = t.getField(o), null != i && (a = e.createElement("wfs:PropertyName"), $(a).text(i), $(n).append(a));
		return n
	},
	getFeatureFilterCount: function(e, t, n) {
		var r = this,
			s = this.workspace.server,
			a = this.buildGetFeatureFilterCountXML(e, t, n);
		return $.ajax({
			type: "post",
			url: s,
			data: a,
			contentType: "text/xml",
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				r.count = r.parseCount(e)
			},
			complete: function(e, t) {},
			error: function() {}
		}), r.count
	},
	buildGetFeatureFilterCountXML: function(e, t, n) {
		var r = '<?xml version="1.0" encoding="UTF-8"?><wfs:GetCount service="WFS" version="1.0.0" outputFormat="GML2" xmlns:world="www.world.ac.cn" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" ';
		null != e && (r += 'mapName="' + e + '" '), null != t && (r += 'sourceName="' + t + '" '), r += "/>";
		var s = $.parseXML(r),
			a = s.createElement("wfs:Query");
		$(a).attr("typeName", this.name);
		var i = new GeoBeans.FilterWriter,
			o = i.write(s, n);
		$(a).append(o), $("GetCount", s).append(a);
		var l = (new XMLSerializer).serializeToString(s);
		return l
	},
	getFeatureFilterCountAsync: function(e, t, n, r, s) {
		var a = this,
			i = this.workspace.server,
			o = this.buildGetFeatureFilterCountXML(e, t, n);
		return this.callback_obj = r, $.ajax({
			type: "post",
			url: i,
			data: o,
			contentType: "text/xml",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseCount(e);
				null != s && s(a.callback_obj, n)
			},
			complete: function(e, t) {},
			error: function() {}
		}), a.count
	},
	getFeatureFilterOutput: function(e, t, n, r, s) {
		var a = this.workspace.server,
			i = '<?xml version="1.0" encoding="UTF-8"?><a/>',
			o = $.parseXML(i),
			l = new GeoBeans.FilterWriter,
			u = l.write(o, n);
		$(u).attr("xmlns:ogc", "http://www.opengis.net/ogc"), $(u).attr("xmlns:gml", "http://www.opengis.net/gml");
		var c = (new XMLSerializer).serializeToString(u),
			p = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=getFeature&typeName=" + this.name + "&outputFormat=shape-zip&filter=" + c;
		return null != e && (p += "&mapName=" + e), null != t && (p += "&sourceName=" + t), a + "?" + p
	},
	getMinMaxValue: function(e, t, n, r) {
		if (null == r) {
			var s = this.getMinMaxValueSyn(e, t, n);
			return s
		}
		this.getMinMaxValueAsync(e, t, n, r)
	},
	getMinMaxValueSyn: function(e, t, n) {
		if (null == e) return null;
		var r = this,
			s = this.workspace.server,
			a = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=GetValue&typeName=" + this.name + "&field=" + e + "&type=minmax";
		return null != t && (a += "&mapName=" + t), null != n && (a += "&sourceName=" + n), $.ajax({
			type: "get",
			url: s,
			data: encodeURI(encodeURI(a)),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = r.pareseMinMaxValue(e);
				this.minMaxValue = n
			},
			complete: function(e, t) {},
			error: function() {}
		}), this.minMaxValue
	},
	getMinMaxValueAsync: function(e, t, n, r) {
		if (null != e) {
			var s = this,
				a = "service=" + this.workspace.service + "&version=" + this.workspace.version + "&request=GetValue&typeName=" + this.name + "&field=" + e + "&type=minmax";
			null != t && (a += "&mapName=" + t), null != n && (a += "&sourceName=" + n);
			var i = this.workspace.server;
			$.ajax({
				type: "get",
				url: i,
				data: encodeURI(a),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, t) {
					var n = s.pareseMinMaxValue(e);
					r(n)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	pareseMinMaxValue: function(e) {
		var t = $(e).find("Min").text(),
			n = $(e).find("Max").text(),
			r = new Object;
		return r.min = t, r.max = n, r
	}
});
GeoBeans.FieldType = {
	DOUBLE: "double",
	STRING: "string",
	GEOMETRY: "geometry"
}, GeoBeans.Field = GeoBeans.Class({
	featureType: null,
	name: null,
	type: null,
	geomType: null,
	length: null,
	initialize: function(e, n, t, l) {
		this.name = e, this.type = n, this.featureType = t, this.length = l
	},
	destroy: function() {
		this.name = null, this.type = null, this.featureType = null
	},
	setGeomType: function(e) {
		this.geomType = e
	}
});
GeoBeans.Filter = GeoBeans.Class({
	type: null,
	initialize: function() {},
	clone: function() {
		var e = new GeoBeans.Filter;
		return e.type = this.type, e
	}
}), GeoBeans.Filter.Type = {
	FilterID: "id",
	FilterComparsion: "comparsion",
	FilterLogic: "logic",
	FilterSpatial: "spatial"
};
GeoBeans.FontManager = GeoBeans.Class({
	fonts: [],
	server: null,
	version: null,
	initialize: function(n, t) {
		this.server = n, this.version = t
	},
	getFonts: function() {
		if (null != this.fonts) {
			if (0 != this.fonts.length) return this.fonts;
			var n = this,
				t = "service=ims&version=" + this.version + "&request=GetFont";
			return +name, $.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(t),
				dataType: "xml",
				async: !1,
				beforeSend: function(n) {},
				success: function(t, e) {
					n.fonts = n.parseFonts(t)
				},
				complete: function(n, t) {},
				error: function() {}
			}), n.fonts
		}
	},
	parseFonts: function(n) {
		var t = [];
		return $(n).find("font").each(function() {
			var n = new Object,
				e = $(this).attr("face"),
				s = $(this).attr("family");
			n.face = e, n.family = s, t.push(n)
		}), t
	}
});
GeoBeans.GeoJsonReader = GeoBeans.Class({
	layerName: null,
	fields: null,
	layer: null,
	incrementID: 0,
	initialize: function() {},
	read: function(e, n) {
		return this.layer = null, this.layerName = e, this.fields = [], this.load(n), this.layer
	},
	load: function(e) {
		var n = this;
		$.ajax({
			url: e,
			dataType: "json",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, r) {
				n.readJson(e)
			},
			complete: function(e, n) {},
			error: function(e, n) {
				console.log(n)
			}
		})
	},
	readJson: function(e) {
		if (null == e) return null;
		var n = e.type;
		console.log(n);
		var r = new GeoBeans.FeatureType(null, this.layerName);
		r.fields = [];
		var l = new GeoBeans.Layer.FeatureLayer(this.layerName);
		if (l.featureType = r, l.features = [], this.layer = l, "FeatureCollection" == n) {
			var t = this.parseFeatureCollection(e);
			null != t && this.layer.addFeatures(t)
		} else if ("Feature" == n) {
			var i = this.parseFeature(e);
			null != i && this.layer.addFeature(i)
		}
	},
	parseFeatureCollection: function(e) {
		if (null == e) return null;
		var n = [],
			r = this;
		return $(e.features).each(function() {
			var e = r.parseFeature(this);
			n.push(e)
		}), n
	},
	parseFeature: function(e) {
		if (null == e) return null;
		var n = e.type;
		if ("Feature" != n) return null;
		var r = this.parseId(e);
		if (null == r && (r = this.getFid()), null == r) return null;
		var l = this.parseGeometry(e.geometry),
			t = this.parseProperties(e.properties),
			i = new GeoBeans.Feature(this.layer.featureType, r, l, t);
		return i
	},
	parseId: function(e) {
		if (null == e) return null;
		var n = e.id;
		return n
	},
	getFid: function() {
		if (null == this.layer) return null;
		for (var e = this.layerName + "_" + this.incrementID; null != this.layer.getFeatureByID(e);) this.incrementID++, e = this.layerName + "_" + this.incrementID;
		return e
	},
	parseGeometry: function(e) {
		if (null == e) return null;
		var n = e.type,
			r = null;
		switch (n) {
		case "Point":
			r = this.parsePoint(e);
			break;
		case "LineString":
			r = this.parseLineString(e);
			break;
		case "Polygon":
			r = this.parsePolygon(e);
			break;
		case "MultiPoint":
			r = this.parseMultiPoint(e);
			break;
		case "MultiPolygon":
			r = this.parseMultiPolygon(e);
			break;
		case "MultiLineString":
			r = this.parseMultiLineString(e);
			break;
		case "GeometryCollection":
			r = this.parseGeometryCollection(e)
		}
		return r
	},
	parsePoint: function(e) {
		if (null == e) return null;
		if ("Point" != e.type) return null;
		var n = e.coordinates;
		return this.parsePointCoords(n)
	},
	parseLineString: function(e) {
		if (null == e) return null;
		if ("LineString" != e.type) return null;
		var n = e.coordinates;
		return this.parseLineStringCoords(n)
	},
	parsePointCoords: function(e) {
		return null != e || $.isArray(e) ? new GeoBeans.Geometry.Point(e[0], e[1]) : null
	},
	parseLineStringCoords: function(e) {
		if (null == e && !$.isArray(e)) return null;
		for (var n = [], r = 0; r < e.length; ++r) {
			var l = this.parsePointCoords(e[r]);
			null != l && n.push(l)
		}
		return 0 != n.length ? new GeoBeans.Geometry.LineString(n) : null
	},
	parsePolygonCoords: function(e) {
		if (null == e && !$.isArray(e)) return null;
		for (var n = [], r = 0; r < e.length; ++r) {
			var l = this.parseLineStringCoords(e[r]);
			null != l && n.push(l)
		}
		return 0 != n.length ? new GeoBeans.Geometry.Polygon(n) : null
	},
	parsePolygon: function(e) {
		if (null == e) return null;
		if ("Polygon" != e.type) return null;
		var n = e.coordinates;
		return this.parsePolygonCoords(n)
	},
	parseMultiPoint: function(e) {
		if (null == e) return null;
		if ("MultiPoint" != e.type) return null;
		for (var n = [], r = e.coordinates, l = 0; l < r.length; ++l) {
			var t = this.parsePointCoords(r[l]);
			null != t && n.push(t)
		}
		return 0 != n.length ? new GeoBeans.Geometry.MultiPoint(n) : null
	},
	parseMultiPolygon: function(e) {
		if (null == e) return null;
		if ("MultiPolygon" != e.type) return null;
		for (var n = [], r = e.coordinates, l = 0; l < r.length; ++l) {
			var t = this.parsePolygonCoords(r[l]);
			null != t && n.push(t)
		}
		return 0 != n.length ? new GeoBeans.Geometry.MultiPolygon(n) : null
	},
	parseMultiLineString: function(e) {
		if (null == e) return null;
		if ("MultiLineString" != e.type) return null;
		for (var n = [], r = e.coordinates, l = 0; l < r.length; ++l) {
			var t = this.parseLineStringCoords(r[l]);
			null != t && n.push(t)
		}
		return 0 != n.length ? new GeoBeans.Geometry.MultiLineString(n) : null
	},
	parseGeometryCollection: function(e) {
		if (null == e) return null;
		if ("GeometryCollection" != e.type) return null;
		for (var n = [], r = e.geometries, l = 0; l < r.length; ++l) {
			var t = this.parseGeometry(r[l]);
			null != t && n.push(t)
		}
		return 0 != n.length ? new GeoBeans.Geometry.GeometryCollection(n) : null
	},
	parseProperties: function(e) {
		if (null == e) return null;
		for (var n = Object.keys(e), r = null, l = 0; l < n.length; ++l) if (r = n[l], null != r) {
			var t = e[r];
			this.addField(r, t)
		}
		for (var i = [], u = this.layer.featureType.fields, a = null, o = null, l = 0; l < u.length; ++l) a = u[l], o = a.name, null != e[o] ? i.push(e[o]) : i.push(null);
		return i
	},
	addField: function(e, n) {
		if (null != this.layer && null != this.layer.featureType) {
			var r = this.layer.featureType.fields;
			if (null != r) {
				for (var l = null, t = 0; t < r.length; ++t) if (l = r[t], l.name == e) return;
				var i = null,
					u = typeof n;
				"string" == u ? i = GeoBeans.FieldType.STRING : "number" == u && (i = GeoBeans.FieldType.DOUBLE);
				var l = new GeoBeans.Field(e, i, this.layer.featureType, null);
				this.layer.featureType.fields.push(l)
			}
		}
	}
});
GeoBeans.Geometry = GeoBeans.Class({
	id: null,
	extent: null,
	initialize: function() {},
	destroy: function() {
		this.id = null, this.extent = null
	},
	getCentroid: function() {},
	hit: null
}), GeoBeans.Geometry.Type = {
	POINT: "Point",
	LINESTRING: "LineString",
	POLYGON: "Polygon",
	MULTIPOINT: "MultiPoint",
	MULTILINESTRING: "MultiLineString",
	MULTIPOLYGON: "MultiPolygon",
	CIRCLE: "Circle",
	COLLECTION: "Collection"
}, GeoBeans.Geometry.fromWKT = function(n) {};
GeoBeans.InfoWindow = GeoBeans.Class({
	width: 300,
	height: 200,
	title: "Info",
	content: null,
	initialize: function(t, n) {
		if (this.content = t, null != n) {
			var i = n.width;
			null != i && (this.width = i);
			var e = n.height;
			null != e && (this.height = e);
			var l = n.title;
			null != l && (this.title = l)
		}
	},
	getContent: function() {
		return this.content
	},
	getTitle: function() {
		return this.title
	}
});
GeoBeans.JobManager = GeoBeans.Class({
	service: "ims",
	version: "1.0.0",
	server: null,
	initialize: function(t) {
		this.server = t + "/mgr"
	},
	getJobStatistics: function(t, e, i, n, s) {
		if (null == t || null == i || null == n) return void(null != s && s("params is valid"));
		var r = "service=" + this.service + "&version=" + this.version + "&request=JobStatistics&field=" + t + "&startTime=" + i + "&endTime=" + n;
		null != e && (r += "&client=" + e);
		var a = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(t) {},
			success: function(t, e) {
				var i = a.parseStatistics(t);
				null != s && s(i)
			},
			complete: function(t, e) {},
			error: function() {}
		})
	},
	parseStatistics: function(t) {
		if (null != t) {
			var e = [];
			return $(t).find("Item").each(function() {
				var t = $(this).attr("key"),
					i = $(this).attr("count");
				e.push({
					key: t,
					count: i
				})
			}), e
		}
	},
	getJob: function(t, e, i) {
		if (null == t || null == e) return void(null != i && i("params is not valid"));
		var n = "service=" + this.service + "&version=" + this.version + "&request=GetJob&maxJobs=" + t + "&offset=" + e,
			s = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(t) {},
			success: function(t, e) {
				var n = s.parseJob(t);
				null != i && i(n)
			},
			complete: function(t, e) {},
			error: function() {}
		})
	},
	parseJob: function(t) {
		if (null == t) return null;
		var e = [];
		return $(t).find("Job").each(function() {
			var t = $(this).find("Operation").text(),
				i = $(this).find("Params").text(),
				n = $(this).find("Client").text(),
				s = $(this).find("Server").text(),
				r = $(this).find("StartTime").text(),
				a = $(this).find("EndTime").text(),
				o = $(this).find("State").text();
			e.push({
				operation: t,
				params: i,
				client: n,
				server: s,
				startTime: r,
				endTime: a,
				state: o
			})
		}), e
	}
});
GeoBeans.KMLReader = GeoBeans.Class({
	incrementID: 0,
	styles: null,
	initialize: function() {},
	read: function(e, l) {
		return this.layerName = e, this.styles = [], this.load(l), this.layer
	},
	load: function(e) {
		var l = this;
		$.ajax({
			url: e,
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				l.readXML(e)
			},
			complete: function(e, l) {},
			error: function(e, l) {
				console.log(l)
			}
		})
	},
	readXML: function(e) {
		var l = $(e).find("Document");
		if (0 == l.length) return null;
		var t = new GeoBeans.FeatureType(null, this.layerName),
			n = [],
			r = new GeoBeans.Field("name", "string", t, null);
		n.push(r);
		var r = new GeoBeans.Field("shape", "geometry", t, null);
		n.push(r), t.geomFieldName = "shape", t.fields = n;
		var a = new GeoBeans.Layer.FeatureLayer(this.layerName);
		a.featureType = t, a.features = [], this.layer = a;
		var i = new GeoBeans.Style.FeatureStyle;
		a.setStyle(i), this.createDefaultRules(l), this.parseDocumentXML(l), console.log(this.styles)
	},
	parseDocumentXML: function(e) {
		if (null != e) {
			var l = this;
			e.children().each(function() {
				var e = this.tagName;
				if ("name" == e) {
					var t = $(this).text();
					"Roads" == t && console.log(this)
				}
				switch (e) {
				case "Folder":
					l.parseFolder(this);
					break;
				case "Style":
					l.parseStyle(this);
					break;
				case "StyleMap":
					l.parseStyleMap(this);
					break;
				case "Placemark":
					var n = l.parsePlacemark(this);
					l.layer.addFeature(n)
				}
			})
		}
	},
	getFid: function() {
		if (null == this.layer) return null;
		for (var e = this.layerName + "_" + this.incrementID; null != this.layer.getFeatureByID(e);) this.incrementID++, e = this.layerName + "_" + this.incrementID;
		return e
	},
	addRule: function(e) {
		if (null != this.layer && null != e) {
			var l = this.layer.style;
			null != l && l.addRule(e)
		}
	},
	getRule: function(e) {
		if (null == e || null == this.layer || null == this.layer.style) return null;
		for (var l = this.layer.style.rules, t = 0; t < l.length; ++t) {
			var n = l[t];
			if (null != n && n.name == e) return n
		}
		return null
	},
	addFilterByID: function(e, l) {
		if (null != e && null != l) {
			var t = e.filter;
			null == t && (t = new GeoBeans.IDFilter, e.filter = t), t.addID(l)
		}
	},
	parseFolder: function(e) {
		if (null != e) {
			var l = this;
			$(e).children().each(function() {
				var e = this.tagName;
				if ("Folder" == e) l.parseFolder(this);
				else if ("Style" == e) l.parseStyle(this);
				else if ("Placemark" == e) {
					var t = l.parsePlacemark(this);
					l.layer.addFeature(t)
				}
			})
		}
	},
	parseStyle: function(e) {
		if (null != e) {
			var l = $(e).attr("id"),
				t = {};
			t.name = l, console.log(l);
			var n = this;
			$(e).children().each(function() {
				var e = this.tagName;
				switch (e) {
				case "IconStyle":
					var l = n.parseIconStyle(this);
					null != l && (t.pointSymbolizer = l);
					break;
				case "LabelStyle":
					var r = n.parseLabelStyle(this);
					null != r && (t.textSymbolizer = r);
					break;
				case "LineStyle":
					var a = n.parseLineStyle(this);
					null != a && (t.lineSymbolizer = a);
					break;
				case "PolyStyle":
					var i = n.parsePolyStyle(this);
					null != i && (t.polygonSymbolizer = i)
				}
			}), this.styles.push(t)
		}
	},
	parseIconStyle: function(e) {
		if (null == e) return null;
		var l = this,
			t = this.getDefaultSymbolizer(GeoBeans.Geometry.Type.POINT).clone();
		return $(e).children().each(function() {
			var e = this.tagName;
			switch (e) {
			case "Icon":
				var n = l.parseIcon(this);
				null != n && (t.symbol.icon = n);
				break;
			case "scale":
				var r = l.parseScale(this);
				null != r && (t.symbol.scale = r)
			}
		}), t
	},
	parseLabelStyle: function(e) {
		if (null == e) return null;
		var l = this,
			t = this.getDefaultTextSymbolizer().clone();
		return $(e).children().each(function() {
			var e = this.tagName;
			switch (e) {
			case "color":
				var n = l.parseColor(this);
				t.fill.color = n;
				break;
			case "scale":
				var r = l.parseScale(this);
				t.font.size = t.font.size * r
			}
		}), t
	},
	parseLineStyle: function(e) {
		if (null == e) return null;
		var l = this,
			t = this.getDefaultSymbolizer(GeoBeans.Geometry.Type.LINESTRING).clone();
		return $(e).children().each(function() {
			var e = this.tagName;
			switch (e) {
			case "color":
				var n = l.parseColor(this);
				t.stroke.color = n;
				break;
			case "width":
				var r = l.parseWidth(this);
				t.stroke.width = r
			}
		}), t
	},
	parsePolyStyle: function(e) {
		if (null == e) return null;
		var l = this,
			t = this.getDefaultSymbolizer(GeoBeans.Geometry.Type.POLYGON).clone();
		return $(e).children().each(function() {
			var e = this.tagName;
			switch (e) {
			case "color":
				var n = l.parseColor(this);
				t.fill.color = n;
				break;
			case "fill":
				var r = l.parseFill(this);
				r || (t.fill = null);
				break;
			case "outline":
				var a = l.parseOutline(this);
				a || (t.stroke = null)
			}
		}), t
	},
	parseColor: function(e) {
		if (null == e) return null;
		var l = $(e).text();
		if (8 == l.length) {
			var t = new GeoBeans.Color;
			return t.setByABGR(l), t
		}
		if (9 == l.length && 0 == l.indexOf("#")) {
			var t = new GeoBeans.Color;
			return t.setByABGR(l.slice(1, l.length)), t
		}
		return new GeoBeans.Color
	},
	parseIcon: function(e) {
		if (null == e) return null;
		var l = $(e).find("href").text();
		return l
	},
	parseScale: function(e) {
		if (null == e) return null;
		var l = $(e).text();
		return parseFloat(l)
	},
	parseWidth: function(e) {
		if (null == e) return null;
		var l = $(e).text();
		return parseFloat(l)
	},
	parseFill: function(e) {
		if (null == e) return null;
		var l = $(e).text(),
			t = parseInt(l);
		return 1 == t
	},
	parseOutline: function(e) {
		if (null == e) return null;
		var l = $(e).text(),
			t = parseInt(l);
		return 1 == t
	},
	parseStyleMap: function(e) {
		if (null != e) {
			var l = $(e).attr("id");
			if (null != l) {
				var t = {};
				t.name = l, t.type = "StyleMap", $(e).children().each(function() {
					var e = $(this).find("key").text(),
						l = $(this).find("styleUrl").text();
					null != l && 0 == l.indexOf("#") && (null == e && "" == e || ("normal" == e ? t.normal = l.slice(1, l.length) : "highlight" == e && (t.highlight = l.slice(1, l.length))))
				}), this.styles.push(t)
			}
		}
	},
	parsePlacemark: function(e) {
		if (null == e) return null;
		var l = null,
			t = this,
			n = null,
			r = null;
		$(e).children().each(function() {
			var e = this.tagName;
			switch (e) {
			case "name":
				l = $(this).text();
				break;
			case "styleUrl":
				n = t.parseStyleUrl(this);
				break;
			case "Point":
				r = t.parsePoint(this);
				break;
			case "LineString":
				r = t.parseLineString(this);
				break;
			case "Polygon":
				r = t.parsePolygon(this);
				break;
			case "MultiGeometry":
				r = t.parseMultiGeometry(this)
			}
		});
		var a = $(e).attr("id");
		if (null == a && (a = this.getFid()), null == a) return null;
		var i = (180 * Math.random(), 90 * Math.random(), [l, r]),
			s = new GeoBeans.Feature(this.layer.featureType, a, r, i);
		if (null != n) {
			if (null != r) {
				var o = r.type;
				if (o != GeoBeans.Geometry.Type.COLLECTION) {
					var u = this.getLayerRule(n, o);
					null == u ? (u = this.getRuleByStyle(n, o), null != u && (this.addRule(u), this.addFilterByID(u, a))) : this.addFilterByID(u, a)
				} else for (var y = r.components, h = 0; h < y.length; ++h) {
					var c = y[h];
					if (null != c) {
						var f = c.type,
							m = this.getNormalStyleMap(n),
							u = this.getLayerRule(m, f);
						null == u ? (u = this.getRuleByStyle(n, f), null != u && (this.addRule(u), this.addFilterByID(u, a))) : this.addFilterByID(u, a)
					}
				}
			}
		} else if (null != r) {
			var u = this.getDefaultRuleByGeomType(r.type);
			if (null != u) {
				var p = this.getLayerRule(u.name, r.type);
				null != p ? this.addFilterByID(u, a) : (this.addRule(u), this.addFilterByID(u, a))
			}
		}
		return s
	},
	getLayerRule: function(e, l) {
		if (null == this.layer || null == this.layer.style || null == l) return null;
		for (var t = this.layer.style.rules, n = 0; n < t.length; ++n) {
			var r = t[n];
			if (null != r && r.name == e) {
				var a = r.symbolizer;
				if (null != a) {
					var i = a.type;
					switch (l) {
					case GeoBeans.Geometry.Type.POINT:
						if (i == GeoBeans.Symbolizer.Type.Point) return r;
						break;
					case GeoBeans.Geometry.Type.LINESTRING:
						if (i == GeoBeans.Symbolizer.Type.Line) return r;
						break;
					case GeoBeans.Geometry.Type.POLYGON:
						if (i == GeoBeans.Symbolizer.Type.Polygon) return r
					}
				}
			}
		}
		return null
	},
	getRuleByStyle: function(e, l) {
		if (null == e || null == l) return null;
		for (var t = null, n = null, r = null, a = null, i = null, s = 0; s < this.styles.length; ++s) if (t = this.styles[s], null != t && t.name == e) {
			if ("StyleMap" == t.type) {
				console.log(t);
				var o = t.normal;
				return this.getRuleByStyle(o, l)
			}
			switch (l) {
			case GeoBeans.Geometry.Type.POINT:
				n = t.pointSymbolizer, r = t.textSymbolizer;
				var u = new GeoBeans.Rule;
				return u.name = e, null != n ? u.symbolizer = n : u.symbolizer = this.getDefaultSymbolizer(l).clone(), null != r ? u.textSymbolizer = r : u.textSymbolizer = this.getDefaultTextSymbolizer().clone(), u;
			case GeoBeans.Geometry.Type.LINESTRING:
				a = t.lineSymbolizer;
				var u = new GeoBeans.Rule;
				return u.name = e, null != a ? u.symbolizer = a : u.symbolizer = this.getDefaultSymbolizer(l).clone(), u;
			case GeoBeans.Geometry.Type.POLYGON:
				i = t.polygonSymbolizer, a = t.lineSymbolizer;
				var u = new GeoBeans.Rule;
				return u.name = e, null != i ? (null != i.stroke && null != a && (i.stroke = a.stroke), u.symbolizer = i) : (u.symbolizer = this.getDefaultSymbolizer(l).clone(), null != a && (u.symbolizer.stroke = a.stroke)), u
			}
		}
		return null
	},
	getNormalStyleMap: function(e) {
		if (null == e) return null;
		for (var l = null, t = 0; t < this.styles.length; ++t) if (l = this.styles[t], null != l && l.name == e && "StyleMap" == l.type) {
			var n = l.normal;
			return n
		}
		return null
	},
	parseStyleUrl: function(e) {
		if (null == e) return null;
		var l = $(e).text();
		return 0 == l.indexOf("#") ? l.slice(1, l.length) : null
	},
	parsePoint: function(e) {
		if (null == e) return null;
		var l = $(e).find("coordinates").text(),
			t = this.parsePointCoords(l);
		return t
	},
	parseLineString: function(e) {
		if (null == e) return null;
		var l = $(e).find("coordinates").text(),
			t = this.parseLineStringCoords(l);
		return t
	},
	parsePointCoords: function(e) {
		if (null == e || "" == e.trim()) return null;
		var l = e.split(","),
			t = parseFloat(l[0].trim()),
			n = parseFloat(l[1].trim());
		return null != t && null != n ? new GeoBeans.Geometry.Point(t, n) : null
	},
	parseLineStringCoords: function(e) {
		if (null == e || "" == e.trim()) return null;
		for (var l = [], t = e.replace(/\n/g, " ").trim().split(/[ ]+/), n = 0; n < t.length; ++n) {
			var r = this.parsePointCoords(t[n]);
			null != r && l.push(r)
		}
		if (l.length <= 1) return null;
		var a = new GeoBeans.Geometry.LineString(l);
		return a
	},
	parsePolygon: function(e) {
		if (null == e) return null;
		var l = [],
			t = $(e).find("outerBoundaryIs>LinearRing>coordinates").text(),
			n = this.parseLineStringCoords(t);
		null != n && l.push(n);
		var r = this;
		return $(e).find("innerBoundaryIs>LinearRing>coordinates").each(function() {
			var e = $(this).text(),
				t = r.parseLineStringCoords(e);
			null != t && l.push(t)
		}), 0 == l.length ? null : new GeoBeans.Geometry.Polygon(l)
	},
	parseMultiGeometry: function(e) {
		if (null == e) return null;
		var l = this,
			t = new GeoBeans.Geometry.GeometryCollection;
		return $(e).children().each(function() {
			var e = this.tagName,
				n = null;
			switch (e) {
			case "Point":
				n = l.parsePoint(this);
				break;
			case "LineString":
				n = l.parseLineString(this);
				break;
			case "Polygon":
				n = l.parsePolygon(this)
			}
			null != n && t.addComponent(n)
		}), t
	},
	getDefaultRuleByGeomType: function(e) {
		return e == GeoBeans.Geometry.Type.POINT ? this.pointDefaultRule : e == GeoBeans.Geometry.Type.LINESTRING ? this.lineDefaultRule : e == GeoBeans.Geometry.Type.POLYGON ? this.polygonDefaultRule : null
	},
	getDefaultRule: function(e, l) {
		if (null == e || null == l) return null;
		var t = this.getDefaultSymbolizer(l).clone();
		if (null == t) return null;
		var n = new GeoBeans.Rule;
		return n.name = e, n.symbolizer = t, l == GeoBeans.Geometry.Type.POINT && (n.textSymbolizer = this.getDefaultTextSymbolizer().clone()), n
	},
	createDefaultRules: function(e) {
		if (null != e) {
			var l = [],
				t = $(e).find("Style");
			t.each(function() {
				var e = $(this).attr("id");
				l.push(e)
			});
			for (var n = 0, r = "default_point", a = "default_line", i = "default_polygon", n = null; l.indexOf(r) != -1;) n = 0, r += n;
			for (this.pointDefaultRule = this.getDefaultRule(r, GeoBeans.Geometry.Type.POINT); l.indexOf(a) != -1;) n = 0, a += n;
			for (this.lineDefaultRule = this.getDefaultRule(a, GeoBeans.Geometry.Type.LINESTRING); l.indexOf(i) != -1;) n = 0, i += n;
			this.polygonDefaultRule = this.getDefaultRule(i, GeoBeans.Geometry.Type.POLYGON)
		}
	},
	getDefaultSymbolizer: function(e) {
		var l = null;
		switch (e) {
		case GeoBeans.Geometry.Type.POINT:
			l = new GeoBeans.Symbolizer.PointSymbolizer;
			var t = new GeoBeans.Symbol;
			t.icon = "../images/ylw-pushpin.png", l.symbol = t;
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			l = new GeoBeans.Symbolizer.LineSymbolizer, l.stroke.color.set(255, 0, 0, 1);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			l = new GeoBeans.Symbolizer.PolygonSymbolizer, l.fill.color.set(255, 0, 0, 1), l.stroke.color.set(0, 0, 255, 1)
		}
		return l
	},
	getDefaultTextSymbolizer: function() {
		var e = new GeoBeans.Symbolizer.TextSymbolizer;
		return e.fill.color.set(255, 255, 255, 1), e.stroke.color.set(51, 51, 51, 1), e.stroke.width = 1, e.font.family = "Helvetica", e.font.weight = GeoBeans.Font.WeightType.Bold, e.font.size = 16, e.displaceX = 8, e.displaceY = -5, e.labelProp = "name", e
	}
});
GeoBeans.Label = GeoBeans.Class({
	text: null,
	geometry: null,
	textSymbolizer: null,
	geometryType: null,
	initialize: function() {
		this.geometryType = GeoBeans.Geometry.Type.POINT
	},
	isCollision: function(e) {
		return !0
	},
	computePosition: function(e, n) {},
	adjustPosition: function(e, n) {}
});
GeoBeans.Layer = GeoBeans.Class({
	id: null,
	name: null,
	visible: !0,
	srid: "EPSG:4326",
	extent: null,
	map: null,
	events: null,
	canvas: null,
	renderer: null,
	mapPoint_lt: null,
	mapPoint_rb: null,
	transformation_brf: null,
	flag: null,
	initialize: function(n) {
		this.name = n, this.events = new GeoBeans.Events, this.flag = GeoBeans.Layer.Flag.READY
	},
	destroy: function() {
		this.name = null, this.events = null
	},
	setName: function(n) {
		this.name = n
	},
	setMap: function(n) {
		this.map = n;
		var t = this.map.canvas;
		if (null != t) {
			var e = t.height,
				a = t.width;
			this.canvas = document.createElement("canvas"), this.canvas.height = e, this.canvas.width = a, this.renderer = new GeoBeans.Renderer(this.canvas)
		}
	},
	setVisiable: function(n) {
		this.visible = n
	},
	getExtent: function() {
		return this.extent
	},
	draw: null,
	load: null,
	unregisterEvents: function() {},
	cleanup: function() {},
	setTransformation: function(n) {
		null != n && null != n.view_c && (this.transformation_brf = new GeoBeans.Transformation, this.transformation_brf.map = n.map, this.transformation_brf.scale = n.scale, this.transformation_brf.view_c = new GeoBeans.Geometry.Point(n.view_c.x, n.view_c.y), this.transformation_brf.view_h = n.view_h, this.transformation_brf.view_w = n.view_w, this.transformation_brf.win_cx = n.win_cx, this.transformation_brf.win_cy = n.win_cy, this.transformation_brf.win_h = n.win_h, this.transformation_brf.win_w = n.win_w)
	},
	drawLayerSnap: function() {
		var n = this.map.transformation,
			t = this.map.viewer;
		if (null != t) {
			var e = new GeoBeans.Geometry.Point(t.xmin, t.ymax),
				a = new GeoBeans.Geometry.Point(t.xmax, t.ymin),
				i = this.transformation_brf.toScreenPoint(e.x, e.y),
				r = this.transformation_brf.toScreenPoint(a.x, a.y),
				s = r.x - i.x,
				o = r.y - i.y;
			this.renderer.context.drawImage(this.canvas, i.x, i.y, s, o, 0, 0, this.map.canvas.width, this.map.canvas.height), this.map.renderer.drawImage(this.canvas, 0, 0), this.setTransformation(n)
		}
	},
	up: function(n) {
		if (!(this instanceof GeoBeans.Layer.DBLayer)) return void(null != n && n("涓嶆敮鎸佹鎿嶄綔"));
		for (var t = this.map.groupLayer.getLayers(), e = 0; e < t.length; ++e) {
			var a = t[e];
			if (a == this) {
				var i = e - 1,
					r = t[i];
				if (null == r) return void(null != n && n("宸茬粡鏄簳灞傚浘灞�"));
				for (var s = e; s > i; --s) t[s] = t[s - 1];
				return t[i] = this, void(null != n && n("success"))
			}
		}
		null != n && n("璋冩暣椤哄簭澶辫触")
	},
	down: function(n) {
		if (!(this instanceof GeoBeans.Layer.DBLayer)) return void(null != n && n("涓嶆敮鎸佹鎿嶄綔"));
		for (var t = this.map.groupLayer.getLayers(), e = 0; e < t.length; ++e) {
			var a = t[e];
			if (a == this) {
				var i = e + 1,
					r = t[i];
				if (null == r) return void(null != n && n("宸茬粡鏄《灞傚浘灞�"));
				for (var s = e; s < i; ++s) t[s] = t[s + 1];
				return t[i] = this, void(null != n && n("success"))
			}
		}
		null != n && n("璋冩暣椤哄簭澶辫触")
	},
	CLASS_NAME: "GeoBeans.Layer"
}), GeoBeans.Layer.Flag = {
	READY: "ready",
	LOADED: "loaded",
	ERROR: "error"
};
GeoBeans.Map = GeoBeans.Class({
	TOLERANCE: 20,
	mapDiv: null,
	canvas: null,
	events: null,
	controls: null,
	viewer: null,
	center: null,
	level: null,
	resolution: null,
	layers: null,
	baseLayer: null,
	overlayLayer: null,
	srid: 4326,
	minScale: null,
	maxScale: null,
	width: null,
	height: null,
	renderer: null,
	bgColor: "rgba(255,255,255,1)",
	tolerance: 5,
	transformation: null,
	dragable: !0,
	snap: null,
	groupLayer: null,
	server: null,
	tracker: null,
	queryLayer: null,
	queryTrackLayer: null,
	queryGeometry: null,
	infoWindow: null,
	totalFlag: !0,
	drawLocalFlag: !1,
	panoramaLayer: null,
	imageLayer: null,
	legendList: null,
	hitRippleLayers: null,
	animateCanvas: null,
	baseLayerCanvas: null,
	authTime: null,
	thumbnail: null,
	animationLayer: null,
	rotateAngle: null,
	initialize: function(e, t, a, n, r) {
		var i = document.getElementById(e);
		if (null == i) return null;
		i.innerHTML = "", null != a ? this.extent = a : this.extent = new GeoBeans.Envelope((-180), (-90), 180, 90), null != n && (this.srid = n), null != r ? this.viewer = r : this.viewer = this.extent, this.server = null, this.id = e, this.name = t, this.layers = [], this.legendList = [], this.mapDiv = $("#" + e);
		var s = this.id + "_canvas",
			l = "<canvas id='" + s + "' class='mapCanvas' height='" + $("#" + e).height() + "' width='" + $("#" + e).width() + "'></canvas>";
		this.mapDiv[0].innerHTML = l, this.width = $("#" + e).width(), this.height = $("#" + e).height(), this.center = new GeoBeans.Geometry.Point(0, 0);
		var o = e + "_basecanvas",
			h = "<canvas  id='" + o + "' class='map5-base-canvas' height='" + this.height + "' width='" + this.width + "'></canvas>";
		this.mapDiv[0].innerHTML += h, this.baseLayerCanvas = document.getElementById(o), this.baseLayerRenderer = new GeoBeans.Renderer(this.baseLayerCanvas), this.transformation = new GeoBeans.Transformation(this), this.canvas = document.getElementById(s), this.renderer = new GeoBeans.Renderer(this.canvas), this.controls = new GeoBeans.Control.Controls(this);
		var u = new GeoBeans.Control.DragMapControl(this);
		u.enable(!0), this.controls.add(u);
		var y = new GeoBeans.Control.SrollMapControl(this);
		y.enable(!0), this.controls.add(y);
		var v = new GeoBeans.Control.TrackControl;
		this.tracker = v, this.controls.add(v);
		var c = new GeoBeans.Control.ZoomControl;
		this.controls.add(c), null == this.mapNavControl && (this.mapNavControl = new GeoBeans.Control.MapNavControl(this), this.mapNavControl.setEnable(!1)), this.overlayLayer = new GeoBeans.Layer.OverlayLayer("overlay"), this.overlayLayer.setMap(this), this.groupLayer = new GeoBeans.Layer.GroupLayer(this.server, this.name), this.groupLayer.setMap(this), this.panoramaLayer = new GeoBeans.Layer.PanoramaLayer("panorama"), this.panoramaLayer.setMap(this), this.imageLayer = new GeoBeans.Layer.ImageLayer("imageLayer"), this.imageLayer.setMap(this), this.hitRippleLayers = [], null != this.viewer && this.setViewer(this.viewer), this.maplex = new GeoBeans.Maplex(this), this.events = [];
		var d, f = this;
		window.onresize = function(e) {
			clearTimeout(d), d = setTimeout(function() {
				var t = f.mapDiv.height(),
					a = f.mapDiv.width();
				if (0 != t && 0 != a && (t != f.canvas.height || a != f.canvas.width)) {
					console.log("before:height[" + f.canvas.height + "]"), console.log("before:width[" + f.canvas.width + "]"), f.canvas.height = t, f.canvas.width = a, console.log("after:height[" + f.canvas.height + "]"), console.log("after:width[" + f.canvas.width + "]"), f.height = t, f.width = a;
					var n = f.viewer;
					if (null != n) {
						var r = n.xmin,
							i = n.xmax,
							s = n.ymin,
							l = n.ymax;
						if (!($.isNumeric(r) && $.isNumeric(i) && $.isNumeric(s) && $.isNumeric(l))) return
					}
					if (null != f.viewer) {
						if (null != f.baseLayer) {
							var o = f.baseLayer.canvas;
							null != o && (o.height = t, o.width = a), f.baseLayer.scale = 1;
							var h = f.level;
							f.resolution = f.baseLayer.getResolution(h), f.updateMapExtent(f.resolution);
							var u = f.center;
							f.setCenter(u)
						}
						var y = null;
						y = "width" == e ? f.scaleViewWidth(f.viewer) : "height" == e ? f.scaleViewHeight(f.viewer) : f.scaleView(f.viewer), f.viewer = y, console.log(f.viewer.toString()), f.transformation.update();
						for (var v = f.layers, c = 0; c < v.length; ++c) {
							var d = v[c];
							if (null != d) {
								var g = d.canvas;
								null != g && (g.height = t, g.width = a);
								var p = d.bufferCanvas;
								null != p && (p.height = t, p.width = a);
								var L = d.featureLayerCanvas;
								null != L && (L.height = t, L.width = a)
							}
						}
						var m = f.groupLayer;
						null != m && (m.canvas.height = t, m.canvas.width = a, m.flag = GeoBeans.Layer.Flag.READY), f.draw()
					}
				}
			}, 250)
		};
		var g = window.onresize;
		g.apply(window, []), this.queryLayer = new GeoBeans.Layer.FeatureLayer.QueryLayer("query"), this.queryLayer.setMap(this);
		var p = "<div class='infoWindow' data-toggle='popover' title='Info' data-content=''></div>";
		$("#" + e).append(p), this.infoWindow = this.mapDiv.find(".infoWindow"), void 0 != this.infoWindow && void 0 != this.infoWindow.popover && this.infoWindow.popover({
			animation: !1,
			trigger: "manual",
			placement: "top",
			html: !0
		});
		var L = "<div class='map5-copyright'>GeoBeans 漏 </div>";
		$("#" + e).append(L);
		var m = "<div class='map5-tooltip'></div>";
		this.mapDiv.append(m), this.authTime = new Date("2016-07-26 00:00:00")
	},
	destroy: function() {
		this.mapDiv.find(".chart-legend ").remove(), this.mapDiv.find("canvas").remove(), this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height), this.setNavControl(!1), this.controls.cleanup(), this.infoWindow.popover("destroy"), this.unRegisterMapRippleHitEvent(), this.controls.cleanup(), this.canvas = null, this.animateCanvas = null, this.baseLayerCanvas = null, this.renderer = null, this.layers = null, this.transformation = null, this.controls = null, this.infoWindow = null, this.stopAnimate(), this.mapDiv = null
	},
	close: function() {
		this.destroy()
	},
	resize: function(e) {
		var t = window.onresize;
		t.apply(window, [e])
	},
	getLayer: function(e) {
		if (null != e) {
			for (var t = null, a = this.groupLayer.getLayers(), n = null, r = 0; r < a.length; ++r) if (n = a[r], n.name == e) return n;
			for (var r = 0; r < this.layers.length; ++r) {
				var t = this.layers[r];
				if (t.name == e) return t
			}
		}
	},
	addLayer: function(e) {
		if (null == e) return "";
		var t = this.getLayer(e.name);
		if (null != t) return console.log("this map has [" + e.name + "] layer"), "this map has [" + e.name + "] layer";
		if (e instanceof GeoBeans.Layer.ChartLayer) {
			var t = this.getLayer(e.baseLayerName);
			if (null == t) return console.log("this map does not has [" + e.baseLayerName + "] layer"), "this map does not has [" + e.baseLayerName + "] layer";
			if (e instanceof GeoBeans.Layer.RangeChartLayer) {
				var a = t.featureType.getFieldIndex(e.baseLayerField);
				if (a == -1) return console.log("layer does not has this field[" + e.baseLayerField + "]"), "layer does not has this field[" + e.baseLayerField + "]"
			}
			if (e instanceof GeoBeans.Layer.HeatMapLayer) {
				var n = t.getGeomType();
				if (n != GeoBeans.Geometry.Type.POINT) return console.log("base layer is not point layer"), "base layer is not point layer"
			}
		}
		this.layers.push(e), e instanceof GeoBeans.Layer.TileLayer && null == this.baseLayer && (this.baseLayer = e), e.setMap(this)
	},
	removeLayer: function(e, t) {
		if (null != e) {
			var a = this.getLayer(e);
			if (null != a) for (var n = this.layers, r = 0; r < n.length; ++r) if (a.name == n[r].name) {
				a == this.baseLayer && this.removeBaseLayer(), this.layers.splice(r, 1), a.destroy(), a = null, void 0 != t && t("success");
				break
			}
		}
	},
	removeBaseLayer: function() {
		for (var e = this.baseLayer.name, t = null, a = 0; a < this.layers.length; ++a) t = this.layers[a], t instanceof GeoBeans.Layer.TileLayer && t != this.baseLayer && (this.baseLayer = t);
		this.baseLayer.name == e && (this.baseLayer = null, this.level = null), this.baseLayerRenderer.clearRect()
	},
	setViewer: function(e) {
		if (null != e) if (null != this.baseLayer) {
			var t = this.getLevel(e);
			this._setLevel(t);
			var a = e.getCenter();
			this.setCenter(a)
		} else this.viewer = this.scaleView(e), this.transformation.update()
	},
	getViewer: function() {
		return this.viewer
	},
	setCenter: function(e) {
		if (null != this.viewer) {
			var t = e.x - this.center.x,
				a = e.y - this.center.y;
			this.viewer.offset(t, a), this.center = e, this.transformation.update()
		} else this.center = e
	},
	getCenter: function() {
		return this.center
	},
	offset: function(e, t) {
		null != this.viewer ? (this.viewer.offset(e, t), this.center.x += e, this.center.y += t, this.transformation.update()) : (this.center.x += e, this.center.y += t)
	},
	setLevel: function(e) {
		this.level = e, null != this.baseLayer && (this.baseLayer.imageScale = 1, this.resolution = this.baseLayer.getResolutionByLevel(e), this.updateMapExtent(this.resolution), this.transformation.update())
	},
	_setLevel: function(e) {
		this.level = e, null != this.baseLayer && (this.resolution = this.baseLayer.getResolution(e), this.updateMapExtent(this.resolution), this.transformation.update())
	},
	formulateExtent: function(e) {},
	setResolution: function(e) {
		this.resolution = e
	},
	setBaseLayer: function(e) {
		if (null != this.baseLayer && this.removeBaseLayer(), this.baseLayer = e, null != this.baseLayer) {
			var t = this.baseLayerCanvas;
			if (null == t) {
				var a = this.id + "_canvas",
					n = this.id + "_basecanvas",
					r = "<canvas  id='" + n + "' class='map5-base-canvas' height='" + this.canvas.height + "' width='" + this.canvas.width + "'></canvas>";
				this.mapDiv.find("#" + a).after(r), this.baseLayerCanvas = document.getElementById(n)
			}
			this.baseLayer.map = this, this.baseLayer.canvas = this.baseLayerCanvas, this.baseLayer.renderer = new GeoBeans.Renderer(this.baseLayerCanvas)
		}
	},
	getBaseLayer: function() {
		return this.baseLayer
	},
	updateMapExtent: function(e) {
		var t = this.center.x,
			a = this.center.y,
			n = this.width,
			r = this.height,
			i = e * n / 2,
			s = e * r / 2,
			l = t - i,
			o = t + i,
			h = a - s,
			u = a + s;
		null != this.viewer ? (this.viewer.xmin = l, this.viewer.xmax = o, this.viewer.ymin = h, this.viewer.ymax = u) : this.viewer = new GeoBeans.Envelope(l, h, o, u);
		this.viewer
	},
	getLevel: function(e) {
		if (null == e) return this.level;
		var t = e.getCenter().x,
			a = e.getCenter().y,
			n = this.width,
			r = (this.height, t - e.xmin),
			i = (a - e.ymin, 2 * r / n);
		if (null == this.baseLayer) return null;
		var s = this.baseLayer.getLevel(i);
		return null == s ? 1 : s
	},
	getMaxLevel: function() {
		for (var e = null, t = null, a = 0; a < this.layers.length; ++a) if (e = this.layers[a], e instanceof GeoBeans.Layer.TileLayer) {
			var n = e.getMaxLevel();
			null == t ? t = n : n > t && (t = n)
		}
		return t
	},
	getMinLevel: function() {
		for (var e = null, t = null, a = 0; a < this.layers.length; ++a) if (e = this.layers[a], e instanceof GeoBeans.Layer.TileLayer) {
			var n = e.getMinLevel();
			null == t ? t = n : n < t && (t = n)
		}
		return t
	},
	draw: function() {
		new Date;
		this.time = new Date;
		for (var e = null, t = 0, a = 0; a < this.layers.length; ++a) if (e = this.layers[a], e instanceof GeoBeans.Layer.TileLayer) {
			if (null == this.level) {
				var n = this.getLevel(this.viewer);
				this.level = n
			}
			e.visible && (t++, e.preDraw(), e.loadingTiles(this.drawBaseLayerCallback))
		}
		0 == t && (this.baseLayerRenderer.clearRect(), this.baseLayerSnap = null), this.drawLayersAll(), this.mapNavControl.setZoomSlider(this.level)
	},
	drawBaseLayerCallback: function(e) {},
	drawLayersAll: function() {
		this.maplex.cleanup(), 0 != this.groupLayer.getLayers().length && (this.totalFlag ? this.groupLayer.loadTotal() : this.groupLayer.load());
		for (var e = 0; e < this.layers.length; ++e) {
			var t = this.layers[e];
			!t.visible || t instanceof GeoBeans.Layer.TileLayer || t.load()
		}
		if (this.overlayLayer.load(), this.queryLayer.load(), this.panoramaLayer.load(), this.imageLayer.load(), 0 == this.groupLayer.getLayers().length || this.groupLayer.flag != GeoBeans.Layer.Flag.READY) {
			for (var e = 0; e < this.layers.length; ++e) {
				var t = this.layers[e];
				if (t.visible && !(t instanceof GeoBeans.Layer.TileLayer) && t.flag != GeoBeans.Layer.Flag.LOADED) return
			}
			var a = this.overlayLayer.getLoadFlag();
			if (a == GeoBeans.Layer.Flag.LOADED && this.queryLayer.flag == GeoBeans.Layer.Flag.LOADED) {
				var n = this.panoramaLayer.getLoadFlag();
				if (n == GeoBeans.Layer.Flag.LOADED) {
					var r = this.imageLayer.getLoadFlag();
					if (r == GeoBeans.Layer.Flag.LOADED) {
						if (this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height), 0 != this.groupLayer.getLayers().length && this.groupLayer.visible && this.groupLayer.flag == GeoBeans.Layer.Flag.LOADED) {
							var i = this.groupLayer.canvas;
							this.renderer.drawImage(i, 0, 0, i.width, i.height);
							for (var s = this.groupLayer.getLayers(), e = 0; e < s.length; ++e) {
								var l = s[e],
									o = l.heatMapLayer;
								if (null != o) {
									var h = o.canvas;
									null != h && o.visible && l.visible && this.renderer.drawImage(h, 0, 0, h.width, h.height)
								}
							}
						}
						for (var e = 0; e < this.layers.length; ++e) {
							var t = this.layers[e];
							if (!(t instanceof GeoBeans.Layer.RippleLayer)) if (!t.visible || t instanceof GeoBeans.Layer.TileLayer) t instanceof GeoBeans.Layer.ChartLayer && t.hideLegend();
							else {
								var h = t.canvas;
								null != h && this.renderer.drawImage(h, 0, 0, h.width, h.height);
								var u = t.hitCanvas;
								null != u && this.renderer.drawImage(u, 0, 0, u.width, u.height);
								var y = t.clickCanvas;
								null != y && this.renderer.drawImage(y, 0, 0, y.width, y.height);
								var v = t.bufferCanvas;
								null != v && this.renderer.drawImage(v, 0, 0, v.width, v.height), t instanceof GeoBeans.Layer.ChartLayer && t.showLegend()
							}
						}
						var h = this.overlayLayer.canvas;
						this.renderer.drawImage(h, 0, 0, h.width, h.height);
						var c = this.overlayLayer.hitCanvas;
						null != c && this.renderer.drawImage(c, 0, 0, c.width, c.height);
						var d = this.overlayLayer.editCanvas;
						null != d && this.renderer.drawImage(d, 0, 0, d.width, d.height);
						var f = this.overlayLayer.clickCanvas;
						null != f && this.renderer.drawImage(f, 0, 0, f.width, f.height);
						var g = this.queryLayer.canvas;
						null != g && this.renderer.drawImage(g, 0, 0, g.width, g.height);
						var p = this.panoramaLayer.canvas;
						null != p && this.renderer.drawImage(p, 0, 0, p.width, p.height);
						var L = this.imageLayer.canvas;
						null != L && this.renderer.drawImage(L, 0, 0, L.width, L.height);
						var m = this;
						if (null != this.infoWindow) {
							var w = this.mapDiv.find(".popover");
							if (1 == w.length) {
								var B = this.infoWindow.attr("x"),
									b = this.infoWindow.attr("y");
								if (!this.viewer.contain(B, b)) return this.infoWindow.popover("hide"), void m.queryLayer.clearFeatures();
								var C = this.transformation.toScreenPoint(B, b);
								this.infoWindow.css("left", C.x + "px"), this.infoWindow.css("top", C.y + "px"), this.infoWindow.popover("hide").popover("show"), this.mapDiv.find(".popover-title").append('<button type="button" class="close">&times;</button>'), this.mapDiv.find(".popover-title .close").click(function() {
									$(this).parents(".popover").popover("hide")
								})
							}
						}
						this.maplex.draw();
						var x = this.maplex.canvas;
						null != x && this.renderer.drawImage(x, 0, 0, x.width, x.height)
					}
				}
			}
		}
	},
	drawCache: function() {
		this.drawBackground(), null != this.baseLayer && this.baseLayer.drawCache()
	},
	drawBackground: function() {
		this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height), this.baseLayerRenderer.clearRect(0, 0, this.baseLayerCanvas.width, this.baseLayerCanvas.height), this.renderer.restore(), this.baseLayerRenderer.restore()
	},
	enableDrag: function(e) {
		var t = this.controls.find(GeoBeans.Control.Type.DRAG_MAP);
		t >= 0 && this.controls.get(t).enable(e)
	},
	enableScroll: function(e) {
		var t = this.controls.find(GeoBeans.Control.Type.SCROLL_MAP);
		t >= 0 && this.controls.get(t).enable(e)
	},
	addEventListener: function(e, t) {
		var a = this,
			n = function(e) {
				e.preventDefault();
				var n = e.layerX,
					r = e.layerY;
				if (null != a.transformation) {
					var i = a.transformation.toMapPoint(n, r),
						s = new GeoBeans.Event.MouseArgs;
					s.buttn = null, s.X = n, s.Y = r, s.mapX = i.x, s.mapY = i.y, s.level = a.level, t(s)
				}
			};
		this.mapDiv[0].addEventListener(e, n), this.events.push({
			event: e,
			handler: t,
			eventHandler: n
		})
	},
	removeEventListener: function(e, t) {
		var a = this._getEventHandler(e, t);
		this.mapDiv[0].removeEventListener(e, a), this._removeEventHandler()
	},
	_getEventHandler: function(e, t) {
		for (var a = 0; a < this.events.length; ++a) {
			var n = this.events[a];
			if (n.event == e && n.handler == t) return n.eventHandler
		}
		return null
	},
	_removeEventHandler: function(e, t) {
		for (var a = 0; a < this.events.length; ++a) {
			var n = this.events[a];
			n.event == e && n.handler == t && this.events.splice(a, 1)
		}
	},
	addWheelEventListener: function(e) {
		if (null != e) {
			var t = this.controls.find(GeoBeans.Control.Type.SCROLL_MAP),
				a = this.controls.get(t);
			null != a && (a.userHandler = e)
		}
	},
	removeWheelEventListener: function(e) {
		var t = this.controls.find(GeoBeans.Control.Type.SCROLL_MAP),
			a = this.controls.get(t);
		null != a && (a.userHandler = null)
	},
	addBeginDragEventListener: function(e) {
		if (null != e) {
			var t = this.controls.find(GeoBeans.Control.Type.DRAG_MAP),
				a = this.controls.get(t);
			null != a && (a.beginDragHandler = e)
		}
	},
	addDraggingEventListener: function(e) {
		if (null != e) {
			var t = this.controls.find(GeoBeans.Control.Type.DRAG_MAP),
				a = this.controls.get(t);
			null != a && (a.dragingHandler = e)
		}
	},
	addEndDragEventListener: function(e) {
		if (null != e) {
			var t = this.controls.find(GeoBeans.Control.Type.DRAG_MAP),
				a = this.controls.get(t);
			null != a && (a.endDragHandler = e)
		}
	},
	removeBeginDragEventListener: function() {
		var e = this.controls.find(GeoBeans.Control.Type.DRAG_MAP),
			t = this.controls.get(e);
		null != t && (t.beginDragHandler = null)
	},
	removeDraggingEventListener: function(e) {
		var t = this.controls.find(GeoBeans.Control.Type.DRAG_MAP),
			a = this.controls.get(t);
		null != a && (a.dragingHandler = null)
	},
	removeEndDragEventListener: function(e) {
		var t = this.controls.find(GeoBeans.Control.Type.DRAG_MAP),
			a = this.controls.get(t);
		null != a && (a.endDragHandler = null)
	},
	scaleView: function(e) {
		if (null == e) return null;
		var t = e.getWidth() / e.getHeight(),
			a = this.width / this.height;
		this.center = e.getCenter();
		var n = null;
		if (t > a) {
			var r = e.getWidth() / 2,
				i = r / a;
			n = new GeoBeans.Envelope(e.xmin, this.center.y - i, e.xmax, this.center.y + i)
		} else {
			var i = e.getHeight() / 2,
				r = i * a;
			n = new GeoBeans.Envelope(this.center.x - r, e.ymin, this.center.x + r, e.ymax)
		}
		return n
	},
	scaleViewWidth: function(e) {
		if (null == e) return null;
		this.center = e.getCenter();
		var t = this.width / this.height,
			a = e.getHeight() / 2,
			n = a * t,
			r = new GeoBeans.Envelope(this.center.x - n, e.ymin, this.center.x + n, e.ymax);
		return r
	},
	scaleViewHeight: function(e) {
		if (null == e) return null;
		this.center = e.getCenter();
		var t = this.width / this.height,
			a = e.getWidth() / 2,
			n = a / t,
			r = new GeoBeans.Envelope(e.xmin, this.center.y - n, e.xmax, this.center.y + n);
		return r
	},
	screenCopy: function() {
		var e = this.renderer.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		return e
	},
	saveSnap: function() {
		this.snap = this.renderer.context.getImageData(0, 0, this.canvas.width, this.canvas.height), this.baseLayerSnap = this.baseLayerRenderer.context.getImageData(0, 0, this.baseLayerCanvas.width, this.baseLayerCanvas.height);
		for (var e = 0; e < this.layers.length; ++e) {
			var t = this.layers[e];
			t instanceof GeoBeans.Layer.TileLayer && (t.snap = t.renderer.context.getImageData(0, 0, t.canvas.width, t.canvas.height))
		}
	},
	restoreSnap: function() {
		null != this.snap && this.renderer.context.putImageData(this.snap, 0, 0), null != this.baseLayerSnap && null != this.baseLayer && this.baseLayer.renderer.context.putImageData(this.baseLayerSnap, 0, 0)
	},
	putSnap: function(e, t) {
		"undefined" == e && (e = 0), "undefined" == t && (t = 0), null != this.snap && this.renderer.context.putImageData(this.snap, e, t), null != this.baseLayerSnap && this.baseLayerRenderer.context.putImageData(this.baseLayerSnap, e, t)
	},
	cleanupSnap: function() {
		this.snap = null, this.baseLayerSnap = null;
		for (var e = 0; e < this.layers.length; ++e) {
			var t = this.layers[e];
			t instanceof GeoBeans.Layer.TileLayer && (t.snap = null)
		}
	},
	drawBaseLayerSnap: function(e) {
		var t = (this.center.x, this.center.y, null),
			a = null,
			n = null,
			r = null,
			i = e - this.level,
			s = Math.pow(2, i);
		if (n = this.width * s, r = this.height * s, t = 0 - .5 * ((Math.pow(2, i) - 1) * this.width), a = 0 - .5 * ((Math.pow(2, i) - 1) * this.height), t = 0 - .5 * ((Math.pow(2, i) - 1) * this.width), a = 0 - .5 * ((Math.pow(2, i) - 1) * this.height), null != this.baseLayerSnap) {
			var l = $("<canvas>").attr("width", this.baseLayerSnap.width).attr("height", this.baseLayerSnap.height)[0];
			l.getContext("2d").putImageData(this.baseLayerSnap, 0, 0), this.baseLayerRenderer.context.drawImage(l, t, a, n, r)
		}
		if (null != this.snap) {
			var o = $("<canvas>").attr("width", this.snap.width).attr("height", this.snap.height)[0];
			o.getContext("2d").putImageData(this.snap, 0, 0), this.renderer.context.drawImage(o, t, a, n, r)
		}
		for (var h = 0; h < this.layers.length; ++h) {
			var u = this.layers[h];
			if (u instanceof GeoBeans.Layer.TileLayer && e < u.getMaxLevel() && e > u.getMinLevel()) {
				var y = $("<canvas>").attr("width", u.snap.width).attr("height", u.snap.height)[0];
				y.getContext("2d").putImageData(u.snap, 0, 0), u.renderer.clearRect(0, 0, u.canvas.width, u.canvas.height), u.renderer.context.drawImage(y, t, a, n, r)
			}
		}
	},
	drawLayersSnap: function(e) {
		var t = (this.center.x, this.center.y, null),
			a = null,
			n = null,
			r = null;
		if (n = this.width / e, r = this.height / e, t = this.width / 2 - .5 * n, a = this.height / 2 - .5 * r, null != this.snap) {
			var i = $("<canvas>").attr("width", this.snap.width).attr("height", this.snap.height)[0];
			i.getContext("2d").putImageData(this.snap, 0, 0), this.renderer.context.drawImage(i, t, a, n, r)
		}
		if (null != this.baseLayerSnap) {
			var s = $("<canvas>").attr("width", this.baseLayerSnap.width).attr("height", this.baseLayerSnap.height)[0];
			s.getContext("2d").putImageData(this.baseLayerSnap, 0, 0), this.baseLayerRenderer.context.drawImage(s, t, a, n, r)
		}
		for (var l = 0; l < this.layers.length; ++l) {
			var o = this.layers[l];
			if (o instanceof GeoBeans.Layer.TileLayer) {
				var h = $("<canvas>").attr("width", o.snap.width).attr("height", o.snap.height)[0];
				h.getContext("2d").putImageData(o.snap, 0, 0), o.renderer.clearRect(0, 0, o.canvas.width, o.canvas.height), o.renderer.context.drawImage(h, t, a, n, r)
			}
		}
	},
	_updateTile: function(e, t, a, n, n) {
		if (null != e) {
			this.baseLayerRenderer.save();
			var r = this.width,
				i = this.height;
			if (null != this.rotateAngle ? (this.baseLayerRenderer.context.translate(r / 2, i / 2), this.baseLayerRenderer.context.rotate(this.rotateAngle * Math.PI / 180), this.baseLayerRenderer.context.translate(-r / 2, -i / 2), this.baseLayerRenderer.context.clearRect(t, a, n, n)) : this.baseLayerRenderer.context.clearRect(t, a, n, n), null != this.layers) {
				for (var s = 0; s < this.layers.length; ++s) {
					var l = this.layers[s];
					if (l instanceof GeoBeans.Layer.TileLayer && l.visible) if (null != this.rotateAngle) {
						var o = l.getRotateCanvas();
						if (null != o) {
							var h = o.width / 4 + t,
								u = o.height / 4 + a;
							h = Math.floor(h + .5), u = Math.floor(u + .5), this.baseLayerRenderer.drawImageParms(o, h, u, n, n, t, a, n, n)
						}
					} else this.baseLayerRenderer.drawImageParms(l.canvas, t, a, n, n, t, a, n, n)
				}
				this.baseLayerRenderer.restore()
			}
		}
	},
	setNavControl: function(e) {
		null == this.mapNavControl && (this.mapNavControl = new GeoBeans.Control.MapNavControl(this)), this.mapNavControl.setEnable(e)
	},
	setNavControlPosition: function(e, t) {
		this.mapNavControl.setPosition(e, t)
	},
	addOverlay: function(e) {
		this.overlayLayer.addOverlay(e)
	},
	addOverlays: function(e) {
		this.overlayLayer.addOverlays(e)
	},
	removeOverlay: function(e) {
		this.overlayLayer.removeOverlay(e)
	},
	removeOverlayObj: function(e) {
		this.overlayLayer.removeOverlayObj(e)
	},
	removeOverlays: function(e) {
		this.overlayLayer.removeOverlays(e)
	},
	clearOverlays: function() {
		this.overlayLayer.clearOverlays()
	},
	getOverlays: function() {
		return this.overlayLayer.overlays
	},
	getOverlay: function(e) {
		return this.overlayLayer.getOverlay(e)
	},
	setFitView: function(e) {
		if (null != e) {
			var t = e.getExtent();
			this.viewer = this.scaleView(t), this.transformation.update();
			var a = this.getLevel(this.viewer);
			this.setLevel(a), this.draw()
		}
	},
	setOverlayVisible: function(e, t) {
		null != e && (e.visible = t)
	},
	_getTrackOverlayControl: function() {
		var e = this.controls.find(GeoBeans.Control.Type.TRACKOVERLAY);
		if (e < 0) {
			var t = new GeoBeans.Control.TrackOverlayControl;
			return this.controls.add(t), t
		}
		return this.controls.get(e)
	},
	drawMarker: function(e, t) {
		if (null != e) {
			var a = this._getTrackOverlayControl();
			null != a && a.trackMarker(e, t)
		}
	},
	drawPolyline: function(e, t) {
		if (null != e) {
			var a = this._getTrackOverlayControl();
			null != a && a.trackLine(e, t)
		}
	},
	drawPolygon: function(e, t) {
		if (null != e) {
			var a = this._getTrackOverlayControl();
			null != a && a.trackPolygon(e, t)
		}
	},
	registerOverlayEvent: function() {
		this.overlayLayer.registerHitEvent()
	},
	unregisterOverlayEvent: function() {
		this.overlayLayer.unregisterHitEvent()
	},
	registerInfoWindowEvent: function() {
		this.overlayLayer.registerInfoWindowEvent()
	},
	unRegisterInfoWindowEvent: function() {
		this.overlayLayer.unRegisterInfoWindowEvent()
	},
	registerOverlayClickEvent: function(e) {
		this.overlayLayer.registerOverlayClickEvent(e)
	},
	unRegisterOverlayClickEvent: function() {
		this.overlayLayer.unRegisterOverlayClickEvent()
	},
	queryByRect: function(e, t, a, n) {
		if (null != e) {
			var r = this.getLayer(e);
			if (null == r) return void a("map has not this layer");
			this.queryLayer.clearFeatures(), this.queryLayer.maxFeatures = n, this.queryTrackLayer = null, this.queryGeometry = null, this.tracker.trackRect(this.trackRect_callback, this, r, t, a)
		}
	},
	trackRect_callback: function(e, t, a, n, r) {
		if (null != e) {
			t.tracker.end(), t.queryGeometry = e, t.queryTrackLayer = a, t.queryLayer.setLayer(a, n);
			var i = new GeoBeans.BBoxFilter(a.featureType.geomFieldName, e);
			a.getFeatureFilter(i, t.queryLayer.maxFeatures, null, null, r)
		}
	},
	queryByBufferCircle: function(e, t, a, n) {
		if (null != e) {
			var r = this.getLayer(e);
			if (null == r) return void a("map has not this layer");
			this.queryLayer.clearFeatures(), this.queryLayer.maxFeatures = n, this.queryTrackLayer = null, this.queryGeometry = null;
			var i = this.getBufferTracker();
			this.queryLayer.setLayer(r, t), i.trackBufferCircle(r, a, this.callbackQueryByBufferTrack)
		}
	},
	queryByBufferLine: function(e, t, a, n, r) {
		if (null != e) {
			var i = this.getLayer(e);
			if (null == i) return void n("map has not this layer");
			this.queryLayer.clearFeatures(), this.queryLayer.maxFeatures = r, this.queryTrackLayer = null, this.queryGeometry = null;
			var s = this.getBufferTracker();
			this.queryLayer.setLayer(i, a), s.trackBufferLine(i, t, n, this.callbackQueryByBufferTrack)
		}
	},
	queryByBufferPolygon: function(e, t, a, n, r) {
		if (null != e) {
			var i = this.getLayer(e);
			if (null == i) return void n("map has not this layer");
			this.queryLayer.clearFeatures(), this.queryLayer.maxFeatures = r, this.queryTrackLayer = null, this.queryGeometry = null;
			var s = this.getBufferTracker();
			this.queryLayer.setLayer(i, a), s.trackBufferPolygon(i, t, n, this.callbackQueryByBufferTrack)
		}
	},
	getBufferTracker: function() {
		var e = this.controls.find(GeoBeans.Control.Type.TRACKBUFFER);
		if (e == -1) {
			var t = new GeoBeans.Control.TrackBufferControl;
			return this.controls.add(t), t
		}
		return this.controls.get(e)
	},
	_getBufferTracker: function() {
		var e = this.controls.find(GeoBeans.Control.Type.TRACKBUFFER);
		return e == -1 ? null : this.controls.get(e)
	},
	callbackQueryByBufferTrack: function(e, t, a, n) {
		if (!(null == a || t < 0)) {
			var r = e.map,
				i = new GeoBeans.DistanceBufferFilter(e.featureType.geomFieldName, a, t),
				s = r.queryLayer.maxFeatures;
			e.getFeatureFilter(i, s, null, null, n), r.queryLayer.maxFeatures = null
		}
	},
	getQuerySelection: function() {
		return this.queryLayer.features
	},
	setFeatureBlink: function(e, t) {
		null != e && null != t && this.queryLayer.setFeatureBlink(e, t)
	},
	queryByClick: function(e, t) {
		if (this.endQuery(), null != e) {
			var a = this.getLayer(e);
			null != a && a.type == GeoBeans.Layer.DBLayer.Type.Feature && this.tracker.trackInfo(this.queryByClick_callback, a, this, t)
		}
	},
	queryByClick_callback: function(e, t, a, n) {
		if (null != e && null != t) {
			var r = a.transformation.toMapPoint(e.x, e.y),
				i = 5,
				s = new GeoBeans.Geometry.Point(e.x - i / 2, e.y - i / 2),
				l = new GeoBeans.Geometry.Point(e.x + i / 2, e.y + i / 2),
				o = a.transformation.toMapPoint(s.x, s.y),
				h = a.transformation.toMapPoint(l.x, l.y),
				u = new GeoBeans.Envelope(o.x, h.y, h.x, o.y),
				y = t.getFeatureType();
			if (null != y) {
				var v = {
					map: a,
					layer: t,
					callback: n,
					point: r
				};
				if (t.geomType == GeoBeans.Geometry.Type.POLYGON || t.geomType == GeoBeans.Geometry.Type.MULTIPOLYGON) y.getFeaturesWithinAsync(a.name, null, r, a.getClickFeatures_callback, null, v);
				else {
					var c = new GeoBeans.BBoxFilter;
					c.extent = u;
					var d = y.geomFieldName;
					c.propName = d, y.getFeaturesFilterAsync2(a.name, null, c, null, null, null, null, v, a.getClickFeatures_callback)
				}
			}
		}
	},
	getClickFeatures_callback: function(e, t) {
		if (null != t && null != e) {
			var a = e.map,
				n = e.callback,
				r = e.layer,
				i = e.point;
			if (null != a && null != n && null != e && null != i) {
				if (null == t || 0 == t.length) return a.infoWindow.popover("hide"), void a.queryLayer.clearFeatures();
				var s = t[0];
				null != n && n(r, s, i), a.queryLayer.setLayer(r), a.queryLayer.setFeatures([s]), a.drawLayersAll()
			}
		}
	},
	queryByPolygon: function(e, t) {
		if (null != e) {
			var a = this.getLayer(e);
			null != a && a.type == GeoBeans.Layer.DBLayer.Type.Feature && (this.queryLayer.clearFeatures(), this.queryTrackLayer = null, this.queryGeometry = null, this.tracker.trackPolygon(this.trackPolygon_callback, this, a, t))
		}
	},
	trackPolygon_callback: function(e, t, a, n) {
		if (null != e && null != t && null != a) {
			t.tracker.end(), t.queryGeometry = e, t.queryTrackLayer = a, t.queryLayer.setLayer(a);
			var r = new GeoBeans.SpatialFilter;
			r.geometry = e, r.operator = GeoBeans.SpatialFilter.OperatorType.SpOprIntersects;
			var i = a.getFeatureType(),
				s = i.geomFieldName;
			r.propName = s, a.getFeatureFilterCountAsync(r, n)
		}
	},
	endQuery: function() {
		this.tracker.end(), this.queryLayer.clearFeatures(), this.infoWindow.popover("hide")
	},
	openInfoWindow: function(e, t) {
		if (null != e && null != t) {
			var a = t.x,
				n = t.y,
				r = this.transformation.toScreenPoint(a, n),
				i = r.x,
				s = r.y;
			this.infoWindow.attr("x", a), this.infoWindow.attr("y", n), this.infoWindow.css("left", i + "px"), this.infoWindow.css("top", s + "px");
			var l = e.getTitle(),
				o = e.getContent();
			this.infoWindow.popover("hide").attr("data-content", o).attr("data-original-title", l).popover("show"), this.mapDiv.find(".popover-title").append('<button type="button" class="close">&times;</button>'), this.mapDiv.find(".popover-title .close").click(function() {
				$(this).parents(".popover").popover("hide")
			})
		}
	},
	closeInfoWindow: function() {
		null != this.infoWindow && this.infoWindow.popover("hide")
	},
	zoomToLayer: function(e) {
		if (null != e) {
			var t = this.getLayer(e);
			if (null != t) {
				t instanceof GeoBeans.Layer.DBLayer && t.update();
				var a = t.getExtent();
				if (null != a) {
					if (null != this.baseLayer) {
						var n = this.getLevel(a);
						if (null == n) return;
						var r = a.getCenter();
						this.setLevel(n), this.setCenter(r)
					} else this.setViewer(a);
					this.draw()
				}
			}
		}
	},
	zoomToBaseLayer: function() {
		if (null != this.baseLayer) {
			var e = this.baseLayer.extent;
			if (null != e || (this.baseLayer instanceof GeoBeans.Layer.QSLayer && (e = new GeoBeans.Envelope((-180), (-90), 180, 90)), null != e)) {
				var t = this.getLevel(e);
				if (null != t) {
					this.setLevel(t);
					var a = e.getCenter();
					null != a && (this.setCenter(a), this.draw())
				}
			}
		}
	},
	getFeatureFilter: function(e, t, a, n, r, i) {
		var s = this.getLayer(e);
		return null == s ? void(null != i && i("this is not layer named " + layername)) : (this.queryLayer.setLayer(s, r), void s.getFeatureFilter(t, a, null, n, i))
	},
	getFeatureFilterCount: function(e, t) {
		var a = this.getLayer(e);
		if (null == a) return null;
		var n = a.getFeatureFilterCount(t);
		return n
	},
	queryByFilterOutput: function(e, t, a, n) {
		var r = this.getLayer(e);
		if (null == r) return null;
		var i = r.getFeatureFilterOutput(t, a, n);
		return i
	},
	getRangeChartStyle: function(e, t, a, n, r, i, s, l) {
		if (null == e || null == t || null == a || null == n || null == r || null == i || null == s || null == l) return null;
		var o = new GeoBeans.Layer.ChartLayer("tmp", e, t, a, n, r, [i]);
		o.setMap(this);
		var h = o.chartFeatures;
		if (null == h || 0 == h.length) return null;
		var u = h[0].featureType,
			y = u.getFieldIndex(i),
			v = this.getRangeChartNodes(h, y, s);
		if (null == v || 0 == v.length) return null;
		var c = new GeoBeans.StyleManager(this.server),
			d = c.getColorMap(l, s),
			f = this.getRangeChartStyleByNodes(h, y, v, d);
		return null != f && (f.nodes = v), f
	},
	getRangeChartNodes: function(e, t, a) {
		if (null == e || null == t || null == a) return null;
		for (var n = null, r = null, i = null, s = 0; s < e.length; ++s) {
			if (n = e[s], null == n) return;
			var l = n.values,
				o = l[t];
			o = parseFloat(o), null != o && (r = null == r ? o : o < r ? o : r, i = null == i ? o : o > i ? o : i)
		}
		if (null == i || null == r || i == r) return null;
		for (var h = (i - r) / a, u = [], s = 0; s < a; ++s) {
			var y = r + h * s;
			u.push(y)
		}
		return u.push(i), u
	},
	getRangeChartStyleByNodes: function(e, t, a, n) {
		for (var r = new GeoBeans.Style.FeatureStyle("chart", GeoBeans.Style.FeatureStyle.GeomType.Polygon), i = [], s = 0; s < a.length - 1; ++s) {
			var l = a[s],
				o = a[s + 1],
				h = n[s],
				u = new GeoBeans.Symbolizer.PolygonSymbolizer,
				y = new GeoBeans.Color;
			y.setByHex(h, 1), u.fill.color = y, y = new GeoBeans.Color, y.setByHex("#cccccc", 1), u.stroke.color = y;
			for (var v = new GeoBeans.IDFilter, c = 0; c < e.length; ++c) {
				var d = e[c];
				if (null != d) {
					var f = d.values;
					if (null != f) {
						var g = f[t];
						if (null != g && g >= l && g <= o) {
							var p = d.gid;
							v.addID(p)
						}
					}
				}
			}
			var L = new GeoBeans.Rule;
			L.filter = v, L.name = s, L.symbolizer = u, i.push(L)
		}
		return r.rules = i, r
	},
	refresh: function() {},
	addPanorama: function(e, t, a, n) {
		this.panoramaLayer.addMarker(e, t, a, n)
	},
	removePanorama: function(e) {
		this.panoramaLayer.removeMarker(e)
	},
	clearPanoramas: function() {
		this.panoramaLayer.clearMarkers()
	},
	drawImage: function(e, t) {
		this.imageLayer.addImage(e, t)
	},
	_addLegend: function(e) {
		if (null != e) {
			var t = this._getLegendIndex(),
				a = {
					index: t,
					layer: e
				};
			this.legendList.push(a), e.legendIndex = t
		}
	},
	_removeLegend: function(e) {
		for (var t = null, a = null, n = null, r = 0; r < this.legendList.length; ++r) t = this.legendList[r], a = t.layer, n = t.index, e == n && this.legendList.splice(r, 1);
		for (var r = 0; r < this.legendList.length; ++r) t = this.legendList[r], a = t.layer, n = t.index, n > e && (t.index = n - 1, a.legendIndex = n - 1)
	},
	_getLegendIndex: function() {
		return this.legendList.length
	},
	setBackground: function(e) {
		null != e && (this.backgroundColor = e)
	},
	beginAnimate: function() {
		if (null == this.animateCanvas) {
			var e = this.mapDiv.find(".map5-animate-canvas");
			if (0 == e.length) {
				var t = this.id + "_canvas",
					a = this.id + "_animatecanvas",
					n = "<canvas  id='" + a + "' class='map5-animate-canvas' height='" + this.canvas.height + "' width='" + this.canvas.width + "'></canvas>";
				this.mapDiv.find("#" + t).after(n), this.animateCanvas = document.getElementById(a);
				var r = new GeoBeans.Renderer(this.animateCanvas);
				this.animateRenderer = r, window.map = this, window.requestNextAnimationFrame(this.rippleLayerAnimate)
			}
		}
	},
	rippleLayerAnimate: function(e) {
		var t = this.map;
		t.animateRenderer.clearRect();
		var a = t._getRippleLayer();
		if (null != a) {
			for (var n = null, r = 0; r < a.length; ++r) n = a[r], null != n && n.visible && n.draw(e);
			var i = window.requestNextAnimationFrame(t.rippleLayerAnimate);
			t.requestID = i
		}
	},
	stopAnimate: function() {
		window.cancelAnimationFrame(this.requestID)
	},
	_getRippleLayer: function() {
		for (var e = this.getLayers(), t = [], a = null, n = 0; n < e.length; ++n) a = e[n], null != a && a instanceof GeoBeans.Layer.RippleLayer && t.push(a);
		return t
	},
	tooltip: function(e, t) {
		var a = this.transformation.toScreenPoint(e.x, e.y);
		"left:" + a.x + "px;top:" + a.y + "px";
		this.mapDiv.find(".map5-tooltip").html(t);
		var n = a.x,
			r = a.y,
			i = this.mapDiv.find(".map5-tooltip").height(),
			s = this.mapDiv.find(".map5-tooltip").width(),
			l = s + a.x,
			o = i + a.y;
		l >= this.width && (n = a.x - s), o >= this.height && (r = a.y - i), this.mapDiv.find(".map5-tooltip").css("left", n + "px"), this.mapDiv.find(".map5-tooltip").css("top", r + "px"), this.mapDiv.find(".map5-tooltip").css("display", "block")
	},
	closeTooltip: function() {
		this.mapDiv.find(".map5-tooltip").css("display", "none")
	},
	registerRippleHitEvent: function(e, t) {
		var a = this.getLayer(e);
		if (null != a && a instanceof GeoBeans.Layer.RippleLayer && (a.setHitContent(t), $.inArray(a, this.hitRippleLayers) == -1 && this.hitRippleLayers.push(a), 0 != this.hitRippleLayers.length && null == this.hitRippleEvent)) {
			var n = this,
				r = null,
				i = null,
				s = 5;
			this.hitRippleEvent = function(e) {
				if (null == r) r = e.layerX, i = e.layerY;
				else {
					var t = Math.abs(e.layerX - r) + Math.abs(e.layerY - i);
					if (t > s) {
						r = e.layerX, i = e.layerY;
						for (var a = n.transformation.toMapPoint(e.layerX, e.layerY), l = null, o = null, h = n.getLayers(), u = 0; u < n.hitRippleLayers.length; ++u) {
							var y = n.hitRippleLayers[u];
							if (null != y) {
								var v = y.hit(a.x, a.y),
									c = h.indexOf(y);
								null != l ? c > o && (l = v, o = c) : (l = v, o = c)
							}
						}
						if (null == l) n.closeTooltip();
						else {
							var d = new GeoBeans.Geometry.Point(a.x, a.y);
							n.tooltip(d, l)
						}
					}
				}
			}, this.mapDiv[0].addEventListener("mousemove", this.hitRippleEvent)
		}
	},
	unRegisterRippleHitEvent: function(e) {
		var t = this.getLayer(e);
		if (null != t && t instanceof GeoBeans.Layer.RippleLayer) {
			t.unregisterHitEvent();
			var a = this.hitRippleLayers.indexOf(t);
			a != -1 && this.hitRippleLayers.splice(a, 1), 0 == this.hitRippleLayers.length && this.unRegisterMapRippleHitEvent()
		}
	},
	unRegisterMapRippleHitEvent: function() {
		this.mapDiv[0].removeEventListener("mousemove", this.hitRippleEvent), this.hitRippleEvent = null
	},
	zoomIn: function() {
		var e = this.controls.find(GeoBeans.Control.Type.ZOOM);
		if (!(e < 0)) {
			var t = this.controls.get(e);
			t.setMode("in"), t.trackRect()
		}
	},
	zoomOut: function() {
		var e = this.controls.find(GeoBeans.Control.Type.ZOOM);
		if (!(e < 0)) {
			var t = this.controls.get(e);
			t.setMode("out"), t.trackRect()
		}
	},
	endZoom: function() {
		var e = this.controls.find(GeoBeans.Control.Type.ZOOM);
		if (!(e < 0)) {
			var t = this.controls.get(e);
			t.end()
		}
	},
	registerClickEvent: function(e, t, a) {
		var n = this.getLayer(e);
		return null != n && n instanceof GeoBeans.Layer.FeatureLayer ? void n.registerClickEvent(t, a) : void(null != a && (console.log("layer is not feature layer"), a(null)))
	},
	unRegisterClickEvent: function(e) {
		var t = this.getLayer(e);
		return null != t && t instanceof GeoBeans.Layer.FeatureLayer ? void t.unRegisterClickEvent() : void console.log("layer is not feature layer")
	},
	createFeatureLayer: function(e, t, a) {
		if (null == e || !$.isArray(t) || null == a) return null;
		for (var n = new GeoBeans.FeatureType(null, e), r = [], i = 0; i < t.length; ++i) {
			var s = t[i],
				l = s.type,
				o = s.name,
				h = new GeoBeans.Field(o, l, n, null);
			"geometry" == l && (n.geomFieldName = o, h.setGeomType(a)), r.push(h)
		}
		n.fields = r;
		var u = new GeoBeans.Layer.FeatureLayer(e);
		return u.featureType = n, u.features = [], u
	},
	createFeatureLayerByKML: function(e, t) {
		var a = new GeoBeans.KMLReader,
			n = a.read(e, t);
		return n
	},
	createFeatureLayerByGeoJson: function(e, t) {
		var a = new GeoBeans.GeoJsonReader,
			n = a.read(e, t);
		return n
	},
	addMoveObject: function(e) {
		var t = this._getAnimationLayer();
		null != t && t.addMoveObject(e)
	},
	getMoveObject: function(e) {
		var t = this._getAnimationLayer();
		return null != t ? t.getMoveObject(e) : null
	},
	removeMoveObject: function(e) {
		var t = this._getAnimationLayer();
		null != t && t.removeMoveObject(e)
	},
	_getAnimationLayer: function() {
		if (null != this.animationLayer) return this.animationLayer;
		var e = new GeoBeans.Layer.AnimationLayer;
		return this.layers.push(e), e.setMap(this), this.animationLayer = e, this.animationLayer
	},
	setRotate: function(e) {
		return null == e ? null : (this.rotateAngle = e, void this.rotateViewer())
	},
	rotateViewer: function() {
		var e = this.transformation.toMapPoint(0, 0),
			t = this.transformation.toMapPoint(0, this.height),
			a = this.transformation.toMapPoint(this.width, 0),
			n = this.transformation.toMapPoint(this.width, this.height),
			r = e.x,
			i = e.y,
			s = e.x,
			l = e.y;
		r = t.x < r ? t.x : r, r = a.x < r ? a.x : r, r = n.x < r ? n.x : r, i = t.y < i ? t.y : i, i = a.y < i ? a.y : i, i = n.y < i ? n.y : i, s = t.x > s ? t.x : s, s = a.x > s ? a.x : s, s = n.x > s ? n.x : s, l = t.y > l ? t.y : l, l = a.y > l ? a.y : l, l = n.y > l ? n.y : l;
		var o = new GeoBeans.Envelope(r, i, s, l);
		this.viewer = o
	}
});
GeoBeans.Maplex = GeoBeans.Class({
	map: null,
	labelSets: null,
	renderer: null,
	canvas: null,
	initialize: function(e) {
		this.map = e, this.labelSets = [], this.canvas = document.createElement("canvas"), this.canvas.height = this.map.height, this.canvas.width = this.map.width, this.renderer = new GeoBeans.Renderer(this.canvas)
	},
	cleanup: function() {
		this.renderer.clearRect(), this.labelSets = []
	},
	draw: function() {
		this.renderer.clearRect();
		for (var e = 0; e < this.labelSets.length; ++e) {
			var t = this.labelSets[e];
			this.drawLabelSet(t)
		}
	},
	isCollision: function(e) {
		if (null == e) return !1;
		for (var t = 0; t < this.labelSets.length; ++t) {
			var l = this.labelSets[t];
			if (l.isCollision(e)) return !0
		}
		return !1
	},
	addLabel: function(e, t) {
		if (null != e && null != t) {
			var l = this.getLableSet(e);
			return null == l ? null : void l.addLabel(t)
		}
	},
	getLableSet: function(e) {
		for (var t = 0; t < this.labelSets.length; ++t) {
			var l = this.labelSets[t];
			if (l.name == e) return l
		}
		var l = new GeoBeans.LabelSet(e);
		return this.labelSets.push(l), l
	},
	drawLabelSet: function(e) {
		if (null != e) {
			var t = e.labels;
			if (0 != t.length) {
				var l = t[0].textSymbolizer;
				this.renderer.save(), this.renderer.setSymbolizer(l);
				for (var a = 0; a < t.length; ++a) {
					var r = t[a];
					this.renderer.drawLabel(r)
				}
				this.renderer.restore()
			}
		}
	}
});
GeoBeans.MapManager = GeoBeans.Class({
	service: "ims",
	version: "1.0.0",
	server: null,
	maps: null,
	getMap_u_id: null,
	getMap_u_map: null,
	createMap_u_id: null,
	createMap_u_name: null,
	createMap_u_extent: null,
	createMap_u_srid: null,
	removeMap_u_callback: null,
	initialize: function(e) {
		this.server = e + "/mgr", this.maps = []
	},
	getMaps: function(e) {
		var a = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=describeMap";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(r, n) {
				a.maps = a.parseMaps(r), void 0 != e && e(a.maps)
			},
			complete: function(e, a) {},
			error: function() {}
		})
	},
	getMap: function(e, a) {
		if (null != e && null != a && "" != a) {
			this.getMap_u_id = e;
			var r = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=describeMap&name=" + a;
			return $.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !1,
				beforeSend: function(e) {},
				success: function(e, a) {
					var n = r.parseMap(e);
					r.getMap_u_map = n
				},
				complete: function(e, a) {},
				error: function() {}
			}), r.getMap_u_map
		}
	},
	createMap: function(e, a, r, n, t) {
		if (null != a && null != r && null != n) {
			this.createMap_u_id = e, this.createMap_u_name = a, this.createMap_u_extent = r, this.createMap_u_srid = n, this.createMap_u_callback = t;
			var s = r.toString(),
				i = this,
				l = "service=" + this.service + "&version=" + this.version + "&request=CreateMap&name=" + a + "&extent=" + s + "&srid=" + n;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(l),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, a) {
					var r = i.parseCreateMap(e);
					i.createMap_callback(r)
				},
				complete: function(e, a) {},
				error: function() {}
			})
		}
	},
	removeMap: function(e) {
		if (null != e && "" != e) {
			var a = this,
				r = "service=" + this.service + "&version=" + this.version + "&request=RemoveMap&name=" + e;
			return this.removeMapResult = null, $.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(r),
				dataType: "xml",
				async: !1,
				beforeSend: function(e) {},
				success: function(e, r) {
					var n = a.parseRemoveMap(e);
					a.removeMapResult = n
				},
				complete: function(e, a) {},
				error: function() {}
			}), this.removeMapResult
		}
	},
	parseMaps: function(e) {
		var a = [],
			r = this;
		return $(e).find("Map").each(function() {
			var e = new Object,
				n = $(this).find("Name").text(),
				t = $(this).find("Srid").text(),
				s = $(this).find("BoundingBox"),
				i = r.parseBoundingBox(s),
				l = $(this).find("Thumbnail").attr("xlink");
			e.name = n, e.srid = t, e.extent = i, l.length - l.lastIndexOf(".png") == 4 && (e.thumbnail = l), a.push(e)
		}), a
	},
	parseMap: function(e) {
		var a = $(e).find("ExceptionText").text();
		if ("" != a) return console.log(a), null;
		var r = this,
			n = $(e).find("Name:first").text(),
			t = $(e).find("Srid:first").text(),
			s = $(e).find("BoundingBox:first"),
			i = r.parseBoundingBox(s),
			l = $(e).find("Viewer:first"),
			u = r.parseBoundingBox(l),
			o = $(e).find("Thumbnail").attr("xlink"),
			p = new GeoBeans.Map(r.server, r.getMap_u_id, n, i, t, u);
		return p.thumbnail = o, $(e).find("Capability>Layer").each(function() {
			var e = r.parseLayer(this);
			if (e instanceof GeoBeans.Layer.GroupLayer) for (var a = e.getLayers(), n = 0; n < a.length; ++n) {
				var t = a[n];
				t.setMap(p), p.groupLayer.addLayer(t)
			} else e instanceof GeoBeans.Layer.TileLayer ? p.setBaseLayer(e) : p.addLayer(e)
		}), p
	},
	parseBoundingBox: function(e) {
		if (null == e) return null;
		var a = parseFloat($(e).attr("minx")),
			r = parseFloat($(e).attr("miny")),
			n = parseFloat($(e).attr("maxx")),
			t = parseFloat($(e).attr("maxy"));
		return $.isNumeric(a) && $.isNumeric(n) && $.isNumeric(r) && $.isNumeric(t) ? new GeoBeans.Envelope(a, r, n, t) : null
	},
	parseLayer: function(e) {
		if (null == e) return null;
		var a = null,
			r = $(e).find("Type").first().text();
		return "Group" == r ? a = this.parseGroupLayer(e) : "quadserver" != r.toLowerCase() && "wmts" != r.toLowerCase() || (a = this.parseTileLayer(e)), a
	},
	parseGroupLayer: function(e) {
		if (null == e) return null;
		var a = this,
			r = $(e).find("Name:first").text(),
			n = $(e).find("BoundingBox:first"),
			t = this.parseBoundingBox(n),
			s = new GeoBeans.Layer.GroupLayer(r);
		return s.extent = t, $(e).find("Layer").each(function() {
			var e = a.parseDBLayer(this);
			s.addLayer(e)
		}), s
	},
	parseDBLayer: function(e) {
		if (null == e) return null;
		var a = null,
			r = $(e).attr("id"),
			n = $(e).find("Name:first").text(),
			t = parseInt($(e).attr("queryable")),
			s = parseInt($(e).attr("visible"));
		s = 1 == s;
		var i = $(e).find("Type").first().text(),
			l = null;
		switch (i.toLowerCase()) {
		case "raster":
			l = GeoBeans.Layer.DBLayer.Type.Raster;
			break;
		case "feature":
			l = GeoBeans.Layer.DBLayer.Type.Feature
		}
		var u = $(e).find("BoundingBox:first"),
			o = this.parseBoundingBox(u);
		if (l == GeoBeans.Layer.DBLayer.Type.Raster) a = new GeoBeans.Layer.RasterDBLayer(n, parseInt(r), null, null, t, s, null), a.extent = o;
		else if (l == GeoBeans.Layer.DBLayer.Type.Feature) {
			var p = $(e).find("Style>Name").text(),
				c = $(e).find("GeometryType").text(),
				f = null;
			switch (c.toUpperCase()) {
			case "POINT":
				f = GeoBeans.Geometry.Type.POINT;
				break;
			case "LINESTRING":
				f = GeoBeans.Geometry.Type.LINESTRING;
				break;
			case "POLYGON":
				f = GeoBeans.Geometry.Type.POLYGON;
				break;
			case "MULTIPOINT":
				f = GeoBeans.Geometry.Type.MULTIPOINT;
				break;
			case "MULTILINESTRING":
				f = GeoBeans.Geometry.Type.MULTILINESTRING;
				break;
			case "MULTIPOLYGON":
				f = GeoBeans.Geometry.Type.MULTIPOLYGON
			}
			a = new GeoBeans.Layer.FeatureDBLayer(n, parseInt(r), null, null, t, s, p), a.extent = o, a.geomType = f
		}
		return a
	},
	parseTileLayer: function(e) {
		if (null == e) return null;
		var a = $(e).attr("id"),
			r = parseInt($(e).attr("queryable"));
		r = 1 == r;
		var n = parseInt($(e).attr("visible"));
		n = 1 == n;
		var t = $(e).find("Name:first").text(),
			s = ($(e).find("Title:first").text(), $(e).find("Type").text()),
			i = $(e).find("URL").text(),
			l = $(e).find("BoundingBox:first"),
			u = this.parseBoundingBox(l),
			o = null;
		return "QuadServer" == s ? (o = new GeoBeans.Layer.QSLayer(t, i), o.extent = u, o.visible = n, o.queryable = r, o.id = a) : "WMTS" == s && (o = this.getWMTSLayer(t, i), null != o && (o.visible = n, o.queryable = r, o.id = a)), o
	},
	getWMTSLayer: function(e, a) {
		if (null == a && null == e) return null;
		for (var r = null, n = null, t = null, s = null, i = null, l = null, u = null, o = null, p = null, c = a.split(";"), f = 0; f < c.length; ++f) {
			var v = c[f],
				d = v.split(":"),
				y = d[0];
			switch (y) {
			case "typeName":
				r = d[1];
				break;
			case "format":
				n = d[1];
				break;
			case "tms":
				t = d[1];
				break;
			case "extent":
				i = d[1];
				var m = i.split(",");
				s = new GeoBeans.Envelope(parseFloat(m[0]), parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]));
				break;
			case "sourceName":
				l = d[1];
				break;
			case "url":
				u = d[1];
				break;
			case "startLevel":
				o = d[1], o = parseInt(o);
				break;
			case "endLevel":
				p = d[1], p = parseInt(p)
			}
		}
		if (null != e && null != r && null != n && null != t && null != s && null != l && null != u) {
			var x = new GeoBeans.Layer.WMTSLayer(e, u, r, s, t, n, l);
			return null != o && (x.MIN_ZOOM_LEVEL = o), null != p && (x.MAX_ZOOM_LEVEL = p), x
		}
		return null
	},
	parseCreateMap: function(e) {
		var a = $(e).find("CreateMap").text();
		if ("success" == a.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	createMap_callback: function(e) {
		if (null != this.createMap_u_callback) {
			if ("success" != e) return void this.createMap_u_callback(null, e);
			var a = new GeoBeans.Map(this.server, this.createMap_u_id, this.createMap_u_name, this.createMap_u_extent, this.createMap_u_srid);
			this.createMap_u_callback(a, e)
		}
	},
	parseRemoveMap: function(e) {
		var a = $(e).find("RemoveMap").text();
		if ("success" == a.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	removeMap_callback: function(e) {
		null != this.removeMap_u_callback && this.removeMap_u_callback(e)
	},
	saveMap: function(e, a) {
		if (null == e && null != a) return void a("map is null");
		var r = this.buildSaveMapXML(e);
		if (null == r && null != a) return void a("map is null");
		var n = this;
		$.ajax({
			type: "post",
			url: this.server,
			data: r,
			contentType: "text/xml",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var t = n.parseSaveMap(e);
				null != a && a(t)
			},
			complete: function(e, a) {},
			error: function() {}
		})
	},
	buildSaveMapXML: function(e) {
		if (null == e) return null;
		var a = $.parseXML('<?xml version="1.0"?><SaveMap service="ims" version="1.0.0" user="user1"/>'),
			r = e.name,
			n = a.createElement("Name");
		$(n).text(r), $("SaveMap", a).append(n);
		var t = e.srid,
			s = a.createElement("Srid");
		$(s).text(t), $("SaveMap", a).append(s);
		var i = e.extent;
		if (null != i) {
			var l = a.createElement("Extent");
			$(l).attr("xmin", i.xmin), $(l).attr("ymin", i.ymin), $(l).attr("xmax", i.xmax), $(l).attr("ymax", i.ymax), $("SaveMap", a).append(l)
		}
		var u = e.viewer;
		if (null != u) {
			var o = a.createElement("Viewer");
			$(o).attr("xmin", u.xmin), $(o).attr("ymin", u.ymin), $(o).attr("xmax", u.xmax), $(o).attr("ymax", u.ymax), $("SaveMap", a).append(o)
		}
		var p = a.createElement("Layers"),
			c = e.baseLayer;
		if (null != c) {
			var f = a.createElement("Layer"),
				r = c.name;
			null != r && $(f).attr("name", r);
			var v = c.id;
			null != v && $(f).attr("id", v);
			var d = c.visible;
			d = d ? 1 : 0, $(f).attr("visible", d), $(p).append(f)
		}
		for (var y = e.getLayers(), m = null, x = 0; x < y.length; ++x) if (m = y[x], null != m && m instanceof GeoBeans.Layer.DBLayer) {
			var f = a.createElement("Layer"),
				r = m.name;
			null != r && $(f).attr("name", r);
			var v = m.id;
			null != v && $(f).attr("id", v);
			var d = m.visible;
			d = d ? 1 : 0, $(f).attr("visible", d), $(p).append(f)
		}
		if ($("SaveMap", a).append(p), null != a) {
			var h = (new XMLSerializer).serializeToString(a);
			return h
		}
		return null
	},
	parseSaveMap: function(e) {
		var a = $(e).find("SaveMap").text();
		if ("success" == a.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	getMapByName: function(e) {
		if (null == e) return null;
		if (null == this.maps) return null;
		for (var a = null, r = null, n = 0; n < this.maps.length; ++n) if (a = this.maps[n], null != a && (r = a.name, r == e)) return a;
		return null
	},
	getMapByNameChar: function(e) {
		if (null == e) return [];
		if (null == this.maps) return [];
		for (var a = null, r = null, n = [], t = 0; t < this.maps.length; ++t) a = this.maps[t], null != a && (r = a.name, 0 == r.indexOf(e) && n.push(a));
		return n
	},
	getMapObj: function(e, a, r) {
		var n = "service=" + this.service + "&version=" + this.version + "&request=describeMap&name=" + e,
			t = this;
		t.getMapObj_u = r, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var n = t.parseMapObj(e);
				void 0 != a && a(n, t.refreshMapObj, t.getMapObj_u)
			},
			complete: function(e, a) {},
			error: function() {}
		})
	},
	parseMapObj: function(e) {
		var a = $(e).find("ExceptionText").text();
		if ("" != a) return console.log(a), null;
		var r = this,
			n = $(e).find("Name:first").text(),
			t = $(e).find("Srid:first").text(),
			s = $(e).find("BoundingBox:first"),
			i = this.parseBoundingBox(s),
			l = $(e).find("Viewer:first"),
			u = this.parseBoundingBox(l),
			o = $(e).find("Thumbnail").attr("xlink"),
			p = [],
			c = null,
			f = null;
		return $(e).find("Capability>Layer").each(function() {
			var e = r.parseLayer(this);
			if (e instanceof GeoBeans.Layer.GroupLayer) for (var a = e.getLayers(), n = 0; n < a.length; ++n) {
				var t = a[n];
				p.push(t)
			} else e instanceof GeoBeans.Layer.TileLayer && (c = e)
		}), {
			name: n,
			srid: t,
			extent: i,
			viewer: u,
			groupLayer: f,
			layers: p,
			baseLayer: c,
			thumbnail: o
		}
	},
	refreshMap: function(e, a) {
		if (null == e) return void(null != a && a("map is null"));
		this.refreshMapObj = e;
		this.getMapObj(e.name, this.refreshMap_callback, a)
	},
	refreshMap_callback: function(e, a, r) {
		if (null == e) return void r("refreshMap failed");
		var n = e.layers;
		if (null == n) return void r("refreshMap failed");
		var t = e.baseLayer,
			s = a.getLayers(),
			i = null,
			l = null,
			u = new GeoBeans.Layer.GroupLayer(a.server, a.name);
		u.setMap(a);
		for (var o = 0; o < n.length; ++o) {
			l = n[o];
			for (var p = 0; p < s.length; ++p) if (i = s[p], i.name == l.name) {
				i.styleName = l.styleName, i.extent = l.extent, u.addLayer(i);
				break
			}
			u.hasLayer(l.name) || (l.setMap(a), u.addLayer(l))
		}
		a.groupLayer = u, null != a.baseLayer && (a.baseLayer.renderer.clearRect(), a.baseLayerCanvas.remove(), a.baseLayerCanvas = null, a.baseLayerSnap = null, a.baseLayer.destroy()), a.setBaseLayer(t), a.extent = e.extent, null != r && r("success")
	},
	zoomToGlobeMap: function(e, a) {
		return null == e ? void(null != a && a("map is null")) : null != e.baseLayer ? (e.zoomToBaseLayer(), void a("success")) : (this.refreshMapObj = e, void this.getMapObj(e.name, this.zoomToGlobeMap_callback, a))
	},
	zoomToGlobeMap_callback: function(e, a, r) {
		if (null == e) return void r("zoom to  map failed");
		var n = e.layers;
		if (null == n) return void r("zoom to  map  failed");
		var t = a.getLayers(),
			s = null,
			i = null,
			l = new GeoBeans.Layer.GroupLayer(a.server, a.name);
		l.setMap(a);
		for (var u = 0; u < n.length; ++u) {
			i = n[u];
			for (var o = 0; o < t.length; ++o) if (s = t[o], s.name == i.name) {
				s.styleName = i.styleName, s.extent = i.extent, l.addLayer(s);
				break
			}
			l.hasLayer(i.name) || (i.setMap(a), l.addLayer(i))
		}
		a.groupLayer = l, a.extent = e.extent, a.setViewer(a.extent), a.draw(), r("success")
	}
});
GeoBeans.MapWorkspace = GeoBeans.Class({
	server: null,
	service: "ims",
	version: "1.0.0",
	mapName: null,
	map: null,
	registerLayer_layer: null,
	registerLayer_callback_m: null,
	registerLayer_callback_u: null,
	setStyle_typeName: null,
	setStyle_style: null,
	setStyle_callback_m: null,
	setStyle_callback_u: null,
	initialize: function(e, r) {
		this.server = e, this.map = r
	},
	registerLayer: function(e, r, a) {
		if (null == e) return void(null != r && r("layer in null"));
		var t = e.type;
		this.type = t, t == GeoBeans.Layer.DBLayer.Type.Feature ? this.registerFeatureDBLayer(e, r, a) : t == GeoBeans.Layer.DBLayer.Type.Raster ? this.registerRasterDBLayer(e, r, a) : t == GeoBeans.Layer.TileLayer.Type.QS ? this.registerQSLayer(e, r, a) : t == GeoBeans.Layer.TileLayer.Type.WMTS && this.registerWMTSLayer(e, r, a)
	},
	registerFeatureDBLayer: function(e, r, a) {
		if (null != e) {
			var t = e.name,
				s = e.dbName,
				n = e.typeName;
			if (null == t || null == s || null == n) return void(null != r && r("params is invalid"));
			this.registerLayer_layer = e, this.registerLayer_callback_m = r, this.registerLayer_callback_u = a;
			var l = this,
				i = this.map.name,
				u = "service=" + this.service + "&version=" + this.version + "&request=RegisterLayer&mapName=" + i + "&datasource=" + s + "&layerName=" + t + "&tableName=" + n + "&layertype=Feature";
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(u),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, r) {
					var a = l.parseRegisterLayer(e);
					null != l.registerLayer_callback_m && l.registerLayer_callback_m(a, l.map, l.registerLayer_layer, l.registerLayer_callback_u)
				},
				complete: function(e, r) {},
				error: function() {}
			})
		}
	},
	registerRasterDBLayer: function(e, r, a) {
		if (null == e) return void(null != r && r("layer in null"));
		var t = e.name,
			s = e.typeName,
			n = e.rasterPath,
			l = e.dbName;
		if (null == t || null == s || null == n || null == l) return void(null != r && r("params is invalid"));
		var i = this;
		this.registerLayer_layer = e, this.registerLayer_callback_m = r, this.registerLayer_callback_u = a;
		var u = this.map.name,
			y = "service=" + this.service + "&version=" + this.version + "&request=RegisterLayer&mapName=" + u + "&datasource=" + l + "&rasterName=" + s + "&rasterPath=" + n + "&layerName=" + t + "&layerType=Raster";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(y),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var a = i.parseRegisterLayer(e);
				null != i.registerLayer_callback_m && i.registerLayer_callback_m(a, i.map, i.registerLayer_layer, i.registerLayer_callback_u)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	registerTileLayer: function(e, r, a) {
		if (null != e) {
			var t = (e.name, null);
			if (e.type == GeoBeans.Layer.TileLayer.Type.QS ? t = "QuadServer" : e.type == GeoBeans.Layer.TileLayer.Type.WMTS && (t = "WMTS"), null != t) {
				e.url
			}
		}
	},
	registerQSLayer: function(e, r, a) {
		if (null != e) {
			var t = e.name,
				s = "QuadServer",
				n = e.url,
				l = (n.slice(0, n.lastIndexOf("?")), n.slice(n.indexOf("services=") + "services=".length, n.length));
			this.registerLayer_layer = e, this.registerLayer_callback_m = r, this.registerLayer_callback_u = a;
			var i = this,
				u = this.map.name,
				y = "service=" + this.service + "&version=" + this.version + "&request=RegisterLayer&mapName=" + u + "&layerName=" + t + "&layertype=" + s + "&webName=" + l + "&weburl=" + n;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(y),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, r) {
					var a = i.parseRegisterLayer(e);
					null != i.registerLayer_callback_m && i.registerLayer_callback_m(a, i.map, i.registerLayer_layer, i.registerLayer_callback_u)
				},
				complete: function(e, r) {},
				error: function() {}
			})
		}
	},
	registerWMTSLayer: function(e, r, a) {
		if (null != e) {
			var t = e.name,
				s = "WMTS",
				n = e.getUrl(),
				l = e.typeName;
			this.registerLayer_layer = e, this.registerLayer_callback_m = r, this.registerLayer_callback_u = a;
			var i = this,
				u = this.map.name,
				y = "service=" + this.service + "&version=" + this.version + "&request=RegisterLayer&mapName=" + u + "&layerName=" + t + "&layertype=" + s + "&webName=" + l + "&weburl=" + n;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(y),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, r) {
					var a = i.parseRegisterLayer(e);
					null != i.registerLayer_callback_m && i.registerLayer_callback_m(a, i.map, i.registerLayer_layer, i.registerLayer_callback_u)
				},
				complete: function(e, r) {},
				error: function() {}
			})
		}
	},
	unRegisterLayer: function(e, r, a) {
		if (null != e) {
			this.unRegisterLayer_name = e, this.unRegisterLayer_callback_m = r, this.unRegisterLayer_callback_u = a;
			var t = this,
				s = this.map.name,
				n = "service=" + this.service + "&version=" + this.version + "&request=UnRegisterLayer&mapName=" + s + "&layerName=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, r) {
					var a = t.parseUnRegisterLayer(e);
					null != t.unRegisterLayer_callback_m && t.unRegisterLayer_callback_m(a, t.map, t.unRegisterLayer_name, t.unRegisterLayer_callback_u)
				},
				complete: function(e, r) {},
				error: function() {}
			})
		}
	},
	describeLayer: function(e, r, a) {
		if (null == e) return void(null != r && r("layername is null"));
		var t = this,
			s = this.map.name;
		this.describeLayer_callback_u = a;
		var n = "service=" + this.service + "&version=" + this.version + "&request=DescribeLayer&mapName=" + s + "&layerName=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, a) {
				var s = t.parseDescribeLayer(e);
				null != r && r(s, t.describeLayer_callback_u)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseDescribeLayer: function(e) {
		var r = $(e).find("ExceptionText").text();
		if ("" != r) return r;
		var a = new Object,
			t = $(e).find("Name").first().text();
		a.name = t;
		var s = $(e).find("Type").first().text();
		if (a.type = s, "Feature" == s) {
			var n = $(e).find("Feature").first(),
				l = $(n).find("Name").text(),
				i = $(n).find("GeometryType").text(),
				u = $(n).find("FeatureCount").text();
			a.featureName = l, a.geomType = i, a.count = u
		} else if ("Raster" == s) {
			var y = $(e).find("Raster").first(),
				c = $(y).find("Name").text(),
				o = $(y).find("Bands").text(),
				L = $(y).find("Format").text(),
				p = $(y).find("PixelType").text(),
				m = $(y).find("PixelSize").text(),
				f = $(y).find("Resolution_X").text(),
				d = $(y).find("Resolution_Y").text(),
				v = $(y).find("Width").text(),
				_ = $(y).find("Height").text();
			a.rasterName = c, a.bands = o, a.format = L, a.pixelType = p, a.pixelSize = m, a.resolutionX = f, a.resolutionY = d, a.width = v, a.height = _
		}
		var g = $(e).find("EX_GeographicBoundingBox"),
			h = $(g).find("westBoundLongitude").text(),
			b = $(g).find("eastBoundLongitude").text(),
			T = $(g).find("southBoundLatitude").text(),
			x = $(g).find("northBoundLatitude").text(),
			S = new GeoBeans.Envelope(h, T, b, x);
		return a.extent = S, a
	},
	parseRegisterLayer: function(e) {
		var r = $(e).find("ExceptionText").text();
		if (null != r && "" != r) return r;
		var a = null,
			t = $(e).find("ID").text(),
			s = $(e).find("Name:first").text(),
			n = null,
			l = $(e).find("Type").first().text(),
			l = this.type,
			i = null;
		switch (l.toLowerCase()) {
		case "raster":
			i = GeoBeans.Layer.DBLayer.Type.Raster;
			break;
		case "feature":
			i = GeoBeans.Layer.DBLayer.Type.Feature;
			break;
		case "quadserver":
			i = GeoBeans.Layer.TileLayer.Type.QS;
			break;
		case "wmts":
			i = GeoBeans.Layer.TileLayer.Type.WMTS
		}
		var u = $(e).find("BoundingBox:first"),
			y = this.parseBoundingBox(u);
		if (i == GeoBeans.Layer.DBLayer.Type.Raster) a = new GeoBeans.Layer.RasterDBLayer(s, parseInt(t), null, null, n, (!0), null), a.extent = y;
		else if (i == GeoBeans.Layer.DBLayer.Type.Feature) {
			var c = $(e).find("Style>Name").text(),
				o = $(e).find("GeometryType").text(),
				L = null;
			switch (o.toUpperCase()) {
			case "POINT":
				L = GeoBeans.Geometry.Type.POINT;
				break;
			case "LINESTRING":
				L = GeoBeans.Geometry.Type.LINESTRING;
				break;
			case "POLYGON":
				L = GeoBeans.Geometry.Type.POLYGON;
				break;
			case "MULTIPOINT":
				L = GeoBeans.Geometry.Type.MULTIPOINT;
				break;
			case "MULTILINESTRING":
				L = GeoBeans.Geometry.Type.MULTILINESTRING;
				break;
			case "MULTIPOLYGON":
				L = GeoBeans.Geometry.Type.MULTIPOLYGON
			}
			a = new GeoBeans.Layer.FeatureDBLayer(s, parseInt(t), null, null, n, (!0), c), a.extent = y, a.geomType = L
		} else if (i == GeoBeans.Layer.TileLayer.Type.QS) {
			var p = $(e).find("URL").text();
			a = new GeoBeans.Layer.QSLayer(s, p), a.id = parseInt(t), a.visible = !0, a.queryable = !1
		} else if (i == GeoBeans.Layer.TileLayer.Type.WMTS) {
			var p = $(e).find("URL").text();
			a = this.getWMTSLayer(s, p), null != a && (a.id = parseInt(t), a.visible = !0, a.queryable = !1)
		}
		return a
	},
	getWMTSLayer: function(e, r) {
		if (null == r && null == e) return null;
		for (var a = null, t = null, s = null, n = null, l = null, i = null, u = null, y = null, c = null, o = r.split(";"), L = 0; L < o.length; ++L) {
			var p = o[L],
				m = p.split(":"),
				f = m[0];
			switch (f) {
			case "typeName":
				a = m[1];
				break;
			case "format":
				t = m[1];
				break;
			case "tms":
				s = m[1];
				break;
			case "extent":
				l = m[1];
				var d = l.split(",");
				n = new GeoBeans.Envelope(parseFloat(d[0]), parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]));
				break;
			case "sourceName":
				i = m[1];
				break;
			case "url":
				u = m[1];
				break;
			case "startLevel":
				y = m[1];
				break;
			case "endLevel":
				c = m[1]
			}
		}
		if (null != e && null != a && null != t && null != s && null != n && null != i && null != u) {
			var v = new GeoBeans.Layer.WMTSLayer(e, u, a, n, s, t, i);
			return null != y && (v.MIN_ZOOM_LEVEL = y), null != c && (v.MAX_ZOOM_LEVEL = c), v
		}
		return null
	},
	parseBoundingBox: function(e) {
		if (null == e) return null;
		var r = parseFloat($(e).attr("minx")),
			a = parseFloat($(e).attr("miny")),
			t = parseFloat($(e).attr("maxx")),
			s = parseFloat($(e).attr("maxy"));
		return new GeoBeans.Envelope(r, a, t, s)
	},
	parseUnRegisterLayer: function(e) {
		var r = $(e).find("UnRegisterLayer").text();
		if ("success" == r.toLowerCase()) return "success";
		var a = $(e).find("ExceptionText").text();
		return a
	},
	setStyle: function(e, r, a, t) {
		if (null != e && null != r) {
			this.setStyle_typeName = e, this.setStyle_style = r, this.setStyle_callback_m = a, this.setStyle_callback_u = t;
			var s = r.name,
				n = this,
				l = this.map.name,
				i = "service=" + this.service + "&version=" + this.version + "&request=SetStyle&map=" + l + "&layer=" + e + "&style=" + s;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(i),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, r) {
					var a = n.parseSetStyle(e);
					null != n.setStyle_callback_m && n.setStyle_callback_m(a, n.map, n.setStyle_typeName, n.setStyle_style, n.setStyle_callback_u)
				},
				complete: function(e, r) {},
				error: function() {}
			})
		}
	},
	parseSetStyle: function(e) {
		var r = $(e).find("SetStyle").text();
		if ("success" == r.toLowerCase()) return "success";
		var a = $(e).find("ExceptionText").text();
		return a
	}
});
GeoBeans.Marker = GeoBeans.Class({
	title: null,
	icon: null,
	mapX: null,
	mapY: null,
	offsetX: null,
	offsetY: null,
	image: null,
	layer: null,
	initialize: function(i, t, e, a) {
		this.title = i, this.icon = t, this.mapX = e, this.mapY = a, this.offsetX = 0, this.offsetY = 0, this.image = new Image
	},
	destory: function() {},
	setLayer: function(i) {
		this.layer = i
	},
	draw: function() {
		if (null == this.image ? (this.image = new Image, this.image.src = this.icon) : 0 == this.image.src.length && (this.image.src = this.icon), this.image.complete) this.drarMaker();
		else {
			var i = this;
			this.image.onload = function() {
				i.drarMaker()
			}
		}
	},
	drarMaker: function() {
		var i = this.layer.map.transformation,
			t = i.toScreenPoint(this.mapX, this.mapY),
			e = this.layer.map.renderer;
		e.context.drawImage(this.image, t.x, t.y)
	}
});
GeoBeans.Overlay = GeoBeans.Class({
	geometry: null,
	symbolizer: null,
	id: null,
	layer: null,
	loadFlag: null,
	visible: !0,
	isEdit: !1,
	isHit: !1,
	kvMap: {},
	htmlPath: null,
	initialize: function(e, i, t) {
		this.id = e, this.geometry = i, this.symbolizer = t, this.loadFlag = GeoBeans.Overlay.Flag.READY, this.visible = !0, this.kvMap = {}
	},
	destroy: function() {
		this.geometry.destroy(), this.symbolizer.destroy(), this.id = null, this.loadFlag = null, this.visible = null, this.kvMap = null, this.geometry = null, this.symbolizer = null
	},
	setLayer: function(e) {
		this.layer = e
	},
	draw: function() {
		if (this.visible) {
			this.loadFlag = GeoBeans.Overlay.Flag.LOADED;
			var e = this.layer.map.transformation;
			this.layer.renderer.setSymbolizer(this.symbolizer), this.layer.renderer.drawOverlay(this, this.symbolizer, e)
		}
	},
	setVisible: function(e) {
		this.visible = e
	},
	beginEdit: function() {
		var e = this.layer.getEditOverlaySymbolizer(this);
		this.layer.drawEditOverlay(this, e), this.isEdit = !0
	},
	endEdit: function() {
		this.isHit = !1, this.isEdit = !1, this.layer.editOverlay = null, this.layer.editRenderer.clearRect(), this.layer.map.drawLayersAll()
	},
	getKeyValueMap: function() {
		return this.kvMap
	},
	hasKey: function(e) {
		return e in this.kvMap
	},
	getValue: function(e) {
		return this.hasKey(e) ? this.kvMap[e] : null
	},
	removeKey: function(e) {
		this.hasKey(e) && delete this.kvMap[e]
	},
	addKeyValue: function(e, i) {
		this.hasKey(e) || (this.kvMap[e] = i)
	},
	removeKeys: function() {
		for (var e in this.kvMap) this.removeKey(e);
		this.kvMap = {}
	},
	clone: function() {
		var e = new GeoBeans.Geometry;
		e = this.geometry;
		var i = new GeoBeans.Style.Symbolizer;
		i = this.symbolizer;
		var t = {},
			s = this.id,
			l = new GeoBeans.Overlay(s, e, i);
		l.visible = this.visible, l.isEdit = this.isEdit, l.isHit = this.isHit;
		for (var a in this.kvMap) {
			var r = this.kvMap[a];
			t[a] = r
		}
		return l.kvMap = t, l
	},
	getExtent: function() {
		var e = this.geometry,
			i = null;
		if (this.type == GeoBeans.Overlay.Type.MARKER) {
			var t = e.x,
				s = e.y;
			i = new GeoBeans.Envelope(t - 1, s - 1, t + 1, s + 1)
		} else i = e.extent;
		return i
	}
}), GeoBeans.Overlay.Type = {
	MARKER: "Marker",
	PLOYLINE: "Polyline",
	CIRCLE: "Circle",
	POLYGON: "Polygon",
	LABEL: "label"
}, GeoBeans.Overlay.Flag = {
	READY: "ready",
	LOADED: "loaded"
};
GeoBeans.Renderer = GeoBeans.Class({
	canvas: null,
	context: null,
	initialize: function(e) {
		this.canvas = e, this.context = e.getContext("2d")
	},
	draw: function(e, t, n) {
		var o = e.geometry;
		null != o && this.drawGeometry(o, t, n)
	},
	save: function() {
		this.canvas.save()
	},
	restore: function() {
		this.canvas.restore()
	},
	getGlobalAlpha: function() {
		return this.context.globalAlpha
	},
	setGlobalAlpha: function(e) {
		this.context.globalAlpha = e
	},
	drawGeometry: function(e, t, n) {
		switch (e.type) {
		case GeoBeans.Geometry.Type.POINT:
			this.drawPoint(e, t, n);
			break;
		case GeoBeans.Geometry.Type.MULTIPOINT:
			this.drawMultiPoint(e, t, n);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			this.drawLineString(e, t, n);
			break;
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			this.drawMultiLineString(e, t, n);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			this.drawPolygon(e, t, n);
			break;
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			this.drawMultiPolygon(e, t, n);
			break;
		case GeoBeans.Geometry.Type.CIRCLE:
			this.drawCircle(e, t, n);
			break;
		case GeoBeans.Geometry.Type.COLLECTION:
			this.drawMultiGeometry(e, t, n)
		}
	},
	drawPoint: function(e, t, n) {
		var o, i = t.size;
		o = n.toScreenPoint(e.x, e.y), this.context.beginPath(), this.context.arc(o.x, o.y, i, 0, 2 * Math.PI, !1), this.context.closePath(), null != t.fill && this.context.fill(), null != t.stroke && this.context.stroke()
	},
	drawLineString: function(e, t, n) {
		if (!(e.points.length < 1)) {
			var o = null,
				i = null,
				l = this.context;
			l.beginPath(), o = e.points[0], i = n.toScreenPoint(o.x, o.y), l.moveTo(i.x, i.y);
			for (var r = 1, a = e.points.length; r < a; r++) o = e.points[r], i = n.toScreenPoint(o.x, o.y), l.lineTo(i.x, i.y);
			l.stroke()
		}
	},
	drawPolygon: function(e, t, n) {
		var o, i, l = null,
			r = null,
			a = 0,
			s = 0,
			y = this.context;
		y.beginPath();
		var c = null;
		a = e.rings.length;
		var h = e.getOutRing();
		if (null != h) {
			for (s = h.points.length, l = h.points[0], spt = n.toScreenPoint(l.x, l.y), y.moveTo(spt.x, spt.y), i = 1; i < s; i++) l = h.points[i], spt = n.toScreenPoint(l.x, l.y), y.lineTo(spt.x, spt.y);
			for (var c = GeoBeans.Utility._getClockDirection(h.points), o = 0; o < a; ++o) if (r = e.rings[o], r != h) {
				s = r.points.length;
				var x = GeoBeans.Utility._getClockDirection(r.points);
				if (x == c) for (l = r.points[s - 1], spt = n.toScreenPoint(l.x, l.y), y.moveTo(spt.x, spt.y), i = s - 2; i >= 0; i--) l = r.points[i], spt = n.toScreenPoint(l.x, l.y), y.lineTo(spt.x, spt.y);
				else for (l = r.points[0], spt = n.toScreenPoint(l.x, l.y), y.moveTo(spt.x, spt.y), i = 1; i < s; i++) l = r.points[i], spt = n.toScreenPoint(l.x, l.y), y.lineTo(spt.x, spt.y)
			}
			null != t.fill && y.fill(), t.stroke && y.stroke(), y.closePath()
		}
	},
	drawMultiPoint: function(e, t, n) {
		points = e.points;
		for (var o = null, i = 0, l = points.length; i < l; i++) o = points[i], this.drawPoint(o, t, n)
	},
	drawMultiLineString: function(e, t, n) {
		lines = e.lines;
		for (var o = null, i = 0, l = lines.length; i < l; i++) o = lines[i], this.drawLineString(o, t, n)
	},
	drawMultiPolygon: function(e, t, n) {
		polygons = e.polygons;
		for (var o = null, i = 0, l = polygons.length; i < l; i++) o = polygons[i], this.drawPolygon(o, t, n)
	},
	drawCircle: function(e, t, n) {
		var o = e.center,
			i = e.radius;
		if (!(i <= 0)) {
			var l = this.context;
			l.beginPath();
			var r = n.toScreenPoint(o.x, o.y),
				a = n.toScreenPoint(o.x + i, o.y),
				s = Math.sqrt((r.x - a.x) * (r.x - a.x) + (r.y - a.y) * (r.y - a.y));
			l.arc(r.x, r.y, s, 0, 2 * Math.PI, !0), null != t.fill && l.fill(), t.stroke && l.stroke(), l.closePath()
		}
	},
	drawMultiGeometry: function(e, t, n) {
		if (null != e && null != n && null != t) {
			var o = t.type,
				i = e.components;
			if (null != i) for (var l = null, r = 0; r < i.length; ++r) if (l = i[r], null != l) switch (o) {
			case GeoBeans.Symbolizer.Type.Point:
				l.type != GeoBeans.Geometry.Type.POINT && l.type != GeoBeans.Geometry.Type.MULTIPOINT || this.drawGeometry(l, t, n);
				break;
			case GeoBeans.Symbolizer.Type.Line:
				l.type != GeoBeans.Geometry.Type.LINESTRING && l.type != GeoBeans.Geometry.Type.MULTILINESTRING || this.drawGeometry(l, t, n);
				break;
			case GeoBeans.Symbolizer.Type.Polygon:
				l.type != GeoBeans.Geometry.Type.POLYGON && l.type != GeoBeans.Geometry.Type.MULTIPOLYGON || this.drawGeometry(l, t, n)
			}
		}
	},
	drawIcons: function(e, t, n) {
		if (0 != e.length) if (null == t.icon ? (t.icon = new Image, t.icon.crossOrigin = "anonymous", t.icon.src = t.symbol.icon) : t.icon.src != t.symbol.icon && (t.icon = null, t.icon = new Image, t.icon.crossOrigin = "anonymous", t.icon.src = t.symbol.icon), t.icon.complete) for (var o = e.length, i = 0; i < o; i++) {
			var l = e[i].geometry,
				r = l.type;
			if (r == GeoBeans.Geometry.Type.POINT) {
				var a = n.toScreenPoint(l.x, l.y);
				this.drawIcon(t.icon, a.x, a.y, t)
			} else if (r == GeoBeans.Geometry.Type.MULTIPOINT) for (var s = l.points, y = 0; y < s.length; ++y) {
				var c = s[y],
					a = n.toScreenPoint(c.x, c.y);
				this.drawIcon(t.icon, a.x, a.y, t)
			}
		} else {
			var h = this;
			t.icon.onload = function() {
				for (var o = e.length, i = 0; i < o; i++) {
					var l = e[i].geometry,
						r = l.type;
					if (r == GeoBeans.Geometry.Type.POINT) {
						var a = n.toScreenPoint(l.x, l.y);
						h.drawIcon(t.icon, a.x, a.y, t)
					} else if (r == GeoBeans.Geometry.Type.MULTIPOINT) for (var s = l.points, y = 0; y < s.length; ++y) {
						var c = s[y],
							a = n.toScreenPoint(c.x, c.y);
						h.drawIcon(t.icon, a.x, a.y, t)
					}
				}
				n.map.drawLayersAll()
			}
		}
	},
	drawIcon: function(e, t, n, o) {
		var i, l, r = o.symbol;
		i = r.icon_width > 0 ? r.icon_width : e.width, l = r.icon_height > 0 ? r.icon_height : e.height;
		var a = r.scale;
		null != a && (i = e.width * a, l = e.height * a);
		var s = Math.ceil(t - i / 2) + r.icon_offset_x,
			y = Math.ceil(n - l / 2) - r.icon_offset_y;
		if (null != r.rotate) {
			var c = t + r.icon_offset_x,
				h = n - r.icon_offset_y;
			this.save(), this.context.translate(c, h), this.context.rotate(r.rotate * Math.PI / 180), this.context.translate(-c, -h)
		}
		try {
			this.context.drawImage(e, s, y, i, l)
		} catch (e) {
			console.log("drawImage failed: " + e)
		}
		this.restore()
	},
	drawRing: function(e, t, n, o, i, l, r) {
		var a = null;
		a = r.toScreenPoint(e.x, e.y);
		var s = new GeoBeans.Color;
		s.setByHex(o, l), this.context.fillStyle = s.getRgba(), this.context.beginPath(), this.context.arc(a.x, a.y, n, 0, 2 * Math.PI, !1), this.context.closePath(), this.context.fill();
		var y = new GeoBeans.Color;
		y.setByHex(o, i), this.context.fillStyle = y.getRgba(), this.context.beginPath(), this.context.arc(a.x, a.y, t, 0, 2 * Math.PI, !1), this.context.closePath(), this.context.fill()
	},
	drawBezierLine: function(e, t, n, o) {
		var i = o.toScreenPoint(e.x, e.y),
			l = o.toScreenPoint(t.x, t.y),
			r = o.toScreenPoint(n.x, n.y);
		this.context.beginPath(), this.context.moveTo(i.x, i.y), this.context.quadraticCurveTo(r.x, r.y, l.x, l.y), this.context.stroke()
	},
	label: function(e, t, n, o) {
		switch (e.type) {
		case GeoBeans.Geometry.Type.POINT:
			this.labelPoint(e, t, n, o);
			break;
		case GeoBeans.Geometry.Type.MULTIPOINT:
			this.labelMultiPoint(e, t, o);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			this.labelLineString(e, t, o);
			break;
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			this.labelMultiLineString(e, t, o);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			this.labelPolygon(e, t, o);
			break;
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			this.labelMultiPolygon(e, t, o)
		}
	},
	labelPoint: function(e, t, n, o) {
		var i;
		i = o.toScreenPoint(e.x, e.y), null != n.fill && this.context.fillText(t, i.x, i.y)
	},
	drawLabel: function(e) {
		var t = e.pos,
			n = e.textSymbolizer,
			o = e.text;
		null != o && void 0 != o && (null != n.fill && this.context.fillText(e.text, t.x, t.y), null != n.stroke && this.context.strokeText(e.text, t.x, t.y))
	},
	labelLineString: function(e, t, n, o) {},
	labelPolygon: function(e, t, n, o) {},
	labelMultiPoint: function(e, t, n, o) {},
	labelMultiLineString: function(e, t, n, o) {},
	labelMultiPolygon: function(e, t, n, o) {},
	getTextExtent: function(e, t) {
		var n = this.context.measureText(e).width;
		null == t && (t = 12);
		var o = new GeoBeans.Envelope(0, (-t), n, 0);
		return o
	},
	drawImage: function(e, t, n, o, i) {
		try {
			this.context.drawImage(e, t, n, o, i)
		} catch (e) {
			console.log("drawImage failed: " + e)
		}
	},
	drawImageParms: function(e, t, n, o, i, l, r, a, s) {
		try {
			this.context.drawImage(e, t, n, o, i, l, r, a, s)
		} catch (e) {
			console.log("drawImage failed: " + e)
		}
	},
	setSymbolizer: function(e) {
		if (null != e) {
			if (e instanceof GeoBeans.Symbolizer.PointSymbolizer) null != e.stroke && (null != e.stroke.width && (this.context.lineWidth = e.stroke.width), null != e.stroke.color && (this.context.strokeStyle = e.stroke.color.getRgba())), null != e.fill && (this.context.fillStyle = e.fill.color.getRgba());
			else if (e instanceof GeoBeans.Symbolizer.LineSymbolizer) {
				var t = e.stroke;
				null != t && (this.context.strokeStyle = t.color.getRgba(), null != t.width && (this.context.lineWidth = t.width), null != t.lineCap && (this.context.lineCap = t.lineCap), null != t.lineJoin && (this.context.lineJoin = t.lineJoin))
			} else if (e instanceof GeoBeans.Symbolizer.PolygonSymbolizer) {
				var n = e.fill;
				null != n && (this.context.fillStyle = n.color.getRgba());
				var t = e.stroke;
				null != t && (this.context.strokeStyle = t.color.getRgba(), null != t.width && (this.context.lineWidth = t.width), null != t.lineCap && (this.context.lineCap = t.lineCap), null != t.lineJoin && (this.context.lineJoin = t.lineJoin))
			} else if (e instanceof GeoBeans.Symbolizer.TextSymbolizer) {
				var o = e.font;
				null != o && (this.context.font = o.style + " " + o.weight + " " + o.size + "px " + o.family);
				var n = e.fill;
				null != n && (this.context.fillStyle = n.color.getRgba());
				var t = e.stroke;
				null != t && (this.context.strokeStyle = t.color.getRgba(), null != t.width && (this.context.lineWidth = t.width), null != t.lineCap && (this.context.lineCap = t.lineCap), null != t.lineJoin && (this.context.lineJoin = t.lineJoin))
			}
			e.showShadow && (this.context.shadowBlur = e.shadowBlur, this.context.shadowColor = e.shadowColor, this.context.shadowOffsetX = e.shadowOffsetX, this.context.shadowOffsetY = e.shadowOffsetY)
		}
	},
	fillCircle: function(e, t, n, o) {},
	strokeCircle: function(e, t, n, o) {},
	clear: function(e, t, n, o) {
		switch (e.type) {
		case GeoBeans.Geometry.Type.POINT:
			this.clearPoint(e, t, n, o);
			break;
		case GeoBeans.Geometry.Type.MULTIPOINT:
			this.clearMultiPoint(e, t, n, o);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			this.clearLineString(e, t, o);
			break;
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			this.clearMultiLineString(e, t, o);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			this.clearPolygon(e, t, o);
			break;
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			this.clearMultiPolygon(e, t, o)
		}
	},
	clearPoint: function(e, t, n, o) {
		var i;
		i = o.toScreenPoint(e.x, e.y), this.context.fillStyle = t, this.context.beginPath(), this.context.arc(i.x, i.y, n, 0, 2 * Math.PI, !1), this.context.closePath(), this.context.fill()
	},
	clearLineString: function(e, t, n) {
		if (!(e.points.length < 1)) {
			var o = null,
				i = null,
				l = this.context;
			l.strokeStyle = t, l.beginPath(), o = e.points[0], i = n.toScreenPoint(o.x, o.y), l.moveTo(i.x, i.y);
			for (var r = 1, a = e.points.length; r < a; r++) o = e.points[r], i = n.toScreenPoint(o.x, o.y), l.lineTo(i.x, i.y);
			l.stroke()
		}
	},
	clearPolygon: function(e, t, n) {
		var o, i, l = null,
			r = null,
			a = 0,
			s = 0,
			y = this.context;
		for (y.fillStyle = t, y.beginPath(), a = e.rings.length, o = 0; o < a; o++) for (r = e.rings[o], s = r.points.length, l = r.points[0], spt = n.toScreenPoint(l.x, l.y), y.moveTo(spt.x, spt.y), i = 1; i < s; i++) l = r.points[i], spt = n.toScreenPoint(l.x, l.y), y.lineTo(spt.x, spt.y);
		y.closePath(), y.fill()
	},
	clearMultiPoint: function(e, t, n, o) {
		points = e.points;
		for (var i = null, l = 0, r = points.length; l < r; l++) i = points[l], this.clearPoint(i, symbolizer, n, o)
	},
	clearMultiLineString: function(e, t, n) {
		lines = e.lines;
		for (var o = null, i = 0, l = lines.length; i < l; i++) o = lines[i], this.clearLineString(o, t, n)
	},
	clearMultiPolygon: function(e, t, n) {
		polygons = e.polygons;
		for (var o = null, i = 0, l = polygons.length; i < l; i++) o = polygons[i], this.clearPolygon(o, t, n)
	},
	save: function() {
		this.context.save()
	},
	restore: function() {
		this.context.restore()
	},
	clearRect: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	},
	drawOverlay: function(e, t, n) {
		var o = !1,
			i = e.type;
		switch (i) {
		case GeoBeans.Overlay.Type.MARKER:
			o = this.drawMarker(e, t, n);
			break;
		case GeoBeans.Overlay.Type.LABEL:
			this.drawLabelOverlay(e, t, n);
			break;
		default:
			this.drawGeometry(e.geometry, t, n), o = !0
		}
		return o
	},
	drawMarker: function(e, t, n) {
		var o = this,
			i = t.symbol.icon,
			l = e.geometry.x,
			r = e.geometry.y,
			a = n.toScreenPoint(l, r);
		return null == t.image && (t.image = new Image, t.image.src = i), t.image.complete ? (e.loadFlag = GeoBeans.Overlay.Flag.LOADED, this.drawIcon(t.image, a.x, a.y, t), !0) : void(t.image.onload = function() {
			e.loadFlag = GeoBeans.Overlay.Flag.LOADED, o.drawIcon(t.image, a.x, a.y, t), e.layer.draw()
		})
	},
	drawLabelOverlay: function(e, t, n) {
		if (null != e && null != t && null != n) {
			var o = e.label;
			o.computePosition(this, n), this.drawLabel(o)
		}
	},
	drawTip: function(e, t, n, o) {
		if (null == e || null == t || null == n) return null;
		var i = n.symbolizer;
		if (null == i) return null;
		this.setSymbolizer(i);
		var l = 12,
			r = n.textSymbolizer;
		null != r && null != r.font && null != r.font.size && (l = r.font.size);
		var a = r.labelText;
		if (null == a) return null;
		var s = 34,
			y = 26,
			c = this.context.measureText(a).width;
		c > 40 && (s = c + 10);
		var h = e.x,
			x = e.y,
			u = t.toScreenPoint(h, x),
			f = 6,
			G = 5,
			g = new GeoBeans.Geometry.Point(u.x - f, u.y - f),
			p = new GeoBeans.Geometry.Point(u.x - s / 2 + G, u.y - f),
			m = new GeoBeans.Geometry.Point(u.x - s / 2, u.y - f),
			P = new GeoBeans.Geometry.Point(u.x - s / 2, u.y - f - G),
			T = new GeoBeans.Geometry.Point(u.x - s / 2, u.y - y + G),
			w = new GeoBeans.Geometry.Point(u.x - s / 2, u.y - y),
			v = new GeoBeans.Geometry.Point(u.x - s / 2 + G, u.y - y),
			d = (new GeoBeans.Geometry.Point(u.x + s / 2 - G, u.y - y), new GeoBeans.Geometry.Point(u.x + s / 2, u.y - y)),
			b = (new GeoBeans.Geometry.Point(u.x + s / 2, u.y - y + G), new GeoBeans.Geometry.Point(u.x + s / 2, u.y - f - G), new GeoBeans.Geometry.Point(u.x + s / 2, u.y - f)),
			S = (new GeoBeans.Geometry.Point(u.x + s / 2 - G, u.y - f), new GeoBeans.Geometry.Point(u.x + f, u.y - f)),
			B = this.context;
		B.beginPath(), B.moveTo(u.x, u.y), B.lineTo(g.x, g.y), B.lineTo(p.x, p.y), B.arcTo(m.x, m.y, P.x, P.y, G), B.lineTo(T.x, T.y), B.arcTo(w.x, w.y, v.x, v.y, G), B.lineTo(d.x, d.y), B.lineTo(b.x, b.y), B.lineTo(S.x, S.y), B.lineTo(u.x, u.y), null != i.stroke && B.stroke(), null != i.fill && B.fill();
		var r = n.textSymbolizer;
		null != r && this.setSymbolizer(r);
		var I = u.x - c / 2,
			L = u.y - f - 6;
		if (null != r.fill && B.fillText(a, I, L), null == o) return null;
		var k = o.textSymbolizer,
			M = o.symbolizer;
		null != M && this.setSymbolizer(M);
		var O = k.labelText;
		if (null == O) return null;
		O.length >= 5 && (O = O.slice(0, 5));
		var N = 4,
			z = this.context.measureText(O).width;
		z += 2 * N;
		var C = new GeoBeans.Geometry.Point(d.x + z - G, d.y),
			R = new GeoBeans.Geometry.Point(d.x + z, d.y),
			E = new GeoBeans.Geometry.Point(d.x + z, d.y + G),
			U = new GeoBeans.Geometry.Point(b.x + z, b.y - G),
			_ = new GeoBeans.Geometry.Point(b.x + z, b.y),
			Y = new GeoBeans.Geometry.Point(b.x + z - G, b.y);
		B.beginPath(), B.moveTo(d.x, d.y), B.lineTo(C.x, C.y), B.arcTo(R.x, R.y, E.x, E.y, G), B.lineTo(U.x, U.y), B.arcTo(_.x, _.y, Y.x, Y.y, G), B.lineTo(b.x, b.y), B.lineTo(d.x, d.y), null != M.stroke && B.stroke(), null != M.fill && B.fill(), null != k && this.setSymbolizer(k);
		var A = u.x + s / 2 + N,
			J = u.y - f - 6;
		B.fillText(O, A, J, z);
		var D = new GeoBeans.Envelope(w.x, w.y, _.x, _.y);
		return D
	}
});
GeoBeans.Style = GeoBeans.Class({
	name: null,
	type: null,
	initialize: function(e) {
		this.name = e
	}
}), GeoBeans.Style.Type = {
	FeatureType: "featureType",
	RasterType: "rasterType"
};
GeoBeans.Symbolizer = GeoBeans.Class({
	type: null,
	initialize: function() {},
	destroy: function() {},
	clone: function() {}
}), GeoBeans.Symbolizer.Type = {
	Point: "point",
	Line: "line",
	Polygon: "polygon",
	Text: "text",
	Raster: "raster"
};
GeoBeans.Transformation = GeoBeans.Class({
	map: null,
	win_w: null,
	win_h: null,
	win_cx: null,
	win_cy: null,
	view_w: null,
	view_h: null,
	view_c: null,
	scale: null,
	initialize: function(t) {
		this.map = t
	},
	toMapPoint: function(t, i) {
		var e = (t - this.win_cx) / this.scale + this.view_c.x,
			a = (this.win_cy - i) / this.scale + this.view_c.y,
			n = new GeoBeans.Geometry.Point(e, a);
		if (null != this.map.rotateAngle) {
			var h = this.map.rotateAngle,
				s = n.x * Math.cos(Math.PI / 180 * h) - n.y * Math.sin(Math.PI / 180 * h),
				o = n.x * Math.sin(Math.PI / 180 * h) + n.y * Math.cos(Math.PI / 180 * h);
			n = new GeoBeans.Geometry.Point(s, o)
		}
		return n
	},
	toMapPoint: function(t, i) {
		var e = ((t - this.win_cx) * Math.cos(this.map.rotateAngle * Math.PI / 180) - (this.win_cy - i) * Math.sin(this.map.rotateAngle * Math.PI / 180)) / this.scale + this.view_c.x,
			a = ((t - this.win_cx) * Math.sin(this.map.rotateAngle * Math.PI / 180) + (this.win_cy - i) * Math.cos(this.map.rotateAngle * Math.PI / 180)) / this.scale + this.view_c.y;
		return new GeoBeans.Geometry.Point(e, a)
	},
	toScreenPoint: function(t, i) {
		var e = this.scale * (t - this.view_c.x) + this.win_cx,
			a = this.win_cy - this.scale * (i - this.view_c.y),
			n = new GeoBeans.Geometry.Point(e, a);
		if (null != this.map.rotateAngle) {
			var h = this.map.rotateAngle,
				s = n.x * Math.cos(Math.PI / 180 * h) + n.y * Math.sin(Math.PI / 180 * h),
				o = -n.x * Math.sin(Math.PI / 180 * h) + n.y * Math.cos(Math.PI / 180 * h);
			n = new GeoBeans.Geometry.Point(s, o)
		}
		return n
	},
	toScreenPoint: function(t, i) {
		var e = this.scale * ((t - this.view_c.x) * Math.cos(this.map.rotateAngle * Math.PI / 180) + (i - this.view_c.y) * Math.sin(this.map.rotateAngle * Math.PI / 180)) + this.win_cx,
			a = this.scale * ((t - this.view_c.x) * Math.sin(this.map.rotateAngle * Math.PI / 180) - (i - this.view_c.y) * Math.cos(this.map.rotateAngle * Math.PI / 180)) + this.win_cy;
		return new GeoBeans.Geometry.Point(e, a)
	},
	update: function() {
		var t = this.map.viewer,
			i = this.map.width,
			e = this.map.height;
		this.win_w = parseFloat(i), this.win_h = parseFloat(e), this.win_cx = i / 2, this.win_cy = e / 2, this.view_w = t.getWidth(), this.view_h = t.getHeight(), this.view_c = t.getCenter();
		var a = this.win_w / this.view_w,
			n = this.win_h / this.view_h;
		this.scale = a < n ? a : n, this.map.tolerance = this.map.TOLERANCE / this.scale
	},
	getParms: function() {
		var t = this.map.viewer,
			i = t.rotateMaxMin(this.rotateAngle),
			e = this.map.height,
			a = this.map.width;
		t.getCenter(), i.min, new GeoBeans.Geometry.Point(0, e), i.max, new GeoBeans.Geometry.Point(a, 0)
	}
});
GeoBeans.User = GeoBeans.Class({
	name: null,
	server: null,
	mapManager: null,
	styleManager: null,
	dbsManager: null,
	tileDBManager: null,
	fileManager: null,
	rasterDBManager: null,
	gpsManager: null,
	tileDBManager: null,
	poiManager: null,
	subManager: null,
	serviceManager: null,
	jobManager: null,
	initialize: function(e) {
		this.name = e, this.server = "/ows/" + this.name + "/mgr";
		var a = "/ows/" + this.name;
		this.mapManager = new GeoBeans.MapManager(a), this.styleManager = new GeoBeans.StyleManager(a), this.dbsManager = new GeoBeans.DBSManager(a), this.fileManager = new GeoBeans.FileManager(a), this.tileDBManager = new GeoBeans.TileDBManager(a), this.rasterDBManager = new GeoBeans.RasterDBManager(a), this.gpsManager = new GeoBeans.GPSManager(a), this.poiManager = new GeoBeans.PoiManager(this.name), this.subManager = new GeoBeans.SubManager(a), this.serviceManager = new GeoBeans.ServiceManager(a), this.jobManager = new GeoBeans.JobManager(a)
	},
	logout: function() {
		this.mapManager = null, this.styleManager = null, this.dbsManager = null, this.fileManager = null, this.tileDBManager = null, this.rasterDBManager = null, this.gpsManager = null
	},
	getMapManager: function() {
		return this.mapManager
	},
	getStyleManager: function() {
		return this.styleManager
	},
	getDBSManager: function() {
		return this.dbsManager
	},
	getFileManager: function() {
		return this.fileManager
	},
	getTileDBManager: function(e) {
		return null == e ? null : (this.tileDBManager.setName(e), this.tileDBManager)
	},
	getRasterDBManager: function() {
		return this.rasterDBManager
	},
	getGPSManager: function() {
		return this.gpsManager
	},
	getPoiManager: function() {
		return this.poiManager
	},
	getSubManager: function() {
		return this.subManager
	},
	getServiceManager: function() {
		return this.serviceManager
	},
	getJobManager: function() {
		return this.jobManager
	}
});
GeoBeans.Utility = {
	getDistance: function(e, n, t, r) {
		return Math.sqrt((e - t) * (e - t) + (n - r) * (n - r))
	},
	distance2segment: function(e, n, t, r, i, o) {
		var l = 0;
		if (Math.abs(t - i) < Math.ESPLON) {
			var a = r < o ? r : o,
				s = r > o ? r : o;
			n > a && n < s ? l = Math.abs(e - t) : n < a ? l = Math.sqrt(Math.pow(e - t, 2) + Math.pow(n - a, 2)) : n > s && (l = Math.sqrt(Math.pow(e - t, 2) + Math.pow(n - s, 2)))
		} else if (Math.abs(r - o) < Math.ESPLON) {
			var u = t < i ? t : i,
				f = t > i ? t : i;
			e > u && e < f ? l = Math.abs(n - r) : e < u ? l = Math.sqrt(Math.pow(n - r, 2) + Math.pow(e - u, 2)) : n > s && (l = Math.sqrt(Math.pow(n - r, 2) + Math.pow(e - f, 2)))
		} else {
			var h = -(i - t) / (o - r),
				y = -1 / h,
				G = r - y * t,
				c = n - h * e,
				g = h - y,
				p = (G - c) / g,
				T = h * p + c,
				u = t < i ? t : i,
				f = t > i ? t : i;
			if (p > u && p < f || T > a && T < s) l = Math.sqrt(Math.pow(n - T, 2) + Math.pow(e - p, 2));
			else {
				var M = Math.sqrt(Math.pow(r - T, 2) + Math.pow(t - p, 2)),
					O = Math.sqrt(Math.pow(o - T, 2) + Math.pow(i - p, 2));
				l = M < O ? M : O
			}
		}
		return l
	},
	getRandom: function(e, n) {
		var t = n - e,
			r = Math.random();
		return e + Math.round(r * t)
	},
	createGeometryFromWKT: function(e) {
		if (null == e) return null;
		e = e.trimLeft();
		var n = this._getWKTType(e),
			t = this._getWKT(e, n);
		return t
	},
	_getWKTType: function(e) {
		if (null == e) return null;
		var n = null;
		return "POINT" == e.slice(0, 5) ? n = GeoBeans.Geometry.Type.POINT : "LINESTRING" == e.slice(0, 10) ? n = GeoBeans.Geometry.Type.LINESTRING : "POLYGON" == e.slice(0, 7) ? n = GeoBeans.Geometry.Type.POLYGON : "MULTIPOINT" == e.slice(0, 10) ? n = GeoBeans.Geometry.Type.MULTIPOINT : "MULTILINESTRING" == e.slice(0, 15) ? n = GeoBeans.Geometry.Type.MULTILINESTRING : "MULTIPOLYGON" == e.slice(0, 12) && (n = GeoBeans.Geometry.Type.MULTIPOLYGON), n
	},
	_getWKT: function(e, n) {
		var t = null;
		switch (n) {
		case GeoBeans.Geometry.Type.POINT:
			t = this._getWKTPoint(e);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			t = this._getWKTLineString(e);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			t = this._getWKTPolygon(e);
			break;
		case GeoBeans.Geometry.Type.MULTIPOINT:
			t = this._getWKTMultiPoint(e);
			break;
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			t = this._getWKTMultiLineString(e);
			break;
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			t = this._getWKTMultiPolygon(e)
		}
		return t
	},
	_getWKTPoint: function(e) {
		if (null != e) {
			var n = e.indexOf("("),
				t = e.lastIndexOf(")"),
				r = e.slice(n + 1, t);
			return this._prasePointByCoordinate(r)
		}
	},
	_getWKTLineString: function(e) {
		if (null != e) {
			var n = e.indexOf("("),
				t = e.lastIndexOf(")"),
				r = e.slice(n + 1, t),
				i = this._prasePointByCoordinates(r);
			if (null == i) return null;
			var o = new GeoBeans.Geometry.LineString(i);
			return o
		}
	},
	_prasePointByCoordinate: function(e) {
		var n = e.trim().split(/[ ]+/);
		if (2 != n.length) return null;
		var t = new GeoBeans.Geometry.Point(n[0], n[1]);
		return t
	},
	_prasePointByCoordinates: function(e) {
		for (var n = e.split(/[,]+/), t = [], r = 0; r < n.length; ++r) {
			var i = this._prasePointByCoordinate(n[r]);
			null != i && t.push(i)
		}
		return 0 == t.length ? null : t
	},
	_getWKTPolygon: function(e) {
		if (null == e) return null;
		for (var n = e.indexOf("("), t = e.lastIndexOf(")"), r = e.slice(n + 1, t), i = r.indexOf("("), o = r.indexOf(")"), l = []; i != -1;) {
			var a = r.slice(i + 1, o),
				s = this._prasePointByCoordinates(a);
			if (null != s) {
				var u = new GeoBeans.Geometry.LineString(s);
				l.push(u)
			}
			r = r.slice(o + 1), i = r.indexOf("("), o = r.indexOf(")")
		}
		if (0 == l.length) return null;
		var f = new GeoBeans.Geometry.Polygon(l);
		return f
	},
	_getWKTMultiPoint: function(e) {
		if (null == e) return null;
		var n = e.indexOf("("),
			t = e.lastIndexOf(")"),
			r = e.slice(n + 1, t),
			i = this._prasePointByCoordinates(r);
		if (null == i) return null;
		var o = new GeoBeans.Geometry.MultiPoint(i);
		return o
	},
	_getWKTMultiLineString: function(e) {
		if (null == e) return null;
		for (var n = e.indexOf("("), t = e.lastIndexOf(")"), r = e.slice(n + 1, t), i = r.indexOf("("), o = r.indexOf(")"), l = []; i != -1;) {
			var a = r.slice(i + 1, o),
				s = this._prasePointByCoordinates(a);
			if (null != s) {
				var u = new GeoBeans.Geometry.LineString(s);
				l.push(u)
			}
			r = r.slice(o + 1), i = r.indexOf("("), o = r.indexOf(")")
		}
		if (0 == l.length) return null;
		var f = new GeoBeans.Geometry.MultiLineString(l);
		return f
	},
	_getWKTMultiPolygon: function(e) {
		if (null == e) return null;
		for (var n = e.indexOf("((("), t = e.indexOf(")))"), r = e.slice(n + 1, t + 2), i = r.indexOf("(("), o = r.indexOf("))"), l = []; i != -1;) {
			for (var a = r.slice(i + 1, o + 1), s = a.indexOf("("), u = a.indexOf(")"), f = []; s != -1;) {
				var h = a.slice(s + 1, u),
					y = this._prasePointByCoordinates(h);
				if (null != y) {
					var G = new GeoBeans.Geometry.LineString(y);
					f.push(G)
				}
				a = a.slice(u + 1), s = a.indexOf("("), u = a.indexOf(")")
			}
			if (0 != f.length) {
				var c = new GeoBeans.Geometry.Polygon(f);
				l.push(c)
			}
			r = r.slice(o + 1), i = r.indexOf("(("), o = r.indexOf("))")
		}
		if (0 == l.length) return null;
		var g = new GeoBeans.Geometry.MultiPolygon(l);
		return g
	},
	_getClockDirection: function(e) {
		if (null == e || !$.isArray(e)) return null;
		for (var n = e.length, t = null, r = -1, i = 0, o = null, l = null, a = null, s = 0; s < n; ++s) o = (s + 1) % n, l = (s + 2) % n, t = e[s], a = (e[o].x - e[s].x) * (e[l].y * r - e[o].y * r), a -= (e[o].y * r - e[s].y * r) * (e[l].x - e[o].x), a < 0 ? i-- : a > 0 && i++;
		return i > 0 ? "Counterclockwise" : i < 0 ? "Clockwise" : null
	}
}, String.prototype.like = function(e) {
	return "string" == typeof e && null !== this && (e = e.replace(new RegExp("([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-])", "g"), "\\$1"), e = e.replace(/%/g, ".*").replace(/_/g, "."), RegExp("^" + e + "$", "gi").test(this))
};
GeoBeans.Workspace = GeoBeans.Class({
	name: null,
	initialize: function(n) {
		this.name = n
	},
	destory: function() {
		this.name = null
	}
});
GeoBeans.AQIIndexChart = GeoBeans.Class({
	name: null,
	container: null,
	dbName: null,
	tableName: null,
	chartFields: null,
	filterField: null,
	filterFieldValue: null,
	timeField: null,
	startTime: null,
	endTime: null,
	map: null,
	features: null,
	featureType: null,
	initialize: function(e, t, i, a, r, l, s, n, o, h) {
		this.name = e, this.container = t, this.dbName = i, this.tableName = a, this.chartFields = r, this.filterField = l, this.filterFieldValue = s, this.timeField = n, this.startTime = o, this.endTime = h
	},
	setMap: function(e) {
		this.map = e
	},
	setChartFields: function(e) {
		this.chartFields = e
	},
	cleanup: function() {
		this.chart.clear()
	},
	show: function() {
		null != this.container && null != this.dbName && null != this.tableName && null != this.chartFields && null != this.filterField && null != this.filterFieldValue && null != this.timeField && null != this.startTime && null != this.endTime && null != this.map && this.getFeatures()
	},
	getFeatures: function() {
		var e = new GeoBeans.BinaryLogicFilter;
		e.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd;
		var t = new GeoBeans.BinaryComparisionFilter;
		t.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
		var i = new GeoBeans.PropertyName;
		i.setName(this.filterField);
		var a = new GeoBeans.Literal;
		a.setValue(this.filterFieldValue), t.expression1 = i, t.expression2 = a, e.addFilter(t);
		var r = new GeoBeans.BinaryLogicFilter;
		r.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd;
		var l = new GeoBeans.BinaryComparisionFilter;
		l.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThanOrEqual, i = new GeoBeans.PropertyName, i.setName(this.timeField), a = new GeoBeans.Literal, a.setValue(this.startTime), l.expression1 = i, l.expression2 = a;
		var s = new GeoBeans.BinaryComparisionFilter;
		s.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprLessThanOrEqual, i = new GeoBeans.PropertyName, i.setName(this.timeField), a = new GeoBeans.Literal, a.setValue(this.endTime), s.expression1 = i, s.expression2 = a, r.addFilter(l), r.addFilter(s), e.addFilter(r);
		var n = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0"),
			o = new GeoBeans.FeatureType(n, this.tableName);
		this.featureType = o, this.featureType.getFeaturesFilterAsync2(null, this.dbName, e, null, null, [this.timeField].concat(this.chartFields), this.timeField, this, this.getFeatures_callback)
	},
	getFeatures_callback: function(e, t) {
		if (null != e && null != t) if (e.features = t, null == e.chart) {
			var i = e.getChartOption(),
				a = echarts.init(e.container);
			e.chart = a, a.setOption(i)
		} else {
			e.chart.clear();
			var i = e.getChartOption();
			e.chart.setOption(i)
		}
	},
	getChartOption: function() {
		if (null != this.features && null != this.featureType) {
			for (var e = [], t = [], i = 0; i < this.chartFields.length; ++i) {
				var a = this.featureType.getFieldIndex(this.chartFields[i]);
				e.push(a), t[i] = []
			}
			for (var r = [], l = this.featureType.getFieldIndex(this.timeField), s = null, n = null, i = 0; i < this.features.length; ++i) if (s = this.features[i], null != s && (n = s.values, null != n)) {
				for (var o = 0; o < e.length; ++o) {
					var a = e[o],
						h = n[a];
					h = parseFloat(h), t[o].push(h)
				}
				var u = n[l];
				r.push(u)
			}
			for (var p = [], i = 0; i < this.chartFields.length; ++i) {
				var d = {
					name: this.chartFields[i],
					type: "line",
					smooth: !0,
					data: t[i]
				};
				p.push(d)
			}
			var F = {
				toolbox: {
					show: !0,
					x: 0,
					y: "top",
					feature: {
						dataView: {
							show: !0,
							readOnly: !0
						},
						magicType: {
							show: !0,
							type: ["line", "bar"]
						},
						restore: {
							show: !0
						},
						saveAsImage: {
							show: !0
						}
					}
				},
				grid: {
					x: "130px"
				},
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data: this.chartFields,
					x: "184px",
					y: "top"
				},
				calculable: !0,
				xAxis: [{
					type: "value",
					boundaryGap: [0, .01]
				}],
				yAxis: [{
					type: "category",
					data: r
				}],
				series: p
			};
			return F
		}
	}
});
GeoBeans.AQIStatCompChart = GeoBeans.Class({
	name: null,
	container: null,
	dbName: null,
	tableName: null,
	chartFields: null,
	stationCodeField: null,
	stationCodes: null,
	timeField: null,
	startTime: null,
	endTime: null,
	positionField: null,
	map: null,
	features: null,
	featureType: null,
	chart: null,
	initialize: function(e, t, i, l, a, s, n, r, o, h, u) {
		this.name = e, this.container = t, this.dbName = i, this.tableName = l, this.chartFields = a, this.stationCodeField = s, this.stationCodes = n, this.timeField = r, this.startTime = o, this.endTime = h, this.positionField = u
	},
	setMap: function(e) {
		this.map = e
	},
	cleanup: function() {
		null != this.chart && this.chart.clear()
	},
	show: function() {
		null != this.container && null != this.dbName && null != this.tableName && null != this.chartFields && null != this.stationCodeField && null != this.stationCodes && null != this.timeField && null != this.startTime && null != this.endTime && null != this.map && this.getFeatures()
	},
	getFeatures: function() {
		var e = new GeoBeans.BinaryLogicFilter;
		e.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd;
		var t = new GeoBeans.BinaryLogicFilter;
		t.operator = GeoBeans.LogicFilter.OperatorType.LogicOprOr;
		var i = null,
			l = new GeoBeans.PropertyName;
		l.setName(this.stationCodeField);
		for (var a = 0; a < this.stationCodes.length; ++a) if (i = this.stationCodes[a], null != i) {
			var s = new GeoBeans.BinaryComparisionFilter;
			s.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
			var n = new GeoBeans.Literal;
			n.setValue(i), s.expression1 = l, s.expression2 = n, t.addFilter(s)
		}
		var r = new GeoBeans.BinaryLogicFilter;
		r.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd;
		var o = new GeoBeans.BinaryComparisionFilter;
		o.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThanOrEqual;
		var h = new GeoBeans.PropertyName;
		h.setName(this.timeField), literal = new GeoBeans.Literal, literal.setValue(this.startTime), o.expression1 = h, o.expression2 = literal;
		var u = new GeoBeans.BinaryComparisionFilter;
		u.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprLessThanOrEqual, literal = new GeoBeans.Literal, literal.setValue(this.endTime), u.expression1 = h, u.expression2 = literal, r.addFilter(o), r.addFilter(u), e.addFilter(t), e.addFilter(r);
		var d = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0"),
			p = new GeoBeans.FeatureType(d, this.tableName);
		this.featureType = p, this.featureType.getFeaturesFilterAsync2(null, this.dbName, e, null, null, [this.timeField, this.stationCodeField, this.positionField].concat(this.chartFields), this.timeField, this, this.getFeatures_callback)
	},
	getFeatures_callback: function(e, t) {
		if (null != e && null != t) {
			e.features = t;
			var i = e.getChartOption(),
				l = echarts.init(e.container);
			l.setOption(i), e.chart = l
		}
	},
	getChartOption: function() {
		if (null == this.features || null == this.featureType) return null;
		for (var e = this.getTimePointsList(), t = this.featureType.getFieldIndex(this.timeField), i = [], l = [], a = 0; a < this.chartFields.length; ++a) {
			var s = this.featureType.getFieldIndex(this.chartFields[a]);
			i.push(s), l[a] = []
		}
		for (var n = this.featureType.getFieldIndex(this.stationCodeField), r = null, o = null, h = null, u = null, d = null, p = null, F = null, c = [], f = [], a = 0; a < this.stationCodes.length; ++a) if (u = this.stationCodes[a], null != u) {
			c[a] = [];
			for (var m = 0; m < this.chartFields.length; ++m) null != this.chartFields[m] && (c[a][m] = [])
		}
		for (var a = 0; a < this.features.length; ++a) if (r = this.features[a], null != r && (o = r.values, null != o)) {
			h = o[n], p = o[t];
			for (var m = 0; m < this.stationCodes.length; ++m) if (u = this.stationCodes[m], null != u && h == u) for (var g = 0; g < e.length; ++g) if (d = e[g], null != d && d == p) for (var y = 0; y < this.chartFields.length; ++y) F = this.chartFields[y], null != F && (chartFieldValue = o[i[y]], chartFieldValue = parseFloat(chartFieldValue), c[m][y].push(chartFieldValue))
		}
		for (var f = this.getPositionNames(), v = [], C = [], T = null, B = null, G = null, a = 0; a < c.length; ++a) if (T = c[a], null != T) for (var m = 0; m < T.length; ++m) B = T[m], null != B && (G = {
			name: f[a] + "--" + this.chartFields[m],
			type: "line",
			smooth: !0,
			data: B
		}, C.push(G), v.push(f[a] + "--" + this.chartFields[m]));
		var x = {
			toolbox: {
				show: !0,
				x: 0,
				y: "top",
				feature: {
					dataView: {
						show: !0,
						readOnly: !0
					},
					magicType: {
						show: !0,
						type: ["line", "bar"]
					},
					restore: {
						show: !0
					},
					saveAsImage: {
						show: !0
					}
				}
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: v,
				x: "140px",
				y: "top"
			},
			calculable: !0,
			yAxis: [{
				type: "value",
				boundaryGap: [0, .01]
			}],
			xAxis: [{
				type: "category",
				data: e
			}],
			series: C
		};
		return x
	},
	getTimePointsList: function() {
		for (var e = [], t = null, i = null, l = null, a = this.featureType.getFieldIndex(this.timeField), s = 0; s < this.features.length; ++s) i = this.features[s], null != i && (l = i.values, null != l && (t = l[a], null != t && e.indexOf(t) == -1 && e.push(t)));
		return e
	},
	getPositionNames: function() {
		for (var e = this.featureType.getFieldIndex(this.positionField), t = [], i = this.featureType.getFieldIndex(this.stationCodeField), l = 0; l < this.stationCodes.length; ++l) for (var a = this.stationCodes[l], s = 0; s < this.features.length; ++s) {
			var n = this.features[s];
			if (null != n) {
				var r = n.values;
				if (null != r) {
					var o = r[i];
					if (a == o) {
						var h = r[e];
						if (null == t[l]) {
							t.push(h);
							break
						}
					}
				}
			}
		}
		return t
	}
});
GeoBeans.AQITimePointList = GeoBeans.Class({
	map: null,
	name: null,
	dbName: null,
	tableName: null,
	timeField: null,
	startTime: null,
	endTime: null,
	initialize: function(e, i, r, t, a, l) {
		this.name = e, this.dbName = i, this.tableName = r, this.timeField = t, this.startTime = a, this.endTime = l
	},
	setMap: function(e) {
		this.map = e
	},
	getTimeList: function() {
		if (null == this.map) return null;
		var e = new GeoBeans.BinaryLogicFilter;
		e.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd;
		var i = new GeoBeans.BinaryComparisionFilter;
		i.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThanOrEqual, prop = new GeoBeans.PropertyName, prop.setName(this.timeField), literal = new GeoBeans.Literal, literal.setValue(this.startTime), i.expression1 = prop, i.expression2 = literal;
		var r = new GeoBeans.BinaryComparisionFilter;
		r.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprLessThan, prop = new GeoBeans.PropertyName, prop.setName(this.timeField), literal = new GeoBeans.Literal, literal.setValue(this.endTime), r.expression1 = prop, r.expression2 = literal, e.addFilter(i), e.addFilter(r);
		var t = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0"),
			a = new GeoBeans.FeatureType(t, this.tableName),
			l = new GeoBeans.OrderBy;
		l.addField(this.timeField), l.setOrder(GeoBeans.OrderBy.OrderType.OrderAsc);
		var n = a.getFeaturesFilter(null, this.dbName, e, null, null, [this.timeField], l);
		if (null == n) return null;
		for (var s = [], o = null, p = null, m = null, u = a.getFieldIndex(this.timeField), d = 0; d < n.length; ++d) o = n[d], null != o && (p = o.values, null != p && (m = p[u], s.push(m)));
		return s
	}
});
GeoBeans.TimeLineBar = GeoBeans.Class({
	slider: null,
	wrapper: null,
	broadcastIntervalId: null,
	initialized: !1,
	boardcast: null,
	layer: null,
	map: null,
	timePoints: null,
	initialize: function(i) {
		if (null != i) {
			this.layer = i;
			var t = this.layer.map;
			if (null != t) {
				this.map = t, this.map.mapDiv.find("#slider").remove();
				var a = '<div class="slider-wrap" id="slider">\t<button class="timeline-play" id="slider_player">\t\t<img src="../images/timeline-play.png">\t</button>   <div class="timeline"></div>\t  <div class="label-div"></div></div>';
				this.map.mapDiv.append(a);
				var s = i.getTimePoints();
				this.timePoints = s;
				var e = this;
				if (!this.initialized) {
					this.wrapper = this.map.mapDiv.find("#slider"), this.slider = this.wrapper.find(".timeline"), this.slider.noUiSlider({
						start: 0,
						range: {
							min: 0,
							max: s.length - 1
						},
						step: 1
					});
					for (var l = 1, r = 1; r < s.length - 1; r++) {
						var n = r / (s.length - 1) * 100,
							d = $('<span class="ui-slider-segment"></span>');
						d.attr("data-content", l + r).css("left", n + "%"), this.slider.append(d)
					}
					this.boardcast = this.wrapper.find(".timeline-play"), this.boardcast.click(function(i) {
						var t = $(this).find("img"),
							a = t.attr("src");
						/play/.test(a) ? t.attr("src", a.replace("play", "pause")) : t.attr("src", a.replace("pause", "play")), e.broadcast()
					}), this.slider.on("set", function() {
						var i = parseInt($(this).val());
						e.layer.currentLayerID = i, e.layer.map.drawLayersAll()
					}), this.addLabels(), this.initialized = !0
				}
			}
		}
	},
	show: function() {
		this.wrapper.css("display", "block")
	},
	hide: function() {
		this.wrapper.css("display", "none")
	},
	broadcast: function() {
		var i = this;
		null != this.broadcastIntervalId ? (clearInterval(this.broadcastIntervalId), this.broadcastIntervalId = null) : this.broadcastIntervalId = setInterval(function() {
			var t = i.slider.val();
			t = parseInt(t), t === i.timePoints.length - 1 ? i.slider.val(0) : i.slider.val(t + 1)
		}, this.layer.interval)
	},
	cleanup: function() {
		this.map.mapDiv.find("#slider").remove(), clearInterval(this.broadcastIntervalId), this.broadcastIntervalId = null, this.slider = null, this.wrapper = null, this.initialized = !1, this.boardcast = null
	},
	addLabels: function() {
		if (!(null == this.timePoints || this.timePoints.length < 2)) {
			var i = this.timePoints.length,
				t = this.timePoints[0],
				a = document.createElement("canvas"),
				s = a.getContext("2d");
			s.font = "12px Arial, Verdana, sans-seri";
			var e = s.measureText(t).width,
				l = this.slider.width(),
				r = l / (i - 1),
				n = "";
			if (r > e) {
				var d = e / 2 * -1;
				this.wrapper.find(".label-div").css("margin-left", d).css("width", "calc(100% + " + e + "px)");
				for (var p = 0; p < i; ++p) {
					var h = 0;
					h = 0 == p ? 0 : r - e, n += "<div class='time-label' style='padding-left:" + h + "px'>" + this.timePoints[p] + "</div>"
				}
				this.wrapper.find(".label-div").html(n)
			} else {
				for (var c = Math.ceil(e / r), p = 0; p + c < i; p += c) {
					var h = 0;
					h = 0 == p ? 0 : c * r - e, n += "<div class='time-label' style='padding-left:" + h + "px'>" + this.timePoints[p] + "</div>"
				}
				h += (i - 1 - p) * r, n += "<div class='time-label' style='padding-left:" + h + "px'>" + this.timePoints[i - 1] + "</div>";
				var d = e / 2 * -1;
				this.wrapper.find(".label-div").css("margin-left", d).css("width", "calc(100% + " + e + "px)"), this.wrapper.find(".label-div").html(n)
			}
		}
	}
});
GeoBeans.AuthManager = GeoBeans.Class({
	server: null,
	service: "was",
	version: "1.0.0",
	initialize: function(e) {
		this.server = e
	},
	createUser: function(e, n, t, r, s, i) {
		if (null == e || null == n || null == t || null == r || null == s) return void(null == i && i("params is invalid"));
		var o = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=createUser&name=" + e + "&alias=" + n + "&password=" + t + "&email=" + r + "&role=" + s;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var t = o.parseCreateUser(e);
				null != i && i(t)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseCreateUser: function(e) {
		var n = $(e).find("CreateUser").text();
		if ("success" == n.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	login: function(e, n, t) {
		if (null == e || null == n) return void(null != t && t("params is invalid"));
		var r = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=login&name=" + e + "&password=" + n;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var s = r.parseLogin(e);
				null != t && t(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseLogin: function(e) {
		var n = $(e).find("Login").text();
		if ("success" == n.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	logout: function(e, n) {
		if (null == e) return void(null != n && n("name is null"));
		var t = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=logout&name=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = t.parseLogout(e);
				null != n && n(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseLogout: function(e) {
		var n = $(e).find("Logout").text();
		if ("success" == n.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	getUser: function(e, n) {
		if (null == e) return void(null != n && n("name is null"));
		var t = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=GetUser&name=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = t.parseGetUser(e);
				null != n && n(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseGetUser: function(e) {
		var n = $(e).find("ExceptionText").text();
		if ("" != n) return n;
		var t = null;
		return $(e).find("User").each(function() {
			var e = $(this).find("Name").text(),
				n = $(this).find("Alias").text(),
				r = $(this).find("Email").text(),
				s = $(this).find("Role").text();
			null != e && (t = {
				name: e,
				alias: n,
				email: r,
				role: s
			})
		}), t
	},
	getUserList: function(e, n, t) {
		var r = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=GetUser";
		null != e && (s += "&count=" + e), null != n && (s += "&offset=" + n), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var s = r.parseGetUserList(e);
				null != t && t(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseGetUserList: function(e) {
		var n = [];
		return $(e).find("Users>User").each(function() {
			var e = $(this).find("Name").text(),
				t = $(this).find("Alias").text(),
				r = $(this).find("Email").text(),
				s = $(this).find("Role").text();
			if (null != e) {
				var i = {
					name: e,
					alias: t,
					email: r,
					role: s
				};
				n.push(i)
			}
		}), n
	},
	getUserCount: function(e) {
		var n = this,
			t = "service=" + this.service + "&version=" + this.version + "&request=GetUserCount";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(t),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(t, r) {
				var s = n.parseGetUserCount(t);
				null != e && e(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseGetUserCount: function(e) {
		var n = $(e).find("UserCount").text();
		return n
	},
	getOnlineUser: function(e, n, t) {
		var r = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=GetOnlineUser";
		null != e && (s += "&count=" + e), null != n && (s += "&offset=" + n), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var s = r.parseGetOnlineUserList(e);
				null != t && t(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseGetOnlineUserList: function(e) {
		var n = [];
		return $(e).find("Users>User").each(function() {
			var e = $(this).find("Name").text();
			n.push(e)
		}), n
	},
	removeUser: function(e, n) {
		if (null == e && null != n) return void n("name is null");
		var t = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=RemoveUser&name=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = t.parseRemoveUser(e);
				null != n && n(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseRemoveUser: function(e) {
		var n = $(e).find("RemoveUser").text(),
			t = "";
		return "SUCCESS" == n.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	getLoginCount: function(e) {
		var n = this,
			t = "service=" + this.service + "&version=" + this.version + "&request=GetLoginCount";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(t),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(t, r) {
				var s = n.parseGetLoginCount(t);
				null != e && e(s)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parseGetLoginCount: function(e) {
		var n = $(e).find("LoginCount").text();
		return n
	}
});
GeoBeans.Control.DragMapControl = GeoBeans.Class(GeoBeans.Control, {
	onmousedown: null,
	beginDragHandler: null,
	dragingHandler: null,
	endDragHandler: null,
	initialize: function(e) {
		GeoBeans.Control.prototype.initialize.apply(this, arguments), this.map = e, this.type = "DragMapControl";
		var n = this,
			a = function(e) {
				if (n.enabled && "CANVAS" == e.target.tagName.toUpperCase()) {
					e.preventDefault();
					var a, t, o, r, i = n.map,
						s = i.saveSnap(),
						l = 0,
						p = 0;
					i.width, i.height;
					a = e.layerX, t = e.layerY;
					var u = i.transformation.toMapPoint(a, t),
						d = !0;
					if (null != n.beginDragHandler) {
						var m = a,
							v = t;
						if (null == n.map.transformation) return;
						var f = n.map.transformation.toMapPoint(m, v),
							y = new GeoBeans.Event.MouseArgs;
						y.buttn = null, y.X = m, y.Y = v, y.mapX = f.x, y.mapY = f.y, n.beginDragHandler(y)
					}
					var g = function(e) {
							if (e.preventDefault(), d) {
								n.map.closeTooltip(), n.draging = !0, document.body.style.cursor = "pointer", l += e.layerX - a, p += e.layerY - t, i.drawBackground(), i.putSnap(l, p);
								var s = i.transformation.toMapPoint(e.layerX, e.layerY);
								o = u.x - s.x, r = u.y - s.y, i.offset(o, r);
								var m = i.infoWindow;
								if (null != m) {
									var v = i.mapDiv.find(".popover");
									if (1 == v.length) {
										var f = (m.attr("x"), m.attr("y"), i.width),
											y = i.height,
											g = m.css("left"),
											c = m.css("top");
										g = parseInt(g.slice(0, g.indexOf("px"))), c = parseInt(c.slice(0, c.indexOf("px"))), g += e.layerX - a, c += e.layerY - t;
										var h = v.css("width"),
											x = v.css("height");
										h = parseInt(h.slice(0, h.indexOf("px"))), x = parseInt(x.slice(0, x.indexOf("px"))), g - h / 2 < 0 || g + h / 2 > f || c - x < 0 || c > y ? (m.popover("hide"), i.queryLayer.clearFeatures()) : (m.css("left", g + "px"), m.css("top", c + "px"), m.popover("hide").popover("show"), v.find(".popover-title").append('<button type="button" class="close">&times;</button>'), v.find(".popover-title").find(".close").click(function() {
											$(this).parents(".popover").popover("hide")
										}))
									}
								}
								if (a = e.layerX, t = e.layerY, null != n.dragingHandler) {
									var D = a,
										w = t;
									if (null == n.map.transformation) return;
									var X = n.map.transformation.toMapPoint(D, w),
										Y = new GeoBeans.Event.MouseArgs;
									Y.buttn = null, Y.X = D, Y.Y = w, Y.mapX = X.x, Y.mapY = X.y, n.dragingHandler(Y)
								}
							}
						},
						c = function(e) {
							console.log("drag up"), e.preventDefault(), s = null, d = !1, n.draging = !1;
							var a = i.transformation.toMapPoint(e.layerX, e.layerY);
							if (o = u.x - a.x, r = u.y - a.y, i.draw(), i.cleanupSnap(), document.body.style.cursor = "default", i.mapDiv[0].removeEventListener("mousemove", g), i.mapDiv[0].removeEventListener("mouseup", c), null != n.endDragHandler) {
								var t = e.layerX,
									l = e.layerY;
								if (null == n.map.transformation) return;
								var p = n.map.transformation.toMapPoint(t, l),
									m = new GeoBeans.Event.MouseArgs;
								m.buttn = null, m.X = t, m.Y = l, m.mapX = p.x, m.mapY = p.y, n.endDragHandler(m)
							}
						};
					i.mapDiv[0].addEventListener("mousemove", g), i.mapDiv[0].addEventListener("mouseup", c)
				}
			};
		this.onmousedown = a, this.map.mapDiv[0].addEventListener("mousedown", this.onmousedown)
	},
	destory: function() {
		this.map.mapDiv[0].removeEventListener("mousedown", this.onmousedown), GeoBeans.Control.prototype.destory.apply(this, arguments)
	}
});
GeoBeans.Control.FeatureHitControl = GeoBeans.Class(GeoBeans.Control, {
	map: null,
	layer: null,
	onmousemove: null,
	callback: null,
	tolerance: 10,
	selection: [],
	ptsymbol: null,
	lnsymbol: null,
	rnsymbol: null,
	initialize: function(e, o) {
		GeoBeans.Control.prototype.initialize.apply(this, arguments), this.type = "FeatureHitControl", this.layer = e, this.map = e.map, this.ptsymbol = this.createPointSymbolizer(), this.lnsymbol = this.createLineSymbolizer(), this.rnsymbol = this.createPolygonSymbolizer(), null != this.map
	},
	destory: function() {
		this.layer = null, this.enabled(!1), GeoBeans.Control.prototype.destory.apply(this, arguments)
	},
	enable: function(e) {
		if (null != this.map) if (this.enabled = e, this.enabled) {
			var o = null,
				t = null,
				n = this;
			this.onmousemove = function(e) {
				if (null == o) o = e.layerX, t = e.layerY;
				else {
					var l = Math.abs(e.layerX - o) + Math.abs(e.layerY - t);
					if (l > n.tolerance) {
						console.log(l), o = e.layerX, t = e.layerY;
						var i = n.map.transformation.toMapPoint(e.layerX, e.layerY);
						n.hit(i.x, i.y, n.callback)
					}
				}
			}, this.map.canvas.addEventListener("mousemove", this.onmousemove)
		} else this.map.canvas.addEventListener("mousemove", this.onmousemove), this.onmousemove = null
	},
	hit: function(e, o, t) {
		if (null != this.layer) {
			var n = this.layer.features;
			if (null != n) {
				this.map.renderer, this.map.transformation;
				this.selection = [], console.log(e + "," + o);
				var l = 0,
					i = null,
					a = null,
					s = n.length;
				for (l = 0; l < s; l++) i = n[l], a = i.geometry, null != a && a.hit(e, o, this.map.tolerance) && this.selection.push(i);
				this.highlight(this.selection), void 0 != t && t(this.layer, this.selection)
			}
		}
	},
	highlight: function(e) {
		for (var o = this.map.renderer, t = e.length, n = 0; n < t; n++) {
			var l = e[n],
				i = l.geometry;
			switch (i.type) {
			case GeoBeans.Geometry.Type.POINT:
			case GeoBeans.Geometry.Type.MULTIPOINT:
				o.setSymbolizer(this.ptsymbol), o.drawGeometry(i, this.ptsymbol, this.map.transformation);
				break;
			case GeoBeans.Geometry.Type.LINESTRING:
			case GeoBeans.Geometry.Type.MULTILINESTRING:
				o.setSymbolizer(this.lnsymbol), o.drawGeometry(i, this.lnsymbol, this.map.transformation);
				break;
			case GeoBeans.Geometry.Type.POLYGON:
			case GeoBeans.Geometry.Type.MULTIPOLYGON:
				o.setSymbolizer(this.rnsymbol), o.drawGeometry(i, this.rnsymbol, this.map.transformation)
			}
		}
	},
	createPointSymbolizer: function() {
		var e;
		return e = new GeoBeans.Style.PointSymbolizer, e.size = 5, e.fillColor = "rgba(255,0,0,0.25)", e.outLineWidth = 1, e.outLineColor = "rgba(255,255,0,0.55)", e.outLineCap = GeoBeans.Style.LineCap.ROUND, e.outLineJoin = GeoBeans.Style.LineJoin.ROUND, e.showOutline = !0, e
	},
	createLineSymbolizer: function() {
		var e;
		return e = new GeoBeans.Style.LineSymbolizer, e.width = 1, e.color = "Red", e.lineCap = GeoBeans.Style.LineCap.ROUND, e.lineJoin = GeoBeans.Style.LineJoin.ROUND, e
	},
	createPolygonSymbolizer: function() {
		var e;
		return e = new GeoBeans.Style.PolygonSymbolizer, e.size = 5, e.fillColor = "rgba(255,0,0,0.25)", e.outLineWidth = 1, e.outLineColor = "rgba(255,255,0,0.55)", e.outLineCap = GeoBeans.Style.LineCap.ROUND, e.outLineJoin = GeoBeans.Style.LineJoin.ROUND, e.showOutline = !0, e
	}
});
GeoBeans.Control.MapNavControl = GeoBeans.Class(GeoBeans.Control, {
	controlDiv: null,
	initialize: function(a) {
		this.type = GeoBeans.Control.Type.NAV, this.map = a;
		var o = '<div class="map-nav-wrapper">\t<div class="map-nav-pan">\t<div class="map-nav-pan">\t\t<div class="map-nav-button map-nav-pan-N"></div>\t\t<div class="map-nav-button map-nav-pan-W"></div>\t\t<div class="map-nav-button map-nav-pan-E"></div>\t\t<div class="map-nav-button map-nav-pan-S"></div>\t</div>\t<div class="map-nav-zoom">\t\t<div class="map-nav-button map-nav-zoom-in"></div>\t\t<div class="map-nav-button map-nav-zoom-out"></div>\t\t<div class="map-nav-zoom-slider">\t\t\t<div class="map-nav-zoom-slider-top"></div>\t\t\t<div class="map-nav-zoom-slider-bottom"></div>\t\t\t<div class="map-nav-zoom-slider-bar"></div>\t\t</div>\t\t<div class="map-nav-zoom-labels">\t\t\t<div class="map-nav-zoom-label map-nav-zoom-label-street"></div>\t\t\t<div class="map-nav-zoom-label map-nav-zoom-label-city"></div>\t\t\t<div class="map-nav-zoom-label map-nav-zoom-label-province"></div>\t\t\t<div class="map-nav-zoom-label map-nav-zoom-label-country"></div>\t\t\t<div class="map-nav-zoom-label map-nav-zoom-level"></div>\t\t</div>\t</div></div>';
		this.map.mapDiv.append(o), this.controlDiv = $(".map-nav-wrapper"), this.map.mapDiv.find(".map-nav-pan-N").mouseover(function() {
			$(this).parent().css("background-position", "0 -44px")
		}), this.map.mapDiv.find(".map-nav-pan-W").mouseover(function() {
			$(this).parent().css("background-position", "0 -176px")
		}), this.map.mapDiv.find(".map-nav-pan-E").mouseover(function() {
			$(this).parent().css("background-position", "0 -88px")
		}), this.map.mapDiv.find(".map-nav-pan-S").mouseover(function() {
			$(this).parent().css("background-position", "0 -132px")
		}), this.map.mapDiv.find(".map-nav-pan div").mouseout(function() {
			$(this).parent().css("background-position", "0 0")
		});
		var t = this;
		this.map.mapDiv.find(".map-nav-pan-N").click(function() {
			var a = t.map.center,
				o = t.map.transformation.toMapPoint(t.map.width / 2, 0);
			t.map.saveSnap(), t.map.putSnap(0, -t.map.height / 2), t.map.offset(0, a.y - o.y), t.map.draw()
		}), this.map.mapDiv.find(".map-nav-pan-S").click(function() {
			var a = t.map.center,
				o = t.map.transformation.toMapPoint(t.map.width / 2, 0);
			t.map.saveSnap(), t.map.drawBackground(), t.map.putSnap(0, t.map.height / 2), t.map.offset(0, o.y - a.y), t.map.draw()
		}), this.map.mapDiv.find(".map-nav-pan-W").click(function() {
			var a = t.map.center,
				o = t.map.transformation.toMapPoint(t.map.width, t.map.height / 2);
			t.map.saveSnap(), t.map.drawBackground(), t.map.putSnap(-t.map.width / 2, 0), t.map.offset(o.x - a.x, 0), t.map.draw()
		}), this.map.mapDiv.find(".map-nav-pan-E").click(function() {
			var a = t.map.center,
				o = t.map.transformation.toMapPoint(t.map.width, t.map.height / 2);
			t.map.saveSnap(), t.map.drawBackground(), t.map.putSnap(t.map.width / 2, 0), t.map.offset(a.x - o.x, 0), t.map.draw()
		}), this.map.mapDiv.find(".map-nav-zoom-in").click(function() {
			var a = t.map.level + 1,
				o = t.map.getMaxLevel(),
				n = t.map.getMinLevel();
			null == a || a < 1 || null == t.map.baseLayer || a > o || a < n || (t.map.saveSnap(), t.map.drawBackground(), t.map.drawBaseLayerSnap(a), t.map.setLevel(a), t.map.draw())
		}), this.map.mapDiv.find(".map-nav-zoom-out").click(function() {
			var a = t.map.level - 1,
				o = t.map.getMaxLevel(),
				n = t.map.getMinLevel();
			null == a || a < 1 || null == t.map.baseLayer || a > o || a < n || (t.map.saveSnap(), t.map.drawBackground(), t.map.drawBaseLayerSnap(a), t.map.setLevel(a), t.map.draw())
		});
		var n = function(a) {
				a.preventDefault();
				var o = a.clientX,
					n = a.clientY,
					e = !0,
					p = function(a) {
						if (a.preventDefault(), e) {
							console.log("brefore Y :" + n), console.log("current Y :" + a.clientY);
							var p = (a.clientX - o, a.clientY - n);
							console.log("offsetY Y :" + p);
							var m = $(".map-nav-zoom-slider-bar").css("top"),
								i = parseFloat(m.slice(0, m.lastIndexOf("px"))),
								s = i + p;
							o = a.clientX, n = a.clientY, console.log("topMove:" + s);
							var v = $(".map-nav-zoom-slider").height(),
								l = v - s + 10,
								r = 17,
								c = 2,
								d = $(".map-nav-zoom-slider").height() / 18,
								u = v - d * (r - 1),
								h = v - d * (c - 1);
							20 - Math.floor(s / d);
							if (s < u) {
								var f = d * (r - 1) + 10;
								$(".map-nav-zoom-slider-bar").css("top", u + "px"), $(".map-nav-zoom-slider-bottom").css("top", u + "px"), $(".map-nav-zoom-slider-bottom").css("height", f + "px")
							} else if (s > h) {
								console.log("topMove > minZoomPosition" + s);
								var b = d * (t.map.baseLayer.MIN_ZOOM_LEVEL - 1) + 10;
								$(".map-nav-zoom-slider-bar").css("top", h + "px"), $(".map-nav-zoom-slider-bottom").css("top", h + "px"), $(".map-nav-zoom-slider-bottom").css("height", b + "px")
							} else $(".map-nav-zoom-slider-bar").css("top", s + "px"), $(".map-nav-zoom-slider-bottom").css("top", s + "px"), $(".map-nav-zoom-slider-bottom").css("height", l + "px")
						}
					},
					m = function(a) {
						a.preventDefault(), $(".map-nav-zoom-slider-bar")[0].removeEventListener("mousemove", p), $(".map-nav-zoom-slider-bar")[0].removeEventListener("mouseup", m), e = !1;
						var o = $(".map-nav-zoom-slider-bar").css("top"),
							n = parseFloat(o.slice(0, o.lastIndexOf("px"))),
							i = $(".map-nav-zoom-slider").height() / 18,
							s = 19 - Math.ceil(n / i);
						mapObj.level != s && (t.map.drawBackground(), t.map.setLevel(s), t.map.draw())
					},
					i = function(a) {
						a.preventDefault(), $(".map-nav-zoom-slider-bar")[0].removeEventListener("mousemove", p), $(".map-nav-zoom-slider-bar")[0].removeEventListener("mouseup", m), e = !1
					};
				$(".map-nav-zoom-slider-bar")[0].addEventListener("mousemove", p), $(".map-nav-zoom-slider-bar")[0].addEventListener("mouseup", m), $(".map-nav-zoom-slider-bar")[0].addEventListener("mouseout", i)
			};
		$(".map-nav-zoom-slider-bar")[0].addEventListener("mousedown", n), $(".map-nav-zoom").mouseover(function() {
			$(".map-nav-zoom-labels").css("display", "block"), $(".map-nav-zoom-label").css("display", "block")
		}), $(".map-nav-zoom").mouseout(function() {
			$(".map-nav-zoom-labels").css("display", "none")
		}), $(".map-nav-zoom-label-street").click(function() {
			17 > t.map.getMinLevel() && 17 <= t.map.getMaxLevel() && (t.map.drawBackground(), t.map.setLevel(17), t.map.draw())
		}), $(".map-nav-zoom-label-city").click(function() {
			12 > t.map.getMinLevel() && 12 < t.map.getMaxLevel() && (t.map.drawBackground(), t.map.setLevel(12), t.map.draw())
		}), $(".map-nav-zoom-label-province").click(function() {
			8 > t.map.getMinLevel() && 8 < t.map.getMaxLevel() && (t.map.drawBackground(), t.map.setLevel(8), t.map.draw())
		}), $(".map-nav-zoom-label-country").click(function() {
			4 > t.map.getMinLevel() && 4 < t.map.getMaxLevel() && (t.map.drawBackground(), t.map.setLevel(4), t.map.draw())
		})
	},
	setZoomSlider: function(a) {
		if (!(null == a || a < 1 || null == this.map.baseLayer || a > this.map.getMaxLevel() || a < this.map.getMinLevel())) {
			var o = $(".map-nav-zoom-slider").height(),
				t = o / 18,
				n = t * (a - 1);
			$(".map-nav-zoom-slider-bar").css("top", o - n), $(".map-nav-zoom-slider-bottom").css("height", n + 10), $(".map-nav-zoom-slider-bottom").css("top", o - n), this.setLevelPosition()
		}
	},
	setEnable: function(a) {
		a ? 0 != this.controlDiv.length && this.controlDiv.css("display", "block") : 0 != this.controlDiv.length && this.controlDiv.css("display", "none")
	},
	setLevelPosition: function() {
		var a = this.controlDiv.find(".map-nav-zoom-level"),
			o = this.controlDiv.find(".map-nav-zoom-slider-bar"),
			t = o.css("top");
		t = t.slice(0, t.length - 2), t = parseFloat(t);
		var n = t + 21 - a.height() / 2;
		a.css("top", n + "px");
		var e = this.map.level;
		a.html(e)
	},
	setPosition: function(a, o) {
		a >= 0 ? this.controlDiv.css("left", a + "px") : this.controlDiv.css("right", a + "px"), o >= 0 ? this.controlDiv.css("top", o + "px") : this.controlDiv.css("bottom", o + "px")
	}
});
GeoBeans.Control.SrollMapControl = GeoBeans.Class(GeoBeans.Control, {
	onmousewheel: null,
	count: 0,
	userHandler: null,
	initialize: function(e) {
		GeoBeans.Control.prototype.initialize.apply(this, arguments), this.map = e;
		var a = this;
		this.type = GeoBeans.Control.Type.SCROLL_MAP;
		var r = function(r, n) {
				if (a.enabled) {
					r.preventDefault();
					var l = e.getMaxLevel(),
						t = e.getMinLevel(),
						s = e._getTrackOverlayControl();
					s.drawing && e.restoreSnap();
					var o = e._getBufferTracker();
					if (null != o && o.drawing && e.restoreSnap(), null != e.baseLayer) {
						var i = e.level;
						if (r.wheelDelta > 0) if (1 != e.baseLayer.imageScale) {
							var v = 1 / (1 + .2 * n);
							e.viewer.scale(v), i = e.getLevel(e.viewer), e.saveSnap(), e.drawBackground(), e.drawLayersSnap(v), e._setLevel(i), e.draw()
						} else i += n, i > l && (i = l), e.saveSnap(), e.drawBackground(), e.drawBaseLayerSnap(i), e.setLevel(i), e.draw();
						else if (1 != e.baseLayer.imageScale) {
							var v = 1 + .2 * n;
							e.viewer.scale(v), i = e.getLevel(e.viewer), e.saveSnap(), e.drawBackground(), e.drawLayersSnap(v), e._setLevel(i), e.draw()
						} else i -= n, i < t && (i = t), e.saveSnap(), e.drawBackground(), e.drawBaseLayerSnap(i), e.setLevel(i), e.draw()
					} else if (r.wheelDelta > 0) {
						var v = 1 / (1 + .2 * n);
						e.saveSnap(), e.drawBackground(), e.drawLayersSnap(v), e.viewer.scale(v), e.transformation.update(), e.draw()
					} else {
						var v = 1 + .2 * n;
						e.saveSnap(), e.drawBackground(), e.drawLayersSnap(v), e.viewer.scale(v), e.transformation.update(), e.draw()
					}
					e.saveSnap(), s.drawing && s.drawingEvent(), null != o && o.drawing && o.drawingEvent()
				}
			};
		this.mousewheel = function(n) {
			a.count = a.count + 1;
			var l = a.count;
			setTimeout(function() {
				a.count == l && (r(n, a.count), a.count = 0, null != a.userHandler && a.userHandler({
					level: e.level
				}))
			}, 200)
		}, e.mapDiv[0].addEventListener("mousewheel", this.mousewheel)
	},
	destory: function() {
		this.map.mapDiv[0].removeEventListener("mousewheel", this.mousewheel), GeoBeans.Control.prototype.destory.apply(this, arguments)
	}
});
GeoBeans.Control.TrackControl = GeoBeans.Class(GeoBeans.Control, {
	map: null,
	onMouseDown: null,
	onMouseMove: null,
	onMouseDClick: null,
	initialize: function() {
		this.type = GeoBeans.Control.Type.TRACK
	},
	destory: function() {
		this.end()
	},
	trackPoint: function(e, n, a) {
		var t = this;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var o = function(o) {
				if (t.drawPoint(o.layerX, o.layerY), null != e && void 0 != e) {
					var r = t.map.transformation.toMapPoint(o.layerX, o.layerY);
					e(r, n, a)
				}
			},
			r = function(e) {
				t.map.restoreSnap(), t.drawPoint(e.layerX, e.layerY)
			};
		this.onMouseDown = o, this.onMouseMove = r, this.map.mapDiv[0].addEventListener("mousemove", r), this.map.mapDiv[0].addEventListener("mousedown", o)
	},
	trackLine: function(e, n, a, t) {
		var o = this,
			r = [],
			i = [],
			s = !1;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var l = function(l) {
				l.preventDefault();
				for (var u = !1, m = 0; m < r.length; ++m) {
					var p = r[m],
						v = p.x,
						y = p.y;
					v == l.layerX && y == l.layerY && (u = !0)
				}
				var h = function(e) {
						o.map.restoreSnap(), o.drawLine(r, e.layerX, e.layerY), o.drawPoints(r, e.layerX, e.layerY)
					},
					d = function(l) {
						if (o.map.mapDiv[0].removeEventListener("dblclick", o.onMouseDClick), o.map.mapDiv[0].removeEventListener("mousemove", h), o.map.mapDiv[0].removeEventListener("dblclick", d), i.length != r.length) {
							if (0 == i.length && r.forEach(function(e, n) {
								i.push(e)
							}), l.preventDefault(), o.map.restoreSnap(), null != e && "undefined" != e && e(o.buildLineString(r), n, a, t), null == e) return o.buildLineString(r);
							i = [], r = [], s = !1
						}
					};
				0 == u && r.push({
					x: l.layerX,
					y: l.layerY
				}), s || (console.log("add-mousemove"), o.map.mapDiv[0].addEventListener("mousemove", h), o.map.mapDiv[0].addEventListener("dblclick", d), s = !0), o.onMouseDClick = d, o.onMouseMove = h
			};
		this.map.mapDiv[0].addEventListener("mousedown", l), this.onMouseDown = l
	},
	trackPolygon: function(e, n, a, t) {
		var o = this,
			r = [],
			i = !1;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var s = function(s) {
				r.push({
					x: s.layerX,
					y: s.layerY
				});
				var l = function(e) {
						o.map.restoreSnap(), r.length > 1 ? (o.drawPolygon(r, e.layerX, e.layerY), o.drawPoints(r, e.layerX, e.layerY)) : (o.drawLine(r, e.layerX, e.layerY), o.drawPoints(r, e.layerX, e.layerY))
					},
					u = function(s) {
						o.map.mapDiv[0].removeEventListener("mousemove", l), o.map.mapDiv[0].removeEventListener("dblclick", u), r.push({
							x: s.layerX,
							y: s.layerY
						}), o.map.restoreSnap(), null != e && "undefined" != e && r.length >= 3 && e(o.buildPolygon(r), n, a, t), r = [], i = !1
					};
				i || (console.log("add-mousemove"), o.map.mapDiv[0].addEventListener("mousemove", l), o.map.mapDiv[0].addEventListener("dblclick", u), i = !0), o.onMouseDClick = u, o.onMouseMove = l
			};
		this.map.mapDiv[0].addEventListener("mousedown", s), this.onMouseDown = s
	},
	trackCircle: function(e) {
		var n = this,
			a = null,
			t = null,
			o = 0;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var r = function(r) {
				r.preventDefault(), a = {
					x: r.layerX,
					y: r.layerY
				}, n.drawPoints([], r.layerX, r.layerY);
				var i = function(e) {
						e.preventDefault(), t = {
							x: e.layerX,
							y: e.layerY
						}, n.map.restoreSnap(), n.drawPoints([], a.x, a.y), o = Math.sqrt((t.x - a.x) * (t.x - a.x) + (t.y - a.y) * (t.y - a.y)), n.drawCircle(a, o)
					},
					s = function(o) {
						if (o.preventDefault(), null != t) {
							n.map.mapDiv[0].removeEventListener("mousemove", i), n.map.mapDiv[0].removeEventListener("mouseup", s), n.map.restoreSnap(), n.map.enableDrag(!0);
							var r = n.map.transformation.toMapPoint(a.x, a.y),
								l = n.map.transformation.toMapPoint(t.x, t.y),
								u = Math.sqrt((l.x - r.x) * (l.x - r.x) + (l.y - r.y) * (l.y - r.y));
							if (null != e && "undefined" != e) {
								var m = new GeoBeans.Geometry.Circle(r, u);
								e(m)
							}
						}
					};
				n.map.mapDiv[0].addEventListener("mousemove", i), n.map.mapDiv[0].addEventListener("mouseup", s), n.onMouseMove = i, n.onMouseUp = s
			};
		this.map.mapDiv[0].addEventListener("mousedown", r), this.onMouseDown = r
	},
	trackRect: function(e, n, a, t, o) {
		var r = this;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var i = null,
			s = null,
			l = function(l) {
				l.preventDefault(), i = {
					x: l.layerX,
					y: l.layerY
				}, r.drawPoints([], l.layerX, l.layerY);
				var u = function(e) {
						if (e.preventDefault(), null != i) {
							s = {
								x: e.layerX,
								y: e.layerY
							}, r.map.restoreSnap();
							var n = [];
							n.push(i), n.push({
								x: s.x,
								y: i.y
							}), n.push(s), n.push({
								x: i.x,
								y: s.y
							}), r.drawPolygon(n, i.x, i.y)
						}
					},
					m = function(l) {
						if (l.preventDefault(), null != s) {
							var p = i.x - s.x,
								v = i.y - s.y;
							if (r.map.mapDiv[0].removeEventListener("mousemove", u), r.map.mapDiv[0].removeEventListener("mouseup", m), r.map.restoreSnap(), !(Math.abs(p) < 1e-4 && Math.abs(v) < 1e-4)) {
								var y = r.buildRect(i, s);
								null != e && "undefined" != e && e(y, n, a, t, o), i = null, s = null
							}
						}
					};
				r.map.mapDiv[0].addEventListener("mousemove", u), r.map.mapDiv[0].addEventListener("mouseup", m), r.onMouseMove = u, r.onMouseUp = m
			};
		this.map.mapDiv[0].addEventListener("mousedown", l), this.onMouseDown = l
	},
	trackInfo: function(e, n, a, t) {
		var o = this,
			r = null,
			i = null,
			s = function(s) {
				if ("CANVAS" == s.target.tagName.toUpperCase()) {
					r = {
						x: s.layerX,
						y: s.layerY
					};
					var l = function(s) {
							i = {
								x: s.layerX,
								y: s.layerY
							};
							var u = r.x - i.x,
								m = r.y - i.y;
							if (Math.abs(u) > 1e-4 || Math.abs(m) > 1e-4) return void o.map.mapDiv[0].removeEventListener("mouseup", l);
							var p = new GeoBeans.Geometry.Point(r.x, r.y);
							null != e && void 0 != e && (console.log(r.x, r.y), e(p, n, a, t)), o.map.mapDiv[0].removeEventListener("mouseup", l)
						};
					o.map.mapDiv[0].addEventListener("mouseup", l), o.onMouseUp = l
				}
			};
		this.map.mapDiv[0].addEventListener("mousedown", s), this.onMouseDown = s
	},
	cleanup: function() {
		this.map.mapDiv[0].removeEventListener("mousedown", this.onMouseDown), this.map.mapDiv[0].removeEventListener("mousemove", this.onMouseMove), this.map.mapDiv[0].removeEventListener("dblclick", this.onMouseDClick), this.map.mapDiv[0].removeEventListener("mouseup", this.onMouseUp), this.onMouseDown = null, this.onMouseMove = null, this.onMouseDClick = null, this.onMouseUp = null, this.map.restoreSnap()
	},
	end: function() {
		this.cleanup(), this.map.enableDrag(!0)
	},
	onMouseDownPoint: function(e) {
		var n = e.layerX,
			a = e.layerY;
		this.drawPoint(n, a), this.map.mapDiv[0].saveSnap()
	},
	onMouseMovePoint: function(e) {
		this.map.restoreSnap();
		var n = e.layerX,
			a = e.layerY;
		this.drawPoint(n, a)
	},
	drawPoint: function(e, n) {
		var a = this.map.renderer.context,
			t = 5;
		a.save(), a.fillStyle = "rgba(255,0,0,0.25)", a.strokeStyle = "rgba(0,0,0,0.75)", a.lineWidth = 1, a.beginPath(), a.arc(e, n, t, 0, 2 * Math.PI, !1), a.closePath(), a.fill(), a.stroke(), a.restore()
	},
	drawPoints: function(e, n, a) {
		var t = this.map.renderer.context;
		t.save();
		var o = 5;
		t.fillStyle = "rgba(255,0,0,0.25)", t.strokeStyle = "rgba(255,0,0,0.25)", t.lineWidth = .5, t.beginPath(), t.arc(n, a, o, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.stroke();
		for (var r = e.length, i = 0; i < r; i++) t.beginPath(), t.arc(e[i].x, e[i].y, o, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.stroke();
		t.restore()
	},
	drawLine: function(e, n, a) {
		var t = this.map.renderer.context;
		t.save(), t.strokeStyle = "rgba(255,0,0,0.25)", t.lineWidth = 3, t.beginPath(), t.moveTo(n, a);
		for (var o = e.length, r = o - 1; r >= 0; r--) t.lineTo(e[r].x, e[r].y);
		t.stroke(), t.restore()
	},
	drawPolygon: function(e, n, a) {
		var t = this.map.renderer.context;
		t.save(), t.fillStyle = "rgba(255,255,255,0.25)", t.strokeStyle = "rgba(0,0,0,1)", t.lineWidth = .5;
		var o = e.length;
		for (t.beginPath(), t.moveTo(n, a), i = 0; i < o; i++) t.lineTo(e[i].x, e[i].y);
		t.closePath(), t.fill(), t.stroke(), t.restore()
	},
	drawCircle: function(e, n) {
		var a = this.map.renderer.context;
		a.save(), a.strokeStyle = "rgba(255,0,0,0.25)", a.lineWidth = 1, a.beginPath(), a.arc(e.x, e.y, n, 0, 2 * Math.PI, !0), a.strokeStyle = "#08c", a.stroke(), a.closePath()
	},
	buildLineString: function(e) {
		for (var n = null, a = [], t = e.length, o = 0; o < t; o++) n = this.map.transformation.toMapPoint(e[o].x, e[o].y), a.push(n);
		return new GeoBeans.Geometry.LineString(a)
	},
	buildMultiLineString: function(e) {},
	buildPolygon: function(e) {
		for (var n = null, a = [], t = e.length, o = 0; o < t; o++) n = this.map.transformation.toMapPoint(e[o].x, e[o].y), a.push(n);
		a.push(a[0]);
		var r = new GeoBeans.Geometry.LinearRing(a);
		return new GeoBeans.Geometry.Polygon([r])
	},
	buildRect: function(e, n) {
		e = this.map.transformation.toMapPoint(e.x, e.y), n = this.map.transformation.toMapPoint(n.x, n.y);
		var a = e.x > n.x ? n.x : e.x,
			t = e.x > n.x ? e.x : n.x,
			o = e.y > n.y ? n.y : e.y,
			r = e.y > n.y ? e.y : n.y,
			i = new GeoBeans.Envelope(a, o, t, r);
		return i
	}
});
GeoBeans.Control.ZoomControl = GeoBeans.Class(GeoBeans.Control, {
	mode: null,
	initialize: function() {
		this.type = GeoBeans.Control.Type.ZOOM
	},
	destory: function() {
		this.end()
	},
	end: function() {
		this.cleanup(), this.map.enableDrag(!0)
	},
	setMode: function(e) {
		this.mode = e
	},
	cleanup: function() {
		this.map.mapDiv[0].removeEventListener("mousedown", this.onMouseDown), this.map.mapDiv[0].removeEventListener("mousemove", this.onMouseMove), this.map.mapDiv[0].removeEventListener("mouseup", this.onMouseUp), this.onMouseDown = null, this.onMouseMove = null, this.onMouseUp = null
	},
	trackRect: function() {
		var e = this;
		if (null == this.onMouseDown) {
			this.map.enableDrag(!1);
			var t = null,
				a = null,
				o = function(o) {
					o.preventDefault(), e.map.saveSnap(), t = {
						x: o.layerX,
						y: o.layerY
					}, e.drawPoints([], o.layerX, o.layerY);
					var n = function(o) {
							if (o.preventDefault(), null != t) {
								a = {
									x: o.layerX,
									y: o.layerY
								}, e.map.restoreSnap();
								var n = [];
								n.push(t), n.push({
									x: a.x,
									y: t.y
								}), n.push(a), n.push({
									x: t.x,
									y: a.y
								}), e.drawPolygon(n, t.x, t.y)
							}
						},
						i = function(o) {
							if (o.preventDefault(), null != a) {
								var s = t.x - a.x,
									r = t.y - a.y;
								if (e.map.mapDiv[0].removeEventListener("mousemove", n), e.map.mapDiv[0].removeEventListener("mouseup", i), e.map.restoreSnap(), !(Math.abs(s) < 1e-4 && Math.abs(r) < 1e-4)) {
									var l = e.buildRect(t, a);
									e.zoomMap(l), t = null, a = null
								}
							}
						};
					e.map.mapDiv[0].addEventListener("mousemove", n), e.map.mapDiv[0].addEventListener("mouseup", i), e.onMouseMove = n, e.onMouseUp = i
				};
			this.map.mapDiv[0].addEventListener("mousedown", o), this.onMouseDown = o
		}
	},
	drawPolygon: function(e, t, a) {
		var o = this.map.renderer.context;
		o.save(), o.fillStyle = "rgba(255,255,255,0.25)", o.strokeStyle = "rgba(0,0,0,1)", o.lineWidth = .5;
		var n = e.length;
		for (o.beginPath(), o.moveTo(t, a), i = 0; i < n; i++) o.lineTo(e[i].x, e[i].y);
		o.closePath(), o.fill(), o.stroke(), o.restore()
	},
	buildRect: function(e, t) {
		e = this.map.transformation.toMapPoint(e.x, e.y), t = this.map.transformation.toMapPoint(t.x, t.y);
		var a = e.x > t.x ? t.x : e.x,
			o = e.x > t.x ? e.x : t.x,
			n = e.y > t.y ? t.y : e.y,
			i = e.y > t.y ? e.y : t.y,
			s = new GeoBeans.Envelope(a, n, o, i);
		return s
	},
	drawPoints: function(e, t, a) {
		var o = this.map.renderer.context;
		o.save();
		var n = 5;
		o.fillStyle = "rgba(255,0,0,0.25)", o.strokeStyle = "rgba(255,0,0,0.25)", o.lineWidth = .5, o.beginPath(), o.arc(t, a, n, 0, 2 * Math.PI, !1), o.closePath(), o.fill(), o.stroke();
		for (var i = e.length, s = 0; s < i; s++) o.beginPath(), o.arc(e[s].x, e[s].y, n, 0, 2 * Math.PI, !1), o.closePath(), o.fill(), o.stroke();
		o.restore()
	},
	zoomMap: function(e) {
		"in" == this.mode ? this.zoomInMap(e) : this.zoomOutMap(e)
	},
	zoomInMap: function(e) {
		this.map.setViewer(e), this.map.draw()
	},
	zoomOutMap: function(e) {
		var t = this.map.viewer,
			a = t.getWidth() / e.getWidth(),
			o = t.getHeight() / e.getHeight(),
			n = a > o ? a : o;
		if (t.scale(n), null != this.map.baseLayer) {
			var i = this.map.getLevel(t);
			this.map.drawBackground(), this.map.drawBaseLayerSnap(i), this.map._setLevel(i), console.log(i)
		} else this.map.drawBackground(), this.map.drawLayersSnap(n), this.map.setViewer(t);
		this.map.draw()
	}
});
GeoBeans.Control.TrackBufferControl = GeoBeans.Class(GeoBeans.Control.TrackControl, {
	drawing: !1,
	initialize: function() {
		this.type = GeoBeans.Control.Type.TRACKBUFFER
	},
	destory: function() {
		this.end()
	},
	end: function() {
		this.cleanup(), this.map.enableDrag(!0)
	},
	trackBufferCircle: function(e, n, a) {
		var t = this,
			o = null,
			r = null,
			i = 0;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var s = function(s) {
				s.preventDefault(), o = {
					x: s.layerX,
					y: s.layerY
				}, t.drawPoints([], s.layerX, s.layerY);
				var l = function(e) {
						e.preventDefault(), r = {
							x: e.layerX,
							y: e.layerY
						}, t.map.restoreSnap(), t.drawPoints([], o.x, o.y), i = Math.sqrt((r.x - o.x) * (r.x - o.x) + (r.y - o.y) * (r.y - o.y)), t.drawCircle(o, i)
					},
					m = function(i) {
						if (i.preventDefault(), null != r) {
							t.map.canvas.removeEventListener("mousemove", l), t.map.canvas.removeEventListener("mouseup", m), t.map.canvas.removeEventListener("mousedown", t.onMouseDown), t.map.restoreSnap(), t.map.enableDrag(!0);
							var s = t.map.transformation.toMapPoint(o.x, o.y),
								v = t.map.transformation.toMapPoint(r.x, r.y),
								u = Math.sqrt((v.x - s.x) * (v.x - s.x) + (v.y - s.y) * (v.y - s.y));
							null != n && "undefined" != n && a(e, u, s, n)
						}
					};
				t.map.canvas.addEventListener("mousemove", l), t.map.canvas.addEventListener("mouseup", m), t.onMouseMove = l, t.onMouseUp = m
			};
		this.map.canvas.addEventListener("mousedown", s), this.onMouseDown = s
	},
	trackBufferLine: function(e, n, a, t) {
		var o = this,
			r = [],
			i = [];
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var s = function(s) {
				s.preventDefault();
				for (var l = !1, m = 0; m < r.length; ++m) {
					var v = r[m],
						u = v.x,
						p = v.y;
					u == s.layerX && p == s.layerY && (l = !0)
				}
				if (0 == l) {
					var c = o.map.transformation.toMapPoint(s.layerX, s.layerY);
					r.push({
						x: s.layerX,
						y: s.layerY,
						mapX: c.x,
						mapY: c.y
					})
				}
				o.drawing = !0;
				var h = function(e) {
						o.map.restoreSnap();
						var n = o.map.transformation.toMapPoint(e.layerX, e.layerY);
						o.drawLine(r, n.x, n.y), o.drawPoints(r, n.x, n.y), o.drawingEvent = function() {
							var n = o.map.transformation.toMapPoint(e.layerX, e.layerY);
							o.drawLine(r, n.x, n.y), o.drawPoints(r, n.x, n.y)
						}
					},
					y = function(s) {
						s.preventDefault(), o.map.canvas.removeEventListener("mousedown", o.onMouseDown), o.map.canvas.removeEventListener("mousemove", h), o.map.canvas.removeEventListener("dblclick", y), o.map.enableDrag(!0), i.length != r.length && (0 == i.length && r.forEach(function(e, n) {
							i.push(e)
						}), o.map.restoreSnap(), null != a && "undefined" != a && t(e, n, o.buildLineString(r), a), i = [], r = [], o.drawing = !1)
					};
				o.map.canvas.addEventListener("mousemove", h), o.map.canvas.addEventListener("dblclick", y), o.onMouseMove = h, o.onMouseDBclick = y
			};
		this.map.canvas.addEventListener("mousedown", s), this.onMouseDown = s
	},
	trackBufferPolygon: function(e, n, a, t) {
		var o = this,
			r = [],
			i = [];
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var s = function(s) {
				s.preventDefault();
				for (var l = !1, m = 0; m < r.length; ++m) {
					var v = r[m],
						u = v.x,
						p = v.y;
					u == s.layerX && p == s.layerY && (l = !0)
				}
				if (0 == l) {
					var c = o.map.transformation.toMapPoint(s.layerX, s.layerY);
					r.push({
						x: s.layerX,
						y: s.layerY,
						mapX: c.x,
						mapY: c.y
					})
				}
				o.drawing = !0;
				var h = function(e) {
						o.map.restoreSnap();
						var n = o.map.transformation.toMapPoint(e.layerX, e.layerY);
						r.length > 1 ? (o.drawPolygon(r, n.x, n.y), o.drawPoints(r, n.x, n.y)) : (o.drawLine(r, n.x, n.y), o.drawPoints(r, n.x, n.y)), o.drawingEvent = function() {
							var n = o.map.transformation.toMapPoint(e.layerX, e.layerY);
							r.length > 1 ? (o.drawPolygon(r, n.x, n.y), o.drawPoints(r, n.x, n.y)) : (o.drawLine(r, n.x, n.y), o.drawPoints(r, n.x, n.y))
						}
					},
					y = function(s) {
						if (s.preventDefault(), o.map.canvas.removeEventListener("mousemove", h), o.map.canvas.removeEventListener("dblclick", y), o.map.canvas.removeEventListener("mousedown", o.onMouseDown), o.map.enableDrag(!0), i.length != r.length) {
							if (0 == i.length && r.forEach(function(e, n) {
								i.push(e)
							}), null != a && "undefined" != a && r.length >= 3) {
								var l = o.buildPolygon(r);
								t(e, n, l, a)
							}
							i = [], r = [], o.drawing = !1
						}
					};
				o.map.canvas.addEventListener("mousemove", h), o.map.canvas.addEventListener("dblclick", y), o.onMouseMove = h, o.onMouseDBclick = y
			};
		this.map.canvas.addEventListener("mousedown", s), this.onMouseDown = s
	},
	cleanup: function() {
		this.map.canvas.removeEventListener("mousedown", this.onMouseDown), this.map.canvas.removeEventListener("mousemove", this.onMouseMove), this.map.canvas.removeEventListener("dblclick", this.onMouseDBclick), this.map.canvas.removeEventListener("mousedown", this.onMouseDown), this.map.canvas.removeEventListener("mouseup", this.onMouseUp), this.onMouseDown = null, this.onMouseMove = null, this.onMouseDBclick = null, this.onMouseDown = null, this.onMouseUp = null
	},
	drawPoints: function(e, n, a) {
		var t = this.map.renderer.context;
		t.save();
		var o = 5;
		t.fillStyle = "rgba(255,0,0,0.25)", t.strokeStyle = "rgba(255,0,0,0.25)", t.lineWidth = .5, t.beginPath();
		var r = this.map.transformation.toScreenPoint(n, a);
		t.arc(r.x, r.y, o, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.stroke();
		for (var i = e.length, s = 0; s < i; s++) {
			t.beginPath();
			var r = this.map.transformation.toScreenPoint(e[s].mapX, e[s].mapY);
			t.arc(r.x, r.y, o, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.stroke()
		}
		t.restore()
	},
	drawLine: function(e, n, a) {
		var t = this.map.renderer.context;
		t.save(), t.strokeStyle = "rgba(255,0,0,0.25)", t.lineWidth = 3, t.beginPath();
		var o = this.map.transformation.toScreenPoint(n, a);
		t.moveTo(o.x, o.y);
		for (var r = e.length, i = r - 1; i >= 0; i--) {
			var o = this.map.transformation.toScreenPoint(e[i].mapX, e[i].mapY);
			t.lineTo(o.x, o.y)
		}
		t.stroke(), t.restore()
	},
	buildLineString: function(e) {
		for (var n = null, a = [], t = e.length, o = 0; o < t; o++) n = new GeoBeans.Geometry.Point(e[o].mapX, e[o].mapY), a.push(n);
		return new GeoBeans.Geometry.LineString(a)
	},
	drawPolygon: function(e, n, a) {
		var t = this.map.renderer.context;
		t.save(), t.fillStyle = "rgba(255,255,255,0.25)", t.strokeStyle = "rgba(0,0,0,1)", t.lineWidth = .5;
		var o = e.length;
		t.beginPath();
		var r = this.map.transformation.toScreenPoint(n, a);
		for (t.moveTo(r.x, r.y), i = 0; i < o; i++) {
			var r = this.map.transformation.toScreenPoint(e[i].mapX, e[i].mapY);
			t.lineTo(r.x, r.y)
		}
		t.closePath(), t.fill(), t.stroke(), t.restore()
	},
	buildPolygon: function(e) {
		for (var n = null, a = [], t = e.length, o = 0; o < t; o++) n = new GeoBeans.Geometry.Point(e[o].mapX, e[o].mapY), a.push(n);
		a.push(a[0]);
		var r = new GeoBeans.Geometry.LinearRing(a);
		return new GeoBeans.Geometry.Polygon([r])
	}
});
GeoBeans.Control.TrackOverlayControl = GeoBeans.Class(GeoBeans.Control.TrackControl, {
	drawing: !1,
	initialize: function() {
		this.type = GeoBeans.Control.Type.TRACKOVERLAY
	},
	destory: function() {},
	trackMarker: function(e, a) {
		this.map.overlayLayer.setHitOverlayCallback(a);
		var n = this;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var r = function(r) {
				if (r.preventDefault(), n.map.canvas.style.cursor = "default", n.map.enableDrag(!0), null != a && void 0 != a) {
					var t = n.map.transformation.toMapPoint(r.layerX, r.layerY),
						o = n.map.overlayLayer._getOverlayIDByIdentity(),
						i = new GeoBeans.Overlay.Marker(o, t, e);
					n.map.addOverlay(i), n.map.draw(), a(i), n.drawing = !0
				}
				var s = function(e) {
						e.preventDefault(), n.map.canvas.removeEventListener("mouseup", n.onMouseUp), n.map.canvas.removeEventListener("mousedown", n.onMouseDown), n.map.canvas.style.cursor = "default", n.drawing = !1
					};
				n.map.canvas.addEventListener("mouseup", s), n.onMouseUp = s
			};
		this.onMouseDown = r, this.onMouseMove = onmousemove, this.map.canvas.addEventListener("mousedown", r)
	},
	trackLine: function(e, a) {
		this.map.overlayLayer.setHitOverlayCallback(a);
		var n = this,
			r = [],
			t = [],
			o = !1;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var i = function(i) {
				i.preventDefault();
				for (var s = !1, l = 0; l < r.length; ++l) {
					var v = r[l],
						m = v.x,
						p = v.y;
					m == i.layerX && p == i.layerY && (s = !0)
				}
				n.drawing = !0;
				var y = function(e) {
						n.map.restoreSnap();
						var a = n.map.transformation.toMapPoint(e.layerX, e.layerY);
						n.drawLine(r, a.x, a.y), n.drawPoints(r, a.x, a.y), n.drawingEvent = function() {
							var a = n.map.transformation.toMapPoint(e.layerX, e.layerY);
							n.drawLine(r, a.x, a.y), n.drawPoints(r, a.x, a.y)
						}
					},
					u = function(i) {
						if (n.map.enableDrag(!0), n.map.canvas.removeEventListener("mousedown", n.onMouseDown), n.map.canvas.removeEventListener("mousemove", y), n.map.canvas.removeEventListener("dblclick", u), t.length != r.length) {
							if (0 == t.length && r.forEach(function(e, a) {
								t.push(e)
							}), i.preventDefault(), n.map.restoreSnap(), null != a && "undefined" != a) {
								var s = n.buildLineString(r),
									l = n.map.overlayLayer._getOverlayIDByIdentity(),
									v = new GeoBeans.Overlay.Polyline(l, s, e);
								n.map.addOverlay(v), n.map.draw(), a(v)
							}
							if (null == a) return n.buildLineString(r);
							t = [], r = [], o = !1, n.drawing = !1
						}
					};
				if (0 == s) {
					var d = n.map.transformation.toMapPoint(i.layerX, i.layerY);
					r.push({
						x: i.layerX,
						y: i.layerY,
						mapX: d.x,
						mapY: d.y
					})
				}
				o || (console.log("add-mousemove"), n.map.canvas.addEventListener("mousemove", y), n.map.canvas.addEventListener("dblclick", u), o = !0), n.onMouseDClick = u, n.onMouseMove = y
			};
		this.map.canvas.addEventListener("mousedown", i), this.onMouseDown = i
	},
	trackPolygon: function(e, a) {
		this.map.overlayLayer.setHitOverlayCallback(a);
		var n = this,
			r = [],
			t = [];
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var o = function(o) {
				o.preventDefault();
				for (var i = !1, s = 0; s < r.length; ++s) {
					var l = r[s],
						v = l.x,
						m = l.y;
					v == o.layerX && m == o.layerY && (i = !0)
				}
				if (0 == i) {
					var p = n.map.transformation.toMapPoint(o.layerX, o.layerY);
					r.push({
						x: o.layerX,
						y: o.layerY,
						mapX: p.x,
						mapY: p.y
					})
				}
				n.drawing = !0;
				var y = function(e) {
						n.map.restoreSnap();
						var a = n.map.transformation.toMapPoint(e.layerX, e.layerY);
						r.length > 1 ? (n.drawPolygon(r, a.x, a.y), n.drawPoints(r, a.x, a.y)) : (n.drawLine(r, a.x, a.y), n.drawPoints(r, a.x, a.y)), n.drawingEvent = function() {
							var a = n.map.transformation.toMapPoint(e.layerX, e.layerY);
							r.length > 1 ? (n.drawPolygon(r, a.x, a.y), n.drawPoints(r, a.x, a.y)) : (n.drawLine(r, a.x, a.y), n.drawPoints(r, a.x, a.y))
						}
					},
					u = function(o) {
						if (o.preventDefault(), n.map.canvas.removeEventListener("mousemove", y), n.map.canvas.removeEventListener("dblclick", u), n.map.canvas.removeEventListener("mousedown", n.onMouseDown), n.map.enableDrag(!0), t.length != r.length) {
							if (0 == t.length && r.forEach(function(e, a) {
								t.push(e)
							}), null != a && "undefined" != a && r.length >= 3) {
								var i = n.map.overlayLayer._getOverlayIDByIdentity(),
									s = n.buildPolygon(r),
									l = new GeoBeans.Overlay.Polygon(i, s, e);
								n.map.addOverlay(l), n.map.draw(), a(l)
							}
							t = [], r = [], n.drawing = !1
						}
					};
				n.map.canvas.addEventListener("mousemove", y), n.map.canvas.addEventListener("dblclick", u), n.onMouseMove = y, n.onMouseDBclick = u
			};
		this.map.canvas.addEventListener("mousedown", o), this.onMouseDown = o
	},
	drawLine: function(e, a, n) {
		var r = this.map.renderer.context;
		r.save(), r.strokeStyle = "rgba(255,0,0,0.25)", r.lineWidth = 3, r.beginPath();
		var t = this.map.transformation.toScreenPoint(a, n);
		r.moveTo(t.x, t.y);
		for (var o = e.length, i = o - 1; i >= 0; i--) {
			var t = this.map.transformation.toScreenPoint(e[i].mapX, e[i].mapY);
			r.lineTo(t.x, t.y)
		}
		r.stroke(), r.restore()
	},
	drawPoints: function(e, a, n) {
		var r = this.map.renderer.context;
		r.save();
		var t = 5;
		r.fillStyle = "rgba(255,0,0,0.25)", r.strokeStyle = "rgba(255,0,0,0.25)", r.lineWidth = .5, r.beginPath();
		var o = this.map.transformation.toScreenPoint(a, n);
		r.arc(o.x, o.y, t, 0, 2 * Math.PI, !1), r.closePath(), r.fill(), r.stroke();
		for (var i = e.length, s = 0; s < i; s++) {
			r.beginPath();
			var o = this.map.transformation.toScreenPoint(e[s].mapX, e[s].mapY);
			r.arc(o.x, o.y, t, 0, 2 * Math.PI, !1), r.closePath(), r.fill(), r.stroke()
		}
		r.restore()
	},
	drawPolygon: function(e, a, n) {
		var r = this.map.renderer.context;
		r.save(), r.fillStyle = "rgba(255,255,255,0.25)", r.strokeStyle = "rgba(0,0,0,1)", r.lineWidth = .5;
		var t = e.length;
		r.beginPath();
		var o = this.map.transformation.toScreenPoint(a, n);
		for (r.moveTo(o.x, o.y), i = 0; i < t; i++) {
			var o = this.map.transformation.toScreenPoint(e[i].mapX, e[i].mapY);
			r.lineTo(o.x, o.y)
		}
		r.closePath(), r.fill(), r.stroke(), r.restore()
	},
	buildLineString: function(e) {
		for (var a = null, n = [], r = e.length, t = 0; t < r; t++) a = new GeoBeans.Geometry.Point(e[t].mapX, e[t].mapY), n.push(a);
		return new GeoBeans.Geometry.LineString(n)
	},
	buildPolygon: function(e) {
		for (var a = null, n = [], r = e.length, t = 0; t < r; t++) a = new GeoBeans.Geometry.Point(e[t].mapX, e[t].mapY), n.push(a);
		n.push(n[0]);
		var o = new GeoBeans.Geometry.LinearRing(n);
		return new GeoBeans.Geometry.Polygon([o])
	}
});
GeoBeans.Control.TrackControl.TrackTransactionControl = GeoBeans.Class(GeoBeans.Control.TrackControl, {
	initialize: function() {
		this.type = GeoBeans.Control.Type.TRACKTRANSACTION
	},
	trackPoint: function(e, n, a) {
		var o = this;
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var t = function(t) {
				if (o.drawPoint(t.layerX, t.layerY), o.map.enableDrag(!0), null != e && void 0 != e) {
					var r = o.map.transformation.toMapPoint(t.layerX, t.layerY);
					e(r, n, a)
				}
				o.map.canvas.removeEventListener("mousemove", o.onMouseMove), o.map.canvas.removeEventListener("mousedown", o.onMouseDown)
			},
			r = function(e) {
				o.map.restoreSnap(), o.drawPoint(e.layerX, e.layerY)
			};
		this.onMouseDown = t, this.onMouseMove = r, this.map.canvas.addEventListener("mousemove", r), this.map.canvas.addEventListener("mousedown", t)
	},
	trackLine: function(e, n, a, o) {
		var t = this,
			r = [],
			s = [];
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var i = function(i) {
				i.preventDefault();
				for (var l = !1, v = 0; v < r.length; ++v) {
					var c = r[v],
						m = c.x,
						u = c.y;
					m == i.layerX && u == i.layerY && (l = !0)
				}
				0 == l && r.push({
					x: i.layerX,
					y: i.layerY
				}), console.log("mouseclick"), console.log(r);
				var p = function(e) {
						t.map.restoreSnap(), t.drawLine(r, e.layerX, e.layerY), t.drawPoints(r, e.layerX, e.layerY)
					},
					d = function(i) {
						if (i.preventDefault(), t.map.canvas.removeEventListener("mousemove", p), t.map.canvas.removeEventListener("dblclick", d), t.map.canvas.removeEventListener("click", t.onMouseClick), t.map.enableDrag(!0), s.length != r.length) {
							if (0 == s.length && r.forEach(function(e, n) {
								s.push(e)
							}), i.preventDefault(), console.log("mousedbclick"), t.map.canvas.removeEventListener("mousemove", p), t.map.canvas.removeEventListener("dblclick", d), null != e && "undefined" != e) if (o) {
								var l = [t.buildLineString(r)],
									v = new GeoBeans.Geometry.MultiLineString(l);
								e(v, n, a)
							} else e(t.buildLineString(r), n, a);
							s = [], r = []
						}
					};
				t.map.canvas.addEventListener("mousemove", p), t.map.canvas.addEventListener("dblclick", d), t.onMouseMove = p, t.onMouseDBclick = d
			};
		this.map.canvas.addEventListener("click", i), this.onMouseClick = i
	},
	trackPolygon: function(e, n, a, o) {
		var t = this,
			r = [],
			s = [];
		this.map.saveSnap(), this.map.enableDrag(!1), this.cleanup();
		var i = function(i) {
				i.preventDefault();
				for (var l = !1, v = 0; v < r.length; ++v) {
					var c = r[v],
						m = c.x,
						u = c.y;
					m == i.layerX && u == i.layerY && (l = !0)
				}
				0 == l && r.push({
					x: i.layerX,
					y: i.layerY
				});
				var p = function(e) {
						t.map.restoreSnap(), r.length > 1 ? (t.drawPolygon(r, e.layerX, e.layerY), t.drawPoints(r, e.layerX, e.layerY)) : (t.drawLine(r, e.layerX, e.layerY), t.drawPoints(r, e.layerX, e.layerY))
					},
					d = function(i) {
						if (i.preventDefault(), t.map.canvas.removeEventListener("mousemove", p), t.map.canvas.removeEventListener("dblclick", d), t.map.canvas.removeEventListener("mousedown", t.onMouseDown), t.map.enableDrag(!0), s.length != r.length) {
							if (0 == s.length && r.forEach(function(e, n) {
								s.push(e)
							}), null != e && "undefined" != e && r.length >= 3) if (o) {
								var l = [t.buildPolygon(r)],
									v = new GeoBeans.Geometry.MultiPolygon(l);
								e(v, n, a)
							} else e(t.buildPolygon(r), n, a);
							s = [], r = []
						}
					};
				t.map.canvas.addEventListener("mousemove", p), t.map.canvas.addEventListener("dblclick", d), t.onMouseMove = p, t.onMouseDBclick = d
			};
		this.map.canvas.addEventListener("mousedown", i), this.onMouseDown = i
	}
});
GeoBeans.DataSet = GeoBeans.Class({
	dataSource: null,
	name: null,
	type: null,
	geometryType: null,
	srid: null,
	thumbnail: null,
	featureType: null,
	fields: null,
	count: null,
	extent: null,
	initialize: function(e, t, n, i, u, a, l, s) {
		if (this.dataSource = e, this.name = t, this.type = n, this.geometryType = i, this.srid = u, this.thumbnail = a, this.count = l, this.extent = s, null != this.dataSource) {
			var r = new GeoBeans.WFSWorkspace("tmp", this.dataSource.server, "1.0.0");
			this.featureType = new GeoBeans.FeatureType(r, this.name)
		}
	},
	getFields: function() {
		if (null != this.fields) return this.fields;
		var e = this.featureType.getFields(null, this.dataSource.name);
		return this.fields = e, this.fields
	},
	getFieldsWithoutGeom: function() {
		var e = this.getFields();
		if (null == e) return null;
		for (var t = [], n = null, i = null, u = 0; u < e.length; ++u) n = e[u], null != n && (i = n.type, i != GeoBeans.FieldType.GEOMETRY && t.push(n.name));
		return t
	},
	getFeatures: function(e, t, n, i) {
		this.featureType.getFeaturesFilterAsync(null, this.dataSource.name, null, e, t, n, null, i)
	},
	getPreview: function(e, t) {
		var n = this.dataSource.server + "?service=" + this.dataSource.service + "&version=" + this.dataSource.version + "&request=GetPreview&sourceName=" + this.dataSource.name + "&dataSetName=" + this.name + "&width=" + e + "&height=" + t;
		return n
	},
	getFeatureCount: function() {
		var e = this.featureType.getCount(null, this.dataSource.name, null);
		return e
	}
});
GeoBeans.DataSource = GeoBeans.Class({
	server: null,
	service: "dbs",
	version: "1.0.0",
	name: null,
	engine: null,
	constr: null,
	dataSets: null,
	initialize: function(e, t, a, n) {
		this.server = e, this.name = t, this.engine = a, this.constr = n, this.dataSets = []
	},
	getDataSets: function(e) {
		var t = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=GetDataSet&sourceName=" + this.name;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(a, n) {
				t.dataSets = t.parseDataSets(a), void 0 != e && e(t.dataSets)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getDataSet: function(e, t) {
		if (null != e && "" != e) {
			var a = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=GetDataSet&sourceName=" + this.name + "&dataSetName=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, n) {
					var s = a.parseDataSet(e);
					void 0 != t && t(s)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	parseDataSets: function(e) {
		var t = this,
			a = [];
		return $(e).find("DataSet").each(function() {
			var e = t.parseDataSet(this);
			a.push(e)
		}), a
	},
	parseDataSet: function(e) {
		var t = $(e).find("Name").text(),
			a = $(e).find("Type:first").text(),
			n = $(e).find("Geometry>Type").text(),
			s = null;
		switch (n.toUpperCase()) {
		case "POINT":
			s = GeoBeans.Geometry.Type.POINT;
			break;
		case "LINESTRING":
			s = GeoBeans.Geometry.Type.LINESTRING;
			break;
		case "POLYGON":
			s = GeoBeans.Geometry.Type.POLYGON;
			break;
		case "MULTIPOINT":
			s = GeoBeans.Geometry.Type.MULTIPOINT;
			break;
		case "MULTILINESTRING":
			s = GeoBeans.Geometry.Type.MULTILINESTRING;
			break;
		case "MULTIPOLYGON":
			s = GeoBeans.Geometry.Type.MULTIPOLYGON
		}
		var r = $(e).find("Geometry>SRID").text();
		"" == r && (r = null);
		var i = $(e).find("Thumbnail").attr("xlink");
		"" == i && (i = null);
		var o = $(e).find("Count").text();
		null != o && (o = parseInt(o));
		var c = $(e).find("BoundingBox").attr("minx"),
			u = $(e).find("BoundingBox").attr("miny"),
			l = $(e).find("BoundingBox").attr("maxx"),
			f = $(e).find("BoundingBox").attr("maxy"),
			v = null;
		null != c && null != u && null != l && null != f && (v = new GeoBeans.Envelope(parseFloat(c), parseFloat(u), parseFloat(l), parseFloat(f)));
		var d = new GeoBeans.DataSet(this, t, a, s, r, i, o, v);
		return d
	},
	removeDataSet: function(e, t) {
		if (null != e) {
			var a = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=RemoveDataSet&sourceName=" + this.name + "&dataSetName=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, n) {
					var s = a.parseRemoveDataSet(e);
					void 0 != t && t(s)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	parseRemoveDataSet: function(e) {
		var t = $(e).find("RemoveDataSet").text();
		if ("success" == t.toLowerCase()) return "success";
		var a = $(e).find("ExceptionText").text();
		return a
	},
	refresh: function(e, t) {
		if (null == e) return void(null != t && t("refresh name is null"));
		var a = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=Refresh&sourceName=" + this.name + "&dataSetName=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var s = a.parseRefreshDataSet(e);
				void 0 != t && t(s)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRefreshDataSet: function(e) {
		var t = $(e).find("Refresh").text();
		if ("success" == t.toLowerCase()) return "success";
		var a = $(e).find("ExceptionText").text();
		return a
	}
});
GeoBeans.DBSManager = GeoBeans.Class({
	server: null,
	service: "dbs",
	version: "1.0.0",
	dataSources: null,
	sourceName: null,
	initialize: function(e) {
		this.server = e + "/mgr", this.dataSources = []
	},
	getDataSources: function(e, t) {
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetDataSource";
		null != t && (n += "&type=" + t), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(t, n) {
				r.dataSources = r.parseDataSources(t), void 0 != e && e(r.dataSources)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getDataSource: function(e, t) {
		if (null != e && "" != e) {
			var r = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=GetDataSource&name=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, n) {
					var i = r.parseDataSource(e);
					void 0 != t && t(i)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	unRegisterDataSource: function(e, t) {
		if (null != e) {
			var r = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=UnRegisterDataSource&name=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, n) {
					var i = r.parseUnRegisterDBS(e);
					void 0 != t && t(i)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	registerDataSource: function(e, t, r, n, i) {
		if (null == e || null == r || null == t || null == n) return void(null != i && i("params is invalid"));
		var s = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=RegisterDataSource&name=" + e + "&engine=" + t + "&uri=" + r + "&type=" + n;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var r = s.parseRegisterDBS(e);
				void 0 != i && i(r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	tryConnection: function(e, t) {
		if (null != e && "" != e) {
			var r = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=TryConnection&engine=Postgres&uri=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, n) {
					var i = r.parseTryConn(e);
					void 0 != t && t(i)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	featureImport: function(e, t, r, n, i, s, a) {
		if (null == e || null == t || null == r) return void a("params is invalid");
		var o = "service=gps&vesion=1.0.0&request=FeatureImport&sourcename=" + e + "&typeName=" + t + "&shppath=" + r + "&shpname=" + n;
		o += null != i ? "&srid=" + i : "&srid=4326", o += null != s ? "&geom=" + s : "&geom=shape";
		var u = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var r = u.parseFeatureImport(e);
				null != a && a(r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	createTileStore: function(e, t, r, n, i, s, a) {
		if (null == e || null == t || null == r || null == i || null == s) return void(null != a && a("params is invalid"));
		null == n && (n = new GeoBeans.Envelope((-180), (-90), 180, 90));
		var o = this,
			u = "service=" + this.service + "&version=" + this.version + "&request=CreateTileStore&sourceName=" + e + "&storeName=" + t + "&type=" + r + "&extent=" + n.toString() + "&startLevel=" + i + "&endLevel=" + s;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(u),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var r = o.parseCreateTileStore(e);
				void 0 != a && a(r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	describeTileStores: function(e, t) {
		if (null == e) return void(null != t && t("params is invalid"));
		var r = "service=" + this.service + "&version=" + this.version + "&request=DescribeTileStore&sourceName=" + e;
		this.sourceName = e;
		var n = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var i = n.parseDescribeTileStores(e);
				void 0 != t && t(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	describeTileStore: function(e, t, r) {
		if (null == e || null == t) return void(null != r && r("params is invalid"));
		var n = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=DescribeTileStore&sourceName=" + e + "&storeName=" + t;
		this.sourceName = e, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var i = n.parseDescribeTileStore(e);
				void 0 != r && r(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	removeTileStore: function(e, t, r) {
		if (null == e || null == t) return void(null != r && r("params is invalid"));
		var n = "service=" + this.service + "&version=" + this.version + "&request=RemoveTileStore&sourceName=" + e + "&storeName=" + t,
			i = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.parseRemoveTileStore(e);
				void 0 != r && r(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseCreateTileStore: function(e) {
		var t = $(e).find("CreateTileStore").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	parseDataSources: function(e) {
		var t = [],
			r = this;
		return $(e).find("DataSource").each(function() {
			var e = r.parseDataSource(this);
			t.push(e)
		}), t
	},
	parseDataSource: function(e) {
		var t = $(e).find("Name").text(),
			r = $(e).find("Engine").text(),
			n = $(e).find("ConnectionString").text(),
			i = new GeoBeans.DataSource(this.server, t, r, n);
		return i
	},
	parseUnRegisterDBS: function(e) {
		var t = $(e).find("UnRegisterDataSource").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	parseRegisterDBS: function(e) {
		var t = $(e).find("RegisterDataSource").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	parseTryConn: function(e) {
		var t = $(e).find("TryConnection").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	parseFeatureImport: function(e) {
		var t = $(e).find("FeatureImport").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	parseDescribeTileStores: function(e) {
		var t = [],
			r = this;
		return $(e).find("TileStore").each(function() {
			var e = r.parseDescribeTileStore(this);
			t.push(e)
		}), t
	},
	parseDescribeTileStore: function(e) {
		var t = $(e).find("Title").first().text(),
			r = $(e).find("Format").first().text(),
			n = $(e).find("SRID").first().text(),
			i = $(e).find("TileMatrixSetLink>TileMatrixSet").first().text(),
			s = $(e).find("Level>Start").text();
		s = parseInt(s);
		var a = $(e).find("Level>End").text();
		a = parseInt(a);
		var o = $(e).find("LowerCorner").text(),
			u = $(e).find("UpperCorner").text(),
			c = o.indexOf(" "),
			l = o.lastIndexOf(" "),
			v = o.slice(0, c),
			f = o.slice(l + 1, o.length);
		c = u.indexOf(" "), l = u.lastIndexOf(" ");
		var d = u.slice(0, c),
			p = u.slice(l + 1, u.length),
			S = new GeoBeans.Envelope(parseFloat(v), parseFloat(f), parseFloat(d), parseFloat(p)),
			x = this.sourceName,
			m = new GeoBeans.TileStore(t, S, r, i, x, s, a, n);
		return m
	},
	parseRemoveTileStore: function(e) {
		var t = $(e).find("RemoveTileStore").text(),
			r = "";
		return "SUCCESS" == t.toUpperCase() ? r = "success" : "" != $(e).find("ExceptionText").text() && (r = $(e).find("ExceptionText").text()), r
	},
	createDataSet: function(e, t, r, n) {
		if (null == e || null == t || null == r) return void(null != n && n("params is invalid"));
		var i = this.buildCreateDataSetXML(e, t, r);
		if (null == i) return void(null != n && n("params is invalid"));
		var s = this;
		$.ajax({
			type: "post",
			url: this.server,
			data: i,
			contentType: "text/xml",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var r = s.parseCreateDataSet(e);
				void 0 != n && n(r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	buildCreateDataSetXML: function(e, t, r) {
		if (null == e || null == t || null == r) return null;
		var n = '<?xml version="1.0" encoding="UTF-8"?><CreateDataSet \tservice="dbs" \tversion="1.0.0" \tsourceName="' + e + '" \tdataSetName="' + t + '">';
		if (0 != r.length) {
			n += "<Fields>";
			for (var i = null, s = null, a = null, o = null, u = 0; u < r.length; ++u) i = r[u], null != i && (o = i.name, s = i.type, a = i.length, n += "<Field><Name>" + o + "</Name><Type>" + s + "</Type>", null != a && (n += "<Length>" + a + "</Length>"), n += "</Field>");
			n += "</Fields>"
		}
		return n += "</CreateDataSet>"
	},
	parseCreateDataSet: function(e) {
		var t = $(e).find("CreateDataSet").text(),
			r = "";
		return "SUCCESS" == t.toUpperCase() ? r = "success" : "" != $(e).find("ExceptionText").text() && (r = $(e).find("ExceptionText").text()), r
	}
});
GeoBeans.GField = GeoBeans.Class({
	name: null,
	type: null,
	length: null,
	initialize: function(e, t, l) {
		this.name = e, this.type = t, this.length = l
	}
}), GeoBeans.GFieldType = {
	Bool: "bool",
	Char: "char",
	Short: "short",
	Int: "int",
	Long: "long",
	Int64: "int64",
	Float: "float",
	Double: "double",
	String: "string",
	Time: "time",
	Blob: "blob",
	Geometry: "geometry"
};
GeoBeans.File = GeoBeans.Class({
	name: null,
	accessTime: null,
	lastTime: null,
	size: null,
	path: null,
	parPath: null,
	initialize: function(i, s, l, a, e, t) {
		this.parPath = i, this.path = s, this.name = l, this.accessTime = a, this.lastTime = e, this.size = t
	}
});
GeoBeans.FileManager = GeoBeans.Class({
	server: null,
	service: "ufs",
	version: "1.0.0",
	list: null,
	currentPath: null,
	initialize: function(e) {
		this.server = e + "/mgr", this.list = []
	},
	getList: function(e, t) {
		if (null == e) return void(null != t && t("path is null"));
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=List&path=" + e;
		r.currentPath = e, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				r.list = r.parseList(e), void 0 != t && t(r.list.sort(r.sortFile2Folder))
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	createFolder: function(e, t) {
		if (null == e) return void(null != t && t("path is null"));
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=CreateFolder&path=" + e;
		r.currentPath = e, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var i = r.parseCreateFolder(e);
				void 0 != t && t(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	removeFolder: function(e, t) {
		if (null == e) return void(null != t && t("path is null"));
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=RemoveFolder&path=" + e;
		r.currentPath = e, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var i = r.parseRemoveFolder(e);
				void 0 != t && t(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	removeFile: function(e, t) {
		if (null == e) return void(null != t && t("path is null"));
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=RemoveFile&path=" + e;
		r.currentPath = e, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var i = r.parseRemoveFile(e);
				void 0 != t && t(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	describeCsv: function(e, t) {
		if (null == e) return void(null != t && t("path is null"));
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=DescribeCsv&path=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var i = r.parseDescribeCsv(e);
				void 0 != t && t(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseList: function(e) {
		var t = this,
			r = [],
			n = $(e).find("Files");
		return n.children().each(function() {
			if ("File" == this.tagName) {
				var e = t.parseFile(this);
				r.push(e)
			} else if ("Folder" == this.tagName) {
				var n = t.parseFolder(this);
				r.push(n)
			}
		}), r
	},
	parseFile: function(e) {
		var t = $(e).attr("name"),
			r = $(e).attr("access_time"),
			n = $(e).attr("last_modified_time"),
			i = $(e).attr("size"),
			s = null;
		s = "/" == this.currentPath ? this.currentPath + t : this.currentPath + "/" + t;
		var a = new GeoBeans.File(this.currentPath, s, t, r, n, i);
		return a
	},
	parseFolder: function(e) {
		var t = $(e).attr("name"),
			r = $(e).attr("access_time"),
			n = $(e).attr("last_modified_time"),
			i = null;
		i = "/" == this.currentPath ? this.currentPath + t : this.currentPath + "/" + t;
		var s = new GeoBeans.Folder(this.currentPath, i, t, r, n);
		return s
	},
	parseCreateFolder: function(e) {
		var t = $(e).find("CreateFolder").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	parseRemoveFolder: function(e) {
		var t = $(e).find("RemoveFolder").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	parseRemoveFile: function(e) {
		var t = $(e).find("RemoveFile").text();
		if ("success" == t.toLowerCase()) return "success";
		var r = $(e).find("ExceptionText").text();
		return r
	},
	sortFile2Folder: function(e, t) {
		return e instanceof GeoBeans.File && t instanceof GeoBeans.Folder ? 1 : e instanceof GeoBeans.Folder && t instanceof GeoBeans.File ? -1 : e instanceof GeoBeans.File && t instanceof GeoBeans.File ? t - e : e instanceof GeoBeans.Folder && t instanceof GeoBeans.Folder ? t - e : void 0
	},
	parseDescribeCsv: function(e) {
		var t = $(e).find("ExceptionText").text();
		if (null != t && "" != t) return t;
		var r = [];
		return $(e).find("sequence").find("element").each(function() {
			var e = $(this).attr("name");
			r.push(e)
		}), r
	}
});
GeoBeans.Folder = GeoBeans.Class({
	name: null,
	accessTime: null,
	lastTime: null,
	path: null,
	parPath: null,
	initialize: function(a, l, s, e, i) {
		this.parPath = a, this.path = l, this.name = s, this.accessTime = e, this.lastTime = i
	}
});
GeoBeans.ComparisionFilter = GeoBeans.Class(GeoBeans.Filter, {
	operator: null,
	initialize: function() {
		GeoBeans.Filter.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Filter.Type.FilterComparsion
	}
}), GeoBeans.ComparisionFilter.OperatorType = {
	ComOprEqual: "equal",
	ComOprNotEqual: "notequal",
	ComOprLessThan: "lessthan",
	ComOprGreaterThan: "greaterthan",
	ComOprLessThanOrEqual: "lessthanorequal",
	ComOprGreaterThanOrEqual: "greaterthanorequal",
	ComOprIsLike: "islike",
	ComOprIsNull: "isnull",
	ComOprIsBetween: "isbetween"
};
GeoBeans.DistanceBufferFilter = GeoBeans.Class(GeoBeans.Class, {
	propName: null,
	distance: null,
	initialize: function() {
		GeoBeans.SpatialFitler.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.SpatilalFilter.OperatorType.SpOprIntersects
	}
}), GeoBeans.UnitType = {
	Inches: "inches",
	Points: "points",
	feet: "feet",
	yards: "yards",
	miles: "miles",
	naticalMiles: "naticalmiles"
};
GeoBeans.Expression = GeoBeans.Class({
	type: null,
	initialize: function() {},
	clone: function() {
		var e = new GeoBeans.Expression;
		return e.type = this.type, e
	}
}), GeoBeans.Expression.Type = {
	Arithmetic: "arithmetic",
	PropertyName: "propname",
	Literal: "literal",
	Function: "function"
};
GeoBeans.FilterReader = GeoBeans.Class({
	initialize: function() {},
	read: function(e) {
		var r = null,
			a = e.children();
		return 0 == a.length ? null : r = this.parseFilter(a[0])
	},
	parseFilter: function(e) {
		var r = null,
			a = e.tagName;
		return a = a.slice(a.lastIndexOf(":") + 1, a.length), a = a.toLowerCase(), "bbox" == a ? r = this.parseBBox(e) : 0 == a.indexOf("propertyis") ? r = this.parseBinaryComparision(a, e) : "and" == a || "or" == a ? r = this.parseBinaryLogical(a, e) : "not" == a ? r = this.parseUnaryLogic(e) : "gmlobjectid" != a && "featureid" != a || (r = this.parseID(e)), r
	},
	parseBBox: function(e) {
		var r = this,
			a = new GeoBeans.BBoxFilter;
		return $(e).children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), e = e.toLowerCase(), "propertyname" == e) {
				var n = r.parsePropertyName(this);
				a.propertyName = n
			} else if ("envelope" == e) {
				var t = r.parseEnvelope(this);
				a.envelope = t
			}
		}), a
	},
	parseBinaryComparision: function(e, r) {
		var a = new GeoBeans.BinaryComparisionFilter,
			n = this.parseComparisionOperator(e);
		if (n == GeoBeans.ComparisionFilter.OperatorType.ComOprIsBetween) {
			var t = this.parseIsBetween(r);
			return t
		}
		a.operator = n;
		var i = $(r).children();
		if (null != i[0]) {
			var o = i[0],
				s = this.parseExpression(o);
			null != s && (a.expression1 = s)
		}
		if (null != i[1]) {
			var l = i[1],
				p = this.parseExpression(l);
			null != p && (a.expression2 = p)
		}
		return a
	},
	parseIsBetween: function(e) {
		for (var r = new GeoBeans.IsBetweenFilter, a = $(e).children(), n = 0; n < a.length; ++n) {
			var t = a[n],
				i = t.tagName;
			if (i = i.toLowerCase(), "ogc:lowerboundary" == i) {
				var o = $(t).children();
				if (null != o[0]) {
					var s = this.parseExpression(o[0]);
					r.lowerBound = s
				}
			} else if ("ogc:upperboundary" == i) {
				var l = $(t).children();
				if (null != l[0]) {
					var p = this.parseExpression(l[0]);
					r.upperBound = p
				}
			} else {
				var u = this.parseExpression(t);
				r.expression = u
			}
		}
		return r
	},
	parseBinaryLogical: function(e, r) {
		var a = this,
			n = new GeoBeans.BinaryLogicFilter;
		return "and" == e ? n.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd : "or" == e && (n.operator = GeoBeans.LogicFilter.OperatorType.LogicOprOr), $(r).children().each(function() {
			var e = a.parseFilter(this);
			null != e && n.addFilter(e)
		}), n
	},
	parseUnaryLogic: function(e) {
		var r = new GeoBeans.UnaryLogicFilter,
			a = $(e).children()[0];
		if (null != a) {
			var n = this.parseFilter(a);
			if (null != n) return r.filter = n, r
		}
		return null
	},
	parseID: function(e) {
		for (var r = $(e), a = new GeoBeans.IDFilter; 0 != r.length;) {
			var n = r.attr("gml:id");
			if (null == n && (n = r.attr("gml:fid")), null != n) {
				var t = n.slice(n.lastIndexOf(".") + 1, n.length);
				a.addID(parseInt(t))
			}
			r = r.next()
		}
		return a
	},
	parseComparisionOperator: function(e) {
		var r = null;
		switch (e = e.toLowerCase()) {
		case "propertyisequal":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
			break;
		case "propertyisnotequal":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprNotEqual;
			break;
		case "propertyislessthan":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprLessThan;
			break;
		case "propertyisgreaterthan":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThan;
			break;
		case "propertyislessthanorequalto":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprLessThanOrEqual;
			break;
		case "propertyisgreaterthanorequalto":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThanOrEqual;
			break;
		case "propertyisislike":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprIsLike;
			break;
		case "propertyisisnull":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprIsNull;
			break;
		case "propertyisbetween":
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprIsBetween;
			break;
		default:
			r = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual
		}
		return r
	},
	parseExpression: function(e) {
		var r = null,
			a = e.tagName;
		return a = a.slice(a.lastIndexOf(":") + 1, a.length), a = a.toLowerCase(), "propertyname" == a ? r = this.parsePropertyName(e) : "literal" == a && (r = this.parseLiteral(e)), r
	},
	parsePropertyName: function(e) {
		var r = $(e).text();
		if (null != r) {
			var a = new GeoBeans.PropertyName;
			return a.name = r, a
		}
		return null
	},
	parseLiteral: function(e) {
		var r = $(e).text();
		if (null != name) {
			var a = new GeoBeans.Literal;
			return a.value = r, a
		}
		return null
	},
	parseEnvelope: function(e) {
		var r = null,
			a = null,
			n = null,
			t = null;
		if ($(e).children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), e = e.toLowerCase(), "lowercorner" == e) {
				var i = $(this).text(),
					o = i.indexOf(" "),
					s = i.lastIndexOf(" ");
				r = i.slice(0, o), a = i.slice(s + 1, i.length)
			} else if ("uppercorner" == e) {
				var i = $(this).text(),
					o = i.indexOf(" "),
					s = i.lastIndexOf(" ");
				n = i.slice(0, o), t = i.slice(s + 1, i.length)
			}
		}), null != r && null != a && null != n && null != t) {
			var i = new GeoBeans.Envelope(parseFloat(r), parseFloat(a), parseFloat(n), parseFloat(t));
			return i
		}
		return null
	}
});
GeoBeans.FilterWriter = GeoBeans.Class({
	initialize: function() {},
	write: function(e, r) {
		if (null == r) return null;
		var t = e.createElement("ogc:Filter"),
			a = this.writeFilter(e, r);
		return $(t).append(a), t
	},
	writeFilter: function(e, r) {
		var t = r.type,
			a = null;
		return t == GeoBeans.Filter.Type.FilterID ? a = this.writeIDFilter(e, r) : t == GeoBeans.Filter.Type.FilterComparsion ? a = this.writeComparsionFilter(e, r) : t == GeoBeans.Filter.Type.FilterLogic ? a = this.writeLogicFilter(e, r) : t == GeoBeans.Filter.Type.FilterSpatial && (a = this.writeSpatialFilter(e, r)), a
	},
	writeIDFilter: function(e, r) {},
	writeComparsionFilter: function(e, r) {
		var t = r.operator,
			a = null;
		if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprEqual) {
			a = e.createElement("ogc:PropertyIsEqualTo");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprNotEqual) {
			a = e.createElement("ogc:PropertyIsNotEqualTo");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprLessThan) {
			a = e.createElement("ogc:PropertyIsLessThan");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThan) {
			a = e.createElement("ogc:PropertyIsGreaterThan");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprLessThanOrEqual) {
			a = e.createElement("ogc:PropertyIsLessThanOrEqualTo");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThanOrEqual) {
			a = e.createElement("ogc:PropertyIsGreaterThanOrEqualTo");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprIsLike) {
			a = e.createElement("ogc:PropertyIsLike"), $(a).attr("escapeChar", "!"), $(a).attr("singleChar", "#"), $(a).attr("wildCard", "*");
			var i = r.expression1,
				n = r.expression2,
				p = this.writeExpression(e, i),
				o = this.writeExpression(e, n);
			$(a).append(p), $(a).append(o)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprIsNull) {
			a = e.createElement("ogc:PropertyIsNull");
			var s = r.properyName,
				l = this.writeExpression(e, s);
			$(a).append(l)
		} else if (t == GeoBeans.ComparisionFilter.OperatorType.ComOprIsBetween) {
			a = e.createElement("ogc:PropertyIsBetween");
			var m = r.expression,
				c = this.writeExpression(e, m);
			$(a).append(c);
			var G = r.lowerBound,
				y = this.writeExpression(e, G),
				w = r.upperBound,
				E = this.writeExpression(e, w),
				u = e.createElement("ogc:LowerBoundary");
			$(u).append(y);
			var B = e.createElement("ogc:UpperBoundary");
			$(B).append(E), $(a).append(u), $(a).append(B)
		}
		return a
	},
	writeExpression: function(e, r) {
		if (null == e || null == r) return "";
		var t = null,
			a = r.type;
		if (a == GeoBeans.Expression.Type.Arithmetic);
		else if (a == GeoBeans.Expression.Type.PropertyName) {
			t = e.createElement("ogc:PropertyName");
			var i = r.name;
			$(t).text(i)
		} else if (a == GeoBeans.Expression.Type.Literal) {
			t = e.createElement("ogc:Literal");
			var n = r.value;
			$(t).text(n)
		} else a == GeoBeans.Expression.Type.Function;
		return t
	},
	writeLogicFilter: function(e, r) {
		var t = r.operator,
			a = null;
		if (t == GeoBeans.LogicFilter.OperatorType.LogicOprAnd) a = e.createElement("ogc:And");
		else if (t == GeoBeans.LogicFilter.OperatorType.LogicOprOr) a = e.createElement("ogc:Or");
		else if (t == GeoBeans.LogicFilter.OperatorType.LogicOprNot) {
			a = e.createElement("ogc:Not");
			var i = r.filter,
				n = this.writeFilter(e, i);
			return $(a).append(n), a
		}
		for (var p = r.filters, o = 0; o < p.length; ++o) {
			var i = p[o],
				n = this.writeFilter(e, i);
			$(a).append(n)
		}
		return a
	},
	writeSpatialFilter: function(e, r) {
		var t = r.operator,
			a = null;
		switch (t) {
		case GeoBeans.SpatialFilter.OperatorType.SpOprBBox:
			a = this.writeBBoxFilter(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprIntersects:
			a = this.writeSpatialFilterIntersects(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprDWithin:
			a = this.writeSpatialFilterDWithin(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprWithin:
			a = this.writeSpatialFilterWithin(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprContains:
			a = this.writeSpatialFilterContains(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprDisjoint:
			a = this.writeSpatialFilterDisjoint(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprEquals:
			a = this.writeSpatialFilterEquals(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprTouches:
			a = this.writeSpatialFilterTouches(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprCrosses:
			a = this.writeSpatialFilterCrosses(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprBeyond:
			a = this.writeSpatialFilterBeyond(e, r);
			break;
		case GeoBeans.SpatialFilter.OperatorType.SpOprOverlaps:
			a = this.writeSpatialFilterOverlaps(e, r)
		}
		return a
	},
	writeBBoxFilter: function(e, r) {
		var t = e.createElement("ogc:BBOX"),
			a = r.propName,
			i = new GeoBeans.PropertyName;
		i.setName(a);
		var n = this.writeExpression(e, i);
		$(t).append(n);
		var p = r.extent,
			o = this.writeEnvelope(e, p);
		return $(t).append(o), t
	},
	writeEnvelope: function(e, r) {
		var t = e.createElement("gml:Box"),
			a = e.createElement("gml:coordinates"),
			i = r.xmin + "," + r.ymin + " " + r.xmax + "," + r.ymax;
		return $(a).text(i), $(t).append(a), t
	},
	writeSpatialFilterIntersects: function(e, r) {
		var t = e.createElement("Intersects"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterDWithin: function(e, r) {
		var t = e.createElement("DWithin"),
			a = r.geometry,
			i = r.distance,
			n = r.propName,
			p = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			o = p.write(a),
			s = e.createElement("PropertyName");
		$(s).text(n);
		var l = e.createElement("Distance");
		return $(l).text(i), $(t).append(s), $(t).append(o), $(t).append(l), t
	},
	writeSpatialFilterWithin: function(e, r) {
		var t = e.createElement("Within"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterContains: function(e, r) {
		var t = e.createElement("Contains"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterDisjoint: function(e, r) {
		var t = e.createElement("Disjoint"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterEquals: function(e, r) {
		var t = e.createElement("Equals"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterTouches: function(e, r) {
		var t = e.createElement("Touches"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterCrosses: function(e, r) {
		var t = e.createElement("Crosses"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	},
	writeSpatialFilterBeyond: function(e, r) {
		var t = e.createElement("Beyond"),
			a = r.geometry,
			i = r.distance,
			n = r.propName,
			p = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			o = p.write(a),
			s = e.createElement("PropertyName");
		$(s).text(n);
		var l = e.createElement("Distance");
		return $(l).text(i), $(t).append(s), $(t).append(o), $(t).append(l), t
	},
	writeSpatialFilterOverlaps: function(e, r) {
		var t = e.createElement("Overlaps"),
			a = r.geometry,
			i = r.propName,
			n = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			p = n.write(a),
			o = e.createElement("PropertyName");
		return $(o).text(i), $(t).append(o), $(t).append(p), t
	}
});
GeoBeans.IDFilter = GeoBeans.Class(GeoBeans.Filter, {
	ids: null,
	initialize: function() {
		GeoBeans.Filter.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Filter.Type.FilterID, this.ids = []
	},
	addID: function(i) {
		this.ids.push(i)
	}
});
GeoBeans.Literal = GeoBeans.Class(GeoBeans.Expression, {
	value: null,
	initialize: function() {
		GeoBeans.Expression.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Expression.Type.Literal
	},
	setValue: function(e) {
		this.value = e
	},
	clone: function() {
		var e = new GeoBeans.Literal;
		return e.value = this.value, e.type = this.type, e
	}
});
GeoBeans.LogicFilter = GeoBeans.Class(GeoBeans.Filter, {
	operator: null,
	initialize: function() {
		GeoBeans.Filter.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Filter.Type.FilterLogic
	}
}), GeoBeans.LogicFilter.OperatorType = {
	LogicOprAnd: "and",
	LogicOprOr: "or",
	LogicOprNot: "not"
};
GeoBeans.OrderBy = GeoBeans.Class({
	fields: null,
	order: null,
	initialize: function() {
		this.fields = []
	},
	destory: function() {
		this.fields = null
	},
	addField: function(e) {
		null != e && this.fields.push(e)
	},
	getField: function(e) {
		return e < 0 || e >= this.fields.length ? null : this.fields[e]
	},
	getFieldCount: function() {
		return this.fields.length
	},
	setOrder: function(e) {
		this.order = e
	},
	isAsc: function() {
		return this.order == GeoBeans.OrderBy.OrderType.OrderAsc
	}
}), GeoBeans.OrderBy.OrderType = {
	OrderAsc: "asc",
	OrderDesc: "desc"
};
GeoBeans.PropertyName = GeoBeans.Class({
	name: null,
	initialize: function() {
		this.type = GeoBeans.Expression.Type.PropertyName
	},
	clone: function() {
		var e = new GeoBeans.PropertyName;
		return e.name = this.name, e
	},
	setName: function(e) {
		this.name = e
	}
});
GeoBeans.SpatialFilter = GeoBeans.Class(GeoBeans.Filter, {
	initialize: function() {
		GeoBeans.Filter.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Filter.Type.FilterSpatial
	}
}), GeoBeans.SpatialFilter.OperatorType = {
	SpOprIntersects: "intersects",
	SpOprDWithin: "dwithin",
	SpOprWithin: "within",
	SpOprEquals: "equals",
	SpOprDisjoint: "disjoint",
	SpOprTouches: "touches",
	SpOprCrosses: "crosses",
	SpOprBeyond: "beyond",
	SpOprContains: "contains",
	SpOprOverlaps: "overlaps",
	SpOprBBox: "bbox"
};
GeoBeans.UnaryLogicFilter = GeoBeans.Class(GeoBeans.LogicFilter, {
	filter: null,
	initialize: function(i) {
		GeoBeans.LogicFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.LogicFilter.OperatorType.LogicOprNot, this.filter = i
	}
});
GeoBeans.BinaryComparisionFilter = GeoBeans.Class(GeoBeans.ComparisionFilter, {
	expression1: null,
	expression2: null,
	initialize: function(e, i, s) {
		GeoBeans.ComparisionFilter.prototype.initialize.apply(this, arguments), this.operator = e, this.expression1 = i, this.expression2 = s
	},
	clone: function() {
		var e = new GeoBeans.BinaryComparisionFilter;
		return e.type = this.type, null != this.expression1 && (e.expression1 = this.expression1.clone()), null != this.expression2 && (e.expression2 = this.expression2.clone()), null != this.operator && (e.operator = this.operator), e
	}
});
GeoBeans.IsBetweenFilter = GeoBeans.Class(GeoBeans.ComparisionFilter, {
	expression: null,
	lowerBound: null,
	upperBound: null,
	initialize: function(e, n, o) {
		GeoBeans.ComparisionFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprIsBetween, this.expression = e, this.lowerBound = n, this.upperBound = o
	},
	clone: function() {
		var e = new GeoBeans.IsBetweenFilter;
		return e.type = this.type, null != this.expression && (e.expression = this.expression.clone()), null != this.lowerBound && (e.lowerBound = this.lowerBound.clone()), null != this.upperBound && (e.upperBound = this.upperBound.clone()), e
	}
});
GeoBeans.IsLikeFilter = GeoBeans.Class(GeoBeans.ComparisionFilter, {
	properyName: null,
	literal: null,
	initialize: function() {
		GeoBeans.ComparisionFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprIsLike
	}
});
GeoBeans.IsNullFilter = GeoBeans.Class(GeoBeans.ComparisionFilter, {
	properyName: null,
	initialize: function(e) {
		GeoBeans.ComparisionFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprIsNull, this.properyName = e
	}
});
GeoBeans.BinaryLogicFilter = GeoBeans.Class(GeoBeans.LogicFilter, {
	filters: null,
	initialize: function(i) {
		GeoBeans.LogicFilter.prototype.initialize.apply(this, arguments), this.filters = [], this.operator = i
	},
	addFilter: function(i) {
		this.filters.push(i)
	}
});
GeoBeans.BBoxFilter = GeoBeans.Class(GeoBeans.SpatialFilter, {
	extent: null,
	initialize: function(e, t) {
		GeoBeans.SpatialFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.SpatialFilter.OperatorType.SpOprBBox, this.propName = e, this.extent = t
	},
	setExtent: function(e, t, i, a) {
		var n = new GeoBeans.Envelope(e, t, i, a);
		this.extent = n
	}
});
GeoBeans.BeyondFilter = GeoBeans.Class(GeoBeans.SpatialFilter, {
	distance: null,
	initialize: function(e, i, t) {
		GeoBeans.SpatialFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.SpatialFilter.OperatorType.SpOprBeyond, this.propName = e, this.geometry = i, this.distance = t
	}
});
GeoBeans.BinarySpatialFilter = GeoBeans.Class(GeoBeans.SpatialFilter, {
	operator: null,
	propName: null,
	geometry: null,
	initialize: function(e, i, a) {
		GeoBeans.SpatialFilter.prototype.initialize.apply(this, arguments), this.operator = e, this.propName = i, this.geometry = a
	}
});
GeoBeans.DistanceBufferFilter = GeoBeans.Class(GeoBeans.SpatialFilter, {
	distance: null,
	initialize: function(e, i, t) {
		GeoBeans.SpatialFilter.prototype.initialize.apply(this, arguments), this.operator = GeoBeans.SpatialFilter.OperatorType.SpOprDWithin, this.propName = e, this.geometry = i, this.distance = t
	}
});
GeoBeans.Geometry.Circle = GeoBeans.Class(GeoBeans.Geometry, {
	center: null,
	radius: null,
	type: GeoBeans.Geometry.Type.CIRCLE,
	initialize: function(e, t) {
		this.center = e, this.radius = t
	},
	hit: function(e, t) {
		var n = Math.abs(this.center.x - e) + Math.abs(this.center.y - t);
		return n <= this.radius
	},
	getCentroid: function() {
		return this.center
	}
});
GeoBeans.Geometry.GeometryCollection = GeoBeans.Class(GeoBeans.Geometry, {
	components: null,
	initialize: function(n) {
		this.components = [], null != n && (this.components = n), this.type = GeoBeans.Geometry.Type.COLLECTION, this.extent = this.getExtent()
	},
	hit: function(n, t, e) {
		if (null == this.extent) return !1;
		if (!this.extent.contain(n, t)) return !1;
		for (var o = 0; o < this.components.length; ++o) {
			var i = this.components[o],
				s = i.hit(n, t, e);
			if (s) return !0
		}
		return !1
	},
	addComponents: function(n) {
		n instanceof Array || (n = [n]);
		for (var t = 0, e = n.length; t < e; t++) this.addComponent(n[t])
	},
	addComponent: function(n) {
		this.components.push(n), this.extent = this.getExtent()
	},
	getExtent: function() {
		if (null == this.components) return null;
		for (var n = null, t = null, e = null, o = 0; o < this.components.length; ++o) n = this.components[o], null != n && (e = n.extent, null != e && (null == t ? t = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax) : t.union(e)));
		return t
	}
});
GeoBeans.Geometry.GML = GeoBeans.Class({
	initialize: function(e) {
		this.name = e
	},
	destory: function() {
		GeoBeans.Class.prototype.destory.apply(this, arguments)
	}
}), GeoBeans.Geometry.GML.Version = {
	v_2_0: "2.0",
	v_3_1_1: "3.1.1",
	v_3_2_1: "3.2.1"
}, GeoBeans.Geometry.GML.Type = {
	Point: "gml:Point",
	LineString: "gml:LineString",
	Polygon: "gml:Polygon",
	MultiPoint: "gml:MultiPoint",
	MultiLineString: "gml:MultiLineString",
	MultiPolygon: "gml:MultiPolygon"
}, GeoBeans.Geometry.GML.Writer = GeoBeans.Class({
	version: null,
	initialize: function(e) {
		this.version = e
	},
	destory: function() {
		GeoBeans.Class.prototype.destory.apply(this, arguments)
	},
	write: function(e) {
		if (null == e) return null;
		var n = "",
			t = e.type;
		switch (t) {
		case GeoBeans.Geometry.Type.POINT:
			n = this.writePoint(e);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			n = this.writeLineString(e);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			n = this.writePolygon(e);
			break;
		case GeoBeans.Geometry.Type.MULTIPOINT:
			break;
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			n = this.writeMultiLinestring(e);
			break;
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			n = this.writeMultiPolygon(e)
		}
		return n
	},
	writePoint: function(e) {
		var n = "";
		return n += ' <gml:Point><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">', n += e.x, n += ",", n += e.y, n += "</gml:coordinates></gml:Point>"
	},
	writeLineString: function(e) {
		var n = "",
			t = e.points;
		n += "<LineString><coordinates>";
		for (var r = 0; r < t.length; ++r) {
			var i = t[r],
				o = i.x,
				l = i.y;
			n += o, n += ",", n += l + " "
		}
		return n += "</coordinates></LineString>"
	},
	writePolygon: function(e) {
		var n = "",
			t = e.rings;
		n += "<gml:Polygon>";
		for (var r = 0; r < t.length; ++r) {
			n += "<gml:outerBoundaryIs>", n += "<gml:LinearRing>", n += '<gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">';
			for (var i = t[r], o = i.points, l = 0; l < o.length; ++l) {
				var a = o[l],
					s = a.x,
					g = a.y;
				n += s, n += ",", n += g + " "
			}
			n += "</gml:coordinates>", n += "</gml:LinearRing>", n += "</gml:outerBoundaryIs>"
		}
		return n += "</gml:Polygon>"
	},
	writeMultiLinestring: function(e) {
		var n = "",
			t = e.lines;
		n += "<gml:MultiLineString>";
		for (var r = 0; r < t.length; ++r) {
			var i = t[r].points;
			n += "<gml:lineStringMember>", n += "<gml:LineString>", n += '<gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">';
			for (var o = 0; o < i.length; ++o) {
				var l = i[o],
					a = l.x,
					s = l.y;
				n += a, n += ",", n += s + " "
			}
			n += "</gml:coordinates>", n += "</gml:LineString></gml:lineStringMember>"
		}
		return n += "</gml:MultiLineString>"
	},
	writeMultiPolygon: function(e) {
		var n = "",
			t = e.polygons;
		n += "<gml:MultiPolygon>";
		for (var r = 0; r < t.length; ++r) {
			var i = t[r],
				o = i.rings;
			n += "<gml:polygonMember>", n += "<gml:Polygon>";
			for (var l = 0; l < o.length; ++l) {
				n += "<gml:outerBoundaryIs>", n += "<gml:LinearRing>", n += '<gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">';
				for (var a = o[l], s = a.points, g = 0; g < s.length; ++g) {
					var y = s[g],
						u = y.x,
						m = y.y;
					n += u, n += ",", n += m + " "
				}
				n += "</gml:coordinates>", n += "</gml:LinearRing>", n += "</gml:outerBoundaryIs>"
			}
			n += "</gml:Polygon>", n += "</gml:polygonMember>"
		}
		return n += "</gml:MultiPolygon>"
	}
}), GeoBeans.Geometry.GML.Reader = GeoBeans.Class({
	version: null,
	initialize: function(e) {
		this.version = e
	},
	destory: function() {
		GeoBeans.Class.prototype.destory.apply(this, arguments)
	},
	read: function(e) {
		var n = null,
			t = e.tagName;
		switch (t) {
		case GeoBeans.Geometry.GML.Type.Point:
			n = this.readPoint(e);
			break;
		case GeoBeans.Geometry.GML.Type.LineString:
			n = this.readLineString(e);
			break;
		case GeoBeans.Geometry.GML.Type.Polygon:
			n = this.readPolygon(e);
			break;
		case GeoBeans.Geometry.GML.Type.MultiPoint:
			break;
		case GeoBeans.Geometry.GML.Type.MultiLineString:
			n = this.readMultiLineString(e);
			break;
		case GeoBeans.Geometry.GML.Type.MultiPolygon:
			n = this.readMultiPolygon(e)
		}
		return n
	},
	readPoint: function(e) {
		return this.parsePoint($(e).children().first())
	},
	readLineString: function(e) {
		var n = this.parsePoints($(e).children().first());
		return 0 == n.length ? null : new GeoBeans.Geometry.LineString(n)
	},
	readPolygon: function(e) {
		var n = this,
			t = null,
			r = new Array,
			i = new Array;
		return $(e).find("LinearRing").each(function(e, o) {
			i = n.parsePoints($(this).children().first()), t = new GeoBeans.Geometry.LinearRing(i), r.push(t)
		}), 0 == r.length ? null : new GeoBeans.Geometry.Polygon(r)
	},
	readMultiLineString: function(e) {
		var n = this,
			t = null,
			r = new Array;
		return $(e).find("LineString").each(function(e, i) {
			t = n.readLineString(this), r.push(t)
		}), 0 == r.length ? null : new GeoBeans.Geometry.MultiLineString(r)
	},
	readMultiPolygon: function(e) {
		var n = this,
			t = null,
			r = new Array;
		return $(e).find("Polygon").each(function(e, i) {
			t = n.readPolygon(this), null != t && r.push(t)
		}), new GeoBeans.Geometry.MultiPolygon(r)
	},
	parsePoint: function(e) {
		var n = ($(e).attr("ts"), $(e).attr("cs")),
			t = ($(e).attr("dc"), $(e).text()),
			r = t.split(n),
			i = new GeoBeans.Geometry.Point(parseFloat(r[0]), parseFloat(r[1]));
		return i
	},
	parsePoints: function(e) {
		for (var n, t, r = $(e).attr("ts"), i = $(e).attr("cs"), o = ($(e).attr("dc"), $(e).text()), l = o.split(r), a = l.length, s = new Array, g = 0; g < a; g++) t = l[g].split(i), n = new GeoBeans.Geometry.Point(parseFloat(t[0]), parseFloat(t[1])), s.push(n);
		return s
	}
});
GeoBeans.Geometry.LineString = GeoBeans.Class(GeoBeans.Geometry, {
	points: null,
	type: GeoBeans.Geometry.Type.LINESTRING,
	initialize: function(t) {
		this.points = t, this.extent = this.computeExtent(this.points)
	},
	destory: function() {
		this.points = null
	},
	hit: function(t, n, e) {
		if (!this.extent.contain(t, n)) return !1;
		for (var s = this.points.length - 1, a = null, i = null, o = 0, h = 0; h < s; h++) if (a = this.points[h], i = this.points[h + 1], o = this.distance2segment(t, n, a.x, a.y, i.x, i.y), o < e) return !0;
		return !1
	},
	distance: function(t, n) {
		for (var e = this.points.length - 1, s = null, a = null, i = 0, o = 0, h = 0; h < e; h++) s = this.points[h], a = this.points[h + 1], o = this.distance2segment(t, n, s.x, s.y, a.x, a.y), o < i && (o = i);
		return i
	},
	distance2segment: function(t, n, e, s, a, i) {
		var o = 0;
		if (Math.abs(e - a) < Math.ESPLON) {
			var h = s < i ? s : i,
				r = s > i ? s : i;
			n > h && n < r ? o = Math.abs(t - e) : n < h ? o = Math.sqrt(Math.pow(t - e, 2) + Math.pow(n - h, 2)) : n > r && (o = Math.sqrt(Math.pow(t - e, 2) + Math.pow(n - r, 2)))
		} else if (Math.abs(s - i) < Math.ESPLON) {
			var p = e < a ? e : a,
				M = e > a ? e : a;
			t > p && t < M ? o = Math.abs(n - s) : t < p ? o = Math.sqrt(Math.pow(n - s, 2) + Math.pow(t - p, 2)) : n > r && (o = Math.sqrt(Math.pow(n - s, 2) + Math.pow(t - M, 2)))
		} else {
			var l = -(a - e) / (i - s),
				u = -1 / l,
				y = s - u * e,
				f = n - l * t,
				w = l - u,
				x = (y - f) / w,
				c = l * x + f,
				p = e < a ? e : a,
				M = e > a ? e : a;
			if (x > p && x < M || c > h && c < r) o = Math.sqrt(Math.pow(n - c, 2) + Math.pow(t - x, 2));
			else {
				var v = Math.sqrt(Math.pow(s - c, 2) + Math.pow(e - x, 2)),
					G = Math.sqrt(Math.pow(i - c, 2) + Math.pow(a - x, 2));
				o = v < G ? v : G
			}
		}
		return o
	},
	computeExtent: function(t) {
		var n = t.length;
		if (0 == n) return null;
		for (var e = t[0], s = e.x, a = e.y, i = e.x, o = e.y, h = 1; h < n; h++) e = t[h], e.x < s && (s = e.x), e.x > i && (i = e.x), e.y < a && (a = e.y), e.y > o && (o = e.y);
		return new GeoBeans.Envelope(s, a, i, o)
	},
	getCentroid: function() {
		for (var t, n = 0, e = 0, s = 0, a = 0; a < this.points.length; ++a) t = this.points[a], n += t.x, e += t.y;
		n /= s, e /= s;
		var t = new GeoBeans.Geometry.Point(n, e);
		return t
	}
});
GeoBeans.Geometry.MultiLineString = GeoBeans.Class(GeoBeans.Geometry, {
	lines: null,
	type: GeoBeans.Geometry.Type.MULTILINESTRING,
	initialize: function(e) {
		this.lines = e, this.extent = this.computeExtent()
	},
	destory: function() {
		this.lines = null
	},
	hit: function(e, n, t) {
		if (!this.extent.contain(e, n)) return !1;
		for (var i = this.lines.length, s = 0; s < i; s++) {
			var r = this.lines[s];
			if (r.hit(e, n, t)) return !0
		}
		return !1
	},
	computeExtent: function() {
		var e = null,
			n = this.lines.length;
		if (n < 1) return null;
		var t = this.lines[0];
		e = new GeoBeans.Envelope(t.extent.xmin, t.extent.ymin, t.extent.xmax, t.extent.ymax);
		for (var i = 1; i < n; i++) t = this.lines[i], e.union(t.extent);
		return e
	},
	distance: function(e, n) {
		for (var t = this.lines.length, i = null, s = null, r = 0, l = 0, o = 0; o < t; ++o) for (var a = this.lines[o], h = a.points, u = h.length - 1, x = 0; x < u; x++) i = h[x], s = h[x + 1], l = GeoBeans.Utility.distance2segment(e, n, i.x, i.y, s.x, s.y), l < r && (l = r);
		return r
	},
	getCentroid: function() {
		for (var e = 0, n = 0, t = 0, i = 0; i < this.lines.length; ++i) {
			var s = this.lines[i],
				r = s.points;
			t += r.length;
			for (var l = 0; l < r.length; ++l) {
				var o = r[l];
				e += o.x, n += o.y
			}
		}
		e /= t, n /= t;
		var o = new GeoBeans.Geometry.Point(e, n);
		return o
	}
});
GeoBeans.Geometry.MultiPoint = GeoBeans.Class(GeoBeans.Geometry, {
	points: null,
	type: GeoBeans.Geometry.Type.MULTIPOINT,
	initialize: function(t) {
		this.points = t, this.extent = this.computeExtent(this.points)
	},
	destory: function() {
		this.points = null
	},
	hit: function(t, n, e) {
		for (var i = this.points.length, o = 0; o < i; o++) {
			var s = this.points[o];
			if (s.hit(t, n, e)) return truel
		}
		return !1
	},
	computeExtent: function(t) {
		var n = t.length;
		if (0 == n) return null;
		for (var e = t[0], i = e.x, o = e.y, s = e.x, r = e.y, h = 1; h < n; h++) e = t[h], e.x < i && (i = e.x), e.x > s && (s = e.x), e.y < o && (o = e.y), e.y > r && (r = e.y);
		return new GeoBeans.Envelope(i, o, s, r)
	},
	getCentroid: function() {
		for (var t = 0, n = 0, e = 0; e < this.points.length; ++e) {
			var i = this.points[e];
			t += i.x, n += i.y
		}
		return t /= this.points.length, n /= this.points.length, new GeoBeans.Geometry.Point(t, n)
	}
});
GeoBeans.Geometry.MultiPolygon = GeoBeans.Class(GeoBeans.Geometry, {
	polygons: null,
	type: GeoBeans.Geometry.Type.MULTIPOLYGON,
	initialize: function(n) {
		this.polygons = n, this.extent = this.computeExtent()
	},
	destory: function() {
		this.polygons = null
	},
	hit: function(n, t, e) {
		if (!this.extent.contain(n, t)) return !1;
		for (var o = null, r = this.polygons.length, i = 0; i < r; i++) if (o = this.polygons[i], o.hit(n, t)) return !0;
		return !1
	},
	computeExtent: function() {
		var n = null,
			t = this.polygons.length;
		if (t < 1) return null;
		var e = this.polygons[0];
		n = new GeoBeans.Envelope(e.extent.xmin, e.extent.ymin, e.extent.xmax, e.extent.ymax);
		for (var o = 1; o < t; o++) e = this.polygons[o], n.union(e.extent);
		return n
	},
	getCentroid: function() {
		for (var n, t, e, o, r = 0, i = 0, s = 0, l = 0; l < this.polygons.length; ++l) {
			n = this.polygons[l], t = n.rings;
			for (var a = 0; a < t.length; ++a) {
				e = t[a], o = e.points, s += o.length;
				for (var y = 0; y < o.length; ++y) h = o[y], r += h.x, i += h.y
			}
		}
		r /= s, i /= s;
		var h = new GeoBeans.Geometry.Point(r, i);
		return h
	},
	toPointsArray: function() {
		for (var n = [], t = 0; t < this.polygons.length; ++t) {
			var e = this.polygons[t];
			if (null != e) {
				var o = e.toPointsArray();
				n = n.concat(o)
			}
		}
		return n
	}
});
GeoBeans.Geometry.Point = GeoBeans.Class(GeoBeans.Geometry, {
	x: null,
	y: null,
	type: GeoBeans.Geometry.Type.POINT,
	initialize: function(e, t) {
		this.x = parseFloat(e), this.y = parseFloat(t), this.extent = new GeoBeans.Envelope(this.x, this.y, this.x, this.y)
	},
	hit: function(e, t, n) {
		var s = Math.abs(this.x - e) + Math.abs(this.y - t);
		return s < n
	},
	getCentroid: function() {
		return new GeoBeans.Geometry.Point(this.x, this.y)
	}
});
GeoBeans.Geometry.Polygon = GeoBeans.Class(GeoBeans.Geometry, {
	rings: null,
	type: GeoBeans.Geometry.Type.POLYGON,
	initialize: function(n) {
		this.rings = n, this.extent = this.computeExtent()
	},
	hit: function(n, t, e) {
		if (!this.extent.contain(n, t)) return !1;
		for (var r = 0, i = this.rings.length, s = 0; s < i; s++) for (var o, u, a = this.rings[s], h = a.points, g = h.length - 1, l = 0; l < g; l++) o = h[l], u = h[l + 1], this.isSegmentShooted(n, t, o, u) && r++;
		var f = r % 2;
		return 0 != f
	},
	computeExtent: function() {
		var n = null,
			t = this.rings.length;
		if (t < 1) return null;
		var e = this.rings[0];
		n = new GeoBeans.Envelope(e.extent.xmin, e.extent.ymin, e.extent.xmax, e.extent.ymax);
		for (var r = 1; r < t; r++) e = this.rings[r], n.union(e.extent);
		return n
	},
	getCrossedSegments: function() {},
	isSegmentShooted: function(n, t, e, r) {
		if (Math.abs(e.y - r.y) < Number.EPSILON) {
			if (Math.abs(t - e.y) < Number.EPSILON) return !1;
			if (Math.abs(t - r.y) < Number.EPSILON) return !1
		} else if ((t > e.y && t < r.y || t > r.y && t < e.y) && n < e.x && n < r.x) return !0;
		return !1
	},
	getCentroid: function() {
		for (var n = 0, t = 0, e = 0, r = 0; r < this.rings.length; ++r) {
			var i = this.rings[r];
			if (null != i) {
				var s = i.points;
				e += s.length;
				for (var o = 0; o < s.length; ++o) {
					var u = s[o];
					n += u.x, t += u.y
				}
			}
		}
		n /= e, t /= e;
		var u = new GeoBeans.Geometry.Point(n, t);
		return u
	},
	toPointsArray: function() {
		for (var n = [], t = 0; t < this.rings.length; ++t) {
			var e = this.rings[t];
			if (null != e) for (var r = e.points, i = 0; i < r.length; ++i) {
				var s = r[i],
					o = s.x,
					u = s.y;
				n.push(o), n.push(u)
			}
		}
		return n
	},
	getOutRing: function() {
		if (null == this.rings) return null;
		if (1 == this.rings.length) return this.rings[0];
		var n = this.rings[0];
		if (null == n.extent) return null;
		for (var t = 1; t < this.rings.length; ++t) {
			var e = this.rings[t];
			if (null != e) {
				var r = e.extent;
				r.contain(n.extent) && (n = e)
			}
		}
		return n
	}
});
GeoBeans.Geometry.LinearRing = GeoBeans.Class(GeoBeans.Geometry.LineString, {
	points: null,
	initialize: function(e) {
		GeoBeans.Geometry.LineString.prototype.initialize.apply(this, arguments)
	},
	destory: function() {
		GeoBeans.Geometry.LineString.prototype.destory.apply(this, arguments)
	},
	numPoints: function() {
		return this.points.length
	}
});
GeoBeans.GPSManager = GeoBeans.Class({
	server: null,
	service: "gps",
	version: "1.0.0",
	initialize: function(e) {
		this.server = e + "/mgr"
	},
	getCapabilities: function(e) {
		var t = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetCapabilities";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(n, r) {
				var u = t.parseGetCapabilities(n);
				null != e && e(u)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseGetCapabilities: function(e) {
		var t = [];
		return $(e).find("OperationsSet").each(function() {
			var e = $(this),
				n = e.attr("type"),
				r = e.attr("description"),
				u = {
					type: n,
					description: r
				},
				s = [];
			e.find("Operation").each(function() {
				var e = $(this).find("Name").first().text(),
					t = $(this).find("Alias").first().text(),
					n = {
						name: e,
						alias: t
					};
				s.push(n)
			}), u.operList = s, t.push(u)
		}), t
	},
	clusterKmean: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == n || null == r || null == u) return void(null != s && s("params is invalid"));
		var i = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=KMean&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r + "&clusters=" + u;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.parseClusterKmean(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseClusterKmean: function(e) {
		var t = $(e).find("KMean").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	featureProject: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == n || null == r) return void(null != s && s("params is invalid"));
		var i = this,
			a = "service=gps&vesion=1.0.0&request=FeatureProject&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r + "&outputSrid=" + u,
			i = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.parseFeatureProject(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseFeatureProject: function(e) {
		var t = $(e).find("FeatureProject").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	featureImport: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == n) return void(null != i && i("params is invalid"));
		var a = "service=gps&vesion=1.0.0&request=FeatureImport&sourcename=" + e + "&typeName=" + t + "&shppath=" + n + "&shpname=" + r;
		a += null != u ? "&srid=" + u : "&srid=4326", a += null != s ? "&geom=" + s : "&geom=shape";
		var o = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = o.parseFeatureImport(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseFeatureImport: function(e) {
		var t = $(e).find("FeatureImport").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	getSpatialReferenceList: function(e, t, n) {
		var r = this,
			u = "service=" + this.service + "&version=" + this.version + "&request=GetSpatialReference";
		null != e && (u += "&count=" + e), null != t && (u += "&offset=" + t), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(u),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var u = r.parseSpatialReferences(e);
				null != n && n(u)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseSpatialReferences: function(e) {
		var t = [],
			n = this;
		return $(e).find("SpatialReference").each(function() {
			var e = n.parseSpatialReference(this);
			t.push(e)
		}), t
	},
	parseSpatialReference: function(e) {
		var t = $(e).find("srid").text(),
			n = $(e).find("srtext").text(),
			r = $(e).find("proj4").text(),
			u = null;
		return null != t && (u = new GeoBeans.SpatialReference(t, n, r)), u
	},
	getSpatialReferenceBySrid: function(e, t) {
		if (null == e) return void(null != t && t("srid is null"));
		var n = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=GetSpatialReference&srid=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var u = n.parseSpatialReferences(e);
				null != t && t(u)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getSpatialReferenceCount: function(e) {
		var t = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetSpatialReferenceCount";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(n, r) {
				var u = t.parseGetSpatialReferenceCount(n);
				null != e && e(u)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseGetSpatialReferenceCount: function(e) {
		var t = $(e).find("Count").text();
		return t = parseInt(t)
	},
	rasterReverse: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=RasterReverse&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterReverse(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterReverse: function(e) {
		var t = $(e).find("RasterReverse").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterGraylize: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=RasterGraylize&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterGraylize(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterGraylize: function(e) {
		var t = $(e).find("RasterGraylize").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterSmooth: function(e, t, n, r, u, s, i, a) {
		if (null == e || null == t || null == r || null == u || null == i) return void(null != a && a("params is invalid"));
		var o = this,
			l = "service=" + this.service + "&version=" + this.version + "&request=RasterSmooth&inputSourceName=" + e + "&inputRasterName=" + t + "&operator=" + r + "&outputSourceName=" + u + "&outPutRasterName=" + s;
		null != n && (l += "&inputPath=" + n), null != i && (l += "&outputPath=" + i), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(l),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = o.parseRasterSmooth(e);
				null != a && a(n)
			},
			complete: function(e, t) {},
			error: function(e, t, n) {
				a(n)
			}
		})
	},
	parseRasterSmooth: function(e) {
		var t = $(e).find("RasterSmooth").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterStretch: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=RasterStretch&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterStretch(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterStretch: function(e) {
		var t = $(e).find("RasterStretch").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterSubtract: function(e, t, n, r, u, s, i, a, o, l) {
		if (null == e || null == t || null == r || null == u || null == i || null == a) return void(null != l && l("params is invalid"));
		var c = this,
			p = "service=" + this.service + "&version=" + this.version + "&request=RasterSubtract&inputSourceName_1=" + e + "&inputRasterName_1=" + t;
		null != n && (p += "&inputPath_1=" + n), p += "&inputSourceName_2=" + r + "&inputRasterName_2=" + u, null != s && (p += "&inputPath_2=" + s), p += "&outputSourceName=" + i + "&outPutRasterName=" + a, null != o && (p += "&outputPath=" + o), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(p),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = c.parseRasterSubtract(e);
				null != l && l(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterSubtract: function(e) {
		var t = $(e).find("RasterSubtract").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterPixelBlend: function(e, t, n, r, u, s, i, a, o, l) {
		if (null == e || null == t || null == r || null == u || null == i || null == a) return void(null != l && l("params is invalid"));
		var c = this,
			p = "service=" + this.service + "&version=" + this.version + "&request=RasterPixelBlend&inputSourceName_1=" + e + "&inputRasterName_1=" + t;
		null != n && (p += "&inputPath_1=" + n), p += "&inputSourceName_2=" + r + "&inputRasterName_2=" + u, null != s && (p += "&inputPath_2=" + s), p += "&outputSourceName=" + i + "&outPutRasterName=" + a, null != o && (p += "&outputPath=" + o), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(p),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = c.parseRasterPixelBlend(e);
				null != l && l(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterPixelBlend: function(e) {
		var t = $(e).find("RasterPixelBlend").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterEdgeDetect: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=RasterEdgeDetect&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterEdgeDetect(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterEdgeDetect: function(e) {
		var t = $(e).find("RasterEdgeDetect").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterExtractByRectangle: function(e, t, n, r, u, s, i, a) {
		if (null == e || null == t || null == r || null == s || null == i) return void(null != a && a("params is invalid"));
		var o = this,
			l = i.toString(),
			c = "service=" + this.service + "&version=" + this.version + "&request=RasterExtractByRectangle&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u + "&extent=" + l;
		null != n && (c += "&inputPath=" + n), null != s && (c += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(c),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = o.parseRasterExtractByRectangle(e);
				null != a && a(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterExtractByRectangle: function(e) {
		var t = $(e).find("RasterExtractByRectangle").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterSepiaTone: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=RasterSepiaTone&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterSepiaTone(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterSepiaTone: function(e) {
		var t = $(e).find("RasterSepiaTone").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	getArea: function(e, t, n, r, u) {
		if (null == e || null == t || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=GetArea&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.praseGetArea(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGetArea: function(e) {
		var t = $(e).find("GetArea").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	getLength: function(e, t, n, r, u) {
		if (null == e || null == e || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=GetLength&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.praseGetLength(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGetLength: function(e) {
		var t = $(e).find("GetLength").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	getBuffer: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == u || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=Buffer&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + u + "&outputTypeName=" + s;
		null != n && (o += "&distance=" + n), null != r && (o += "&distanceField=" + r), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.praseGetBuffer(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGetBuffer: function(e) {
		var t = $(e).find("Buffer").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	getCentroid: function(e, t, n, r, u) {
		if (null == e || null == e || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=Centroid&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.praseGetCentroid(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGetCentroid: function(e) {
		var t = $(e).find("Centroid").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	convexHull: function(e, t, n, r, u) {
		if (null == e || null == e || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=ConvexHull&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.praseConvexHull(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseConvexHull: function(e) {
		var t = $(e).find("ConvexHull").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	buildPyramid: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == n || null == r || null == u) return void(null != s && s("params is invalid"));
		var i = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=BuildPyramid&mapName=" + e + "&sourceName=" + t + "&tileStore=" + n + "&start=" + r + "&end=" + u;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.praseBuildPyramid(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function(e, t, n) {
				s(n)
			}
		})
	},
	praseBuildPyramid: function(e) {
		var t = $(e).find("BuildPyramid").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	updateTile: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == n || null == r || null == u || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=updateTile&mapName=" + e + "&sourceName=" + t + "&tileStore=" + n + "&level=" + r + "&row=" + u + "&col=" + s;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseUpdateTile(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseUpdateTile: function(e) {
		var t = $(e).find("UpdateTile").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	rasterHisEqual: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=RasterHistogramEqualization&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterHisEqual(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterHisEqual: function(e) {
		var t = $(e).find("RasterHistogramEqualization").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	demSlope: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=DemSlope&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseDemSlope(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseDemSlope: function(e) {
		var t = $(e).find("DemSlope").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	demAspect: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=DemAspect&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseDemAspect(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseDemAspect: function(e) {
		var t = $(e).find("DemAspect").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	demStretch: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == u) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=DemStretch&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseDemStretch(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseDemStretch: function(e) {
		var t = $(e).find("DemStretch").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	demHillshade: function(e, t, n, r, u, s, i, a, o, l) {
		if (null == e || null == t || null == r || null == u || null == i || null == a || null == o) return void(null != l && l("params is invalid"));
		var c = this,
			p = "service=" + this.service + "&version=" + this.version + "&request=DemHillshade&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u + "&Azimuth=" + i + "&zenith=" + a + "&zfactor=" + o;
		null != n && (p += "&inputPath=" + n), null != s && (p += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(p),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = c.parseDemHillshade(e);
				null != l && l(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseDemHillshade: function(e) {
		var t = $(e).find("DemHillshade").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	delaunay: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == r || null == u) return void(null != s && s("params is invalid"));
		var i = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=Delaunay&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + r + "&outputTypeName=" + u;
		null != n && (a += "&inputZField=" + n), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.praseDelaunay(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseDelaunay: function(e) {
		var t = $(e).find("Delaunay").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	rasterThreshold: function(e, t, n, r, u, s, i) {
		if (null == e || null == t || null == r || null == s) return void(null != i && i("params is invalid"));
		var a = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=rasterThreshold&inputSourceName=" + e + "&inputRasterName=" + t + "&outputSourceName=" + r + "&outPutRasterName=" + u;
		null != n && (o += "&inputPath=" + n), null != s && (o += "&outputPath=" + s), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = a.parseRasterThreshold(e);
				null != i && i(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseRasterThreshold: function(e) {
		var t = $(e).find("RasterThreshold").text();
		return "SUCCESS" == t.toUpperCase() ? result = "success" : "" != $(e).find("ExceptionText").text() && (result = $(e).find("ExceptionText").text()), result
	},
	lineToPoints: function(e, t, n, r, u) {
		if (null == e || null == t || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=LineToPoints&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.praseLineToPoints(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseLineToPoints: function(e) {
		var t = $(e).find("LineToPoints").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	multiPointToPoints: function(e, t, n, r, u) {
		if (null == e || null == t || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=MultiPointToPoints&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.praseMultiPointToPoints(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseMultiPointToPoints: function(e) {
		var t = $(e).find("MultiPointToPoints").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	polygonToPoints: function(e, t, n, r, u) {
		if (null == e || null == t || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=PolygonToPoints&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.prasePolygonToPoints(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	prasePolygonToPoints: function(e) {
		var t = $(e).find("PolygonToPoints").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	polygonToLine: function(e, t, n, r, u) {
		if (null == e || null == t || null == n || null == r) return void(null != u && u("params is invalid"));
		var s = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=PolygonToLine&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = s.prasePolygonToLine(e);
				null != u && u(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	prasePolygonToLine: function(e) {
		var t = $(e).find("PolygonToLine").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	generateRandomPoints: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == n || null == r || null == u) return void(null != s && s("params is invalid"));
		var i = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=GenerateRandomPoints&sourceName=" + e + "&typeName=" + t + "&extent=" + n.toString() + "&srid=" + r + "&count=" + u;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.praseGenerateRandomPoints(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGenerateRandomPoints: function(e) {
		var t = $(e).find("GenerateRandomPoints").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	generateRandomPointsInPolygon: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == n || null == r || null == u) return void(null != s && s("params is invalid"));
		var i = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=GenerateRandomPointsInPolygon&inputSourceName=" + e + "&inputTypeName=" + t + "&outputSourceName=" + n + "&outputTypeName=" + r + "&count=" + u;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.praseGenerateRandomPointsInPolygon(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGenerateRandomPointsInPolygon: function(e) {
		var t = $(e).find("GenerateRandomPointsInPolygon").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	},
	getJob: function(e, t, n, r) {
		if (null == e) return void(null != r && r("state is null"));
		var u = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=GetJob&state=" + e;
		null != t && (s += "&maxJobs=" + t), null != n && (s += "&offset=" + n), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = u.praseGetJob(e);
				null != r && r(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseGetJob: function(e) {
		var t = [],
			n = this;
		return $(e).find("Job").each(function() {
			var e = n.parseJob(this);
			null != e && t.push(e)
		}), t
	},
	parseJob: function(e) {
		var t = $(e).find("UUID").text();
		if (null == t) return null;
		var n = $(e).find("Operation").text(),
			r = $(e).find("Params").text(),
			u = $(e).find("Client").text(),
			s = $(e).find("Server").text(),
			i = $(e).find("StartTime").text(),
			a = $(e).find("EndTime").text(),
			o = new GeoBeans.Job(t, n, r, u, s, i, a, status);
		return o
	},
	csvImport: function(e, t, n, r, u, s) {
		if (null == e || null == t || null == n || null == r) return void(null != s && s("params is valid"));
		var i = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=CsvImport&sourceName=" + e + "&typeName=" + t + "&csvPath=" + n + "&csvName=" + r;
		null != u && (a += "&srid=" + u), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = i.praseCsvImport(e);
				null != s && s(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	praseCsvImport: function(e) {
		var t = $(e).find("CsvImport").text();
		if ("success" == t.toLowerCase()) return "success";
		var n = $(e).find("ExceptionText").text();
		return n
	}
});
GeoBeans.Job = GeoBeans.Class({
	uuid: null,
	oper: null,
	params: null,
	client: null,
	server: null,
	startTime: null,
	endTime: null,
	status: null,
	initialize: function(s, e, i, n, t, l, u, a) {
		this.uuid = s, this.oper = e, this.params = i, this.client = n, this.server = t, this.startTime = l, this.endTime = u, this.status = a
	}
}), GeoBeans.Job.Status = {
	CANCELED: "Canceled",
	RUNNING: "Running",
	FINISHED: "Finished"
};
GeoBeans.SpatialReference = GeoBeans.Class({
	srid: null,
	srtext: null,
	proj: null,
	initialize: function(e, i, s) {
		this.srid = e, this.srtext = i, this.proj = s
	}
});
GeoBeans.LabelSet = GeoBeans.Class({
	name: null,
	labels: null,
	initialize: function(l) {
		this.name = l, this.labels = []
	},
	addLabel: function(l) {
		null != l && this.labels.push(l)
	},
	isCollision: function(l) {
		if (null == l) return !1;
		for (var n = 0; n < this.labels.length; ++n) {
			var i = this.labels[n];
			if (i.isCollision(l)) return !0
		}
		return !1
	}
});
GeoBeans.PointLabel = GeoBeans.Class(GeoBeans.Label, {
	pos: null,
	extent: null,
	initialize: function() {
		this.pos = new GeoBeans.Geometry.Point(0, 0)
	},
	computePosition: function(t, e) {
		var i = this.geometry.getCentroid(),
			s = e.toScreenPoint(i.x, i.y);
		this.pos.x = s.x, this.pos.y = s.y;
		var n = this.textSymbolizer.font.size;
		this.extent = t.getTextExtent(this.text, parseInt(n)), this.pos.x += this.textSymbolizer.displaceX, this.pos.y -= this.textSymbolizer.displaceY, this.pos.x -= this.extent.getWidth() * this.textSymbolizer.anchorX, this.pos.y += this.extent.getHeight() * this.textSymbolizer.anchorY, this.extent.offset(this.pos.x, this.pos.y)
	},
	adjustPosition: function(t, e) {
		var i = 0,
			s = 0;
		null != this.extent && (this.extent.xmin < 0 ? i = -this.extent.xmin : this.extent.xmax > t && (i = t - this.extent.xmax - 2), this.extent.ymin < 0 ? s = -this.extent.ymin : this.extent.ymax > e && (s = e - this.extent - 2), this.extent.offset(i, s), this.pos.x += i, this.pos.y += s)
	},
	isCollision: function(t) {
		if (null == t) return !1;
		var e = t.extent;
		return this.extent.intersects(e)
	}
});
GeoBeans.MoveObject = GeoBeans.Class({
	flag: !1,
	id: null,
	initalize: function() {},
	start: function() {
		this.flag = !0
	},
	stop: function() {
		this.flag = !1
	},
	destroy: function() {}
}), GeoBeans.MoveType = {
	POINT: "point"
};
GeoBeans.MovePoint = GeoBeans.Class(GeoBeans.MoveObject, {
	point: null,
	line: null,
	option: {
		duration: 2e3,
		showLine: !0,
		once: !0
	},
	onceAnimate: !1,
	initialize: function(i, t, n, e) {
		this.id = i, this.point = t, this.line = n, null != e && (null != e.duration && (this.option.duration = e.duration), null != e.showLine && (this.option.showLine = e.showLine), null != e.pointSymbolizer && (this.option.pointSymbolizer = e.pointSymbolizer), null != e.lineSymbolizer && (this.option.lineSymbolizer = e.lineSymbolizer), null != e.once && (this.option.once = e.once)), this.type = GeoBeans.MoveType.POINT, this.calculate()
	},
	start: function() {
		GeoBeans.MoveObject.prototype.start.apply(this, arguments), this.onceAnimate = !1
	},
	stop: function() {
		GeoBeans.MoveObject.prototype.stop.apply(this, arguments), this.beginTime = null
	},
	calculate: function() {
		if (null != this.line) {
			var i = this.line.points;
			if (!(i.length <= 1)) {
				for (var t = 0, n = [], e = 1; e < i.length; ++e) {
					var o = i[e - 1],
						l = i[e],
						s = GeoBeans.Utility.getDistance(o.x, o.y, l.x, l.y);
					n.push(s), t += s
				}
				var a = this.option.duration,
					r = t / a;
				this.mapDelta = r;
				var u = [];
				u.push(0);
				for (var h = 0, e = 0; e < n.length; ++e) {
					var s = n[e],
						p = s / r;
					h += p, u.push(h)
				}
				this.times = u
			}
		}
	},
	getPoint: function(i) {
		if (i < 0 || i > this.option.duration) return null;
		for (var t = null, n = null, e = null, o = null, l = this.line.points, s = 1; s < this.times.length; ++s) {
			var a = this.times[s];
			if (i <= a) {
				t = l[s - 1], n = l[s], e = this.times[s - 1], o = this.times[s];
				break
			}
		}
		if (null == t || null == n) return null;
		var r = t.x + (n.x - t.x) * (i - e) / (o - e),
			u = t.y + (n.y - t.y) * (i - e) / (o - e);
		return new GeoBeans.Geometry.Point(r, u)
	}
});
GeoBeans.Layer.DBLayer = GeoBeans.Class(GeoBeans.Layer, {
	id: null,
	dbName: null,
	typeName: null,
	queryable: null,
	type: null,
	format: "image/png",
	transparent: "true",
	image: null,
	updateFlag: !1,
	initialize: function(e, a, t, i, s, r) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.id = a, this.dbName = t, this.typeName = i, this.queryable = s, this.visible = r, this.image = new Image
	},
	cleanup: function() {},
	setMap: function() {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments)
	},
	load: function() {
		var e = this.map.canvas.width,
			a = this.map.canvas.height,
			t = this.map.viewer,
			i = t.xmin.toFixed(6) + "," + t.ymin.toFixed(6) + "," + t.xmax.toFixed(6) + "," + t.ymax.toFixed(6),
			s = "",
			r = "",
			l = this.name;
		if (null != this.styleName && (r = this.styleName), null != l && this.visible) {
			var n = this.map.mapWorkspace.version;
			s = this.map.server + "?service=WMS&version=" + n + "&request=GetMap&layers=" + l + "&styles=" + r + "&bbox=" + i + "&width=" + e + "&height=" + a + "&srs=" + this.srid + "&format=" + this.format + "&transparent=" + this.transparent + "&mapName=" + this.map.name
		}
		if (this.renderer.clearRect(0, 0, e, a), this.updateFlag) {
			var h = new Date;
			this.image.src = s + "&t=" + h.getTime(), this.updateFlag = !1
		} else this.image.src = s;
		var m = this.heatMapLayer;
		if (null != m && m.load(), this.image.complete) {
			this.updateFlag = !1, this.flag = GeoBeans.Layer.Flag.LOADED, this.renderer.drawImage(this.image, 0, 0, e, a);
			var o = this.image.src.lastIndexOf("&t=");
			o != -1 && (this.image.src = this.image.src.slice(0, o))
		} else {
			var p = this;
			p.flag = GeoBeans.Layer.Flag.READY, this.image.onload = function() {
				p.flag != GeoBeans.Layer.Flag.LOADED && (p.flag = GeoBeans.Layer.Flag.LOADED, p.renderer.drawImage(p.image, 0, 0, e, a), p.map.drawLayersAll())
			}, this.image.onerror = function() {
				p.flag = GeoBeans.Layer.Flag.LOADED, p.map.drawLayersAll()
			}
		}
	},
	update: function() {
		this.updateFlag = !0
	}
}), GeoBeans.Layer.DBLayer.Type = {
	Raster: "raster",
	Feature: "feature"
};
GeoBeans.Layer.FeatureDBLayer = GeoBeans.Class(GeoBeans.Layer.DBLayer, {
	styleName: null,
	geomType: null,
	featureLayer: null,
	initialize: function(e, t, a, r, l, n, i) {
		GeoBeans.Layer.DBLayer.prototype.initialize.apply(this, arguments), void 0 != i && (this.styleName = i), this.type = GeoBeans.Layer.DBLayer.Type.Feature
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments);
		var t = new GeoBeans.Layer.FeatureLayer("tmp");
		t.setMap(e), this.featureLayer = t, this.featureLayer.renderer.context.globalCompositeOperation = "lighter"
	},
	setStyle: function(e) {
		null != e && (this.style = e, this.styleName = e.name)
	},
	getFeatureType: function() {
		if (null != this.featureType) return this.featureType;
		if (null != this.map) {
			var e = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0");
			return this.featureType = new GeoBeans.FeatureType(e, this.name), null == this.featureType.fields && (this.featureType.fields = this.featureType.getFields(this.map.name, null)), this.featureType
		}
		return null
	},
	getFeatureBBoxGet: function(e, t, a) {
		var r = this.getFeatureType(),
			l = null;
		return null != r && (l = r.getFeatureBBoxGet(this.map.name, null, e, t, a)), l
	},
	getFeautureBBoxGetOutput: function(e, t, a) {
		var r = null,
			l = this.getFeatureType();
		return null != l && (r = l.getFeatureBBoxGetOutput(this.map.name, null, e, t, a)), r
	},
	getFeatureCount: function(e, t) {
		var a = this.getFeatureType();
		if (null != a) {
			var r = a.getCount(this.map.name, null, e);
			if (null == t) return r;
			t(this, r)
		} else {
			if (null == t) return 0;
			t(0)
		}
	},
	getFields: function() {
		var e = this.getFeatureType(),
			t = null;
		return null != e && (t = e.getFields(this.map.name, null)), t
	},
	getHeatMapLayer: function() {
		return this.heatMapLayer
	},
	addHeatMap: function(e, t, a) {
		if (null != e || null != t) {
			var r = this.getFeatureType(),
				l = r.getFieldIndex(e);
			if (!(l < 0 && null == t)) {
				if (l < 0 && null != t) return this.heatMapLayer = new GeoBeans.Layer.HeatMapLayer(this.name + "-heatMap", a), this.heatMapLayer.setMap(this.map), void this.heatMapLayer.setLayer(this, null, t);
				this.heatMapLayer = new GeoBeans.Layer.HeatMapLayer(this.name + "-heatMap", a), this.heatMapLayer.setMap(this.map), this.heatMapLayer.setLayer(this, e, null)
			}
		}
	},
	removeHeatMap: function() {
		null != this.heatMapLayer && (this.heatMapLayer.destory(), this.heatMapLayer = null)
	},
	setHeatMapVisible: function(e) {
		null != this.heatMapLayer && (this.heatMapLayer.visible = e)
	},
	getFeaturesWithin: function(e) {
		var t = null,
			a = this.getFeatureType();
		return null != a && (t = a.getFeaturesWithin(this.map.name, null, e)), t
	},
	getFeatureFilter: function(e, t, a, r) {
		var l = this.getFeatureType();
		return null != l && (features = l.getFeaturesFilter(this.map.name, null, e, t, a, r)), features
	},
	getFeatureFilterCount: function(e) {
		var t = 0,
			a = this.getFeatureType();
		return null != a && (t = a.getFeatureFilterCount(this.map.name, null, e)), t
	},
	getFeatureFilterCountAsync: function(e, t) {
		var a = this.getFeatureType();
		null != a ? a.getFeatureFilterCountAsync(this.map.name, null, e, this, t) : null != t && t(0)
	},
	getFeatureFilterOutput: function(e, t, a) {
		var r = null,
			l = this.getFeatureType();
		return null != l && (r = l.getFeatureFilterOutput(this.map.name, null, e, t, a)), r
	},
	getFeatures: function(e, t, a) {
		var r = this.getFeatureType();
		return null == r ? void(null != a && a(null)) : void r.getFeaturesFilterAsync2(this.map.name, null, null, null, null, e, null, t, a)
	},
	loadLocal: function() {
		var e = this.map.viewer;
		if (null != e && null != this.viewer && e.equal(this.viewer) && null != this.features && null != this.style && this.flag == GeoBeans.Layer.Flag.LOADED) return this.renderer.clearRect(), void this.renderer.drawImage(this.featureLayer.canvas, 0, 0, this.map.width, this.map.height);
		if (null == this.xhr && (this.features = [], this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), null == this.featureType && (this.featureType = this.getFeatureType()), null != this.featureType)) {
			var t = this;
			t.flag = GeoBeans.Layer.Flag.READY;
			var a = new GeoBeans.BBoxFilter;
			a.extent = this.viewer, a.propName = this.featureType.geomFieldName;
			var r = [this.featureType.geomFieldName],
				l = this.featureType.getFeaturesFilterAsync2(this.map.name, null, a, null, null, r, null, this, this.getFeatures_callback);
			this.xhr = l
		}
	},
	getFeatures_callback: function(e, t) {
		null != e && null != t && (e.setTransformation(e.map.transformation), e.features = t, e.featureLayer.features = t, e.renderer.clearRect(), e.featureLayer.renderer.clearRect(), e.getStyle())
	},
	drawLayer: function() {
		this.xhr = null;
		var e = this.style,
			t = this.features;
		if (null != e && null != t && (rules = e.rules, 0 != rules.length)) {
			for (var a = (new Date, 0); a < rules.length; a++) {
				var r = rules[a],
					t = this.featureLayer.selectFeaturesByFilter(r.filter, this.features);
				null != r.symbolizer && (null != r.symbolizer.icon_url || this.featureLayer.drawFeatures(t, r.symbolizer)), null != r.textSymbolizer && this.featureLayer.labelFeatures(t, r.textSymbolizer)
			}
			this.renderer.drawImage(this.featureLayer.canvas, 0, 0, this.map.width, this.map.height), this.flag = GeoBeans.Layer.Flag.LOADED, this.map.drawLayersAll()
		}
	},
	getStyle: function() {
		if (null != this.style) return void this.drawLayer();
		if (null == this.styleName || "" == this.styleName) {
			this.featureLayer.featureType = this.getFeatureType();
			var e = this.featureLayer.getDefaultStyle();
			return null != e ? (this.style = e, void this.drawLayer()) : void(this.flag = GeoBeans.Layer.Flag.ERROR)
		}
		var t = this.map.server;
		t = t.replace("/mgr", "");
		var a = new GeoBeans.StyleManager(t);
		a.getStyleXML(this.styleName, this.getStyle_callback, this)
	},
	getStyle_callback: function(e, t) {
		null != e && null != t && (t.style = e, t.drawLayer())
	}
});
GeoBeans.Layer.FeatureLayer = GeoBeans.Class(GeoBeans.Layer, {
	features: null,
	style: null,
	geometryType: null,
	featureType: null,
	enableHit: !1,
	selection: null,
	unselection: null,
	hitControl: null,
	hitEvent: null,
	hitTooltipEvent: null,
	hitCanvas: null,
	hitRenderer: null,
	bufferCanvas: null,
	bufferRenderer: null,
	bufferFeatures: null,
	bufferSymbolizer: null,
	clickStyle: null,
	clickFeature: null,
	clickCanvas: null,
	clickRenderer: null,
	bufferTracker: null,
	initialize: function(e) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.featureType = null, this.features = null, this.selection = [], this.unselection = []
	},
	destroy: function() {
		this.features = null, this.style = null, this.renderer = null, this.geometryType = null, this.featureType = null, this.unRegisterClickEvent(), GeoBeans.Layer.prototype.destroy.apply(this, arguments)
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments), this.clickCanvas = document.createElement("canvas"), this.clickCanvas.width = this.canvas.width, this.clickCanvas.height = this.canvas.height, this.clickRenderer = new GeoBeans.Renderer(this.clickCanvas)
	},
	addFeature: function(e) {
		null != e && (null == this.features && (this.features = []), this.features.push(e))
	},
	addFeatureObj: function(e, t, l) {
		if (null != e && null != l && null != t) {
			var r = new GeoBeans.Feature(this.featureType, e, t, l);
			this.addFeature(r)
		}
	},
	addFeatures: function(e) {
		if (null != e && e instanceof Array) for (var t = 0, l = e.length; t < l; t++) {
			var r = e[t];
			this.features.push(r)
		}
	},
	getFeatures: function() {
		return this.features
	},
	getFeature: function(e) {
		return e < 0 ? null : e >= this.features.length ? null : this.features[e]
	},
	getFeatureByID: function(e) {
		if (null == this.features) return null;
		for (var t = null, l = 0; l < this.features.length; ++l) if (t = this.features[l], null != t && t.fid == e) return t;
		return null
	},
	setStyle: function(e) {
		this.style = e, this.flag = GeoBeans.Layer.Flag.READY
	},
	count: function() {
		return this.features.length
	},
	draw: function() {
		var e = this.style;
		if (null != e && (rules = e.rules, 0 != rules.length)) for (var t = 0; t < rules.length; t++) {
			var l = rules[t],
				r = this.selectFeatures(l.filter);
			this.drawFeatures(r, l.symbolizer)
		}
	},
	load: function() {
		var e = this.map.viewer;
		if (null != e && null != this.viewer && e.equal(this.viewer) && this.flag == GeoBeans.Layer.Flag.LOADED) {
			this.flag = GeoBeans.Layer.Flag.LOADED;
			var t = new GeoBeans.BBoxFilter(this.featureType.geomFieldName, this.viewer),
				l = this.selectFeaturesByFilter(t, this.features);
			return this.drawLabelFeatures(l), void this.drawClickLayer()
		}
		this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), this.renderer.clearRect();
		var t = new GeoBeans.BBoxFilter(this.featureType.geomFieldName, this.viewer),
			l = this.selectFeaturesByFilter(t, this.features);
		console.log("count:" + l.length), this.drawLayerFeatures(l), this.drawClickLayer(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	drawLayerFeatures: function(e) {
		var t = this.style;
		if (null == t) {
			if (t = this.getDefaultStyle(), null == t) return;
			this.style = t
		}
		if (rules = t.rules, 0 != rules.length) for (var l = 0; l < rules.length; l++) {
			var r = rules[l],
				n = this.selectFeaturesByFilter(r.filter, e);
			null != r.symbolizer && (null != r.symbolizer.symbol ? this.renderer.drawIcons(n, r.symbolizer, this.map.transformation) : this.drawFeatures(n, r.symbolizer)), null != r.textSymbolizer && this.labelFeatures(n, r.textSymbolizer)
		}
	},
	drawLayer: function() {
		var e = this.style;
		if (null == e) {
			if (e = this.getDefaultStyle(), null == e) return;
			this.style = e
		}
		if (rules = e.rules, 0 != rules.length) {
			for (var t = 0; t < rules.length; t++) {
				var l = rules[t],
					r = this.selectFeaturesByFilter(l.filter, this.features);
				null != l.symbolizer && (null != l.symbolizer.symbol ? this.renderer.drawIcons(r, l.symbolizer, this.map.transformation) : this.drawFeatures(r, l.symbolizer)), null != l.textSymbolizer && this.labelFeatures(r, l.textSymbolizer)
			}
			this.drawClickLayer()
		}
	},
	getGeomType: function() {
		var e = this.featureType;
		if (null == e) return null;
		var t = e.geomFieldName;
		if (null == t) return null;
		var l = e.getFieldIndex(t);
		if (null == l) return null;
		var r = e.fields[l];
		if (null == r) return null;
		var n = r.geomType;
		return n
	},
	getDefaultStyle: function() {
		var e = this.getGeomType(),
			t = null;
		switch (e) {
		case GeoBeans.Geometry.Type.POINT:
		case GeoBeans.Geometry.Type.MULTIPOINT:
			t = new GeoBeans.Style.FeatureStyle("default", GeoBeans.Style.FeatureStyle.GeomType.Point);
			var l = new GeoBeans.Rule,
				r = new GeoBeans.Symbolizer.PointSymbolizer;
			l.symbolizer = r, t.addRule(l);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			t = new GeoBeans.Style.FeatureStyle("default", GeoBeans.Style.FeatureStyle.GeomType.LineString);
			var l = new GeoBeans.Rule,
				r = new GeoBeans.Symbolizer.LineSymbolizer;
			l.symbolizer = r, t.addRule(l);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			t = new GeoBeans.Style.FeatureStyle("default", GeoBeans.Style.FeatureStyle.GeomType.Polygon);
			var l = new GeoBeans.Rule,
				r = new GeoBeans.Symbolizer.PolygonSymbolizer;
			l.symbolizer = r, t.addRule(l)
		}
		return t
	},
	drawFeatures: function(e, t) {
		if (0 != e.length) {
			this.renderer.save(), this.renderer.setSymbolizer(t);
			for (var l = 0, r = e.length; l < r; l++) feature = e[l], null != t && "undefined" != t && this.renderer.draw(feature, t, this.map.transformation);
			this.renderer.restore()
		}
	},
	drawLabelFeatures: function(e) {
		var t = this.style;
		if (null == t) {
			if (t = this.getDefaultStyle(), null == t) return;
			this.style = t
		}
		if (rules = t.rules, 0 != rules.length) for (var l = 0; l < rules.length; l++) {
			var r = rules[l],
				n = this.selectFeaturesByFilter(r.filter, e);
			null != r.textSymbolizer && this.labelFeatures(n, r.textSymbolizer)
		}
	},
	labelFeatures: function(e, t) {
		if (null != e && 0 != e.length) {
			this.renderer.save(), this.renderer.setSymbolizer(t);
			var l = e[0],
				r = null,
				n = t.labelText;
			if (null == n || 0 == n.length) {
				var a = t.labelProp;
				if (null != a) var i = l.featureType.getFieldIndex(a)
			} else r = n;
			for (var s = null, u = null, o = null, h = 0, c = e.length; h < c; h++) l = e[h], u = l.geometry, null != u && (o = new GeoBeans.PointLabel, o.geometry = u, o.textSymbolizer = t, s = null == r ? l.values[i] : r, o.text = s, o.computePosition(this.renderer, this.map.transformation), o.adjustPosition(this.canvas.width, this.canvas.height), this.map.maplex.isCollision(o) || this.map.maplex.addLabel(this.name, o));
			this.renderer.restore()
		}
	},
	drawFeature: function(e, t) {
		for (var l = this.selectRules(e), r = l.length, n = 0; n < r; n++) {
			var a = l[n];
			if (null != t && "undefined" != t || (t = a.symbolizer), this.map.renderer.save(), this.map.renderer.setSymbolizer(t), t instanceof GeoBeans.Symbolizer.TextSymbolizer) {
				var i = e.featureType.getFieldIndex(t.field);
				this.map.renderer.label(e.geometry, e.values[i], t, this.map.transformation)
			} else this.map.renderer.draw(e, t, this.map.transformation);
			this.map.renderer.restore()
		}
		l = null
	},
	clearFeature: function(e) {
		switch (e.geometry.type) {
		case GeoBeans.Geometry.Type.POINT:
		case GeoBeans.Geometry.Type.MULTIPOINT:
			var t = this.getSymbolizer(e);
			this.map.renderer.clear(e.geometry, this.map.bgColor, t.size, this.map.transformation);
			break;
		default:
			this.map.renderer.clear(e.geometry, this.map.bgColor, 0, this.map.transformation)
		}
	},
	selectFeatures: function(e) {
		if (null == e) return this.features;
		var t = e.type;
		if (t == GeoBeans.Filter.Type.FilterComparsion) {
			var l = null,
				r = null,
				n = e.expression1;
			null != n && (n.type == GeoBeans.Expression.Type.PropertyName ? l = n.name : n.type == GeoBeans.Expression.Type.Literal && (r = n.value));
			var a = e.expression2;
			null != a && (a.type == GeoBeans.Expression.Type.PropertyName ? l = a.name : a.type == GeoBeans.Expression.Type.Literal && (r = a.value))
		}
		if (null == l || null == r) return this.features;
		var i = [],
			s = this.featureType.getFieldIndex(l);
		if (s >= 0) for (var u = null, o = this.features.length, h = 0; h < o; ++h) u = this.features[h], fvalue = u.values[s], fvalue == r && i.push(u);
		return i
	},
	selectFeaturesByFilter: function(e, t, l, r) {
		if (null == e) return t;
		var n = e.type,
			a = t;
		switch (n) {
		case GeoBeans.Filter.Type.FilterID:
			a = this.selectFeaturesByIDFilter(e, t, l, r);
			break;
		case GeoBeans.Filter.Type.FilterComparsion:
			a = this.selectFeaturesByComparsion(e, t, l, r);
			break;
		case GeoBeans.Filter.Type.FilterLogic:
			a = this.selectFeatureByLogic(e, t, l, r);
			break;
		case GeoBeans.Filter.Type.FilterSpatial:
			a = this.selectFeaturesBySpatial(e, t, l, r)
		}
		return a
	},
	selectFeaturesByIDFilter: function(e, t, l, r) {
		if (null == e) return t;
		var n = e.ids;
		if (null == n) return t;
		var a = null;
		null != l && (a = l), null != r && (a += r);
		for (var i = [], s = 0; s < t.length; ++s) {
			var u = t[s],
				o = u.fid;
			if (n.indexOf(o) != -1 && (i.push(u), null != a && i.length == a)) break
		}
		var h = null;
		return h = null != l && null != r ? i.slice(r, a) : null != l && null == r ? i.slice(0, l) : null == l && null != r ? i.slice(r) : i
	},
	selectFeaturesByComparsion: function(e, t, l, r) {
		if (null == e) return t;
		var n = null;
		null != l && (n = l), null != r && (n += r);
		var a = e.operator,
			i = [],
			s = null,
			u = null,
			o = e.expression1;
		null != o && (o.type == GeoBeans.Expression.Type.PropertyName ? s = o.name : o.type == GeoBeans.Expression.Type.Literal && (u = o.value));
		var h = e.expression2;
		switch (null != h && (h.type == GeoBeans.Expression.Type.PropertyName ? s = h.name : h.type == GeoBeans.Expression.Type.Literal && (u = h.value)), a) {
		case GeoBeans.ComparisionFilter.OperatorType.ComOprEqual:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y == u && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprNotEqual:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y != u && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprLessThan:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y < u && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThan:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y > u && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprLessThanOrEqual:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y <= u && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThanOrEqual:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y >= u && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprIsLike:
			if (null == s || null == u) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y.like(u) && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprIsNull:
			var m = e.properyName,
				s = m.name,
				c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], null == y && i.push(f), null == n || i.length != n); ++p);
			break;
		case GeoBeans.ComparisionFilter.OperatorType.ComOprIsBetween:
			var v = e.expression,
				d = e.lowerBound,
				g = e.upperBound,
				s = v.name,
				B = d.value,
				T = g.value;
			if (null == s || null == B || null == T) {
				i = t;
				break
			}
			var c = this.featureType.getFieldIndex(s);
			if (c == -1) {
				i = t;
				break
			}
			for (var f = null, y = null, p = 0; p < t.length && (f = t[p], y = f.values[c], y >= B && y <= T && i.push(f), null == n || i.length != n); ++p);
		}
		var F = null;
		return F = null != l && null != r ? i.slice(r, n) : null != l && null == r ? i.slice(0, l) : null == l && null != r ? i.slice(r) : i
	},
	selectFeatureByLogic: function(e, t, l, r) {
		if (null == e) return t;
		var n = null;
		null != l && (n = l), null != r && (n += r);
		var a = t,
			i = e.operator;
		switch (i) {
		case GeoBeans.LogicFilter.OperatorType.LogicOprAnd:
			a = this.selectFeatureByLogicAnd(e, t, l, r);
			break;
		case GeoBeans.LogicFilter.OperatorType.LogicOprOr:
			a = this.selectFeatureByLogicOr(e, t, l, r);
			break;
		case GeoBeans.LogicFilter.OperatorType.LogicOprNot:
			a = this.selectFeatureByLogicNot(e, t, l, r)
		}
		return a
	},
	selectFeatureByLogicAnd: function(e, t, l, r) {
		if (null == e) return t;
		var n = null;
		null != l && (n = l), null != r && (n += r);
		for (var a = t, i = e.filters, s = 0; s < i.length; ++s) {
			var u = i[s];
			a = this.selectFeaturesByFilter(u, a, null, null)
		}
		var o = null;
		return o = null != l && null != r ? a.slice(r, n) : null != l && null == r ? a.slice(0, l) : null == l && null != r ? a.slice(r) : a
	},
	selectFeatureByLogicOr: function(e, t, l, r) {
		if (null == e) return t;
		var n = null;
		null != l && (n = l), null != r && (n += r);
		for (var a = [], i = e.filters, s = 0; s < i.length; ++s) {
			var u = i[s],
				o = this.selectFeaturesByFilter(u, t, null, null);
			if (a = this.concatArray(a, o), null != n && a.length >= n) break
		}
		var h = null;
		return h = null != l && null != r ? a.slice(r, n) : null != l && null == r ? a.slice(0, l) : null == l && null != r ? a.slice(r) : a
	},
	concatArray: function(e, t) {
		if ($.isArray(e) && $.isArray(t)) {
			for (var l = e.slice(0, e.length), r = 0; r < t.length; ++r) $.inArray(t[r], l) == -1 && l.push(t[r]);
			return l
		}
	},
	selectFeatureByLogicNot: function(e, t, l, r) {
		if (null == e) return t;
		var n = null;
		null != l && (n = l), null != r && (n += r);
		for (var a = e.filters[0], i = this.selectFeaturesByFilter(a, t, l, r), s = [], u = 0; u < t.length && ($.inArray(t[u], i) == -1 && s.push(t[u]), !(null != n && i.length >= n)); ++u);
		var o = null;
		return o = null != l && null != r ? s.slice(r, n) : null != l && null == r ? s.slice(0, l) : null == l && null != r ? s.slice(r) : s
	},
	selectRules: function(e) {
		var t = [];
		if (null != this.style) for (var l = this.style.rules.length, r = 0; r < l; r++) {
			var n = this.style.rules[r];
			if (null != n.filter) {
				var a = n.filter.field,
					i = null,
					s = this.featureType.getFieldIndex(a);
				i = e.values[s], i == n.filter.value && t.push(n)
			} else t.push(n)
		}
		return t
	},
	getSymbolizer: function(e) {
		for (var t = this.selectRules(e), l = t.length, r = 0; r < l; r++) {
			var n = t[r],
				a = n.symbolizer;
			if (!(a instanceof GeoBeans.Style.TextSymbolizer)) return a
		}
		return null
	},
	selectFeaturesBySpatial: function(e, t, l, r) {
		if (null == e) return t;
		var n = e.operator,
			a = t;
		switch (n) {
		case GeoBeans.SpatialFilter.OperatorType.SpOprBBox:
			a = this.selectFeaturesByBBoxFilter(e, t, l, r)
		}
		return a
	},
	selectFeaturesByBBoxFilter: function(e, t, l, r) {
		if (null == e) return t;
		var n = e.extent,
			a = (this.getGeomType(), []),
			i = null;
		null != l && (i = l), null != r && (i += r);
		for (var s = 0; s < t.length; ++s) {
			var u = t[s],
				o = u.geometry;
			if (null != o) {
				var h = o.extent;
				if ((n.intersects(h) || n.containOther(h)) && a.push(u), null != i && a.length == i) break
			}
		}
		var c = null;
		return c = null != l && null != r ? a.slice(r, i) : null != l && null == r ? a.slice(0, l) : null == l && null != r ? a.slice(r) : a
	},
	getFeatureBBoxGet: function(e, t, l) {
		var r = new GeoBeans.BBoxFilter(this.featureType.geomFieldName, e);
		return this.selectFeaturesByFilter(r, this.features, t, l)
	},
	setHitControl: function(e) {
		null != e && "undefined" != e && (this.hitControl = null, this.hitControl = e)
	},
	init: function() {},
	enableHit: function(e) {
		this.enableHit = e
	},
	hit: function(e, t, l) {
		if (null != this.features) {
			this.map.renderer, this.map.transformation;
			this.selection = [];
			var r = 0,
				n = null,
				a = null,
				i = this.features.length;
			for (r = 0; r < i; r++) n = this.features[r], a = n.geometry, null != a && a.hit(e, t, this.map.tolerance) && this.selection.push(n);
			if (this.hitRenderer.clearRect(0, 0, this.hitCanvas.height, this.hitCanvas.width), this.map.drawLayersAll(), void 0 != l) {
				var s = new GeoBeans.Geometry.Point(e, t);
				l(this, this.selection, s)
			}
		}
	},
	registerHitEvent: function(e) {
		var t = this.map,
			l = this,
			r = null,
			n = null,
			a = 10;
		this.hitCanvas = document.createElement("canvas"), this.hitCanvas.width = this.canvas.width, this.hitCanvas.height = this.canvas.height, this.hitRenderer = new GeoBeans.Renderer(this.hitCanvas), this.hitEvent = function(i) {
			if (null == r) r = i.layerX, n = i.layerY;
			else {
				var s = Math.abs(i.layerX - r) + Math.abs(i.layerY - n);
				if (s > a) {
					r = i.layerX, n = i.layerY;
					var u = t.transformation.toMapPoint(i.layerX, i.layerY);
					l.hit(u.x, u.y, e)
				}
			}
		}, t.mapDiv[0].addEventListener("mousemove", this.hitEvent), this.events.addEvent("mousemove", this.hitEvent)
	},
	unRegisterHitEvent: function() {
		this.map.mapDiv[0].removeEventListener("mousemove", this.hitEvent), this.hitRenderer.clearRect(0, 0, this.hitCanvas.height, this.hitCanvas.width), this.map.drawLayersAll(), this.hitEvent = null
	},
	drawHitFeature: function(e, t) {
		for (var l = this.selectRules(e), r = l.length, n = 0; n < r; n++) {
			var a = l[n];
			if (null != t && "undefined" != t || (t = a.symbolizer), this.hitRenderer.save(), this.hitRenderer.setSymbolizer(t), t instanceof GeoBeans.Symbolizer.TextSymbolizer) {
				var i = e.featureType.getFieldIndex(t.field);
				this.hitRenderer.label(e.geometry, e.values[i], t, this.map.transformation)
			} else this.hitRenderer.draw(e, t, this.map.transformation);
			this.hitRenderer.restore()
		}
		l = null, this.map.drawLayersAll()
	},
	cleanup: function() {
		this.enableHit = !1, this.map.canvas.removeEventListener("mousemove", this.hitEvent), this.map.canvas.removeEventListener("mousemove", this.hitTooltipEvent)
	},
	registerHitTooltipEvent: function(e) {
		var t = this.map,
			l = this,
			r = null,
			n = null,
			a = 10;
		this.hitTooltipEvent = function(t) {
			if (null == r) r = t.layerX, n = t.layerY;
			else {
				var i = Math.abs(t.layerX - r) + Math.abs(t.layerY - n);
				i > a && (r = t.layerX, n = t.layerY, l.hitTooltip(t.layerX, t.layerY, e))
			}
		}, t.canvas.addEventListener("mousemove", this.hitTooltipEvent)
	},
	unregisterHitTooltipEvent: function() {
		this.map.canvas.removeEventListener("mousemove", this.hitTooltipEvent), this.hitTooltipEvent = null
	},
	hitTooltip: function(e, t, l) {
		if (null != this.features && null != l) {
			var r = this.map,
				n = r.transformation.toMapPoint(e, t),
				a = n.x,
				i = n.y,
				s = (this.map.renderer, this.map.transformation, 0),
				u = null,
				o = null,
				h = this.features.length;
			for (s = 0; s < h; s++) if (u = this.features[s], o = u.geometry, null != o && o.hit(a, i, this.map.tolerance)) return void l(this, a, i, u);
			l(this, a, i, null)
		}
	},
	getBufferTracker: function() {
		if (null == this.bufferTracker) {
			var e = new GeoBeans.Control.TrackBufferControl,
				t = this.map.controls.find(e.type);
			t == -1 ? (this.bufferTracker = e, this.map.controls.add(this.bufferTracker)) : this.bufferTracker = this.map.controls.get(t)
		}
		return this.bufferTracker
	},
	queryByBufferLine: function(e, t) {
		var l = this.getBufferTracker();
		l.trackBufferLine(this, e, t, this.callbackQueryByBufferTrack)
	},
	queryByBufferCircle: function(e) {
		var t = this.getBufferTracker();
		t.trackBufferCircle(this, e, this.callbackQueryByBufferTrack)
	},
	callbackQueryByBufferTrack: function(e, t, l, r) {
		if (!(null == l || t < 0)) {
			var n = e.featureType;
			if (null != n) {
				var a = e.workspace;
				null != a && a.queryByBuffer(t, l, n, r)
			}
		}
	},
	beginTransaction: function(e) {
		var t = this.featureType.getFieldIndex(this.featureType.geomFieldName),
			l = this.featureType.fields[t],
			r = l.geomType,
			n = this.getTransactionTracker();
		switch (r) {
		case GeoBeans.Geometry.Type.POINT:
			n.trackPoint(this.transactionCallback, e, this);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
			n.trackLine(this.transactionCallback, e, this, !1);
			break;
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			n.trackLine(this.transactionCallback, e, this, !0);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
			n.trackPolygon(this.transactionCallback, e, this, !1);
			break;
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			n.trackPolygon(this.transactionCallback, e, this, !0)
		}
	},
	transactionCallback: function(e, t, l) {
		t(e, l)
	},
	transaction: function(e, t, l) {
		this.workspace.transaction(this.featureType, e, t, l)
	},
	getTransactionTracker: function() {
		var e = null,
			t = this.map.controls.find(GeoBeans.Control.Type.TRACKTRANSACTION);
		return t == -1 ? (e = new GeoBeans.Control.TrackControl.TrackTransactionControl, this.map.controls.add(e)) : e = this.map.controls.get(t), e
	},
	CLASS_NAME: "GeoBeans.Layer.FeatureLayer",
	registerClickEvent: function(e, t) {
		var l = this.map,
			r = this;
		null != e && (this.clickStyle = e), this.clickEvent = function(e) {
			console.log("click up");
			var n = r.map.controls.find(GeoBeans.Control.Type.DRAG_MAP),
				a = r.map.controls.get(n);
			if (a.draging) return void console.log("draging");
			r.clickRenderer.clearRect(), r.map.drawLayersAll();
			var i = l.transformation.toMapPoint(e.layerX, e.layerY);
			r.clickHit(i.x, i.y, t)
		}, l.canvas.addEventListener("mouseup", this.clickEvent)
	},
	clickHit: function(e, t, l) {
		if (this.map.closeInfoWindow(), null == this.features) return void(null != l && l(null));
		var r = [],
			n = 0,
			a = null,
			i = null,
			s = this.features.length;
		for (n = 0; n < s; n++) a = this.features[n], i = a.geometry, null != i && i.hit(e, t, this.map.tolerance) && r.push(a);
		if (0 == r.length) return this.clickFeature = null, void(null != l && l(null));
		for (var u = r[0], o = u.geometry, h = this.getDistance(e, t, o), n = 1; n < r.length; ++n) {
			var a = r[n],
				i = a.geometry,
				c = this.getDistance(e, t, i);
			c < h && (u = a)
		}
		null != l && (this.clickFeature = u, this.map.drawLayersAll(), l(u, e, t))
	},
	getDistance: function(e, t, l) {
		var r = this.getGeomType(),
			n = null;
		switch (r) {
		case GeoBeans.Geometry.Type.POINT:
		case GeoBeans.Geometry.Type.MULTIPOINT:
			l.getCentroid();
			n = GeoBeans.Utility.getDistance(e, t, l.x, l.y);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			n = l.distance(e, t);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			l.getCentroid();
			n = GeoBeans.Utility.getDistance(e, t, l.x, l.y)
		}
		return n
	},
	unRegisterClickEvent: function() {
		this.map.closeInfoWindow(), this.map.canvas.removeEventListener("mouseup", this.clickEvent), this.clickEvent = null, this.clickRenderer.clearRect(), this.clickFeature = null, this.map.drawLayersAll()
	},
	drawClickLayer: function() {
		if (this.clickRenderer.clearRect(), null != this.clickFeature) {
			var e = this.clickStyle;
			if (null == e && (e = this.getDefaultStyle()), null != e) {
				var t = e.rules;
				if (0 != t.length) for (var l = 0; l < t.length; l++) {
					var r = t[l],
						n = this.selectFeaturesByFilter(r.filter, [this.clickFeature]);
					null != r.symbolizer && (null != r.symbolizer.symbol ? this.clickRenderer.drawIcons(n, r.symbolizer, this.map.transformation) : this.drawClickFeatures(n, r.symbolizer)), null != r.textSymbolizer && this.labelClickFeatures(n, r.textSymbolizer)
				}
			}
		}
	},
	drawClickFeatures: function(e, t) {
		if (null != e) {
			this.clickRenderer.save(), this.clickRenderer.setSymbolizer(t);
			for (var l = 0, r = e.length; l < r; l++) feature = e[l], null != t && "undefined" != t && this.clickRenderer.draw(feature, t, this.map.transformation);
			this.clickRenderer.restore()
		}
	},
	labelClickFeatures: function(e, t) {
		var l = e.length;
		if (0 != l) {
			this.clickRenderer.save(), this.clickRenderer.setSymbolizer(t);
			var r = e[0],
				n = null,
				a = t.labelText;
			if (null == a || 0 == a.length) {
				var i = t.labelProp;
				if (null != i) var s = r.featureType.getFieldIndex(i)
			} else n = a;
			for (var u = null, o = null, h = null, c = 0, l = e.length; c < l; c++) r = e[c], o = r.geometry, null != o && (h = new GeoBeans.PointLabel, h.geometry = o, h.textSymbolizer = t, u = null == n ? r.values[s] : n, h.text = u, h.computePosition(this.clickRenderer, this.map.transformation), this.clickRenderer.drawLabel(h));
			this.clickRenderer.restore()
		}
	},
	getFeatureValue: function(e, t) {
		if (null != e) return e.getValue(t)
	},
	setFeatureValue: function(e, t, l) {
		null != e && (e.setValue(t, l), this.flag = GeoBeans.Layer.Flag.READY)
	},
	getFeatureFilter: function(e, t, l, r, n) {
		var a = new Date,
			i = this.selectFeaturesByFilter(e, this.features, t, l),
			s = new Date - a;
		console.log("select feature:" + s), this.map.queryLayer.setFeatures(i), this.map.drawLayersAll(), n(i)
	}
});
GeoBeans.Layer.ChartLayer = GeoBeans.Class(GeoBeans.Layer.FeatureLayer, {
	baseLayerName: null,
	baseLayerField: null,
	option: null,
	baseLayer: null,
	initialize: function(e, a, t, n) {
		this.name = e, this.baseLayerName = a, this.baseLayerField = t, this.option = n
	},
	destroy: function() {
		this.baseLayerName = null, this.baseLayerField = null, this.option = null, this.removeLegend(), this.map._removeLegend(this.legendIndex)
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments);
		var a = this.getFeatures();
		this.features = a
	},
	getFeatures: function() {
		var e = this.map.getLayer(this.baseLayerName);
		if (null == e) return null;
		this.baseLayer = e, this.featureType = this.baseLayer.featureType;
		var a = e.getFeatures();
		return a
	},
	getMinMaxValue: function() {
		if (null == this.features) return null;
		for (var e = null, a = null, t = null, n = this.featureType.getFieldIndex(this.baseLayerField), s = 0; s < this.features.length; ++s) if (t = this.features[s], null != t) {
			var i = t.values,
				l = i[n];
			null != l && (l = parseFloat(l), e = null == e ? l : l < e ? l : e, a = null == a ? l : l > a ? l : a)
		}
		return {
			min: e,
			max: a
		}
	},
	addLegend: function() {},
	removeLegend: function() {
		this.map.mapDiv.find(".chart-legend#" + this.name).remove()
	},
	showLegend: function() {
		this.map.mapDiv.find(".chart-legend#" + this.name).css("display", "block")
	},
	hideLegend: function() {
		this.map.mapDiv.find(".chart-legend#" + this.name).css("display", "none")
	}
});
GeoBeans.Layer.GroupLayer = GeoBeans.Class(GeoBeans.Layer, {
	layers: null,
	server: null,
	image: null,
	format: "image/png",
	version: "1.1.0",
	srs: "EPSG:4326",
	transparent: "true",
	updateFlag: !1,
	initialize: function(e, a, s) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.server = e, this.name = a, this.layers = [], void 0 != s && (this.format = s), this.image = new Image
	},
	addLayer: function(e) {
		null != e && this.layers.push(e)
	},
	insertLayer: function(e) {
		null != e && this.layers.unshift(e)
	},
	removeLayer: function(e) {
		for (var a = null, s = 0; s < this.layers.length; ++s) if (a = this.layers[s], a == e) return this.layers.splice(s, 1), void e.cleanup()
	},
	getLayers: function() {
		return this.layers
	},
	loadTotal: function() {
		if (null == this.map || null == this.map.canvas) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		for (var e, a = this.map.canvas.width, s = this.map.canvas.height, r = this.map.viewer, i = r.xmin.toFixed(6) + "," + r.ymin.toFixed(6) + "," + r.xmax.toFixed(6) + "," + r.ymax.toFixed(6), t = "", l = "", n = 0; n < this.layers.length; ++n) {
			var h = this.layers[n],
				o = h.name,
				g = h.styleName,
				h = this.layers[n];
			if (null != o && h.visible && !h.drawLocal) {
				null != g && (t += g), l += o, n < this.layers.length - 1 && (t += ",", l += ",");
				var u = h.heatMapLayer;
				null != u && u.visible && u.load()
			}
		}
		if (e = this.server + "?service=WMS&version=" + this.version + "&request=GetMap&layers=" + l + "&styles=" + t + "&bbox=" + i + "&width=" + a + "&height=" + s + "&srs=" + this.srs + "&format=" + this.format + "&transparent=" + this.transparent + "&mapName=" + this.map.name, this.renderer.clearRect(0, 0, a, s), "" == l) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		if (this.image.src == e && this.flag == GeoBeans.Layer.Flag.ERROR) return void console.log("ERROR");
		if (this.updateFlag) {
			var y = new Date;
			this.image.src = e + "&t=" + y.getTime(), this.updateFlag = !1
		} else this.image.src = e;
		if (this.image.complete) {
			this.updateFlag = !1, this.flag = GeoBeans.Layer.Flag.LOADED, this.renderer.drawImage(this.image, 0, 0, a, s);
			var f = this.image.src.lastIndexOf("&t=");
			f != -1 && (this.image.src = this.image.src.slice(0, f))
		} else {
			var m = this;
			m.flag = GeoBeans.Layer.Flag.READY, this.image.onload = function() {
				m.flag != GeoBeans.Layer.Flag.LOADED && (m.flag = GeoBeans.Layer.Flag.LOADED, m.renderer.drawImage(m.image, 0, 0, a, s), m.map.drawLayersAll())
			}, this.image.onerror = function() {
				m.flag = GeoBeans.Layer.Flag.ERROR, m.map.drawLayersAll()
			}
		}
	},
	load: function() {
		this.flag = GeoBeans.Layer.Flag.READY;
		for (var e = null, a = 0; a < this.layers.length; ++a) e = this.layers[a], null != e && e.visible && (this.map.drawLocalFlag && e instanceof GeoBeans.Layer.FeatureDBLayer ? e.loadLocal() : e.load());
		for (var s = null, a = 0; a < this.layers.length; ++a) if (e = this.layers[a], null != e && e.visible && (s = e.flag, s != GeoBeans.Layer.Flag.LOADED)) return;
		var r = null;
		this.renderer.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (var a = this.layers.length - 1; a >= 0; --a) e = this.layers[a], null != e && e.visible && (r = e.canvas, null != r && e.flag == GeoBeans.Layer.Flag.LOADED && this.renderer.drawImage(r, 0, 0, r.width, r.height));
		this.flag = GeoBeans.Layer.Flag.LOADED
	},
	update: function() {
		this.updateFlag = !0
	},
	hasLayer: function(e) {
		if (null == e) return !1;
		for (var a = null, s = 0; s < this.layers.length; ++s) if (a = this.layers[s], null != a && a.name == e) return !0;
		return !1
	}
});
GeoBeans.Layer.HeatMapLayer_1 = GeoBeans.Class(GeoBeans.Layer, {
	name: null,
	container: null,
	data: null,
	layer: null,
	field: null,
	uniqueValue: null,
	heatmapInstance: null,
	div: null,
	config: null,
	initialize: function(e, a) {
		this.name = e, this.config = a
	},
	setMap: function(e) {
		if (null != e) {
			this.map = e, this.div = document.createElement("div"), this.div.className = "heatmap";
			var a = e.canvas,
				n = a.height,
				i = a.width;
			this.div.style.cssText = "height:" + n + "px;width:" + i + "px;";
			var t = null,
				l = null;
			null != this.config && (null != this.config.gradient && (t = this.config.gradient), l = null != this.config.radius ? this.config.radius : 30), this.heatmapInstance = h337.create({
				container: this.div,
				gradient: t,
				radius: l
			})
		}
	},
	destory: function() {
		this.name = null, this.layer = null, this.field = null, this.heatmapInstance = null
	},
	setLayer: function(e, a, n) {
		null != e && (null == a && null == n || (this.layer = e, this.field = a, this.uniqueValue = n))
	},
	getField: function() {
		return this.field
	},
	getUniqueValue: function() {
		return this.uniqueValue
	},
	load: function() {
		var e = this.layer.getFeatureType();
		if (null == e) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		var a = e.getFieldIndex(this.field);
		if (a < 0 && null == this.uniqueValue) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		var n, i, t = null,
			l = null,
			u = [],
			s = null,
			r = this.layer.map.transformation,
			h = this.map.getViewer();
		if (null == h) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		var o = this.layer.getFeatureBBoxGet(h);
		if (null == o) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		for (var d = 0; d < o.length; ++d) {
			var f = o[d],
				c = f.geometry;
			c instanceof GeoBeans.Geometry.Point && (s = r.toScreenPoint(c.x, c.y)), a < 0 && null != this.uniqueValue ? (n = this.uniqueValue, l = n, t = n) : a >= 0 && (n = f.values[a], 0 == d && (t = n, l = n), t = Math.max(n, t), l = Math.min(n, l)), i = {
				x: s.x,
				y: s.y,
				value: n
			}, u.push(i)
		}
		var g = {
			max: t,
			min: l,
			data: u
		};
		this.heatmapInstance.setData(g), this.canvas = this.div.children[0], this.flag = GeoBeans.Layer.Flag.LOADED
	}
});
GeoBeans.Layer.MapLayer = GeoBeans.Class(GeoBeans.Layer, {
	style_name: null,
	style: null,
	geomType: null,
	fields: null,
	initialize: function(e) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments)
	},
	destory: function() {
		this.style_name = null, GeoBeans.Layer.prototype.destory.apply(this, arguments)
	},
	draw: function() {},
	setStyle: function(e) {}
});
GeoBeans.Layer.OverlayLayer = GeoBeans.Class(GeoBeans.Layer.FeatureLayer, {
	overlays: null,
	hitOverlay: null,
	hitOverlayCallback: null,
	editCanvas: null,
	editRenderer: null,
	editEvent: null,
	editOverlay: null,
	incrementID: 0,
	initialize: function(e) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.overlays = []
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments), this.clickCanvas = document.createElement("canvas"), this.clickCanvas.width = this.canvas.width, this.clickCanvas.height = this.canvas.height, this.clickRenderer = new GeoBeans.Renderer(this.clickCanvas)
	},
	addOverlay: function(e) {
		return null == e ? void console.log("overlay is null") : null == e.id && null == e.symbolizer ? void console.log("overlay is invalid") : null != this.getOverlay(e.id) ? void console.log("overlay id repeat") : (e.setLayer(this), void this.overlays.push(e))
	},
	getOverlay: function(e) {
		for (var t = 0; t < this.overlays.length; ++t) {
			var i = this.overlays[t];
			if (i.id == e) return i
		}
		return null
	},
	addOverlays: function(e) {
		for (var t = 0; t < e.length; ++t) {
			var i = e[t];
			this.addOverlay(i)
		}
	},
	removeOverlay: function(e) {
		for (var t = this.overlays.length, i = t - 1; i >= 0; i--) {
			var r = this.overlays[i];
			if (r.id == e) return this.overlays.splice(i, 1), r.destroy(), void(r = null)
		}
	},
	removeOverlayObj: function(e) {
		var t = e.id;
		this.removeOverlay(t)
	},
	removeOverlays: function(e) {
		if (!$.isArray(e)) return void console.log("ids is null");
		for (var t = 0; t < e.length; ++t) this.removeOverlay(e[t])
	},
	clearOverlays: function() {
		for (var e = this.overlays.length; e > 0;) this.overlays.splice(e - 1, 1), e = this.overlays.length;
		null != this.editRenderer && this.editRenderer.clearRect(), null != this.hitRenderer && this.hitRenderer.clearRect()
	},
	load: function() {
		this.renderer.clearRect(), null != this.hitRenderer && this.hitRenderer.clearRect(), null != this.editRenderer && this.editRenderer.clearRect();
		for (var e = 0; e < this.overlays.length; ++e) {
			var t = this.overlays[e];
			t.draw()
		}
		this.drawClickLayer()
	},
	draw: function() {
		var e = this.getLoadFlag();
		e == GeoBeans.Layer.Flag.LOADED && this.map.drawLayersAll()
	},
	getLoadFlag: function() {
		for (var e = 0; e < this.overlays.length; ++e) {
			var t = this.overlays[e],
				i = t.loadFlag;
			if (i != GeoBeans.Overlay.Flag.LOADED) return GeoBeans.Layer.Flag.READY
		}
		return GeoBeans.Layer.Flag.LOADED
	},
	drawClickLayer: function() {
		if (this.clickRenderer.clearRect(), null != this.clickOverlay) {
			var e = this.getClickSymbolizer(this.clickOverlay);
			null != e && (this.clickRenderer.setSymbolizer(e), this.clickRenderer.drawOverlay(this.clickOverlay, e, this.map.transformation))
		}
	},
	setHitOverlayCallback: function(e) {
		this.hitOverlayCallback = e
	},
	onOverlayHit: function(e, t) {
		var i = t.length;
		if (i >= 1) {
			var r = t[i - 1];
			if (r.isEdit) return e.hitRenderer.clearRect(), void e.map.drawLayersAll();
			var a = e.getHitOverlaySymbolizer(r);
			e.drawHitOverlay(r, a), null != e.hitOverlay && (e.hitOverlay.isHit = !1), e.hitOverlay = r, r.isHit = !0, null != e.hitOverlayCallback && e.hitOverlayCallback(r)
		} else null != e.editOverlay && (e.editOverlay.isHit = !1), null != e.hitOverlayCallback && e.hitOverlayCallback(null), null != e.hitOverlay && (e.hitOverlay.isHit = !1)
	},
	getHitOverlaySymbolizer: function(e) {
		var t = e.type,
			i = null;
		switch (t) {
		case GeoBeans.Overlay.Type.MARKER:
			i = new GeoBeans.Symbolizer.PointSymbolizer;
			var r = new GeoBeans.Symbol;
			r.icon = "../images/marker-hit.png", i.symbol = r;
			break;
		case GeoBeans.Overlay.Type.PLOYLINE:
			i = new GeoBeans.Symbolizer.LineSymbolizer, i.stroke.color.set(255, 0, 0, 1), i.stroke.width = 4;
			break;
		case GeoBeans.Overlay.Type.POLYGON:
			i = new GeoBeans.Symbolizer.PolygonSymbolizer, i.fill.color.set(255, 255, 255, 1), i.stroke.color.set(255, 0, 0, 1)
		}
		return i
	},
	drawHitOverlay: function(e, t) {
		this.hitRenderer.clearRect(), this.hitRenderer.setSymbolizer(t);
		var i = this.hitRenderer.drawOverlay(e, t, this.map.transformation);
		i && this.map.renderer.drawImage(this.hitCanvas, 0, 0, this.hitCanvas.width, this.hitCanvas.height)
	},
	registerHitEvent: function() {
		this.hitCanvas = document.createElement("canvas"), this.hitCanvas.width = this.canvas.width, this.hitCanvas.height = this.canvas.height, this.hitRenderer = new GeoBeans.Renderer(this.hitCanvas);
		var e = this,
			t = null,
			i = null,
			r = 10,
			a = e.map;
		this.hitEvent = function(n) {
			if (null == t) t = n.layerX, i = n.layerY;
			else {
				var l = Math.abs(n.layerX - t) + Math.abs(n.layerY - i);
				if (l > r) {
					t = n.layerX, i = n.layerY;
					var s = a.transformation.toMapPoint(n.layerX, n.layerY);
					e.hit(s.x, s.y)
				}
			}
		}, a.canvas.addEventListener("mousemove", this.hitEvent), this.registerEditEvent()
	},
	unregisterHitEvent: function() {
		var e = this.map;
		e.canvas.removeEventListener("mousemove", this.hitEvent), this.unregisterEditEvent(), this.editOverlay = null, this.editRenderer.clearRect(), this.hitRenderer.clearRect(), this.map.drawLayersAll()
	},
	hit: function(e, t) {
		if (null != this.overlays) {
			this.map.renderer, this.map.transformation;
			this.selection = [];
			var i = 0,
				r = null,
				a = null,
				n = this.overlays.length;
			for (i = 0; i < n; i++) r = this.overlays[i], a = r.geometry, null != a && a.hit(e, t, this.map.tolerance) && this.selection.push(r);
			this.hitRenderer.clearRect(), this.map.drawLayersAll(), void 0 != this.onOverlayHit && this.onOverlayHit(this, this.selection)
		}
	},
	registerEditEvent: function() {
		null == this.editCanvas && (this.editCanvas = document.createElement("canvas"), this.editCanvas.width = this.canvas.width, this.editCanvas.height = this.canvas.height, this.editRenderer = new GeoBeans.Renderer(this.editCanvas));
		var e = this.map,
			t = this;
		this.editEvent = function(i) {
			var r = t.hitOverlay;
			if (null != r) {
				null != t.editOverlay && (t.editOverlay.isEdit = !1);
				var a = e.transformation.toMapPoint(i.layerX, i.layerY),
					n = r.geometry;
				if (n.hit(a.x, a.y, e.tolerance)) {
					t.editOverlay = r;
					var l = t.getEditOverlaySymbolizer(r);
					t.drawEditOverlay(r, l), r.isEdit = !0, null != t.hitOverlayCallback && t.hitOverlayCallback(r)
				}
			}
		}, this.map.canvas.addEventListener("click", this.editEvent)
	},
	unregisterEditEvent: function() {
		this.map.canvas.removeEventListener("click", this.editEvent)
	},
	getEditOverlaySymbolizer: function(e) {
		var t = e.type,
			i = null;
		switch (t) {
		case GeoBeans.Overlay.Type.MARKER:
			i = new GeoBeans.Symbolizer.PointSymbolizer;
			var r = new GeoBeans.Symbol;
			r.icon = "../images/marker-edit.png", i.symbol = r;
			break;
		case GeoBeans.Overlay.Type.PLOYLINE:
			i = new GeoBeans.Symbolizer.LineSymbolizer, i.stroke.color.set(255, 0, 0, 1), i.stroke.width = 6;
			break;
		case GeoBeans.Overlay.Type.POLYGON:
			i = new GeoBeans.Symbolizer.PolygonSymbolizer, i.fill.color.set(255, 0, 0, 1), i.stroke.color.set(255, 0, 0, 1), i.stroke.width = 8
		}
		return i
	},
	drawEditOverlay: function(e, t) {
		this.editRenderer.clearRect(), this.editRenderer.setSymbolizer(t);
		var i = this.editRenderer.drawOverlay(e, t, this.map.transformation);
		i && this.map.renderer.drawImage(this.editCanvas, 0, 0, this.editCanvas.width, this.editCanvas.height)
	},
	registerInfoWindowEvent: function() {
		if (null == this.hitInfoWindowEvent) {
			var e = this,
				t = null,
				i = null,
				r = 10;
			this.hitInfoWindowEvent = function(a) {
				if (null == t) t = a.layerX, i = a.layerY;
				else {
					var n = Math.abs(a.layerX - t) + Math.abs(a.layerY - i);
					if (n > r) {
						t = a.layerX, i = a.layerY;
						var l = e.map.transformation.toMapPoint(a.layerX, a.layerY);
						e.hitInfoWindow(l.x, l.y)
					}
				}
			}, this.map.canvas.addEventListener("mousemove", this.hitInfoWindowEvent)
		}
	},
	hitInfoWindow: function(e, t) {
		if (null != this.overlays) {
			var i = (this.map.renderer, this.map.transformation, []),
				r = 0,
				a = null,
				n = null,
				l = this.overlays.length;
			for (r = 0; r < l; r++) a = this.overlays[r], n = a.geometry, null != n && n instanceof GeoBeans.Geometry.Point && n.hit(e, t, this.map.tolerance) && i.push(a);
			if (i.length >= 1) {
				var a = i[i.length - 1],
					s = a.geometry,
					o = a.infoWindow;
				null != s && null != o && this.map.openInfoWindow(o, s)
			} else this.map.closeInfoWindow()
		}
	},
	unRegisterInfoWindowEvent: function() {
		this.map.canvas.removeEventListener("mousemove", this.hitInfoWindowEvent), this.hitInfoWindowEvent = null
	},
	_getOverlayIDByIdentity: function() {
		var e = null;
		for (e = "overlay_" + this.incrementID; null != this.getOverlay(e);) this.incrementID++, e = "overlay_" + this.incrementID;
		return e
	},
	registerOverlayClickEvent: function(e) {
		var t = this,
			i = t.map;
		this.clickEvent = function(r) {
			var a = t.map._getTrackOverlayControl();
			if (!a.drawing) {
				var n = t.map.controls.find(GeoBeans.Control.Type.DRAG_MAP),
					l = t.map.controls.get(n);
				if (l.draging) return void console.log("draging");
				t.clickRenderer.clearRect(), t.map.drawLayersAll();
				var s = i.transformation.toMapPoint(r.layerX, r.layerY);
				t.clickHit(s.x, s.y, e)
			}
		}, i.canvas.addEventListener("mouseup", this.clickEvent)
	},
	clickHit: function(e, t, i) {
		if (null == this.overlays) return void(null != i && i(null));
		var r = [],
			a = 0,
			n = null,
			l = null,
			s = this.overlays.length;
		for (a = 0; a < s; a++) if (n = this.overlays[a], n.type == GeoBeans.Overlay.Type.LABEL) {
			var o = n.label;
			if (null != o) {
				var h = o.extent,
					v = this.map.transformation.toScreenPoint(e, t);
				null != h && null != v && h.contain(v.x, v.y) && r.push(n)
			}
		} else l = n.geometry, null != l && l.hit(e, t, this.map.tolerance) && r.push(n);
		if (0 == r.length) return this.clickOverlay = null, void(null != i && i(null));
		for (var y = r[0], c = y.geometry, d = this.getDistance(e, t, c), a = 1; a < r.length; ++a) {
			var n = r[a],
				l = n.geometry,
				u = this.getDistance(e, t, n.geometry);
			u < d && (y = f)
		}
		null != i && (this.clickOverlay = y, this.map.drawLayersAll(), i(y))
	},
	getDistance: function(e, t, i) {
		var r = i.type,
			a = null;
		switch (r) {
		case GeoBeans.Geometry.Type.POINT:
		case GeoBeans.Geometry.Type.MULTIPOINT:
			i.getCentroid();
			a = GeoBeans.Utility.getDistance(e, t, i.x, i.y);
			break;
		case GeoBeans.Geometry.Type.LINESTRING:
		case GeoBeans.Geometry.Type.MULTILINESTRING:
			a = i.distance(e, t);
			break;
		case GeoBeans.Geometry.Type.POLYGON:
		case GeoBeans.Geometry.Type.MULTIPOLYGON:
			i.getCentroid();
			a = GeoBeans.Utility.getDistance(e, t, i.x, i.y)
		}
		return a
	},
	getClickSymbolizer: function(e) {
		if (null == e) return null;
		var t = e.symbolizer,
			i = null,
			r = t.type;
		switch (r) {
		case GeoBeans.Symbolizer.Type.Point:
			var a = t.image;
			if (null == a || null == t.symbol) break;
			var n = null == t.symbol.width ? a.width : t.symbol.width,
				l = null == t.symbol.height ? a.height : t.symbol.height;
			i = new GeoBeans.Symbolizer.PointSymbolizer;
			var s = new GeoBeans.Symbol;
			s.icon = t.symbol.icon, s.icon_width = 1.2 * n, s.icon_height = 1.2 * l, i.symbol = s;
			break;
		case GeoBeans.Symbolizer.Type.Line:
			i = new GeoBeans.Symbolizer.LineSymbolizer;
			var n = t.stroke.width;
			i.stroke = t.stroke.clone(), i.stroke.width = 3 * t.stroke.width;
			break;
		case GeoBeans.Symbolizer.Type.Polygon:
			i = new GeoBeans.Symbolizer.PolygonSymbolizer;
			var o = t.stroke;
			if (null == o) {
				var o = new GeoBeans.Stroke;
				o.color.setByHex("#0099FF", 1), o.width = 5, i.stroke = o
			} else {
				var n = o.width;
				i.stroke = o.clone(), i.stroke.width = 3 * n
			}
			var h = t.fill;
			null != h ? i.fill = h.clone() : i.fill = null;
			break;
		case GeoBeans.Symbolizer.Type.Text:
			i = new GeoBeans.Symbolizer.TextSymbolizer, i = t.clone();
			var v = t.font.size;
			i.font.size = 2 * v
		}
		return i
	},
	unRegisterOverlayClickEvent: function() {
		null != this.clickEvent && (this.map.canvas.removeEventListener("mouseup", this.clickEvent), this.clickEvent = null, this.clickOverlay = null, this.map.drawLayersAll())
	}
});
GeoBeans.Layer.PanoramaLayer = GeoBeans.Class(GeoBeans.Layer.FeatureLayer, {
	overlays: null,
	initialize: function(e) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.overlays = []
	},
	addMarker: function(e, a, t, i) {
		if (null != e && null != a && null != t) {
			null == i && (i = "images/360.png");
			var n = new GeoBeans.Symbolizer.PointSymbolizer;
			n.icon_url = i, n.icon_offset_x = 0, n.icon_offset_y = 0;
			var l = new GeoBeans.Overlay.Marker(a, e, n);
			l.setLayer(this), l.htmlPath = t, this.overlays.push(l), null == this.clickEvent && this.registerClickEvent()
		}
	},
	removeMarker: function(e) {
		for (var a = null, t = 0; t < this.overlays.length; ++t) a = this.overlays[t], a.name == e && this.overlays.splice(t, 1);
		0 == this.overlays.length && this.unRegisterClickEvent(), this.map.infoWindow.attr("data-original-title") == e && this.map.closeInfoWindow()
	},
	clearMarkers: function() {
		for (var e = this.overlays.length; e > 0;) this.overlays.splice(e - 1, 1), e = this.overlays.length;
		this.renderer.clearRect(), this.unRegisterClickEvent(), this.map.closeInfoWindow()
	},
	load: function() {
		this.renderer.clearRect();
		for (var e = 0; e < this.overlays.length; ++e) {
			var a = this.overlays[e];
			a.draw()
		}
	},
	draw: function() {
		var e = this.getLoadFlag();
		e == GeoBeans.Layer.Flag.LOADED && this.map.drawLayersAll()
	},
	getLoadFlag: function() {
		for (var e = 0; e < this.overlays.length; ++e) {
			var a = this.overlays[e],
				t = a.loadFlag;
			if (t != GeoBeans.Overlay.Flag.LOADED) return GeoBeans.Layer.Flag.READY
		}
		return GeoBeans.Layer.Flag.LOADED
	},
	registerClickEvent: function() {
		var e = this.map,
			a = this;
		this.clickEvent = function(t) {
			var i = e.transformation.toMapPoint(t.layerX, t.layerY);
			a.hit(i.x, i.y, a.hitOverlayCallback)
		}, e.canvas.addEventListener("click", this.clickEvent)
	},
	unRegisterClickEvent: function() {
		var e = this.map;
		e.canvas.removeEventListener("click", this.clickEvent), this.clickEvent = null
	},
	hit: function(e, a, t) {
		var i = [],
			n = 0,
			l = null,
			r = null,
			s = this.overlays.length;
		for (n = 0; n < s; n++) l = this.overlays[n], r = l.geometry, null != r && r.hit(e, a, this.map.tolerance) && i.push(l);
		t(this, i)
	},
	hitOverlayCallback: function(e, a) {
		if (null != a && 0 != a.length) {
			var t = a[0];
			if (null != t) {
				var i = {
					title: t.name
				},
					n = t.htmlPath,
					l = t.geometry;
				if (null != n && null != l) {
					var r = "<div style='width:400px;height:300px;'><iframe src='" + n + "' style='width:100%;height:100%' frameborder='no'></iframe></div>",
						s = new GeoBeans.InfoWindow(r, i);
					mapObj.openInfoWindow(s, l)
				}
			}
		}
	}
});
GeoBeans.Layer.FeatureLayer.QueryLayer = GeoBeans.Class(GeoBeans.Layer.FeatureLayer, {
	layer: null,
	blinkFeature: null,
	blinkFeatureIndex: -1,
	timer: null,
	initialize: function(e) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments)
	},
	setLayer: function(e, l) {
		null != e && (this.layer = e, null != l ? this.style = l : this.style = this.getStyle(e.getGeomType()))
	},
	setFeatures: function(e) {
		this.features = e, this.blinkFeatureIndex = null, this.blinkFeature = null, clearInterval(this.timer)
	},
	clearFeatures: function() {
		this.features = null, this.layer = null, this.style = null, this.blinkFeatureIndex = null, this.blinkFeature = null, this.map.draw()
	},
	load: function() {
		if (this.flag = GeoBeans.Layer.Flag.LOADED, this.renderer.clearRect(), null != this.style && null != this.features && null != this.layer) {
			var e = this.style.rules;
			if (null != e && 0 != e.length) for (var l = 0; l < e.length; ++l) {
				var t = e[l],
					r = this.selectFeatures(t.filter);
				null != t.symbolizer && (null != t.symbolizer.symbol ? this.renderer.drawIcons(r, t.symbolizer, this.map.transformation) : this.drawFeatures(r, t.symbolizer)), null != t.textSymbolizer && this.labelFeatures(r, t.textSymbolizer)
			}
		}
	},
	getStyle: function(e) {
		if (null == e) return null;
		e = e.toUpperCase();
		var l = null;
		switch (e) {
		case "POINT":
		case "MULTIPOINT":
			l = new GeoBeans.Style.FeatureStyle("query", GeoBeans.Style.FeatureStyle.GeomType.Point);
			var t = new GeoBeans.Rule,
				r = new GeoBeans.Symbolizer.PointSymbolizer;
			r.fill.color.set(255, 0, 0, 1), r.stroke.color.set(252, 240, 244, .9), t.symbolizer = r, l.addRule(t);
			break;
		case "LINESTRING":
		case "MULTILINESTRING":
			l = new GeoBeans.Style.FeatureStyle("default", GeoBeans.Style.FeatureStyle.GeomType.LineString);
			var t = new GeoBeans.Rule,
				r = new GeoBeans.Symbolizer.LineSymbolizer;
			r.stroke.color.set(255, 0, 0, 1), r.stroke.width = 4, t.symbolizer = r, l.addRule(t);
			break;
		case "POLYGON":
		case "MULTIPOLYGON":
			l = new GeoBeans.Style.FeatureStyle("default", GeoBeans.Style.FeatureStyle.GeomType.Polygon);
			var t = new GeoBeans.Rule,
				r = new GeoBeans.Symbolizer.PolygonSymbolizer;
			r.fill.color.set(255, 0, 0, 1), r.stroke.color.set(252, 240, 244, .9), t.symbolizer = r, l.addRule(t)
		}
		return l
	},
	setFeatureBlink: function(e, l) {
		if (null != e && null != l && null != this.features) {
			null != this.blinkFeature && (clearInterval(this.timer), this.features.indexOf(this.blinkFeature) == -1 && (this.features.splice(this.blinkFeatureIndex, 0, this.blinkFeature), this.map.drawLayersAll())), this.blinkFeature = e;
			var t = this,
				r = this.features.indexOf(e);
			if (this.blinkFeatureIndex = r, r != -1) {
				var a = !1,
					s = setInterval(function() {
						return 0 == l || null == t.features ? void clearInterval(s) : void(a ? (t.features.splice(r, 0, e), t.map.drawLayersAll(), a = !1, l--) : (t.features.splice(r, 1), t.map.drawLayersAll(), a = !0))
					}, 500);
				this.timer = s
			}
		}
	}
});
GeoBeans.Layer.RasterDBLayer = GeoBeans.Class(GeoBeans.Layer.DBLayer, {
	rasterPath: null,
	type: null,
	initialize: function(e, a, t, r, s, i, y) {
		GeoBeans.Layer.DBLayer.prototype.initialize.apply(this, arguments), void 0 != y && (this.rasterPath = y), this.type = GeoBeans.Layer.DBLayer.Type.Raster
	}
});
GeoBeans.TileState = {
	LOADED: 1,
	LOADING: 2
}, GeoBeans.Tile = GeoBeans.Class({
	map: null,
	image: null,
	url: null,
	row: null,
	col: null,
	level: null,
	layer: null,
	state: null,
	initialize: function(e, t, a, i, l, r) {
		this.map = e, this.url = t, this.row = i, this.col = l, this.level = r, this.layer = a
	},
	loading: function(e, t, a, i) {
		if (null == this.image && (this.image = new Image, this.image.crossOrigin = "anonymous", this.image.src = this.url), this.image.complete && 0 != this.image.height && 0 != this.width) return this.state = GeoBeans.TileState.LOADED, void t(this, e, a, i);
		var l = this;
		this.image.onload = function() {
			l.layer.flag != GeoBeans.Layer.Flag.LOADED && (l.state = GeoBeans.TileState.LOADED, t(l, e, a, i))
		}
	},
	draw: function(e, t, a, a) {
		this.layer.imageScale;
		if (this.map.level == this.level && this.layer.visible) {
			if (this.layer.renderer.save(), null != this.map.rotateAngle) {
				var i = this.map.width,
					l = this.map.height;
				this.layer.renderer.context.translate(i / 2, l / 2), this.layer.renderer.context.rotate(this.map.rotateAngle * Math.PI / 180), this.layer.renderer.context.translate(-i / 2, -l / 2)
			}
			if (this.layer.renderer.context.clearRect(e, t, a, a), this.layer.renderer.drawImage(this.image, e, t, a, a), this.layer.renderer.restore(), null != this.map.rotateAngle) {
				var r = this.layer.getRotateCanvas();
				if (null != r) {
					var s = r.getContext("2d");
					s.clearRect(0, 0, r.width, r.height), s.save();
					var i = r.width,
						l = r.height;
					s.translate(i / 2, l / 2), s.rotate(-this.map.rotateAngle * Math.PI / 180), s.translate(-i / 2, -l / 2);
					var h = i / 2 - this.layer.canvas.width / 2,
						n = l / 2 - this.layer.canvas.height / 2;
					s.drawImage(this.layer.canvas, 0, 0, this.layer.canvas.width, this.layer.canvas.height, h, n, this.layer.canvas.width, this.layer.canvas.height), s.restore()
				}
			}
			this.map._updateTile(this.layer, e, t, a, a)
		}
	}
});
GeoBeans.TileCache = GeoBeans.Class({
	cache: null,
	initialize: function() {
		this.cache = []
	},
	destory: function() {
		this.cache = null
	},
	putTile: function(e) {
		var i = e.url,
			n = this.getTile(i);
		return null == n && void this.cache.push(e)
	},
	getTile: function(e) {
		for (var i = null, n = this.cache.length, l = 0; l < n; l++) if (i = this.cache[l], i.url == e) return i;
		return null
	}
});
GeoBeans.TileLayerState = {
	LOADING: 0,
	LOADED: 1,
	ERROR: 2
}, GeoBeans.Layer.TileLayer = GeoBeans.Class(GeoBeans.Layer, {
	IMG_WIDTH: null,
	IMG_HEIGHT: null,
	MIN_ZOOM_LEVEL: null,
	MAX_ZOOM_LEVEL: null,
	RESOLUTIONS: null,
	server: null,
	scale: null,
	cache: null,
	state: null,
	tiles: null,
	imageScale: null,
	rotateCanvas: null,
	initialize: function(e, t) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.url = t, this.cache = new GeoBeans.TileCache, this.tiles = [], this.imageScale = 1
	},
	destroy: function() {
		this.server = null, this.scale = null, this.cache = null, GeoBeans.Layer.prototype.destroy.apply(this, arguments)
	},
	setName: function() {
		this.name = name
	},
	getValidView: function() {
		var e = this.map.viewer,
			t = Math.max(e.xmin, this.FULL_EXTENT.xmin),
			i = Math.max(e.ymin, this.FULL_EXTENT.ymin),
			n = Math.min(e.xmax, this.FULL_EXTENT.xmax),
			a = Math.min(e.ymax, this.FULL_EXTENT.ymax);
		return new GeoBeans.Envelope(t, i, n, a)
	},
	updateScale: function() {
		this.map, this.FULL_EXTENT
	},
	draw: null,
	drawCache: null,
	preDraw: null,
	loadingTiles: null,
	getTileID: null,
	computeTileBound: null,
	getResolution: function(e) {
		return null != this.resolution ? this.resolution : e <= 0 || e >= this.RESOLUTIONS.length ? -1 : this.RESOLUTIONS[e - 1]
	},
	getResolutionByLevel: function(e) {
		return e <= 0 || e >= this.RESOLUTIONS.length ? -1 : this.RESOLUTIONS[e - 1]
	},
	getLevel: function(e) {
		for (var t = this.MAX_ZOOM_LEVEL, i = this.MIN_ZOOM_LEVEL, n = 0; n < this.RESOLUTIONS.length; ++n) {
			var a = this.RESOLUTIONS[n];
			if (e >= a) {
				if (n + 1 < i) return i;
				if (n + 1 > t) return t;
				var l = this.RESOLUTIONS[n - 1];
				if (null != l) {
					var s = (l - e) / (l - a);
					return console.log(s), this.imageScale = l / e, console.log(this.imageScale), this.resolution = e, n
				}
			}
		}
		return t
	},
	init: function() {
		var e = this.map;
		this.level = this.map.level, this.resolution = this.getResolution(this.level), e.setResolution(this.resolution), e.updateMapExtent()
	},
	setOpacity: function(e) {
		e >= 0 && e <= 1 && (this.opacity = e, this.renderer.setGlobalAlpha(this.opacity))
	},
	setMaxLevel: function(e) {
		this.MAX_ZOOM_LEVEL = e
	},
	getMaxLevel: function() {
		return this.MAX_ZOOM_LEVEL
	},
	setMinLevel: function(e) {
		this.MIN_ZOOM_LEVEL = e
	},
	getMinLevel: function() {
		return this.MIN_ZOOM_LEVEL
	},
	getRotateCanvas: function() {
		return null != this.rotateCanvas ? this.rotateCanvas : (this.rotateCanvas = document.createElement("canvas"), this.rotateCanvas.width = 2 * this.canvas.width, this.rotateCanvas.height = 2 * this.canvas.height, this.rotateCanvas)
	}
}), GeoBeans.Layer.TileLayer.Type = {
	QS: "QuadServer",
	WMTS: "wmts",
	PGIS: "pgis"
};
GeoBeans.Layer.WFSLayer = GeoBeans.Class(GeoBeans.Layer.FeatureLayer, {
	style: null,
	server: null,
	url: null,
	typeName: null,
	format: "GML2",
	version: "1.0.0",
	srs: "EPSG:4326",
	features: null,
	maxFeatures: 50,
	filter: null,
	workspace: null,
	viewer: null,
	initialize: function(e, t, a, l) {
		GeoBeans.Layer.FeatureLayer.prototype.initialize.apply(this, arguments), this.name = e, this.server = t, this.typeName = a, this.format = l, this.image = new Image, this.workspace = new GeoBeans.WFSWorkspace(this.name, this.server, this.version)
	},
	destory: function() {
		this.server = null, this.name = null, this.server = null, this.typeName = null, this.format = null, this.featureType = null, this.workspace = null, GeoBeans.Layer.FeatureLayer.prototype.destory.apply(this, arguments)
	},
	load: function() {
		var e = this.map.viewer;
		if (null != e && null != this.viewer && e.equal(this.viewer) && null != this.features) return this.flag = GeoBeans.Layer.Flag.LOADED, this.drawLayerSnap(), this.renderer.clearRect(), this.drawLayer(), void this.drawBufferFeaturesCanvas();
		if (this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), null == this.featureType && (this.featureType = this.workspace.getFeatureType(this.typeName)), null != this.featureType) {
			var t = this;
			t.flag = GeoBeans.Layer.Flag.READY, this.featureType.getFeaturesBBox(function(e, a) {
				t.setTransformation(t.map.transformation), t.features = a, t.drawLayerSnap(), t.renderer.clearRect(), t.drawLayer(), t.drawBufferFeaturesCanvas(), t.map.drawLayersAll(), t.flag = GeoBeans.Layer.Flag.LOADED
			}, this.viewer, this.filter)
		}
	},
	load: function() {
		null == this.features ? this.getFeatures() : GeoBeans.Layer.FeatureLayer.prototype.load.apply(this, arguments)
	},
	getFeatures: function() {
		return null != this.features && this.load(), null == this.featureType ? void this.workspace.getFeatureType(this.typeName, this, this.getFeatureType_callback) : void this.getFields()
	},
	getFeatureType_callback: function(e, t) {
		null != e && null != t && (e.featureType = t, e.getFields(e.getFields_callback))
	},
	getFields: function() {
		null != this.featureType && this.featureType.getFieldsAsync(this, this.getFields_callback)
	},
	getFields_callback: function(e, t) {
		null != t && null != e && e.getAllFeatures()
	},
	getAllFeatures: function() {
		null != this.featureType && this.featureType.getFeaturesAsync(null, null, null, this, this.getAllFeatures_callback)
	},
	getAllFeatures_callback: function(e, t) {
		null != e && null != t && (e.features = t, e.load(), e.map.drawLayersAll())
	},
	setFilter: function(e) {
		this.filter = e, this.features = null
	},
	getFeatureType: function() {
		if (null == this.featureType && (this.featureType = this.workspace.getFeatureType(this.typeName)), null != this.featureType) return this.featureType
	},
	CLASS_NAME: "GeoBeans.Layer.WFSLayer",
	getFeatureBBoxGet: function(e, t, a) {
		var l = this.getFeatureType(),
			r = null;
		return null != l && (r = l.getFeatureBBoxGet(this.map.name, null, e, t, a)), r
	},
	getFeatureFilter: function(e, t, a, l, r) {
		var s = this.getFeatureType();
		this.getFeatureFilter_callback_u = r, null != s && s.getFeaturesFilterAsync2(null, null, e, t, a, l, null, this, this.getFeatureFilter_callback)
	},
	getFeatureFilter_callback: function(e, t) {
		null != e && (e.map.queryLayer.setFeatures(t), e.map.drawLayersAll(), e.getFeatureFilter_callback_u(t), e.getFeatureFilter_callback_u = null)
	}
});
GeoBeans.Layer.WMSLayer = GeoBeans.Class(GeoBeans.Layer, {
	server: null,
	url: null,
	image: null,
	layers: [],
	mapLayers: [],
	styles: [],
	format: "image/png",
	version: "1.1.0",
	srs: "EPSG:4326",
	transparent: "true",
	workspace: null,
	updateFlag: !1,
	initialize: function(e, s, t, a, r) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.workspace = new GeoBeans.WMSWorkspace(e, s, "1.3.0"), this.name = e, this.server = s, this.layers = t, this.mapLayers = [];
		for (var i = 0; i < this.layers.length; ++i) {
			var n = this.layers[i],
				l = this.workspace.getMapLayer(n);
			this.mapLayers.push(l)
		}
		void 0 != a && (this.styles = a), void 0 != r && (this.format = r), this.image = new Image;
		var h = this.workspace.extent;
		this.extent = h
	},
	destory: function() {
		this.server = null, this.name = null, this.server = null, this.layers = null, this.styles = null, this.format = null, this.image = null, this.mapLayers = null, GeoBeans.Layer.prototype.destory.apply(this, arguments)
	},
	load: function() {
		for (var e, s = this.map.canvas.width, t = this.map.canvas.height, a = this.map.viewer, r = a.xmin + "," + a.ymin + "," + a.xmax + "," + a.ymax, i = "", n = "", l = 0; l < this.mapLayers.length; ++l) {
			var h = this.mapLayers[l];
			if (null != h) {
				var o = h.name,
					m = this.styles[l];
				null == m && (m = h.style_name), null != m && h.visible && (i += m, n += o), l < this.mapLayers.length - 1 && ("" != i && "," != i.substr(i.length - 1, 1) && (i += ","), "" != n && "," != n.substr(n.length - 1, 1) && (n += ","))
			}
		}
		if ("," == i.substr(i.length - 1, 1) && (i = i.substr(0, i.length - 1)), "," == n.substr(n.length - 1, 1) && (n = n.substr(0, n.length - 1)), e = this.server + "service=WMS&version=" + this.version + "&request=GetMap&layers=" + n + "&styles=" + i + "&bbox=" + r + "&width=" + s + "&height=" + t + "&srs=" + this.srs + "&format=" + this.format + "&transparent=" + this.transparent, this.renderer.clearRect(0, 0, s, t), "" == n) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		if (this.updateFlag) {
			var y = new Date;
			this.image.src = e + "&t=" + y.getTime(), this.updateFlag = !1
		} else this.image.src = e;
		if (this.image.complete) {
			this.updateFlag = !1, this.flag = GeoBeans.Layer.Flag.LOADED, this.renderer.drawImage(this.image, 0, 0, s, t);
			var p = this.image.src.lastIndexOf("&t=");
			p != -1 && (this.image.src = this.image.src.slice(0, p))
		} else {
			var u = this;
			u.flag = GeoBeans.Layer.Flag.READY, this.image.onload = function() {
				u.flag != GeoBeans.Layer.Flag.LOADED && (u.flag = GeoBeans.Layer.Flag.LOADED, u.renderer.drawImage(u.image, 0, 0, s, t), u.map.drawLayersAll())
			}
		}
	},
	draw: function() {
		var e, s = this.map.canvas.width,
			t = this.map.canvas.height,
			a = this.map.viewer,
			r = a.xmin + "," + a.ymin + "," + a.xmax + "," + a.ymax;
		e = this.server + "&service=WMS&version=" + this.version + "&request=GetMap&layers=" + this.layers + "&styles=" + this.styles + "&bbox=" + r + "&width=" + s + "&height=" + t + "&srs=" + this.srs + "&format=" + this.format + "&transparent=" + this.transparent, this.image.src = e;
		var i = this.map.renderer;
		if (this.image.complete) i.drawImage(this.image, 0, 0, s, t);
		else {
			var n = this;
			this.image.onload = function() {
				i.drawImage(n.image, 0, 0, s, t)
			}
		}
	},
	getMapLayer: function(e) {
		for (var s, t, a = 0; a < this.mapLayers.length; ++a) if (s = this.mapLayers[a], t = s.name, t == e) return s;
		return null
	},
	update: function() {
		this.updateFlag = !0
	},
	setMapLayerStyle: function(e, s, t) {
		if (null != e && null != s) {
			var a = this,
				r = e.name,
				i = "service=wms&version=1.0.0&request=SetStyle&&layer=" + r + "&style=" + s;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(i),
				dataType: "xml",
				async: !1,
				beforeSend: function(e) {},
				success: function(r, i) {
					var n = a.parseSetMapLayerStyle(r);
					"success" == n && (e.style_name = s), void 0 != t && t(n)
				},
				complete: function(e, s) {},
				error: function() {}
			})
		}
	},
	parseSetMapLayerStyle: function(e) {
		var s = "",
			t = $(e).find("SetStyle").text();
		return "SUCCESS" == t.toUpperCase() ? s = "success" : "" != $(e).find("ExceptionText").text() && (s = $(e).find("ExceptionText").text()), s
	}
});
GeoBeans.Layer.ImageLayer = GeoBeans.Class(GeoBeans.Layer, {
	images: null,
	initialize: function(a) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.images = []
	},
	addImage: function(a, e) {
		if (null != a && null != e) {
			var i = new Image;
			i.src = a;
			var t = {
				image: i,
				extent: e,
				flag: !1
			};
			this.images.push(t)
		}
	},
	load: function() {
		var a = this.map.canvas.width,
			e = this.map.canvas.height;
		this.renderer.clearRect(0, 0, a, e);
		for (var i = null, t = null, n = null, r = 0; r < this.images.length; ++r) if (t = this.images[r], null != t) {
			i = t.image, n = t.extent;
			var s = this.map.transformation.toScreenPoint(n.xmin, n.ymax),
				l = this.map.transformation.toScreenPoint(n.xmax, n.ymin),
				h = l.x - s.x,
				g = l.y - s.y;
			if (i.complete) {
				var o = i.width,
					m = i.height;
				this.renderer.drawImageParms(i, 0, 0, o, m, s.x, s.y, h, g), t.flag = !0
			} else {
				var f = this;
				i.onload = function() {
					t.flag = !0;
					var a = this.width,
						e = this.height;
					f.renderer.drawImageParms(i, 0, 0, a, e, s.x, s.y, h, g), f.map.drawLayersAll()
				}
			}
		}
		for (var r = 0; r < this.images.length; ++r) if (t = this.images[r], !t.flag) return void(this.flag = GeoBeans.Layer.Flag.READY);
		this.flag = GeoBeans.Layer.Flag.LOADED
	},
	getLoadFlag: function() {
		return this.flag
	}
});
GeoBeans.Layer.GeoLineLayer = GeoBeans.Class(GeoBeans.Layer, {
	data: null,
	option: null,
	minRadius: 1,
	maxRadius: 15,
	radiusSpeed: .15,
	alpha: .5,
	initialize: function(t, i, e) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.data = i, this.option = e, this.calculateLine()
	},
	setMap: function() {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments), window.layer = this, window.requestNextAnimationFrame(this.animate)
	},
	load: function() {
		this.drawLine(), layer.drawToPoint(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	animate: function(t) {
		var i = this.layer;
		i.renderer.clearRect(), i.drawLine(), i.drawMovingDot(t), i.drawToPoint(t), window.requestNextAnimationFrame(i.animate)
	},
	drawLine: function() {
		this.renderer.setSymbolizer(this.option.symbolizer);
		for (var t = 0; t < this.data.length; ++t) {
			var i = this.data[t];
			this.renderer.drawBezierLine(i.from, i.to, i.control, this.map.transformation)
		}
	},
	calculateLine: function() {
		if (null != this.data) for (var t = 0; t < this.data.length; ++t) {
			var i = this.data[t],
				e = this.getBezierControlPoint(i.from, i.to, this.option.curveness);
			i.control = e;
			var a = this.getDistance(i.from, i.to),
				n = a / this.option.mapDelta * 1e3;
			i.alltime = n, i.points = [];
			var r = a * this.option.trailLength;
			i.trailLength = r
		}
	},
	getBezierControlPoint: function(t, i, e) {
		if (null == t || null == i) return null;
		var a = new GeoBeans.Geometry.Point(t.x / 2 + i.x / 2, t.y / 2 + i.y / 2),
			n = this.getDistance(t, i),
			r = (t.x - i.x) / (t.y - i.y),
			o = Math.atan(r);
		o = Math.PI / 2 - o;
		var s = n * e,
			h = Math.sin(o) * s,
			l = Math.cos(o) * s,
			d = a.x + h,
			u = a.y - l,
			m = new GeoBeans.Geometry.Point(d, u);
		return m
	},
	getDistance: function(t, i) {
		return Math.sqrt((t.x - i.x) * (t.x - i.x) + (t.y - i.y) * (t.y - i.y))
	},
	drawMovingDot: function(t) {
		this.renderer.setSymbolizer(this.option.pointSymbolizer);
		for (var i = null, e = null, a = null, n = null, r = 0; r < this.data.length; ++r) {
			var o = this.data[r];
			i = o.from, e = o.control, a = o.to, n = o.alltime;
			var s = 0;
			null == o.beginTime ? o.beginTime = t : (s = t - o.beginTime, s > n && (o.points = [], s = 0, o.beginTime = t));
			var h = s / n,
				l = (1 - h) * (1 - h) * i.x + 2 * h * (1 - h) * e.x + h * h * a.x,
				d = (1 - h) * (1 - h) * i.y + 2 * h * (1 - h) * e.y + h * h * a.y,
				u = new GeoBeans.Geometry.Point(l, d);
			this.renderer.drawGeometry(u, this.option.pointSymbolizer, this.map.transformation), o.points.push(u), this.drawTrail(o, u)
		}
		this.map.drawLayersAll()
	},
	drawTrail: function(t, i) {
		for (var e = t.trailLength, a = t.points, n = [], r = a.length - 1; r >= 0; --r) {
			var o = a[r],
				s = this.getDistance(i, o);
			s < e && n.push(o)
		}
		if (0 != n.length) {
			var h = this.option.pointSymbolizer.size;
			this.renderer.context.lineWidth = 2 * h;
			var l = this.map.transformation.toScreenPoint(i.x, i.y);
			this.renderer.context.beginPath(), this.renderer.context.moveTo(l.x, l.y);
			for (var r = 0; r < n.length; ++r) {
				var d = this.map.transformation.toScreenPoint(n[r].x, n[r].y);
				this.renderer.context.lineTo(d.x, d.y)
			}
			var u = n[n.length - 1],
				m = this.map.transformation.toScreenPoint(u.x, u.y),
				p = this.renderer.context.createLinearGradient(l.x, l.y, m.x, m.y);
			p.addColorStop(0, this.option.pointSymbolizer.fill.color.getRgba()), p.addColorStop(1, "rgba(255,255,255,0)"), this.renderer.context.strokeStyle = p, this.renderer.context.stroke()
		}
	},
	drawToPoint: function(t) {
		this.calculateRadius();
		var i = this.option.symbolizer.stroke.color,
			e = i.getRgb(),
			a = e.replace("rgb", "rgba").replace(")", "") + ",";
		a += this.alpha + ")";
		for (var n = this.renderer.context, r = 0; r < this.data.length; ++r) {
			var o = this.data[r],
				s = o.to;
			n.strokeStyle = e;
			var h = this.map.transformation.toScreenPoint(s.x, s.y);
			n.beginPath(), n.arc(h.x, h.y, this.innerRadius, 0, 2 * Math.PI), n.stroke(), n.closePath(), n.strokeStyle = a;
			var h = this.map.transformation.toScreenPoint(s.x, s.y);
			n.beginPath(), n.arc(h.x, h.y, this.outerRadius, 0, 2 * Math.PI), n.stroke(), n.closePath()
		}
	},
	calculateRadius: function() {
		var t = 6;
		null == this.innerRadius ? (this.innerRadius = this.minRadius, this.outerRadius = this.minRadius + t, this.alpha = .5) : this.innerRadius >= this.maxRadius ? (this.innerRadius = this.minRadius, this.outerRadius = this.minRadius + t, this.alpha = .5) : (this.innerRadius += this.radiusSpeed, this.outerRadius += this.radiusSpeed, this.alpha = .5 - (this.outerRadius - this.minRadius - t) / (this.maxRadius - this.minRadius - t) * .5, this.alpha < 0 && (this.alpha = 0))
	}
});
GeoBeans.Layer.RippleLayer = GeoBeans.Class(GeoBeans.Layer, {
	featureType: null,
	dbName: null,
	typeName: null,
	option: null,
	xhr: null,
	beginTime: null,
	filter: null,
	defaultOption: {
		radius: 10,
		scale: 2.5,
		period: 4,
		lineNumber: 3,
		type: "stroke",
		color: "#FFFF00",
		alpha: 1,
		showEffect: !0
	},
	initialize: function(e, t, i, l, n) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.dbName = t, this.typeName = i, this.option = l;
		var a = this._getOption(l);
		this.option = a, this.filter = n
	},
	destroy: function() {
		GeoBeans.Layer.prototype.destroy.apply(this, arguments), this.option = null, this.dbName = null, this.typeName = null, this.beginTime = null, this.xhr = null, this.features = null;
		var e = this.map.hitRippleLayers.indexOf(this);
		e != -1 && this.map.hitRippleLayers.splice(e, 1)
	},
	_getOption: function(e) {
		if (null == e) return this.defaultOption;
		var t = e.radius;
		null == t && (t = this.defaultOption.radius);
		var i = e.scale;
		null == i && (i = this.defaultOption.scale);
		var l = e.period;
		null == l && (l = this.defaultOption.period);
		var n = e.lineNumber;
		null == n && (n = this.defaultOption.lineNumber);
		var a = e.type;
		null == a && (a = this.defaultOption.type);
		var r = e.color;
		null == r && (r = this.defaultOption.color);
		var s = e.alpha;
		null == s && (s = this.defaultOption.alpha);
		var u = e.field,
			o = e.radiusField,
			h = e.colorField,
			p = e.showEffect;
		return null == p && (p = !0), {
			radius: t,
			scale: i,
			period: l,
			lineNumber: n,
			type: a,
			color: r,
			alpha: s,
			field: u,
			showEffect: p,
			radiusField: o,
			colorField: h
		}
	},
	setMap: function(e) {
		e.beginAnimate(), this.map = e, this.canvas = this.map.animateCanvas, this.renderer = this.map.animateRenderer
	},
	load: function() {
		null == this.features && null == this.xhr && this.getFeatures(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	getFeatures: function() {
		var e = this.getFeatureType();
		if (null != e) {
			this.featureType = e;
			var t = [this.featureType.geomFieldName],
				i = this.option.radiusField;
			null != i && $.inArray(i, t) == -1 && t.push(i);
			var l = this.option.colorField;
			null != l && $.inArray(l, t) == -1 && t.push(l), this.get_time = new Date, this.xhr = this.featureType.getFeaturesFilterAsync2(null, this.dbName, this.filter, null, null, t, null, this, this.getFeatures_callback)
		}
	},
	getJson: function() {
		var e = [],
			t = this.getFeatureType(),
			i = this,
			l = new Date;
		$.getJSON("hospital.json", function(n) {
			for (var a = null, r = null, s = null, u = null, o = null, h = null, p = null, f = 0; f < n.length; ++f) a = n[f], r = a.id, s = a.x, u = a.y, o = new GeoBeans.Geometry.Point(s, u), p = [], p.push(r), p.push(null), p.push(o), h = new GeoBeans.Feature(t, r, o, p), e.push(h);
			i.features = e, console.log(new Date - l), i.draw()
		})
	},
	getFeatures_callback: function(e, t) {
		null != e && null != t && $.isArray(t) && (e.xhr = null, e.features = t, e.draw())
	},
	getFeatureType: function() {
		if (null != this.featureType) return this.featureType;
		if (null != this.map) {
			var e = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0");
			return this.featureType = new GeoBeans.FeatureType(e, this.typeName), null == this.featureType.fields && (this.featureType.fields = this.featureType.getFields(null, this.dbName)), this.featureType
		}
		return null
	},
	unregisterHitEvent: function() {
		this.content = null
	},
	hit: function(e, t) {
		if (null != this.features && this.visible) {
			var i = (this.map.renderer, this.map.transformation, []),
				l = 0,
				n = null,
				a = null,
				r = this.features.length;
			for (l = 0; l < r; l++) n = this.features[l], a = n.geometry, null != a && a.hit(e, t, this.map.tolerance) && i.push(n);
			if (i.length > 0) {
				var n = i[i.length - 1],
					s = (new GeoBeans.Geometry.Point(e, t), this.getContent(n, this.content));
				return s
			}
			return null
		}
	},
	getFeaturesByHitContent: function(e) {
		if (null != e) {
			var t = this.getHitFields(e);
			if (0 != t.length) {
				var i = this.getFeatureType();
				if (null != i) {
					var l = this.featureType.geomFieldName;
					$.inArray(l, t) == -1 && t.push(l), null != this.option.field && $.inArray(this.option.field, t) == -1 && t.push(this.option.field);
					var n = 1e6;
					this.featureType.getFeaturesFilterAsync2(null, this.dbName, this.filter, n, null, t, null, this, this.getFeaturesHit_callback)
				}
			}
		}
	},
	getFeaturesHit_callback: function(e, t) {
		null != e && null != t && (e.features = t)
	},
	getHitFields: function(e) {
		for (var t = []; e.indexOf("{") != -1;) {
			var i = e.indexOf("{"),
				l = e.indexOf("}"),
				n = e.slice(i + 1, l);
			$.inArray(n, t) == -1 && t.push(n), e = e.slice(l + 1, e.length)
		}
		return t
	},
	getContent: function(e, t) {
		if (null == e || null == t) return "";
		var i = this.getHitFields(t);
		if (null == i) return "";
		var l = e.values;
		if (null == l) return "";
		var n = this.getFeatureType();
		if (null == n) return "";
		for (var a = null, r = null, s = null, u = 0; u < i.length; ++u) a = i[u], r = n.getFieldIndex(a), r != -1 && (s = l[r], null != s && (t = t.replace("{" + a + "}", s)));
		return t
	},
	setHitContent: function(e) {
		e != this.content && (this.content = e, this.getFeaturesByHitContent(e))
	},
	draw: function(e) {
		this.visible && null != this.option && this.drawRipple(e)
	},
	drawRipple: function(e) {
		new Date;
		if (null != this.features && null != this.option) {
			var t = this.map.viewer,
				i = this.getViewerFeatures(t, this.features),
				l = this.option.radiusField,
				n = this.option.colorField,
				a = this.option.scale,
				r = this.option.period,
				s = this.option.type,
				u = this.option.lineNumber,
				o = this.option.showEffect,
				h = this.option.alpha,
				p = this.option.radius,
				f = this.option.color,
				c = 0;
			null == this.beginTime ? this.beginTime = e : (c = e - this.beginTime, c > 1e3 * r && (c = 0, this.beginTime = e));
			for (var d = this.getFeatureType(), y = d.getFieldIndex(l), g = d.getFieldIndex(n), m = this.renderer.context, v = null, F = null, b = null, T = null, w = null, x = null, B = null, G = null, N = null, O = null, P = 0; P < i.length; ++P) if (v = i[P], null != v && (w = v.geometry, w instanceof GeoBeans.Geometry.Point && (F = v.values, null != F))) {
				var A = null;
				"function" == typeof p ? (b = F[y], A = p(b)) : A = p;
				var C = null;
				"function" == typeof f ? (T = F[g], C = f(T, this)) : C = f;
				var H = new GeoBeans.Color;
				if (H.setByHex(C, h), m.fillStyle = H.getRgba(), x = this.map.transformation.toScreenPoint(w.x, w.y), m.beginPath(), m.arc(x.x, x.y, A, 0, 2 * Math.PI), m.fill(), o) {
					B = A * a, G = (B - A) / (1e3 * r), N = G * c, O = (B - A) / u;
					for (var L = 0; L < u; ++L) {
						var R = A + O * L;
						R += N, R > B && (R = R - B + A);
						var k = h * (1 - (R - A) / (B - A)),
							_ = new GeoBeans.Color;
						_.setByHex(C, k), "stroke" == s ? (m.strokeStyle = _.getRgba(), m.beginPath(), m.arc(x.x, x.y, R, 0, 2 * Math.PI), m.stroke(), m.closePath()) : "fill" == s && (m.fillStyle = _.getRgba(), m.beginPath(), m.arc(x.x, x.y, R, 0, 2 * Math.PI), m.fill(), m.closePath())
					}
				}
			}
			var D = this.map.controls.find(GeoBeans.Control.Type.DRAG_MAP),
				S = this.map.controls.get(D),
				$ = this.map.controls.find(GeoBeans.Control.Type.SCROLL_MAP),
				E = this.map.controls.get($);
			!S.draging && 0 == E.count
		}
	},
	getViewerFeatures: function(e, t) {
		new Date;
		if (null == e || null == t) return [];
		for (var i = [], l = null, n = null, a = 0; a < t.length; ++a) l = t[a], null != l && (n = l.geometry, null != n && e.contain(n.x, n.y) && i.push(l));
		return i
	}
});
GeoBeans.Layer.AirLineLayer = GeoBeans.Class(GeoBeans.Layer, {
	dbName: null,
	typeName: null,
	symbolizer: null,
	pointSymbolizer: null,
	option: null,
	featureType: null,
	initialize: function(e, t, r, a, l, i) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.dbName = t, this.typeName = r, this.symbolizer = a, this.pointSymbolizer = l, this.option = i
	},
	load: function() {
		var e = this.map.viewer;
		return null != e && null != this.viewer && e.equal(this.viewer) && null != this.features ? void(this.flag = GeoBeans.Layer.Flag.LOADED) : (this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), this.flag = GeoBeans.Layer.Flag.READY, this.renderer.clearRect(), void this.getFeatures())
	},
	getFeatures: function() {
		if (null != this.features) return void this.drawLayer();
		var e = this.getFeatureType();
		if (null == e) return void(this.flag = GeoBeans.Layer.Flag.ERROR);
		var t = [this.featureType.geomFieldName];
		this.featureType.getFeaturesFilterAsync2(null, this.dbName, null, null, null, t, null, this, this.getFeatures_callback)
	},
	getFeatureType: function() {
		if (null != this.featureType) return this.featureType;
		if (null != this.map) {
			var e = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0");
			return this.featureType = new GeoBeans.FeatureType(e, this.typeName), null == this.featureType.fields && (this.featureType.fields = this.featureType.getFields(null, this.dbName)), this.featureType
		}
		return null
	},
	getFeatures_callback: function(e, t) {
		null != e && null != t && (e.features = t, e.drawLayer())
	},
	drawLayer: function() {
		var e = this.renderer,
			t = this.filterFeatures(),
			r = this.pointSymbolizer;
		e.setSymbolizer(r);
		for (var a = 0; a < t.length; ++a) {
			var l = t[a];
			if (null != l) {
				var i = l.geometry;
				e.drawGeometry(i, r, this.map.transformation)
			}
		}
		e.setSymbolizer(this.symbolizer);
		for (var n = this.option.curveness, s = null, u = null, o = null, h = null, y = null, a = 0; a < t.length; ++a) if (s = t[a], null != s && (u = s.geometry, null != u)) for (var f = a + 1; f < t.length; ++f) f <= a || (o = t[f], null != o && (h = o.geometry, null != h && (y = this.getBezierControlPoint(u, h, n), e.drawBezierLine(u, h, y, this.map.transformation))));
		this.flag = GeoBeans.Layer.Flag.LOADED, this.map.drawLayersAll()
	},
	getBezierControlPoint: function(e, t, r) {
		if (null == e || null == t) return null;
		var a = new GeoBeans.Geometry.Point(e.x / 2 + t.x / 2, e.y / 2 + t.y / 2),
			l = Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y)),
			i = (e.x - t.x) / (e.y - t.y),
			n = Math.atan(i);
		n = Math.PI / 2 - n;
		var s = l * r,
			u = Math.sin(n) * s,
			o = Math.cos(n) * s,
			h = a.x + u,
			y = a.y - o,
			f = new GeoBeans.Geometry.Point(h, y);
		return f
	},
	filterFeatures: function() {
		for (var e = [], t = this.features, r = 0; r < t.length; ++r) r % 60 == 0 && e.push(t[r]);
		return e
	}
});
GeoBeans.Layer.AnimationLayer = GeoBeans.Class(GeoBeans.Layer, {
	moveObjects: null,
	initialize: function() {
		this.moveObjects = []
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments), window.animateLayer = this, window.requestNextAnimationFrame(this.animate)
	},
	addMoveObject: function(e) {
		return null == e ? void console.log("moveObject is null") : null != this.getMoveObject(e.id) ? void console.log("map has moveObject id" + e.id) : void(null != e && this.moveObjects.push(e))
	},
	getMoveObject: function(e) {
		for (var i = 0; i < this.moveObjects.length; ++i) if (this.moveObjects[i].id == e) return this.moveObjects[i];
		return null
	},
	removeMoveObject: function(e) {
		for (var i = 0; i < this.moveObjects.length; ++i) this.moveObjects[i].id == e && (this.moveObjects[i].destroy(), this.moveObjects.splice(i, 1))
	},
	load: function() {
		this.drawStaticObjects(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	animate: function(e) {
		var i = this.animateLayer;
		i.renderer.clearRect(), i.drawMoveOjbects(e), window.requestNextAnimationFrame(i.animate)
	},
	drawStaticObjects: function() {
		for (var e = 0; e < this.moveObjects.length; ++e) {
			var i = this.moveObjects[e];
			if (null != i) {
				var t = i.type;
				switch (t) {
				case GeoBeans.MoveType.POINT:
					this.drawStaticMovePoint(i)
				}
			}
		}
	},
	drawStaticMovePoint: function(e) {
		if (null != e) {
			var i = e.point,
				t = e.line;
			if (null != i && null != t) {
				var n = e.option.pointSymbolizer,
					o = e.option.lineSymbolizer;
				null == n && (n = new GeoBeans.Symbolizer.PointSymbolizer), null == o && (o = new GeoBeans.Symbolizer.LineSymbolizer), this.renderer.setSymbolizer(n), this.renderer.drawGeometry(i, n, this.map.transformation), e.option.showLine && (this.renderer.setSymbolizer(o), this.renderer.drawGeometry(t, o, this.map.transformation))
			}
		}
	},
	drawMoveOjbects: function(e) {
		for (var i = 0; i < this.moveObjects.length; ++i) {
			var t = this.moveObjects[i];
			if (null != t) if (t.flag) {
				var n = t.type;
				switch (n) {
				case GeoBeans.MoveType.POINT:
					this.drawMovePoint(t, e)
				}
			} else this.drawStaticObject()
		}
		this.map.drawLayersAll()
	},
	drawMovePoint: function(e, i) {
		if (null != e && null != i) {
			var t = e.option.once;
			if (!t || !e.onceAnimate) {
				var n = (e.point, e.line, e.points, e.option.duration),
					t = e.option.once,
					o = 0;
				null != e.elapsedTime && null == e.beginTime ? e.elapsedTime == n ? (o = 0, e.beginTime = i) : (o = e.elapsedTime, e.beginTime = i - o) : (null == e.beginTime ? e.beginTime = i : (o = i - e.beginTime, o > n && (t ? (o = n, e.beginTime = null, e.onceAnimate = !0) : (o = 0, e.beginTime = i))), e.elapsedTime = o);
				var r = e.getPoint(o),
					a = e.option.pointSymbolizer;
				this.renderer.setSymbolizer(a), this.renderer.drawGeometry(r, a, this.map.transformation)
			}
		}
	},
	drawStaticObject: function(e) {
		if (null != e) {
			var i = e.type;
			switch (i) {
			case GeoBeans.MoveType.POINT:
				this.drawStaticMovePoint(object, time)
			}
		}
	},
	drawStaticMovePoint: function(e) {
		if (null != e) {
			var i = e.elapsedTime;
			null == i && (i = 0);
			var t = e.getPoint(i),
				n = e.option.pointSymbolizer;
			if (this.renderer.setSymbolizer(n), this.renderer.drawGeometry(t, n, this.map.transformation), e.option.showLine) {
				var o = e.line,
					r = e.option.lineSymbolizer;
				null == r && (r = new GeoBeans.Symbolizer.LineSymbolizer), this.renderer.setSymbolizer(r), this.renderer.drawGeometry(o, r, this.map.transformation)
			}
		}
	}
});
GeoBeans.Layer.AQIChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	chartField: null,
	labelField: null,
	timeField: null,
	timePoint: null,
	styleMgr: null,
	featuresAll: null,
	tipInfos: null,
	flagField: null,
	changeLegend: !0,
	colorMap: null,
	isTimeline: !1,
	initialize: function(e, t, i, a, n, l, r, s, o) {
		this.name = e, this.dbName = t, this.tableName = i, this.chartField = a, this.labelField = n, this.flagField = l, this.timeField = r, this.timePoint = s, this.chartOption = o, this.type = GeoBeans.Layer.ChartLayer.Type.AQI
	},
	setChartOption: function(e) {
		this.chartOption = e, this.features = null, this.changeLegend = !0;
		var t = this.chartOption.colorMapID,
			i = this.styleMgr.getColorMapByID(t);
		this.colorMap = i
	},
	getChartField: function() {
		return this.chartField
	},
	setChartField: function(e) {
		this.chartField = e, this.features = null, this.changeLegend = !0
	},
	getFlagField: function() {
		return this.flagField
	},
	getTimeField: function() {
		return this.timeField
	},
	getTimePoint: function() {
		return this.timePoint
	},
	setTimePoint: function(e) {
		this.timePoint = e, this.features = null
	},
	getLableField: function() {
		return this.labelField
	},
	setMap: function(e, t) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments);
		var i = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0"),
			a = new GeoBeans.FeatureType(i, this.tableName);
		this.featureType = a;
		var n = (a.getFields(null, this.dbName), this.map.server.slice(0, this.map.server.lastIndexOf("/mgr")));
		this.styleMgr = new GeoBeans.StyleManager(n);
		var l = this.chartOption.colorMapID,
			r = this.styleMgr.getColorMapByID(l);
		this.colorMap = r, null != t && (this.isTimeline = t), t || e._addLegend(this)
	},
	load: function() {
		var e = this.map.viewer;
		if (null == this.minMaxValue) {
			var t = this.getMinMaxValue();
			if (null == t) return;
			this.minMaxValue = t
		}
		return this.drawLegend(), null != e && null != this.viewer && e.equal(this.viewer) && null != this.features ? void(this.flag = GeoBeans.Layer.Flag.LOADED) : (this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), this.getFeatures(), void(this.flag = GeoBeans.Layer.Flag.READY))
	},
	drawLegend: function() {
		if (!this.isTimeline) {
			if (this.changeLegend) this.removeLegend(), this.addLegend(), this.changeLegend = !1;
			else {
				var e = this.map.mapDiv.find(".chart-legend#" + this.name),
					t = parseInt(e.attr("lindex"));
				t != this.legendIndex && (this.removeLegend(), this.addLegend())
			}
			return this.visible ? void this.showLegend() : void this.hideLegend()
		}
	},
	getFeatures: function() {
		var e = new GeoBeans.BinaryLogicFilter;
		e.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd;
		var t = new GeoBeans.BinaryComparisionFilter;
		t.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
		var i = new GeoBeans.PropertyName;
		i.setName(this.timeField);
		var a = new GeoBeans.Literal;
		a.setValue(this.timePoint), t.expression1 = i, t.expression2 = a, e.addFilter(t);
		var n = this.featureType.geomFieldName,
			l = this.map.viewer,
			r = new GeoBeans.BBoxFilter;
		r.extent = l, i = new GeoBeans.PropertyName, i.setName(n), r.propName = i, e.addFilter(r), this.featureType.getFeaturesFilterAsync2(null, this.dbName, e, null, null, [this.chartField, n, this.labelField, this.flagField], null, this, this.getFeatures_callback)
	},
	getFeatures: function() {
		if (null != this.features) return void this.draw();
		var e = new GeoBeans.BinaryComparisionFilter;
		e.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
		var t = new GeoBeans.PropertyName;
		t.setName(this.timeField);
		var i = new GeoBeans.Literal;
		i.setValue(this.timePoint), e.expression1 = t, e.expression2 = i;
		var a = this.featureType.geomFieldName;
		this.featureType.getFeaturesFilterAsync2(null, this.dbName, e, null, null, [this.chartField, a, this.labelField, this.flagField], null, this, this.getFeatures_callback)
	},
	getFeatures_callback: function(e, t) {
		null != e && null != t && (e.features = t, e.draw())
	},
	draw: function() {
		this.style = this.getStyle(), this.flag = GeoBeans.Layer.Flag.READY, this.setTransformation(this.map.transformation), this.drawLayerSnap(), this.renderer.clearRect(), this.drawAQIChart(), this.drawLegend(), this.flag = GeoBeans.Layer.Flag.LOADED, this.map.drawLayersAll()
	},
	drawAQIChart: function() {
		var e = this.chartOption.type;
		"point" == e ? (this.renderer.context.globalCompositeOperation = "lighter", this.drawByValue()) : "tip" == e && (this.renderer.context.globalCompositeOperation = "source-over", this.showTips(), this.drawLayer())
	},
	showTips: function() {
		if (null != this.features && null != this.chartOption && null != this.colorMap && null != this.minMaxValue) {
			this.tipInfos = [];
			for (var e = new GeoBeans.ColorRangeMap(this.colorMap.startColor, this.colorMap.endColor, this.minMaxValue.min, this.minMaxValue.max), t = this.featureType.getFieldIndex(this.chartField), i = this.featureType.getFieldIndex(this.labelField), a = this.featureType.getFieldIndex(this.flagField), n = null, l = null, r = null, s = 0; s < this.features.length; ++s) if (l = this.features[s], null != l && (r = l.geometry, null != r)) {
				var o = l.values;
				if (null != o) {
					n = o[t], n = parseFloat(n);
					var h = e.getValue(n),
						u = new GeoBeans.Rule,
						d = new GeoBeans.Symbolizer.PolygonSymbolizer,
						m = new GeoBeans.Fill;
					m.color = h, d.fill = m;
					var p = new GeoBeans.Stroke;
					p.color = h, p.width = .5, d.stroke = p, u.symbolizer = d;
					var c = new GeoBeans.Symbolizer.TextSymbolizer;
					c.labelText = n;
					var f = new GeoBeans.Font;
					f.family = "瀹嬩綋", f.style = "normal", f.weight = "normal", f.size = "12", c.font = f;
					var v = new GeoBeans.Color;
					v.setByHex("#ffffff", 1);
					var m = new GeoBeans.Fill;
					m.color = v, c.fill = m, u.textSymbolizer = c;
					var y = o[i],
						g = new GeoBeans.Rule,
						w = new GeoBeans.Symbolizer.PolygonSymbolizer,
						m = new GeoBeans.Fill;
					v = new GeoBeans.Color, v.setByHex("#ffffff", 1), m.color = v, w.fill = m;
					var p = new GeoBeans.Stroke;
					p.color = h, p.width = .5, w.stroke = p, g.symbolizer = w;
					var c = new GeoBeans.Symbolizer.TextSymbolizer;
					c.labelText = y;
					var f = new GeoBeans.Font;
					f.family = "瀹嬩綋", f.style = "normal", f.weight = "normal", f.size = "12", c.font = f;
					var v = new GeoBeans.Color;
					v.setByHex("#000000", 1);
					var m = new GeoBeans.Fill;
					m.color = v, c.fill = m, g.textSymbolizer = c;
					var F = o[a],
						x = this.renderer.drawTip(r, this.map.transformation, u, g),
						B = {
							flag: F,
							viewer: x,
							name: y
						};
					this.tipInfos.push(B)
				}
			}
		}
	},
	getMinMaxValue: function() {
		var e = this.chartField,
			t = 0,
			i = 500;
		switch (e) {
		case "aqi":
			t = 0, i = 500;
			break;
		case "co":
			t = 0, i = 90;
			break;
		case "co_24h":
			t = 0, i = 90;
			break;
		case "no2":
			t = 0, i = 100;
			break;
		case "no2_24h":
			t = 0, i = 100;
			break;
		case "o3":
			t = 0, i = 200;
			break;
		case "o3_24h":
			t = 0, i = 200;
			break;
		case "o3_8h":
			t = 0, i = 200;
			break;
		case "o3_8h_24h":
			t = 0, i = 200;
			break;
		case "pm10":
			t = 0, i = 500;
			break;
		case "pm10_24":
			t = 0, i = 500;
			break;
		case "pm2_5":
			t = 0, i = 300;
			break;
		case "pm_2_5_24h":
			t = 0, i = 300;
			break;
		case "so2":
			t = 0, i = 500;
			break;
		case "so2_24h":
			t = 0, i = 500;
			break;
		default:
			t = 0, i = 500
		}
		return {
			min: t,
			max: i
		}
	},
	getStyle: function() {
		var e = new GeoBeans.Style.FeatureStyle("default", GeoBeans.Style.FeatureStyle.GeomType.Point),
			t = new GeoBeans.Rule,
			i = new GeoBeans.Symbolizer.PointSymbolizer,
			a = new GeoBeans.Color;
		return a.setByHex("#A4C3F2", 1), i.fill.color = a, a = new GeoBeans.Color, a.setByHex("#808000", .1), i.stroke.color = a, i.size = 1, t.symbolizer = i, e.addRule(t), e
	},
	addLegend: function() {
		if (null != this.minMaxValue && null != this.minMaxValue.min && null != this.minMaxValue.max) {
			var e = 0;
			if (0 == this.legendIndex) e = 10;
			else {
				var t = this.legendIndex - 1,
					i = this.map.mapDiv.find(".chart-legend[lindex='" + t + "']");
				if (0 != i.length) {
					var a = i.css("left"),
						n = i.css("width");
					a = parseInt(a.replace("px", "")), n = parseInt(n.replace("px", "")), e = a + n + 5
				}
			}
			var l = "",
				l = "<div class='chart-legend chart-legend-aqi' id='" + this.name + "' style='left:" + e + "px' lindex='" + this.legendIndex + "'>";
			l += "<div class='chart-legend-title'><h5>" + this.chartField + "</h5></div>", l += "<div class='chart-legend-canvas'>\t<canvas width='20' height='200'></canvas></div><div class='chart-legend-value'><div class='chart-legend-max'>" + this.minMaxValue.max + "</div><div class='chart-legend-min'>" + this.minMaxValue.min + "</div></div>", l += "</div>", this.map.mapDiv.append(l);
			var r = this.map.mapDiv.find("#" + this.name + " .chart-legend-canvas canvas"),
				s = r[0].getContext("2d"),
				o = new Image;
			o.src = this.colorMap.url, o.onload = function() {
				var e = r.width() / 2,
					t = r.height() / 2,
					i = o.width,
					a = o.height;
				s.clearRect(0, 0, i, a), s.translate(e, t), s.rotate(270 * Math.PI / 180), s.drawImage(o, -i / 2, -a / 2, i, a), s.rotate(-270 * Math.PI / 180), s.translate(-e, -t)
			}
		}
	},
	registerHitEvent: function(e, t) {
		var i = this,
			a = null,
			n = null,
			l = 3;
		this.hitEvent = function(r) {
			if (null == a) {
				a = r.layerX, n = r.layerY;
				var s = new GeoBeans.Geometry.Point(a, n),
					o = i.map.transformation.toMapPoint(s.x, s.y),
					h = i.getTipInfo(s);
				if (null != h) {
					var u = {
						title: h.name
					},
						d = new GeoBeans.InfoWindow(e, u);
					i.map.openInfoWindow(d, o), null != t && t(h.flag, h.name, i)
				}
			} else {
				var m = Math.abs(r.layerX - a) + Math.abs(r.layerY - n);
				if (m > l) {
					a = r.layerX, n = r.layerY;
					var s = new GeoBeans.Geometry.Point(a, n),
						o = i.map.transformation.toMapPoint(s.x, s.y),
						h = i.getTipInfo(s);
					if (null != h) {
						var u = {
							title: h.name
						},
							d = new GeoBeans.InfoWindow(e, u);
						i.map.openInfoWindow(d, o), null != t && t(h.flag, h.name, i)
					}
				}
			}
		};
		var r = null,
			s = null;
		this.moveEvent = function(e) {
			if (null == r) r = e.layerX, s = e.layerY;
			else {
				var t = Math.abs(e.layerX - r) + Math.abs(e.layerY - s);
				if (t > l) {
					r = e.layerX, s = e.layerY;
					var a = new GeoBeans.Geometry.Point(r, s),
						n = (i.map.transformation.toMapPoint(a.x, a.y), i.getTipInfo(a));
					null != n ? document.body.style.cursor = "pointer" : document.body.style.cursor = "default"
				}
			}
		}, this.map.mapDiv[0].addEventListener("click", this.hitEvent), this.map.mapDiv[0].addEventListener("mousemove", this.moveEvent)
	},
	unRegisterHitEvent: function() {
		this.map.mapDiv[0].removeEventListener("click", this.hitEvent), this.map.mapDiv[0].removeEventListener("mousemove", this.moveEvent), this.hitEvent = null, this.moveEvent = null
	},
	setVisiable: function(e) {
		GeoBeans.Layer.prototype.setVisiable.apply(this, arguments), this.visible ? null != this.hitEvent && (this.map.mapDiv[0].addEventListener("click", this.hitEvent), this.map.mapDiv[0].addEventListener("mousemove", this.moveEvent)) : null != this.hitEvent && (this.map.mapDiv[0].removeEventListener("click", this.hitEvent), this.map.mapDiv[0].removeEventListener("mousemove", this.moveEvent))
	},
	getTipInfo: function(e) {
		for (var t = null, i = null, a = null, n = null, l = this.chartOption.type, r = this.tipInfos.length; r >= 0; r--) if (t = this.tipInfos[r], null != t) if ("point" == l) {
			a = t.center, n = t.radius;
			var s = Math.sqrt((a.x - e.x) * (a.x - e.x) + (a.y - e.y) * (a.y - e.y));
			if (s < n) return t
		} else if ("tip" == l && (i = t.viewer, i.contain(e.x, e.y))) return t;
		return null
	},
	drawByValue: function() {
		if (null != this.features && null != this.chartOption && null != this.colorMap && null != this.minMaxValue) {
			var e = this.featureType.getFieldIndex(this.chartField),
				t = this.featureType.getFieldIndex(this.labelField),
				i = this.featureType.getFieldIndex(this.flagField),
				a = .8,
				n = this.features,
				l = null,
				r = null,
				s = null,
				o = null,
				h = null,
				u = null,
				d = null;
			this.renderer.save(), this.tipInfos = [];
			for (var m = 0; m < n.length; ++m) if (r = n[m], null != r && (l = r.geometry, null != l && (s = r.values, null != s))) {
				o = s[e], o = parseFloat(o), h = o / 10, u = this.colorFunctionByColorMap(o), d = new GeoBeans.Color, d.setByHex(u, a), this.renderer.context.fillStyle = d.getRgba(), spt = this.map.transformation.toScreenPoint(l.x, l.y), this.renderer.context.beginPath(), this.renderer.context.arc(spt.x, spt.y, h, 0, 2 * Math.PI), this.renderer.context.fill(), this.renderer.context.closePath();
				var p = s[i],
					c = s[t],
					f = {
						flag: p,
						center: spt,
						radius: h,
						name: c
					};
				this.tipInfos.push(f)
			}
			this.renderer.restore()
		}
	},
	colorFunctionByColorMap: function(e) {
		var t = this.minMaxValue,
			i = t.min,
			a = t.max,
			n = (this.colorMap, this.colorMap.startColor),
			l = this.colorMap.endColor;
		if (e < i) return n;
		if (e > a) return l;
		var r = new GeoBeans.Color;
		r.setByHex(n, 1);
		var s = r.getHsl(),
			o = new GeoBeans.Color;
		o.setByHex(l, 1);
		var h = o.getHsl(),
			u = s.h + (e - i) * (h.h - s.h) / (a - i),
			d = s.s + (e - i) * (h.s - s.s) / (a - i),
			m = s.l + (e - i) * (h.l - s.l) / (a - i),
			p = new GeoBeans.Color;
		return p.setByHsl(u, d, m), p.getHex()
	}
});
GeoBeans.Layer.AQITimelineLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	chartField: null,
	labelField: null,
	timePoints: null,
	styleMgr: null,
	flagField: null,
	timeField: null,
	chartLayers: null,
	interval: null,
	currentLayerID: null,
	timeline: null,
	initialize: function(e, t, i, a, n, s, h, l, r, d) {
		this.name = e, this.dbName = t, this.tableName = i, this.chartField = a, this.labelField = n, this.flagField = s, this.timeField = h, this.timePoints = l, this.interval = r, this.chartOption = d, this.chartLayers = [], this.type = GeoBeans.Layer.ChartLayer.Type.AQITIMELINE
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments);
		for (var t = null, i = 0; i < this.timePoints.length; ++i) if (t = this.timePoints[i], null != t) {
			var a = new GeoBeans.Layer.AQIChartLayer("aqi-timline", this.dbName, this.tableName, this.chartField, this.labelField, this.flagField, this.timeField, t, this.chartOption);
			a.setMap(this.map, !0), this.chartLayers.push(a)
		}
		this.currentLayerID = 0, this.timeline = new GeoBeans.TimeLineBar(this), e._addLegend(this), this.chartLayers.length > 0 && (this.colorMap = this.chartLayers[0].colorMap)
	},
	cleanup: function() {
		GeoBeans.Layer.ChartLayer.prototype.cleanup.apply(this, arguments), this.timeline.cleanup();
		for (var e = 0; e < this.chartLayers.length; ++e) this.chartLayers[e].cleanup()
	},
	load: function() {
		if (null == this.minMaxValue && (this.minMaxValue = this.getMinMaxValue()), this.drawLegend(), null == this.chartLayers) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		this.setTransformation(this.map.transformation), this.drawLayerSnap(), this.renderer.clearRect();
		var e = this.chartLayers,
			t = e[this.currentLayerID];
		if (null != t) {
			t.load();
			var i = t.canvas;
			null != i && t.flag == GeoBeans.Layer.Flag.LOADED && this.renderer.drawImage(i, 0, 0, i.width, i.height)
		}
		this.flag = GeoBeans.Layer.Flag.LOADED
	},
	drawLegend: function() {
		if (0 != this.chartLayers.length) {
			var e = this.chartLayers[0];
			if (e.changeLegend) this.removeLegend(), this.addLegend(), e.changeLegend = !1;
			else {
				var t = this.map.mapDiv.find(".chart-legend#" + this.name),
					i = parseInt(t.attr("lindex"));
				i != this.legendIndex && (this.removeLegend(), this.addLegend())
			}
			return this.visible ? void this.showLegend() : void this.hideLegend()
		}
	},
	getChartField: function() {
		return this.chartField
	},
	getTimePoints: function() {
		return this.timePoints
	},
	setTimePoints: function(e) {
		this.timePoints = e;
		for (var t = 0; t < this.chartLayers.length; ++t) {
			var i = this.chartLayers[t];
			null != i && i.cleanup()
		}
		this.chartLayers = [];
		for (var t = 0; t < this.timePoints.length; ++t) if (timePoint = this.timePoints[t], null != timePoint) {
			var i = new GeoBeans.Layer.AQIChartLayer(this.name, this.dbName, this.tableName, this.chartField, this.labelField, this.flagField, this.timeField, timePoint, this.chartOption);
			i.setMap(this.map), this.chartLayers.push(i)
		}
		this.currentLayerID = 0, this.timeline.cleanup(), this.timeline = new GeoBeans.TimeLineBar(this)
	},
	setChartOption: function(e) {
		this.chartOption = e;
		for (var t = null, i = 0; i < this.chartLayers.length; ++i) t = this.chartLayers[i], null != t && (t.features = null, t.changeLegend = !0, t.setChartOption(e))
	},
	setChartField: function(e) {
		this.chartField = e;
		for (var t = 0; t < this.chartLayers.length; ++t) layer = this.chartLayers[t], null != layer && (layer.features = null, layer.changeLegend = !0, layer.setChartField(e))
	},
	getInterval: function() {
		return this.interval
	},
	setInterval: function(e) {
		this.interval = e, this.timeline.cleanup(), this.timeline = new GeoBeans.TimeLineBar(this)
	},
	setVisiable: function(e) {
		GeoBeans.Layer.prototype.setVisiable.apply(this, arguments), this.visible ? this.timeline.show() : this.timeline.hide()
	},
	getMinMaxValue: function() {
		return this.chartLayers.length > 0 ? this.chartLayers[0].getMinMaxValue() : null
	},
	addLegend: function() {
		if (null != this.minMaxValue && null != this.minMaxValue.min && null != this.minMaxValue.max) {
			var e = 0;
			if (0 == this.legendIndex) e = 10;
			else {
				var t = this.legendIndex - 1,
					i = this.map.mapDiv.find(".chart-legend[lindex='" + t + "']");
				if (0 != i.length) {
					var a = i.css("left"),
						n = i.css("width");
					a = parseInt(a.replace("px", "")), n = parseInt(n.replace("px", "")), e = a + n + 5
				}
			}
			var s = "",
				s = "<div class='chart-legend chart-legend-aqi' id='" + this.name + "' style='left:" + e + "px' lindex='" + this.legendIndex + "'>";
			s += "<div class='chart-legend-title'><h5>" + this.chartField + "</h5></div>", s += "<div class='chart-legend-canvas'>\t<canvas width='20' height='200'></canvas></div><div class='chart-legend-value'><div class='chart-legend-max'>" + this.minMaxValue.max + "</div><div class='chart-legend-min'>" + this.minMaxValue.min + "</div></div>", s += "</div>", this.map.mapDiv.append(s);
			var h = this.map.mapDiv.find("#" + this.name + " .chart-legend-canvas canvas"),
				l = h[0].getContext("2d"),
				r = new Image;
			r.src = this.colorMap.url, r.onload = function() {
				var e = h.width() / 2,
					t = h.height() / 2,
					i = r.width,
					a = r.height;
				l.clearRect(0, 0, i, a), l.translate(e, t), l.rotate(270 * Math.PI / 180), l.drawImage(r, -i / 2, -a / 2, i, a), l.rotate(-270 * Math.PI / 180), l.translate(-e, -t)
			}
		}
	}
});
GeoBeans.Layer.BarChartLayer_1 = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	minMax: null,
	chartOption: null,
	initialize: function(t, e, a, i, n, s, r, l) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments), this.chartOption = l, this.type = GeoBeans.Layer.ChartLayer.Type.BAR
	},
	setMap: function(t) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), t._addLegend(this)
	},
	load: function() {
		this.visible ? (this.removeLegend(), this.addLegend(), this.showLegend()) : (this.removeLegend(), this.hideLegend()), this.minMax = this.getMinMaxValue();
		var t = this;
		this.flag = GeoBeans.Layer.Flag.READY, t.setTransformation(t.map.transformation), t.drawLayerSnap(), t.renderer.clearRect(), this.drawLayer(), t.flag = GeoBeans.Layer.Flag.LOADED
	},
	drawLayer: function() {
		if (null != this.chartFeatures) {
			var t = null,
				e = null,
				a = null,
				i = null,
				n = null;
			this.renderer.save(), this.renderer.setGlobalAlpha(this.chartOption.opacity);
			for (var s = 0; s < this.chartFeatures.length; ++s) if (t = this.chartFeatures[s], null != t && (geometry = t.geometry, null != geometry && geometry.type == GeoBeans.Geometry.Type.POINT && (e = t.values, null != e))) {
				var r = [],
					l = null,
					h = null,
					o = document.createElement("canvas"),
					p = o.getContext("2d");
				p.font = "12px Arial, Verdana, sans-seri";
				for (var d = this.chartFields.length, c = 0; c < d; ++c) if (i = this.chartFields[c], null != i) {
					var u = this.chartFeatureType.getFieldIndex(i);
					if (u != -1) {
						a = parseFloat(e[u]);
						var m = new Object;
						m.name = i, m.type = "bar", m.data = [a];
						var y = p.measureText(e[u]).width;
						h = null == h ? y : h > y ? h : y, m.itemStyle = {
							normal: {
								label: {
									show: this.chartOption.showLabel,
									position: "top"
								}
							}
						}, r.push(m), l = null == l ? a : a > l ? a : l
					}
				}
				var g = 10,
					x = 10;
				h > this.chartOption.width && (g = h - this.chartOption.width / d / 2, x = h - this.chartOption.width / d / 2);
				var v = {
					top: 26,
					bottom: 12,
					left: g,
					right: x
				};
				n = {
					grid: {
						x: v.left + "px",
						y: v.top + "px",
						x2: v.right + "px",
						y2: v.bottom + "px",
						width: this.chartOption.width + "px",
						borderWidth: 0
					},
					xAxis: [{
						type: "category",
						data: [""],
						splitLine: {
							show: this.chartOption.x_splitLine
						},
						axisLabel: {
							show: !1
						},
						axisTick: {
							show: !1
						},
						axisLine: {
							show: this.chartOption.x_axisLine
						}
					}],
					yAxis: [{
						min: this.minMax.min,
						max: l,
						splitLine: {
							show: this.chartOption.y_splitLine
						},
						axisLabel: {
							show: !1
						},
						axisTick: {
							show: !1
						},
						axisLine: {
							show: this.chartOption.y_axisLine
						}
					}],
					color: this.chartOption.colors,
					series: r,
					animation: !1,
					calculable: !1
				};
				var f = this.chartOption.height,
					L = this.chartOption.width,
					w = parseFloat(v.top) + parseFloat(v.bottom),
					O = l / this.minMax.max * f + w,
					F = v.left + v.right,
					b = L + F,
					B = "bar_chart_" + this.name + s,
					G = "<div class='chart-div' style='height: " + O + "px; width:" + b + "px' id='" + B + "'></div>";
				this.map.mapDiv.append(G);
				var I = echarts.init(document.getElementById(B));
				I.setOption(n);
				var M = $("#" + B).find("canvas").first(),
					_ = M.width(),
					T = M.height(),
					A = geometry.x,
					C = geometry.y,
					D = this.map.transformation.toScreenPoint(A, C),
					E = D.x - _ / 2 + this.chartOption.offsetX,
					k = D.y - O + v.bottom - this.chartOption.offsetY;
				this.renderer.drawImage(M[0], E, k, _, T), I.dispose()
			}
			var R = "bar_chart_" + this.name;
			$("*[id*='" + R + "']").remove(), this.renderer.restore()
		}
	},
	getMinMaxValue: function() {
		for (var t = null, e = null, a = null, i = null, n = null, s = null, r = null, l = 0; l < this.chartFields.length; ++l) if (a = this.chartFields[l], null != a && (r = this.chartFeatureType.getFieldIndex(a), r != -1)) {
			for (var h = null, o = null, p = 0; p < this.chartFeatures.length; ++p) i = this.chartFeatures[p], null != i && (n = i.values, null != n && (s = parseFloat(n[r]), h = null == h ? s : s > h ? s : h, o = null == o ? s : s < o ? s : o));
			t = null == t ? h : h > t ? h : t, e = null == e ? o : o < e ? o : e
		}
		return {
			min: e,
			max: t
		}
	},
	addLegend: function() {
		if (null != this.chartOption) {
			var t = 0;
			if (0 == this.legendIndex) t = 10;
			else {
				var e = this.legendIndex - 1,
					a = this.map.mapDiv.find(".chart-legend[lindex='" + e + "']");
				if (0 != a.length) {
					var i = a.css("left"),
						n = a.css("width");
					i = parseInt(i.replace("px", "")), n = parseInt(n.replace("px", "")), t = i + n + 5
				}
			}
			var s = "<div class='chart-legend' id='" + this.name + "' style='left:" + t + "px' lindex='" + this.legendIndex + "'>";
			s += "<div class='chart-legend-title'><h5>" + this.name + "</h5></div>";
			for (var r = null, l = null, h = this.chartOption.colors, o = 0; o < this.chartFields.length; ++o) r = this.chartFields[o], null != r && (l = h[o], s += "<div>\t<span class='chart-legend-symbol' style='background-color:" + l + "'></span>\t<span class='chart-legend-label'>" + r + "</span></div>");
			s += "</div>", this.map.mapDiv.append(s)
		}
	}
});
GeoBeans.Layer.PieChartLayer_1 = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	chartOption: null,
	initialize: function(t, e, a, i, r, s, n, h) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments), this.chartOption = h, this.type = GeoBeans.Layer.ChartLayer.Type.PIE
	},
	setMap: function(t) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), t._addLegend(this)
	},
	setChartOption: function(t) {
		this.chartOption = t, this.chartFeatures = this.getChartFeatures()
	},
	getChartOption: function() {
		return this.chartOption
	},
	load: function() {
		this.removeLegend(), this.addLegend(), this.visible ? this.showLegend() : this.hideLegend(), this.flag = GeoBeans.Layer.Flag.READY, this.setTransformation(this.map.transformation), this.drawLayerSnap(), this.renderer.clearRect(), this.drawLayer(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	drawLayer: function() {
		if (null != this.chartFeatures) {
			var t = null,
				e = null,
				a = null,
				i = null,
				r = null,
				s = 80,
				n = [],
				h = 0,
				l = 0,
				o = !1,
				p = 1;
			null != this.chartOption && (null != this.chartOption.radius && (s = this.chartOption.radius), null != this.chartOption.colors && (n = this.chartOption.colors), null != this.chartOption.offsetX && (h = this.chartOption.offsetX), null != this.chartOption.offsetY && (l = this.chartOption.offsetY), null != this.chartOption.showLabel && (o = this.chartOption.showLabel), null != this.chartOption.opacity && (p = this.chartOption.opacity)), this.renderer.save(), this.renderer.setGlobalAlpha(p);
			for (var c = 0; c < this.chartFeatures.length; ++c) if (t = this.chartFeatures[c], null != t && (geometry = t.geometry, null != geometry && geometry.type == GeoBeans.Geometry.Type.POINT && (e = t.values, null != e))) {
				var d = [],
					u = document.createElement("canvas"),
					y = u.getContext("2d");
				y.font = "12px Arial, Verdana, sans-seri";
				for (var g = null, f = 0; f < this.chartFields.length; ++f) if (i = this.chartFields[f], null != i) {
					var v = this.chartFeatureType.getFieldIndex(i);
					if (v != -1) {
						a = e[v];
						var m = new Object;
						m.name = a, m.value = [parseFloat(a)], d.push(m);
						var O = y.measureText(a).width;
						g = null == g ? O : g > O ? g : O
					}
				}
				var r = {
					series: [{
						type: "pie",
						radius: this.chartOption.radius + "px",
						center: ["50%", "50%"],
						data: d,
						itemStyle: {
							normal: {
								label: {
									show: this.chartOption.showLabel,
									position: "outer"
								},
								labelLine: {
									show: this.chartOption.showLabel,
									length: 0
								}
							}
						}
					}],
					animation: !1,
					calculable: !1,
					color: n
				},
					L = 2 * this.chartOption.radius + 2 * g + 52,
					x = 2 * this.chartOption.radius + 40,
					w = "pie_chart_" + this.name + c,
					F = "<div class='chart-div' style='height: " + x + "px; width:" + L + "px' id='" + w + "'></div>";
				this.map.mapDiv.append(F);
				var b = echarts.init(document.getElementById(w));
				b.setOption(r);
				var G = $("#" + w).find("canvas").first(),
					B = G.width(),
					C = G.height(),
					I = geometry.x,
					D = geometry.y,
					T = this.map.transformation.toScreenPoint(I, D),
					_ = T.x - L / 2 + h,
					E = T.y - x / 2 - l;
				this.renderer.drawImage(G[0], _, E, B, C), b.dispose()
			}
			var A = "pie_chart_" + this.name;
			$("*[id*='" + A + "']").remove(), this.renderer.restore()
		}
	},
	addLegend: function() {
		if (null != this.chartOption) {
			var t = 0;
			if (0 == this.legendIndex) t = 10;
			else {
				var e = this.legendIndex - 1,
					a = this.map.mapDiv.find(".chart-legend[lindex='" + e + "']");
				if (null != a) {
					var i = a.css("left"),
						r = a.css("width");
					i = parseInt(i.replace("px", "")), r = parseInt(r.replace("px", "")), t = i + r + 5
				}
			}
			var s = "<div class='chart-legend' id='" + this.name + "' style='left:" + t + "px' lindex='" + this.legendIndex + "'>";
			s += "<div class='chart-legend-title'><h5>" + this.name + "</h5></div>";
			for (var n = null, h = null, l = this.chartOption.colors, o = 0; o < this.chartFields.length; ++o) n = this.chartFields[o], null != n && (h = l[o], s += "<div>\t<span class='chart-legend-symbol' style='background-color:" + h + "'></span>\t<span class='chart-legend-label'>" + n + "</span></div>");
			s += "</div>", this.map.mapDiv.append(s)
		}
	}
});
GeoBeans.Layer.RangeChartLayer_1 = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	chartOption: null,
	style: null,
	styleMgr: null,
	colors: null,
	minMaxValue: null,
	labelLayerName: null,
	labelLayerField: null,
	changeLegend: !0,
	initialize: function(e, t, a, l, i, n, r, s, h, o) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments), this.chartOption = s, this.type = GeoBeans.Layer.ChartLayer.Type.RANGE, this.labelLayerName = h, this.labelLayerField = o
	},
	cleanup: function() {
		GeoBeans.Layer.ChartLayer.prototype.cleanup.apply(this, arguments), this.unRegisterHitEvent()
	},
	setVisiable: function(e) {
		GeoBeans.Layer.prototype.setVisiable.apply(this, arguments), this.visible ? null == this.hitEvent && this.registerHitEvent(this.onFeatureHit) : null != this.hitEvent && this.unRegisterHitEvent()
	},
	setChartOption: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setChartOption.apply(this, arguments), this.style = this.getStyle(), this.changeLegend = !0, this.flag = GeoBeans.Layer.Flag.READY
	},
	setChartFields: function(e) {
		this.chartFields = e, this.changeLegend = !0
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments), this.getFeatures();
		var t = this.map.server.slice(0, this.map.server.lastIndexOf("/mgr"));
		this.styleMgr = new GeoBeans.StyleManager(t), this.registerHitEvent(this.onFeatureHit), e._addLegend(this)
	},
	onFeatureHit: function(e, t, a) {
		if (console.log(t.length), "pointer" == document.body.style.cursor) return void e.map.closeInfoWindow();
		if (0 == t.length) e.map.closeInfoWindow();
		else {
			var l = t[0],
				i = l.chartValue,
				n = e.featureType;
			if (null == n) return;
			var r = l.values;
			if (null == r) return;
			var s = n.getFieldIndex(e.baseLayerField),
				h = r[s];
			null == i && (i = "绌�");
			var o = "<div>" + i + "</div>",
				u = {
					title: h,
					width: 100,
					height: 40
				},
				d = new GeoBeans.InfoWindow(o, u);
			e.map.openInfoWindow(d, a)
		}
	},
	getChartFeatureValue: function(e) {
		for (var t = this.chartFields[0], a = this.chartFeatureType.getFieldIndex(t), l = this.tableField, i = this.chartFeatureType.getFieldIndex(l), n = null, r = 0; r < this.chartFeatures.length; ++r) if (n = this.chartFeatures[r], null != n) {
			var s = n.gid;
			if (s == e) {
				var h = n.values;
				if (null != h) {
					var o = h[a],
						u = h[i];
					return {
						value: o,
						table: u
					}
				}
			}
		}
		return ""
	},
	load: function() {
		var e = this.map.viewer;
		if (null != e && null != this.viewer && e.equal(this.viewer) && null != this.features && this.flag == GeoBeans.Layer.Flag.LOADED) return void this.drawLegend();
		this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), null == this.style && (this.style = this.getStyle());
		var t = this;
		t.flag = GeoBeans.Layer.Flag.READY, t.setTransformation(t.map.transformation), t.drawLayerSnap(), t.drawLegend(), t.renderer.clearRect();
		new Date;
		t.drawLayer(), t.flag = GeoBeans.Layer.Flag.LOADED
	},
	drawLegend: function() {
		this.changeLegend ? (this.removeLegend(), this.addLegend(), this.changeLegend = !1) : this.decideDrawLegend()
	},
	decideDrawLegend: function() {
		var e = this.map.mapDiv.find(".chart-legend#" + this.name),
			t = parseInt(e.attr("lindex"));
		t != this.legendIndex && (this.removeLegend(), this.addLegend())
	},
	addLegend: function() {
		if (null != this.minMaxValue && null != this.minMaxValue.min && null != this.minMaxValue.max) {
			var e = "",
				t = (this.map.mapDiv.find(".chart-legend"), 0);
			if (0 == this.legendIndex) t = 10;
			else {
				var a = this.legendIndex - 1,
					l = this.map.mapDiv.find(".chart-legend[lindex='" + a + "']"),
					i = l.css("left"),
					n = l.css("width");
				i = parseInt(i.replace("px", "")), n = parseInt(n.replace("px", "")), t = i + n + 5
			}
			var e = "<div class='chart-legend chart-legend-range' id='" + this.name + "' style='left:" + t + "px' lindex='" + this.legendIndex + "'>";
			e += "<div class='chart-legend-title'><h5>" + this.chartFields[0] + "</h5></div>", e += "<div class='chart-legend-canvas'>\t<canvas width='20' height='200'></canvas></div><div class='chart-legend-value'><div class='chart-legend-max'>" + this.minMaxValue.max + "</div><div class='chart-legend-min'>" + this.minMaxValue.min + "</div></div>", e += "</div>", this.map.mapDiv.append(e);
			var r = this.map.mapDiv.find("#" + this.name + " .chart-legend-canvas canvas"),
				s = r[0].getContext("2d"),
				h = new Image;
			h.src = this.colorMap.url, h.onload = function() {
				var e = r.width() / 2,
					t = r.height() / 2,
					a = h.width,
					l = h.height;
				s.clearRect(0, 0, a, l), s.translate(e, t), s.rotate(270 * Math.PI / 180), s.drawImage(h, -a / 2, -l / 2, a, l), s.rotate(-270 * Math.PI / 180), s.translate(-e, -t)
			}
		}
	},
	getChartStyle: function() {
		if (null == this.chartFeatures || null == this.chartOption) return null;
		var e = this.getMinMaxValue();
		if (null == e) return null;
		this.minMaxValue = e;
		var t = this.chartFeatures.length,
			a = this.chartOption.colorMapID,
			l = this.styleMgr.getColorMapByID(a);
		this.colorMap = l;
		for (var i = new GeoBeans.ColorRangeMap(this.colorMap.startColor, this.colorMap.endColor, e.min, e.max), n = this.chartFields[0], r = this.chartFeatureType.getFieldIndex(n), s = this.tableField, h = this.chartFeatureType.getFieldIndex(s), o = new GeoBeans.Style.FeatureStyle("chart", GeoBeans.Style.FeatureStyle.GeomType.Polygon), u = [], d = null, c = 0; c < t; ++c) if (d = this.chartFeatures[c], null != d) {
			var p = d.values;
			if (null != p) {
				var y = p[r];
				if (y = parseFloat(y), null != y) {
					var g = p[h],
						v = i.getValue(y),
						f = new GeoBeans.Symbolizer.PolygonSymbolizer;
					null != this.chartOption.opacity ? v.setOpacity(this.chartOption.opacity) : v.setOpacity(1), f.fill.color = v, v = new GeoBeans.Color, null != this.chartOption.border && v.setByHex(this.chartOption.border, 1), null != this.chartOption.borderOpacity ? v.setOpacity(this.chartOption.borderOpacity) : v.setOpacity(1), f.stroke.color = v;
					var m = new GeoBeans.IDFilter;
					m.addID(d.gid);
					var v = new GeoBeans.Color,
						F = new GeoBeans.Fill;
					F.color = v;
					var L = new GeoBeans.Rule;
					L.filter = m, L.name = g, L.symbolizer = f, u.push(L)
				}
			}
		}
		return o.rules = u, o
	},
	getLabelLayer: function() {
		var e = this.map.getLayer(this.labelLayerName);
		if (null == e) return null;
		var t = e.featureType,
			a = t.geomFieldName,
			l = [this.labelLayerField, a],
			i = t.getFeaturesFilter(this.map.name, null, null, null, null, l),
			n = t.getFieldIndex(this.labelLayerField),
			r = null,
			s = this.chartFeatureType.getFieldIndex(this.tableField),
			h = this.chartFeatureType.getFieldIndex(this.chartFields[0]),
			o = new GeoBeans.Layer.FeatureLayer("label");
		o.features = [];
		for (var u = new GeoBeans.Style.FeatureStyle("label", GeoBeans.Style.FeatureStyle.GeomType.Point), d = [], c = 0; c < i.length; ++c) if (r = i[c], null != r) {
			var p = r.values;
			if (null != p) for (var y = p[n], g = 0; g < this.chartFeatures.length; ++g) {
				var v = this.chartFeatures[g];
				if (null != v) {
					var f = v.values;
					if (null != f) {
						var m = f[s];
						if (m == y) {
							o.addFeature(r);
							var F = f[h],
								L = new GeoBeans.Rule,
								w = new GeoBeans.Symbolizer.TextSymbolizer;
							w.labelText = F;
							var B = new GeoBeans.Font;
							B.family = "SimSun", B.style = "normal", B.weight = "normal", B.size = "18", w.font = B;
							var x = new GeoBeans.Color;
							x.setByHex("#f500c0", 1);
							var b = new GeoBeans.Fill;
							b.color = x, w.fill = b, w.stroke = null;
							var G = new GeoBeans.IDFilter;
							G.addID(r.fid), L.textSymbolizer = w, L.filter = G, d.push(L)
						}
					}
				}
			}
		}
		return u.rules = d, o.style = u, o
	},
	getFeatures: function() {
		if (null != this.baseLayerName && null != this.baseLayerField && null != this.dbName && null != this.tableName && null != this.tableField) {
			var e = this.map.getLayer(this.baseLayerName);
			if (null != e) {
				var t = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0"),
					a = new GeoBeans.FeatureType(t, this.tableName);
				this.chartFeatureType = a;
				var l = (a.getFields(null, this.dbName), a.getFeaturesFilter(null, this.dbName, null, null, null, [this.tableField].concat(this.chartFields))),
					i = a.getFieldIndex(this.tableField);
				if (i != -1) {
					var n = a.getFieldIndex(this.chartFields[0]),
						r = e.getFeatureType(),
						s = r.geomFieldName,
						h = [this.baseLayerField, s],
						o = r.getFeaturesFilter(this.map.name, null, null, null, null, h),
						u = (e.getFields(), r.getFieldIndex(this.baseLayerField));
					if (u != -1) {
						for (var d = 0; d < o.length; ++d) {
							var c = o[d];
							if (null != c) {
								var p = c.values;
								if (null != p) for (var y = p[u], g = 0; g < l.length; ++g) {
									var v = l[g];
									if (null != v) {
										var f = v.values;
										if (null != f) {
											var m = f[i];
											if (y == m) {
												var F = f[n];
												c.chartValue = F
											}
										}
									}
								}
							}
						}
						this.features = o, this.featureType = r
					}
				}
			}
		}
	},
	getStyle: function() {
		if (null == this.features || null == this.chartOption) return null;
		var e = this.getMinMaxValue();
		if (null == e) return null;
		this.minMaxValue = e;
		var t = this.features.length,
			a = this.chartOption.colorMapID,
			l = this.styleMgr.getColorMapByID(a);
		this.colorMap = l;
		for (var i = new GeoBeans.ColorRangeMap(this.colorMap.startColor, this.colorMap.endColor, e.min, e.max), n = new GeoBeans.Style.FeatureStyle("chart", GeoBeans.Style.FeatureStyle.GeomType.Polygon), r = [], s = 0; s < t; ++s) {
			var h = this.features[s];
			if (null != h) {
				var o = h.chartValue,
					u = new GeoBeans.Symbolizer.PolygonSymbolizer,
					d = null;
				null == o ? (d = new GeoBeans.Color, d.setByHex("#ffffff", 1)) : (o = parseFloat(o), d = i.getValue(o)), null != this.chartOption.opacity ? d.setOpacity(this.chartOption.opacity) : d.setOpacity(1), u.fill.color = d, d = new GeoBeans.Color, null != this.chartOption.border && d.setByHex(this.chartOption.border, 1), null != this.chartOption.borderOpacity ? d.setOpacity(this.chartOption.borderOpacity) : d.setOpacity(1), u.stroke.color = d, u.stroke.width = .6;
				var c = new GeoBeans.IDFilter;
				c.addID(h.fid);
				var d = new GeoBeans.Color,
					p = new GeoBeans.Fill;
				p.color = d;
				var y = new GeoBeans.Rule;
				y.filter = c, y.name = o, y.symbolizer = u, r.push(y)
			}
		}
		return n.rules = r, n
	},
	getMinMaxValue: function() {
		if (null == this.features) return null;
		for (var e = null, t = null, a = null, l = 0; l < this.features.length; ++l) if (a = this.features[l], null != a) {
			var i = a.chartValue;
			null != i && (i = parseFloat(i), e = null == e ? i : i < e ? i : e, t = null == t ? i : i > t ? i : t)
		}
		return {
			min: e,
			max: t
		}
	}
});
GeoBeans.Layer.RangeSymbolChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	rangeBaseLayerName: null,
	rangeBaseLayerField: null,
	rangeChartField: null,
	rangeOption: null,
	symbolBaseLayerName: null,
	symbolBaseLayerField: null,
	symbolChartField: null,
	symbolOption: null,
	style: null,
	maxSymbolRadius: 30,
	levelMap: null,
	legendPadding: 4,
	initialize: function(e, l, a, t, i, n, s, r, h, o, d, u) {
		GeoBeans.Layer.prototype.initialize.apply(this, arguments), this.name = e, this.rangeBaseLayerName = l, this.rangeBaseLayerField = a, this.rangeChartField = t, this.symbolBaseLayerName = i, this.symbolBaseLayerField = n, this.symbolChartField = s, this.dbName = r, this.tableName = h, this.tableField = o, this.chartFields = [this.rangeChartField, this.symbolChartField], this.rangeOption = d, this.symbolOption = u, this.type = GeoBeans.Layer.ChartLayer.Type.RANGESYMBOL
	},
	cleanup: function() {
		this.rangeBaseLayerName = null, this.rangeBaseLayerField = null, this.rangeChartField = null, this.rangeOption = null, this.symbolBaseLayerName = null, this.symbolBaseLayerField = null, this.symbolChartField = null, this.symbolOption = null, this.style = null, this.maxSymbolRadius = null, this.levelMap = null, this.legendPadding = null, GeoBeans.Layer.ChartLayer.prototype.cleanup.apply(this, arguments), this.unRegisterHitEvent()
	},
	setMap: function(e) {
		GeoBeans.Layer.prototype.setMap.apply(this, arguments), this.getFeatures();
		var l = this.map.server.slice(0, this.map.server.lastIndexOf("/mgr"));
		this.styleMgr = new GeoBeans.StyleManager(l), this.registerHitEvent(this.onFeatureHit), e._addLegend(this)
	},
	setVisiable: function(e) {
		GeoBeans.Layer.prototype.setVisiable.apply(this, arguments), this.visible ? null == this.hitEvent && this.registerHitEvent(this.onFeatureHit) : null != this.hitEvent && this.unRegisterHitEvent()
	},
	load: function() {
		var e = this.map.viewer;
		return null != e && null != this.viewer && e.equal(this.viewer) && null != this.features && this.flag == GeoBeans.Layer.Flag.LOADED ? void this.decideDrawLegend() : (this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), this.renderer.clearRect(), this.drawRangChart(), this.drawSymbolChart(), this.flag == GeoBeans.Layer.Flag.READY ? this.drawLegend() : this.decideDrawLegend(), void(this.flag = GeoBeans.Layer.Flag.LOADED))
	},
	decideDrawLegend: function() {
		var e = this.map.mapDiv.find(".chart-legend#" + this.name),
			l = parseInt(e.attr("lindex"));
		l != this.legendIndex && (this.removeLegend(), this.drawLegend())
	},
	drawLegend: function() {
		null != this.minMax && null != this.rangeOption && null != this.symbolOption && (console.log("draw legend"), this.removeLegend(), this.drawRangeLegend(), this.drawSymbolLegend(), this.resizeLegend())
	},
	getFeatures: function() {
		if (null != this.rangeBaseLayerName && null != this.rangeBaseLayerField && null != this.symbolBaseLayerName && null != this.symbolBaseLayerField && null != this.dbName && null != this.tableName && null != this.tableField) {
			var e = new GeoBeans.WFSWorkspace("tmp", this.map.server, "1.0.0"),
				l = new GeoBeans.FeatureType(e, this.tableName);
			l.getFields(null, this.dbName);
			var a = l.getFieldIndex(this.tableField);
			if (a != -1) {
				var t = l.getFeaturesFilter(null, this.dbName, null, null, null, [this.tableField].concat(this.chartFields)),
					i = this.map.getLayer(this.rangeBaseLayerName),
					n = i.getFeatureType(),
					s = n.getFieldIndex(this.rangeBaseLayerField);
				if (s != -1) {
					var r = n.geomFieldName,
						h = [this.rangeBaseLayerField, r],
						o = n.getFeaturesFilter(this.map.name, null, null, null, null, h),
						d = this.map.getLayer(this.symbolBaseLayerName),
						u = d.getFeatureType(),
						m = u.getFieldIndex(this.symbolBaseLayerField);
					if (m != -1) {
						for (var y = u.geomFieldName, h = [this.symbolBaseLayerField, y], g = u.getFeaturesFilter(this.map.name, null, null, null, null, h), p = l.getFieldIndex(this.rangeChartField), c = l.getFieldIndex(this.symbolChartField), v = null, f = null, b = null, L = null, F = null, B = null, x = null, w = null, G = null, O = null, S = null, M = null, C = null, R = null, D = null, I = 0; I < o.length; ++I) if (v = o[I], null != v && (f = v.values, null != f)) {
							x = f[s];
							for (var z = 0; z < g.length; ++z) if (b = g[z], null != b && (L = b.values, null != L && (w = L[m], x == w))) {
								v.symbolGeomtry = b.geometry;
								for (var N = 0; N < t.length; ++N) if (F = t[N], null != F && (B = F.values, null != B && (G = B[a], G == x))) {
									O = B[p], S = B[c], O = parseFloat(O), S = parseFloat(S), v.rValue = O, v.sValue = S, M = null == M ? O : M < O ? M : O, null == C ? C = O : (C = C > O ? C : O, rmax = O), R = null == R ? S : R < S ? R : S, D = null == D ? S : D > S ? D : S;
									break
								}
								break
							}
							v.tValue = x
						}
						this.features = o, this.minMax = {
							range: {
								min: M,
								max: C
							},
							symbol: {
								min: R,
								max: D
							}
						}
					}
				}
			}
		}
	},
	drawRangChart: function() {
		this.style = this.getRangeStyle(), null != this.style && this.drawLayer()
	},
	getRangeStyle: function() {
		if (null == this.features || null == this.rangeOption || null == this.minMax) return null;
		var e = this.features.length,
			l = this.rangeOption.colorMapID,
			a = this.styleMgr.getColorMapByID(l);
		this.colorMap = a;
		for (var t = this.minMax.range, i = new GeoBeans.ColorRangeMap(this.colorMap.startColor, this.colorMap.endColor, t.min, t.max), n = new GeoBeans.Style.FeatureStyle("chart", GeoBeans.Style.FeatureStyle.GeomType.Polygon), s = [], r = 0; r < e; ++r) {
			var h = this.features[r];
			if (null != h) {
				var o = h.rValue,
					d = new GeoBeans.Symbolizer.PolygonSymbolizer,
					u = null;
				null == o ? (u = new GeoBeans.Color, u.setByHex("#ffffff", 1)) : (o = parseFloat(o), u = i.getValue(o)), null != this.rangeOption.opacity ? u.setOpacity(this.rangeOption.opacity) : u.setOpacity(1), d.fill.color = u, u = new GeoBeans.Color, null != this.rangeOption.border && u.setByHex(this.rangeOption.border, 1), null != this.rangeOption.borderOpacity ? u.setOpacity(this.rangeOption.borderOpacity) : u.setOpacity(1), d.stroke.color = u;
				var m = new GeoBeans.IDFilter;
				m.addID(h.fid);
				var u = new GeoBeans.Color,
					y = new GeoBeans.Fill;
				y.color = u;
				var g = new GeoBeans.Rule;
				g.filter = m, g.name = o, g.symbolizer = d, s.push(g)
			}
		}
		return n.rules = s, n
	},
	drawSymbolChart: function() {
		if (null != this.minMax && null != this.symbolOption && null != this.features) {
			var e = this.symbolOption.byLevel;
			e ? this.drawSymbolLayerByLevel() : this.drawSymbolLayerByValue()
		}
	},
	drawSymbolLayerByLevel: function() {
		if (null != this.features && null != this.minMax && null != this.symbolOption) {
			var e = this.symbolOption.level,
				l = this.minMax.symbol,
				a = l.min,
				t = l.max,
				i = this.symbolOption.maxsize,
				n = this.getSymbolizer();
			this.renderer.setSymbolizer(n);
			var s = null,
				r = null,
				h = null,
				o = null,
				d = this.getLevelMap(i, e, a, t);
			this.levelMap = d;
			for (var u = 0; u < this.features.length; ++u) feature = this.features[u], null != feature && (s = feature.sValue, r = feature.symbolGeomtry, h = this.getRadiusByLevelMap(parseFloat(s), d), o = new GeoBeans.Geometry.Circle(r, h), feature.circle = o, this.renderer.drawGeometry(o, n, this.map.transformation))
		}
	},
	getLevelMap: function(e, l, a, t) {
		if (null != e && null != l && null != a && null != t) {
			for (var i = (t - a) / l, n = [], s = 0; s < l; ++s) {
				var r = a + s * i,
					h = a + (s + 1) * i,
					o = Math.pow(1.2, s + 1 - l) * e,
					d = {
						min: r,
						max: h,
						radius: o
					};
				n.push(d)
			}
			return n
		}
	},
	drawSymbolLayerByValue: function() {
		if (null != this.minMax && null != this.features && null != this.symbolOption) {
			var e = this.minMax.symbol,
				l = (e.min, e.max),
				a = this.getSymbolizer();
			this.renderer.setSymbolizer(a);
			for (var t = null, i = null, n = null, s = null, r = null, h = 0; h < this.features.length; ++h) t = this.features[h], null != t && (i = t.sValue, null != i && (n = t.symbolGeomtry, s = parseFloat(i) / l * this.symbolOption.maxsize, r = new GeoBeans.Geometry.Circle(n, s), t.circle = r, this.renderer.drawGeometry(r, a, this.map.transformation)))
		}
	},
	getSymbolizer: function() {
		var e = new GeoBeans.Symbolizer.PolygonSymbolizer,
			l = this.symbolOption.color;
		null != l && e.fill.color.setByHex(l, 1);
		var a = this.symbolOption.opacity;
		null != a ? e.fill.color.setOpacity(a) : e.fill.color.setOpacity(1);
		var t = this.symbolOption.border;
		null != t && e.stroke.color.setByHex(t, 1);
		var i = this.symbolOption.borderOpacity;
		return null != i ? e.stroke.color.setOpacity(i) : e.stroke.color.setOpacity(1), e
	},
	getRadiusByLevelMap: function(e, l) {
		if (null == e || null == l) return null;
		for (var a = null, t = null, i = null, n = 0; n < l.length; ++n) if (a = l[n], null != a) {
			if (t = a.min, i = a.max, 0 == n && e == t) return a.radius;
			if (t < e && i >= e) return a.radius
		}
		return null
	},
	onFeatureHit: function(e, l, a) {
		if ("pointer" == document.body.style.cursor) return void e.map.closeInfoWindow();
		if (0 == l.length) e.map.closeInfoWindow();
		else {
			var t = l[0];
			if (null == t) return;
			var i = t.tValue,
				n = t.rValue,
				s = t.sValue,
				r = e.rangeChartField,
				h = e.symbolChartField,
				o = "<div><div>" + r + " : " + (null == n ? "" : n) + "</div><div>" + h + " : " + (null == s ? "" : s) + "</div></div>",
				d = {
					title: i,
					width: 100,
					height: 40
				},
				u = new GeoBeans.InfoWindow(o, d);
			e.map.openInfoWindow(u, a)
		}
	},
	drawRangeLegend: function() {
		if (null != this.minMax && null != this.rangeOption) {
			var e = "",
				l = (this.map.mapDiv.find(".chart-legend"), 0);
			if (0 == this.legendIndex) l = 10;
			else {
				var a = this.legendIndex - 1,
					t = this.map.mapDiv.find(".chart-legend[lindex='" + a + "']"),
					i = t.css("left"),
					n = t.css("width");
				i = parseInt(i.replace("px", "")), n = parseInt(n.replace("px", "")), l = i + n + 5
			}
			var e = "<div class='chart-legend chart-legend-range-symbol' id='" + this.name + "' style='left:" + l + "px' lindex='" + this.legendIndex + "'>";
			e += "<div class='chart-legend-item chart-legend-rs-range'><div class='chart-legend-title'><h5>" + this.rangeChartField + "</h5></div>", e += "<div class='chart-legend-canvas'>\t<canvas width='20' height='200'></canvas></div><div class='chart-legend-value'><div class='chart-legend-label'>" + this.minMax.range.max + "</div><div class='chart-legend-label' style='padding-top:180px'>" + this.minMax.range.min + "</div></div></div>", e += "</div>", this.map.mapDiv.append(e);
			var s = this.map.mapDiv.find("#" + this.name + " .chart-legend-canvas canvas"),
				r = s[0].getContext("2d"),
				h = new Image;
			h.src = this.colorMap.url, h.onload = function() {
				var e = s.width() / 2,
					l = s.height() / 2,
					a = h.width,
					t = h.height;
				r.clearRect(0, 0, a, t), r.translate(e, l), r.rotate(270 * Math.PI / 180), r.drawImage(h, -a / 2, -t / 2, a, t), r.rotate(-270 * Math.PI / 180), r.translate(-e, -l)
			}
		}
	},
	drawSymbolLegend: function() {
		if (null == this.symbolOption) return "";
		var e = this.symbolOption.byLevel;
		return e ? this.drawSymbolLegendByLevel() : this.drawSymbolLegendByValue()
	},
	drawSymbolLegendByLevel: function() {
		if (null != this.symbolOption) {
			var e = this.symbolOption.maxsize,
				l = (this.symbolOption.level, 2 * this.maxSymbolRadius + 4),
				a = this.getLegendCanvasHeightByLevel(this.levelMap, this.maxSymbolRadius, e);
			if (null != a) {
				var t = "<div class='chart-legend-item chart-legend-rs-symbol'>";
				t += "<div class='chart-legend-title'<h5>" + this.symbolChartField + "</h5></div>", t += "<div class='chart-legend-canvas'><canvas width='" + l + "' height='" + a + "'></canvas></div>", t += "<div class='chart-legend-value' style='font-size:12px;ling-height:12px'></div>", t += "</div>", this.map.mapDiv.find("#" + this.name).prepend(t);
				var i = this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol .chart-legend-title").height(),
					n = i + a + 20;
				this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol").css("height", n + "px");
				var s = "",
					r = this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol canvas"),
					h = new GeoBeans.Renderer(r[0]),
					o = this.getSymbolizer();
				h.setSymbolizer(o);
				for (var d = h.context, u = 0, m = null, y = null, g = null, p = null, c = null, v = null, f = 0, b = null, L = 0; L < this.levelMap.length; ++L) if (m = this.levelMap[L], null != m) {
					p = m.min, c = m.max, p = p.toFixed(2), c = c.toFixed(2), v = p + "~" + c, y = m.radius, g = y / e * this.maxSymbolRadius, u += g, 0 == L && (u += 1), null == b && (b = -8.495), f = u - b - 16.99, b = u, s += "<div class='chart-legend-label' style='padding-top:" + f + "px'>" + v + "</div>", u = Math.ceil(u);
					var F = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, u);
					u += g + this.legendPadding, u = Math.ceil(u), d.beginPath(), d.arc(F.x, F.y, g, 0, 2 * Math.PI, !0), null != o.fill && d.fill(), null != o.stroke && d.stroke(), d.closePath()
				}
				this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol .chart-legend-value").html(s)
			}
		}
	},
	getLegendCanvasHeightByLevel: function(e, l, a) {
		if (null == e || null == l || null == a) return null;
		for (var t = 0, i = null, n = null, s = e.length - 1; s >= 0; --s) if (i = e[s], null != i) {
			n = i.radius;
			var r = n / a * l;
			t += 2 * r + this.legendPadding
		}
		return t += 4, t = Math.ceil(t)
	},
	drawSymbolLegendByValue: function() {
		if (null != this.symbolOption) {
			var e = this.minMax.symbol,
				l = e.min,
				a = e.max,
				t = (this.symbolOption.maxsize, l / a * this.maxSymbolRadius),
				i = t;
			t < 8.5 && (i = 8.5);
			var n = 2 * this.maxSymbolRadius + 4,
				s = 2 * (this.maxSymbolRadius + i) + this.legendPadding + 4,
				r = this.map.mapDiv.find(".chart-legend"),
				h = 0;
			if (r.length > 0) {
				var o = r.last(),
					d = o.css("left"),
					u = o.css("width");
				d = parseInt(d.replace("px", "")), u = parseInt(u.replace("px", "")), h = d + u + 5
			} else h = 10;
			var m = "<div class='chart-legend-item chart-legend-rs-symbol'>";
			m += "<div class='chart-legend-title'><h5>" + this.symbolChartField + "</h5></div>", m += "<div class='chart-legend-canvas'><canvas width='" + n + "' height='" + s + "'></canvas></div>", m += "<div class='chart-legend-value' style='font-size:12px;ling-height:12px'></div>", m += "</div>", this.map.mapDiv.find("#" + this.name).prepend(m);
			var y = this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol .chart-legend-title").height(),
				g = y + s + 20;
			this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol").css("height", g + "px");
			var p = this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol canvas"),
				c = new GeoBeans.Renderer(p[0]),
				v = this.getSymbolizer();
			c.setSymbolizer(v);
			var f = c.context,
				b = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, i);
			f.beginPath(), f.arc(b.x, b.y, t, 0, 2 * Math.PI, !0), null != v.fill && f.fill(), null != v.stroke && f.stroke(), f.closePath(), f.beginPath();
			var L = this.maxSymbolRadius + 2 * i + this.legendPadding,
				F = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, L);
			f.arc(F.x, F.y, this.maxSymbolRadius, 0, 2 * Math.PI, !0), null != v.fill && f.fill(), null != v.stroke && f.stroke(), f.closePath();
			var B = "",
				x = i - 8.5,
				w = F.y - b.y - 16.99;
			console.log(x), console.log(w), B += "<div class='chart-legend-label' style='padding-top:" + x + "px'>" + l + "</div>", B += "<div class='chart-legend-label' style='padding-top:" + w + "px'>" + a + "</div>", this.map.mapDiv.find("#" + this.name + " .chart-legend-rs-symbol .chart-legend-value").html(B)
		}
	},
	resizeLegend: function() {
		var e = this.map.mapDiv.find(".chart-legend-rs-range .chart-legend-value"),
			l = e.width(),
			a = this.map.mapDiv.find(".chart-legend#" + this.name).width();
		if (l + 40 < a) {
			var t = a - l - 30,
				i = t / 2;
			e.css("margin-right", i + "px"), this.map.mapDiv.find(".chart-legend-rs-range .chart-legend-canvas").css("margin-left", i + "px")
		}
	},
	setRangeBaseLayer: function(e) {
		null != e && e != this.rangeBaseLayerName && (this.rangeBaseLayerName = e, this.getFeatures(), this.flag = GeoBeans.Layer.Flag.READY)
	},
	setRangeBaseLayerField: function(e) {
		null != e && e != this.rangeBaseLayerField && (this.rangeBaseLayerField = e, this.getFeatures(), this.flag = GeoBeans.Layer.Flag.READY)
	},
	setSymbolBaseLayer: function(e) {
		null != e && e != this.symbolBaseLayerName && (this.symbolBaseLayerName = e, this.getFeatures(), this.flag = GeoBeans.Layer.Flag.READY)
	},
	setSymbolBaseLayerField: function(e) {
		null != e && e != this.symbolBaseLayerField && (this.symbolBaseLayerField = e, this.getFeatures(), this.flag = GeoBeans.Layer.Flag.READY)
	},
	setRangeChartField: function(e) {
		null != e && e != this.rangeChartField && (this.rangeChartField = e, this.getFeatures(), this.flag = GeoBeans.Layer.Flag.READY)
	},
	setSymbolChartField: function(e) {
		null != e && e != this.symbolChartField && (this.symbolChartField = e, this.getFeatures(), this.flag = GeoBeans.Layer.Flag.READY)
	},
	setRangeChartOption: function(e) {
		null != e && (this.rangeOption = e, this.flag = GeoBeans.Layer.Flag.READY)
	},
	setSymbolChartOption: function(e) {
		null != e && (this.symbolOption = e, this.flag = GeoBeans.Layer.Flag.READY)
	}
});
GeoBeans.Layer.RingChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	chartOption: null,
	initialize: function(t, e, a, r, l, i, n, s) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Layer.ChartLayer.Type.RING, this.chartOption = s
	},
	setMap: function(t) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments)
	},
	load: function() {
		this.flag = GeoBeans.Layer.Flag.LOADED, null == this.features && (this.features = this.chartFeatures), this.renderer.clearRect(), this.drawLayer()
	},
	getMinMaxValue: function() {
		if (null == this.chartFeatures) return null;
		for (var t = null, e = (this.chartFields[0], this.chartFeatureType), a = e.getFieldIndex(this.chartFields[0]), r = null, l = null, i = null, n = null, s = 0; s < this.chartFeatures.length; ++s) t = this.chartFeatures[s], null != t && (r = t.values, null != r && (n = r[a], null != n && (n = parseFloat(n), l = null == l ? n : n < l ? n : l, i = null == i ? n : n > i ? n : i)));
		return {
			min: l,
			max: i
		}
	},
	drawLayer: function() {
		var t = this.getMinMaxValue();
		this.minMax = t;
		for (var e = (t.min, t.max), a = (this.chartFields[0], this.chartFeatureType), r = a.getFieldIndex(this.chartFields), l = null, i = null, n = null, s = null, h = null, u = null, o = null, o = this.chartOption.color, c = this.chartOption.opacityInner, p = this.chartOption.opacityOuter, y = 0; y < this.chartFeatures.length; ++y) l = this.chartFeatures[y], null != l && (i = l.values, null != i && (n = i[r], null != n && (s = l.geometry, h = parseFloat(n) / e * this.chartOption.maxsize, u = h + this.chartOption.outerRadius, this.renderer.drawRing(s, h, u, o, c, p, this.map.transformation))))
	}
});
GeoBeans.Layer.SymbolChartLayer_1 = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	chartOption: null,
	levelMap: null,
	legendPadding: 4,
	maxSymbolRadius: 30,
	minMax: null,
	initialize: function(e, t, l, i, a, n, s, r) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Layer.ChartLayer.Type.SYMBOL, this.chartOption = r, this.features = null
	},
	setMap: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), this.registerHitEvent(this.onFeatureHit), e._addLegend(this)
	},
	cleanup: function() {
		GeoBeans.Layer.ChartLayer.prototype.cleanup.apply(this, arguments), this.unRegisterHitEvent(), this.chartOption = null, this.levelMap = null, this.minMax = null
	},
	load: function() {
		null == this.features && (this.features = this.chartFeatures), this.renderer.clearRect(), this.drawLayer(), this.removeLegend(), this.addLegend(), this.visible ? this.showLegend() : this.hideLegend(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	getSymbolizer: function() {
		var e = new GeoBeans.Symbolizer.PolygonSymbolizer,
			t = this.chartOption.color;
		null != t && e.fill.color.setByHex(t, 1);
		var l = this.chartOption.opacity;
		null != l ? e.fill.color.setOpacity(l) : e.fill.color.setOpacity(1);
		var i = this.chartOption.border;
		null != i && e.stroke.color.setByHex(i, 1);
		var a = this.chartOption.borderOpacity;
		return null != a ? e.stroke.color.setOpacity(a) : e.stroke.color.setOpacity(1), e
	},
	drawLayer: function() {
		if (null != this.chartOption) {
			var e = this.chartOption.byLevel;
			e ? this.drawLayerByLevel() : this.drawLayerByValue()
		}
	},
	drawLayerByLevel: function() {
		if (null != this.chartOption) {
			var e = this.chartOption.level,
				t = this.getMinMaxValue();
			this.minMax = t;
			var l = t.min,
				i = t.max,
				a = this.chartOption.maxsize,
				n = (this.chartFields[0], this.chartFeatureType),
				s = n.getFieldIndex(this.chartFields),
				r = this.getSymbolizer();
			this.renderer.setSymbolizer(r);
			var h = null,
				d = null,
				o = null,
				u = null,
				c = null,
				p = null,
				v = this.getLevelMap(a, e, l, i);
			this.levelMap = v;
			for (var m = 0; m < this.chartFeatures.length; ++m) h = this.chartFeatures[m], null != h && (d = h.values, null != d && (o = d[s], null != o && (u = h.geometry, c = this.getRadiusByLevelMap(parseFloat(o), v), p = new GeoBeans.Geometry.Circle(u, c), h.circle = p, this.renderer.drawGeometry(p, r, this.map.transformation))))
		}
	},
	drawLayerByValue: function() {
		var e = this.getMinMaxValue();
		this.minMax = e;
		var t = (e.min, e.max),
			l = (this.chartFields[0], this.chartFeatureType),
			i = l.getFieldIndex(this.chartFields),
			a = this.getSymbolizer();
		this.renderer.setSymbolizer(a);
		for (var n = null, s = null, r = null, h = null, d = null, o = null, u = 0; u < this.chartFeatures.length; ++u) n = this.chartFeatures[u], null != n && (s = n.values, null != s && (r = s[i], null != r && (h = n.geometry, d = parseFloat(r) / t * this.chartOption.maxsize, o = new GeoBeans.Geometry.Circle(h, d), n.circle = o, this.renderer.drawGeometry(o, a, this.map.transformation))))
	},
	getMinMaxValue: function() {
		if (null == this.chartFeatures) return null;
		for (var e = null, t = (this.chartFields[0], this.chartFeatureType), l = t.getFieldIndex(this.chartFields[0]), i = null, a = null, n = null, s = null, r = 0; r < this.chartFeatures.length; ++r) e = this.chartFeatures[r], null != e && (i = e.values, null != i && (s = i[l], null != s && (s = parseFloat(s), a = null == a ? s : s < a ? s : a, n = null == n ? s : s > n ? s : n)));
		return {
			min: a,
			max: n
		}
	},
	getLevelMap: function(e, t, l, i) {
		if (null != e && null != t && null != l && null != i) {
			for (var a = (i - l) / t, n = [], s = 0; s < t; ++s) {
				var r = l + s * a,
					h = l + (s + 1) * a,
					d = Math.pow(1.2, s + 1 - t) * e,
					o = {
						min: r,
						max: h,
						radius: d
					};
				n.push(o)
			}
			return n
		}
	},
	getRadiusByLevelMap: function(e, t) {
		if (null == e || null == t) return null;
		for (var l = null, i = null, a = null, n = 0; n < t.length; ++n) if (l = t[n], null != l) {
			if (i = l.min, a = l.max, 0 == n && e == i) return l.radius;
			if (i < e && a >= e) return l.radius
		}
		return null
	},
	addLegend: function() {
		if (null != this.chartOption) {
			var e = this.chartOption.byLevel;
			e ? this.addLegendByLevel() : this.addLegendByValue()
		}
	},
	addLegendByLevel: function() {
		if (null != this.chartOption) {
			var e = this.chartOption.maxsize,
				t = (this.chartOption.level, 2 * this.maxSymbolRadius + 4),
				l = this.getLegendCanvasHeightByLevel(this.levelMap, this.maxSymbolRadius, e);
			if (null != l) {
				var i = (this.map.mapDiv.find(".chart-legend"), 0);
				if (0 == this.legendIndex) i = 10;
				else {
					var a = this.legendIndex - 1,
						n = this.map.mapDiv.find(".chart-legend[lindex='" + a + "']"),
						s = n.css("left"),
						r = n.css("width");
					s = parseInt(s.replace("px", "")), r = parseInt(r.replace("px", "")), i = s + r + 5
				}
				var h = "<div class='chart-legend chart-symbol-legend' id='" + this.name + "' style='left:" + i + "px' lindex='" + this.legendIndex + "'>";
				h += "<div class='chart-legend-title'<h5>" + this.name + "</h5></div>", h += "<div class='chart-legend-canvas'><canvas width='" + t + "' height='" + l + "'></canvas></div>", h += "<div class='chart-legend-value' style='font-size:12px;ling-height:12px'></div>", h += "</div>", this.map.mapDiv.append(h);
				var d = "",
					o = this.map.mapDiv.find("#" + this.name + " canvas"),
					u = new GeoBeans.Renderer(o[0]),
					c = this.getSymbolizer();
				u.setSymbolizer(c);
				for (var p = u.context, v = 0, m = null, y = null, g = null, f = null, x = null, L = null, b = 0, F = null, B = 0; B < this.levelMap.length; ++B) if (m = this.levelMap[B], null != m) {
					f = m.min, x = m.max, f = f.toFixed(2), x = x.toFixed(2), L = f + "~" + x, y = m.radius, g = y / e * this.maxSymbolRadius, v += g, v = Math.ceil(v), null == F && (F = -8.495), b = v - F - 16.99, F = v, d += "<div class='chart-legend-label' style='padding-top:" + b + "px'>" + L + "</div>";
					var w = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, v);
					v += g + this.legendPadding, v = Math.ceil(v), p.beginPath(), p.arc(w.x, w.y, g, 0, 2 * Math.PI, !0), null != c.fill && p.fill(), null != c.stroke && p.stroke(), p.closePath()
				}
				this.map.mapDiv.find("#" + this.name + ".chart-legend .chart-legend-value").html(d)
			}
		}
	},
	getLegendCanvasHeightByLevel: function(e, t, l) {
		if (null == e || null == t || null == l) return null;
		for (var i = 0, a = null, n = null, s = e.length - 1; s >= 0; --s) if (a = e[s], null != a) {
			n = a.radius;
			var r = n / l * t;
			i += 2 * r + this.legendPadding
		}
		return i += 4, i = Math.ceil(i)
	},
	addLegendByValue: function() {
		if (null != this.chartOption) {
			var e = this.minMax;
			if (null != e) {
				var t = e.min,
					l = e.max,
					i = (this.chartOption.maxsize, t / l * this.maxSymbolRadius);
				i < 0 && (i = this.maxSymbolRadius / 10);
				var a = i;
				i < 8.5 && (a = 8.5);
				var n = 2 * this.maxSymbolRadius + 4,
					s = 2 * (this.maxSymbolRadius + a) + this.legendPadding + 4,
					r = (this.map.mapDiv.find(".chart-legend"), 0);
				if (0 == this.legendIndex) r = 10;
				else {
					var h = this.legendIndex - 1,
						d = this.map.mapDiv.find(".chart-legend[lindex='" + h + "']"),
						o = d.css("left"),
						u = d.css("width");
					o = parseInt(o.replace("px", "")), u = parseInt(u.replace("px", "")), r = o + u + 5
				}
				var c = "<div class='chart-legend chart-symbol-legend' id='" + this.name + "' style='left:" + r + "px' lindex='" + this.legendIndex + "'>";
				c += "<div class='chart-legend-title'><h5>" + this.name + "</h5></div>", c += "<div class='chart-legend-canvas'><canvas width='" + n + "' height='" + s + "'></canvas></div>", c += "<div class='chart-legend-value' style='font-size:12px;ling-height:12px'></div>", c += "</div>", this.map.mapDiv.append(c);
				var p = this.map.mapDiv.find("#" + this.name + " canvas"),
					v = new GeoBeans.Renderer(p[0]),
					m = this.getSymbolizer();
				v.setSymbolizer(m);
				var y = v.context,
					g = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, a);
				y.beginPath(), y.arc(g.x, g.y, i, 0, 2 * Math.PI, !0), null != m.fill && y.fill(), null != m.stroke && y.stroke(), y.closePath(), y.beginPath();
				var f = this.maxSymbolRadius + 2 * a + this.legendPadding,
					x = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, f);
				y.arc(x.x, x.y, this.maxSymbolRadius, 0, 2 * Math.PI, !0), null != m.fill && y.fill(), null != m.stroke && y.stroke(), y.closePath();
				var L = "",
					b = a - 8.5,
					F = x.y - g.y - 16.99;
				console.log(b), console.log(F), L += "<div class='chart-legend-label' style='padding-top:" + b + "px'>" + t + "</div>", L += "<div class='chart-legend-label' style='padding-top:" + F + "px'>" + l + "</div>", this.map.mapDiv.find("#" + this.name + ".chart-legend .chart-legend-value").html(L)
			}
		}
	},
	onFeatureHit: function(e, t, l) {
		if (console.log(t.length), "pointer" == document.body.style.cursor) return void e.map.closeInfoWindow();
		if (0 == t.length) e.map.closeInfoWindow();
		else {
			var i = t[0],
				a = (i.chartValue, e.chartFeatureType);
			if (null == a) return;
			var n = i.values;
			if (null == n) return;
			var s = a.getFieldIndex(e.chartFields[0]),
				r = n[s],
				h = a.getFieldIndex(e.tableField),
				d = n[h],
				o = "<div>" + r + "</div>",
				u = {
					title: d,
					width: 100,
					height: 40
				},
				c = new GeoBeans.InfoWindow(o, u),
				p = i.circle.center;
			e.map.openInfoWindow(c, p)
		}
	},
	hit: function(e, t, l) {
		if (null != this.chartFeatures) {
			this.map.renderer, this.map.transformation;
			this.selection = [];
			var i = 0,
				a = null,
				n = null,
				s = this.features.length;
			for (i = 0; i < s; i++) a = this.features[i], n = a.circle, null != n && n.hit(e, t, this.map.tolerance) && this.selection.push(a);
			if (this.hitRenderer.clearRect(0, 0, this.hitCanvas.height, this.hitCanvas.width), this.map.drawLayersAll(), void 0 != l) {
				var r = new GeoBeans.Geometry.Point(e, t);
				l(this, this.selection, r)
			}
		}
	}
});
GeoBeans.Layer.BarChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	baseLayerFields: null,
	initialize: function(e, t, i, a) {
		this.name = e, this.baseLayerName = t, this.baseLayerFields = i, this.option = a
	},
	setMap: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), e._addLegend(this), this.minMax = this.getMinMaxValue()
	},
	load: function() {
		this.removeLegend(), this.addLegend(), this.visible ? this.showLegend() : this.hideLegend(), this.setTransformation(this.map.transformation), this.renderer.clearRect(), this.drawLayer(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	registerClickEvent: function() {},
	unRegisterClickEvent: function() {},
	getMinMaxValue: function() {
		for (var e = null, t = null, i = null, a = null, s = null, n = null, l = null, r = 0; r < this.baseLayerFields.length; ++r) if (i = this.baseLayerFields[r], null != i && (l = this.featureType.getFieldIndex(i), l != -1)) {
			for (var o = null, h = null, d = 0; d < this.features.length; ++d) a = this.features[d], null != a && (s = a.values, null != s && (n = parseFloat(s[l]), o = null == o ? n : n > o ? n : o, h = null == h ? n : n < h ? n : h));
			e = null == e ? o : o > e ? o : e, t = null == t ? h : h < t ? h : t
		}
		return {
			min: t,
			max: e
		}
	},
	drawLayer: function() {
		if (null != this.features) {
			var e = null,
				t = null,
				i = null,
				a = null,
				s = null,
				n = null;
			this.renderer.save(), this.renderer.setGlobalAlpha(this.option.opacity);
			for (var l = 0; l < this.features.length; ++l) if (e = this.features[l], null != e && (geometry = e.geometry, null != geometry && (geometry.type == GeoBeans.Geometry.Type.POINT ? s = geometry : geometry.type != GeoBeans.Geometry.Type.POLYGON && geometry.type != GeoBeans.Geometry.Type.MULTIPOLYGON || (s = geometry.getCentroid()), null != s && (t = e.values, null != t)))) {
				var r = [],
					o = null,
					h = null,
					d = document.createElement("canvas"),
					p = d.getContext("2d");
				p.font = "12px Arial, Verdana, sans-seri";
				for (var u = this.baseLayerFields.length, y = 0; y < u; ++y) if (a = this.baseLayerFields[y], null != a) {
					var m = this.featureType.getFieldIndex(a);
					if (m != -1) {
						i = parseFloat(t[m]);
						var g = new Object;
						g.name = a, g.type = "bar", g.data = [i];
						var c = p.measureText(t[m]).width;
						h = null == h ? c : h > c ? h : c, g.itemStyle = {
							normal: {
								label: {
									show: this.option.showLabel,
									position: "top"
								}
							}
						}, r.push(g), o = null == o ? i : i > o ? i : o
					}
				}
				var f = 10,
					x = 10;
				h > this.option.width && (f = h - this.option.width / u / 2, x = h - this.option.width / u / 2);
				var v = {
					top: 26,
					bottom: 12,
					left: f,
					right: x
				};
				n = {
					grid: {
						x: v.left + "px",
						y: v.top + "px",
						x2: v.right + "px",
						y2: v.bottom + "px",
						width: this.option.width + "px",
						borderWidth: 0
					},
					xAxis: [{
						type: "category",
						data: [""],
						splitLine: {
							show: this.option.x_splitLine
						},
						axisLabel: {
							show: !1
						},
						axisTick: {
							show: !1
						},
						axisLine: {
							show: this.option.x_axisLine
						}
					}],
					yAxis: [{
						min: this.minMax.min,
						max: o,
						splitLine: {
							show: this.option.y_splitLine
						},
						axisLabel: {
							show: !1
						},
						axisTick: {
							show: !1
						},
						axisLine: {
							show: this.option.y_axisLine
						}
					}],
					color: this.option.colors,
					series: r,
					animation: !1,
					calculable: !1
				};
				var L = this.option.height,
					b = this.option.width,
					w = parseFloat(v.top) + parseFloat(v.bottom),
					F = o / this.minMax.max * L + w,
					G = v.left + v.right,
					I = b + G,
					T = "bar_chart_" + this.name + l,
					B = "<div class='chart-div' style='height: " + F + "px; width:" + I + "px' id='" + T + "'></div>";
				this.map.mapDiv.append(B);
				var M = echarts.init(document.getElementById(T));
				M.setOption(n);
				var _ = $("#" + T).find("canvas").first(),
					C = _.width(),
					O = _.height(),
					k = s.x,
					A = s.y,
					D = this.map.transformation.toScreenPoint(k, A),
					E = D.x - C / 2 + this.option.offsetX,
					N = D.y - F + v.bottom - this.option.offsetY;
				this.renderer.drawImage(_[0], E, N, C, O), M.dispose()
			}
			var P = "bar_chart_" + this.name;
			$("*[id*='" + P + "']").remove(), this.renderer.restore()
		}
	},
	addLegend: function() {
		if (null != this.option) {
			var e = 0;
			if (0 == this.legendIndex) e = 10;
			else {
				var t = this.legendIndex - 1,
					i = this.map.mapDiv.find(".chart-legend[lindex='" + t + "']");
				if (0 != i.length) {
					var a = i.css("left"),
						s = i.css("width");
					a = parseInt(a.replace("px", "")), s = parseInt(s.replace("px", "")), e = a + s + 5
				}
			}
			var n = "<div class='chart-legend' id='" + this.name + "' style='left:" + e + "px' lindex='" + this.legendIndex + "'>";
			n += "<div class='chart-legend-title'><h5>" + this.name + "</h5></div>";
			for (var l = null, r = null, o = this.option.colors, h = 0; h < this.baseLayerFields.length; ++h) l = this.baseLayerFields[h], null != l && (r = o[h], n += "<div>\t<span class='chart-legend-symbol' style='background-color:" + r + "'></span>\t<span class='chart-legend-label'>" + l + "</span></div>");
			n += "</div>", this.map.mapDiv.append(n)
		}
	}
});
GeoBeans.Layer.ClusterLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	distance: 90,
	initialize: function(e, t) {
		this.name = e, this.baseLayerName = t, this.createSymbolizer()
	},
	destroy: function() {
		GeoBeans.Layer.ChartLayer.prototype.destroy.apply(this, arguments), this.clusters = null, this.hitCluster = null, this.symbolizers = null
	},
	setMap: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), this.registerClickEvent()
	},
	load: function() {
		if (null == this.features) return void(this.flag = GeoBeans.Layer.Flag.LOADED);
		var e = this.map.viewer;
		null != e && null != this.viewer && this.flag == GeoBeans.Layer.Flag.LOADED && e.equal(this.viewer) || (this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), this.renderer.clearRect(), this.cluster(), this.flag = GeoBeans.Layer.Flag.LOADED)
	},
	cluster: function() {
		if (null != this.features) {
			for (var e = (new Date, null), t = null, n = null, r = !1, s = [], l = 0; l < this.features.length; ++l) if (e = this.features[l], null != e && (t = e.geometry, null != t && this.viewer.contain(t.x, t.y))) {
				r = !1;
				for (var i = 0; i < s.length; ++i) if (n = s[i], this.shouldCluster(n, t)) {
					this.addToCluster(n, e), r = !0;
					break
				}
				r || s.push(this.createCluster(e))
			}
			this.clusters = s, this.drawClusters()
		}
	},
	createCluster: function(e) {
		var t = {
			features: []
		};
		t.features.push(e);
		var n = e.geometry;
		return t.geometry = n, t
	},
	shouldCluster: function(e, t) {
		var n = e.geometry,
			r = this.map.transformation.toScreenPoint(n.x, n.y),
			s = this.map.transformation.toScreenPoint(t.x, t.y),
			l = Math.sqrt(Math.pow(r.x - s.x, 2) + Math.pow(r.y - s.y, 2));
		return l < this.distance
	},
	addToCluster: function(e, t) {
		e.features.push(t)
	},
	getClusterCenter: function(e) {
		for (var t = e.features, n = null, r = null, s = 0, l = 0, i = 0; i < t.length; ++i) n = t[i], null != n && (r = n.geometry, null != r && (s += r.x, l += r.y));
		return new GeoBeans.Geometry.Point(s / t.length, l / t.length)
	},
	createSymbolizer: function() {
		var e = [],
			t = new GeoBeans.Symbolizer.PointSymbolizer,
			n = new GeoBeans.Symbol;
		n.icon = "../images/marker.png", t.symbol = n, e.push(t);
		var t = new GeoBeans.Symbolizer.PointSymbolizer,
			n = new GeoBeans.Symbol;
		n.icon = "../images/m0.png", t.symbol = n, e.push(t);
		var t = new GeoBeans.Symbolizer.PointSymbolizer,
			n = new GeoBeans.Symbol;
		n.icon = "../images/m1.png", t.symbol = n, e.push(t);
		var t = new GeoBeans.Symbolizer.PointSymbolizer,
			n = new GeoBeans.Symbol;
		n.icon = "../images/m2.png", t.symbol = n, e.push(t);
		var t = new GeoBeans.Symbolizer.PointSymbolizer,
			n = new GeoBeans.Symbol;
		n.icon = "../images/m3.png", t.symbol = n, e.push(t);
		var t = new GeoBeans.Symbolizer.PointSymbolizer,
			n = new GeoBeans.Symbol;
		n.icon = "../images/m4.png", t.symbol = n, e.push(t), this.symbolizers = e
	},
	drawClusters: function() {
		var e = this.getIconLoaded();
		e ? this.drawClusterLayer() : this.loadIcon()
	},
	drawClusterLayer: function() {
		for (var e = null, t = [
			[],
			[],
			[],
			[],
			[],
			[]
		], n = 0; n < this.clusters.length; ++n) if (e = this.clusters[n], null != e) {
			e.geometry = this.getClusterCenter(e);
			var r = e.features.length,
				s = this.getSymbolizerNumber(r),
				l = this.getIconWidth(s);
			e.radius = l, t[s].push(e)
		}
		for (var n = 0; n < t.length; ++n) {
			var i = t[n];
			this.renderer.setSymbolizer(this.symbolizers[n]), this.renderer.drawIcons(i, this.symbolizers[n], this.map.transformation)
		}
		var o = new GeoBeans.Symbolizer.TextSymbolizer;
		o.font.family = "Microsoft Yahei", o.font.weight = GeoBeans.Font.WeightType.Bold, o.fill.color.setByHex("#000000", 1), this.renderer.setSymbolizer(o);
		for (var n = 0; n < this.clusters.length; ++n) {
			var a = this.clusters[n].features.length;
			if (1 != a) {
				var u = this.map.transformation.toScreenPoint(this.clusters[n].geometry.x, this.clusters[n].geometry.y),
					m = this.renderer.context.measureText(a).width;
				this.renderer.context.fillText(a, u.x - m / 2, u.y + 6)
			}
		}
	},
	getSymbolizerNumber: function(e) {
		return 1 == e ? 0 : e > 1 && e < 10 ? 1 : e >= 10 && e < 20 ? 2 : e >= 20 && e < 30 ? 3 : e >= 30 && e < 40 ? 4 : e >= 40 ? 5 : void 0
	},
	getIconWidth: function(e) {
		var t = this.symbolizers[e];
		if (null == t) return null;
		var n = t.icon;
		if (null == n) return null;
		var r = n.width;
		return null == r ? null : r / 2
	},
	getIconLoaded: function() {
		for (var e = !0, t = 0; t < this.symbolizers.length; ++t) if (symbolizer = this.symbolizers[t], null == symbolizer.icon ? (symbolizer.icon = new Image, symbolizer.icon.crossOrigin = "anonymous", symbolizer.icon.src = symbolizer.symbol.icon) : symbolizer.icon.src != symbolizer.symbol.icon && (symbolizer.icon = null, symbolizer.icon = new Image, symbolizer.icon.crossOrigin = "anonymous", symbolizer.icon.src = symbolizer.symbol.icon), !symbolizer.icon.complete) return e = !1, !1;
		return !0
	},
	loadIcon: function() {
		var e = null;
		this.loadIconFlag = !0;
		for (var t = 0; t < this.symbolizers.length; ++t) if (e = this.symbolizers[t], null == e.icon ? (e.icon = new Image, e.icon.crossOrigin = "anonymous", e.icon.src = e.symbol.icon) : e.icon.src != e.symbol.icon && (e.icon = null, e.icon = new Image, e.icon.crossOrigin = "anonymous", e.icon.src = e.symbol.icon), e.icon.complete);
		else {
			var n = this;
			n.loadIconFlag = !1, e.icon.onload = function() {
				console.log("loading" + e.icon), n.loadIconFlag || n.loadIcon()
			}
		}
		this.loadIconFlag && (console.log("draw cluster"), this.drawClusterLayer(), this.map.drawLayersAll())
	},
	registerClickEvent: function() {
		if (null == this.hitEvent) {
			var e = this.map,
				t = 10,
				n = null,
				r = null,
				s = this;
			s.hitCluster = null, this.hitEvent = function(e) {
				if (e.preventDefault(), null == n) n = e.layerX, r = e.layerY;
				else {
					var l = Math.abs(e.layerX - n) + Math.abs(e.layerY - r);
					if (l > t) {
						n = e.layerX, r = e.layerY;
						var i = s.hit(n, r);
						if (null == i) s.hitCluster = null, document.body.style.cursor = "default";
						else {
							var o = i.features.length;
							1 == o ? (s.hitCluster = null, document.body.style.cursor = "default") : (s.hitCluster = i, document.body.style.cursor = "pointer")
						}
					}
				}
			}, e.mapDiv[0].addEventListener("mousemove", this.hitEvent);
			var l = function(e) {
					e.preventDefault();
					var t = s.map.controls.find(GeoBeans.Control.Type.DRAG_MAP),
						n = s.map.controls.get(t);
					return console.log(n.draging), n.draging ? void console.log("draging") : void(null != s.hitCluster && s.zoomToCluster(s.hitCluster))
				};
			e.mapDiv[0].addEventListener("mouseup", l), this.clickEvent = l
		}
	},
	hit: function(e, t) {
		if (null != this.clusters) {
			for (var n = null, r = null, s = null, l = null, i = null, o = 0; o < this.clusters.length; ++o) if (n = this.clusters[o], r = n.geometry, s = this.map.transformation.toScreenPoint(r.x, r.y), l = n.radius, i = GeoBeans.Utility.getDistance(s.x, s.y, e, t), i < l) return n;
			return document.body.style.cursor = "default", null
		}
	},
	zoomToCluster: function(e) {
		if (null != e) {
			var t = this.getClusterExtent(e);
			if (t.scale(1.2), null != this.map.baseLayer) {
				var n = this.map.getLevel(t),
					r = t.getCenter();
				this.map.setCenter(r), this.map.setLevel(n), this.map.drawBackground()
			} else this.map.setViewer(t);
			this.map.draw()
		}
	},
	getClusterExtent: function(e) {
		if (null == e) return null;
		for (var t = null, n = null, r = null, s = null, l = e.features, i = 0; i < l.length; ++i) {
			var o = l[i],
				a = o.geometry;
			t = null == t ? a.x : t < a.x ? t : a.x, r = null == r ? a.x : r > a.x ? r : a.x, n = null == n ? a.y : n < a.y ? n : a.y, s = null == s ? a.y : s > a.y ? s : a.y
		}
		return new GeoBeans.Envelope(t, n, r, s)
	},
	unRegisterClickEvent: function() {
		this.map.mapDiv[0].removeEventListener("mouseup", this.clickEvent), this.map.mapDiv[0].removeEventListener("mousemove", this.hitEvent), this.clickEvent = null, this.hitEvent = null
	}
});
GeoBeans.Layer.HeatMapLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	initialize: function(e, a, t, i) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments)
	},
	destroy: function() {
		GeoBeans.Layer.ChartLayer.prototype.destroy.apply(this, arguments)
	},
	setMap: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), this.div = document.createElement("div"), this.div.className = "heatmap";
		var a = e.canvas,
			t = a.height,
			i = a.width;
		this.div.style.cssText = "height:" + t + "px;width:" + i + "px;";
		var n = 40;
		null != this.option && null != this.option.radius && (n = this.option.radius), this.heatmapInstance = h337.create({
			container: this.div,
			radius: n
		})
	},
	load: function() {
		var e = this.map.viewer;
		this.viewer = new GeoBeans.Envelope(e.xmin, e.ymin, e.xmax, e.ymax), this.drawLayer(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	registerClickEvent: function() {},
	unRegisterClickEvent: function() {},
	drawLayer: function() {
		if (null != this.features) {
			var e = new GeoBeans.BBoxFilter(this.featureType.geomFieldName, this.viewer),
				a = this.selectFeaturesByFilter(e, this.features),
				t = -1;
			null != this.baseLayerField && (t = this.featureType.getFieldIndex(this.baseLayerField));
			for (var i = null, n = null, s = null, l = null, r = null, h = null, u = [], o = 0; o < a.length; ++o) s = a[o], null != s && (l = s.geometry, null != l && (t == -1 ? (value = 1, h = value, r = value) : (values = s.values, value = values[t], h = null == h ? value : Math.min(h, value), r = null == r ? value : Math.max(r, value)), i = this.map.transformation.toScreenPoint(l.x, l.y), n = {
				x: i.x,
				y: i.y,
				value: value
			}, u.push(n)));
			var v = {
				max: r,
				min: h,
				data: u
			};
			this.heatmapInstance.setData(v), this.canvas = this.div.children[0]
		}
	}
});
GeoBeans.Layer.PieChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	baseLayerFields: null,
	initialize: function(e, t, i, s) {
		this.name = e, this.baseLayerName = t, this.baseLayerFields = i, this.option = s
	},
	setMap: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), e._addLegend(this)
	},
	load: function() {
		this.removeLegend(), this.addLegend(), this.visible ? this.showLegend() : this.hideLegend(), this.renderer.clearRect(), this.setTransformation(this.map.transformation), this.drawLayer(), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	drawLayer: function() {
		if (null != this.features) {
			var e = null,
				t = null,
				i = null,
				s = null,
				a = null,
				n = null,
				l = 80,
				o = [],
				r = 0,
				h = 0,
				d = !1,
				p = 1;
			null != this.option && (null != this.option.radius && (l = this.option.radius), null != this.option.colors && (o = this.option.colors), null != this.option.offsetX && (r = this.option.offsetX), null != this.option.offsetY && (h = this.option.offsetY), null != this.option.showLabel && (d = this.option.showLabel), null != this.option.opacity && (p = this.option.opacity)), this.renderer.save(), this.renderer.setGlobalAlpha(p);
			for (var u = 0; u < this.features.length; ++u) if (e = this.features[u], null != e && (geometry = e.geometry, null != geometry && (geometry.type == GeoBeans.Geometry.Type.POINT ? a = geometry : geometry.type != GeoBeans.Geometry.Type.POLYGON && geometry.type != GeoBeans.Geometry.Type.MULTIPOLYGON || (a = geometry.getCentroid()), null != a && (t = e.values, null != t)))) {
				var c = [],
					y = document.createElement("canvas"),
					m = y.getContext("2d");
				m.font = "12px Arial, Verdana, sans-seri";
				for (var f = null, g = 0; g < this.baseLayerFields.length; ++g) if (s = this.baseLayerFields[g], null != s) {
					var v = this.featureType.getFieldIndex(s);
					if (v != -1) {
						i = t[v];
						var L = new Object;
						L.name = i, L.value = [parseFloat(i)], c.push(L);
						var b = m.measureText(i).width;
						f = null == f ? b : f > b ? f : b
					}
				}
				var n = {
					series: [{
						type: "pie",
						radius: this.option.radius + "px",
						center: ["50%", "50%"],
						data: c,
						itemStyle: {
							normal: {
								label: {
									show: this.option.showLabel,
									position: "outer"
								},
								labelLine: {
									show: this.option.showLabel,
									length: 0
								}
							}
						}
					}],
					animation: !1,
					calculable: !1,
					color: o
				},
					x = 2 * this.option.radius + 2 * f + 52,
					w = 2 * this.option.radius + 40,
					G = "pie_chart_" + this.name + u,
					I = "<div class='chart-div' style='height: " + w + "px; width:" + x + "px' id='" + G + "'></div>";
				this.map.mapDiv.append(I);
				var B = echarts.init(document.getElementById(G));
				B.setOption(n);
				var F = $("#" + G).find("canvas").first(),
					C = F.width(),
					O = F.height(),
					T = a.x,
					D = a.y,
					E = this.map.transformation.toScreenPoint(T, D),
					P = E.x - x / 2 + r,
					_ = E.y - w / 2 - h;
				this.renderer.drawImage(F[0], P, _, C, O), B.dispose()
			}
			var N = "pie_chart_" + this.name;
			$("*[id*='" + N + "']").remove(), this.renderer.restore()
		}
	},
	registerClickEvent: function() {},
	unRegisterClickEvent: function() {},
	addLegend: function() {
		if (null != this.option) {
			var e = 0;
			if (0 == this.legendIndex) e = 10;
			else {
				var t = this.legendIndex - 1,
					i = this.map.mapDiv.find(".chart-legend[lindex='" + t + "']");
				if (null != i) {
					var s = i.css("left"),
						a = i.css("width");
					s = parseInt(s.replace("px", "")), a = parseInt(a.replace("px", "")), e = s + a + 5
				}
			}
			var n = "<div class='chart-legend' id='" + this.name + "' style='left:" + e + "px' lindex='" + this.legendIndex + "'>";
			n += "<div class='chart-legend-title'><h5>" + this.name + "</h5></div>";
			for (var l = null, o = null, r = this.option.colors, h = 0; h < this.baseLayerFields.length; ++h) l = this.baseLayerFields[h], null != l && (o = r[h], n += "<div>\t<span class='chart-legend-symbol' style='background-color:" + o + "'></span>\t<span class='chart-legend-label'>" + l + "</span></div>");
			n += "</div>", this.map.mapDiv.append(n)
		}
	}
});
GeoBeans.Layer.RangeChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	initialize: function(e, t, o, a) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments)
	},
	setMap: function(e) {
		GeoBeans.Layer.FeatureLayer.prototype.setMap.apply(this, arguments);
		var t = this.getFeatures();
		this.features = t, this.style = this.getStyle()
	},
	destroy: function() {
		GeoBeans.Layer.ChartLayer.prototype.destroy.apply(this, arguments), this.unRegisterClickEvent()
	},
	getStyle: function() {
		if (null == this.features || null == this.option) return null;
		var e = this.getMinMaxValue();
		if (null == e) return null;
		for (var t = new GeoBeans.ColorRangeMap(this.option.startColor, this.option.endColor, e.min, e.max), o = new GeoBeans.Style.FeatureStyle, a = this.featureType.getFieldIndex(this.baseLayerField), r = this.features.length, i = 0; i < r; ++i) {
			var n = this.features[i];
			if (null != n) {
				var l = n.values;
				if (null != l) {
					var s = l[a];
					console.log(s);
					var y = new GeoBeans.Symbolizer.PolygonSymbolizer,
						p = null;
					null == s ? (p = new GeoBeans.Color, p.setByHex("#ffffff", 1)) : (s = parseFloat(s), p = t.getValue(s)), null != this.option.opacity ? p.setOpacity(this.option.opacity) : p.setOpacity(1), y.fill.color = p, console.log(p.getRgba());
					var u = this.option.borderWidth;
					0 == u ? y.stroke = null : (p = new GeoBeans.Color, null != this.option.border && p.setByHex(this.option.border, 1), null != this.option.borderOpacity ? p.setOpacity(this.option.borderOpacity) : p.setOpacity(1), y.stroke.color = p, y.stroke.width = this.option.borderWidth);
					var h = new GeoBeans.IDFilter;
					h.addID(n.fid);
					var p = new GeoBeans.Color,
						f = new GeoBeans.Fill;
					f.color = p;
					var d = new GeoBeans.Rule;
					d.filter = h, d.name = s, d.symbolizer = y, o.addRule(d)
				}
			}
		}
		return o
	}
});
GeoBeans.Layer.SymbolChartLayer = GeoBeans.Class(GeoBeans.Layer.ChartLayer, {
	levelMap: null,
	legendPadding: 4,
	maxSymbolRadius: 30,
	initialize: function(e, t, i, l) {
		GeoBeans.Layer.ChartLayer.prototype.initialize.apply(this, arguments)
	},
	destroy: function() {
		GeoBeans.Layer.ChartLayer.prototype.destroy.apply(this, arguments), this.unRegisterClickEvent()
	},
	setMap: function(e) {
		GeoBeans.Layer.ChartLayer.prototype.setMap.apply(this, arguments), e._addLegend(this), this.minMax = this.getMinMaxValue(), this.clickCanvas = document.createElement("canvas"), this.clickCanvas.width = this.canvas.width, this.clickCanvas.height = this.canvas.height, this.clickRenderer = new GeoBeans.Renderer(this.clickCanvas)
	},
	load: function() {
		this.renderer.clearRect(), this.drawLayer(), this.visible ? (this.removeLegend(), this.addLegend(), this.showLegend()) : (this.removeLegend(), this.hideLegend()), this.flag = GeoBeans.Layer.Flag.LOADED
	},
	getSymbolizer: function() {
		var e = new GeoBeans.Symbolizer.PolygonSymbolizer,
			t = this.option.color;
		null != t && e.fill.color.setByHex(t, 1);
		var i = this.option.opacity;
		null != i ? e.fill.color.setOpacity(i) : e.fill.color.setOpacity(1);
		var l = this.option.borderWidth;
		return 0 == l ? e.stroke = null : (t = new GeoBeans.Color, null != this.option.border && t.setByHex(this.option.border, 1), null != this.option.borderOpacity ? t.setOpacity(this.option.borderOpacity) : t.setOpacity(1), e.stroke.color = t, null != l && (e.stroke.width = this.option.borderWidth)), e
	},
	drawLayer: function() {
		if (null != this.option) {
			var e = this.option.byLevel;
			e ? this.drawLayerByLevel() : this.drawLayerByValue(), this.drawClickLayer()
		}
	},
	drawLayerByLevel: function() {
		if (null != this.option) {
			var e = this.option.level,
				t = this.minMax.min,
				i = this.minMax.max,
				l = this.option.maxsize,
				a = (this.baseLayerField, this.featureType),
				n = a.getFieldIndex(this.baseLayerField),
				s = this.getSymbolizer();
			this.renderer.setSymbolizer(s);
			var r = null,
				o = null,
				h = null,
				d = null,
				u = null,
				c = null,
				y = null,
				m = this.getLevelMap(l, e, t, i);
			this.levelMap = m;
			for (var p = 0; p < this.features.length; ++p) if (r = this.features[p], null != r && (o = r.values, null != o && (h = o[n], null != h && (d = r.geometry, null != d && (d.type == GeoBeans.Geometry.Type.POINT ? y = d : d.type != GeoBeans.Geometry.Type.POLYGON && d.type != GeoBeans.Geometry.Type.MULTIPOLYGON || (y = d.getCentroid()), null != y))))) {
				u = this.getRadiusByLevelMap(parseFloat(h), m);
				var v = this.map.transformation.toScreenPoint(y.x, y.y),
					g = new GeoBeans.Geometry.Point(v.x + u, v.y),
					f = this.map.transformation.toMapPoint(g.x, g.y);
				radius_m = f.x - y.x, c = new GeoBeans.Geometry.Circle(y, radius_m), r.circle = c, this.renderer.drawGeometry(c, s, this.map.transformation)
			}
		}
	},
	drawLayerByValue: function() {
		var e = (this.minMax.min, this.minMax.max),
			t = (this.baseLayerField, this.featureType),
			i = t.getFieldIndex(this.baseLayerField),
			l = this.getSymbolizer();
		this.renderer.setSymbolizer(l);
		for (var a = null, n = null, s = null, r = null, o = null, h = null, d = null, u = 0; u < this.features.length; ++u) if (a = this.features[u], null != a && (n = a.values, null != n && (s = n[i], null != s && (r = a.geometry, null != r && (r.type == GeoBeans.Geometry.Type.POINT ? d = r : r.type != GeoBeans.Geometry.Type.POLYGON && r.type != GeoBeans.Geometry.Type.MULTIPOLYGON || (d = r.getCentroid()), null != d))))) {
			o = parseFloat(s) / e * this.option.maxsize;
			var c = this.map.transformation.toScreenPoint(d.x, d.y),
				y = new GeoBeans.Geometry.Point(c.x + o, c.y),
				m = this.map.transformation.toMapPoint(y.x, y.y);
			radius_m = m.x - d.x, h = new GeoBeans.Geometry.Circle(d, radius_m), a.circle = h, this.renderer.drawGeometry(h, l, this.map.transformation)
		}
	},
	getLevelMap: function(e, t, i, l) {
		if (null != e && null != t && null != i && null != l) {
			for (var a = (l - i) / t, n = [], s = 0; s < t; ++s) {
				var r = i + s * a,
					o = i + (s + 1) * a,
					h = Math.pow(1.2, s + 1 - t) * e,
					d = {
						min: r,
						max: o,
						radius: h
					};
				n.push(d)
			}
			return n
		}
	},
	getRadiusByLevelMap: function(e, t) {
		if (null == e || null == t) return null;
		for (var i = null, l = null, a = null, n = 0; n < t.length; ++n) if (i = t[n], null != i) {
			if (l = i.min, a = i.max, 0 == n && e == l) return i.radius;
			if (l < e && a >= e) return i.radius
		}
		return null
	},
	addLegend: function() {
		if (null != this.option) {
			var e = this.option.byLevel;
			e ? this.addLegendByLevel() : this.addLegendByValue()
		}
	},
	addLegendByLevel: function() {
		if (null != this.option) {
			var e = this.option.maxsize,
				t = (this.option.level, 2 * this.maxSymbolRadius + 4),
				i = this.getLegendCanvasHeightByLevel(this.levelMap, this.maxSymbolRadius, e);
			if (null != i) {
				var l = (this.map.mapDiv.find(".chart-legend"), 0);
				if (0 == this.legendIndex) l = 10;
				else {
					var a = this.legendIndex - 1,
						n = this.map.mapDiv.find(".chart-legend[lindex='" + a + "']"),
						s = n.css("left"),
						r = n.css("width");
					s = parseInt(s.replace("px", "")), r = parseInt(r.replace("px", "")), l = s + r + 5
				}
				var o = "<div class='chart-legend chart-symbol-legend' id='" + this.name + "' style='left:" + l + "px' lindex='" + this.legendIndex + "'>";
				o += "<div class='chart-legend-title'<h5>" + this.name + "</h5></div>", o += "<div class='chart-legend-canvas'><canvas width='" + t + "' height='" + i + "'></canvas></div>", o += "<div class='chart-legend-value' style='font-size:12px;ling-height:12px'></div>", o += "</div>", this.map.mapDiv.append(o);
				var h = "",
					d = this.map.mapDiv.find("#" + this.name + " canvas"),
					u = new GeoBeans.Renderer(d[0]),
					c = this.getSymbolizer();
				u.setSymbolizer(c);
				for (var y = u.context, m = 0, p = null, v = null, g = null, f = null, x = null, L = null, b = 0, G = null, B = 0; B < this.levelMap.length; ++B) if (p = this.levelMap[B], null != p) {
					f = p.min, x = p.max, f = f.toFixed(2), x = x.toFixed(2), L = f + "~" + x, v = p.radius, g = v / e * this.maxSymbolRadius, m += g, m = Math.ceil(m), null == G && (G = -8.495), b = m - G - 16.99, G = m, h += "<div class='chart-legend-label' style='padding-top:" + b + "px'>" + L + "</div>";
					var k = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, m);
					m += g + this.legendPadding, m = Math.ceil(m), y.beginPath(), y.arc(k.x, k.y, g, 0, 2 * Math.PI, !0), null != c.fill && y.fill(), null != c.stroke && y.stroke(), y.closePath()
				}
				this.map.mapDiv.find("#" + this.name + ".chart-legend .chart-legend-value").html(h)
			}
		}
	},
	getLegendCanvasHeightByLevel: function(e, t, i) {
		if (null == e || null == t || null == i) return null;
		for (var l = 0, a = null, n = null, s = e.length - 1; s >= 0; --s) if (a = e[s], null != a) {
			n = a.radius;
			var r = n / i * t;
			l += 2 * r + this.legendPadding
		}
		return l += 4, l = Math.ceil(l)
	},
	addLegendByValue: function() {
		if (null != this.option) {
			var e = this.minMax;
			if (null != e) {
				var t = e.min,
					i = e.max,
					l = (this.option.maxsize, t / i * this.maxSymbolRadius);
				l < 0 && (l = this.maxSymbolRadius / 10);
				var a = l;
				l < 8.5 && (a = 8.5);
				var n = 2 * this.maxSymbolRadius + 4,
					s = 2 * (this.maxSymbolRadius + a) + this.legendPadding + 4,
					r = (this.map.mapDiv.find(".chart-legend"), 0);
				if (0 == this.legendIndex) r = 10;
				else {
					var o = this.legendIndex - 1,
						h = this.map.mapDiv.find(".chart-legend[lindex='" + o + "']"),
						d = h.css("left"),
						u = h.css("width");
					d = parseInt(d.replace("px", "")), u = parseInt(u.replace("px", "")), r = d + u + 5
				}
				var c = "<div class='chart-legend chart-symbol-legend' id='" + this.name + "' style='left:" + r + "px' lindex='" + this.legendIndex + "'>";
				c += "<div class='chart-legend-title'><h5>" + this.name + "</h5></div>", c += "<div class='chart-legend-canvas'><canvas width='" + n + "' height='" + s + "'></canvas></div>", c += "<div class='chart-legend-value' style='font-size:12px;ling-height:12px'></div>", c += "</div>", this.map.mapDiv.append(c);
				var y = this.map.mapDiv.find("#" + this.name + " canvas"),
					m = new GeoBeans.Renderer(y[0]),
					p = this.getSymbolizer();
				m.setSymbolizer(p);
				var v = m.context,
					g = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, a);
				v.beginPath(), v.arc(g.x, g.y, l, 0, 2 * Math.PI, !0), null != p.fill && v.fill(), null != p.stroke && v.stroke(), v.closePath(), v.beginPath();
				var f = this.maxSymbolRadius + 2 * a + this.legendPadding,
					x = new GeoBeans.Geometry.Point(this.maxSymbolRadius + 2, f);
				v.arc(x.x, x.y, this.maxSymbolRadius, 0, 2 * Math.PI, !0), null != p.fill && v.fill(), null != p.stroke && v.stroke(), v.closePath();
				var L = "",
					b = a - 8.5,
					G = x.y - g.y - 16.99;
				console.log(b), console.log(G), L += "<div class='chart-legend-label' style='padding-top:" + b + "px'>" + t + "</div>", L += "<div class='chart-legend-label' style='padding-top:" + G + "px'>" + i + "</div>", this.map.mapDiv.find("#" + this.name + ".chart-legend .chart-legend-value").html(L)
			}
		}
	},
	registerClickEvent: function(e, t) {
		var i = this.map,
			l = this;
		null != e && (this.clickStyle = e), this.clickEvent = function(e) {
			console.log("click up");
			var a = l.map.controls.find(GeoBeans.Control.Type.DRAG_MAP),
				n = l.map.controls.get(a);
			if (n.draging) return void console.log("draging");
			l.clickRenderer.clearRect(), l.map.drawLayersAll();
			var s = i.transformation.toMapPoint(e.layerX, e.layerY);
			l.clickHit(s.x, s.y, t)
		}, i.canvas.addEventListener("mouseup", this.clickEvent)
	},
	clickHit: function(e, t, i) {
		if (this.map.closeInfoWindow(), null == this.features) return void(null != i && i(null));
		var l = [],
			a = 0,
			n = null,
			s = null,
			r = this.features.length;
		for (a = 0; a < r; a++) n = this.features[a], s = n.circle, null != s && s.hit(e, t, this.map.tolerance) && l.push(n);
		if (0 == l.length) return this.clickFeature = null, void(null != i && i(null));
		for (var o = l[0], h = o.circle, d = this.getDistance(e, t, h), a = 1; a < l.length; ++a) {
			var n = l[a],
				s = n.circle,
				u = this.getDistance(e, t, s);
			u < d && (o = n)
		}
		null != i && (this.clickFeature = o, this.map.drawLayersAll(), i(o, e, t))
	},
	drawClickLayer: function() {
		if (this.clickRenderer.clearRect(), null != this.clickFeature) {
			var e = this.clickStyle;
			if (null == e && (e = this.getDefaultStyle()), null != e) {
				var t = e.rules;
				if (0 != t.length) for (var i = 0; i < t.length; i++) {
					var l = t[i],
						a = this.selectFeaturesByFilter(l.filter, [this.clickFeature]);
					null != l.symbolizer && this.drawClickFeatures(a, l.symbolizer), null != l.textSymbolizer && this.labelClickFeatures(a, l.textSymbolizer)
				}
			}
		}
	},
	drawClickFeatures: function(e, t) {
		if (null != e) {
			this.clickRenderer.save(), this.clickRenderer.setSymbolizer(t);
			for (var i = 0, l = e.length; i < l; i++) feature = e[i], null != t && "undefined" != t && this.clickRenderer.drawGeometry(feature.circle, t, this.map.transformation);
			this.clickRenderer.restore()
		}
	}
});
GeoBeans.Layer.AMapLayer = GeoBeans.Class(GeoBeans.Layer.TileLayer, {
	AMP_URL: "/appmaptile?lang=zh_cn&size=1&scale=1&style=8",
	IMG_WIDTH: 256,
	IMG_HEIGHT: 256,
	MIN_ZOOM_LEVEL: 1,
	MAX_ZOOM_LEVEL: 18,
	FULL_EXTENT: {
		xmin: -20037508.3427892,
		ymin: -20037508.3427892,
		xmax: 20037508.3427892,
		ymax: 20037508.3427892
	},
	RESOLUTIONS: [78271.51696402031, 39135.75848201016, 19567.87924100508, 9783.939620502539, 4891.96981025127, 2445.984905125635, 1222.992452562817, 611.4962262814087, 305.7481131407043, 152.8740565703522, 76.43702828517608, 38.21851414258804, 19.10925707129402, 9.554628535647009, 4.777314267823505, 2.388657133911752, 1.194328566955876, .5971642834779382],
	resolution: null,
	rows: null,
	cols: null,
	offset_x: 0,
	offset_y: 0,
	lrow: 0,
	urow: 0,
	lcol: 0,
	rcol: 0,
	initialize: function(t, i) {
		GeoBeans.Layer.TileLayer.prototype.initialize.apply(this, arguments)
	},
	destory: function() {
		GeoBeans.Layer.TileLayer.prototype.destroy.apply(this, arguments)
	},
	computeTileBound: function() {
		var t = this.map,
			i = (t.level, t.resolution),
			e = i * this.IMG_WIDTH,
			a = this.getValidView(),
			s = Math.floor((a.xmin - this.FULL_EXTENT.xmin) / e),
			l = Math.ceil((a.xmax - this.FULL_EXTENT.xmin) / e),
			r = Math.floor((this.FULL_EXTENT.ymax - a.ymax) / e),
			o = Math.ceil((this.FULL_EXTENT.ymax - a.ymin) / e);
		return {
			rmin: r,
			rmax: o,
			cmin: s,
			cmax: l
		}
	},
	updateTileCache: function(t) {
		var i, e, a, s, l = t.rmin,
			r = t.rmax,
			o = t.cmin,
			n = t.cmax,
			h = null,
			c = this.map.level;
		for (a = l; a < r; a++) for (s = o; s < n; s++) i = "x=" + s + "&y=" + a + "&z=" + c, e = this.AMP_URL + "&" + i, null == this.cache.getTile(e) && (h = new GeoBeans.Tile(this.map, e, this, s, a, c, 0, 0), this.cache.putTile(h))
	},
	draw: function() {
		var t = this.computeTileBound();
		this.updateTileCache(t);
		var i = t.rmin,
			e = t.rmax,
			a = t.cmin,
			s = t.cmax,
			l = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		l.x = Math.floor(l.x + .5), l.y = Math.floor(l.y + .5);
		var r, o, n, h, c, m = this.IMG_WIDTH * this.scale,
			T = this.map.level;
		for (o = l.y + i * m, n = i; n < e; n++) {
			for (r = l.x + a * m, h = a; h < s; h++) tid = this.getTileID(n, h, T), turl = this.AMP_URL + "&" + tid, c = this.cache.getTile(turl), null != c && c.draw(r, o, m, m), r += m;
			o += m
		}
	},
	drawCache: function() {
		var t = this.computeTileBound(),
			i = t.rmin,
			e = t.rmax,
			a = t.cmin,
			s = t.cmax,
			l = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		l.x = Math.floor(l.x + .5), l.y = Math.floor(l.y + .5);
		var r, o, n, h, c, m = this.IMG_WIDTH * this.scale,
			T = this.map.level;
		for (o = l.y + i * m, n = i; n < e; n++) {
			for (r = l.x + a * m, h = a; h < s; h++) tid = this.getTileID(n, h, T), turl = this.AMP_URL + "&" + tid, c = this.cache.getTile(turl), null != c && c.draw(r, o, m, m), r += m;
			o += m
		}
	},
	preDraw: function() {
		var t = this.computeTileBound();
		this.updateTileCache(t);
		var i = t.rmin,
			e = t.rmax,
			a = t.cmin,
			s = t.cmax,
			l = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		l.x = Math.floor(l.x + .5), l.y = Math.floor(l.y + .5);
		var r, o, n, h, c, m = this.IMG_WIDTH * this.scale;
		this.tiles = [];
		var T = this.map.level;
		for (o = l.y + i * m, n = i; n < e; n++) {
			for (r = l.x + a * m, h = a; h < s; h++) {
				tid = this.getTileID(n, h, T), turl = this.AMP_URL + "&" + tid, c = this.cache.getTile(turl);
				var f = new Object;
				f.tile = c, f.img_size = m, f.x = r, f.y = o, this.tiles.push(f), r += m
			}
			o += m
		}
	},
	loadingTiles: function(t) {
		for (var i = 0; i < this.tiles.length; ++i) {
			var e = this.tiles[i].tile;
			if (null != e) if (e.state != GeoBeans.TileState.LOADED) e.loading(t, this.loadTileCallback, this.tiles, i), this.state = GeoBeans.TileLayerState.LOADING;
			else if (e.state == GeoBeans.TileState.LOADED) {
				var a = this.tiles[i],
					s = a.img_size,
					l = a.x,
					r = a.y;
				e.draw(l, r, s, s)
			}
		}
		for (var i = 0; i < this.tiles.length; ++i) {
			var o = this.tiles[i];
			if (o.tile.state != GeoBeans.TileState.LOADED) return
		}
		t(this.map)
	},
	loadTileCallback: function(t, i, e, a) {
		var s = e[a],
			l = s.img_size,
			r = s.x,
			o = s.y;
		t.draw(r, o, l, l);
		for (var n = 0; n < e.length; ++n) {
			var h = e[n];
			if (h.tile.state != GeoBeans.TileState.LOADED) return
		}
		i(t.map)
	},
	getRows: function() {},
	getCols: function() {},
	computeExtent: function() {},
	computeCenterTileOffset: function() {
		var t = this.map.center,
			i = (t.x - this.ORIGIN.x, t.y - this.ORIGIN.y, Math.floor((t.x - this.ORIGIN.x) / this.resolution)),
			e = Math.floor((t.y - this.ORIGIN.y) / this.resolution);
		offset_x = i, offset_y = e
	},
	getTileID: function(t, i, e) {
		return "x=" + i + "&y=" + t + "&z=" + e
	},
	isCached: function(t) {
		for (var i in this.tileCache) {
			var e = this.tileCache[i];
			if (e.url == t) return !0
		}
		return !1
	}
});
GeoBeans.Layer.BaiduLayer = GeoBeans.Class(GeoBeans.Layer.TileLayer, {
	BMP_URL: "/bmap/tile/?qt=tile&scaler=1&styles=pl",
	ORIGIN: {
		x: 0,
		y: 0
	},
	FULL_EXTENT: {
		xmin: -33554432,
		ymin: -33554432,
		xmax: 33554432,
		ymax: 33554432
	},
	IMG_WIDTH: 256,
	IMG_HEIGHT: 256,
	MIN_ZOOM_LEVEL: 3,
	MAX_ZOOM_LEVEL: 19,
	RESOLUTIONS: [131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5],
	initialize: function(i) {
		GeoBeans.Layer.TileLayer.prototype.initialize.apply(this, arguments)
	},
	destory: function() {
		GeoBeans.Layer.TileLayerLayer.prototype.destroy.apply(this, arguments)
	},
	computeTileBound: function() {
		var i = this.map,
			t = (i.level, i.resolution),
			e = t * this.IMG_WIDTH,
			a = this.getValidView(),
			l = Math.floor((a.xmin - 0) / e),
			s = Math.ceil((a.xmax - 0) / e),
			r = Math.floor(a.ymin / e),
			o = Math.ceil(a.ymax / e);
		return {
			rmin: r,
			rmax: o,
			cmin: l,
			cmax: s
		}
	},
	updateTileCache: function(i) {
		var t, e, a, l, s = i.rmin,
			r = i.rmax,
			o = i.cmin,
			n = i.cmax,
			h = null,
			m = this.map.level;
		for (a = s; a < r; a++) for (l = o; l < n; l++) t = "x=" + l + "&y=" + a + "&z=" + m, e = this.BMP_URL + "&" + t, null == this.cache.getTile(e) && (h = new GeoBeans.Tile(this.map, e, this, l, a, m, 0, 0), this.cache.putTile(h))
	},
	draw: function() {
		var i = this.computeTileBound();
		this.updateTileCache(i);
		var t = i.rmin,
			e = i.rmax,
			a = i.cmin,
			l = i.cmax,
			s = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		s.x = Math.floor(s.x + .5), s.y = Math.floor(s.y + .5);
		var r, o, n, h, m, T = this.IMG_WIDTH * this.scale,
			c = this.map.level;
		for (o = s.y + t * T, n = t; n < e; n++) {
			for (r = s.x + a * T, h = a; h < l; h++) tid = this.getTileID(n, h, c), turl = this.BMP_URL + "&" + tid, m = this.cache.getTile(turl), null != m && m.draw(r, o, T, T), r += T;
			o += T
		}
	},
	drawCache: function() {
		var i = this.computeTileBound(),
			t = i.rmin,
			e = i.rmax,
			a = i.cmin,
			l = i.cmax,
			s = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		s.x = Math.floor(s.x + .5), s.y = Math.floor(s.y + .5);
		var r, o, n, h, m, T = this.IMG_WIDTH * this.scale,
			c = this.map.level;
		for (o = s.y + t * T, n = t; n < e; n++) {
			for (r = s.x + a * T, h = a; h < l; h++) tid = this.getTileID(n, h, c), turl = this.BMP_URL + "&" + tid, m = this.cache.getTile(turl), null != m && m.draw(r, o, T, T), r += T;
			o += T
		}
	},
	preDraw: function() {
		var i = this.computeTileBound();
		this.updateTileCache(i);
		var t = i.rmin,
			e = i.rmax,
			a = i.cmin,
			l = i.cmax,
			s = this.map.resolution,
			r = s * this.IMG_WIDTH,
			o = Math.floor(this.FULL_EXTENT.ymax / r),
			n = Math.floor(this.FULL_EXTENT.xmin / r),
			h = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		h.x = Math.floor(h.x + .5), h.y = Math.floor(h.y + .5);
		var m, T, c, x, y, L = this.IMG_WIDTH * this.scale;
		this.tiles = [];
		var u = this.map.level;
		for (T = h.y + (o - e) * L, c = e - 1; c >= t; c--) {
			for (m = h.x + (a - n) * L, x = a; x < l; x++) {
				tid = this.getTileID(c, x, u), turl = this.BMP_URL + "&" + tid, y = this.cache.getTile(turl);
				var f = new Object;
				f.tile = y, f.img_size = L, f.x = m, f.y = T, this.tiles.push(f), console.log(tid + ":x:" + f.x + ",y:" + f.y), m += L
			}
			T += L
		}
	},
	loadingTiles: function(i) {
		for (var t = 0; t < this.tiles.length; ++t) {
			var e = this.tiles[t].tile;
			if (null != e) if (e.state != GeoBeans.TileState.LOADED) e.loading(i, this.loadTileCallback, this.tiles, t), this.state = GeoBeans.TileLayerState.LOADING;
			else if (e.state == GeoBeans.TileState.LOADED) {
				var a = this.tiles[t],
					l = a.img_size,
					s = a.x,
					r = a.y;
				e.draw(s, r, l, l)
			}
		}
	},
	loadTileCallback: function(i, t, e, a) {
		var l = e[a],
			s = l.img_size,
			r = l.x,
			o = l.y;
		i.draw(r, o, s, s)
	},
	getTileID: function(i, t, e) {
		return "x=" + t + "&y=" + i + "&z=" + e
	}
});
GeoBeans.Layer.PGISLayer = GeoBeans.Class(GeoBeans.Layer.TileLayer, {
	name: null,
	type: null,
	extent: null,
	format: null,
	tms: null,
	sourceName: null,
	IMG_WIDTH: 256,
	IMG_HEIGHT: 256,
	MIN_ZOOM_LEVEL: 2,
	MAX_ZOOM_LEVEL: 14,
	FULL_EXTENT: {
		xmin: -180,
		ymin: -90,
		xmax: 180,
		ymax: 90
	},
	RESOLUTIONS: [.703125, .3515625, .17578125, .087890625, .0439453125, .02197265625, .010986328125, .0054931640625, .00274658203125, .001373291015625, .0006866455078125, .00034332275390625, .000171661376953125, 858306884765625e-19, 4291534423828125e-20, 21457672119140625e-21, 10728836059570312e-21, 5364418029785156e-21, 2682209014892578e-21, 1341104507446289e-21],
	initialize: function(t, e, i) {
		GeoBeans.Layer.TileLayer.prototype.initialize.apply(this, arguments), null != i && (this.validExtent = i)
	},
	setExtent: function(t) {
		this.extent = t
	},
	getExtent: function() {
		return this.extent
	},
	setFormat: function(t) {
		this.format = t
	},
	getFormat: function() {
		return this.format
	},
	setTMS: function(t) {
		this.tms = t
	},
	getTMS: function() {
		return this.tms
	},
	load: function() {
		this.preDraw(), this.loadingTiles(this.map.drawBaseLayerCallback)
	},
	preDraw: function() {
		var t = this.map.level,
			e = this.getMaxLevel(),
			i = this.getMinLevel();
		if (t > e || t < i) return this.tiles = [], this.renderer.clearRect(), void(this.snap = null);
		this.renderer.clearRect();
		var a = this.computeTileBound();
		this.updateTileCache(a);
		var l = a.rmin,
			n = a.rmax,
			s = a.cmin,
			r = a.cmax,
			h = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		h.x = Math.floor(h.x + .5), h.y = Math.floor(h.y + .5);
		var o = this.IMG_WIDTH * this.imageScale,
			m = this.map.resolution,
			u = this.getResolutionByLevel(this.map.level);
		m != u && (o = this.IMG_WIDTH * this.imageScale * u / m);
		var x, L, c, T, E;
		this.map.transformation.toMapPoint(h.x, h.y);
		this.tiles = [];
		var t = this.map.level;
		for (L = h.y + l * o, console.log(L), c = l; c <= n; c++) {
			for (x = h.x + s * o, T = s; T <= r; T++) {
				tid = this.getTileID(c, T, t), turl = this.url + tid, E = this.cache.getTile(turl);
				var f = new Object;
				f.tile = E, f.img_size = o, f.x = x, f.y = L, this.tiles.push(f), x += o
			}
			L += o
		}
	},
	getValidView: function() {
		var t = this.map.viewer,
			e = null,
			i = null,
			a = null,
			l = null;
		return null != this.validExtent ? (e = Math.max(t.xmin, this.validExtent.xmin), i = Math.max(t.ymin, this.validExtent.ymin), a = Math.min(t.xmax, this.validExtent.xmax), l = Math.min(t.ymax, this.validExtent.ymax)) : (e = Math.max(t.xmin, this.FULL_EXTENT.xmin), i = Math.max(t.ymin, this.FULL_EXTENT.ymin), a = Math.min(t.xmax, this.FULL_EXTENT.xmax), l = Math.min(t.ymax, this.FULL_EXTENT.ymax)), new GeoBeans.Envelope(e, i, a, l)
	},
	computeTileBound: function() {
		var t = this.map,
			e = t.level,
			i = this.getResolutionByLevel(e),
			a = i * this.IMG_WIDTH;
		console.log(a);
		var l = this.getValidView();
		console.log(l);
		var n = Math.floor((l.xmin - this.FULL_EXTENT.xmin) / a),
			s = Math.ceil((l.xmax - this.FULL_EXTENT.xmin) / a),
			r = Math.floor((this.FULL_EXTENT.ymax - l.ymax) / a),
			h = Math.ceil((this.FULL_EXTENT.ymax - l.ymin) / a);
		return console.log(n + "," + s + "," + r + "," + h), {
			rmin: r,
			rmax: h,
			cmin: n,
			cmax: s
		}
	},
	updateTileCache: function(t) {
		var e, i, a, l, n = t.rmin,
			s = t.rmax,
			r = t.cmin,
			h = t.cmax,
			o = null,
			m = this.map.level;
		for (a = n; a <= s; a++) for (l = r; l <= h; l++) e = this.getTileID(a, l, m), i = this.url + e, null == this.cache.getTile(i) && (o = new GeoBeans.Tile(this.map, i, this, a, l, m, 0, 0), this.cache.putTile(o))
	},
	getTileID: function(t, e, i) {
		var a = "?Service=getImage&Type=RGB&ZoomOffset=0&Col=" + e + "&Row=" + t + "&Zoom=" + i + "&V=1.0.0";
		return a
	},
	getUrl: function() {
		return "typeName:" + this.typeName + ";format:" + this.format + ";tms:" + this.tms + ";extent:" + this.extent.toString() + ";sourceName:" + this.sourceName + ";url:" + this.url + ";startLevel:" + this.MIN_ZOOM_LEVEL + ";endLevel:" + this.MAX_ZOOM_LEVEL
	},
	loadingTiles: function(t) {
		for (var e = 0; e < this.tiles.length; ++e) {
			var i = this.tiles[e].tile;
			if (null != i) if (i.state != GeoBeans.TileState.LOADED) i.loading(t, this.loadTileCallback, this.tiles, e), this.state = GeoBeans.TileLayerState.LOADING, this.flag = GeoBeans.Layer.Flag.READY;
			else if (i.state == GeoBeans.TileState.LOADED) {
				var a = this.tiles[e],
					l = a.img_size,
					n = a.x,
					s = a.y;
				i.draw(n, s, l, l)
			}
		}
		for (var e = 0; e < this.tiles.length; ++e) {
			var r = this.tiles[e];
			if (r.tile.state != GeoBeans.TileState.LOADED) return
		}
		this.flag = GeoBeans.Layer.Flag.LOADED, t(this.map)
	},
	loadTileCallback: function(t, e, i, a) {
		var l = i[a],
			n = l.img_size,
			s = l.x,
			r = l.y;
		t.draw(s, r, n, n);
		for (var h = 0; h < i.length; ++h) {
			var o = i[h];
			if (o.tile.state != GeoBeans.TileState.LOADED) return
		}
		t.layer.flag = GeoBeans.Layer.Flag.LOADED, e(t.map)
	}
});
GeoBeans.Layer.QSLayer = GeoBeans.Class(GeoBeans.Layer.TileLayer, {
	AMP_URL: "/QuadServer/maprequest?services=world_image",
	IMG_WIDTH: 256,
	IMG_HEIGHT: 256,
	MIN_ZOOM_LEVEL: 2,
	MAX_ZOOM_LEVEL: 17,
	FULL_EXTENT: {
		xmin: -256,
		ymin: -256,
		xmax: 256,
		ymax: 256
	},
	RESOLUTIONS: [1, .5, .25, .125, .0625, .03125, .015625, .0078125, .00390625, .001953125, 976563e-9, 488281e-9, 244141e-9, 12207e-8, 6103515625e-14, 30517578125e-15, 152587890625e-16, 762939453125e-17, 3814697265625e-18, 19073486328125e-19],
	resolution: null,
	rows: null,
	cols: null,
	offset_x: 0,
	offset_y: 0,
	lrow: 0,
	urow: 0,
	lcol: 0,
	rcol: 0,
	initialize: function(e, i) {
		GeoBeans.Layer.TileLayer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Layer.TileLayer.Type.QS
	},
	destroy: function() {
		GeoBeans.Layer.TileLayer.prototype.destroy.apply(this, arguments)
	},
	updateTileCache: function(e) {
		var i, t, a, s, l = e.rmin,
			n = e.rmax,
			r = e.cmin,
			o = e.cmax,
			h = null,
			c = this.map.level;
		for (a = l; a < n; a++) for (s = r; s < o; s++) i = this.getTileID(a, s, c), t = this.url + "&" + i, null == this.cache.getTile(t) && (h = new GeoBeans.Tile(this.map, t, this, a, s, c, 0, 0), this.cache.putTile(h))
	},
	preDraw: function() {
		var e = this.map.level,
			i = this.getMaxLevel(),
			t = this.getMinLevel();
		if (e > i || e < t) return this.tiles = [], this.renderer.clearRect(), void(this.snap = null);
		var a = this.computeTileBound();
		this.updateTileCache(a);
		var s = a.rmin,
			l = a.rmax,
			n = a.cmin,
			r = a.cmax,
			o = this.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymin);
		o.x = Math.floor(o.x + .5), o.y = Math.floor(o.y + .5);
		var h = this.IMG_WIDTH * this.imageScale;
		if (this != this.map.baseLayer) {
			var c = this.map.resolution,
				m = this.getResolutionByLevel(this.map.level);
			c != m && (h = this.IMG_WIDTH * this.imageScale * m / c)
		}
		var u, T, y, f, L;
		this.tiles = [];
		var e = this.map.level;
		for (T = o.y - (s + 1) * h, y = s; y < l; y++) {
			for (u = o.x + n * h, f = n; f < r; f++) {
				tid = this.getTileID(y, f, e), turl = this.url + "&" + tid, L = this.cache.getTile(turl);
				var x = new Object;
				x.tile = L, x.img_size = h, x.x = u, x.y = T, this.tiles.push(x), u += h
			}
			T -= h
		}
	},
	loadingTiles: function(e) {
		for (var i = 0; i < this.tiles.length; ++i) {
			var t = this.tiles[i].tile;
			if (null != t) if (t.state != GeoBeans.TileState.LOADED) t.loading(e, this.loadTileCallback, this.tiles, i), this.state = GeoBeans.TileLayerState.LOADING;
			else if (t.state == GeoBeans.TileState.LOADED) {
				var a = this.tiles[i],
					s = a.img_size,
					l = a.x,
					n = a.y;
				t.draw(l, n, s, s)
			}
		}
	},
	loadTileCallback: function(e, i, t, a) {
		var s = t[a],
			l = s.img_size,
			n = s.x,
			r = s.y;
		e.draw(n, r, l, l)
	},
	draw: function() {
		for (var e = 0; e < this.tilesLoaded.length; ++e) {
			var i = this.tilesLoaded[e],
				t = i.tile,
				a = i.img_size,
				s = i.x,
				l = i.y;
			null != t && t.draw(s, l, a, a)
		}
	},
	drawCache: function() {
		var e = this.computeTileBound(),
			i = e.rmin,
			t = e.rmax,
			a = e.cmin,
			s = e.cmax,
			l = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymin);
		l.x = Math.floor(l.x + .5), l.y = Math.floor(l.y + .5);
		var n, r, o, h, c, m = this.IMG_WIDTH * this.scale,
			u = this.map.level;
		for (r = l.y - (i + 1) * m, o = i; o < t; o++) {
			for (n = l.x + a * m, h = a; h < s; h++) tid = this.getTileID(o, h, u), turl = this.url + "&" + tid, c = this.cache.getTile(turl), null != c && c.draw(n, r, m, m), n += m;
			r -= m
		}
	},
	getRows: function() {},
	getCols: function() {},
	computeExtent: function() {},
	computeCenterTileOffset: function() {
		var e = this.map.center,
			i = (e.x - this.ORIGIN.x, e.y - this.ORIGIN.y, Math.floor((e.x - this.ORIGIN.x) / this.resolution)),
			t = Math.floor((e.y - this.ORIGIN.y) / this.resolution);
		offset_x = i, offset_y = t
	},
	getTileID: function(e, i, t) {
		return "col=" + i + "&row=" + e + "&level=" + t
	},
	computeTileBound: function() {
		var e = this.map,
			i = e.level,
			t = this.getResolutionByLevel(i),
			a = t * this.IMG_WIDTH,
			s = this.getValidView(),
			l = Math.floor((s.xmin - this.FULL_EXTENT.xmin) / a),
			n = Math.ceil((s.xmax - this.FULL_EXTENT.xmin) / a),
			r = Math.floor((s.ymin - this.FULL_EXTENT.ymin) / a),
			o = Math.ceil((s.ymax - this.FULL_EXTENT.ymin) / a);
		return {
			rmin: r - 1,
			rmax: o + 1,
			cmin: l - 1,
			cmax: n + 1
		}
	},
	toScreenPoint: function(e, i) {
		var t = this.map.transformation,
			a = t.scale * (e - t.view_c.x) + t.win_cx,
			s = t.win_cy - t.scale * (i - t.view_c.y);
		return new GeoBeans.Geometry.Point(a, s)
	}
});
GeoBeans.Layer.WMTSLayer = GeoBeans.Class(GeoBeans.Layer.TileLayer, {
	name: null,
	type: null,
	extent: null,
	format: null,
	tms: null,
	sourceName: null,
	IMG_WIDTH: 180,
	IMG_HEIGHT: 180,
	MIN_ZOOM_LEVEL: 1,
	MAX_ZOOM_LEVEL: 10,
	RESOLUTIONS: [1, .5, .25, .125, .0625, .03125, .015625, .0078125, .00390625, .001953125, 976563e-9, 488281e-9, 244141e-9, 12207e-8, 6103515625e-14, 30517578125e-15, 152587890625e-16, 762939453125e-17, 3814697265625e-18, 19073486328125e-19],
	initialize: function(t, e, i, a, s, l, n) {
		GeoBeans.Layer.TileLayer.prototype.initialize.apply(this, arguments), this.typeName = i, this.extent = a, this.tms = s, this.format = l, this.FULL_EXTENT = {
			xmin: -180,
			ymin: -90,
			xmax: 180,
			ymax: 90
		}, this.scale = 1, this.sourceName = n, this.type = GeoBeans.Layer.TileLayer.Type.WMTS
	},
	setExtent: function(t) {
		this.extent = t
	},
	getExtent: function() {
		return this.extent
	},
	setFormat: function(t) {
		this.format = t
	},
	getFormat: function() {
		return this.format
	},
	setTMS: function(t) {
		this.tms = t
	},
	getTMS: function() {
		return this.tms
	},
	load: function() {
		this.preDraw(), this.loadingTiles(this.map.drawBaseLayerCallback)
	},
	preDraw: function() {
		this.renderer.clearRect();
		var t = this.computeTileBound();
		this.updateTileCache(t);
		var e = t.rmin,
			i = t.rmax,
			a = t.cmin,
			s = t.cmax,
			l = this.map.transformation.toScreenPoint(this.FULL_EXTENT.xmin, this.FULL_EXTENT.ymax);
		l.x = Math.floor(l.x + .5), l.y = Math.floor(l.y + .5);
		var n, r, h, o, m, T = this.IMG_WIDTH * this.scale;
		this.map.transformation.toMapPoint(l.x, l.y);
		this.tiles = [];
		var u = this.map.level;
		for (r = l.y - e * T, r = l.y + e * T, h = e; h <= i; h++) {
			for (n = l.x + a * T, o = a; o <= s; o++) {
				tid = this.getTileID(h, o, u), turl = this.url + tid, m = this.cache.getTile(turl);
				var L = new Object;
				L.tile = m, L.img_size = T, L.x = n, L.y = r, this.tiles.push(L), n += T
			}
			r += T
		}
	},
	computeTileBound: function() {
		var t = this.map,
			e = (t.level, t.resolution),
			i = e * this.IMG_WIDTH,
			a = this.getValidView(),
			s = Math.floor((a.xmin - this.FULL_EXTENT.xmin) / i),
			l = Math.ceil((a.xmax - this.FULL_EXTENT.xmin) / i),
			n = Math.floor((this.FULL_EXTENT.ymax - a.ymax) / i),
			r = Math.ceil((this.FULL_EXTENT.ymax - a.ymin) / i);
		return {
			rmin: n,
			rmax: r - 1,
			cmin: s,
			cmax: l - 1
		}
	},
	updateTileCache: function(t) {
		var e, i, a, s, l = t.rmin,
			n = t.rmax,
			r = t.cmin,
			h = t.cmax,
			o = null,
			m = this.map.level;
		for (a = l; a <= n; a++) for (s = r; s <= h; s++) e = this.getTileID(a, s, m), i = this.url + e, null == this.cache.getTile(i) && (o = new GeoBeans.Tile(this.map, i, this, a, s, m, 0, 0), this.cache.putTile(o))
	},
	getTileID: function(t, e, i) {
		var a = "?SERVICE=dbs&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + this.typeName + "&STYLE=Default&FORMAT=" + this.format + "&TILEMATRIXSET=" + this.tms + "&TILEMATRIX=" + this.tms + ":" + i + "&TILEROW=" + t + "&TILECOL=" + e + "&sourceName=" + this.sourceName;
		return a
	},
	getUrl: function() {
		return "typeName:" + this.typeName + ";format:" + this.format + ";tms:" + this.tms + ";extent:" + this.extent.toString() + ";sourceName:" + this.sourceName + ";url:" + this.url + ";startLevel:" + this.MIN_ZOOM_LEVEL + ";endLevel:" + this.MAX_ZOOM_LEVEL
	},
	loadingTiles: function(t) {
		for (var e = 0; e < this.tiles.length; ++e) {
			var i = this.tiles[e].tile;
			if (null != i) if (i.state != GeoBeans.TileState.LOADED) i.loading(t, this.loadTileCallback, this.tiles, e), this.state = GeoBeans.TileLayerState.LOADING, this.flag = GeoBeans.Layer.Flag.READY;
			else if (i.state == GeoBeans.TileState.LOADED) {
				var a = this.tiles[e],
					s = a.img_size,
					l = a.x,
					n = a.y;
				i.draw(l, n, s, s)
			}
		}
		for (var e = 0; e < this.tiles.length; ++e) {
			var r = this.tiles[e];
			if (r.tile.state != GeoBeans.TileState.LOADED) return
		}
		this.flag = GeoBeans.Layer.Flag.LOADED, t(this.map)
	},
	loadTileCallback: function(t, e, i, a) {
		var s = i[a],
			l = s.img_size,
			n = s.x,
			r = s.y;
		t.draw(n, r, l, l);
		for (var h = 0; h < i.length; ++h) {
			var o = i[h];
			if (o.tile.state != GeoBeans.TileState.LOADED) return
		}
		t.layer.flag = GeoBeans.Layer.Flag.LOADED, e(t.map)
	}
});
GeoBeans.Overlay.Circle = GeoBeans.Class(GeoBeans.Overlay, {
	type: GeoBeans.Overlay.Type.CIRCLE
});
GeoBeans.Overlay.Label = GeoBeans.Class(GeoBeans.Overlay, {
	type: GeoBeans.Overlay.Type.LABEL,
	label: null,
	text: null,
	initialize: function(e, t, l, i) {
		GeoBeans.Overlay.prototype.initialize.apply(this, arguments), this.text = i, null != this.symbolizer && (this.symbolizer.labelText = this.text);
		var a = new GeoBeans.PointLabel;
		a.geometry = this.geometry, a.textSymbolizer = this.symbolizer, a.text = this.text, this.label = a
	}
});
GeoBeans.Overlay.Marker = GeoBeans.Class(GeoBeans.Overlay, {
	image: null,
	type: GeoBeans.Overlay.Type.MARKER,
	infoWindow: null,
	initialize: function(e, i, a, n) {
		GeoBeans.Overlay.prototype.initialize.apply(this, arguments), this.infoWindow = n
	}
});
GeoBeans.Overlay.Polygon = GeoBeans.Class(GeoBeans.Overlay, {
	type: GeoBeans.Overlay.Type.POLYGON
});
GeoBeans.Overlay.Polyline = GeoBeans.Class(GeoBeans.Overlay, {
	type: GeoBeans.Overlay.Type.PLOYLINE
});
GeoBeans.PoiManager = GeoBeans.Class({
	server: null,
	service: "poi",
	version: "1.0.0",
	initialize: function(e) {
		this.server = "/poi/" + e + "/mgr"
	},
	getPoi: function(e, n, t, i, s) {
		if (null == e) return void(null != s && s("keyword is null"));
		var r = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=GetPoi";
		if ($.isArray(e)) {
			for (var a = "", l = 0; l < e.length; ++l) a += e[l], l < e.length - 1 && (a += ",");
			o += "&name=" + a
		} else o += "&name=" + e;
		null != n && (o += "&limit=" + n), null != t && (o += "&offset=" + t), null != i && i instanceof GeoBeans.Envelope && (o += "&extent=" + i.toString()), $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var t = r.parsGetPoi(e);
				null != s && s(t)
			},
			complete: function(e, n) {},
			error: function() {}
		})
	},
	parsGetPoi: function(e) {
		var n = [];
		return $(e).find("Pois>Poi").each(function() {
			var e = $(this).find("name").text(),
				t = $(this).find("lon").text(),
				i = $(this).find("lat").text(),
				s = $(this).find("address").text(),
				r = $(this).find("type").text(),
				o = {
					name: e,
					x: t,
					y: i,
					address: s,
					type: r
				};
			n.push(o)
		}), n
	}
});
GeoBeans.Raster = GeoBeans.Class({
	name: null,
	format: null,
	bands: null,
	width: null,
	height: null,
	extent: null,
	initialize: function(t, i, n, s, e, l, h) {
		this.name = t, this.format = i, this.bands = n, this.srid = s, this.width = e, this.height = l, this.extent = h
	}
});
GeoBeans.RasterDBManager = GeoBeans.Class({
	server: null,
	service: "rds",
	version: "1.0.0",
	currentPath: null,
	initialize: function(e) {
		this.server = e + "/mgr"
	},
	getList: function(e, r, t) {
		if (null == e || null == r) return void(null != t && t("invalid params"));
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=List&path=" + r + "&sourceName=" + e;
		n.currentPath = r, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = n.parseList(e);
				void 0 != t && t(s)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseList: function(e) {
		var r = this,
			t = [],
			n = $(e).find("Files");
		return n.children().each(function() {
			if ("File" == this.tagName) {
				var e = r.parseFile(this);
				t.push(e)
			} else if ("Folder" == this.tagName) {
				var n = r.parseFolder(this);
				t.push(n)
			}
		}), t
	},
	parseFile: function(e) {
		var r = $(e).attr("name"),
			t = $(e).attr("access_time"),
			n = $(e).attr("last_modified_time"),
			s = $(e).attr("size"),
			a = null;
		a = "/" == this.currentPath ? this.currentPath + r : this.currentPath + "/" + r;
		var i = new GeoBeans.File(this.currentPath, a, r, t, n, s);
		return i
	},
	parseFolder: function(e) {
		var r = $(e).attr("name"),
			t = $(e).attr("access_time"),
			n = $(e).attr("last_modified_time"),
			s = null;
		s = "/" == this.currentPath ? this.currentPath + r : this.currentPath + "/" + r;
		var a = new GeoBeans.Folder(this.currentPath, s, r, t, n);
		return a
	},
	addRaster: function(e, r, t, n, s) {
		if (null == e || null == r || null == t || null == n) return void(null != s && s("invalid params"));
		var a = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=AddRaster&sourceName=" + e + "&rasterName=" + r + "&rasterPath=" + t + "&filePath=" + n;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var t = a.parseAddRaster(e);
				void 0 != s && s(t)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseAddRaster: function(e) {
		var r = $(e).find("AddRaster").text();
		if ("success" == r.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	removeRaster: function(e, r, t, n) {
		if (null == e || null == r || null == t) return void(null != n && n("invalid params"));
		var s = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=RemoveRaster&sourceName=" + e + "&rasterName=" + r + "&path=" + t;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var t = s.parseRemoveRaster(e);
				void 0 != n && n(t)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseRemoveRaster: function(e) {
		var r = $(e).find("RemoveRaster").text();
		if ("success" == r.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	getRaster: function(e, r, t, n) {
		if (null == e || null == r || null == t) return void(null != n && n("invalid params"));
		var s = "service=" + this.service + "&version=" + this.version + "&request=GetRaster&sourceName=" + e + "&rasterName=" + r + "&Path=" + t;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				null != n && n(e)
			},
			complete: function(e, r) {},
			error: function(e) {}
		})
	},
	getRasterUrl: function(e, r, t) {
		if (null == e || null == r || null == t) return null;
		var n = this.server + "?service=" + this.service + "&version=" + this.version + "&request=GetRaster&sourceName=" + e + "&rasterName=" + r + "&Path=" + t;
		return n
	},
	describeRaster: function(e, r, t, n) {
		if (null == e || null == r || null == t) return void(null != n && n("invalid params"));
		var s = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=DescribeRaster&sourceName=" + e + "&rasterName=" + r + "&Path=" + t;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var t = s.parseDescribeRaster(e);
				null != n && n(t)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseDescribeRaster: function(e) {
		var r = $(e).find("Raster>Name").text(),
			t = $(e).find("Raster>Format").text(),
			n = $(e).find("Raster>Bands").text(),
			s = $(e).find("Raster>SRID").text(),
			a = $(e).find("Raster>Width").text(),
			i = $(e).find("Raster>Height").text(),
			u = null,
			l = null,
			o = null,
			c = null,
			v = $(e).find("Raster>Boundingbox>LowerLeft").text();
		if (null != v) {
			var d = v.split(" ");
			u = parseFloat(d[0]), l = parseFloat(d[1])
		}
		var f = $(e).find("Raster>Boundingbox>UpperRight").text();
		if (null != f) {
			var d = f.split(" ");
			o = parseFloat(d[0]), c = parseFloat(d[1])
		}
		var h = null;
		null != u && null != l && null != o && null != c && (h = new GeoBeans.Envelope(u, l, o, c));
		var m = null;
		return null != r && (m = new GeoBeans.Raster(r, t, n, s, a, i, h)), m
	},
	createFolder: function(e, r, t) {
		if (null == r || null == e) return void(null != t && t("params is invalid"));
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=CreateFolder&sourceName=" + e + "&path=" + r;
		n.currentPath = r, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = n.parseCreateFolder(e);
				void 0 != t && t(s)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseCreateFolder: function(e) {
		var r = $(e).find("CreateFolder").text();
		if ("success" == r.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	removeFolder: function(e, r, t) {
		if (null == r || null == e) return void(null != t && t("params is invalid"));
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=RemoveFolder&sourceName=" + e + "&path=" + r;
		n.currentPath = r, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = n.parseRemoveFolder(e);
				void 0 != t && t(s)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseRemoveFolder: function(e) {
		var r = $(e).find("RemoveFolder").text();
		if ("success" == r.toLowerCase()) return "success";
		var t = $(e).find("ExceptionText").text();
		return t
	},
	getThumbnails: function(e, r, t) {
		if (null == r || null == e) return void(null != t && t("params is invalid"));
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=GetThumbnail&sourceName=" + e + "&path=" + r;
		n.currentPath = r, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var s = n.parseGetThumbnails(e);
				void 0 != t && t(s)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseGetThumbnails: function(e) {
		if (null == e) return null;
		var r = [],
			t = this;
		return $(e).find("Rasters>Raster").each(function() {
			var e = t.parseGetThumbnail(this);
			null != e && r.push(e)
		}), r
	},
	getThumbnail: function(e, r, t, n) {
		if (null == r || null == e) return void(null != n && n("params is invalid"));
		var s = this,
			a = "service=" + this.service + "&version=" + this.version + "&request=GetThumbnail&sourceName=" + e + "&path=" + r + "&rasterName=" + t;
		s.currentPath = r, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var t = s.parseGetThumbnail(e);
				void 0 != n && n(t)
			},
			complete: function(e, r) {},
			error: function() {}
		})
	},
	parseGetThumbnail: function(e) {
		if (null == e) return null;
		var r = $(e).find("Name").text(),
			t = $(e).find("Thumbnail").attr("xlink");
		return {
			name: r,
			thumb: t
		}
	}
});
GeoBeans.ColorMap = GeoBeans.Class({
	id: null,
	startColor: null,
	endColor: null,
	initialize: function(l, o, i, n) {
		this.id = l, this.startColor = o, this.endColor = i, this.url = n
	}
});
GeoBeans.Style.FeatureStyle = GeoBeans.Class(GeoBeans.Style, {
	name: null,
	rules: null,
	geomType: null,
	styleClass: null,
	field: null,
	initialize: function(e, l) {
		this.name = e, this.geomType = l, this.type = GeoBeans.Style.Type.FeatureType, this.rules = []
	},
	addRule: function(e) {
		this.rules.push(e)
	},
	removeRule: function(e) {
		this.rules.splice(e, 1)
	},
	clone: function() {
		for (var e = new GeoBeans.Style.FeatureStyle(this.name, this.geomType), l = 0; l < this.rules.length; ++l) {
			var t = this.rules[l].clone();
			e.addRule(t)
		}
		return e.styleClass = this.styleClass, e
	}
}), GeoBeans.Style.FeatureStyle.GeomType = {
	Point: "Point",
	LineString: "LineString",
	Polygon: "Polygon"
}, GeoBeans.Style.FeatureStyle.StyleClass = {
	SINGLE: "single",
	UNIQUE: "unique",
	QUANTITIES: "quantities",
	CUSTOM: "custom",
	DOTDENSITY: "DotDensity"
};
GeoBeans.Fill = GeoBeans.Class({
	color: null,
	initialize: function() {
		this.color = new GeoBeans.Color
	},
	getRgba: function() {
		return this.color.getRgba()
	},
	getOpacity: function() {
		return this.color.getOpacity()
	},
	getRgb: function() {
		return this.color.getRgb()
	},
	clone: function() {
		var o = new GeoBeans.Fill;
		return null != this.color && (o.color = this.color.clone()), o
	}
});
GeoBeans.Font = GeoBeans.Class({
	family: null,
	style: null,
	weight: null,
	size: null,
	initialize: function() {
		this.family = "Times New Roman", this.style = GeoBeans.Font.StyleType.Normal, this.weight = GeoBeans.Font.WeightType.Normal, this.size = 12
	},
	clone: function() {
		var e = new GeoBeans.Font;
		return e.family = this.family, e.style = this.style, e.weight = this.weight, e.size = this.size, e
	}
}), GeoBeans.Font.StyleType = {
	Normal: "normal",
	Italic: "italic",
	Oblique: "oblique"
}, GeoBeans.Font.WeightType = {
	Normal: "normal",
	Bold: "bold"
};
GeoBeans.Symbolizer.LineSymbolizer = GeoBeans.Class(GeoBeans.Symbolizer, {
	stroke: null,
	fill: null,
	symbol: null,
	initialize: function() {
		GeoBeans.Symbolizer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Symbolizer.Type.Line, this.stroke = new GeoBeans.Stroke, this.fill = new GeoBeans.Fill
	},
	clone: function() {
		var l = new GeoBeans.Symbolizer.LineSymbolizer;
		return null != this.stroke ? l.stroke = this.stroke.clone() : l.stroke = null, null != this.fill ? l.fill = this.fill.clone() : l.fill = null, null != this.symbol && (l.symbol = this.symbol.clone()), l
	}
});
GeoBeans.Symbolizer.PointSymbolizer = GeoBeans.Class(GeoBeans.Symbolizer, {
	size: null,
	fill: null,
	stroke: null,
	icon_url: null,
	icon_offset_x: null,
	icon_offset_y: null,
	symbol: null,
	initialize: function() {
		GeoBeans.Symbolizer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Symbolizer.Type.Point, this.fill = new GeoBeans.Fill, this.stroke = new GeoBeans.Stroke, this.size = 3
	},
	clone: function() {
		var l = new GeoBeans.Symbolizer.PointSymbolizer;
		return null != this.fill ? l.fill = this.fill.clone() : l.fill = null, null != this.stroke ? l.stroke = this.stroke.clone() : l.stroke = null, l.size = this.size, null != this.symbol ? l.symbol = this.symbol.clone() : l.symbol = null, l
	}
});
GeoBeans.Symbolizer.PolygonSymbolizer = GeoBeans.Class(GeoBeans.Symbolizer, {
	fill: null,
	stroke: null,
	geomName: null,
	symbol: null,
	initialize: function() {
		GeoBeans.Symbolizer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Symbolizer.Type.Polygon, this.fill = new GeoBeans.Fill, this.stroke = new GeoBeans.Stroke
	},
	clone: function() {
		var l = new GeoBeans.Symbolizer.PolygonSymbolizer;
		return null != this.fill ? l.fill = this.fill.clone() : l.fill = null, null != this.stroke ? l.stroke = this.stroke.clone() : l.stroke = null, null != this.symbol ? l.symbol = this.symbol.clone() : l.symbol = null, l.geomName = this.geomName, l
	}
});
GeoBeans.Rule = GeoBeans.Class({
	name: null,
	symbolizer: null,
	textSymbolizer: null,
	filter: null,
	minScale: null,
	maxScale: null,
	initialize: function(l) {
		this.name = l
	},
	clone: function() {
		var l = new GeoBeans.Rule;
		return l.name = this.name, null != this.symbolizer && (l.symbolizer = this.symbolizer.clone()), null != this.textSymbolizer && (l.textSymbolizer = this.textSymbolizer.clone()), null != this.filter && (l.filter = this.filter.clone()), l.minScale = this.minScale, l.maxScale = this.maxScale, l
	}
});
GeoBeans.Stroke = GeoBeans.Class({
	color: null,
	width: null,
	lineCap: null,
	lineJoin: null,
	dashOffset: null,
	initialize: function() {
		this.color = new GeoBeans.Color, this.width = 2, this.lineCap = GeoBeans.Stroke.LineCapType.RoundCap, this.lineJoin = GeoBeans.Stroke.LineJoinType.RoundJoin
	},
	getRgba: function() {
		return this.color.getRgba()
	},
	getRgb: function() {
		return this.color.getRgb()
	},
	getOpacity: function() {
		return this.color.getOpacity()
	},
	clone: function() {
		var e = new GeoBeans.Stroke;
		return null != this.color && (e.color = this.color.clone()), e.width = this.width, e.lineCap = this.lineCap, e.lineJoin = this.lineJoin, e.dashOffset = this.dashOffset, e
	}
}), GeoBeans.Stroke.LineCapType = {
	ButtCap: "butt",
	SquareCap: "square",
	RoundCap: "round",
	LineCapMax: "max"
}, GeoBeans.Stroke.LineJoinType = {
	MiterJoin: "miter",
	MiterRevertJoin: "miterRevert",
	RoundJoin: "round",
	BevelJoin: "bevel",
	LineJoinMax: "max"
};
GeoBeans.StyleManager = GeoBeans.Class({
	name: "",
	server: null,
	styles: null,
	colorMaps: null,
	service: "ims",
	version: "1.0.0",
	reader: null,
	writer: null,
	initialize: function(e) {
		this.server = e + "/mgr", this.styles = [], this.colorMaps = [], this.reader = new GeoBeans.StyleReader, this.writer = new GeoBeans.StyleWriter
	},
	getStyles: function() {
		var e = this,
			t = "service=" + this.service + "&version=" + this.version + "&request=GetStyle";
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(t),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(t, r) {
				e.styles = e.parseStyles(t)
			},
			complete: function(e, t) {},
			error: function() {}
		}), this.styles
	},
	getStyle: function(e) {
		if (null == this.styles) return null;
		for (var t = 0; t < this.styles.length; ++t) {
			var r = this.styles[t];
			if (r.name == e) return r
		}
		return null
	},
	getStyleXML: function(e, t, r) {
		if (null != e) {
			var n = this,
				s = "service=" + this.service + "&version=" + this.version + "&request=GetStyle&name=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(s),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(s, o) {
					var i = n.parseStyleXML(s);
					if (null == i && null != t) return void t(null, r);
					var a = n.getStyle(e);
					if (null == a) return void(void 0 != t && t(i, r));
					var l = i.rules;
					a.rules = [];
					for (var c = 0; c < l.length; ++c) a.addRule(l[c]);
					a.styleClass = i.styleClass, void 0 != t && t(a, r)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	getStyleByType: function(e) {
		if (null == this.styles) return null;
		for (var t = new Array, r = 0; r < this.styles.length; ++r) {
			var n = this.styles[r],
				s = n.geomType;
			s == e && t.push(n)
		}
		return t
	},
	addStyle: function(e, t, r, n) {
		var s = this,
			o = "service=" + this.service + "&version=" + this.version + "&request=AddStyle&name=" + t + "&type=" + r + "&style=" + e;
		$.ajax({
			type: "POST",
			url: this.server,
			data: encodeURI(o),
			contentType: "application/x-www-form-urlencoded",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var r = s.parseAddStyleXml(e);
				s.getStyles(), void 0 != n && n(r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	updateStyle: function(e, t, r) {
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=UpdateStyle&name=" + t + "&style=" + e;
		$.ajax({
			type: "POST",
			url: this.server,
			data: encodeURI(s),
			contentType: "application/x-www-form-urlencoded",
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var s = n.parseUpdateStyleXml(e);
				n.getStyles(), void 0 != r && r(s)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	removeStyle: function(e, t) {
		if (null != e) {
			var r = this,
				n = "service=" + this.service + "&version=" + this.version + "&request=removeStyle&name=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(n),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, n) {
					var s = r.parseRemoveStyleXml(e);
					r.getStyles(), void 0 != t && t(s)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	getColorMaps: function(e) {
		if (null == e) {
			var t = this.getColorMapsSyn();
			return t
		}
		this.getColorMapsAsync(e)
	},
	getColorMapsAsync: function(e) {
		var t = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(r, n) {
				t.colorMaps = t.parseColorMaps(r), void 0 != e && e(t.colorMaps)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getColorMapsSyn: function() {
		var e = this,
			t = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap";
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(t),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(t, r) {
				e.colorMaps = e.parseColorMaps(t)
			},
			complete: function(e, t) {},
			error: function() {}
		}), e.colorMaps
	},
	getColorMapByID: function(e, t) {
		if (null == t) {
			var r = this.getColorMapByIDSyn(e);
			return r
		}
		this.getColorMapByIDAsync(e, t)
	},
	getColorMapByIDAsync: function(e, t) {
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap&id=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				r.colorMap = r.parseColorMapID(e), void 0 != t && t(r.colorMap)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getColorMapByIDSyn: function(e) {
		var t = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap&id=" + e;
		return this.colorMapID = e, $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, r) {
				t.colorMap = t.parseColorMapID(e)
			},
			complete: function(e, t) {},
			error: function() {}
		}), t.colorMap
	},
	getColorMap: function(e, t, r) {
		if (null == r) {
			var n = this.getColorMapSyn(e, t);
			return n
		}
		this.getColorMapAsync(e, t, r)
	},
	getColorMapSyn: function(e, t) {
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap&id=" + e + "&count=" + t;
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = r.parseColorMap(e);
				r.colors = n
			},
			complete: function(e, t) {},
			error: function() {}
		}), r.colors
	},
	getColorMapAsync: function(e, t, r) {
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap&id=" + e + "&count=" + t;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var s = n.parseColorMap(e);
				void 0 != r && r(s)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getColorMapNew: function(e, t, r) {
		if (this.getColorMap_count = t, null == r) {
			var n = this.getColorMapNewSyn(e, t);
			return n
		}
		this.getColorMapNewAsync(e, t, r)
	},
	getColorMapNewAsync: function(e, t, r) {
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=GetColorMap&id=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var s = n.parseColorMapID(e),
					o = n.getColorMapList(s.startColor, s.endColor, null, n.getColorMap_count);
				r(o)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getColorMapNewSyn: function(e, t) {},
	getColorMapList: function(e, t, r, n) {
		if (null == e || null == t || null == n) return null;
		var s = [],
			o = new GeoBeans.Color;
		o.setByHex(e, 1);
		var i = o.getHsl(),
			a = new GeoBeans.Color;
		a.setByHex(t, 1);
		var l = a.getHsl();
		if (null == r) for (var c = 0; c < n; ++c) {
			var u = i.h + c * (l.h - i.h) / (n - 1),
				p = i.s + c * (l.s - i.s) / (n - 1),
				f = i.l + c * (l.l - i.l) / (n - 1),
				v = new GeoBeans.Color;
			v.setByHsl(u, p, f), s.push(v.getHex())
		} else {
			var y = new GeoBeans.Color;
			y.setByHex(r, 1);
			var d = y.getHsl();
			if (n / 2 != 0) for (var r = Math.round(n / 2) - 1, c = 0; c < n; ++c) if (c < r) {
				var u = i.h + c * (d.h - i.h) / (n - 1),
					p = i.s + c * (d.s - i.s) / (n - 1),
					f = i.l + c * (d.l - i.l) / (n - 1),
					v = new GeoBeans.Color;
				v.setByHsl(u, p, f), s.push(v.getHex())
			} else if (c == r) s.push(y.getHex());
			else if (c > r) {
				var u = d.h + c * (l.h - d.h) / (n - 1),
					p = d.s + c * (l.s - d.s) / (n - 1),
					f = d.l + c * (l.l - d.l) / (n - 1),
					v = new GeoBeans.Color;
				v.setByHsl(u, p, f), s.push(v.getHex())
			}
		}
		return s
	},
	getSymbols: function(e, t) {
		if (null == e) return void(null != t && t("params is invalid"));
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetSymbol&type=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, n) {
				var s = r.parseGetSymbol(e);
				void 0 != t && t(s)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getSymbol: function(e, t) {
		var r = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=GetSymbol&type=" + e + "&name=" + t;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = r.parseGetSymbol(e);
				void 0 != callback && callback(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	getSymbolIcon: function(e, t) {
		var r = this.server + "?service=" + this.service + "&version=" + this.version + "&request=GetSymbolIcon&type=" + e + "&name=" + t;
		return r
	},
	parseStyles: function(e) {
		var t = this,
			r = new Array;
		return $(e).find("Style").each(function() {
			var e = $(this).attr("name"),
				n = $(this).attr("type"),
				s = t.readStyleType(n),
				o = new GeoBeans.Style.FeatureStyle(e, s);
			r.push(o)
		}), r
	},
	readStyleType: function(e) {
		var t = null;
		switch (e = e.toLowerCase()) {
		case "point":
			t = GeoBeans.Style.FeatureStyle.GeomType.Point;
			break;
		case "linestring":
			t = GeoBeans.Style.FeatureStyle.GeomType.LineString;
			break;
		case "polygon":
			t = GeoBeans.Style.FeatureStyle.GeomType.Polygon
		}
		return t
	},
	parseAddStyleXml: function(e) {
		var t = "",
			r = $(e).find("AddStyle").text();
		return "SUCCESS" == r.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	parseUpdateStyleXml: function(e) {
		var t = "",
			r = $(e).find("UpdateStyle").text();
		return "SUCCESS" == r.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	parseRemoveStyleXml: function(e) {
		var t = "",
			r = $(e).find("RemoveStyle").text();
		return "SUCCESS" == r.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	parseStyleXML: function(e) {
		var t = this.reader.read(e);
		return t
	},
	parseColorMaps: function(e) {
		var t = [];
		return $(e).find("ColorMap").each(function() {
			var e = $(this).attr("id"),
				r = $(this).find("Start:first").text(),
				n = $(this).find("End:first").text(),
				s = $(this).find("OnlineResource").attr("xlink:href"),
				o = new GeoBeans.ColorMap(e, r, n, s);
			t.push(o)
		}), t
	},
	parseColorMapID: function(e) {
		var t = this.colorMapID,
			r = $(e).find("Start:first").text(),
			n = $(e).find("End:first").text(),
			s = $(e).find("OnlineResource").attr("xlink:href"),
			o = new GeoBeans.ColorMap(t, r, n, s);
		return o
	},
	parseColorMap: function(e) {
		var t = [];
		return $(e).find("Color").each(function() {
			var e = $(this).text();
			t.push(e)
		}), t
	},
	parseGetSymbol: function(e) {
		var t = [],
			r = this;
		return $(e).find("Symbol").each(function() {
			var e = r.parseSymbol(this);
			null != e && t.push(e)
		}), t
	},
	parseSymbol: function(e) {
		var t = $(e).find("Name").text(),
			r = $(e).find("Icon").attr("xlink:href"),
			n = null;
		return null == t && null == r || (n = new GeoBeans.Symbol(t, r)), n
	}
});
GeoBeans.StyleReader = GeoBeans.Class({
	filterReader: null,
	initialize: function() {
		this.filterReader = new GeoBeans.FilterReader
	},
	read: function(e) {
		var t = null,
			r = $(e),
			l = r.find("StyledLayerDescriptor");
		if (1 != l.length) return null;
		var i = l.children()[0].tagName;
		i = i.slice(i.lastIndexOf(":") + 1, i.length);
		return "UserLayer" == i ? t = this.parseUserLayer(l.children()) : "NamedLayer" == i && (t = this.parseNamedLayer(l.children())), t
	},
	parseUserLayer: function(e) {
		var t = e.find("UserStyle");
		if (1 != t.length) return null;
		var r = this.parseUserStyle(e);
		return r
	},
	parseUserStyle: function(e) {
		var t = e.find("Name:first").text(),
			r = e.find("FeatureTypeStyle");
		if (1 != r.length) return null;
		var l = this.parseFeatureTypeXML(e),
			i = e.find("StyleClass").text();
		null != i && (l.styleClass = i);
		var a = e.find("StyleField").text();
		return null != a && (l.field = a), l.name = t, l
	},
	parseFeatureTypeXML: function(e) {
		var t = new GeoBeans.Style.FeatureStyle,
			r = this;
		return e.find("Rule").each(function() {
			var e = r.parseRule($(this));
			t.addRule(e)
		}), t
	},
	parseRule: function(e) {
		var t = this,
			r = new GeoBeans.Rule;
		e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "Name" == e) r.name = $(this).text();
			else if ("PointSymbolizer" == e) {
				var l = t.parsePointSymbolizer($(this));
				r.symbolizer = l
			} else if ("LineSymbolizer" == e) {
				var i = t.parseLineSymbolizer($(this));
				r.symbolizer = i
			} else if ("PolygonSymbolizer" == e) {
				var a = t.parsePolygonSymbolizer($(this));
				r.symbolizer = a
			} else if ("TextSymbolizer" == e) {
				var n = t.parseTextSymbolizer($(this));
				r.textSymbolizer = n
			} else if ("MinScaleDenominator" == e) {
				var s = $(this).text();
				r.minScale = s
			} else if ("MaxScaleDenominator" == e) {
				var o = $(this).text();
				r.maxScale = o
			} else if ("Filter" == e) {
				var f = t.filterReader.read($(this));
				r.filter = f
			}
		});
		e.find("Name:first").text(), e.find("Title:first").text();
		return r
	},
	parsePointSymbolizer: function(e) {
		var t = this,
			r = new GeoBeans.Symbolizer.PointSymbolizer;
		return r.stroke = null, r.fill = null, e.children().each(function() {
			var e = this.tagName;
			e = e.slice(e.lastIndexOf(":") + 1, e.length), "Graphic" == e && t.parseGraphic($(this), r)
		}), r
	},
	parseLineSymbolizer: function(e) {
		var t = this,
			r = new GeoBeans.Symbolizer.LineSymbolizer;
		return r.fill = null, r.stroke = null, e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "Stroke" == e) {
				var l = t.parseStroke($(this));
				r.stroke = l
			} else if ("Geometry" == e);
			else if ("WellKnownName" == e) {
				var i = t.parseSymbol($(this));
				r.symbol = i
			} else if ("Fill" == e) {
				var a = t.parseFill($(this));
				r.fill = a
			}
		}), r
	},
	parsePolygonSymbolizer: function(e) {
		var t = this,
			r = new GeoBeans.Symbolizer.PolygonSymbolizer;
		return r.stroke = null, r.fill = null, e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "Fill" == e) {
				var l = t.parseFill($(this));
				r.fill = l
			} else if ("Stroke" == e) {
				var i = t.parseStroke($(this));
				r.stroke = i
			} else if ("Geometry" == e) {
				var a = t.parseGeometry($(this));
				r.geomName = a
			} else if ("WellKnownName" == e) {
				var n = t.parseSymbol($(this));
				r.symbol = n
			}
		}), r
	},
	parseGraphic: function(e, t) {
		var r = this;
		e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "Size" == e) {
				var l = parseFloat($(this).text());
				t.size = l
			} else "Mark" == e && r.parseMark($(this), t)
		})
	},
	parseMark: function(e, t) {
		var r = this;
		e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "WellKnownName" == e) {
				var l = r.parseSymbol($(this));
				t.symbol = l
			}
			if ("Fill" == e) {
				var i = r.parseFill($(this));
				t.fill = i
			} else if ("Stroke" == e) {
				var a = r.parseStroke($(this));
				t.stroke = a
			}
		})
	},
	parseSize: function(e, t) {
		e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "Literal" == e) {
				var r = $(this).text();
				t.size = parseFloat(r)
			}
		})
	},
	parseStroke: function(e) {
		var t = new GeoBeans.Stroke,
			r = null,
			l = null,
			i = null;
		e.children().each(function() {
			var e = $(this).attr("name");
			"stroke" == e ? r = $(this).text() : "stroke-opacity" == e ? l = $(this).text() : "stroke-width" == e && (i = parseFloat($(this).text()))
		});
		var a = new GeoBeans.Color;
		return a.setByHex(r, l), t.color = a, t.width = i, t
	},
	parseFill: function(e) {
		var t = new GeoBeans.Fill,
			r = null,
			l = null;
		e.children().each(function() {
			var e = $(this).attr("name");
			"fill" == e ? r = $(this).text() : "fill-opacity" == e && (l = $(this).text())
		});
		var i = new GeoBeans.Color;
		return i.setByHex(r, l), t.color = i, t
	},
	parseSymbol: function(e) {
		var t = e.text();
		if (null != t || "" != t) {
			var r = new GeoBeans.Symbol(t, null);
			return r
		}
		return null
	},
	parseNamedLayer: function(e) {
		return null
	},
	parseTextSymbolizer: function(e) {
		var t = this,
			r = new GeoBeans.Symbolizer.TextSymbolizer;
		return r.fill = null, r.stroke = null, e.children().each(function() {
			var e = this.tagName;
			if (e = e.slice(e.lastIndexOf(":") + 1, e.length), "Label" == e) t.parseLabel($(this), r);
			else if ("Font" == e) {
				var l = t.parseFont($(this));
				r.font = l
			} else if ("LabelPlacement" == e);
			else if ("Fill" == e) {
				var i = t.parseFill($(this));
				r.fill = i
			} else if ("Stroke" == e) {
				var a = t.parseStroke($(this));
				r.stroke = a
			}
		}), r
	},
	parseLabel: function(e, t) {
		var r = $(e).find("PropertyName");
		if (1 == r.length) {
			var l = r.text();
			t.labelProp = l
		} else {
			var i = e.text();
			t.labelText = i
		}
	},
	parseFont: function(e) {
		var t = new GeoBeans.Font;
		return e.children().each(function() {
			var e = $(this).attr("name");
			if ("font-family" == e) {
				var r = $(this).text();
				t.family = r
			} else if ("font-size" == e) {
				var l = parseFloat($(this).text());
				t.size = l
			} else if ("font-style" == e) {
				var i = $(this).text();
				"normal" == i ? t.style = GeoBeans.Font.StyleType.Normal : "italic" == i ? t.style = GeoBeans.Font.StyleType.Italic : "oblique" == i && (t.style = GeoBeans.Font.StyleType.Oblique)
			} else if ("font-weight" == e) {
				var a = $(this).text();
				"normal" == a ? t.weight = GeoBeans.Font.WeightType.Normal : "bold" == a && (t.weight = GeoBeans.Font.WeightType.Bold)
			}
		}), t
	},
	parseGeometry: function(e) {
		var t = $(e).find("PropertyName");
		if (1 == t.length) {
			var r = t.text();
			return r
		}
		return null
	}
});
GeoBeans.StyleWriter = GeoBeans.Class({
	filterWriter: null,
	initialize: function() {
		this.filterWriter = new GeoBeans.FilterWriter
	},
	write: function(e) {
		if (null == e) return null;
		var t = null;
		if (e.type == GeoBeans.Style.Type.FeatureType ? t = this.writeFeature(e) : e.type == GeoBeans.Style.Type.RasterType && (t = this.writeRaster(e)), null != t) {
			var r = (new XMLSerializer).serializeToString(t);
			return r
		}
		return null
	},
	writeFeature: function(e) {
		var t = $.parseXML('<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0"/>'),
			r = t.createElement("sld:UserLayer"),
			l = t.createElement("sld:LayerFeatureConstraints"),
			a = t.createElement("sld:FeatureTypeConstraint");
		$(l).append(a), $(r).append(l);
		var n = this.writeUserStyle(t, e);
		return $(r).append(n), $("StyledLayerDescriptor", t).append(r), t
	},
	writeRaster: function(e) {
		return null
	},
	writeUserStyle: function(e, t) {
		var r = e.createElement("sld:UserStyle"),
			l = t.name,
			a = e.createElement("sld:Name");
		$(a).text(l), $(r).append(a);
		var n = this.writeFeatureType(e, t);
		$(r).append(n);
		var i = t.styleClass;
		if (null != i) {
			var s = e.createElement("sld:StyleClass");
			if ($(s).text(i), $(r).append(s), i == GeoBeans.Style.FeatureStyle.StyleClass.DOTDENSITY) {
				var p = t.field;
				if (null != p) {
					var o = e.createElement("sld:StyleField");
					$(o).text(p), $(r).append(o)
				}
			}
		}
		return r
	},
	writeFeatureType: function(e, t) {
		for (var r = e.createElement("sld:FeatureTypeStyle"), l = t.rules, a = 0; a < l.length; ++a) {
			var n = l[a];
			if (null != n) {
				var i = this.writeRule(e, n);
				$(r).append(i)
			}
		}
		return r
	},
	writeRule: function(e, t) {
		var r = e.createElement("sld:Rule"),
			l = t.name;
		if (null != l) {
			var a = e.createElement("sld:Name");
			$(a).text(l), $(r).append(a)
		}
		var n = t.filter;
		if (null != n) {
			var i = this.filterWriter.write(e, n);
			$(r).append(i)
		}
		var s = t.symbolizer;
		if (null != s) {
			var p = s.type;
			if (p == GeoBeans.Symbolizer.Type.Point) {
				var o = this.writePointSymbolizer(e, s);
				$(r).append(o)
			} else if (p == GeoBeans.Symbolizer.Type.Line) {
				var m = this.writeLineSymbolizer(e, s);
				$(r).append(m)
			} else if (p == GeoBeans.Symbolizer.Type.Polygon) {
				var d = this.writePolygonSymbolizer(e, s);
				$(r).append(d)
			}
		}
		var u = t.textSymbolizer;
		if (null != u) {
			var v = this.writeTextSymbolizer(e, u);
			$(r).append(v)
		}
		return r
	},
	writePointSymbolizer: function(e, t) {
		var r = e.createElement("sld:PointSymbolizer"),
			l = e.createElement("sld:Graphic"),
			a = e.createElement("sld:Mark"),
			n = t.symbol;
		if (null != n) {
			var i = this.writeSymbol(e, n);
			$(a).append(i)
		}
		var s = t.fill;
		if (null != s) {
			var p = this.writeFill(e, s);
			$(a).append(p)
		}
		var o = t.stroke;
		if (null != o) {
			var m = this.writeStroke(e, o);
			$(a).append(m)
		}
		$(l).append(a);
		var d = t.size,
			u = e.createElement("sld:Size");
		return $(u).text(d), $(l).append(u), $(r).append(l), r
	},
	writeLineSymbolizer: function(e, t) {
		var r = e.createElement("sld:LineSymbolizer"),
			l = t.symbol;
		if (null != l) {
			var a = this.writeSymbol(e, l);
			$(r).append(a)
		}
		var n = t.stroke;
		if (null != n) {
			var i = this.writeStroke(e, n);
			$(r).append(i)
		}
		var s = t.fill;
		if (null != s) {
			var p = this.writeFill(e, s);
			$(r).append(p)
		}
		return r
	},
	writePolygonSymbolizer: function(e, t) {
		var r = e.createElement("sld:PolygonSymbolizer"),
			l = t.geomName;
		if (null != l) {
			var a = this.writeGeom(e, l);
			$(r).append(a)
		}
		var n = t.symbol;
		if (null != n) {
			var i = this.writeSymbol(e, n);
			$(r).append(i)
		}
		var s = t.fill;
		if (null != s) {
			var p = this.writeFill(e, s);
			$(r).append(p)
		}
		var o = t.stroke;
		if (null != o) {
			var m = this.writeStroke(e, o);
			$(r).append(m)
		}
		return r
	},
	writeFill: function(e, t) {
		var r = e.createElement("sld:Fill"),
			l = t.color,
			a = l.getHex(),
			n = e.createElement("sld:CssParameter");
		$(n).attr("name", "fill").text(a), $(r).append(n);
		var i = e.createElement("sld:CssParameter"),
			s = l.getOpacity();
		return $(i).attr("name", "fill-opacity").text(s), $(r).append(i), r
	},
	writeStroke: function(e, t) {
		var r = e.createElement("sld:Stroke"),
			l = t.color,
			a = l.getHex(),
			n = e.createElement("sld:CssParameter");
		$(n).attr("name", "stroke").text(a), $(r).append(n);
		var i = l.getOpacity(),
			s = e.createElement("sld:CssParameter");
		$(s).attr("name", "stroke-opacity").text(i), $(r).append(s);
		var p = t.width,
			o = e.createElement("sld:CssParameter");
		return $(o).attr("name", "stroke-width").text(p), $(r).append(o), r
	},
	writeSize: function(e, t) {
		var r = e.createElement("sld:Size"),
			l = e.createElement("ogc:Literal");
		return $(l).text(t), $(r).append(l), r
	},
	writeGeom: function(e, t) {
		var r = e.createElement("sld:Geometry"),
			l = e.createElement("ogc:PropertyName");
		return $(l).text(t), $(r).append(l), r
	},
	writeTextSymbolizer: function(e, t) {
		var r = e.createElement("sld:TextSymbolizer"),
			l = t.labelText;
		if (null != l) {
			var a = e.createElement("sld:Label");
			$(a).text(l), $(r).append(a)
		}
		var n = t.labelProp;
		if (null != n) {
			var i = e.createElement("sld:Label"),
				s = e.createElement("ogc:PropertyName");
			$(s).text(n), $(i).append(s), $(r).append(i)
		}
		var p = t.font;
		if (null != p) {
			var o = this.writeFont(e, p);
			$(r).append(o)
		}
		var m = t.fill;
		if (null != m) {
			var d = this.writeFill(e, m);
			$(r).append(d)
		}
		var u = t.stroke;
		if (null != u) {
			var v = this.writeStroke(e, u);
			$(r).append(v)
		}
		return r
	},
	writeFont: function(e, t) {
		var r = e.createElement("sld:Font"),
			l = t.family;
		if (null != l) {
			var a = e.createElement("sld:CssParameter");
			$(a).attr("name", "font-family").text(l), $(r).append(a)
		}
		var n = t.size;
		if (null != n) {
			var i = e.createElement("sld:CssParameter");
			$(i).attr("name", "font-size").text(n), $(r).append(i)
		}
		var s = t.style;
		if (null != s) {
			var p = e.createElement("sld:CssParameter");
			$(p).attr("name", "font-style").text(s), $(r).append(p)
		}
		var o = t.weight;
		if (null != o) {
			var m = e.createElement("sld:CssParameter");
			$(m).attr("name", "font-weight").text(o), $(r).append(m)
		}
		return r
	},
	writeSymbol: function(e, t) {
		if (null == t) return null;
		var r = e.createElement("sld:WellKnownName");
		return $(r).text(t.name), r
	}
});
GeoBeans.Symbol = GeoBeans.Class({
	name: null,
	icon: null,
	icon_height: null,
	icon_width: null,
	icon_offset_x: null,
	icon_offset_y: null,
	scale: null,
	rotate: null,
	initialize: function(i, n) {
		this.name = i, this.icon = n
	},
	clone: function() {
		var i = new GeoBeans.Symbol;
		return null != this.name && (i.name = this.name), null != this.icon && (i.icon = this.icon), null != this.icon_height && (i.icon_height = this.icon_height), null != this.icon_width && (i.icon_width = this.icon_width), null != this.icon_offset_x && (i.icon_offset_x = this.icon_offset_x), null != this.icon_offset_y && (i.icon_offset_y = this.icon_offset_y), null != this.scale && (i.scale = this.scale), null != this.rotate && (i.rotate = this.rotate), i
	}
});
GeoBeans.Symbolizer.TextSymbolizer = GeoBeans.Class(GeoBeans.Symbolizer, {
	fill: null,
	stroke: null,
	rotation: null,
	rotationProp: null,
	font: null,
	labelText: null,
	labelProp: null,
	anchorX: 0,
	anchorY: 0,
	displaceX: 0,
	displaceY: 0,
	initialize: function() {
		GeoBeans.Symbolizer.prototype.initialize.apply(this, arguments), this.type = GeoBeans.Symbolizer.Type.Text, this.fill = new GeoBeans.Fill, this.stroke = new GeoBeans.Stroke, this.font = new GeoBeans.Font, this.anchorX = 0, this.anchorY = 0, this.displaceX = 0, this.displaceY = 0
	},
	clone: function() {
		var l = new GeoBeans.Symbolizer.TextSymbolizer;
		return null != this.fill ? l.fill = this.fill.clone() : l.fill = null, null != this.stroke ? l.stroke = this.stroke.clone() : l.stroke = null, l.rotation = this.rotation, l.rotationProp = this.rotationProp, null != this.font ? l.font = this.font.clone() : l.font = null, l.labelText = this.labelText, l.labelProp = this.labelProp, l.displaceX = this.displaceX, l.displaceY = this.displaceY, l.anchorX = this.anchorX, l.anchorY = this.anchorY, l
	}
});
GeoBeans.SubManager = GeoBeans.Class({
	server: null,
	service: "ims",
	version: "1.0.0",
	poinames: null,
	aqiCitys: null,
	aqiLayer: null,
	aqiSourceName: null,
	aqiTimeField: null,
	aqiCityField: null,
	aqiUptimeLayer: null,
	aqiUptimeField: null,
	aqiDowntimeField: null,
	aqiFeatureType: null,
	time: null,
	subInt: null,
	timeTick: 600,
	user_callback: null,
	poiFeatures: null,
	aqiFeatures: null,
	initialize: function(e) {
		this.server = e + "/mgr", this.time = new Date, null != this.poinames && null != this.aqiCitys || this.getSubscription(this.getSubscription_callback)
	},
	setSubParams: function(e, t, i, a, r, n, s, l) {
		this.aqiSourceName = e, this.aqiLayer = t, this.aqiTimeField = i, this.aqiCityField = a, this.aqiUptimeLayer = r, this.aqiUptimeField = n, this.aqiDowntimeField = s, this.user_callback = l;
		var o = new GeoBeans.WFSWorkspace("tmp", this.server, "1.0.0");
		this.aqiFeatureType = new GeoBeans.FeatureType(o, this.aqiLayer), this.aqiUptimeFeatureType = new GeoBeans.FeatureType(o, this.aqiUptimeLayer)
	},
	getSubscription: function(e) {
		var t = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=GetSubscription";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(i, a) {
				var r = t.parseGetSubscription(i);
				null != e && e(t, r)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseGetSubscription: function(e) {
		var t = $(e).find("ExceptionText");
		if (0 != t.length) return t.text();
		var i = new Object;
		return $(e).find("Theme").each(function() {
			var e = $(this).attr("name"),
				t = [],
				a = [];
			"poi" == e ? $(this).find("Keyword").each(function() {
				var e = $(this).text();
				a.push(e)
			}) : "aqi" == e && $(this).find("Keyword").each(function() {
				var e = $(this).text();
				t.push(e)
			}), i.poi = a, i.aqi = t
		}), i
	},
	getSubscription_callback: function(e, t) {
		if (null != e && null != t) {
			var i = t.poi,
				a = t.aqi;
			e.poinames = i, e.aqiCitys = a, e.beginSubscribe()
		}
	},
	beginSubscribe: function() {
		if (null == this.subInt && null != this.aqiFeatureType) {
			var e = this;
			this.subInt = setInterval(function() {
				e.getSubscription(e.subscribe_callback)
			}, 1e3 * this.timeTick)
		}
	},
	subscribe_callback: function(e, t) {
		if (null != e && null != t) {
			var i = t.poi,
				a = t.aqi;
			e.poinames = i, e.aqiCitys = a, null != a && 0 != a.length && e.getDownloadTime(e.time, e.getDownloadTime_callback);
			var r = e.dateAdd(e.time, "second", e.timeTick);
			e.time = r
		}
	},
	getDownloadTime: function(e, t) {
		if (null != e && null != this.aqiUptimeFeatureType) {
			var i = this.dateAdd(e, "minute", -1),
				a = new GeoBeans.BinaryComparisionFilter;
			a.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThan;
			var r = new GeoBeans.PropertyName;
			r.setName(this.aqiDowntimeField);
			var n = new GeoBeans.Literal,
				s = this.getTimeFormat(i);
			n.setValue(s), a.expression1 = r, a.expression2 = n, this.aqiUptimeFeatureType.fields = this.aqiUptimeFeatureType.getFields(null, this.aqiSourceName);
			var l = this.aqiUptimeFeatureType.buildGetFeatureFilterXML(null, this.aqiSourceName, a, null, null, null),
				o = this.server,
				u = this;
			$.ajax({
				type: "post",
				url: o,
				data: l,
				contentType: "text/xml",
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, i) {
					var a = u.aqiUptimeFeatureType.parseFeatures(e);
					void 0 != t && t(u, a)
				},
				complete: function(e, t) {},
				error: function(e, t, i) {
					console.log("textStatus:" + t), console.log("error:" + i)
				}
			})
		}
	},
	getDownloadTime_callback: function(e, t) {
		if (null != e && null != t && 0 != t.length) {
			for (var i = [], a = (e.aqiUptimeFeatureType.getFields(), e.aqiUptimeFeatureType.getFieldIndex(e.aqiUptimeField)), r = null, n = null, s = null, l = 0; l < t.length; ++l) n = t[l], null != n && (r = n.values, s = r[a], null != s && i.push(s));
			e.getAqisByUptime(e.aqiCitys, i, e.getAqisByUptime_callback)
		}
	},
	getAqisByUptime: function(e, t, i) {
		if (null != e && null != t && $.isArray(e) && $.isArray(t)) {
			var a = new GeoBeans.BinaryLogicFilter;
			a.operator = GeoBeans.LogicFilter.OperatorType.LogicOprOr;
			for (var r = null, n = 0; n < e.length; ++n) {
				r = e[n];
				var s = new GeoBeans.BinaryComparisionFilter;
				s.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
				var l = new GeoBeans.PropertyName;
				l.setName(this.aqiCityField);
				var o = new GeoBeans.Literal;
				o.setValue(r), s.expression1 = l, s.expression2 = o, a.addFilter(s)
			}
			var u = null,
				c = new GeoBeans.BinaryLogicFilter;
			c.operator = GeoBeans.LogicFilter.OperatorType.LogicOprOr;
			for (var n = 0; n < t.length; ++n) {
				u = t[n];
				var p = new GeoBeans.BinaryComparisionFilter;
				p.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
				var l = new GeoBeans.PropertyName;
				l.setName(this.aqiTimeField);
				var o = new GeoBeans.Literal;
				o.setValue(u), p.expression1 = l, p.expression2 = o, c.addFilter(p)
			}
			var h = new GeoBeans.BinaryLogicFilter;
			h.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd, h.addFilter(a), h.addFilter(c), this.aqiFeatureType.fields = this.aqiFeatureType.getFields(null, this.aqiSourceName);
			var m = this.aqiFeatureType.buildGetFeatureFilterXML(null, this.aqiSourceName, h, 200, null, null),
				d = this.server,
				F = this;
			$.ajax({
				type: "post",
				url: d,
				data: m,
				contentType: "text/xml",
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, t) {
					var a = F.aqiFeatureType.parseFeatures(e);
					if (void 0 != i) {
						var r = F.time;
						i(F, r, "aqi", a)
					}
				},
				complete: function(e, t) {},
				error: function(e, t, i) {
					console.log("textStatus:" + t), console.log("error:" + i)
				}
			})
		}
	},
	getAqisByUptime_callback: function(e, t, i, a) {
		var r = e.dateAdd(t, "second", -e.timeTick);
		"aqi" == i ? e.aqiFeatures = a : "poi" == i && (e.poiFeatures = a), null != e.user_callback && (e.poiFeatures = [], e.user_callback(r, e.poiFeatures, e.aqiFeatures))
	},
	getSubFeatures: function(e) {
		null != this.poinames && null != this.aqiCitys && null != this.aqiFeatureType && (this.aqiFeatures = null, this.poiFeatures = null, this.getPois(this.poinames, e, this.getSubFeatures_callback), this.getAqis(this.aqiCitys, e, this.getSubFeatures_callback))
	},
	getPois: function(e, t, i) {
		this.poiFeatures = []
	},
	getAqis: function(e, t, i) {
		if (null != e) {
			0 == e.length && (this.aqiFeatures = []);
			var a = new GeoBeans.BinaryComparisionFilter;
			a.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprGreaterThan;
			var r = new GeoBeans.PropertyName;
			r.setName(this.aqiTimeField);
			var n = new GeoBeans.Literal,
				s = this.getTimeFormat(t);
			n.setValue(s), a.expression1 = r, a.expression2 = n;
			var l = new GeoBeans.BinaryLogicFilter;
			l.operator = GeoBeans.LogicFilter.OperatorType.LogicOprOr;
			for (var o = null, u = 0; u < e.length; ++u) {
				o = e[u];
				var c = new GeoBeans.BinaryComparisionFilter;
				c.operator = GeoBeans.ComparisionFilter.OperatorType.ComOprEqual;
				var r = new GeoBeans.PropertyName;
				r.setName(this.aqiCityField);
				var n = new GeoBeans.Literal;
				n.setValue(o), c.expression1 = r, c.expression2 = n, l.addFilter(c)
			}
			var p = new GeoBeans.BinaryLogicFilter;
			p.operator = GeoBeans.LogicFilter.OperatorType.LogicOprAnd, p.addFilter(a), p.addFilter(l), this.aqiFeatureType.fields = this.aqiFeatureType.getFields(null, this.aqiSourceName);
			var h = this.aqiFeatureType.buildGetFeatureFilterXML(null, this.aqiSourceName, p, 200, null, null),
				m = this.server,
				d = this;
			$.ajax({
				type: "post",
				url: m,
				data: h,
				contentType: "text/xml",
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, a) {
					var r = d.aqiFeatureType.parseFeatures(e);
					void 0 != i && i(d, t, "aqi", r)
				},
				complete: function(e, t) {},
				error: function(e, t, i) {
					console.log("textStatus:" + t), console.log("error:" + i)
				}
			})
		}
	},
	getSubFeatures_callback: function(e, t, i, a) {
		null != e && null != i && null != a && ("aqi" == i ? e.aqiFeatures = a : "poi" == i && (e.poiFeatures = a), null != e.user_callback && e.user_callback(t, e.poiFeatures, e.aqiFeatures))
	},
	dateAdd: function(e, t, i) {
		var a = new Date(e);
		switch (t.toLowerCase()) {
		case "year":
			a.setFullYear(a.getFullYear() + i);
			break;
		case "quarter":
			a.setMonth(a.getMonth() + 3 * i);
			break;
		case "month":
			a.setMonth(a.getMonth() + i);
			break;
		case "week":
			a.setDate(a.getDate() + 7 * i);
			break;
		case "day":
			a.setDate(a.getDate() + i);
			break;
		case "hour":
			a.setTime(a.getTime() + 36e5 * i);
			break;
		case "minute":
			a.setTime(a.getTime() + 6e4 * i);
			break;
		case "second":
			a.setTime(a.getTime() + 1e3 * i);
			break;
		default:
			a = void 0
		}
		return a
	},
	getTimeFormat: function(e) {
		if (null == e) return null;
		var t = this.dateFormat(e, "yyyy-MM-dd hh:mm:ss");
		return t
	},
	dateFormat: function(e, t) {
		var i = {
			"M+": e.getMonth() + 1,
			"d+": e.getDate(),
			"h+": e.getHours(),
			"m+": e.getMinutes(),
			"s+": e.getSeconds(),
			"q+": Math.floor((e.getMonth() + 3) / 3),
			S: e.getMilliseconds()
		};
		/(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
		for (var a in i) new RegExp("(" + a + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[a] : ("00" + i[a]).substr(("" + i[a]).length)));
		return t
	},
	subscribe: function(e, t, i) {
		if (null == e || null == t || !$.isArray(t)) return void(null != i && i("params is invalid"));
		for (var a = "", r = 0; r < t.length; ++r) {
			var n = t[r];
			null != n && (a += n, r + 1 < t.length && (a += ","))
		}
		var s = "service=" + this.service + "&version=" + this.version + "&request=subscribe&theme=" + e + "&keywords=" + a,
			l = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var a = l.parseSubscribe(e);
				null != i && i(a), "SUCCESS" == a && l.getSubscription(l.getSubscription_callback)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseSubscribe: function(e) {
		var t = $(e).find("Subscribe").text();
		if ("success" == t.toLowerCase()) return "SUCCESS";
		var i = $(e).find("ExceptionText");
		return 0 != i.length ? i.text() : void 0
	},
	endSubSribe: function() {
		null != this.subInt && clearInterval(this.subInt), this.subInt = null
	},
	Unsubscribe: function(e, t, i) {
		if (null == e || null == t) return void(null != i && i("params is invalid"));
		var a = "service=" + this.service + "&version=" + this.version + "&request=Unsubscribe&theme=" + e + "&keywords=" + t,
			r = this;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(a),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var a = r.parseUnsubscribe(e);
				null != i && i(a), "SUCCESS" == a && r.getSubscription(r.getSubscription_callback)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseUnsubscribe: function(e) {
		var t = $(e).find("Unsubscribe").text();
		if ("success" == t.toLowerCase()) return "SUCCESS";
		var i = $(e).find("ExceptionText");
		return 0 != i.length ? i.text() : void 0
	}
});
GeoBeans.TileDBManager = GeoBeans.Class({
	name: null,
	userServer: null,
	server: null,
	service: "wmts",
	version: "1.0.0",
	initialize: function(e) {
		this.userServer = e
	},
	setName: function(e) {
		null != e && (this.name = e, this.server = this.userServer + "/" + this.name + "/wmts")
	},
	getCapabilities: function() {
		var e = this,
			t = "service=" + this.service + "&version=" + this.version + "&request=GetCapabilities";
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(t),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(t, r) {
				e.layers = e.parseGetCapabilities(t)
			},
			complete: function(e, t) {},
			error: function() {}
		}), e.layers
	},
	parseGetCapabilities: function(e) {
		var t = [],
			r = this;
		return $(e).find("Layer").each(function() {
			var e = r.parseLayer(this);
			t.push(e)
		}), t
	},
	parseLayer: function(e) {
		var t = $(e).find("Identifier:first").text(),
			r = $(e).find("Format:first").text(),
			i = $(e).find("TileMatrixSetLink>TileMatrixSet").text(),
			s = $(e).find("LowerCorner").text(),
			n = $(e).find("UpperCorner").text(),
			a = s.indexOf(" "),
			l = s.lastIndexOf(" "),
			o = s.slice(0, a),
			f = s.slice(l + 1, s.length);
		a = n.indexOf(" "), l = n.lastIndexOf(" ");
		var u = n.slice(0, a),
			c = n.slice(l + 1, n.length),
			p = new GeoBeans.Envelope(parseFloat(o), parseFloat(f), parseFloat(u), parseFloat(c)),
			v = new GeoBeans.Layer.WMTSLayer(t, this.server, t, p, i, r);
		return v
	}
});
GeoBeans.TileStore = GeoBeans.Class({
	name: null,
	extent: null,
	format: null,
	tms: null,
	sourceName: null,
	startLevel: null,
	endLevel: null,
	srid: null,
	initialize: function(e, l, t, s, n, i, a, u) {
		this.name = e, this.extent = l, this.format = t, this.tms = s, this.sourceName = n, this.startLevel = i, this.endLevel = a, this.srid = u
	}
});
GeoBeans.WFSWorkspace = GeoBeans.Class(GeoBeans.Workspace, {
	server: null,
	service: "wfs",
	version: "1.0.0",
	featureTypes: null,
	xmlns: null,
	xmlnsWorkspace: null,
	workspaceName: null,
	initialize: function(e, t, n) {
		GeoBeans.Workspace.prototype.initialize.apply(this, arguments), this.server = t, this.version = n, this.featureTypes = null;
		var s = t.lastIndexOf("/"),
			r = t.substr(0, s),
			a = r.lastIndexOf("/");
		this.workspaceName = r.substr(a + 1, r.length)
	},
	destory: function() {
		this.server = null, this.version = null, this.featureTypes = null, GeoBeans.Workspace.prototype.destory.apply(this, arguments)
	},
	getFeatureTypes: function(e) {
		if (null != this.featureTypes) return this.featureTypes;
		var t = this,
			n = "service=" + this.service + "&version=" + this.version + "&request=getCapabilities";
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(n),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, n) {
				t.featureTypes = t.parseFeatureTypes(e), t.xmlns = $(e).children("WFS_Capabilities").attr("xmlns");
				var s = "xmlns:" + t.workspaceName;
				t.xmlnsWorkspace = $(e).children("WFS_Capabilities").attr(s)
			},
			complete: function(e, t) {},
			error: function() {}
		}), this.featureTypes
	},
	getFeatureTypesAsync: function(e, t) {
		if (null != this.featureTypes) return void(null != t && t(this.featureTypes));
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=getCapabilities";
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(s, r) {
				n.featureTypes = n.parseFeatureTypes(s), n.xmlns = $(s).children("WFS_Capabilities").attr("xmlns");
				var a = "xmlns:" + n.workspaceName;
				n.xmlnsWorkspace = $(s).children("WFS_Capabilities").attr(a), t(e, n.featureTypes)
			},
			complete: function(e, t) {},
			error: function() {}
		}), this.featureTypes
	},
	getFeatureType: function(e, t, n) {
		return null == e ? void(null != n && n(null)) : (this.getFeatureType_obj = t, this.getFeatureType_callback_u = n, void this.getFeatureTypesAsync(this, this.getFeatureType_callback))
	},
	getFeatureType_callback: function(e, t) {
		if (null != e && null != t) {
			for (var n = e.getFeatureType_callback_u, s = e.getFeatureType_obj, r = t.length, a = null, i = 0; i < r; i++) {
				var l = t[i];
				l.name == s.typeName && (a = l)
			}
			null != n && n(s, a)
		}
	},
	parseFeatureTypes: function(e) {
		var t = null,
			n = new Array,
			s = this;
		return $(e).find("FeatureType").each(function() {
			t = s.parseFeatureType(this), n.push(t)
		}), n
	},
	parseFeatureType: function(e) {
		var t = $(e).children("Name:first").text(),
			n = $(e).children("Title:first").text(),
			s = $(e).children("Keywords:first").text(),
			r = $(e).children("SRS:first").text(),
			a = $(e).children("LatLongBoundingBox:first"),
			i = parseFloat($(a).attr("minx")),
			l = parseFloat($(a).attr("maxx")),
			o = parseFloat($(a).attr("miny")),
			u = parseFloat($(a).attr("maxy")),
			c = new GeoBeans.Envelope(i, o, l, u),
			p = new GeoBeans.FeatureType(this);
		return p.setName(t), p.setTitle(n), p.setKeywords(s), p.setSrs(r), p.setExtent(c), p
	},
	queryByBuffer: function(e, t, n, s) {
		if (!(null == e || e < 0 || null == t || null == n)) {
			var r = n.geomFieldName,
				a = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
				i = (a.write(t), n.name),
				l = this.buildBufferXML(i, r, t, e);
			$.ajax({
				type: "post",
				url: this.server,
				contentType: "text/xml",
				data: l,
				dataType: "xml",
				async: !1,
				beforeSend: function(e) {},
				success: function(e, t) {
					var r = n.parseFeatures(e);
					s(r)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	buildBufferXML: function(e, t, n, s) {
		var r = "",
			a = this.workspaceName,
			i = 'xmlns:wfs="http://www.opengis.net/wfs"',
			l = "xmlns:" + a + '="' + this.xmlnsWorkspace + '"',
			o = 'xmlns:gml="http://www.opengis.net/gml"',
			u = 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
			c = 'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd"',
			p = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
			f = p.write(n);
		return r += '<wfs:GetFeature service="WFS" version="1.0.0"  ' + i + " " + l + " " + o + " " + u + " " + c + '><wfs:Query typeName="' + e + '"><Filter><DWithin><PropertyName>' + t + "</PropertyName>" + f + "<Distance>" + s + "</Distance></DWithin></Filter></wfs:Query></wfs:GetFeature>"
	},
	transaction: function(e, t, n, s) {
		var r = this.server,
			a = this.buildTransactionXML(e, t, n);
		$.ajax({
			type: "post",
			url: r,
			data: a,
			dataType: "xml",
			contentType: "text/xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(e, t) {
				var n = $(e),
					r = n.find("SUCCESS");
				if (0 != r.length) {
					var a = n.find("InsertResult");
					if (0 != a.length) {
						var i = a.find("FeatureId").attr("fid");
						return i = i.substr(i.lastIndexOf(".") + 1, i.length), s(i), that.features = null, void that.map.draw()
					}
				}
				var l = n.find("ServiceExceptionReport");
				if (0 != l.length) {
					var o = n.find("ServiceException").text();
					return void s(o)
				}
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	buildTransactionXML: function(e, t, n) {
		if (null != e && null != t && null != n) {
			for (var s = "", r = e.name, a = this.workspaceName, i = 'xmlns:wfs="http://www.opengis.net/wfs"', l = "xmlns:" + a + '="' + this.xmlnsWorkspace + '"', o = 'xmlns:gml="http://www.opengis.net/gml"', u = 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"', c = 'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd"', p = "", f = 0; f < n.length; ++f) {
				var h = n[f],
					m = h.field,
					y = h.value;
				e.getFieldIndex(m) != -1 && (p += "<" + a + ":" + m + ">", p += y, p += "</" + a + ":" + m + ">")
			}
			var v = new GeoBeans.Geometry.GML.Writer(GeoBeans.Geometry.GML.Version.v_2_0),
				d = v.write(t),
				x = "";
			return x += "<" + a + ":" + e.geomFieldName + ">", x += d, x += "</" + a + ":" + e.geomFieldName + ">", s += '<wfs:Transaction service="WFS" version="1.0.0"  ' + i + " " + l + " " + o + " " + u + " " + c + ">", s += "<wfs:Insert>", s += "<" + r + ">", s += p, s += x, s += "</" + r + ">", s += "</wfs:Insert>", s += "</wfs:Transaction>"
		}
	},
	getValue: function(e, t, n, s, r) {
		if (null != e && null != t && null != s) {
			null == r && (r = "asc");
			var a = this,
				i = "service=" + this.service + "&version=" + this.version + "&request=GetValue&typeName=" + e + "&field=" + t + "&type=unique&order=" + r;
			null != n && (i += "&mapName=" + n), $.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(i),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, t) {
					var n = a.parseValues(e);
					s(n)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	parseValues: function(e) {
		var t = [];
		return $(e).find("Value").each(function() {
			var e = $(this).text();
			t.push(e)
		}), t
	},
	getMinMaxValue: function(e, t, n, s) {
		if (null != e && null != t && null != s) {
			var r = this,
				a = "service=" + this.service + "&version=" + this.version + "&request=GetValue&typeName=" + e + "&field=" + t + "&type=minmax";
			null != n && (a += "&mapName=" + n), $.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(a),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, t) {
					var n = r.pareseMinMaxValue(e);
					s(n)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	pareseMinMaxValue: function(e) {
		var t = $(e).find("Min").text(),
			n = $(e).find("Max").text(),
			s = new Object;
		return s.min = parseFloat(t), s.max = parseFloat(n), s
	}
});
GeoBeans.WMSWorkspace = GeoBeans.Class(GeoBeans.Workspace, {
	server: null,
	service: "wms",
	version: "1.3.0",
	layers: null,
	extent: null,
	format: "image/png",
	srs: "EPSG:4326",
	transparent: "true",
	initialize: function(e, t, s) {
		GeoBeans.Workspace.prototype.initialize.apply(this, arguments), this.server = t, this.version = s, this.layers = null, this.extent = null
	},
	destory: function() {
		this.server = null, this.version = null, this.layers = null, this.extent = null, GeoBeans.Workspace.prototype.destory.apply(this, arguments)
	},
	getLayers: function(e) {
		return void 0 == e ? this.getLayers_sync() : void this.getLayers_aync(e)
	},
	getLayers_sync: function() {
		var e = this,
			t = "service=" + this.service + "&version=" + this.version + "&request=getCapabilities";
		return $.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(t),
			dataType: "xml",
			async: !1,
			beforeSend: function(e) {},
			success: function(t, s) {
				e.parseCapabilities(t)
			},
			complete: function(e, t) {},
			error: function() {}
		}), this.layers
	},
	getLayers_aync: function(e) {
		var t = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=getCapabilities";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(s, r) {
				t.parseCapabilities(s), e(t.layers)
			},
			complete: function(e, t) {},
			error: function(t, s) {
				null != e && e(s)
			}
		})
	},
	getMap: function(e, t, s, r, a, n) {
		var i = this,
			o = this.getMapURL(e, t, s, r, a, n);
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(o),
			dataType: "xmllayers, styles, width, height, format",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				i.parseCapabilities(e), callback(i.layers)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseCapabilities: function(e) {
		this.extent = this.parseExent($(e).find("Layer>BoundingBox").first()), this.layers = this.parseLayers($(e).find("Layer>Layer"))
	},
	parseExent: function(e) {
		if (void 0 == e) return null;
		var t = parseFloat($(e).attr("minx")),
			s = parseFloat($(e).attr("miny")),
			r = parseFloat($(e).attr("maxx")),
			a = parseFloat($(e).attr("maxy"));
		return new GeoBeans.Envelope(t, s, r, a)
	},
	parseLayers: function(e) {
		var t = this,
			s = [];
		return $(e).each(function() {
			var e = t.parseLayer(this);
			null != e && s.push(e)
		}), s
	},
	parseLayer: function(e) {
		var t = $(e).find("Name").first().text(),
			s = $(e).find("CRS").first().text(),
			r = this.parseExent($(e).find("BoundingBox").first()),
			a = $(e).find("Style>Name").first().text(),
			n = $(e).find("GeometryType").first().text(),
			i = this.getGeomType(n),
			o = new GeoBeans.Layer.MapLayer(t);
		return o.srs = s, o.extent = r, o.style_name = a, o.geomType = i, o
	},
	getGeomType: function(e) {
		var t = null;
		switch (e.toUpperCase()) {
		case "POINT":
			t = GeoBeans.Geometry.Type.POINT;
			break;
		case "LINESTRING":
			t = GeoBeans.Geometry.Type.LINESTRING;
			break;
		case "POLYGON":
			t = GeoBeans.Geometry.Type.POLYGON;
			break;
		case "MULTIPOINT":
			t = GeoBeans.Geometry.Type.MULTIPOINT;
			break;
		case "MULTILINESTRING":
			t = GeoBeans.Geometry.Type.MULTILINESTRING;
			break;
		case "MULTIPOLYGON":
			t = GeoBeans.Geometry.Type.MULTIPOLYGON
		}
		return t
	},
	getMapURL: function(e, t, s, r, a, n) {
		var i = t.xmin + "," + t.ymin + "," + t.xmax + "," + t.ymax,
			o = "service=wms";
		return o += "&version=" + this.version, o += "&request=getMap", o += "&layers=" + this.layers, o += "&width=" + s, o += "&height=" + r, o += "&format=" + a, o += "&bbox=" + i, o += null == n ? "&styles=" : "&styles=" + n
	},
	getMapLayer: function(e) {
		if (null == this.layers && (this.layers = this.getLayers_sync()), null != this.layers) {
			for (var t = 0; t < this.layers.length; ++t) {
				var s = this.layers[t];
				if (s.name == e) return s
			}
			return null
		}
	}
});
GeoBeans.WMTSWorkspace = GeoBeans.Class(GeoBeans.Workspace, {
	name: null,
	server: null,
	layers: null,
	initialize: function(e, r) {
		this.name = e, this.server = r
	},
	getLayer: function(e, r) {
		for (var n = this.getLayers(), t = null, a = 0; a < n.length; ++a) if (t = n[a], t.typeName == e) return t.setName(r), t;
		return null
	},
	getLayers: function() {
		if (null != this.server) {
			var e = this;
			return $.ajax({
				type: "get",
				url: this.server,
				dataType: "xml",
				async: !1,
				beforeSend: function(e) {},
				success: function(r, n) {
					e.layers = e.parseLayers(r)
				},
				complete: function(e, r) {},
				error: function() {}
			}), e.layers
		}
	},
	parseLayers: function(e) {
		var r = [],
			n = this;
		return $(e).find("Layer").each(function() {
			var e = n.parseLayer(this);
			r.push(e)
		}), r
	},
	parseLayer: function(e) {
		var r = $(e).find("Identifier:first").text(),
			n = $(e).find("Format:first").text(),
			t = $(e).find("TileMatrixSetLink>TileMatrixSet").text(),
			a = $(e).find("LowerCorner").text(),
			s = $(e).find("UpperCorner").text(),
			i = a.indexOf(" "),
			l = a.lastIndexOf(" "),
			o = a.slice(0, i),
			f = a.slice(l + 1, a.length);
		i = s.indexOf(" "), l = s.lastIndexOf(" ");
		var u = s.slice(0, i),
			c = s.slice(l + 1, s.length),
			p = new GeoBeans.Envelope(parseFloat(o), parseFloat(f), parseFloat(u), parseFloat(c)),
			y = new GeoBeans.Layer.WMTSLayer(r, this.server, r, p, t, n);
		return y
	}
});
GeoBeans.Service = GeoBeans.Class({
	name: null,
	mapName: null,
	url: null,
	layers: null,
	srid: null,
	extent: null,
	thumb: null,
	state: null,
	operations: null,
	initialize: function(l, t, e, s, n, i, a, r, u) {
		this.name = l, this.mapName = t, this.url = e, this.layers = s, this.srid = n, this.extent = i, this.thumb = a, this.state = r, this.operations = u
	},
	getWMSLayers: function() {
		if (!$.isArray(this.layers)) return null;
		for (var l = null, t = [], e = 0; e < this.layers.length; ++e) l = this.layers[e], null != l && t.push(l.name);
		return t
	}
});
GeoBeans.ServiceManager = GeoBeans.Class({
	service: "ims",
	version: "1.0.0",
	server: null,
	services: null,
	initialize: function(e) {
		this.server = e + "/mgr"
	},
	describeServices: function(e) {
		var t = this,
			i = "service=" + this.service + "&version=" + this.version + "&request=DescribeService";
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(i),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(i, r) {
				t.services = t.parseServices(i), void 0 != e && e(t.services)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	describeService: function(e, t) {
		if (null != e) {
			var i = this,
				r = "service=" + this.service + "&version=" + this.version + "&request=DescribeService&name=" + e;
			$.ajax({
				type: "get",
				url: this.server,
				data: encodeURI(r),
				dataType: "xml",
				async: !0,
				beforeSend: function(e) {},
				success: function(e, r) {
					var n = i.parseService(e);
					void 0 != t && t(n)
				},
				complete: function(e, t) {},
				error: function() {}
			})
		}
	},
	createService: function(e, t, i, r) {
		if (null == e || null == t || null == i) return void(null != r && r("params is null"));
		var n = this,
			s = "service=" + this.service + "&version=" + this.version + "&request=createService&name=" + e + "&mapName=" + t + "&uri=" + i;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(s),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, t) {
				var i = n.parseCreateService(e);
				void 0 != r && r(i)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	removeService: function(e, t) {
		if (null == e) return void(null != t && t("name is null"));
		var i = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=RemoveService&name=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var n = i.parseRemoveService(e);
				void 0 != t && t(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	startService: function(e, t) {
		if (null == e) return void(null != t && t("name is null"));
		var i = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=StartService&name=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var n = i.parseStartService(e);
				void 0 != t && t(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	stopService: function(e, t) {
		if (null == e) return void(null != t && t("name is null"));
		var i = this,
			r = "service=" + this.service + "&version=" + this.version + "&request=StopService&name=" + e;
		$.ajax({
			type: "get",
			url: this.server,
			data: encodeURI(r),
			dataType: "xml",
			async: !0,
			beforeSend: function(e) {},
			success: function(e, r) {
				var n = i.parseStopService(e);
				void 0 != t && t(n)
			},
			complete: function(e, t) {},
			error: function() {}
		})
	},
	parseServices: function(e) {
		if (null == e) return null;
		var t = $(e).find("ExceptionText").text();
		if ("" != t) return console.log(t), null;
		var i = [],
			r = this;
		return $(e).find("Service").each(function() {
			var e = r.parseService(this);
			null != e && i.push(e)
		}), i
	},
	parseService: function(e) {
		if (null == e) return null;
		var t = $(e).find("ExceptionText").text();
		if ("" != t) return console.log(t), null;
		var i = $(e).find("Name").first().text(),
			r = $(e).find("Map").first().text(),
			n = $(e).find("BoundingBox"),
			s = this.parseBoundingBox(n),
			c = $(e).find("SRID").first().text(),
			a = $(e).find("State").first().text(),
			o = $(e).find("Thumbnail").text(),
			u = [];
		$(e).find("Operations>Operation").each(function() {
			var e = $(this).text();
			u.push(e)
		});
		var v = [],
			l = this;
		$(e).find("Layers>Layer").each(function() {
			var e = ($(this).attr("queryable"), $(this).attr("visible")),
				t = $(this).attr("id"),
				i = $(this).find("Name").text(),
				r = $(this).find("CRS").text(),
				n = $(this).find("Type").text(),
				s = $(this).find("BoundingBox"),
				c = l.parseBoundingBox(s),
				a = {
					name: i,
					id: t,
					srid: r,
					visible: e,
					type: n,
					extent: c
				};
			v.push(a)
		});
		var f = new GeoBeans.Service(i, r, null, v, c, s, o, a, u);
		return f
	},
	parseBoundingBox: function(e) {
		if (null == e) return null;
		var t = parseFloat($(e).attr("minx")),
			i = parseFloat($(e).attr("miny")),
			r = parseFloat($(e).attr("maxx")),
			n = parseFloat($(e).attr("maxy"));
		return $.isNumeric(t) && $.isNumeric(r) && $.isNumeric(i) && $.isNumeric(n) ? new GeoBeans.Envelope(t, i, r, n) : null
	},
	parseRemoveService: function(e) {
		var t = "",
			i = $(e).find("RemoveService").text();
		return "SUCCESS" == i.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	parseCreateService: function(e) {
		var t = "",
			i = $(e).find("CreateService").text();
		return "SUCCESS" == i.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	parseStartService: function(e) {
		var t = "",
			i = $(e).find("StartService").text();
		return "SUCCESS" == i.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	},
	parseStopService: function(e) {
		var t = "",
			i = $(e).find("StopService").text();
		return "SUCCESS" == i.toUpperCase() ? t = "success" : "" != $(e).find("ExceptionText").text() && (t = $(e).find("ExceptionText").text()), t
	}
});