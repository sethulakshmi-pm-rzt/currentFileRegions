/**
 * KeyValues
 * @author Akshay, Sethulakshmi
 */
import React, { Component } from 'react';
import { constant, dataLineCount, headers, keyValuePairs } from './../../Utils';
import './KeyValues.css';


export default class KeyValues extends Component {

  render() {
    const { listItems } = this.props;
    let constantObject = listItems.constant;
    let dataObject = listItems.data;
    let headerObject = listItems.headers;
    let keyValueObject = listItems.value;
    let lineCount = listItems['line count'];
    return (
      <div className="keyValuesContainer">
        {constantObject && constantObject.xmin &&
        <span className={'displayText'}>
          {constant}
        </span>}

        {dataObject && dataObject.xmin &&
        <span className={'displayText'}>
          {dataLineCount}
        </span>}

        {dataObject && lineCount !== 0 &&
        <span className={'valuesList'}>
          {lineCount}
        </span>}

        {headerObject && Object.keys(headerObject).length > 0 &&
        <div className={'itemsWrapper'}>
          <span className={'displayText'}>
            {headers}
          </span>
          <div className={'valueWrapper'}>
            {Object.keys(headerObject).map((headerItem, index) => (
              <span
                key={index}
                className="valuesList"
              >
              {index + 1}. {headerItem}
            </span>
            ))}
          </div>
        </div>}

        {keyValueObject && Object.keys(keyValueObject).length > 0 &&
        <div className={'itemsWrapper'}>
          <span className={'displayText'}>
            {keyValuePairs}
          </span>
          <div className={'valueWrapper'}>
            {Object.keys(keyValueObject).map((valueItem, index) => (
              <span
                key={index}
                className="valuesList"
              >
              {index + 1}. {valueItem}
            </span>
            ))}
          </div>
        </div>}
      </div>
    );
  }
}
