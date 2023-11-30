import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import HomeView from "../views/HomeView.vue";
import FAQView from "@/views/FAQView.vue";
import ContactsView from "@/views/ContactsView.vue";
import BooksView from "@/views/BooksView.vue";
import SignUpView from "@/views/SignUpView.vue";
import SignInView from "@/views/SignInView.vue";
import BlogPostsView from "@/views/BlogPostsView.vue";
import BookDetailsView from "@/views/BookDetailsView.vue";
import UserHome from "@/views/UserHome.vue";
import AuthorsView from "@/views/AuthorsView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import CollectionsView from "@/views/CollectionsView.vue";
import CreateBlogView from "@/views/CreateBlogView.vue";
import SearchResultsView from "@/views/SearchResultsView.vue";
import EditBookView from "@/views/admin/EditBookView.vue";
import UpdateUserProfile from "@/views/UpdateUserProfile.vue";
import CreateBookView from "@/views/admin/CreateBookView.vue";
import AuthorTableView from "@/views/admin/AuthorTableView.vue";
import EditAuthorView from "@/views/admin/EditAuthorView.vue";
import createAuthorView from "@/views/admin/CreateAuthorView.vue";

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
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUpView,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignInView,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogPostsView,
  },
  {
    path: "/book/:urlHandle",
    name: "BookDetails",
    component: BookDetailsView,
  },
  {
    path: "/search/:searchInput", // Змінивши шлях на прийнятний
    name: "Search",
    component: SearchResultsView,
  },
  {
    path: "/user-home",
    component: UserHome, // Ваш компонент для головної сторінки
    meta: { requiresAuth: true }, // Позначаємо, що потрібна авторизація для цієї сторінки
  },
  {
    path: "/authors",
    name: "AuthorsView",
    component: AuthorsView,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesView,
  },
  {
    path: "/collections",
    name: "Collections",
    component: CollectionsView,
  },
  {
    path: "/create-blog",
    name: "Create Blog",
    component: CreateBlogView,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-book",
    name: "EditBook",
    component: EditBookView,
    meta: { requiresAuth: true },
  },
  {
    path: "/update-profile",
    name: "UpdateProfile",
    component: UpdateUserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-book",
    name: "Create Book",
    component: CreateBookView,
    meta: { requiresAuth: true },
  },
  {
    path: "/authors-table",
    name: "Authors",
    component: AuthorTableView,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-author",
    name: "Update Author",
    component: EditAuthorView,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-author",
    name: "Create Author",
    component: createAuthorView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuth;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Якщо потрібна авторизація для сторінки і користувач не авторизований,
    // перенаправити на сторінку авторизації
    console.log(isAuthenticated);
    next("/sign-in");
  } else {
    // В іншому випадку, продовжуємо перехід на сторінку, яку користувач запитує
    next();
  }
});

export default router;
