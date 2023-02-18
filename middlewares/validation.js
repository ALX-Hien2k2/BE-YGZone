const validateCheck = (attr, body) => {
  Object.keys(attr).forEach((key) => {
    if (body[key] === undefined) {
      throw new Error(`${key} is required`);
    }
  });
};

module.exports = {
  validateCheck,
};
