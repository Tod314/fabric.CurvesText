var fontsArr = [];

$(document).ready(function(){
	
	opentype.load('fonts/Caveat.ttf', function (err, font) {
		if (err) {
			console.error('Error loading font ', err);
			return
		}
		fontsArr['Caveat'] = {
			obj: font,
			name: 'Caveat',
		}
		init();
	});
	
	$('#save').click(function(){
		var svg = canvas.toSVG();
		$('#result').html(svg);
		$('#result_txt').text(svg);
	})
	
	function init(){
		canvas = new fabric.Canvas('c', {
			width: 500,
			height: 200,
			preserveObjectStacking: true
		});
		
		
		var text = new fabric.CurvesText('fabric CurvesText plugin by TJ-s', {
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
	}
	
});


