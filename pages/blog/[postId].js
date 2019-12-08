import React from "react";
import fetch from "isomorphic-unfetch";
import Header from '../inc/header';
import Sidebar from '../inc/sidebar';
import {useAsync} from "react-async";

const BlogPost = () => {
    const { post, error } = useAsync({ promiseFn: getData });
    if (error) return `Hata oluştu: ${error.message}`;
    if (post)
        return (
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


                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    return null
};

var pId;

const getData = async () => {
    console.log(pId);
    const res = await fetch(process.env.baseUrl+`/api/post/${pId}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json()
};

BlogPost.getInitialProps = async ({ req,query }) => {
    pId = query.postId;
    return {};
};
export default BlogPost;
