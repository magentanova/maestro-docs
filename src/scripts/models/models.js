import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

const UserAuthModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})

UserAuthModel.register = function(email,password) {
	return $.ajax({
		type: 'post',
		url: '/auth/register',
		data: {
			email: email,
			password: password
		}
	})
}

UserAuthModel.login = function(email,password) {
	return $.ajax({
		type: 'post',
		url: '/auth/login',
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage[app_name + '_user'] = JSON.stringify(userData)
		return userData
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


export { UserAuthModel }

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

// ^^ DO NOT TOUCH ^^
// but, you may ...
const AppUserModel = UserAuthModel.extend({

})