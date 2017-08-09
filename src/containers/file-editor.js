import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../css/file-editor.scss';
import "codemirror/lib/codemirror.css";
import CodeMirror from 'react-codemirror';

console.log(CodeMirror);

class FileEditor extends Component {
	constructor(props) {
		super(props);

		
	}
	
	updateCode = (event) => {

	}

	render() {
		if (this.props.activeFile == null) {
			return (
				<div>please Select a file</div>
			)
		}

		var activeFile = this.props.activeFile;
		console.log(activeFile);
		var options = {
			lineNumbers: true
		}
		return (
			<div className="file-editor">
				<CodeMirror value={activeFile.code} onChange={this.updateCode} options={options} />
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