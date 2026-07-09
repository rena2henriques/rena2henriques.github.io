const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let cursors;

function preload() {
  // Usamos gráficos gerados em runtime (sem assets)
}

function create() {

  // Plataformas
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 430, null)
    .setDisplaySize(800, 40)
    .refreshBody();

  platforms.create(600, 300, null)
    .setDisplaySize(200, 20)
    .refreshBody();

  platforms.create(200, 220, null)
    .setDisplaySize(200, 20)
    .refreshBody();

  // Player (quadrado simples)
  player = this.physics.add.sprite(100, 350, null);
  player.setDisplaySize(32, 32);
  player.setCollideWorldBounds(true);

  // Colisão
  this.physics.add.collider(player, platforms);

  // Controlos
  cursors = this.input.keyboard.createCursorKeys();

  // Texto simples
  this.add.text(10, 10, 'Setas para mover | Espaço para saltar | R para reiniciar', {
    fontSize: '14px',
    fill: '#ffffff'
  });

  // Tecla R para restart
  this.input.keyboard.on('keydown-R', () => {
    this.scene.restart();
  });
}

function update() {

  const speed = 200;
  const jumpForce = 420;

  // Movimento horizontal
  if (cursors.left.isDown) {
    player.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.setVelocityX(speed);
  } else {
    player.setVelocityX(0);
  }

  // Salto
  if ((cursors.up.isDown || cursors.space.isDown) && player.body.blocked.down) {
    player.setVelocityY(-jumpForce);
  }

}
