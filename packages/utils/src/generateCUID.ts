export function generateCUID() {
    const timestamp = Date.now().toString(36);
    const randomString = () => Math.random().toString(36).substring(2, 10);
    const counter = (() => {
        let count = 0;
        return () => (count = (count + 1) % 36);
    })();

    return `c${timestamp}${randomString()}${randomString()}${counter().toString(36)}`;
}
