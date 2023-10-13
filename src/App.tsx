
 import {createBrowserRouter, RouterProvider} from 'react-router-dom';
 import Home from './Home';
 import Table from './Tables';
 import Edit from './Edit'
function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:"/table",
      element:<Table/>
    },
    {
      path:"/edit",
      element:<Edit/>
    }
  ])

  

  return (
    <RouterProvider router={router}/>
    
  );
}

export default App;
