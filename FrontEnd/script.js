const apiUrl = 'http://localhost:3000/livro';

const form = document.getElementById('formLivro');
const tbody = document.getElementById('listaLivros');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('title').value;
    const autor = document.getElementById('autor').value;
    const preco = document.getElementById('preco').value;
    const quantidade_estoque = document.getElementById('estoque').value;

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, preco, quantidade_estoque})
        });

        if (!res.ok) throw new Error('Erro ao cadastrar livro');

        const livro = await res.json();
        form.reset();

        await loadBooks();

        document.getElementById('mensagem').textContent = 'Livro cadastrado com sucesso!';

    } catch (err) {
        alert('Erro ao salvar livro: ' + err.message);
    }
});

function addBookToTable(livro) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>R$ ${Number(livro.preco).toFixed(2).replace('.', ',')}</td>
        <td>${livro.quantidade_estoque}</td>
        <td>
            <button class="botao_editar" onclick="editBook(${livro.id_livro})">Editar</button>
            <button class="botao_excluir" onclick="deleteBook(${livro.id_livro})">Excluir</button>
        </td>
    `;

    tbody.appendChild(tr);
}

async function editBook(id) {
    try {
        const res = await fetch(`${apiUrl}/${id}`);

        if (!res.ok) throw new Error('Erro ao buscar livro');

        const livro = await res.json();

        document.getElementById('title').value = livro.titulo;
        document.getElementById('autor').value = livro.autor;
        document.getElementById('preco').value = livro.preco;
        document.getElementById('estoque').value = livro.quantidade_estoque;

        form.dataset.editingId = id;

        document.getElementById('botaoSalvar').textContent = 'Salvar alterações';

        window.scrollTo({top: 0, behavior: 'smooth'});

    } catch (err) {
        alert('Erro ao buscar livro: ' + err.message);
    }
}

async function deleteBook(id) {
    if (!confirm('Deseja realmente excluir este livro?')) return;

    try {
        const res = await fetch(`${apiUrl}/${id}`, {method: 'DELETE'});

        if (!res.ok) throw new Error('Erro ao excluir livro');

        await loadBooks();

        alert('Livro excluído com sucesso!');

    } catch (err) {alert('Erro ao excluir livro: ' + err.message);
    }
}

document.getElementById('botaoBuscar').addEventListener('click', async () => {
    const titulo = document.getElementById('buscarTitulo').value;

    try {
        const res = await fetch(
            `${apiUrl}/buscar?titulo=${encodeURIComponent(titulo)}`
        );

        if (!res.ok) throw new Error('Erro ao buscar livros');

        const livros = await res.json();

        tbody.innerHTML = '';

        livros.forEach(addBookToTable);

    } catch (err) {
        alert('Erro na busca: ' + err.message);
    }
});

document.querySelector('.botao_limpar').addEventListener('click', () => {
    document.getElementById('buscarTitulo').value = '';
    loadBooks();
});

loadBooks();
