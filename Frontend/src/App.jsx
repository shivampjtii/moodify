import {RouterProvider} from "react-router";
import { router } from "./app.routes";
import "./features/shared/styles/global.scss"
import { AuthContextProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";


function App() {

  return (
    <AuthContextProvider>
      <SongContextProvider>
        <RouterProvider router={router}/>
      </SongContextProvider>
    </AuthContextProvider>
  )
}

export default App
