import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Demo  from './components/Demo';
import Footer from './components/Footer';
import AppTheme from '../shared-theme/AppTheme';
import { _get_selected_color_theme } from '../common/components/global_settings';

export default function _homepage(props) {
  const [, _re_render_homepage] = React.useState(0);
    
  // manually trigger re-render
  const _home_rerender = () => {
    _re_render_homepage((prev) => {
      return ((prev >= 1000000) ? 0 : (prev + 1));
    });
  };
  
  return (
    <AppTheme {...props}>
      <div 
        style={{ 
          height: "100vh",
          width: "100vw",
          backgroundColor: _get_selected_color_theme().bg_colour,
        }}
      >
        <CssBaseline enableColorScheme />
        <AppAppBar rerender_func={_home_rerender}/>
        <Hero />
        <div>
          {/* <LogoCollection /> */}
          {/* <Features /> */}
          <Demo />
          <Divider />
          {/* <Testimonials /> */}
          <Divider />
          <Highlights />
          <Divider />
          {/* <Pricing /> */}
          <Divider />
          {/* <FAQ /> */}
          <Divider />
          <Footer />
        </div>
      </div>
    </AppTheme>
  );
}
