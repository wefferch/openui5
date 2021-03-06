/*!
 * ${copyright}
 */

// Provides control sap.ui.layout.HorizontalLayout.
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', './library'],
	function(jQuery, Control, library) {
	"use strict";


	
	/**
	 * Constructor for a new HorizontalLayout.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * A layout that provides support for horizontal alignment of controls
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @since 1.16.0
	 * @name sap.ui.layout.HorizontalLayout
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var HorizontalLayout = Control.extend("sap.ui.layout.HorizontalLayout", /** @lends sap.ui.layout.HorizontalLayout.prototype */ { metadata : {
	
		library : "sap.ui.layout",
		properties : {
	
			/**
			 * Specifies whether the content inside the Layout shall be line-wrapped in the case that there is less horizontal space available than required.
			 */
			allowWrapping : {type : "boolean", group : "Misc", defaultValue : false},
	
			/**
			 * Whether this HorizontalLayout is visible.
			 */
			visible : {type : "boolean", group : "Appearance", defaultValue : true}
		},
		defaultAggregation : "content",
		aggregations : {
	
			/**
			 * The controls inside this layout
			 */
			content : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
		}
	}});
	
	

	return HorizontalLayout;

}, /* bExport= */ true);
