let token = "1815649513:AAEusDkh--A-ERWRJak4lLqIEX41BaaIqUE";
let sumbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
let toReplace = {
    a: "@",
    o: "0",
    z: "2",
    e: "3",
    s: "2",
    i: "1",
    b: "8",
  };

module.exports = {
    token,
    sumbols,
    toReplace
}