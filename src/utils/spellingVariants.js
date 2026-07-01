const SPELLING_VARIANTS = {
    neighbour: ['neighbor'],
    colour: ['color'],
    favourite: ['favorite'],
    organise: ['organize'],
    realise: ['realize'],
    travelling: ['traveling'],
    cancelled: ['canceled'],
    centre: ['center'],
    theatre: ['theater'],
    licence: ['license'],
};

export function getAcceptedEnglishVariants(word) {
    const normalized = word.toLowerCase();
    return [normalized, ...(SPELLING_VARIANTS[normalized] || [])];
}

export default getAcceptedEnglishVariants;
