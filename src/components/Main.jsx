import React, { Component } from 'react'
import Add from './Add'
import List from './List'
import Search from './Search'

export default class Main extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        data: [],
        searchRes: []
      }
    }

    dataForm = {
        id: ["hoten", "sdt", "email"],
        title: ["Họ và tên", "Số điện thoại", "Email"]
    }

    componentDidMount() {
        this.getLocalStorage();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.data !== this.state.data) {
            this.setLocalStorage();
            this.setState({
                searchRes: []
            });
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

    //lưu dữ liệu
    setLocalStorage = () => {
        let data = JSON.stringify(this.state.data);
        localStorage.setItem("svData", data);
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
        while (this.state.data.find(item => item.masv === id) !== undefined) {
            id = getRandomId(maxNumber);
        }
        return id;
    }

    //nút thêm sv mới
    addSubmit = obj => {
        let {data} = this.state;
        obj = {
            ...obj,
            masv: this.randomId(999999999)
        }
        data = [...data, obj];
        this.setState({
            data
        });
    }

    //nút xóa sv
    deleteRow = masv => {
        let {data, searchRes} = this.state;
        let newData = data.filter((item) => item.masv !== masv);
        if(searchRes.length === 0) {
            this.setState({
                data: newData
            });
        }else {
            let newSeachRes = searchRes.filter((item) => item.masv !== masv);
            this.setState({
                data: newData,
                searchRes: newSeachRes
            });
        }
    }

    //hàm tìm kiếm
    searchFunc = value => {
        value = value.trim().toLowerCase();
        const {data} = this.state;
        let searchRes = data.filter(item => item.hoten.toLowerCase().indexOf(value) !== -1);
        this.setState({
            searchRes
        });
    }

    //hàm sửa
    quickEditFunc = obj => {
        let updateID = obj.masv;
        if(this.state.searchRes.length !== 0) {
            let newSearchRes = [...this.state.searchRes];
            let find = newSearchRes.findIndex(item => item.masv === updateID);
            newSearchRes[find] = obj;
            this.setState({
                searchRes: newSearchRes
            });
        }
        let newData = [...this.state.data];
        let find = newData.findIndex(item => item.masv === updateID);
        newData[find] = obj;
        this.setState({
            data: newData
        });
        
    }

    render() {
        return (
            <div className="container">
                <Add 
                addSubmit={this.addSubmit} 
                dataForm={this.dataForm}
                />
                <Search 
                searchFunc={this.searchFunc} 
                />
                <List 
                dataForm={this.dataForm} 
                mainData={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.data} 
                deleteRow={this.deleteRow}
                quickEditFunc={this.quickEditFunc}
                />
            </div>
        )
    }
}
