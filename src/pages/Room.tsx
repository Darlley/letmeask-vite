import { database } from '../services/firebase';
// Firebase
import { useState, useEffect, FormEvent } from 'react';
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

type FirebaseQuestions = Record<string, {
    author: {
        nome: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean
}>
type Questions = {
    id: string,
    author: {
        nome: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean

}
type RoomParams = {
    id: string
}

export const Room = () => {
    const params = useParams<RoomParams>()
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const { user } = useAuth();
    
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parseQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parseQuestions)
        })
    }, [roomId])

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
                        name: user?.nome,
                        avatar: user?.avatar,
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

                <div className="questions">
                    {JSON.stringify(questions)}
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