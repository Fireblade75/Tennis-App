const React = require('react');

class PageFooter extends React.Component {
    render() {
        return (
            <footer className="bd-footer text-muted bg-light">
                <div className="fluid-container">
                    Copyright &copy; 2017 &nbsp;
                    <a href='https://github.com/Fireblade75'>Fireblade75</a>
                </div>
            </footer>
        );
    }
}

module.exports = PageFooter;