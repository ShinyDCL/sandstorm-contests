import * as utils from '@dcl/ecs-scene-utils';
import { movePlayerTo } from '@decentraland/RestrictedActions';
import {
  GITHUB_CONTEST_2,
  GITHUB_CONTEST_3,
  GITHUB_CONTEST_4,
  GITHUB_CONTEST_6,
  GITHUB_CONTEST_7,
  TWITTER_CONTEST_2,
  TWITTER_CONTEST_3,
  TWITTER_CONTEST_4,
  TWITTER_CONTEST_6,
  TWITTER_CONTEST_7,
} from './config';
import { Link, LinkType } from './link';
import { scene } from './scene';
import { setupVintageScene } from './setUpVintageScene';
import { setupWandStore } from './setupWandStore';

const canvas = new UICanvas();
const texture = new Texture('images/image-atlas.png');
const input = Input.instance;

new Link(scene.githubLink2, GITHUB_CONTEST_2, LinkType.GITHUB);
new Link(scene.githubLink3, GITHUB_CONTEST_3, LinkType.GITHUB);
new Link(scene.githubLink4, GITHUB_CONTEST_4, LinkType.GITHUB);
new Link(scene.githubLink6, GITHUB_CONTEST_6, LinkType.GITHUB);
new Link(scene.githubLink7, GITHUB_CONTEST_7, LinkType.GITHUB);

new Link(scene.twitterLink2, TWITTER_CONTEST_2, LinkType.TWITTER);
new Link(scene.twitterLink3, TWITTER_CONTEST_3, LinkType.TWITTER);
new Link(scene.twitterLink4, TWITTER_CONTEST_4, LinkType.TWITTER);
new Link(scene.twitterLink6, TWITTER_CONTEST_6, LinkType.TWITTER);
new Link(scene.twitterLink7, TWITTER_CONTEST_7, LinkType.TWITTER);

scene.islandWalls.GLTFShape.visible = false;

//create entity
const box = new Entity();

//create shape for entity and disable its collision
box.addComponent(new BoxShape());
box.getComponent(BoxShape).withCollisions = false;

//set transform component with initial position
box.addComponent(
  new Transform({
    position: new Vector3(48, 0, -48),
  })
);

// create trigger area object, setting size and relative position
const triggerBox = new utils.TriggerBoxShape(
  new Vector3(31, 28, 31),
  new Vector3(0, 0, 0)
);

//create trigger for entity
box.addComponent(
  new utils.TriggerComponent(triggerBox, {
    onCameraEnter: () => {
      scene.islandWalls.GLTFShape.visible = true;
    },
    onCameraExit: () => {
      scene.islandWalls.GLTFShape.visible = false;
    },
  })
);

//add entity to engine
engine.addEntity(box);

scene.fountain.entity.addComponentOrReplace(
  new OnPointerDown(
    () => {
      void movePlayerTo({ x: 42, y: 31, z: -48 });
    },
    { hoverText: 'Drink!' }
  )
);

setupVintageScene();
setupWandStore(canvas, texture, input);
