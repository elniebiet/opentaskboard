import { URL_MAIN, URL_MAIN_BACKEND } from "./globals";

const api_personal_details = `${URL_MAIN_BACKEND}auth/personal_details`;
const api_verify_token = `${URL_MAIN_BACKEND}auth/atverify`;
const api_signin = `${URL_MAIN_BACKEND}auth/signin`;
const api_signup = `${URL_MAIN_BACKEND}auth/signup`;
const api_save_settings = `${URL_MAIN_BACKEND}general/save_settings`;
const api_load_settings = `${URL_MAIN_BACKEND}general/load_settings`;

export {
    api_personal_details,
    api_verify_token,
    api_signin,
    api_signup,
    api_load_settings,
    api_save_settings,
};