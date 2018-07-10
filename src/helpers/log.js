export default function log(...args) {
    if (process.env.GREN_SILENT) {
        return;
    }

    console.log(...args);
}
