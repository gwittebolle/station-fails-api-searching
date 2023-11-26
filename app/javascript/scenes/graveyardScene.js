// app/javascript/packs/graveyardScene.js

export default class GraveyardScene extends Phaser.Scene {
  preload() {
    this.load.image('tombstone', '/assets/tombstone.png');
    // Chargez d'autres assets si nécessaire
  }

  create() {
    // const columns = 5;
    // const rows = 4;
    // const spacingX = 160;
    // const spacingY = 160;

    // // Créez un groupe pour contenir les tombstones
    // this.tombstones = this.physics.add.group();
    // this.tombstones.setDepth(0);

    // // Créez les tombstones et définissez leur profondeur
    // for (let i = 0; i < columns; i++) {
    //   for (let j = 0; j < rows; j++) {
    //     const x = i * spacingX;
    //     const y = j * spacingY;

    //     // Chaque tombstone est ajoutée au groupe 'tombstones'
    //     const tombstone = this.physics.add.image(x, y, 'tombstone').setOrigin(0, 0).setScale(0.1);
    //     tombstone.setDepth(0);

    //     // Ajoutez la tombstone au groupe
    //     this.tombstones.add(tombstone);
    //   }
    // }

    // // Activer la physique pour chaque tombe
    // this.tombstones.getChildren().forEach((tombstone) => {
    //   this.physics.world.enable(tombstone);
    // });

    this.tombstone = this.physics.add.image(100, 300, 'tombstone').setOrigin(0.5, 0.5).setScale(0.5);
    this.tombstone.setDepth(0);
  }

  getTombstones() {
    // Retournez le groupe 'tombstones' pour la collision
    return this.tombstones;
  }


  // Fonction pour obtenir les coordonnées d'une tombe spécifique
  getTombstoneCoordinates(index) {
    // Vérifiez si l'index est valide
    if (index >= 0 && index < this.tombstones.getChildren().length) {
      const tombstone = this.tombstones.getChildren()[index];
      return { x: tombstone.x, y: tombstone.y };
    } else {
      console.error(`Index de tombe non valide : ${index}`);
      return null;
    }
  }

}
