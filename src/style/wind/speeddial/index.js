export default {
    root: ' flex gap-2',
    pcButton: {
        root: ({ props, context, parent }) => ({
            class: [
                'relative',
                'z-20',

                // Alignments
                'items-center inline-flex text-center align-bottom justify-center',

                // Sizes & Spacing
                'leading-[normal]',
                'w-16 h-16 p-0 py-3',

                // Shapes
                'rounded-full',
                'shadow-md',

                // Link Button
                { 'text-primary-600 bg-transparent border-transparent': props.link },

                // Plain Button
                { 'text-white bg-gray-500 border border-gray-500': props.plain && !props.outlined && !props.text },
                // Plain Text Button
                { 'text-primary-500': props.plain && props.text },
                // Plain Outlined Button
                { 'text-primary-500 border border-gray-500': props.plain && props.outlined },

                // Text Button
                { 'bg-transparent border-transparent': props.text && !props.plain },

                // Outlined Button
                { 'bg-transparent border': props.outlined && !props.plain },

                // --- Severity Buttons ---

                // Primary Button
                {
                    'text-primary-contrast': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                    'bg-primary': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                    'border border-primary': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                },
                // Primary Text Button
                { 'text-primary': props.text && props.severity === null && !props.plain },
                // Primary Outlined Button
                { 'text-primary border border-primary': props.outlined && props.severity === null && !props.plain },

                // Secondary Button
                {
                    'text-white dark:text-primary-900': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain,
                    'bg-primary-500 dark:bg-primary-400': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain,
                    'border border-primary-500 dark:border-primary-400': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain
                },
                // Secondary Text Button
                { 'text-primary-500 dark:text-primary-300': props.text && props.severity === 'secondary' && !props.plain },
                // Secondary Outlined Button
                { 'text-primary-500 dark:text-primary-300 border border-primary-500 hover:bg-primary-300/20': props.outlined && props.severity === 'secondary' && !props.plain },

                // Success Button
                {
                    'text-white dark:text-green-900': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
                    'bg-green-500 dark:bg-green-400': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
                    'border border-green-500 dark:border-green-400': props.severity === 'success' && !props.text && !props.outlined && !props.plain
                },
                // Success Text Button
                { 'text-green-500 dark:text-green-400': props.text && props.severity === 'success' && !props.plain },
                // Success Outlined Button
                { 'text-green-500 border border-green-500 hover:bg-green-300/20': props.outlined && props.severity === 'success' && !props.plain },

                // Info Button
                {
                    'text-white dark:text-primary-900': props.severity === 'info' && !props.text && !props.outlined && !props.plain,
                    'bg-blue-500 dark:bg-blue-400': props.severity === 'info' && !props.text && !props.outlined && !props.plain,
                    'border border-blue-500 dark:border-blue-400': props.severity === 'info' && !props.text && !props.outlined && !props.plain
                },
                // Info Text Button
                { 'text-blue-500 dark:text-blue-400': props.text && props.severity === 'info' && !props.plain },
                // Info Outlined Button
                { 'text-blue-500 border border-blue-500 hover:bg-blue-300/20 ': props.outlined && props.severity === 'info' && !props.plain },

                // Warning Button
                {
                    'text-white dark:text-primary-900': props.severity === 'warn' && !props.text && !props.outlined && !props.plain,
                    'bg-orange-500 dark:bg-orange-400': props.severity === 'warn' && !props.text && !props.outlined && !props.plain,
                    'border border-orange-500 dark:border-orange-400': props.severity === 'warn' && !props.text && !props.outlined && !props.plain
                },
                // Warning Text Button
                { 'text-orange-500 dark:text-orange-400': props.text && props.severity === 'warn' && !props.plain },
                // Warning Outlined Button
                { 'text-orange-500 border border-orange-500 hover:bg-orange-300/20': props.outlined && props.severity === 'warn' && !props.plain },

                // Help Button
                {
                    'text-white dark:text-primary-900': props.severity === 'help' && !props.text && !props.outlined && !props.plain,
                    'bg-purple-500 dark:bg-purple-400': props.severity === 'help' && !props.text && !props.outlined && !props.plain,
                    'border border-purple-500 dark:border-purple-400': props.severity === 'help' && !props.text && !props.outlined && !props.plain
                },
                // Help Text Button
                { 'text-purple-500 dark:text-purple-400': props.text && props.severity === 'help' && !props.plain },
                // Help Outlined Button
                { 'text-purple-500 border border-purple-500 hover:bg-purple-300/20': props.outlined && props.severity === 'help' && !props.plain },

                // Danger Button
                {
                    'text-white dark:text-primary-900': props.severity === 'danger' && !props.text && !props.outlined && !props.plain,
                    'bg-red-500 dark:bg-red-400': props.severity === 'danger' && !props.text && !props.outlined && !props.plain,
                    'border border-red-500 dark:border-red-400': props.severity === 'danger' && !props.text && !props.outlined && !props.plain
                },
                // Danger Text Button
                { 'text-red-500 dark:text-red-400': props.text && props.severity === 'danger' && !props.plain },
                // Danger Outlined Button
                { 'text-red-500 border border-red-500 hover:bg-red-300/20': props.outlined && props.severity === 'danger' && !props.plain },
                // Contrast Button
                {
                    'text-white dark:text-primary-900': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain,
                    'bg-primary-900 dark:bg-primary-0': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain,
                    'border border-primary-900 dark:border-primary-0': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain
                },
                // Contrast Text Button
                { 'text-primary-900 dark:text-primary-0': props.text && props.severity === 'contrast' && !props.plain },
                // Contrast Outlined Button
                { 'text-primary-900 dark:text-primary-0 border border-primary-900 dark:border-primary-0': props.outlined && props.severity === 'contrast' && !props.plain },

                // --- Severity Button States ---
                'focus:outline-none focus:outline-offset-0 focus:ring',

                // Link
                { 'focus:ring-primary': props.link },

                // Plain
                { 'hover:bg-gray-600 hover:border-gray-600': props.plain && !props.outlined && !props.text },
                // Text & Outlined Button
                { 'hover:bg-primary-300/20': props.plain && (props.text || props.outlined) },

                // Primary
                { 'hover:bg-primary-emphasis hover:border-primary-emphasis': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-primary': props.severity === null },
                // Text & Outlined Button
                { 'hover:bg-primary-300/20': (props.text || props.outlined) && props.severity === null && !props.plain },

                // Secondary
                { 'hover:bg-primary-600 dark:hover:bg-primary-300 hover:border-primary-600 dark:hover:border-primary-300': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-primary-400/50 dark:focus:ring-primary-300/50': props.severity === 'secondary' },
                // Text & Outlined Button
                { 'hover:bg-primary-300/20': (props.text || props.outlined) && props.severity === 'secondary' && !props.plain },

                // Success
                { 'hover:bg-green-600 dark:hover:bg-green-300 hover:border-green-600 dark:hover:border-green-300': props.severity === 'success' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-green-400/50 dark:focus:ring-green-300/50': props.severity === 'success' },
                // Text & Outlined Button
                { 'hover:bg-green-300/20': (props.text || props.outlined) && props.severity === 'success' && !props.plain },

                // Info
                { 'hover:bg-blue-600 dark:hover:bg-blue-300 hover:border-blue-600 dark:hover:border-blue-300': props.severity === 'info' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-blue-400/50 dark:focus:ring-blue-300/50': props.severity === 'info' },
                // Text & Outlined Button
                { 'hover:bg-blue-300/20': (props.text || props.outlined) && props.severity === 'info' && !props.plain },

                // Warning
                { 'hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300': props.severity === 'warn' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-orange-400/50 dark:focus:ring-orange-300/50': props.severity === 'warn' },
                // Text & Outlined Button
                { 'hover:bg-orange-300/20': (props.text || props.outlined) && props.severity === 'warn' && !props.plain },

                // Help
                { 'hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300': props.severity === 'help' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-purple-400/50 dark:focus:ring-purple-300/50': props.severity === 'help' },
                // Text & Outlined Button
                { 'hover:bg-purple-300/20': (props.text || props.outlined) && props.severity === 'help' && !props.plain },

                // Danger
                { 'hover:bg-red-600 dark:hover:bg-red-300 hover:border-red-600 dark:hover:border-red-300': props.severity === 'danger' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-red-400/50 dark:focus:ring-red-300/50': props.severity === 'danger' },
                // Text & Outlined Button
                { 'hover:bg-red-300/20': (props.text || props.outlined) && props.severity === 'danger' && !props.plain },
                // Contrast
                { 'hover:bg-primary-800 dark:hover:bg-primary-100 hover:border-primary-800 dark:hover:border-primary-100': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain },
                { 'focus:ring-primary-500 dark:focus:ring-primary-400': props.severity === 'contrast' },
                // Text & Outlined Button
                { 'hover:bg-primary-900/10 dark:hover:bg-[rgba(255,255,255,0.03)]': (props.text || props.outlined) && props.severity === 'contrast' && !props.plain },
                // Disabled
                { 'opacity-60 pointer-events-none cursor-default': context.disabled },

                // Transitions
                'transition duration-200 ease-in-out',
                parent.state.d_visible ? 'rotate-45' : 'rotate-0',

                // Misc
                'cursor-pointer overflow-hidden select-none'
            ]
        }),
        label: ({ props }) => ({
            class: [
                'duration-200',
                'font-bold',
                {
                    'hover:underline': props.link
                },
                { 'flex-1': props.label !== null, 'invisible w-0': props.label == null }
            ]
        }),
        icon: ({ props }) => ({
            class: [
                'mx-0',
                {
                    'mr-2': props.iconPos == 'left' && props.label != null,
                    'ml-2 order-1': props.iconPos == 'right' && props.label != null,
                    'mb-2': props.iconPos == 'top' && props.label != null,
                    'mt-2': props.iconPos == 'bottom' && props.label != null
                }
            ]
        }),
        loadingicon: ({ props }) => ({
            class: [
                'h-4 w-4',
                'mx-0',
                {
                    'mr-2': props.iconPos == 'left' && props.label != null,
                    'ml-2 order-1': props.iconPos == 'right' && props.label != null,
                    'mb-2': props.iconPos == 'top' && props.label != null,
                    'mt-2': props.iconPos == 'bottom' && props.label != null
                },
                'animate-spin'
            ]
        }),
        badge: ({ props }) => ({
            class: [{ 'ml-2 w-4 h-4 leading-none flex items-center justify-center': props.badge }]
        })
    },
    menu: {
        class: [
            // Spacing
            'm-0 p-0',

            // Layout & Flexbox
            'list-none flex items-center justify-center',

            // Transitions
            'transition delay-200',

            // Z-Index (Positioning)
            'z-20'
        ]
    },
    item: ({ props, context }) => ({
        class: [
            'transform transition-transform duration-200 ease-out transition-opacity duration-800',

            // Conditional Appearance
            context.hidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100',

            // Conditional Spacing
            {
                'my-1 first:mb-2': props.direction == 'up' && props.type == 'linear',
                'my-1 first:mt-2': props.direction == 'down' && props.type == 'linear',
                'mx-1 first:mr-2': props.direction == 'left' && props.type == 'linear',
                'mx-1 first:ml-2': props.direction == 'right' && props.type == 'linear'
            },

            // Conditional Positioning
            { absolute: props.type !== 'linear' }
        ]
    }),
    pcAction: {
        root: {
            class: [
                // Flexbox & Alignment
                'flex items-center justify-center',

                // Size
                'w-12 h-12',

                // Shape
                'rounded-full relative overflow-hidden',

                // Appearance
                'bg-primary-600 dark:bg-primary-0/80 text-white dark:text-primary-900/80',

                // Hover Effects
                'hover:bg-primary-700 dark:hover:bg-primary-200/80'
            ]
        }
    },
    mask: ({ state }) => ({
        class: [
            // Base Styles
            'absolute left-0 top-0 w-full h-full transition-opacity duration-250 ease-in-out bg-black/40 z-0',

            // Conditional Appearance
            {
                'opacity-0 pointer-events-none': !state.d_visible,
                'opacity-100 transition-opacity duration-400 ease-in-out': state.d_visible
            }
        ]
    })
};
