export default {
  root: {
    class: [
      "block",

      // Spacing
      "p-2",

      // Shape
      "rounded-md rounded-lg",

      // Color
      "bg-gray-50 dark:bg-gray-700",
      "text-gray-700 dark:text-gray-200/80",
      "ring-1 ring-inset ring-gray-300 dark:ring-gray-700 ring-offset-0",
    ],
  },
  legend: ({ props }) => ({
    class: [
      // Font
      "font-medium",
      "leading-none",

      //Spacing
      { "p-0": props.toggleable, "px-3 py-1.5": !props.toggleable },

      // Shape
      "rounded-md",

      // Color
      "text-gray-700 dark:text-gray-200/80",

      "bg-gray-50 dark:bg-gray-700",

      // Transition
      "transition-none",

      // States
      { "": props.toggleable },
      {
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-600 ring-inset dark:focus:ring-primary-500":
          props.toggleable,
      },
    ],
  }),
  toggler: ({ props }) => ({
    class: [
      // Alignments
      "flex items-center justify-center",
      "relative",

      //Spacing
      { "px-3 py-1.5": props.toggleable },

      // Shape
      { "rounded-md": props.toggleable },

      // Color
      {
        "text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:text-gray-900":
          props.toggleable,
      },

      // States
      { "hover:text-gray-900 dark:hover:text-gray-100": props.toggleable },
      {
        "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500":
          props.toggleable,
      },

      // Misc
      {
        "transition-none cursor-pointer overflow-hidden select-none":
          props.toggleable,
      },
    ],
  }),
  togglerIcon: {
    class: "mr-2 inline-block",
  },
  legendTitle: {
    class: "flex items-center justify-center leading-none",
  },
  content: {
    class: "p-0",
  },
  transition: {
    enterFromClass: "max-h-0",
    enterActiveClass:
      "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
    enterToClass: "max-h-[1000px]",
    leaveFromClass: "max-h-[1000px]",
    leaveActiveClass:
      "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
    leaveToClass: "max-h-0",
  },
};
