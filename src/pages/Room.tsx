import { database } from '../services/firebase';
// Firebase
import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
// hooks
import { useParams } from 'react-router';
// Rotas
import logoImg from '../assets/images/logo.svg';
// Assets
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
// Componentes
import '../styles/room.scss';
import toast, { Toaster } from 'react-hot-toast';
// CSS

type RoomParams = {
    id: string
}
export const Room = () => {
    const params = useParams<RoomParams>()
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');
    const { user } = useAuth();
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            toast.error('Faça o login!')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.nome,
                avatar: user?.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
        toast.success('Pergunta enviada com sucesso!')

    }

    return (
        <>
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

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={event => setNewQuestion(event.target.value)} value={newQuestion} />
                    <div className="form-footer">
                        { user 
                        ? 
                            <div className="user-info">
                                <img src={user.avatar} alt={user.nome} />
                                <span>{user.nome}</span>
                            </div>
                        :
                            <span>Para enviar uma pergunta <a href='#'>faça seu login.</a></span>
                        }
                        
                        <Button className="button" type="submit" disabled={!user} >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
            </main>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                className: 'toaster-sucess',
            }}
        />
        </>
    )
}