export const toProcessText = (text:string) => {
    const words = text.split(' ');
    return words.map(toProcessWord);
}

export const toProcessWord = (word:string): string[] => {
    const len = word.length;
    const mid = Math.floor(len * 3/5);

    return [word.slice(0,mid), word.slice(mid)];
}
