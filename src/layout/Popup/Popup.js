/**
 * Popup Layout
 * @author Sethulakshmi
 */

import React, { Component } from 'react';
import './Popup.css';
import { PopUp } from './../../components';

// const data = {
//   popupData: [
//     {
//       "filename": "171002_093617_58_FACTOR.tif",
//       "result": {
//         "data": {
//           "pay": "(912) 632-4350\n12) 632-4029",
//           "to": "Pride Corporation\n\n:ounts Payable\nl 5 1 361\n\n“MAM“ f‘_.",
//           "amount": "",
//           "date": "",
//           "header data": []
//         }
//       }
//     },
//     {
//       "filename": "171002_093617_58_FACTOR.tif",
//       "result": {
//         "data": {
//           "pay": "(912) 632-4350\n12) 632-4029",
//           "to": "Pride Corporation\n\n:ounts Payable\nl 5 1 361\n\n“MAM“ f‘_.",
//           "amount": "",
//           "date": "",
//           "header data": []
//         }
//       }
//     },
//   ]
// };

class PopupComp extends Component {

  openModal = () => {
    this.setState({
      open: true
    });
  };

  closeModal = () => {
    this.setState({
      open: false
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className={"popupCompWrapper"}>
        <button
          className="popupButton"
          onClick={this.openModal}
        >
          Click here for Popup
        </button>

        <PopUp
          open = {this.state.open}
          closeModal = {this.closeModal}
          data={this.props.proceedData}
          // data={data.popupData}
          {...this.props}
        />

      </div>
    );
  }
}

export default PopupComp;
