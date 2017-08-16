import React, {Component} from 'react';
import MenuFile from './menu-file';

export default class MenuFolder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded || false
		}
	}

	renderChildren(children) {

		return children.map
		((child) => {
			if(child.children) {
				// debugger;
				// If the child has children then it is a folder
				return (
					<MenuFolder
					onFileSelect={this.props.onFileSelect} 
					key={child.path} 
					file={child}
					selectedFile={this.props.selectedFile}
					/>
				)
			} else {
				return (
					<MenuFile 
					onFileSelect={this.props.onFileSelect} 
					key={child.path} 
					file={child}
					selectedFile={this.props.selectedFile}
					/>
				)
			}
		})
	}

	folderIcon = () => {
		if(this.state.expanded) {
			return (
				<i class="fa fa-folder-open-o" aria-hidden="true"></i>
			)
		} else {
			return (
				<i class="fa fa-folder-o" aria-hidden="true"></i>
			)
		}
	}

	onFolderBarClick = () => {
		this.setState({
			expanded: !this.state.expanded
		})
	}

	render() {
		let isClosed = () => {
			if(this.state.expanded) {
				return "";
			} else {
				return "closed";
			}
		}
		
		var file = this.props.file
		
		if(!file) {
			return (
				<div>Loading...</div>
			)
		}
		return (
			<div className="folder">
				<div className="folder-bar" 
				onClick={this.onFolderBarClick}>
					<div className="folder-icon">
						{this.folderIcon()}
					</div>
					<div className="folder-name">{file.name}</div>
				</div>
				<div className={"folder-content " + isClosed()}>
					{ this.renderChildren(file.children) }
				</div>
			</div>
		)
	}
}