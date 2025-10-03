'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'

interface Question {
  id: number
  level: 'Fácil' | 'Médio' | 'Difícil'
  question: string
  emoji: string
  drawingIdea: string
  imageUrl: string 
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
    {
        id: 1,
        level: 'Fácil',
        question: 'Qual menino usou uma pedrinha para derrotar um gigante?',
        emoji: '👦',
        drawingIdea: 'Um menino pequeno e sorridente segurando uma atiradeira, olhando para um gigante muito alto e com cara de bravo.',
        imageUrl: '/images/1_davi.png',
        options: ['Moisés', 'Davi', 'Noé', 'Jonas'],
        correctAnswer: 1,
        explanation: 'Davi era um pastor corajoso que confiou em Deus e venceu o gigante Golias com sua atiradeira.'
    },
    {
        id: 2,
        level: 'Fácil',
        question: 'Quem construiu uma grande arca para salvar os animais?',
        emoji: '🚢',
        drawingIdea: 'Um homem barbudo sorrindo ao lado de uma arca gigante com vários animais entrando: girafas, elefantes, leões e passarinhos.',
        imageUrl: '/images/2_noe.png',
        options: ['Abraão', 'Moisés', 'Noé', 'José'],
        correctAnswer: 2,
        explanation: 'Noé obedeceu a Deus e construiu a arca para salvar sua família e os animais do dilúvio.'
    },
    {
        id: 3,
        level: 'Fácil',
        question: 'Onde Jesus nasceu?',
        emoji: '👶',
        drawingIdea: 'Um bebê Jesus deitado em uma manjedoura com palha, cercado por Maria, José e alguns animais como ovelhas e um burrinho.',
        imageUrl: '/images/3_jesus_nascimento.png',
        options: ['Em um palácio', 'Em uma manjedoura', 'Em uma casa grande', 'Em um barco'],
        correctAnswer: 1,
        explanation: 'Jesus nasceu em uma manjedoura em Belém, porque não havia lugar na hospedaria.'
    },
    {
        id: 4,
        level: 'Fácil',
        question: 'Quem foram as primeiras pessoas que Deus criou?',
        emoji: '👫',
        drawingIdea: 'Um homem e uma mulher sorrindo em um jardim lindo cheio de flores, árvores e animais amigáveis.',
        imageUrl: '/images/4_adao_eva.png',
        options: ['Adão e Eva', 'Noé e Sara', 'José e Maria', 'Davi e Ana'],
        correctAnswer: 0,
        explanation: 'Adão e Eva foram as primeiras pessoas criadas por Deus no jardim do Éden.'
    },
    {
        id: 5,
        level: 'Fácil',
        question: 'Quantos dias Deus levou para criar o mundo?',
        emoji: '🌍',
        drawingIdea: 'O planeta Terra brilhando no espaço com o sol, a lua e as estrelas ao redor, tudo muito colorido e bonito.',
        imageUrl: '/images/5_criacao.png',
        options: ['5 dias', '6 dias', '10 dias', '7 dias'],
        correctAnswer: 1,
        explanation: 'Deus criou o mundo em 6 dias e descansou no 7º dia.'
    },
    {
        id: 6,
        level: 'Fácil',
        question: 'Quem abriu o mar para o povo passar?',
        emoji: '🌊',
        drawingIdea: 'Um homem com uma vara levantada e o mar se abrindo como duas paredes de água, com pessoas caminhando no meio.',
        imageUrl: '/images/6_moises_mar.png',
        options: ['Davi', 'Noé', 'Moisés', 'José'],
        correctAnswer: 2,
        explanation: 'Moisés, com o poder de Deus, abriu o Mar Vermelho para o povo de Israel escapar do Egito.'
    },
    {
        id: 7,
        level: 'Fácil',
        question: 'Quantos discípulos Jesus escolheu?',
        emoji: '👥',
        drawingIdea: 'Jesus no centro sorrindo, cercado por 12 homens felizes, todos em um círculo como amigos.',
        imageUrl: '/images/7_discipulos.png',
        options: ['10', '12', '15', '8'],
        correctAnswer: 1,
        explanation: 'Jesus escolheu 12 discípulos para serem seus amigos especiais e ajudantes.'
    },
    {
        id: 8,
        level: 'Médio',
        question: 'Qual profeta foi engolido por um grande peixe?',
        emoji: '🐋',
        drawingIdea: 'Um homem dentro da barriga de uma baleia gigante, com o homem orando e a baleia nadando no mar.',
        imageUrl: '/images/8_jonas.png',
        options: ['Daniel', 'Jonas', 'Elias', 'Samuel'],
        correctAnswer: 1,
        explanation: 'Jonas foi engolido por um grande peixe quando tentou fugir de Deus, mas depois obedeceu.'
    },
    {
        id: 9,
        level: 'Médio',
        question: 'Quem foi jogado na cova dos leões?',
        emoji: '🦁',
        drawingIdea: 'Um homem tranquilo sentado no meio de vários leões mansos, com um anjo brilhante protegendo ele.',
        imageUrl: '/images/9_daniel.png',
        options: ['José', 'Davi', 'Daniel', 'Moisés'],
        correctAnswer: 2,
        explanation: 'Daniel foi jogado na cova dos leões, mas Deus enviou um anjo para protegê-lo.'
    },
    {
        id: 10,
        level: 'Médio',
        question: 'Que cor era a túnica especial de José?',
        emoji: '👕',
        drawingIdea: 'Um jovem sorridente usando uma túnica linda com muitas cores: vermelho, azul, amarelo, verde e roxo.',
        imageUrl: '/images/10_jose_tunica.png',
        options: ['Azul', 'Vermelha', 'Colorida', 'Branca'],
        correctAnswer: 2,
        explanation: 'José ganhou de seu pai uma túnica de muitas cores, que mostrava o amor especial por ele.'
    },
    {
        id: 11,
        level: 'Médio',
        question: 'Quantos pães Jesus usou para alimentar muitas pessoas?',
        emoji: '🍞',
        drawingIdea: 'Jesus segurando 5 pãezinhos pequenos e 2 peixinhos, com muitas pessoas sentadas na grama esperando.',
        imageUrl: '/images/11_multiplicacao.png',
        options: ['3 pães', '5 pães', '10 pães', '7 pães'],
        correctAnswer: 1,
        explanation: 'Jesus usou apenas 5 pães e 2 peixes para alimentar mais de 5000 pessoas.'
    },
    {
        id: 12,
        level: 'Médio',
        question: 'Quem interpretou os sonhos do rei do Egito?',
        emoji: '👑',
        drawingIdea: 'Um jovem falando com um rei que usa uma coroa dourada, com desenhos de vacas e espigas de trigo ao fundo.',
        imageUrl: '/images/12_jose_sonhos.png',
        options: ['Davi', 'José', 'Moisés', 'Daniel'],
        correctAnswer: 1,
        explanation: 'José interpretou os sonhos do Faraó sobre as vacas gordas e magras, salvando o Egito da fome.'
    },
    {
        id: 13,
        level: 'Médio',
        question: 'Em que rio Jesus foi batizado?',
        emoji: '💧',
        drawingIdea: 'Jesus sendo batizado em um rio por João Batista, com uma pomba branca descendo do céu.',
        imageUrl: '/images/13_batismo.png',
        options: ['Rio Nilo', 'Rio Jordão', 'Rio Eufrates', 'Rio Tigre'],
        correctAnswer: 1,
        explanation: 'Jesus foi batizado por João Batista no rio Jordão, e o Espírito Santo desceu como uma pomba.'
    },
    {
        id: 14,
        level: 'Médio',
        question: 'Quantos dias e noites choveu durante o dilúvio?',
        emoji: '🌧️',
        drawingIdea: 'Chuva forte caindo do céu cinzento, com a arca de Noé flutuando segura na água.',
        imageUrl: '/images/14_diluvio.png',
        options: ['30 dias', '40 dias', '50 dias', '20 dias'],
        correctAnswer: 1,
        explanation: 'Choveu por 40 dias e 40 noites durante o grande dilúvio nos tempos de Noé.'
    },
    {
        id: 15,
        level: 'Difícil',
        question: 'Onde estava a força de Sansão?',
        emoji: '💪',
        drawingIdea: 'Um homem muito forte com cabelos longos e ondulados, flexionando os músculos e sorrindo.',
        imageUrl: '/images/15_sansao.png',
        options: ['Nos braços', 'No cabelo', 'Nas pernas', 'Nas mãos'],
        correctAnswer: 1,
        explanation: 'A força de Sansão estava em seus cabelos longos, que nunca tinham sido cortados.'
    },
    {
        id: 16,
        level: 'Difícil',
        question: 'Quem subiu em uma árvore para ver Jesus?',
        emoji: '🌳',
        drawingIdea: 'Um homem pequeno subido em uma árvore grande, olhando para baixo onde Jesus está passando com muitas pessoas.',
        imageUrl: '/images/16_zaqueu.png',
        options: ['Pedro', 'João', 'Zaqueu', 'Mateus'],
        correctAnswer: 2,
        explanation: 'Zaqueu era baixinho e subiu numa árvore para conseguir ver Jesus passar.'
    },
    {
        id: 17,
        level: 'Difícil',
        question: 'Quem ajudou um homem ferido na estrada?',
        emoji: '❤️',
        drawingIdea: 'Um homem bondoso cuidando de outro homem machucado na estrada, com um burrinho ao lado.',
        imageUrl: '/images/17_samaritano.png',
        options: ['O sacerdote', 'O levita', 'O samaritano', 'O soldado'],
        correctAnswer: 2,
        explanation: 'O bom samaritano parou para ajudar o homem ferido, mostrando amor ao próximo.'
    },
    {
        id: 18,
        level: 'Difícil',
        question: 'Quem foi levado ao céu em uma carruagem de fogo?',
        emoji: '🔥',
        drawingIdea: 'Um homem subindo ao céu em uma carruagem puxada por cavalos de fogo, com outro homem olhando de baixo.',
        imageUrl: '/images/18_elias.png',
        options: ['Moisés', 'Elias', 'Enoque', 'Samuel'],
        correctAnswer: 1,
        explanation: 'Elias foi levado ao céu em uma carruagem de fogo, sem morrer.'
    },
    {
        id: 19,
        level: 'Difícil',
        question: 'Quantos anos Matusalém viveu?',
        emoji: '👴',
        drawingIdea: 'Um velhinho muito, muito idoso com uma barba branquinha longa, sorrindo e cercado por muitas pessoas da família.',
        imageUrl: '/images/19_matusalem.png',
        options: ['900 anos', '969 anos', '800 anos', '1000 anos'],
        correctAnswer: 1,
        explanation: 'Matusalém foi a pessoa que mais viveu na Bíblia, chegando aos 969 anos.'
    },
    {
        id: 20,
        level: 'Difícil',
        question: 'Quem construiu o primeiro templo de Jerusalém?',
        emoji: '🏛️',
        drawingIdea: 'Um rei com coroa dourada apontando para um templo lindo e grande sendo construído, com muitos trabalhadores.',
        imageUrl: '/images/20_salomao.png',
        options: ['Davi', 'Salomão', 'Moisés', 'Samuel'],
        correctAnswer: 1,
        explanation: 'O rei Salomão, filho de Davi, construiu o primeiro templo de Jerusalém para Deus.'
    }
]

export default function QuizBiblico() {
  const [gameState, setGameState] = useState<'startScreen' | 'playing' | 'completed'>('startScreen')
  const [playerName, setPlayerName] = useState('Liz') 
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  if (questions.length === 0) {
    return <div>Carregando perguntas...</div>;
  }
  const question = questions[currentQuestion]

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setGameState('completed')
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setGameState('startScreen')
  }
  
  const startGame = () => {
    if (playerName.trim() !== '') {
        setGameState('playing');
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Fácil': return 'bg-green-500'
      case 'Médio': return 'bg-yellow-500'
      case 'Difícil': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return { message: `Parabéns, ${playerName}! Você é uma expert da Bíblia! 🌟`, color: "text-green-600" }
    if (percentage >= 70) return { message: `Muito bem, ${playerName}! Você conhece bem as histórias! 😊`, color: "text-blue-600" }
    if (percentage >= 50) return { message: `Bom trabalho, ${playerName}! Continue estudando! 👍`, color: "text-yellow-600" }
    return { message: `Continue aprendendo, ${playerName}! Você vai melhorar! 💪`, color: "text-purple-600" }
  }

  if (gameState === 'startScreen') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto shadow-2xl text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-purple-800">
              Quiz Bíblico Infantil 📖
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Qual é o seu nome?</h2>
            <Input 
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-center text-lg p-3 mb-6"
              placeholder="Digite seu nome aqui"
            />
            <Button
              onClick={startGame}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Começar a Aventura! ✨
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (gameState === 'completed') {
    const scoreMessage = getScoreMessage()
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-auto shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Quiz Concluído! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-4">Sua Pontuação:</h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {score} de {questions.length}
            </div>
            <p className={`text-xl mb-6 ${scoreMessage.color} font-semibold`}>
              {scoreMessage.message}
            </p>
            <Button 
              onClick={resetQuiz}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Jogar Novamente 🔄
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            Quiz Bíblico Infantil 📖
          </h1>
          <p className="text-lg text-gray-600">
            Vamos lá, <span className="font-bold text-pink-500">{playerName}</span>! Descubra as histórias mais lindas da Bíblia!
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Pontuação: {score}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <Card className="shadow-2xl mb-6">
          <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <Badge className={`${getLevelColor(question.level)} text-white px-3 py-1`}>
                {question.level}
              </Badge>
              <div className="text-3xl">{question.emoji}</div>
            </div>
            <CardTitle className="text-xl font-bold mt-4">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="my-4 rounded-lg overflow-hidden shadow-md border-4 border-white">
              <Image
                src={question.imageUrl}
                alt={question.drawingIdea}
                width={700}
                height={400}
                className="w-full h-auto object-cover"
                priority={true}
              />
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Imagine:</strong> {question.drawingIdea}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left text-lg font-semibold rounded-xl border-2 transition-all duration-200 transform hover:scale-105"
                if (selectedAnswer === null) {
                  buttonClass += " bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                } else if (index === question.correctAnswer) {
                  buttonClass += " bg-green-100 border-green-500 text-green-800"
                } else if (index === selectedAnswer) {
                  buttonClass += " bg-red-100 border-red-500 text-red-800"
                } else {
                  buttonClass += " bg-gray-100 border-gray-300 text-gray-500"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="font-bold text-xl mr-3">{String.fromCharCode(65 + index)})</span>
                    {option}
                    {selectedAnswer !== null && index === question.correctAnswer && (<span className="ml-2 text-green-600">✅</span>)}
                    {selectedAnswer === index && index !== question.correctAnswer && (<span className="ml-2 text-red-600">❌</span>)}
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                <p className="text-blue-800">
                  <strong>📚 Explicação:</strong> {question.explanation}
                </p>
              </div>
            )}

            {showExplanation && (
              <div className="text-center">
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima Pergunta 👉' : 'Ver Resultado 🏆'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}