const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: '¿Que  querian los papas de rapunzel?',
    options: [
      {
        text: 'deseaban una hija',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'no tener hijos',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: '¿En donde estaba encerrada rapunzel?',
    options: [
      {
        text: 'en un cstillo',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'en una torre',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'en una casa',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: '¿Que color tenia el cabbelo rapunzel?',
    options: [
      {
        text: 'negro',
        nextText: 4
      },
      {
        text: 'dorado',
        nextText: 5
      },
      {
        text: 'cafe',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: '¿Que color son sus ojos?',
    options: [
      {
        text: 'verde',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'VOLVER A CONTESTAR PREGUNTAS',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: '¿Quien la salva de la torre?',
    options: [
      {
        text: 'el principe',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: '¿Como se llama la bruja?',
    options: [
      {
        text: 'Gothel',
        nextText: 8
      },
      {
        text: 'Maléfica',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Úrsula ',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Lady Tremaine ',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'VOLVER A JUGAR',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()