const apiUrl = 'http://localhost:3000/livro';

const form = document.getElementByld('formLivro');
const tbody = document.getElementByld('listaLivros');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const preco = document.getElementById('preco').value;
    const quantidade_estoque = document.getElementById('quantidade_estoque').value;

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, preco, quantidade_estoque })
        });

        if (!res.ok) throw new Error('Erro ao adicionar tarefa');

        const task = await res.json();
        form.reset();

        addTaskToUl(task);

    } catch (err) {
        alert('Erro ao salvar tarefa: ' + err.message);
    }

});

function addTaskToUl(livro) {

}