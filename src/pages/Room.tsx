import { database } from '../services/firebase';
// Firebase
import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
// hooks
import { useParams } from 'react-router';
// Rotas
import logoImg from '../assets/images/logo.svg';
// Assets
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
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
    
    const {title, questions} = useRoom(roomId)

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }

        if(user){
            if(newQuestion.trim().length >= 20){
                const question = {
                    content: newQuestion,
                    author: {
                        name: user.name,
                        avatar: user.avatar,
                    },
                    isHighLighted: false,
                    isAnswered: false
                };

                await database.ref(`rooms/${roomId}/questions`).push(question)
                setNewQuestion('')

                toast.success('Pergunta enviada com sucesso!')
            }else{
                toast.error('A pergunta deve ter no mínimo 20 caracteres!')
            }
        }else{
            toast.error('Faça o login!')
        }
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
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunt{questions.length > 1 ? 'as' : 'a'}</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={event => setNewQuestion(event.target.value)} value={newQuestion} />
                    <div className="form-footer">
                        { user 
                        ?
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        :
                            <span>Para enviar uma pergunta <a href='#'>faça seu login.</a></span>
                        }
                        
                        <Button className="button" type="submit" disabled={!user} >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                <div className="fild-questions">
                    {questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author} />
                        )
                    })}
                </div>
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