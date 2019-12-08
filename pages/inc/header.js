import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
const Header = () => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>Hello, world!</title>

            <script src="assets/js/bootstrap.min.js"/>
            <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
            <link rel="stylesheet" href="assets/css/style.css" />

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
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
);

Header.getInitialProps = async ({ req }) => {
    const res = await fetch(process.env.baseUrl+"/api/posts");
    const json = await res.json();
    const lpost = await fetch(process.env.baseUrl+"/api/lastpost");
    const lpjson = await lpost.json();
    return { blogs: json.blogs, last: lpjson.posts};
};


export default Header;