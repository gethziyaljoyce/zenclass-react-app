
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const URL = "https://jsonplaceholder.typicode.com/posts";

export default function Posts() {
    const [posts, setPosts] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [userId, setUserId] = React.useState('');
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [id, setId] = React.useState("");

    //for getting data

    const getData = async () => {
        try {
            const { data } = await axios.get(URL);
            const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(users);
            setPosts(data);
            console.log(data);
        } catch (err) {
            console.log("Error :", err);
        }
    };


    //to delete data

    const deleteData = async (id) => {
        try {
            window.alert("Are you sure?");
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            var post = posts.filter((e) => e.id !== id);
            setPosts(post);
        } catch (err) {
            console.log("Error :", err);
        }

    }
    React.useEffect(() => getData(), []);

    //to create data

    const createData = async () => {
        try {
            const { data: post } = await axios.post(URL, {
                userId: userId,
                title: title,
                body: body
            });
            posts.push(post);
            let tempPosts = [...posts];
            console.log(post);
            setPosts(tempPosts);
            setUserId("");
            setTitle("");
            setBody("");
        } catch (err) {
            console.log("Error :", err);
        }

    };

    //to update data

    const updateData = async () => {
        try {
            const { data: put } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                userId: userId,
                title: title,
                body: body,

            });
            let tempPosts = [...posts];
            let index = tempPosts.findIndex((po) => po.id === id);
            tempPosts[index] = put;
            console.log(put);
            setPosts(tempPosts);
            setUserId("");
            setTitle("");
            setBody("");
        }catch (err) {
            console.log("Error :", err);
        }
        
    };

    //collect the selected data to be updated 

    let selectDataToUpdate = async (ele) => {
        setTitle(ele.title);
        setBody(ele.body);
        setUserId(ele.userId);
        setId(ele.id);
    };

    //for getting the changes in the respective field

    let handleChange = ({ target: { name, value } }) => {
        if (name === "userId") setUserId(value);
        if (name === "title") setTitle(value);
        if (name === "body") setBody(value);
    };

    //submitting operation

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id > 0) {
            updateData();
        } else {
            createData();
        }
    }

    return (
        <>

            <div className="container_form">
                <h2 id="add">Add Your Post Here!!</h2>
                <form>
                    <label>User Id :</label>
                    <select name="userId"
                        value={userId}
                        onChange={handleChange}>
                        {users.map((user) => {
                            return (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            );
                        })}

                    </select><br></br><br></br>
                    <label>Title :</label>
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={handleChange} /><br></br><br></br>
                    <label>Body :</label>
                    <textarea type="text"
                        name="body"
                        value={body}
                        onChange={handleChange}
                        rows="5" cols="23"></textarea><br></br><br></br>
                    <button type="button" className="btn btn-dark" onClick={handleSubmit}>Submit</button>

                </form>
            </div>

            <h2 id="posts"><b>All Posts</b></h2>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Id</th>
                        <th>Body</th>
                        <th>Title</th>
                        <th>Action I</th>
                        <th>Action II</th>
                        <th>Action III</th>
                    </tr>
                </thead>
                {posts.map((ele) => {
                    return (
                        <tbody key={ele.id}>
                            <tr>
                                <td>{ele.id}</td>
                                <td>{ele.userId}</td>
                                <td>{ele.body}</td>
                                <td>{ele.title}</td>
                                <td><Button variant="danger" onClick={() => deleteData(ele.id)}>Delete</Button></td>
                                <td><Button onClick={() => selectDataToUpdate(ele)}>Update</Button></td>
                                <td><Button className="view" variant="info"><Link to={`/Posts/${ele.id}`}>View</Link></Button></td>
                            </tr>
                        </tbody>
                    );
                })}

            </Table>


        </>
    );

}