import React from "react";
import fetch from "isomorphic-unfetch";

const Sidebar = ({ last }) => (
    <div>
        <div className="col-lg-4">
            {last.map(post => (
                <a className="lastposts">
                    <img src={post.article_img} alt="" className="lastposts__img" />
                    <div className="lastposts__content">
                        <div className="lastposts__title">
                            {post.article_title}
                        </div>
                        <div className="lastposts__date">{post.article_date}</div>
                    </div>
                </a>
            ))}
        </div>
    </div>
);
export default async (req, res) => {
    const lpost = await fetch(process.env.baseUrl+"/api/lastpost");
    const json = await lpost.json();
    console.log(json)
    res.json({ json })
};
