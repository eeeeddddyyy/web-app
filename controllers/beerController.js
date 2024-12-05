exports.getAllBeers = (req, res) => {
    db.all('SELECT * FROM beers', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.addBeer = (req, res) => {
    const { name, type, description } = req.body;
    db.run(
        'INSERT INTO beers (name, type, description) VALUES (?, ?, ?)',
        [name, type, description],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID });
            }
        }
    );
};

exports.updateBeer = (req, res) => {
    const { id } = req.params;
    const { name, type, description } = req.body;
    db.run(
        'UPDATE beers SET name = ?, type = ?, description = ? WHERE id = ?',
        [name, type, description, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'Beer updated successfully.' });
            }
        }
    );
};

exports.deleteBeer = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM beers WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Beer deleted successfully.' });
        }
    });
};
