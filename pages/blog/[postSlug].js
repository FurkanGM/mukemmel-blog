import React from "react";
import fetch from "isomorphic-unfetch";
import Layout from "../../components/Layout";
import Error from "next/error";
import Axios from "axios";
import Router from "next/router";

class BlogPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
        };
    }

    static async getInitialProps({ query }) {
        var res = await fetch(process.env.baseUrl+`/api/post/${query.postSlug}`);
        var json = await res.json();
        if (json.error !== true) {
            return {data: json};
        }
        return {data : json};
    }

    getCommentCount(){
        if (this.props.data[1] !== null)
            return this.props.data[1].length;
        else
            return 0;
    }

    getComments(){
        if (this.props.data[1].length > 0){
            return this.props.data[1].map((data) => (
                <div className="comment">
                    <div className="author">
                        <div className="avatar"><span className="fa-stack fa-lg"><i
    className="fa fa-circle fa-stack-2x"/><i
    className="fa fa-user fa-stack-1x fa-inverse"/></span></div>
                        <div className="name">{data.author_name}</div>
                        <div className="date">{data.comment_date}</div>
                    </div>
                    <div className="content">{data.author_content}</div>
                </div>
            ))
        }else{
            return <div className="comment">
                <div className="alert alert-warning">Henüz yorum yapan olmamış.</div>
            </div>
        }
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { name, email, content } = this.state;

        const data = {
            aid: this.props.data[0].article_id,
            name,
            email,
            content,
        };
        const slug = this.props.data[0].article_slug;
        Axios
            .post(process.env.baseUrl+'/api/post/' + slug + "/addcomment", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function (response) {
                document.getElementById('result').className = "";
                document.getElementById('result').classList.add('alert');
                document.getElementById('result').classList.add('alert-success');
                document.getElementById('result').innerText = "Yorumunuz başarıyla eklendi.";
                setTimeout(function () {
                    Router.push('/blog/' + slug)
                }, 1500)
            })
            .catch(function (error) {
                document.getElementById('result').className = "";
                document.getElementById('result').classList.add('alert');
                document.getElementById('result').classList.add('alert-danger');
                document.getElementById('result').innerText = "Yorum gönderilmeye çalışırken hata oluştu!";
                setTimeout(function () {
                    Router.push('/blog/' + slug)
                }, 1500)
            });
    };

    render() {
        if (this.props.data.error === true)
            return <Error statusCode={404}/>;
        return (
            <Layout>
                <div className="post">
                    <div className="post__img">
                        <div className="post__tag">{this.props.data[0].article_category}</div>
                        <img src={this.props.data[0].article_img} alt={this.props.data[0].article_description} />
                    </div>
                    <div className="post__content">
                        <div className="post__title">
                            {this.props.data[0].article_title}
                        </div>
                        <div className="post__date">{this.props.data[0].article_date}</div>
                        <div className="post__date">{this.getCommentCount()} Yorum</div>
                        <div className="post__text">
                            {this.props.data[0].article_content}
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <div className="title">Yorumlar</div>
                    <div className="new-comment">
                        <div id="result" />
                        <form  onSubmit={this.handleSubmit} >
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                </div>
                                <input type="text" className="form-control" name="name" placeholder="Görüntülenecek isim"
                                       aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={this.handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope" /></span>
                                </div>
                                <input type="text" className="form-control" name="email" placeholder="E-Posta adresiniz"
                                       aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={this.handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <textarea className="form-control" aria-label="With textarea" name="content" placeholder="Yorumunuzu buraya girin." onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-block btn-success" type="submit">Gönder</button>
                        </form>
                    </div>
                    {
                        this.getComments()
                    }
                </div>
            </Layout>
        );
    };

}

export default BlogPost;
