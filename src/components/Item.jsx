import React, { Component} from 'react';

export default class Item extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        value: {
          masv: "",
          hoten: "",
          sdt: "",
          email: ""
        },
        errors: {
          masv: "",
          hoten: "",
          sdt: "",
          email: ""
        },
        valid: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.quickEdit.masv !== this.props.quickEdit.masv) {
      this.setState({
        errors: {
          masv: "",
          hoten: "",
          sdt: "",
          email: ""
         }
      });
    }
  }

  checkError = () => {
    const {value, errors} = this.state;
    for (let key in value) {
      if(value[key] === "" || errors[key] !== "") {
          return false; 
      }
    }
    return true; 
  }

  quickEditHandle = e => {
    let inputValue = e.target.value.trim();
    let id = e.target.getAttribute("data-id");
    
    let {value, errors} = this.state;
    let messageError = "";
    if(inputValue === "") {
      messageError = "Không được để trống";
    }
    else {
      for (let key in this.props.dataForm.id) { //duyệt qua từng phần tử
        switch(id) {
          case this.props.dataForm.id[key]:
            let reg = this.props.dataForm.reg[key]; // móc ra reg tương ứng của nó, reg của sdt là /^[0-9]+$/
            if(!inputValue.match(reg)) { // nếu nhập vào ko match
                messageError = this.props.dataForm.title[key] + this.props.dataForm.messageError[key];// hiển thị lỗi, lấy title + messageError
                if(key != 2) {
                    e.target.value = inputValue.substr(0, inputValue.length -1);
                }
            }
            else {
                value[id] = inputValue;//nếu match thì cập nhật vào mảng 
            }  
        }
    }
    }
    errors[id] = messageError;

    this.setState({
      value,
      errors
    }, () => {
      this.setState({
          valid: this.checkError()
      });
    });
  }

  enterFunc = e => {
    if(e.key === "Enter") {
      this.quickEditConfirm();
    }
  }

  quickEditConfirm = () => {
    if(this.checkError()){
      this.props.setEditFunc(this.state.value);
    }
  }

  //hàm tìm kiếm sự thay đổi, nếu có thay đổi thì trả về true
  checkIfDifferent = () => {
    let {value} = this.state;
    for (let key in value) {
      if(value[key] != this.props.mainData[key]) {
        return true;
      }
    }
    return false;
  }

  quickEditHtml = (id, contain) => {
    if(this.props.quickEdit.masv === this.props.mainData.masv) {
      return <input 
      data-id={id} 
      type="text" 
      className={`form-control ${this.state.errors[id] && "is-invalid"}`} 
      defaultValue={contain} 
      onChange={this.quickEditHandle}
      onKeyUp={this.enterFunc}
      />
    }
    return contain;
  }

  buttonHtml = () => {
    if(this.props.quickEdit.masv === this.props.mainData.masv) {
      return <div>
        <button className="btn btn-light" onClick={e => {
          this.props.setEditFunc({
            masv: "",
            hoten: "",
            sdt: "",
            email: ""
          });
      }}>
          Hủy
        </button>
        <button className="btn btn-success mx-2" disabled={this.checkError() && this.checkIfDifferent() ? false : true} onClick={this.quickEditConfirm}>
          OK
        </button>
      </div>
    }
    return <div>
      <button className="btn btn-danger" onClick={e => this.props.deleteRow(this.props.mainData.masv)}>
        Xóa
      </button>
      <button className="btn btn-info mx-2" onClick={e => {
        this.setState({
          value: {...this.props.mainData}
        });
        this.props.setEditFunc({...this.props.mainData});
      }}>
        Sửa
      </button>
    </div>
  }

  render() {
    const {mainData, dataForm, quickEdit} = this.props;  

    return (
      <tr>
        <td className="text-center">
          {mainData.masv}
        </td>
        {dataForm.id.map((item, index) => {
          return <td className="text-center" key={index}>
            {this.quickEditHtml(item, mainData[item])}
            {this.state.errors[item] && quickEdit.masv !== "" ? <i style={{color: "red", fontSize: "12px"}}>{this.state.errors[item]}</i> : undefined}   
          </td>
        })}
        <td align="right">
          {this.buttonHtml()}
        </td>
      </tr>
    )
  }
}
