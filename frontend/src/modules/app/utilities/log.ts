export const log = {
    debug: (value: string) => {
        if (process.env.DEV) {
            // eslint-disable-next-line no-console
            console.log(`DEBUG: ${value}`);
        }
    },
    error: (value: string) => {
        // eslint-disable-next-line no-console
        console.error(`ERROR: ${value}`);
    },
};
