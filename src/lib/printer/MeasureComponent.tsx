import React, { useRef, useEffect, useState } from 'react';

const MeasureComponent = () => {
  const [height, setHeight] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      // Medir a altura do elemento
      setHeight(elementRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      <div ref={elementRef} style={{ padding: '20px', backgroundColor: '#eee' }}>
        <h1>Hello, world!</h1>
        <p>This is a sample component.</p>
      </div>
      <p>Height of the element: {height}px</p>
    </div>
  );
};

export default MeasureComponent;
