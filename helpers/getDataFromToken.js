import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next'; // Import from cookies-next

export const getDataFromToken = (request) => {
    try {
        // Use cookies-next to get the token from cookies
        const token = getCookie('token', { req: request });
        if (!token) {
            throw new Error('No token found');
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id; // Assuming the doctor ID is stored in the token
    } catch (error) {
        throw new Error(error.message);
    }
};
