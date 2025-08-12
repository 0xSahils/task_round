import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { user: req.user.id };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (error) {
    console.log("Error in getNotes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user.id
    });

    res.status(201).json({ note });
  } catch (error) {
    console.log("Error in createNote:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const note = await Note.findById(req.params.id);
    if (!note || !note.isOwnedBy(req.user.id)) {
      return res.status(404).json({ message: "Note not found" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json({ note: updatedNote });
  } catch (error) {
    console.log("Error in updateNote:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.isOwnedBy(req.user.id)) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNote:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
