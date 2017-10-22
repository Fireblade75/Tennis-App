const React = require('react');

class PrimaryButton extends React.Component {
    render() {
        const linkProps = {};
        if (this.props.href) linkProps.href = this.props.href;
        if (this.props.action) linkProps.onClick = this.props.action;

        return (
            <a {...linkProps} className='btn btn-primary btn-action text-white'>
                {this.props.text}
            </a>
        );
    }
}

PrimaryButton.defaultProps = {
    href: false,
    action: null,
    text: "button"
}

module.exports = PrimaryButton;