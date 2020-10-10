if(document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
	var botaoRemover = document.getElementsByClassName('btn-danger');
	for(i = 0; i < botaoRemover.length; i++) {
		var botao = botaoRemover[i];
		botao.addEventListener('click', removerItemCarrinho);
	}

	var insereQuantidade = document.getElementsByClassName('carrinho-quantidade-input');
	for(i = 0; i < insereQuantidade.length; i++) {
		var entrada = insereQuantidade[i];
		entrada.addEventListener('change', quantidadeAlterada);
	}

	var adicionaItemCarrinho = document.getElementsByClassName('btn-adiciona');
	for(i = 0; i < adicionaItemCarrinho.length; i++) {
		var adiciona = adicionaItemCarrinho[i];
		adiciona.addEventListener('click', AdicionaItemClicado);
	}

	document.getElementsByClassName('btn-comprar')[0].addEventListener('click', funcaoComprar);
}

function funcaoComprar() {
	alert('Obrigado por comprar conosco!');
	var itensCarrinho = document.getElementsByClassName('carrinho-itens')[0];
	while(itensCarrinho.hasChildNodes()) {
		itensCarrinho.removeChild(itensCarrinho.firstChild);
	}
	atualizaTotalCarrinho();
}

function AdicionaItemClicado(event) {
	var botao = event.target;
	var itemCarrinho = botao.parentElement.parentElement;
	var titulo = itemCarrinho.getElementsByClassName('produtos-titulo')[0].innerText;
	var preco = itemCarrinho.getElementsByClassName('produtos-preco')[0].innerText;
	var imgSrc = itemCarrinho.getElementsByClassName('produtos-imagem')[0].src;
	ApresentaItemCarrinho(titulo, preco, imgSrc);
	atualizaTotalCarrinho();
}

function ApresentaItemCarrinho(titulo, preco, imgSrc) {
	var carrinhoItemLinha = document.createElement('div');
	carrinhoItemLinha.classList.add('carrinho-linha');
	var itensDoCarrinho = document.getElementsByClassName('carrinho-itens')[0];
	var tituloItemCarrinho = document.getElementsByClassName('carrinho-titulo');
	for(i = 0; i < tituloItemCarrinho.length; i++) {
		if(tituloItemCarrinho[i].innerText == titulo) {
			alert('Este item já foi adicionado ao carrinho!');
			return;
		}
	}
	var conteudoCarrinhoLinha = `
		<div class="carrinho-item carrinho-detalhes">
			<img class="carrinho-imagem-item" src="${imgSrc}" width="100" height="100">
			<div class="carrinho-titulo">
				<span>${titulo}</span>
			</div>
		</div>
		<span id="carrinho-preco" class="carrinho-item carrinho-preco">${preco}</span>
		<div class="carrinho-quantidade">
			<input id="carrinho-quantidade-input" class="carrinho-quantidade-input" type="number" value="1">
			<button class="btn btn-danger" type="button">REMOVER</button>
		</div>`;
	carrinhoItemLinha.innerHTML = conteudoCarrinhoLinha;
	itensDoCarrinho.append(carrinhoItemLinha);
	carrinhoItemLinha
		.getElementsByClassName('btn-danger')[0]
		.addEventListener('click', removerItemCarrinho);
	carrinhoItemLinha
		.getElementsByClassName('carrinho-quantidade-input')[0]
		.addEventListener('change', quantidadeAlterada);
}

function quantidadeAlterada(event) {
	var entrada = event.target;
	if(isNaN(entrada.value) || entrada.value <= 0)  {
		entrada.value = 1;
	}
	atualizaTotalCarrinho();
}

function removerItemCarrinho(event) {
	let botaoClicado = event.target;
	botaoClicado.parentElement.parentElement.remove();
	atualizaTotalCarrinho();
}

function atualizaTotalCarrinho() {
	var containerItemCarrinho = document.getElementsByClassName('carrinho-itens')[0];
	var carrinhoLinhas = containerItemCarrinho.getElementsByClassName('carrinho-linha');
	var total = 0;
	for(i = 0; i < carrinhoLinhas.length; i++) {
		var carrinhoLinha = carrinhoLinhas[i];
		var precoItem = carrinhoLinha.getElementsByClassName('carrinho-preco')[0];
		var quantidadeItem = carrinhoLinha.getElementsByClassName('carrinho-quantidade-input')[0];
		var preco = parseFloat(precoItem.innerText.replace('R$', ''));
		var quantidade = quantidadeItem.value;
		var total = total + (preco * quantidade);
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('carrinho-preco-total')[0].innerText = 'R$' + total;
}