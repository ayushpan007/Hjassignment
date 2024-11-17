const status = (_, res) => {
  res.send({
    status: 'okay',
  });
};
module.exports = { status };
