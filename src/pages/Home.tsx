import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import GoogleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss'

export const Home = () => {
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
                    <button className="main-content__btn">
                        <img src={GoogleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="main-content__separator">
                        ou entre em uma sala
                    </div>
                    <form className="main-content__form" >
                        <input className="form__input" type="text" placeholder="Digite o código da sala" />
                        <Button typeof="submit" className="button form__button">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}