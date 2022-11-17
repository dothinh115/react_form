import React, { Component, PureComponent} from 'react'

export default class Item extends PureComponent {
  render() {
    const {mainData, deleteRow, searchRes} = this.props;
    console.log(searchRes);
    return (
      <tr style={{display: `${mainData.hoten !== searchRes.hoten ? "" : "none"}`}}>
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
            deleteRow(mainData.id)
          }}>
            Xóa
          </button>
        </td>
      </tr>
    )
  }
}
