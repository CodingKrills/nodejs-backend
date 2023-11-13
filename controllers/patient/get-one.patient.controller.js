exports.getOnePatient = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'get one patient' });
  } catch (err) {
    next(err);
  }
};
