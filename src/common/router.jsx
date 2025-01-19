import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import _homepage from "../home/homepage";
import _template from '../templates/templates';
import { URL_MAIN } from "./globals";
import { useState } from "react";

const _router = ({new_route, _update_route}) => {
    switch(new_route)
    {
        case "/":
            {
                return <_homepage />;
            }
        case "templates/sprint_planning":
            {
                return <_template template_code={1} />;
            }
        default:
            {
                return <_homepage />
            }
    }
}; 

export default _router;