import { computeHeadingLevel } from '@testing-library/react';
import React, { Component} from 'react'

export default class Item extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.data === this.mainData) {
      return true;
    }
    return false;
  }
  render() {
    const {mainData, deleteRow} = this.props;
    return (
      <tr>
        <td>
          {mainData.masv}
        </td>
        <td>
          {mainData.hoten}
        </td>
        <td>
          {mainData.sdt}
        </td>
        <td>
          {mainData.email}
        </td>
        <td>
          <button className="btn btn-danger" onClick={e => {
            deleteRow(mainData.masv)
          }}>
            Xóa
          </button>
        </td>
      </tr>
    )
  }
}
