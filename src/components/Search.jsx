import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         searchKeys: ""
      }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.searchKeys !== this.state.searchKeys) {
            this.props.searchFunc(this.state.searchKeys);
        }
    }

    inputChangeHandle = e => {
        let searchKeys = e.target.value;
        this.setState({
            searchKeys
        });
    }

    render() {
        return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-group row mt-5">
                    <div className="col-2">
                        <label htmlFor="searchInput" className="col-form-label">
                            Tìm kiếm (bằng họ và tên):
                        </label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" onChange={this.inputChangeHandle} />
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
