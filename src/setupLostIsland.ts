import * as utils from '@dcl/ecs-scene-utils';
import { scene } from './scene';

export const setupLostIsland = () => {
  const sceneWalls = scene.islandWalls.GLTFShape;
  sceneWalls.withCollisions = false;
  sceneWalls.visible = false;
  sceneWalls.isPointerBlocker = false;

  const triggerBox = new utils.TriggerBoxShape(new Vector3(31, 28, 31));

  scene.islandWalls.entity.addComponent(
    new utils.TriggerComponent(triggerBox, {
      onCameraEnter: () => {
        sceneWalls.visible = true;
      },
      onCameraExit: () => {
        sceneWalls.visible = false;
      },
    })
  );
};
