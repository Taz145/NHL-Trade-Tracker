import React from 'react';

export function Header(props) {
    return (
        <div className="App-header">
        <h1>{props.title}</h1>
        </div>
    );
}

export default Header;