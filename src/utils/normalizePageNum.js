const normalizePageNum = (page) => {
    const normalizeNum = Number(page);
    if(isNaN(normalizeNum)) return 1;
    return normalizeNum;
}

module.exports = normalizePageNum;