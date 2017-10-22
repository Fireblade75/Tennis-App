const React = require('react');
const PageHeader = require('../components/PageHeader');
const JumboImage = require('../components/JumboImage');
const PageFooter = require('../components/PageFooter');
const TextSection = require('../components/TextSection');

const pageLead = "Tennis App is a tool for storing the results of matches between tennis players. Users can view results of players and add players and matches."
const pageContent = "The users can add player themselves and can add matches between this players. This helps them to keep track of their own results of those of their favorite players. This helps them to choose an opnent for their next match or to find out if a match is going to be interesting."

class HomePage extends React.Component {
    render() {
        return (
            <div className='app'>
                <PageHeader title={this.props.title} currentPage='home' />
                <JumboImage title={this.props.title} />
                <main className='container-fluid'>
                    <TextSection lead={pageLead} content={pageContent} />
                </main>
                <PageFooter />
            </div>
        );
    }
}

HomePage.defaultProps = {
    title: "{App Title}"
}

module.exports = HomePage;