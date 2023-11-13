exports.updateOnePatient = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'update one patient' });
  } catch (err) {
    next(err);
  }
};
