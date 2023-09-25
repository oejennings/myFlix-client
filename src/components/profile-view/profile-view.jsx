import React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, updateUser, setUser, movies }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const favoriteMovies = movies.filter((movie) => { 
        return user.FavoriteMovies.includes(movie._id)});

    updateUser = () => {
        const data = {
            Username: username,
            Password: password,
            Email: email, 
            Birthday: birthday
        };

        fetch(`https://oj-movies-0c0784fe26f8.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Update Failed")
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
            }
        })
    }

    return (
       <>
       <Row className="justify-content-center">
        <Col md={5}>
            <h1>My Profile</h1>
                <Form onClick={updateUser}>
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
                    <Button variant="primary" type="submit" onClick={updateUser}>
                        Update Information
                    </Button>
                </Form>
        </Col>
       </Row>
       <Row className="justify-content-center">
        {favoriteMovies.map((movie) => (
            <Col className="mb-4 d-flex" key={movie._id} xs={12} sm={6} md={4} lg={3}>
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