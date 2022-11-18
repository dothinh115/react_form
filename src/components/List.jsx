import React, { Component } from 'react'
import Item from './Item'

export default class List extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      quickedit: {
        masv: ""
      }
    }
  }

  setEditFunc = quickedit => {
    this.setState({
      quickedit
    });
  }

  render() {
    const {dataForm, mainData, deleteRow, quickEditFunc} = this.props;
    return (
      <div className="mt-5">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th className="text-center">
                Mã số sv
              </th>
              {dataForm.title.map((item, index) => {
                return (
                  <th  className="text-center" key={index} width={index === 0 ? "25%" : undefined} colSpan={index === 2 ? 2 : undefined}>
                    {item}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {mainData.map((item, index) => {
              return <Item 
              key={index} 
              mainData={item} 
              dataForm={dataForm}
              deleteRow={deleteRow}
              quickEdit={this.state.quickedit}
              setEditFunc={this.setEditFunc}
              quickEditFunc={quickEditFunc}
              />
            })}
          </tbody>
        </table>
        {mainData.length === 0 ?  <div className="text-center">Chưa có ai ở đây.</div> : undefined} 
    </div> 
    )
  }
}
