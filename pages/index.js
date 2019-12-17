import React from "react";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";


const Home = ({ blogs }) => (
    <Layout>
        {blogs.map(post => (
            <a href={"blog/"+post.article_slug} className="article">
                <div className="article__img">
                    <div className="article__tag">{post.article_category}</div>
                    <img src={post.article_img} alt={post.article_description} />
                </div>
                <div className="article__content">
                    <div className="article__date">{post.article_date}</div>
                    <div className="article__title">
                        {post.article_title}
                    </div>
                    <div className="article__text">
                        {post.article_content}
                    </div>
                </div>
            </a>
        ))}
    </Layout>
);

Home.getInitialProps = async ({ req,query }) => {
    const res = await fetch(process.env.baseUrl+"/api/posts");
    const json = await res.json();
    return { blogs: json};
};


export default Home;
