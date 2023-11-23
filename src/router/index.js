import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FAQView from "@/views/FAQView.vue";
import ContactsView from "@/views/ContactsView.vue";
import BooksView from "@/views/BooksView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQView,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactsView,
  },
  {
    path: "/books",
    name: "books",
    component: BooksView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
