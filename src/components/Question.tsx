import { motion } from "framer-motion"
import '../styles/question.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
};

export const Question = ({content, author}: QuestionProps) => {
    return (
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <motion.div className="motion-frame" drag
                        dragConstraints={{
                        top: 0,
                        left: 0,
                        right: 20,
                        bottom: 0,
                    }}>
                        <img className="avatar" src={author.avatar} alt={author.name} />
                        <span>{author.name}</span>
                    </motion.div>
                </div>
                <div></div>
            </footer>
        </div>
    )
}