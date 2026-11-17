const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./db');

const PORT = 3000;

app.use(cors());
app.use(express.json());

//GET geral
app.get('/livro', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    });
});

// GET com id
app.get('/livro/:id', (req, res) => {
    db.query('SELECT * FROM livro WHERE id = ?', [req.params.id], (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        if(results.length === 0) return res.status(404).json ({error: 'Tarefa não encontrada'});
        res.json(results[0]);
    });
});

//POST
app.post('/livro', (req,res) => {
    const {titulo, autor, preco, quantidade_estoque} = req.body
    db.query('INSERT INTO livro (titulo, autor, preco, quantidade_estoque) VALUES (?, ?)', [titulo, autor, preco, quantidade_estoque], (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({id: results.insertId, titulo, autor, preco, quantidade_estoque, completed: false});
    });
});

//PUT
app.put('/livro/:id', (req, res) => {
    const {titulo, autor, preco, quantidade_estoque, completed} = req.body;
    db.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', [titulo, autor, preco, quantidade_estoque, completed, req.params.id], (err,results) =>{
        if(err) return res.status(500).json({error: err.message});
        if(results.affectedRows === 0) return res.status(404).json ({error: 'Tarefa não encontrada'});
        res.json({id: req.params.id, titulo, autor, preco, quantidade_estoque, completed});
    });
});

//DELETE
app.delete('/livro/:id', (req, res) => {
    db.query('DELETE FROM livro WHERE id = ?', [req.params.id], (err,results) => {
        if(err) return res.status(500).json({error: err.message});
        if(results.affectedRows === 0) return res.status(404).json ({error: 'Tarefa não encontrada'});
        res.status(204).send();
    });
});

//LISTEN
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});