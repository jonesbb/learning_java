// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

// tried putting the home.html.erb script here

        		    jQuery(function( $ ){
				$.localScroll({
				lazy: true,
				duration: 600
							
				});
	     	    });

		    $(window).load(function(){


		    	var $container = $('#container');
		      	$container.isotope({
				itemSelector : '.element'
		      	});

		    // filter buttons
		    $('#filters a').click(function(){
		      $('.proj_detail').fadeOut();
		      var selector = $(this).attr('data-filter');
		      $container.isotope({ filter: selector });
		      return false;
		    });


		    /* get information on every portfolio object
		       and render it onto the grid */
		    proj_setup = "";
		    proj_block_t  = _.template( $('#proj_block_t').html() );
		    var i=0;
		    $.each( bj_folio , function( key,e ){
			var proj_instance = proj_block_t({
			  pid: i,
			  thumb: 'public/images/bj_folio/'+e.featured,
			  title: e.title,
			  description: e.description,
			  filters: e.filters.join(" ")
			});
			proj_setup += proj_instance;

			// satisfy 3 columns per row condition

			if( i==bj_folio.length-1 ) {
		    		$container.isotope('insert', $(proj_setup) );
			}

			i++;

		    });


		    /* close the featured project panel */
		    $('.proj_close').live('click', function(){
			$('.proj_detail')
				.fadeOut()
				.html('');
		    });

		    /* Show/hide transparent image overlay
		       over each project block */
		    $('.proj_block').live('hover',function(){
		    	$('<img src="public/images/img_overlay.png" class="proj_block_over"/>')
				.appendTo($(this))
				.hide()
				.fadeIn("fast");
		    });
		    $('.proj_block').live('mouseleave',function(){
		    	$('.proj_block_over')
				.fadeOut("fast")
				.remove();
		    });

		    /* get information from portfolio object
		       on every click of a project block */
		    $('.proj_block').live('click',function(){
			var pid = $(this).attr('id').split('_')[1];
			var ptitle = bj_folio[pid]['title'];
			var pdesc = bj_folio[pid]['description'];
			var pmore = bj_folio[pid]['more'];
			 
			
			$('.proj_detail').html('');
			$('.proj_detail').append('<h5>'+ptitle+'</h5>');	
			$('.proj_detail').append('<a href="#top" class="proj_close"></a>');	
			$('.proj_detail').append('<div class="proj_large"><div class="proj_media"/></div>');	
			
				var proj_nav = "";
			$.each( pmore , function(i,e){
				proj_nav += '<span data-img="'+e+'" id="proj_nav_'+i+'"></span>\n';
			});
			$('.proj_detail').append('<div class="proj_nav">'+proj_nav+'</div>');	
			
			$('.proj_detail').append('<h1>'+ptitle+'</h1><p>'+pdesc+'</p>');	

		
			$('#proj_nav_0').click(); // select the first from the image nav menu
			$('.proj_detail').fadeIn();
		    });



		    /* activate the callbacks for proj block nav */
		    $('.proj_nav span').live('click',function(){
			$('.proj_nav_current').removeClass('proj_nav_current');
			$(this).addClass('proj_nav_current');
			var proj_img = $(this).attr('data-img');
			$('.proj_large div.proj_media')
				.fadeOut(400,function(){
					$(this).css('background','url(public/images/bj_folio/'+proj_img+') no-repeat 50% 50%')
                                })
				.fadeIn();
		    });
		    
		    $('.proj_media').live('click',function(){
			if($('.proj_nav_current').next().length == 0) {
				$('#proj_nav_0').click(); // select the first from the image nav menu
			}else{
				$('.proj_nav_current').next().click();
			}
		    });
		    
		      // switches selected class on buttons
		      $('#options').find('.option-set a').click(function(){
			var $this = $(this);

			// don't proceed if already selected
			if ( !$this.hasClass('selected') ) {
			  $this.parents('.option-set').find('.selected').removeClass('selected');
			  $this.addClass('selected');
			}

		      });
                      //added one b/c was missing a bracket?
		      });

