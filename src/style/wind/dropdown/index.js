export default {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",

      // Shape
      "w-full md:w-56",
      "rounded-md",
      "shadow-sm",

      // Color and Background
      "bg-gray-50 dark:bg-gray-800",

      // States
      {
        "ring-1 ring-inset ring-gray-300 dark:ring-gray-700": !state.focused,
        "ring-2 ring-inset ring-primary-500 dark:ring-primary-400":
          state.focused,
      },

      // Misc
      "cursor-default",
      "select-none",
      { "opacity-60": props.disabled, "pointer-events-none": props.disabled },
    ],
  }),
  input: ({ props }) => ({
    class: [
      //Font
      "font-sans",
      "leading-6",
      "sm:text-sm",

      // Display
      "block",
      "flex-auto",

      // Color and Background
      "bg-transparent",
      "border-0",
      {
        "text-gray-800 dark:text-gray-200": props.modelValue != undefined,
        "text-gray-400 dark:text-gray-500": props.modelValue == undefined,
      },
      "placeholder:text-gray-400 dark:placeholder:text-gray-300",

      // Sizing and Spacing
      "w-[1%]",
      "py-1.5 px-3",

      //Shape
      "rounded-none",

      // Transitions
      "transition",
      "duration-200",

      // States
      "focus:outline-none focus:shadow-none",

      // Misc
      "relative",
      "cursor-pointer",
      "overflow-hidden overflow-ellipsis",
      "whitespace-nowrap",
      "appearance-none",
    ],
  }),
  trigger: {
    class: [
      //Font
      "sm:text-sm",

      // Flexbox
      "flex items-center justify-center",
      "shrink-0",

      // Color and Background
      "bg-transparent",
      "text-gray-500",

      // Size
      "w-12",

      // Shape
      "rounded-tr-md",
      "rounded-br-md",
    ],
  },
  panel: {
    class: [
      // Position
      "absolute top-0 left-0",
      "mt-2",

      // Shape
      "border-0",
      "rounded-md",
      "shadow-md",

      // Color
      "bg-gray-50 dark:bg-gray-700",
      "text-gray-800 dark:text-gray-200",
      "ring-1 ring-inset ring-gray-300 dark:ring-gray-700",
    ],
  },
  wrapper: {
    class: [
      // Sizing
      "max-h-[15rem]",

      // Misc
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
          !context.focused && !context.selected && !context.disabled,
      },
      {
        "text-gray-600 dark:text-gray-200/70":
          !context.focused && !context.selected && context.disabled,
      },
      {
        "bg-gray-200 dark:bg-gray-600/60 text-gray-700 dark:text-gray-200":
          context.focused && !context.selected,
      },
      {
        "bg-blue-300 dark:bg-primary-400 text-gray-200 dark:text-gray-700":
          context.focused && context.selected,
      },
      {
        "bg-transparent text-gray-700 dark:text-gray-200":
          !context.focused && context.selected,
      },

      //States
      "hover:bg-blue-300 dark:hover:bg-primary-400 hover:text-gray-800 dark:hover:text-gray-700",
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

      // Misc
      { "pointer-events-none cursor-default": context.disabled },
      { "cursor-pointer": !context.disabled },
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
  header: {
    class: [
      // Spacing
      "p-0",
      "m-0",

      //Shape
      "rounded-tl-md",
      "rounded-tr-md",

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
      "ring-1 ring-inset ring-gray-300 dark:ring-gray-700",

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
  clearicon: {
    class: [
      // Color
      "text-gray-500",

      // Position
      "absolute",
      "top-1/2",
      "right-2",

      // Spacing
      "-mt-2",
    ],
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
