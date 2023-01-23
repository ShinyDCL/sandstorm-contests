import * as utils from '@dcl/ecs-scene-utils';
import { scene } from './scene';

export const setupVintageScene = () => {
  const sceneWalls = scene.vintagescenewalls.GLTFShape;
  sceneWalls.withCollisions = false;
  sceneWalls.visible = false;
  sceneWalls.isPointerBlocker = false;

  const triggerBox = new utils.TriggerBoxShape(new Vector3(16, 16, 16));

  scene.vintagescenewalls.entity.addComponent(
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
