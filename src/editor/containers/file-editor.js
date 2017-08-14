import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/file-editor.scss';
import "codemirror/lib/codemirror.css";
import CodeMirror from 'react-codemirror';
import socket from 'socket.io-client';

console.log(CodeMirror);

class FileEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {content: ""}
		window.editor = this;	
	}
	
	componentWillMount() {
		this.socket = new socket('/editor');
		this.socket.on("err", ({type, err}) => {
			console.error(type, err);
		})
		this.socket.on("updateContent", (content) => {
			console.warn("updateContent", content);
			// TODO maybe handle conflicts here?
			this.setState({
				content
			})
		})
	}

	updateCode = (content) => {
		// console.warn("status", this)		
		this.setState({
			content
		})
	}
	
	componentWillReceiveProps = (props) => {
		const updateSocketFile = (path) => {
			this.socket.emit('openFile', {
				path,
				project_id: this.props.project.id
			})
		}

		if(props.activeFile) {
			if(this.props.activeFile) {
				if(this.props.activeFile.path != props.activeFile.path) {
					updateSocketFile(props.activeFile)
				}
			} else {
				updateSocketFile(props.activeFile.path)
			}
		}
		
	}

	render() {
		if (this.props.activeFile == null) {
			return (
				<div>please Select a file</div>
			)
		}

		var activeFile = this.props.activeFile;
		// console.warn("active file",activeFile);
		var options = {
			lineNumbers: true
		}
		return (
			<div className="file-editor">
				<CodeMirror
				ref="codeMirror" 
				className="file-code"
				value={this.state.content}
				onChange={this.updateCode} 
				options={options} />
			</div>
		)
	}
}


function mapStateToProps({activeFile}) {
	// Pass information from state to props
	return {activeFile}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileEditor)