const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Notebook, Tag } = require('../../db/models');

const router = express.Router();

//-----------------------NOTE VALIDATOR-----------------------
const validateNotebooks = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name cannot be longer than 50 characters'),
  handleValidationErrors,
];

//-----------------------GET ALL NOTEBOOKS-----------------------
// router.get("/", asyncHandler(async (req, res) => {
//   const notebooks = await Notebook.findAll({
//     include: Note
//   });
  
//   return res.json(notebooks)
// }))

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notebooks = await Notebook.findAll({
    where: { userId: userId }
  });
  return res.json(notebooks);
}));


//-----------------------CREATE NOTEBOOK-----------------------
router.post("/", validateNotebooks, asyncHandler(async (req, res) => {
    const notebook = await Notebook.create(req.body);
    return res.json(notebook)
  }))





















//-----------------------GET ALL NOTES-----------------------
// router.get("/", asyncHandler(async (req, res) => {

//   const userId = req.params.userId;
//   const notes = await Note.findAll({
//     where: {
//       userId: userId
//     },
//     order: [["updatedAt", "DESC"]],
//   })

//   return res.json(notes)
// }))
//-----------------------CREATE NOTE-----------------------
// router.post('/new', validateNote, requireAuth, asyncHandler(async (req, res) => {
  //   const { content, dueDate, listId } = req.body;
  //   const newnote = await note.create({
    //     content,
    //     dueDate,
    //     userId: req.session.auth.userId
    //   });
    //   await Listnote.create({
      //     noteId: newnote.id,
      //     listId
//   })
//   res.redirect('/notes')
// })
// );

module.exports = router;
