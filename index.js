import express from "express";
import db from "./db.js";

const app=express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

app.post("/addSchool",(req,res)=>{
    const {name,address,latitude,longitude} = req.body;
     const lat = Number(latitude);
     const lon = Number(longitude);
    if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (typeof name !== "string" || typeof address !== "string") {
    return res.status(400).json({ error: "Name and address must be strings" });
  }

  if (name.trim() === "" || address.trim() === "") {
    return res.status(400).json({ error: "Name and address cannot be empty" });
  }

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "Latitude & Longitude must be valid numbers" });
  }

  const checkQuery = `
  SELECT * FROM schools 
  WHERE name = ? AND address = ?
`;

db.query(checkQuery, [name.trim(), address.trim()], (err, results) => {
  if (err) return res.status(500).json({ error: err });

  if (results.length > 0) {
    return res.status(400).json({ error: "School already exists" });
  }

  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name.trim(), address.trim(), lat, lon], (err, result) => {
    if (err) return res.status(500).json({ error: err });

res.json({ message: "School added successfully", id: result.insertId });
  });

});});


app.get("/listSchools", (req, res) => {
  const userLat = Number(req.query.latitude);
  const userLon = Number(req.query.longitude);
  
  let page = Number(req.query.page)||1;
  let limit = Number(req.query.limit)||5;

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: "Invalid pagination values" });
  }

  const offset = (page-1) * limit;
   const query = `
    SELECT 
      id,
      name,
      address,
      latitude,
      longitude,
      (
        6371 * ACOS(
          COS(RADIANS(?)) * COS(RADIANS(latitude)) *
          COS(RADIANS(longitude) - RADIANS(?)) +
          SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )
      ) AS distance
    FROM schools
    ORDER BY distance ASC
    LIMIT ? OFFSET ?;
  `;

  db.query(query, [userLat, userLon, userLat,limit,offset], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const formatted = results.map(school => ({
      ...school,
      distance: Number(school.distance.toFixed(2))
    }));

    res.json(formatted);
  });
});
