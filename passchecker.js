$(document).ready(function() {
	/////////////////
	// Password watcher - Mike Seiler
	// Modified for JQuery from AngularJS Directive by Bruno Scopelliti
	// http://codepen.io/brunoscopelliti/pen/nFlvm
	$("#passwordSubmit").prop("disabled",true);
	
	$("#firstPass").keyup(function(event) {
		var _force = 0;
		var p = $("#firstPass").val();
		if($("#firstPass").is(':empty')) {
			$(".point").css({ "background": "#DDD" });
		}
		// various things to check for
		var _regex = /[$-/:-?{-~!"^_`\[\]]/g;
		var _lowerLetters = /[a-z]+/.test(p);
		var _upperLetters = /[A-Z]+/.test(p);
		var _numbers = /[0-9]+/.test(p);
		var _symbols = _regex.test(p);
		var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
		var _passedMatches = jQuery.grep(_flags, function (el) { return el === true; }).length;                                          
		// define the strength of the password
		_force += 2 * p.length + ((p.length >= 8) ? 1 : 0);
		_force += _passedMatches * 10;
		            
		// penalty (short password)
		_force = (p.length < 8) ? Math.min(_force, 10) : _force;                                      
		// penalty (poor variety of characters)
		_force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
		_force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
		_force = (_passedMatches == 3) ? Math.min(_force, 30) : _force;
		_force = (_passedMatches == 4) ? Math.min(_force, 40) : _force;
		// Update the CSS Boxes with the strength indicator
        if(_force > 0) {
                var ic = getColors(_force);
                $(".point")
                .css({ "background": "#DDD" })
                .slice(0, ic.index)
                .css({ "background": ic.color });
        }
		if(_force < 20) {
            $("#passwordSubmit").prop("disabled",true);
			$("#passwordMsg").show();
            if(p.length < 8) {
                $("#passwordMsg").text("Too Short").css("color","#FF0000");
            }
            if(p.length >= 8) {
                $("#passwordMsg").text(_passedMatches + " requirements met.");    
            }
		}
		if(_force >= 20 && _force < 30) {
            $("#passwordSubmit").prop("disabled",true);
			$("#passwordMsg").text(_passedMatches + " requirements met.");
		}
        if(_force >= 30) {
            $("#passwordSubmit").prop("disabled",false);
            $("#passwordMsg").text(_passedMatches + " requirements met.");
        }
	});

	function getColors(f) {
		var colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
		var idx = 0;
		if(f <= 10) { idx = 0; }
		else if(f <=20) { idx = 1; }
		else if(f <=30) { idx = 2; }
		else if(f <=40) { idx = 3; }
		else { idx = 4; }
		var index = idx + 1;
		var object = {"index": index, "color": colors[idx]}; 
		return object;
	}
	// 
	// end password watcher
	///////////////////////////////
});