export class Bullet extends Phaser.GameObjects.Rectangle{
	constructor(scene, x, y, target) {
		super(scene, x, y, 5, 5, 0xffff55)
		this.scene = scene
		this.scene.add.existing(this)
		this.scene.physics.add.existing(this)
		this.body.collideWorldBounds = true
		this.setOrigin(0.5)
		this.speed = 500
		this.position = (x,y)
		this.target = target
		this.damage = 3
	}
	preUpdate(time, delta) {
		if(this.target.health <= 0) {
			this.destroy()
		} else {
		this.scene.physics.moveToObject(this, this.target, this.speed, null)
		}
	}
}