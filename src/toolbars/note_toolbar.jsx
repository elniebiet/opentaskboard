import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import bold_img from '../../res/imgs/note_toolbar/bold_100x100.png';
import italic_img from '../../res/imgs/note_toolbar/italic_100x100.png';
import underline_img from '../../res/imgs/note_toolbar/underline_100x100.png';
import strikethrough_img from '../../res/imgs/note_toolbar/strikethrough_100x100.png';
import font_family_img from '../../res/imgs/note_toolbar/font_type_100x100.png';
import font_size_img from '../../res/imgs/note_toolbar/font_size_100x100.png';
import font_colour_img from '../../res/imgs/note_toolbar/font_colour_100x100.png';
import alignment_img from '../../res/imgs/note_toolbar/alignment_centre_100x100.png';
import link_img from '../../res/imgs/note_toolbar/link_100x100.png';
import emoji_img from '../../res/imgs/note_toolbar/emoji_100x100.png';
import others_img from '../../res/imgs/note_toolbar/ellipsis_100x100.png';
import { useState, useEffect } from 'react';
import { TASKBOARD_STATES } from '../taskboards/taskboard_globals';
import { _get_max_z_index, _use_max_z_index } from '../common/globals';
import { _set_global_cursor_type } from '../taskboards/taskboard_globals';
import { _get_toolbar_z_index } from '../common/globals';
import { NOTE_TOOLBAR_ITEMS } from './toolbar_globals';
import { _colour_picker_no_button } from '../common/components/colour_picker';
import { SELECTED_COLOR_THEME } from '../common/components/use_colour_themes';

const _add_toolbar_item = (props) => 
{
    let w = props.tb_root_width + 'px';
    let h = props.tb_root_height + 'px';

    const _square_fab = styled(Fab)({
        borderRadius: props.tb_item_br + 'px', 
        width: w,       
        height: h,      
        backgroundColor: '#ffffff', 
        '&:hover': { 
            backgroundColor: '#115293', 
        },
    });

    
    const _handle_tb_item_click = (e) =>
    {
        _on_tb_item_click(e, props.item_index);
    };

    const _on_tb_item_click = (e, tb_item_idx) => {
        switch(tb_item_idx)
        {
            case NOTE_TOOLBAR_ITEMS.NTBI_BOLD:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_BOLD);
                break;
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_ITALIC:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_ITALIC);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_UNDERLINE:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_UNDERLINE);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_STRIKETHROUGH:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_STRIKETHROUGH);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_FONT_FAMILY:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_FONT_FAMILY);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_FONT_SIZE:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_FONT_SIZE);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_FONT_COLOUR:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_FONT_COLOUR);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_ALIGNMENT:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_ALIGNMENT);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_LINK:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_LINK);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_EMOJI:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_EMOJI);
                break;    
            }
            case NOTE_TOOLBAR_ITEMS.NTBI_OTHERS:
            {
                props.note_tb_item_clicked_notif(NOTE_TOOLBAR_ITEMS.NTBI_OTHERS);
                break;    
            }
            default:
            {
                break;
            }
        }

        // trigger rerender
        props.taskboard_rerender_func();
    };
    
    const _do_nothing = () => {};

    switch(props.item_index)
    {
        case NOTE_TOOLBAR_ITEMS.NTBI_FONT_COLOUR:
        {
            return (
                <div id="main_tb_item" onMouseDown={_handle_tb_item_click}>
                        <div 
                            id="note_colour_picker"
                            title={props.img_alt_txt}
                        >
                            <_colour_picker_no_button id={"notecp" + props.id} colour={props.note_bg_colour} width={props.tb_root_width} height={props.tb_root_width} 
                            onclick_func={props.note_colour_picker_btn_clicked_func} update_colour_func={props.note_update_colour_func} />
                        </div>
                </div>
            );
        }
        default:
        {
            return (
                <div id="main_tb_item" onMouseDown={_handle_tb_item_click}>
                    <_square_fab>
                        <img 
                            src={props.img_src}
                            title={props.img_alt_txt}
                            alt={props.img_alt_txt} 
                            style={{ width: props.tb_item_width, height: props.tb_item_height }}
                        />
                    </_square_fab>
                </div>
            );
        }
    }
};

/**
 * note toolbar component
 *  
 */
const _note_toolbar = (props) => {
    const ITEM_PERCENTAGE = 0.10;       // toolbar item res percentage rtive to window size (2 percent of orig win)
    const ROOT_PERCENTAGE = 0.10;       // toolbar container res percentage rtive to window size (3 percent of orig win)
    const ITEM_BR_PERCENTAGE = 0.03;   // toolbar item img border radius percentage

    let item_width = (ITEM_PERCENTAGE * props.note_width);
    let item_height = item_width;
    let item_br = (ITEM_BR_PERCENTAGE * props.note_width);

    let root_width = (ROOT_PERCENTAGE * props.note_width);
    let root_height = root_width;
        
    /**************************** Toolbar Stylings begin ***************************/
    let toolbar_styling_top = {
        position: 'fixed', 
        top: props.y_pos + 'px',
        left: props.x_pos + 'px',
        backgroundColor: SELECTED_COLOR_THEME,
        color: 'white',
        padding: '5px 10px',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        zIndex: _get_toolbar_z_index(),
    };

/**************************** Toolbar Stylings end ****************************/
    const _do_nothing = () => 
    {
        return;
    }

    return (
        <div>
            <div id="note_toolbar_root" style={toolbar_styling_top}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={"row"}>
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_BOLD} img_src={bold_img} img_alt_txt={"Bold"} 
                    on_bold_click={_do_nothing}  tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br}
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state} 
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked}
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_ITALIC} img_src={italic_img} img_alt_txt={"Italic"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_UNDERLINE} img_src={underline_img} img_alt_txt={"Underline"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_STRIKETHROUGH} img_src={strikethrough_img} img_alt_txt={"StrikeThrough"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_FONT_FAMILY} img_src={font_family_img} img_alt_txt={"Font Family"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_FONT_SIZE} img_src={font_size_img} img_alt_txt={"Font Size"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_FONT_COLOUR} img_src={font_colour_img} img_alt_txt={"Font Colour"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} note_colour_picker_btn_clicked_func={props.note_colour_picker_btn_clicked_func}
                    note_update_colour_func={props.note_update_colour_func} note_bg_colour={props.note_bg_colour}
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_ALIGNMENT} img_src={alignment_img} img_alt_txt={"Alignment"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_LINK} img_src={link_img} img_alt_txt={"Link"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_EMOJI} img_src={emoji_img} img_alt_txt={"Emoji"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={NOTE_TOOLBAR_ITEMS.NTBI_OTHERS} img_src={others_img} img_alt_txt={"Other options"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    on_italic_click={_do_nothing} taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    note_tb_item_clicked_notif={props.note_toolbar_item_clicked} 
                    />
                </Box>
            </div>            
        </div>
    );
};

export default _note_toolbar;