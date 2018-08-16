/**
 * RegionComponent
 * Takes in an image, returns all the selected areas as a key value pair
 * @author Akshay, Sethulakshmi
 */

import React, { Component } from 'react';
import ReactRegionSelect from 'react-region-select';
import { instruction } from '../../Utils';
import downArrow from './../../images/001-down-arrow.svg';
import edit from './../../images/003-marker.svg';
import deleteIcon from './../../images/004-delete.svg';
import './ImagePatcher.css';
// import * as d3 from 'd3';

class LabelRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownData: props.defaultDropdown
    };
  }

  render() {
    const { onFormSubmit, regionProps, defaultDropdown } = this.props;

    let placeholderData = '';

    if (this.state.dropDownData === 'keyValue') {
      placeholderData = 'Values';
    } else if (this.state.dropDownData === 'data') {
      placeholderData = 'Line count';
    } else {
      placeholderData = 'Header Data';
    }
    const showForm =
      this.state.dropDownData !== 'constant' && defaultDropdown !== 'constant';
    return (
      <div className={'regionWrapper'}>
        {defaultDropdown !== 'constant' ? <select
          required
          defaultValue={defaultDropdown}
          onChange={e => {
            this.setState({
              dropDownData: e.target.value
            });
          }}
        >
          <option value="keyValue">Key pair</option>
          <option value="constant">constant</option>
          <option value="headers">headers</option>
          <option value="data">data</option>
        </select> : 'Constant'}

        <div className={'regionForm'}>
          {showForm && (
            <input
              type={this.state.dropDownData !== 'data' ? 'text' : 'number'}
              placeholder={placeholderData}
              ref={node => (this.input = node)}
            />
          )}

          <button
            className="okayButton"
            onClick={event => {
              event.preventDefault();
              showForm
                ? onFormSubmit(
                    event,
                    regionProps.index,
                    this.state.dropDownData,
                    this.input.value
                  )
                : onFormSubmit(
                    event,
                    regionProps.index,
                    this.state.dropDownData
                  );
            }}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

class RegionComponent extends Component {
  onFormSubmit = (event, regionPropsIndex, category, value = null) => {
    event.preventDefault();
    this.changeRegionData(regionPropsIndex, value, category);

    this.setState({
      editMode: true,
      editIndex: regionPropsIndex + 1
    });
  };

  onEdit = (e, regionPropsIndex) => {
    e.stopPropagation();
    this.setState({
      editMode: true,
      editIndex: regionPropsIndex
    });
  };

  onDelete = (e, regionPropsIndex) => {
    e.stopPropagation();
    let updatedRegion = this.state.regions;
    updatedRegion.splice(regionPropsIndex, 1);
    this.calculateCoordinates(updatedRegion);
    this.setState({
      regions: updatedRegion
    });
  };

  toPreviousImg = () => {
    this.props.handleFileChange(this.props.fileToShow.fileNumber - 1);
  };

  toNextImg = () => {
    this.props.handleFileChange(this.props.fileToShow.fileNumber + 1);
  };

  /**
   * Save the final regions
   * @param regions
   */
  handleChange = regions => {
    this.setState({
      regions: regions
    });
  };

  /**
   * Show the input field for the selected area
   * @param regionProps
   */
  regionRenderer = regionProps => {
    if (!regionProps.isChanging) {
      let defaultValue =
        this.state.regions.length === 1 ? 'constant' : 'keyValue';
      return (
        <div className="region">
          {this.state.editMode && this.state.editIndex === regionProps.index ? (
            <div>
              <LabelRegion
                onFormSubmit={this.onFormSubmit}
                regionProps={regionProps}
                defaultDropdown={defaultValue}
              />
            </div>
          ) : (
            <div className={'rectDetail'}>
              <span className={'id'}>{regionProps.index + 1}. </span>

              <span className={'values'}>
                {this.state.regions[regionProps.index].data.value === null
                  ? 'Constant'
                  : this.state.regions[regionProps.index].data.value}
              </span>

              <span
                className={'editIcon'}
                onClick={e => {
                  this.onEdit(e, regionProps.index);
                }}
              >
                <img src={edit} className={'editIconStyle'} />
              </span>

              <span
                className={'deleteIcon'}
                onClick={e => {
                  this.onDelete(e, regionProps.index);
                }}
              >
                <img src={deleteIcon} className={'deleteIconStyle'} />
              </span>
            </div>
          )}
        </div>
      );
    }
  };
  /**
   * Get the value of corresponding selected area
   * @param index
   * @param value
   */
  changeRegionData = (index, value, category) => {
    const region = this.state.regions[index];
    region['type'] = category;
    region.data['value'] = value;

    this.calculateCoordinates([
      ...this.state.regions.slice(0, index),
      {
        ...region,
        data: region.data
      },
      ...this.state.regions.slice(index + 1)
    ]);
  };
  /**
   * Undo the last selected area
   */
  handleUndo = () => {
    let regions = this.state.regions;
    if (regions.length > 0) {
      regions.pop();
    }
    this.calculateCoordinates(regions);
  };

  calcPixelValues = (x, y, rectWidth, rectHeight, imgWidth, imgHeight) => {

    console.log("x: ", x, "y: ", y);

    let newXvalue = (imgWidth * x) / 100;
    let newYvalue = (imgHeight * y) / 100;
    let newWidthvalue = (imgWidth * rectWidth) / 100;
    let newHeightvalue = (imgHeight * rectHeight) / 100;

    console.log("newXvalue: ", newXvalue, "newYvalue: ", newYvalue);

    let xmin = newXvalue;
    let xmax = newWidthvalue + newXvalue;
    let ymin = newYvalue;
    let ymax = newHeightvalue + newYvalue;

    console.log("rectWidth: ", rectWidth, "rectHeight: ", rectHeight);

    console.log("xmin: ", xmin, "ymin: ", ymin, "xmax: ", xmax, "ymax: ", ymax);

    return ({
      xmin,
      xmax,
      ymin,
      ymax,
    });
  };

  /**
   * Calculate the coordinates of all the selected areas
   * Also send the regions with values
   */
  calculateCoordinates = (regions = this.state.regions) => {
    let crArray = regions.filter(region => region.type === 'constant');
    let cr = crArray[crArray.length - 1];
    console.log("crArray", crArray);

    let line_count = 0;

    let constantRegion = {};
    if (cr) constantRegion = this.calcPixelValues(cr.x, cr.y, cr.width, cr.height, this.imgRef.naturalWidth, this.imgRef.naturalHeight);

    let drArray = regions.filter(region => region.type === 'data');
    let dr = drArray[drArray.length - 1];
    let dataRegion = {};
    if (dr) {
      line_count = dr.data.value;
      dataRegion = this.calcPixelValues(dr.x, dr.y, dr.width, dr.height, this.imgRef.naturalWidth, this.imgRef.naturalHeight);
    }

    let hr = regions.filter(region => region.type === 'headers');
    let headerRegion = {};
    hr.map(region => {
      headerRegion = {
        ...headerRegion,
        [region.data.value]: this.calcPixelValues(region.x, region.y, region.width, region.height, this.imgRef.naturalWidth, this.imgRef.naturalHeight),
      };
    });

    let or = regions.filter(region => region.type === 'keyValue');
    let valuesRegion = {};
    or.map(region => {
      valuesRegion = {
        ...valuesRegion,
        [region.data.value]: this.calcPixelValues(region.x, region.y, region.width, region.height, this.imgRef.naturalWidth, this.imgRef.naturalHeight),
      };
    });
    let regionCoordinates = {
      constant: constantRegion,
      headers: headerRegion,
      value: valuesRegion,
      data: dataRegion,
    };
    regionCoordinates['line count'] = line_count;
    this.props.updateRegions(regionCoordinates, regions, this.props.fileToShow);
    this.setState({
      regions,
      regionCoordinates
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      regions: this.props.currentFileRegions,
      regionCoordinates: [],
      editMode: true,
      editIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentFileRegions !== nextProps.currentFileRegions) {
      this.setState({
        regions: nextProps.currentFileRegions,
        regionCoordinates: [],
        editMode: true,
        editIndex: nextProps.currentFileRegions.length
      });
    }
  }

  handleSaveThisPage() {
    this.calculateCoordinates();
    this.props.handleSingleUpload(
      this.props.fileToShow.fileNumber,
      this.props.fileToShow.relativePath
    );
  }

  // imageZooming = () => {
  //
  //   function zoomed() {
  //     context.translate(d3.event.transform.x, d3.event.transform.y);
  //     context.scale(d3.event.transform.k, d3.event.transform.k);
  //   }
  //
  //   let canvas = d3.select(this.imgRef);
  //   let context = canvas.node().getContext("2d");
  //
  //   var zoom = d3.zoom()
  //     .on("zoom", zoomed);
  // };

  render() {
    const { fileToShow } = this.props;

    if(this.props.labelled === true) {
      return (
        <h5 className={'imageHeader'} style={{ textAlign: 'center' }}>
          Click PROCEED
        </h5>
      )
    } else if (fileToShow) {
      return (
        <React.Fragment>
          <span className={'imageHeader'}>{instruction}</span>
          <div className="imagePatcherWrapper">
            <div className="buttonWrapper">
              <button onClick={this.handleUndo} className="undoLastButton">
                Undo Last
              </button>

              <button
                onClick={() => {
                  this.handleSaveThisPage();
                }}
                className="savePageButton"
              >
                Save this Page
              </button>

              <div className={"arrows"}>
                <img
                  className={'previousButton'}
                  alt={'previousArrow'}
                  src={downArrow}
                  onClick={() => {
                    this.toPreviousImg();
                  }}
                />
                <img
                  className={'nextButton'}
                  alt={'nextButton'}
                  src={downArrow}
                  onClick={() => {
                    this.toNextImg();
                  }}
                />
                {/*<img*/}
                {/*src={downArrow}*/}
                {/*alt={'zoom'}*/}
                {/*onClick={() => {this.imageZooming()}}*/}
                {/*/>*/}
              </div>
            </div>
            <ReactRegionSelect
              constraint
              regions={this.state.regions}
              onChange={this.handleChange}
              regionRenderer={this.regionRenderer}
              className="imgWrapper"
            >
              <img
                src={fileToShow.file.preview}
                width={500}
                className="image"
                alt="image"
                ref={node => {
                  this.imgRef = node;
                }}
              />
            </ReactRegionSelect>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <h5 className={'imageHeader'} style={{ textAlign: 'center' }}>
          Upload Files to begin
        </h5>
      );
    }
  }
}

export default RegionComponent;
