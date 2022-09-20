// import Pages from 'vite-plugin-pages'
// import Layouts from 'vite-plugin-vue-layouts'

// /**
//  * @description 自动生成路由
//  */
// export function configPageImportPlugin() {
//   return [
//     Pages({
//       resolver: 'vue',
//       importMode: 'async',
//       exclude: [
//         '**/components/**/*',
//         '**/tests/**/*',
//         '**/__test__/**/*'
//       ],
//       extendRoute(route) {
//         // 登录页取消layout
//         if (route.path === '/login') {
//           return {
//             ...route,
//             meta: { layout: 'none' },
//           }
//         }

//         return {
//           ...route,
//           meta: { layout: 'default' },
//         }
//       }
//     }),
//     Layouts()
//   ]
// }