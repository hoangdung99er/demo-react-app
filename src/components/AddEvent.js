import React, { Component } from 'react';

class AddEvent extends Component {

    onOpenEvent = () => {
        this.props.isActiveEvent()
    }

    

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button type="reset" className="btn btn-primary" id="btn1" onClick = { this.onOpenEvent }>
                    <span className="fa fa-plus mr-5" ></span>
                    Thêm Công Việc
                </button>              
            </div>
        );
    }
  
}

export default AddEvent;
