/*!
 * ${copyright}
 */

// Provides control sap.m.ScrollContainer.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control'],
	function(jQuery, library, Control) {
	"use strict";


	
	/**
	 * Constructor for a new ScrollContainer.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * The ScrollContainer is a control that can display arbitrary content within a limited screen area and provides touch scrolling to make all content accessible.
	 * 
	 * Note that it is not recommended to have nested scrolling areas that scroll into the same direction (e.g. a ScrollContainer that scrolls vertically inside a Page control with scrolling enabled). This is currently not considered a valid use-case of a good UI and the behavior will feel wrong.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @name sap.m.ScrollContainer
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var ScrollContainer = Control.extend("sap.m.ScrollContainer", /** @lends sap.m.ScrollContainer.prototype */ { metadata : {
	
		library : "sap.m",
		properties : {
	
			/**
			 * Invisible scroll containers are not rendered
			 */
			visible : {type : "boolean", group : "Appearance", defaultValue : true},
	
			/**
			 * The width of the ScrollContainer.
			 * If not set, it consumes the complete available width, behaving like normal HTML block elements. If only vertical scrolling is enabled, make sure the content always fits or wraps.
			 */
			width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : 'auto'},
	
			/**
			 * The height of the ScrollContainer.
			 * By default the height equals the content height. If only horizontal scrolling is used, do not set the height or make sure the height is always larger than the height of the content.
			 * 
			 * Note that when a percentage is given, for the height to work as expected, the height of the surrounding container must be defined.
			 */
			height : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : 'auto'},
	
			/**
			 * Whether horizontal scrolling should be possible.
			 */
			horizontal : {type : "boolean", group : "Behavior", defaultValue : true},
	
			/**
			 * Whether vertical scrolling should be possible.
			 * 
			 * Note that this is off by default because typically a Page is used as fullscreen element which can handle vertical scrolling. If this is not the case and vertical scrolling is required, this flag needs to be set to "true".
			 * Important: it is not supported to have nested controls that both enable scrolling into the same dimension.
			 */
			vertical : {type : "boolean", group : "Behavior", defaultValue : false}
		},
		defaultAggregation : "content",
		aggregations : {
	
			/**
			 * The content of the ScrollContainer.
			 */
			content : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
		}
	}});
	
	
	/**
	 * Scrolls to the given position.
	 * When called while the control is not rendered (yet), the scrolling position is still applied, but there is no animation.
	 *
	 * @name sap.m.ScrollContainer#scrollTo
	 * @function
	 * @param {int} iX
	 *         The horizontal pixel position to scroll to.
	 *         Scrolling to the right happens with positive values.
	 *         If only vertical scrolling is enabled, give 0 as value.
	 * @param {int} iY
	 *         The vertical pixel position to scroll to.
	 *         Scrolling down happens with positive values.
	 *         If only horizontal scrolling is enabled, give 0 as value.
	 * @param {int} iTime
	 *         The duration of animated scrolling.
	 *         To scroll immediately without animation, give 0 as value. 0 is also the default value, when this optional parameter is omitted.
	 * @type sap.m.ScrollContainer
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	
	
	/*
	 * Better nested scrolling capabilities can be added to iScroll like this (in the _move method).
	 * eDir is the direction into which scrolling is handled (if locked) and bOutside is true when we are outside the scolling boundary already; both
	 * need to be initialized a couple of lines before this code.
	 * 
	 * 		e._handled = e._handled || {};
	 *		if (e._handled[eDir]) { // current direction already handled
	 *			return;
	 *		}
	 *		
	 *		// add information about what this handler handles
	 *		e._handled.x = e._handled.x || ((eDir == "x") && !bOutside);
	 *		e._handled.y = e._handled.y || ((eDir == "y") && !bOutside);
	 *		
	 */
	
	/*
	 * TODO:
	 * - events when scrolling is ongoing
	 */
	
	
	ScrollContainer.prototype.init = function() {
		jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");
		this._oScroller = new sap.ui.core.delegate.ScrollEnablement(this, this.getId() + "-scroll", {
			horizontal: true,
			vertical: false,
			zynga: false,
			preventDefault: false,
			nonTouchScrolling: "scrollbar"
		});
		// TODO: do the resize listening only when ScrollContainer becomes visible and unbind when getting visible
	};
	
	ScrollContainer.prototype.onBeforeRendering = function() {
		// properties are not known during init
		this._oScroller.setHorizontal(this.getHorizontal());
		this._oScroller.setVertical(this.getVertical());
	};
	
	
	/**
	 * Called when the control is destroyed.
	 *
	 * @private
	 */
	ScrollContainer.prototype.exit = function() {
		if (this._oScroller) {
			this._oScroller.destroy();
			this._oScroller = null;
		}
	};
	
	/**
	 * Returns the sap.ui.core.ScrollEnablement delegate which is used with this control.
	 *
	 * @private
	 */
	ScrollContainer.prototype.getScrollDelegate = function() {
		return this._oScroller;
	};
	
	//*** API Methods ***
	
	ScrollContainer.prototype.scrollTo = function(x, y, time) {
		if (this._oScroller) {
			if (this.getDomRef()) { // only if rendered
				this._oScroller.scrollTo(x, y, time);
			} else {
				this._oScroller._scrollX = x; // remember for later rendering
				this._oScroller._scrollY = y;
			}
		}
		return this;
	};
	
	
	ScrollContainer.prototype.setHorizontal = function(horizontal) {
		this._oScroller.setHorizontal(horizontal);
		this.setProperty("horizontal", horizontal, true); // no rerendering
	};
	
	ScrollContainer.prototype.setVertical = function(vertical) {
		this._oScroller.setVertical(vertical);
		this.setProperty("vertical", vertical, true); // no rerendering
	};
	

	return ScrollContainer;

}, /* bExport= */ true);
