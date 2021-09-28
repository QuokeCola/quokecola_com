// JavaScript Document
document.write("<script language=javascript src='/_scripts/common_macro.js'></script>");
function navigationbar () {
	let title 				= document.getElementById("navi_title_obj");
	let logo_line 			= document.getElementById("navi_titleline_obj");
	let logo_union 			= document.getElementById("navi_title_union");
	let enable_expanded 	= document.getElementById("navi_enable_expanded");
	let mobile_menu_button 	= document.getElementById("navi_mobile_menu_button");
	let mobile_menu_state 	= document.getElementById("navi_mobile_menu_state_obj");
	let mobile_menu_box		= document.getElementById("navi_mobile_page_button_background");
	let mobile_menu_title	= document.getElementById("navi_mobile_menu_title");
	let pc_decoration 		= document.getElementById("navi_pc_decoration_obj");
	let pc_box_placeholder 	= document.getElementById("navi_pc_box_placeholder");
	let pc_menu_box 		= document.getElementById("navi_pc_menu_box");

	let pc_menu_box_width 					= 0;
	let pc_title_padding_bottom				= "70vh";
	let pc_bottom_box_expanded_radius		= 7;
	let pc_bottom_box_collapse_radius		= 0;

	let mobile_title_padding_bottom				= "5vh";
	let mobile_menu_linkbutton_collapse_height 	= "10vh";
	let mobile_menu_linkbutton_expanded_height 	= "15vh";
	let collapse_threshold 						= 1;

	let unblur									= "blur(0px)"
	let blur									= "blur(20px)"
	let previousIsPC							= getLayoutID();

	this.initiate = function() {
		enable_expanded.checked = 1;
		setTimeout(function(){
			switch_view();
			pc_menu_box_width = get_navi_pc_menu_box_width();
		}, 100);
		this.scroll();
		document.addEventListener('scroll', this.scroll);
		window.addEventListener('resize', this.resize);
		window.addEventListener('orientationchange', function() {
			setTimeout(function(){switch_view();}, 20);
		}, false);
	}

	this.resize = function () {
		let currentIsPC = getLayoutID();
		if (currentIsPC === this.previousIsPC) {
		} else {
			switch_view();
		}
		this.previousIsPC = currentIsPC;
		if(window.pageYOffset > collapse_threshold || enable_expanded.checked === 0){
			pc_menu_box.style.width=String(document.body.offsetWidth+30)+"px";
			set_title_bar_colored();
			pc_menu_box.style.borderRadius=String(pc_bottom_box_collapse_radius)+"px";
		} else {
			pc_menu_box.style.borderRadius=String(pc_bottom_box_expanded_radius)+"px";
		}
	}

	this.scroll = function() {
		let currentY = window.pageYOffset;
		if(currentY > collapse_threshold) {
			if(getLayoutID()===2 || (mobile_menu_state.checked === false && enable_expanded.checked === true)){
				set_title_bar_collapse();
			}
			set_title_bar_colored();
		} else {
			if(getLayoutID()===2 || (mobile_menu_state.checked === false && enable_expanded.checked === true)){
				set_title_bar_transparent();
				set_title_bar_expanded();
			}
		}
	}

	this.mobile_menu_button_clk = function () {
		if(mobile_menu_state.checked) {	// Click to uncheck
			if(window.pageYOffset>0) {
				set_title_bar_collapse();
			} else {
				set_title_bar_transparent();
			}
			mobile_menu_box_collapse();
		} else {								// Click to check
			set_title_bar_expanded();
			set_title_bar_colored();
			mobile_menu_box_expanded();
		}
	}

	let set_title_bar_colored = function() {
		// PC navigation decoration "</>"
		// navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.0)";
		// navi_pc_decoration.style.color="white";

		// Navigation Background
		title.style['-webkit-backdrop-filter']=blur;
		title.style['backdrop-filter']=blur;

		// Change color for navigation title.
		title.style.backgroundColor = "rgba(12, 40, 82, 0.9)";

		// Change color for navigation title background.
		// navi_logo_union.style.backgroundColor="rgba(0,0,0,0.0)";
	}

	let set_title_bar_transparent = function() {
		// PC navigation decoration "</>"
		// navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.9)";
		// navi_pc_decoration.style.color="black";

		// Navigation Background
		title.style['-webkit-backdrop-filter']=unblur;
		title.style['backdrop-filter']=unblur;

		// Change color for navigation title.
		title.style.backgroundColor = "rgba(255, 255, 255, 0.0)";

		// Change color for navigation title background.
		// navi_logo_union.style.backgroundColor="rgb(12, 40, 82, 0.0)";
	}

	let set_title_bar_collapse = function () {
		title.style.paddingTop = "10px";
		title.style.paddingBottom = "10px";
		if(getLayoutID()===2){
			pc_menu_box.style.width=String(document.body.offsetWidth+30)+"px";
			pc_menu_box.style.borderRadius = String(pc_bottom_box_collapse_radius)+"px";
		}
	}

	let set_title_bar_expanded = function() {
		title.style.paddingTop = "20px";
		if(getLayoutID()===2) {
			title.style.paddingBottom = pc_title_padding_bottom;
			pc_menu_box.style.width = pc_menu_box_width+"px";
			pc_menu_box.style.borderRadius = String(pc_bottom_box_expanded_radius)+"px";
		} else {
			title.style.paddingBottom = mobile_title_padding_bottom;
		}
	}

	let mobile_menu_box_expanded = function() {
		mobile_menu_box.style["-webkit-backdrop-filter"] = blur;
		mobile_menu_box.style["backdrop-filter"] = blur;
		mobile_menu_box.style.height = "100%";
		for (let i=0; i < mobile_menu_box.children.length; i++) {
			mobile_menu_box.children[i].style.opacity = "1";
			if(i>2){
				mobile_menu_box.children[i].style.height = mobile_menu_linkbutton_expanded_height;
			}
		}
		mobile_menu_title.style.height="30px";
		mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.7)";
	}

	let mobile_menu_box_collapse = function(){
		mobile_menu_box.style["-webkit-backdrop-filter"] = unblur;
		mobile_menu_box.style["backdrop-filter"] = unblur;
		mobile_menu_box.style.height = "0px";
		for (let i=0; i < mobile_menu_box.children.length; i++) {
			mobile_menu_box.children[i].style.opacity = "0";
			if(i>2){
				mobile_menu_box.children[i].style.height = mobile_menu_linkbutton_collapse_height;
			}
		}
		mobile_menu_title.style.height="10px";
		mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.0)";
	}

	let get_navi_pc_menu_box_width = function(){
		let width = 0;
		for (let i = 0; i < pc_menu_box.childElementCount; i+=1){
			let bound = pc_menu_box.children[i].getBoundingClientRect();
			width = width+bound.width;
		}
		return width;
	}

	let switch_view = function() {
		if(getLayoutID()===2) {
			// Control components visibility.
			mobile_menu_button.style.display = "none";
			mobile_menu_box.style.display = "none";
			pc_menu_box.style.display = "flex";
			pc_decoration.style.display = "block";
			pc_box_placeholder.style.display = "flex";
			pc_menu_box.style.width = get_navi_pc_menu_box_width()+"px";
			pc_menu_box_width = get_navi_pc_menu_box_width();
			if(window.pageYOffset < collapse_threshold && enable_expanded.checked === true) {
				set_title_bar_expanded();
				set_title_bar_transparent();
			} else {
				set_title_bar_collapse();
				set_title_bar_colored();
			}
		} else {
			// Control components visibility.
			pc_menu_box.style.display = "none";
			pc_decoration.style.display = "none";
			pc_box_placeholder.style.display = "none";
			mobile_menu_button.style.display = "flex";
			mobile_menu_box.style.display = "flex";

			if(window.pageYOffset < 1 && enable_expanded.checked) {
				set_title_bar_transparent();
				set_title_bar_expanded();
			} else if(!mobile_menu_state.checked){
				set_title_bar_collapse();
				set_title_bar_colored();
			}

			if(mobile_menu_state.checked) {
				set_title_bar_expanded();
				set_title_bar_colored();
				mobile_menu_box_expanded();
				if(getLayoutID()===2) {
					title.style.paddingBottom = pc_title_padding_bottom;
				} else {
					title.style.paddingBottom = mobile_title_padding_bottom;
				}
			}
			if(getLayoutID()===1){
				for (let i=0; i < mobile_menu_box.children.length; i++) {
					if(i>2){
						mobile_menu_box.children[i].style.width = "23.75vw";
						mobile_menu_box.children[i].style.borderTopWidth = "1px";
						if(i === 4) {
							mobile_menu_box.children[i].style.borderRightWidth = "0px";
						}
					}
				}
			} else {
				for (let i=0; i < mobile_menu_box.children.length; i++) {
					if(i>2){
						if(i>4){
							mobile_menu_box.children[i].style.borderTopWidth = "0px";
						}
						if(i === 4) {
							mobile_menu_box.children[i].style.borderRightWidth = "1px";
						}
						mobile_menu_box.children[i].style.width = "47.5vw";
					}
				}
			}
		}
	}
}