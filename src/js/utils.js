export function createElementWithClass(tag, className, attributes = {}, ...children) {
    const element = document.createElement(tag);
    element.className = className;

    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    children.forEach(child => {
        if (child) element.appendChild(child);
    });

    return element;
}
