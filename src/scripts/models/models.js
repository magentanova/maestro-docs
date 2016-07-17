import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'
<<<<<<< HEAD
=======

>>>>>>> af10df8e260eda3f2cccdb6257b854c9d2800f47

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

const User = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})
<<<<<<< HEAD

UserAuthModel.register = function(email,password) {
=======
User.register = function(email,password) {
>>>>>>> af10df8e260eda3f2cccdb6257b854c9d2800f47
	return $.ajax({
		type: 'post',
		url: '/auth/register',
		data: {
			email: email,
			password: password
		}
	})
}

User.login = function(email,password) {
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
	},(err)=> {console.log(err.responseText)})
}

User.logout = function() {
	return $.getJSON('/auth/logout').then(()=>{
		localStorage[app_name + '_user'] = null
	})
}

User.getCurrentUser = function() {
	return localStorage[app_name + '_user'] ? JSON.parse(localStorage[app_name + '_user']) : null
}


export { User }

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

// ^^ DO NOT TOUCH ^^
// but, you may ...
<<<<<<< HEAD
const AppUserModel = UserAuthModel.extend({
=======
const myUserModel = User.extend({
>>>>>>> af10df8e260eda3f2cccdb6257b854c9d2800f47

})