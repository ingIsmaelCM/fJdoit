export default {
  root: {
    class: [
      // Shape
      "rounded-md",

      // Size
      "min-w-[12rem]",
      "p-1.5",

      // Colors
      "bg-gray-50 dark:bg-gray-700",
      "ring-1 ring-gray-200 dark:ring-gray-700",
    ],
  },
  menu: {
    class: [
      // Spacings and Shape
      "list-none",
      "m-0",
      "p-0",
      "outline-none",
    ],
  },
  menuitem: {
    class: ["relative first:mt-0 mt-1"],
  },
  content: ({ context }) => ({
    class: [
      //Shape
      "rounded-md",

      //  Colors
      {
        "text-gray-500 dark:text-gray-200/70":
          !context.focused && !context.active,
        "text-gray-500 dark:text-gray-200/70 bg-gray-200 dark:bg-black/70":
          context.focused && !context.active,
        "text-gray-900 dark:text-gray-200/80 bg-gray-50 dark:bg-black/70":
          context.focused && context.active,
        "text-gray-900 dark:text-gray-200/80 bg-gray-50 dark:bg-black/70":
          !context.focused && context.active,
      },

      // Hover States
      {
        "hover:bg-gray-50 dark:hover:bg-gray-800": !context.active,
        "hover:bg-gray-100 dark:hover:bg-black/40 text-gray-900 dark:text-gray-200/80":
          context.active,
      },

      // Transitions
      "transition-shadow",
      "duration-200",
    ],
  }),
  action: {
    class: [
      "relative",

      // Font
      "font-semibold",

      // Flexbox
      "flex",
      "items-center",

      // Spacing
      "py-2",
      "px-3",

      // Misc
      "no-underline",
      "overflow-hidden",
      "cursor-pointer",
      "select-none",
    ],
  },
  icon: {
    class: [
      // Spacing
      "mr-2",
      "leading-6",
      "text-sm",
    ],
  },
  label: {
    class: ["leading-none", "text-sm"],
  },
  submenuicon: {
    class: [
      // Position
      "ml-auto",
    ],
  },
  submenu: {
    class: [
      // Size
      "w-full sm:w-48",

      // Spacing
      "p-1.5",
      "m-0 mx-1.5",
      "list-none",

      // Shape
      "shadow-none sm:shadow-md",
      "border-0",

      // Position
      "static sm:absolute",
      "z-10",

      // Color
      "bg-gray-50 dark:bg-gray-700",
    ],
  },
  separator: {
    class: "border-t border-gray-200 dark:border-gray-600 my-1",
  },
};
