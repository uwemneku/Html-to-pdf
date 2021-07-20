

import TemplateCard from './components/TemplateCard';

import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <TemplateCard />
    );
  }
}

class Example extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;