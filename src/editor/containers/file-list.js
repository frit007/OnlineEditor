import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MenuFolder from '../components/menu-folder';
var css = require('../css/file-list.scss')



class FileList extends Component {

	renderList() {
		return <MenuFolder folder={this.props.files}/>
	}

	render() {
		return (
			<div className="list-group file-list">
				{this.renderList()}
			</div>
		)
	}
}


function mapStateToProps({files}) {
	// Pass information from state to props
	return {files}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);