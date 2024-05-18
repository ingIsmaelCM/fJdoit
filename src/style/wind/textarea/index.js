export default {
  root: ({ context }) => ({
    class: [
      // Font
      "font-sans leading-6",
      "sm:text-sm",

      // Spacing
      "m-0",
      "py-1.5 px-3",

      // Shape
      "rounded-md",
      "appearance-none",

      // Colors
      "text-gray-900 dark:text-gray-200",
      "placeholder:text-gray-400 dark:placeholder:text-gray-300",
      "bg-gray-50 dark:bg-gray-700",
      "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 ring-offset-0",
      "shadow-sm",

      // States
      {
        "outline-none focus:ring-primary-500 dark:focus:ring-primary-400":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },

      // Misc
      "appearance-none",
      "transition-colors duration-200",
    ],
  }),
};
