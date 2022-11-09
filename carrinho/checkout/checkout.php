<?php

$dt = json_decode(file_get_contents('php://input'), true);
$userId = $dt['userId'];
// insert in the db this data and clear current cart
$type = $dt['type'];
// ^^ this is the type of payment can be 'pix' or 'credit' 
$total = $dt['total'];
// ^^ this is the total value of the cart or you can do a query to get the total value of the cart using a reduce
// chama o get-carrinho desse user e faz o código abaixo
// $cart = getcarrinho($userId);
// $total_do_user = array_reduce($cart, function($acc, $product) { return $acc + $product['qtd'] * $product['valor'] }, 0)
// Essa func acima é uma função que recebe um array e retorna o total do carrinho

$data_compra = $dt['dataCompra'];
// $data_compra = date('Y-m-d H:i:s');
// tem a opção de pegar do php

echo json_encode($dt);