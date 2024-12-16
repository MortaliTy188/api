const Comment = require("../models/commentModel");
const Document = require("../models/documentModel");

exports.getComments = async (req, res) => {
  const documentId = parseInt(req.params.documentId);
  const comments = await Comment.findAll({
    where: { document_id: documentId },
  });
  if (comments.length === 0) {
    return res.status(404).json({
      timestamp: Date.now(),
      message: "Не найдены комментарии для документа",
      errorCode: 2344,
    });
  }
  res.json(comments);
};

exports.addComment = async (req, res) => {
  const { text, author } = req.body;
  const { documentId } = req.params;
  try {
    const document = await Document.findByPk(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    const newComment = await Comment.create({
      text,
      date_created: new Date(),
      date_updated: new Date(),
      author,
      document_id: documentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Комментарий добавлен", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при добавлении комментария", error });
  }
};