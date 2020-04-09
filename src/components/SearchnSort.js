import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class SearchnSort extends Component {

    render() {

        return (
            <div className = "_SeachnSort">
                <Search onSearch = { this.props.onSearch }/>
                
                <Sort 
                    onSort = { this.props.onSort }
                    sortBy = { this.props.sortBy }
                    sortValue = { this.props.sortValue }
                />
            </div>
        );
    }
}

export default SearchnSort;
