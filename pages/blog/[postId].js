import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Header from '../inc/header';


const BlogPost = ({ post,last }) => (
    <div>
        <Header />

        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="post">
                        <div className="post__img">
                            <div className="post__tag">{post.article_category}</div>
                            <img src={post.article_img} alt={post.article_description} />
                        </div>
                        <div className="post__content">
                            <div className="post__title">
                                {post.article_title}
                            </div>
                            <div className="post__date">{post.article_date}</div>
                            <div className="post__date">0 Yorum</div>
                            <div className="post__text">
                                {post.article_content}
                            </div>
                        </div>
                    </div>
                </div>


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
        </div>

        <style>{`
      .body{
      }
    `}</style>
    </div>
);

BlogPost.getInitialProps = async ({ req,query }) => {
    const res = await fetch(`http://localhost:3000/api/post/${query.postId}`);
    const json = await res.json();
    const lpost = await fetch(process.env.baseUrl+"/api/lastpost");
    const lpjson = await lpost.json();
    return { post: json.post, last: lpjson.posts};
};

export default BlogPost;
