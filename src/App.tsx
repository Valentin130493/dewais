import React from 'react';
import axios from "axios";

import './App.css';


interface UserData {
    avatar_url:string,
    login:string,
    bio:string,
    html_url:string
}


export const App = () => {
    const [username, setUsername] = React.useState<string>('');
    const [userData, setUserData] = React.useState<UserData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value.trim())
    }

    const handleSearch = async () => {
        if (username.trim() === '') {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUserData(response.data);

        } catch (error) {
            setUserData(null);
        } finally {
            setLoading(false);
            setUsername('')
        }
    };

    return (
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h1>GitHub User Search</h1>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="Enter GitHub username"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading && <p>Data is loading...</p>}
            {userData && (
                <div style={{marginTop: '2rem'}}>
                    <img src={userData.avatar_url} alt={`${username}'s avatar`} width="100"/>
                    <h2>{userData.login}</h2>
                    <p>{userData.bio || 'No bio available'}</p>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                        Visit Profile
                    </a>
                </div>
            )}
        </div>
    );
}

