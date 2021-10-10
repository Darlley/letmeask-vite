import { BrowserRouter, Route } from "react-router-dom";
// Rotas
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { AuthContextProvider } from './contexts/AuthContext';
// Componentes

export const App = () => {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Route path="/" exact component={Home} />
                <Route path="/rooms/new" component={NewRoom} />
            </AuthContextProvider>
        </BrowserRouter>
    )
}