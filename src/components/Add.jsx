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
        
        let newAdd = this.state.add;
        let newErr = this.state.errors;

        let messageError = "";
        if(value === "") {
            messageError = "Không được bỏ trống";
        }
        else {
            for (let key in this.props.dataForm.id) {
                if(id === this.props.dataForm.id[key]) {
                    let reg = this.props.dataForm.reg[key];
                    if(!value.match(reg)) {
                        messageError = this.props.dataForm.title[key] + this.props.dataForm.messageError[key];
                        e.target.value = value.substr(0, value.length-1);
                    }
                }
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
