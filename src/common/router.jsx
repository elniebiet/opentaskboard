import React from 'react';
import _homepage from "../home/homepage";
import _template from '../templates/templates';
import { URL_MAIN } from "./globals";

const _router = (props) => {
    switch(props._route)
    {
        case "/":
            {
                return < _homepage _on_update_route={ props._on_update_route } />;
            }
        case "templates/sprint_planning":
            {
                console.log("current route is template");
                return <_template _on_update_route={ props._on_update_route } template_code={1} />;
            }
        default:
            {
                return < _homepage _on_update_route={ props._on_update_route } />;
            }
    }
}; 

export default _router;