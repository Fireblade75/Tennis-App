const React = require('react');
const PageHeader = require('../components/PageHeader');
const JumboImage = require('../components/JumboImage');
const PageFooter = require('../components/PageFooter');
const TextSection = require('../components/TextSection');
const MatchTable = require('../components/MatchTable');

const pageLead = "This is an overview of all matches added to the app. To see the matches of a single player click on this player in the player overview. Matches are added by registered users of the webiste."
const buttonAction = { text: "Add Match" }

class MatchPage extends React.Component {
    render() {
        return (
            <div className='app'>
                <PageHeader title={this.props.title} currentPage='matches' />
                <main className='container-fluid'>
                    <TextSection title='Matches' lead={pageLead} action={buttonAction} />
                    <MatchTable />
                </main>
                <PageFooter />
            </div>
        );
    }
}

MatchPage.defaultProps = {
    title: "{App Title}"
}

module.exports = MatchPage;