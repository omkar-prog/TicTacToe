navigator.serviceWorker
    .register('myserviceworker.js')
    .then(registration => {
        console.log('Service Worker registered')
        console.log(registration)
    })
    .catch(err => {
        console.log(`Service worker registration error: ${err}`)
    })

let squares = document.querySelectorAll('.unselected')
let winnername = document.getElementById('winner__name')
let moves = document.getElementById('moves')
let audio = document.getElementById('audio')

let [beginner, difficult] = [
    document.getElementById('beginner'),
    document.getElementById('difficult')
]

difficult.onclick = () => {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            square.innerHTML = 'O'
            moves.innerHTML = Number(moves.innerHTML) + 2

            square.classList.remove('unselected')
            square.classList.add('selected')

            let remainingSquares = document.querySelectorAll('.unselected')

            let rand = BestSpot(Number(square.getAttribute('number')))
            let randInt = Math.floor(Math.random() * rand.length)

            let data = document.querySelector(
                `[number="${Number(square.getAttribute('number')) + rand[randInt]}"]`
            )
            console.log(
                Number(square.getAttribute('number')) + rand[randInt],
                `${rand[randInt]} is the index of computer`
            )

            if (
                squares[Number(square.getAttribute('number')) + rand[randInt]]
                .innerHTML === 'O' ||
                squares[Number(square.getAttribute('number')) + rand[randInt]]
                .innerHTML === 'X'
            ) {
                console.log('We deserve a second chance')
                const randomNumber = Math.floor(Math.random() * remainingSquares.length)
                remainingSquares[randomNumber].innerHTML = 'X'

                remainingSquares[randomNumber].style.backgroundColor = 'lightblue'
                remainingSquares[randomNumber].classList.remove('unselected')
                remainingSquares[randomNumber].classList.add('computer')

                console.log(remainingSquares)
            } else {
                data.innerHTML = 'X'
                data.classList.remove('unselected')
                data.classList.add('computer')
            }

            let userSelectedSquares = document.querySelectorAll('.selected')

            userSelectedSquares.forEach(sq => (sq.style.backgroundColor = 'tomato'))

            let computerSelectedSquares = document.querySelectorAll('.computer')
            computerSelectedSquares.forEach(sq => {
                sq.style.backgroundColor = 'lightblue'
            })

            if (DoesPatternMatch(userSelectedSquares)) {
                winnername.innerHTML = 'You won !!!'
                audio.setAttribute("src", 'win.mp3')
            } else if (DoesPatternMatch(computerSelectedSquares)) {
                winnername.innerHTML = 'Computer won !!!'
                audio.setAttribute("src", "lose.mp3")
            } else {
                winnername.innerHTML = 'Draw / Tie'
            }

        }), { once: true }
    })
}
beginner.onclick = () => {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            square.innerHTML = 'O'
            moves.innerHTML = Number(moves.innerHTML) + 1

            square.classList.remove('unselected')
            square.classList.add('selected')

            let remainingSquares = document.querySelectorAll('.unselected')

            let randInt = Math.floor(Math.random() * 9)
            console.log(randInt)

            let data = document.querySelector(
                `[number="${randInt}"]`
            )

            if (
                squares[randInt].innerHTML ===
                'O' ||
                squares[randInt].innerHTML ===
                'X'
            ) {
                console.log('We deserve a second chance')
                const randomNumber = Math.floor(Math.random() * remainingSquares.length)
                remainingSquares[randomNumber].innerHTML = 'X'

                remainingSquares[randomNumber].style.backgroundColor = 'lightblue'
                remainingSquares[randomNumber].classList.remove('unselected')
                remainingSquares[randomNumber].classList.add('computer')

                console.log(remainingSquares)
            } else {
                data.innerHTML = 'X'
                data.classList.remove('unselected')
                data.classList.add('computer')
            }

            let userSelectedSquares = document.querySelectorAll('.selected')

            userSelectedSquares.forEach(sq => (sq.style.backgroundColor = 'tomato'))

            let computerSelectedSquares = document.querySelectorAll('.computer')
            computerSelectedSquares.forEach(sq => {
                sq.style.backgroundColor = 'lightblue'
            })

            if (DoesPatternMatch(userSelectedSquares)) {
                winnername.innerHTML = 'You won !!!'
                audio.setAttribute("src", 'win.mp3')
            } else if (DoesPatternMatch(computerSelectedSquares)) {
                winnername.innerHTML = 'Computer won !!!'
                audio.setAttribute("src", "lose.mp3")
            } else {
                winnername.innerHTML = 'Draw / Tie'
            }
        }), { once: true }
    })
}

function DoesPatternMatch(list) {
    return checkVertical(list) || checkHorizontal(list) || checkDiagonal(list)
}

function checkVertical(list) {
    return (
        (list[0].innerHTML == squares[0].innerHTML &&
            list[1].innerHTML == squares[3].innerHTML &&
            list[2].innerHTML == squares[6].innerHTML) ||
        (list[0].innerHTML == squares[1].innerHTML &&
            list[1].innerHTML == squares[4].innerHTML &&
            list[2].innerHTML == squares[7].innerHTML) ||
        (list[0].innerHTML == squares[2].innerHTML &&
            list[1].innerHTML == squares[5].innerHTML &&
            list[2].innerHTML == squares[8].innerHTML)
    )
}

function checkHorizontal(list) {
    return (
        (list[0].innerHTML == squares[0].innerHTML &&
            list[1].innerHTML == squares[1].innerHTML &&
            list[2].innerHTML == squares[2].innerHTML) ||
        (list[0].innerHTML == squares[3].innerHTML &&
            list[1].innerHTML == squares[4].innerHTML &&
            list[2].innerHTML == squares[5].innerHTML) ||
        (list[0].innerHTML == squares[6].innerHTML &&
            list[1].innerHTML == squares[7].innerHTML &&
            list[2].innerHTML == squares[8].innerHTML)
    )
}

function checkDiagonal(list) {
    return (
        (list[0].innerHTML == squares[0].innerHTML &&
            list[1].innerHTML == squares[4].innerHTML &&
            list[2].innerHTML == squares[8].innerHTML) ||
        (list[0].innerHTML == squares[2].innerHTML &&
            list[1].innerHTML == squares[4].innerHTML &&
            list[2].innerHTML == squares[6].innerHTML)
    )
}

function BestSpot(num) {
    const spots = [
        [1, 4, 3],
        [3, 6],
        [-1, 2, 3],
        [1, -3, 3],
        [-2, -3, -4, -1, 1, 2, 3, 4],
        [-1, -3, 3],
        [1, -3, -2],
        [1, -1, -3],
        [-1, -4, -3]
    ]

    return spots[num]
}