import React from 'react'
import {MsgModel} from '../models/models'
import {User} from '../models/models'
import Header from './header'


const ComposeView = React.createClass({
	render: function() {
		return (
			<div className="composeView">
				<Header />
				<ComposeForm />
			</div>
			)
	}
})

const ComposeForm = React.createClass({

	_saveMsg: function(e) {
		e.preventDefault()
		
		var newMsg = new MsgModel({
			to: e.target.to.value,
			from: User.getCurrentUser().email,
			content: e.target.content.value
		})
		// makes a post request to the url set as a property on the model. 
		// all of the model's attributes will comprise the body of the request.
		newMsg.save()
	},

	render: function() {
		return (
			<form onSubmit={this._saveMsg}>
				<input name="to" placeholder="to" />
				<input name="content" placeholder="content" />
				<button type="submit" value="send!">send!</button>
			</form>
			)
	}
})

export default ComposeView