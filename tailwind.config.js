export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0484ac",
                secondary: "#067889",
                dark:"#2f2d2d",
                soft: "#5494ac",
                accent: "#94bbcd"
            }
        },

    },
    plugins: [],
    darkMode: "selector",
}