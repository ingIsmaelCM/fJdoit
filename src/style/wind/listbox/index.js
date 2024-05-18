export default {
  root: {
    class: [
      // Sizing and Shape
      "min-w-[12rem]",
      "rounded-md",
      // Spacing

      // Colors
      "bg-gray-50 dark:bg-gray-700",
      "text-gray-700 dark:text-gray-200",
      "ring-1 ring-gray-200 dark:ring-gray-700",
    ],
  },
  wrapper: {
    class: [
      // Overflow
      "overflow-auto",
    ],
  },
  list: {
    class: "py-1 list-none m-0",
  },
  item: ({ context }) => ({
    class: [
      // Font
      "sm:text-sm",
      "leading-none",
      { "font-normal": !context.selected, "font-bold": context.selected },

      // Position
      "relative",

      // Shape
      "border-0",
      "rounded-none",

      // Spacing
      "m-0",
      "py-2 px-4",

      // Color
      {
        "text-gray-700 dark:text-gray-200":
          !context.focused && !context.selected,
      },
      {
        "bg-gray-200 dark:bg-gray-600/60 text-gray-700 dark:text-gray-200":
          context.focused && !context.selected,
      },
      {
        "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200":
          context.focused && context.selected,
      },
      {
        "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200":
          !context.focused && context.selected,
      },

      //States
      "hover:bg-blue-300 dark:hover:bg-primary-400 hover:text-gray-800 dark:hover:text-gray-700",
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

      // Misc
      "cursor-pointer",
      "overflow-hidden",
      "whitespace-nowrap",
    ],
  }),
  itemgroup: {
    class: [
      //Font
      "font-bold",
      "sm:text-sm",

      // Spacing
      "m-0",
      "py-2 px-4",

      // Color
      "text-gray-800 dark:text-gray-200",
      "bg-gray-50 dark:bg-gray-600/80",

      // Misc
      "cursor-auto",
    ],
  },
  header: {
    class: [
      // Spacing
      "p-0",
      "m-0",

      //Shape
      "rounded-tl-md",
      "rounded-tr-md",
      "border-b border-gray-200 dark:border-gray-700",

      // Color
      "text-gray-700 dark:text-gray-200",
      "bg-gray-100 dark:bg-gray-700",
    ],
  },
  filtercontainer: {
    class: "relative",
  },
  filterinput: {
    class: [
      // Font
      "font-sans",
      "leading-none",
      "sm:text-sm",

      // Sizing
      "py-1.5 px-3",
      "pr-7",
      "-mr-7",
      "w-full",

      //Color
      "text-gray-700 dark:text-gray-200",
      "bg-gray-50 dark:bg-gray-700",
      "placeholder:text-gray-400",

      // Shape
      "border-0",
      "rounded-tl-md",
      "rounded-tr-md",
      "appearance-none",

      // States
      "focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0",
      "focus:ring-primary-600 dark:focus:ring-primary-500",

      // Misc
      "appearance-none",
    ],
  },
  filtericon: {
    class: ["absolute", "top-1/2 right-3", "-mt-2"],
  },
  emptymessage: {
    class: [
      // Font
      "leading-none",
      "sm:text-sm",

      // Spacing
      "py-2 px-4",

      // Color
      "text-gray-800 dark:text-gray-200",
      "bg-transparent",
    ],
  },
};
