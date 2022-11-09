import { getProducts } from "../script.js";
import { render, $, html } from "../../scripts/ui/index.js";
import { query } from "../../scripts/network/queryIn.js";

let thisTotal = 0;
function renderTotal(total) {
  if (total === 0) render("total", "");
  else render("total", html`<h1>Total: R$ ${total}</h1>`);
}

async function onMount() {
  // verify is is logged in
  const { products } = await getProducts("../server/get-carrinho.php");
  console.log(products);
  thisTotal = products.reduce(
    (acc, product) => acc + product.qtd * product.valor,
    0
  );

  renderTotal(thisTotal);
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function submitPayment(type) {
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;
  // verify is is logged in
  const { data, error } = await query("./checkout.php", {
    method: "POST",
    body: JSON.stringify({ userId, type, total: thisTotal, dataCompra: new Date().toString() }),
    extraHeaders: {
      "Content-Type": "application/json",
    },
  });
  // open in another tab
  
  if (error) {
    return console.log(error);
  }

  render("main", html`<h1>Você será redirecionado a um site parceiro</h1>`);
  window.open("https://stripe.com/en-br", "_blank");
  await sleep(5000);
  render("main", html`<h1>Compra realizada com sucesso!</h1>`);
}
window.submitPayment = submitPayment;
window.onload = onMount;
