const defaultTheme = require("tailwindcss/defaultTheme");

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

    daisyui: {
        themes: ["light", "emerald"],
    },

    plugins: [require("tailwindcss-animated"), require("@tailwindcss/forms")],
};
