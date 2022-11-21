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
    if(prevProps.quickEdit.masv === "" && prevProps.quickEdit.masv !== this.props.quickEdit.masv) {
      this.setState({
        errors: {
          masv: "",
          hoten: "",
          sdt: "",
          email: ""
         },
         valid: true
      });
    }
  }

  checkError = () => {
    const {value, errors} = this.state;
    for (let key in value) {
      if(value[key] === "" || errors[key] !== "") {
          return false; //false == khong dat
      }
    }
    return true; //true == dat
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
      for (let key in this.props.dataForm.id) {
        if(id === this.props.dataForm.id[key]) {
            let reg = this.props.dataForm.reg[key];
            if(!inputValue.match(reg)) {
                messageError = this.props.dataForm.title[key] + this.props.dataForm.messageError[key];
            }
        }
      }
    }

    value[id] = inputValue;
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

  checkIfDifferent = () => {
    let {value} = this.state;
    for (let key in value) {
      if(value[key] != this.props.mainData[key]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {mainData, dataForm, deleteRow, quickEdit, setEditFunc} = this.props;  
    
    let quickEditHtml = (id, contain) => {
      if(quickEdit.masv === mainData.masv) {
        return <input 
        data-id={id} 
        type="text" 
        className={`form-control ${this.state.errors[id] ? "is-invalid" : undefined}`} 
        defaultValue={contain} 
        onChange={this.quickEditHandle}
        onKeyUp={this.enterFunc}
        />
      }
      return contain;
    }

    let buttonHtml = () => {
      if(quickEdit.masv === mainData.masv) {
        return <div>
          <button className="btn btn-light" onClick={e => {
            setEditFunc({
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
        <button className="btn btn-danger" onClick={e => deleteRow(mainData.masv)}>
          Xóa
        </button>
        <button className="btn btn-info mx-2" onClick={e => {
          this.setState({
            value: {...mainData}
          });
          setEditFunc({...mainData});
        }}>
          Sửa
        </button>
      </div>
    }

    return (
      <tr>
        <td className="text-center">
          {mainData.masv}
        </td>
        {dataForm.id.map((item, index) => {
          return <td className="text-center" key={index}>
            {quickEditHtml(item, mainData[item])}
            <i style={{color: "red", fontSize: "12px"}}>
            {this.state.errors[item]}
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
