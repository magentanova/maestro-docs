

function docTemplate(json) {
	var html = '<h2>' + json.title + '</h2>'
	html += json.cards.reduce(cardTemplate,'')
	return html += json.preamble ? "<p class='preamble'><i>" + json.preamble + "</i></p>" : ''
}

function cardTemplate(snowball,obj) {
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
	return docTemplate(docsJSON.essential_installs) + docTemplate(docsJSON.optional_installs)
}

function getWorkflowTemplate() {
	return docTemplate(docsJSON.workflow)
}

function getFrontTemplate() {
	return docTemplate(docsJSON.front_end)
}

function getHomeTemplate() {
	return docTemplate(docsJSON.home)
}

function getBackTemplate() {
	return docTemplate(docsJSON.back_end)
}

function getDeployTemplate() {
	return docTemplate(docsJSON.deploy)
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
		case 'workflow':
			content = getWorkflowTemplate()
			break
		case 'back':
			content = getBackTemplate()
			break
		case 'front':
			content = getFrontTemplate()
			break
		case 'deploy':
			content = getDeployTemplate()
			break
		default: 
			location.hash = "home"
	}
	qs('.documentation').innerHTML = content
}


window.onhashchange = hashController
hashController()