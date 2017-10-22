const React = require('react');

function openUrl(event) {
    let playerId = event.currentTarget.dataset.id;
    window.location = `matches.html?player=${playerId}`;
}

class PlayerTable extends React.Component {
    render() {
        return (
            <section className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8 col-xl-6'>
                    <table className="table table-hover">
                        <thead className="thead-gray">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">DSS Rank</th>
                            </tr>
                        </thead>
                        <tbody className="tbody-clickable">
                            <tr onClick={openUrl} data-id='1'>
                                <th scope="row">1</th>
                                <td>Mike</td>
                                <td>Denver</td>
                                <td>4,977</td>
                            </tr>
                            <tr onClick={openUrl} data-id='2'>
                                <th scope="row">2</th>
                                <td>Rudy</td>
                                <td>Simson</td>
                                <td>4,070</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

module.exports = PlayerTable;