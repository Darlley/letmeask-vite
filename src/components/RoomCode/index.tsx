import copyImg from '../../assets/images/copy.svg';
import '../../styles/room-code.scss'

type RoomCodeProp = {
    code: string;
}

export const RoomCode = (props: RoomCodeProp) => {

    function copyRoomCodeClipboard(){
        navigator.clipboard.writeText(props.code)
        alert('Copiado!')
    }

    return (
        <button className="room-code" onClick={copyRoomCodeClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code || '0000000000'}</span>
        </button>
    )
}