import {HealthBar} from '../objects/HealthBar.js'

export class Enemy extends Phaser.GameObjects.Rectangle{
	pathIndex = 0
	
	constructor(scene, x, y, type) {
		super(scene, x, y, 25, 25, 0xffaaaa)
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		this.setOrigin(0.5)
		this.timeAlive = 0
		this.speed = 1/23000
		this.position = (x,y)
		this.damage = 1
		this.maxHealth = 200
		this.health = this.maxHealth
		this.type = type
		if(this.type === 'blue') {
			this.fillColor = 0xaaaaff
			this.speed = 1/10000
			this.maxHealth = 60
			this.health = this.maxHealth
		}

		this.tower = null

		this.healthBar = new HealthBar(this.scene, this.x, this.y - (this.width * 0.8), this.width - 5, 5)

	}
	setEnemyPath(p) {
		this.path = p
	}
	preUpdate(time, delta) {
		this.healthBar.updateHealth(this.maxHealth, this.health)
		
		this.tower = null
		this.timeAlive += delta * this.speed
		if(this.timeAlive > 1) {
			this.timeAlive = 1
		}

		const point = this.path.getPoint(this.timeAlive)
		this.setPosition(point.x, point.y)

		if(this.health <= 0) {
			this.destroy()
			this.healthBar.maxBox.destroy()
			this.healthBar.destroy()
		}

		this.healthBar.x = this.x
		this.healthBar.y = this.y - (this.width * 0.8)
	}
	setTower(tower) {
		this.tower = tower
	}
}