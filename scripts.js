/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de artesões existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListArtesao = async () => {
  let url = 'http://127.0.0.1:5001/artesoes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.artesoes.forEach(item => insertListArtesao(item.box, item.nome, item.celular))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de vendas existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListVendas = async () => {
  let url = 'http://127.0.0.1:5001/vendas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.vendas.forEach(item => insertListVenda(item.box_artesao, item.valor, item.forma_pagamento))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getListArtesao()
getListVendas()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um Artesão na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postArtesao = async (inputBox, inputNome,  inputCelular) => {
  const formData = new FormData();
  formData.append('box', inputBox);
  formData.append('nome', inputNome);
  formData.append('celular', inputCelular);

  let url = 'http://127.0.0.1:5001/artesao';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.status == 200)
        insertListArtesao(inputBox, inputNome, inputCelular)
      response.json()})
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar uma venda na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postVenda = async (inputBox, InputValor,  inputPagamento) => {
  const formData = new FormData();
  formData.append('box', inputBox);
  formData.append('valor', InputValor);
  formData.append('pagamento', inputPagamento);

  let url = 'http://127.0.0.1:5001/venda';
  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => {
    if (response.status == 200)
      insertListVenda(inputBox, InputValor, inputPagamento)
    response.json()})
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonArtesao = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "closeArtesao";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonVenda = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "closeVenda";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um artesão da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeArtesao = () => {
  let close = document.getElementsByClassName("closeArtesao");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteArtesao(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um artesão ou Venda da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeVenda = () => {
  let close = document.getElementsByClassName("closeVenda");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteVenda(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um artesão da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteArtesao = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/artesao?box=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar uma venda da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteVenda = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/venda?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo Artesão com Box, Nome e Celular 
  --------------------------------------------------------------------------------------
*/
const newArtesao = () => {
  let inputBox = document.getElementById("newBox").value;
  let inputNome = document.getElementById("newArtesao").value;
  let inputCelular = document.getElementById("newCelular").value;

  if (inputBox === '' || isNaN(inputBox)) {
    alert("Selecione um box válido para o Artesão!");
  } else {
    postArtesao(inputBox, inputNome, inputCelular)
    alert("Artesão adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova Venda com Box, valor e Forma de pagamento 
  --------------------------------------------------------------------------------------
*/
const newVenda = () => {
  let inputBox = document.getElementById("BoxArtesao").value;
  let inputValor = document.getElementById("newValor").value;
  let inputPagamento = document.getElementById("newPagamento").value;

  if (inputBox === '' || isNaN(inputBox)) {
    alert("Selecione um box válido para o Artesão!");
  } else {
    postVenda(inputBox, inputValor, inputPagamento)
    alert("Venda adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir artesões na lista de artesões apresentada
  --------------------------------------------------------------------------------------
*/
const insertListArtesao = (nmbBox, nome, celular) => {
  var item = [nmbBox, nome, celular]
  var table = document.getElementById('myTableArtesao');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonArtesao(row.insertCell(-1))
  document.getElementById("newBox").value = "";
  document.getElementById("newArtesao").value = "";
  document.getElementById("newCelular").value = "";

  removeArtesao()
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir venda na lista de vendas apresentada
  --------------------------------------------------------------------------------------
*/
const insertListVenda = (nmbBox, valor, pagamento) => {
  var item = [nmbBox, valor, pagamento]
  var table = document.getElementById('myTableVenda');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonVenda(row.insertCell(-1))
  document.getElementById("BoxArtesao").value = "";
  document.getElementById("newValor").value = "";
  document.getElementById("newPagamento").value = "";

  removeVenda()
}