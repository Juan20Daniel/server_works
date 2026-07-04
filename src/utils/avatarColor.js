const colors = [
    '#9A7F20',
    '#555555',
    '#6F0404',
    '#6F6804',
    '#386B09',
    '#096B5A',
    '#09546B',
    '#09266B',
    '#3A096B',
    '#6B095F',
    '#6B090B',
    '#312C46',
    '#27634E'
];

const avatarColor = () => {
    const randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];
}

module.exports = avatarColor;
