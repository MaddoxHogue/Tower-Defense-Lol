import {HealthBar} from '../objects/HealthBar.js'

export class Base extends Phaser.GameObjects.Rectangle{
	constructor(scene) {
		super(scene, 1366, 0, 100, 768, 0x5599ff)
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		this.setOrigin(0)
		this.maxHealth = 3
		this.health = this.maxHealth
		this.healthBar = new HealthBar(this.scene, 683, 35, 300, 30)
		
		this.x -= this.width
	}
	preUpdate(time, delta) {
		this.healthBar.updateHealth(this.maxHealth, this.health)
		
		if(this.health <= 0) {
			this.scene.scene.pause()
		}
	}
}