import React from "react";
import Head from "next/dist/next-server/lib/head";
import axios from "axios";
import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/style.scss";

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            data: ""
        };
    }

    componentDidMount() {
        axios
            .get(
                process.env.baseUrl+"/api/navbar"
            )
            .then(({ data }) => {
                this.setState({ data: data.navbar });
            });
    }

    render() {
        const { data } = this.state;
        return <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>Furkan Gezek</title>

                <script src="https://use.fontawesome.com/452826394c.js"/>

            </Head>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">Furkan Gezek</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                        <ul className="navbar-nav">
                            {
                                data ? (
                                    data.map((result) => (
                                        <li className="nav-item active">
                                            <a className="nav-link" href={result.navbar_link} alt={result.navbar_alt}>{result.navbar_text}</a>
                                        </li>
                                    )
                                    )
                                ) : (
                                    <div></div>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    }
}

export default Header;
