import React, { Component } from 'react'

export default class Add extends Component {
    constructor(props) {
      super(props)
        
      this.state = {
        add: {
            masv: null,
            hoten: null,
            sdt: null,
            email: null
        },
        errors: {
            hoten: null,
            sdt: null,
            email: null
        },
        valid: false
      }
    }

    checkError = () => {
        const {add, errors} = this.state;
        for (let key in errors) {
            if(errors[key] !== "") {
                return false;
            }
        }
        for (let key in add) {
            if(add[key] === "") {
                return false;
            }
        }
        return true;
    }
    
    inputChangeHandle = e => {
        let id = e.target.id;
        let value = e.target.value.trim();
        let valid = e.target.getAttribute("data-valid");
        
        let newAdd = this.state.add;
        let newErr = this.state.errors;

        let messageError = "";
        if(value === "") {
            messageError = "Không được bỏ trống";
        }
        else if(valid === "hoten") {
            let reg = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
            if(!value.match(reg)) {
                messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " chỉ được nhập chữ.";
                value = value.substr(0, value.length -1);
                e.target.value = value;
            }
        }
        else if(valid === "sdt") {
            let reg = /^[0-9]+$/;
            if(!value.match(reg)) {
                messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " chỉ được điền số.";
                value = value.substr(0, value.length -1);
                e.target.value = value;
            }
        }
        else if(valid === "email") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!value.match(reg)) {
                messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " phải đúng định dạng.";
            }
        }
        newErr[id] = messageError;
        newAdd[id] = value;
        this.setState({
            add: newAdd,
            errors: newErr
        }, () => {
            this.setState({
                valid: this.checkError()
            });
        });
    }

    submit = e => {
        e.preventDefault();
        if(this.checkError()) {
            this.props.addSubmit(this.state.add);
        }
    }

    render() {
        const {dataForm} = this.props;
        return (
            <div>
                <h1>
                    Thêm thông tin sinh viên
                </h1>
                <form className="form-group row" onSubmit={this.submit}>
                    <div className="col-6">
                        <label>
                            Mã số sinh viên
                        </label>
                        <input type="text" disabled className="form-control" placeholder="Được lấy tự động" />
                    </div>
                    {dataForm.id.map((item, index) => {
                        return <div 
                            key={index} 
                            className="col-6">
                                <label 
                                htmlFor={item}>
                                    {dataForm.title[index]}
                                </label>
                                <input 
                                data-valid={item} 
                                className={`form-control ${this.state.errors[item] && "is-invalid"}`} 
                                id={item} 
                                onChange={this.inputChangeHandle} 
                                />
                                {this.state.errors[item] && <div className="invalid-feedback">{this.state.errors[item]}</div>}
                            </div>
                    })}
                    
                    <div className="col-12 mt-2">
                        <button type="submit" className={`btn btn-primary ${this.state.valid ? "" : "disabled"}`}>
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
