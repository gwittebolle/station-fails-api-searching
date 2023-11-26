// app/javascript/packs/mainScene.js
import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('worm', '/assets/worm.png');
    this.load.image('tombstone', '/assets/tombstone.png');
  }

  create() {
    this.square = this.physics.add.image(400, 300, 'worm').setOrigin(0.5, 0.5).setScale(0.1);
    this.square.setDepth(1);

    const columns = 8;
    const rows = 4;
    const spacingX = 120;
    const spacingY = 160;

    // Créez un groupe pour contenir les tombstones
    this.tombstones = this.physics.add.group();
    this.tombstones.setDepth(0);

    // Créez les tombstones et définissez leur profondeur
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const x = 20 + i * spacingX;
        const y = 20 + j * spacingY;

        // Chaque tombstone est ajoutée au groupe 'tombstones'
        const tombstone = this.physics.add.image(x, y, 'tombstone').setOrigin(0, 0).setScale(0.1);
        tombstone.setDepth(0);

        // Ajoutez la tombstone au groupe
        this.tombstones.add(tombstone);
      }
    }

    // Activer la physique pour chaque tombe
    this.tombstones.getChildren().forEach((tombstone) => {
      this.physics.world.enable(tombstone);
    });

    // Activez la physique pour le carré
    this.physics.world.enable(this.square);

    // Configurez une collision entre le carré et les tombstones
    this.physics.add.collider(this.square, this.tombstones, this.handleCollision.bind(this));

    // Initialisez le texte "Worm" (mais ne l'affichez pas encore)
    this.wormText = this.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' });
    this.wormText.setOrigin(0.5);
    this.wormText.setDepth(2); // Assurez-vous que la profondeur est plus haute que le carré
    this.wormText.setVisible(false);

    this.isColliding = false;
    this.previousPosition = { x: this.square.x, y: this.square.y };
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    // Enregistrez la position actuelle avant tout mouvement
    this.previousPosition = { x: this.square.x, y: this.square.y };

    if (!this.isColliding) {
      if (cursors.left.isDown) {
        this.square.x -= 2;
      } else if (cursors.right.isDown) {
        this.square.x += 2;
      }

      if (cursors.up.isDown) {
        this.square.y -= 2;
      } else if (cursors.down.isDown) {
        this.square.y += 2;
      }
      // Vérifiez si le ver est sorti de l'écran à gauche
    if (this.square.x < 0) {
      this.square.x = this.sys.game.config.width; // Réapparaissez à droite de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran à droite
    if (this.square.x > this.sys.game.config.width) {
      this.square.x = 0; // Réapparaissez à gauche de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran en haut
    if (this.square.y < 0) {
      this.square.y = this.sys.game.config.height; // Réapparaissez en bas de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran en bas
    if (this.square.y > this.sys.game.config.height) {
      this.square.y = 0; // Réapparaissez en haut de l'écran
    }
    }

    // Affichez "WormText" pendant 2 secondes lorsque la touche espace est appuyée
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)) {
      this.showWormText();
    }

  }

  showWormText() {
    // Mettez à jour la position du texte en fonction de la position du ver
    this.wormText.setPosition(this.square.x + 200, this.square.y - 20);

    // Affichez le texte avec les coordonnées du ver
    this.wormText.setText(
      `Position du ver : (${this.square.x.toFixed(2)}, ${this.square.y.toFixed(2)})`
    );

    // Affichez le texte pendant 2 secondes
    this.wormText.setVisible(true);
    this.time.delayedCall(2000, () => {
      this.wormText.setVisible(false);
    });
  }

  handleCollision() {
    // Stoppe le mouvement du carré
    this.square.setVelocity(0);

    // Obtenez les coordonnées de la tombe touchée
    const tombstone = this.getClosestTombstone();
    console.log(tombstone)

    // Si la tombe existe, replacez le ver près de cette tombe
    if (tombstone) {
      const newX = tombstone.x + 30;
      const newY = tombstone.y + 70;
      console.log(newX)
      console.log(newY)
      // Affiche "Collision !" pendant 2 secondes
      this.wormText.setText('Ci-gît la startup xxxx...');
      // this.wormText.setPosition(this.square.x + 50, this.square.y + 20);
      this.wormText.setPosition(tombstone.x + 80, tombstone.y - 30);
      this.wormText.setVisible(true);
      // Réinitialisez la position du carré près de la tombe touchée
      this.square.setPosition(newX, newY);
    }

    this.time.delayedCall(2000, () => {
      this.wormText.setVisible(false);
    });

    // Déplacez le ver dans une zone hors collision
    // this.findSafePosition();
    // this.square.setPosition(400, 300);

    // Permettez au ver de se déplacer librement après la collision
    this.isColliding = false;
  }

  findSafePosition() {
    // Déplacez le ver près de sa position précédente avant la collision
    const safeX = Phaser.Math.Between(
      this.previousPosition.x - 50,
      this.previousPosition.x + 50
    );
    const safeY = Phaser.Math.Between(
      this.previousPosition.y - 50,
      this.previousPosition.y + 50
    );

    this.square.setPosition(safeX, safeY);

    // Vérifiez si la nouvelle position a une collision avec les tombstones
    if (this.physics.overlap(this.square, this.tombstones)) {
      // Si collision, réessayez avec une nouvelle position
      this.findSafePosition();
    }
  }

    // Fonction pour obtenir les coordonnées de la tombe la plus proche
  getClosestTombstone() {
    const tombstones = this.tombstones.getChildren();

    // Si aucune tombe n'est présente, retournez null
    if (tombstones.length === 0) {
      return null;
    }

    // Triez les tombes par distance par rapport au carré (ver)
    tombstones.sort((a, b) => {
      const distanceA = Phaser.Math.Distance.Between(this.square.x, this.square.y, a.x, a.y);
      const distanceB = Phaser.Math.Distance.Between(this.square.x, this.square.y, b.x, b.y);
      return distanceA - distanceB;
    });

    // Retournez les coordonnées de la tombe la plus proche
    return { x: tombstones[0].x, y: tombstones[0].y };
  }

}
