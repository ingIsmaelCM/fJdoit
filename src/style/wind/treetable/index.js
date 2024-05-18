export default {
  root: ({ props }) => ({
    class: [
      "relative",
      {
        "flex flex-col h-full": props.scrollHeight === "flex",
      },

      // Shape
      "border-spacing-0 border-separate",
    ],
  }),
  loadingoverlay: {
    class: [
      // Position
      "absolute",
      "top-0 left-0",
      "z-20",

      // Flex & Alignment
      "flex items-center justify-center",

      // Size
      "w-full h-full",

      // Color
      "bg-gray-100/40 dark:bg-gray-700/40",

      // Transition
      "transition duration-200",
    ],
  },
  loadingicon: {
    class: "w-8 h-8 animate-spin",
  },
  wrapper: ({ props }) => ({
    class: [
      // Overflow
      {
        "relative overflow-auto": props.scrollable,
        "overflow-x-auto": props.resizableColumns,
      },
    ],
  }),
  header: ({ props }) => ({
    class: [
      "font-semibold",

      // Shape
      props.showGridlines ? "border-b" : "border-b border-x-0",

      // Spacing
      "py-3.5 px-3",

      // Color
      "bg-gray-50 dark:bg-gray-700",
      "border-gray-300 dark:border-gray-600",
      "text-gray-700 dark:text-gray-200",
    ],
  }),
  footer: {
    class: [
      "font-semibold",

      // Shape
      "border-t-0 border-t border-x-0",

      // Spacing
      "p-4",

      // Color
      "bg-gray-50 dark:bg-gray-700",
      "border-gray-200 dark:border-gray-700",
      "text-gray-700 dark:text-gray-200",
    ],
  },
  table: {
    class: [
      // Table & Width
      "border-collapse table-fixed w-full ",
    ],
  },
  thead: ({ props }) => ({
    class: [
      // Position & Z-index
      {
        "top-0 z-40 sticky": props.scrollable,
      },
    ],
  }),
  tbody: ({ props }) => ({
    class: [
      {
        block: props.scrollable,
      },
    ],
  }),
  tfoot: ({ props }) => ({
    class: [
      // Block Display
      {
        block: props.scrollable,
      },
    ],
  }),
  headerrow: ({ props }) => ({
    class: [
      // Flexbox & Width
      {
        "flex flex-nowrap w-full": props.scrollable,
      },
    ],
  }),
  row: ({ context, props }) => ({
    class: [
      // Flex
      { "flex flex-nowrap w-full": context.scrollable },

      // Color
      "dark:text-gray-200",
      { "bg-gray-50 dark:bg-gray-500/30": context.selected },
      { "bg-gray-50 text-gray-600 dark:bg-gray-700": !context.selected },

      // Hover & Flexbox
      {
        "hover:bg-gray-300/20 hover:text-gray-600":
          context.selectable && !context.selected,
      },
      "focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-500 ring-inset dark:focus:ring-primary-400",

      // Transition
      {
        "transition duration-200":
          (props.selectionMode && !context.selected) || props.rowHover,
      },
    ],
  }),
  headercell: ({ context, props }) => ({
    class: [
      "font-semibold",
      "text-sm",

      // Position
      {
        "sticky z-40":
          context.scrollable &&
          context.scrollDirection === "both" &&
          context.frozen,
      },

      // Flex & Alignment
      {
        "flex flex-1 items-center": context.scrollable,
        "flex-initial shrink-0":
          context.scrollable &&
          context.scrollDirection === "both" &&
          !context.frozen,
      },
      "text-left",

      // Shape
      { "border-r last:border-r-0": context?.showGridlines },
      "border-0 border-b border-solid",

      // Spacing
      context?.size === "small"
        ? "py-2.5 px-2"
        : context?.size === "large"
        ? "py-5 px-4"
        : "py-3.5 px-3",

      // Color
      (props.sortable === "" || props.sortable) && context.sorted
        ? "text-primary-500"
        : "bg-gray-50 text-gray-700",
      (props.sortable === "" || props.sortable) && context.sorted
        ? "dark:text-primary-400"
        : "dark:text-gray-200 dark:bg-gray-700",
      "border-gray-200 dark:border-gray-700 ",

      // States
      "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

      // Transition
      { "transition duration-200": props.sortable === "" || props.sortable },

      // Misc
      {
        "overflow-hidden relative bg-clip-padding":
          context.resizable && !context.frozen,
      },
    ],
  }),
  column: {
    headercell: ({ context, props }) => ({
      class: [
        "font-semibold",
        "text-sm",

        // Position
        {
          "sticky z-40":
            context.scrollable &&
            context.scrollDirection === "both" &&
            context.frozen,
        },

        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0":
            context.scrollable &&
            context.scrollDirection === "both" &&
            !context.frozen,
        },
        "text-left",

        // Shape
        { "border-r last:border-r-0": context?.showGridlines },
        "border-0 border-b border-solid",

        // Spacing
        context?.size === "small"
          ? "py-2.5 px-2"
          : context?.size === "large"
          ? "py-5 px-4"
          : "py-3.5 px-3",

        // Color
        (props.sortable === "" || props.sortable) && context.sorted
          ? "text-primary-500"
          : "bg-gray-50 text-gray-700",
        (props.sortable === "" || props.sortable) && context.sorted
          ? "dark:text-primary-400"
          : "dark:text-gray-200 dark:bg-gray-700",
        "border-gray-200 dark:border-gray-700 ",

        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

        // Transition
        { "transition duration-200": props.sortable === "" || props.sortable },

        // Misc
        {
          "overflow-hidden relative bg-clip-padding":
            context.resizable && !context.frozen,
        },
      ],
    }),
    bodycell: ({ context }) => ({
      class: [
        // Position
        {
          sticky:
            context.scrollable &&
            context.scrollDirection === "both" &&
            context.frozen,
        },

        // Font
        "text-sm",

        // Flex & Alignment
        {
          "flex flex-1 items-center": context.scrollable,
          "flex-initial shrink-0":
            context.scrollable &&
            context.scrollDirection === "both" &&
            !context.frozen,
        },
        "text-left",

        // Shape
        "border-0 border-b border-solid",
        { "last:border-r-0 border-r border-b": context?.showGridlines },

        // Color
        "border-gray-200 dark:border-gray-700",
        { "bg-gray-50 dark:bg-gray-700": !context.selected },

        // Spacing
        context?.size === "small"
          ? "py-2.5 px-2"
          : context?.size === "large"
          ? "py-5 px-4"
          : "py-3.5 px-3",

        // Misc
        "space-nowrap",
        {
          "cursor-pointer": context.selectable,
        },
      ],
    }),
    rowtoggler: {
      class: [
        "relative",

        // Flex & Alignment
        "inline-flex items-center justify-center",
        "text-left align-middle",

        // Spacing
        "m-0 mr-2 p-0",

        // Size
        "w-8 h-8",

        // Shape
        "border-0 rounded-full",

        // Color
        "text-gray-500 dark:text-gray-200/70",
        "bg-transparent",

        // States
        "hover:bg-gray-50 dark:hover:bg-gray-700",
        "focus-visible:outline-none focus-visible:outline-offset-0",
        "focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

        // Transition
        "transition duration-200",

        // Misc
        "overflow-hidden",
        "cursor-pointer select-none",
      ],
    },
    sorticon: ({ context }) => ({
      class: [
        "ml-2 inline-block",
        context.sorted
          ? "fill-primary-700 dark:fill-white/80"
          : "fill-gray-700 dark:fill-white/70",
      ],
    }),
    sortbadge: {
      class: [
        // Flex & Alignment
        "inline-flex items-center justify-center align-middle",

        // Shape
        "rounded-full",

        // Size
        "w-[1.143rem] leading-[1.143rem]",

        // Spacing
        "ml-2",

        // Color
        "text-primary-700 dark:text-gray-200",
        "bg-primary-50 dark:bg-primary-400/30",
      ],
    },
    columnresizer: {
      class: [
        "block",

        // Position
        "absolute top-0 right-0",

        // Sizing
        "w-2 h-full",

        // Spacing
        "m-0 p-0",

        // Color
        "border border-transparent",

        // Misc
        "cursor-col-resize",
      ],
    },
    rowCheckbox: {
      root: {
        class: [
          "relative",

          // Alignment
          "inline-flex",
          "align-middle",

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
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass:
        "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0",
    },
  },
  resizehelper: {
    class: "absolute hidden w-[2px] z-20 bg-blue-300 dark:bg-primary-400",
  },
};
