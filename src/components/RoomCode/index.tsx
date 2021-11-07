import copyImg from '../../assets/images/copy.svg'
import toast, { Toaster } from 'react-hot-toast'
import '../../styles/room-code.scss'
import '../../styles/toaster.scss'

type RoomCodeProp = {
  code: string
}

export const RoomCode = (props: RoomCodeProp) => {
  function copyRoomCodeClipboard() {
    navigator.clipboard.writeText(props.code)

    toast.success('Código copiado com sucesso!')
  }

  return (
    <>
      <button className="room-code" onClick={copyRoomCodeClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code || '0000000000'}</span>
      </button>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'toaster-sucess'
        }}
      />
    </>
  )
}
