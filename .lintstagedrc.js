// module.exports = {
//     // Run type-check on changes to TypeScript files
//     "**/*.ts?(x)": () => "npm run type-check",
//     // Lint & Prettify TS and JS files
//     "**/*.(ts|tsx|js)": (filenames) => [
//       `npm run lint . ${filenames.join(" ")}`,
//       `npx prettier . --write --location=global ${filenames.join(" ")}`,
//     ],
//   };
module.exports = {
  // Run type-check on changes to TypeScript files
  "**/*.ts?(x)": () => "npm run type-check",
  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|js)": (filenames) => [
    `npm run lint . ${filenames.join(" ")}`, // Remove the unnecessary period before filenames
    `npx prettier --write ${filenames.join(" ")}`, // Update the prettier command
  ],
};
