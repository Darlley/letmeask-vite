import { useParams } from 'react-router';
// Rotas
import logoImg from '../assets/images/logo.svg';
// Assets
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
// Componentes
import '../styles/room.scss';

type RoomParams = {
    id: string
}
export const Room = () => {
    const params = useParams<RoomParams>()
    const roomId = params.id;

    return (
        <div id="page-root">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask Logo" />
                    <RoomCode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sobre ReactJS</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea placeholder="O que você quer perguntar?" />
                    <div className="form-footer">
                        <span>Para enviar uma pergunta
                            <a href='#'>faça seu login.</a>
                        </span>
                        <Button className="button">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}