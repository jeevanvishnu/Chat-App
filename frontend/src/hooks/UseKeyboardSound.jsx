const keyboardSound = [
    new Audio('/sounds/keystroke1.mp3'),
    new Audio('/sounds/keystroke2.mp3'),
    new Audio('/sounds/keystroke3.mp3'),
    new Audio('/sounds/keystroke4.mp3'),
   
]

const useKeySound = () =>{
    const playRandomKeySound = () => {
        const RandomSound = keyboardSound[Math.floor(Math.random() * keyboardSound.length)]
        RandomSound.currentTime = 0
        RandomSound.play().catch(err => console.log('Audio play error',err)
        )
    }

    return {playRandomKeySound}
}

export default useKeySound
