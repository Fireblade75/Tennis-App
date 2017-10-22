const React = require('react');

class NavLink extends React.Component {
    render() {
        const linkProps = {};
        if (this.props.href) linkProps.href = this.props.href;
        if (this.props.action) linkProps.onClick = this.props.action;

        let classes = 'nav-item nav-link' + (this.props.active ? ' active' : '');
        return (
            <a className={classes} href={this.props.href} >{this.props.text}</a>
        )
    }
}

NavLink.defaultProps = {
    href: '#',
    active: false,
    text: '{Link}'
}

module.exports = NavLink;