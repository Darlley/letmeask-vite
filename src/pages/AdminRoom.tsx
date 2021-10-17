import { database } from '../services/firebase';
// Firebase
import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
// hooks
import { useHistory, useParams } from 'react-router';
// Rotas
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
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

export const AdminRoom = () => {
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');
    const { user } = useAuth();
    
    const {title, questions} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        setInterval(() => {
            history.push('/')
        }, 500)
    }

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

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza qu edeseja remover esta pergunta?')){
            setInterval(() => {
                database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
            }, 500)
        }
    }

    async function handleCheckQuestionAnswared(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighLightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
    }

    return (
        <>
        <div id="page-root">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask Logo" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button className="button" isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunt{questions.length > 1 ? 'as' : 'a'}</span> }
                </div>

                <div className="fild-questions">
                    {questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighLighted={question.isHighLighted} >
                                
                                {!question.isAnswered && (<>
                                    <button type="button" onClick={() => handleCheckQuestionAnswared(question.id)}>
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                    </button>
                                
                                    <button type="button" onClick={() => handleHighLightQuestion(question.id)}>
                                        <img src={answerImg} alt="Destacar pergunta pergunta" />
                                    </button>
                                </>)}

                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>
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