export const convertJson = (json) => JSON.parse(json, function (key, value) {
    if (typeof value === 'string') {
        const d = /\/Date\((\d*)\)\//.exec(value);
        return (d) ? new Date(+d[1]).getTime() : value;
    }
    return value;
});

export const convertToJson = async (response) => {
    const responseText = await response.text();

    return convertJson(responseText);
};