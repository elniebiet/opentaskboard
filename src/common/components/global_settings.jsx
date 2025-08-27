import { ORIENTATION } from "../globals";
import COLOR_THEMES from "../../db/colour_themes_db_temp";

let GLOBAL_SETTINGS = {
    toolbar_orientation: ORIENTATION.HORIZONTAL,
    color_theme: COLOR_THEMES.Light,
    show_tips: true,
};

const _set_selected_color_theme = (theme_name) => {
    Object.entries(COLOR_THEMES).forEach(([key, value]) => {
        if(theme_name === value.name) {
            GLOBAL_SETTINGS.color_theme = value;
            return true;
        }
    });

    return false;
}

const _get_all_themes = () => {
    return COLOR_THEMES;
};

const _get_selected_color_theme = () => {
    return GLOBAL_SETTINGS.color_theme;
}

/**
 * pass in new settings to update ALL global settings
 * @param {*} new_settings
 *  structure for new_settings must match GLOBAL_SETTINGS 
 */
const _set_global_settings = (new_settings) => {
    GLOBAL_SETTINGS.color_theme = COLOR_THEMES[new_settings.color_theme];
    GLOBAL_SETTINGS.toolbar_orientation = new_settings.toolbar_orientation;
    GLOBAL_SETTINGS.show_tips = new_settings.show_tips;
};

const _get_global_settings = () => {
    return GLOBAL_SETTINGS;
};

export {
    _set_global_settings,
    _get_global_settings,
    _set_selected_color_theme,
    _get_all_themes,
    _get_selected_color_theme,
}