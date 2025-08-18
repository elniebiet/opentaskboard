import * as React from 'react';
import _sprint_planning_template from './sprint_planning';
import { TEMPLATE_CODES } from '../common/globals';

const _get_template = (template_code) => 
{
    switch(template_code)
    {
        case TEMPLATE_CODES.SPRINT_PLANNING:
        {
            return <_sprint_planning_template />;
        }
        default:
        {
            return <_sprint_planning_template />;    
        }
    }
}
const _template = (props) => {
    return (
        <div>
            { _get_template(props.template_code) }
        </div>
    );
};

export default _template;