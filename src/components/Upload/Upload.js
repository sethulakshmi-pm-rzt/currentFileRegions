/**
 * Upload form Component
 * @author Akshay
 */
import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';

class Upload extends Component {
	constructor(props) {
		super (props);

		this.state = {
			uploadedFiles: null
		};

		this.onDrop = this.onDrop.bind(this);
	}

	/**
	 * Handle all the file uploads
	 * @param uploadFiles
	 */
	onDrop(uploadFiles) {
		if(uploadFiles.length > 0) {
			this.props.handleFilesUpload(uploadFiles);
			this.setState(
				{
					uploadedFiles: uploadFiles
				},
				() => {
					this.props.input.onChange(uploadFiles);
				}
			);
		}
	}

	render () {
		const { accept, input } = this.props;
		const adaptFileEventToValue = delegate => e => delegate(e.target.files);
		return (
			<ReactDropzone
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer',
					height: '100%',
					width: '100%',
					border: "2px dashed rgba(0,0,0,0.2)",
					borderRadius: "5px",
				}}
				onDrop={image => {
					this.onDrop(image);
				}}
				accept={accept}
				multiple
				onBlur={adaptFileEventToValue(input.onBlur)}
			>
				Click or Drop files to upload.
			</ReactDropzone>
		);
	}
}

export default Upload;