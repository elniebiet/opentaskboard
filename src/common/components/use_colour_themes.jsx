import COLOR_THEMES from "../../db/taskboards/colour_themes_db_temp"; //temporary storage for testing

let SELECTED_COLOR_THEME = COLOR_THEMES.white;

const _set_selected_color_theme = (theme_name) => {
    for(let i=0; i<COLOR_THEMES.length; i++)
    {
        if(COLOR_THEMES[i].name === theme_name)
        {
            SELECTED_COLOR_THEME = COLOR_THEMES[i];
            return;
        }
    }
}

export {
    SELECTED_COLOR_THEME,
    _set_selected_color_theme,
};