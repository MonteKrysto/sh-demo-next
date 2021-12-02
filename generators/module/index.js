module.exports = {
  description: "Create a module",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Module name (required)",
      validate: value => {
        if (/.+/.test(value)) {
          return true;
        }
        return "Module name is required";
      },
    }
  ],
  actions: [
{
      type: "addMany",
      destination: "modules/{{name}}",
      base: `generators/module`,
      templateFiles: ["generators/module/**/*.***.hbs"],
    },
  ],
};
