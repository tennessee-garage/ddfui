import React from 'react';
import { Form } from 'react-bootstrap';
  
export default function ProcessorChooser({ processors, value, onChange }) {
    const processorOptions = processors.map((processor) => {
        return (
            <option key={processor.name} value={processor.name}>
                {processor.name}
            </option>
        );
    });

    return (
      <Form.Group>
        <Form.Control as="select" value={value} onChange={onChange}>
          <option value="" />
          {processorOptions}
        </Form.Control>
      </Form.Group>
    );
};