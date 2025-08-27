import { _global_state_context } from "./global_state_context";
import { api_verify_token } from "./otb_apis";

/**
 * check if the access token is valid
 * @param {*} access_token 
 * @param {*} email 
 * @returns Promise that resolves to true if the access token is valid, false otherwise
 */
const _auth_is_valid_access_token = async (access_token, email) => {
    if(email.length === 0 || access_token.length === 0) return false;

    let valid = false;

    try {
        let request = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                accessToken: access_token
            })
        };

        const response = await fetch(api_verify_token, request);

        const data = await response.json();
    
        if(response.ok && data.valid == 1)
        {
            valid = true;
        }
        
    } catch (err) {
        ;// Network error. log error
    }

    return valid;
};

export {
    _auth_is_valid_access_token,
};