import React from 'react'
import $ from 'jquery'
import Header from './header'

var InboxView = React.createClass({

	getInitialState: function() {
		return {
			coll: this.props.coll
		}
	},

	componentWillMount: function() {
		this.state.coll.on('sync update',()=>{
			this.setState({
				coll: this.state.coll
			})
		})
	},

	render: function() {
		return (
			<div className="inboxView">
				<Header />
				<Inbox coll={this.props.coll} />
			</div>
			)
	}
})

var Inbox = React.createClass({
	_makeMsg: function(record) {
		return <Msg key={record.id} record={record} />
	},

	render: function() {
		return (
			<div className="inbox">
				{this.props.coll.map(this._makeMsg)}
			</div>
			)
	}
})

var Msg = React.createClass({

	_removeModel: function() {
		this.props.record.destroy({
			url: `/api/messages/${this.props.record.id}`		
		})
	},

	render: function() {
		return (
			<div className="msg">
				<div className="msgDeets">
					<p>to: {this.props.record.get('to')}</p>
					<p>from: {this.props.record.get('from')}</p>
					<p>{this.props.record.get('content')}</p>
				</div>
				<button onClick={this._removeModel} >X</button>
			</div>
			)
	}
})

var SearchForm = React.createClass({
	render: function() {
		return (
			<div className="searchForm">
				<input name="to" placeholder="to"></input>
				<input name="from" placeholder="from"></input>
			</div>
			)
	}
})


export default InboxView