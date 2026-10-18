exports.issueAndDueDatesValidation = (req,res) => {
 const issueDate = new Date(req.body.issue_date);
  const dueDate = new Date(req.body.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
if (issueDate > today) {
  return res.status(400).json({
    status: "fail",
    message: "Issue date cannot be in the future",
  });
}
if (dueDate < issueDate) {
  return res.status(400).json({
    status: "fail",
    message: "Due date must be greater than or equal to issue date",
  });
}
};