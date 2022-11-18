import React, { Component} from 'react';

export default class Item extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       value: {
        masv: null,
        hoten: null,
        sdt: null,
        email: null
       },
       errrors: {
        hoten: null,
        sdt: null,
        email: null
       },
       valid: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.data !== this.props.mainData) {
      return true;
    }
    return false;
  }

  checkError = () => {
    const {value, errors} = this.state;
    for (let key in errors) {
        if(errors[key] !== "") {
            return false;
        }
    }
    for (let key in value) {
        if(value[key] === "") {
            return false;
        }
    }
    return true;
}

  quickEditHandle = e => {
    let value = e.target.value.trim();
    let id = e.target.getAttribute("data-id");
    
    let newValue = this.state.value;
    let newErrors = this.state.errrors;

    let messageError = "";

    if(value === "") {
      messageError = "Không được để trống";
    }
    else if(id === "hoten") {
      let reg = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
      if(!value.match(reg)) {
          messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " chỉ được nhập chữ.";
          value = value.substr(0, value.length -1);
          e.target.value = value;
      }
    }
    else if(id === "sdt") {
        let reg = /^[0-9]+$/;
        if(!value.match(reg)) {
            messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " chỉ được điền số.";
            value = value.substr(0, value.length -1);
            e.target.value = value;
        }
    }
    else if(id === "email") {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!value.match(reg)) {
            messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " phải đúng định dạng.";
        }
    }

    newValue[id] = value;
    newErrors[id] = messageError;

    this.setState({
      value: newValue,
    }, () => {
      this.setState({
          valid: this.checkError()
      });
  });
  }

  quickEditConfirm = () => {
    if(this.checkError()) {
      this.props.quickEditFunc(this.state.value);
      this.props.setEditFunc({
        masv: null
      });
    }
  }

  render() {
    const {mainData, dataForm, deleteRow, quickEdit, setEditFunc} = this.props;  
    
    let quickEditHtml = (id, contain) => {
      if(quickEdit.masv == mainData.masv) {
        return <input data-id={id} type="text" className={`form-control ${this.state.errrors[id] && "is-invalid"}`} defaultValue={contain} onChange={this.quickEditHandle}/>
      }
      return contain;
    }

    let buttonHtml = () => {
      if(quickEdit.masv == mainData.masv) {
        return <div>
          <button className="btn btn-danger" onClick={e => {
          this.setState({
            errrors: {
              hoten: null,
              sdt: null,
              email: null
            }
          });
          setEditFunc({
            masv: ""
          })
        }}>
            Hủy
          </button>
          <button className="btn btn-success mx-2" disabled={!this.checkError()} onClick={this.quickEditConfirm}>
            OK
          </button>
        </div>
      }
      return <div>
        <button className="btn btn-danger" onClick={e => deleteRow(mainData.masv)}>
          Xóa
        </button>
        <button className="btn btn-info mx-2" onClick={e => {
          setEditFunc({
            masv: mainData.masv
          });
          this.setState({
            value: mainData
          });
        }}>
          Sửa
        </button>
      </div>
    }

    return (
      <tr>
        <td>
          {mainData.masv}
        </td>
        {dataForm.id.map((item, index) => {
          return <td key={index}>
            {quickEditHtml(item, mainData[item])}
            <i style={{color: "red", fontSize: "12px"}}>
            {this.state.errrors[item]}
            </i>     
          </td>
        })}
        <td align="right">
          {buttonHtml()}
        </td>
      </tr>
    )
  }
}
