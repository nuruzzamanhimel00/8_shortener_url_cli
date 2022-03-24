
// //admin login
// import compAdminMaster from './components/views/backend/Auth/adminMaster.vue'
// import compAdminLogin from './components/views/backend/Auth/adminLogin.vue'
// import compAdminDashboard from './components/views/backend/dashboard.vue'
// // import compTest from './components/views/backend/test.vue'

// // admin product category
// import compAdminAddCategory from './components/views/backend/product/category/add_category.vue'
// import compAdminAllCategory from './components/views/backend/product/category/all_category.vue'
// import compAdminEditCategory from './components/views/backend/product/category/edit_category.vue'

// //admin product brand
// import compAdminAddBrand from './components/views/backend/product/brand/add_brand.vue'
// import compAdminAllBrand from './components/views/backend/product/brand/all_brand.vue'
// import compAdminEditBrand from './components/views/backend/product/brand/edit_brand.vue'

// // admin Product
// import compAllProduct from './components/views/backend/product/all_product.vue'
// // admin slider
// import compAllSlider from './components/views/backend/slider/all_slider.vue'

// ### fontend ###
import compFontendMaster from './components/views/fontend/master/fontend_master.vue'
import compFontDashboard from './components/views/fontend/dashboard.vue'
// import compFontBrandWiseProdct from './components/views/fontend/products/brandWiseProducts.vue'
// import compFontCatdWiseProdct from './components/views/fontend/products/categoryWiseProducts.vue'
// import compFontProductView from './components/views/fontend/products/productView.vue'
// import compFontProductSearch from './components/views/fontend/products/searchProducts.vue'
// ## fontend auth (login and restration)
import compFontRegister from './components/views/fontend/auth/fontend_register.vue'
import compFontLogin from './components/views/fontend/auth/fontend_login.vue'
import compShortUrl from './components/views/fontend/shortUrl/short_url.vue'

// import compWebLogin from './components/views/fontend/auth/website-login.vue'
// fontend my dashboard
// import compFontMyDash from './components/views/fontend/dashboard/my_dashboard.vue'
// import compFontMyUserPro from './components/views/fontend/dashboard/my_userprofile.vue'
// import compFontMyUserChangePass from './components/views/fontend/dashboard/my_userchagnepass.vue'
// //carts
// import compFontMyCart from './components/views/fontend/cart/mycart.vue'
// import compFontMyCartCheckout from './components/views/fontend/cart/cart_checkout.vue'

export const routes = [
    {
        path: '/', 
        component: compFontendMaster,
        name:'home',
        redirect:{path:'/dashboard'},
        children:[
            {
                path: 'dashboard', 
                component: compFontDashboard,
                name:"compFontDashboard"
            },
            {
                path: 'register', 
                component: compFontRegister,
                name:'compFontRegister'
            },
            {
                path: 'login', 
                component: compFontLogin,
                name:'compFontLogin'
            },
            {
                path: 'sorturl', 
                component: compShortUrl,
                name:'compShortUrl'
            },
           
        ]
        
    },
    {
        path: '*',
        component:compFontendMaster,
        redirect:{path:'/dashboard'},
      
    }
   
  ]