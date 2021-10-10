// import { useAuth } from '../hooks/useAuth';
// Contexto
import { Link } from 'react-router-dom';
// Rotas
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
// Assets/Imagens
import { Button } from '../components/Button';
// Componentes
import '../styles/auth.scss'
// CSS

export const NewRoom = () => {
    // const { user } = useAuth()

    return (
        <div className="home">
            <aside className="home__aside">
                <img className="aside__img" src={illustrationImg} alt="Ilustração simbolizando perguntas e respostase" />
                <strong className="aside__strong">Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main className="home__main">
                <div className="main-content">
                    <img className="main-content__img" src={logoImg} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form className="main-content__form" >
                        <input className="form__input" type="text" placeholder="Nome da sala" />
                        <Button typeof="submit" className="button form__button">
                            Cria sala
                        </Button>
                        <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )
}