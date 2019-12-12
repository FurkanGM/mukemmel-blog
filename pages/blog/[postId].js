import React from "react";
import fetch from "isomorphic-unfetch";
import Layout from "../../components/Layout";

const BlogPost = ({data}) => {
    return (
        <Layout>
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
        </Layout>
    );
};

BlogPost.getInitialProps = async ({ req,query }) => {
    const res = await fetch(process.env.baseUrl+`/api/post/${query.postId}`);
    const json = await res.json();
    return { data: json};
};

export default BlogPost;
