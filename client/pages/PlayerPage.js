const React = require('react');
const PageHeader = require('../components/PageHeader');
const JumboImage = require('../components/JumboImage');
const PageFooter = require('../components/PageFooter');
const TextSection = require('../components/TextSection');
const PlayerTable = require('../components/PlayerTable');

const pageLead = "This is an overview of all players currently added to the app. Players are added by registered users of the webiste. Log in to add yourself or your favorite players."
const buttonAction = { text: "Add Player" }

class PlayerPage extends React.Component {
    render() {
        return (
            <div className='app'>
                <PageHeader title={this.props.title} currentPage='players' />
                <main className='container-fluid'>
                    <TextSection title='Players' lead={pageLead} action={buttonAction} />
                    <PlayerTable />
                </main>
                <PageFooter />
            </div>
        );
    }
}

PlayerPage.defaultProps = {
    title: "{App Title}"
}

module.exports = PlayerPage;