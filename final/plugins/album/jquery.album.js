$
		.widget(
				"bao.album",
				{

					options : {
						selectedYear : 2017,
						data : '',
						visible : true
					},

					_create : function() {
						var content = '<div class="container albumContainer">'+
										'<div class="row"></div>'+
									  '</div>';

						this.element.append($(content));
						this._on(this.element,
								{
									'click.mainDiv' : function(event) {
										//this.element.hide();
										var elem = '';
										if($(event.target).hasClass('mainDiv'))
											elem = $(event.target);
										else {
											elem = $(event.target).parent('.mainDiv');
										}
										this._trigger( "albumOpened", event, {
							  			      // Pass additional information unique to this event
							  			      value: elem.data('pics')
							  			    });
										//createPictureGallery(year, $(this)
											//	.data('pics'));
									}
								});
						this._update();
					},
					_setOption : function(key, value) {
						this.options[key] = value;
						this._update();
					},

					_update : function() {
						var elem = this.element;
						if(!this.options.visible)
							{
								elem.find('.albumContainer').hide();
							}
						else
							{
							var galleryContent = elem.find('.albumContainer .row');
							galleryContent.html('');
							//elem.find('.albumBreadcrumbs').hide();
							elem.find('.albumContainer').html('');
							var data = this.options.data;
							for (var i = 0; i < data.albums.length; i++) {
								if (data.albums[i].year == this.options.selectedYear) {
									var events = data.albums[i].events;
									for (var j = 0; j < events.length; j++) {
										var imgsrc = events[j].pics[0].thumbnail_url;
										var albumName = events[j].name;
										var outerDiv = $(
												'<div class="col-lg-3 col-md-3 col-sm-3 col-xs-5 mainDiv"></div>')
												.data('pics', events[j]);
										var albumImage = $(
												'<img class="faceOfAlbum"></img>')
												.attr('src', imgsrc);
										var innerDiv = $('<div class="divOverlay"></div>');
										var picDesc = $(
												'<div class="albumName"></div>')
												.text(albumName);
										outerDiv.append(albumImage).append(picDesc)
												.data('eventData', events[j]);
										galleryContent.append(outerDiv);
										elem.find('.albumContainer').append(
												galleryContent);
									}
									break;
								} else
									continue;
							}
							// $('#eventName').text("BAO Photo Gallery
							// "+selectedYear);
							elem.find('.albumContainer').fadeIn();
							}

					},

					_destroy : function() {
						this.element.find(".albumContainer").remove();
					}

				});
