import React, { Component, PureComponent } from 'react'
import Item from './Item'

export default class List extends PureComponent {
  render() {
    const {dataForm, mainData, deleteRow, searchRes} = this.props;
    return (
      <div className="card mt-5">
        <div className="card-header">
          Thông tin sinh viên
        </div>
        <div className="card-body">
          <table className="table">
            <thead className="thead-dark">
              <tr>
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
              {searchRes.length > 0 && searchRes.map((item, index) => {
                return <Item key={index} mainData={item} deleteRow={deleteRow} searchRes={searchRes}/>
              })}
              {searchRes.length === 0 && mainData.map((item, index) => {
                return <Item key={index} mainData={item} deleteRow={deleteRow} searchRes={searchRes}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
