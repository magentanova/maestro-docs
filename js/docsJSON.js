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
				subheading: "Maestro (this tool) is a templating engine designed using Yeoman.",
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
	},
	workflow: {
		title: "Workflow",
		cards: [
			{
				heading: "Run your Database",
				subheading: "Your Mongo database isn't just a passive bucket of data. It's a running program that is actively \"listening\" for queries, similar to how your server is actively listening for requests.",
				steps: [
					"Enter the command <code>mongod</code> from any directory. You don't need to restart your database separately for every project. One running instance can have several partitions for different apps.",
					"If your console output ends with something like <code>waiting for connections on port XXXXX</code>, then your database is listening for queries. You're good to go.",
					"If your connection was refused, the database may already be running. You can leave it alone, or, to be sure, you can kill all running mongo processes with <code>kill $(pgrep mongo)</code>, and then run <code>mongod</code> again."
				]
			},
			{
				heading: "Create a Project",
				subheading: "With a single command, you can build all the scaffolding for a project.",
				steps: [
					"Go to the parent directory of the project you want to start. Something like \"apps\" or \"projects\" or \"the chamber of secrets\", however you do.",
					"Enter <code>yo maestro</code> and follow the prompts. You will name your project at this stage."
				]
			},
			{
				heading: "Start Coding",
				steps: [
					"<code>cd</code> into your newly created project folder.",
					"Enter <code>npm run go</code>. This sets several things in motion: <ol>",
					"Initializes a file watcher for the Javascript files in <code>src/scripts</code>, so that every time you save a file in this directory, everything in <code>src/scripts</code> will be (a) transpiled from ES6 JavaScript and JSX to old-school ES5 Javascript and pure JS. It bundles all of this rewritten code, including all imported libraries, into the file at <code>dist/assets/js/app.js</code>",
					"Initializes a similar file watcher for the SCSS files in <code>src/styles</code>, which are bundled, transpiled into CSS, and written to the file at <code>dist/assets/style.css</code>.",
					"Starts a local server for this project by running the <code>server.js</code> script. The server will run on port 3000, so you'll ping it, as you develop your project, by visiting <a href='http://localhost:3000'>localhost:3000</a>.<br><br>NOTE: At this stage your server will try to connect to the appropriate database partition (defined by your project name), so you will get an error if your database is not already running.</ol>",
					"If your server can't find a port to connect to, it will error out. This may mean that you're already running an instance of the server. You can stop all currently running Node processes with <code>npm run stop</code>, then repeat step 2."
				]
			}
		]
	},
	front_end: {
		title: "Front-End Development",
		cards: [
			{
				heading: "Where your Code Goes",
				steps: [
					"The <strong>only</strong> place that you will write CSS or JavaScript is in the <code>src/</code> folder. JavaScript goes in <code>src/scripts</code> and CSS goes in <code>src/styles</code>.",
					"You can import and export your own JS modules within <code>src/scripts</code>, as long as you use relative paths, e.g. <code>import UserModel from './models/user'</code>.",
					"Every time you save a file in <code>src/scripts</code>, all your code, including imported libraries, will be transpiled and bundled into the file at <code>dist/assets/js/app.js</code>. Similar action is taken for your CSS work. This is due to the action of a Node tool employed by Maestro called Watchify.",
					"When you visit <a href='localhost:3000'>localhost:3000</a>, or when someone visits your deployed site, your server will respond with the <ode>index.html</code> file in <code>dist/</code>. That HTML file links to the bundled, transpiled JS and CSS files that were written to <code>dist/</code>.",
					"With few exceptions, you <strong>need never</strong> edit the files that are in <code>dist/</code>. You only write code to <code>src/</code>, and you depend on a little robot to transfer that work to <code>dist/</code>."
				]
			},
			{
				heading: "Working with External Libraries",
				subheading: "Some libraries come with this framework, others you'll have to download.",
				steps: [
					"React, ReactDOM, Backbone, Underscore, and JQuery are automatically installed to your project when you run <code>yo maestro</code>. To use them into a JS file, you only need to <code>import</code> them at the top of the file.",
					"To include a new outside library, run <code>npm install --save [LIBRARY NAME]</code> from inside your project folder. The <code>--save</code> flag causes this libarary to be added to the dependencies in your project.json, so that others can clone your project and build it all at once with <code>npm install</code>."
				]
			}
		]
	},
	back_end: {
		title: "Back-End Development"
	}
}