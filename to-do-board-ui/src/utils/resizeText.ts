export function resizeText(text: string, maxSize: number): string {
    let resizedText: string = text

    if (!resizedText) {
        return resizedText
    }

    if (resizedText.length <= maxSize) {
        return resizedText
    }

    const dotSize = 3
    return `${resizedText.slice(0, maxSize - dotSize)}...`
}
