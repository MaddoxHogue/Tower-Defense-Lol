export class HealthBar extends Phaser.GameObjects.Rectangle{
	constructor(scene, x, y, w, h) {
		super(scene, x, y, w, h, 0x00ffaa)
		this.scene = scene
		this.setOrigin(0.5)
		this.maxBox = new Phaser.GameObjects.Rectangle(this.scene, this.x, this.y, this.width, this.height, 0xffaa00)
		this.scene.add.existing(this.maxBox)
		this.scene.physics.add.existing(this.maxBox)

		this.maxBox.setOrigin(0.5)

		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)


		this.x = x
		this.y = y
		this.width = w
		this.height = h
	}
	preUpdate(time, delta) {
		this.maxBox.x = this.x
		this.maxBox.y = this.y
	}
	updateHealth(maxHealth, health) {
		this.width = (health / maxHealth) * this.maxBox.width
	}
}