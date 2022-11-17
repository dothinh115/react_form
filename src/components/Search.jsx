import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        const {searchFunc} = this.props;
        return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-group row mt-5">
                    <div className="col-2">
                        <label htmlFor="searchInput" className="col-form-label">
                            Tìm kiếm (bằng mã số sv):
                        </label>
                    </div>
                    <div className="col-8">
                        <input type="number" className="form-control" onChange={searchFunc} />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary">
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}
