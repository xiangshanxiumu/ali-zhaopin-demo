import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import Root from './root';

const container = document.getElementById('root');
const render = (Component) => {
    ReactDOM.render(<Component />, container);
};
render(Root);