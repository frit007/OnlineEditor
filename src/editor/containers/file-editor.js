import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/file-editor.scss';

// import "codemirror/lib/codemirror.css";
// import CodeMirror from 'react-codemirror';


import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/lua';


import 'brace/theme/github';

import socket from 'socket.io-client';

const Content = require('../../../modules/content/client-content');




window.Content = Content;

// console.log(CodeMirror);

class FileEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {content: new Content("")}
		window.editor = this;
		this.content;
	}
	
	componentWillMount() {
		let that = this;


		this.socket = new socket('/editor');
		this.socket.on("err", ({type, err}) => {
			console.error(type, err);
		})
		

		this.socket.on("updateContent", ({content, version}) => {
			console.warn("updateContent", content, version);

			// debugger;
			that.setState({
				content: new Content(content, version, (text) => {
					console.log("text", text);
					that.ace.editor.setValue(text);
				})
			})
			// // TODO maybe handle conflicts here?
			// this.setState({
			// 	content: ""
			// })
		})
	}

	undo = () => {
		this.content.undo();
		this.setState({
			content: this.content.text
		})
	}

	onChange = (text) => {
		// console.warn("status", this)

		this.content.updateText(text);
		// this.setState({
		// 	content: text
		// })
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
					updateSocketFile(props.activeFile.path);
				}
			} else {
				updateSocketFile(props.activeFile.path);
			}
		}
		
	}

	shouldComponentUpdate (nextProps, nextState) {
		return this.state.content !== nextState.content.text
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
				{/* <CodeMirror
				ref={(mirror) => {this.mirror = mirror}}
				className="file-code"
				value={this.state.content}
				onChange={this.updateCode} 
				options={options} /> */}

				  <AceEditor
					ref={(ace) => {this.ace = ace}}
					mode="lua"
					theme="github"
					value={this.state.content.text}
					onChange={this.onChange}
					name="UNIQUE_ID_OF_DIV"
					editorProps={{$blockScrolling: true}}
				/>
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