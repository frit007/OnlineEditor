import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MenuFolder from '../components/menu-folder';
import {loadFiles, fileSelected} from '../actions'
var css = require('../css/file-list.scss')
// var faIcons = require('../../packages/font-awesome/scss/font-awesome.scss')


class FileList extends Component {

	componentWillMount() {
		// project is has to be defined on the window object
		this.props.loadFiles(this.props.project.id);
	}

	onFileSelect = (file) => {
		this.props.fileSelected(file);
	}

	renderList() {
		return <MenuFolder 
		onFileSelect={this.onFileSelect} 
		file={this.props.files}
		selectedFile={this.props.activeFile}
		expanded={true}
		/>
	}


// chvron down
// folder /folder-open /file
// caret down / caret right
	render() {
		return (
			<div className="list-group file-list">
				{this.renderList()}
			</div>
		)
	}
}


function mapStateToProps({files,activeFile}) {
	// Pass information from state to props
	return {files, activeFile}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({loadFiles, fileSelected}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);