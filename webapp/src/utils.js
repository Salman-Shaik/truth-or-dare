const getRandomItem = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

module.exports = {
    getRandomItem
}