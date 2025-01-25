import * as React from 'react';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import pointer_img from '../../res/imgs/img_pointer.png';
import sticky_notes_img from '../../res/imgs/img_stk_100x100.png';
import comment_img from '../../res/imgs/img_comment_100x100.png'; 
import board_marker_img from '../../res/imgs/img_board_marker_100x100.png'; 
import eraser_img from '../../res/imgs/img_eraser_100x100.png'; 
import shapes_img from '../../res/imgs/img_shapes_100x100.png'; 
import fill_img from '../../res/imgs/img_fill_100x100.png'; 

const _add_toolbar_item = (props) => 
{
    let w = props.tb_root_width + 'px';
    let h = props.tb_root_height + 'px';

    const _square_fab = styled(Fab)({
        borderRadius: '8px', 
        width: w,       
        height: h,      
        backgroundColor: '#ffffff', 
        '&:hover': { 
            backgroundColor: '#115293', 
        },
    });

    return (
        //TODO: <Draggable>
            <_square_fab>
                <img 
                    src={props.img_src}
                    alt={props.img_alt_txt} 
                    style={{ width: props.tb_item_width, height: props.tb_item_height }} 
                />
            </_square_fab>
        // </Draggable>
    );
};

let toolbar_styling_top = {
    position: 'fixed', 
    top: '10px', 
    left: '50%', 
    transform: 'translateX(-50%)', // Offset the div by half its width
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

let toolbar_styling_left = {
    position: 'fixed',
    top: '50%', 
    left: '10px', 
    transform: 'translateY(-50%)',
    backgroundColor: '#1976d2', 
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0 8px 8px 0',
    boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
};

const _templates_toolbar = (props) => {
    let location = props.pos; // ideally top or left
    let flex_dir = "column";
    let toolbar_styling = toolbar_styling_left;

    let ITEM_PERCENTAGE = 0.02; // toolbar item res percentage rtive to window size (2 percent of orig win)
    let ROOT_PERCENTAGE = 0.03; // toolbar container res percentage rtive to window size (3 percent of orig win)

    let item_width = (ITEM_PERCENTAGE * props.win_width);
    let item_height = item_width;

    let root_width = (ROOT_PERCENTAGE * props.win_width);
    let root_height = root_width;
        
    if(location == "top")
    {
        flex_dir = "row";
        toolbar_styling = toolbar_styling_top;
    }
    else if(location == "left")
    {
        flex_dir = "column";
        toolbar_styling = toolbar_styling_left;
    }

    return (
        <div id="sprint_planning_template_root" style={toolbar_styling}>
            <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={flex_dir}>
                <_add_toolbar_item img_src={pointer_img} img_alt_txt={"Cursor"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} />
                <_add_toolbar_item img_src={sticky_notes_img} img_alt_txt={"Sticky Note"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height}/>
                <_add_toolbar_item img_src={comment_img} img_alt_txt={"Comment"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height}/>
                <_add_toolbar_item img_src={board_marker_img} img_alt_txt={"Marker"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height}/>
                <_add_toolbar_item img_src={shapes_img} img_alt_txt={"Shape"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height}/>
                <_add_toolbar_item img_src={fill_img} img_alt_txt={"Fill"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height}/>
                <_add_toolbar_item img_src={eraser_img} img_alt_txt={"Eraser"} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height}/>
            </Box>
        </div>
    );
};

export default _templates_toolbar;