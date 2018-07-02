# fabric.CurvesText by TJ
Plugin for fabric.js. 
[Plugin's page](https://tj-s.ru/tod/tekst-v-krivyih-na-fabricjs.html)

![fabric.CurvesText](https://tj-s.ru/images/img_blog1.jpg)<br />
[Demo1](https://jpgx.ru/fonts/)<br />
[Demo2](https://tj-s.ru/demo/fabricCurvesText/)

### Installation
```html
<script src="js/fabricjs.js"></script>
<script src="js/opentype.js"></script>
<script src="js/fabric.CurvesText.min.js"></script>
```

### JS
```javascript
var fontsArr = [];

// load font
opentype.load('fonts/Caveat.ttf', function (err, font) {
	if (err) {
		console.error('Error loading font ', err);
		return
	}
	
	// Add font to array
	fontsArr['Caveat'] = {
		obj: font,
		name: 'Caveat',
	}
	
	// add CurvesText
	var text = new fabric.CurvesText('fabric CurvesText plugin by TJ', {
		fontFamily: 'Caveat',
		width: 230,
		left: 20,
		top: 20,
		textAlign: 'left',
		fill: '#000000',
		fontSize: 26,
		lineHeight: 1,
	});
	canvas.add(text);
});
```