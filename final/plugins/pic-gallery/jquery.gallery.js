$
		.widget(
				"bao.gallery",
				{

					options : {
						data : '',
						visible : false
					},

					_create : function() {
						var content = '<div class="picsContainer">'
								+ '<div class="albumBreadcrumbs">'
								+ '<h3 class="picsHeader"></h3>'
								+ '<p class="albumSummary"></p>' + '</div>'
								+ '<div class="container imageContainer">'
								+ '<div class="row"></div>' + '</div>'
								+ '</div>';
						this.element.append($(content));
						this._on(this.element, {
							'click.picDiv' : function(event) {
								var elem = $(event.target);
								this._trigger("showImage", event, {
									// Pass additional information unique to
									// this event

									imgSrc : elem.data('full'),
									imgHeading : elem.data('heading'),
									imgDescription : elem.data('desc'),
									pics : this.element.find('.imageContainer')
											.data('pics'),
									index : elem.data('index')
								});
							}
						});
						this._update();
					},
					_setOption : function(key, value) {
						this.options[key] = value;
						this._update();
					},

					_update : function() {
						if (this.options.visible) {
							var data = this.options.data.pics;
							this.element.find('.imageContainer .row')
							.html('');
							var eventData = this.options.data;
							for (var i = 0; i < data.length; i++) {
								var imgsrc = data[i].thumbnail_url;
								var outerDiv = $('<div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 picDiv"></div>');
								var albumImage = $(
										'<img class="albumPic"></img>').attr(
										'src', imgsrc).data('full',
										data[i].full_url).data('index', i)
										.data('heading', data[i].title).data(
												'desc', data[i].desc);
								outerDiv.append(albumImage);/*
								 * .on('click',
								 * showImage);
								 */
								this.element.find('.imageContainer .row')
										.append(outerDiv);
							}
							this.element.find('.picsHeader').text(
									eventData.name);
							this.element.find('.albumSummary').text(
									eventData.summary);
							this.element.find('.albumBreadcrumbs').fadeIn(
									"slow");
							// this.element.find('#eventName').addClass('makeLink');
							this.element.find('.imageContainer').data('pics',
									data);
							this.element.find(".picsContainer").fadeIn("slow");
							// load($('.overall'), false);//
							// .fadeIn("slow")//.show();
						} else {
							this.element.find(".picsContainer").hide();
						}

					},

					_destroy : function() {
						this.element.find(".picsContainer").remove();
					}

				});
