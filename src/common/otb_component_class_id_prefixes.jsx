/**
 * Unique id prefixes that identify a component, 
 * each component that has an id must have one of the prefixes
 * listed below.
 */
const COMPONENT_CLSID_PREFIXES = {
    NONE:                                   "00000000",
    TASKBOARD:                              "00000001",
    STICKY_NOTE:                            "00000002",
    ARROW:                                  "00000003",
    LINE:                                   "00000004",
    CIRCLE:                                 "00000005",
    LEFT_ANGLE:                             "00000006",
    RIGHT_ANGLE:                            "00000007",
    TRIANGLE:                               "00000008",
    
    LAST:                                   "11111111",
};

export {
    COMPONENT_CLSID_PREFIXES,
};