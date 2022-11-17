import React, { Component } from 'react'
import Item from './Item'

export default class List extends Component {
  render() {
    const {dataForm, mainData, deleteRow} = this.props;
    return (
      <div className="card mt-5">
        <div className="card-header">
          Thông tin sinh viên
        </div>
        <div className="card-body">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th width="10%">
                  Mã số sv
                </th>
                {dataForm.title.map((item, index) => {
                  return (
                    <th key={index} width={dataForm.id[index] === "masv" ? "10%" : "20%"} colSpan={dataForm.id[index] === "email" ? "2" : ""}>
                      {item}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {mainData.map((item, index) => {
                return <Item key={index} mainData={item} deleteRow={deleteRow} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
