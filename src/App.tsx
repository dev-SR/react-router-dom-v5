import React, { useState, useEffect, useContext } from 'react';
import {
   BrowserRouter as Router,
   Route,
   useParams,
   Link,
   useHistory,
   useLocation,
   Switch,
   Redirect,
   RouteProps
} from 'react-router-dom';

import Code, {
   DashBoardCode,
   nav,
   NotFound,
   BlogCode,
   cartCode
} from './syntaxHighligher/code';

const initial = {
   isLogged: false,
   Logout: () => {},
   Login: () => {}
};
const AuthContext = React.createContext(initial);
const AuthProvider: React.FC = ({ children }) => {
   const [isLogged, setIsLogged] = useState(false);
   return (
      <AuthContext.Provider
         value={{
            isLogged: isLogged,
            Logout: () => setIsLogged(false),
            Login: () => setIsLogged(true)
         }}>
         {children}
      </AuthContext.Provider>
   );
};

const PrivateRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
   const { isLogged } = useContext(AuthContext);
   if (isLogged) {
      return <Route {...routeProps} />;
   } else {
      return (
         <Redirect
            to={{
               pathname: '/login'
            }}
         />
      );
   }
};
const Nav = () => {
   const { pathname } = useLocation();
   const { Logout, isLogged } = useContext(AuthContext);
   const logout = () => {
      Logout();
   };

   return (
      <div className='fixed bg-gray-200 h-16 flex items-center w-full shadow-md justify-between'>
         <div className='space-x-5 ml-10'>
            {!isLogged && (
               <Link
                  to='/login'
                  className={`text-xl ${
                     pathname === '/login'
                        ? 'font-bold border-b-4 border-indigo-600'
                        : ''
                  }`}>
                  Login
               </Link>
            )}

            {isLogged && (
               <Link
                  to='/dashboard'
                  className={`text-xl ${
                     pathname === '/dashboard'
                        ? 'font-bold border-b-4 border-indigo-600'
                        : ''
                  }`}>
                  Dashboard
               </Link>
            )}

            <Link
               to='/cart'
               className={`text-xl ${
                  pathname === '/cart'
                     ? 'font-bold border-b-4 border-indigo-600'
                     : ''
               }`}>
               Cart
            </Link>
            <Link
               to='/nav'
               className={`text-xl ${
                  pathname === '/nav'
                     ? 'font-bold border-b-4 border-indigo-600'
                     : ''
               }`}>
               NavCode
            </Link>
         </div>
         <div className='mr-10'>
            {isLogged && (
               <button
                  className=' bg-indigo-500 px-4 py-2 rounded shadow-md hover:bg-indigo-400 text-gray-50'
                  onClick={logout}>
                  LOGOUT
               </button>
            )}
         </div>
      </div>
   );
};

const NavCode: React.FC = () => {
   return (
      <div className='w-11/12  mt-40'>
         <Code code={nav} language='javascript' />
      </div>
   );
};

const Blog: React.FC = () => {
   let { slug } = useParams<{ slug: string }>();
   return (
      <div className='h-screen w-11/12'>
         <h1 className='text-xl text-gray-50 '>{slug}</h1>;
         <div className='  mt-40'>
            <Code code={BlogCode} language='javascript' />
         </div>
      </div>
   );
};

const DashBoard: React.FC = () => {
   let history = useHistory();
   const [state, setState] = useState('');
   const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      history.push(state);
   };

   const { Logout } = useContext(AuthContext);
   const logout = () => {
      Logout();
   };

   return (
      <div className='w-11/12 flex  flex-col mt-10 items-center space-y-4'>
         <form
            onSubmit={submit}
            className=' space-y-4 mt-20 w-1/3 flex flex-col'>
            <input
               className='border-indigo-500 border-2 rounded-lg w-full focus:ring-indigo-700 focus:border-indigo-700 bg-gray-50'
               type='text'
               placeholder='Enter blog/:params or post/:param'
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setState(e.target.value)
               }
            />
            <button
               type='submit'
               className='bg-indigo-500 px-4 py-2 rounded-md shadow hover:bg-indigo-400 focus:outline-none text-gray-50'>
               GO TO
            </button>
         </form>
         <div className='w-1/3'>
            <button
               className='bg-indigo-500 px-4 py-2 rounded-md shadow hover:bg-indigo-400 focus:outline-none w-full text-gray-50'
               onClick={logout}>
               LOGOUT
            </button>
         </div>

         <div className='w-full'>
            <Code code={DashBoardCode} language='javascript' />
         </div>
      </div>
   );
};
const Post: React.FC<any> = ({ other }: any) => {
   let { slug } = useParams<{ slug: string }>();
   return (
      <h1 className='text-xl'>
         {slug}
         {other}
      </h1>
   );
};

const Cart: React.FC = () => {
   const history = useHistory();
   const onclick = () => {
      history.push('/login?redirect=payment?price:120');
   };

   return (
      <div className='h-screen w-11/12 mt-40 space-y-4 flex flex-col items-center'>
         <button
            className='bg-indigo-500 px-4 py-2 rounded-md shadow focus:outline-none mb-10 w-40 text-gray-50'
            onClick={onclick}>
            BUY NOW
         </button>
         <div className='flex flex-row space-x-4 mb-40 items-center'>
            <div>
               <img
                  src='https://www.apple.com/v/airpods-max/c/images/overview/hero__gnfk5g59t0qe_medium.png'
                  alt='Airpod'
                  className='w-40 h-40 object-contain'
               />
            </div>
            <div>
               <h1 className='text-3xl font-bold '> AirPods Max</h1>
            </div>
         </div>

         <div className='mt-10 w-full'>
            <Code code={cartCode} language='javascript' />
         </div>
      </div>
   );
};

const Login = () => {
   const location = useLocation();
   const history = useHistory();

   const reDirect = location.search
      ? location.search.split('=')[1]
      : '/dashboard';

   const { Login, isLogged } = useContext(AuthContext);
   const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      Login();
   };

   useEffect(() => {
      if (isLogged) {
         history.push(reDirect);
      }
   }, [isLogged]);

   return (
      <div className='h-screen bg-gray-100 flex flex-col w-full justify-center items-center space-y-5 mt-32'>
         <div>
            <form className='w-2/5 space-y-4' onSubmit={submit}>
               <button className='bg-indigo-500 px-4 py-2 rounded shadow focus:outline-none hover:bg-indigo-400 text-gray-50'>
                  LOGIN
               </button>
            </form>
         </div>
         <div>
            <h1>LOCATION: {location.search}</h1>
            <h1>REDIRECT: {reDirect}</h1>
         </div>
         <div className=' w-11/12'>
            <Code code={cartCode} language='javascript' />
         </div>
      </div>
   );
};

const Payment = () => {
   const price = location.search ? location.search.split(':')[1] : '';
   const history = useHistory();
   const checkout = () => {
      history.push('/dashboard');
   };
   return (
      <div className='bg-gray-100 h-screen flex justify-center items-center flex-col space-y-4'>
         <div>
            <button
               className=' bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 text-gray-50 shadow-md focus:outline-none'
               onClick={checkout}>
               CHECKOUT
            </button>
         </div>
         <div>
            <h1>price : ${price}</h1>
         </div>
      </div>
   );
};

function App() {
   return (
      <div className='bg-gray-100'>
         <AuthProvider>
            <Router>
               <Nav />
               <div className='flex justify-center items-center'>
                  <Switch>
                     <Route path='/blog/:slug' exact>
                        <Blog />
                     </Route>
                     <Route path='/post/:slug' exact>
                        <Post other='props' />
                     </Route>
                     <PrivateRoute path='/dashboard' exact>
                        <DashBoard />
                     </PrivateRoute>
                     <PrivateRoute path='/payment' exact>
                        <Payment />
                     </PrivateRoute>
                     <Route path='/nav' exact>
                        <NavCode />
                     </Route>
                     <Route path='/cart' exact>
                        <Cart />
                     </Route>
                     <Route path='/login' exact>
                        <Login />
                     </Route>
                     <Route path='*' exact>
                        {() => (
                           <div className='h-screen  flex-col w-11/12 mt-40'>
                              <h2 className=' text-gray-50'>PAGE NOT FOUND</h2>
                              <div className=''>
                                 <Code code={NotFound} language='javascript' />
                              </div>
                           </div>
                        )}
                     </Route>
                  </Switch>
               </div>
            </Router>
         </AuthProvider>
      </div>
   );
}

export default App;
