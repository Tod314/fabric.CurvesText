/*!
 * fabric CurvesText 0.9
 * http://tj-s.ru
 *
 * description	fabricjs Plugin for CurvesText
 *
 * @copyright	Tod, tod@tj-s.ru
 * @license		GNU GENERAL PUBLIC LICENSE v3
 */
fabric.CurvesText = fabric.util.createClass(fabric.Textbox, {
	type: 'CurvesText',
	readyToRender: false,
	fontFamily: 'journalism',
	fontSize: 18,
	lineHeight: 1,
	textAlign: 'center',
	fill: '#ff0000',
	initialize: function(text, options) {
		this.callSuper('initialize', text, options);
		this.readyToRender = true;
		if (this.canvas) this.canvas.requestRenderAll();
	},
	_renderChar: function(method, ctx, lineIndex, charIndex, _char, left, top) {
		if (!this.readyToRender) return;

		var font = fontsArr[this.fontFamily].obj;
		var path = font.getPath(_char, left, top, this.fontSize);
		path.fill = this.fill;
		path.draw(ctx);
		
		if (typeof(this.pathData) == 'undefined'){
			this.pathData = [];
		}
		this.pathData[lineIndex] = {
			left: left,
			top: top
		};
	},
	_measureChar: function(_char, charStyle, previousChar, prevCharStyle) {
		var fontCache = this.getFontCache(charStyle), 
			fontDeclaration = this._getFontDeclaration(charStyle), 
			previousFontDeclaration = this._getFontDeclaration(prevCharStyle), 
			couple = previousChar + _char, 
			stylesAreEqual = fontDeclaration === previousFontDeclaration, 
			width, coupleWidth, previousWidth;
		
		if (previousChar && fontCache[previousChar]) {
			previousWidth = fontCache[previousChar];
		}
		if (fontCache[_char]) {
			kernedWidth = width = fontCache[_char];				
		}
		if (stylesAreEqual && fontCache[couple]) {
			coupleWidth = fontCache[couple];
			kernedWidth = coupleWidth - previousWidth;
		}
		if (!width || !previousWidth || !coupleWidth) {
			var ctx = this.getMeasuringContext();
			this._setTextStyles(ctx, charStyle, true);
		}

		var tmp_width
		var font = fontsArr[charStyle.fontFamily].obj;
		font.forEachGlyph(_char+' ', 0, 0, charStyle.fontSize, {}, function(glyph, x, y) {
			  kernedWidth = width = x;
		});
		
		fontCache[_char] = width;
		
		if (!previousWidth && stylesAreEqual && previousChar) {
			var font = fontsArr[prevCharStyle.fontFamily].obj;
			font.forEachGlyph(previousChar+' ', 0, 0, prevCharStyle.fontSize, {}, function(glyph, x, y) {
				  previousWidth = x;
			});
			fontCache[previousChar] = previousWidth;
		}
		if (stylesAreEqual && !coupleWidth) {
			
			var font = fontsArr[prevCharStyle.fontFamily].obj;
			coupleWidth = 0;
			font.forEachGlyph(couple+' ', 0, 0, prevCharStyle.fontSize, {}, function(glyph, x, y) {
				  coupleWidth = x;
			});
			
			fontCache[couple] = coupleWidth;
			kernedWidth = coupleWidth - previousWidth;
		}
		
		return {
			width: width,
			kernedWidth: kernedWidth
		};
	},
	toSVG: function(reviver) {
		var result = '';
				
		var font = fontsArr[this.fontFamily].obj;
		for (var i = 0; i < this._textLines.length; i++) {
			var pos = {
				left: this.left+this.width/2 + this.pathData[i].left,
				top: this.top+this.height/2 + this.pathData[i].top
			}

			var path = font.getPath(this._textLines[i], pos.left, pos.top, this.fontSize);
			path.fill = this.fill;
			result += path.toSVG();
		}
		
		if (this.angle != 0){
			result = '<g transform="rotate('+this.angle+', '+(this.left)+', '+(this.top)+')">'+result+'</g>'
		}
		
		return result;
	}
});	

fabric.CurvesText.fromObject = function(object, callback) {
	fabric.Object._fromObject("CurvesText", object, callback, "text");
};