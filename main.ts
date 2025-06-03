radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 10) {
        ball.delete()
        schlaeger.delete()
        basic.showLeds(`
            . . . # #
            . # . . #
            # # # . #
            . # . . #
            . . . . #
            `)
        counter += 1
        if (counter == 3) {
            radio.sendNumber(100)
            basic.showIcon(IconNames.Happy, 1000)
            ball.delete()
            schlaeger.delete()
        } else {
            start()
        }
    } else if (receivedNumber == 100) {
        basic.showIcon(IconNames.Sad, 1000)
        ball.delete()
        schlaeger.delete()
    } else {
        ball = game.createSprite(receivedNumber, 0)
        basic.pause(speed)
        for (let index = 0; index < 4; index++) {
            ball.change(LedSpriteProperty.Y, 1)
            basic.pause(speed)
        }
        if (schlaeger.get(LedSpriteProperty.X) == ball.get(LedSpriteProperty.X)) {
            posTest()
        } else {
            radio.sendNumber(10)
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
            basic.pause(speed)
        }
        radio.sendNumber(ball.get(LedSpriteProperty.X))
        ball.delete()
    }
}
function start () {
    schlaeger = game.createSprite(2, 4)
    radio.setGroup(1)
    ball = game.createSprite(randint(0, 4), 3)
    basic.pause(speed)
    for (let index = 0; index < 4; index++) {
        ball.change(LedSpriteProperty.Y, -1)
        basic.pause(speed)
    }
    if (ball.get(LedSpriteProperty.Y) == 0) {
        x_position += ball.get(LedSpriteProperty.X)
        ball.delete()
        radio.sendNumber(x_position)
    }
}
let x_position = 0
let schlaeger: game.LedSprite = null
let ball: game.LedSprite = null
let counter = 0
let speed = 0
speed = 200
counter = 0
