export class AOE extends Phaser.GameObjects.Rectangle{
	constructor(scene, x, y, type) {
		super(scene, x, y, 35, 75, 0xffdd77)
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		
		this.range = new Phaser.GameObjects.Ellipse(this.scene, this.x, this.y, 200, 200, 0xffffff, 0.25)
		this.scene.add.existing(this.range)
		this.scene.physics.add.existing(this.range)
		this.range.body.isCircle = true
		this.range.setOrigin(0.5)

		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true

		this.damage = 1
		
		}
	preUpdate(time, delta) {
		this.fillColor = 0xffdd77
	}
	shoot(target) {
		target.health -= this.damage
		this.fillColor = 0xff5555
	}
}