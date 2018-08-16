/**
 * Upload Container, calls upload component gets the files
 * @author Akshay
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Upload } from '../../components';

class UploadContainer extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	uploadedFiles: []
		// };

		// this.handleFilesUpload = this.handleFilesUpload.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
	}

	/**
	 * Update the state with uploaded files
	 * ***************          DEPRECATED          ****************
	 * *************** UPDATE THE PARENT STATE ONLY ****************
	 * @param uploadedFiles
	 */
	// handleFilesUpload(uploadedFiles) {
	// 	this.props.handleFilesUpload();
	// 	this.setState({
	// 		uploadedFiles
	// 	});
	// }

	/**
	 * On submit of the files to upload
	 * ***************          DEPRECATED          ****************
	 * *************** UPDATE THE PARENT STATE ONLY ****************
	 * @param values
	 */
	// onSubmit(values) {
	// 	//Upload the files from the state here.
	// 	const { uploadedFiles } = this.state;
	// 	console.log(uploadedFiles, values);
	// }

	render() {
		return (
			<div style={{ width: '100%', height: '50%' }}>
				<form
					// onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						width: '100%',
						textAlign: 'center',
						fontSize: 12
					}}
				>
					<Field
						name="uploadField"
						component={Upload}
						accept={'image/png, image/jpeg, image/jpg , image/tiff'}
						handleFilesUpload={this.props.handleFilesUpload}
					/>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'upload',
	keepDirtyOnReinitialize: true,
	enableReinitialize: true
})(connect(state => ({ state }))(UploadContainer));
