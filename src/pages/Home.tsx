import { useAuth } from '../hooks/useAuth';
// Contexto
import { useHistory } from 'react-router';
// Rotas
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import GoogleIconImg from '../assets/images/google-icon.svg';
// Assets/imagens 
import { FormEvent, useState } from 'react';
// Hooks
import { Button } from '../components/Button';
// Componentes
import '../styles/auth.scss'
// CSS
import '../services/firebase';
import { firebase, auth, database } from '../services/firebase';
// Firebase

export const Home = () => {
    const history = useHistory();
    const { user, signInWidthGoogle } = useAuth()

    // Nova sala
    async function handleCreateRoom(){
        if(!user){
            await signInWidthGoogle();
        } // Só irá executar o resto do código em caso de sucesso 

        history.push('/rooms/new')
    }

    // encontrar sala
    const [roomCode, setRoomCode] = useState('');
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() === ''){
            return;
        }

        const roomReferenceFirebase = await database.ref(`rooms/${roomCode}`).get()

        if(!roomReferenceFirebase.exists()){
            alert('Há algo errado! O código esta incorreto ou a sala não existe.')
            return;
        }

        if(roomReferenceFirebase.val().endedAt){
            alert('Sala encerrada com sucesso!')
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

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
                    <button onClick={handleCreateRoom} className="main-content__btn">
                        <img src={GoogleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="main-content__separator">
                        ou entre em uma sala -Mluv2k0Aj7ncFLwZvOC
                    </div>
                    <form className="main-content__form" onSubmit={handleJoinRoom}>
                        <input className="form__input" type="text" placeholder="Digite o código da sala" onChange={event => {setRoomCode(event.target.value)}} value={roomCode} />
                        <Button typeof="submit" className="button form__button" isOutlined={false}>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}