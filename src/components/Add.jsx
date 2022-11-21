import React, { Component } from 'react';
import axios from 'axios';

export default class Add extends Component {
    constructor(props) {
      super(props)
        
      this.state = {
        add: {
            hoten: "",
            sdt: "",
            email: ""
        },
        errors: {
            hoten: "",
            sdt: "",
            email: ""
        },
        valid: false,
        randomUser: false
      }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.randomUser) {
            this.randomInfo();
            this.setState({
                randomUser: false
            })
        }
    }

    //lấy id tự động
    randomId = maxNumber => {
        let getRandomId = number => {
            let randomId = Math.floor(Math.random() * number);
            return randomId;
        }
        //lấy số random
        let id = getRandomId(maxNumber);
        //tìm xem trong mảng có trùng hay ko, nếu trùng thì tiếp tục gọi hàm lấy số random
        while (id.length < 11) {
            id = getRandomId(maxNumber);
        }
        return id;
    }

    randomInfo = e => {
        let fetch = axios({
            url: "https://randomuser.me/api/",
            method: "GET",
            dataType: "JSON"
        });
        fetch.then(res => {
            let {results} = res.data;
            results = results[0];
            this.setState({
                add: {
                    hoten: results.name.first + " " + results.name.last,
                    sdt: this.randomId(9999999999),
                    email: results.email
                },
                valid: true
            });
        });
        fetch.catch(error => {
            console.log(error);
        })
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
                if(value.length > 1){
                    value = value.substr(0, value.length -1);
                    e.target.value = value;
                }
            }
        }
        else if(valid === "sdt") {
            let reg = /^[0-9]+$/;
            if(!value.match(reg)) {
                messageError = this.props.dataForm.title[this.props.dataForm.id.indexOf(id)] + " chỉ được điền số.";
                if(value.length > 1){
                    value = value.substr(0, value.length -1);
                    e.target.value = value;
                }
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
                    Thêm thông tin sinh viên <button className="btn btn-info mx-2" onClick={e => {
                            this.setState({
                                randomUser: true
                            });
                        }}>
                            Random info
                        </button>
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
                                className={`form-control ${this.state.errors[item] ? "is-invalid" : undefined}`} 
                                id={item} 
                                defaultValue={this.state.add[item]}
                                onChange={this.inputChangeHandle} 
                                />
                                {this.state.errors[item] ? <div className="invalid-feedback">{this.state.errors[item]}</div> : undefined}
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
