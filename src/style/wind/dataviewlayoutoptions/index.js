export default {
  listbutton: ({ props }) => ({
    class: [
      // Font
      "leading-none",

      // Flex Alignment
      "inline-flex items-center align-bottom text-center",

      // Shape
      "rounded-md rounded-r-none",

      // Spacing
      "px-2.5 py-1.5",

      // Color
      "ring-1 ring-gray-200 dark:ring-gray-700",
      props.modelValue === "list"
        ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200",

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-primary-500 dark:focus:ring-primary-400",
      "hover:bg-gray-200 dark:hover:bg-gray-600/80",

      // Transition
      "transition duration-200",

      // Misc
      "cursor-pointer select-none overflow-hidden",
    ],
  }),
  gridbutton: ({ props }) => ({
    class: [
      // Font
      "leading-none",

      // Flex Alignment
      "inline-flex items-center align-bottom text-center",

      // Shape
      "rounded-md rounded-l-none",

      // Spacing
      "px-2.5 py-1.5",

      // Color
      "ring-1 ring-gray-200 dark:ring-gray-700",
      props.modelValue === "grid"
        ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200",

      // States
      "focus:outline-none focus:outline-offset-0 focus:ring-primary-500 dark:focus:ring-primary-400",
      "hover:bg-gray-200 dark:hover:bg-gray-600/80",

      // Transition
      "transition duration-200",

      // Misc
      "cursor-pointer select-none overflow-hidden",
    ],
  }),
};
