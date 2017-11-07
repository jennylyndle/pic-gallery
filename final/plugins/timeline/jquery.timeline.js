$
		.widget(
				"bao.timeline",
				{

					options : {
						range : 1,
						startYear : 2014,
						endYear : 2017,
						selectedYear : 2017,
						data : ''
					},

					_create : function() {
						var bindTo = this.element;// can take from option
						var data = this.options.data;
						var timeLineRow = $('<div class="row timeline"></div>')
								.data('year', data);
						var leftArrow = $('<div class="arrow arrow-left col-lg-1 col-md-1 col-sm-1 col-xs-1"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>');
						var rightArrow = $('<div class="arrow arrow-right col-lg-1 col-md-1 col-sm-1 col-xs-1 disabled"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
						timeLineRow.append(leftArrow).append(rightArrow);
						currMaxYear = data.albums[0].year;
						currMinYear = data.albums[2].year;
						this.element.append(timeLineRow);
						this._on(this.element, {
							"click.arrow-left" : function(event) {
								this._changeTimelineState(event);
							},
							"click.arrow-right" : function(event) {
								this._changeTimelineState(event);
							},
							"click.yearContent" : function(event) {
								this.element.find('.year')
										.removeClass('active');
								this.options.selectedYear = $(event.target)
										.text();
								$(event.target).parent('.year').addClass(
										'active');
								this._trigger("yearChange", event, {
									// Pass additional information unique to
									// this event
									selectedYear : this.options.selectedYear,
									data : this.options.data
								});
							}
						});
						this._update();
						this._trigger("yearChange", null, {
							// Pass additional information unique to this event
							selectedYear : this.options.selectedYear,
							data : this.options.data
						});
					},
					_setOption : function(key, value) {
						this.options[key] = value;
						this._update();
					},

					_update : function(target) {
						var data = this.options.data;
						var outerDiv = '';
						for (var i = 0; i <= 2; i++) {
							outerDiv = $('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 year"></div>');
							var yearContent = $('<div class="yearContent">'
									+ data.albums[i].year + '</div>');
							var yearSelectorClass = data.albums[i].year;
							var selector = $('<div class="selector"></div>');
							if (yearSelectorClass == this.options.selectedYear) {
								outerDiv.addClass('active');
								selector.addClass('showSelector');
								yearContent.addClass('currMaxYear');
							} else if (i == 2) {
								yearContent.addClass('currMinYear');
							}
							outerDiv.append(yearContent).append(selector);
							this.element.find('.arrow-left').after(outerDiv);
						}
					},

					_changeTimelineState : function(event) {
						var elem = this.element;
						var target = event.target;
						var prev = ($(target).hasClass('arrow-left') || $(
								target).parent().hasClass('arrow-left'));
						if (!($(target).hasClass('disabled') || $(target)
								.parent().hasClass('disabled'))) {
							elem.find('.year').hide();
							var changeYearBy = 0;
							if (prev) {
								changeYearBy = -1;
							} else {
								changeYearBy = 1;
							}
							this.element.find('.year')
									.each(
											function(index) {
												var elem = $(this).find(
														'.yearContent');
												elem.text(parseInt(elem.text())
														+ (changeYearBy));
											});
							elem.find('.year').fadeIn(500);
							currMaxYear = parseInt(this.element.find(
									'.currMaxYear').text());
							currMinYear = parseInt(this.element.find(
									'.currMinYear').text());
							if ((this.options.endYear - currMaxYear) < this.options.range) {
								this.element.find('.arrow-right').addClass(
										'disabled');
							} else
								this.element.find('.arrow-right').removeClass(
										'disabled');
							if ((currMinYear - this.options.startYear) < this.options.range) {
								this.element.find('.arrow-left').addClass(
										'disabled');
							} else
								this.element.find('.arrow-left').removeClass(
										'disabled');
							this._maintainYearSelection();

						}
					},

					_maintainYearSelection : function() {
						this.element.find('.year').removeClass('active');
						var elem = this.element.find(
								'.yearContent:contains('
										+ this.options.selectedYear + ')')
								.parent('.year');
						/*setTimeout(function(){*/elem.addClass('active')/*},200)*/;
					},

					_destroy : function() {
						this.element.find(".timeline").remove();
					}

				});
