import * as React from 'react';
import _sprint_planning_template from './sprint_planning';

const _template = ({template_code}) => {
    return
    (
      <div id="template_root">
        { (template_code === 1) ? <_sprint_planning_template /> : <_sprint_planning_template /> /* TODO: REPLACE WITH DEFAULT*/}
      </div>  
    );
};

export default _template;