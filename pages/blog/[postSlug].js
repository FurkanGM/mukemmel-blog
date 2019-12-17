import React from "react";
import fetch from "isomorphic-unfetch";
import Layout from "../../components/Layout";
import Axios from "axios";

class BlogPost extends React.Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps({ query }) {
        const res = await fetch(process.env.baseUrl+`/api/post/${query.postSlug}`);
        const json = await res.json();
        return {data: json};
    }

    getCommentCount(){
        if (this.props.data[1] !== null)
            return this.props.data[1].length;
        else
            return 0;
    }

    getComments(){
        if (this.props.data[1] !== null){
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

    addComment(){
        Axios.post("/api/blog/comments/add", [])
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    };
    handleSubmit = evt => {
        evt.preventDefault();
        //making a post request with the fetch API
        fetch('/api/blog/addComment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName:this.state.name
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    };

    render() {
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
                        <form onSubmit={this.handleSubmit} >
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
                            <button className="btn btn-block btn-success">Gönder</button>
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
