import { useMemo } from 'react';

function highlightText(text, highlights) {
    if (!text || !highlights) return text;

    let result = text;

    highlights.forEach((highlight) => {
        const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'gi');
        result = result.replace(
            regex,
            (match) =>
                `<span class="text-cyan-300 font-semibold">${match}</span>`,
        );
    });

    return result;
}

export function useHighlightedExamples(wordData) {
    const highlightedExample = useMemo(
        () => highlightText(wordData.example, wordData.exampleHighlight),
        [wordData.example, wordData.exampleHighlight],
    );

    const highlightedExampleEs = useMemo(() => {
        if (!wordData.exampleEs || !wordData.exampleHighlightEs) return '';
        return highlightText(wordData.exampleEs, wordData.exampleHighlightEs);
    }, [wordData.exampleEs, wordData.exampleHighlightEs]);

    return { highlightedExample, highlightedExampleEs };
}

export default useHighlightedExamples;
