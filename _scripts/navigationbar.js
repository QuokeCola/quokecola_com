// JavaScript Document
document.write("<script language=javascript src='./_scripts/common_macro.js'></script>");
let navi_title 				= document.getElementById("navi_title_obj");
let navi_logo_line 			= document.getElementById("navi_titleline_obj");
let navi_logo_union 		= document.getElementById("navi_title_union");
let navi_enable_expanded 	= document.getElementById("navi_enable_expanded");
let navi_mobile_menu_button = document.getElementById("navi_mobile_menu_button");
let navi_mobile_menu_state 	= document.getElementById("navi_mobile_menu_state_obj");
let navi_mobile_menu_box	= document.getElementById("navi_mobile_page_button_background");
let navi_mobile_menu_title	= document.getElementById("navi_mobile_menu_title");
let navi_pc_decoration 		= document.getElementById("navi_pc_decoration_obj");
let navi_pc_box_placeholder 	= document.getElementById("navi_pc_box_placeholder");
let navi_pc_menu_box 			= document.getElementById("navi_pc_menu_box");

navi_enable_expanded.checked= 1;
let navi_pc_menu_box_width 	= 0;
let navi_pc_title_padding_bottom			= "70vh";
let navi_pc_bottom_box_expanded_radius		= 7;
let navi_pc_bottom_box_collapse_radius		= 0;

let navi_mobile_title_padding_bottom		= "5vh";
let navi_mobile_menu_linkbutton_collapse_height = "10vh";
let navi_mobile_menu_linkbutton_expanded_height = "15vh";
let navi_collapse_threshold = 1;


let unblur									= "blur(0px)"
let blur									= "blur(20px)"
let previousIsPC							= getLayoutID();


function navi_initiate(){
	setTimeout(function(){
		navi_switch_view();
		navi_pc_menu_box_width = get_navi_pc_menu_box_width();
	}, 100);
	document.addEventListener('scroll', navi_scroll);
	window.addEventListener('resize', navi_resize);
	window.addEventListener('orientationchange', function() {
		setTimeout(function(){navi_switch_view();}, 20);
	}, false);
}

function navi_resize() {
	let currentIsPC = getLayoutID();
	if(currentIsPC != previousIsPC) {
		navi_switch_view();
	}
	previousIsPC = currentIsPC;
	if(window.pageYOffset > navi_collapse_threshold || navi_enable_expanded.checked == 0){
		navi_pc_menu_box.style.width=String(document.body.offsetWidth+30)+"px";
		set_title_bar_colored();
		navi_pc_menu_box.style.borderRadius=String(navi_pc_bottom_box_collapse_radius)+"px";
	} else {
		navi_pc_menu_box.style.borderRadius=String(navi_pc_bottom_box_expanded_radius)+"px";
	}
}

function navi_scroll() {
	let currentY = window.pageYOffset;
	if(currentY > navi_collapse_threshold) {
		if(getLayoutID()==2 || (navi_mobile_menu_state.checked == 0 && navi_enable_expanded.checked == 1)){
			set_title_bar_collapse();
		}
		set_title_bar_colored();
	} else {
		if(getLayoutID()==2 || (navi_mobile_menu_state.checked == 0 && navi_enable_expanded.checked == 1)){
			set_title_bar_transparent();
			set_title_bar_expanded();
		}
	}
}

function navi_mobile_menu_button_clk() {
	if(navi_mobile_menu_state.checked) {	// Click to uncheck
		if(window.pageYOffset>0) {
			set_title_bar_collapse();
		} else {
			set_title_bar_transparent();
		}
		navi_mobile_menu_box_collapse();
	} else {								// Click to check
		set_title_bar_expanded();
		set_title_bar_colored();
		navi_mobile_menu_box_expanded();
	}
}

function set_title_bar_colored() {
	// PC navigation decoration "</>"
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.0)";
	navi_pc_decoration.style['-webkit-backdrop-filter']=unblur;
	navi_pc_decoration.style['backdrop-filter']=unblur;
	navi_pc_decoration.style.color="white";
	
	// Navigation Background
	navi_title.style['-webkit-backdrop-filter']=blur;
	navi_title.style['backdrop-filter']=blur;
	
	// Change color for navigation title.
	navi_title.style.backgroundColor = "rgba(12, 40, 82, 0.9)";
	
	// Change color for navigation title background.
	navi_logo_union.style['-webkit-backdrop-filter']=unblur;
	navi_logo_union.style['backdrop-filter']=unblur;
	navi_logo_union.style.backgroundColor="rgba(0,0,0,0.0)";
}

function set_title_bar_transparent() {
	// PC navigation decoration "</>"
	navi_pc_decoration.style.backgroundColor="rgba(255,255,255,0.9)";
	navi_pc_decoration.style['-webkit-backdrop-filter']=blur;
	navi_pc_decoration.style['backdrop-filter']=blur;
	navi_pc_decoration.style.color="black";
	
	// Navigation Background
	navi_title.style['-webkit-backdrop-filter']=unblur;
	navi_title.style['backdrop-filter']=unblur;
	
	// Change color for navigation title.
	navi_title.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
	
	// Change color for navigation title background.
	navi_logo_union.style["-webkit-backdrop-filter"]=blur;
	navi_logo_union.style['backdrop-filter']=blur;
	navi_logo_union.style.backgroundColor="rgb(12, 40, 82, 0.9)";
}

function set_title_bar_collapse() {
	navi_title.style.paddingTop = "10px";
	navi_title.style.paddingBottom = "10px";
	if(getLayoutID()==2){
		navi_pc_menu_box.style.width=String(document.body.offsetWidth+30)+"px";
		navi_pc_menu_box.style.borderRadius = String(navi_pc_bottom_box_collapse_radius)+"px";
	}
}

function set_title_bar_expanded() {
	navi_title.style.paddingTop = "20px";
	if(getLayoutID()==2) {
		navi_title.style.paddingBottom = navi_pc_title_padding_bottom;
		navi_pc_menu_box.style.width = navi_pc_menu_box_width+"px";
		navi_pc_menu_box.style.borderRadius = String(navi_pc_bottom_box_expanded_radius)+"px";
	} else {
		navi_title.style.paddingBottom = navi_mobile_title_padding_bottom;
	}
}

function navi_mobile_menu_box_expanded() {
	navi_mobile_menu_box.style["-webkit-backdrop-filter"] = blur;
	navi_mobile_menu_box.style["backdrop-filter"] = blur;
	navi_mobile_menu_box.style.height = "100%";
	for (let i=0; i < navi_mobile_menu_box.children.length; i++) {
		navi_mobile_menu_box.children[i].style.opacity = "1";
		if(i>2){
			navi_mobile_menu_box.children[i].style.height = navi_mobile_menu_linkbutton_expanded_height;
		}
	}
	navi_mobile_menu_title.style.height="30px";
	navi_mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.7)";
}

function navi_mobile_menu_box_collapse() {
	navi_mobile_menu_box.style["-webkit-backdrop-filter"] = unblur;
	navi_mobile_menu_box.style["backdrop-filter"] = unblur;
	navi_mobile_menu_box.style.height = "0px";
	for (let i=0; i < navi_mobile_menu_box.children.length; i++) {
		navi_mobile_menu_box.children[i].style.opacity = "0";
		if(i>2){
			navi_mobile_menu_box.children[i].style.height = navi_mobile_menu_linkbutton_collapse_height;
		}
	}
	navi_mobile_menu_title.style.height="10px";
	navi_mobile_menu_box.style.backgroundColor="rgba(255,255,255,0.0)";
}

function get_navi_pc_menu_box_width(){
	let width = 0;
	for (let i = 0; i < navi_pc_menu_box.childElementCount; i+=1){
		let bound = navi_pc_menu_box.children[i].getBoundingClientRect();
		width = width+bound.width;
	}
	return width;
}

function navi_switch_view() {
	if(getLayoutID()==2) {
		// Control components visibility.
		navi_mobile_menu_button.style.display = "none";
		navi_mobile_menu_box.style.display = "none";
		navi_pc_menu_box.style.display = "flex";
		navi_pc_decoration.style.display = "block";
		navi_pc_box_placeholder.style.display = "flex";
		navi_pc_menu_box.style.width = get_navi_pc_menu_box_width();
		navi_pc_menu_box_width = get_navi_pc_menu_box_width();

		if(window.pageYOffset < navi_collapse_threshold && navi_enable_expanded.checked == 1) {
			set_title_bar_expanded();
			set_title_bar_transparent();
		} else {
			set_title_bar_collapse();
			set_title_bar_colored();
		}
	} else {
		// Control components visibility.
		navi_pc_menu_box.style.display = "none";
		navi_pc_decoration.style.display = "none";
		navi_pc_box_placeholder.style.display = "none";
		navi_mobile_menu_button.style.display = "flex";
		navi_mobile_menu_box.style.display = "flex";

		if(window.pageYOffset < 1 && navi_enable_expanded.checked) {
			set_title_bar_transparent();
			set_title_bar_expanded();
		} else if(!navi_mobile_menu_state.checked){
			set_title_bar_collapse();
			set_title_bar_colored();
		}

		if(navi_mobile_menu_state.checked) {
			set_title_bar_expanded();
			set_title_bar_colored();
			navi_mobile_menu_box_expanded();
			if(getLayoutID()==2) {
				navi_title.style.paddingBottom = navi_pc_title_padding_bottom;
			} else {
				navi_title.style.paddingBottom = navi_mobile_title_padding_bottom;
			}
		}
		if(getLayoutID()==1){
			for (let i=0; i < navi_mobile_menu_box.children.length; i++) {
				if(i>2){
					navi_mobile_menu_box.children[i].style.width = "23.75vw";
					navi_mobile_menu_box.children[i].style.borderTopWidth = "1px";
					if(i == 4) {
						navi_mobile_menu_box.children[i].style.borderRightWidth = "0px";
					}
				}
			}
		} else {
			for (let i=0; i < navi_mobile_menu_box.children.length; i++) {
				if(i>2){
					if(i>4){
						navi_mobile_menu_box.children[i].style.borderTopWidth = "0px";
					}
					if(i == 4) {
						navi_mobile_menu_box.children[i].style.borderRightWidth = "1px";
					}
					navi_mobile_menu_box.children[i].style.width = "47.5vw";
				}
			}
		}
	}
}