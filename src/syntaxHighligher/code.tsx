import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export const testcode = `const App = props => {
  return (
    <div>
      <h1> React App </h1>
      <div>Awesome code</div>
    </div>
  );
};
`;

export const DashBoardCode = `const DashBoard: React.FC = () => {
   let history = useHistory();
   const [state, setState] = useState('');
   const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      history.push(state);
   };

   return (
      <form onSubmit={submit} className=' space-y-2'>
         <input
            className='border-cyan-500 border-2 rounded-lg w-full focus:ring-cyan-700 focus:border-cyan-700'
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
               setState(e.target.value)
            }
         />
         <button type='submit' className='bg-cyan-500 px-4 py-2 rounded-md'>
            GO TO
         </button>

         <Code code={testcode} language='javascript' />
      </form>
   );
};`;

export const nav = `const Nav = () => {
   const { pathname } = useLocation();
   return (
      <div className='bg-gray-200 h-16 flex items-center'>
         <div className='space-x-4 ml-5'>
            <Link
               to='/login'
               className={\`text-2xl \${
                  pathname === '/login'
                     ? 'font-bold border-b-4 border-teal-600'
                     : ''
               }\`}>
               Login
            </Link>
            <Link
               to='/dashboard'
               className={\`text-2xl \${
                  pathname === '/dashboard'
                     ? 'font-bold border-b-4 border-teal-600'
                     : ''
               }\`}>
               Dashboard
            </Link>
            <Link
               to='/nav'
               className={\`text-2xl \${
                  pathname === '/nav'
                     ? 'font-bold border-b-4 border-teal-600'
                     : ''
               }\`}>
               NavCode
            </Link>
         </div>
      </div>
   );
};`;
export const NotFound = `
                  <Switch>
                  ....
                  <Route path='*' exact>
                     {() => (
                        <div className='h-screen flex justify-center items-center'>
                           <h2 className=' text-gray-50'>PAGE NOT FOUND</h2>
                        </div>
                     )}
                  </Route>
                  </Switch>`;
export const cartCode = `
   const Cart: React.FC = () => {
   const history = useHistory();
   const onclick = () => {
      history.push('/login?redirect=payment');
   };

   return (
      <div className='h-screen w-11/12 mt-40 space-y-4'>
         <button
            className='bg-teal-300 px-4 py-2 rounded-md shadow focus:outline-none'
            onClick={onclick}>
            Proceed
         </button>
      </div>);
   };
`;

export const BlogCode = `
  const Blog: React.FC = () => {
   let { slug } = useParams<{ slug: string }>();
   return (
      <div className='h-screen'>
         <h1 className='text-xl text-gray-50 '>{slug}</h1>;
      </div>
   );`;

export default function Code({
   code,
   language
}: {
   code: string;
   language: string;
}) {
   useEffect(() => {
      Prism.highlightAll();
   }, []);
   return (
      <div className='w-full'>
         <pre className=' rounded-xl'>
            <code className={`language-${language} `}>{code}</code>
         </pre>
      </div>
   );
}
