import { useAuth } from '../hooks/useAuth'
// Contexto
import { Link, useHistory } from 'react-router-dom'
// Rotas
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
// Assets/Imagens
import { Button } from '../components/Button'
// Componentes
import '../styles/auth.scss'
// CSS
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
// tipagem de formulario TypeScript e hoks

export const NewRoom = () => {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  // criar nova sala
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomReferenceFirebase = database.ref('rooms') // criar sessão
    const firebaseeRoom = await roomReferenceFirebase.push({
      title: newRoom,
      authorId: user?.id
    }) // adicionar à sessão

    history.push(`/rooms/${firebaseeRoom.key}`)
  }

  return (
    <div className="home">
      <aside className="home__aside">
        <img
          className="aside__img"
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostase"
        />
        <strong className="aside__strong">Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className="home__main">
        <div className="main-content">
          <img className="main-content__img" src={logoImg} alt="Letmeask" />
          <h2>Crie uma nova sala</h2>
          <form className="main-content__form" onSubmit={handleCreateRoom}>
            <input
              className="form__input"
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button
              type="submit"
              className="button form__button"
              isOutlined={false}
            >
              Cria sala
            </Button>
            <p>
              Quer entrar em uma sala já existente?{' '}
              <Link to="/">Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  ) // submit é no form por que pode ocorrer de um input enviar os dados
}
