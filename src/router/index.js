import { createRouter, createWebHistory } from "vue-router";

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
          total: parseFloat(route.query.total || 0),
          complementos: route.query.complementos
            ? JSON.parse(route.query.complementos)
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
