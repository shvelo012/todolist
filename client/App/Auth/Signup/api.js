import axios from 'axios';

const signupAPI = {
    signup: ({ firstName, lastName, email, password }) => {
        return axios.post('/api/users', {
            firstName,
            lastName,
            email,
            password
        });
    }
};

export default signupAPI;
