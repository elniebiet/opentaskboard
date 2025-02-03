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
import Footer from './components/Footer';
import AppTheme from '../shared-theme/AppTheme';
import { SELECTED_COLOR_THEME } from '../common/globals';

export default function _homepage(props) {
  return (
    <AppTheme {...props}>
      <div 
        style={{ 
          height: "100vh",
          width: "100vw",
          backgroundColor: SELECTED_COLOR_THEME,
        }}
      >
        <CssBaseline enableColorScheme />
        <AppAppBar _on_update_route={props._on_update_route}/>
        <Hero />
        <div>
          {/* <LogoCollection /> */}
          {/* <Features /> */}
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
