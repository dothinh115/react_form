import React, { Component } from 'react'

export default class Add extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps !== this.props) {
            return true;
        }
        return false;
    }

    render() {
        const {inputChangeHandle, state, dataForm, btnClick} = this.props;

        return (
            <div>
                <h1>
                    Thêm thông tin sinh viên
                </h1>
                <form className="form-group row" onSubmit={btnClick}>
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
                                className={`form-control ${state.errors[item] && "is-invalid"}`} 
                                id={item} 
                                onChange={inputChangeHandle} 
                                />
                                {state.errors[item] && <div className="invalid-feedback">{state.errors[item]}</div>}
                            </div>
                    })}
                    
                    <div className="col-12 mt-2">
                        <button type="submit" className={`btn btn-primary ${state.valid ? "" : "disabled"}`}>
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
