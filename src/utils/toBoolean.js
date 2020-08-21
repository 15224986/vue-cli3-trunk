export default function(value) {
    let bool = {
        'true': true,
        'false': false
    };
    return bool[value] !== undefined ? bool[value] : false;
};
