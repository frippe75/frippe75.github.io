import React, { Component, useState  } from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
//import RGL, { WidthProvider } from "react-grid-layout";
import { Responsive, WidthProvider } from 'react-grid-layout';
import TermBee from '../../TermBee'

const ResponsiveGridLayout = WidthProvider(Responsive);


class Terminals extends Component {
  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }
  render() {
    // {lg: layout1, md: layout2, ...}
    const layout = [
      {i: 'a', x: 0, y: 0, w: 6, h: 3, isResizable:true },
      {i: 'b', x: 0, y: 2, w: 6, h: 3},
      {i: 'c', x: 1, y: 4, w: 6, h: 3},
    ];
    var layouts = this.generateLayout();
    return (
      <ResponsiveGridLayout className="layout" layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key="1">
          <TermBee name={"Tutorial"} speed={2} rows={24} cols={80} cast={"termbee.cast"}/>
        </div>
        <div key="2">
          <TermBee name={"Running htop"} loop={true} speed={0.7} rows={24} cols={40} cast={"termbee-htop.cast"}/>
        </div>
        <div key="3"></div>
        <div key="4"></div>
        <div key="5"></div>
        
      </ResponsiveGridLayout>
    )
  }
}

export default Terminals
