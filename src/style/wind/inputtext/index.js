export default {
  root: ({ props, context, parent }) => ({
    class: [
      // Font
      "font-sans leading-6",

      // Spacing
      "m-0",
      {
        "py-3 px-4 text-lg sm:text-md": props.size == "large",
        "py-1 px-2 sm:text-sm": props.size == "small",
        "py-1.5 px-3 sm:text-sm": props.size == null,
      },

      // Colors
      "text-gray-900 dark:text-gray-200",
      "placeholder:text-gray-400 dark:placeholder:text-gray-300",
      "bg-gray-50 dark:bg-gray-800",
      "shadow-sm",
      {
        "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 ring-offset-0":
          parent.instance.$name !== "InputGroup",
      },

      // Shape
      { "rounded-md": parent.instance.$name !== "InputGroup" },
      {
        "first:rounded-l-md rounded-none last:rounded-r-md":
          parent.instance.$name == "InputGroup",
      },
      {
        "border-0 border-y border-l last:border-r border-gray-300 dark:border-gray-600":
          parent.instance.$name == "InputGroup",
      },
      {
        "first:ml-0 ml-[-1px]":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },
      "appearance-none",

      // Interactions
      {
        "outline-none focus:ring-primary-500 dark:focus:ring-primary-400":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
    ],
  }),
};
