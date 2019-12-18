import React from "react";
import Layout from "../../components/Layout";
import fetch from "isomorphic-unfetch";
import Error from "next/error";


const DynamicPage = ({data}) => {
    if (data.error === true)
        return <Error statusCode={404}/>;
    var lines = data.page_content.split("{line}");
    return (
        <Layout>
            <div className="post">
                <div className="post__img">
                    <img src={data.page_img} alt={data.page_name} />
                </div>
                <div className="post__content">
                    <div className="post__title">
                        {data.page_title}
                    </div>
                    <div className="post__date">{data.page_date}</div>
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
    const res = await fetch(process.env.baseUrl+`/api/page/${query.pageSlug}`);
    const json = await res.json();
    if (json.error !== true) {
        return {data: json};
    }
    return {data : json};
};

export default DynamicPage;


