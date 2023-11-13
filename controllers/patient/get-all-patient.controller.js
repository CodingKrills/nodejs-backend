exports.getAllPatient = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'get all patient' });
  } catch (err) {
    next(err);
  }
};
