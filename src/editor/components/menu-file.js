import React from 'react';

export default (props) => {

	function fileClicked() {
		props.onFileSelect(props.file);
	}

	function isFileSelected() {
		return props.file === props.selectedFile
	}

	function markSelected() {
		if(isFileSelected()) {
			return " selected "
		}
		return "";
	}

	return(
		<div class={"file" + markSelected()} onClick={fileClicked}>
			<div class="file-icon">
				<i class="fa fa-file-text-o" aria-hidden="true"></i>

			</div>
			{props.file.name}
		</div>
	)
}