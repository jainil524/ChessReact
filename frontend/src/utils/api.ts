const API_URL = 'http://localhost:3000/api';


export const registerUser = async (userData: any) => {

    let options = {

        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(userData)
    }

    const response = await fetch(`${API_URL}/user/register`, options);
    return response.json();
};

export const loginUser = async (userData: any) => {

    let options = {
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(userData)
    }

    const response = await fetch(`${API_URL}/user/login`, options);
    return response.json();
};

export const validateToken = async (token: string) => {

    let options = {

        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        method: 'GET',
    }
    
    const response = await fetch(`${API_URL}/user/tokenValidate`,options) ;
    return response.json();
};
