/* BoostMine Theme version 1.4, Copyright (C) 2017 Luis Blasco www.bestredminetheme.com */

window.onload = function () { 

	var bodyclass = document.body.className;
	
	if(bodyclass == "theme-Boostmine controller-roles action-new admin" || bodyclass == "theme-Boostmine controller-trackers action-new admin" || bodyclass == "theme-Boostmine controller-custom_fields action-new admin"){	

		window.checkAll = function(a,b){	
				if(b==true){
					//$('#'+a+' .checkbox').attr('checked', true);
					$('#'+a+' .checkbox').prop('checked', true);
					$('#'+a+' span.checkbox').addClass('on');
				} else {
					//$('#'+a+' .checkbox').attr('checked', false);
					$('#'+a+' .checkbox').prop('checked', false);
					$('#'+a+' span.checkbox').removeClass('on');
				}	
		}		
	}
	
}


function toggleCheckboxesBySelector(a){
	
		if($(a).is(':checked')){
			$(a).prop('checked', false);
			$(a+' + span.checkbox').removeClass('on');			
		} else {
			$(a).prop('checked', true);
			$(a+' + span.checkbox').addClass('on');							
		}	
		
}

function moveTabRight(el) {
  var lis = $(el).parents('div.tabs').first().find('ul').children();
  var bw = $(el).parents('div.tabs-buttons').outerWidth(true);
  var tabsWidth = 0;
  var i = 0;
  lis.each(function() {
    if ($(this).is(':visible')) {
      tabsWidth += $(this).outerWidth(true);
    }
  });
  if (tabsWidth < $(el).parents('div.tabs').first().width() - bw) { return; }
  $(el).siblings('.tab-left').removeClass('disabled');
  while (i<lis.length && !lis.eq(i).is(':visible')) { i++; }
  var w = lis.eq(i).width();
  lis.eq(i).hide();
  if (tabsWidth - w < $(el).parents('div.tabs').first().width() - bw) {
    $(el).addClass('disabled');
  }
}

function moveTabLeft(el) {
  var lis = $(el).parents('div.tabs').first().find('ul').children();
  var i = 0;
  while (i < lis.length && !lis.eq(i).is(':visible')) { i++; }
  if (i > 0) {
    lis.eq(i-1).show();
    $(el).siblings('.tab-right').removeClass('disabled');
  }
  if (i <= 1) {
    $(el).addClass('disabled');
  }
}

 

$(document).ready(function() {	
	
	if ( $( ".tabs-buttons" ).length) {
	} else {
		$("#main-menu").addClass('tabs');
		$("#main-menu").append( "<div class=\"tabs-buttons\" style=\"display: block;\"><button class=\"tab-left\" onclick=\"moveTabLeft(this); return false;\"></button><button class=\"tab-right\" onclick=\"moveTabRight(this); return false;\"></button></div>");
	}
	
	
	var bodyStyles = window.getComputedStyle(document.body);
	var brightness = bodyStyles.getPropertyValue('--brightness');
	var header_brightness = bodyStyles.getPropertyValue('--header_brightness');	
	
	$("body").get(0).style.setProperty("--header_brightness-5", parseFloat(header_brightness)-parseFloat('5')+'%');
	$("body").get(0).style.setProperty("--header_brightness7", parseFloat(header_brightness)+parseFloat('7')+'%');
	$("body").get(0).style.setProperty("--header_brightness10", parseFloat(header_brightness)+parseFloat('10')+'%');
	$("body").get(0).style.setProperty("--header_brightness20", parseFloat(header_brightness)+parseFloat('20')+'%');
	$("body").get(0).style.setProperty("--header_brightness30", parseFloat(header_brightness)+parseFloat('30')+'%');
	$("body").get(0).style.setProperty("--brightness10", parseFloat(brightness)+parseFloat('10')+'%');
	$("body").get(0).style.setProperty("--brightness15", parseFloat(brightness)+parseFloat('15')+'%');
	$("body").get(0).style.setProperty("--brightness20", parseFloat(brightness)+parseFloat('20')+'%');
	$("body").get(0).style.setProperty("--brightness25", parseFloat(brightness)+parseFloat('25')+'%');
	$("body").get(0).style.setProperty("--brightness30", parseFloat(brightness)+parseFloat('30')+'%');
	$("body").get(0).style.setProperty("--brightness35", parseFloat(brightness)+parseFloat('35')+'%');
	
	$('.controller-ldap_settings, .controller-deal_statuses.action-new, .controller-users.action-new, .controller-people_settings, .controller-settings, .controller-workflows, .controller-admin, .controller-auth_sources, .controller-enumerations, .controller-custom_fields, .controller-issue_statuses, .controller-trackers, .controller-roles, .controller-groups, .controller-users.action-index, .controller-users.action-edit').addClass('admin');

	
	$('#query_form_with_buttons .collapsible, #query_form .collapsible').click(function(){
		
		if ( $(this).is( ".collapsed" ) ) { 
			$(this).find('div').css("display", "none"); 
			$(this).addClass( "collapsed" );
		} else {
			$(this).find('div').css("display", "block"); 
			$(this).removeClass( "collapsed" );
		}
		
		
		if (!$("#query_form_with_buttons .collapsible").not(".collapsed").length) {			
			$('#query_form_with_buttons .buttons').css("display", "none");
			$('#query_form_with_buttons .contextual').css("display", "none");
			$('#query_form_with_buttons a').css("display", "none");	
			$('#query_form_with_buttons').attr('style','padding-bottom: 0 !important');			
		} else {			
			$('#query_form_with_buttons .buttons').css("display", "block");
			$('#query_form_with_buttons .contextual').css("display", "block");
			$('#query_form_with_buttons a').css("display", "block");
			$('#query_form_with_buttons').attr('style','padding-bottom: 60px !important');			
		}
		
		if (!$("#query_form .collapsible").not(".collapsed").length) {			
			$('#query_form .buttons').css("display", "none");
			$('#query_form .contextual').css("display", "none");
			//$('#query_form a').css("display", "none");
			
		} else {			
			$('#query_form .buttons').css("display", "block");
			$('#query_form .contextual').css("display", "block");
			//$('#query_form a').css("display", "block");
			
		}
		
	});
	
	$('#query_form_with_buttons .collapsible:not(.collapsed)').addClass('collapsed');
	$('#query_form_with_buttons .collapsible div').css("display", "none");
	$('#query_form_with_buttons .buttons').css("display", "none");
	$('#query_form_with_buttons .contextual').css("display", "none");
	$('#query_form_with_buttons a').css("display", "none");	
	
	$('#query_form .collapsible:not(.collapsed)').addClass('collapsed');
	$('#query_form .collapsible div').css("display", "none");
	$('#query_form .buttons').css("display", "none");
	$('#query_form .contextual').css("display", "none");
	//$('#query_form a').css("display", "none");
	
	
	var number=1;
	$("#projects-index ul.projects > li > .root, #projects-index > ul.projects  > li  > ul.projects > li > .child").each(function() {	
		
		if($(this).next(".projects").length){
			
			//if(localStorage.getItem("project_"+number)=="closed" || localStorage.getItem("project_"+number)=="open"){
				$(this).prepend( "<div id='project_"+number+"' class='projectshide open'></div>" );
			//} else {				
				//$(this).prepend( "<div id='project_"+number+"' class='projectshide closed'></div>" );
				//localStorage.setItem('project_'+number, "closed");
				//$('#project_'+number).parent().next(".projects").css("display", "none");
			//}
		
			if(localStorage.getItem("project_"+number)=="closed"){		
				//$('#project_'+number).parent().parent().find('ul.projects li.child').css("display", "none");
				$('#project_'+number).parent().next(".projects").css("display", "none");	
				$('#project_'+number).removeClass("open");
				$('#project_'+number).addClass("closed");
			}
			
			number++;
		}
		
	});
	
	$('.projectshide').click(function(){
		
		var projectid = $(this).attr('id');

		if(localStorage.getItem(projectid)!="closed"){
			
			localStorage.setItem(projectid, "closed");
			$('#'+projectid).removeClass("open");
			$('#'+projectid).addClass("closed");
			//$('#'+projectid).parent().parent().find('ul.projects > li.child').css("display", "none");	
			$('#'+projectid).parent().next(".projects").css("display", "none");	
			
		} else {
			
			localStorage.setItem(projectid, "open");
			$('#'+projectid).removeClass("closed");
			$('#'+projectid).addClass("open");
			//$('#'+projectid).parent().parent().find('ul.projects > li.child').css("display", "block");
			$('#'+projectid).parent().next(".projects").css("display", "block");			
		}		
	});	
	
	
	
	$("#sidebar").prepend( "<div id='menuhide' class='open'></div>" );

	if(localStorage.getItem("hidemenu")=="closed"){
		$('body:not(.admin):not(.action-login):not(.action-register):not(.action-lost_password) #sidebar').css("margin-left", "-12.8%");
		$('body:not(.admin):not(.action-login):not(.action-register):not(.action-lost_password) #content').css("width", "93.8%");
		$('#menuhide').removeClass("open");
		$('#menuhide').addClass("closed");
	} 


	$('#menuhide').click(function(){
		
		if(localStorage.getItem("hidemenu")!="closed"){
			var marginL = "-12.8%";
			var marginC = "93.8%";
			localStorage.setItem("hidemenu", "closed");
			$('#menuhide').removeClass("open");
			$('#menuhide').addClass("closed");
			
							
			$("#sidebar").animate({		
				marginLeft: marginL			
			}, 500, function() {
			
			});	

			$("#content").delay(50).animate({		
				width: marginC			
			}, 500, function() {
				//
			});
			
			
		} else {
			var marginL = "2%";
			var marginC = "79%";
			localStorage.setItem("hidemenu", "open");
			$('#menuhide').removeClass("closed");
			$('#menuhide').addClass("open");		
					
			$("#sidebar").delay(50).animate({		
				marginLeft: marginL			
			}, 500, function() {
			
			});
			
			$("#content").animate({		
				width: marginC			
			}, 500, function() {
				//
			});
		}		
	});		
	
});



	
$(window).bind("load", function() {		
	

	var setupCheckboxes = function() {
		// Checkbox Styling
		//$(':not(#notified_events) + input[type=checkbox]').each(function() {
		$('input[type=checkbox]').each(function() {	
			
			var $this = $(this);			
			//if ( $this.parents('#helpdesk_send_response').length || $this.attr("id")=="issue_private_notes") {
			if ( $this.parents('#helpdesk_send_response').length) {				
			} else {
			
				$this.addClass('checkbox');
				$('<span class="checkbox"></span>').insertAfter($this);
				if ($this.is(':checked')) {
					$this.next('span.checkbox').addClass('on');
				};
				
				$this.fadeTo(0,0);
				
				if ($this.is(':disabled')) {
					$this.next('span.checkbox').fadeTo(0,0.5);
				}
			}
			
		});		
	

	
		$('span.checkbox').click(function(e) {		
			
			e.stopPropagation();

			if($(this).prev().is('#check_all')){			
		
				var $father = $(this).closest( "table" );				
				$father.find( "#check_all" ).trigger( "click" );	
	
				if( $(this).prev().is(':checked')){
					//$('.checkbox').prop('checked', true);
					$father.find('span.checkbox').addClass('on');
				} else {	
					//$('input[type="checkbox"]').prop('checked', false);
					$father.find('span.checkbox').removeClass('on');
				}
				
			} else {
				var $this = $(this);
				//$this.toggleClass( "on" );
				
				if($("#autologin" + name).length == 1) {			

					if ($(this).hasClass('on')) {
						$this.next('.checkbox').prop('checked', false);
						$this.removeClass( "on" );
					} else {						
						$this.next('.checkbox').prop('checked', true);
						$this.addClass( "on" );
					}	
					
				} else {				

					if($(this).prev().is(':disabled')){					
						
					} else if($(this).prev().is("input[value='issue_updated']")){						
												
						
						if ($(this).hasClass('on')) {	
							$(this).removeClass( "on" );
							$('.parent span.checkbox').fadeTo(0,1);	
							$this.prev('.checkbox').attr('checked', false);
							$(this).prev().trigger( "click" );
						} else {
							$(this).addClass( "on" );
							$('.parent span.checkbox').fadeTo(0,0.5);
							$this.prev('.checkbox').attr('checked', true);
							//$(this).prev().trigger( "click" );
						}
						
						
						
					} else{
						if ($(this).hasClass('on')) {
							if($this.parent('label').length){
								$this.closest('.checkbox').prop('checked', false);
								//$(this).closest('.checkbox').trigger( "click" );
							} else{
								//$this.prev('.checkbox').attr('checked', false);
								$(this).prev('.checkbox').trigger( "click" );
							}
							
							$this.removeClass( "on" );
						} else {				
							if($this.parent('label').length){
								$this.closest('.checkbox').prop('checked', true);
								//$(this).closest('.checkbox').trigger( "click" );								
							} else {
								//$this.prev('.checkbox').prop('checked', true);
								$(this).prev('.checkbox').trigger( "click" );
							}
							$this.addClass( "on" );
						}
					}
				}
			}			
		});		
	};
		

	
	$(document).mouseup(function(e) {
			
		var container = $(".list tbody, .people.index tbody, #contact_list tbody");
		var container2 = $(".admin");
		var container3 = $(".customer");
		var container4 = $(".context-menu-selection");

		if (!container2.is(e.target) && container2.has(e.target).length === 0) {
			
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$('.list, .people.index, #contact_list').find('span.checkbox').removeClass( "on" );				
			}
//console.log(container4.has(e.target).length);
			if (container4.has(e.target).length==0 && container3.is(e.target)) {	
				$('.list, .people.index, #contact_list').find('span.checkbox').removeClass( "on" );
				$(e.target).parent().find('span.checkbox').addClass( "on" );
			}
		
		}
		
	});
	
	cntrlIsPressed = false;
	
	//$('.list tbody tr, .people.index tbody tr, #contact_list tbody tr').click(function(c){
	$('.list tbody tr, .people.index tbody tr, #contact_list tbody tr').mousedown(function(c){

		var container2 = $(".admin");

		if (!container2.is(c.target) && container2.has(c.target).length === 0) {

			$(document).keydown(function(){
				cntrlIsPressed = true;
			});
			
			$(document).keyup(function(){
				cntrlIsPressed = false;
			});

			if(cntrlIsPressed!=true){	
	
				var container = $(".checkbox");
			
				if (!container.is(c.target) && container.has(c.target).length === 0) {
					//$(this).parent().find('span.checkbox').removeClass( "on" );
					$(this).find('span.checkbox').removeClass( "on" );					
				}
			}
			
			if ($(this).find('span.checkbox').hasClass('on')) {	
			
					$(this).find('span.checkbox').removeClass( "on" );				
			} else {
				
					if(container.has(c.target).length>=1){
						$(this).addClass( "on" );
					} else {
						$(this).find('span.checkbox').addClass( "on" );
						
					}
			}
		}
	});
	
	
	
	var setupRadioboxes = function() {
		// Radio Styling
		$('input[type=radio]').each(function() {
			
			var $this = $(this);			
			if ( $this.parents('.check_box_group').length) {				
			} else {
					
				$this.addClass('radiobox');
				$('<span class="radiobox"></span>').insertAfter($this);
				if ($this.is(':checked')) {
					$this.next('span.radiobox').addClass('on');
				};
				
				$this.fadeTo(0,0);
			}			
			
		});		
		
		
		$('span.radiobox').click(function(e){
			
			e.stopPropagation();
			
			var $this = $(this);
			$('.radiobox').removeClass("on");
			$this.addClass('on');			
				
			//$('.radiobox').attr('checked', false);
			$('.radiobox').prop('checked', false);					
			//$this.prev('.radiobox').attr('checked', true);
			//$this.prev('.radiobox').prop('checked', true);			
						
			$this.prev('.radiobox').trigger( "click" );
			
			if ($this.prev().attr("id")=='role_all_roles_managed_on') {

				$('.block.role_managed_role span.checkbox').fadeTo(0,0.5);
			}
			if ($this.prev().attr("id")=='role_all_roles_managed_off') {

				$('.block.role_managed_role span.checkbox').fadeTo(0,1);
			}			
					
		});
	};
	
			

	if($('#header').height()>120 && ($(document).height() - $(window).height()) > 200){
		var stickyNavTop = $('#header').offset().top;
	 
		var stickyNav = function(){
			var scrollTop = $(window).scrollTop();
				  
			if (scrollTop > stickyNavTop) { 
				$('body:not(.admin):not(.action-login):not(.action-register):not(.action-lost_password) #header').addClass('sticky');
			} else {
				$('body:not(.admin) #header').removeClass('sticky'); 
			}
		}; 
		
		var style = getComputedStyle(document.body);		

		if(style.getPropertyValue('--sticky')){

			stickyNav();
			
			$(window).scroll(function() {
			  stickyNav();
			});
			
		}
	}

	if($('.controller-agile_boards.action-index, .controller-custom_fields.action-edit, .controller-custom_fields.action-new, .controller-roles.action-edit, .controller-trackers.action-edit, .controller-settings.action-index').length == 0 ){
		setupCheckboxes();
		setupRadioboxes();
	}	

});