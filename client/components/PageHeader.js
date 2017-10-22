const React = require('react');
const NavLink = require('./NavLink');

class PageHeader extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className='container-fluid'>
                    <a className="navbar-brand" href="index.html">{this.props.title}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#heaerNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="heaerNavbar">
                        <div className="navbar-nav ml-auto">
                            <NavLink active={this.props.currentPage === 'home'}
                                 href='index.html' text='Home' />
                            <NavLink active={this.props.currentPage === 'matches'}
                                 href='matches.html' text='Matches' />
                            <NavLink active={this.props.currentPage === 'players'}
                                 href='players.html' text='Players' />
                            <NavLink active={false} text='Log in' />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

PageHeader.defaultProps = {
    title: "{Page Title}"
}

module.exports = PageHeader;