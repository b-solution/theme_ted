//
//Template custom settings
//

var

  subFolder = ""; //Leave it empty "" or add the name of your subfolder, e.g. "/redmine"
	issues = "Issues"; //Top menu - translation for Issues
	spentTime = 'Spent time'; //Top menu - translation for Spent time
	showSubProjectsAsDefault = false; //Project list - leave "false" to hide the sub-project tree and display it on click or chaneg it to "true" to always show all sub-projects
	
//
//Template custom settings
//

//Template system settings
var templateFolderName = "abacus_office_blues",
	removeSystemJQueryAddTemplateJQuery = "no",
	customMenuPlugin = "yes",
	hostingDemoRedmine = "yes",
	removeRedmineResponsiveScripts = "yes",
	removeDuplicateIds = "no";


$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">');

function Abacus()
{
	//public
	function run(contentRules, classRules, attrRules, clickRules, plusMinusEl, hideEl)
	{
		addContentToDom(contentRules);
		handleClasses(classRules);
		handleAttributes(attrRules);
		registClickEvents(clickRules);
		togglePlusMinus(plusMinusEl);
		hide(hideEl);
		fixedSidebar();
		hideSplitContent();

		return false;
	}

	//public
	function exists(selector)
	{
		return $(selector).length !== 0;
	}

	//private
	function addContentToDom(contentRules)
	{
		contentRules.filter(function(rule){
			return rule.if === true;
		}).forEach(function(rule){
			rule.insert === 'inner' ? $(rule.element).append(rule.content) : false
			rule.insert === 'before' ? $(rule.element).before(rule.content) : false
			rule.insert === 'after' ? $(rule.element).after(rule.content) : false
			rule.insert === 'wrap' ? $(rule.element).wrap(rule.content) : false
			rule.insert === 'wrapAll' ? $(rule.element).wrapAll(rule.content) : false
		});
		return false;
	} 

	//private
	function handleClasses(classRules)
	{
		classRules.filter(function(rule){
			return rule.if === true;
		}).forEach(function(rule){
			rule.type === 'add' ? $(rule.element).addClass(rule.class) : false
		});
		return false;
	} 

	//private
	function handleAttributes(attrRules)
	{
		attrRules.forEach(function(rule){
			$(rule.element).attr(rule.attrName, rule.attrValue) 
		});
		return false;
	} 

	//private
	function registClickEvents(clickRules)
	{
		clickRules.forEach(function(rule){
			rule.if ? $(rule.element).click(rule.action) : false;
			//Timeout because I need to have it in other thread
			rule.if && rule.onInit ? setTimeout(function(){$(rule.element).trigger('click')},0) : false;
		});
		return false;
	} 

	//private
	function togglePlusMinus(element)
	{
		$(element).click(function () {
			$(this).toggleClass('fa-plus-square').toggleClass('fa-minus-square')
		});
		return false;
	};

	//private
	function hide(element)
	{
		$(element).hide();
		return false;
	};

	//private 
	function fixedSidebar()
	{
		var sidebarTopPosition = $("#sidebar").position().top;
		var topMenuHeight = $("#top-menu").outerHeight();
		var startFix = sidebarTopPosition - topMenuHeight;

		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll >= startFix) {
				$("#sidebar").addClass("fixed");
				$("#sidebar").css('top', topMenuHeight);
			} else {
				$("#sidebar").removeClass("fixed");
				$("#sidebar").css('top', 0);
			}
		});
	}

	//private
	//e.g. home or //e.g. http://site.com/issues/1
	var functionCyclePrevent = "free";
	function hideSplitContent()
	{
		$('.splitcontentleft, .splitcontentright, #content > .contextual').each(function () {
			$(this).html().trim().length === 0 ? $(this).addClass("hidden") : $(this).removeClass("hidden");
		});
		
		$('.splitcontentleft, .splitcontentright, #content > .contextual').bind('DOMNodeInserted DOMNodeRemoved', function (event) {
			if (functionCyclePrevent === "free"){
			    hideSplitContent();
			    functionCyclePrevent = "full";
			}
			setTimeout(function(){ 
			    functionCyclePrevent = "free"; 
			    }, 1000);
			
		});
	};

	return {
		run: run,
		exists: exists,
	}
}

$(document).ready(function () {

	var A = Abacus();

	var contentRules = [
		{
			//e.g. http://site.com/issues/1 - eye icon
			element: '#content',
			content: '<div id="hide-sidebar"><a class="switch" href="#"><i class="fa fa-eye"></i></a></div>',
			insert: 'inner',
			if: !A.exists('#sidebarHandler'), //if sidebar plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu',
			content: '<a href="' + subFolder + '/my/page" class="home-link"></a>',
			insert: 'inner',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu > ul li:eq(2)',
			content: '<li><a href="' + subFolder + '/issues" class="issues"><spap>'+issues+'</span></a></li>',
			insert: 'after',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu > ul li:eq(3)',
			content: '<li><a href="' + subFolder + '/time_entries" class="spent_time"><spap>'+spentTime+'</span></a></li>',
			insert: 'after',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu > ul > li:nth-of-type(6) ~ li',
			content: '<div class="more fa"><div class="ul"></div></div>',
			insert: 'wrapAll',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu>ul .more',
			insert: 'inner',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. http://site.com/issues/
			element: '.controller-timelog.action-index .total-hours,.controller-calendars.action-show #query_form,#tab-content-versions table,#tab-content-categories table,#tab-content-activities table,.controller-settings #tab-content-issues fieldset,.controller-settings #tab-content-repositories table,.controller-tt_overview table.tt_list, table.list, table.people, table.invoice-lines, .controller-orders #product_lines, table#browser',
			content: '<p><span class="slide">>>>>>> Slide to see table >>>>>></span></p>',
			insert: 'after',
			if: true, 
		},
		{
			//e.g. http://site.com/redmine/issues/calendar
			element: '.controller-calendars.action-show table.cal, .controller-invoices fieldset.attributes, table.list, table.people, .controller-orders #product_lines, .controller-gantts.action-show #content table:first-of-type',
			content: '<div class="autoscroll"></div>',
			insert: 'wrap',
			if: true, 
		},
		{
			//e.g. http://site.com/redmine/projects
			element: '.controller-projects.action-index #content > .contextual a:first-of-type',
			content: '<a class="toggle-wrap fa fa-plus-square" id="show-project-desc">Toggle descriptions</a>',
			insert: 'before',
			if: !A.exists('.controller-projects.action-index #projects_list'), 
		},
		{
			//e.g. http://site.com/redmine/issues/calendar
			element: '.controller-calendars.action-show #year, .controller-gantts.action-show #year',
			content: '<div class="divider"></div>',
			insert: 'after',
			if: true, 
		},
		{
			//e.g. TODO nevim, potreba otestovat
			element: '#issue-changesets',
			content: '<div class="toggle-wrap"><a class="fa fa-plus-square" id="show-issue-changesets">Toggle Associated revisions</a></div>',
			insert: 'before',
			if: true, 
		},	
		{
			//e.g. TODO nevim, potreba otestovat
			element: '.controller-invoices #comments, .controller-invoices #invoice_payments',
			content: '<div class="invoice-wrapper clearfix" />',
			insert: 'wrapAll',
			if: true, 
		},
		{
			//e.g. TODO nevim, potreba otestovat
			element: '#footer .bgr',
			content: '<span>| Theme by <a  href="http://www.abacusthemes.com" target="_blank" property="Michal Stanek">Abacus Themes</a>',
			insert: 'inner',
			if: true, 
		},
		{
			//e.g. http://site.com/projects/projectName/documents
			element: '.controller-documents #content > .contextual a:first-child',
			content: '<a class="toggle-wrap fa fa-plus-square" id="show-docs">Toggle descriptions</a>',
			insert: 'before',
			if: true, 
		},
		{
			//e.g. http://site.com/projects/projectName/news
			element: '.controller-news #content > .contextual a:first-child',
			content: '<a class="toggle-wrap fa fa-plus-square" id="show-news">Toggle descriptions</a>',
			insert: 'before',
			if: true, 
		},
	];	

	var classRules = [
		{
			//e.g. Top menu on all sites
			element: 'body',
			class: 'redmine_news_notification',
			type: 'add',
			if:  !A.exists('#top-menu ul.cm-menu-header') && A.exists('#nn_list'), //if custom menu plugin does NOT exists AND redmine_news_notification plugin exists
		},
		{
			//e.g. Login page
			element: '#login-form',
			class: 'tableless',
			type: 'add',
			if:  !A.exists('#top-menu ul.cm-menu-header') && !A.exists('#login-form form table'), //if custom menu plugin does NOT exists AND NOT exists #login-form table
		},
		{
			//e.g. Top menu on all sites
			element: 'body',
			class: 'redmine_mobile_menu',
			type: 'add',
			if:  !A.exists('#top-menu ul.cm-menu-header') && A.exists('.flyout-menu'), //if custom menu plugin does NOT exists AND NOT exists #login-form table
		},
		{
			//e.g. Top menu on all sites
			element: 'body',
			class: 'v34',
			type: 'add',
			if:  A.exists('#project-jump'), //if there is the new project jump (Redmine 3.4.+), add class to body
		},
		{
			//e.g.  http://site.com/admin/projects
			element: 'body',
			class: 'view-admin',
			type: 'add',
			if:  A.exists('#sidebar #admin-menu'), //if sidebar admin menu
		},
		{
			//TODO nevim, potreba otestovat
			element: 'body',
			class: 'sidebar_handler',
			type: 'add',
			if:  A.exists('#sidebarHandler'), //if sidebar plugin exists
		},
		{
			//TODO nevim, potreba otestovat
			element: '#history',
			class: 'issue-changesets-exist',
			type: 'add',
			if:  A.exists('#issue-changesets'), 
		},
		{
			//TODO nevim, potreba otestovat
			element: 'body',
			class: 'projects_list',
			type: 'add',
			if:  A.exists('.controller-projects.action-index #projects_list'), 
		},
		{
			//e.g. http://site.com/projects and project has to have a child project
			//CSS - if li has a.parent so add css class to li
			element: 'ul.projects li:has("a.parent")',
			class: 'fa fa-plus-circle',
			type: 'add',
			if:  true, 
		},

	];


	var attrRules = [
		{
			//e.g. Top menu on all sites
			element: '#account, #loggedas a, #top-menu .more',
			attrName: 'onclick',
			attrValue: 'return true',
		},
			//TODO nevim, potreba otestovat
		{
			element: 'a.external, .address.adr a, .icon.icon-invoice-public-link',
			attrName: 'target',
			attrValue: '_blank',
		},
	];

	var clickRules = [
		{
			//e.g. http://site.com/issues/1 - main a and left column
			element: '.switch',
			action: function () {
				$('#sidebar').toggleClass('hidden');
				$('#content').toggleClass('full');
			},
			if: !A.exists('#sidebarHandler'), //if sidebar plugin does notexists
		},
		{
			//TODO nevim, potreba otestovat
			element: '#show-issue-changesets',
			action: function () {
				$('#issue-changesets').slideToggle("fast");
			},
			if: true,
		},
		{
			//e.g. http://site.com/projects
			element: '#show-project-desc',
			action: function () {
				$('#projects-index .wiki.description').slideToggle("fast");
			},
			if: !A.exists('.controller-projects.action-index #projects_list'),
		},
		{
			//e.g. http://site.com/projects and project has to have a child project
			//CSS - if > div has a.parent so add click listener
			element: 'ul.projects li > div:has("a.parent")',
			action: function () {
				$(this).parent().toggleClass("fa fa-plus-circle").toggleClass("fa fa-minus-circle");
				$(this).next("ul").toggle();
			},
			onInit: showSubProjectsAsDefault,
			if: true,
		},
		{
			//e.g. http://site.com/projects/projectName/news|documents
			element: '#show-news, #show-docs',
			action: function () {
				$('.controller-news .wiki p, .controller-documents .wiki p').slideToggle("fast");
			},
			if: true,
		},
	];

	var plusMinusEl = 'fieldset.collapsible > legend, #show-issue-changesets, a.collapsible, #show-docs, #show-project-desc, #show-news, .controller-workflows form p a, tr span.expander';

	var hideEl = '#projects-index .wiki.description, .controller-projects ul.projects.root > .root  ul, .controller-news .wiki p, .controller-documents .wiki p';

	A.run(contentRules, classRules, attrRules, clickRules, plusMinusEl, hideEl);

	// NON-SYSTEM

		/* PLUGIN - Extra Queries plugin - http://rmplus.pro/ */
		//Fix duplication of ID in issue list
		// find in list issues issue all td.id and remove second if tr contains Two id
		if (removeDuplicateIds === "yes") {
			var removeDuplicateID = function () {
				var $issuesDuplicatedID = $(".action-page .list.issues tr");
				$issuesDuplicatedID.each(function () {
					$(this).find('th:eq(1),td:eq(1)').remove();
				});
			};
			removeDuplicateID();
		}

		/* PLUGIN - Custom Menu plugin - http://rmplus.pro/ */
		var removeAllCustomMenuComponents = function () {
			// Remove script from custom menu plugin if disable but instaled in system
			$("script[src^='/plugin_assets/custom_menu/']").each(function () {
				$(this).remove();
			});
			$("link[href^='/plugin_assets/custom_menu/']").each(function () {
				$(this).remove();
			});
			// Remove menu link from admin menu
			$('#admin-menu li').has("a.cm-menu").remove();
		};

		// ********************************** START SETTINGS - Some Functions depending on JS settings **********************************
		if (removeSystemJQueryAddTemplateJQuery === "yes") {
			//Fix Jquery package for all redmines
			$("link[href^='/stylesheets/jquery/jquery-ui-1']").each(function () {
				$(this).remove();
			});
			$('head').append('<script src="/themes/' + templateFolderName + '/javascripts/jquery/jquery-1.11.1-ui-1.11.0-ujs-3.1.1.js"></script>');
			$('head').append('<link rel="stylesheet" media="all" href="/themes/' + templateFolderName + '/stylesheets/jquery/jquery-ui-1.11.0.css" />');

			$("script[src^='/javascripts/jquery-1.']").each(function () {
				$(this).remove();
			});
		}

		if (removeRedmineResponsiveScripts === "yes") {
			$("link[href^='/stylesheets/responsive.css']").each(function () {
				$(this).remove();
			});
		}


		//top menu --> add Issues and Spent time
		if ($('#top-menu ul').hasClass('cm-menu-header')) {

			// ********************************** Custom menu plugin JS **********************************
			if ($('.menu_expander .icon-expand').length >= 0) {
				$('body').addClass('redmine_custom_menu');
			}
			// Add class menu_fixed if custom menu plugin exists
			if ($('#dropdown_top_menu').length >= 0) {
				$('body').addClass('menu_fixed');
			}
			// Remove "more" menu item if custom menu plugin exists
			if ($('body').hasClass('redmine_custom_menu')) {
				$('#top-menu > ul div').removeClass('fa more');
			}
		} else {
			removeAllCustomMenuComponents();
		}

		//TODO - realne nic nedela, nebo jsem neprisel k cemu je to dobre.
		// Main menu - toggle class active
		//e.g. http://localhost/redmine/issues/1
		$('#main-menu').click(function () {
			$('#main-menu ul').toggleClass('active');
		});

		// Hide #main-menu if empty
		if ($('#main-menu ul').length === 0) {
			$('#main-menu').css({'visibility': 'hidden'});

			//tohle nedava smysl. Proc bych klikal na neco co ma visibility:hiden a odebiral tridu necemu co neexistuje
			$('#main-menu').click(function () {
				$('#main-menu ul').removeClass("active");
			});
		}

		//TODO k cemu ta trida cal a list realne je? V CSS na to nic navazaneho nevidim, apson ne ten .list
		$('.controller-my.action-page table.cal').closest("div").addClass("cal");

		$('.controller-my.action-page table.list').closest("div").addClass("list");


		// TODO - tohle kde je .contextual by melo jit u CSSskovat. Minimalne pres prebjeni
		$(".controller-messages .message.reply > .contextual a:nth-child(2)").addClass("fa fa-pencil-square-o");

		$(".controller-messages .message.reply > .contextual a:nth-child(3)").addClass("fa fa-times");


		// TODO nevim kde je -> link?
		// Add class view-admin if admin menu exists
		if ($('.controller-messages .message.reply > .contextual .vote').length !== 0) {

			$('.controller-messages .message.reply > .contextual a:nth-child(2)').removeClass('fa-pencil-square-o');
			$('.controller-messages .message.reply > .contextual a:nth-child(2)').addClass('fa-comment');

			$('.controller-messages .message.reply > .contextual a:nth-child(3)').removeClass('fa-times');
			$('.controller-messages .message.reply > .contextual a:nth-child(3)').addClass('fa-pencil-square-o');

			$('.controller-messages .message.reply > .contextual a:nth-child(4)').addClass('fa fa-times');
		}

		//K cemu je tohle dobry. Chapu co to dela, ale na co je to tatrida dobra, kdy demo je na klasicke sablone
		if (hostingDemoRedmine === "yes") {
			// Check domain add class to demo login bg
			var locUrl = window.location.href; // returns the full URL
			var originUrl = "http://demo.abacusthemes.com/login";
			if (locUrl == originUrl) {
				$('body.action-login #main').addClass('loginbg');
			}
		}
		
	/* This removes class icon reload from issue list Clear - Redmine puts wrong class*/
	$("#query_form .icon-reload").removeClass("icon-reload");


  /* Issues + and - */
	$("fieldset.collapsible > legend").addClass("fa fa-minus-square");
	$("fieldset.collapsible.collapsed  > legend").removeClass('fa fa-minus-square').addClass("fa fa-plus-square");
  
  //TODO moze byt v CSS
	$(".fa-comment, .fa-pencil-square-o").find("img").remove();
	/*Forum*/
	$(".icon-vote, .icon-unvote").removeClass("fa fa-comment");

	/*Admin*/
	$('.view-admin #content > h2').after($('<a class="menu-wrap fa fa fa-list" href="#admin-menu">Menu</a>'));

	/*Redmine People*/
	$(".person.details").addClass("autoscroll");
	
	/*Agile*/	
	$('.agile-board > .autoscroll').append('<span class="esc"><strong>Esc </strong> = Exit Fullscreen');
	
	/*DMSF plugin*/
	// Wrap DMSF table with .autoscroll
	$(".dmfs_entries table").wrap("<div class='autoscroll'></div>");

	/*Easy Gantt plugin*/
	$(".gantt-menu-button.icon-summary").removeClass("fa-pie-chart");

	$(".gantt-menu-button.icon-summary").addClass("fa-exclamation-circle");

});