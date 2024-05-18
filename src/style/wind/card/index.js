export default {
  root: {
    class: [
      //Shape
      "rounded-lg",
      "shadow-md",

      //Color
      "bg-gray-50 dark:bg-gray-700",
      "text-gray-700 dark:text-gray-200/80",
    ],
  },
  header: {
    class: ["border-b border-gray-200 dark:border-gray-700"],
  },
  body: {
    class: "py-5",
  },
  title: {
    class: "text-lg font-medium mb-2 px-5 md:px-6",
  },
  subtitle: {
    class: [
      //Spacing
      "mb-1 px-5 md:px-6",

      //Color
      "text-gray-600 dark:text-gray-200/60",
    ],
  },
  content: {
    class: "py-6 px-5 md:px-6",
  },
  footer: {
    class: [
      "px-5 md:px-6 pt-5 pb-0",
      "border-t border-gray-200 dark:border-gray-700",
    ],
  },
};
