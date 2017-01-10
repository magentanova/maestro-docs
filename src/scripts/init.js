const init = function() {
	const findCookie = function(targetKey) {
		var cookies = document.cookie.split(';')
		var targetVal
		cookies.forEach(function(cookie){
			let key = cookie.split('=')[0].trim(),
				val = decodeURIComponent(cookie.split('=')[1])
			if (key === targetKey) {
				targetVal = val
			}
		})
		return targetVal
	}
	var app_name = findCookie('tiy_full_stack_app_name')
	var user = findCookie(app_name + '_user')
	localStorage.setItem(app_name + '_user',user)
	return app_name
}

export default init