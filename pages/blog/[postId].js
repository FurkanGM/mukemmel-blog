import React from "react";
import fetch from "isomorphic-unfetch";
import Header from '../inc/header';
import Sidebar from '../inc/sidebar';
import {useAsync} from "react-async";
var pId;
const BlogPost = ({pId}) => {
    const { data, error } = useAsync({promiseFn: getData,pid: pId});
    if (error) return error.message;
    if (data)
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="post">
                                <div className="post__img">
                                    <div className="post__tag">{data.post.article_category}</div>
                                    <img src={data.post.article_img} alt={data.post.article_description} />
                                </div>
                                <div className="post__content">
                                    <div className="post__title">
                                        {data.post.article_title}
                                    </div>
                                    <div className="post__date">{data.post.article_date}</div>
                                    <div className="post__date">0 Yorum</div>
                                    <div className="post__text">
                                        {data.post.article_content}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    else return null
};

const getData = async ({ pid }) => {
    const res = await fetch(process.env.baseUrl+`/api/post/${pid}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json()
};


BlogPost.getInitialProps = async ({ req,query }) => {
    pId = query.postId;
    return {pId};
};

export default BlogPost;
