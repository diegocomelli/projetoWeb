/*
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "escolher-complementos",
        name: "EscolherComplementos",
        component: () => import("components/EscolherComplementos.vue"),
        props: (route) => ({
          produtoSelecionado: JSON.parse(
            route.query.produtoSelecionado || "{}"
          ),
          totalProduto: parseFloat(route.query.totalProduto || 0),
        }),
      },
      {
        path: "pagamento",
        name: "OpcoesPagamento",
        component: () => import("components/OpcoesPagamento.vue"),
        props: (route) => ({
          total: parseFloat(route.params.total || 0),
          complementos: route.params.complementos
            ? JSON.parse(route.params.complementos)
            : [],
        }),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
*/
