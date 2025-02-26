/*************************************************************************************/
/******************************** UTILITY FUNCTIONS **********************************/
/*************************************************************************************/

/**
 * Gets complement colour for a given colour.
 *
 * @param {string} orig_colour - The original colour.
 * @returns {string} - the complement colour.
 */
const _get_complement_colour = (orig_colour) => {
    // Remove "#" if present
    orig_colour = orig_colour.replace("#", "");

    // Convert hex to RGB values
    let r = parseInt(orig_colour.substring(0, 2), 16);
    let g = parseInt(orig_colour.substring(2, 4), 16);
    let b = parseInt(orig_colour.substring(4, 6), 16);

    // Invert colors (255 - current value)
    let rOpp = (255 - r).toString(16).padStart(2, "0");
    let gOpp = (255 - g).toString(16).padStart(2, "0");
    let bOpp = (255 - b).toString(16).padStart(2, "0");

    // Return the opposite color in hex format
    return `#${rOpp}${gOpp}${bOpp}`;
}

/**
 * Gets the current cursor type.
 *
 * @param {event} e - the event.
 * @returns {string} - the current cursor type.
 */
const _get_cursor_type = (element) => {
    return window.getComputedStyle(element).cursor;
};

// export
export {
    _get_complement_colour,
    _get_cursor_type,
};