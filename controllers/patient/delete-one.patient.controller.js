exports.deleteOnePatient = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'delete one patient' });
  } catch (err) {
    next(err);
  }
};
