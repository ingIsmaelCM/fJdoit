export default {
  root: ({ context }) => ({
    class: [
      // Font
      "font-sans leading-6",

      // Spacing
      "m-0 py-1.5 px-3 sm:text-sm",

      // Colors
      "text-gray-700 dark:text-gray-200",
      "placeholder:text-gray-400 dark:placeholder:text-gray-300",
      "bg-gray-50 dark:bg-gray-800",
      "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 ring-offset-0",
      "shadow-sm",

      // Shape
      "rounded-md",
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
