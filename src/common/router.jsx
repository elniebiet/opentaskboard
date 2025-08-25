import React, { useEffect } from 'react';
import _homepage from "../home/homepage";
import _template from '../templates/templates';
import _taskboard from '../taskboards/taskboards';
import { TEMPLATE_CODES } from './globals';
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

/**
 * This should call the route update function passed in props
 * and save the route in local storage 
 * @param {*} _route 
 */
const _route_updated = ({props, _route}) => {
    if (typeof _route === "string") {
        // Call the route update function
        props._on_update_route(_route);

        // Store in local storage
        _store_in_local_storage(_route);
    }
};

const _router = (props) => {
    let taskboard_id = "";

    // Only call _on_update_route in useEffect
    useEffect(() => {
        if ( typeof props._route === "string" && props._route.startsWith("taskboard/") 
            && props._route.split("/").length === 2
        ) {
            _route_updated({props, _route: props._route});
        } else if (props._route === "templates/sprint_planning") {
            _route_updated({props, _route: props._route});
        } else {
            _route_updated({props, _route: "/"});
        }
    }, [props._route, props._on_update_route]);

    // taskboard route
    if (typeof props._route === "string" &&
        props._route.startsWith("taskboard/") &&
        props._route.split("/").length === 2
    ) {
        taskboard_id = props._route.split("/")[1];
        console.log("current route is taskboard with id:", taskboard_id);
        return <_taskboard taskboard_id={taskboard_id} />;6
    }

    // other routes
    switch (props._route) {
        case "/":
            console.log("current route is homepage");
            return <_homepage />;
        case "templates/sprint_planning":
            console.log("current route is template");
            return <_template template_code={TEMPLATE_CODES.SPRINT_PLANNING} />;
        default:
            return <_homepage />;
    }
};

export default _router;