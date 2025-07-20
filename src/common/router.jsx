import React from 'react';
import _homepage from "../home/homepage";
import _template from '../templates/templates';
import _taskboard from '../taskboards/taskboards';
import { URL_MAIN } from "./globals";

/**
 * Manages routing for the application
 *  renders the right component based on 
 * 
 * Note: the update route function (props._on_update_route ) should be passed from 
 * the App component down to the component requesting the route change
 */
const _router = (props) => {
    switch(props._route)
    {
        case "/":
            {
                console.log("current route is homepage");
                return < _homepage _on_update_route={ props._on_update_route } />;
            }
        case "templates/sprint_planning":
            {
                console.log("current route is template");
                return <_template _on_update_route={ props._on_update_route } template_code={1} />;
            }
        case "taskboard/default":
            {
                console.log("current route is taskboard");
                return <_taskboard _on_update_route={ props._on_update_route } template_code={1} />;
            }
        default:
            {
                return < _homepage _on_update_route={ props._on_update_route } />;
            }
    }
}; 

export default _router;