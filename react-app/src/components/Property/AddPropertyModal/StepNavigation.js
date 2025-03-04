import React from 'react';

const StepNavigation = ({ step, setStep }) => (
  <div>
    {step > 1 && <button onClick={() => setStep(step - 1)}>Previous</button>}
    {step < 5 && <button onClick={() => setStep(step + 1)}>Next</button>}
  </div>
);

export default StepNavigation;