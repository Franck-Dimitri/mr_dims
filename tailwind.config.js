import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', 'Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                blueprint: {
                    white: '#FFFFFF',
                    gridLight: '#F8FAFC',
                    bluePrimary: '#008cffff',
                    textDark: '#008cffff',
                    darkNight: '#0B0F19',
                    cyan: '#00d9ffff', // Cyan électrique
                    textLight: '#E2E8F0',
                }
            },
        },
    },

    plugins: [forms],
};
