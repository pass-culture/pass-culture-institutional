import { XMLParser, XMLValidator } from "fast-xml-parser";

export const getRouteCount = (content: string): number => {
    if (content === "") return 0;
    
    // Nettoyer le contenu XML avant validation
    const cleanContent = content.trim();
    const validationResult = XMLValidator.validate(cleanContent);
    if (validationResult !== true) {
        throw new Error('Invalid XML format: ' + validationResult.err.msg);
    }
    
    const parser = new XMLParser({
        allowBooleanAttributes: false,
        ignoreAttributes: false,
        alwaysCreateTextNode: true
    });

    try {
        const result = parser.parse(cleanContent);
        if (!result.urlset?.url) return 1;
        const urlEntries = result.urlset.url;
        return Array.isArray(urlEntries) ? urlEntries.length : 1;
    } catch (error) {
        throw new Error(`Invalid XML format: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};