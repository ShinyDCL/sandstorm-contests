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
import { setupLostFountain } from './setupLostFountain';
import { setupLostIsland } from './setupLostIsland';
import { setupVintageScene } from './setupVintageScene';
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

setupVintageScene();
setupLostFountain();
setupLostIsland();
setupWandStore(canvas, texture, input);
