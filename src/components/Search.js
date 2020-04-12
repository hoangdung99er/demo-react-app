import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : this.props.keyword,
        }
    }

    onSearch = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        
        this.setState({
            [name] : value
        });
        // console.log(this.state.keyword);         
    }

    onBtnSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    

    render() {

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">                     
            <div className="input-group">
                
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder = "Nhập từ khóa..."
                    name = "keyword"
                    value = { this.state.keyword }                  
                    onChange = { this.onSearch }
                />
                
                <span className="input-group-btn">
                    <button type="button" className="btn btn-primary" onClick = { this.onBtnSearch }>
                        <span className="fa fa-search mr-5"></span>
                        Tìm
                    </button>
                </span>
                
            </div>              
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        keyword : state.searchTask,
        tasks : state.tasks
    }
}

const mapDispatchToProps = (dispatch , state) => {
    return {
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Search);
