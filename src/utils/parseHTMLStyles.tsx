export function parseHtmlStyleToReactStyle(styleString: string) {
    const styleObject: { [key: string]: string } = {};

    styleString.split(';').forEach((style) => {
        if (style.trim()) {
            const [property, value] = style.split(':');
            const formattedProperty = property
                .trim()
                .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

            styleObject[formattedProperty] = value.trim();
        }
    });

    return styleObject;
}