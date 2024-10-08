export default {
  root: {
    class: "relative inline-block",
  },
  button: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",

      // Positioning
      "absolute",

      // Shape
      "inset-0 opacity-0 transition-opacity duration-300",

      // Color
      "bg-transparent text-gray-100",

      // States
      "hover:opacity-100 hover:cursor-pointer hover:bg-gray-700 hover:bg-opacity-50",
    ],
  },
  mask: {
    class: [
      // Flexbox & Alignment
      "flex items-center justify-center",

      // Positioning
      "fixed top-0 left-0",

      // Sizing
      "w-full h-full",

      // Color
      "bg-gray-700/90",
    ],
  },
  toolbar: {
    class: [
      // Flexbox
      "flex",

      // Positioning
      "absolute top-0 right-0",

      // Spacing
      "p-4",
    ],
  },
  rotaterightbutton: {
    class: [
      "z-20",

      // Flexbox & Alignment
      "flex justify-center items-center",

      // Size
      "w-12 h-12",

      // Spacing
      "mr-2",

      // Shape
      "rounded-full",

      // Color
      "text-gray-200 bg-transparent",

      // States
      "hover:text-gray-200 hover:bg-gray-50/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

      // Transition
      "transition duration-200 ease-in-out",
    ],
  },
  rotaterighticon: {
    class: "w-6 h-6",
  },
  rotateleftbutton: {
    class: [
      "z-20",

      // Flexbox & Alignment
      "flex justify-center items-center",

      // Size
      "w-12 h-12",

      // Spacing
      "mr-2",

      // Shape
      "rounded-full",

      // Color
      "text-gray-200 bg-transparent",

      // States
      "hover:text-gray-200 hover:bg-gray-50/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

      // Transition
      "transition duration-200 ease-in-out",
    ],
  },
  rotatelefticon: {
    class: "w-6 h-6",
  },
  zoomoutbutton: {
    class: [
      "z-20",

      // Flexbox & Alignment
      "flex justify-center items-center",

      // Size
      "w-12 h-12",

      // Spacing
      "mr-2",

      // Shape
      "rounded-full",

      // Color
      "text-gray-200 bg-transparent",

      // States
      "hover:text-gray-200 hover:bg-gray-50/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

      // Transition
      "transition duration-200 ease-in-out",
    ],
  },
  zoomouticon: {
    class: "w-6 h-6",
  },
  zoominbutton: {
    class: [
      "z-20",

      // Flexbox & Alignment
      "flex justify-center items-center",

      // Size
      "w-12 h-12",

      // Spacing
      "mr-2",

      // Shape
      "rounded-full",

      // Color
      "text-gray-200 bg-transparent",

      // States
      "hover:text-gray-200 hover:bg-gray-50/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

      // Transition
      "transition duration-200 ease-in-out",
    ],
  },
  zoominicon: {
    class: "w-6 h-6",
  },
  closebutton: {
    class: [
      "z-20",

      // Flexbox & Alignment
      "flex justify-center items-center",

      // Size
      "w-12 h-12",

      // Spacing
      "mr-2",

      // Shape
      "rounded-full",

      // Color
      "text-gray-200 bg-transparent",

      // States
      "hover:text-gray-200 hover:bg-gray-50/10",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

      // Transition
      "transition duration-200 ease-in-out",
    ],
  },
  closeicon: {
    class: "w-6 h-6",
  },
  transition: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass: "transition-all duration-150 ease-in-out",
    leaveActiveClass: "transition-all duration-150 ease-in",
    leaveToClass: "opacity-0 scale-75",
  },
};
