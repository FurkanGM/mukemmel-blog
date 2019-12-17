import React, { Component } from 'react';
import axios from "axios";

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            data: ""
        };
    }

    componentDidMount() {
        axios
            .get(
                process.env.baseUrl+"/api/lastposts"
            )
            .then(({ data }) => {
                this.setState({ data: data });
            });
    }


    render() {
        const { data } = this.state;
        return data ? (
            <div className="col-sm-12 col-md-12 col-lg-4">
                {data.map((result) => (
                    <div>
                        <a href={"/blog/" +result.article_slug} className="lastposts">
                            <img src={result.article_img} alt="" className="lastposts__img" />
                            <div className="lastposts__content">
                                <div className="lastposts__title">
                                    {result.article_title}
                                </div>
                                <div className="lastposts__date">{result.article_date}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        ) : (
            <div>Yükleniyor...</div>
        );
    }
}

export default Sidebar;