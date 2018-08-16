/**
 * Selection Layout
 * @author Sethulakshmi, Akshay
 */
import React, { Component } from 'react';
import { ImagePatcher } from '../../components';

class Selection extends Component {
	render() {
		return (
			<div className={'imageWrapper'}>
				<ImagePatcher {...this.props} />
			</div>
		);
	}
}

export default Selection;
