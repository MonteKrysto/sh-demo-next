module.exports = {
  description: "Create a shared component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "component name (required)",
    },
    {
      type: "input",
      name: "folder",
      message: "which folder in /components (default is /components):",
    },
  ],
  actions: [
    {
      type: "add",
      path: "components/{{folder}}/{{properCase name}}.tsx",
      templateFile: "generators/component/Component.tsx.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "components/index.js",
      template: "export { default as {{properCase name}} } from './{{properCase name}}';\n",
      unique: true,
    },
  ],
};
