import React from 'react';

const XSSVulnerableComponent = ({ userInput }) => {
  return (
    <div>
      <h1>Unsafe Rendering of User Input</h1>
      <p>User input:</p>
      {/* Directly injecting user input into the DOM without sanitization */}
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
    </div>
  );
};

export default XSSVulnerableComponent;
