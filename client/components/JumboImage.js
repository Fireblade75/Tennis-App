const React = require('react');

class JumboImage extends React.Component {
    render() {
        return (
            <div className='jumbotron jumbotron-fluid jumbotron-head-image'>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

JumboImage.defaultProps = {
    title: "{Page Title}"
}

module.exports = JumboImage;