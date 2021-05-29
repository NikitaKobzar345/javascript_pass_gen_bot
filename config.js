let sumbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
let toReplace = {
    a: "@",
    o: "0",
    z: "2",
    e: "3",
    s: "2",
    i: "1",
    b: "8",
    а: "@",
    в: "8",
    м: "w",
    е:'3',
    о:'0',
    в:'8',
    у:'u',
    я:'r'

  };

module.exports = {
    sumbols,
    toReplace,
}