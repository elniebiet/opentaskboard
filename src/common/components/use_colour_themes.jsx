import COLOR_THEMES from "../../db/taskboards/colour_themes_db_temp"; //temporary storage for testing

let SELECTED_COLOR_THEME = COLOR_THEMES.Light; // Default theme

const _set_selected_color_theme = (theme_name) => {
    Object.entries(COLOR_THEMES).forEach(([key, value]) => {
        if(theme_name === value.name) {
            SELECTED_COLOR_THEME = value;
            return true;
        }
    });

    return false;
}

const _get_all_themes = () => {
    return COLOR_THEMES;
};

export {
    SELECTED_COLOR_THEME,
    _set_selected_color_theme,
    _get_all_themes,
};