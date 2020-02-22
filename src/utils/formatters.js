const options = {year: 'numeric', month: 'long', day: 'numeric' };

export function formatDate (date) {
    date = new Date(date);
    return date.toLocaleDateString(undefined, options)
}