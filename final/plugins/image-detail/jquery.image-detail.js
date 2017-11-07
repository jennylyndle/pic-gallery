$
		.widget(
				"bao.imageDetail",
				{

					options : {
						imgSrc : "",
			    		imgHeading : "",
			    		imgDescription : "",
			    		pics : '',
			    		index : 0,
			    		visibility:false,
			    		closeOnBlur:true
					},

					_create : function() {
						var content = '<div class="overlay"></div>'+
								'<div class="imageContent">'
								+ '<span class="closeContainer">'
								+ '<span class="hidden-sm hidden-xs">close</span>'
								+ '<i class="fa fa-times" aria-hidden="true"></i>'
								+ '</span>'
								+ '<div class="row" style="margin-top: 1%;">'
								+ '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">'
								+ '<span>'
								+ '<i class="fa fa-chevron-left img-prev" aria-hidden="true"></i>'
								+ '</span>'
								+ '</div>'
								+ '<div class="col-lg-7 col-md-7 col-sm-7 col-xs-10">'
								+ '<div class="row" style="margin-bottom:1.5%;">'
								+ '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
								+ '<h1 class="picHeading">Heading</h1>'
								+ '</div>'
								+ '</div>'
								+ '<div class="row viewImageContainer">'
								+ '<img class="imgToShow" src=""></img>'
								+ '</div>'
								+ '</div>'
								+ '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">'
								+ '<span><i class="fa fa-chevron-right img-next" aria-hidden="true"></i></span>'
								+ '</div>'
								+ '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">'
								+ '<div class="col-lg-12 picDesc"> description </div>'
								+ '</div>' + '</div>' + '</div>';
						this.element.append($(content));
						this._on(this.element, {
							'click.img-prev' : function(event) {
								this._picNavigator(this.element.find('.img-prev'));
							}
						});
						
						this._on(this.element, {
							'click.img-next' : function(event) {
								this._picNavigator(this.element.find('.img-next'));
							}
						});
						
						this._on(this.element,{'click.closeContainer': function(){
								this._clearImageDetails();
								$('body').removeClass('noScroll');
							}
						});
						
						this._on(this.element,{'click.overlay': function(event){
							this.options.visibility = false;
							this._update();
							$('body').removeClass('noScroll');
						}
					});
						this._update();
					},
					_clearImageDetails : function(){
						this.options.visibility = false;
						this._update();
						this.element.find('.imageContent .imgToShow').attr('src','').data('currImgIndex',0);
						this.element.find('.picHeading').text('');
						this.element.find('.picDesc').text('');
					},
					_setOption : function(key, value) {
						this.options[key] = value;
						this._update();
					},
					_picNavigator: function(target){
						if(!$(target).hasClass('disabled')){
							this.element.find('.imageContent').load();
							var currIndex = this.element.find('.imageContent .imgToShow').data('currImgIndex');
							var pics = this.options['pics'];
							var indexToChange = currIndex-1;
							if($(target).hasClass('img-next'))
								{
									indexToChange = currIndex+1
								}
							if(pics[indexToChange]){
								this.element.find('.imageContent .imgToShow').attr('src',pics[indexToChange].full_url).data('currImgIndex',indexToChange);
								this.element.find('.picHeading').text(pics[indexToChange].title);
								this.element.find('.picDesc').text(pics[indexToChange].desc);
							}
							this._changePicNavigatorState(pics, indexToChange);
							this.element.find('.imageContent').load('destroy');
							//load($('.imageContent'),false);
						}
					},
					_changePicNavigatorState : function(pics, currIndex){
						if(pics[currIndex-1])
							this.element.find('.img-prev').removeClass('disabled');
						else
							this.element.find('.img-prev').addClass('disabled');
						if(pics[currIndex+1])
							this.element.find('.img-next').removeClass('disabled');
						else
							this.element.find('.img-next').addClass('disabled');
					},


					_update : function() {
						$('body').addClass('noScroll');
						$(window).scrollTop(0);
						if(this.options.visibility){
							this.element.find('.overlay, .imageContent').show();
							var data = this.options;
							var imgSrc = data['imgSrc'];
							var imgHeading = data['imgHeading'];
							var imgDescription = data['imgDescription'];
							var pics = data['pics'];
							var index = data['index'];
							this._changePicNavigatorState(pics, index);
							this.element.find('.imageContent .imgToShow').attr('src', imgSrc).data(
									'currImgIndex', index);
							this.element.find('.picHeading').text(imgHeading);
							this.element.find('.picDesc').text(imgDescription);
						}
						else{
							this.element.find('.overlay, .imageContent').hide();
						}
						
					},

					_destroy : function() {
						this.element.find(".imageContent").remove();
					}

				});
