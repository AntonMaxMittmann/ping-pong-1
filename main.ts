let ball: game.LedSprite = null
let schlaeger: game.LedSprite = null
let x_position = 0
radio.onReceivedNumber(function (receivedNumber) {
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
        basic.showIcon(IconNames.Sad, 1000)
        ball.delete()
        schlaeger.delete()
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    schlaeger.change(LedSpriteProperty.X, -1)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
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
