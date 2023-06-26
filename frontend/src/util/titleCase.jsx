const titleCase = (str) => {
  return str.toLowerCase().replace(/(^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
};

module.exports = titleCase;
