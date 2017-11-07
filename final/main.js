(function($) {
	'use strict';
	
	//shows the picture gallery
	var showGallery = function(event, val) {
		$('.overall').load();
		//setTimeout(function(){
		$('.overall').album({
			visible : false
		});
		$('.overall').gallery({
			data : val.value,
			showImage : showImage,
			visible : true
		});
		$('.overall').load('destroy');//},10000);
	}
	
	//shows the event gallery
	var showAlbums = function(event, val) {
		$('.overall').load();
	//	setTimeout(function(){
			$('.overall').gallery({
				visible : false
			});
			$('.overall').album({
				visible : true,
				selectedYear : val.selectedYear,
				data : val.data,
				albumOpened : showGallery
			});
			$('.overall').load('destroy');
		//},10000);
	}
	
	//shows individual image details
	var showImage = function(event, data) {
		$('.overall').imageDetail({
			imgSrc : data.imgSrc,
			imgHeading : data.imgHeading,
			imgDescription : data.imgDescription,
			pics : data.pics,
			index : data.index,
			visibility : true
		});
	}
	
	//the below code should be called when the gallery button/link is clicked from the main page
	$.get("https://jennylyndle.github.io/picGallery/orig/JS/custom/pic.json",
			function(data) {
				$('.timeLineContainer').timeline({
					data : data,
					yearChange : showAlbums
				});
			})
})(jQuery);
