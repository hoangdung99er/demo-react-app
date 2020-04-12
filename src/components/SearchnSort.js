import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class SearchnSort extends Component {

    render() {

        return (
            <div className = "_SeachnSort">
                <Search />
                
                <Sort />
            </div>
        );
    }
}

export default SearchnSort;
