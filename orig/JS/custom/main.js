(function(){
	'use strict';
	
	var picJson = {};
	var selectedYear = 0;
	var yearRange = 1;
	var currMaxYear = 0;
	var currMinYear = 0;
	var maxYear = 0;
	var minYear = 0;
	
	var load = function(elem,state){
		if(state)
			{
				
				$("#loader").css({
					  opacity : 0.5,
					  //top     : elem.offset().top,
					  width   : elem.outerWidth(),
					  height  : elem.outerHeight()
					});
					$("#img-load").css({
					  top  : ($("#loader").height() / 2),
					  //left : ($("#loader").width() / 2)
					});
					$("#loader").show();

			}
		else
			{
			$("#loader").fadeOut();
			}
	}

	
	var maintainYearSelection = function(){
		$('.year').removeClass('active');
		var elem = $('.yearContent:contains('+selectedYear+')');
		setTimeout(function(){elem.parent('.year').addClass('active')},200);
	};
	
	
	var showImage = function(){
		$('body').addClass('noScroll');
	    $(window).scrollTop(0);
		var imgSrc = $(this).data('full');
		var imgHeading = $(this).data('heading');
		var imgDescription = $(this).data('desc');
		var pics = $('.imageContainer').data('pics');
		var index = $(this).data('index');
		changePicNavigatorState(pics, index);
		$('.content img').attr('src',imgSrc).data('currImgIndex',index);
		$('.picHeading').text(imgHeading);
		$('.picDesc').text(imgDescription);
		$('.overlay, .content').fadeIn();
	};
	
	var createTimeLine = function(data){
		var timeLineRow = $('<div class="row timeline"></div>').data('year',data);
		var leftArrow = $('<div class="arrow arrow-left col-lg-1 col-md-1 col-sm-1 col-xs-1"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>');
		var rightArrow = $('<div class="arrow arrow-right col-lg-1 col-md-1 col-sm-1 col-xs-1 disabled"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
		timeLineRow.append(leftArrow);
		for(var i=2;i>=0;i--){
			var outerDiv = $('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 year"></div>');
			var yearContent = $('<div class="yearContent">'+data.albums[i].year+'</div>');
			var yearSelectorClass = data.albums[i].year;
			var selector = $('<div class="selector"></div>');
			if(i==0)
				{
				  outerDiv.addClass('active');
				  selector.addClass('showSelector');
				  yearContent.addClass('currMaxYear');
				}
			else if(i==2){
				  yearContent.addClass('currMinYear');
			}
			outerDiv.append(yearContent)
					.append(selector);
			timeLineRow.append(outerDiv);
		}
		timeLineRow.append(rightArrow);
		currMaxYear = data.albums[0].year;
		currMinYear = data.albums[2].year;
		$('.timeLineContainer').append(timeLineRow);
	};
	
	var createPictureGallery = function(year,eventData){
		var albumContent = $('<div class="row"></div>');
		var data = eventData.pics;
		for(var i=0;i<data.length;i++){
			var imgsrc = data[i].thumbnail_url;
			var outerDiv = $('<div class="col-lg-3 col-md-3 col-sm-5 col-xs-5 mainDiv picDiv"></div>')
							.data('full', data[i].full_url)
							.data('index', i)
							.data('heading', data[i].title)
							.data('desc', data[i].desc);
			var albumImage = $('<img class="albumPic"></img>').attr('src',imgsrc);
			outerDiv.append(albumImage)
					.on('click', showImage);
			albumContent.append(outerDiv);
				   $('.imageContainer').append(albumContent);
		}
		$('#picsHeader').text(eventData.name);
		$('#albumSummary').text(eventData.summary);
		$('.albumBreadcrumbs').fadeIn("slow");
		$('#eventName').addClass('makeLink');
		$('.imageContainer').data('pics', data).fadeIn("slow");
		load($('.overall'),false);//.fadeIn("slow")//.show();
	};
	
	var createAlbums = function(data, year){
		var galleryContent = $('<div class="row"></div>');
		$('.albumBreadcrumbs').hide();
		$('.albumContainer').html('');
		for(var i=0;i<data.albums.length;i++)
			{
			 if(data.albums[i].year == year){
				 var events = data.albums[i].events;
				 for(var j=0;j<events.length;j++)
					 {
					   var imgsrc = events[j].pics[0].thumbnail_url;
					   var albumName = events[j].name;
					   var outerDiv = $('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 mainDiv"></div>').data('pics', events[j]);
					   var albumImage = $('<img class="faceOfAlbum"></img>').attr('src',imgsrc);
					   var innerDiv = $('<div class="divOverlay"></div>');
					   var picDesc  = $('<div class="albumName"></div>').text(albumName);
					   outerDiv.append(albumImage)
					   		   .append(picDesc)
					   		   .data('eventData', events[j])
					   		   .on('click', function(){
					   			   	$('.albumContainer').hide();
					   				$('.imageContainer').html('');
					   				load($('.overall'),true);
					   			   	createPictureGallery(year,$(this).data('pics'));
					   		   		});
					   galleryContent.append(outerDiv);
						   $('.albumContainer').append(galleryContent);
					 }
			  break;	 
			 }
			 else
				 continue;
			}
		$('#eventName').text("BAO Photo Gallery "+selectedYear);
		$('.albumContainer').fadeIn();
		load($('.overall'),false);

		//console.log(galleryContent);
	};
	
	$.get( "https://jennylyndle.github.io/picGallery/JS/custom/pic.json", function( data ) {
		picJson = data;
		selectedYear = data.albums[0].year;
		maxYear = data.albums[0].year;
		var noOfYears = data.albums.length;
		minYear = data.albums[noOfYears-1].year;
		createTimeLine(data);
		$('.albumContainer').html('').hide();
		createAlbums(data, selectedYear);
		});
	
	$(document).click(function(e){
					if (e.target.class != 'content' && e.target.class!= 'mainDiv' && !$('.content').find(e.target).length && !$('.mainDiv').find(e.target).length) {
						$(".overlay, .content").hide();
						$('body').removeClass('noScroll');
				    }
				}).on('click', '.closeContainer', function(){
					$('.overlay, .content').hide();
					$('.content img').attr('src','').data('currImgIndex',0);
					$('.picHeading').text('');
					$('.picDesc').text('');
					$('body').removeClass('noScroll');

				}).on('click', '.img-prev' ,function(){
					picNavigator(this,'prev');
				}).on('click', '.img-next' ,function(){
					picNavigator(this,'next');
				}).on('click', '.year' ,function(){
					load($('.overall'),true);
					$('.year').removeClass('active')
					$(this).addClass('active');
					selectedYear = $(this).text();
					$('.imageContainer').hide();
					createAlbums(picJson, selectedYear);
				}).on('click', '.arrow-left' ,function(){
					timeLineNavigator(this, 'prev');
				}).on('click', '.arrow-right' ,function(){
					timeLineNavigator(this, 'next');
				}).on('click', '.makeLink', function(){
					$('.imageContainer').fadeOut();
					$('#eventName').removeClass('makeLink');
					$('#picsHeader').html('');
					$('.albumContainer').fadeIn();

				});	
	var changeTimelineState = function(direction){

		currMaxYear = parseInt($('.currMaxYear').text());
		currMinYear = parseInt($('.currMinYear').text());
		if((maxYear - currMaxYear) < yearRange)
			{
				$('.arrow-right').addClass('disabled');
			}
		else
			$('.arrow-right').removeClass('disabled');
		if((currMinYear - minYear)<yearRange)
		{
			$('.arrow-left').addClass('disabled');
		}
		else
		$('.arrow-left').removeClass('disabled');

	}
	var picNavigator = function(elem,direction){
		if(!$(elem).hasClass('disabled')){
			load($('.content'),true);
			var currIndex = $('.content img').data('currImgIndex');
			var pics = $('.imageContainer').data('pics');
			var indexToChange = 0;
			switch(direction){
				case 'prev':
					indexToChange = currIndex-1;
					break;
				case 'next':
					indexToChange = currIndex+1;
					break;
				default:
					//do nothing
			}
			if(pics[indexToChange]){
				$('.content img').attr('src',pics[indexToChange].full_url).data('currImgIndex',indexToChange);
			}
			changePicNavigatorState(pics, indexToChange);
			load($('.content'),false);
		}
	}
	
	var timeLineNavigator = function(elem,direction){
		if(!$(elem).hasClass('disabled'))
		{
				$('.year').hide();
				var changeYearBy = 0;
				switch(direction){
					case 'prev':
						changeYearBy = -1;
						break;
					case 'next':
						changeYearBy = 1;
						break;
					default:
						//do nothing!
				}
				$('.timeline .year').each(function(index){
					var elem = $(this).find('.yearContent');
					elem.text(parseInt(elem.text())+(changeYearBy));
				});
				$('.year').fadeIn(50);
				changeTimelineState('left');
				maintainYearSelection();

		}
	}
	
	
	var changePicNavigatorState = function(pics, currIndex){
		if(pics[currIndex-1])
			$('.img-prev').removeClass('disabled');
		else
			$('.img-prev').addClass('disabled');
		if(pics[currIndex+1])
			$('.img-next').removeClass('disabled');
		else
			$('.img-next').addClass('disabled');
	}
	
})();