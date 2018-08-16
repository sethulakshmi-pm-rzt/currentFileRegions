/**
 * FileList
 * @author Akshay, Sethulakshmi
 */
import React, { Component } from 'react';
import './FileList.css';

class FileList extends Component {
	constructor(props){
		super(props);
		this.state = {
			activeItem: props.currentFileNumber,
		}
	}

  componentWillReceiveProps(nextProps) {
		if(nextProps.currentFileNumber !== this.props.currentFileNumber) {
			this.setState({
        activeItem: nextProps.currentFileNumber
			})
		}
	}

	toFindActiveImg = (index) => {
    this.props.handleFileChange(index);
    this.setState({
      activeItem: index
    })
  };

	toProceed = () => {
    this.props.handleProceed()
  };

	render() {
		const { fileList } = this.props;
		return (
			<React.Fragment>
				<div className="fileListContainer">
					{fileList.length > 0 &&
						fileList.map((file, index) => (
							<span
								className={`fileListItem ${this.state.activeItem === index ? 'activeItem' : ''}`}
								key={index}
								onClick={() => {this.toFindActiveImg(index)}}
							>
								{index + 1}. {file.name}
							</span>
						))}
				</div>

        <button
          className="buttonStyle"
          style={{ margin: '5px 0px 0px 0px', float: 'right' }}
          onClick={() => {this.toProceed()}}
        >
          Proceed
        </button>
			</React.Fragment>
		);
	}
}

export default FileList;
