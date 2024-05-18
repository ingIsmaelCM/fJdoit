export default {
  root: ({ props }) => ({
    class: [
      "shadow-sm",
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  button: ({ context }) => ({
    class: [
      "relative",
      // Font
      "text-sm",
      "leading-none",

      // Flex Alignment
      "inline-flex items-center align-bottom text-center",

      // Spacing
      "px-2.5 py-1.5",

      // Shape
      "ring-1 ring-gray-200 dark:ring-gray-700",
      "first:rounded-l-md first:rounded-tr-none first:rounded-br-none",
      "last:rounded-tl-none last:rounded-bl-none last:rounded-r-md ",

      // Color
      {
        "bg-gray-50 dark:bg-gray-700": !context.active,
        "text-gray-700 dark:text-gray-200": !context.active,
        "bg-sky-200 dark:bg-sky-700": context.active,
      },

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-primary-500 dark:focus:ring-primary-400 focus:z-10",
      "hover:bg-gray-200 dark:hover:bg-gray-600/80",
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },

      // Transition
      "transition duration-200",

      // Misc
      "cursor-pointer select-none overflow-hidden",
    ],
  }),
  label: {
    class: "font-semibold",
  },
};
