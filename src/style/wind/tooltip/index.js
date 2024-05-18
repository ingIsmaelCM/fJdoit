export default {
  root: ({ context, props }) => ({
    class: [
      // Position
      "absolute",
      "!z-[900]",
      // Spacing
      {
        "px-1.5":
          context?.right ||
          context?.left ||
          (!context?.right &&
            !context?.left &&
            !context?.top &&
            !context?.bottom),
        "py-1.5": context?.top || context?.bottom,
      },
    ],
  }),
  arrow: {
    class: "hidden",
  },
  text: {
    class: [
      // Size
      "text-xs leading-none",

      // Spacing
      "p-2",

      // Shape
      "rounded-md",

      // Color
      "text-gray-900 dark:text-gray-200/80",
      "bg-gray-50 dark:bg-gray-700",
      "ring-1 ring-inset ring-gray-200 dark:ring-gray-800 ring-offset-0",

      // Misc
      "whitespace-pre-line",
      "break-words",

    ],
  },
};
