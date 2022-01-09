export const route = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/apps/auth/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/apps/auth/Register.vue"),
    },
    {
        path: "/reset",
        name: "Reset",
        component: () => import("@/apps/auth/Reset.vue"),
    },
];
