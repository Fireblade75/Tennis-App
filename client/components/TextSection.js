const React = require('react');
const PrimaryButton = require('./PrimaryButton');

class TextSection extends React.Component {
    render() {
        return (
            <section className='row justify-content-center mb-4'>
                <div className='col-12 col-md-10 col-lg-8 col-xl-6'>

                    {this.props.title ?
                        <h1>{this.props.title}</h1>
                        : false}

                    {this.props.lead ?
                        <p className='lead'>{this.props.lead}</p>
                        : false}

                    {this.props.content ?
                        <p>{this.props.content}</p>
                        : false}

                    {this.props.action ?
                        <p><PrimaryButton {...this.props.action} /></p>
                        : false}

                </div>
            </section>
        );
    }
}

module.exports = TextSection;