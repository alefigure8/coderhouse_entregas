export function emptyFields(req, res){
    if (
        Object.values(req.body).includes("") ||
        Object.values(req.body).includes(undefined)
      ) {
        return res.status(500).json({ error: "All fields are ired" });
      }
}