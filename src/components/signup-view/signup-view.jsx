import{ useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {};

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username: 
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Password: 
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday: 
                <input 
                    type="date"
                    value={birthday}
                    onChange={(e) => setBrithday(e.target.value)}
                    required
                    />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};