const React = require('react');


class MatchTable extends React.Component {
    render() {
        return (
            <section className='row justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8 col-xl-6'>
                    <table className="table table-hover">
                        <thead className="thead-gray">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Home Player</th>
                                <th scope="col">Out Player</th>
                                <th scope="col">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2017-08-02</td>
                                <td>Mike Denver</td>
                                <td>Rudy Simson</td>
                                <td>3 - 5</td>
                            </tr>
                            <tr>
                                <td>2017-08-12</td>
                                <td>Mike Denver</td>
                                <td>Mike Denver</td>
                                <td>1 - 6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

module.exports = MatchTable;