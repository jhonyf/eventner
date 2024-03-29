// Tooltip from CSS Globe written by Alen Grakalic (http://cssglobe.com)
this.tooltip = function(){xOffset = -10;yOffset = 10;jQuery.noConflict();jQuery(".tooltip").hover(function(e){this.t = this.title;this.title = "";jQuery("body").append("<p class='itooltip'>"+ this.t +"</p>");jQuery(".itooltip").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px").fadeIn(500);},function(){this.title = this.t; jQuery(".itooltip").remove();});jQuery("a.tooltip").mousemove(function(e){jQuery(".itooltip").css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px");});};
//END TOOLTIP

$(document).ready(function(){
	tooltip();
	
	//LOADING ANIMATION
	jQuery('#loading').activity({segments: 12, width:5.5, space: 6, length: 13, color: '#fff'});
	jQuery(window).load(function(){
		jQuery('#loading').activity(false).fadeOut(500);
		
		//TOP AREA SPACING STUFF
		var headerHeight = jQuery("#header").height(),
			headerSpacing = headerHeight + 35;
		jQuery("#dropmenu > li > a, #description").css({lineHeight:headerHeight+"px"});
		jQuery("#dropmenu > li > ul").css({top:headerHeight+"px"});
		jQuery("#content").css({paddingTop:headerSpacing+"px"});
		
		jQuery('#header').fadeIn(500);
	});

	//VARIABLES
	var mainBox = jQuery('#main'),
		pageBox = jQuery(".pageContent"),
		//iPad,iPhone,iPod...
		deviceAgent = navigator.userAgent.toLowerCase(),
		iPadiPhone = deviceAgent.match(/(iphone|ipod|ipad)/);

	//ACCORDION TOGGLES	
	jQuery('.toggleButton').click(function(){
		jQuery(".toggleButton").not(this).removeClass('opened').next().slideUp(400);
		jQuery(".toggleButton").not(this).children('span').html("+");
		jQuery(this).toggleClass('opened').next().slideToggle(400);
		jQuery('.opened').children('span').html("&times;");
		jQuery(this).not('.opened').children('span').html("+");
		jQuery("html,body").animate({scrollTop:0},400);
		jQuery('body.page .entry').slideToggle(400);
	}).hover(function(){
		jQuery(this).stop(true,true).animate({paddingLeft:"10px",backgroundColor:'#99b3cc', color:'#000'},300);
	},function(){
		jQuery(this).stop(true,true).animate({paddingLeft:"8px",backgroundColor:'#333',color:'#fff'},300);
	});
    
    //CLOSE MAIN DIV
    jQuery("#closeBox").live('click', function(){
    	mainBox.fadeOut(400);
    	pageBox.animate({top:"0px"},600);
    	return false;
    }); 
    
    //OPEN MAIN DIV
    pageBox.live('click', function(){
    	jQuery(this).animate({top:"40px"},600);
    	mainBox.fadeIn(400);
    	return false;
    }); 
	
	//MAP VARS
	var gMap = jQuery('#gMap'),
		containerHeight = jQuery(window).height(),
		marker = jQuery('.marker');
	
	//RESIZE VAR AND FUNCTION
	jQuery(window).resize(function() {
		var containerHeight = jQuery(window).height();
		gMap.css({height:containerHeight});
	});
	
	//GMAP STUFF
	gMap.css({height:containerHeight, width:"100%"});
        //TARGET HOVER
        jQuery("#target").live('mouseover',function(){
        	jQuery(this).hide();
        });
    //MAP TYPE
    jQuery(".roadmap").live('click',function(){
    	jQuery("#gMap").gmap3({action: 'setOptions', args:[{mapTypeId:'roadmap'}]}); //hybrid, satellite, roadmap, terrain
    	jQuery(this).removeClass('roadmap').addClass('satellite');
    	jQuery("#mapStyle").toggleClass('satellite');
    });
    jQuery(".satellite").live('click',function(){
    	jQuery("#gMap").gmap3({action: 'setOptions', args:[{mapTypeId:'satellite'}]}); //hybrid, satellite, roadmap, terrain
    	jQuery(this).removeClass('satellite').addClass('roadmap');
    	jQuery("#mapStyle").toggleClass('satellite');
    });
    jQuery("#mapType").live('mouseover', function(){
       jQuery("#mapStyleContainer").stop(true,true).fadeIn(200);
    });
    jQuery("#mapType").live('mouseout', function(){
		jQuery("#mapStyleContainer").stop(true,true).fadeOut(100);
    });
	
	//REMOVE TITLE ATTRIBUTE
	jQuery("#dropmenu a, .attachment-small").removeAttr("title");
	
	//MENU
	jQuery("#dropmenu ul").css("display", "none"); // Opera Fix
	jQuery("#dropmenu li").hover(function(){
		jQuery(this).find('ul:first').stop(true,true).slideDown(100);
		},function(){
		jQuery(this).find('ul:first').hide();
	});
	jQuery("#dropmenu ul").parent().children("a").append("<span>&nbsp;&nbsp;+</span>");
	
	jQuery("#dropmenu ul li a").hover(function(){
		jQuery(this).stop(true,true).animate({paddingLeft:"20px"},300);
	},function(){
		jQuery(this).stop(true,true).animate({paddingLeft:"15px"},300);
	});
	
	//IF iPad
	if (iPadiPhone) {
		function windowSizes(){
			var headerHeight = jQuery("#header").height(),
				headerSpacing = headerHeight + 35,
				windowHeight = jQuery(window).height(),
				footerSpacing = 75,
				mainHeight = windowHeight - headerSpacing - footerSpacing - 40;
			if(mainBox.outerHeight() > mainHeight) {	
				jQuery(mainBox).css({height:mainHeight,overflow:"auto"});
			}
		}
		
		windowSizes();
		
		jQuery(window).resize(function() {
			windowSizes();
		});
		
		jQuery('.toggleButton').click(function(){
			windowSizes();
		});
		
		jQuery('body').addClass('iPad');
				
	//IF NOT iPad
	} else {
		//ADD HANDLE AND MAKE DRAGGABLE
		mainBox.draggable({ handle:"#handle",opacity: 0.8}).resizable();
		
		mainBox.prepend("<div id='moveNotice'></div>");
		
		jQuery("#handle").hover(function(){		
			jQuery("#moveNotice").stop(true,true).fadeIn(200);
		},function(){
			jQuery("#moveNotice").stop(true,true).fadeOut(200);
		});
	}
	
  //FROM HTML
    	//MAP ZOOM (0 to 20)
    	var zoomLevel = 3,
		gMap = jQuery("#gMap"),
		//iPad,iPhone,iPod...
		deviceAgent = navigator.userAgent.toLowerCase(),
		iPadiPhone = deviceAgent.match(/(iphone|ipod|ipad)/);
		
	//iPad Stuff
	if (iPadiPhone) {
		//ADD MAP CONTROLS AND POST ARROWS
		jQuery("#footer").prepend('<div id="mapTypeContainer"><div id="mapStyleContainer"><div id="mapStyle" class="satellite"></div></div><div id="mapType" title="Map Type" class="satellite"></div></div>');
	} else {//IF NOT iPad
		jQuery('#zoomIn').live('click',function(){
			zoomLevel += 1;
			gMap.gmap3({action: 'setOptions', args:[{zoom:zoomLevel}]});
		});
		jQuery('#zoomOut').live('click',function(){
			zoomLevel -= 1;
			gMap.gmap3({action: 'setOptions', args:[{zoom:zoomLevel}]});
		});
		//ADD MAP CONTROLS AND POST ARROWS
    jQuery("#footer").prepend('<div id="mapTypeContainer"><div id="mapStyleContainer"><div id="mapStyle" class="satellite"></div></div><div id="mapType" title="Map Type" class="satellite"></div></div><div class="zoomControl" title="Zoom Out" id="zoomOut"><img src="images/zoomOut.png" alt="-" /></div><div class="zoomControl" title="Zoom In" id="zoomIn"><img src="images/zoomIn.png" alt="+" /></div>');
    }    
        jQuery('body').prepend("<div id='target'></div>");
        
        gMap.gmap3({ 
        	action: 'init',
            onces: {
              bounds_changed: function(){
              	var number = 0;
                jQuery(this).gmap3({
                  action:'getBounds', 
                  callback: function (){
                    //ADD MARKERS HERE - FORMAT IS AS FOLLOWS...
                    //add(jQuery(this), number += 1, "NAME", "URL","ADDRESS1<br />ADDRESS2","LATITUDE","LONGITUDE");
                    //add(jQuery(this), number += 1, "This is the first ping", "github.com", "Trial notification","41.890202","12.492228");
                  }
                });
              }
            }
          },{ 
			action: 'setOptions', args:[{
				zoom:zoomLevel,
				scrollwheel:false,
				disableDefaultUI:true,
				disableDoubleClickZoom:true,
				draggable:true,
				mapTypeControl:false,
				panControl:false,
				scaleControl:false,
				streetViewControl:false,
				zoomControl:false,
				//MAP TYPE: 'roadmap', 'satellite', 'hybrid'
				mapTypeId:'roadmap'
			}]
		});
    var markerCount = 0;
    add = function (jQuerythis, title, link, excerpt, lati, longi){
          var i = markerCount;
          markerCount++;
          jQuerythis.gmap3({
            action : 'addMarker',
            lat:lati,
            lng:longi,
            //PIN MARKER IMAGE
            options: {icon: new google.maps.MarkerImage('images/pin.png')},
            events:{
       			mouseover: function(marker){
          			jQuerythis.css({cursor:'pointer'});
          			jQuery('#markerTitle'+i+'').fadeIn({ duration: 200, queue: false }).animate({bottom:"32px"},{duration:200,queue:false});
      			},
       			mouseout: function(){
          			jQuerythis.css({cursor:'default'});
          			jQuery('#markerTitle'+i+'').stop(true,true).fadeOut(200,function(){jQuery(this).css({bottom:"0"})});
      			},
      			click: function(marker){window.location = link}
   			},
            callback: function(marker){
              jQuerythis.gmap3({
                action:'panTo', 
                args:[marker.position]
              });
              jQuery("#target").stop(true,true).fadeIn(1200).delay(500).fadeOut(1200);

              jQuerythis.gmap3({
              	action:'addOverlay',
              	content: '<div id="markerTitle'+i+'" class="markerTitle">'+title+'</div>',
              	latLng: marker.getPosition()
               });
            }
          });
        }
});
