import {Enemy} from '../objects/Enemy.js'
import {AOE} from '../objects/AOE.js'
import {PewPew} from '../objects/PewPew.js'
import {Bullet} from '../objects/Bullet.js'
import {Base} from '../objects/Base.js'

export class MainLevel extends Phaser.Scene {
  constructor() {
    super({ key: "main-level" });
  }

  preload() {
    console.log("loading MainLevel");
  }

  create() {
		this.AOE = new AOE(this, 300, 120)
		this.pewPew = new PewPew(this, 600, 200)
		this.bullets= []

		this.base = new Base(this)
		
		
		this.enemies = []
		
    this.path = new Phaser.Curves.Path(100,100)
		this.path.lineTo(100,200)
		this.path.lineTo(300,200)
		this.path.lineTo(500,200)
		this.path.lineTo(400,400)
		this.path.lineTo(800,400)
		this.path.lineTo(600,600)
		this.path.lineTo(900,600)
		this.path.lineTo(900,200)
		this.path.lineTo(1100,300)
		this.path.lineTo(1366,300)

		this.spawnTime = 4000
		this.spawnDelta = 4000
		
    this.createColliders();
  }

  update(timestamp, delta) {
		this.spawnDelta += delta
		if(this.spawnDelta >= this.spawnTime) {
			this.spawnDelta = 0
			this.spawnEnemy()
		}
  }

  
  createColliders() {
		this.physics.add.overlap(
    	this.base,
      this.enemies,
			(base, enemy) => {
				this.base.health -= enemy.damage
				enemy.health = 0
			},
			null,
			this
    );
		
		this.physics.add.overlap(
    	this.AOE.range,
      this.enemies,
			(range, enemy) => {
				this.AOE.shoot(enemy)
				enemy.setTower(range)
			},
			null,
			this
    );

		this.physics.add.overlap(
    	this.pewPew.range,
      this.enemies,
			(range, enemy) => {
				this.pewPew.shoot(enemy)
				enemy.setTower(range)
			},
			null,
			this
    );

		this.physics.add.overlap(
    	this.bullets,
      this.enemies,
			(bullet, enemy) => {
				enemy.health -= bullet.damage
				bullet.destroy()
			},
			null,
			this
    );
  }

	spawnEnemy() {
		if(this.rng(0,1) === 0) {
			this.enemy = new Enemy(this, 100, 100)
		} else {
			this.enemy = new Enemy(this, 100, 100, 'blue')
		}
		this.enemy.setEnemyPath(this.path)
		this.enemies.push(this.enemy)
	}

	makeBullet(x, y, target) {
		this.bullets.push(new Bullet(this, x, y, target))
	}

	rng(min, max, numOfDecimals = 0) {
		const i = Math.pow(10, numOfDecimals)
		return (Math.round((Math.random() * (max - min) + min) * i) / i)
	}
}
