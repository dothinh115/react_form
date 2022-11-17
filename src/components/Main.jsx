import React, { Component } from 'react'
import Add from './Add'
import List from './List'
import Search from './Search'

export default class Main extends Component {
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
            masv: null,
            hoten: null,
            sdt: null,
            email: null
        },
        data: [],
        valid: false,
        searchRes: []
      }
    }

    componentDidMount() {
        this.getLocalStorage();
    }

    componentDidUpdate(preProps, preState) {
        if(preState.data !== this.state.data) {
           let data = JSON.stringify(this.state.data);
           localStorage.setItem("svData", data);
        }
    }

    //hàm lấy dữ liệu từ localStorage
    getLocalStorage = () => {
        let data = localStorage.getItem("svData");
        if(data) {
            this.setState({
                data: JSON.parse(data)
            });
        }
    }

    dataForm = {
        id: ["masv", "hoten", "sdt", "email"],
        title: ["Mã sinh viên", "Họ và tên", "Số điện thoại", "Email"]
    }

    checkError = () => {
        const {add, errors} = this.state;
        for (let key in errors) {
            if(add[key] === "" || errors[key] !== "") {
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
        else if(valid === "masv") {
            let reg = /^[0-9]+$/;
            if (!value.match(reg)) {
                messageError = this.dataForm.title[this.dataForm.id.indexOf("masv")] + " chỉ được nhập số.";
            }
        }
        else if(valid === "hoten") {
            let reg = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
            if(!value.match(reg)) {
                messageError = this.dataForm.title[this.dataForm.id.indexOf("hoten")] + " chỉ được nhập chữ.";
            }
        }
        else if(valid === "sdt") {
            let reg = /^[0-9]+$/;
            if(!value.match(reg)) {
                messageError = this.dataForm.title[this.dataForm.id.indexOf("sdt")] + " chỉ được điền số.";
            }
        }
        else if(valid === "email") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!value.match(reg)) {
                messageError = this.dataForm.title[this.dataForm.id.indexOf("email")] + " phải đúng định dạng.";
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

    btnClick = e => {
        e.preventDefault();
        let randomId = maxNumber => {
            let getRandomId = number => {
                let randomId = Math.floor(Math.random() * number);
                return randomId;
            }
            //lấy số random
            let id = getRandomId(maxNumber);
            //tìm xem trong mảng có trùng hay ko, nếu trùng thì tiếp tục gọi hàm lấy số random
            while (this.state.data.find(item => item.id === id) !== undefined) {
                id = getRandomId(maxNumber);
            }
            return id;
        }
        if(this.checkError()) {
            const {data, add} = this.state;
            this.setState({
                data: [...data, {
                    id: randomId(999999),
                    masv: add.masv,
                    hoten: add.hoten,
                    sdt: add.sdt,
                    email: add.email
                }],
                searchRes: []
            })
        }
    }

    deleteRow = id => {
        let newData = this.state.data.filter((item) => item.id !== id);
        if(this.state.searchRes.length === 0) {
            this.setState({
                data: newData
            });
        }else {
            let newSeachRes = this.state.searchRes.filter((item) => item.id !== id);
            this.setState({
                data: newData,
                searchRes: newSeachRes
            });
        }
    }

    searchFunc = e => {
        e.preventDefault();
        let value = e.target.value.trim().toLowerCase();
        let {data} = this.state;
        let searchRes = data.filter(item => item.hoten.toLowerCase().indexOf(value) !== -1);
        this.setState({
            searchRes
        });
    }

    render() {
        return (
            <div className="container">
                <Add inputChangeHandle={this.inputChangeHandle} btnClick={this.btnClick} state={this.state} dataForm={this.dataForm}/>
                <Search searchFunc={this.searchFunc} />
                <List dataForm={this.dataForm} mainData={this.state.data} deleteRow={this.deleteRow} searchRes={this.state.searchRes}/>
            </div>
        )
    }
}
