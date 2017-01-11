window.docsJSON = {
	essential_installs: {
		title: "Essential Installs",
		cards: [
			{
				heading: "Install Yeoman",
				subheading: "<a href='https://yeoman.io'>Yeoman</a> is a scaffolding tool that helps developers put together directory structures and file structures according to a template.",
				steps: [
					"Enter the command <code>npm install -g yeoman</code> from any directory."
				]
			},
			{
				heading: "Install the Yeoman Generator for Maestro",
				subheading: "Maestro (this tool) is a templating engine designed using Yeoman",
				steps: [
					"Enter the command <code>npm install -g generator-maestro</code> from any directory."
				]
			},
			{
				heading: "Install MongoDB",
				subheading: "MongoDB is a document-based database that you will use to persist data on the back end. To set it up, enter the following shell commands from any directory.",
				steps: [
				  "<code>brew install mongodb</code>",
				  "<code>sudo mkdir -p /data/db</code>",
				  "<code>sudo chown -R $(whoami) /data/</code>"
				]
			}
		]
	},
	optional_installs: {
		title: "Optional Installs",
		cards: [
			{
				heading: "Install Postman",
				subheading: "<a href='https://getpostman.com'>This chrome extension</a> allows you to test POST requests to your api endpoints much more easily and quickly than you could by writing JavaScript. You can set headers, write JSON into the request body, and use tabs to track multiple requests at once.",
				steps: []
			},
			{
				heading: "Install MongoChef",
				subheading: "This application allows you to inspect and modify your Mongo databases, so you can quickly read, add, edit and delete documents/records.",
				steps: [
					"Install <a href='http://3t.io/mongochef/download/core/'>from the MongoChef site</a>",
					"Open the application",
					"Go to <strong>Connect</strong> --> <strong>New Connection</strong>",
					"Enter name of database (e.g. <strong>My Localhost DB</strong)",
					"Enter <strong>localhost</strong> for the server",
					"Enter <strong>27017</strong> for the port",
					"Click <strong>Save Connection</strong> (you should see the db available on the left panel)",
					"Click <strong>Connect</strong> on the bottom right to connect and inspect"
				]
			}
		]
	}
}