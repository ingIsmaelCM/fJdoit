export default {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      "inline-flex",
      "relative",

      // Shape
      "w-full md:max-w-[20rem]",
      "rounded-md",
      "shadow-sm",

      // Color and Background
      "bg-gray-50 dark:bg-gray-700",

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
  labelContainer: {
    class: "overflow-hidden flex flex-auto cursor-pointer",
  },
  label: ({ props }) => ({
    class: [
      "block leading-5",

      props.display === "chip" && props?.modelValue?.length > 0
        ? "py-1 px-3"
        : "py-1.5 px-3",

      // Color
      {
        "text-gray-800 dark:text-gray-200": props.modelValue,
        "text-gray-400 dark:text-gray-500": !props.modelValue,
      },
      "placeholder:text-gray-400 dark:placeholder:text-gray-300",

      // Transitions
      "transition duration-200",

      // Misc
      "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis",
    ],
  }),
  token: {
    class: [
      // Flexbox
      "inline-flex items-center",

      // Spacing
      "py-0.5 px-3 mr-2",

      // Shape
      "rounded-[1.14rem]",

      // Colors
      "text-gray-700 dark:text-gray-200/70",
      "bg-gray-200 dark:bg-gray-700",
    ],
  },
  removeTokenIcon: {
    class: [
      // Shape
      "rounded-md leading-6",

      // Spacing
      "ml-2",

      // Size
      "w-4 h-4",

      // Transition
      "transition duration-200 ease-in-out",

      // Misc
      "cursor-pointer",
    ],
  },
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
  header: {
    class: [
      "flex items-center justify-between",
      // Spacing
      "py-2 px-4",
      "m-0",

      //Shape
      "border-b",
      "rounded-tl-md",
      "rounded-tr-md",

      // Color
      "text-gray-700 dark:text-gray-200",
      "bg-gray-50 dark:bg-gray-700",
      "border-gray-200 dark:border-gray-700",
    ],
  },
  headerCheckboxContainer: {
    class: [
      "relative",

      // Alignment
      "inline-flex",
      "align-bottom",

      // Size
      "w-4",
      "h-4",

      // Spacing
      "mr-2",

      // Misc
      "cursor-default",
      "select-none",
    ],
  },
  headerCheckbox: ({ context, state }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",

      // Size
      "w-4",
      "h-4",

      // Shape
      "rounded",
      "border",

      // Colors
      "text-gray-600",
      {
        "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-700":
          !context?.selected,
        "border-primary-500 bg-blue-300 dark:border-primary-400 dark:bg-primary-400":
          context?.selected,
      },

      {
        "outline-offset-0 ring-1 ring-primary-500 dark:ring-primary-400":
          state.focused,
      },
    ],
  }),
  headerCheckbox: {
    root: {
      class: [
        "relative",

        // Alignment
        "inline-flex",
        "align-bottom",

        // Size
        "w-4",
        "h-4",

        // Spacing
        "mr-2",

        // Misc
        "cursor-default",
        "select-none",
      ],
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",

        // Size
        "w-4",
        "h-4",

        // Shape
        "rounded",
        "border",

        // Colors
        "text-gray-600",
        {
          "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-700":
            !context.checked,
          "border-primary-500 bg-blue-300 dark:border-primary-400 dark:bg-primary-400":
            context.checked,
        },

        {
          "ring-2 ring-primary-500 dark:ring-primary-400":
            !props.disabled && context.focused,
          "cursor-default opacity-60": props.disabled,
        },

        // States
        {
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400":
            !props.disabled,
          "cursor-default opacity-60": props.disabled,
        },

        // Transitions
        "transition-colors",
        "duration-200",
      ],
    }),
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
        "rounded",
        "border",

        // Shape
        "opacity-0",
        "rounded-md",
        "outline-none",
        "border-2 border-gray-300 dark:border-gray-700",

        // Misc
        "appareance-none",
      ],
    },
    icon: {
      class: [
        // Font
        "text-normal",

        // Size
        "w-3",
        "h-3",

        // Colors
        "text-gray-200 dark:text-gray-900",

        // Transitions
        "transition-all",
        "duration-200",
      ],
    },
  },
  itemCheckbox: {
    root: {
      class: [
        "relative",

        // Alignment
        "inline-flex",
        "align-bottom",

        // Size
        "w-4",
        "h-4",

        // Spacing
        "mr-2",

        // Misc
        "cursor-default",
        "select-none",
      ],
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        "flex",
        "items-center",
        "justify-center",

        // Size
        "w-4",
        "h-4",

        // Shape
        "rounded",
        "border",

        // Colors
        "text-gray-600",
        {
          "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-700":
            !context.checked,
          "border-primary-500 bg-blue-300 dark:border-primary-400 dark:bg-primary-400":
            context.checked,
        },

        {
          "ring-2 ring-primary-500 dark:ring-primary-400":
            !props.disabled && context.focused,
          "cursor-default opacity-60": props.disabled,
        },

        // States
        {
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400":
            !props.disabled,
          "cursor-default opacity-60": props.disabled,
        },

        // Transitions
        "transition-colors",
        "duration-200",
      ],
    }),
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
        "rounded",
        "border",

        // Shape
        "opacity-0",
        "rounded-md",
        "outline-none",
        "border-2 border-gray-300 dark:border-gray-700",

        // Misc
        "appareance-none",
      ],
    },
    icon: {
      class: [
        // Font
        "text-normal",

        // Size
        "w-3",
        "h-3",

        // Colors
        "text-gray-200 dark:text-gray-900",

        // Transitions
        "transition-all",
        "duration-200",
      ],
    },
  },
  closeButton: {
    class: [
      "relative",

      // Flexbox and Alignment
      "flex items-center justify-center",

      // Size and Spacing
      "mr-2",
      "last:mr-0",
      "w-6 h-6",

      // Shape
      "border-0",
      "rounded-full",

      // Colors
      "text-gray-500",
      "bg-transparent",

      // Transitions
      "transition duration-200 ease-in-out",

      // States
      "hover:text-gray-700 dark:hover:text-gray-200",
      "hover:bg-gray-100 dark:hover:bg-gray-700",
      "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
      "focus:ring-primary-500 dark:focus:ring-primary-400",

      // Misc
      "overflow-hidden",
    ],
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",

      // Size
      "w-3",
      "h-3",
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

      // Flexbox
      "flex items-center",

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
        "bg-blue-300 dark:bg-primary-400 text-gray-200 dark:text-gray-700":
          context.focused && context.selected,
      },
      {
        "bg-transparent text-gray-700 dark:text-gray-200":
          !context.focused && context.selected,
      },

      //States
      "hover:bg-blue-300 dark:hover:bg-primary-400 hover:text-gray-800 dark:hover:text-gray-700",

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
  filtercontainer: {
    class: "relative w-full mr-2",
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
      "rounded-md",
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
      "right-12",

      // Spacing
      "-mt-2",
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
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
