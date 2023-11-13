exports.createOnePatient = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'create one patient' });
  } catch (err) {
    next(err);
  }
};
