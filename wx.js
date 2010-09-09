WX = {}

WX.geoloc = {
	can_locate: function() {
		if (typeof(navigator) == 'object' && navigator["geolocation"]) {
			this.location_method = 'geode';
			return true;
		}
		
		return false;
	},
	
	get_location: function(callback_got_location, callback_fail_location) {
		this.callback_got_location = callback_got_location;
		this.callback_fail_location = callback_fail_location;
		
		navigator.geolocation.getCurrentPosition(WX.geoloc.got_location, WX.geoloc.fail_location, {timeout:1500});
	},
	
	got_location: function (position) {
		WX.geoloc.callback_got_location(position);
	},
	
	fail_location: function(e) {
		var error_message = "unknown error";
		
		if (e.code == 1) error_message = "Scanner not found";
		if (e.code == 2) error_message = "Wi-Fi not available";
		if (e.code == 3) error_message = "No Wi-Fi in range";
		if (e.code == 5) error_message = "Location server unavailable";
		if (e.code == 6) error_message = "Location cannot be determined";
		
		WX.geoloc.callback_fail_location(error_message);
	},
}
