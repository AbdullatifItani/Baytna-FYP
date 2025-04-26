import React from 'react';

const StepNavigation = ({ step, setStep }) => (
  <div className="add-property-step-navigation">
    <button
      className="step-btn step-prev"
      onClick={() => setStep(step - 1)}
      disabled={step === 1}
    >
      Previous
    </button>
    <span className="step-label">Step {step} of 5</span>
    <button
      className="step-btn step-next"
      onClick={() => setStep(step + 1)}
      disabled={step === 5}
    >
      Next
    </button>
  </div>
);

export default StepNavigation;