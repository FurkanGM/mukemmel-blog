import React from "react";
import Layout from "../../components/Layout";
import fetch from "isomorphic-unfetch";


const DynamicPage = ({data}) => {
    var lines = data.post.page_content.split("{line}");
    return (
        <Layout>
            <div className="post">
                <div className="post__img">
                    <img src={data.post.page_img} alt={data.post.page_name} />
                </div>
                <div className="post__content">
                    <div className="post__title">
                        {data.post.page_title}
                    </div>
                    <div className="post__date">{data.post.page_date}</div>
                    <div className="post__text">
                        {
                            lines
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

DynamicPage.getInitialProps = async ({ req,query }) => {
    const res = await fetch(process.env.baseUrl+`/api/page/${query.pageName}`);
    const json = await res.json();
    return { data: json};
};

export default DynamicPage;


