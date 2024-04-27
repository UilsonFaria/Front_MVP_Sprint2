/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo Serviço => Cliente + Serviço 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputTelefone = document.getElementById("telefone").value;
  let inputNome = document.getElementById("nome").value;
  let inputEmail = document.getElementById("email").value;
  let inputCep = document.getElementById("cep").value;
  let inputLogradouro = document.getElementById("logradouro").value;
  let inputNumero = document.getElementById("numero").value;
  let inputComplemento = document.getElementById("complemento").value;
  let inputBairro = document.getElementById("bairro").value;
  let inputCidade = document.getElementById("cidade").value;
  let inputUf = document.getElementById("uf").value;
  let inputTipo = document.getElementById("tiposervico").value;
  let inputDescricao = document.getElementById("descricao").value;

  if (inputTelefone === '') {
    alert("Favor informar o telefone do cliente!");
  } else {
    insertList(inputTelefone, inputTipo, inputDescricao);
    postCliente(inputTelefone, inputNome, inputEmail, inputCep, inputLogradouro, inputNumero, inputComplemento, inputBairro, inputCidade, inputUf);
    postServico(inputTelefone, inputTipo, inputDescricao);
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para incluir o Cliente na base de dados via requisição POST
  --------------------------------------------------------------------------------------
*/
const postCliente = async (inputTelefone, inputNome, inputEmail, inputCep, inputLogradouro, inputNumero, inputComplemento, inputBairro, inputCidade, inputUf) => {
  const formData = new FormData();
  formData.append('telefone', inputTelefone);
  formData.append('nome', inputNome);
  formData.append('email', inputEmail);
  formData.append('cep', inputCep);
  formData.append('logradouro', inputLogradouro);
  formData.append('numero', inputNumero);
  formData.append('complemento', inputComplemento);
  formData.append('bairro', inputBairro);
  formData.append('cidade', inputCidade);
  formData.append('uf', inputUf);

  let url = 'http://127.0.0.1:5001/cliente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });    

    alert("Cliente cadastrado!")
}


/*
  --------------------------------------------------------------------------------------
  Função para incluir o Serviço na base de dados via requisição POST
  --------------------------------------------------------------------------------------
*/
const postServico = async (inputTelefone, inputTipo, inputDescricao) => {
    const formData = new FormData();
    formData.append('cliente_tel', inputTelefone);
    formData.append('tipo_servico', inputTipo);
    formData.append('descricao', inputDescricao);
    
    let url = 'http://127.0.0.1:5001/servico';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });    

    alert("Serviço cadastrado!")
}


/*
  --------------------------------------------------------------------------------------
  Função para consultar dados do CEP 
  --------------------------------------------------------------------------------------
*/
const consultaCEP = async () => {
  let inputCep = document.getElementById("cep").value;
  let urlCep = 'https://viacep.com.br/ws/';
  let urlfim = '/json/';

  let urlcompleta = urlCep.concat(inputCep.concat(urlfim));

  let url = urlcompleta;

  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      recuperaDados(data.logradouro, data.bairro, data.localidade, data.uf);
    })    
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para exibir dados de retorno da consulta de CEP
  --------------------------------------------------------------------------------------
*/
const recuperaDados = (logradouro, bairro, cidade, uf) => {

  document.getElementById("logradouro").value = logradouro;
  document.getElementById("bairro").value = bairro;
  document.getElementById("cidade").value = cidade;
  document.getElementById("uf").value = uf;
}


/*
  --------------------------------------------------------------------------------------
  Função para recuperar dados do cliente e do serviço 
  --------------------------------------------------------------------------------------
*/
const obtemDados = async () => {
  let inputTelefone = document.getElementById("telefone").value;
  let url = 'http://127.0.0.1:5001/cliente?id=' + inputTelefone;

  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      preencheDadosCliente(data.nome, data.email, data.cep, data.logradouro, data.numero, data.complemento, data.bairro, data.cidade, data.uf);
      preencheDadosServico(data.tiposervico, data.descricao);
    })    
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para exibir dados recuperados de cliente
  --------------------------------------------------------------------------------------
*/
const preencheDadosCliente = (nome, email, cep, logradouro, numero, complemento, bairro, cidade, uf) => {

  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;
  document.getElementById("cep").value = cep;
  document.getElementById("logradouro").value = logradouro;
  document.getElementById("numero").value = numero;
  document.getElementById("complemento").value = complemento;
  document.getElementById("bairro").value = bairro;
  document.getElementById("cidade").value = cidade;
  document.getElementById("uf").value = uf;
}


/*
  --------------------------------------------------------------------------------------
  Função para exibir dados recuperados de serviço
  --------------------------------------------------------------------------------------
*/
const preencheDadosServico = (tiposervico, descricao) => {

  document.getElementById("tiposervico").value = tiposervico;
  document.getElementById("descricao").value = descricao;
  
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um serviço => Cliente + Serviço
  --------------------------------------------------------------------------------------
*/
const delItem = () => {

  let inputTelefone = document.getElementById("telefone").value;
  
  if (confirm("Tem certeza que deseja excluir o serviço?")) {
    deleteCliente(inputTelefone);
    deleteServico(inputTelefone);
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um cliente na base de dados via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteCliente = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/cliente?id=' + item;

  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });

    alert("Cliente removido!")
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um serviço na base de dados via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteServico = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/servico?id=' + item;

  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });

    alert("Serviço removido!")
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de serviços
  --------------------------------------------------------------------------------------
*/
const insertList = (cliente, tiposervico, descricao) => {
  var item = [cliente, tiposervico, descricao]
  var table = document.getElementById("myTable");
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
//getList()


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5001/servicos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.servicos.forEach(item => insertList(item.cliente, item.tiposervico, item.descricao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
