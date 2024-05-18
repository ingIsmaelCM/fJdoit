export default {
  root: {
    class: [
      "relative",

      // Alignment
      "inline-flex",
      "align-bottom",

      // Misc
      "cursor-pointer",
      "select-none",
    ],
  },
  box: ({ props }) => ({
    class: [
      // Alignments
      "items-center inline-flex flex-1 text-center align-bottom justify-center",

      // Sizes & Spacing
      "px-2.5 py-0.5",
      "text-sm",

      // Shapes
      "rounded-md shadow-sm",

      // Colors
      "text-gray-700 dark:text-gray-200",
      "ring-1 ring-gray-200 dark:ring-gray-700",
      {
        "bg-gray-200 dark:bg-gray-800 ": !props.modelValue,
        "bg-gray-50 dark:text-gray-600": props.modelValue,
      },

      // States
      "peer-hover:bg-gray-200 dark:peer-hover:bg-gray-600/80",
      {
        "peer-focus-visible:ring-2 peer-focus-visible:ring-inset peer-focus-visible:ring-sky-500 dark:peer-focus-visible:ring-sky-400":
          !props.disabled,
      },

      // Transitions
      "transition-all duration-200",

      // Misc
      {
        "cursor-pointer": !props.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  label: {
    class: "font-semibold text-center w-full",
  },
  input: {
    class: [
      "peer",

      // Size
      "w-full ",
      "h-full",

      // Position
      "absolute",
      "top-0 left-0",
      "z-10",

      // Spacing
      "p-0",
      "m-0",

      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border border-gray-200 dark:border-gray-700",

      // Misc
      "appareance-none",
      "cursor-pointer",
    ],
  },
  icon: {
    class: [" mr-2", "text-gray-700 dark:text-gray-200"],
  },
};
