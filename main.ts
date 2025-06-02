radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        anzahl_runden += 1
        gewinne_1 += 1
        start()
    } else {
        ball = game.createSprite(receivedNumber, 0)
        basic.pause(500)
        for (let index = 0; index < 4; index++) {
            ball.change(LedSpriteProperty.Y, 1)
            basic.pause(500)
        }
        if (schlaeger.get(LedSpriteProperty.X) == ball.get(LedSpriteProperty.X)) {
            music.playTone(988, music.beat(BeatFraction.Whole))
            posTest()
        } else {
            music.playMelody("C5 B A G F E D C ", 391)
            anzahl_runden += 1
            gewinne_2 += 1
            ball.delete()
            schlaeger.delete()
            start()
        }
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    schlaeger.change(LedSpriteProperty.X, -1)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    start()
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    schlaeger.change(LedSpriteProperty.X, 1)
})
function posTest () {
    if (ball.get(LedSpriteProperty.Y) == 4) {
        ball.delete()
        ball = game.createSprite(randint(0, 4), 4)
        for (let index = 0; index < 4; index++) {
            ball.change(LedSpriteProperty.Y, -1)
            basic.pause(500)
        }
        radio.sendNumber(ball.get(LedSpriteProperty.X))
        ball.delete()
    }
}
function start () {
    schlaeger = game.createSprite(2, 4)
    radio.setGroup(1)
    ball = game.createSprite(randint(0, 4), 4)
    basic.pause(500)
    for (let index = 0; index < 4; index++) {
        ball.change(LedSpriteProperty.Y, -1)
        basic.pause(500)
    }
    if (ball.get(LedSpriteProperty.Y) == 0) {
        x_position += ball.get(LedSpriteProperty.X)
        ball.delete()
        radio.sendNumber(x_position)
    }
}
let x_position = 0
let gewinne_2 = 0
let schlaeger: game.LedSprite = null
let ball: game.LedSprite = null
let gewinne_1 = 0
let anzahl_runden = 0
let gewinne = 0
basic.forever(function () {
    if (anzahl_runden == 3) {
        if (gewinne_1 > gewinne_2) {
            basic.showString("✔!")
        } else {
            radio.sendNumber(2)
            basic.showString("❌!")
        }
    }
})
