const nameFormatter = (nome) => {
    const splitName = nome.trim().split(' ');
    let formattedName = ''
    for (let name of splitName) {
        if (name !== '') {
            formattedName += `${name.slice(0, 1)
                .toUpperCase()}${name.slice(1)
                    .toLowerCase()} `;
        }
    }
    return formattedName;
}

module.exports = nameFormatter;