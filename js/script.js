var hashController = function() {
	var hashString = location.hash.substr(1)
	switch (hashString) {
		case 'started':

		case 'home':

		case 'front':

		case 'back':
	}
}

window.onhashchange = hashController
hashController()