const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                josefin: ["josefin", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "animate-duration": (value) => ({
                        animationDuration: value,
                    }),
                },
                { values: theme("transitionDuration") }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "text-shadow": (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme("textShadow") }
            );
        }),
    ],
};
