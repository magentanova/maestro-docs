import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
const UserAuthModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})

UserAuthModel.register = function(newUserData) {
	if(typeof newUserData !== 'object') {  throw new Error("User.register needs to be of type object with email & password properties") }
	if(!newUserData.email || !newUserData.password) {  throw new Error("object needs email + password properties") }

	return $.ajax({
		method: 'POST',
		type: 'json',
		url: '/auth/register',
		data: newUserData
	})
}

UserAuthModel.login = function(email, password) {
	if(!email || !password || email === '' || password === '') {  
		throw new Error("User.login(«email», «password») method needs strings for email, password arguments") 
	}

	if(typeof email !== 'string' || typeof password !== 'string' ) {  
		throw new Error("User.login(«email», «password») email + password arguments should both be strings") 
	}

	return $.ajax({
		method: 'POST',
		type: 'json',
		url: '/auth/login',
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage[app_name + '_user'] = JSON.stringify(userData)
		return userData
	},(err)=> {
		throw new Error(err.responseText)
	})
}

UserAuthModel.logout = function() {
	return $.getJSON('/auth/logout').then(()=>{
		localStorage[app_name + '_user'] = null
	})
}

UserAuthModel.getCurrentUser = function() {
	return localStorage[app_name + '_user'] ? JSON.parse(localStorage[app_name + '_user']) : null
}


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ^^ DO NOT TOUCH ^^

// but, you may extend the UserAuthModel Constructor (which is a Backbone Model)
const User = UserAuthModel.extend({
	initialize: function(){

	}
})

export default User
