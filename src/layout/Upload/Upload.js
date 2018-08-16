/**
 * Upload Layout
 * @author Sethulakshmi, Akshay
 */
import React, { Component } from 'react';
import Upload from '../../container/Upload/Upload';
import './Upload.css';
import PopupComp from '../Popup/Popup';
import { commonAction } from './../../common/actions';
import { connect } from 'react-redux'

class UploadLayout extends Component {
	constructor(props){
		super(props);
		this.state={
			popupOpen: false,
		}
	}
  handleModal = () => {
		this.setState({
      popupOpen: !this.state.popupOpen
		})
	};

	render() {
		return (
			<div className={'fileUploadWrapper'}>
				<Upload {...this.props} />
        <PopupComp
          popupOpen={this.state.popupOpen}
          handleModal={this.handleModal}
          proceedData={this.props.proceed}
				/>
			</div>
		);
	}
}

export default connect((state)=>({
  proceed: state.proceed.data
}), { commonAction })(UploadLayout);
