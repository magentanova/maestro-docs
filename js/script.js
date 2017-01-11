

function documentationTemplate(json) {
	var html = '<h2>' + json.title + '</h2>'
	return html += json.cards.reduce(cardTemplate,'')
}

function cardTemplate(snowball,obj) {
	console.log(obj)
	var content = "",
		listType = obj.steps.length > 1 ? "ol>" : "ul>"
	content += "<div class='card'>"
	content += "<h3>" + obj.heading + "</h3>"
	content += obj.subheading ? "<p>" + obj.subheading + "</p>" : ''
	content += 	"<" + listType

	for (var i = 0; i < obj.steps.length; i ++) {
		var step = obj.steps[i]
		content += "<li>" + step + "</li>"
	}
	content += 	"</" + listType
	content += "</div>"
	return snowball + content
}

function qs(sel) {
	return document.querySelector(sel)
}

function getInstallsTemplate() {
	var content = documentationTemplate(docsJSON.essential_installs)
	content += documentationTemplate(docsJSON.optional_installs)
	return content
}

function getFrontTemplate() {
	return "<div class='card'>Front</div>"
}

function getHomeTemplate() {
	return "<div class='card'>Home</div>"
}
function getBackTemplate() {
	return "<div class='card'>Back</div>"
}

function hashController() {
	var hashString = location.hash.substr(1),
		content
	switch (hashString) {
		case 'installs':
			content = getInstallsTemplate()
			break
		case 'home':
			content = getHomeTemplate()
			break
		case 'front':
			content = getFrontTemplate()
			break
		case 'back':
			content = getBackTemplate()
			break
		default: 
			location.hash = "home"
	}
	qs('.documentation').innerHTML = content
}


window.onhashchange = hashController
hashController()