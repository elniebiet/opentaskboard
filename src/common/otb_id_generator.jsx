import { COMPONENT_CLSID_PREFIXES } from "./otb_component_class_id_prefixes";

/** OpenTaskBoard ID Generator
 * @param {COMPONENT_CLSID_PREFIXES} class_id_prefix
 * @return new id or null 
 */
const _otb_generate_uuid = (class_id_prefix) => {

    if((!Object.values(COMPONENT_CLSID_PREFIXES).includes(class_id_prefix)))
    {
        return null;
    }

    const randomPart = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

    return `${class_id_prefix}-${randomPart}`;
}


export {
    _otb_generate_uuid,
}