import axios from "axios";
import React from "react";



function Post({ match }) {

    const [post, setPost] = React.useState([]);
    const [information, setInformation] = React.useState([]);
    const [comment, setComment] = React.useState([]);

    const getComment = async () => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${match.params.id}`);
        setPost(data);
        if (match.params.id > 0) {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`);
            setInformation(data);
        }
        if (match.params.id > 0) {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/?postId=${match.params.id}`);
            setComment(data);


        }

    }

    React.useEffect(() => getComment());

    return (
        <>
            <div className="Container">
                <div className="container_individual_1">
                    <h3>User Detail:</h3>
                    <p>Name : {post.name}</p>
                    <p>User Name : {post.username}</p>
                    <p>Email : {post.email}</p>
                    <p>Phone :{post.phone}</p>
                    <p>Website :{post.website}</p>
                </div>
                <div className="container_individual_2">
                    <h3>Title:{information.title}</h3>
                    <p>Body: {information.body}</p>
                </div>
                <div className="container_individual_3">
                    <h3 id="comment">Comments</h3>
                    {comment.map((element) => {
                        return (
                            <>
                                <div key={element.postId} className="comment">
                                    <p>Name :{element.name}</p>
                                    <p>Email Id :{element.email}</p>
                                    <p>Comment :{element.body}</p>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}




export default Post;








