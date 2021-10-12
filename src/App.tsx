import { BrowserRouter, Route , Switch} from "react-router-dom";
// Rotas
import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room";
// Componentes

export const App = () => {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/rooms/new" component={NewRoom} />
                    <Route path="/rooms/" exact component={NewRoom} />
                    <Route path="/rooms/:id" component={Room} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    )
}