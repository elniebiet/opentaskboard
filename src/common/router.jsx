import React from 'react';
import _homepage from "../home/homepage";
import _template from '../templates/templates';
import _taskboard from '../taskboards/taskboards';
import { TEMPLATE_CODES, TASKBOARD_TYPES } from './globals';

import { URL_MAIN, OTB_LS_ROUTE_NAME } from "./globals";

/**
 * Manages routing for the application
 *  renders the right component based on 
 * 
 * Note: the update route function (props._on_update_route ) should be passed from 
 * the App component down to the component requesting the route change
 */

const _store_in_local_storage = (_route) => {
    if (typeof window !== "undefined" && typeof _route === "string") {
        window.localStorage.setItem(OTB_LS_ROUTE_NAME, _route);
    }
};

const _router = (props) => {

    let taskboard_id = "";

    // Check for /taskboard/:id route
    if ( typeof props._route === "string" && props._route.startsWith("taskboard/")
            && props._route.split("/").length === 2
) {
        taskboard_id = props._route.split("/")[1];
        console.log("current route is taskboard with id:", taskboard_id);
        props._on_update_route(props._route);
        _store_in_local_storage(props._route);
        return <_taskboard taskboard_id={taskboard_id} />;
    }

    switch(props._route)
    {
        case "/":
            {
                console.log("current route is homepage");
                props._on_update_route("/");
                _store_in_local_storage(props._route);
                return < _homepage />;
            }
        case "templates/sprint_planning":
            {
                console.log("current route is template");
                props._on_update_route(props._route);
                _store_in_local_storage(props._route);
                return <_template  template_code={TEMPLATE_CODES.SPRINT_PLANNING} />;
            }
        default:
            {
                props._on_update_route("/");
                _store_in_local_storage(props._route);
                return < _homepage />;
            }
    }
}; 

export default _router;