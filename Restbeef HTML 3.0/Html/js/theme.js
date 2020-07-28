/*
 * Created by Pixel-Mafia
 * www.pixel-mafia.com
*/
"use strict";

var	restbeef_window = jQuery(window),
	restbeef_header = jQuery('header.restbeef_main_header'),
	restbeef_footer = jQuery('footer.restbeef_footer'),
	restbeef_nav = jQuery('.restbeef_nav'),
	restbeef_menu = jQuery('.restbeef_menu'),
    restbeef_dp = jQuery('.restbeef_dp'),
    restbeef_body = jQuery('body');

// Photoswipe Lightbox
if (jQuery('.restbeef_photoswipe_wrapper').length > 0) {
	var photoswipe_html = '\
	<!-- Root element of PhotoSwipe. Must have class pswp. -->\
	<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\
		<div class="pswp__bg"></div><!-- PSWP Background -->\
		\
		<div class="pswp__scroll-wrap">\
			<div class="pswp__container">\
				<div class="pswp__item"></div>\
				<div class="pswp__item"></div>\
				<div class="pswp__item"></div>\
			</div><!-- .pswp__container -->\
			\
			<div class="pswp__ui pswp__ui--hidden">\
				<div class="pswp__top-bar">\
					<!--  Controls are self-explanatory. Order can be changed. -->\
					<div class="pswp__counter"></div>\
					\
					<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\
					<button class="pswp__button pswp__button--share" title="Share"></button>\
					<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\
					\
					<!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\
					<!-- element will get class pswp__preloader--active when preloader is running -->\
					<div class="pswp__preloader">\
						<div class="pswp__preloader__icn">\
						  <div class="pswp__preloader__cut">\
							<div class="pswp__preloader__donut"></div>\
						  </div><!-- .pswp__preloader__cut -->\
						</div><!-- .pswp__preloader__icn -->\
					</div><!-- .pswp__preloader -->\
				</div><!-- .pswp__top-bar -->\
				\
				<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
					<div class="pswp__share-tooltip"></div>\
				</div><!-- .pswp__share-modal -->\
				\
				<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
				<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
				\
				<div class="pswp__caption">\
					<div class="pswp__caption__center"></div>\
				</div><!-- .pswp__caption -->\
			</div><!-- .pswp__ui pswp__ui--hidden -->\
		</div><!-- .pswp__scroll-wrap -->\
	</div><!-- .pswp -->\
	';

	jQuery('body').append(photoswipe_html);

	var $pswp = jQuery('.pswp')[0],
		$pswp_gallery_array = [];

	jQuery('.restbeef_photoswipe_wrapper').each(function(){
		var this_id = jQuery(this).attr('data-uniqid');
		$pswp_gallery_array['restbeef_gallery_' + this_id] = {};
		$pswp_gallery_array['restbeef_gallery_' + this_id].slides = [];
		jQuery(this).find('.restbeef_pswp_slide').each(function(){
			if (jQuery(this).hasClass('restbeef_pswp_video_slide')) {
				var restbeef_thishref = jQuery(this).attr('href');
				if(restbeef_thishref.indexOf('youtu') + 1) {
					//YT Video
					var videoid_split = restbeef_thishref.split('='),
						videoid = videoid_split[1],
						restbeef_pswp_html = '<div class="restbeef_pswp_video_wrapper"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + videoid + '?controls=1&autoplay=0&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe></div>';
				}
				if(restbeef_thishref.indexOf('vimeo') + 1) {
					//Vimeo Video
					var videoid_split = restbeef_thishref.split('m/'),
						videoid = videoid_split[1],
						restbeef_pswp_html = '<div class="restbeef_pswp_video_wrapper"><iframe width="100%" height="100%" src="https://player.vimeo.com/video/' + videoid + '?api=1&amp;title=0&amp;byline=0&amp;portrait=0&autoplay=0&loop=0&controls=1" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe></div>';0
				}
				var this_item = {
					html : restbeef_pswp_html
				}
				$pswp_gallery_array['restbeef_gallery_' + this_id].slides.push(this_item);
			} else {
				var item_size = jQuery(this).data('size').split('x'),
					item_width = item_size[0],
					item_height = item_size[1],
					this_item = {
						src : jQuery(this).attr('href'),
						w : item_width,
						h : item_height
					};
				$pswp_gallery_array['restbeef_gallery_' + this_id].slides.push(this_item);
			}
		});
	});
}

jQuery(document).on('click', '.restbeef_pswp_slide', function (event) {
	event.preventDefault();
	var $index = parseInt(jQuery(this).attr('data-count'), 10),
		this_id = jQuery(this).parents('.restbeef_photoswipe_wrapper').attr('data-uniqid'),
		options = {
		index: $index,
		bgOpacity: 0.7,
		showHideOpacity: true
	};

	// Initialize PhotoSwipe
	var restbeef_lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, $pswp_gallery_array['restbeef_gallery_' + this_id].slides, options);
	restbeef_lightBox.init();
	if ( $pswp_gallery_array['restbeef_gallery_' + this_id].slides.length == 1 ) {
		if (jQuery('.restbeef_pswp_video_wrapper').length) {
			var restbeef_window_height = restbeef_window.height();
			if (jQuery('.pswp__top-bar').length) {
				restbeef_window_height = restbeef_window_height - jQuery('.pswp__top-bar').height()*2;
			}
			if (jQuery('#wpadminbar').length) {
				restbeef_window_height = restbeef_window_height - jQuery('#wpadminbar').height();
			}
			if ((restbeef_window.width()/16)*9 > restbeef_window_height) {
				var set_width = (restbeef_window_height/9)*16,
					set_height = restbeef_window_height;
			} else {
				var set_height = (restbeef_window.width()/16)*9,
					set_width = restbeef_window.width();
			}
			jQuery('.restbeef_pswp_video_wrapper').width(set_width).height(set_height);
		}
	}
	restbeef_lightBox.listen('gettingData', function(index, item) {
		if (jQuery('.restbeef_pswp_video_wrapper').length) {
			var restbeef_window_height = restbeef_window.height();
			if (jQuery('.pswp__top-bar').length) {
				restbeef_window_height = restbeef_window_height - jQuery('.pswp__top-bar').height()*2;
			}
			if (jQuery('#wpadminbar').length) {
				restbeef_window_height = restbeef_window_height - jQuery('#wpadminbar').height();
			}
			if ((restbeef_window.width()/16)*9 > restbeef_window_height) {
				var set_width = (restbeef_window_height/9)*16,
					set_height = restbeef_window_height;
			} else {
				var set_height = (restbeef_window.width()/16)*9,
					set_width = restbeef_window.width();
			}
			jQuery('.restbeef_pswp_video_wrapper').width(set_width).height(set_height);
		}
	});
});

jQuery(document).ready(function(){
	// Content FadeIn on Load
	if(jQuery('.fadeOnLoad').length) {
		setTimeout("jQuery('.fadeOnLoad').removeClass('fadeOnLoad')", 300);
	}
	
	// Background CSS From JS
	if (jQuery('.restbeef_js_bg_image').length) {
		jQuery('.restbeef_js_bg_image').each(function(){
			jQuery(this).css('background-image', 'url('+jQuery(this).attr('data-background')+')');
		});
	}
	// Margin CSS From JS
	if (jQuery('.restbeef_js_margin').length) {
		jQuery('.restbeef_js_margin').each(function(){
			jQuery(this).css('margin', jQuery(this).attr('data-margin'));
		});
	}
	// Padding CSS From JS
	if (jQuery('.restbeef_js_padding').length) {
		jQuery('.restbeef_js_padding').each(function(){
			jQuery(this).css('padding', jQuery(this).attr('data-padding'));
		});
	}
	
	// Back To Top
	jQuery('.restbeef_back_to_top').on('click',function(e){
		e.preventDefault();
		jQuery('html, body').stop().animate({scrollTop: 0}, 500);
	});
	
	// OWL Activation
	if (jQuery('.restbeef_blog_pf_slider').length) {
		jQuery('.restbeef_blog_pf_slider').each(function(){
			jQuery(this).owlCarousel({
				items:1,
				lazyLoad:true,
				loop:true,
				dots:true,
				nav:false,
				autoplay:true,
				autoplayTimeout:5000,
				autoplayHoverPause:true,
				autoHeight:true
			});
		});
	}
	if (jQuery('.restbeef_header_slider').length) {
		jQuery('.restbeef_header_slider').each(function(){
			jQuery(this).owlCarousel({
				items:1,
				lazyLoad:true,
				loop:true,
				dots:true,
				nav:false,
				autoplay:true,
				autoplayTimeout:5000,
				autoplayHoverPause:true,
				autoHeight:false,
				smartSpeed: 1000,
			});
		});
	}
	
	if (jQuery('.restbeef_testimonials_carousel').length) {
		jQuery('.restbeef_testimonials_carousel').each(function(){
			jQuery(this).owlCarousel({
				items:jQuery(this).attr('data-items'),
				lazyLoad:true,
				loop:true,
				dots:true,
				nav:false,
				autoplay:false,
				autoplayTimeout:5000,
				autoplayHoverPause:true,
				autoHeight:true,
				margin:30,
				dotsEach: true,
				responsive: {
					// breakpoint from 0 up
					0: {
						// Mobile Phone
						items: 1
					},
					760: {
						// Tablet Port
						margin:20,
					},
					960: {
						// Tablet Land
						margin:30,
					}
				}
			});			
		});
	}
	
	// Isotope Activation
	if (jQuery('.restbeef_isotope_trigger').length) {
		jQuery('.restbeef_isotope_trigger').each(function(){
			jQuery(this).isotope({
				layoutMode: 'masonry'
			});
		});
	}
	
	// Custom Select
	jQuery('.restbeef_tiny').find('select').each(function(){
		var $this = jQuery(this), 
			numberOfOptions = $this.children('option').length,
            thisWidth = $this.width() + parseInt($this.css('padding-left'),10) + parseInt($this.css('padding-right'),10),
            this_val = $this.val();
		$this.addClass('select-hidden'); 
	
		$this.wrap('<div class="restbeef_select_wrapper" style = "min-width: '+ thisWidth +'px"></div>');
		$this.after('<div class="restbeef_select"></div>');

		var $styledSelect = $this.next('div.restbeef_select');
        if (this_val == '') {
            $styledSelect.text($this.children('option').eq(0).text());
        } else {
            $styledSelect.text($this.children('option[value="'+ this_val +'"]').text());
        }

		var $list = jQuery('<ul />', {
			'class': 'select-options'
		}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			jQuery('<li />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val()
			}).appendTo($list);
		}

		var $listItems = $list.children('li');

		$styledSelect.on('click', function(e) {
			e.stopPropagation();
            var $this_list = jQuery(this).next('ul.select-options'),
                max_height = restbeef_window.height()/2;
            
			jQuery('div.restbeef_select.active').not(this).each(function(){
                var $this_list = jQuery(this).next('ul.select-options');
				jQuery(this).removeClass('active').next('ul.select-options').hide();
                $this_list.removeClass('long_select').css('max-height', 'none');
			});
            
            if ($this_list.height() > max_height && !jQuery(this).hasClass('active')) {
                $this_list.addClass('long_select');
                $this_list.css('max-height', max_height+'px');
            } else {
                $this_list.removeClass('long_select').css('max-height', 'none');
            }
			jQuery(this).toggleClass('active').next('ul.select-options').toggle();
            
		});

		$listItems.on('click', function(e) {
			e.stopPropagation();
			$styledSelect.text(jQuery(this).text()).removeClass('active');
			$this.val(jQuery(this).attr('rel'));
            $this.trigger('change');
			$list.hide().removeClass('long_select').css('max-height', 'none');
		});

		jQuery(document).on('click', function() {
			$styledSelect.removeClass('active');
			$list.hide().removeClass('long_select').css('max-height', 'none');
		});
	});
	
	jQuery('.restbeef_tiny').find('input[type="date"]').each(function(){
		var this_input = jQuery(this);
		
		if (this_input.attr('data-placeholder')) {
			this_input.wrap('<div class="restbeef_input_date"/>');
			this_input.after('<div class="restbeef_input_placeholder">'+ this_input.attr('data-placeholder') +'</div>');
		}
	});
	
	jQuery(document).on('focus', '.restbeef_input_date input', function(){
		jQuery(this).parent().find('.restbeef_input_placeholder').hide();
	}).on('blur', '.restbeef_input_date input', function(){
		if (jQuery(this).val() == '') {
			jQuery(this).parent().find('.restbeef_input_placeholder').show();
		}
	});
	
	// Mobile Menu
	jQuery('li.menu-item-has-children > a').on('click', function(e){
		if (restbeef_window.width() < 760) {
			e.preventDefault();
			jQuery(this).parent().toggleClass('menu-item-showed');
			jQuery(this).parent().children('ul').slideToggle(300);
		}
	});
	
	jQuery('a.restbeef_mobile_menu_toggler').on('click', function(e){
		e.preventDefault();
		jQuery(this).toggleClass('restbeef_mobile_menu_close');
		jQuery(this).parents('.restbeef_header_content').find('nav.restbeef_nav').slideToggle(300);
	});
	
	// Contact Form
	jQuery('#contact_form input[type=submit]').on('click', function () {
		var this_contact = jQuery(this).parents('form');

		jQuery.post('mail.php', {
			send_mail: 'true',
			form_type: 'contact',
			form_name: this_contact.find('input[name=your_name]').val(),
			form_email: this_contact.find('input[name=your_email]').val(),
			form_text: this_contact.find('textarea[name=your_message]').val()
		}).done(function (data) {
			alert(data);
		});

		return false;
	});

	// Reservation Form
	jQuery('#reservation_form input[type=submit]').on('click', function () {
		var this_contact = jQuery(this).parents('form');

		jQuery.post('mail.php', {
			send_mail: 'true',
			form_type: 'reservation',
			form_date: this_contact.find('[name=your_date]').val(),
			form_time: this_contact.find('[name=your_time]').val(),
			form_guests: this_contact.find('[name=your_guests]').val(),
			form_name: this_contact.find('[name=your_name]').val(),
			form_email: this_contact.find('[name=your_email]').val(),
			form_phone: this_contact.find('[name=your_phone]').val(),
			form_text: this_contact.find('[name=your_text]').val()
		}).done(function (data) {
			alert(data);
		});

		return false;
	});


	
	
	// Theme Setup
	restbeef_setup();
	
});

jQuery(window).resize(function(){
	restbeef_setup();
});

jQuery(window).on('load', function(){
	restbeef_setup();
});

function restbeef_setup() {
	
	if (jQuery('.restbeef_fullwidth')) {
		jQuery('.restbeef_fullwidth').each(function(){
			var this_block = jQuery(this),
				this_parent = this_block.parents('.restbeef_content'),
				offset = (restbeef_window.width() - this_parent.width())/2;

			this_block.width(restbeef_window.width()).css('margin-left', -1*offset+'px');
		});		
	}
	
	// Isotope Activation
	if (jQuery('.restbeef_isotope_trigger').length) {
		jQuery('.restbeef_isotope_trigger').each(function(){
			jQuery(this).isotope('layout');
		});
	}

	if (restbeef_window.width() > 760) {
		jQuery('li.menu-item-has-children > a').each(function(){
			jQuery(this).parent().children('ul').slideUp(1);
		});
		jQuery('.restbeef_header_content nav.restbeef_nav').slideUp(1);

	} else {
		jQuery('li.menu-item-has-children > a').each(function(){
			if ( jQuery(this).parent().hasClass('menu-item-showed') ) {
				jQuery(this).parent().children('ul').slideDown(1);
			} else {
				jQuery(this).parent().children('ul').slideUp(1);
			}			
		});	
		if ( jQuery('a.restbeef_mobile_menu_toggler').hasClass('restbeef_mobile_menu_close') ) {
			jQuery('.restbeef_header_content nav.restbeef_nav').slideDown(1);
		} else {
			jQuery('.restbeef_header_content nav.restbeef_nav').slideUp(1);
		}
	}
}