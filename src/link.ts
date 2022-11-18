import { Model, ModelConstructorArgs } from './model';

export enum LinkType {
  TWITTER = 'Twitter',
  GITHUB = 'Github',
}

export class Link extends Model {
  constructor(model: ModelConstructorArgs, link: string, linkType: LinkType) {
    super(model);

    this.entity.addComponent(
      new OnPointerDown(() => openExternalURL(link), { hoverText: linkType })
    );
  }
}
