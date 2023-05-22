export const formatCapitalSnake = (str: string) => 
    str
    .split(/(?=[A-Z])/)
    .map(el => el.toUpperCase())
    .join("_");