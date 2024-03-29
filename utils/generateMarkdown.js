function generateMarkdown(userResponses, userInfo) {
  // Generate Table of Contents conditionally based on userResponses
  let draftToC = `## Table of Contents`;

  if (userResponses.installation !== "") {
    draftToC += `
    * [Installation](#installation)`;
  }

  if (userResponses.usage !== "") {
    draftToC += `
    * [Usage](#usage)`;
  }

  if (userResponses.contributing !== "") {
    draftToC += `
    * [Contributing](#contributing)`;
  }

  if (userResponses.tests !== "") {
    draftToC += `
    * [Tests](#tests)`;
  }

  // Generate markdowns
  let draftMarkdown = `# ${userResponses.title}
    
    ## Description 
    
    *The what, why, and how:* 
    
    ${userResponses.description}
    `;

  // Add Table of Contents to markdown
  draftMarkdown += draftToC;

  // Add License section since License is required to Table of Contents
  draftMarkdown += `
    * [License](#license)`;

  // Optional Installation section
  if (userResponses.installation !== "") {
    draftMarkdown += `
    
    ## Installation
    
    *Steps required to install project and how to get the development environment running:*
    
    ${userResponses.installation}`;
  }

  // Optional Usage section
  if (userResponses.usage !== "") {
    draftMarkdown += `
    
    ## Usage 
    
    *Instructions and examples for use:*
    
    ${userResponses.usage}`;
  }

  // Optional Contributing section
  if (userResponses.contributing !== "") {
    `
    
    ## Contributing
    
    *If you would like to contribute it, you can follow these guidelines for how to do so.*
    
    ${userResponses.contributing}`;
  }

  // Optional Tests section
  if (userResponses.tests !== "") {
    draftMarkdown += `
    
    ## Tests
    
    *Tests for application and how to run them:*
    
    ${userResponses.tests}`;
  }

  // License section is required
  draftMarkdown += `
    
    ## License
    
    ${userResponses.license}
    `;

  // Questions / About Developer section
  let draftDev = `
    ---
    
    ## Questions?
    
   
    
    For any questions, please contact me with the information below:
   
    GitHub: [@${userInfo.login}](${userInfo.url})
    `;

  // If GitHub email is not null, add to Developer section
  if (userInfo.email !== null) {
    draftDev += `
    Email: ${userInfo.email}
    `;
  }

  // Add developer section to markdown
  draftMarkdown += draftDev;

  // Return markdown
  return draftMarkdown;
}

module.exports = generateMarkdown;
