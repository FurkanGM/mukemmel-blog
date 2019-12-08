import fetch from 'isomorphic-unfetch';
import { useAsync } from "react-async"

const loadPlayer = async () => {
    const res = await fetch(process.env.baseUrl+"/api/lastpost")
    if (!res.ok) throw new Error(res.statusText);
    return res.json()
};

const Post = () => {
    const { data, error, isPending } = useAsync({ promiseFn: loadPlayer, playerId: 1 })
    if (error) return `Hata oluştu: ${error.message}`;
    if (data)
        return (
            <div className="col-md-4">
                {data.posts.map((result) => (
                    <a className="lastposts">
                        <img src={result.article_img} alt="" className="lastposts__img" />
                        <div className="lastposts__content">
                            <div className="lastposts__title">
                                {result.article_title}
                            </div>
                            <div className="lastposts__date">{result.article_date}</div>
                        </div>
                    </a>
                ))}
            </div>
        );
    return null
};

export default Post;
