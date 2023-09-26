import React from "react";
import { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";

export const ProfileView = ({ user, token, setUser, movies }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const favoriteMovies = movies.filter((movie) => { 
        return user.FavoriteMovies.includes(movie._id)});

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            Username: username, 
            Email: email,
            Birthday: birthday
        };
        if(password) {
            data['Password'] = password
        }
        fetch(`https://oj-movies-0c0784fe26f8.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Update Successful")
                return response.json();
            } else {
                alert("Update Failed")
            }
        }).then((data) => {
            localStorage.setItem("user",JSON.stringify(data));
            setUser(data);
        })
    };

    const deleteUser = () => {
        fetch(`https://oj-movies-0c0784fe26f8.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                alert("Your account has been deleted")
            } else {
                alert("Something went wrong")
            }
        })
    }

    return (
       <>
       <Row className= "justify-content-center">
        <Col md={6}>
            <h1>My Profile</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className='form-group'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className='form-group'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className='form-group'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday" className='form-group'>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday.slice(0,10)}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Update Information
                    </Button>
                </Form>
        </Col>
       </Row>
       <Row className="delete-button">
            <Button variant="danger" onClick={deleteUser}>
                Delete Account
            </Button>
       </Row>
       <Row className="justify-content-center">
        <h3>Favorite Movies: </h3>
        {favoriteMovies.map((movie) => (
            <Col className="mb-4 d-flex" key={movie._id} md={4}>
                <MovieCard 
                    movie={movie}
                    user={user}
                    token={token}
                    setUser={setUser} />
            </Col>
        ))}
       </Row>
       
       </>
    )
    }