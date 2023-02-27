import {Bullet} from '../objects/Bullet.js'

export class PewPew extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, type) {
		super(scene, x, y, 35, 75, 0xee5ff)
		this.scene = scene
		this.range = new Phaser.GameObjects.Ellipse(this.scene, this.x, this.y, 300, 300, 0xffffff, 0.25)
		this.scene.add.existing(this.range)
		this.scene.physics.add.existing(this.range)
		this.range.body.isCircle = true
		this.range.setOrigin(0.5)

		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		
		this.cooldown = 50
		this.timer = 0
		this.readyFire = true
		this.target
	}
	preUpdate(time, delta) {
		this.fillColor = 0xee55ff

		if(this.target) {
			if(this.target.tower !== this.range) {
				this.target = null
			}
		}
		
		if(this.timer >= this.cooldown && this.target) {
			this.scene.makeBullet(this.x, this.y, this.target)
			this.readyFire = false
			this.timer = 0
		} else {
			this.timer += delta
		}
	}
	shoot(target) {
		if(!this.target) this.target = target
		this.fillColor = 0xff5555
	}
}