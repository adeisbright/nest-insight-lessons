import { Injectable } from '@nestjs/common';
interface IGrant {
  index?: any;
  _id: number;
  title: string;
  description: string;
}

const Grants: IGrant[] = [
  {
    _id: 1,
    title: 'Agriculture Grant',
    description: `Secure this grant to boost your business.
      At TEF , we are committed to building a future with promises of 
      food availability for all people`,
  },
  {
    _id: 2,
    title: 'Transportation Grant',
    description: `Modern transportation requires modern tools.
      At TEF , we are supporting entrepreneurs building tools  and systems that seeks to 
      make transportation affordable and less time consuming`,
  },
  {
    _id: 3,
    title: 'Software  Grant',
    description: `Secure this grant to boost your business.
      At TEF , we are committed to building a future with promises of 
      food availability for all people`,
  },
  {
    _id: 4,
    title: 'Telehealth Grant',
    description: `Secure this grant to boost your business.
      At TEF , we are committed to building a future with promises of 
      food availability for all people`,
  },
  {
    _id: 5,
    title: 'E-commerce Grant',
    description: `Secure this grant to boost your business.
      At TEF , we are committed to building a future with promises of 
      food availability for all people`,
  },
  {
    _id: 6,
    title: 'Retail Grant',
    description: `Secure this grant to boost your business.
      At TEF , we are committed to building a future with promises of 
      food availability for all people`,
  },
  {
    _id: 7,
    title: 'Education Grant',
    description: `Secure this grant to boost your business.
      At TEF , we are committed to building a future with promises of 
      food availability for all people`,
  },

  {
    _id: 8,
    title: 'Commerce Grant',
    description: `Start selling and buying so that people will be glad about
    what you sell`,
  },
];

@Injectable()
export class AppService {
  private grants: IGrant[] = [];
  constructor() {
    this.grants = Grants;
  }

  getWelcomeMessage() {
    return {
      name: 'BAP MGT Service',
      resource: 'base url',
    };
  }

  getGrants() {
    return this.grants;
  }

  addGrant(body: any) {
    this.grants.push({
      _id: this.grants.length + 1,
      title: body.title,
      description: body.description,
    });

    return this.grants;
  }
}
