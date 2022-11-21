import React, { Component } from 'react'
import Item from './Item';

export default class List extends Component {
  constructor(props) {
    super(props)
    //lưu dữ liệu của masv đang cần edit
    this.state = {
      masv: "",
      hoten: "",
      sdt: "",
      email: ""
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //nếu props mainData thay đổi thì xóa trắng state, trong trường hợp user đã bấm sửa dòng nào đó, và lại đi search mà chưa hủy
    if(prevProps.mainData !== this.props.mainData) {
      this.setState({
        masv: "",
        hoten: "",
        sdt: "",
        email: ""
      });
    }

    /*
      Trường hợp state trước !== state sau VÀ state trước đó ko phải là rỗng (trường hợp người dùng bấm liên tục vào nút sửa ở nhiều dòng khác nhau).
      => Có thay đổi data
    */
    if(prevState !== this.state && prevState.masv !== "") {
      //Tiến hành tìm kiếm sự thay đổi, nếu có thay đổi ở 1 dữ liệu nào đó thì gọi hàm thay đổi dữ liệu
      let findIndex = this.props.mainData.findIndex(item => item.masv === this.state.masv);
      for (let key in this.props.mainData[findIndex]) {
        if(this.props.mainData[findIndex][key] !== this.state[key]) {
          this.props.quickEditFunc(this.state);
        }
      }
    }
  }

  setEditFunc = newObj => {
    this.setState({
      ...newObj
    });
  }

  render() {
    const {dataForm, mainData, deleteRow, quickEditFunc} = this.props;
    return (
      <div className="mt-5">
        <h1>Danh sách sinh viên</h1>
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
              quickEdit={this.state}
              setEditFunc={this.setEditFunc}
              />
            })}
          </tbody>
        </table>
        {mainData.length === 0 ?  <div className="text-center">Chưa có ai ở đây.</div> : undefined} 
    </div> 
    )
  }
}
